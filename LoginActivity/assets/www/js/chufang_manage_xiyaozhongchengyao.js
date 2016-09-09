/**************************************************
*  Created:  2011-11-01
*  Info:西药中成药处方管理前台js代码
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author DongJie <dj7229@126.com>
*  @update:
***************************************************/
var server_url = "";
var user_type = "zhuyuanyishi";
var chufang_id = "000";
var zhuyuan_id = "000";
var chufang_state = "weizhizhuangtai";
var yishi_id = "000";
var yishi_name = "未登录";
var dachufanghao = "";
var form_options={
		dataType: 'json',
		success:function showResponse(data){
		console.log(data);
		window.setTimeout(auto_close,2000);
		saved = true;
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
						style:{
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
	
//定义插件
;(function($){
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
	editChufang();
	
//添加新药品：
	$("[name='add_yaopin']").live("click",function() { 
		var table = $(this).parent().parent().parent().parent();
		if($(this).parent().parent().parent().find('input:[name="chufang_id[]"]').val() != null && typeof($(this).parent().parent().parent().find('input:[name="chufang_id[]"]').val()) != "undefined")
		{
			last_chufang_id = $(this).parent().parent().parent().find('input:[name="chufang_id[]"]').val();
		}
		var input_number = 0;
		input_number = table.find('input:visible[name="yaopin_mingcheng[]"]').size();
		var tempvalue = $(this).parent().parent().parent().find('input:[name="yaopin_mingcheng[]"]').val();
		if(input_number == 1 && tempvalue == '')
		{
			if(!confirm("第一条药品信息为空，你确定要继续添加药品吗?"))
			{
				return false;
			}
		}
		if(input_number >= 5)
		{
			if(confirm("是否添加新的药品?"))
			{
				table.find('input:visible[name="add_yaopin"]').each(function(){
					$(this).attr("disabled","disabled");
				})
				$('input[name="save_yaopin"]').trigger("click");
				var arr = new Array();
				$.ajaxSetup({
					async: false
				});
				$.getJSON("/tiantan_emr/Common/Chufangguanli/chuangjianNewChufang", { chufang_id: last_chufang_id }, function(json){
					//alert("JSON Data: " + json['id']);
					arr = json;
				});
				last_chufang_id = arr['id'];
				var submit_id;
				$.ajaxSetup({
					async: false
				});
				$.post("http://"+server_url+"/tiantan_emr/Common/Chufangguanli/addOneYaopin", { "chufang_id": arr['id'],"dachufanghao":dachufanghao,"type":"西药及中成药"},function(data){
					submit_id = data.id;
				}, "json");
				$.ajaxSetup({
					async: true
				});
				$($(this).parent().parent().parent().parent().parent()).after(
					'<table id="yaopin_table" border="0" cellpadding="0" cellspacing="0" class="content_head_table" style="width:100%;margin-top:20px;">'+
						'<tr>'+
							'<td width="24%" class="info_title">药品名称</td>'+
							'<td width="12%" >每次用量</td>'+
							'<td width="10%" >使用频率</td>'+
							'<td width="10%" >使用用法</td>'+
							'<td width="12%" >数量</td>'+
							'<td width="10%" >单价</td>'+
							'<td width="10%" >小计</td>'+
							'<td width="6%" >付费方式</td>'+
							'<td width="6%" >执行科室</td>'+
							'<td width="10%" style="display: none;">是否<br />自备</td>'+
							'<td width="10%" ><div style="width:80px;">操作</div></td>'+
						'</tr>'+
						'<tr class="blank_yaopin_data" id="'+submit_id+'">'+
							'<td width="24%" class="long_content">'+
								'<input style="width:90%;" type="text" name="yaopin_mingcheng[]" value=""/>'+
							'</td>'+
							'<td width="12%">'+
								'<input style="width:40%;" type="text" name="ciliang[]" value="" />'+
								'<input style="width:30%;" type="text" name="shiyong_danwei[]" value="" />'+
							'</td>'+
							'<td width="10%">'+
								'<input style="width:70%;" name="pinlv[]" value=""/>'+
							'</td>'+
							'<td width="10%">'+
								'<input style="width:70%;" name="yongfa[]" value=""/>'+
							'</td>'+
							'<td width="12%">'+
								'<input style="width:30%;" type="text" name="shuliang[]" value=""/><input style="width:30%;" type="text" name="lingshou_danwei[]" value="" />'+
							'</td>'+
							'<td width="10%"><input style="width:60%;" type="text" name="danjia[]" value="" />元</td>'+
							'<td width="10%"><input style="width:60%;" type="text" name="xiaoji[]" value="" disabled="disabled"/>元</td>'+
							'<td width="6%"><input style="width:80%;" type="text" name="fufeifangshi[]" value="" /></td>'+
							'<td width="6%"><input style="width:80%;" type="text" name="zhixingkeshi[]" value="" /></td>'+
							'<td width="10%" style="display: none;"><input style="width:80%;" type="text" name="shifou_zibei[]" value="" disabled="disabled"/></td>'+
							'<td width="10%">'+
								'<div style="width:80px;">'+
									'<input type="button" name="add_yaopin" class="add_chufang" value="">&nbsp;'+
									'<input type="button" name="delete_yaopin" class="delete_chufang" value="">'+
								'</div>'+
							'</td>'+
								'<input type="hidden" name="pinlv_number[]" value="" />'+
								'<input type="hidden" name="guige_number[]" value="" />'+
								'<input type="hidden" name="jiliang[]" value="" />'+
								'<input type="hidden" name="shiyong_tianshu[]" value="" />'+
								'<input type="hidden" name="id[]" value='+submit_id+' />'+
								'<input type="hidden" name="chufang_id[]" value='+arr['id']+' />'+
								'<input type="hidden" name="dachufanghao[]" value='+dachufanghao+' />'+
								'<input type="hidden" name="'+qianzui+'_id[]" value='+zhuyuan_id+' />'+
								'<input type="hidden" name="yaopin_id[]" value="" />'+
								'<input type="hidden" name="xiaoji[]" value="" />'+
								'<input type="hidden" name="shifou_zibei[]" value="否" />'+
								'<input type="hidden" name="type[]" value="西药及中成药" />'+
								'<input type="hidden" name="zuhao[]" value="0" />'+
						'</tr>'+
					'</table>'
				);
				inputnumber = inputnumber + $(this).parent().parent().parent().find(":input:visible[disabled!='disabled']").length;
			}
		}
		else
		{
			var submit_id;
			$.ajaxSetup({
				async: false
			});
			$.post("http://"+server_url+"/tiantan_emr/Common/Chufangguanli/addOneYaopin", { "chufang_id": last_chufang_id,"dachufanghao":dachufanghao,"type":"西药及中成药"},function(data){
				submit_id = data.id;
			}, "json");
			$.ajaxSetup({
				async: true
			});
			$($(this).parent().parent().parent()).after(
				'<tr class="blank_yaopin_data" id="'+submit_id+'">'+
					'<td width="24%" class="long_content">'+
						'<input style="width:90%;" type="text" name="yaopin_mingcheng[]" value=""/>'+
					'</td>'+
					'<td width="12%">'+
						'<input style="width:40%;" type="text" name="ciliang[]" value="" />'+
						'<input style="width:30%;" type="text" name="shiyong_danwei[]" value="" />'+
					'</td>'+
					'<td width="10%">'+
						'<input style="width:70%;" name="pinlv[]" value=""/>'+
					'</td>'+
					'<td width="10%">'+
						'<input style="width:70%;" name="yongfa[]" value=""/>'+
					'</td>'+
					'<td width="12%">'+
						'<input style="width:30%;" type="text" name="shuliang[]" value=""/><input style="width:30%;" type="text" name="lingshou_danwei[]" value="" />'+
					'</td>'+
					'<td width="10%"><input style="width:60%;" type="text" name="danjia[]" value="" />元</td>'+
					'<td width="10%"><input style="width:60%;" type="text" name="xiaoji[]" value="" disabled="disabled"/>元</td>'+
					'<td width="6%"><input style="width:80%;" type="text" name="fufeifangshi[]" value="" /></td>'+
					'<td width="6%"><input style="width:80%;" type="text" name="zhixingkeshi[]" value="" /></td>'+
					'<td width="10%" style="display: none;"><input style="width:80%;" type="text" name="shifou_zibei[]" value="" disabled="disabled"/></td>'+
					'<td width="10%">'+
						'<div style="width:80px;">'+
							'<input type="button" name="add_yaopin" class="add_chufang" value="">&nbsp;'+
							'<input type="button" name="delete_yaopin" class="delete_chufang" value="">'+
						'</div>'+
					'</td>'+
						'<input type="hidden" name="pinlv_number[]" value="" />'+
						'<input type="hidden" name="guige_number[]" value="" />'+
						'<input type="hidden" name="jiliang[]" value="" />'+
						'<input type="hidden" name="shiyong_tianshu[]" value="" />'+
						'<input type="hidden" name="id[]" value='+submit_id+' />'+
						'<input type="hidden" name="chufang_id[]" value='+last_chufang_id+' />'+
						'<input type="hidden" name="dachufanghao[]" value='+dachufanghao+' />'+
						'<input type="hidden" name="'+qianzui+'_id[]" value='+zhuyuan_id+' />'+
						'<input type="hidden" name="yaopin_id[]" value="" />'+
						'<input type="hidden" name="xiaoji[]" value="" />'+
						'<input type="hidden" name="shifou_zibei[]" value="否" />'+
						'<input type="hidden" name="type[]" value="西药及中成药" />'+
						'<input type="hidden" name="zuhao[]" value="0" />'+
				'</tr>'
			);
			inputnumber = inputnumber + $(this).parent().parent().parent().find(":input:visible[disabled!='disabled']").length;
		}
		$(this).parent().parent().parent().next().find('input[name="yaopin_mingcheng[]"]').focus();
			editChufang();
	});
	$("[name='delete_yaopin']").live("click",function(){
		if($(".blank_yaopin_data").length!=0)
		{
			if(confirm("确定要删除吗?"))
			{
				var table = $(this).parent().parent().parent().parent();
				var input_number = 0;
				input_number = table.find('input:visible[name="yaopin_mingcheng[]"]').size();
				if(input_number == 1)
				{
					if(!confirm("如果删除此条处方也将被删除，你确定要删除吗?"))
					{
						return false;
					}
				}
				if(input_number <= 5)
				{
					table.find('input:visible[name="add_yaopin"]').each(function(){
						$(this).removeAttr("disabled");
					})
				}
				
				inputnumber = inputnumber - $(this).parent().parent().parent().find(":input:visible[disabled!='disabled']").length;
				if(input_number == 1)
				{
					var chufang_id_delete = $(this).parent().parent().parent().find('input:[name="chufang_id[]"]').val();
					$.get("/tiantan_emr/Common/Chufangguanli/deleteChufang", { chufang_id: chufang_id_delete },function(data){
						
					  });
					table.remove();
				}
				var ob_yaopin = $(this).parent().parent().parent();
				yaopin_id = $(this).parent().parent().parent().attr("id");
				$.post("http://"+server_url+"/tiantan_emr/Common/Chufangguanli/deleteOneYaopin", { "id": yaopin_id},function(data){}, "json");
				ob_yaopin.remove();
				$('input[name="save_yaopin"]').trigger("click");
			}
		}
	});
	$("[name='save_yaopin']").click(function(){
		var jine=0;
		$(".blank_yaopin_data").each(function(){
			jine = Number($(this).find("[name='xiaoji[]']").val())+Number(jine);
		});
		$("#jine_zongji").html(jine.toFixed(2));
		$("#yaopin_form").submit();
	});
	function editChufang()
	{
		$("[name='yaopin_mingcheng[]']").each(function(){
			$(this).live("keyup",function(){
				$("[name='yaopin_mingcheng[]']").parent().parent().css("background-color", "#FFF");
			})
			var cache_content = {},lastXhr_content;
			var yaopin_mingcheng_ob = $(this);
			$(this).autocomplete({
				minLength: 2,
				autoFocus: true,
				source: function( request, response ) {
					term = request.term;
					if ( term in cache_content ) {
						response( cache_content[ term ] );
						return;
					}
					lastXhr_content = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getDataYaopinJson/pid/2', request, function( data, status, xhr ) {
						cache_content[ term ] = data;
						if ( xhr === lastXhr_content ) {
							response( data );
						}
					});
				},
				focus: function( event, ui ) {
					//$(this).parent().parent().find('[name="yaopin_mingcheng[]"]').val( ui.item.label+"("+ui.item.guige+")" );
					return false;
				},
				select: function( event, ui ) {
					//$(this).parent().next().find('[name="shiyong_danwei[]"]').attr("disabled","disabled");
					//$(this).parent().next().next().next().next().find('[name="lingshou_danwei[]"]').attr("disabled","disabled");
					$(this).parent().next().next().next().next().next().find('[name="danjia[]"]').attr("disabled","disabled");
					$(this).parent().next().next().next().next().next().next().next().find('[name="fufeifangshi[]"]').attr("disabled","disabled");
					$(this).parent().next().next().next().next().next().next().next().next().find('[name="zhixingkeshi[]"]').attr("disabled","disabled");
					if($(this).parent().parent().find("input[type='hidden'][name='shiyong_danwei[]']").length==0)
					{
						// $(this).parent().parent().append('<input type="hidden" name="shiyong_danwei[]" value="" />');
					}
					if($(this).parent().parent().find("input[type='hidden'][name='lingshou_danwei[]']").length==0)
					{
						// $(this).parent().parent().append('<input type="hidden" name="lingshou_danwei[]" value="" />');
					}
					if($(this).parent().parent().find("input[type='hidden'][name='danjia[]']").length==0)
					{
						$(this).parent().parent().append('<input type="hidden" name="danjia[]" value="" />');
					}
					if($(this).parent().parent().find("input[type='hidden'][name='fufeifangshi[]']").length==0)
					{
						$(this).parent().parent().append('<input type="hidden" name="fufeifangshi[]" value="" />');
					}
					if($(this).parent().parent().find("input[type='hidden'][name='zhixingkeshi[]']").length==0)
					{
						$(this).parent().parent().append('<input type="hidden" name="zhixingkeshi[]" value="" />');
					}
					$(this).parent().parent().find('[name="yaopin_mingcheng[]"]').val( ui.item.label+"("+ui.item.guige+")" );
					$(this).parent().parent().find('[name="shiyong_danwei[]"]').val( ui.item.measure_unit );
					$(this).parent().parent().find('[name="lingshou_danwei[]"]').val( ui.item.lingshou_danwei );
					//$(this).parent().parent().parent().find('[name="kucun[]"]').val( ui.item.kucun );
					$(this).parent().parent().find('[name="zhixingkeshi[]"]').val( ui.item.zhixingkeshi );
					$(this).parent().parent().find('[name="danjia[]"]').val( ui.item.danjia );
					$(this).parent().parent().find('[name="fufeifangshi[]"]').val( ui.item.fufeifangshi );
					$(this).parent().parent().find('[name="yaopin_id[]"]').val( ui.item.id );
					$(this).parent().parent().find('[name="guige_number[]"]').val( ui.item.guige_number );
					$(this).parent().parent().find('[name="jiliang[]"]').val( ui.item.jiliang );
					var type = ui.item.type;
					var yaojileixing = ui.item.yaojileixing;
					var yongfa_pid = '11000';
					var zhusheleiString = '注射液|注射剂|吸入剂|吸入粉剂喷雾剂|喷鼻剂|吸入粉剂|小针|气雾剂|溶液剂（吸入）|粉剂|粉针|粉针剂';
					if(zhusheleiString.indexOf(yaojileixing)>0) yongfa_pid = '13000';
					if(type=="西药中成药")
					{
					}
					else
					{
					}
					//检查是否是药品名称是否有"自带"
					var yaopin_name_reg = /自带/;
					
					$("[action_type='others']").click(function(){
						if($(this).val()=="others")
						{
							if($(this).attr("name").indexOf("_changed")!=-1)
							{
								var name = $(this).attr("name").substr(0,$(this).attr("name").indexOf("_changed"));
								$("[name='"+name+"']").remove();
								$(this).attr("name",name);
							}
							
							$(this).parent().remove(".input_type_small");
							$(this).parent().append('<input type="text" value="请输入" name="'+$(this).attr("name")+'" class="input_type_small"/>');
							$(this).attr("name",$(this).attr("name")+"_changed");
							return false;
						}
						else
						{
							if($(this).attr("name").indexOf("_changed")!=-1)
							{
								var name = $(this).attr("name").substr(0,$(this).attr("name").indexOf("_changed"));
								$("[name='"+name+"']").remove();
								$(this).attr("name",name);
							}
							return false;
						}
					});
					return false;
				}
			})
			.data( "autocomplete" )._renderItem = function( ul, item ) {
				var label = item.label.replace(
								new RegExp(
									"(?![^&;]+;)(?!<[^<>]*)(" +
									term +
									")(?![^<>]*>)(?![^&;]+;)", "gi"
								), "<span class=\"keyword\">$1</span>" );
				var desc = item.desc.replace(
								new RegExp(
									"(?![^&;]+;)(?!<[^<>]*)(" +
									term +
									")(?![^<>]*>)(?![^&;]+;)", "gi"
								), "<span class=\"keyword\">$1</span>" );
				return $( "<li></li>" )
					.data( "item.autocomplete", item )
					.append( "<a>" + label + "<br /><span class=\"desc\">" + desc + "</span></a>" )
					.appendTo( ul );
			};
		});
		//根据数量算天数
		var zhongjine = 0;
		$("[name='shuliang[]']").each(function(){
			$(this).blur(function(){
				//如果不为自带药品，则根据数量算天数
				if($('#zidai_yaopin_mingcheng').html() == null)
				{
					var pinlv = $(this).parent().parent().find("[name='pinlv_number[]']").val();
					var guige = $(this).parent().parent().find("[name='guige_number[]']").val();
					var jiliang = $(this).parent().parent().find("[name='jiliang[]']").val();
					var shiyong_tianshu = Math.ceil($(this).val()*(guige*jiliang)/($(this).parent().parent().find("[name='ciliang[]']").val()*pinlv));
					$(this).parent().parent().find("[name='shiyong_tianshu[]']").val(shiyong_tianshu);
					
					//计算小计
					var xiaoji = Number($(this).val()*$(this).parent().parent().find("[name='danjia[]']").val());
					$(this).parent().parent().find("[name='xiaoji[]']").val(xiaoji.toFixed(2));
				}
			});
			$(this).keyup(function(){
				//如果不为自带药品，则根据数量算天数
				if($('#zidai_yaopin_mingcheng').html() == null)
				{
					var pinlv = $(this).parent().parent().find("[name='pinlv_number[]']").val();
					var guige = $(this).parent().parent().find("[name='guige_number[]']").val();
					var jiliang = $(this).parent().parent().find("[name='jiliang[]']").val();
					var shiyong_tianshu = Math.ceil($(this).val()*(guige*jiliang)/($(this).parent().parent().find("[name='ciliang[]']").val()*pinlv));
					$(this).parent().parent().find("[name='shiyong_tianshu[]']").val(shiyong_tianshu);
					
					//计算小计
					var xiaoji = Number($(this).val()*$(this).parent().parent().find("[name='danjia[]']").val());
					$(this).parent().parent().find("[name='xiaoji[]']").val(xiaoji.toFixed(2));
				}
			});
		});
		$("[name='danjia[]']").each(function(){
			$(this).blur(function(){
				//如果不为自带药品，则根据数量算天数
				if($('#zidai_yaopin_mingcheng').html() == null)
				{
					var xiaoji = Number($(this).val()*$(this).parent().parent().find("[name='shuliang[]']").val());
					$(this).parent().parent().find("[name='xiaoji[]']").val(xiaoji.toFixed(2));
				}
			});
			$(this).keyup(function(){
				//如果不为自带药品，则根据数量算天数
				if($('#zidai_yaopin_mingcheng').html() == null)
				{
					var xiaoji = Number($(this).val()*$(this).parent().parent().find("[name='shuliang[]']").val());
					$(this).parent().parent().find("[name='xiaoji[]']").val(xiaoji.toFixed(2));
				}
			});
		});
	}
	//开立此处方：
	$("[name='kaili_chufang']").live('click',function() { 
		$('input[name="save_yaopin"]').trigger("click");
		var myDate = new Date();
		var kaili_time = myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes();
		art.dialog({
			id:"kaili_chufang_dialog",
			title:"同步医嘱",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/updateChufang">'+
									'<li>'+
									'<span class="info_title">同步时间:</span><input type="text" action_type="datetime" name="kaili_time" class="Wdate" onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:false})" value="'+chufang_date+'"/>'+
									'<span >操作医生:</span><input type="text" name="kaili_yishi_name" class="input_type_small" value="'+yishi_name+'" disabled="disabled"/>'+
									'<span >药品金额总计:</span><input type="text" name="jine_zongji" class="input_type_small" value="'+$(".chufang_bottom").find("[name=jine_zongji]").html()+'" disabled="disabled"/>元'+
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_chufang_button" name="add_multi" value="确定同步" />'+
										'<input type="button" class="edit_chufang_button" name="add_cancel" value="取消" />'+
										'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="id" value='+chufang_id+' />'+
										'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
										'<input type="hidden" name="yizhu_type" value="" />'+
										'<input type="hidden" name="state" value="新添加" />'+
										'<input type="hidden" name="kaili_yishi_name" value='+yishi_name+' />'+
										'<input type="hidden" name="type" value="西药及中成药" />'+
										'<input type="hidden" name="yongfa_type" value="西药中成药" />'+
										'<input type="hidden" name="shifou_daiyao" value="否" />'+
										'<span name="tips" class="right_tips"></span>'+
									'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				
				var zichufang_size=$("td::contains('子处方单')").size();
				if(zichufang_size<1) zichufang_size=1;
				//点击添加，先判断内容完整性等，并判断是否已经关闭了其他编辑框
				$("[name='add_multi']").live("click",function(){
					var add_multi_ob = $(this);
					if($(this).parent().parent().find("[name='kaili_time']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请输入医嘱同步时间!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						return false;
					}
					else if($(this).parent().parent().find("[name='tips']").html()!="请选择要添加的医嘱类型")
					{
						art.dialog({
							id:"tongbu_yizhu_dialog",
							lock: true,
							//opacity: 0.2,	// 透明度
							title: '添加医嘱',
							content: '<div style="width:350px;height:120px;">'+
												'<span>请选择添加医嘱的类型</span>'+
												'<br/>'+
												'<br/>'+
												'<br/>'+
												'<input style="height:30px;background:#1987D4;color:white;border:1px solid yellow;padding:5px;margin:5px 5px 5px 150px;border-radius:5px;" type="button" id="add_nosyn" value="不添加医嘱" />'+
												'<input style="height:30px;background:#33FF33;color:white;border:1px solid yellow;padding:5px;margin:5px 5px 5px 10px;border-radius:5px;" type="button" id="add_synlong" value="长期" />'+
												'<input style="height:30px;background:#FFAA33;color:white;border:1px solid yellow;padding:5px;margin:5px 5px 5px 10px;border-radius:5px;" type="button" id="add_syntemp" value="临时" />'+
											'</div>',
							padding:5,
							close: function() {
								add_multi_ob.parent().parent().find("[name='tips']").html("请选择将要添加的医嘱类型");
								add_multi_ob.parent().parent().find("[name='tips']").addClass("error_tips");
							},
							init: function () {
								$("#add_nosyn").hover(function(){
									$(this).css("background","#5599FF");
								},function(){
									$(this).css("background","#1987D4");
								});
								$("#add_synlong").hover(function(){
									$(this).css("background","#BBFF66");
								},function(){
									$(this).css("background","#33FF33");
								});
								$("#add_syntemp").hover(function(){
									$(this).css("background","#FFBB66");
								},function(){
									$(this).css("background","#FFAA33");
								});
								$("#add_nosyn").click(function(){
									add_multi_ob.parent().parent().find("[name=yizhu_type]").val('no');
									add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
									add_multi_ob.parent().parent().submit();
								});
								$("#add_synlong").click(function(){
									add_multi_ob.parent().parent().find("[name=yizhu_type]").val('changqi');
									add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
									add_multi_ob.parent().parent().submit();
								});
								$("#add_syntemp").click(function(){
									add_multi_ob.parent().parent().find("[name=yizhu_type]").val('linshi');
									add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
									add_multi_ob.parent().parent().submit();
								});
							}
							/*width: 500, 
							button: [{
								name: '不添加医嘱',
							callback: function () {
								add_multi_ob.parent().parent().find("[name=yizhu_type]").val('no');
								add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
								add_multi_ob.parent().parent().submit();
							},
							focus: false
							},{
								name: '长期',
							callback: function () {
								add_multi_ob.parent().parent().find("[name=yizhu_type]").val('changqi');
								add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
								add_multi_ob.parent().parent().submit();
								},
								focus: false
							},{
								name: '临时',
							callback: function () {
								add_multi_ob.parent().parent().find("[name=yizhu_type]").val('linshi');
								add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
								add_multi_ob.parent().parent().submit();
							},
							focus: false
							}],*/
							//okVal: '确定',
							//ok: true,
						//	cancelVal: '取消',
						//	cancel: true
						});
						//选择医嘱类型
						/*
						$(this).parent().parent().parent().find("[name='add_multi']").attr('id','submitting');
						$(this).parent().parent().find("[name='tips']").html("请选择要添加的医嘱类型");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();*/
						return false;
					}
					else
					{
						//医嘱套餐的添加，表单提交并刷新页面
						$(this).parent().parent().parent().find("[name='add_multi']").attr('id','');
						$(this).parent().parent().find("[name='tips']").html("");
						$(this).parent().parent().find("[name='tips']").removeClass("error_tips");
						$(this).parent().parent().submit();
					}
				});
				//取消添加事件
				$("[name='add_cancel']").click(function(){
					art.dialog.list['kaili_chufang_dialog'].close();
				});
				//输入框类型事件
				/*$(".input_type").focus(function(){
					$(this).addClass("input_type_focus");
				});
				$(".input_type").blur(function(){
					$(this).removeClass("input_type_focus");
				});
				$(".input_type_full").focus(function(){
					$(this).addClass("input_type_small_focus");
				});
				$(".input_type_full").blur(function(){
					$(this).removeClass("input_type_small_focus");
				});*/
			}
		});
		//下拉显示添加框
		//$(this).parent().parent().next().find("[name='kaili_chufang_table']").slideDown();
	});//end of $("[name='kaili_chufang']").click(function() {

	//下达医嘱
	$("[name='xiada_yizhu']").live('click',function() { 
		$('input[name="save_yaopin"]').trigger("click");
		var yizhu_type = $('input[name="yizhu_type"]').val();
		var myDate = new Date();
		var kaili_time = myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes();
		art.dialog({
			id:"kaili_chufang_dialog",
			title:"同步医嘱",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/updateChufang">'+
									'<li>'+
									'<span class="info_title">同步时间:</span><input type="text" action_type="datetime" name="kaili_time" class="Wdate" onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:false})" value="'+chufang_date+'"/>'+
									'<span >操作医生:</span><input type="text" name="kaili_yishi_name" class="input_type_small" value="'+yishi_name+'" disabled="disabled"/>'+
									'<span >药品金额总计:</span><input type="text" name="jine_zongji" class="input_type_small" value="'+$(".chufang_bottom").find("[name=jine_zongji]").html()+'" disabled="disabled"/>元'+
									'</li>'+
									'<li>'+
										'<input type="submit" class="edit_chufang_button"  value="确定下达" />'+
										'<input type="button" class="edit_chufang_button" name="add_cancel" value="取消" />'+
										'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="id" value='+chufang_id+' />'+
										'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
										'<input type="hidden" name="yizhu_type" value="'+yizhu_type+'" />'+
										'<input type="hidden" name="state" value="新添加" />'+
										'<input type="hidden" name="kaili_yishi_name" value='+yishi_name+' />'+
										'<input type="hidden" name="type" value="西药及中成药" />'+
										'<input type="hidden" name="yongfa_type" value="西药中成药" />'+
										'<input type="hidden" name="shifou_daiyao" value="否" />'+
										'<span name="tips" class="right_tips"></span>'+
										'<input type="hidden" name="add_multi" value="确定开立" />'+
										'<input type="hidden" name="url_type" value="'+yizhu_type+'" />'+
									'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				
				var zichufang_size=$("td::contains('子处方单')").size();
				if(zichufang_size<1) zichufang_size=1;
				//点击添加，先判断内容完整性等，并判断是否已经关闭了其他编辑框
				$("[name='add_multi']").live("click",function(){
					var add_multi_ob = $(this);
					if($(this).parent().parent().find("[name='kaili_time']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请输入医嘱同步时间!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						return false;
					}
					else if($(this).parent().parent().find("[name='tips']").html()!="请选择要添加的医嘱类型")
					{
						art.dialog({
							id:"tongbu_yizhu_dialog",
							lock: true,
							//opacity: 0.2,	// 透明度
							title: '添加医嘱',
							content: '<div style="width:350px;height:120px;">'+
												'<span>请选择添加医嘱的类型</span>'+
												'<br/>'+
												'<br/>'+
												'<br/>'+
												'<input style="height:30px;background:#1987D4;color:white;border:1px solid yellow;padding:5px;margin:5px 5px 5px 150px;border-radius:5px;" type="button" id="add_nosyn" value="不添加医嘱" />'+
												'<input style="height:30px;background:#33FF33;color:white;border:1px solid yellow;padding:5px;margin:5px 5px 5px 10px;border-radius:5px;" type="button" id="add_synlong" value="长期" />'+
												'<input style="height:30px;background:#FFAA33;color:white;border:1px solid yellow;padding:5px;margin:5px 5px 5px 10px;border-radius:5px;" type="button" id="add_syntemp" value="临时" />'+
											'</div>',
							padding:5,
							init: function () {
								$("#add_nosyn").hover(function(){
									$(this).css("background","#5599FF");
								},function(){
									$(this).css("background","#1987D4");
								});
								$("#add_synlong").hover(function(){
									$(this).css("background","#BBFF66");
								},function(){
									$(this).css("background","#33FF33");
								});
								$("#add_syntemp").hover(function(){
									$(this).css("background","#FFBB66");
								},function(){
									$(this).css("background","#FFAA33");
								});
								$("#add_nosyn").click(function(){
									add_multi_ob.parent().parent().find("[name=yizhu_type]").val('no');
									add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
									add_multi_ob.parent().parent().submit();
								});
								$("#add_synlong").click(function(){
									add_multi_ob.parent().parent().find("[name=yizhu_type]").val('changqi');
									add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
									add_multi_ob.parent().parent().submit();
								});
								$("#add_syntemp").click(function(){
									add_multi_ob.parent().parent().find("[name=yizhu_type]").val('linshi');
									add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
									add_multi_ob.parent().parent().submit();
								});
							}
							/*width: 500, 
							button: [{
								name: '不添加医嘱',
							callback: function () {
								add_multi_ob.parent().parent().find("[name=yizhu_type]").val('no');
								add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
								add_multi_ob.parent().parent().submit();
							},
							focus: false
							},{
								name: '长期',
							callback: function () {
								add_multi_ob.parent().parent().find("[name=yizhu_type]").val('changqi');
								add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
								add_multi_ob.parent().parent().submit();
								},
								focus: false
							},{
								name: '临时',
							callback: function () {
								add_multi_ob.parent().parent().find("[name=yizhu_type]").val('linshi');
								add_multi_ob.after('<input type="hidden" name="add_multi" value="确定开立" />');
								add_multi_ob.parent().parent().submit();
							},
							focus: false
							}],*/
							//okVal: '确定',
							//ok: true,
						//	cancelVal: '取消',
						//	cancel: true
						});
						//选择医嘱类型
						$(this).parent().parent().parent().find("[name='add_multi']").attr('id','submitting');
						$(this).parent().parent().find("[name='tips']").html("请选择要添加的医嘱类型");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						return false;
					}
					else
					{
						//医嘱套餐的添加，表单提交并刷新页面
						$(this).parent().parent().parent().find("[name='add_multi']").attr('id','');
						$(this).parent().parent().find("[name='tips']").html("");
						$(this).parent().parent().find("[name='tips']").removeClass("error_tips");
						$(this).parent().parent().submit();
					}
				});
				//取消添加事件
				$("[name='add_cancel']").click(function(){
					art.dialog.list['kaili_chufang_dialog'].close();
				});
				//输入框类型事件
				/*$(".input_type").focus(function(){
					$(this).addClass("input_type_focus");
				});
				$(".input_type").blur(function(){
					$(this).removeClass("input_type_focus");
				});
				$(".input_type_full").focus(function(){
					$(this).addClass("input_type_small_focus");
				});
				$(".input_type_full").blur(function(){
					$(this).removeClass("input_type_small_focus");
				});*/
			}
		});
		//下拉显示添加框
		//$(this).parent().parent().next().find("[name='kaili_chufang_table']").slideDown();
	});//end of $("[name='kaili_chufang']").click(function() {

//取消开立此处方：
	$("[name='kaili_cancle']").click(function() {  
		art.dialog({
			id:"kaili_cancle_dialog",
			title:"取消开立",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/updateChufang">'+
									'<li>'+
									'<span class="info_title">是否确认取消开立此处方？</span>'+
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_chufang_button" name="queding_quxiao" value="确定取消" />'+
										'<input type="button" class="edit_chufang_button" name="cancel" value="取消" />'+
										'<input type="hidden" name="id" value='+chufang_id+' />'+
										'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
										'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="state" value="新添加" />'+
										'<input type="hidden" name="type" value="西药及中成药" />'+
										'<span name="tips" class="right_tips"></span>'+
									'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				//点击添加，先判断内容完整性等，并判断是否已经关闭了其他编辑框
				$("[name='queding_quxiao']").click(function(){
					$(this).parent().parent().submit();
				});
				//取消添加事件
				$("[name='cancel']").click(function(){
					art.dialog.list['kaili_cancle_dialog'].close();
					window.setTimeout(page_reload,2000);
				});
			}
		});
		//下拉显示添加框
		//$(this).parent().parent().next().find("[name='delete_chufang_table']").slideDown();
	});//end of $("[name='kaili_cancle']").click(function() {
	
//添加药物过敏试验：
	$("[name='add_guominshiyan']").click(function() {
		art.dialog({
			id:"add_guominshiyan_dialog",
			title:"添加过敏药物试验",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/ZhuyuanYishi/Jiancha/addYaowuJiancha">'+
									'<li>'+
										'<span>开立时间:</span><input type="text" name="shenqing_shijian" class="input_type" />'+
										'<span>开立医师:</span><input type="text" name="shenqingyishi" class="input_type" value="'+yishi_name+'" disabled="disabled" />'+
									'</li>'+
									'<li>'+
										'<span>药物过敏实验名称:</span><input type="text" name="jiancha_mingcheng" class="input_type" style="width:43.4%;" />'+
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_chufang_button" name="queding_tianjia" value="确定添加" />'+
										'<input type="button" class="edit_chufang_button" name="cancel" value="取消" />'+
										'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="shenqingyishi" value='+yishi_name+' />'+
										'<input type="hidden" name="chufang_id" value='+chufang_id+' />'+
										'<input type="hidden" name="jiancha_mingcheng_changed" value="others" />'+
										'<input type="hidden" name="jiancha_zhuangtai" value="已申请" />'+
										'<input type="hidden" name="__hash__" value="'+__hash__+'"/>'+
										'<span name="tips" class="right_tips"></span>'+
									'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				$('[name="shenqing_shijian"]').datetimepicker({
					timeFormat: 'hh:mm',
					dateFormat: 'yy-mm-dd'
				});
				var cache_yongfa = {},lastXhr_yongfa;
				$('[name="jiancha_mingcheng"]').autocomplete({
					minLength:0,
					autoFocus: true,
					source:function( request, response ) {
						term = request.term;
						if ( term in cache_yongfa ) {
							response( cache_yongfa [ term ] );
							return;
						}
						lastXhr_yongfa = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getDataYizhuOneJson', request, function( data, status, xhr ) {
						cache_yongfa [ term ] = data;
						if ( xhr === lastXhr_yongfa ) {
							response( data );
						}
						$(this).parent().parent().parent().find('[name="jiancha_mingcheng"]').ScrollTo("top");
					});
					},
					focus: function( event, ui ) {
						$(this).parent().parent().parent().find('[name="jiancha_mingcheng"]').val( ui.item.label );
						return false;
					},
					select: function( event, ui ) {
						$(this).parent().parent().parent().find('[name="jiancha_mingcheng"]').val( ui.item.label );
						return false;
					}
				})
				.data( "autocomplete" )._renderItem = function( ul, item ) {
					var label = item.label.replace(
									new RegExp(
										"(?![^&;]+;)(?!<[^<>]*)(" +
										term +
										")(?![^<>]*>)(?![^&;]+;)", "gi"
									), "<span class=\"keyword\">$1</span>" );
					var desc = item.desc.replace(
									new RegExp(
										"(?![^&;]+;)(?!<[^<>]*)(" +
										term +
										")(?![^<>]*>)(?![^&;]+;)", "gi"
									), "<span class=\"keyword\">$1</span>" );
					return $( "<li></li>" )
						.data( "item.autocomplete", item )
						.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
						.appendTo( ul );
				};
				//点击添加，先判断内容完整性等，并判断是否已经关闭了其他编辑框
				$("[name='queding_tianjia']").click(function(){
					if($(this).parent().parent().find("[name='shenqing_shijian']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请输入药物过敏实验开立时间!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						return false;
					}else if($(this).parent().parent().find("[name='jiancha_mingcheng']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请输入药物过敏实验名称!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						return false;
					}else{
						$(this).parent().parent().submit();
						art.dialog.list['add_guominshiyan_dialog'].close();
					}
				});
				//取消添加事件
				$("[name='cancel']").click(function(){
					art.dialog.list['add_guominshiyan_dialog'].close();
				});
			}
		});
		//下拉显示添加框
		//$(this).parent().parent().next().find("[name='add_guominshiyan_table']").slideDown();
	});
	
