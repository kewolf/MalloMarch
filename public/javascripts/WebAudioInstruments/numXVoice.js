var NumXVoice = function (player) {
    this.source = audioContext.createOscillator();
    this.source.start();
    this.adsrAmp = audioContext.createGain();
    this.source.connect(this.adsrAmp);
    this.adsrAmp.gain.value = 0;
    this.env = new WebAHDSR(audioContext, this.adsrAmp.gain);
    this.env.attackTime = 0.01;
    this.env.decayTime = 0.6;
    this.env.sustainValue = 0.0;
    this.env.releaseTime = 0.1;
    this.outAmp = audioContext.createGain();
    this.outAmp.gain.value = 0.50;
    this.adsrAmp.connect(this.outAmp);
    this.outAmp.connect(player.out);


    this.play = function (time, velocity, player) {
        var gain = 0.1 + Math.min(0.6, -velocity/9000);
        this.outAmp.gain.value = gain;
        this.env.on();
        console.log("gain: " + gain);
    };


    this.stop = function () {
        this.env.off();
    };

    this.setPitch = function(frequency) {
        // console.log("frequency: " + frequency);
        this.source.frequency.value = frequency;
    }

};



