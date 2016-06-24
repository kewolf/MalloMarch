#pragma once

#include "ofMain.h"
#include "LeapTools.hpp"
#include "MalLo.h"
#include "ofxOsc.h"
#include "ofxGui.h"

class ofApp : public ofBaseApp{
    
public:
    void setup();
    void update();
    void draw();
    
    void keyPressed(int key);
    void keyReleased(int key);
    void mouseMoved(int x, int y );
    void mouseDragged(int x, int y, int button);
    void mousePressed(int x, int y, int button);
    void mouseReleased(int x, int y, int button);
    void mouseEntered(int x, int y);
    void mouseExited(int x, int y);
    void windowResized(int w, int h);
    void dragEvent(ofDragInfo dragInfo);
    void gotMessage(ofMessage msg);
    
    //################# mine ######################
    
    void set_height(LeapHeight & height_event);
    void schedule(float & scheduled_time);
    void inputReceived();
    void playDrum(Timer& timer);
    void leftChanged(bool & param);
    void middleChanged(bool & param);
    void rightChanged(bool & param);
    void setIp();
    void sendOsc(float & scheduled_time);
    
    // LeapToolTracker * toolTracker;
    // ofEvent<LeapHeight> leapHeightEvent;
    
    LeapToolTrackerMulti * toolTrackerMulti;
    ofEvent<LeapHeight> leapHeightEvent1;
    ofEvent<LeapHeight> leapHeightEvent2;
    
    
    // MalLoPredictor * mallo_predictor;
    MalLoPredictor * mallo_predictor1;
    MalLoPredictor * mallo_predictor2;
    ofEvent<float> receiverEvent;
    
    SyncClient * sync_client;
    uint64_t last_time_query = 0;
    uint64_t time_query_interval = 10;
    
    float mallet_height;
    Timer * metronome_timer;
    vector<Timer *> timers;
    
    float tempo;
    float period;
    float scheduled_time;
    float alpha = 5;
    float beta = 30;
    float waiting_period;
    float last_drum_time;
    bool play_tom1 = true;
    ofSoundPlayer tom_sound1;
    ofSoundPlayer tom_sound2;
    
    // OSC
    ofxOscSender osc_sender;
    ofxOscReceiver osc_receiver;
    uint64_t time_last_msg;
    ofxOscMessage msg;
    string ip_address = "10.9.243.82";
    bool ip_set = false;
    string osc_path = "/left";
    bool last_message_was_unschedule = false;
    
    // GUI
    ofxPanel gui;
    ofxLabel performer_position;
    ofxToggle toggle_left;
    ofxToggle toggle_middle;
    ofxToggle toggle_right;
    ofxLabel ip_display;
    ofxButton change_ip;
    
    uint64_t last_press_left;
    uint64_t last_press_middle;
    uint64_t last_press_right;
    uint64_t button_wait = 100;
    
};