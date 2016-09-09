/**************************************************
*  Created:  2013-09-01
*  Info:病历编辑器
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author Tianran <tianran@tiantanhehe.com>
*  @Version 1.0
*  @Updated History:  
***************************************************/

 /********************定时器相关参数**********************/
var timer = null;							//定时器id
var chinese_enter_check = null;		//检测是否按下回车的定时器
var interval_time = 500;					//定时器间隔时间
// var excute_times = 0;					//定时器已执行次数

var is_chinese = false;						//是否中文输入状态（keycode=299）
var is_keyup = true;						//是否回车键（中文输入时回车不触发keyup）
var keydown_times = 0;						//连续按键次数(按下不松开)

/********************光标定位相关变量********************/
var current_editor_id = null;				//当前所在div
var current_cursor_position = 0;			//当前光标相对div的位置
var current_selection = null;				//当前选中的selection，有可能是range（Range），也或者是光标/符号（Caret）
var current_anchorNode = null;				//当前选中节点
var current_anchorOffset = 0;				//当前光标相对选中节点的offset
var previous_position = 0;


/********************文本处理引擎*********************/
var current_tips = null;
var text_process_timer = null;
var tiantanee = null;
var keyword = null;

/********************三级医师相关参数*********************/
var is_revise = false;						//是否修订模式
var postil_number = 0;						//批注号（可做批注数量、id使用）

var zhuyuanyishi_id;						//重新声明页面中声明的变量，但不赋值
var user_department_position;
var user_name;
var user_number;
var revise;
var show_page_number;


/********************编辑器相关参数*********************/
var is_saved = true;						//是否已经保存
var is_auto_save = true;					//是否开启自动保存
var auto_save_interval = 60000;				
var auto_save_timer = null;					//自动保存定时器
var hold_controller = false;
var validate_flag = true;
var saved = true;
var multi_media_engine = "on";
var current_div = null;

/********************与录音有关的参数*********************/
var leftchannel = [];
var rightchannel = [];
var recorder = null;
var recording = false;
var recordingLength = 0;
var volume = null;
var audioInput = null;
var sampleRate = 44100;
var audioContext = null;
var context = null;
var outputElement = document.getElementById('output');
var outputString;

/********************表单相关事件的配置参数************/
var form_options={
	dataType: 'json',
	beforeSerialize:function validateForm(){
		$("[name='ajax_dynamic_content']").html("");
		$('.ajax_input').each(function(){
				$("[name='ajax_dynamic_content']").append('<input type="hidden" name="'+$(this).attr("name")+'" value="'+$(this).val()+'"/>');
		});
		$('[contenteditable="true"]').each(function(i){
			//if($('input:[name="'+$(this).attr("name")+'"]').length==0)
			//$("[name='ajax_dynamic_content']").append('<input type="hidden" name="'+$(this).attr("name")+'"/>');
			//$('input:[name="'+$(this).attr("name")+'"]').val($(this).html());
			// $("[name='ajax_dynamic_content']").append('<input type="hidden" name="'+$(this).attr("name")+'" value="'+$(this).html()+'"/>');
			$("[name='ajax_dynamic_content']").append('<input type="hidden" id="temp'+i+'" name="'+$(this).attr("name")+'"/>');
			// $('input[name="'+$(this).attr("name")+'"]:eq('+i+')').val($(this).html());
			$('#temp'+i).val($(this).html());
		});
		$('.ajax_select').each(function(){
				$("[name='ajax_dynamic_content']").append('<input type="hidden" name="'+$(this).attr("name")+'" value="'+$(this).val()+'"/>');
		});
		$('.ajax_artDialog_select').each(function(){
				$("[name='ajax_dynamic_content']").append('<input type="hidden" name="'+$(this).attr("name")+'" value="'+$(this).val()+'"/>');
		});
		$('.ajax_input_number').each(function(){
				$("[name='ajax_dynamic_content']").append('<input type="hidden" name="'+$(this).attr("name")+'" value="'+$(this).val()+'"/>');
		});
	},
	success:function showResponse(data){
		// console.log(data.ids);
		window.setTimeout(auto_close,2000);
		//替换所有的新加病程ID：
		for(var one_info in data){
			if(one_info.indexOf("onebingcheng_new")!=-1)
			{
				$("[name='"+one_info+"_record_time']").attr("name",data[one_info]+"_record_time");
				$("[name='"+one_info+"_content']").attr("name",data[one_info]+"_content");
				$("[name='"+one_info+"_chafang_doctor']").attr("name",data[one_info]+"_chafang_doctor");
				$("[name='"+one_info+"_bingcheng_sub_leibie']").attr("name",data[one_info]+"_bingcheng_sub_leibie");
				$("[name='"+one_info+"_huanzhe_jiashu_qianzi']").attr("name",data[one_info]+"_huanzhe_jiashu_qianzi");
			}
		}

		// 替换医患沟通记录id,避免重复添加
		var id_array = data.ids.split(",");
		for(var i=0;i<id_array.length/2;i++)
		{
			if(id_array[i]!=-1)
			{
				$("[name='id[]']:eq("+i+")").val(id_array[i]);
			}
		}
		
		if(data.result=="true"){
			$("body").qtip({
						content: data.message,
						style: {
								'font-size': 30,
								border: {
									width: 5,
									radius: 5
								},
								padding: 10, 
								textAlign: 'center',
								name: 'green',
								width: { max: 600 }
					 	},
						position: {
										corner: {
											target: 'topMiddle',
											tooltip: 'topMiddle'
										}
									},
						show: {
									delay:0,
									solo:true,
									when:false,
									ready: true
									},
						hide: {
									delay:500,
									when: {event: 'click'}
									}
					}); 
		}
		else{
			$("body").qtip({
						content: data.message,
						style: {
									'font-size': 30,
									border: {
											width: 5,
											radius: 5
											},
									padding: 10, 
									textAlign: 'center',
									name: 'red',
									width: { max: 600 }
									},
						position: {
										corner: {
												target: 'topMiddle',
												tooltip: 'topMiddle'
										}
									},
						show: {
									delay:0,
									solo:true,
									when:false,
									ready: true
									},
					  	hide: {
									delay:500,
									when: {event: 'unfocus'}
									}
				});
			}
	}
};


