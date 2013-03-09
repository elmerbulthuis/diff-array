var assert = require('assert');
var diffArray = require('../.');

describe('deleteAndInsert', function(){

	it('reverse', function(){
		assert.deepEqual(diffArray([5, 4, 3, 2, 1], [1, 2, 3, 4, 5]), [
			{
				type: 'delete'
				, index: 0
				, value: 5
			}
			, {
				type: 'delete'
				, index: 0
				, value: 4
			}
			, {
				type: 'delete'
				, index: 0
				, value: 3
			}
			, {
				type: 'delete'
				, index: 0
				, value: 2
			}
	
			/*
			this is not optimal
			*/
			, {
				type: 'delete'
				, index: 0
				, value: 1
			}
			, {
				type: 'insert'
				, index: 0
				, value: 1
			}
			/*
			*/

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
				type: 'insert'
				, index: 4
				, value: 5
			}
		]);
	});


	it('repeat', function(){
		assert.deepEqual(diffArray([3, 3, 3, 3, 3], [1, 2, 3, 4, 5]), [
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
				type: 'delete'
				, index: 3
				, value: 3
			}
			, {
				type: 'delete'
				, index: 3
				, value: 3
			}
			, {
				type: 'delete'
				, index: 3
				, value: 3
			}
			, {
				type: 'delete'
				, index: 3
				, value: 3
			}
			, {
				type: 'insert'
				, index: 3
				, value: 4
			}
			, {
				type: 'insert'
				, index: 4
				, value: 5
			}
	
		]);
	});

	it('repeat2', function(){
		assert.deepEqual(diffArray([1, 2, 3, 4, 5], [3, 3, 3, 3, 3]), [
			{
				type: 'delete'
				, index: 0
				, value: 1
			}
			, {
				type: 'delete'
				, index: 0
				, value: 2
			}
			, {
				type: 'delete'
				, index: 1
				, value: 4
			}
			, {
				type: 'delete'
				, index: 1
				, value: 5
			}
			, {
				type: 'insert'
				, index: 1
				, value: 3
			}
			, {
				type: 'insert'
				, index: 2
				, value: 3
			}
			, {
				type: 'insert'
				, index: 3
				, value: 3
			}
			, {
				type: 'insert'
				, index: 4
				, value: 3
			}
	
		]);
	});

});

