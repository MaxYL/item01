var oCat = document.getElementById("cat");
			myajax.get("http://h6.duchengjiu.top/shop/api_cat.php",{},function(err,responseText){
				var json = JSON.parse(responseText);
				var data = json.data;
				for (var i = 0; i < data.length; i++) {
					var obj = data[i];
					oCat.innerHTML += `<li class="list"><a href="list.html?cat_id=${obj.cat_id}">${obj.cat_name}</a></li>`
				}
			});

		
 var oCarousel = document.querySelector('.vanclFocus');
		    var oLeftBtn = document.querySelector('.leftBtn');
		    var oRightBtn = document.querySelector('.rightBtn');
		    var oCirclesLi = document.querySelector(".circles").querySelectorAll('li');
		    var oMUnit = document.querySelector(".m_unit");
		    var oUl = oMUnit.querySelector('ul');
		    var oLi = oUl.querySelectorAll('li');
		
		    var imgLength = oLi.length;
		    var width = 1200;
		    var animatetime = 600;
		    var tweenString = "ExpoEaseInOut";
		    var interval = 2000;
		    var lock = true;
		    var index = 0; //0 1 2 3 4
		
		    var timer = setInterval(rightBtnHandler, interval);
		    oCarousel.onmouseover = function(){
		      clearInterval(timer);
		    }
		    oCarousel.onmouseout = function() {
		      timer = setInterval(rightBtnHandler, interval);
		    }
		
		    //把0号li克隆，然后添加到carouseUL的最后
		    oUl.appendChild(oLi[0].cloneNode(true));
		
		    oRightBtn.onclick = rightBtnHandler;
		    oLeftBtn.onclick  = function() {
		      if (oMUnit.isAnimated) return;
		
		      index--;
		      if (index < 0) {
		        index = imgLength - 1;
		        oMUnit.style.left = -width * imgLength + 'px';
		      }
		      changeCircles();
		      animate(oMUnit, {"left": -width*index}, animatetime, tweenString);
		    }
		
		    for (var i = 0; i < oCirclesLi.length; i++) {
		      (function(i){
		        oCirclesLi[i].onmouseover = function() {
		          if (oMUnit.isAnimated) return;
		          index = i;
		          changeCircles();
		          animate(oMUnit, {"left": -width*index}, animatetime, tweenString);
		        }
		      })(i);
		    }
		    //如果本身不运动
		function rightBtnHandler() {
      //如果本身在运动，则不做任何事
	      if (oMUnit.isAnimated) return;
	      index++;
	      changeCircles();
	      animate(oMUnit, {"left":-width*index}, animatetime, tweenString, function(){
	        if (index > imgLength - 1) {
	          index = 0;
	          this.style.left = "0px";
	        }
	      });
	    }

    //更换小圆点
    function changeCircles() {
      //n是信号量的副本
      var n = index;
      if (n === imgLength) {
        n = 0;
      }

      for (var i = 0; i < oCirclesLi.length; i++) {
        oCirclesLi[i].className = "";
      }
      oCirclesLi[n].className = "current";
    }
    function BackToTop() {
		this.dom = null;
		this.init();
		this.bindEvent();
	}
	BackToTop.prototype.init = function() {
		this.dom = document.querySelector('#backtotop');
	}
	BackToTop.prototype.bindEvent = function() {
		 this.dom.onclick = function() {
		  scrollAnimate(0, 1000);
		}

		function scrollAnimate(target, timer) {
		  var interval = 20;
		  var frame = 0;
		  var frames = timer / interval;
		  var start = document.body.scrollTop || document.documentElement.scrollTop;
		  var distance = target - start;
		  var timer;
		  clearInterval(timer);
		  timer = setInterval(function(){
			frame++;
			if (frame >= frames) {
			  clearInterval(timer);
			}
			
			document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frame, start, distance, frames);
		  }, interval);

		  function CubicEaseInOut(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			}
		}
	}
    var backtotop = new BackToTop();