$(function(){
	
	$("head").append("<script type=\"text/javascript\" src=\"/tiantan_emr/Public/js/artDialog/plugins/iframeTools.js\"></script>");

	//SESSION检测
	window.setInterval("shuaxinSession()", 10000);
	
	/********************初始化*********************/
	//边框样式控制
	$('[contenteditable="true"]').addClass("editable");
	
	//选中默认编辑器
	if($('[contenteditable="true"]:first').attr("name")!="")
	{
		current_editor_id = $('[contenteditable="true"]:first').attr("name");
	}
	//是否启动自动保存
	if(is_auto_save)
	{
		//开启
		auto_save_timer = window.setInterval(auto_save,auto_save_interval); 
	}
	else
	{
		//关闭
		if(auto_save_timer!=null)
		{
			window.clearInterval(auto_save_timer);
		}
	}

	// 是否开启修订
	console.log(revise+"--"+user_number+"---"+zhuyuanyishi_id)
	if(revise=="on"&&(user_number!=zhuyuanyishi_id))
	{
		console.log("进入修订模式");
		is_revise = true;
	}

	//判断浏览器类型
	var isChrome = navigator.userAgent.toLowerCase().match(/chrome/) != null;
	if (isChrome)
	{
			window.onbeforeunload = function(event){
			if(saved===false)
			{
				window.location.href += "###";
				var returnValue = "您可能有未保存的内容，请选择是否继续离开或者确认保存后离开";
				return returnValue;
			}
		}
	}
	else
	{
		window.onbeforeunload = function(){
			if(saved===false)
			{
				window.location.href += "###";
				event.returnValue = "您可能有未保存的内容，请选择是否继续离开或者确认保存后离开";
			}
		}
	}
	
	/********************事件控制*********************/
	//获得焦点时启用定时器
	$("[contenteditable='true']").live("mousedown",function()
	{
		saved=false;
		current_editor_id  = $(this).attr("name");
		current_div = $(this);
		//TODO
		if(event.target.nodeName=="TIANTANEE")
		{
			//event.preventDefault()
		}
		else
		{
			if($(this).html()=='<span class="alert">----</span>')
			{
				$(this).html("");
			}
	
			timer = window.setInterval(editorTimer,interval_time);
			current_editor_id = $(this).attr("name");
			current_editor_keyword = $(this).attr("keyword");
	
			if(text_process_timer!=null)
			{
				clearInterval(text_process_timer);
			}
	
			$(".top_piaofu").slideDown();
			hold_controller = true;
			//暂时关闭自动检索功能
			//if(current_editor_keyword!=null&&current_editor_keyword!="")
				//window.parent.wenYiWen(current_editor_keyword);
			$("#stop_photo") && $("#stop_photo").remove();
			$("#stop_record") && $("#stop_record").remove();
			$("#take_photo") && $("#take_photo").remove();
			$("#record_audio") && $("#record_audio").remove();
			$("[name='read_pic']") && $("[name='read_pic']").remove();
			$("#read_audio") && $("#read_audio").remove();
			$("#canvas") && $("#canvas").remove();
			$("#video") && $("#video").remove();
			$("#audio") && $("#audio").remove();
			$("#record") && $("#record").remove();
			$("#stop") && $("#stop").remove();
			$("#range") && $("#range").remove();
			$("#img") && $("#img").remove();
			$("#audio1") && $("#audio1").remove();
		}
	});

	//click
	$('[contenteditable="true"]').live("mouseup",function(e){
		// 清空所有[onEdditing='true'](避免点击一个标签改变多处的问题)
		$("[onEdditing='true']").each(function(){
			$(this).attr("onEdditing","false");
		});
		if(event.target.nodeName=="TIANTANEE")
		{
			// var keyword = $(event.target).attr("keyword");
			var offset = $(event.target).offset();
			var x_position = offset.left;
			var y_position = offset.top;
			
			$(event.target).attr("onEdditing","true");

			var data = "";
			var replace_array = $(event.target).attr("replace_list").split("#|");
			for (var i = 0; i < replace_array.length; i++)
			{
				if(replace_array[i].indexOf("(\\d*)")!=-1)
				{
					data+="<li type='number'>"+replace_array[i].replace(/\(\\d\*\)/g,"<input class='replaceable_tips_number' style='width:30px'/>")+"</li>";
				}
				else
				{
					data+="<li type='normal'>"+replace_array[i]+"</li>";
				}
			}
			data+="<li type='delete'><img id='replaceable_tips_delete' src='/tiantan_emr/Public/css/images/btn_del.png' />删除</li>";

			var replaceable_div = "<div class='replaceable_tips'>"+data+"</div>";
			$.post("/tiantan_emr/TextProcessingEngine/test",function(){
				$("body").append(replaceable_div);
				$(".replaceable_tips").offset({top:y_position+20,left:x_position});
			});
	
			// 替换
			$(".replaceable_tips li").live("click",function(){
				if($(this).attr("type")=="number")
				{
					// 带有数字输入框的li
					if($(event.target).is("input"))
					{
						// 如果点击的是输入框直接返回
						return;
					}
					else
					{
						// 如果点击li中非input部分执行以下代码
						$(".replaceable_tips_number").each(function(index,domEle){
							console.log(domEle);
							$(domEle).replaceWith($(domEle).val());
						});
						$("[onEdditing='true']").text($(this).html());
						$("[onEdditing='true']").attr("onEdditing","false");
						
					}					
				}
				else if($(this).attr("type")=="normal")
				{
					// 普通li
					$("[onEdditing='true']").text($(this).text());
					$("[onEdditing='true']").attr("onEdditing","false");
				}
				else if($(this).attr("type")=="delete")
				{
					// 带有删除按钮的li
					$("[onEdditing='true']").remove();
				}
				$(".replaceable_tips").remove();
			});

			//$(this).blur();
		}
		if($(".replaceable_tips").is(":hidden")==false)
		{
			$(".replaceable_tips").remove();
		}
	});

	//keydown
	$('[contenteditable="true"]').live("keydown",function(e)
	{
		// console.log("keydown---"+e.keyCode);
		// keyCode=299说明在中文输入法状态
		if (e.keyCode==229) 
		{
			console.log("正在输入中文...");
			is_chinese = true;
		}
		else
		{
			switch(e.keyCode)
			{
				// 退格
				case 8:
					//只有在段首处才为0
					if(current_anchorOffset==0)break;

					//此处重新获取当前节点及当前位移是怕定时器不够准确
					current_anchorNode = window.getSelection().anchorNode;
					current_anchorOffset = window.getSelection().anchorOffset;
					// 当前节点内容
					var current_content = current_anchorNode.textContent;

					// 开启修订，关闭文本处理引擎
					if(is_revise)
					{
						console.log("开启修订");
						
						// 如果在ins标签内按backspace默认事件执行
						if (!$(window.getSelection().anchorNode.parentNode).is("ins")) 
						{
							//取消退格键原有事件
							e.preventDefault();

							var del_content = current_content[current_anchorOffset-1];

							//在<del>标签内，只移动光标
							if ($(window.getSelection().anchorNode.parentNode).is("del")) 
							{
								window.getSelection().modify('move', 'left', 'character');
								break;
							}
							//紧跟<del>标签之前，把新删除的内容合并到后面<del>中
							else if (current_anchorOffset == current_anchorNode.length&&current_anchorNode.nextSibling!=null&&$(current_anchorNode.nextSibling).is("del")&&($(current_anchorNode.nextSibling).attr("user_number")==user_number)) 
							{
								var replace_content = current_content.substring(0,current_anchorOffset-1)+"<del class='modify' id=p"+(++postil_number)+" user_number='"+user_number+"' user_name='"+user_name+"' time='"+new Date().toLocaleString()+"' version=0>"+del_content+window.getSelection().anchorNode.nextSibling.textContent+"</del>"+current_content.substring(current_anchorOffset);
								current_anchorNode.nextSibling.remove();
							}
							//其他节点加del标签
							else
							{
								var replace_content = current_content.substring(0,current_anchorOffset-1)+"<del class='modify' id=p"+(++postil_number)+" user_number='"+user_number+"' user_name='"+user_name+"' time='"+new Date().toLocaleString()+"' version=0>"+del_content+"</del>&nbsp;"+current_content.substring(current_anchorOffset);
								
							}

							//使用加标签的内容替换当前节点
							replaceNode(replace_content);
							//console.log(current_anchorOffset);
							//TODO
							if (current_anchorOffset==1) {
								window.getSelection().modify('move', 'right', 'character');
								window.getSelection().modify('move', 'left', 'character');
								// $("[name='"+current_editor_id+"']").focus;
							}

							for(var i=0;i<current_anchorOffset-1;i++)
							{
								window.getSelection().modify('move', 'right', 'character');
							}
						}
					}
					// 关闭修订
					else
					{
						// console.log("关闭修订");
					}
					break;

				//向上：
				case 38:
					if(current_cursor_position==0)
					{
						var all_editor = $('div[contenteditable="true"]').get();;
						for(editor_id = 0;editor_id<all_editor.length;editor_id++)
						{
							if(all_editor[editor_id].innerHTML==$(this).html()&&editor_id!=0)
							{
								all_editor[editor_id-1].focus();
							}
							
						}
					}
					break;

				//向下：
				case 40:
					if(current_cursor_position==$(this).text().length)
					{
						var all_editor = $('div[contenteditable="true"]').get();;
						for(editor_id = 0;editor_id<all_editor.length;editor_id++)
						{
							if(all_editor[editor_id].innerHTML==$(this).html()&&editor_id!=all_editor.length-1)
							{
								all_editor[editor_id+1].focus();
							}
						}
					}
					break;
			}
		}
		//2秒后若还没有keyup事件认为回车被按下
		chinese_enter_check = setTimeout(isChineseEnter,2000);
		keydown_times++;
		is_keyup = false;

		//
		// if($(".replaceable_tips").is(":hidden")==false)
		// 	$(".replaceable_tips").remove();
	});

	//keyup
	$("[contenteditable='true']").live("keyup",function(e)
	{
		if(is_chinese&&(e.keyCode==32||e.keyCode==27||e.keyCode==16||(e.keyCode>=49&&e.keyCode<=53)||(e.keyCode>=219&&e.keyCode<=222)||(e.keyCode==186||e.keyCode==188||e.keyCode==190||e.keyCode==191)))
		{
			console.log("退出中文输入状态...0");

			//进入中文输入法之前的offset（通过定时器记录的current_anchorOffset）
			var previous_anchorOffset = current_anchorOffset;
			//输入新内容后的offset
			current_anchorOffset = window.getSelection().anchorOffset;
			var current_content = window.getSelection().anchorNode.textContent;

			if(is_revise)
			{
				console.log("开启修订");

				var c1 = current_content.substring(0,previous_anchorOffset);
				var c2 = current_content.substring(previous_anchorOffset,current_anchorOffset);
				var c3 = current_content.substr(current_anchorOffset);

				if ($(window.getSelection().anchorNode.parentNode).is("ins")) 
				{
					
				}
				else if ($(window.getSelection().anchorNode.parentNode).is("del")) 
				{
					
				}
				else
				{
					// console.log(c3);
					var replace_content = c1+"<ins class='modify' id=p"+(++postil_number)+" user_number='"+user_number+"' user_name='"+user_name+"' time='"+new Date().toLocaleString()+"' version=0>"+c2+"</ins>"+c3;
					
					replaceNode(replace_content);
					
					for (var i = 0; i <(c1+c2).length; i++) {
						window.getSelection().modify('move', 'right', 'character');
					}
				}

			}
			//esc，标点不触发
			if(!(e.keyCode==16||(e.keyCode>=219&&e.keyCode<=222)||(e.keyCode==186||e.keyCode==188||e.keyCode==190||e.keyCode==191)))
			{
				
				// console.log("关闭修订");
				// console.log(current_content);
				c = current_content.substring(current_anchorOffset-10,current_anchorOffset);
				// console.log(c);
				invokeXiaobianque(c);

			}
			
			is_chinese = false;
		}
		

		window.clearTimeout(chinese_enter_check);
		keydown_times = 0;
		is_keyup = true;
	});

	//keypress,用于处理英文及数字、标点等字符
	$("[contenteditable='true']").live("keypress",function(e)
	{
		current_anchorOffset = window.getSelection().anchorOffset;
		var current_content = window.getSelection().anchorNode.textContent;

		if(is_revise)
		{
			if (e.keyCode==13) 
			{
				//console.log($(window.getSelection().anchorNode.nextSibling));
			}
			else if (e.keyCode==32)
			{

			}
			else
			{
				
				var c1 = current_content.substring(0,current_anchorOffset);
				var c2 = String.fromCharCode(e.keyCode);
				var c3 = current_content.substr(current_anchorOffset);

				if ($(window.getSelection().anchorNode.parentNode).is("ins")) 
				{
					
				}
				else if ($(window.getSelection().anchorNode.parentNode).is("del")) 
				{
					
				}
				else
				{
					e.preventDefault();
					replace_content = c1+"<ins class='modify' id=p"+(++postil_number)+" user_number='"+user_number+"' user_name='"+user_name+"' time='"+new Date().toLocaleString()+"' version=0>"+c2+"</ins>"+c3;
					replaceNode(replace_content);
					
					for (var i = 0; i <c1.length+1; i++) {
						window.getSelection().modify('move', 'right', 'character');
					}
				}
				
			}
		}
		else
		{
		}
	});

	/********************编辑器媒体*********************/
	if(multi_media_engine=="on")
	{
	$("[media_type='all']").live("click",function(){
			var focus_name = $(this).attr("name");
			$("#stop_photo") && $("#stop_photo").remove();
			$("#stop_record") && $("#stop_record").remove();
			$("#take_photo") && $("#take_photo").remove();
			$("#record_audio") && $("#record_audio").remove();
			$("[name='read_pic']") && $("[name='read_pic']").remove();
			$("#read_audio") && $("#read_audio").remove();
			$("#canvas") && $("#canvas").remove();
			$("#video") && $("#video").remove();
			$("#record") && $("#record").remove();
			$("#stop") && $("#stop").remove();
			$("#img") && $("#img").remove();
			$("body").append('<div id="video_background" style="display:none"></div>'+
											'<input type="button" id="stop_photo" style="display:none" class="media_button" status="sleep">'+
											'<input type="button" id="take_photo" style="display:none" class="media_button" status="sleep">'+
											'<input type="button" id="stop_record" style="display:none" class="media_button" status="sleep">'+
											'<input type="button" id="record_audio" style="display:none" class="media_button" status="sleep">'+
											'<canvas id="canvas" style="display:none" width="480" height="320"></canvas>'+
											'<video id="video" style="display:none" width="480" max-width="480" height="320" autoplay=""></video>'+
											'<span id="recorder_state"></span>'+
											'<input id="record" type="button" style="display:none" value="开始"/>'+
											'<input id="stop" type="button" style="display:none" value="停止"/>'+
											'<img id="img" style="display:none"/>');
			//初始化录音和照相功能的样式
			var img_count = 0;
			var img_date_value = new Array();
			$.ajaxSetup({
				async: false
			});
			$.get("http://"+server_url+"/tiantan_emr/Common/Data/readPic", {zhuyuan_id: zhuyuan_id, focus_name: focus_name, read_type: "count" },function(data){
				img_count = data.split("@")[0];
				img_date_value = data.split("@")[1].split("|");
			});
			$.ajaxSetup({
				async: true
			});
			if(img_count==0)
			{
				$("[name='read_pic']").remove();
			}
			else
			{
				var read_pic_html = "";
				for(var i=0;i<img_count;i++)
				{
					var div_date_value = img_date_value[i].split(" ");
					var div_date_value_temp = div_date_value[0].split("-");
					var div_date = div_date_value_temp[1]+"月"+div_date_value_temp[2]+"日";
					var count_i = i+1;
					read_pic_html += '<div class="leftd" name="read_pic" number="'+i+'" status="sleep"><div class="speech left">图片'+count_i+'<br/>'+div_date+'<br/>'+div_date_value[1]+'</div></div>';
				}
				$("body").append(read_pic_html);
			}
			var iframe_width = $("#video_background").width();
			var iframe_height = $("#video_background").height();
			if(iframe_height>1000)
			{
				$("#video").attr("max-width","900");
				$("#video").attr("width","900");
				$("#video").attr("height","500");
				$("#canvas").attr("width","670");
				$("#canvas").attr("height","500");
			}
			$("#take_photo").css("display","inline");
			$("#record_audio").css("display","inline");
			var left_side_x = $(this).offset().left - 50;
			$("#stop_photo").css("left",left_side_x);
			$("#take_photo").css("left",left_side_x);
			$("#record_audio").css("left",left_side_x);
			$("#recorder_state").css("left",left_side_x+60);
			$("#record").css("left",left_side_x+60);
			$("#stop").css("left",left_side_x+130);
			$("#video").css("left",(iframe_width - $("#video").width())/2);
			$("#video").css("bottom",(iframe_height - $("#video").height())/2);
			$("#canvas").css("left",(iframe_width - $("#canvas").width())/2);
			$("#canvas").css("bottom",(iframe_height - $("#canvas").height())/2);
			if(iframe_height>1000)
			{
				$("#img").css("left",$(this).offset().left + $(this).width() - $("#img").offset().left - 670);
			}
			else
			{
				$("#img").css("left",$(this).offset().left + $(this).width() - $("#img").offset().left - 425);
			}
			$("#img").css("top",$(this).offset().top - $("#img").offset().top + 190);
			var ob_text_this = $(this);
			$("[name='read_pic']").each(function(){
				$(this).css("left",ob_text_this.offset().left + ob_text_this.width() + 3 - $(this).offset().left);
				$(this).css("top",ob_text_this.offset().top - $(this).offset().top - 10 + $(this).attr("number")*25);
			});
			//$("#read_audio").css("left",$(this).offset().left + $(this).width() + 3 - $("#read_audio").offset().left);
			//$("#read_audio").css("top",$(this).offset().top - $("#read_audio").offset().top +60);
			$("[name='read_pic']").hover(function(){
					$(this).css("z-index","2000");
				},function(){
					$(this).css("z-index","1000");
			});
			$("#take_photo").hover(function(){
					$(this).css("background","url(http://"+server_url+"/tiantan_emr/Public/css/images/take_photo_hover.png) no-repeat center center");
				},function(){
					if($(this).attr("status")=="sleep")
					{
						$(this).css("background","url(http://"+server_url+"/tiantan_emr/Public/css/images/take_photo.png) no-repeat center center");
					}
					else
					{
						$(this).css("background","url(http://"+server_url+"/tiantan_emr/Public/css/images/taking_photo.png) no-repeat center center");
					}
			});
			$("#record_audio").hover(function(){
					$(this).css("background","url(http://"+server_url+"/tiantan_emr/Public/css/images/record_audio_hover.png) no-repeat center center");
				},function(){
					if($(this).attr("status")=="sleep")
					{
						$(this).css("background","url(http://"+server_url+"/tiantan_emr/Public/css/images/record_audio.png) no-repeat center center");
					}
					else
					{
						$(this).css("background","url(http://"+server_url+"/tiantan_emr/Public/css/images/recording_audio.png) no-repeat center center");
					}
			});
			//录音和照相功能
			var canvas = document.getElementById("canvas"),
					context = canvas.getContext("2d"),
					img = document.getElementById("img"),
					video = document.getElementById("video");
			var audio_context,recorder,volume,volumeLevel = 0;
			var audioElement = document.getElementById("audio");
			$("#take_photo").click(function(){
				if($(this).attr("status")=="sleep")
				{
					$("#video_background").css("display","inline");
					$("#stop_photo").css("display","inline");
					$(this).attr("status","work");
					$(this).css("background","url(http://"+server_url+"/tiantan_emr/Public/css/images/taking_photo.png) no-repeat center center");
					$("#canvas").css("display","none");
					$("#video").css("display","inline");
					var errBack = function(error) {
						console.log("Video capture error: ", error.code);
					};
					/*if(navigator.getUserMedia) {
						navigator.getUserMedia(videoObj, function(stream) {
							video.src = stream;
							video.play();
						}, errBack);
					}*/
					//else if(navigator.webkitGetUserMedia) {
						navigator.webkitGetUserMedia({ video: true,audio: false }, function(stream){
							video.src = window.webkitURL.createObjectURL(stream);
							video.play();
						}, errBack);
					//}
				}
				else
				{
					$("#video").css("display","none");
					$("#canvas").css("display","inline");
					if(iframe_height>1000)
					{
						context.drawImage(video, 0, 0, 670, 500);
					}
					else
					{
						context.drawImage(video, 0, 0, 427, 320);
					}
					$("#canvas").fadeOut(500,function(){
						$("#video").css("display","inline");
					});
					var imgData = canvas.toDataURL("image/png");
					var post_param = {};
					post_param['data'] = imgData;
					post_param['label'] = focus_name;
					post_param['zhuyuan_id'] = zhuyuan_id;
					var img_count_temp = 0;
					$.ajaxSetup({
						async: false
					});
					$.post("http://"+server_url+"/tiantan_emr/Common/Data/updatePic", post_param,function(data){
						if(data=="true")
						{
							$.get("http://"+server_url+"/tiantan_emr/Common/Data/readPic", {zhuyuan_id: zhuyuan_id, focus_name: focus_name, read_type: "count" },function(data){
								img_count_temp = data.split("@")[0];
								img_date_value = data.split("@")[1].split("|");
							});
							if(img_count_temp==0)
							{
								$("[name='read_pic']").remove();
							}
							else
							{
								var read_pic_html = "";
								for(var i=0;i<img_count_temp;i++)
								{
									var div_date_value = img_date_value[i].split(" ");
									var div_date_value_temp = div_date_value[0].split("-");
									var div_date = div_date_value_temp[1]+"月"+div_date_value_temp[2]+"日";
									var count_i = i+1;
									read_pic_html += '<div class="leftd" name="read_pic" number="'+i+'" status="sleep"><div class="speech left">图片'+count_i+'<br/>'+div_date+'<br/>'+div_date_value[1]+'</div></div>';
								}
								$("body").append(read_pic_html);
							}
							$("[name='read_pic']").each(function(){
								$(this).css("left",ob_text_this.offset().left + ob_text_this.width() + 3 - $(this).offset().left);
								$(this).css("top",ob_text_this.offset().top - $(this).offset().top - 10 + $(this).attr("number")*25);
							});
							$("[name='read_pic']").hover(function(){
									$(this).css("z-index","2000");
								},function(){
									$(this).css("z-index","1000");
							});
							$("[name='read_pic']").click(function(){
								$("#video_background").css("display","inline");
								$("#stop_photo").css("display","inline");
								var img_url = "";
								var read_number = $(this).attr("number");
								$.ajaxSetup({
									async: false
								});
								$.get("http://"+server_url+"/tiantan_emr/Common/Data/readPic", {zhuyuan_id: zhuyuan_id, focus_name: focus_name, read_type: "read", read_number: read_number },function(data){
									img_url = data;
								});
								$.ajaxSetup({
									async: true
								});
								img.src = "data:image/png;base64,"+img_url;
								if($("#img").css("display")=="none")
								{
									$("#img").css("display","inline");
								}
							});
						}
					});
					$.ajaxSetup({
						async: true
					});
				}
			});
			$("#stop_photo").click(function(){
				$("#video_background").css("display","none");
				$(this).css("display","none");
				$("#img").css("display","none");
				$("#take_photo").attr("status","sleep");
				$("#take_photo").css("background","url(http://"+server_url+"/tiantan_emr/Public/css/images/take_photo.png) no-repeat center center");
				$("#video").css("display","none");
				$("#canvas").css("display","inline");
				$("#canvas").fadeOut(3000);
			});
			$("[name='read_pic']").click(function(){
				var offset = $('.speech').offset(); 
				$("#img").css("top",offset.top);
	
				$("#video_background").css("display","inline");
				$("#stop_photo").css("display","inline");
				var img_url = "";
				var read_number = $(this).attr("number");
				$.ajaxSetup({
					async: false
				});
				$.get("http://"+server_url+"/tiantan_emr/Common/Data/readPic", {zhuyuan_id: zhuyuan_id, focus_name: focus_name, read_type: "read", read_number: read_number },function(data){
					img_url = data;
				});
				$.ajaxSetup({
					async: true
				});
				img.src = "data:image/png;base64,"+img_url;
				if($("#img").css("display")=="none")
				{
					$("#img").css("display","inline");
				}
			});
			$("#record_audio").click(function(){
				if($(this).attr("status")=="sleep")
				{
					$(this).attr("status","work");
					$(this).css("background","url(http://"+server_url+"/tiantan_emr/Public/css/images/recording_audio.png) no-repeat center center");
					$("#video_background").css("display","inline");
					$("#recorder_state").css("display","inline");
					$("#record").css("display","inline");
					$("#stop").css("display","inline");
					$("#recorder_state").css("display","inline");

					if (!navigator.getUserMedia)
					navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
					navigator.mozGetUserMedia || navigator.msGetUserMedia;
					
					if (navigator.getUserMedia){
						navigator.getUserMedia({audio:true}, success, function(e) {
							alert("打开麦克风时出现错误。");
						});
					} else alert('2当前的浏览器不支持调用麦克风，换用Chrome试试吧。');
					$("#recorder_state").html("请点击开始按钮以开始录音。。。");
				}
				else
				{
					$(this).attr("status","sleep");
					$(this).css("background","url(http://"+server_url+"/tiantan_emr/Public/css/images/record_audio.png) no-repeat center center");
					$("#video_background").css("display","none");
					$("#recorder_state").css("display","none");
					$("#record").css("display","none");
					$("#stop").css("display","none");
				}
			});
			$("#record").click(function(){
				recording = true;
				leftchannel.length = rightchannel.length = 0;
				recordingLength = 0;
				$("#recorder_state").html("开始录音。。。");
			});
			$("#stop").click(function(){
				recording = false;
				$("#recorder_state").html("录音上传中。。。");
				// we flat the left and right channels down
				var leftBuffer = mergeBuffers ( leftchannel, recordingLength );
				var rightBuffer = mergeBuffers ( rightchannel, recordingLength );
				// we interleave both channels together
				var interleaved = interleave ( leftBuffer, rightBuffer );
				// we create our wav file
				var buffer = new ArrayBuffer(44 + interleaved.length * 2);
				var view = new DataView(buffer);
				// RIFF chunk descriptor
				writeUTFBytes(view, 0, 'RIFF');
				view.setUint32(4, 44 + interleaved.length * 2, true);
				writeUTFBytes(view, 8, 'WAVE');
				// FMT sub-chunk
				writeUTFBytes(view, 12, 'fmt ');
				view.setUint32(16, 16, true);
				view.setUint16(20, 1, true);
				// stereo (2 channels)
				view.setUint16(22, 2, true);
				view.setUint32(24, sampleRate, true);
				view.setUint32(28, sampleRate * 4, true);
				view.setUint16(32, 4, true);
				view.setUint16(34, 16, true);
				// data sub-chunk
				writeUTFBytes(view, 36, 'data');
				view.setUint32(40, interleaved.length * 2, true);
				// write the PCM samples
				var lng = interleaved.length;
				var index = 44;
				var volume = 1;
				for (var i = 0; i < lng; i++){
				view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
				index += 2;
				}
				// our final binary blob
				var blob = new Blob ( [ view ], { type : 'audio/wav' } );
				var url = (window.URL || window.webkitURL).createObjectURL(blob)
				var img_count_temp = 0;
				var reader = new FileReader();
				reader.onload = function (rResult) {
					var options = {
						type: 'POST',
						url: 'http://'+server_url+'/tiantan_emr/Common/Data/getAudioFile/zhuyuan_id/'+zhuyuan_id+'/label/'+focus_name,
						data: reader.result,
						success:function(result){
							alert(result.msg);
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
						async: false
					});
					$.ajax(options);
				};
				reader.readAsArrayBuffer(blob);
			});
			
		});
	}
	/********************编辑器动态控制*********************/
	$('.modify').live("click",revise_confirm);

	$("#accept_all").live("click",function()
	{
		if($(".modify").length!=0)
		{
			$("ins").contents().unwrap();
			$("del").remove();
		}
		else
		{
			alert("没有新的修改！");
		}
	});

	$("#refuse_all").live("click",function()
	{
		if($(".modify").length!=0)
		{
			$("del").contents().unwrap();
			$("ins").remove();
		}
		else
		{
			alert("没有新的修改！");
		}
	});

	//文字格式控制
	$(".top_piaofu_b").mousedown(function(){
		if(window.getSelection)
		{
			var xuanzhong = window.getSelection();
			var title = $(this).attr("title");
			if(xuanzhong!='')
			{
				// console.log("----");
				if(title == '加粗')
				{
					document.execCommand('Bold');
				}
				else if(title == '斜体')
				{
					document.execCommand('Italic');
				}
				else if(title == '上标')
				{
					if ($(window.getSelection().anchorNode.parentNode).is("sup")) 
					{
						$(window.getSelection().anchorNode.parentNode).contents().unwrap();
					}
					else
					{
						document.execCommand('SuperScript');
					}
				}
				else if(title == '下标')
				{
					if ($(window.getSelection().anchorNode.parentNode).is("sub")) 
					{
						$(window.getSelection().anchorNode.parentNode).contents().unwrap();
					}
					else
					{
						document.execCommand('SubScript');
					}
				}
				else if(title == '更改文字颜色')
				{
					var rgb = $("#color_board_fore").val();
					document.execCommand('ForeColor',true,rgb);
				}
				else if(title == '更改背景颜色')
				{
					var rgb = $("#color_board_back").val();
					document.execCommand('BackColor',true,rgb);
				}
			}
			else
			{
				if(title == '撤销')
				{
					document.execCommand('Undo');
					// if (tiantan_stack.length>1) 
					// {
					// 	tiantan_stack.pop();
					// 	$("body").html(tiantan_stack[tiantan_stack.length-1]);
					// 	// console.log(tiantan_stack[tiantan_stack.length-1]);
					// }
					// else
					// {
					// 	$("body").html(tiantan_stack[tiantan_stack.length-1]);
					// }
				}
				else if(title == '恢复')
				{
					document.execCommand('Redo');
				}
				else if(title=='符号')
				{
					art.dialog.open("/tiantan_emr/Common/System/symbol",{
						id:"symbol_dialog",
						title:'符号',
						// width: '1000',
					    // height: '50%',
					    left: '40%',
					    top: '50%',
					    fixed: true,
					    resize: false,
					    drag: false,
					    margin:0,
					    padding:0,
					    // lock: true,
					    close:function(){
							if(art.dialog.data("insert_symbol")!=null&&art.dialog.data("insert_symbol")=="yes")
							{
								insertContent(art.dialog.data("symbol"))
								art.dialog.data("insert_symbol","no");
							}
					    }
					});
				}
			}
		}
		return false;
	});
	$("#color_board_fore").live("change",function(){
		if(window.getSelection&&window.getSelection!="")
		{
			var rgb = $("#color_board_fore").val();
			document.execCommand('ForeColor',true,rgb);
		}
	});

	$("#color_board_back").live("change",function(){
		if(window.getSelection&&window.getSelection!="")
		{
			var rgb = $("#color_board_back").val();
			document.execCommand('BackColor',true,rgb);
		}
	});

	//自动排版
	$("#guifan_geshi").click(function(){
		auto_format();
	});
	
	//表单相关参数
	$(".ajax_form").ajaxForm(form_options);
	$('[type="submit"]').click(function(){
		saved=true;
	});

	//添加多媒体
	$("#add_media").click(function(){
		art.dialog.data("zhuyuan_id",zhuyuan_id);
		art.dialog.open("/tiantan_emr/Common/Media",{
			title: '插入图片',
			width: '95%',
		    height: '90%',
		    left: '50%',
		    top: '50%',
		    fixed: true,
		    resize: false,
		    drag: false,
		    lock: true,
		    close:function(){
		    	if(art.dialog.data("insert")!=null&&art.dialog.data("insert")=="yes")
				{
					insertContent(art.dialog.data("media"))
					art.dialog.data("insert","no");
				}
		    }
		});
	});

	/**********************************选择框***********************************/
	//设置select的默认值（从数据库取出什么就是什么）
	$(".ajax_select").each(function(){
		var val = $(this).prev().val();
		if(val!=null&&val!="")
		{
			val = val.replace(new RegExp("<span(?:.|[\r\n])*?\>","gmi"),"");
			val = val.replace(new RegExp("</span>","gmi"),"");
			$(this).parent().find("option[value='"+val+"']").attr("selected","selected");
		}
			
		if(val=="----" || val=="<span class='alert'>----</span>")
		{
			$(this).css("background","red");
		}
		else
		{
			$(this).css("background","white");
		}
		$(this).parent().find("option").each(function(){
			if($(this).html()=="----")
			{
				$(this).css("background","red");
			}
			else
			{
				$(this).css("background","white");
			}
		});
		$(this).change(function(){
			if($(this).val()=="----" || $(this).val()=="<span class='alert'>----</span>")
			{
				$(this).css("background","red");
			}
			else
			{
				$(this).css("background","white");
			}
		});
	});

	//添加样式，设置宽为其父元素的宽（td）
	$(".basic_info").each(function(){
		if(!($(this).is("input")&&$(this).attr("type")=="number"))
		{
			$(this).css("width",$(this).parent().width());
			$(this).css("height",$(this).parent().height()-1);
		}
	});

	// 解决民族的alert问题
	if($("input[name='minzu']").val()=="<span class='alert'>----</span>")
	{
		$("input[name='minzu']").val("----");
	}
	
	if(show_page_number==true)
		showPageNum();
	
	try
	{
		parent.loadingEnd();
	}
	catch(ex)
	{
	}
});


