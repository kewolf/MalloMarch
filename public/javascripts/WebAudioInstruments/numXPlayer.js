/* Player */

var Player = function () {

    this.pitch1 = 0;
    this.pitch2 = 0;
    this.pitch3 = 0;
    this.volume = 0;
    this.echo = 0;
    this.etheriality = 0;
    this.glimmer = 0;
    this.shift = 0;

    //setup reverb
    this.muteGain = audioContext.createGain();
    this.muteGain.connect(audioContext.destination);
    this.mainGain = audioContext.createGain();
    this.mainGain.connect(this.muteGain);
    this.reverbGain = audioContext.createGain();
    this.reverbGain.connect(this.mainGain);
    this.reverb = audioContext.createConvolver();
    this.reverb.connect(this.reverbGain);
    this.dryGain = audioContext.createGain();
    this.dryGain.connect(this.mainGain);

    //create output for instruments to connect to
    this.out = audioContext.createGain();
    this.out.connect(this.reverb);
    this.out.connect(this.dryGain);


    this.voice1 = new NumXVoice(self);

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
        this.mainGain.gain.value = this.level;
        this.voice1.play(time, this);
    };

// todo: needed for backward compatibility (for now)
    this.play = function (time) {
        this.schedule(time);
    };

    this.unschedule = function () {
        //do something
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
        this.pitch = params['pitch'];
        this.volume = params['volume'];
        this.echo = params['echo'];
        this.etheriality = params['etheriality'];
        this.glimmer = params['glimmer'];
        this.shift = params['shift'];
    };
}