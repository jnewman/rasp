define([
    'dojo/_base/lang',
    'dojo/on', 'dojo/dom-attr', 'dojo/dom-style',  'dojo/_base/array',
        'dojo/domReady!'
], function (
    lang,
    on, domAttr, domStyle, arrayUtils
) {
    var DEFAULT_EVENTS = 'load,select,click,change,focus,blur';
    var FRAME_HEIGHT_ADDIN = 60;
    
   /**
     * @param {Array.<(number|HTMLIFrameElement)>?} targetedFrames
     * @param {(string|Array.<string>)?} events
     * @return {Array.<HTMLIFrameElement>} the effected frames.
     */
    return function (targetedFrames, events) {
        var frames = window.parent.frames,
            len = frames.length,
            windows = [];

        if (targetedFrames && lang.isString(targetedFrames[0])) {
            events = lang.isString(targetedFrames) ? targetedFrames : targetedFrames.join(',');
            targetedFrames = null;
        } else {
            // Make sure events is or the right sort.
            events = !events ? DEFAULT_EVENTS :  
                lang.isArray(events) ? events.join(',') : events;
        }
        
        // Only apply these rules to the chosen frames.
        if (lang.isArray(targetedFrames)) {
            // The windows are higher up, so get those.
            windows = arrayUtils.map(targetedFrames, function (frame) {
                return frame.nodeName ? frame.contentWindow : frames[frame];
            });
        } else { // Get all the frames.
            while (len--) {
                windows.push(frames[len]);
            }
        }
        
        return arrayUtils.forEach(windows, function (win) {
            var frame = win.frameElement;
            var max = domStyle.get(frame, 'max-height');
            var min = domStyle.get(frame, 'min-height');
            var docElement = null;
            
            var resize = function () {
                var scrollPos = [window.scrollX, window.scrollY];
                
                var height = docElement.offsetHeight;
                
                // Make sure we don't exceed max min.
                height = height < min ? 
                    min : max && height > max ? 
                        max : height;
                
                domAttr.set(frame, 'height', String(height + FRAME_HEIGHT_ADDIN) + 'px');
                
                window.scrollTo.apply(window, scrollPos);
            };
                
            // connect to load twice to so resizing on load is optional. 
            on(win, 'load', function() {
                docElement = win.document.documentElement;
            });
            
            // We gotta connect to a lot of events to pull this off in a 
            // cross browser way.
            on(win, events, function () {
                resize();
            });
        });
    };
});
