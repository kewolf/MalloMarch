OscRecv recv;
6449 => recv.port;
recv.listen();

recv.event( "/left,   i, i,i, i,i, f,f,f,f, i,i, f,f,f,f,f" ) @=> OscEvent oe;


while ( true )
{
    oe => now;
    /*<<< "got a message" >>>;*/
    
    while ( oe.nextMsg() != 0 )
    { 
        oe.getInt() => int msg_id;
       <<< "msg id:", msg_id >>>;

       oe.getInt() => int predicted_time_lo;
       <<< "predicted_time_lo:", predicted_time_lo >>>;

       oe.getInt() => int predicted_time_hi;
       <<< "predicted_time_hi:", predicted_time_hi >>>;

       oe.getInt() => int send_time_lo;
       <<< "send_time_lo:", send_time_lo >>>;

       oe.getInt() => int send_time_hi;
       <<< "send_time_hi:", send_time_hi >>>;

       oe.getFloat() => float tip_velocity;
       <<< "tip_velocity:", tip_velocity >>>;

       oe.getFloat() => float tip_x;
       <<< "tip_x:", tip_x >>>;

       oe.getFloat() => float tip_y;
       <<< "tip_y:", tip_y >>>;

       oe.getFloat() => float tip_z;
       <<< "tip_z:", tip_z >>>;

       oe.getInt() => int millis_since_epoch_lo;
       <<< "millis_since_epoch_lo:", millis_since_epoch_lo >>>;

       oe.getInt() => int millis_since_epoch_hi;
       <<< "millis_since_epoch_hi:", millis_since_epoch_hi >>>;
       <<< "---------------------------------" >>>;
    }
}