//修改出院带药状态：
	$("[name='shifou_daiyao']").click(function() {  
		if($(this).parent().parent().parent().find("[name='xiugai_chuyuan_daiyao_table']").length==0)
		{
				$(this).parent().parent().after(
				'<tr class="none_border" id="xiugai_chuyuan_daiyao_table_false" style="display: none;" >'+	
				'<td colspan="8" class="none_border">'+
				'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/changeChuyuanDaiyao">'+
					'<input type="submit" class="edit_chufang_button" name="xiugai_daiyao" />'+
					'<input type="hidden" name="id" value='+chufang_id+' />'+
					'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
					'<input type="hidden" name="shifou_daiyao" value="否" />'+
				'</form>'+
				'</td>'+
				'</tr>');
				
				$(this).parent().parent().after(
				'<tr class="none_border" id="xiugai_chuyuan_daiyao_table_true" style="display: none;" >'+	
				'<td colspan="8" class="none_border">'+
				'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/changeChuyuanDaiyao">'+
					'<input type="submit" class="edit_chufang_button" name="xiugai_daiyao" />'+
					'<input type="hidden" name="id" value='+chufang_id+' />'+
					'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
					'<input type="hidden" name="shifou_daiyao" value="是" />'+
				'</form>'+
				'</td>'+
				'</tr>')
				
				$("[name='shifou_daiyao_label']").ScrollTo("top");
		}
			if($(this).val()=="取消出院带药"){
				//$("[name='shifou_daiyao_label']").css("display","none");
				$("[name='shifou_daiyao_label']").hide();
				$(this).val("出院带药");
				
				$("#xiugai_chuyuan_daiyao_table_false").find("[name='xiugai_daiyao']").click(function(){
					//验证通过，ajax方式添加新的药品内容:
					$("#xiugai_chuyuan_daiyao_table_false").find('.ajax_form').ajaxSubmit(form_options); 
					//$(this).parent().parent().parent().prev().click();
					return false;
				});
				$("#xiugai_chuyuan_daiyao_table_false").find("[name='xiugai_daiyao']").trigger("click");
			}else{
				//$("[name='shifou_daiyao_label']").css("display","inline");
				$("[name='shifou_daiyao_label']").show();
				$(this).val("取消出院带药");
				
				$("#xiugai_chuyuan_daiyao_table_true").find("[name='xiugai_daiyao']").click(function(){
					//验证通过，ajax方式添加新的药品内容:
					$("#xiugai_chuyuan_daiyao_table_true").find('.ajax_form').ajaxSubmit(form_options); 
					//$(this).parent().parent().parent().prev().click();
					return false;
				});
				$("#xiugai_chuyuan_daiyao_table_true").find("[name='xiugai_daiyao']").trigger("click");
			}
		//}
	});


