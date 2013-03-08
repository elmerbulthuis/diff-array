var assert = require('assert');
var diffArray = require('../.');

describe('insertOnly', function(){
	
	it('atBegin', function(){
		assert.deepEqual(diffArray([2, 3, 4, 5], [1, 2, 3, 4, 5]), [
			{
				type: 'insert'
				, index: 0
				, value: 1
			}
		]);
	});

	it('atBegin3', function(){
		assert.deepEqual(diffArray([4, 5], [1, 2, 3, 4, 5]), [
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
		]);
	});

	it('atEnd', function(){
		assert.deepEqual(diffArray([1, 2, 3, 4], [1, 2, 3, 4, 5]), [
			{
				type: 'insert'
				, index: 4
				, value: 5
			}
		]);
	});

	it('atEnd3', function(){
		assert.deepEqual(diffArray([1, 2], [1, 2, 3, 4, 5]), [
			{
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

	it('atMiddle', function(){
		assert.deepEqual(diffArray([1, 2, 4, 5], [1, 2, 3, 4, 5]), [
			{
				type: 'insert'
				, index: 2
				, value: 3
			}
		]);
	});

	it('atMiddle3', function(){
		assert.deepEqual(diffArray([1, 5], [1, 2, 3, 4, 5]), [
			{
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
		]);
	});

	it('atBeginEnd', function(){
		assert.deepEqual(diffArray([2, 3, 4], [1, 2, 3, 4, 5]), [
			{
				type: 'insert'
				, index: 0
				, value: 1
			}
			, {
				type: 'insert'
				, index: 4
				, value: 5
			}
		]);
	});

	it('atBeginEndMiddle', function(){
		assert.deepEqual(diffArray([2, 4], [1, 2, 3, 4, 5]), [
			{
				type: 'insert'
				, index: 0
				, value: 1
			}
			, {
				type: 'insert'
				, index: 2
				, value: 3
			}
			, {
				type: 'insert'
				, index: 4
				, value: 5
			}
		]);
	});

});

