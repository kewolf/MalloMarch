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



/* 
 This  listener receives frames from a Leap Motion and looks for
 either one or two tools. If they are present it notifies their respective
 events 
 */

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
