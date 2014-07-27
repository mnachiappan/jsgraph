graphApp.factory('screenSelector', function screenSelectorFactory () {
	var screenFactory = {};

	screenFactory.screens = ["labelDataSelect", "labelInsert", "dataInsert", "generateCode"];

	screenFactory.toNextScreen = function (currentScreenIndex) {
		if(currentScreenIndex < screenFactory.screens.length - 1){
			return (currentScreenIndex + 1);
		}else{
            return currentScreenIndex;
        }
	};

	screenFactory.toPreviousScreen = function (currentScreenIndex) {
		if(currentScreenIndex >= 1){
			return currentScreenIndex - 1;
		}else{
            return currentScreenIndex;
        }
	};

	screenFactory.isScreenSelected = function (screenName, currentScreenIndex) {
		return screenName === screenFactory.screens[currentScreenIndex];
	};

	return screenFactory;
});