/********************编辑器定时器*********************/
//定时器
function editorTimer()
{
	//非中文输入状态下才记录
	if (!is_chinese)
	{
		current_selection = window.getSelection();
		current_anchorNode = window.getSelection().anchorNode;
		current_anchorOffset = current_selection.anchorOffset;
		current_cursor_position = getCurrentCursorPosition(current_anchorNode,current_anchorOffset);
		// console.log(current_editor_id+"---"+current_anchorOffset+"---"+getPCount(current_anchorNode)+"---"+current_cursor_position);
	}
	// else if (is_chinese&&!is_keyup&&keydown_times<=1) 
	// {
	// 	console.log("退出中文输入状态...1");
	// 	// var current_offset = window.getSelection().anchorOffset;
	// 	// var current_content = window.getSelection().anchorNode.textContent;
	// 	// var c1 = current_content.substring(0,last_offset);
	// 	// var c2 = current_content.substring(last_offset,current_offset);
	// 	// var c3 = current_content.substr(current_offset);
	// 	// current_content = c1+"<ins class='modify' id=p"+(++postil_number)+" user_name='"+user_name+"' time='"+new Date()+"' version=0 style='color:red'>"+c2+"</ins>"+c3;

	// 	// replaceNode(current_content);
			
	// 	// for (var i = 0; i <(c1+c2).length; i++)
	// 	// {
	// 	// 	window.getSelection().modify('move', 'right', 'character');
	// 	// }
	// 	// last_offset = current_offset;
	// 	is_chinese = false;
	// 	keydown_times=0;
	// 	is_keyup = true;
	// }
	// console.log(current_anchorNode.textContent+"---"+current_anchorOffset);
}

