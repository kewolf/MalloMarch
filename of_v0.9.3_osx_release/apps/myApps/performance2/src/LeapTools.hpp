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
struct LeapHeight
{
    LeapHeight(float height, float time)
    {
        this->height = height;
        this->time = time;
    }
    float height;
    float time;
};

// This simple listener receives frames from a Leap Motion
// If there is a tool present, the height of the tool tip
// and the time of the frame are put into a LeapHeight struct
// and sent to a ofEvent, to be consumed by other listeners

class LeapToolTracker : public ofxLeapMotion
{
    
public:
    LeapToolTracker(ofEvent<LeapHeight> * heightEvent) : ofxLeapMotion()
    {
        this->heightEvent = heightEvent;
    }
    
protected:
    
    ofEvent<LeapHeight> * heightEvent;
    
    void onFrameInternal(const Controller& contr){
        ourMutex.lock();
        const Frame & curFrame	= contr.frame();
        const ToolList & toolList = curFrame.tools();
        Tool curTool;
        float now;
        
        LeapHeight leap_height((float) toolList[0].tipPosition().y,
                   (float) ofGetElapsedTimeMillis());
        
        if (toolList.count() > 0)
        {
            ofNotifyEvent(*heightEvent, leap_height);
//            printf("%f\n",(float) toolList[0].tipPosition().y);
        }
        
        currentFrameID = curFrame.id();
        this->markFrameAsOld();
        ourMutex.unlock();
    }
};

class LeapToolTrackerMulti : public ofxLeapMotion
{
    
public:
    LeapToolTrackerMulti(ofEvent<LeapHeight> * heightEvent1, ofEvent<LeapHeight> * heightEvent2) : ofxLeapMotion()
    {
        this->heightEvent1 = heightEvent1;
        this->heightEvent2 = heightEvent2;
    }
    
protected:
    
    ofEvent<LeapHeight> * heightEvent1;
    ofEvent<LeapHeight> * heightEvent2;
    
    void onFrameInternal(const Controller& contr){
        ourMutex.lock();
        const Frame & curFrame	= contr.frame();
        const ToolList & toolList = curFrame.tools();
        Tool curTool;
        float now;
        
        LeapHeight leap_height1((float) toolList[0].tipPosition().y,
                               (float) ofGetElapsedTimeMillis());
        
        LeapHeight leap_height2((float) toolList[1].tipPosition().y,
                               (float) ofGetElapsedTimeMillis());
        
        if (toolList.count() > 0)
        {
            ofNotifyEvent(*heightEvent1, leap_height1);
            //            printf("%f\n",(float) toolList[0].tipPosition().y);
        }
        
        if (toolList.count() > 1)
        {
            ofNotifyEvent(*heightEvent2, leap_height2);
            //            printf("%f\n",(float) toolList[0].tipPosition().y);
        }
        
        currentFrameID = curFrame.id();
        this->markFrameAsOld();
        ourMutex.unlock();
    }
};

#endif /* LeapTools_h */
