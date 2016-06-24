//
//  MalLo.h
//  experiment
//
//  Created by Reid Oda on 10/29/15.
//
//

#ifndef MalLo_h
#define MalLo_h

#include <iostream>
#include <Eigen/Dense>
#include <math.h>
#include <string>

#include "Poco/Stopwatch.h"
#include "Poco/Thread.h"
#include "Poco/Timestamp.h"
#include "Poco/Timer.h"

using Poco::Stopwatch;
using Poco::Thread;
using Poco::Timer;
using Poco::TimerCallback;

#include "ofxOsc.h"

/*****************
 * Message
 *****************/

/** TODO: I think this message object is no longer used for this version of Mallo **/

class MalloMessage
{
    
public:
    MalloMessage(float time_val, ofEvent<float> * receiver_ofEvent)
    {
        time = time_val;
        receiver = receiver_ofEvent;
    }
    
    void schedule(Timer& timer)
    {
        ofNotifyEvent(*receiver, time);
    }
    
protected:
    float time;
    ofEvent<float> * receiver;
};



/******************************************************************************************
 * Drum Height Listener
 * Listens to an ofEvent which updates a LeapHeight struct. On update, if there are at least
 * 13 heights stored, the listener makes a prediction about the time of the next strike and
 * sends it to
 ******************************************************************************************/

class MalLoPredictor
{
    
public:
    MalLoPredictor(ofEvent<float> * receiver_ofEvent)
    {
        receiver = receiver_ofEvent;
        n_points = 13; // determined experimentally
        alpha = 30;
        beta = 20;
    }
    
    void setLatency(float latency_val)
    {
        latency = latency_val;
    }
    
    void onEvent(LeapHeight & height_event){
        
        heights.push_back(height_event.height);
        times.push_back(height_event.time);
        
        
        if (heights.size() > n_points)
        {
            heights.pop_front();
            times.pop_front();
            
            float prediction_time = predict();
            // send the message
            ofNotifyEvent(*receiver, prediction_time);
        }
    }
    
protected:
    
    std::deque<float> heights;
    std::deque<float> times;
    int n_points; // # of points in regression
    
    float latency;
    float alpha;
    float beta;
    
    // These are
    string message_action;
    float message_time;
    vector<Timer *> timers;
    vector<MalloMessage *> messages;
    
    ofEvent<float> * receiver;
    
    /* Predicts the time of a mallet hit. If there is no predicted mallet hit, returns -1
     * which is interpreted by the receiver as an "unschdule" event */
    
    float predict()
    {
        
        Eigen::MatrixXf A(13,3);
        Eigen::VectorXf b(13);
        bool test = false;
        
        float offset;
        // for testing
        if (test)
        {
            float test_times[13] = {-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6};
            
            A <<  1, test_times[0], pow(test_times[0], 2),
            1, test_times[1], pow(test_times[1], 2),
            1, test_times[2], pow(test_times[2], 2),
            1, test_times[3], pow(test_times[3], 2),
            1, test_times[4], pow(test_times[4], 2),
            1, test_times[5], pow(test_times[5], 2),
            1, test_times[6], pow(test_times[6], 2),
            1, test_times[7], pow(test_times[7], 2),
            1, test_times[8], pow(test_times[8], 2),
            1, test_times[9], pow(test_times[9], 2),
            1, test_times[10], pow(test_times[10], 2),
            1, test_times[11], pow(test_times[11], 2),
            1, test_times[12], pow(test_times[12], 2);
            
            
            b << -85, -60, -39, -22, -9, 0, 5, 6, 3, -4, -15, -30, -49;
            cout << "Testing:\n";
        } else
        {
            offset = times[6];
            
            A <<  1, times[0] - offset, pow(times[0] - offset, 2),
                  1, times[1] - offset, pow(times[1] - offset, 2),
                  1, times[2] - offset, pow(times[2] - offset, 2),
                  1, times[3] - offset, pow(times[3] - offset, 2),
                  1, times[4] - offset, pow(times[4] - offset, 2),
                  1, times[5] - offset, pow(times[5] - offset, 2),
                  1, times[6] - offset, pow(times[6] - offset, 2),
                  1, times[7] - offset, pow(times[7] - offset, 2),
                  1, times[8] - offset, pow(times[8] - offset, 2),
                  1, times[9] - offset, pow(times[9] - offset, 2),
                  1, times[10] - offset, pow(times[10] - offset, 2),
                  1, times[11] - offset, pow(times[11] - offset, 2),
                  1, times[12] - offset, pow(times[12] - offset, 2);
            
            b << heights[0], heights[1], heights[2], heights[3],
                 heights[4], heights[5], heights[6], heights[7],
                 heights[8], heights[9], heights[10], heights[11],
                 heights[12];
        }
        
        // returns the coeifficients in ascending order of degree
        Eigen::Vector3f poly = (A.transpose() * A).ldlt().solve(A.transpose() * b);
        
        
        // if the polynomial meets certain criteria, solve and return the larger root
        if (poly(2) < 0 &&
            heights[9] - heights[8] < 0 &&
            heights[10] - heights[9] < 0 &&
            heights[11] - heights[10] < 0 &&
            heights[12] - heights[11] < 0)
        {
            Eigen::Matrix2f companion;
            companion << 0, -poly(0)/poly(2),
            1, -poly(1)/poly(2);
            float root1 = companion.eigenvalues()(0,0).real();
            float root2 = companion.eigenvalues()(1,0).real();
            float the_root = (root1 > root2) ? root1 : root2;
            return the_root + offset;
        } else if (heights[1] - heights[0] > 0 &&
                   heights[2] - heights[1] > 0 &&
                   heights[3] - heights[2] > 0 &&
                   heights[4] - heights[3] > 0 &&
                   heights[5] - heights[4] > 0 &&
                   heights[6] - heights[5] > 0 &&
                   heights[7] - heights[6] > 0 &&
                   heights[8] - heights[7] > 0 &&
                   heights[9] - heights[8] > 0 &&
                   heights[10] - heights[9] > 0 &&
                   heights[11] - heights[10] > 0 &&
                   heights[12] - heights[11] > 0)
        {
            return -1;
        } else
        {
            return 0;
        }
        
    }
};

