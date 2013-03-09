module.exports = (function(){

	return diffArray;

	function diffArray(from, to){
		/*
		result will hold the transformations (in order) that need to 
		be done to make the from array equal to the to array
		*/
		var result = [];
		var fromValue, fromIndex, fromOffset, fromCount, fromMap;
		var toValue, toIndex, toCount, toMap;

		/*
		Buld an index for the two arrays to speed up the process. Do
		note that due to this optimization all values in the array will
		be transformed to strings. So the number 1 will be equal to the
		string '1'. Also all objects will converted to strings (via
		toString) and therefore probably considered equal.
		*/
		toMap = {};
		to.forEach(function(value, index){
			if(value in toMap) toMap[value].push(index);
			else toMap[value] = [index];
		})
		fromMap = {};
		from.forEach(function(value, index){
			if(value in fromMap) fromMap[value].push(index);
			else fromMap[value] = [index];
		})

		fromOffset = 0;
		fromIndex = 0;
		fromCount = from.length;
		
		toIndex = 0;
		toCount = to.length;

		/*
		loop until we reach the end of one of the two arrays
		*/
		while(fromIndex < fromCount && toIndex < toCount){
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
				// if(!~to.indexOf(fromValue, toIndex)){	
				if((fromValue in toMap && toMap[fromValue].shift()) === false){
					result.push({
						type: 'delete'
						, index: toIndex
						, value: fromValue
					});
					fromIndex++
					fromOffset--;
					continue;
				}


				/*
				if toValue is not in the remainder of the from array
				*/
				// if(!~from.indexOf(toValue, fromIndex)){
				if((toValue in fromMap && fromMap[toValue].shift()) === false){
					result.push({
						type: 'insert'
						, index: fromIndex + fromOffset
						, value: toValue
					});
					toIndex++
					fromOffset++;
					continue;
				}

				/*
				if we get here then the rest of the array will be deleted and 
				inserted, wich is not optimal.
				*/
				break;
			}

		}

		/*
		add the remainder of the from array to the result as deletions
		*/
		result = result.concat(
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
		);

		/*
		add the remainder of the to array to the result as insertions
		*/
		result = result.concat(
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
		);

		return result;
	}

})();