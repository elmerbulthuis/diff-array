(function(){
	if(typeof define === 'function' && define.amd) return define(['./Map'], _define);
	if(typeof module !== 'undefined' && module.exports) return module.exports = _define(require('./Map'));
	diffArray = _define(Map);

	function _define(Map){

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
			toMap = to.reduce(function(result, value, index){
				if(result.has(value)) result.get(value).push(index);
				else result.set(value, [index]);
				return result;
			}, new Map());

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
						toMap.has(fromValue)
						&& toMap.get(fromValue).some(function(value){
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
	
	}//_definer

})();