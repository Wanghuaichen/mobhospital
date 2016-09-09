//消息提醒机制
$(document).ready(function(){
		// alert(user_type);
		messageNum();
		window["message_num"] =window.setInterval("messageNum()",5000);
	})

	//当点击弹框里的消息后，做跳转
	$(".dialog_jump").live('click',function(){
		if(art.dialog.list['message_more']){
			art.dialog.list['message_more'].close();
		}else if(art.dialog.list['message']){
			art.dialog.list['message'].close();
		}
	});

	//查看更多
	function DoctorgetAllMessage()
	{		
		$.post("/tiantan_emr/Message/getMessageAllTogater",{zhuyuan_id:current_zhixing_id},function(data){
			if(data != "" && data != null)
			{
				if(data['content'] != "" && data['content'] != null)
				{
					art.dialog({
						id:"message_more",
						title:"智能提醒",
						content:'<div class="message_all" id="message_content">'+data['content']+'</div>',
						padding: '10px 15px',
						lock: true,
						button: [{ name: '关闭我',callback: function () {this.close();} } ],
						close:function(){
							messageClose();
						}
					})

					
				}
			}
		},"json")
	}

	// 消息提醒机制
	function DoctorgetMessage()
	{
		$.post("/tiantan_emr/Message/getMessageTogater",{zhuyuan_id:current_zhixing_id},function(data){
			if(data != "" && data != null)
			{
				if(data['content'] != "" && data['content'] != null)
				{
					$('#message_content').html(data['content']);
					art.dialog({
						id:"message",
						title:"智能提醒",
						button: [ { name: '查看更多', callback: function () {flag = "false"; DoctorgetAllMessage();}, focus: true }, { name: '关闭', callback: function () {this.close()}}],
						content:'<div class="message_all" id="message_content">'+data['content']+'</div>',
						left: '90%',
						top: '95%',
						fixed: true,
						padding: '10px 15px',
						close:function(){
							messageClose();
						}
					})
				}
			}
	   },"json");
	}

	var flag = "true"
	//缩小
	function messageClose()
	{
		if( flag == "true"){
			messageNum()
			window["message_num"] = window.setInterval("messageNum()",10000);
		}
		flag = "true"
	}

	//展开
	function messageOpen()
	{
		clearInterval(window["message_num"]);
		art.dialog.list['message_num'].close();
		DoctorgetMessage();
	}

	//获取消息记录
	function messageNum()
	{
		$.post("/tiantan_emr/Message/getMessageNumTogater",{zhuyuan_id:current_zhixing_id},function(data){
			if(data != "" && data != null)
			{
				if(data['number'] != "" && data['number'] != null)
				{
					if(art.dialog.list['message_num']){
						$('#new_number').html(data['number']);
					}else{
						art.dialog({
							id:"message_num",
							title:"智能提醒",
							content:'<div style="color:red">'+'<span id="new_number">'+data['number']+'</span>'+'条提醒消息</div>',
							button: [{ name: '展开', callback: function () {messageOpen()}} ],
							left: '93%',
							top: '95%',
							fixed: true,
							padding: '0',
						})

					}

					
				}
			}
		},"json");
	}
