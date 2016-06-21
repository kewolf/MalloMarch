/**
 * Created by roda on 5/23/16.
 */

var KalmanFilter = function (the_process_variance, the_est_measure_variance, the_posteri_est) {
    this.process_variance = the_process_variance;
    this.est_measure_variance = the_est_measure_variance;
    this.posteri_est = the_posteri_est;
    this.posteri_error_est = 1.0;

    this.input_a_measurement = function (measurement) {
        var priori_est;
        var blending_factor;
        var priori_error_est;

        priori_est = this.posteri_est;
        priori_error_est = this.posteri_error_est + this.process_variance;
        blending_factor = priori_error_est / (priori_error_est + this.est_measure_variance);
        this.posteri_est = priori_est + (blending_factor * (measurement - priori_est));
        this.posteri_error_est = (1 - blending_factor) * priori_error_est;
    }
};

var NetworkTimer = function () {
    this.kalmanInitialized = false;
    this.instantOffset = 0;

    this.addTimeOffset = function (instant_offset) {
        if (!this.kalman_initialized) {
            var process_variance = 1; // todo: set to better value
            var est_measure_variance = 1; // todo: set to a better value
            this.kalman_filter = new KalmanFilter(process_variance, est_measure_variance, instant_offset);
            this.kalman_initialized = true;
        } else {
            this.kalman_filter.input_a_measurement(instant_offset);
        }
    };

    this.getTime = function () {
        if (!this.kalman_initialized)
            return audioContext.currentTime + this.instantOffset;
        else
            return kalman_filter.posteri_est;
    }
};

var Scheduler = function (players) {
    this.preThreshold = 0.75; //schedule 20 ms in advance
    this.postThreshold = 0.03; //30 ms after
    this.waitPeriod = 0.2; //
    this.players = players;
    this.curPredictions = [];
    this.lastPlayTime = [];
    console.log('players.length: ' + players.length);
    for (var i = 0; i < players.length; i++) {
        this.curPredictions.push(0);
        this.lastPlayTime.push(0);
        console.log('this.curPredictions[' + i + ']: ' + this.curPredictions[i]);
    }

    this.checkSchedule = function () {
        var curTime = audioContext.currentTime;
        for (var i = 0; i < players.length; i++) {
            if (i == 0 && false) {
                console.log('time diff: ' + (this.curPredictions[i] - audioContext.currentTime));
                console.log("curTime < this.curPredictions[i] + this.postThreshold: " + (curTime < (this.curPredictions[i] + this.postThreshold)));
                console.log("curTime: " + curTime + ", this.curPredictions[i] + this.postThreshold: " + (this.curPredictions[i] + this.postThreshold));
                console.log("curTime > this.curPredictions[i] - this.preThreshold: " + (curTime > (this.curPredictions[i] - this.preThreshold)));
                console.log("curTime < this.lastPlayTime[i]: " + (curTime < this.lastPlayTime[i]));
                console.log("curTime > this.lastPlayTime[i] + this.waitPeriod: " + (curTime > (this.lastPlayTime[i] + this.waitPeriod)));
                console.log("#########################################################");
            }

            if (curTime < this.curPredictions[i] + this.postThreshold
                && curTime > this.curPredictions[i] - this.preThreshold
                && (curTime < this.lastPlayTime[i]
                || curTime > this.lastPlayTime[i] + this.waitPeriod)) {
                if (curTime < this.lastPlayTime[i]) {
                    players[i].unschedule();
                    console.log('unscheduled');
                }
                console.log('scheduled audio');
                players[i].schedule(this.curPredictions[i]);
                this.lastPlayTime[i] = this.curPredictions[i];
            }
        }
    };

    this.setPrediction = function (prediction, playerIndex) {
        this.curPredictions[playerIndex] = prediction;
    };
};