//是否在中文输入状态按下回车
function isChineseEnter()
{
	if (is_chinese&&!is_keyup&&keydown_times==1) 
	{
		console.log("退出中文输入状态...1");
		// var current_offset = window.getSelection().anchorOffset;
		// var current_content = window.getSelection().anchorNode.textContent;
		// var c1 = current_content.substring(0,last_offset);
		// var c2 = current_content.substring(last_offset,current_offset);
		// var c3 = current_content.substr(current_offset);
		// current_content = c1+"<ins class='modify' id=p"+(++postil_number)+" user_name='"+user_name+"' time='"+new Date()+"' version=0 style='color:red'>"+c2+"</ins>"+c3;

		// replaceNode(current_content);
			
		// for (var i = 0; i <(c1+c2).length; i++)
		// {
		// 	window.getSelection().modify('move', 'right', 'character');
		// }
		// last_offset = current_offset;
		is_chinese = false;
		keydown_times=0;
		is_keyup = true;
	}
}

//获取当前光标相对div的位置
function getCurrentCursorPosition(node,offset)
{
	if (node!=null)
	{
		var text = "";
		var p_count = getPCount(node);
		while(node.previousSibling!=null||(!$(node.parentNode).is("div")&&node.parentNode.previousSibling!=null))
		{
			if (node.previousSibling!=null)
			{
				node = node.previousSibling;
				text += node.textContent;
			}
			else if(!$(node.parentNode).is("div")&&node.parentNode.previousSibling!=null)
			{
				node = node.parentNode.previousSibling
				text += node.textContent;
			}
		}
		return (text.length + offset + p_count);
	}
}

