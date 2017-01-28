var utils = {}
utils.checkKeys = function(array,keys){
 	var tmpArray = array;
	for (var i = tmpArray.length - 1; i >= 0; i--) {
		for (var j = keys.length - 1; j >= 0; j--) {
		    if(keys[j] == tmpArray[i].id ){
		    	delete tmpArray[i];
		        break;
		    }
		};
	};

	return tmpArray;
}


module.exports = utils;
