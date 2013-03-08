var assert = require('assert');
var diffArray = require('../.');

describe('deleteOnly', function(){
	
	it('atBegin', function(){
		assert.deepEqual(diffArray([1, 2, 3, 4, 5], [2, 3, 4, 5]), [
			{
				type: 'delete'
				, index: 0
				, value: 1
			}
		]);
	});

	it('atBegin3', function(){
		assert.deepEqual(diffArray([1, 2, 3, 4, 5], [4, 5]), [
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
				, index: 0
				, value: 3
			}
		]);
	});

	it('atEnd', function(){
		assert.deepEqual(diffArray([1, 2, 3, 4, 5], [1, 2, 3, 4]), [
			{
				type: 'delete'
				, index: 4
				, value: 5
			}
		]);
	});

	it('atEnd3', function(){
		assert.deepEqual(diffArray([1, 2, 3, 4, 5], [1, 2]), [
			{
				type: 'delete'
				, index: 2
				, value: 3
			}
			, {
				type: 'delete'
				, index: 2
				, value: 4
			}
			, {
				type: 'delete'
				, index: 2
				, value: 5
			}
		]);
	});

	it('atMiddle', function(){
		assert.deepEqual(diffArray([1, 2, 3, 4, 5], [1, 2, 4, 5]), [
			{
				type: 'delete'
				, index: 2
				, value: 3
			}
		]);
	});

	it('atMiddle3', function(){
		assert.deepEqual(diffArray([1, 2, 3, 4, 5], [1, 5]), [
			{
				type: 'delete'
				, index: 1
				, value: 2
			}
			, {
				type: 'delete'
				, index: 1
				, value: 3
			}
			, {
				type: 'delete'
				, index: 1
				, value: 4
			}
		]);
	});

	it('atBeginEnd', function(){
		assert.deepEqual(diffArray([1, 2, 3, 4, 5], [2, 3, 4]), [
			{
				type: 'delete'
				, index: 0
				, value: 1
			}
			, {
				type: 'delete'
				, index: 3
				, value: 5
			}
		]);
	});

	it('atBeginEndMiddle', function(){
		assert.deepEqual(diffArray([1, 2, 3, 4, 5], [2, 4]), [
			{
				type: 'delete'
				, index: 0
				, value: 1
			}
			, {
				type: 'delete'
				, index: 1
				, value: 3
			}
			, {
				type: 'delete'
				, index: 2
				, value: 5
			}
		]);
	});

});