//当前选中节点在第几段（一段结尾与下一段开始没有新内容但位置+1了）
function getPCount(node)
{
	var p_count = 0;
	//找出当前所在段落
	while(node!=null&&!$(node).is("p"))
	{
		node = node.parentNode;
	}

	//该段落是div的第几段
	while(node!=null&&node.previousSibling!=null)
	{
		node = node.previousSibling;
		p_count++;
	}
	return p_count;
}

//替换当前节点
function replaceNode(data)
{
	var range = window.getSelection().getRangeAt(0);
	var content_range = document.createRange();
	content_range.setStart(range.startContainer, range.startOffset);
	content_range.setEnd(range.endContainer, range.endOffset);
	var fragment = content_range.createContextualFragment(data);
	// content_range.startContainer.data = "";
	window.getSelection().anchorNode.remove();
	content_range.insertNode(fragment);
}

//自动保存函数
//************************************************************************
function auto_save(){
	$(".ajax_form").submit();
}

//自动关闭提示语句
//************************************************************************
function auto_close(){
	$("body").qtip("hide");
}

/****************************在当前光标处快速插入快捷内容****************************/
function insertContent(module_info)
{	
	try
	{
		module_info = formulaProcessOneContent(module_info);
	}
	catch(e)
	{
	}

	saved = false;
	var str = module_info;
	var selection= window.getSelection ? window.getSelection() : document.selection;
	var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
	if (!window.getSelection)
	{
		$('[name="'+current_editor_id+'"]').focus();
		var selection= window.getSelection ? window.getSelection() : document.selection;
		var range= selection.createRang   ? selection.createRange() : selection.getRangeAt(0);
		range.pasteHTML(str);
		range.collapse(false);
		range.select();
	}
	else
	{
		$('[name="'+current_editor_id+'"]').focus();
		range.collapse(false);
		var hasR = range.createContextualFragment(str);
		var hasR_lastChild = hasR.lastChild;
		while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br")
		{
			var e = hasR_lastChild;
			hasR_lastChild = hasR_lastChild.previousSibling;
			hasR.removeChild(e);
		}
		range.insertNode(hasR);
		if (hasR_lastChild)
		{
			range.setEndAfter(hasR_lastChild);
			range.setStartAfter(hasR_lastChild);
		}
		selection.removeAllRanges();
		selection.addRange(range);
	}
}

