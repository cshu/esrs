
function noop(){}//usually you may write function(){} instead

function removeFromParentNode(n){
	return n.parentNode.removeChild(n);
}

function firstSelectedOptionIn(sel){
	return sel[sel.selectedIndex];
}

//mainly for debugging
function ctorToString(obj){
	return obj.constructor.toString();
}

function strictEqCmpList(x,y,s){
	while(s>0){
		s--;
		if(x[s]!==y[s])
			return true;
	}
	return false;
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