//设置处方已给药：
	$("[name='chufang_geiyao']").click(function() {
		art.dialog({
			id:"chufang_geiyao_dialog",
			title:"确定给药",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/updateChufang">'+
									'<li>'+
									'<span class="info_title">是否确认此处方已经给药？</span>'+
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_chufang_button" name="queding_geiyao" value="确定给药" />'+
										'<input type="button" class="edit_chufang_button" name="geiyao_cancel" value="取消" />'+
										'<input type="hidden" name="id" value='+chufang_id+' />'+
										'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
										'<input type="hidden" name="state" value="已给药" />'+
										'<input type="hidden" name="type" value="西药及中成药" />'+
										'<span name="tips" class="right_tips"></span>'+
									'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				//点击添加，先判断内容完整性等，并判断是否已经关闭了其他编辑框
				$("[name='queding_geiyao']").click(function(){
					$(this).parent().parent().submit();
				});
				//取消添加事件
				$("[name='geiyao_cancel']").click(function(){
					art.dialog.list['chufang_geiyao_dialog'].close();
				});
			}
		});
		//下拉显示添加框
		//$(this).parent().parent().next().find("[name='chufang_geiyao_table']").slideDown();
	});//end of $("[name='chufang_geiyao']").click(function() {

	//删除此处方：
	$("[name='delete_chufang']").click(function() {  
		art.dialog({
			id:"delete_chufang_dialog",
			title:"删除处方",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/deleteOneChufang">'+
									'<li>'+
									'<span class="info_title">是否确认删除此处方？</span>'+
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_chufang_button" name="queding_delete" value="确定删除" />'+
										'<input type="button" class="edit_chufang_button" name="delete_cancel" value="取消" />'+
										'<input type="hidden" name="id" value='+chufang_id+' />'+
										'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
										'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="type" value="西药及中成药" />'+
										'<span name="tips" class="right_tips"></span>'+
									'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				//点击添加，先判断内容完整性等，并判断是否已经关闭了其他编辑框
				$("[name='queding_delete']").click(function(){
					$(this).parent().parent().submit();
				});
				//取消添加事件
				$("[name='delete_cancel']").click(function(){
					art.dialog.list['delete_chufang_dialog'].close();
					window.setTimeout(page_reload,2000);
				});
			}
		});
		//下拉显示添加框
		//$(this).parent().parent().next().find("[name='delete_chufang_table']").slideDown();
	});//end of $("[name='delete_chufang']").click(function() {

