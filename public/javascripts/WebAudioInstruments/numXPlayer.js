/* Player */

var Player = function () {

    this.pitch1 = 500;
    this.pitch2 = 490;
    this.pitch3 = 510;
    this.volume = 1;
    this.echo = 0;
    this.ethereality = 0;
    this.glimmer = 0;
    this.shift = 0;

    //the output chain, starting from the destination, instruments connect to this.out
    this.mainGain = audioContext.createGain();
    this.mainGain.connect(audioContext.destination);

    this.muteGain = audioContext.createGain();
    this.muteGain.connect(this.mainGain);

    this.panner = audioContext.createPanner();
    this.panner.connect(this.muteGain);

    // NRev
    this.nReverbGain = audioContext.createGain();
    this.nReverbGain.connect(this.panner);

    this.nReverb = audioContext.createConvolver();
    this.nReverb.connect(this.nReverbGain);

    this.nDryGain = audioContext.createGain();
    this.nDryGain.connect(this.panner);

    // JCRev
    this.jcReverbGain = audioContext.createGain();
    this.jcReverbGain.connect(this.nDryGain);
    this.jcReverbGain.connect(this.nReverb);

    this.jcReverb = audioContext.createConvolver();
    this.jcReverb.connect(this.jcReverbGain);

    this.jcDryGain = audioContext.createGain();
    this.jcDryGain.connect(this.nDryGain);
    this.jcDryGain.connect(this.nReverb);

    //create output for instruments to connect to
    this.out = audioContext.createGain();
    this.out.connect(this.jcReverb);
    this.out.connect(this.jcDryGain);

    this.voice1 = new NumXVoice(this);
    this.voice2 = new NumXVoice(this);
    this.voice3 = new NumXVoice(this);

    // -1 is hard left 1 is hard right
    this.setPanPosition = function (position)
    {
        var x = position,
            y = 0,
            z = 1 - Math.abs(x);
        this.panner.setPosition(x,y,z);
    };


    // methods for muting and unmuting
    this.mute = function () {
        this.muteGain.gain.value = 0;
    };

    this.unmute = function () {
        this.muteGain.gain.value = 1;
    };

    this.setNReverbBuffer = function (buffer) {
        //console.log('loaded reverb impulse');
        this.nReverb.buffer = buffer;
    };

    this.setJcReverbBuffer = function (buffer) {
        //console.log('loaded reverb impulse');
        this.jcReverb.buffer = buffer;
    };

    this.schedule = function (time) {
        this.voice1.play(time, this);
        this.voice2.play(time, this);
        this.voice3.play(time, this);
        // this.env.on();
        console.log("scheduled audio for time: " + time);
    };

// todo: needed for backward compatibility (for now)
    this.play = function (time) {
        this.schedule(time);
    };

    this.unschedule = function () {
        // this.voice1.stop();
        // this.voice2.stop();
        // this.voice3.stop();
    };

    this.getParameters = function () {
        var params = {};
        params['pitch1'] = this.pitch1;
        params['pitch2'] = this.pitch2;
        params['pitch3'] = this.pitch3;
        params['volume'] = this.volume;
        params['echo'] = this.echo;
        params['ethereality'] = this.ethereality;
        params['glimmer'] = this.glimmer;
        params['shift'] = this.shift;
        return params;
    };

    this.setParameters = function (params) {
        console.log(params);
        this.pitch1 = params['pitch1'];
        this.pitch2 = params['pitch2'];
        this.pitch3 = params['pitch3'];
        this.volume = params['volume'];
        this.echo = params['echo'];
        this.ethereality = params['ethereality'];
        this.glimmer = params['glimmer'];
        this.shift = params['shift'];

        this.voice1.setPitch(this.pitch1);
        this.voice2.setPitch(this.pitch2);
        this.voice3.setPitch(this.pitch3);
        this.mainGain.gain.value = this.volume;
        // echo
        this.nReverbGain.gain.value = this.ethereality / 100.0;
        this.nDryGain.gain.value = 1 - (this.ethereality / 100.0) * 0.25;
        this.jcReverbGain.gain.value = this.glimmer / 100.0;
        this.jcDryGain.gain.value = 1 - (this.glimmer / 100.0) * 0.25;
        // shift
    };

    //setters for the individual parameters
    this.setPitch1 = function (pitch) {
        this.pitch1 = pitch;
        this.voice1.setPitch(pitch);
    };
    this.setPitch2 = function(pitch) {
        this.pitch2 = pitch;
        this.voice2.setPitch(pitch); };
    this.setPitch3 = function(pitch) {
        this.pitch3 = pitch;
        this.voice3.setPitch(pitch); };
    this.setVolume = function(volume) {
        this.volume = volume;
        this.mainGain.gain.value = volume; };
    this.setEcho = function(val) {
        this.echo = val;

    };
    this.setEthereality = function(val) {
        this.ethereality = val;
        this.nReverbGain.gain.value = val / 100.0;
        this.nDryGain.gain.value = 1 - (val / 100.0) * 0.25;
    };
    this.setGlimmer = function(val) {
        this.glimmer = val;
        this.jcReverbGain.gain.value = val / 100.0;
        this.jcDryGain.gain.value = 1 - (val / 100.0) * 0.25;
    };
    this.setShift = function(val) {
        this.shift = val;

    };
};