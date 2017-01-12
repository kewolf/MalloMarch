/* Player */

var Player = function () {

    this.pitch1 = 500;
    this.pitch2 = 490;
    this.pitch3 = 510;
    this.volume = 1;
    this.echo = 0;
    this.etheriality = 0;
    this.glimmer = 0;
    this.shift = 0;

    //TODO: delete later
    this.size = 50;

    //the output chain, starting from the destination, instruments connect to this.out
    this.mainGain = audioContext.createGain();
    this.mainGain.connect(audioContext.destination);
    this.muteGain = audioContext.createGain();
    this.muteGain.connect(this.mainGain);
    this.panner = audioContext.createPanner();
    this.panner.connect(this.muteGain);
    this.reverbGain = audioContext.createGain();
    this.reverbGain.connect(this.panner);
    this.reverb = audioContext.createConvolver();
    this.reverb.connect(this.reverbGain);
    this.dryGain = audioContext.createGain();
    this.dryGain.connect(this.panner);

    //create output for instruments to connect to
    this.out = audioContext.createGain();
    this.out.connect(this.reverb);
    this.out.connect(this.dryGain);

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

    this.setReverbBuffer = function (buffer) {
        //console.log('loaded reverb impulse');
        this.reverb.buffer = buffer;
    };

    this.schedule = function (time) {
        this.reverbGain.gain.value = this.size / 100.0;
        this.dryGain.gain.value = 1 - (this.size / 100.0) * 0.25;
        this.mainGain.gain.value = this.volume;
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
        this.voice1.stop();
        this.voice2.stop();
        this.voice3.stop();
    };

    this.getParameters = function () {
        var params = {};
        params['pitch1'] = this.pitch1;
        params['pitch2'] = this.pitch2;
        params['pitch3'] = this.pitch3;
        params['volume'] = this.volume;
        params['echo'] = this.echo;
        params['etheriality'] = this.etheriality;
        params['glimmer'] = this.glimmer;
        params['shift'] = this.shift;
        return params;
    };

    this.setParameters = function (params) {
        console.log(params)
        this.pitch1 = params['pitch1'];
        this.pitch2 = params['pitch2'];
        this.pitch3 = params['pitch3'];
        this.volume = params['volume'];
        this.echo = params['echo'];
        this.etheriality = params['etheriality'];
        this.glimmer = params['glimmer'];
        this.shift = params['shift'];

        this.voice1.setPitch(this.pitch1);
        this.voice2.setPitch(this.pitch2);
        this.voice3.setPitch(this.pitch3);
        this.mainGain.gain.value = Math.min(1,this.volume);
        // echo
        // etheriality
        // glimmer
        // shift
    };

    //setters for the individual parameters
    this.setPitch1 = function(pitch) { this.voice1.setPitch(this.pitch1); };
    this.setPitch2 = function(pitch) { this.voice2.setPitch(this.pitch1); };
    this.setPitch3 = function(pitch) { this.voice3.setPitch(this.pitch1); };
    this.setVolume = function(gain) { this.mainGain.gain.value = Math.min(1, gain); };
    this.setEcho = function(val) { };
    this.setEtheriality = function(val) { };
    this.setGlimmer = function(val) { };
    this.setShift = function(val) { };


}