//重新开立处方：
	$("[name='chongxin_kaili']").click(function() {  
		art.dialog({
			id:"chongxin_kaili_dialog",
			title:"重新开立处方",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/copyOneChufang">'+
									'<li>'+
									'<span class="info_title">是否确定重新开立此处方？此操作将复制一份新的处方用于再次开立。</span>'+
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_chufang_button" name="queding_fuzhi" value="确定" />'+
										'<input type="button" class="edit_chufang_button" name="fuzhi_cancel" value="取消" />'+
										'<input type="hidden" name="id" value='+chufang_id+' />'+
										'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
										'<span name="tips" class="right_tips"></span>'+
									'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				//点击添加，先判断内容完整性等，并判断是否已经关闭了其他编辑框
				$("[name='queding_fuzhi']").click(function(){
					$(this).parent().parent().submit();
				});
				//取消添加事件
				$("[name='fuzhi_cancel']").click(function(){
					art.dialog.list['chongxin_kaili_dialog'].close();
				});
			}
		});
		//下拉显示添加框
		//$(this).parent().parent().next().find("[name='chongxin_chufang_table']").slideDown();
	});//end of $("[name='chongxin_kaili']").click(function() {	
//重新开立处方：
	$("#isNull").click(function() {
	});//end of $("[name='chongxin_kaili']").click(function() {
});//end of $(document).ready(function() {	


