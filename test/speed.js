var assert = require('assert');
var diffArray = require('../.');

describe('speed', function(){
	
	addTest(100, 1000);
	addTest(100, 2000);
	addTest(100, 4000);

	function addTest(iterationCount, size){
		var src = [];
		var dst = [];
		var index;

		for(index = 0; index < size; index++){
			src.push((index * 3 + 0).toString(36));
			src.push((index * 3 + 1).toString(36));
			dst.push((index * 3 + 1).toString(36));
			dst.push((index * 3 + 2).toString(36));
		}

		it(size + ' - ' + iterationCount + 'x', function(){
			var iteration;
			for(iteration = 0; iteration < iterationCount; iteration++){
				diffArray(src, dst);
			}
		});

	}


});

