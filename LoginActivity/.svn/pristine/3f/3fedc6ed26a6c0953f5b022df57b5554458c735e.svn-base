
/********************与录音有关的参数*********************/
var leftChannel = [];
var recorder = null;
var recording = false;
var recordingLength = 0;
var volume = null;
var audioInput = null;
var sampleRate = 8000;
var audioContext = null;
var context = null;
var outputElement = document.getElementById('output');
var outputString;
var inputSampleRate = 8000;
/********************其他的参数*********************/
initial_template_category_id = 0;
var template_type = "common";
var judged_width = 800;
var xiaobianque_current_keyword = "";
$(function(){
	//计算小扁鹊显示宽度：   
	judged_width = 800;
	//追加的控制按钮：
	append_action_button = '<span class="xiaobianque_result_controller">'
												+'<input type="button" name="insert_all_content" value="插入全部" />'
												+'<input type="button" name="close_xiaobianque_result" value="关闭" />'
												+'</span>';
	//插入模板函数
	$("[name='insert_all_content']").live("click",function(){
			var module_info=$(this).parent().parent().parent().parent().find(".qtip-content").html();
			
			if(module_info.search("zuhao")>= 0 && current_content_url.search("Yizhuguanli") >= 0)//copy医嘱,适配病历录入
			{
				var zhuyuan_id_info=$(this).parent().parent().parent().parent().parent().find(".left_menu_title").html();
				var re = new RegExp("(\\d{6})+-+(\\d{1})+");
				var post_param = {};
				var zhuyuan_id = re.exec(zhuyuan_id_info)[0];
				post_param['zhuyuan_id'] = zhuyuan_id;
				var re = new RegExp("\\d+zuhao{1}\\w+");
				var info = re.exec(module_info);//hide
				var str = info.toString();
				post_param['zuhao'] = str.split("zuhao")[0];
				post_param['yizhu_type'] = str.split("zuhao")[1];//changqi,linshi
				$("[name='insert_all_content']").parent().parent().parent().parent().qtip('api').hide();
				
				$.post("http://"+server_url+"/tiantan_emr/Common/Yizhuguanli/copyYizhuXbq", post_param,function(data){
					$("#conframe").attr("src",current_content_url);
				});
				
			}else if(module_info.search("chufang_id") >= 0 && current_content_url.search("Chufangguanli") >= 0) //copy处方
			{
				
				var zhuyuan_id_info=$(this).parent().parent().parent().parent().parent().find(".left_menu_title").html();
				var re = new RegExp("(\\d{6})+-+(\\d{1})+");
				var post_param = {};
				var zhuyuan_id = re.exec(zhuyuan_id_info)[0];
				post_param['zhuyuan_id'] = zhuyuan_id;
				var re = new RegExp("\\d+chufang_id\\d+");
				var info = re.exec(module_info);//hide
				
				post_param['id'] = info.toString().split("chufang_id")[0];
				post_param['dachufanghao'] = info.toString().split("chufang_id")[1];
				$("[name='insert_all_content']").parent().parent().parent().parent().qtip('api').hide();
				
				$.post("http://"+server_url+"/tiantan_emr/Common/Chufangguanli/copyOneChufangXbq", post_param,function(data){
					$("#conframe").attr("src",current_content_url);
				});
			}
			else if( current_content_url.search("RuyuanJilu|BingchengJilu") >= 0 && module_info.search("zuhao") >= 0)
			{
				arr = module_info.match(/.*(?=yizhu)(.|\n)*?<\//mig).toString().match(/[^┏┃,┗]+/mig).toString().match(/([^>,<\/]+)</mig);
				var str="";
				for( i=0;i<arr.length;i++){
					 
					if(arr[i].trim().length>1 && arr[i].trim() != '<'){
						str = str + arr[i].replace(/</g,',');
					}
				}
				document.getElementById('conframe').contentWindow.insertContent(str);
				$("[name='insert_all_content']").parent().parent().parent().parent().qtip('api').hide();
				 
			}
			else if(current_content_url.search("RuyuanJilu|BingchengJilu") >= 0 && module_info.search("chufang_id") >= 0)
			{
				matchStr = module_info.match(/.*(?=chufang\")(.|\n)*?<\//mig);
				if(matchStr==null){
					document.getElementById('conframe').contentWindow.insertContent(module_info);
				}else
				{
					arr = matchStr.toString().match(/([^>,"<]+<\/)/mig);
					var str="";
					for( i=0;i<arr.length;i++){
						if(arr[i]!="" && arr[i].trim() != '<') str = str + arr[i].replace(/<\//g,',');
					}
					document.getElementById('conframe').contentWindow.insertContent(str); 
					$("[name='insert_all_content']").parent().parent().parent().parent().qtip('api').hide();
				}
			}else if(current_content_url.search("RuyuanJilu|BingchengJilu") >= 0 && module_info.search("正常结果") >= 0)
			{
				matchStr = module_info.match(/[正常|异常]{2}结果:.*<\//mig);
				var str="";
				for( i=0;i<matchStr.length;i++){
					if(matchStr[i]!="" && matchStr[i].trim() != '<') str = str + matchStr[i].replace(/<\//g,',');
				}
				document.getElementById('conframe').contentWindow.insertContent(str); 
				$("[name='insert_all_content']").parent().parent().parent().parent().qtip('api').hide();
				
			}
			else
			{
				document.getElementById('conframe').contentWindow.insertContent(module_info);
			}
	});
	$("[name='close_xiaobianque_result']").live("click",function(){
		$(this).parent().parent().parent().parent().qtip("api").hide();
	});
	//添加小扁鹊内容：
	$("#right_menu").html(
	'<div class="xiaobianque_zhushou" name="xiaobianque_zhushou">'+
		'<input type="input" id="xiaobianque_keyword" class="xiaobianque_keyword" name="xiaobianque_keyword" value="这里输入您想查询的问题" />'+
		//'<input type="button" class="submit_button" name="xiaobianque_search" value="问一问" />&nbsp'+
	'</div>'+
	'<div id="xiaobianque_yuyin" tabindex="1" aria-label="按语音搜索"></div>'+
	'<div class="search_result" >'+
			'<div class="result_list"></div>'+
	'</div>'

	);
	$('[id="xiaobianque_yuyin"]').click(function(){
				var dialog = art.dialog({
					title: '语音输入',
					content:'<div  name="xiaobianque_zhushou"  style="width:300px;  " >'+
					'<img src="../Public/css/mobile_images/huatong_animator.gif"></img>'+
					'<input type="button" id="xiaobianque_yuyin_btn" class="xiaobianque_keyword" name="xiaobianque_yuyin_btn" value="说完了" /></div> ',
					lock: true,
					padding:5,
					drag: false,
					resize: false,
					fixed: true,
					close:function(){
						$("body").eq(0).css("overflow","scroll");
					},
					init: function () 
					{
						//recording prepare
						if (!navigator.getUserMedia)
							navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||navigator.mozGetUserMedia || navigator.msGetUserMedia;
						if (navigator.getUserMedia){
							navigator.getUserMedia({audio:true}, success, function(e) {
								alert("打开麦克风时出现错误。");
							});
						} else alert('2当前的浏览器不支持调用麦克风，换用Chrome试试吧。');
						//recording
						recording = true;
						leftChannel.length = 0;
						recordingLength = 0;
						$('[name="xiaobianque_zhushou"]').focus();
						
						$('[name="xiaobianque_yuyin_btn"]').bind('click', function (e) {
							
							dialog.close();
							//上传
							recording = false;
							$("#recorder_state").html("录音上传中。。。");
							// we flat the left and right channels down
							// we interleave both channels together
							var blob = encodeWAV_8k16bit(leftChannel, recordingLength,inputSampleRate);
							var url = (window.URL || window.webkitURL).createObjectURL(blob)
							var img_count_temp = 0;
							var reader = new FileReader();
							reader.onload = function (rResult) {
								var options = {
									type: 'POST',
									url: 'http://'+server_url+'/tiantan_emr/Common/Asr/getAudioFile/',
									data: reader.result,
									success:function(result){
										//alert(result.msg);
										wenYiWen(result.msg);
										$(this).attr("status","sleep");
										$("#record_audio").css("background","url(http://"+server_url+"/tiantan_emr/Public/css/images/record_audio.png) no-repeat center center");
										$("#video_background").css("display","none");
										$("#recorder_state").css("display","none");
										$("#record").css("display","none");
										$("#stop").css("display","none");
									},
									processData: false,// 告诉jQuery不要去处理发送的数据
									contentType: false,// 告诉jQuery不要去设置Content-Type请求头
									dataType:"json"
								};
								$.ajaxSetup({
									async: true
								});
								$.ajax(options);
							};
							reader.readAsArrayBuffer(blob);
					});
				}
		});
	});
	//初始化扁鹊助手各种问题：
	$('[name="xiaobianque_keyword"]').focus(function(){
		if($(this).val()=="这里输入您想查询的问题")
		{
			$(this).val("");
			$(this).css("color","black");
		}
	});
	
	$('[name="xiaobianque_keyword"]').blur(function(){
		if($(this).val()=="")
		{	
			wenYiWen("小扁鹊");
			$(this).val("这里输入您想查询的问题");
			$(this).css("color","#C0C0C0");
		}
	});
	
	$('[name="xiaobianque_keyword"]').bind('keydown', function (e) {
		xiaobianque_current_keyword = $(this).val();
		
		var key = e.which;
		if (key == 13) {
		
			e.preventDefault();
			$("[name='xiaobianque_search']").click();
		}
		
		setTimeout(function (){
					e.preventDefault();
					template_type = "xiaobianque";
					var keyword = $('[name="xiaobianque_keyword"]').val();
					$.get("http://"+server_url+"/tiantan_emr/Common/Data/xiaobianqueSearch", {"keyword":keyword,"zhuyuan_id":current_zhixing_id}, function(data){
						$(".result_list").html(data);
						initializeSearchEvent();
					});
			},2000);
	});
		
	
	//问一问操作
	$("[name='xiaobianque_search']").click(function(e) {
		template_type = "xiaobianque";
		var keyword = $('[name="xiaobianque_keyword"]').val();
		$.get("http://"+server_url+"/tiantan_emr/Common/Data/xiaobianqueSearch", {"keyword":keyword,"zhuyuan_id":current_zhixing_id}, function(data){
			$(".result_list").html(data);
			initializeSearchEvent();
		});
	});
	
	//初始化内容
	$.get("http://"+server_url+"/tiantan_emr/Common/Data/xiaobianqueSearch", {"keyword":"index","zhuyuan_id":current_zhixing_id}, function(data){
		$(".result_list").html(data);
		initializeSearchEvent();
	});
});

function initializeSearchEvent()
{
	$('.result_title').each(function() {
		shown_url = "";
		if($(this).attr("keyword").indexOf("tiantanee_url|")!=-1)
		{
			url_array = $(this).attr("keyword").split("|");
			shown_url = url_array[1];
		}
		shown_content = "";
		if($(this).attr("keyword").indexOf("tiantanee_content|")!=-1)
		{
			url_array = $(this).attr("keyword").split("tiantanee_content|");
			shown_content = url_array[1];
		}
		if(shown_url!=""&&shown_url!=null)
		{
			title_str="";
			if($(this).text().search("┏")>=0)
			{
				title_str = "长期医嘱详情";
			}else
			{
				title_str = $(this).text();
			}
			$(this).qtip({
				content: {
					title: {
						text: title_str+append_action_button,
						//text: $(this).text()+append_action_button,
						button: "关闭"
					},
					text: '努力加载中......',
					ajax: {
						url: shown_url,
						loading: true
					}
				},
				style: {
					classes: 'qtip-blue qtip-bootstrap',
					width: judged_width
				},
				position: {
					target: $('#xiaobianque_keyword'),
					my: 'top right',
					at: 'center left'
				},
				show: {
					solo : true,
					event: "click"
				},
				hide: {
					event: 'unfocus'
				},
				events: {
					show: function(event, api) {
						$(".qtip").draggable({ handle: ".qtip-titlebar" });
					}
				}
			});
		}
		else if(shown_content!=""&&shown_content!=null)
		{
			$(this).qtip({
				content: {
					title: {
						text: $(this).text()+append_action_button,
						button: "关闭"
					},
					text: shown_content
				},
				style: {
					classes: 'qtip-blue qtip-bootstrap',
					width: judged_width
				},
				position: {
					target: $('#xiaobianque_keyword'),
					my: 'top right',
					at: 'center left'
				},
				show: {
					solo : true,
					event: "click"
				},
				hide: {
					event: 'unfocus'
				},
				events: {
					show: function(event, api) {
						$(".qtip").draggable();
					}
				}
			});
		}
		else if($(this).attr("keyowrd")!=="")
		{
			$(this).click(function(){
				if($(this).attr("keyword")!=="")
				{
					template_type = "xiaobianque";
					var keyword = $(this).attr("keyword");
					if(keyword!="unsearcheabel")
					{
						$.get("http://"+server_url+"/tiantan_emr/Common/Data/xiaobianqueSearch", {"keyword":keyword,"zhuyuan_id":current_zhixing_id}, function(data){
							$(".result_list").html(data);
							initializeSearchEvent();
						});
					}
				}
			});
		}
		
	});
}

function getNewContent(current_eidtor_id,div_content) {
	console.log(current_eidtor_id);
	console.log(div_content);
	// 传给后台，返回差异内容
}

function wenYiWen(keyword)
{
	rightMenuControl();
	template_type = "xiaobianque";
	// var keyword = $('[name="xiaobianque_keyword"]').val();
	$.get("http://"+server_url+"/tiantan_emr/Common/Data/xiaobianqueSearch", {"keyword":keyword,"zhuyuan_id":current_zhixing_id}, function(data){
		$(".result_list").html(data);
		initializeSearchEvent();
	});
	if (keyword=='小扁鹊')
		$("#xiaobianque_keyword").val("这里输入您想查询的问题");
	else
		$("#xiaobianque_keyword").val(keyword);
}

$("#xiaobianque").live("click",function(){
	if(lt_standard()) {
		$("#right_menu").css("width","250px");
		$("#xiaobianque_keyword").css("width","150px");
		$(this).css("right","250px");
		$("#right_menu_left").css("right","241px");
	}
	$("#con").attr('id','contact');
	$('#search_result').unbind('scroll');
	clearInterval(window["contact"]);
	clearInterval(window["contacts_show"]);
	clearInterval(window["zuijin"]);
	$(function(){
		//计算小扁鹊显示宽度：
		judged_width = 800;
		//追加的控制按钮：
		append_action_button = '<span class="xiaobianque_result_controller">' 
													+'<input type="button" name="insert_all_content" value="插入全部" />'
													+'<input type="button" name="close_xiaobianque_result" value="关闭" />'
													+'</span>';
	
		$("[name='close_xiaobianque_result']").live("click",function(){
			$(this).parent().parent().parent().parent().qtip("api").hide();
		});
		//添加小扁鹊内容：
		$("#right_menu").html(
			'<div class="xiaobianque_zhushou" name="xiaobianque_zhushou">'+
			'<input type="input" id="xiaobianque_keyword" class="xiaobianque_keyword" name="xiaobianque_keyword" value="这里输入您想查询的问题" />'+
			//'<input type="button" class="submit_button" name="xiaobianque_search" value="问一问" />&nbsp'+
			'</div>'+
			'<div id="xiaobianque_yuyin" tabindex="1" aria-label="按语音搜索"></div>'+
			'<div class="search_result" >'+
					'<div class="result_list"></div>'+
			'</div>'
		);
		
		//初始化扁鹊助手各种问题：
		$('[name="xiaobianque_keyword"]').focus(function(){
			if($(this).val()=="这里输入您想查询的问题")
			{
				$(this).val("");
				$(this).css("color","black");
			}
		});
		
		$('[name="xiaobianque_keyword"]').blur(function(){
			if($(this).val()=="")
			{			
				$(this).val("这里输入您想查询的问题");
				$(this).css("color","#C0C0C0");
			}
		});
		
		$('[name="xiaobianque_keyword"]').bind('keydown', function (e) {
			var key = e.which;
			if (key == 13) {
				e.preventDefault();
				$("[name='xiaobianque_search']").click();
			}
		});
		
		//问一问操作
		$("[name='xiaobianque_search']").click(function(e) {
			template_type = "xiaobianque";
			var keyword = $('[name="xiaobianque_keyword"]').val();
			$.get("http://"+server_url+"/tiantan_emr/Common/Data/xiaobianqueSearch", {"keyword":keyword,"zhuyuan_id":current_zhixing_id}, function(data){
				$(".result_list").html(data);
				initializeSearchEvent();
			});
		});
		
		//初始化内容
		$.get("http://"+server_url+"/tiantan_emr/Common/Data/xiaobianqueSearch", {"keyword":"index","zhuyuan_id":current_zhixing_id}, function(data){
			$(".result_list").html(data);
			initializeSearchEvent();
		});
	});
})
//打开聊天窗口
$(".contacts_show").live("click",function(){
	$("#con").attr('id','contact');
	$("#zj").attr('id','zuijin');
	clearInterval(window["contact"]);
	clearInterval(window["zuijin"]);
	var id = $(this).attr("id");
	var name = $(this).attr("title");
	$.post("/tiantan_emr/Common/Chat/openWindow",{user_name:name},function(data){
			$(".search_result").html(data);
			var scrollTop = $(".search_result")[0].scrollHeight;
			$(".search_result").scrollTop(scrollTop);
			
		});
	$(".xiaobianque_zhushou").html(
	
		'<span style="line-height:35px;">&nbsp&nbsp'+name+'</span>'
	
	);
	//滚动条start

	$(".search_result").attr("id",'search_result');
	$('#search_result').unbind('scroll')
	.bind("scroll",function(){
	nScrollTop = $(this)[0].scrollTop;
	if(nScrollTop == 0)
	{
		$.post("/tiantan_emr/Common/Chat/messageNum",function(data){});
	
	}

	});
	//滚动条end
	
	window["contacts_show"] = window.setInterval(contacts_show,2000);
	function contacts_show(){
		$.post("/tiantan_emr/Common/Chat/openWindowMessage",{user_name:name},function(data){
			
			$(".search_result").html(data);
			var newmess = $('input[name="new_mes"]').val();
			if (newmess==1)
			{		
				var scrollTop = $(".search_result")[0].scrollHeight;
				$(".search_result").scrollTop(scrollTop);
			}
//			else
//			{
//				var newmessnum = $('input[name="new_mes_num"]').val();
//				if (newmessnum>1)
//				{
//					$(".search_result").scrollTop(200);
//				}
//			}
			
		});
	}
	$(".search_result").before(
		'<div class="right_text"><table width="100%" cellpadding="0" cellspacing="0"><tr><td><textarea name="content"></textarea><input type="hidden" name="user_name" value="'+name+'"></td><td valign="center"  width="25%"><input id="send" class="search_button" type="button" value="发送"></td></tr></table></div>'
	);
	$(".search_result").css({"background-color":"#fff","height":"75%"});
})
$(".user_box").live("click",function(){
	var id = $(this).attr("res");
	var style = $(".user_list"+id).css('display');
	$.post('/tiantan_emr/Common/Chat/setStyle',{box_id:id,box_style:style},function(data){
	})
	$(".user_list"+id).toggle(200);
})
//发送消息
$("#send").live("click",function(){
	var content = $('textarea[name="content"]').val();
	if ($.trim(content) == '' || $.trim(content) ==null)
	{
		alert("发送内容不能为空");
	}
	else{
		var user_name = $('input[name="user_name"]').val();
		$.post("/tiantan_emr/Common/Chat/sendMessage",{user_name:user_name,content:content},function(data){
			//alert (data);
			$('textarea[name="content"]').val("");
			$(".search_result").html(data);
			var scrollTop = $(".search_result")[0].scrollHeight;
			$(".search_result").scrollTop(scrollTop);
		});
	}
})




//加载联系人
$("#contact").live("click",function(){
	if(lt_standard()) {
		$("#right_menu").css("width","250px");
		$("#xiaobianque_keyword").css("width","150px");
		$(this).css("right","250px");
		$("#right_menu_left").css("right","241px");
	}
	$('#search_result').unbind('scroll');
	$("#contact").attr('id','con');
	$("#zj").attr('id','zuijin');
	clearInterval(window["zuijin"]);
	clearInterval(window["contacts_show"]);
	$(".xiaobianque_zhushou").html(
		'<input type="input" class="xiaobianque_keyword" name="contacts__keyword" value="这里输入联系人姓名" />&nbsp'+
		'<input type="button" class="submit_button" name="contacts_search" value="查询" />&nbsp'
	
	);
	$('[name="contacts__keyword"]').focus(function(){
		if($(this).val()=="这里输入联系人姓名")
		{
			$(this).val("");
			$(this).css("color","black");
		}
	});
		
	$('[name="contacts__keyword"]').blur(function(){
		if($(this).val()=="")
		{			
			$(this).val("这里输入联系人姓名");
			$(this).css("color","#C0C0C0");
		}
	});
	contact();
	window["contact"] = window.setInterval(contact,5000);
	function contact(){
		$.get('/tiantan_emr/Common/Chat/showContacts',function(data){
			$(".search_result").html(data);
			$(".search_result").css({"background-color":"#c4dce6","height":"90%"});
			$(".right_text").remove();
		});
	};
	
})
//加载最近联系人
$("#zuijin").live("click",function(){
	if(lt_standard()) {
		$("#right_menu").css("width","250px");
		$("#xiaobianque_keyword").css("width","150px");
		$(this).css("right","250px");
		$("#right_menu_left").css("right","241px");
	}
	$('#search_result').unbind('scroll');
	$("#zuijin").attr('id','zj');
	$("#con").attr('id','contact');
	clearInterval(window["contact"]);
	clearInterval(window["contacts_show"]);
	$(".xiaobianque_zhushou").html(
		'<input type="input" class="xiaobianque_keyword" name="contacts__keyword" value="这里输入联系人姓名" />&nbsp'+
		'<input type="button" class="submit_button" name="contacts_search" value="查询" />&nbsp'
	
	);
	zuijin();
	window["zuijin"] = window.setInterval(zuijin,5000);
	function zuijin(){
		$.post("/tiantan_emr/Common/Chat/recentContacts",function(data){
			$(".search_result").html(data);
			$(".search_result").css({"background-color":"#c4dce6","height":"90%"});
			$(".right_text").remove();
		});
	}
})
//查询联系人
$('[name="contacts_search"]').live('click',function(){
	var contacts__keyword = $('[name="contacts__keyword"]').val();
	if (contacts__keyword==null || contacts__keyword=='' || contacts__keyword=='这里输入联系人姓名')
	{
		alert('请输入你要查询的联系人姓名');
	}
	else
	{
		$.post("/tiantan_emr/Common/Chat/contactsSearch",{contacts__keyword:contacts__keyword},function(data){
			if (data=='1')
				alert('不能搜索自己');
			else if (data=='2')
				alert('搜索姓名不存在');
			else
				$(".search_result").html(data);
		})
	}

})

//地步时间轴缩放
$('.bottom_menu_top').live('click',function(){
	if($(".bottom_menu").is(":hidden")){
		$.post("/tiantan_emr/Data/SetKuadu/",{type:'moren'},function(data){
			getHuaban()
		});
		$('.bottom_menu').show();
		$(".bottom_menu").css("height",'auto');
	}else{
		if ($(".bottom_menu").height()=='250')
			$('.bottom_menu').hide();
		else
			$(".bottom_menu").css("height",'250px');
	}
})



function encodeWAV_8k16bit(leftChannel,recordingLength,inputSampleRate)
{
		
	var compress = function(leftChannel,recordingLength,inputSampleRate) {
	//合并
		var data = new Float32Array(recordingLength);
		var offset = 0;
	//	console.log(leftChannel.length);
	//	console.log(recordingLength);
		for (var i = 0; i < leftChannel.length; i++) {
			data.set(leftChannel[i], offset);
			offset += leftChannel[i].length;
		}
		//压缩
	//	var compression = parseInt(inputSampleRate / (44100/6));
		var compression = parseInt(inputSampleRate / 8000);
		var length = data.length / compression;
		var bytes = new Float32Array(length);
		var index = 0, j = 0;
		while (index < length) {
			bytes[index] = data[j];
			j += compression;
			index++;
		}
		return bytes;
	}
	//var sampleRate = (44100/6);
	var sampleRate = 8000;
	var sampleBits = 16;      			//16
	var bytes = compress(leftChannel,recordingLength,inputSampleRate);
	var dataLength = bytes.length * (sampleBits / 8);
	var buffer = new ArrayBuffer(44 + dataLength);
	var data = new DataView(buffer);

	var channelCount = 1;//单声道
	var offset = 0;
	console.log('isr'+inputSampleRate);
	console.log('rl'+recordingLength);
	console.log('lc'+leftChannel.length);
	var writeString = function (str) {
		for (var i = 0; i < str.length; i++) {
			data.setUint8(offset + i, str.charCodeAt(i));
		}
	}
	
	// 资源交换文件标识符 
	writeString('RIFF'); offset += 4;
	// 下个地址开始到文件尾总字节数,即文件大小-8 
	data.setUint32(offset, 36 + dataLength, true); offset += 4;
	// WAV文件标志
	writeString('WAVE'); offset += 4;
	// 波形格式标志 
	writeString('fmt '); offset += 4;
	// 过滤字节,一般为 0x10 = 16 
	data.setUint32(offset, 16, true); offset += 4;
	// 格式类别 (PCM形式采样数据) 
	data.setUint16(offset, 1, true); offset += 2;
	// 通道数 
	data.setUint16(offset, channelCount, true); offset += 2;
	// 采样率,每秒样本数,表示每个通道的播放速度 
	data.setUint32(offset, sampleRate, true); offset += 4;
	// 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8 
	data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true); offset += 4;
	// 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8 
	data.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
	// 每样本数据位数 
	data.setUint16(offset, sampleBits, true); offset += 2;
	// 数据标识符 
	writeString('data'); offset += 4;
	// 采样数据总数,即数据总大小-44 
	data.setUint32(offset, dataLength, true); offset += 4;
	// 写入采样数据 
	if (sampleBits === 8) {
		for (var i = 0; i < bytes.length; i++, offset++) {
			var s = Math.max(-1, Math.min(1, bytes[i]));
			var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
			val = parseInt(255 / (65535 / (val + 32768)));
			data.setInt8(offset, val, true);
		}
	} else {
		for (var i = 0; i < bytes.length; i++, offset += 2) {
			var s = Math.max(-1, Math.min(1, bytes[i]));
			data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
		}
	}

	return new Blob([data], { type: 'audio/wav' });
}
function success(e){
    // creates the audio context
    audioContext = window.AudioContext || window.webkitAudioContext;
    context = new audioContext();
    audioInput = context.createMediaStreamSource(e);
	inputSampleRate = context.sampleRate;
    

    var bufferSize = 4096;
    recorder = context.createJavaScriptNode(bufferSize, 1, 1);
	inputSampleRate = context.sampleRate;
    recorder.onaudioprocess = function(e){
        if (!recording) return;
        
		var left = e.inputBuffer.getChannelData (0);
		
        leftChannel.push (new Float32Array (left));
        recordingLength += left.length;
    }
	/*
	volume = context.createGain();
    audioInput.connect(volume);
    volume.connect (recorder);
	*/
	audioInput.connect (recorder);
    recorder.connect (context.destination); 
}
function rightMenuControl()
{
	if ($("#right_menu").width()<100)
	{
		$(".right_menu_left").trigger("click");
	}
}
function isFullScreanStatus()
{
	var head_display_status = $(".head").css("display");
	if ("none" == head_display_status)
	{
		return true;
	}
	return false;
}