//********************************************************************************************************
//为当前页面已经存在的表格添加事件监听
function initialEditEvent()
{
	//添加表格编辑的动态效果
	$(".editable").mouseover(function(){
		$(this).addClass("editable_focus");
		if(operator_type!='yishi'){
			$(this).css('cursor','default');
		}
	});
	$(".editable").mouseout(function(){
		$(this).removeClass("editable_focus");
	});
	
	//可编辑表格点击时，分别可以打开或者关闭编辑框
	$(".editable").toggle(
		function(){
			var editable_chufang = $(this);
			if(operator_type=='yishi'){
				$(this).addClass("editable_on_edit");
				if(chufang_state=="新添加")
				{
					isZidaiYaopin_flag='false';
					var yaopin_id = $(this).attr("yaopin_id");
					$.ajax(
					{
						url:'http://'+server_url+'/tiantan_emr/Common/Data/isZidaiYaopin?yid='+yaopin_id, 
						success:function(data)
						{
							isZidaiYaopin_flag = data;
						},
						async:false
					});
					var ZidaiYaopin_reg = /.*true.*/;
					//如果是自带药品，则是否自备栏只能是自备
					if(ZidaiYaopin_reg.exec(isZidaiYaopin_flag) == "true")
					{
						var shifou_zibei1='<option value="自备">自备</option>';
						var shifou_zibei2='';
					}
					else{
						//判断shifou_zibei初始状态
						var shifou_zibei1, shifou_zibei2;
						if($.trim($(this).find("[name='shifou_zibei']").html())!="自备"){
							shifou_zibei1='<option value="否">否</option>';
							shifou_zibei2='<option value="自备">自备</option>';
						}else {
							shifou_zibei1='<option value="自备">自备</option>';
							shifou_zibei2='<option value="否">否</option>';
						}
					}
					var yaopin_mingcheng = $(this).find("[name='yaopin_mingcheng']").html();
					art.dialog({
						id:"edit_chufang_dialog",
						title:"编辑处方",
						content:'<form style="width:750px;" class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/updateOneYaopin">'+
												'<li>'+
													'<span >药品名称:</span><input type="text" name="yaopin_mingcheng" class="input_type_full" value="'
													+yaopin_mingcheng+
													'" disabled="disabled"/>'+
												'</li>'+
												'<li>'+
													'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
													+$(this).find("[name='ciliang']").html()+
													'" />'+
													'<input type="text" name="shiyong_danwei" class="input_type_small" value="'
													+$(this).find("[name='shiyong_danwei']").html()+
													'" disabled="disabled"/>'+
													'<span >使用方法:</span><input name="yongfa" id="yongfa" class="input_type" value="'
													+$(this).find("[name='yongfa']").html()+
													'"　/>'+
													'<span >使用频率:</span><input name="pinlv" id="pinlv" class="input_type" value="'
													+$(this).find("[name='pinlv']").html()+
													'" />'+
												'</li>'+
												'<li>'+
													'<span >开立数量:</span><input type="text" name="shuliang" class="input_type_small" value="'
													+$(this).find("[name='shuliang']").html()+
													'" />'+
													'<input type="text" name="lingshou_danwei" class="input_type_small" value="'
													+$(this).find("[name='lingshou_danwei']").html()+
													'" disabled="disabled"/>'+
													'<span >库存:</span><input type="text" name="kucun" class="input_type_small" value="'
													+$(this).find("[name='kucun']").html()+
													'" disabled="disabled"/>'+
													'<input type="text" name="lingshou_danwei" class="input_type_small" value="'
													+$(this).find("[name='lingshou_danwei']").html()+
													'" disabled="disabled"/>'+
													'<span >使用天数:</span><input type="text" name="shiyong_tianshu" class="input_type_small" value="'
													+$(this).find("[name='shiyong_tianshu']").val()+
													'" /> 天 '+
												'</li>'+
												'<li>'+
													'<span >执行科室:</span><input type="text" name="zhixingkeshi" class="input_type" value="'
													+$(this).find("[name='zhixingkeshi']").html()+
													'" disabled="disabled"/>'+
													'<span >付费方式:</span><input type="text" name="fufeifangshi" class="input_type_small" value="'
													+$(this).find("[name='fufeifangshi']").html()+
													'" disabled="disabled"/>'+
													'<span >单价:</span><input type="text" name="danjia" class="input_type_small" value="'
													+$(this).find("[name='danjia']").html()+
													'" disabled="disabled"/>元'+
													'<span >小计:</span><input type="text" name="xiaoji" class="input_type_small" value="'
													+$(this).find("[name='xiaoji']").html()+
													'" disabled="disabled"/>元'+
												'</li>'+
												'<li>'+
													'<span>是否自备:</span><select name="shifou_zibei" class="select_type" value="" action_type="others">'+
													shifou_zibei1+shifou_zibei2+'</select>'+
												'</li>'+
												'<li>'+
													'<input type="button" class="edit_chufang_button" name="update_one_yaopin" value="保存修改" />'+
													'<input type="button" class="edit_chufang_button" name="delete_one_yaopin" value="删除" />'+
													'<input type="button" class="edit_chufang_button" name="edit_cancel" value="取消编辑" />'+
													'<input type="hidden" name="'+qianzui+'_id" value="'+zhuyuan_id+'"/>'+
													'<input type="hidden" name="chufang_id" value="'+chufang_id+'"/>'+
													'<input type="hidden" name="dachufanghao" value="'+dachufanghao+'"/>'+
													'<input type="hidden" name="type" value="西药及中成药"/>'+
													'<input type="hidden" name="id" value=""/>'+
													'<input type="hidden" name="yaopin_id" value="" />'+
													'<input type="hidden" name="shiyong_danwei" value="'
													+$(this).find("[name='shiyong_danwei']").html()+
													'" />'+
													'<input type="hidden" name="lingshou_danwei" value="'
													+$(this).find("[name='lingshou_danwei']").html()+
													'" />'+
													'<input type="hidden" name="zhixingkeshi" value="'
													+$(this).find("[name='zhixingkeshi']").html()+
													'" />'+
													'<input type="hidden" name="danjia" value="'
													+$(this).find("[name='danjia']").html()+
													'" />'+
													'<input type="hidden" name="xiaoji" value="'
													+$(this).find("[name='xiaoji']").html()+
													'" />'+
													'<input type="hidden" name="fufeifangshi" value="'
													+$(this).find("[name='fufeifangshi']").html()+
													'" />'+
													'<input type="hidden" id="guige_number" name="guige_number" value="'
													+$(this).find("[name='guige_number']").val()+
													'" />'+
													'<input type="hidden" id="pinlv_number" name="pinlv_number" value="'
													+$(this).find("[name='pinlv_number']").val()+
													'" />'+
													'<input type="hidden" id="jiliang" name="jiliang" value="'
													+$(this).find("[name='jiliang']").val()+
													'" />'+
													'<span name="tips" class="right_tips"></span>'+
												'</li>'+
										'</form>',
						lock: true,
						padding:5,
						init: function () {
							var cache_yongfa = {},lastXhr_yongfa;
							$("#yongfa").focus(function(){
								yaopin_mingcheng = $(this).parent().parent().parent().find("[name='yaopin_mingcheng']").val();
							});
							$("#yongfa").autocomplete({
								minLength:0,
								autoFocus: true,
								source:function( request, response ) {
									term = request.term;
									if ( term in cache_yongfa ) {
										response( cache_yongfa [ term ] );
										return;
									}
									yaopin_mingcheng = yaopin_mingcheng.replace(/\((.)*\)/g,'');
									
									lastXhr_yongfa = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoByYaopinNameJson',{"yaopin_mingcheng":yaopin_mingcheng, "term":""}, function( data, status, xhr ) {
										cache_yongfa [ term ] = data;
										if ( xhr === lastXhr_yongfa ) {
											response( data );
										}
									});
								},
								select: function( event, ui ) {
									$(this).parent().parent().parent().find("#yongfa").val( ui.item.label );
									return false;
								}
							})
							.data( "autocomplete" )._renderItem = function( ul, item ) {
								var label = item.label.replace(
												new RegExp(
													"(?![^&;]+;)(?!<[^<>]*)(" +
													term +
													")(?![^<>]*>)(?![^&;]+;)", "gi"
												), "<span class=\"keyword\">$1</span>" );
								var desc = item.desc.replace(
												new RegExp(
													"(?![^&;]+;)(?!<[^<>]*)(" +
													term +
													")(?![^<>]*>)(?![^&;]+;)", "gi"
												), "<span class=\"keyword\">$1</span>" );
								return $( "<li></li>" )
									.data( "item.autocomplete", item )
									.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
									.appendTo( ul );
							};
							var cache_pinlv = {},lastXhr_pinlv;
							$("#pinlv").autocomplete({
								minLength: 0,
								autoFocus: true,
								source: function( request, response ) {
									term = request.term;
									if ( term in cache_pinlv ) {
										response( cache_pinlv [ term ] );
										return;
									}
									lastXhr_pinlv = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoJson',{"pid":"14000", "term":""}, function( data, status, xhr ) {
									cache_pinlv [ term ] = data;
									if ( xhr === lastXhr_pinlv ) {
										response( data );
									}
								});
								},
								focus: function( event, ui ) {
									$(this).parent().parent().parent().find("#pinlv").val( ui.item.label );
									$(this).parent().parent().parent().find("#pinlv_number").val( ui.item.other_info );
									return false;
								},
								select: function( event, ui ) {
									$(this).parent().parent().parent().find("#pinlv").val( ui.item.label );
									$(this).parent().parent().parent().find("#pinlv_number").val( ui.item.other_info );
									return false;
								}
							})
							.data( "autocomplete" )._renderItem = function( ul, item ) {
								var label = item.label.replace(
												new RegExp(
													"(?![^&;]+;)(?!<[^<>]*)(" +
													term +
													")(?![^<>]*>)(?![^&;]+;)", "gi"
												), "<span class=\"keyword\">$1</span>" );
								var desc = item.desc.replace(
												new RegExp(
													"(?![^&;]+;)(?!<[^<>]*)(" +
													term +
													")(?![^<>]*>)(?![^&;]+;)", "gi"
												), "<span class=\"keyword\">$1</span>" );
								return $( "<li></li>" )
									.data( "item.autocomplete", item )
									.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
									.appendTo( ul );
							};
							$('[name="yaopin_id"]').val(yaopin_id);
							var id = editable_chufang.attr("id");
							$('[name="id"]').val(id);
						}
					});
				}
				else
				{
					
					
					art.dialog({
						id:"edit_chufang_dialog",
						title:"编辑处方",
						content:'<td colspan="9" class="none_border">'+
											'<li>'+
												'<span class="info_title">当前处方状态有误，请重新尝试或者重建此处方</span>'+
											'</li>'+
											'<li>'+
												'<input type="button" class="edit_chufang_button" name="edit_cancel" value="关闭" />'+
											'</li>'+
										'</td>',
						lock: true,
						padding:5,
						init: function () {}
					});
				}
					
				//保存药品信息
				$("[name='update_one_yaopin']").click(function(){
					//验证药品名称是否为空
					if($(this).parent().parent().find("[name='yaopin_mingcheng']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先填写药品名称!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='yaopin_mingcheng']").fadeOut();
						$(this).parent().parent().find("[name='yaopin_mingcheng']").fadeIn();
						return false;
					}
					//验证药品名称是否为空
					if($(this).parent().parent().find("[name='lingshou_danwei']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请选择正确的药品名称!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='yaopin_mingcheng']").fadeOut();
						$(this).parent().parent().find("[name='yaopin_mingcheng']").fadeIn();
						return false;
					}
					//验证每次用量是否为空
					else if($(this).parent().parent().find("[name='ciliang']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请输入此药品的每次用量!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='ciliang']").fadeOut();
						$(this).parent().parent().find("[name='ciliang']").fadeIn();
						return false;
					}
					//验证每次用量是否为数字输入
					else if(!(new RegExp("^\\d{1,3}.?\\d{0,3}$")).test($(this).parent().parent().find("[name='ciliang']").val()))
					{
						$(this).parent().parent().find("[name='tips']").html("请输入数字格式的每次用量!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='ciliang']").fadeOut();
						$(this).parent().parent().find("[name='ciliang']").fadeIn();
						return false;
					}
					//验证开立数量是否为空
					else if($(this).parent().parent().find("[name='shuliang']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请输入此药品的开立数量!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='shuliang']").fadeOut();
						$(this).parent().parent().find("[name='shuliang']").fadeIn();
						return false;
					}
					//验证开立数量是否为数字输入
					else if(!(new RegExp("^\\d{1,3}$")).test($(this).parent().parent().find("[name='shuliang']").val()))
					{
						$(this).parent().parent().find("[name='tips']").html("请输入数字格式的开立数量!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='shuliang']").fadeOut();
						$(this).parent().parent().find("[name='shuliang']").fadeIn();
						return false;
					}
					//验证使用方法是否为空
					else if($(this).parent().parent().find("[name='yongfa']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请选择药品的使用方法!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='yongfa']").fadeOut();
						$(this).parent().parent().find("[name='yongfa']").fadeIn();
						return false;
					}
					//验证使用频率是否为空
					else if($(this).parent().parent().find("[name='pinlv']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请选择药品的使用频率!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='pinlv']").fadeOut();
						$(this).parent().parent().find("[name='pinlv']").fadeIn();
						return false;
					}
					//验证是否所有编辑项都已经关闭了
					else if($(this).parent().parent().parent().parent().parent().parent().parent().find("[class='edit_table']:visible").length>1)
					{
						$(this).parent().parent().find("[name='tips']").html("请先关闭所有药品编辑框后再添加!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						return false;
					}
					else
					{
						var original_xiaoji = editable_chufang.find("[name='xiaoji']").html();
						var original_zongji = $("[name='jine_zongji']").html();
						
						var original_shifou_zibei = $.trim(editable_chufang.find("[name='shifou_zibei']").html());
						var new_shifou_zibei = $.trim($(this).parent().parent().find("[name='shifou_zibei']").val());
						
						//更新内容：
						editable_chufang.find("[name='yaopin_mingcheng']").html($(this).parent().parent().find("[name='yaopin_mingcheng']").val());
						editable_chufang.find("[name='ciliang']").html($(this).parent().parent().find("[name='ciliang']").val());
						editable_chufang.find("[name='shuliang']").html($(this).parent().parent().find("[name='shuliang']").val());
						editable_chufang.find("[name='danjia']").html($(this).parent().parent().find("[name='danjia']").val());
						editable_chufang.find("[name='xiaoji']").html($(this).parent().parent().find("[name='xiaoji']").val());
						editable_chufang.find("[name='fufeifangshi']").html($(this).parent().parent().find("[name='fufeifangshi']").val());
						editable_chufang.find("[name='zhixingkeshi']").html($(this).parent().parent().find("[name='zhixingkeshi']").val());
						editable_chufang.find("[name='yongfa']").html($(this).parent().parent().find("[name='yongfa']").val());
						editable_chufang.find("[name='pinlv']").html($(this).parent().parent().find("[name='pinlv']").val());
						if($(this).parent().parent().find("[name='shifou_zibei']").val()=='自备'){
							editable_chufang.find("[name='shifou_zibei']").html($(this).parent().parent().find("[name='shifou_zibei']").val());
							editable_chufang.find("[name='shifou_zibei']").show();
							editable_chufang.find("[name='zhixingkeshi']").hide();
						}else{
							editable_chufang.find("[name='shifou_zibei']").html("");
							editable_chufang.find("[name='shifou_zibei']").hide();
							editable_chufang.find("[name='zhixingkeshi']").show();
						}
						//验证通过，ajax方式添加新的药品内容:
						$(this).parent().parent().ajaxSubmit(form_options); 
						editable_chufang.click();
						//更新总金额
						var new_xiaoji = $(this).parent().parent().find("[name='xiaoji']").val();
						var new_zongji = parseFloat(original_zongji);
						if(original_shifou_zibei!='自备' && new_shifou_zibei!='自备'){
							new_zongji = new_zongji-parseFloat(original_xiaoji)+parseFloat(new_xiaoji);
						}else if(original_shifou_zibei!=new_shifou_zibei) {
							if($.trim(editable_chufang.find("[name='shifou_zibei']").html())=="自备"){
								new_zongji = new_zongji-parseFloat(original_xiaoji);
							}
							if($.trim(editable_chufang.find("[name='shifou_zibei']").html())!="自备"){
								new_zongji = new_zongji+parseFloat(new_xiaoji);
							}
						}
						$("[name='jine_zongji']").html(new_zongji.toFixed(2)+"");
						art.dialog.list['edit_chufang_dialog'].close();
					}
				});
					
				//删除此项药品
				$("[name='delete_one_yaopin']").click(function(){
					//验证药品名称是否为空
					if (confirm('是否确认进行删除操作？'))
					{
						//验证通过，ajax方式删除此项药品信息:
						$(this).parent().parent().attr("action",'http://'+server_url+'/tiantan_emr/Common/Chufangguanli/deleteOneYaopin')
						$(this).parent().parent().ajaxSubmit(form_options);
						
						//更新总金额
						var original_xiaoji = editable_chufang.find("[name='xiaoji']").html();
						var original_zongji = $("[name='jine_zongji']").html();
						var new_zongji = parseFloat(original_zongji)-parseFloat(original_xiaoji);
						
						if($.trim(editable_chufang.find("[name='shifou_zibei']").html())!="自备"){
							$("[name='jine_zongji']").html(new_zongji.toFixed(2)+"");
						}
						
						//更新页面
						editable_chufang.remove();
						art.dialog.list['edit_chufang_dialog'].close();
						window.setTimeout(page_reload,2000);	
					}
					else
					{
						art.dialog.list['edit_chufang_dialog'].close();
					}
				});
					
				//根据天数算数量
				$("[name='shiyong_tianshu']").change(function(){
					isZidaiYaopin_flag='false';
					var yaopin_id = editable_chufang.attr("yaopin_id");
					$.ajax(
					{
						url:'http://'+server_url+'/tiantan_emr/Common/Data/isZidaiYaopin?yid='+yaopin_id, 
						success:function(data)
						{
							isZidaiYaopin_flag = data;
						},
						async:false
					});
					var ZidaiYaopin_reg = /.*true.*/;
					//如果不是自带药品，则根据天数算数量
					if(ZidaiYaopin_reg.exec(isZidaiYaopin_flag) != "true")
					{
						var pinlv = $("#pinlv_number").val();
						var guige = $("#guige_number").val();
						var jiliang = $("#jiliang").val();
						var shuliang = Math.ceil($(this).val()*$(this).parent().parent().find("[name='ciliang']").val()*pinlv/(guige*jiliang));
						$(this).parent().parent().find("[name='shuliang']").val(shuliang);
						
						//计算小计
						var xiaoji = shuliang*$(this).parent().parent().find("[name='danjia']").val();
						$(this).parent().parent().find("[name='xiaoji']").val(xiaoji.toFixed(2));
					}

				});
	
				//根据数量算天数
				$("[name='shuliang']").change(function(){
					isZidaiYaopin_flag='false';
					var yaopin_id = editable_chufang.attr("yaopin_id");
					$.ajax(
					{
						url:'http://'+server_url+'/tiantan_emr/Common/Data/isZidaiYaopin?yid='+yaopin_id, 
						success:function(data)
						{
							isZidaiYaopin_flag = data;
						},
						async:false
					});
					var ZidaiYaopin_reg = /.*true.*/;
					//如果不是自带药品，则数量算天数
					if(ZidaiYaopin_reg.exec(isZidaiYaopin_flag) != "true")
					{
						var pinlv = $("#pinlv_number").val();
						var guige = $("#guige_number").val();
						var jiliang = $("#jiliang").val();
						var shiyong_tianshu = Math.ceil($(this).val()*(guige*jiliang)/($(this).parent().parent().find("[name='ciliang']").val()*pinlv));
						$(this).parent().parent().find("[name='shiyong_tianshu']").val(shiyong_tianshu);
						
						//计算小计
						var xiaoji = $(this).val()*$(this).parent().parent().find("[name='danjia']").val();
						$(this).parent().parent().find("[name='xiaoji']").val(xiaoji.toFixed(2));
					}
				});
	
				//根据每次用量的变化重新计算
				$("[name='ciliang']").change(function(){
					isZidaiYaopin_flag='false';
					var yaopin_id = editable_chufang.attr("yaopin_id");
					$.ajax(
					{
						url:'http://'+server_url+'/tiantan_emr/Common/Data/isZidaiYaopin?yid='+yaopin_id, 
						success:function(data)
						{
							isZidaiYaopin_flag = data;
						},
						async:false
					});
					var ZidaiYaopin_reg = /.*true.*/;
					//如果不是自带药品，则根据每次用量的变化重新计算
					if(ZidaiYaopin_reg.exec(isZidaiYaopin_flag) != "true")
					{
						var pinlv = $("#pinlv_number").val();
						var guige = $("#guige_number").val();
						var jiliang = $("#jiliang").val();
						if($(this).parent().parent().find("[name='shuliang']").val()!="")
						{
							var shiyong_tianshu = Math.ceil($(this).parent().parent().find("[name='shuliang']").val()*(guige*jiliang)/($(this).val()*pinlv));
							$(this).parent().parent().find("[name='shiyong_tianshu']").val(shiyong_tianshu);
							
							//计算小计
							var xiaoji = parseInt($(this).parent().parent().find("[name='shuliang']").val()*$(this).parent().parent().find("[name='danjia']").val()*100)/100;
							$(this).parent().parent().find("[name='xiaoji']").val(xiaoji.toFixed(2));
						}
					}
				});
				
				//取消添加按钮，关闭当前编辑框
				$("[name='edit_cancel']").click(function(){
					editable_chufang.click();
					art.dialog.list['edit_chufang_dialog'].close();
				});
				//输入框类型的事件
				/*$(".input_type_small").focus(function(){
					$(this).addClass("input_type_small_focus");
				});
				$(".input_type_small").blur(function(){
					$(this).removeClass("input_type_small_focus");
				});		
				$(".input_type").focus(function(){
					$(this).addClass("input_type_focus");
				});
				$(".input_type").blur(function(){
					$(this).removeClass("input_type_focus");
				});	
				$(".input_type_full").focus(function(){
					$(this).addClass("input_type_full_focus");
				});
				$(".input_type_full").blur(function(){
					$(this).removeClass("input_type_full_focus");
				});*/
				//下拉显示编辑框
				//$(this).next().find("[class='edit_table']").slideDown();
			}//end of else
		},//end of function(){
		function(){
			//$(this).next().find("[class='edit_table']").slideUp();
			$(this).removeClass("editable_on_edit");
		}
	);//end of $(".editable").toggle(function() {
}//end of function initialEditEvent()

