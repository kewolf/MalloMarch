//
//  LeapTools.hpp
//  experiment
//
//  Created by Reid Oda on 10/28/15.
//
//

#ifndef LeapTools_h
#define LeapTools_h

#include <stdio.h>
#include "ofxLeapMotion2.h"

// This struct holds the height and time of a tool in a Leap Motion frame
//struct LeapHeight
//{
//    LeapHeight(float height, float time)
//    {
//        this->height = height;
//        this->time = time;
//    }
//    float height;
//    float time;
//};

struct LeapPosition
{
    LeapPosition(Vector tip_position, Vector tip_velocity, uint64_t time)
    {
        this->tipPosition = tip_position;
        this->tipVelocity = tip_velocity;
        this->time = time;
    }
    Vector tipPosition, tipVelocity;
    uint64_t time;
    
    float getHeight()
    {
        return tipPosition.y;
    }
};

//struct LeapHeight: public LeapPosition
//{
//    LeapHeight(float height, uint64_t time) : LeapPosition(Vector() {}
//};



// This simple listener receives frames from a Leap Motion
// If there is a tool present, the height of the tool tip
// and the time of the frame are put into a LeapHeight struct
// and sent to a ofEvent, to be consumed by other listeners

//class LeapToolTracker : public ofxLeapMotion
//{
//    
//public:
//    LeapToolTracker(ofEvent<LeapHeight> * leapPositionEvent) : ofxLeapMotion()
//    {
//        this->leapPositionEvent = leapPositionEvent;
//    }
//    
//protected:
//    
//    ofEvent<LeapHeight> * leapPositionEvent;
//    
//    void onFrameInternal(const Controller& contr){
//        ourMutex.lock();
//        const Frame & curFrame	= contr.frame();
//        const ToolList & toolList = curFrame.tools();
//        
//        LeapHeight leap_position((float) toolList[0].tipPosition().y,
//                   (float) ofGetElapsedTimeMillis());
//        
//        if (toolList.count() > 0)
//        {
//            ofNotifyEvent(*leapPositionEvent, leap_position);
////            printf("%f\n",(float) toolList[0].tipPosition().y);
//        }
//        
//        currentFrameID = curFrame.id();
////        this->markFrameAsOld();
//        ourMutex.unlock();
//    }
//};

/** multi version **/

class LeapToolTrackerMulti : public ofxLeapMotion
{
    
public:
    LeapToolTrackerMulti(ofEvent<LeapPosition> * leapPositionEvent1, ofEvent<LeapPosition> * leapPositionEvent2) : ofxLeapMotion()
    {
        this->leapPositionEvent1 = leapPositionEvent1;
        this->leapPositionEvent2 = leapPositionEvent2;
    }
    bool found_tool = false;
    
protected:
    
    ofEvent<LeapPosition> * leapPositionEvent1;
    ofEvent<LeapPosition> * leapPositionEvent2;
    
    void onFrameInternal(const Controller& contr){
        ourMutex.lock();
        const Frame & curFrame	= contr.frame();
        const ToolList & toolList = curFrame.tools();
        
        LeapPosition leap_position1(toolList[0].tipPosition(),
                                    toolList[0].tipVelocity(),
                                    ofGetElapsedTimeMillis());
        
        LeapPosition leap_position2(toolList[1].tipPosition(),
                                    toolList[1].tipVelocity(),
                                    ofGetElapsedTimeMillis());
        
        if (toolList.count() > 0)
        {
            ofNotifyEvent(*leapPositionEvent1, leap_position1);
            //            printf("%f\n",(float) toolList[0].tipPosition().y);
            found_tool = true;
        } else {
            found_tool = false;
        }
        
        if (toolList.count() > 1)
        {
            ofNotifyEvent(*leapPositionEvent2, leap_position2);
            //            printf("%f\n",(float) toolList[0].tipPosition().y);
        }
        
        currentFrameID = curFrame.id();
//        this->markFrameAsOld();
        ourMutex.unlock();
    }
};

#endif /* LeapTools_h */
