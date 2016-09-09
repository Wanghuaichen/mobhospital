/**************************************************
*  Created:  2011-11-01
*  Info:处方列表管理前台js代码
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author DongJie <dj7229@126.com>
*
***************************************************/
var server_url = "localhost";
var zhuyuan_id = "000";
var yishi_id = "000";
var yishi_name = "未登录";
var default_type = "西药及中成药";
var action_url;
$(document).ready(function() {
	// 
	if(action_url==null)
	{
		action_url = "http://"+server_url+"/tiantan_emr/Common/Chufangguanli/addOneChufang/";
	}
	$("[name='add_chufang']").click(function() {
		var temp_str = "";
		if(zhiliao_leibie!="西医治疗")
		{
			temp_str += '<option>中草药</option>';
		}
		if(shifou_zhuyuan_chufang!="off")
		{
			temp_str += '<option>西药中成药</option>';
			//因为康益德这边要求，西医治疗也可以开中药方，暂时把这里打开，没有这个需求的可以自行删除
			temp_str += '<option>中草药</option>';
		}
		art.dialog({
			id:"addchufang",
			title:"创建新处方",
			content:'<div class="addnewchufang">'+
						'<form class="ajax_form" method="post" action="'+action_url+'">'+
							'<table width="100%" border="0" class="addnewchufang_table">'+
							  '<tr>'+
								// '<td style="width:15%;text-align:center;">开立时间</td>'+
								// '<td><input type="text" action_type="datetime" id="" name="kaili_time" class="Wdate" onfocus="WdatePicker({skin:&lt;twoer&lt;,dateFmt:&lt;yyyy-MM-dd HH:mm&lt;,enableKeyboard:false})"></td>'+
								'<td style="width:15%;text-align:center;">处方类型</td>'+
								'<td>'+
									'<select name="type" class="select_type" value="" action_type="others" style="margin:0px; float:left;">'+
										temp_str+
									'</select></td>'+
								'</td>'+
								'<td style="width:15%;text-align:center;">开立医生:</td>'+
								'<td><input type="text" name="kaili_yishi_name" class="input_type_small" value="'+yishi_name+'" disabled="disabled"/></td>'+
							  '</tr>'+
								'<tr>'+
									'<td colspan="4">'+
										'<input type="submit" class="edit_chufang_button" name="add_multi" value="确定开立" />'+
										'<input type="button" class="edit_chufang_button" name="add_cancel" value="取消" />'+
										'<input type="hidden" name="'+basic_info_index+'" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="state" value="新添加" />'+
										'<input type="hidden" name="jine_zongji" value="0" />'+
										'<input type="hidden" name="kaili_yishi_name" value='+yishi_name+' />'+
										'<span name="tips" class="right_tips"></span>'+
									'</td>'+
								'</tr>'+
							'</table>'+
						'</form>'+	
					'</div>',
			lock: true,
			padding:5,
			drag: false,
			resize: false,
			fixed: true,
		})

	})
	$('input[name="add_cancel"]').live("click",function(){
		art.dialog.list['addchufang'].close();
	})
//创建新处方：
	/*$("[name='add_chufang1']").click(function() {  
		//首先判断是否已经打开了编辑框
		if($(this).parent().parent().parent().find("[name='add_chufang_table']").length==0)
		{
			var xuanze;
			if(type == '中草药')
			{
				xuanze = '<option>中草药</option>';
			}
			else if(type == '西药及中成药')
			{
				xuanze = '<option>西药及中成药</option>';
			}
			else if(type == '组合')
			{
				xuanze = '<option>组合</option>';
			}
			else
			{
				xuanze = '<option>中草药</option><option>西药及中成药</option><option>组合</option>';
			}
			//并没有打开编辑框，生成新的编辑框
			$(this).parent().parent().after(
			'<tr class="none_border">'+
			'<td colspan="7" class="add_area">'+
			'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/addOneChufang">'+
				'<ul class="edit_table" name="kaili_chufang_table">'+
					'<li>'+
					'<span >开立时间:</span><input type="text" action_type="datetime" name="kaili_time" class="Wdate" onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:false})" value="'+chufang_date+'"/>'+
					'<span >开立医生:</span><input type="text" name="kaili_yishi_name" class="input_type_small" value="'+yishi_name+'" disabled="disabled"/>'+
					'<span >类别:</span>'+
					'<select name="type" class="select_type" value="" action_type="others">'+
						xuanze+
					'</select>'+
					'</li>'+
					'<li>'+
						'<input type="submit" class="edit_chufang_button" name="add_multi" value="确定开立" />'+
						'<input type="button" class="edit_chufang_button" name="add_cancel" value="取消" />'+
						'<input type="hidden" name="'+basic_info_index+'" value='+zhuyuan_id+' />'+
						'<input type="hidden" name="state" value="新添加" />'+
						'<input type="hidden" name="jine_zongji" value="0" />'+
						'<input type="hidden" name="kaili_yishi_name" value='+yishi_name+' />'+
						'<span name="tips" class="right_tips"></span>'+
					'</li>'+
				'</ul>'+
			'</form>'+	
			'</td>'+		
			'</tr>');
			
			
			//点击添加，先判断内容完整性等，并判断是否已经关闭了其他编辑框
			$(this).parent().parent().parent().find("[name='kaili_chufang_table']").find("[name='add_multi']").click(function(){
				if($(this).parent().parent().find("[name='kaili_time']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请输入处方开立时间!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//验证是否所有编辑项都已经关闭了
				else if($(this).parent().parent().parent().parent().parent().parent().parent().find("[class='edit_table']:visible").length>1)
				{
					$(this).parent().parent().find("[name='tips']").html("请先关闭所有医嘱编辑框后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				else
				{
					return true;
				}

			});
			
			//取消添加事件
			$(this).parent().parent().parent().find("[name='kaili_chufang_table']").find("[name='add_cancel']").click(function(){
				$(this).parent().parent().slideUp();
				$(this).parent().parent().parent().parent().parent().remove();
			});
			
			//输入框类型事件
			$(this).parent().parent().parent().find("[name='kaili_chufang_table']").find(".input_type").focus(function(){
				$(this).addClass("input_type_focus");
			});
			$(this).parent().parent().parent().find("[name='kaili_chufang_table']").find(".input_type").blur(function(){
				$(this).removeClass("input_type_focus");
			});
			$(this).parent().parent().parent().find("[name='kaili_chufang_table']").find(".input_type_full").focus(function(){
				$(this).addClass("input_type_small_focus");
			});
			$(this).parent().parent().parent().find("[name='kaili_chufang_table']").find(".input_type_full").blur(function(){
				$(this).removeClass("input_type_small_focus");
			});
			
			//下拉显示添加框
			$(this).parent().parent().next().find("[name='kaili_chufang_table']").slideDown();
		}//end of if($(this).parent().parent().parent().find("[name='add_multinew_table']").length==0)
		else
		{
			//如果已经打开了一个添加新医嘱的添加框，就通过高亮边框
		}
	});*///end of $("[name='add_yaopin']").click(function() {
});//end of $(document).ready(function() {	
