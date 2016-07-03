Metronome = function (audioContext) {
    this.tempo = 110.0;
    this.tickPeriod = 60.0 / this.tempo;
    this.audioContext = audioContext;
    this.lastTickTime = 0;
    this.intervalLength = 200;
    this.lookahead = this.intervalLength * 1.5 / 1000.0;
    this.syncClient = undefined;

    this.setTempo = function (tempo) {
        console.log("this.setTempo()");
        this.tempo = tempo;
        this.tickPeriod = 60.0 / this.tempo;
    };

    this.setClick = function (buffer) {
        this.buffer = buffer;
    };

    this.setSyncClient = function (syncClient) {
        console.log("called metronome.setSyncClient");
        this.syncClient = syncClient;
        if (this.syncClient == undefined) {
            console.log("this.syncClient is undefined in metronome.setSyncClient");
            return;
        }
    };

    this.start = function () {
        console.log("metronome.start()");
        this.check();
        self = this;
        this.interval = setInterval(function () {
            self.check();
        }, this.intervalLength);
    };

    this.stop = function () {
        console.log("metronome.stop()");
        clearInterval(this.interval);
    };

    //checks if it should schedule a click
    this.check = function () {
        var nextTickTime = (1 + Math.floor(this.syncClient.getTime() / this.tickPeriod)) * this.tickPeriod;
        // console.log("this.tickPeriod: " + this.tickPeriod);
        // console.log("nextTickTime: " + nextTickTime);
        // console.log("this.syncClient.getTime(): " + this.syncClient.getTime());
        // console.log("nextTickTime - this.syncClient.getTime(): " + (nextTickTime - this.syncClient.getTime()));
        // console.log("this.lastTickTime + this.lookahead: " + (this.lastTickTime + this.lookahead));
        if (nextTickTime - this.syncClient.getTime() < this.lookahead &&
            syncClient.getTime() > this.lastTickTime + this.lookahead) {
            this.lastTickTime = (1 + Math.floor(syncClient.getTime() / this.tickPeriod)) * this.tickPeriod;
            this.play(nextTickTime - this.syncClient.getOffset()); // translate from global to browser time and play
        }
    };

    this.play = function (time) {
        console.log("metronome.play()");
        this.source = audioContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(audioContext.destination);
        this.source.start(time);
    }
};