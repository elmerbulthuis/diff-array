module.exports = (function(){

	return diffArray;

	function diffArray(from, to){
		/*
		result will hold the transformations (in order) that need to 
		be done to make the from array equal to the to array
		*/
		var result = [];
		var fromValue, fromIndex, fromCount, fromOffset;
		var toValue, toIndex, toCount, toMap;

		to = to || [];
		toIndex = 0;
		toCount = to.length;
		/*
		Buld an index for the two arrays to speed up the process. Do
		note that due to this optimization all values in the array will
		be transformed to strings. So the number 1 will be equal to the
		string '1'. Also all objects will converted to strings (via
		toString) and therefore probably considered equal.
		*/
		toMap = to.reduce(function(result, value, index){
			if(value in result) result[value].push(index);
			else result[value] = [index];
			return result;
		}, {});

		from = from || [];
		fromIndex = 0;
		fromCount = from.length;
		fromOffset = 0;
		
		/*
		loop until we reach the end of one of the two arrays
		*/
		while(
			fromIndex < fromCount 
			&& toIndex < toCount
		){
			fromValue = from[fromIndex];
			toValue = to[toIndex];

			/*
			when the two values are equal, no transformation is required.
			*/
			if(fromValue === toValue){
				fromIndex++;
				toIndex++;
			}
			else{
				/*
				if fromValue is not in the remainder of the to array
				*/
				// if(~to.indexOf(fromValue, toIndex)){	
				if(
					fromValue in toMap
					&& toMap[fromValue].some(function(value){
						return toIndex <= value;
					})
				){
					result.push({
						type: 'insert'
						, index: fromIndex + fromOffset
						, value: toValue
					});
					toIndex++;
					fromOffset++;
				}
				else{
					result.push({
						type: 'delete'
						, index: toIndex
						, value: fromValue
					});
					fromIndex++;
					fromOffset--;
				}

			}

		}

		return result
		/*
		add the remainder of the from array to the result as deletions
		*/
		.concat(
			from
			.slice(fromIndex)
			.map(function(value, index){
				var result = {
					type: 'delete'
					, index: index + fromIndex + fromOffset
					, value: value
				};
				fromOffset--;
				return result;
			})
		)
		/*
		add the remainder of the to array to the result as insertions
		*/
		.concat(
			to
			.slice(toIndex)
			.map(function(value, index){
				var result = {
					type: 'insert'
					, index: index + toIndex
					, value: value
				};
				fromOffset++;
				return result;
			})
		)
		;

	}//diffArray

})();