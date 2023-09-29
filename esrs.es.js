// @flow

export function noop(){}//usually you may write ()=>{} instead
export function retarg1(arg1/*:mixed*/)/*:mixed*/{return arg1;}

// $FlowFixMe
export function removeFromParentNode(n){
	return n.parentNode.removeChild(n);
}
// $FlowFixMe
export function removeItAndPreviousSiblings(n){
	while(n.previousSibling) removeFromParentNode(n.previousSibling);
	removeFromParentNode(n);
}

// $FlowFixMe
export function firstSelectedOptionIn(sel){
	return sel[sel.selectedIndex];
}

//mainly for debugging
// $FlowFixMe
export function ctorToString(obj){
	return obj.constructor.toString();
}

// $FlowFixMe
export function strictCmpList(x,y,s){
	while(s>0){
		s--;
		if(x[s]!==y[s])
			return true;
	}
	return false;
}
// $FlowFixMe
export function safeStrictCmpList(x,y){
	var s=x.length;
	if(s!==y.length)return true;
	else return strictCmpList(x,y,s);
}

// $FlowFixMe
export function getUint32LEFromBuffer(arraybufferview, off){
	return new DataView(arraybufferview.buffer, arraybufferview.byteOffset+off, 4).getUint32(0, true);
}
export function getUint32LEFromArrayBuffer(arraybuffer/*:ArrayBuffer*/, off/*:number*/)/*:number*/{
	return new DataView(arraybuffer, off, 4).getUint32(0, true);
}
// $FlowFixMe
export function decodeLengthPrefixedStr(arraybufferview, off, textdec){
	var len = getUint32LEFromBuffer(arraybufferview, off);
	off += 4;
	return {
		str: textdec.decode(new DataView(arraybufferview.buffer, arraybufferview.byteOffset+off, len)),
		new_offset: off+len
	};//object destructuring
}
export function decodeLengthPrefixedStrFromArrayBuffer(arraybuffer/*:ArrayBuffer*/, off/*:number*/, textdec/*:TextDecoder*/)/*:mixed*/{
	let len = getUint32LEFromArrayBuffer(arraybuffer, off);
	off += 4;
	return {
		str: textdec.decode(new DataView(arraybuffer, off, len)),
		new_offset: off+len
	};//object destructuring
}

export function newDataViewSetUint64le(u/*:number*/)/*:DataView*/{
	let tbr=new DataView(new ArrayBuffer(8));
// $FlowFixMe
	tbr.setBigUint64(0,u,true);
	return tbr;
}

export function newDataViewSetUint32le(u/*:number*/)/*:DataView*/{
	var tbr=new DataView(new ArrayBuffer(4));
	tbr.setUint32(0,u,true);
	return tbr;
}
export function blobStrWithLenLE(s/*:string*/)/*:Blob*/{
	var blobstr=new Blob([s]);//optimize textencoder is faster?
	return new Blob([newDataViewSetUint32le(blobstr.size),blobstr]);
}

// $FlowFixMe
export function indexOfLastNotEq(obj,searchElement,fromIndex=obj.length-1){
	for(;fromIndex>=0;--fromIndex)
		if(obj[fromIndex]!==searchElement) return fromIndex;
	return -1;
}

//this is not a polyfill of `Array.from` bc `Array.from` is more complicated than this?
// $FlowFixMe
export function makeArray(obj){
	var tbr=[];
	for(var i of obj) tbr.push(i);
	return tbr;
}

//use insertAdjacentElement & insertAdjacentText instead of this function
export function insBeforeFirstChild(p /*:Node*/, c/*:Node*/)/*:Node*/{
	return p.insertBefore(c,p.firstChild);
}

//use this function as necessary. e.g. an issue: when you change focus in the event handler of keydown on firefox linux, the newly focused element can get another event immediately as well!
export function createTextInputPreventDefaultWhenEnterKeyDown()/*:HTMLInputElement*/{
	var tbr=document.createElement('input');
	//tbr.type='text';//? spec defines default type as text, but omit this can cause incompatibility?
// $FlowFixMe
	tbr.addEventListener('keydown',function(ke){if(ke.keyCode===0x0d)ke.preventDefault();});
	return tbr;
}

export function createLabelWithTextContentAndChild(textCont/*:string*/, child/*:Node*/)/*:HTMLLabelElement*/{
	var tbr=document.createElement('label');
	tbr.textContent = textCont;
	tbr.appendChild(child);
	return tbr;
}

export function createAnchorWithPhHref()/*:HTMLAnchorElement*/{
	var tbr=document.createElement('a');
	tbr.href='#';
// $FlowFixMe
	tbr.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();});
	return tbr;
}

export function createAnchorWithJsVoidHref()/*:HTMLAnchorElement*/{//?not preferred bc of csp or what?
	var tbr=document.createElement('a');
	tbr.href='javascript:;';
	return tbr;
}

// $FlowFixMe
export function cmpWebkitRelativePathFile(x,y){
	return cmpStr(x.webkitRelativePath,y.webkitRelativePath);
}

//an alternative is String.localeCompare, which is slower?
// $FlowFixMe
export function cmpStr(x,y){
	return x>y ? 1 : (x<y ? -1 : 0);
}

// $FlowFixMe
export function arg1PreventDefaultStopPropagation(e){e.preventDefault();e.stopPropagation();}
