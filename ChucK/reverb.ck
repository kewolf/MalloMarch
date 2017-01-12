//Impulse i => NRev rev => dac;
Impulse i => JCRev rev => dac;
//Impulse i => dac;

1 => rev.mix;
1.0 => i.next;
5000::ms => now;
