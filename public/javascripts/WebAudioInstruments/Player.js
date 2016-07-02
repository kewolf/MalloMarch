/* Player */

const DRUM_CORP = 0;
const PITCHED = 1;
const ELECTRONIC = 2;

var Player = function () {

    //common to all
    this.size = 50;
    this.decay = 0;
    this.level = 1;

    //drummers
    this.nDrummers = 2;
    this.drumPitch = 50;
    this.dynamics = 0; 

    //pitched percussion
    this.range = 0;
    this.vibrato = 0;  
    this.trippiness = 0;

    //electronic
    this.grunge = 0;
    this.electronicPitch = 0;
    this.fatness = 0;

    //setup reverb
    this.mainGain = audioContext.createGain();
    this.mainGain.connect(audioContext.destination);
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

    //create instruments
    this.activeInstrument = PITCHED;
    this.drum_corp = new Drum_Corp();
    this.pitched = new Pitched();
    this.electronic = new Electronic(self);
};

Player.prototype.setReverbBuffer = function (buffer) {
    console.log('loaded reverb impulse');
    this.reverb.buffer = buffer;
};

Player.prototype.schedule = function (time) {

    this.reverbGain.gain.value = this.size / 100.0;
    this.dryGain.gain.value = 1 - (this.size / 100.0) * 0.25;
    this.mainGain.gain.value = this.level;
    // this.dryGain.gain.value = 0;
    console.log('this.reverbGain.gain.value: ' + this.reverbGain.gain.value);

    switch (this.activeInstrument) {
        case DRUM_CORP:
            this.drum_corp.play(time, this);
            break;
        case PITCHED:
            this.pitched.play(time, this);
            break;
        case ELECTRONIC:
            this.electronic.play(time, this);
            break;
        default:
            console.log("fell to the bottom of the active instrument switch statement (we should not have)");
    }
};

// todo: needed for backward compatibility (for now)
Player.prototype.play = function (time) {
    this.schedule(time);
};

Player.prototype.unschedule = function () {
    switch (this.activeInstrument) {
        case DRUM_CORP:
            this.drum_corp.unschedule(this);
            break;
        case PITCHED:
            this.pitched.unschedule();
            break;
        case ELECTRONIC:
            this.electronic.unschedule();
            break;
        default:
            console.log("fell to the bottom of the active instrument switch statement (we should not have)");
    }
};

Player.prototype.getParameters = function() {

    var params = {};
    params['activeInstrument'] = this.activeInstrument;
    params['size'] = this.size;
    params['decay'] = this.decay;

    switch (this.activeInstrument) {
        case DRUM_CORP:
            params['nDrummers'] = this.nDrummers;
            params['drumPitch'] = this.drumPitch;
            params['dynamics'] = this.dynamics;
            break;
        case PITCHED:
            params['range'] = this.range;
            params['vibrato'] = this.vibrato;
            params['trippiness'] = this.trippiness;
            break;
        case ELECTRONIC:
            params['grunge'] = this.grunge;
            params['electronicPitch'] = this.electronicPitch;
            params['fatness'] = this.fatness;
            break;
        default:
            console.log("fell to the bottom of the getParameters switch statement (we should not have)");
    }

    return params;
};

Player.prototype.setParameters = function(params) {
    this.activeInstrument = params['activeInstrument'];
    this.size = params['size'];
    this.decay = params['decay'];

    switch(params['activeInstrument']) {
        case DRUM_CORP:
            this.nDrummers = params['nDrummers'];
            this.drumPitch = params['drumPitch'];
            this.dynamics = params['dynamics'];
            break;
        case PITCHED:
            this.range = params['range'];
            this.vibrato = params['vibrato'];
            this.trippiness = params['trippiness'];
            break;
        case ELECTRONIC:
            this.grunge = params['grunge'];
            this.electronicPitch = params['electronicPitch'];
            this.fatness = params['fatness'];
            break;
        default:
            console.log("fell to the bottom of the setParameters switch statement (we should not have)");
    }
};