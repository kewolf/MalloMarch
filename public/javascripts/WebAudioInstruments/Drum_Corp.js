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
    this.env.on();
    this.source.start(AudioContext.currentTime);
};

var Drum_Corp = function (buffers)
{
    this.drums = [];
    this.nBuffers = buffers.length;
    for (var i = 0; i < this.nBuffers; i++)
    {
        this.drums.push(new Drum(buffers[i]));
    }
};

Drum_Corp.prototype.play = function (time, player)
{
    player.reverbGain.gain.value = player.size / 100.0;
    player.dryGain.gain.value = 1 - (player.size / 100.0) * 0.25;

    for (var i = 0; i < Math.min(player.nDrummers, this.nBuffers); i++)
    {
        console.log("Played drum " + i);
        this.drums[i].play(time, player);
    }
};