//自动关闭提示语句
//************************************************************************
function auto_close(){
	$("body").qtip("hide");
}
function page_reload(){
		window.location.reload(true);
}

$("[name='pinlv[]']").live("focus",function(){
	var cache_pinlv = {},lastXhr_pinlv;
	$(this).autocomplete({
		minLength: 0,
		autoFocus: true,
		source: function( request, response ) {
			term = request.term;
			if ( term in cache_pinlv ) {
				response( cache_pinlv [ term ] );
				return;
			}
			lastXhr_pinlv = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoJson',{"pid":"14000", "term":term }, function( data, status, xhr ) {
			cache_pinlv [ term ] = data;
			if ( xhr === lastXhr_pinlv ) {
				response( data );
			}
		});
		},
		select: function( event, ui ) {
			$(this).parent().parent().find("[name='pinlv[]']").val( ui.item.label );
			$(this).parent().parent().find("[name='pinlv_number[]']").val( ui.item.other_info );
			return false;
		}
	})
	.data( "autocomplete" )._renderItem = function( ul, item ) {
		var label = item.label.replace(
						new RegExp(
							"(?![^&;]+;)(?!<[^<>]*)(" +
							term +
							")(?![^<>]*>)(?![^&;]+;)", "gi"
						), "<span class=\"keyword\">$1</span>" );
		var desc = item.desc.replace(
						new RegExp(
							"(?![^&;]+;)(?!<[^<>]*)(" +
							term +
							")(?![^<>]*>)(?![^&;]+;)", "gi"
						), "<span class=\"keyword\">$1</span>" );
		return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
			.appendTo( ul );
	};
	
	var e = jQuery.Event("keydown");
	e.keyCode = 40; 
	$(this).trigger(e);
})

