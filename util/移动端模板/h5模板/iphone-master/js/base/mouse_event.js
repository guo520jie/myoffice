//2020.6.3
(function() {
	$.event.special.mouse_event = {
		setup: function() {
			var _this = $(this);
			var supportTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
			$(this).on(supportTouch?'touchstart':'mousedown',this_touchstart).on(supportTouch?'touchmove':'mousemove',this_touchmove).on(supportTouch?'touchend':'mouseup',this_touchend);
			function this_touchstart(e){
				$(this).trigger("mouse_event").trigger('mouse_down',e.originalEvent.type=='touchstart'?{x:e.originalEvent.touches[0].clientX,y:e.originalEvent.touches[0].clientY}:{x:e.originalEvent.clientX,y:e.originalEvent.clientY});
			}//end func
			function this_touchmove(e){
				$(this).trigger("mouse_event").trigger('mouse_move',e.originalEvent.type=='touchmove'?{x:e.originalEvent.changedTouches[0].clientX,y:e.originalEvent.changedTouches[0].clientY}:{x:e.originalEvent.clientX,y:e.originalEvent.clientY});
			}//end func
			function this_touchend(e){
				$(this).trigger("mouse_event").trigger('mouse_up',e.originalEvent.type=='touchend'?{x:e.originalEvent.changedTouches[0].clientX,y:e.originalEvent.changedTouches[0].clientY}:{x:e.originalEvent.clientX,y:e.originalEvent.clientY});
			}//end func
		}//end setup
	};
	$.each({
		mouse_down: "mouse_event",
		mouse_move: "mouse_event",
		mouse_up: "mouse_event",
	}, function(e, sourceEvent) {
		$.event.special[e] = {
			setup: function() {
				$(this).on(sourceEvent, $.noop);
			}
		}
	});
})();