class KalmanFilter
{
public:
    
    double process_variance, est_measure_variance, posteri_est, posteri_error_est;
    
    KalmanFilter()
    {
        posteri_error_est = 1.0;
        process_variance = 1.0;
        est_measure_variance = 1.0;
    }
    
    KalmanFilter(double the_process_variance, double the_est_measure_variance, double the_posteri_est)
    {
        process_variance = the_process_variance;
        est_measure_variance = the_est_measure_variance;
        posteri_est = the_posteri_est;
        posteri_error_est = 1.0;
    }
    
    void input_a_measurement(int64_t the_measurement)
    {
        double measurement = (double) the_measurement;
        double priori_est, blending_factor, priori_error_est;
        priori_est = posteri_est;
        priori_error_est = posteri_error_est + process_variance;
        blending_factor = priori_error_est / (priori_error_est + est_measure_variance);
        posteri_est = priori_est + (blending_factor * (measurement - priori_est));
        posteri_error_est = (1 - blending_factor) * priori_error_est;
    }
};

class SyncClient
{
public:
    ofxOscReceiver osc_receiver;
    ofxOscSender * osc_sender;
    int local_port;
    int64_t instant_offset;
    KalmanFilter kalman_filter;
    bool kalman_initialized = false;
    
    
    SyncClient(ofxOscSender * the_osc_sender)
    {
        this->local_port = 6448;
        this->osc_sender = the_osc_sender;
        this->osc_receiver.setup(this->local_port);
    }
    
    int64_t get_server_time()
    {
        if (kalman_initialized)
        {
            return (int64_t) ofGetElapsedTimeMillis() + kalman_filter.posteri_est;
        } else {
            return (int64_t) ofGetElapsedTimeMillis();
        }
    }
    
    int64_t get_offset()
    {
        return kalman_filter.posteri_est;
    }
    
    void query_timeserver()
    {
        ofxOscMessage msg;
        msg.clear();
        msg.setAddress("/time_req");
        msg.addInt64Arg((int64_t)ofGetElapsedTimeMillis());
        msg.addIntArg(local_port);
        osc_sender->sendMessage(msg);
    }
    
    void get_timeserver_response()
    {
        ofxOscMessage msg;
        int64_t receive_time;
        if (osc_receiver.hasWaitingMessages())
        {
            receive_time = ofGetElapsedTimeMillis();
        }
        
        while (osc_receiver.hasWaitingMessages())
        {
            osc_receiver.getNextMessage(msg);
        }
        
        if (msg.getAddress() == "/time_res")
        {
            int64_t send_time = msg.getArgAsInt64(0);
            int64_t server_time = msg.getArgAsInt64(1);
            instant_offset = server_time - (send_time + receive_time) / 2;
            //ofLog() << "send_time: " << send_time << ", server_time: " << server_time << ", instant_offset: " << instant_offset << endl;
            
            if (!kalman_initialized)
            {
                kalman_filter.posteri_est = instant_offset;
                kalman_initialized = true;
            }
            
            kalman_filter.input_a_measurement(instant_offset);
            //cout << fixed << "kalman posteri: " << kalman_filter.posteri_est << endl;
        }
    }
};

#endif /* MalLo_h */
