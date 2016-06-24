#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    
    /****** MalLo Setup ******/
    float latency = 50;
    tempo = 120;
//    toolTracker = new LeapToolTracker(&leapHeightEvent);
//    toolTracker->open();
    
//    mallo_predictor = new MalLoPredictor(&receiverEvent);
//    mallo_predictor->setLatency(latency);
    
//    ofAddListener(leapHeightEvent, mallo_predictor, &MalLoPredictor::onEvent);
//    ofAddListener(receiverEvent, this, &ofApp::schedule);
//    ofAddListener(receiverEvent, this, &ofApp::sendOsc);
//    ofAddListener(leapHeightEvent, this, &ofApp::set_height);
    
    toolTrackerMulti = new LeapToolTrackerMulti(&leapHeightEvent1, &leapHeightEvent2);
    toolTrackerMulti->open();
    
    mallo_predictor1 = new MalLoPredictor(&receiverEvent);
    mallo_predictor2 = new MalLoPredictor(&receiverEvent);
    mallo_predictor1->setLatency(latency);
    mallo_predictor2->setLatency(latency);
    
    ofAddListener(leapHeightEvent1, mallo_predictor1, &MalLoPredictor::onEvent);
    ofAddListener(leapHeightEvent2, mallo_predictor2, &MalLoPredictor::onEvent);
    //ofAddListener(receiverEvent, this, &ofApp::schedule);
    ofAddListener(receiverEvent, this, &ofApp::sendOsc);
    // ofAddListener(leapHeightEvent, this, &ofApp::set_height);
    
    tom_sound1.load(ofToDataPath("conga.wav"));
    tom_sound2.load(ofToDataPath("conga.wav"));
    
    period = 60000.f/tempo;
    waiting_period = period/8.f;
    
    /****** OSC Setup******/
    
    osc_sender.setup(ip_address, 6449);
    
    /****** Time Sync *****/
    sync_client =  new SyncClient(&osc_sender);
    time_query_interval = 1000;
    
    /****** GUI Setup******/
    
    gui.setup();
    gui.add(performer_position.setup("Performer Position",""));
    gui.add(toggle_left.setup("Left Performer", true));
    gui.add(toggle_middle.setup("Middle Performer", false));
    gui.add(toggle_right.setup("Right Performer", false));
    gui.add(ip_display.setup("IP Adress", ip_address));
    gui.add(change_ip.setup("Change IP Address"));
    
    toggle_left.addListener(this, &ofApp::leftChanged);
    toggle_right.addListener(this, &ofApp::rightChanged);
    toggle_middle.addListener(this, &ofApp::middleChanged);
    change_ip.addListener(this, &ofApp::setIp);
    last_press_left = last_press_middle = last_press_right = ofGetElapsedTimeMillis();
}

//--------------------------------------------------------------
void ofApp::update(){
    if (ofGetElapsedTimeMillis() - last_time_query > time_query_interval)
    {
        sync_client->query_timeserver();
        time_query_interval = time_query_interval >= 500 ? time_query_interval : time_query_interval + 2;
        last_time_query = ofGetElapsedTimeMillis();
    }
    sync_client->get_timeserver_response();
    toolTrackerMulti->markFrameAsOld();
}

//--------------------------------------------------------------
void ofApp::draw(){
    if (!ip_set) {
        ip_set = true;
        setIp(); //
    }
    
    // for testing
//    if (ofGetElapsedTimeMillis() - time_last_msg > 1000)
//    {
//        msg.clear();
//        msg.setAddress(osc_path);
//        msg.addFloatArg(10000);
//        msg.addFloatArg(1.f);
//        
//        osc_sender.sendMessage(msg);
//        time_last_msg = ofGetElapsedTimeMillis();
//        //cout << "path: " << osc_path << ", ip_address: " << ip_address << endl;
//    }
    gui.draw();
    
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){
    
}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){
    
}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){
    
}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){
    
}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){
    
}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){
    
}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){
    
}

//######################## Mine ################################

//void ofApp::set_height(LeapHeight & height_event)
//{
//    this->mallet_height = height_event.height;
//}

//void ofApp::schedule(float & scheduled_time)
//{
//    
//    float diff = scheduled_time - ofGetElapsedTimeMillis();
//    if (scheduled_time > 0 &&
//        diff < alpha &&
//        -diff < beta)
//    {
//        if (diff < 0) {
//            //                printf("Now\n");
//            inputReceived();
//        }
//        else
//        {
//            TimerCallback<ofApp> callback(*this, &ofApp::playDrum);
//            timers.push_back(new Timer(diff, 0));
//            timers.back()->start(callback, Thread::PRIO_HIGHEST);
//            //                printf("Scheduled in: %f\n",diff);
//        }
//        scheduled_time = -1;
//    }
//}

void ofApp::sendOsc(float & scheduled_time)
{
    int64_t send_value;
    if (scheduled_time == -1)
    {
        if (last_message_was_unschedule) { return; }
        send_value = -1;
        last_message_was_unschedule = true;
        last_message_was_nada = false;
        
    } else if (scheduled_time == 0)
    {
        if (last_message_was_nada) { return; }
        cout << "*** sent nothing ***" << endl;
        last_message_was_nada = true;
        return;
    } else {
        send_value = sync_client->get_offset() + (int64_t) scheduled_time;
        last_message_was_unschedule = false;
        last_message_was_nada = false;
    }
    
    msg.clear();
    msg.setAddress(osc_path);
    msg.addInt64Arg(send_value);
    msg.addFloatArg(1.f);
    
    osc_sender.sendMessage(msg);
    cout << "path: " << osc_path << ", schedule_time: " << scheduled_time << ", send_value: " << send_value << endl;
}

//void ofApp::inputReceived()
//{
//    
//    float now = ofGetElapsedTimeMillis();
//    if (now - last_drum_time > waiting_period) {
//        last_drum_time = now;
//        if (play_tom1) {
//            tom_sound1.play();
//            play_tom1 = false;
//        } else {
//            tom_sound2.play();
//            play_tom1 = true;
//        }
//    }
//}

//void ofApp::playDrum(Timer& timer)
//{
//    inputReceived();
//}

// callbacks for the gui. it was necessary to have 3 functions.
void ofApp::leftChanged(bool & param)
{
    cout << "leftChanged" << endl;
    last_press_left = ofGetElapsedTimeMillis();
    if (ofGetElapsedTimeMillis() - last_press_middle > button_wait)
        toggle_middle = false;
    if (ofGetElapsedTimeMillis() - last_press_right > button_wait)
        toggle_right = false;
    osc_path = "/left";
}

void ofApp::middleChanged(bool & param)
{
    cout << "middleChange" << endl;
    last_press_middle = ofGetElapsedTimeMillis();
    if ( ofGetElapsedTimeMillis() - last_press_right > button_wait)
        toggle_right = false;
    if (ofGetElapsedTimeMillis() - last_press_left > button_wait)
        toggle_left = false;
    osc_path = "/middle";
}

void ofApp::rightChanged(bool & param)
{
    cout << "rightChanged" << endl;
    last_press_right = ofGetElapsedTimeMillis();
    if (ofGetElapsedTimeMillis() - last_press_left > button_wait)
        toggle_left = false;
    if (ofGetElapsedTimeMillis() - last_press_middle > button_wait)
        toggle_middle = false;
    osc_path = "/right";
}

void ofApp::setIp()
{
    ip_address = ofSystemTextBoxDialog("Input URL", ip_address);
    ip_display = ip_address;
    osc_sender.setup(ip_address, 6449);
    
}

