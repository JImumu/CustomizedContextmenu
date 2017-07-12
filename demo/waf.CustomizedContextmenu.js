var myContextmenu = new jc.js.util.CustomizedContextmenu();

myContextmenu.staticDomainImg = "http://static.biedese.cn/image2/";
myContextmenu.contextmenuCallerClassName = "customizedContextmenuCallerxx";

var newItem = new myContextmenu.contextmenuItemConstructor()
newItem.name = "弹窗1";
newItem.action = function(){
	alert(1);
};
myContextmenu.addItem(newItem);

	


myContextmenu.init();