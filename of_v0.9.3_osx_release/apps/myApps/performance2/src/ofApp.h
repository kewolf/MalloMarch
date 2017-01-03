#pragma once

#include "ofMain.h"
#include "LeapTools.hpp"
#include "MalLo.h"
#include "ofxOsc.h"
#include "ofxGui.h"

#define HISTORY_SIZE 1024
#define CHUCK_MSG 0
#define OSC_MSG 1

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
    void sendToChuck(LeapPosition pos);
    void initializeOscMsg(ofxOscMessage * msg, LeapPosition pos, int chuck_or_osc, float predicted_time);
    void logPosition(LeapPosition & position_event);
    int getMillisSinceEpoch();

    
    //################# mine ######################
    
    void set_height(LeapPosition & position_event);
    void schedule(float & scheduled_time);
    void inputReceived();
    void playDrum(Timer& timer);
    void leftChanged(bool & param);
    void middleChanged(bool & param);
    void rightChanged(bool & param);
    void setIp();
    void sendOsc(float & scheduled_time);
    
    LeapToolTrackerMulti * toolTrackerMulti;
    ofEvent<LeapPosition> leapPositionEvent1;
    ofEvent<LeapPosition> leapPositionEvent2;
    LeapPosition leap_position1;
    
    
    MalLoPredictor * mallo_predictor1;
    MalLoPredictor * mallo_predictor2;
    ofEvent<float> receiverEvent;
    
    SyncClient * sync_client;
    uint64_t last_time_query = 0;
    uint64_t time_query_interval = 10;
    
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
    int chuck_msg_id = 0;
    ofxOscSender osc_sender;
    ofxOscReceiver osc_receiver;
    ofxOscMessage msg;
    string ip_address = "localhost";
    bool ip_set = false;
    string osc_path = "/left";
    bool last_message_was_unschedule = false;
    bool last_message_was_nada = false;
    
    // GUI
    ofxPanel gui;
    ofxLabel performer_position;
    ofxToggle toggle_left;
    ofxToggle toggle_middle;
    ofxToggle toggle_right;
    ofxLabel ip_display;
    ofxButton change_ip;
    ofxToggle send_to_chuck;
    
    uint64_t last_press_left;
    uint64_t last_press_middle;
    uint64_t last_press_right;
    uint64_t button_wait = 100;
    
    // visualization stuff
    float predicted_heights[HISTORY_SIZE];
    float actual_heights[HISTORY_SIZE];
    int predicted_heights_index = 0;
    int array_index = 0;
    float mallet_x;
    float old_x = 0;
    float old_height = 0;
    float gb = 0;
    
    // Sending to Chuck
    bool hysteresis_reset_chuck = true;
    uint64_t last_chuck_send_time = 0;
    uint64_t chuck_timeout = 250;
    ofxOscSender chuck_osc_sender;
    ofxOscMessage chuck_msg;
    int osc_msg_id = 0;
    
    // Logging
    string log_text;
    int log_line_count = 0;
    
};
