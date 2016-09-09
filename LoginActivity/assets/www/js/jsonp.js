$(function(){
	$('#huliwenshu_form').die().live('vmousedown',function(){
		var submit_str="";
		$(".content").find("[contenteditable='true']").each(function(){
			submit_str += $(this).attr("innerid")+"[=>]"+$(this).html()+"[=>]"+"0"+"{[]}";
		});
		$(".content").find("select").each(function(){
			submit_str += $(this).attr("innerid")+"[=>]"+$(this).val()+"[=>]"+"1"+"{[]}";
		});
		$(".content").find("[type='checkbox']").each(function(){
			if($(this).attr("checked")=="checked")
			{
				submit_str += $(this).attr("innerid")+"[=>]"+$(this).val()+"|"+"1"+"[=>]"+"2"+"{[]}";
			}
			else
			{
				submit_str += $(this).attr("innerid")+"[=>]"+""+"|"+""+"[=>]"+"2"+"{[]}";
			}
		});
		$(".content").find("[type='number']").each(function(){
			submit_str += $(this).attr("innerid")+"[=>]"+$(this).val()+"[=>]"+"3"+"{[]}";
		});
		$.post(server_url+"Mobile/HuliWenshu/saveHuliWenshu",{content:submit_str,huliwenshu_id : getRequestOne("huliwenshu_id"),zhuyuan_id:patient_info_global.zhuyuan_id,chuangjian_hushi_name:nurse_info_global.user_name,chuangjian_hushi_id:nurse_info_global.id},function(data){
			alert(data)
		});
	});

	// select选择事件（第一种）
	// 1.选择无后面为空
	// 2.选择有后面增加选项
	// 3.如果选择其他后面继续增加输入框任意输入
	$(".select_and_input_0").live("change",function(){
		var type = $(this).attr("id");
		if($(this).val()=="有")
		{
			$("#"+type+"_item").css("display","block");
			if($("#"+type+"_item").val()=="其他")
			{
				$("#"+type+"_item_others").css("display","block");
			}
		}
		else
		{
			$("#"+type+"_item").css("display","none");
			$("#"+type+"_item_others").css("display","none");
		}
	});

	$(".select_and_input_0_item").live("change",function(){
		var type = $(this).attr("id");
		if($(this).val()=="其他")
		{
			$("#"+type+"_others").css("display","block");
		}
		else
		{
			$("#"+type+"_others").css("display","none");
		}
	});

	// select选择事件（第二种）
	// 1.选择“其他”后面追加输入框
	// 2.选择的不是“其他”隐藏输入框
	$(".select_and_input_1").live("change",function(){
		var group_name = $(this).attr("group");
		if($(this).val()=="其它")
		{
			// 显示输入框
			$("div[group='"+group_name+"']").css("display","block");
		}
		else
		{
			// 隐藏输入框
			$("div[group='"+group_name+"']").css("display","none");
		}
	});

	// checkbox选中事件
	// 1.可多选
	// 2.如果选择“其他”增加输入框可任意输入
	// 3.如果选择的不是“其他”隐藏输入框
	$(".checkbox_and_input").live("click",function(){
		var group_name = $(this).attr("group");
		if($(this).val()=="其他")
		{
			if($(this).attr("checked")!=null)
			{
				// 取消所有选项勾选
				$("input[group='"+group_name+"']").each(function(){
					if($(this).val()!="其他")
					{
						$(this).removeAttr("checked");
					}
				});
				// 显示输入框
				$("div[group='"+group_name+"']").css("display","block");
			}
			else
			{
				$("div[group='"+group_name+"']").css("display","none");
			}
		}
		else
		{
			// 取消“其他”选项勾选
			$("."+group_name+"_others").removeAttr("checked");
			// 隐藏输入框
			$("div[group='"+group_name+"']").css("display","none");
		}
	});
})