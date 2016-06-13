/* Player */

const DRUM_CORP = 0;
const PITCHED = 1;
const ELECTRONIC = 2;

var Player = function (drumBuffers, pitchedBuffers, reverbBuffer) {

    //common to all
    this.size = 50;
    this.decay = 0;

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
    
    //output
    this.reverbGain = audioContext.createGain();
    this.reverbGain.connect(audioContext.destination);
    this.reverb = audioContext.createConvolver();
    this.reverb.buffer = this.reverbBuffer;

    this.dryGain = audioContext.createGain();
    this.dryGain.connect(audioContext.destination);

    this.out = audioContext.createGain();
    this.out.gain.value = 1;
    this.out.connect(this.reverb);
    this.reverb.connect(this.reverbGain);
    this.reverbGain.connect(audioContext.destination);
    this.out.connect(this.dryGain);

    //instruments
    this.activeInstrument = ELECTRONIC;
    this.drum_corp = new Drum_Corp(drumBuffers);
    this.pitched = new Pitched(pitchedBuffers);
    this.electronic = new Electronic(self);
};

Player.prototype.play = function (time) {
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