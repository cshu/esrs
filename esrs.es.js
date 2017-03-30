
function noop(){}//usually you may write ()=>{} instead
function retarg1(arg1){return arg1;}

function removeFromParentNode(n){
	return n.parentNode.removeChild(n);
}
function removeItAndPreviousSiblings(n){
	while(n.previousSibling) removeFromParentNode(n.previousSibling);
	removeFromParentNode(n);
}

function firstSelectedOptionIn(sel){
	return sel[sel.selectedIndex];
}

//mainly for debugging
function ctorToString(obj){
	return obj.constructor.toString();
}

function strictCmpList(x,y,s){
	while(s>0){
		s--;
		if(x[s]!==y[s])
			return true;
	}
	return false;
}
function safeStrictCmpList(x,y){
	var s=x.length;
	if(s!==y.length)return true;
	else return strictCmpList(x,y,s);
}

function getUint32LEFromBuffer(t,off){
	return new DataView(t.buffer,t.byteOffset+off,4).getUint32(0,true);
}

function newDataViewSetUint32le(u){
	var tbr=new DataView(new ArrayBuffer(4));
	tbr.setUint32(0,u,true);
	return tbr;
}
function blobStrWithLenLE(s){
	var blobstr=new Blob([s]);//optimize textencoder is faster?
	return new Blob([newDataViewSetUint32le(blobstr.size),blobstr]);
}

function indexOfLastNotEq(obj,searchElement,fromIndex=obj.length-1){
	for(;fromIndex>=0;--fromIndex)
		if(obj[fromIndex]!==searchElement) return fromIndex;
	return -1;
}

//this is not a polyfill of `Array.from` bc `Array.from` is more complicated than this?
function makeArray(obj){
	var tbr=[];
	for(var i of obj) tbr.push(i);
	return tbr;
}

//use insertAdjacentElement & insertAdjacentText instead of this function
function insBeforeFirstChild(p,c){
	p.insertBefore(c,p.firstChild);
}

function createAnchorWithPhHref(){
	var tbr=document.createElement('a');
	tbr.href='#';
	tbr.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();});
	return tbr;
}

function createAnchorWithJsVoidHref(){//?not preferred bc of csp or what?
	var tbr=document.createElement('a');
	tbr.href='javascript:;';
	return tbr;
}

function cmpWebkitRelativePathFile(x,y){
	return cmpStr(x.webkitRelativePath,y.webkitRelativePath);
}

//an alternative is String.localeCompare, which is slower?
function cmpStr(x,y){
	return x>y ? 1 : (x<y ? -1 : 0);
}

function arg1PreventDefaultStopPropagation(e){e.preventDefault();e.stopPropagation();}
