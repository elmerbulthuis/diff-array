(function(){
	if(typeof define === 'function' && define.amd) return define([], _define);
	if(typeof module !== 'undefined' && module.exports) return module.exports = _define();
	StringMap = _define();

	function _define(){
		var prefix = '_';

		StringMap.prototype.get = function(key, fallback){
			return this.has(key)
			? this._data[prefix + key]
			: fallback
			;
		}
		
		StringMap.prototype.set = function(key, value){
			this._data[prefix + key] = value;
		}
		
		StringMap.prototype.has = function(key){
			return prefix + key in this._data;
		}
		
		StringMap.prototype.delete = function(key){
			delete this._data[prefix + key];
		}

		return StringMap;

		function StringMap(){
			this._data = {};
		}//StringMap

	}//_define

})();