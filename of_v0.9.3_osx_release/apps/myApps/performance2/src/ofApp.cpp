#include "ofApp.h"

const long long EPOCH_OFFSET = 1484000000000; //(used to reduce the number of bits in this timestamp)

//--------------------------------------------------------------
void ofApp::setup(){
    
    /****** MalLo Setup ******/
    
    float latency = 50;
    tempo = 120;
    
    toolTrackerMulti = new LeapToolTrackerMulti(&leapPositionEvent1, &leapPositionEvent2);
    toolTrackerMulti->open();
    
    mallo_predictor1 = new MalLoPredictor(&receiverEvent);
    mallo_predictor2 = new MalLoPredictor(&receiverEvent);
    mallo_predictor1->setLatency(latency);
    mallo_predictor2->setLatency(latency);
    
    ofAddListener(leapPositionEvent1, mallo_predictor1, &MalLoPredictor::onEvent);
    ofAddListener(leapPositionEvent1, this, &ofApp::logPosition);
    //ofAddListener(leapPositionEvent2, mallo_predictor2, &MalLoPredictor::onEvent);
    ofAddListener(receiverEvent, this, &ofApp::sendOsc);


    
    period = 60000.f/tempo;
    waiting_period = period/8.f;
    
    /****** OSC Setup******/
    int port_num = (send_to_chuck) ? 6449 : 6449;
    osc_sender.setup(ip_address, port_num);
    
    /****** Time Sync *****/
    
    sync_client =  new SyncClient(&osc_sender);
    time_query_interval = 1000;
    
    /****** GUI Setup******/
    
    gui.setup();
    gui.add(performer_position.setup("Performer Position",""));
    gui.add(toggle_left.setup("Left Performer", true));
    gui.add(toggle_middle.setup("Middle Performer", false));
    gui.add(toggle_right.setup("Right Performer", false));
    gui.add(ip_display.setup("IP Address", ip_address));
    gui.add(change_ip.setup("Change IP Address"));
    gui.add(send_to_chuck.setup("Send to Chuck", true));
    
    toggle_left.addListener(this, &ofApp::leftChanged);
    toggle_right.addListener(this, &ofApp::rightChanged);
    toggle_middle.addListener(this, &ofApp::middleChanged);
    change_ip.addListener(this, &ofApp::setIp);
    last_press_left = last_press_middle = last_press_right = ofGetElapsedTimeMillis();
    
    /****** Logging ******/
    
    ofLogToFile("logs/" + ofToString(getMillisSinceEpoch()/1000) + ".log",true);
    //chuck_log.open("logs/chuck_log.log", std::fstream::in | std::fstream::out | std::fstream::app);
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
    float fade_rate = 3.5;
    int circle_radius = 5;
    
    // mallet visualization
    predicted_heights[array_index % HISTORY_SIZE] = mallo_predictor1->predicted_height;
    actual_heights[array_index % HISTORY_SIZE] = mallo_predictor1->getHeight();
    
    // chuck
    if (mallo_predictor1->predicted_height > 10 && !hysteresis_reset_chuck)
    {
        hysteresis_reset_chuck = true;
    }
    
    if (send_to_chuck &&
        mallo_predictor1->predicted_height < 0 &&
        ofGetElapsedTimeMillis() - last_chuck_send_time > chuck_timeout &&
        hysteresis_reset_chuck)
    {
        sendToChuck(mallo_predictor1->past_leap_position);
        hysteresis_reset_chuck = false;
        last_chuck_send_time = ofGetElapsedTimeMillis();
        ofLog() << "Chuck: " << ofToString(last_chuck_send_time);
    }
    
    gui.draw();
    
    if (!toolTrackerMulti->found_tool)
    {
        gb = 0.0;
    }
    
    ofSetColor(255,(int)gb, (int)gb);
    ofPolyline future_line, actual_line;
    float sum = 0;
    for (int this_index = 0; this_index < HISTORY_SIZE; this_index++)
    {
        int local_index = (array_index + this_index + 1 ) % HISTORY_SIZE;
        ofPoint pt2;
        pt2.set(ofGetWindowWidth() - this_index, ofGetHeight() - predicted_heights[local_index]);
        future_line.addVertex(pt2);
        
        ofPoint pt3;
        pt3.set(ofGetWindowWidth() - this_index, ofGetHeight() - actual_heights[local_index]);
        actual_line.addVertex(pt3);
    }
    
    ofImage input_device_img;

        ofSetColor(255, (int)gb, 0);
        future_line.draw();
        ofSetColor(255,(int)gb, (int)gb);
        actual_line.draw();
        array_index++;
        
        ofSetColor(255, 255, 0);
        ofDrawCircle(circle_radius, ofGetHeight() - mallo_predictor1->predicted_height, circle_radius * 2);
        ofSetColor(255, 255, 255);
        ofDrawCircle(circle_radius, ofGetHeight() - mallo_predictor1->getHeight(), circle_radius);
        old_x = mallet_x;
        gb = (gb < 255.0) ? gb + fade_rate : 255.0;

    
    ofSetColor(255, 255, 255);
    
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

void ofApp::sendOsc(float & scheduled_time)
{
    if (!send_to_chuck)
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
            last_message_was_nada = true;
            return;
        } else {
            send_value = sync_client->get_offset() + (int64_t) scheduled_time;
            last_message_was_unschedule = false;
            last_message_was_nada = false;
        }
        
        initializeOscMsg(&msg, leap_position1, OSC_MSG, send_value);
        osc_sender.sendMessage(msg);
        //    cout << "path: " << osc_path << ", schedule_time: " << scheduled_time << ", send_value: " << send_value << endl;
    }
}

