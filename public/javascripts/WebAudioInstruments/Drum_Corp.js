var Drum = function(buffer)
{
    this.buffer = buffer;
    this.amp = audioContext.createGain();
    this.amp.gain.value = 1.0;
    this.env = new WebAHDSR(audioContext, this.amp.gain);
    this.env.attackTime = 0.001;
    this.env.decayTime = 0.5;
    this.env.sustainValue = 0.0;
};

Drum.prototype.play = function(time, player)
{
    this.source = audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.amp);
    this.amp.connect(player.out);

    // apply parameters
    this.source.detune.value = (player.drumPitch - 50) * 2000;
    this.env.decayTime = 0.01 + (player.decay / 100.0) * 2;
    this.env.on();
    this.source.start(time);
};

var Drum_Corp = function ()
{
    this.drums = [];
};

Drum_Corp.prototype.addDrum = function (buffer) {
    this.drums.push(new Drum(buffer));
};

Drum_Corp.prototype.play = function (time, player)
{
    for (var i = 0; i < Math.min(player.nDrummers, this.drums.length); i++)
    {
        this.drums[i].play(time, player);
    }
};

Drum_Corp.prototype.unschedule = function (player) {
    console.log('cancelling drum');
    for (var i = 0; i < Math.min(player.nDrummers, this.drums.length); i++) {
        this.drums[i].source.stop();
    }
}

