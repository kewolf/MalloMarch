/**
 * Created by kewolf on 6/24/16.
 */

//Constants to be used accross both node.js and the clients:
var InterfaceEnum = Object.freeze({"INFO": 0, "M1": 1, "TUTORIAL": 2, "M2": 3, "SURVEY": 4});

if (typeof window === 'undefined') {
    exports.InterfaceEnum = InterfaceEnum;
} 