//void ofApp::sendOsc(float & scheduled_time)
//{
//    if (!send_to_chuck)
//    {
//        int64_t send_value;
//        if (scheduled_time == -1)
//        {
//            if (last_message_was_unschedule) { return; }
//            send_value = -1;
//            last_message_was_unschedule = true;
//            last_message_was_nada = false;
//            
//        } else if (scheduled_time == 0)
//        {
//            if (last_message_was_nada) { return; }
//            //        cout << "*** sent nothing ***" << endl;
//            last_message_was_nada = true;
//            return;
//        } else {
//            send_value = sync_client->get_offset() + (int64_t) scheduled_time;
//            last_message_was_unschedule = false;
//            last_message_was_nada = false;
//        }
//        
//        msg.clear();
//        msg.setAddress(osc_path);
//        msg.addInt64Arg(send_value);
//        msg.addFloatArg(1.f);
//        
//        osc_sender.sendMessage(msg);
//        //    cout << "path: " << osc_path << ", schedule_time: " << scheduled_time << ", send_value: " << send_value << endl;
//    }
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
    int port_num = (send_to_chuck) ? 6449 : 6450;
    osc_sender.setup(ip_address, port_num);
}

void ofApp::sendToChuck(LeapPosition pos) //todo get rid of this function
{
    initializeOscMsg(&chuck_msg, pos, CHUCK_MSG, 0);
    osc_sender.sendMessage(chuck_msg);
}

void ofApp::initializeOscMsg(ofxOscMessage * msg, LeapPosition pos, int chuck_or_osc, float predicted_time)
{
    /*
     path
     id: int
     predicted time (server time): int
     send time (server time): int
     predicted velocity: float
     x: float
     y: float
     z (height): float
     real-world time: int
     composer-determined 1: float
     composer-determined 2: float
     composer-determined 3: float
     composer-determined 4: float
     composer-determined 5: float
     */
    
    
    // This code is maybe too crafty. I hope it works.
    int msg_id = (chuck_or_osc == CHUCK_MSG) ? chuck_msg_id++ : osc_msg_id++;
    
    //printf("x: %f, y: %f, z: %f\n", pos.tipPosition.x, pos.tipPosition.y, pos.tipPosition.z);
    
    msg->clear();
    msg->setAddress(osc_path);
    msg->addIntArg(msg_id);          // id
    msg->addInt64Arg(predicted_time);        // predicted time
    msg->addInt64Arg(ofGetElapsedTimeMillis() + sync_client->get_offset());                     // send time (server time)
    msg->addFloatArg(pos.tipVelocity.y);   // predicted velocity
    msg->addFloatArg(pos.tipPosition.x);   // x
    msg->addFloatArg(pos.tipPosition.z);   // y  (yes I know the letters are different...the leap motion SDK calls height y)
    msg->addFloatArg(pos.tipPosition.y);   // z
    msg->addInt64Arg((int)(getMillisSinceEpoch()-EPOCH_OFFSET));     // real-world time
    msg->addFloatArg(9);                   // composer-determined 1
    msg->addFloatArg(10);                  // composer-determined 2
    msg->addFloatArg(11);                  // composer-determined 3
    msg->addFloatArg(12);                  // composer-determined 4
    msg->addFloatArg(13);                  // composer-determined 5
}

void ofApp::logPosition(LeapPosition & position_event)
{
    leap_position1 = position_event;
    /* Log format:
       tipx, tipy, tipz, velx, vely, velz, time_stamp, elapsed_time, sync_offset, server_time
     */
    int max_lines = 200;
    log_text += ofToString(position_event.tipPosition.x) + ", "
            + ofToString(position_event.tipPosition.y) + ", "
            + ofToString(position_event.tipPosition.z) + ", "
            + ofToString(position_event.tipVelocity.x) + ", "
            + ofToString(position_event.tipVelocity.y) + ", "
            + ofToString(position_event.tipVelocity.z) + ", "
            + ofToString(getMillisSinceEpoch()-EPOCH_OFFSET) + ", "
            + ofToString(ofGetElapsedTimeMillis()) + ", "
            + ofToString(sync_client->get_offset()) + ", "
            + ofToString(sync_client->get_server_time());
    log_line_count++;
    if (log_line_count >= max_lines) {
        ofLog() << log_text;
        log_text = "";
        log_line_count = 0;
    } else
    {
        log_text += "\n";
    }
}

long long ofApp::getMillisSinceEpoch()
{
    Poco::Timestamp epoch(0);
    Poco::Timestamp now;
    Poco::Timestamp::TimeDiff diffTime = (now - epoch);
    return (long long) (diffTime/1000);
}

