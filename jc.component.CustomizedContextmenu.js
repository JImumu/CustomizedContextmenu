var jc=jc||{};
    jc.js=jc.js||{};
    jc.js.util=jc.js.util||{};

(function(nameSpace){
	function CustomizedContextmenu(){
		var _this = this;
		this.staticDomainImg = undefined;
		this.staticDomainVideo = undefined;
		this.staticDomainAudio = undefined;
		this.actionWhenContextmenuShow = undefined;
		this.contextmenuCallerClassName = "customizedContextmenuCaller";
		this.contextmenu = $("<div>");
		this.contextmenu.css({
			"position":"fixed",
			"background-color":"#fff",
			"padding":"5px 5px",
			"text-align":"center",
			"border":"1px solid #aaa",
			"display":"none",
			"box-shadow":"5px 5px 5px 0px #666",
		});
		this.contextmenuItem = [
			{name:"刷新",action:refresh}
		];
		this.initTasks = [bindEventToggleContextmenu];
		function bindEventToggleContextmenu(){
			$("."+_this.contextmenuCallerClassName).on("contextmenu",function(e){
				e.preventDefault();
				$(this).css("background-color","#a5cbf7");
				_this.contextmenuCaller = $(this);
				if(typeof _this.actionWhenContextmenuShow == "function"){
					_this.actionWhenContextmenuShow(this);
				}
				var height =  _this.contextmenu.height(),width = _this.contextmenu.width();
				var x = e.clientX,y = e.clientY;
				x = (x + width) > (window.innerWidth-18) ? (x - width) : x;
				y = (y + height) > (window.innerHeight-18) ? (y - height) : y;
				_this.contextmenu.css({"left":x+"px","top":y+"px",display:"block"});
			});
			$(document).on("mouseup",function(){
				_this.contextmenu.css({display:"none"});
			});
			$(window).on("scroll",function(){
				_this.contextmenu.css({display:"none"});
			});
		};
		function refresh(){
			location.reload();
		}
		
	}
	CustomizedContextmenu.prototype.ContextmenuItem = function(){
		this.name = undefined;
		this.action = undefined;
	};
	CustomizedContextmenu.prototype.init = function(){
		var _this = this;
		_this.initTasks.forEach(function(ele,index){
			ele();
		});
		this.contextmenuItem.forEach(function(ele,index){
			var contextmenuItem = $("<p>"+ele.name+"</p>");
			contextmenuItem.css({
				"border-bottom":"1px solid #ccc",
				"margin":0,
				"padding":"8px 10px",
				"cursor": "pointer",
				"font-family":"微软雅黑"
			});
			contextmenuItem.on("mouseenter",function(){
				$(this).css("background-color","#ccc")
			});
			contextmenuItem.on("mouseleave",function(){
				$(this).css("background-color","transparent")
			});
			contextmenuItem.on("click",function(){
				ele.action();
			});
			_this.contextmenu.append(contextmenuItem);
		});
		$("body").append(_this.contextmenu);
	};
	CustomizedContextmenu.prototype.addItem = function(items){
		if(toString.call(items) == "[object Array]"){
			this.contextmenuItem = this.contextmenuItem.concat(items);
		}else if(toString.call(items) == "[object Object]"){
			this.contextmenuItem.push(items);
		}
	};
	nameSpace.CustomizedContextmenu = CustomizedContextmenu;
})(jc.js.util);