/********************文字格式化函数********************/
function formatContent(div_content)
{
	var div_content_filter = div_content.split("</b>:");
	if(div_content_filter[1]!=null)
		div_content = div_content_filter[1];
	var temp_div_content = div_content;
	while(true)
	{
		temp_div_content = div_content;
		div_content = div_content.replace(new RegExp("<span (?!id=\"before\")(?!id=\"up\")(?!id=\"spliter\")(?!id=\"down\")(?!id=\"after\")(?:[^<])*?\>(((?!<span).)*)</span>","gmi"),"$1");
		if(temp_div_content==div_content)
		{
			break;
		}
	}
	while(true)
	{
		temp_div_content = div_content;
		div_content = div_content.replace(new RegExp("<span(?:[^<])*?\>(((?!</span>).)*<span id=\"formula\"><span id=\"fenshi\"><span id=\"before\">((?!</span>).)*</span><span id=\"up\">((?!</span>).)*</span><span id=\"spliter\">((?!</span>).)*</span><span id=\"down\">((?!</span>).)*</span><span id=\"after\">((?!</span>).)*</span></span></span>.*)</span>","gmi"),"$1");
		if(temp_div_content==div_content)
		{
			break;
		}
	}
	div_content = div_content.replace(new RegExp("<div(?:.|[\r\n])*?\>","gmi"),"<div>");
	div_content = div_content.replace(new RegExp("</div>","gmi"),"</div>");
	div_content = div_content.replace(new RegExp("<a(?:.|[\r\n])*?\>","gmi"),"");
	div_content = div_content.replace(new RegExp("</a>","gmi"),"");
	div_content = div_content.replace(new RegExp("<p(?:.|[\r\n])*?\>","gmi"),"<p>");
	div_content = div_content.replace(new RegExp("<o:p>","gmi"),"");
	div_content = div_content.replace(new RegExp("</o:p>","gmi"),"");
	div_content = div_content.replace(new RegExp("<p><br></p>","gmi"),"");
	div_content = div_content.replace(new RegExp("<br></p>","gmi"),"</p>");
	div_content = div_content.replace(new RegExp("<p></p>","gmi"),"");
	div_content = div_content.replace(new RegExp("<p><u></u></p>","gmi"),"");
	div_content = div_content.replace(new RegExp("<div><br></div>","gmi"),"");
	div_content = div_content.replace(new RegExp("<br></div>","gmi"),"</div>");
	div_content = div_content.replace(new RegExp("<div></div>","gmi"),"");
	if(div_content_filter[1]!=null)
		div_content = div_content_filter[0]+"</b>:"+div_content;
	
	return div_content;
}

