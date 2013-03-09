var assert = require('assert');
var diffArray = require('../.');

describe('random', function(){
	
	createRandomTests(10);

	function createRandomTests(count){
		var index;
		for(index = 0; index < count; index++){
			createTest(
				index
				, randomArray(10000, 100)
				, randomArray(10000, 100)
			);
		}
	}

	function randomArray(count, range){
		var result = [];
		var index;
		for(index = 0; index < count; index++){
			result.push((Math.random() * range) % range)
		}
		return result;
	}

	function createTest(name, from, to){
		it(name, function(){
			var transformations = diffArray(from, to);
			var result = from.slice();
			transformations.forEach(function(transformation){
				switch(transformation.type){
					case 'insert':
					result.splice(transformation.index, 0, transformation.value);
					break;

					case 'delete':
					result.splice(transformation.index, 1);
					break;

				}
			});
			assert.deepEqual(to, result);
		});
	}

});

