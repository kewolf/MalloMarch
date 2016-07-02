Metronome = function (audioContext) {
    this.lastTickTime = 0;
    this.intervalLength = 200;
    this.lookahead = this.intervalLength * 1.5;

    this.setTempo = function (tempo) {
        this.tempo = tempo;
    };

    this.setClick = function (buffer) {
        this.buffer = buffer;
    };

    this.setSyncClient = function (syncClient) {
        this.syncClient = syncClient;
    }

    this.start = function () {
        this.tickPeriod = 60.0 / this.tempo;
        this.check();
        this.interval = setInterval(this.check(), this.intervalLength);
    };

    this.stop = function () {
        clearInterval(this.interval);
    };

    this.check = function () {
        var nextTickTime = (1 + Math.floor(this.syncClient.getTime() / this.tickPeriod)) * this.tickPeriod;
        if (nextTickTime - this.syncClient.getTime() < this.lookahead &&
            syncClient.getTime() > this.lastTickTime + this.lookahead) {
            this.lastTickTime = (1 + Math.floor(syncClient.getTime() / this.tickPeriod)) * this.tickPeriod;
            this.play(nextTickTime - this.syncClient.getOffset()); // translate from global to browser time and play
        }
    };

    this.play = function (time) {
        this.source = audioContext.createBufferSource();
        this.source.buffer = this.tickSound;
        this.source.connect(audioContext.destination);
        this.source.start(time);
    }
};