//自动排版
function auto_format()
{
	// var div_content = $(":focus").html();
	var div_content = $(current_div).html();
	div_content = formatContent(div_content);
	try
	{
		div_content = formulaProcessOneContent(div_content);
	}
	catch(e)
	{
	}
	// $("div[name='"+current_editor_id+"']").html(div_content);
	$(current_div).html(div_content);
	for(var i=0;i<current_cursor_position;i++)
	{
		window.getSelection().modify("move","right","character");
	}
}

// 显示批注信息
var revise_confirm = function showReviseInfoConfirm()
{
	var user_name = $(this).attr("user_name");
	var time = $(this).attr("time");
	var operation = $(this).is("ins")?"新增":"删除";
	var content = $(this).text();
	var strhtml = user_name+"于"+time+operation+"了<span style='color:red;'>"+content+"</span>";
	var modify_node = $(this);

	artDialog.alert = function (content) {
	    return artDialog({
	        id: 'Alert',
	        icon: 'warning',
	        fixed: true,
	        lock: true,
	        content: content,
	        ok: true
	    });
	};

	artDialog.confirm = function (content, yes, no) {
	    return artDialog({
	        id: 'Confirm',
	        icon: 'question',
	        fixed: true,
	        lock: true,
	        opacity: .1,
	        content: content,
	        okVal: '接受',
	        cancelVal: '拒绝',
	        ok: function (here) {
	            return yes.call(this, here);
	        },
	        cancel: function (here) {
	            return no && no.call(this, here);
	        }
	    });
	};

	artDialog.tips = function (content, time) {
	    return artDialog({
	        id: 'Tips',
	        title: false,
	        cancel: false,
	        fixed: true,
	        lock: true
	    })
	    .content('<div style="padding: 0 1em;">' + content + '</div>')
	    .time(time || 1);
	};

	if(user_department_position=="住院医师")
	{
		//显示接受/拒绝对话框
		art.dialog.confirm(strhtml, function () {
			if (modify_node.is("ins")) 
			{
				modify_node.contents().unwrap();
			}
			else
			{
				modify_node.remove();
			}
		    art.dialog.tips('已接受');
		}, function () {
		    if (modify_node.is("ins")) 
			{
				modify_node.remove();
			}
			else
			{
				modify_node.contents().unwrap();
			}
		    art.dialog.tips('已拒绝');
		});

	}
	else if(user_number==$(this).attr("user_number"))
	{
		//显示删除/取消对话框
		artDialog.confirm = function (content, yes, no) {
		    return artDialog({
		        id: 'Confirm',
		        icon: 'question',
		        fixed: true,
		        lock: true,
		        opacity: .1,
		        content: content,
		        okVal: '确定',
		        cancelVal: '取消',
		        ok: function (here) {
		            return yes.call(this, here);
		        },
		        cancel: true
		    });
		};

		art.dialog.confirm(strhtml+"，是否取消本次修改？", function () {
			    if (modify_node.is("ins")) 
				{
					modify_node.remove();
				}
				else
				{
					modify_node.contents().unwrap();
				}
			
		    art.dialog.tips('已恢复');
		});
	}
	else
	{
		//只显示带有确定按钮的alert对话框
		art.dialog.alert(strhtml);
	}
}


