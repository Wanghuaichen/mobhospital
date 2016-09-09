function patientInfo(id)
{
	$("#xiaobianque_keyword").val("这里输入您想查询的问题");
	//初始化内容
	$.get("http://"+server_url+"/tiantan_emr/Common/Data/xiaobianqueSearch", {"keyword":"index","zhuyuan_id":current_zhixing_id}, function(data){
		$(".result_list").html(data);
	});
	if (isFullScreanStatus()==false)
	{
		if(id != '')
		{
			$.getJSON("/tiantan_emr/Common/Data/getPatientInfoJson", { zhixing_id: id }, function(json){
				$(".patient_info").css("display","block");
				if (json.touxiang_url != '' && json.touxiang_url != null)
					var xingbie='<div><img src="'+json.touxiang_url+'" width="75" height="60" style="border-radius:5px;"/></div>';
				else
				{
					if (json.xingbie=='男')
						var xingbie="<div class='ipad_male_head'></div>";
					else
						var xingbie="<div class='ipad_female_head'></div>";
				}

				if (json.media_photo_icon != '' && json.media_photo_icon != null)
					var media_photo='<span class="media_photo" audio_lable="jiaojieban" id="media_photo_hover" zhuyuan_id="'+json.zhuyuan_id+'"><img src="/tiantan_emr/Public/css/images/jiaojiebanluyin_hover.png" width="20"></span>';
				else
					var media_photo='<span class="media_photo" zhuyuan_id="'+json.zhuyuan_id+'"><img src="/tiantan_emr/Public/css/images/jiaojiebanluyin.png" width="20"></span>';
				if (json.media_record != '' && json.media_record != null)
					var media_record='<span class="media_record" id="media_record_hover" zhuyuan_id="'+json.zhuyuan_id+'"><img src="/tiantan_emr/Public/css/images/luyin_hover.png" width="20"></span>';
				else
					var media_record='<span class="media_record" zhuyuan_id="'+json.zhuyuan_id+'"><img src="/tiantan_emr/Public/css/images/luyin.png" width="20"></span>';

				if (json.media_picture != '' && json.media_picture != null)
					var media_picture='<span class="media_picture" id="media_picture_hover" zhuyuan_id="'+json.zhuyuan_id+'"><img src="/tiantan_emr/Public/css/images/chakantupian-pad-hover.png" width="20"></span>';
				else
					var media_picture='<span class="media_picture" zhuyuan_id="'+json.zhuyuan_id+'"><img src="/tiantan_emr/Public/css/images/chakantupian-pad.png" width="20"></span>';
				
				if (json.hulijibie=='一级护理')
					var hulijibie='<font color=red>'+json.hulijibie+'</font>';
				else
					var hulijibie=json.hulijibie;
				if (json.ruyuan_qingkuang=='病危' && json.zhuangtai=='住院中')
					var zhuangtai='bingwei';
				else if(json.ruyuan_qingkuang=='病重' && json.zhuangtai=='住院中')
					var zhuangtai='bingzhong';
				else if(json.ruyuan_qingkuang=='一般' && json.zhuangtai=='住院中')
					var zhuangtai='yiban';
				else if(json.zhuangtai=='已出院')
					var zhuangtai='yichuyuan';
				else
					var zhuangtai='yichuyuan';
				var str = '';
				if (json.hulijibie=='一级护理')
					str +='<span><img src="/tiantan_emr/Public/css/images/zhuangtai/yijihuli.png"></span>';
				if (json.bingwei != '' && json.bingwei != null)
					str +='<span><img src="/tiantan_emr/Public/css/images/zhuangtai/'+json.bingwei+'.png"></span>';
				if (json.bingzhong != '' && json.bingzhong != null)
					str +='<span><img src="/tiantan_emr/Public/css/images/zhuangtai/'+json.bingzhong+'.png"></span>';
				if (json.xindianjiance != '' && json.xindianjiance != null)
					str +='<span><img src="/tiantan_emr/Public/css/images/zhuangtai/'+json.xindianjiance+'.png"></span>';
				if (json.weiliangbeng != '' && json.weiliangbeng != null)
					str +='<span><img src="/tiantan_emr/Public/css/images/zhuangtai/'+json.weiliangbeng+'.png"></span>';
				if (json.huxiji != '' && json.huxiji != null)
					str +='<span><img src="/tiantan_emr/Public/css/images/zhuangtai/'+json.huxiji+'.png"></span>';
				$(".patient_info").html(
					'<div class="list_content_bock_view yiban" zhuyuan_id="'+json.zhuyuan_id+'" style="margin-top:7px;padding:0 5px;" '+
						'href="/tiantan_emr/ZhuyuanYishi/Patient/showPatientZongheChafang/zhuyuan_id/'+json.zhuyuan_id+'/xingming/'+json.xingming+'/zhuangtai/'+json.zhuangtai+'">'+				
						'<div class="sign">'+
									str +
						'</div>'+
						'<div class="list_content_bock_view_left">'+
							'<div class="head_portrait"  photo_lable="touxiang" zhuyuan_id="'+json.zhuyuan_id+'">'+
								xingbie+
							'</div>'+
							'<div class="left_info">'+
								'<div style="overflow:hidden; white-space:nowrap; text-overflow:ellipsis;line-height:18px;"><b>'+json.xingming+'</b></div>'+
								'<div>'+json.nianling+'('+json.xingbie+')</div>'+
							'</div>'+
						'</div>'+
						'<div class="list_content_bock_view_right">'+
							'<div style="height:65px;margin-top:5px;">'+
								'<div style="font-size:14px;height:20px;">'+json.bingchuang_hao+'</div>'+
								'<div style="font-size:14px;height:20px;">住院:'+json.ruyuan_tianshu+'</div>'+
								'<div>'+json.zhuyuan_id+'</div>'+
							'</div>'+
							'<div class="media">'+
								media_picture+
								media_photo+
								media_record+
							'</div>'+
						'</div>'+
					'</div>'
				);
			});
		}
		else
			$(".patient_info").css("display","none");
	}
	else
			$(".patient_info").css("display","none");
}

$(".list_content_bock_view").live('click',function (e) {
	// alert($(this).attr("href"));
	if($(e.target).parent().attr("class")=='head_portrait')
	{
		photo_lable = $(this).attr("photo_lable");
		zhuyuan_id = $(this).attr("zhuyuan_id");
		//头像拍照功能
		capturePhotoEdit(zhuyuan_id,photo_lable);
	}
	else if($(e.target).attr("class")=='media_photo' || $(e.target).parent().attr("class")=='media_photo')
	{
		
	}
	else if($(e.target).attr("class")=='media_record' || $(e.target).parent().attr("class")=='media_record')
	{
		//头像拍照功能
		// parent.wenYiWen($(this).attr("zhuyuan_id")+" 录音");  
		wenYiWen($(this).attr("zhuyuan_id")+" 录音");  
	}
	else if($(e.target).attr("class")=='media_picture' || $(e.target).parent().attr("class")=='media_picture')
	{
		//头像拍照功能
		wenYiWen($(this).attr("zhuyuan_id")+" 图片");  
	}
	else
	{
		// last_conframe_content = window.location.href;
		$("#conframe").attr("src",$(this).attr("href"));
	}
})

// $(".list_content_bock_view").click(function (e) {
// 	// last_conframe_content = window.location.href;
// 	// window.location.href = $(this).attr("href");
// 	alert($(this).attr("href"));
// });



