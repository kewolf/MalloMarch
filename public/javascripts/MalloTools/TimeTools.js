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

var SyncClient = function () {
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
            return audioContext.currentTime + this.kalman_filter.posteri_est;
    };

    this.getOffset = function () {
        if (!this.kalman_initialized)
            return this.instantOffset;
        else
            return this.kalman_filter.posteri_est;
    };
};

var Scheduler = function (players, audioContext, logger, syncClient) {
    this.audioContext = audioContext;
    this.logger = logger;
    this.syncClient = syncClient;
    this.preThreshold = 0.02; //schedule 20 ms in advance
    this.postThreshold = 0.03; //30 ms after
    this.waitPeriod = 0.5; //
    this.players = players;
    this.curPredictions = [];
    this.curIds = [];
    this.curParams = [];
    this.lastPlayTime = [];
    this.logCounter = 0;
    console.log('players.length: ' + players.length);
    for (var i = 0; i < players.length; i++) {
        this.curPredictions.push(0);
        this.lastPlayTime.push(0);
        console.log('this.curPredictions[' + i + ']: ' + this.curPredictions[i]);
    }

    this.checkSchedule = function () {
        for (var i = 0; i < players.length; i++) {
            var diff = this.curPredictions[i] - this.audioContext.currentTime;

            if (diff > -this.postThreshold && diff < this.preThreshold
                && this.curPredictions[i] > this.lastPlayTime[i] + this.waitPeriod) {
                // console.log("diff: " + diff);
                // console.log('this.curPredictions[i] > this.lastPlayTime[i] + this.waitPeriod:' + (this.curPredictions[i] > this.lastPlayTime[i] + this.waitPeriod));
                // console.log('diff > -this.postThreshold && diff < this.preThreshold: ' + (diff > -this.postThreshold && diff < this.preThreshold));
                //console.log("####################### scheduled audio ##################################");

                var playTime = (diff < 0) ? this.audioContext.currentTime : this.curPredictions[i];
                this.lastPlayTime[i] = playTime;
                this.players[i].schedule(playTime, this.curParams[i]);
                //this.curPredictions[i] = -1;
                var time = playTime + syncClient.getOffset();
                var logtime = time * 1000;
                logger.info("{ \"EVPL" + i + "\" : " + logtime + ", \"msg_id\" : " + this.curIds[i] + "}"); // i indicates the player, playTime + syncClient.getOffset() indicates when in global time
            } /*
            else
            {
                //console.log('Did not find any events to schedule');
                if (this.logCounter % 100 == 0) {
                    console.log("this.curPredictions[0]: " + this.curPredictions[0]);
                }
                this.logCounter = this.logCounter + 1;

            } */
        }
    };

    this.setPrediction = function (prediction, playerIndex) {
        this.curPredictions[playerIndex] = prediction;
    };
};