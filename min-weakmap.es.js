//not a complete polyfill
//not safe
//not secure
//does not check Object(k)===k
//if key is still alive after weakmap's lifetime ends, then there is leak

if(typeof WeakMap==='undefined'){
	let count=0;
	var WeakMap=function(){this.wmid='min_weakmap_pf_property_id'+count;++count;};
	WeakMap.prototype.delete=function(k){
		if(this.wmid in k){
			delete k[this.wmid];//delete is slow?
			return true;
		}else{
			return false;
		}
	};
	WeakMap.prototype.get=function(k){
		return k[this.wmid];
	};
	WeakMap.prototype.has=function(k){
		return this.wmid in k;
	};
	WeakMap.prototype.set=function(k,v){
		k[this.wmid]=v;
		return this;
	};
}
