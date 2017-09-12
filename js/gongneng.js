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