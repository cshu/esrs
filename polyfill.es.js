if(document.documentMode){//if IE
	Blob = function (Blob) {
		function fblob(list) {
			var colist=[];
			if(list){
				for(var i=0;i<list.length;++i){
					var o=list[i];
					if(DataView.prototype.isPrototypeOf(o))
						colist.push(new Uint8Array(o.buffer,o.byteOffset,o.byteLength));
					else
						colist.push(o);
				}
			}
			return new Blob(colist);
		}
		fblob.prototype = Blob.prototype;
		return fblob;
	}(Blob);
}

if(typeof MutationObserver==='undefined'){
	//maybe you shouldn't write this bc there was bug in WebKitMutationObserver of safari?
	var MutationObserver = window.WebKitMutationObserver;
	//or even now you still should hold back from using it bc there might be leak in implementations when disconnect() is not called?
}

void function(){

	if(!String.prototype.endsWith){
		String.prototype.endsWith=function(suffix){//fixme
			return this.indexOf(suffix,this.length-suffix.length)!==-1;
		};
	}
	if(!String.prototype.startsWith){
		String.prototype.startsWith=function(prefix,position=0){
			return this.slice(off).lastIndexOf(prefix,0)!==-1;
		};
	}

	if(!Uint8Array.prototype.indexOf){
		Uint8Array.prototype.indexOf=function(searchElement,fromIndex=0){
			if(fromIndex<0) fromIndex=this.length+fromIndex;
			if(fromIndex<0) fromIndex=0;
			for(;fromIndex<this.length;++fromIndex)
				if(searchElement===this[fromIndex]) return fromIndex;
			return -1;
		};
	}

	function fnForPolyfillOfElementInsertAdjacentElementAndInsertAdjacentText(where,element){
		switch(where.toLowerCase()){//dom spec: ASCII case-insensitive match
		case 'beforebegin':
			if(this.parentNode===null)return null;//dom spec: parent is null, return null
			return this.parentNode.insertBefore(element,this);
		case 'afterbegin':
			return this.insertBefore(element,this.firstChild);
		case 'beforeend':
			return this.appendChild(element);
		case 'afterend':
			if(this.parentNode===null)return null;
			return this.parentNode.insertBefore(element,this.nextSibling);
		//todo dom spec: Throw a SyntaxError
		}
	}
	if(!Element.prototype.insertAdjacentElement){
		Element.prototype.insertAdjacentElement=fnForPolyfillOfElementInsertAdjacentElementAndInsertAdjacentText;//todo check type is element
	}
	if(!Element.prototype.insertAdjacentText){
		Element.prototype.insertAdjacentText=function(where,data){
			fnForPolyfillOfElementInsertAdjacentElementAndInsertAdjacentText.call(this,where,document.createTextNode(data));
		};
	}

}();
