(function(){
	if(typeof define === 'function' && define.amd) return define([], _define);
	if(typeof module !== 'undefined' && module.exports) return module.exports = _define();
	StringMap = _define();

	function _define(){
		
		var prefix = '_';

		StringMap.prototype.get = function(key, defaultValue){
			return this.has(key)
			? this._data[prefix + key]
			: defaultValue
			;
		}
		
		StringMap.prototype.set = function(key, value){
			this.delete(key)
			this._data[prefix + key] = value;
			this.size++;
		}
		
		StringMap.prototype.has = function(key){
			return prefix + key in this._data;
		}
		
		StringMap.prototype.delete = function(key){
			if(this.has(key)){
				delete this._data[prefix + key];
				this.size--;
			}
		}

		return StringMap;

		function StringMap(){
			this.size = 0;
			this._data = {};
		}//StringMap

	}//_define

})();