$("[name='yongfa[]']").live("focus",function(){
	var cache_yongfa = {},lastXhr_yongfa;
	$(this).autocomplete({
		minLength: 0,
		autoFocus: true,
		source: function( request, response ) {
			term = request.term;
			if ( term in cache_yongfa ) {
				response( cache_yongfa [ term ] );
				return;
			}
			lastXhr_yongfa = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getZidingyiXiangmu',{"pid":"xiyao", "term":term }, function( data, status, xhr ) {
			cache_yongfa [ term ] = data;
			if ( xhr === lastXhr_yongfa ) {
				response( data );
			}
		});
		},
		select: function( event, ui ) {
			$(this).val( ui.item.label );
			return false;
		}
	})
	.data( "autocomplete" )._renderItem = function( ul, item ) {
		var label = item.label.replace(
						new RegExp(
							"(?![^&;]+;)(?!<[^<>]*)(" +
							term +
							")(?![^<>]*>)(?![^&;]+;)", "gi"
						), "<span class=\"keyword\">$1</span>" );
		var desc = item.desc.replace(
						new RegExp(
							"(?![^&;]+;)(?!<[^<>]*)(" +
							term +
							")(?![^<>]*>)(?![^&;]+;)", "gi"
						), "<span class=\"keyword\">$1</span>" );
		return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
			.appendTo( ul );
	};
	
	var e = jQuery.Event("keydown");
	e.keyCode = 40; 
	$(this).trigger(e);
})

