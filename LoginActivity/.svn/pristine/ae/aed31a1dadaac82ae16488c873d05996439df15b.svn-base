	var pictureSource;  //设定图片来源  
	var destinationType; //选择返回数据的格式  
	var photo_lable;
	var audio_lable;
	
	document.addEventListener("deviceready",onDeviceReady,false);

	function onDeviceReady() {
		pictureSource=navigator.camera.PictureSourceType;
		destinationType=navigator.camera.DestinationType;
	}
	
	
	$(document).ready(function(){
		$(".photo").click(function(){
			photo_lable = $(this).attr("photo_lable");
			if(photo_lable=="")
				photo_lable = "all";
			capturePhotoEdit(current_zhixing_id,photo_lable);
			
		});
		$(".record_audio").click(function(){
			audio_lable = $(this).attr("audio_lable");
			if(photo_lable=="")
				photo_lable = "all";
			captureAudio(current_zhixing_id,audio_lable);
		});
	});
	
	function capturePhotoEdit(current_zhixing_id_temp,photo_lable_temp){
		current_zhixing_id = current_zhixing_id_temp;
		photo_lable = photo_lable_temp;
		
		navigator.camera.getPicture(onPhotoURISuccess, onFail, {
			quality: 50, allowEdit: true,
			destinationType:destinationType.DATA_URL,
			targetWidth: 700,
			targetHeight: 520
		});
	}
	
	// Called when a photo is successfully retrieved
	function onPhotoURISuccess(imageURI) {
		// image file URI
		// var largeImage = document.getElementById('largeImage');
		// largeImage.style.display = 'block';
		//使用image file URI 直接赋值就可以了
		//largeImage.src = imageURI;
		var post_param = {};
		post_param['data'] = imageURI;
		post_param['label'] = photo_lable;
		post_param['zhuyuan_id'] = current_zhixing_id;
		var img_count_temp = 0;
		$.ajaxSetup({
			async: false
		});
		$.post("http://"+server_url+"/tiantan_emr/Common/Data/updatePic", post_param,function(data){
			if(data=="true")
			{
				alert("拍照数据上传完毕:)");
			}
		});
		$.ajaxSetup({
			async: true
		});
	}

	function onFail(message) {
		//alert('Failed because: ' + message);
	}

	function captureAudio(current_zhixing_id_temp,audio_lable_temp){
		current_zhixing_id = current_zhixing_id_temp;
		audio_lable = audio_lable_temp;
		// limit 录制的音频数
		navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 1});
	}

	//captureAudio方法成功执行后回调函数
	function captureSuccess(mediaFiles) {
		var i, len;
		for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			//业务逻辑
			fileURI = mediaFiles[i].fullPath
			var options = new FileUploadOptions();
			options.fileKey = "file";
			options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
			options.mimeType = "multipart/form-data";
			options.chunkedMode = false;

			ft = new FileTransfer();
			var uploadUrl=encodeURI("http://"+server_url+"/tiantan_emr/Common/Data/updateAudio/zhuyuan_id/"+current_zhixing_id+"/label/"+audio_lable);
			ft.upload(fileURI,uploadUrl,uploadSuccess, uploadFailed, options);
		}
	}
	
	function uploadSuccess(msg) {
		alert('录音上传成功;)');
	}
	
	function uploadFailed(msg) {
		alert('录音上传失败');
	}

	//captureAudio方法执行失败后回调函数
	function captureError(error) {
		var msg = 'capture 发生错误: ' + error.code;
		//navigator.notification.alert(msg, null, 'Uh oh!');
		//alert("录音数据上传完毕:)");
	}
