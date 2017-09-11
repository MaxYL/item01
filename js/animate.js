
function animate(elem, targetJSON, time, tweenString, callback) {	
  if (
    arguments.length < 3
    || typeof arguments[0] != "object"
    || typeof arguments[1] != "object"
    || typeof arguments[2] != "number"
  ) {
    throw new Error('对不起，你传进来的参数数量不对或者参数类型不对，请仔细检查');
  } else if (arguments.length === 3) {
 
    tweenString = 'Linear';
    callback = null;
  } else if (arguments.length === 4) {
    switch (typeof arguments[3]) {
      case "string":
        callback = null;
        break;
      case "function":
        callback = arguments[3];
        tweenString = "Linear";
        break;
      default:
        throw new Error('第4个参数要么是缓冲描述词，要么是回调函数，请检查');
    }
  }
  if(!Tween[tweenString]){
  	throw new Error('缓冲参数错误');
  }

  if (navigator.userAgent.indexOf("MSIE") != -1) {
    var interval = 50;
  } else {
    var interval = 20;
  }
  var originalJSON = {};
  //变化量对象
  var deltaJSON = {};
  for (var k in targetJSON) {
    originalJSON[k] = parseFloat(fetchComputedStyle(elem, k));
    targetJSON[k] = parseFloat(targetJSON[k]);
    deltaJSON[k] = targetJSON[k] - originalJSON[k];
  }
  var frames = time / interval;
  var frame = 0;
  var v;
  elem.isAnimated=true;
  var timer = setInterval(function(){
    for (var k in originalJSON) {
      v = Tween[tweenString](frame, originalJSON[k], deltaJSON[k], frames);
      if (k != "opacity") {
        elem.style[k] = v + 'px';
      } else {
        elem.style[k] = v;
        elem.style.filter = "alpha(opacity=" + (v*100) + ")";
      }
    }

    frame++;
    if (frame >= frames) {
      clearInterval(timer);
      elem.isAnimated=false;
      callback && callback.apply(elem);
    }
  }, interval);
}

function fetchComputedStyle(obj, property) {
  if (window.getComputedStyle) {
    property = property.replace(/[A-Z]/g, function(match){
      return '-' + match.toLowerCase();
    });
    return window.getComputedStyle(obj)[property]; 
  } else {
    property = property.replace(/-([a-z])/g, function(match, $1){
      return $1.toUpperCase();
    });
    return obj.currentStyle[property];
  }
}

var Tween = {
	Linear: function(t,b,c,d){ return c*t/d + b; },
	QuadEaseIn: function(t,b,c,d){
		return c*(t/=d)*t + b;
	},
	QuadEaseOut: function(t,b,c,d){
		return -c *(t/=d)*(t-2) + b;
	},
	QuadEaseInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	CubicEaseIn: function(t,b,c,d){
		return c*(t/=d)*t*t + b;
	},
	CubicEaseOut: function(t,b,c,d){
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	CubicEaseInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	QuartEaseIn: function(t,b,c,d){
		return c*(t/=d)*t*t*t + b;
	},
	QuartEaseOut: function(t,b,c,d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	QuartEaseInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	QuintEaseIn: function(t,b,c,d){
		return c*(t/=d)*t*t*t*t + b;
	},
	QuintEaseOut: function(t,b,c,d){
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	QuintEaseInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	SineEaseIn: function(t,b,c,d){
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	SineEaseOut: function(t,b,c,d){
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	SineEaseInOut: function(t,b,c,d){
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	ExpoEaseIn: function(t,b,c,d){
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	ExpoEaseOut: function(t,b,c,d){
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	ExpoEaseInOut: function(t,b,c,d){
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	CircEaseIn: function(t,b,c,d){
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	CircEaseOut: function(t,b,c,d){
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	CircEaseInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	ElasticEaseIn: function(t,b,c,d,a,p){
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	ElasticEaseOut: function(t,b,c,d,a,p){
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
	},
	ElasticEaseInOut: function(t,b,c,d,a,p){
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	BackEaseIn: function(t,b,c,d,s){
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	BackEaseOut: function(t,b,c,d,s){
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	BackEaseInOut: function(t,b,c,d,s){
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	BounceEaseIn: function(t,b,c,d){
		return c - Tween.BounceEaseOut(d-t, 0, c, d) + b;
	},
	BounceEaseOut: function(t,b,c,d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	BounceEaseInOut: function(t,b,c,d){
		if (t < d/2) return Tween.BounceEaseIn(t*2, 0, c, d) * .5 + b;
		else return Tween.BounceEaseOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
}

function addEvent(obj,eventType,fn){
	if(obj.addEventListener){
		obj.addEventListener(obj,eventType,fn);
	}else if(obj.attachEvent){
		obj.attachEvent("on" + eventtype, function(){
              fn.call(obj);
        	});
	}else{
		obj['on'+eventType]=fn;
	}
}

function removeEvent(obj,eventType,fn){
	if(obj.removeListener){
		obj.removeEventListener(eventType,fn);
	}else if(obj.detachEvent){
		var cli=fn(obj);
		obj.detachEvent('on'+eventType,cli);
	}else{
		obj['on'+eventType]=null;
	}
}
