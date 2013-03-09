module.exports = (function(){
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

})();