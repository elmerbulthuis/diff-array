var assert = require('assert');
var diffArray = require('../.');

describe('deleteAndInsert', function(){
	
	it('keepNone', function(){
		assert.deepEqual(diffArray([1, 3, 5], [2, 4]), [
			{
				type: 'delete'
				, index: 0
				, value: 1
			}
			, {
				type: 'delete'
				, index: 0
				, value: 3
			}
			, {
				type: 'delete'
				, index: 0
				, value: 5
			}
			, {
				type: 'insert'
				, index: 0
				, value: 2
			}
			, {
				type: 'insert'
				, index: 1
				, value: 4
			}
		]);
	});

	it('keepBegin', function(){
		assert.deepEqual(diffArray([1, 3, 5], [1, 2, 4]), [
			{
				type: 'delete'
				, index: 1
				, value: 3
			}
			, {
				type: 'delete'
				, index: 1
				, value: 5
			}
			, {
				type: 'insert'
				, index: 1
				, value: 2
			}
			, {
				type: 'insert'
				, index: 2
				, value: 4
			}
		]);
	});

	it('keepEnd', function(){
		assert.deepEqual(diffArray([1, 3, 5], [2, 4, 5]), [
			{
				type: 'delete'
				, index: 0
				, value: 1
			}
			, {
				type: 'delete'
				, index: 0
				, value: 3
			}
			, {
				type: 'insert'
				, index: 0
				, value: 2
			}
			, {
				type: 'insert'
				, index: 1
				, value: 4
			}
		]);
	});


	it('keepMiddle', function(){
		assert.deepEqual(diffArray([1, 3, 5], [2, 3, 4]), [
			{
				type: 'delete'
				, index: 0
				, value: 1
			}
			, {
				type: 'insert'
				, index: 0
				, value: 2
			}
			, {
				type: 'delete'
				, index: 2
				, value: 5
			}
			, {
				type: 'insert'
				, index: 2
				, value: 4
			}
		]);
	});

	it('keepMiddle2', function(){
		assert.deepEqual(diffArray([1, 1, 3, 3, 5, 5], [2, 2, 3, 3, 4, 4]), [
			{
				type: 'delete'
				, index: 0
				, value: 1
			}
			, {
				type: 'delete'
				, index: 0
				, value: 1
			}
			, {
				type: 'insert'
				, index: 0
				, value: 2
			}
			, {
				type: 'insert'
				, index: 1
				, value: 2
			}
			, {
				type: 'delete'
				, index: 4
				, value: 5
			}
			, {
				type: 'delete'
				, index: 4
				, value: 5
			}
			, {
				type: 'insert'
				, index: 4
				, value: 4
			}
			, {
				type: 'insert'
				, index: 5
				, value: 4
			}
		]);
	});

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

});

