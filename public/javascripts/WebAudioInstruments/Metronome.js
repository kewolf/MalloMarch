Metronome = function (tempo, syncClient, buffer) {
    this.tempo = tempo;
    this.lastTickTime = -1;
    this.intervalLength = 100;
    this.tickSound = buffer;

    this.start();

    this.start = function () {
        this.interval = setInterval(this.check(), this.intervalLength);
    }

    this.stop = function () {
        clearInterval(this.interval);
    }

    this.check = function () {
        if (60.0 / tempo)
            }
}