Interface.docs = {
    "Interface": {
        "text": "<h1 id=\"interface\">Interface</h1>\n\n<p>A singleton object holding all widget constructors and a couple of other methods / properties. It is automatically created as soon as interface.js is loaded.</p>",
        "methods": {"extend": "<h3 id=\"interfaceextendmethod\">Interface.extend : method</h3>\n\n<p>This method deep copies all the properties and methods of one object to another.  </p>\n\n<p>param <strong>destination</strong> Object. The object that properties and methods will be inserted into. <br />\nparam <strong>source</strong> Object. The object providing the properties and methods for copying.  </p>"},
        "properties": {
            "mouseDown": "<h3 id=\"interfacemousedownproperty\">Interface.mouseDown : property</h3>\n\n<p>Boolean. This property tells whether the left mouse button (in non-touch browsers) is currently pressed.</p>",
            "useTouch": "<h3 id=\"interfaceusetouchproperty\">Interface.useTouch : property</h3>\n\n<p>Boolean. Whether or not a touch UI browser is being used.</p>",
            "isAndroid": "<h3 id=\"interfaceisandroidproperty\">Interface.isAndroid : property</h3>\n\n<p>Boolean. Whether or not the browser is running under Android. This is used to determine the range of accelerometer values generated.</p>"
        },
        "type": "Miscellaneous"
    },
    "Interface.Panel": {
        "text": "<h1 id=\"interfacepanelwidget\">Interface.Panel </h1>\n\n<p>A panel is a container for on-screen widgets. There can be multiple panels in a HTML page. Panels are the starting point for event processing in Interface.js.</p>",
        "methods": {
            "touchEvent": "<h3 id=\"interfacepaneltoucheventmethod\">Interface.Panel.touchEvent : method</h3>\n\n<p>The starting point for on-screen all touch event handling in a Panel. This method distributes events to all child widgets.  </p>\n\n<p>param <strong>event</strong> HTML Touch Event Object.</p>",
            "mouseEvent": "<h3 id=\"interfacepanelmouseeventmethod\">Interface.Panel.mouseEvent : method</h3>\n\n<p>The starting point for on-screen all mouse event handling in a Panel. This method distributes events to all child widgets.  </p>\n\n<p>param <strong>event</strong> HTML Mouse Event Object.</p>",
            "init": "<h3 id=\"interfacepanelinitmethod\">Interface.Panel.init : method</h3>\n\n<p>Initialization method called automatically when panel is instantiated.</p>",
            "draw": "<h3 id=\"interfacepaneldrawmethod\">Interface.Panel.draw : method</h3>\n\n<p>This method tells all 'dirty' widgets stored in the shouldDraw property to draw themselves.</p>",
            "refresh": "<h3 id=\"interfacepanelrefreshmethod\">Interface.Panel.refresh : method</h3>\n\n<p>Clear the entire panel and then tell all widgets to draw themselves.</p>",
            "add": "<h3 id=\"interfacepaneladdmethod\">Interface.Panel.add : method</h3>\n\n<p>Add a new widget to the panel  </p>\n\n<p>param <strong>widget</strong> Object. The widget to be added. Motion widgets do not need to be added to the Panel</p>",
            "setBackgroundColor": "<h3 id=\"interfacepanelsetbackgroundcolormethod\">Interface.Panel.setBackgroundColor : method</h3>\n\n<p>Set the background color the panel using a css color value.  </p>\n\n<p>param <strong>cssColor</strong> String. Any valid css color, such as 'red', '#f00', or 'rgb(255,0,0)'.</p>"
        },
        "properties": {
            "children": "<h3 id=\"interfacepanelchildrenproperty\">Interface.Panel.children : property</h3>\n\n<p>Array. An array of all widgets displayed in the panel</p>",
            "shouldDraw": "<h3 id=\"interfacepanelshoulddrawproperty\">Interface.Panel.shouldDraw : property</h3>\n\n<p>Boolean. Whenever the panel refreshes itself it will redraw widgets found in this array.</p>",
            "fps": "<h3 id=\"interfacepanelfpsproperty\">Interface.Panel.fps : property</h3>\n\n<p>Number. The number of times the panel should refresh itself per second.</p>",
            "useRelativeSizesAndPositions": "<h3 id=\"interfacepaneluserelativesizesandpositionsproperty\">Interface.Panel.useRelativeSizesAndPositions : property</h3>\n\n<p>Boolean. This determines whether widgets in the panel uses sizes/positions relative to the size of the panel or use absolute pixel coordinates.</p>",
            "container": "<h3 id=\"interfacepanelcontainerproperty\">Interface.Panel.container : property</h3>\n\n<p>HTMLElement. The HTMLElement (such as a div tag) containing the Panel.</p>",
            "canvas": "<h3 id=\"interfacepanelcanvasproperty\">Interface.Panel.canvas : property</h3>\n\n<p>HTMLElement. The canvas element that the Panel draws onto. This element is created when the panel is initialized.</p>",
            "x": "<h3 id=\"interfacepanelxproperty\">Interface.Panel.x : property</h3>\n\n<p>Number. The x position of the panel in absolute coordinates relative to the window.</p>",
            "y": "<h3 id=\"interfacepanelyproperty\">Interface.Panel.y : property</h3>\n\n<p>Number. The y position of the panel in absolute coordinates relative to the window.</p>",
            "width": "<h3 id=\"interfacepanelwidthproperty\">Interface.Panel.width : property</h3>\n\n<p>Number. The height of the panel in pixels</p>",
            "background": "<h3 id=\"interfacepanelbackgroundproperty\">Interface.Panel.background : property</h3>\n\n<p>String. The default background color for all widgets in the panel. THIS IS NOT THE BACKGROUND COLOR FOR THE PANEL. Any valid css color, such as 'red', '#f00', or 'rgb(255,0,0)' can be assigned to this property.</p>",
            "fill": "<h3 id=\"interfacepanelfillproperty\">Interface.Panel.fill : property</h3>\n\n<p>String. The default fill color for all widgets in the panel. Any valid css color, such as 'red', '#f00', or 'rgb(255,0,0)' can be assigned to this property.</p>",
            "stroke": "<h3 id=\"interfacepanelstrokeproperty\">Interface.Panel.stroke : property</h3>\n\n<p>String. The default stroke color for all widgets in the panel. Any valid css color, such as 'red', '#f00', or 'rgb(255,0,0)' can be assigned to this property.</p>"
        },
        "type": " Widget"
    },
    "Interface.Widget": {
        "text": "<h1 id=\"interfacewidgetwidget\">Interface.Widget </h1>\n\n<p>The prototype object for all Interface.js widgets. These methods and properties are inherited by all widgets.</p>",
        "methods": {
            "ontouchstart": "<h3 id=\"interfacewidgetontouchstartmethod\">Interface.Widget.ontouchstart : method</h3>\n\n<p>Function. A user defined event handler for whenever a touch begins over a widget.</p>",
            "ontouchmove": "<h3 id=\"interfacewidgetontouchmovemethod\">Interface.Widget.ontouchmove : method</h3>\n\n<p>Function. A user defined event handler for whenever a touch moves over a widget.</p>",
            "ontouchend": "<h3 id=\"interfacewidgetontouchendmethod\">Interface.Widget.ontouchend : method</h3>\n\n<p>Function. A user defined event handler for whenever a touch ends.</p>",
            "onmousedown": "<h3 id=\"interfacewidgetonmousedownmethod\">Interface.Widget.onmousedown : method</h3>\n\n<p>Function. A user defined event handler for whenever a mouse press occurs over a widget.</p>",
            "onmousemove": "<h3 id=\"interfacewidgetonmousemovemethod\">Interface.Widget.onmousemove : method</h3>\n\n<p>Function. A user defined event handler for whenever a mouse moves over a widget while its button is pressed.</p>",
            "onmouseup": "<h3 id=\"interfacewidgetonmouseupmethod\">Interface.Widget.onmouseup : method</h3>\n\n<p>Function. A user defined event handler for whenever a mouse press ends.</p>",
            "ontouchmousedown": "<h3 id=\"interfacewidgetontouchmousedownmethod\">Interface.Widget.ontouchmousedown : method</h3>\n\n<p>Function. A user defined event handler for whenever a mouse press or touch occurs over a widget.</p>",
            "ontouchmousemove": "<h3 id=\"interfacewidgetontouchmousemovemethod\">Interface.Widget.ontouchmousemove : method</h3>\n\n<p>Function. A user defined event handler for whenever a mouse or touch moves over a widget.</p>",
            "ontouchmouseup": "<h3 id=\"interfacewidgetontouchmouseupmethod\">Interface.Widget.ontouchmouseup : method</h3>\n\n<p>Function. A user defined event handler for whenever a mouse press ends or a touch leaves the screen.</p>",
            "init": "<h3 id=\"interfacewidgetinitmethod\">Interface.Widget.init : method</h3>\n\n<p>This method is called as soon as widgets are created. It copies properties passed in the constructor to the widget and also copies some default property values.  </p>\n\n<p>param <strong>options</strong> Object. A dictionary of options for the widget to be initilized with.</p>",
            "refresh": "<h3 id=\"interfacewidgetrefreshmethod\">Interface.Widget.refresh : method</h3>\n\n<p>Tell the widget to redraw itself. This method adds the widget to the shouldDraw array of the parent panel.</p>",
            "setValue": "<h3 id=\"interfacewidgetsetvaluemethod\">Interface.Widget.setValue : method</h3>\n\n<p>Programmatically change the value of the widget. You can optionally not have the widget redraw itself when calling this method.  </p>\n\n<p>param <strong>value</strong> Number or String. The new value for the widget. <br />\nparam <strong>doNotDraw</strong> Optional, default false. Whether or not the widget should redraw itself.</p>",
            "hitTest": "<h3 id=\"interfacewidgethittestmethod\">Interface.Widget.hitTest : method</h3>\n\n<p>Given an HTML touch or mouse event, determine if the event overlaps a graphical widget.  </p>\n\n<p>param <strong>event</strong> HTMLEvent. The touch or mouse event to check</p>",
            "draw": "<h3 id=\"interfacewidgetdrawmethod\">Interface.Widget.draw : method</h3>\n\n<p>Tell the widget to draw itself. This method must be overridden by every graphical widget.</p>",
            "mouseEvent": "<h3 id=\"interfacewidgetmouseeventmethod\">Interface.Widget.mouseEvent : method</h3>\n\n<p>The default touch event handler for the widget. This method also calls any user defined touch event handlers. This method should probably never be called manually, but you might want to override it.</p>\n\n<p>param <strong>event</strong> HTMLEvent. The touch event to process</p>",
            "sendTargetMessage": "<h3 id=\"interfacewidgetsendtargetmessagemethod\">Interface.Widget.sendTargetMessage : method</h3>\n\n<p>If the widget has a target and key property, set the key property or call the key method on the target using the widgets current value.</p>",
            "_background": "<h3 id=\"interfacewidget_backgroundmethod\">Interface.Widget._background : method</h3>\n\n<p>returns Color. If the widget has a background color specified, return that, otherwise return the background color of the widget's parent panel.</p>",
            "_stroke": "<h3 id=\"interfacewidget_strokemethod\">Interface.Widget._stroke : method</h3>\n\n<p>returns Color. If the widget has a stroke color specified, return that, otherwise return the stroke color of the widget's parent panel.</p>",
            "_fill": "<h3 id=\"interfacewidget_fillmethod\">Interface.Widget._fill : method</h3>\n\n<p>returns Color. If the widget has a fill color specified, return that, otherwise return the fill color of the widget's parent panel.</p>",
            "_x": "<h3 id=\"interfacewidget_xmethod\">Interface.Widget._x : method</h3>\n\n<p>returns Number. Return the widget's x position as a pixel value relative to the position of the panel. Note that this method will always return the pixel value, even if the panel uses relative values to determine sizes and positions.</p>",
            "_y": "<h3 id=\"interfacewidget_ymethod\">Interface.Widget._y : method</h3>\n\n<p>returns Number. Return the widget's y position as a pixel value relative to the position of the panel. Note that this method will always return the pixel value, even if the panel uses relative values to determine sizes and positions.</p>",
            "_width": "<h3 id=\"interfacewidget_widthmethod\">Interface.Widget._width : method</h3>\n\n<p>returns Number. Return the widget's width. Note that this method will always return a size in pixels, even if the panel uses relative values to determine sizes and positions.</p>",
            "_height": "<h3 id=\"interfacewidget_heightmethod\">Interface.Widget._height : method</h3>\n\n<p>returns Number. Return the widget's height. Note that this method will always return a size in pixels, even if the panel uses relative values to determine sizes and positions.</p>"
        },
        "properties": {
            "x": "<h3 id=\"interfacewidgetxproperty\">Interface.Widget.x : property</h3>\n\n<p>Number. The horizontal position of the widget inside of its parent panel. By default, this position is determined relative to the size of the widget's containing panel, but absolute values can also be used if the panel's useRelativeSizesAndPositions property is set to false.</p>",
            "y": "<h3 id=\"interfacewidgetyproperty\">Interface.Widget.y : property</h3>\n\n<p>Number. The vertical position of the widget inside of its parent panel. By default, this position is determined relative to the size of the widget's containing panel, but absolute values can also be used if the panel's useRelativeSizesAndPositions property is set to false.</p>",
            "width": "<h3 id=\"interfacewidgetwidthproperty\">Interface.Widget.width : property</h3>\n\n<p>Number. The width of the widget. By default, this is determined relative to the size of the widget's containing panel, but absolute values can also be used if the panel's useRelativeSizesAndPositions property is set to false.</p>",
            "height": "<h3 id=\"interfacewidgetheightproperty\">Interface.Widget.height : property</h3>\n\n<p>Number. The width of the widget. By default, this is determined relative to the size of the widget's containing panel, but absolute values can also be used if the panel's useRelativeSizesAndPositions property is set to false.</p>",
            "bounds": "<h3 id=\"interfacewidgetboundsproperty\">Interface.Widget.bounds : property</h3>\n\n<p>Array. A shorthand to set x,y,width and height simultaneously upon initialization. By default, these values are determined relative to the size of the widget's containing panel, but absolute values can also be used if the panel's useRelativeSizesAndPositions property is set to false.</p>",
            "min": "<h3 id=\"interfacewidgetminproperty\">Interface.Widget.min : property</h3>\n\n<p>Number. Default 0. The minimum value the widget should output.</p>",
            "max": "<h3 id=\"interfacewidgetmaxproperty\">Interface.Widget.max : property</h3>\n\n<p>Number. Default 1. The maximum value the widget should output.</p>"
        },
        "type": " Widget"
    },
    "Interface.Slider": {
        "text": "<h1 id=\"interfacesliderwidget\">Interface.Slider </h1>\n\n<p>A vertical or horizontal slider.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>a = new Interface.Slider({ bounds:[0,0,1,.2], isVertical:false }); <br />\npanel = new Interface.Panel();\npanel.add(a);\n</code>  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the slider on initialization.</p>\n\n<hr />",
        "methods": {},
        "properties": {"isVertical": "<h3 id=\"interfacesliderisverticalproperty\">Interface.Slider.isVertical : property</h3>\n\n<p>Boolean. Whether or not the slider draws itself vertically or horizontally. Note this does not affect the boundaries of the slider, just the orientation of the slider's movement.</p>"},
        "type": " Widget"
    },
    "Interface.Crossfader": {
        "text": "<h1 id=\"interfacecrossfaderwidget\">Interface.Crossfader </h1>\n\n<p>A horizontal crossfader.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>a = new Interface.Crossfader({ bounds:[0,0,1,.2], crossfaderWidth:20 }); <br />\npanel = new Interface.Panel();\npanel.add(a);\n</code>  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the crossfader on initialization.</p>\n\n<hr />",
        "methods": {},
        "properties": {"crossfaderWidth": "<h3 id=\"interfacecrossfadercrossfaderwidthproperty\">Interface.Crossfader.crossfaderWidth : property</h3>\n\n<p>Boolean. The width of the rectangle indicating the current position of the crossfader, in pixel values. TODO: use relative values when used by the panel.</p>"},
        "type": " Widget"
    },
    "Interface.Button": {
        "text": "<h1 id=\"interfacebuttonwidget\">Interface.Button </h1>\n\n<p>A button with a variety of on/off modes</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>a = new Interface.Button({ bounds:[0,0,.25,.25], mode:'contact', label:'test' }); <br />\npanel = new Interface.Panel();\npanel.add(a);\n</code>  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the button on initialization.</p>\n\n<hr />",
        "methods": {},
        "properties": {
            "mode": "<h3 id=\"interfacebuttonmodeproperty\">Interface.Button.mode : property</h3>\n\n<p>String. Can be 'toggle', 'momentary' or 'contact'. In toggle mode, the button turns on when it is pressed and off when it is pressed again. In momentary mode, the button turns on when pressed and off when released. In contact mode, the button briefly flashes when pressed and sends its value.</p>",
            "label": "<h3 id=\"interfacebuttonlabelproperty\">Interface.Button.label : property</h3>\n\n<p>String. A text label to print in the center of the button.</p>"
        },
        "type": " Widget"
    },
    "Interface.ButtonV": {
        "text": "<h1 id=\"interfacebuttonvwidget\">Interface.ButtonV </h1>\n\n<p>A button with a customizable shape and variety of on/off modes</p>\n\n<p>*contributed by Jonathan Simozar</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p>`a = new Interface.ButtonV({\n  bounds:[.25,0,.125,.8], \n  points: [{x:1,y:0},{x:.5,y:0},{x:.5,y:.5},{x:0,y:.5},{x:0,y:1},{x:1,y:1},{x:1,y:0}],\n  mode:'contact',\n  label:'test',\n  textLocation : {x:.5, y:.75},\n});</p>\n\n<p>panel = new Interface.Panel();</p>\n\n<p>panel.add(a);\n`</p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the button on initialization.</p>\n\n<hr />",
        "methods": {},
        "properties": {
            "points": "<h3 id=\"interfacebuttonvpointsproperty\">Interface.ButtonV.points : property</h3>\n\n<p>Array. A set of coordinates used to customize the button shape. The coordinates are connected in the order of the indices. The first and last point must be the same.</p>",
            "mode": "<h3 id=\"interfacebuttonvmodeproperty\">Interface.ButtonV.mode : property</h3>\n\n<p>String. Can be 'toggle', 'momentary' or 'contact'. In toggle mode, the button turns on when it is pressed and off when it is pressed again. In momentary mode, the button turns on when pressed and off when released. In contact mode, the button briefly flashes when pressed and sends its value.</p>",
            "label": "<h3 id=\"interfacebuttonvlabelproperty\">Interface.ButtonV.label : property</h3>\n\n<p>String. A text label to print at the textLocation coordinates of the button.</p>",
            "textLocation": "<h3 id=\"interfacebuttonvtextlocationproperty\">Interface.ButtonV.textLocation : property</h3>\n\n<p>Set. A set of x and y coordinates which position the the label within the bounds.</p>"
        },
        "type": " Widget"
    },
    "Interface.Piano": {
        "text": "<h1 id=\"interfacepianowidget\">Interface.Piano </h1>\n\n<p>A piano with adjustable ranges of pitches </p>\n\n<p>*contributed by Jonathan Simozar</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>var c = new Interface.Piano({ \n  bounds:[0,0,.8,.5], <br />\n  startletter : \"C\",\n   startoctave : 3,\n   endletter : \"C\",\n   endoctave : 5,\n   noteLabels : true, \n   target: synth,\n   onvaluechange : function() {this.target.note (this.frequency, this.value)},\n});\npanel = new Interface.Panel();\npanel.add(a);\n</code></p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the piano on initialization.</p>\n\n<hr />",
        "methods": {"onvaluechange": "<h3 id=\"interfacepianoonvaluechangemethod\">Interface.Piano.onvaluechange : method</h3>\n\n<p>The event handler fired whenever a piano update is received. Used to fire the the event handler for when a button update is recieved.</p>"},
        "properties": {
            "endoctave": "<h3 id=\"interfacepianoendoctaveproperty\">Interface.Piano.endoctave : property</h3>\n\n<p>Number. A number corresponding to the ending octave of the last note in the desired range.</p>",
            "startletter": "<h3 id=\"interfacepianostartletterproperty\">Interface.Piano.startletter : property</h3>\n\n<p>String. A letter corresponding to the starting pitch for the desired range. To start on an accidental use sharps, not flats. For example, C#.</p>",
            "startoctave": "<h3 id=\"interfacepianostartoctaveproperty\">Interface.Piano.startoctave : property</h3>\n\n<p>Number. A number corresponding to the starting octave of the first note in the desired range.</p>",
            "endletter": "<h3 id=\"interfacepianoendletterproperty\">Interface.Piano.endletter : property</h3>\n\n<p>String. A letter corresponding to the ending pitch for the desired range. To end on an accidental use sharps, not flats. For example, C#.</p>",
            "noteLabels": "<h3 id=\"interfacepianonotelabelsproperty\">Interface.Piano.noteLabels : property</h3>\n\n<p>Boolean. A boolean corresponding to showing the note labels when true and hiding the note labels when false.</p>",
            "target": "<h3 id=\"interfacepianotargetproperty\">Interface.Piano.target : property</h3>\n\n<p>Object. The instrument used to make sound on each key.</p>"
        },
        "type": " Widget"
    },
    "Interface.Knob": {
        "text": "<h1 id=\"interfaceknobwidget\">Interface.Knob </h1>\n\n<p>A virtual knob.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>a = new Interface.Knob({ x:.1, y:.1, radius:.3 }); <br />\npanel = new Interface.Panel();\npanel.add(a);\n</code>  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the knob on initialization.</p>\n\n<hr />",
        "methods": {},
        "properties": {
            "radius": "<h3 id=\"interfaceknobradiusproperty\">Interface.Knob.radius : property</h3>\n\n<p>Number. The size of the Knob.</p>",
            "knobBuffer": "<h3 id=\"interfaceknobknobbufferproperty\">Interface.Knob.knobBuffer : property</h3>\n\n<p>Number. The size of the space in the middle of the knob.</p>",
            "centerZero": "<h3 id=\"interfaceknobcenterzeroproperty\">Interface.Knob.centerZero : property</h3>\n\n<p>Number. If true, the knob is centered at zero. Useful for panning knobs.</p>",
            "usesRotation": "<h3 id=\"interfaceknobusesrotationproperty\">Interface.Knob.usesRotation : property</h3>\n\n<p>Number. If true, the knob value is determined by the slope of the touch or mouse event in relation to the knob. When false, the user simply presses the knob and moves their finger/mouse up and down to change its value.</p>"
        },
        "type": " Widget"
    },
    "Interface.XY": {
        "text": "<h1 id=\"interfacexywidget\">Interface.XY </h1>\n\n<p>A multitouch XY controller with optional built-in physics.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>a = new Interface.XY({ x:0, y:0, numChildren:2 }); <br />\npanel = new Interface.Panel();\npanel.add(a);\n</code>  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the XY on initialization.</p>\n\n<hr />",
        "methods": {"animate": "<h3 id=\"interfacexyanimatemethod\">Interface.XY.animate : method</h3>\n\n<p>This is called to run the physics engine, draw widgets with updated positions, change values of widgets and call appropriate event handlers.</p>"},
        "properties": {
            "childWidth": "<h3 id=\"interfacexychildwidthproperty\">Interface.XY.childWidth : property</h3>\n\n<p>Number. The size of the children, currently in pixels. TODO: use relative values when the panel is using relative sizes and positions.</p>",
            "usePhysics": "<h3 id=\"interfacexyusephysicsproperty\">Interface.XY.usePhysics : property</h3>\n\n<p>Boolean. Wheter or not the physics engine should be turned on.</p>",
            "friction": "<h3 id=\"interfacexyfrictionproperty\">Interface.XY.friction : property</h3>\n\n<p>Number. Default .9. The amount of friction in the physics system. High values mean children will decelerate quicker.</p>",
            "maxVelocity": "<h3 id=\"interfacexymaxvelocityproperty\">Interface.XY.maxVelocity : property</h3>\n\n<p>Number. Default 10. The maximum velocity for each child.</p>",
            "detectCollisions": "<h3 id=\"interfacexydetectcollisionsproperty\">Interface.XY.detectCollisions : property</h3>\n\n<p>Boolean. Default true. When true, children bounce off one another.</p>",
            "values": "<h3 id=\"interfacexyvaluesproperty\">Interface.XY.values : property</h3>\n\n<p>Array. An array of objects taking the form {x,y} that store the x and y positions of every child. So, to get the x position of child #0: myXY.values[0].x</p>",
            "children": "<h3 id=\"interfacexychildrenproperty\">Interface.XY.children : property</h3>\n\n<p>Array. An array of objects representing the various children of the widget.</p>"
        },
        "type": " Widget"
    },
    "Interface.Menu": {
        "text": "<h1 id=\"interfacemenuwidget\">Interface.Menu </h1>\n\n<p>A multi-option dropdown menu.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>a = new Interface.Menu({x:0, y:0, options:['red', 'yellow', 'green'] }); <br />\na.onvaluechange = function() { b.background = this.value; } <br />\nb = new Interface.Slider({x:.5, y:.5, width:.2, height:.3}); <br />\npanel = new Interface.Panel(); <br />\npanel.add(a,b);\n</code>  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the menu on initialization.</p>\n\n<hr />",
        "methods": {"onvaluechange": "<h3 id=\"interfacemenuonvaluechangemethod\">Interface.Menu.onvaluechange : method</h3>\n\n<p>The event handler fired whenever the selected menu option changes.  </p>\n\n<p>param <strong>newValue</strong> Number or String. The new menu value.\nparam <strong>oldValue</strong> Number or String. The previous menu value.</p>"},
        "properties": {
            "options": "<h3 id=\"interfacemenuoptionsproperty\">Interface.Menu.options : property</h3>\n\n<p>Array. A list of values found in the menu.</p>",
            "css": "<h3 id=\"interfacemenucssproperty\">Interface.Menu.css : property</h3>\n\n<p>Object. A dictionary of css keys / values to be applied to the menu.</p>"
        },
        "type": " Widget"
    },
    "Interface.Label": {
        "text": "<h1 id=\"interfacelabelwidget\">Interface.Label </h1>\n\n<p>A single line of text</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>a = new Interface.Label({x:0, y:0, width:.5, height:.5, value:'test label', size:14 }); <br />\nb = new Interface.Slider({x:.5, y:.5, width:.2, height:.3, onvaluechange: function() { a.setValue( this.value; ) } }); <br />\npanel = new Interface.Panel(); <br />\npanel.add(a,b);\n</code>  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the label on initialization.</p>\n\n<hr />",
        "methods": {},
        "properties": {
            "size": "<h3 id=\"interfacelabelsizeproperty\">Interface.Label.size : property</h3>\n\n<p>Number. The size in pixels for the font</p>",
            "style": "<h3 id=\"interfacelabelstyleproperty\">Interface.Label.style : property</h3>\n\n<p>String. Text style. Maybe be 'normal', 'bold' or 'italics'.</p>",
            "hAlign": "<h3 id=\"interfacelabelhalignproperty\">Interface.Label.hAlign : property</h3>\n\n<p>String. Horizontal alignment of text. Maybe be 'left', 'right' or 'center'.</p>",
            "vAlign": "<h3 id=\"interfacelabelvalignproperty\">Interface.Label.vAlign : property</h3>\n\n<p>String. Vertical alignment of text. Maybe be 'top', 'bottom' or 'middle'.</p>",
            "font": "<h3 id=\"interfacelabelfontproperty\">Interface.Label.font : property</h3>\n\n<p>String. The font to use for text. Examples include 'sans-serif', 'Courier', 'Helvetica'</p>"
        },
        "type": " Widget"
    },
    "Interface.TextField": {
        "text": "<h1 id=\"interfacetextfieldwidget\">Interface.TextField </h1>\n\n<p>A single line text field for user input. This widget is not drawn with canvas, it is an HTML <input> tag.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>a = new Interface.TextField({x:0, y:0, width:.5, height:.5, value:'starting value', onvaluechange: function() { alert( this.value ); } }); <br />\npanel = new Interface.Panel(); <br />\npanel.add(a);\n</code>  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the textfield on initialization.</p>\n\n<hr />",
        "methods": {},
        "properties": {
            "fontSize": "<h3 id=\"interfacetextfieldfontsizeproperty\">Interface.TextField.fontSize : property</h3>\n\n<p>Number. The size in pixels for the font used in the text field</p>",
            "css": "<h3 id=\"interfacetextfieldcssproperty\">Interface.TextField.css : property</h3>\n\n<p>Object. Extra css that you would like to apply to the input element</p>"
        },
        "type": " Widget"
    },
    "Interface.MultiSlider": {
        "text": "<h1 id=\"interfacemultisliderwidget\">Interface.MultiSlider </h1>\n\n<p>Multiple vertical sliders that share the same event handlers and colors. When a MultiSlider sends OSC, it comes in the form of an integer (representing the\nnumber of the slide moved) and a float (representing the value of the slider moved). Any onvaluechange method attached to the MultiSlider widget should have a\nsimilar signature; see the example below.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>b = new Interface.Label({ bounds:[.5,.5,.5,.5], size:12 });\na = new Interface.MultiSlider({ \n  bounds:[0,0,.5,.5], \n  fill:'red', \n  count:8,\n  onvaluechange : function( sliderNumber, sliderValue) { b.setValue('number : ' + sliderNumber + ', value : ' + sliderValue) },\n}); <br />\npanel = new Interface.Panel(); <br />\npanel.add(a,b);\n</code>  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the multislider on initialization.</p>\n\n<hr />",
        "methods": {},
        "properties": {"count": "<h3 id=\"interfacemultislidercountproperty\">Interface.MultiSlider.count : property</h3>\n\n<p>Number. The number of sliders in the widget</p>"},
        "type": " Widget"
    },
    "Interface.MultiButton": {
        "text": "<h1 id=\"interfacemultibuttonwidget\">Interface.MultiButton </h1>\n\n<p>Multiple buttons that share the same event handlers and colors. When a MultiButton sends OSC, it comes in the form of three integers representing the row of the button\npressed, the column of the button pressed, and the button's value. Any onvaluechange method attached to the MultiButton widget should have a\nsimilar signature; see the example below.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p><code>b = new Interface.Label({ bounds:[.5,.5,.5,.5], size:12 });\na = new Interface.MultiButton({ \n  bounds:[0,0,.5,.5], \n  fill:'white',\n  rows: 4,\n  columns: 4,\n  onvaluechange : function( row, column, value) { b.setValue('row : ' + row + ', column : ' + column + ', value : ' + value) },\n}); <br />\npanel = new Interface.Panel(); <br />\npanel.add(a,b);\n</code>  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the multibutton on initialization.</p>\n\n<hr />",
        "methods": {},
        "properties": {
            "rows": "<h3 id=\"interfacemultibuttonrowsproperty\">Interface.MultiButton.rows : property</h3>\n\n<p>Number. The number of rows of buttons in the widgets. When combined with the columns property this determines the overall number of buttons in the widget.</p>",
            "columns": "<h3 id=\"interfacemultibuttoncolumnsproperty\">Interface.MultiButton.columns : property</h3>\n\n<p>Number. The number of columns of buttons in the widgets. When combined with the rows property this determines the overall number of buttons in the widget.</p>",
            "mode": "<h3 id=\"interfacemultibuttonmodeproperty\">Interface.MultiButton.mode : property</h3>\n\n<p>String. Can be 'toggle', 'momentary' or 'contact'. In toggle mode, the button turns on when it is pressed and off when it is pressed again. In momentary mode, the button turns on when pressed and off when released. In contact mode, the button briefly flashes when pressed and sends its value.</p>"
        },
        "type": " Widget"
    },
    "Interface.Accelerometer": {
        "text": "<h1 id=\"interfaceaccelerometerwidget\">Interface.Accelerometer </h1>\n\n<p>Access to the Accelerometer. Unlike the Orientation widget, this is only found on mobile devices.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p>`var a = new Interface.Panel(); <br />\nvar accelerometer = new Interface.Accelerometer({ <br />\n  onvaluechange : function(<em>x,</em>y,<em>z) { <br />\n    x.setValue(</em>x); <br />\n    y.setValue(<em>y); <br />\n    z.setValue(</em>z); <br />\n  } <br />\n}).start(); <br />\nvar x = new Interface.Slider({ <br />\n  label: 'x', <br />\n  bounds:[.05,.05,.2,.9] <br />\n}); <br />\nvar y = new Interface.Slider({ <br />\n  label: 'y', <br />\n  bounds:[.25,.05,.2,.9] <br />\n}); <br />\nvar z = new Interface.Slider({ <br />\n  label: 'z', <br />\n  bounds:[.45,.05,.2,.9] <br />\n});  </p>\n\n<p>a.background = 'black'; <br />\na.add(x,y,z); <br />\n`  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the accelerometer on initialization.</p>\n\n<hr />",
        "methods": {
            "start": "<h3 id=\"interfaceaccelerometerstartmethod\">Interface.Accelerometer.start : method</h3>\n\n<p>Starts emitting values from the Accelerometer measurements</p>",
            "stop": "<h3 id=\"interfaceaccelerometerstopmethod\">Interface.Accelerometer.stop : method</h3>\n\n<p>Stop emitting values from the Accelerometer measurements</p>",
            "onvaluechange": "<h3 id=\"interfaceaccelerometeronvaluechangemethod\">Interface.Accelerometer.onvaluechange : method</h3>\n\n<p>The event handler fired whenever an accelerometer update is received</p>\n\n<p>param <strong>x</strong> Number. The x-acceleration of the sensor\nparam <strong>y</strong> Number. The y-acceleration of the sensor\nparam <strong>x</strong> Number. The z-acceleration of the sensor</p>"
        },
        "properties": {
            "x": "<h3 id=\"interfaceaccelerometerxproperty\">Interface.Accelerometer.x : property</h3>\n\n<p>Number. A read-only property that gives the current accleration on the x-axis</p>",
            "y": "<h3 id=\"interfaceaccelerometeryproperty\">Interface.Accelerometer.y : property</h3>\n\n<p>Number. A read-only property that gives the current accleration on the y-axis</p>",
            "z": "<h3 id=\"interfaceaccelerometerzproperty\">Interface.Accelerometer.z : property</h3>\n\n<p>Number. A read-only property that gives the current accleration on the z-axis</p>"
        },
        "type": " Widget"
    },
    "Interface.Orientation": {
        "text": "<h1 id=\"interfaceorientationwidget\">Interface.Orientation </h1>\n\n<p>Access to the device's Orientation. This is only found on mobile devices, with the exception of Google Chrome, which provides pitch and roll.</p>\n\n<h2 id=\"exampleusage\">Example Usage</h2>\n\n<p>`var a = new Interface.Panel()  </p>\n\n<p>var orientation = new Interface.Orientation({ <br />\n  onvaluechange : function(<em>pitch, _roll, _yaw, _heading) { <br />\n    pitch.setValue(</em>pitch); <br />\n    roll.setValue(<em>roll); <br />\n    yaw.setValue(</em>yaw); <br />\n  } <br />\n}); <br />\nvar pitch = new Interface.Slider({ <br />\n  label: 'pitch', <br />\n  bounds:[.05,.05,.2,.9] <br />\n}); <br />\nvar roll = new Interface.Slider({ <br />\n  label: 'roll', <br />\n  bounds:[.25,.05,.2,.9] <br />\n}); <br />\nvar yaw = new Interface.Slider({ <br />\n  label: 'yaw', <br />\n  bounds:[.45,.05,.2,.9] <br />\n});  </p>\n\n<p>a.add(pitch, roll, yaw);\n`  </p>\n\n<h2 id=\"constructor\">Constructor</h2>\n\n<p><strong>param</strong> <em>properties</em>: Object. A dictionary of property values (see below) to set for the orientation on initialization.</p>\n\n<hr />",
        "methods": {
            "start": "<h3 id=\"interfaceorientationstartmethod\">Interface.Orientation.start : method</h3>\n\n<p>Starts emitting values from the Orientation measurements</p>",
            "stop": "<h3 id=\"interfaceorientationstopmethod\">Interface.Orientation.stop : method</h3>\n\n<p>Stop emitting values from the Orientation measurements</p>",
            "onvaluechange": "<h3 id=\"interfaceorientationonvaluechangemethod\">Interface.Orientation.onvaluechange : method</h3>\n\n<p>The event handler fired whenever an orientation update is received</p>\n\n<p>param <strong>pitch</strong> Number. The pitch of the sensor\nparam <strong>roll</strong> Number. The roll of the sensor\nparam <strong>yaw</strong> Number. The yaw of the sensor\nparam <strong>heading</strong> Number. The heading of the sensor, this corresponds to the compass direction detected.</p>"
        },
        "properties": {
            "pitch": "<h3 id=\"interfaceorientationpitchproperty\">Interface.Orientation.pitch : property</h3>\n\n<p>Number. A read-only property that gives the current orientation on the x-axis</p>",
            "roll": "<h3 id=\"interfaceorientationrollproperty\">Interface.Orientation.roll : property</h3>\n\n<p>Number. A read-only property that gives the current orientation on the y-axis</p>",
            "yaw": "<h3 id=\"interfaceorientationyawproperty\">Interface.Orientation.yaw : property</h3>\n\n<p>Number. A read-only property that gives the current orientation on the z-axis</p>"
        },
        "type": " Widget"
    }
}