$("[name='shiyong_danwei[]']").live("focus",function(){	
	var cache_shiyong_danwei = {},lastXhr_shiyong_danwei;
	$(this).autocomplete({
		minLength: 0,
		autoFocus: false,
		source: function( request, response ) {
			term = "";
			if ( term in cache_shiyong_danwei ) {
				response( cache_shiyong_danwei [ term ] );
				return;
			}
			lastXhr_shiyong_danwei = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoJson',{"pid":"20000", "term":term }, function( data, status, xhr ) {
			cache_shiyong_danwei [ term ] = data;
			if ( xhr === lastXhr_shiyong_danwei ) {
				response( data );
			}
		});
		},
		select: function( event, ui ) {
			$(this).val( ui.item.label );
			return false;
		}
	})
	.data( "autocomplete" )._renderItem = function( ul, item ) {
		var label = item.label.replace(
						new RegExp(
							"(?![^&;]+;)(?!<[^<>]*)(" +
							term +
							")(?![^<>]*>)(?![^&;]+;)", "gi"
						), "<span class=\"keyword\">$1</span>" );
		var desc = item.desc.replace(
						new RegExp(
							"(?![^&;]+;)(?!<[^<>]*)(" +
							term +
							")(?![^<>]*>)(?![^&;]+;)", "gi"
						), "<span class=\"keyword\">$1</span>" );
		return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
			.appendTo( ul );
	};
	
	var e = jQuery.Event("keydown");
	e.keyCode = 40; 
	$(this).trigger(e);
})
$("[name='lingshou_danwei[]']").live("focus",function(){
	var cache_lingshou_danwei = {},lastXhr_lingshou_danwei;
	$(this).autocomplete({
		minLength: 0,
		autoFocus: false,
		source: function( request, response ) {
			term = "";
			if ( term in cache_lingshou_danwei ) {
				response( cache_lingshou_danwei [ term ] );
				return;
			}
			lastXhr_lingshou_danwei = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoJson',{"pid":"20000", "term":term }, function( data, status, xhr ) {
			cache_lingshou_danwei [ term ] = data;
			if ( xhr === lastXhr_lingshou_danwei ) {
				response( data );
			}
		});
		},
		select: function( event, ui ) {
			$(this).val( ui.item.label );
			return false;
		}
	})
	.data( "autocomplete" )._renderItem = function( ul, item ) {
		var label = item.label.replace(
						new RegExp(
							"(?![^&;]+;)(?!<[^<>]*)(" +
							term +
							")(?![^<>]*>)(?![^&;]+;)", "gi"
						), "<span class=\"keyword\">$1</span>" );
		var desc = item.desc.replace(
						new RegExp(
							"(?![^&;]+;)(?!<[^<>]*)(" +
							term +
							")(?![^<>]*>)(?![^&;]+;)", "gi"
						), "<span class=\"keyword\">$1</span>" );
		return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
			.appendTo( ul );
	};
	var e = jQuery.Event("keydown");
	e.keyCode = 40; 
	$(this).trigger(e);
})
