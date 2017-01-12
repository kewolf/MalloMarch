//Class for the Performer Messages
//DO NOT EDIT
public class PerformerMessage {  
    int id; //from 0 - inf
    
    int predTime_hi; //server time
    int predTime_lo
    int sendTime_hi; //server time
    int sendTime_lo
    
    float velocity; // millimeters/second
    float x; //millimeters
    float y; //millimeters
    float z; //millimeters
    
    int realTime_hi;
    int realTime_lo; 
    
    float c1;
    float c2;
    float c3;
    float c4;
    float c5;
    
    
    function void loadEvent(OscEvent event){
        while(event.nextMsg() != 0){
            event.getInt() => id;
            
            event.getInt() => predTime_hi;
            event.getInt() => predTime_lo;

            event.getInt() => sendTime_hi;
            event.getInt() => sendTime_lo;
            
            event.getFloat() => velocity;
            event.getFloat() => x;
            event.getFloat() => y;
            event.getFloat() => z;
            
            event.getInt() => realTime_hi;
            event.getInt() => realTime_lo;
            
            event.getFloat() => c1;
            event.getFloat() => c2;
            event.getFloat() => c3;
            event.getFloat() => c4;
            event.getFloat() => c5;
        }
    }
    
    function int getID(){
        return id;
    }
    
    function int getPredTime(){
        return predTime;
    }
    
    function int getSendTime(){
        return sendTime;
    }
    
    function float getVelocity(){
        return velocity;
    }
    
    function float getX(){
        return x;
    }
    
    function float getY(){
        return y;
    }
    
    function float getZ(){
        return z;
    }
    
    function int getRealTime(){
        return realTime;
    }
    
    function float getC1(){
        return c1;
    }
    
    function float getC2(){
        return c2;
    }
    
    function float getC3(){
        return c3;
    }
    
    function float getC4(){
        return c4;
    }
    
    function float getC4(){
        return c4;
    }
    
    function float getC5(){
        return c5;
    }
    
    function void printMessage(){
        <<< "Msg id: ", this.getID() >>>;
        <<< "Velocity: ", this.getVelocity() >>>;
        <<< "X Y Z :", this.getX(), " ", this.getY(), " ", this.getZ() >>>;
        //<<< "Composer Defined: ", this.getC1(), " ", this.getC2(), " ", this.getC3(), " ", this.getC4(), " ", this.getC5()>>>;
        // You won't need these
        // <<< "Times: Pred, Send, Real ", this.getPredTime(), " ", this.getSendTime(), " ", this.getRealTime() >>>;   
    }

}