var NumXVoice = function (player) {

    this.source = audioContext.createOscillator();
    // this.panner = audioContext.createStereoPanner();
    this.adsrAmp = audioContext.createGain();
    this.source.connect(this.adsrAmp);
    this.adsrAmp.gain.value = 1.0;
    this.env = new WebAHDSR(audioContext, this.adsrAmp.gain);
    this.adsrAmp.connect(player.out);


    this.play = function (time, player) {
        this.env.on();
    };

    this.stop = function () {
        this.env.off();
    };
};



