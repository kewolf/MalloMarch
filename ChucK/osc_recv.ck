OscRecv recv;
6449 => recv.port;
recv.listen();

recv.event( "/left, i,i,i, f,f,f,f, i, f,f,f,f,f" ) @=> OscEvent oe;

while ( true )
{
    oe => now;
    /*<<< "got a message" >>>;*/
    
    while ( oe.nextMsg() != 0 )
    { 
        oe.getInt() => int msg_id;
       <<< "msg id:", msg_id >>>;

       oe.getInt() => int predicted_time;
       <<< "predicted_time:", predicted_time >>>;

       oe.getInt() => int send_time;
       <<< "send_time:", send_time >>>;

       oe.getFloat() => float tip_velocity;
       <<< "tip_velocity:", tip_velocity >>>;

       oe.getFloat() => float tip_x;
       <<< "tip_x:", tip_x >>>;

       oe.getFloat() => float tip_y;
       <<< "tip_y:", tip_y >>>;

       oe.getFloat() => float tip_z;
       <<< "tip_z:", tip_z >>>;

       oe.getInt() => int millis_since_epoch;
       <<< "millis_since_epoch:", millis_since_epoch >>>;
       <<< "---------------------------------" >>>;
    }
}
