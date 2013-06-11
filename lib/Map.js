(function(){
	if(typeof define === 'function' && define.amd) return define(['./StringMap'], _define);
	if(typeof module !== 'undefined' && module.exports) return module.exports = _define(require('./StringMap'));
	Map = _define(StringMap);

	function _define(StringMap){

		Map.prototype.get = function(key, defaultValue){
			var bucket;
			var index;
			bucket = this._buckets.get(key);
			index = bucket
			? bucket.keys.indexOf(key)
			: -1
			;
			return ~index
			? bucket.values[index]
			: defaultValue
			;
		}
		
		Map.prototype.set = function(key, value){
			var bucket;
			var index;
			bucket = this._buckets.get(key);
			if(!bucket){
				bucket = {
					keys: []
					, values: []
				};
				this._buckets.set(key, bucket);
			}
			index = bucket.keys.indexOf(key);
			if(~index){
				bucket.keys.splice(index, 1);
				bucket.values.splice(index, 1)
				this.size--;
			}
			bucket.keys.push(key);
			bucket.values.push(value)
			this.size++;
		}
		
		Map.prototype.has = function(key){
			var bucket;
			var index;
			bucket = this._buckets.get(key);
			index = bucket
			? bucket.keys.indexOf(key)
			: -1
			;
			return ~index;
		}
		
		Map.prototype.delete = function(key){
			var bucket;
			var index;
			bucket = this._buckets.get(key);
			index = bucket
			? bucket.keys.indexOf(key)
			: -1
			;
			if(~index){
				bucket.keys.splice(index, 1);
				bucket.values.splice(index, 1)
				this.size--;
			}
		}

		return Map;

		function Map(){
			this.size = 0;
			this._buckets = new StringMap();
		}//Map

	}//_define

})();