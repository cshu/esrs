
function write_diff_to_file(oldu8,newu8,fileentry,cb){
	var end_of_cmp=Math.floor(Math.min(oldu8.byteLength,newu8.byteLength)/4);
	//var end_of_cmp=Math.floor(Math.min(olddv.byteLength,newdv.byteLength)/4)*4;
	//var end_of_ind=end_of_cmp*4;
	var old_u32=new Uint32Array(oldu8.buffer,oldu8.byteOffset,end_of_cmp);
	var new_u32=new Uint32Array(newu8.buffer,newu8.byteOffset,end_of_cmp);
	var off=0;
	var write_begin;
	fileentry.createWriter(function (fileWriter){
		function last_write(){
			function trunc_file(){
				if(oldu8.byteLength>newu8.byteLength){
					fileWriter.onwriteend=cb;
					fileWriter.truncate(newu8.byteLength);
				}else{
					cb();
				}
			}
			if(newu8.byteLength===write_begin){
				trunc_file();
			}else{
				//optimize strictCmpList if trailing bytes are the same then no need to write
				fileWriter.onwriteend=trunc_file;
				fileWriter.seek(write_begin);
				fileWriter.write(new Blob([newu8.subarray(write_begin)]));
			}
		}
		function write_segment(){
			for(;;){
				if(off===end_of_cmp){
					write_begin=end_of_cmp*4;
					last_write();
					return;
				}
				if(old_u32[off]===new_u32[off]){
					++off;
				}else{
					break;
				}
				//if(olddv.getUint32(off)===newdv.getUint32(off)){
				//	off+=4;
				//}else{
				//	write_begin=off;
				//	off+=4;
				//	break;
				//}
			}
			write_begin=off;
			++off;
			for(;;){
				if(off===end_of_cmp){
					write_begin*=4;
					last_write();
					return;
				}
				if(old_u32[off]===new_u32[off]){
					break;
				}else{
					++off;
				}
				//if(olddv.getUint32(off)===newdv.getUint32(off)){
				//	break;
				//}else{
				//	off+=4;
				//}
			}
			fileWriter.onwriteend=function(){
				//off+=4;
				++off;
				write_segment();
			};
			fileWriter.seek(write_begin*4);
			fileWriter.write(new Blob([new_u32.subarray(write_begin,off)]));
		}
		fileWriter.onerror = function (e) {
			throw new Error("FILEWRITER ERR " + e.toString());
		};
		write_segment();
	});
}
