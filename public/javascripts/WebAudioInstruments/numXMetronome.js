Metronome = function (audioContext, logger) {
    this.tempo = 110.0;
    this.numBeatsInMeasure = 8;
    this.tickPeriod = 60.0 / this.tempo;
    this.audioContext = audioContext;
    this.lastTickTime = 0;
    this.intervalLength = 200;
    this.lookahead = this.intervalLength * 1.5 / 1000.0;
    this.syncClient = undefined;
    this.curMeasureNum = 0;
    this.curBeatNum = 0;
    this.volume = 0.8;

    this.setTempo = function (tempo) {
        //console.log("this.setTempo()");
        if (logger && this.syncClient) {
            logger.info("{ \"UPBPM\" : " + this.numBeatsInMeasure + ", \"global_time\" : " + syncClient.getTime() + ", \"bpm\" : " + tempo + "}");
        }
        this.tempo = tempo;
        this.tickPeriod = 60.0 / this.tempo;
    };

    this.setClick = function (buffer) {
        this.buffer = buffer;
    };

    this.setClick2 = function (buffer) {
        this.buffer2 = buffer;
    };

    this.setSyncClient = function (syncClient) {
        //console.log("called metronome.setSyncClient");
        this.syncClient = syncClient;
        if (this.syncClient == undefined) {
            console.log("this.syncClient is undefined in metronome.setSyncClient");
            return;
        }
    };

    this.start = function () {
        //console.log("metronome.start()");
        if (logger && this.syncClient) {
            logger.info("{ \"FLPME\" : " + 1 + ", \"global_time\" : " + syncClient.getTime() + ", \"bpm\" : " + this.tempo + "}");
        }
        this.check();
        self = this;
        this.interval = setInterval(function () {
            self.check();
        }, this.intervalLength);
    };

    this.stop = function () {
        //console.log("metronome.stop()");
        if (logger && this.syncClient) {
            logger.info("{ \"FLPME\" : " + 0 + ", \"global_time\" : " + syncClient.getTime() + ", \"bpm\" : " + this.tempo + "}");
        }
        clearInterval(this.interval);
    };

    //checks if it should schedule a click or a measure change
    this.check = function () {
        var numTicksSoFar = Math.floor(this.syncClient.getTime() / this.tickPeriod);
        var oldMeasureNum = this.curMeasureNum;
        var oldBeatNum = this.curBeatNum;
        this.curMeasureNum = Math.floor(numTicksSoFar / this.numBeatsInMeasure) + 1;
        this.curBeatNum = numTicksSoFar % this.numBeatsInMeasure + 1;
        var nextTickTime = (numTicksSoFar + 1) * this.tickPeriod;
        if (nextTickTime - this.syncClient.getTime() < this.lookahead &&
            syncClient.getTime() > this.lastTickTime + this.lookahead) {
            this.lastTickTime = (1 + Math.floor(syncClient.getTime() / this.tickPeriod)) * this.tickPeriod;
            this.play(nextTickTime - this.syncClient.getOffset()); // translate from global to browser time and play
        }
    };

    this.play = function (time) {
        var source = audioContext.createBufferSource();
        source.buffer = (this.curBeatNum == 8) ? this.buffer : this.buffer2;
        var volume = audioContext.createGain();
        volume.gain.value = this.volume;
        source.connect(volume);
        volume.connect(audioContext.destination);
        source.start(time);
        if (logger && this.syncClient) {
            logger.info("{ \"METRO\" : " + this.curMeasureNum + ", \"beat\" : " + this.curBeatNum + ", \"global_time\" : " + syncClient.getTime() + "}");
        }
    };

    this.setVolume = function(volume) { this.volume = volume; };
};