//显示页码
function showPageNum(){
	//每页高度
	var first_page_height = 0;
	var pageHeight = 1080;
	var current_url_temp = window.location.href;
	if(current_url_temp.toLowerCase().indexOf("bingcheng")!=-1)
	{
		first_page_height = 60;
		pageHeight = 1040;
	}
	else if(current_url_temp.toLowerCase().indexOf("ruyuanjilu")!=-1)
	{
		first_page_height = 80;
		pageHeight = 1060;
	}
	else
	{
		first_page_height = 0;
		pageHeight = 1040;
	}
	// 总高度
	var totalHeight = document.height;
	var offset_top = pageHeight-first_page_height;
	var i = 1;
	while(offset_top<totalHeight)
	{
		$("body").append("<div class='page_number' offset_page_id='"+i+"'>↑第"+i+"页↑</div>");
		$("body").append("<div class='page_spliter' offset_page_spliter_id='"+i+"'></div>");
		$("[offset_page_id='"+i+"']").offset({top:offset_top-13});
		$("[offset_page_spliter_id='"+i+"']").offset({top:offset_top+13});
		offset_top+=pageHeight;
		i++;
	}
	$("body").append("<div class='page_number' offset_page_id='"+i+"'>↑第"+i+"页↑</div>");
	$("body").append("<div class='page_spliter' offset_page_spliter_id='"+i+"'></div>");
	$("[offset_page_id='"+i+"']").offset({top:totalHeight-13});
	$("[offset_page_spliter_id='"+i+"']").offset({top:totalHeight+13});
}

function invokeXiaobianque(content)
{
	$.post("/tiantan_emr/Common/Data/matchKeyword", {"content": content},function(data)
	{
		if(keyword!=data&&data!="")
		{
			keyword = data;
			window.parent.wenYiWen(keyword);
		}
	});
}

function shuaxinSession() {
    $.get("/tiantan_emr/Common/Data/shuaxinSession", function(data) {
        if (data == "no") {
            art.dialog({
                id: "checklogin",
                title: "您已经超过2个小时未与系统保持认证，请输入您的用户名和密码获取最新的安全认证:)",
                padding: 10,
                content: '您已经超过2个小时未与系统保持认证，<br />请输入您的用户名和密码获取最新的安全认证:)<table width="260" border="0" style="margin:0px; padding:0px; font-size:14px;"><tr><td width="50" height="30" align="center" valign="middle">帐号：</td><td width="210" height="30" align="left" valign="middle">' + user_number + '<input name="user_number" type="hidden" value="' + user_number + '" /></td></tr><tr><td height="30" align="center" valign="middle">密码：</td><td height="30" align="left" valign="middle"><input type="password" name="login_password" id="login_password" style="width:200px; height:22px;" /></td></tr><tr><td></td><td height="20" id="checkdenglu" valign="middle" style="color:#ff0000;"></td></tr></table>',
                lock: true,
                ok: function() {
                    var login_password = $("#login_password").val();
                    $.post("/tiantan_emr/Common/Data/updateLogin", {user_number: user_number,login_password: login_password
                    }, function(data) {
                        if (data == "ok") {
                            art.dialog.list.checklogin.close();
                        } else {
                            $("#checkdenglu").html("用户名或者密码不正确");
                        }
                    });
                    return false;
                },
                cancelVal: "退出",
                cancel: function() {
                    art.dialog.list.checklogin.close();
                    window.open("/tiantan_emr/Common/System/logout", "_parent");
                    return false;
                }
            });
            if (user_number == "") {
                $("#login_password").attr("disabled", "disabled");
                $(".aui_state_highlight").css("display", "none");
            }
        }
    });
}

function interleave(leftChannel, rightChannel){
  var length = leftChannel.length + rightChannel.length;
  var result = new Float32Array(length);

  var inputIndex = 0;

  for (var index = 0; index < length; ){
    result[index++] = leftChannel[inputIndex];
    result[index++] = rightChannel[inputIndex];
    inputIndex++;
  }
  return result;
}

function mergeBuffers(channelBuffer, recordingLength){
  var result = new Float32Array(recordingLength);
  var offset = 0;
  var lng = channelBuffer.length;
  for (var i = 0; i < lng; i++){
    var buffer = channelBuffer[i];
    result.set(buffer, offset);
    offset += buffer.length;
  }
  return result;
}

function writeUTFBytes(view, offset, string){
  var lng = string.length;
  for (var i = 0; i < lng; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function success(e){
    // creates the audio context
    audioContext = window.AudioContext || window.webkitAudioContext;
    context = new audioContext();

    // creates a gain node
    volume = context.createGain();

    // creates an audio node from the microphone incoming stream
    audioInput = context.createMediaStreamSource(e);

    // connect the stream to the gain node
    audioInput.connect(volume);

    /* From the spec: This value controls how frequently the audioprocess event is 
    dispatched and how many sample-frames need to be processed each call. 
    Lower values for buffer size will result in a lower (better) latency. 
    Higher values will be necessary to avoid audio breakup and glitches */
    var bufferSize = 2048;
    recorder = context.createJavaScriptNode(bufferSize, 2, 2);

    recorder.onaudioprocess = function(e){
        if (!recording) return;
        var left = e.inputBuffer.getChannelData (0);
        var right = e.inputBuffer.getChannelData (1);
        // we clone the samples
        leftchannel.push (new Float32Array (left));
        rightchannel.push (new Float32Array (right));
        recordingLength += bufferSize;
    }

    // we connect the recorder
    volume.connect (recorder);
    recorder.connect (context.destination); 
}
