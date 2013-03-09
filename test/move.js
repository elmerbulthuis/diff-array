var assert = require('assert');
var diffArray = require('../.');

describe('move', function(){
	
	it('reverse', function(){
		assert.deepEqual(diffArray([5, 4, 3, 2, 1], [1, 2, 3, 4, 5]), [
			{
				type: 'insert'
				, index: 0
				, value: 1
			}
			, {
				type: 'insert'
				, index: 1
				, value: 2
			}
			, {
				type: 'insert'
				, index: 2
				, value: 3
			}
			, {
				type: 'insert'
				, index: 3
				, value: 4
			}
			, {
				type: 'delete'
				, index: 5
				, value: 4
			}
			, {
				type: 'delete'
				, index: 5
				, value: 3
			}
			, {
				type: 'delete'
				, index: 5
				, value: 2
			}
			, {
				type: 'delete'
				, index: 5
				, value: 1
			}
	
		]);
	});

});
