var Drum = function(buffer)
{
    this.buffer = buffer;
    this.n_drummers = 1;
    this.size = 0;
    this.decay = 5;
    this.pitch = 2000;
    this.dynamics = 0;
};

Drum.prototype.play = function(time)
{
    this.source = audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(audioContext.destination);
    this.source.detune.value = (this.pitch - 2000);
    this.source.start(AudioContext.currentTime);
};