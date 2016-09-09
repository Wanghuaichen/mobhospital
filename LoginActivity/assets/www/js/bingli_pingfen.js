/**************************************************
*  Created:  2012-10-04
*  Info:病历质控评分前台js代码
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author DongJie <dj7229@126.com>
*
***************************************************/
var server_url = "";
var yishi_id = "000";
var yishi_name = "未登录";
var zhuyuan_id = "000";
var current_zong_koufen = "";
var current_koufen_liyou = "";
//定义插件
(function($){
	$.fn.extend({
		//回车后自动切换至下一个输入窗
		"enterTo":function(){
			var args = arguments;
			var $me = $(this);
			if (args.length == 0){
				return;
			}
			if (typeof args[0] != 'string'){
				return;
			}
			var $el = $(args[0]);
			$me.keydown(function (e) {
				if (e.keyCode == 13){
					$el.focus();
					return false;
				}
			});
			return $el;
		},
		//结束自动切换
		"enterComplete":function(){
			var args = arguments;
			var $me = $(this);
			if (args.length == 0){
				return;
			}
			if (typeof args[0] != 'function'){
				return;
			}
			
			$me.keydown(function (e) {
				if (e.keyCode == 13){
					args[0]();
				}
			});
			return $me;
		}
	});
})(jQuery);


$(document).ready(function() {	
//初始化编辑事件：
	initialEditEvent();
});//end of $(document).ready(function() {	


//********************************************************************************************************
//为当前页面已经存在的表格添加事件监听
function initialEditEvent()
{
	//添加表格编辑的动态效果
	$(".editable").mouseover(function(){
		$(this).addClass("editable_focus");
	});
	$(".editable").mouseout(function(){
		$(this).removeClass("editable_focus");
	});
	
	//可编辑表格点击时，分别可以打开或者关闭编辑框
	$(".editable").toggle(
		function(){
			var hulikaohe_id=$(this).attr('hulikaohe_id');
			var zhikong_type=$(this).attr('zhikong_type');
			$(this).addClass("editable_on_edit");
			var	current_zong_koufen = $(this).find("[name='zong_koufen']").text();
			var	current_koufen_liyou = $(this).find("[name='koufen_liyou']").text();
			var current_state = $(this).find("[name='state']").text();
			var bianhao=$(this).attr("bianhao");
			var relate_index = $("[class_id="+bianhao+"]").attr("rowspan");
			if(current_zong_koufen==null||current_zong_koufen=="")
				current_zong_koufen = "0";
			if(current_koufen_liyou==null||current_koufen_liyou=="")
				current_koufen_liyou = "无";
			if(current_state==null||current_state=="")
				current_state = "不存在";
			if($(this).next().attr("class")!="none_border")
			{
				relate_index_click = parseInt(relate_index)+1;
				$("[class_id="+bianhao+"]").attr("rowspan",relate_index_click);
			}
			//判断是否已经打开过一次了，如果之前又打开过就先删除掉之前打开的那个表格框
			if($(this).next().find("[class='edit_table']").length!=0)
			{
			}
			else
			{
				if (zhikong_type=='护理质控')
					var action_url = 'http://'+server_url+'/tiantan_emr/Zhikong/HuliPingfen/updatePingfen';
				else if(zhikong_type=='护理考核')
					var action_url = 'http://'+server_url+'/tiantan_emr/Zhikong/HuliPingfen/updateKaohePingfen';
				else
					var action_url = 'http://'+server_url+'/tiantan_emr/Zhikong/BingliPingfen/updatePingfen';
				$(this).after(
				'<tr class="none_border">'+
					'<td colspan="4" class="none_border">'+
						'<form class="add_form" method="post" action="'+action_url+'">'+
						'<ul class="edit_table">'+
						'<li>'+
							'<span >问题是否存在:</span><select type="text" name="state" class="select_type" value="'+
							current_state+'">'+
							'<option value="'+current_state+'">'+current_state+'</option>'+
							'<option value="存在">存在</option>'+
							'<option value="已改正">已改正</option>'+
							'</select>'+
							'<span >实际减分数:</span><input type="text" name="zong_koufen" class="input_type" value="'+
							current_zong_koufen+'"/>'+
						'</li>'+
						'<li>'+
							'<span >减分理由:</span><input type="text" name="koufen_liyou" class="input_type" value="'+
							current_koufen_liyou+'"/>'+
						'</li>'+
						'<li>'+
							'<input type="submit" class="edit_button" name="update" value="更新信息" />'+
							'<input type="button" class="edit_button" name="edit_cancel" value="取消编辑" />'+
							'<input type="hidden" name="wenti_leixing" value="'+$(this).find("[name='wenti_leixing']").html()+'" />'+
							'<input type="hidden" name="zhikong_daima" value="'+$(this).find("[name='zhikong_daima']").html()+'" />'+
							'<input type="hidden" name="zhuyuan_id" value="'+zhuyuan_id+'"/>'+
							'<input type="hidden" name="check_doctor_name" value="'+yishi_name+'"/>'+
							'<input type="hidden" name="hulikaohe_id" value="'+hulikaohe_id+'"/>'+
							'<span name="tips" class="right_tips"></span>'+
						'</li>'+
						'</ul>'+
						'</form>'+
					'</td>'+
				'</tr>');
				//输入框类型的事件
				$(this).next().find(".input_type").focus(function(){
					$(this).addClass("input_type_focus");
				});
				$(this).next().find(".input_type").blur(function(){
					$(this).removeClass("input_type_focus");
				});
			}
			//取消编辑事件：
			$(this).parent().find("[name='edit_cancel']").unbind();
			$(this).parent().find("[name='edit_cancel']").click(function(){
				//取消编辑按钮点击后直接关闭
				var this_obj = $(this).parent().parent().parent().parent().parent().prev();
				this_obj.trigger("click");
				return false;
			});
			//下拉显示编辑框
			$(this).next().find("[class='edit_table']").slideDown(100);
			//$(this).ScrollTo("top");
		},//end of function(){
		function(){
			var this_obj = $(this);
			var bianhao=$(this).attr("bianhao");
			var relate_index = $("[class_id="+bianhao+"]").attr("rowspan");
			$(this).next().find("[class='edit_table']").slideUp(100,function(){
				this_obj.removeClass("editable_on_edit");
				$(this).parent().parent().parent().remove();
				relate_index_click = parseInt(relate_index)-1;
				$("[class_id="+bianhao+"]").attr("rowspan",relate_index_click);
			});
			//$(this).ScrollTo("top");
		}
	);
}//end of function initialEditEvent()