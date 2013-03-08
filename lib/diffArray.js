module.exports = (function(){

	return diffArray;

	function diffArray(from, to){
		var result = [];
		var indexOf, indexOffset;
		var fromValue, fromIndex, fromOffset, fromCount;
		var toValue, toIndex, toOffset, toCount;

		fromOffset = 0;
		fromIndex = 0;
		fromCount = from.length;
		
		toOffset = 0;
		toIndex = 0;
		toCount = to.length;

		while(fromIndex < fromCount && toIndex < toCount){
			fromValue = from[fromIndex];
			toValue = to[toIndex];

			if(fromValue === toValue){
				fromIndex++;
				toIndex++;
			}
			else{
				indexOf = to.indexOf(fromValue, toIndex);
				if(!~indexOf){
					result.push({
						type: 'delete'
						, index: toIndex + toOffset
						, value: fromValue
					});
					fromIndex++
					fromOffset--;
					continue;
				}

				indexOf = from.indexOf(toValue, fromIndex);
				if(!~indexOf){
					result.push({
						type: 'insert'
						, index: fromIndex + fromOffset
						, value: toValue
					});
					toIndex++
					fromOffset++;
					continue;
				}

				break;
			}

		}

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

		result = result.concat(
			to
			.slice(toIndex)
			.map(function(value, index){
				var result = {
					type: 'insert'
					, index: index + toIndex + toOffset
					, value: value
				};
				fromOffset++;
				return result;
			})
		);

		return result;
	}

})();