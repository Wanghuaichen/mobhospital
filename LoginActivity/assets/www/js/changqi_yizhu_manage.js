/**************************************************
*  Created:  2011-11-01
*  Info:长期医嘱管理前台js代码
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author DongJie <dj7229@126.com>
*
***************************************************/
var server_url = "";
var yishi_id = "000";
var yishi_name = "未登录";
var hushi_id = "000";
var hushi_name = "未登录";
var operator_type = "weizhi";
var zhuyuan_id = "000";
var type="";
var group_name;

//表单自动提交参数
var form_options={
	dataType: 'json',
	success:function showResponse(data){
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
						if($(this).val()!="")
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
	// 
	if(group_name==null)
	{
		group_name = "Common";
	}
	
	//加载完毕隐藏加载条
	try
	{parent.loadingEnd();}catch(ex){}
	if(user_type=="医生" || user_type=="模板管理")
	{
		operator_type = "yishi";
		user_type = "zhuyuanyishi";
		yishi_id = user_number;
		yishi_name = user_name;
		//医生端留空，通过user_number来获取相应消息
		object_user_department = "";
		// user_number = "{$_SESSION.user_number}";
	}
	else
	{
		operator_type = "hushi";
		user_type = "zhuyuanhushi";
		hushi_id = user_number;
		hushi_name = user_name;
		//护士端
		object_user_department = user_department;
		// user_number = "{$_SESSION.user_number}";
	}
	if(user_type != "质控")
	{
		printControlInitial();
	}
	//初始化编辑事件：
	initialEditEvent();
	//给用法、频率、单位增加默认事件：
	$("[name='yongfa']").live("focus",function(){
		var cache_yongfa = {},lastXhr_yongfa;
		$(this).autocomplete({
			minLength:0,
			autoFocus: false,
			source:function( request, response ) {
				term = "";
				if ( term in cache_yongfa ) {
					response( cache_yongfa [ term ] );
					return;
				}
				lastXhr_yongfa = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoJson',{"pid":"11000", "term":term }, function( data, status, xhr ) {
				cache_yongfa [ term ] = data;
				if ( xhr === lastXhr_yongfa ) {
					response( data );
				}
				$yongfa = $(this).parent().parent().parent().find("#yongfa");
			});
			},
			select: function( event, ui ) {
				$(this).parent().parent().parent().find("#yongfa").val( ui.item.label );
				return false;
			}
		})
		.data( "autocomplete" )._renderItem = function( ul, item ) {
			var tmp_term = term.replace(new RegExp("[(]", "gi"), "[(]");
			tmp_term = tmp_term.replace(new RegExp("[)]", "gi"), "[)]");
			var label = item.label.replace(
							new RegExp(
								"(?![^&;]+;)(?!<[^<>]*)(" +
								tmp_term +
								")(?![^<>]*>)(?![^&;]+;)", "gi"
							), "<span class=\"keyword\">$1</span>" );
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a>" + label + "</a>" )
				.appendTo( ul );
		};
		var e = jQuery.Event("keydown");
		e.keyCode = 40; 
		$(this).trigger(e);
	});
	$("[name='pinlv']").live("focus",function(){
		var cache_pinlv = {},lastXhr_pinlv;
		$(this).autocomplete({
			minLength: 0,
			autoFocus: false,
			source: function( request, response ) {
				term = "";
				if ( term in cache_pinlv ) {
					response( cache_pinlv [ term ] );
					return;
				}
				lastXhr_pinlv = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoJson',{"pid":"14000", "term":term}, function( data, status, xhr ) {
				cache_pinlv [ term ] = data;
				if ( xhr === lastXhr_pinlv ) {
					response( data );
				}
				$pinlv = $(this).parent().parent().parent().find("#pinlv");
			});
			},
			select: function( event, ui ) {
				$(this).parent().parent().parent().find("#pinlv").val( ui.item.label );
				$(this).parent().parent().parent().find("#pinlv_number").val( ui.item.other_info );
				return false;
			}
		})
		.data( "autocomplete" )._renderItem = function( ul, item ) {
			var tmp_term = term.replace(new RegExp("[(]", "gi"), "[(]");
			tmp_term = tmp_term.replace(new RegExp("[)]", "gi"), "[)]");
			var label = item.label.replace(
							new RegExp(
								"(?![^&;]+;)(?!<[^<>]*)(" +
								tmp_term +
								")(?![^<>]*>)(?![^&;]+;)", "gi"
							), "<span class=\"keyword\">$1</span>" );
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a>" + label + "</a>" )
				.appendTo( ul );
		};
		var e = jQuery.Event("keydown");
		e.keyCode = 40; 
		$(this).trigger(e);
	});
	$("[name='shiyong_danwei']").live("focus",function(){	
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
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a>" + label + "</a>" )
				.appendTo( ul );
		};
		var e = jQuery.Event("keydown");
		e.keyCode = 40; 
		$(this).trigger(e);
	})
});//end of $(document).ready


function yizhuChangqiFuc()
{
	//医嘱页面跳转:
	$("[name='yizhu_type_changyi']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showChangqi/zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_linshi']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showLinshi/zhuyuan_id/"+zhuyuan_id;
	});
	
	$("[name='yizhu_type_changqi_xintianjia']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showChangqi/state/已添加/zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_changqi_daihedui']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showChangqi/state/待核对_开始待审核/zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_changqi_yixiada']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showChangqi/state/已下达/zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_changqi_yizhuyouwu']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showChangqi/state/医嘱有误/zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_changqi_kaishizhixing']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showChangqi/state/开始执行/zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_changqi_daitingzhiqueren']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showChangqi/state/停止待审核 /zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_changqi_tingzhizhixing']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showChangqi/state/停止执行/zhuyuan_id/"+zhuyuan_id;
	});
	
	//添加新医嘱事件：
	$("[name='add_new']").click(function() {
		var yaopin_option = "";
		if(zhiliao_leibie!="西医治疗")
		{
			yaopin_option = "<option>中草药</option>";
		}
		//弹出对话框
		art.dialog({
			id:"add_new_dialog",
			title:"添加一条医嘱",//
			content:'<div class="add_new_wrap">'+
								'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/addChangqi">'+
										'<li style="width:820px;">'+
										'<span class="info_title">开始时间:</span><input type="text" action_type="datetime" name="start_time" id="datetime_input" value="'+yizhu_start_date+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle">'+
										'<span >执行医生:</span><input type="text" name="start_yishi_name" class="input_type" value="'+yishi_name+'" disabled="disabled"/>'+
										'<span >类型:</span>'+
										'<select name="yongfa_type" class="select_type" value="" action_type="others" type="yizhutiaozhuang">'+
											'<option>护理</option>'+
											'<option>诊疗项目</option>'+
											'<option>西药中成药</option>'+
											yaopin_option+
											'<option>其它</option>'+
											'<option>医嘱整理</option>'+
										'</select>'+
										'</li>'+
										'<li>'+
										'<span class="info_title">医嘱内容:</span><input type="text" name="content" class="input_type_full" value=""/>'+
										'</li>'+
										'<li name="shuliang_info">'+
											'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" value="" disabled="disabled"/>'+
											'<input type="text" name="shiyong_danwei" class="input_type_small" value="" disabled="disabled"/>'+	
											'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" value="" disabled="disabled"/>'+
											'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type" value="" disabled="disabled"/>'+
										'</li>'+
										'<li name="zhixing_con">'+
											'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="" disabled="disabled"/>'+	
											'<span >执行次序:</span><select name="shifou_jiaji" class="select_type" value="" action_type="others"><option val="1">1</option><option val="2">2</option><option val="3">3</option><option val="4">4</option><option val="5">5</option><option val="0">加急</option></select>'+
										'</li>'+
										'<li name="add_changqi_yizhu">'+
											'<input type="button" class="edit_yizhu_button" name="add_one" value="添加医嘱" />'+
											'<input type="button" class="edit_yizhu_button" name="add_cancel" value="取消添加" />'+
											'<input type="hidden" name="state" value="已添加" />'+
											'<input type="hidden" name="biaoshi" value="" />'+
											'<input type="hidden" name="yizhu_id" value="" />'+
											'<input type="hidden" name="zhixing_keshi" value="" />'+
											'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
											'<input type="hidden" name="start_yishi_name" value='+yishi_name+' />'+
											'<span name="tips" class="right_tips"></span>'+
										'</li>'+
								'</form>'+
							'</div>',
			lock: true,
			padding:5,
			init: function () {
				//默认聚焦：
				$('[name="start_time"]').focus();
				//添加回车后自动切换下一输入窗
				$('[name="start_time"]')
					.enterTo('[name="yongfa_type"]')
					.enterTo('[name="content"]')
					.enterTo('[name="shifou_jiaji"]')
					.enterComplete(function (){
					$('[name="add_one"]').focus();
				});
				
				var cache_content = {},lastXhr_content;
				$('[name="content"]').autocomplete({
					minLength: 2,
					autoFocus: false,
					source: function( request, response ) {
						term = request.term;
						if ( term in cache_content ) {
							response( cache_content[ term ] );
							return;
						}
						lastXhr_content = $.getJSON( "http://"+server_url+"/tiantan_emr/Common/Data/getDataYizhuOneJson/", request, function( data, status, xhr ) {
							cache_content[ term ] = data;
							if ( xhr === lastXhr_content ) {
								response( data );
							}
						});
					},
					focus: function( event, ui ) {
						return false;
					},
					select: function( event, ui ) {
						$(this).parent().parent().parent().find('[name="content"]').val( ui.item.label );
						$(this).parent().parent().parent().find('[name="yizhu_id"]').val( ui.item.id );
						
						$(this).parent().parent().parent().find('[name="shiyong_danwei"]').val( ui.item.shiyong_danwei );
					
						$(this).parent().parent().parent().find('[name="zhixing_keshi"]').val( ui.item.zhixing_keshi );
						$(this).parent().parent().parent().find('[name="yongfa_type"]').val( ui.item.yongfa_type );
						type = ui.item.yongfa_type;
						
						if(type=="护理")
						{
							$('[name="start_time"]')
								.enterTo('[name="content"]')
								.enterTo('[name="pinlv"]')
								.enterTo('[name="shifou_jiaji"]')
								.enterComplete(function (){
								$('[name="add_one"]').focus();
							});
						}
						else if(type=="医嘱整理")
						{
							$('[name="start_time"]')
								.enterTo('[name="content"]')
								.enterTo('[name="pinlv"]')
								.enterTo('[name="shifou_jiaji"]')
								.enterComplete(function (){
								$('[name="add_one"]').focus();
							});
						}
						else if(type=="诊疗项目")
						{
							$(this).parent().next().find('[name="pinlv"]').removeAttr("disabled");
							$('[name="start_time"]')
								.enterTo('[name="content"]')
								.enterTo('[name="pinlv"]')
								.enterTo('[name="shifou_jiaji"]')
								.enterComplete(function (){
								$('[name="add_one"]').focus();
							});
						}
						else
						{
						}
						$(this).parent().parent().parent().find('[name="shifou_jiaji"]').html(
									'<option value="1">1</option>'+
									'<option value="2">2</option>'+
									'<option value="3">3</option>'+
									'<option value="4">4</option>'+
									'<option value="5">5</option>'+
									'<option value="0">加急</option>');
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
					var tmp_term = term.replace(new RegExp("[(]", "gi"), "[(]");
					tmp_term = tmp_term.replace(new RegExp("[)]", "gi"), "[)]");
					var label = item.label.replace(
									new RegExp(
										"(?![^&;]+;)(?!<[^<>]*)(" +
										tmp_term +
										")(?![^<>]*>)(?![^&;]+;)", "gi"
									), "<span class=\"keyword\">$1</span>" );
					var desc = item.desc.replace(
									new RegExp(
										"(?![^&;]+;)(?!<[^<>]*)(" +
										tmp_term +
										")(?![^<>]*>)(?![^&;]+;)", "gi"
									), "<span class=\"keyword\">$1</span>" );
					return $( "<li></li>" )
						.data( "item.autocomplete", item )
						.append( "<a>" + label + "<br /><span class=\"desc\">" + desc + "</span></a>" )
						.appendTo( ul );
				};

				//点击添加医嘱之前，先判断内容输入的正确性
				//change变换输入框状态
				$("[name='yongfa_type']").change(function(){
					var type = $(this).val();
					if(type=="护理")
					{
						$(this).parent().next().next().find('[name="ciliang"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="shiyong_danwei"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="yongfa"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="pinlv"]').attr("disabled","disabled");
						$('[name="start_time"]')
								.enterTo('[name="content"]')
								.enterTo('[name="shifou_jiaji"]')
								.enterComplete(function (){
								$('[name="add_one"]').focus();
						});
					}
					else if(type=="医嘱整理")
					{
						$(this).parent().next().next().find('[name="ciliang"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="shiyong_danwei"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="yongfa"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="pinlv"]').attr("disabled","disabled");
						$(this).parent().parent().find('[name="biaoshi"]').val("zhengli");
						$('[name="start_time"]')
								.enterTo('[name="content"]')
								.enterTo('[name="shifou_jiaji"]')
								.enterComplete(function (){
								$('[name="add_one"]').focus();
						});
					}
					else if(type=="诊疗项目")
					{
						$(this).parent().next().next().find('[name="ciliang"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="shiyong_danwei"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="yongfa"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
						$('[name="start_time"]')
								.enterTo('[name="content"]')
								.enterTo('[name="pinlv"]')
								.enterTo('[name="shifou_jiaji"]')
								.enterComplete(function (){
								$('[name="add_one"]').focus();
						});
					}
					else if(type=="西药中成药")
					{
						$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
						$('[name="start_time"]')
								.enterTo('[name="content"]')
								.enterTo('[name="ciliang"]')
								.enterTo('[name="shiyong_danwei"]')
								.enterTo('[name="yongfa"]')
								.enterTo('[name="pinlv"]')
								.enterTo('[name="shifou_jiaji"]')
								.enterComplete(function (){
								$('[name="add_one"]').focus();
						});
					}
					else if(type=="中草药")
					{
						$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
						$('[name="start_time"]')
								.enterTo('[name="content"]')
								.enterTo('[name="ciliang"]')
								.enterTo('[name="shiyong_danwei"]')
								.enterTo('[name="yongfa"]')
								.enterTo('[name="pinlv"]')
								.enterTo('[name="shifou_jiaji"]')
								.enterComplete(function (){
								$('[name="add_one"]').focus();
						});
					}
					else if(type=="组合")
					{
						$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
						$('[name="start_time"]')
								.enterTo('[name="content"]')
								.enterTo('[name="ciliang"]')
								.enterTo('[name="shiyong_danwei"]')
								.enterTo('[name="yongfa"]')
								.enterTo('[name="pinlv"]')
								.enterTo('[name="shifou_jiaji"]')
								.enterComplete(function (){
								$('[name="add_one"]').focus();
						});
					}
					else
					{
						$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
						$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
						$('[name="start_time"]')
								.enterTo('[name="content"]')
								.enterTo('[name="ciliang"]')
								.enterTo('[name="shiyong_danwei"]')
								.enterTo('[name="shifou_jiaji"]')
								.enterComplete(function (){
								$('[name="add_one"]').focus();
						});
					}
				});
				//点击跳转
				$("[name='yongfa_type']").click(function(){
					var type = $(this).val();
					if(type=="西药中成药")
					{
						//西药中成药药品医嘱跳转
						$.post("/tiantan_emr/"+group_name+"/Chufangguanli/addOneChufangYizhu", { zhuyuan_id: zhuyuan_id, type: "西药中成药",yizhu:"changqi" },function(data){
							if(data != "no")
							{
								location.href = data;
							}
						});
					}
					else if(type=="中草药")
					{
						//中草药药品医嘱跳转
						$.post("/tiantan_emr/"+group_name+"/Chufangguanli/addOneChufangYizhu", { zhuyuan_id: zhuyuan_id, type: "中草药",yizhu:"changqi" },function(data){
							if(data != "no")
							{
								location.href = data;
							}
						});
					}
					else if(type=="组合")
					{
						$.post("/tiantan_emr/"+group_name+"/Chufangguanli/addOneChufangYizhu", { zhuyuan_id: zhuyuan_id, type: "组合",yizhu:"changqi" },function(data){
							if(data != "no")
							{
								location.href = data;
							}
						});
					}
					else
					{
					}
				});
				$("[name='add_one']").click(function(){
					$(this).parent().parent().submit();
				});
				$("[name='add_cancel']").click(function(){
					art.dialog.list['add_new_dialog'].close();
				});
			}
		});
	});//end of $("[name='add_new']").click

	//点击添加医嘱套餐事件
	$("[name='add_multinew']").click(function() {  
		art.dialog({
			id:"add_multinew_dialog",
			title:"添加医嘱套餐",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/addChangqi">'+
									'<li style="width:700px">'+
									'<span class="info_title">开始时间:</span><input type="text" action_type="datetime" name="start_time" id="datetime_input" value="'+yizhu_start_date+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
									'<span >执行医生:</span><input type="text" name="start_yishi_name" class="input_type" value="'+yishi_name+'" disabled="disabled"/>'+
									'</li>'+
									'<li>'+
									'<span class="info_title">医嘱套餐:</span><input type="text" name="content" class="input_type_full" value=""/>'+
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_yizhu_button" name="add_multi" value="添加医嘱" />'+
										'<input type="button" class="edit_yizhu_button" name="add_cancel" value="取消添加" />'+
										'<input type="hidden" name="state" value="已添加" />'+
										'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="start_yishi_name" value='+yishi_name+' />'+
										'<span name="tips" class="right_tips"></span>'+
									'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				
				$('[name="content"]').focus();
				var cache_content = {},lastXhr_content;
				$('[name="content"]').autocomplete({
					minLength: 2,
					autoFocus: false,
					source: function( request, response ) {
						term = request.term;
						if ( term in cache_content ) {
							response( cache_content[ term ] );
							return;
						}
						lastXhr_content = $.getJSON( "http://"+server_url+"/tiantan_emr/Common/Data/getDataYizhuMultiJson/", request, function( data, status, xhr ) {
							cache_content[ term ] = data;
							if ( xhr === lastXhr_content ) {
								response( data );
							}
						});
					},
					focus: function( event, ui ) {
						return false;
					},
					select: function( event, ui ) {
						$('[name="content"]').val( ui.item.label );
						return false;
					}
				})
				.data( "autocomplete" )._renderItem = function( ul, item ) {
					var tmp_term = term.replace(new RegExp("[(]", "gi"), "[(]");
					tmp_term = tmp_term.replace(new RegExp("[)]", "gi"), "[)]");
					var label = item.label.replace(
									new RegExp(
										"(?![^&;]+;)(?!<[^<>]*)(" +
										tmp_term +
										")(?![^<>]*>)(?![^&;]+;)", "gi"
									), "<span class=\"keyword\">$1</span>" );
					var desc = item.desc.replace(
									new RegExp(
										"(?![^&;]+;)(?!<[^<>]*)(" +
										tmp_term +
										")(?![^<>]*>)(?![^&;]+;)", "gi"
									), "<span class=\"keyword\">$1</span>" );
					return $( "<li></li>" )
						.data( "item.autocomplete", item )
						.append( "<a>" + label + "<br /><span class=\"desc\">" + desc + "</span></a>" )
						.appendTo( ul );
				};
				//点击添加，先判断内容完整性等，由于同时添加多个医嘱会刷新页面，所以先判断是否已经关闭了其他编辑框
				$("[name='add_multi']").click(function(){
					//验证医嘱套餐名称是否为空
					if($(this).parent().parent().find("[name='content']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先输入医嘱套餐的名称后再添加!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						return false;
					}
					//验证医嘱开始时间是否为空
					else if($(this).parent().parent().find("[name='start_time']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先输入开始执行医嘱的时间后再添加!");
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
						$(this).parent().parent().submit();
					}
				});
				//取消添加事件
				$("[name='add_cancel']").click(function(){
					art.dialog.list['add_multinew_dialog'].close();
				});
				//输入框类型事件
				/*$(".input_type").focus(function(){
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
			}
		});
		//下拉显示添加框
		//$(this).parent().parent().next().find("[class='edit_table']").show();
	});//end of $("[name='add_multinew']").click
	
	//停止执行所有医嘱事件，对应按钮：医生停止所有、护士停止所有
	$("[name='stop_all']").click(function() {
		if(user_type == "zhuyuanyishi")
		{
			art.dialog({
				id:"stop_all_dialog",
				title:"停止所有医嘱",
				content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
										'<li>'+
										'<span class="info_title">停止时间:</span><input type="text" action_type="datetime" name="stop_time" id="datetime_input" value="'+yizhu_date+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
										'<span >执行医生:</span><input type="text" name="stop_yishi_name" class="input_type" value="'+yishi_name+'" disabled="disabled"/>'+
										'</li>'+
										'<li>'+
											'<input type="button" class="edit_yizhu_button" name="stop_confirm" value="确认停止" />'+
											'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
											'<input type="hidden" name="biaoshi" value="stop" />'+
											'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
											'<input type="hidden" name="stop_yishi_name" value='+yishi_name+' />'+
											'<span name="tips" class="right_tips"></span>'+
										'</li>'+
								'</form>',
				lock: true,
				padding:5,
				init: function () {
					
					//点击确认停止之前，先判断内容输入的正确性
					$("[name='stop_confirm']").click(function(){
						//验证医嘱停止时间是否为空
						if($(this).parent().parent().find("[name='stop_time']").val()=="")
						{
							$(this).parent().parent().find("[name='tips']").html("请先输入停止执行医嘱的时间后再确认!");
							$(this).parent().parent().find("[name='tips']").addClass("error_tips");
							$(this).parent().parent().find("[name='tips']").fadeOut();
							$(this).parent().parent().find("[name='tips']").fadeIn();
							return false;
						}
						//验证是否所有编辑项都已经关闭了
						else if($(this).parent().parent().parent().parent().parent().parent().parent().find("[class='edit_table']:visible").length>1)
						{
							$(this).parent().parent().find("[name='tips']").html("请先关闭所有医嘱编辑框后再确认!");
							$(this).parent().parent().find("[name='tips']").addClass("error_tips");
							$(this).parent().parent().find("[name='tips']").fadeOut();
							$(this).parent().parent().find("[name='tips']").fadeIn();
							return false;
						}
						else
						{
							$(this).parent().parent().submit();
						}
					});
					//取消编辑按钮，关闭当前编辑框
					$("[name='edit_cancel']").click(function(){
						art.dialog.list['stop_all_dialog'].close();
					});
					//输入框类型的事件
					/*$(".input_type").focus(function(){
						$(this).addClass("input_type_focus");
					});
					$(".input_type").blur(function(){
						$(this).removeClass("input_type_focus");
					});*/
				}
			});
		}
		if(user_type == "zhuyuanhushi")
		{
			art.dialog({
				id:"stop_all_dialog",
				title:"停止所有医嘱",
				content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
										'<li>'+
										'<span >执行护士:</span><input type="text" name="stop_hushi_name" class="input_type" value="'
														+hushi_name+'" disabled="disabled"/>'+
										'</li>'+
										'<li>'+
											'<input type="button" class="edit_yizhu_button" name="stop_confirm" value="确认执行" />'+
											'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
											'<input type="hidden" name="biaoshi" value="hedui_stop" />'+
											'<input type="hidden" name="zhuyuan_id" value="'+zhuyuan_id+'" />'+
											'<input type="hidden" name="stop_hushi_name" value="'
														+hushi_name+'" />'+
											'<span name="tips" class="right_tips"></span>'+
										'</li>'+
								'</form>',
				lock: true,
				padding:5,
				init: function () {
					$("[name='stop_confirm']").click(function(){
						$(this).parent().parent().submit();
					});
					$("[name='edit_cancel']").click(function(){
						art.dialog.list['stop_all_dialog'].close();
					});
				}
			});
		}
		//最后显示添加新医嘱添加框
		//$(this).parent().parent().parent().find("[name='stopall_table']").show();
	});//end of $("[name='stop_all']").click

	//开始执行所有医嘱，对应按钮：医生执行所有、护士所有正确
	$("[name='start_all']").click(function() {
		if(user_type == "zhuyuanyishi")
		{
			art.dialog({
				id:"start_all_dialog",
				title:"执行所有医嘱",
				content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
										'<li>'+
										//'<span >时间:</span><input type="text" action_type="datetime" name="start_time" id="datetime_input" value="'+yizhu_date+'"/>'+
										'<span >执行医生:</span><input type="text" name="start_yishi_name" class="input_type" value="'
														+yishi_name+'" disabled="disabled"/>'+ 
										'</li>'+
										'<li>'+
											'<input type="button" class="edit_yizhu_button" name="start_confirm" value="确认执行" />'+
											'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
											'<input type="hidden" name="biaoshi" value="start" />'+
											'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
											'<input type="hidden" name="start_yishi_name" value="'
														+yishi_name+'" />'+
											'<span name="tips" class="right_tips"></span>'+
										'</li>'+
								'</form>',
				lock: true,
				padding:5,
				init: function () {}
			});
		}
		if(user_type == "zhuyuanhushi")
		{
			art.dialog({
				id:"start_all_dialog",
				title:"执行所有医嘱",
				content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
										'<li>'+
										//'<span >时间:</span><input type="text" action_type="datetime" name="start_time" id="datetime_input" value="'+yizhu_date+'"/>'+
										'<span >执行护士:</span><input type="text" name="start_hushi_name" class="input_type" value="'
														+hushi_name+'" disabled="disabled"/>'+
										'</li>'+
										'<li>'+
											'<input type="button" class="edit_yizhu_button" name="start_confirm" value="确认执行" />'+
											'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
											'<input type="hidden" name="biaoshi" value="hedui_start" />'+
											'<input type="hidden" name="zhuyuan_id" value="'+zhuyuan_id+'" />'+
											'<input type="hidden" name="start_hushi_name" value="'
														+hushi_name+'" />'+
											'<span name="tips" class="right_tips"></span>'+
										'</li>'+
								'</form>',
				lock: true,
				padding:5,
				init: function () {}
			});
		}
		
		//点击确认停止之前，先判断内容输入的正确性
		$("[name='start_confirm']").click(function(){
			//验证医嘱停止时间是否为空
			if($(this).parent().parent().find("[name='start_time']").val()=="")
			{
				$(this).parent().parent().find("[name='tips']").html("请先输入停止执行医嘱的时间后再确认!");
				$(this).parent().parent().find("[name='tips']").addClass("error_tips");
				$(this).parent().parent().find("[name='tips']").fadeOut();
				$(this).parent().parent().find("[name='tips']").fadeIn();
				return false;
			}
			//验证是否所有编辑项都已经关闭了
			else if($(this).parent().parent().parent().parent().parent().parent().parent().find("[class='edit_table']:visible").length>1)
			{
				$(this).parent().parent().find("[name='tips']").html("请先关闭所有医嘱编辑框后再确认!");
				$(this).parent().parent().find("[name='tips']").addClass("error_tips");
				$(this).parent().parent().find("[name='tips']").fadeOut();
				$(this).parent().parent().find("[name='tips']").fadeIn();
				return false;
			}
			else
			{
				$(this).parent().parent().submit();
			}
		});
		//取消编辑按钮，关闭当前编辑框
		$("[name='edit_cancel']").click(function(){
			art.dialog.list['start_all_dialog'].close();
		});
		//输入框类型的事件
		/*$(".input_type").focus(function(){
			$(this).addClass("input_type_focus");
		});
		$(".input_type").blur(function(){
			$(this).removeClass("input_type_focus");
		});*/
		//最后显示添加新医嘱添加框
		//$(this).parent().parent().parent().find("[name='startall_table']").show();
	});
	
	//重整医嘱功能
	$("[name='rebuilt_yizhu']").click(function(){
		art.dialog({
			id:"rebuilt_yizhu_dialog",
			title:"选择要重整的医嘱",
			content:'<div class="rebuilt_yizhu_wrap">'+
							'</div>'+
							'<div class="linchuanglujing_confirm">'+
								'<input type="button"  class="submit_button" id="rebuilt_confirm" value=" 确 定 " />'+
								'<input type="button"  class="submit_button" id="rebuilt_cancel" value=" 取 消 " />'+
							'</div>',
			lock: true,
			padding:5,
			init: function () {
				$.get("http://"+server_url+"/tiantan_emr/Common/Data/rebuiltYizhu", {zhuyuan_id:zhuyuan_id}, function(data){
					$(data).appendTo("div.rebuilt_yizhu_wrap");
					$(".yizhu_check").change(function(){
						if($(this).attr("checked")=="checked")
						{
							$(".yizhu_check[zuhao="+$(this).attr("zuhao")+"]").attr("checked","checked");
						}
						if($(this).attr("checked")!="checked")
						{
							$(".yizhu_check[zuhao="+$(this).attr("zuhao")+"]").removeAttr("checked");
						}
					});
				});
				$("#rebuilt_confirm").click(function(){
					min_zuhao=-1;
					max_zuhao=-1;
					$(".yizhu_check").each(function(){
						if($(this).attr("checked")=="checked")
						{
							if(min_zuhao==-1)
							{
								min_zuhao=$(this).attr("zuhao");
							}
							else if(min_zuhao>$(this).attr("zuhao"))
							{
								min_zuhao=$(this).attr("zuhao");
							}
							if(max_zuhao==-1)
							{
								max_zuhao=$(this).attr("zuhao");
							}
							else if(max_zuhao<$(this).attr("zuhao"))
							{
								max_zuhao=$(this).attr("zuhao");
							}
						}
					});
					yizhu_zuhao = min_zuhao-1;
					save_zuhao = max_zuhao-yizhu_zuhao;
					post_rebuilt_url = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/rebuiltYizhu";

					var index = 0;
					$(".yizhu_check").each(function(){
						if($(this).attr("checked")=="checked")
						{
							var post_yizhu_param = {};
							post_yizhu_param["id"]=$(this).attr("id");
							post_yizhu_param["zuhao"]=$(this).attr("zuhao")-yizhu_zuhao;
							post_yizhu_param["index"]=index++;
							$.ajaxSetup({
								async: false
							});
							$.post(post_rebuilt_url, post_yizhu_param, function(dom) {});
							$.ajaxSetup({
								async: true
							});
						}
					});
					post_savezuhao_url = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/saveZuhao";
					var post_savezuhao_param = {};
					post_savezuhao_param["zuhao"]=save_zuhao;
					$.post(post_savezuhao_url, post_savezuhao_param, function(dom) {});
					art.dialog.list['rebuilt_yizhu_dialog'].close();
					window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showChangqi/zhuyuan_id/"+zhuyuan_id;
				});
				$("#rebuilt_cancel").click(function(){
					art.dialog.list['rebuilt_yizhu_dialog'].close();
				});
			}
		});
	});
}

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
	$(".editable_partly").mouseover(function(){
		$(this).addClass("editable_focus");
	});
	$(".editable_partly").mouseout(function(){
		$(this).removeClass("editable_focus");
	});
	
	//可编辑表格点击时，分别可以打开或者关闭编辑框
	$(".editable").toggle(
		function(){
			$(this).addClass("editable_on_edit");
			var type = $(this).find("[name='yongfa_type']").html();
			var yaopin_mingcheng = $(this).find('[name="content"]').html();
			var current_yizhu_state = $(this).find("[name='state']").html();
			var edit_yizhu = $(this);
			if(operator_type=="yishi")
			{
				var temp_html = edit_yizhu.parent().find("[name='state']").html();
				if(supervisor_authority=="false")
				{
					if(current_yizhu_state=="已添加"||current_yizhu_state=="医嘱有误" || current_yizhu_state=="待确认" || current_yizhu_state=="开始待审核")
					{
						var start_time = $(this).find("[name='start_time']").html();
						var temp_panduan;
						if(type == '护理')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" disabled="disabled" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" disabled="disabled" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else if(type == '医嘱整理')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" disabled="disabled" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" disabled="disabled" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else if(type == '诊疗项目')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" disabled="disabled" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else if(type == '西药中成药')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else if(type == '中草药')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						if($(this).find("[name='shifou_jiaji']").html() == 0)
						{
							var temp_shifou_jiaji = "加急";
						}
						else
						{
							var temp_shifou_jiaji = $(this).find("[name='shifou_jiaji']").html();
						}
						var yaopin_option = "";
						if(zhiliao_leibie!="西医治疗")
						{
							yaopin_option = "<option>中草药</option>";
						}
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
													'<li>'+
														'<span class="info_title">开始时间:</span><input type="text" action_type="datetime" name="start_time" id="datetime_input" value="'
														+$(this).find("[name='start_time']").html().replace(/<BR>/i,' ')+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
														'<span >执行医生:</span><input type="text" name="start_yishi_name" class="input_type" value="'
														+yishi_name+'" disabled="disabled"/>'+
														'<span >类型:</span>'+
														'<select name="yongfa_type" class="select_type_small" value="">'+
															'<option>'+$(this).find("[name='yongfa_type']").html()+'</option>'+
															'<option>护理</option>'+
															'<option>诊疗项目</option>'+
															// '<option>西药中成药</option>'+
															// yaopin_option+
															'<option>其它</option>'+
															'<option>医嘱整理</option>'+
														'</select>'+
													'</li>'+
													'<li>'+
														'<span class="info_title">医嘱内容:</span><input type="text" name="content" class="input_type_full" value="'
														+$(this).find("[name='content']").html()+'"/>'+
													'</li>'+
													temp_panduan+
													'<li>'+
														'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
														+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled"/>'+	
														'<span >执行次序:</span><select name="shifou_jiaji" class="select_type" action_type="others"><option value="'+$(this).find("[name='shifou_jiaji']").html()+'">'
														+temp_shifou_jiaji+'</option><option val="1">1</option><option val="2">2</option><option val="3">3</option><option val="4">4</option><option val="5">5</option><option val="0">加急</option></select>'+
													'</li>'+
													'<li>'+
														'<input type="button" class="edit_yizhu_button" name="start_zhixing" value="开始执行" />'+
														'<input type="button" class="edit_yizhu_button" name="save_start_info" value="保存修改" />'+
														'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
														'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
														'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
														'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
														'<input type="hidden" name="state" value="" />'+
														'<input type="hidden" name="zhuyuan_id" value="'+zhuyuan_id+'" />'+
														'<input type="hidden" name="start_zhiye_yishi_name" value="" />'+
														'<input type="hidden" name="start_yishi_name" value="" />'+
														'<span name="tips" class="right_tips"></span>'+
													'</li>'+
												'</form>',
							lock: true,
							padding:5,
							init: function () {
								if(edit_yizhu.find("[name='content']").html() == '中草药'){
									$('[name="ciliang"]').hide().prev().hide();
									$('[name="shiyong_danwei"]').hide();
								}
								
								//无职业医师证件医生改变按钮名称以及医师信息：
								if(user_kebie_position == "助理执业医师")
								{
									$('[name="start_zhixing"]').val("提交开始审核");
									temp_start_yishi_name = edit_yizhu.find("[name='start_yishi_name']").text();
									if(temp_start_yishi_name=="")
										temp_start_yishi_name = yishi_name;
									$('input:[name="start_yishi_name"]').val(temp_start_yishi_name);
								}
								else
								{
									temp_start_yishi_name = edit_yizhu.find("[name='start_yishi_name']").text();
									if(temp_start_yishi_name=="")
										temp_start_yishi_name = yishi_name;
									$('input:[name="start_yishi_name"]').val(temp_start_yishi_name);
									$('input:[name="start_zhiye_yishi_name"]').val(yishi_name);
								}
								//change变换输入框状态
								$("[name='yongfa_type']").change(function(){
									var type = $(this).val();
									if(type=="护理")
									{
										$(this).parent().next().next().find('[name="ciliang"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="yongfa"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="pinlv"]').attr("disabled","disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else if(type=="医嘱整理")
									{
										$(this).parent().next().next().find('[name="ciliang"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="yongfa"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="pinlv"]').attr("disabled","disabled");
										$(this).parent().parent().find('[name="biaoshi"]').val("zhengli");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else if(type=="诊疗项目")
									{
										$(this).parent().next().next().find('[name="ciliang"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="yongfa"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="pinlv"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else if(type=="西药中成药")
									{
										$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="ciliang"]')
												.enterTo('[name="shiyong_danwei"]')
												.enterTo('[name="yongfa"]')
												.enterTo('[name="pinlv"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else if(type=="中草药")
									{
										$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="ciliang"]')
												.enterTo('[name="shiyong_danwei"]')
												.enterTo('[name="yongfa"]')
												.enterTo('[name="pinlv"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else if(type=="组合")
									{
										$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="ciliang"]')
												.enterTo('[name="shiyong_danwei"]')
												.enterTo('[name="yongfa"]')
												.enterTo('[name="pinlv"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else
									{
										$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="ciliang"]')
												.enterTo('[name="shiyong_danwei"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
								});
							}
						});
					}//end of if(current_yizhu_state=="已添加")
					else if(current_yizhu_state=="开始待核对")
					{
						var start_time = $(this).find("[name='start_time']").html();
						var temp_panduan;
						if(type == '护理')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" disabled="disabled" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" disabled="disabled" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else if(type == '医嘱整理')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" disabled="disabled" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" disabled="disabled" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else if(type == '诊疗项目')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" disabled="disabled" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else if(type == '西药中成药')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else if(type == '中草药')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						if($(this).find("[name='shifou_jiaji']").html() == 0)
						{
							var temp_shifou_jiaji = "加急";
						}
						else
						{
							var temp_shifou_jiaji = $(this).find("[name='shifou_jiaji']").html();
						}
						var yaopin_option = "";
						if(zhiliao_leibie!="西医治疗")
						{
							yaopin_option = "<option>中草药</option>";
						}
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
													'<li>'+
														'<span class="info_title">开始时间:</span><input type="text" action_type="datetime" name="start_time" id="datetime_input" value="'
														+$(this).find("[name='start_time']").html().replace(/<BR>/i,' ')+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
														'<span >执行医生:</span><input type="text" name="start_yishi_name" class="input_type" value="'
														+yishi_name+'" disabled="disabled"/>'+
														'<span >类型:</span>'+
														'<select name="yongfa_type" class="select_type_small" value="">'+
															'<option>'+$(this).find("[name='yongfa_type']").html()+'</option>'+
															'<option>护理</option>'+
															'<option>诊疗项目</option>'+
															// '<option>西药中成药</option>'+
															// yaopin_option+
															'<option>其它</option>'+
															'<option>医嘱整理</option>'+
														'</select>'+
													'</li>'+
													'<li>'+
														'<span class="info_title">医嘱内容:</span><input type="text" name="content" class="input_type_full" value="'
														+$(this).find("[name='content']").html()+'"/>'+
													'</li>'+
													temp_panduan+
													'<li>'+
														'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
														+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled"/>'+	
														'<span >执行次序:</span><select name="shifou_jiaji" class="select_type" action_type="others"><option value="'+$(this).find("[name='shifou_jiaji']").html()+'">'
														+temp_shifou_jiaji+'</option><option val="1">1</option><option val="2">2</option><option val="3">3</option><option val="4">4</option><option val="5">5</option><option val="0">加急</option></select>'+
													'</li>'+
													'<li>'+
														'<input type="button" class="edit_yizhu_button" name="save_start_info" value="保存修改" />'+
														'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
														'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
														'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
														'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
														'<input type="hidden" name="state" value="" />'+
														'<input type="hidden" name="zhuyuan_id" value="'+zhuyuan_id+'" />'+
														'<input type="hidden" name="start_zhiye_yishi_name" value="" />'+
														'<input type="hidden" name="start_yishi_name" value="" />'+
														'<span name="tips" class="right_tips"></span>'+
													'</li>'+
												'</form>',
							lock: true,
							padding:5,
							init: function () {
								if(edit_yizhu.find("[name='content']").html() == '中草药'){
									$('[name="ciliang"]').hide().prev().hide();
									$('[name="shiyong_danwei"]').hide();
								}
								
								//无职业医师证件医生改变按钮名称以及医师信息：
								if(user_kebie_position == "助理执业医师")
								{
									$('[name="start_zhixing"]').val("提交开始审核");
									temp_start_yishi_name = edit_yizhu.find("[name='start_yishi_name']").text();
									if(temp_start_yishi_name=="")
										temp_start_yishi_name = yishi_name;
									$('input:[name="start_yishi_name"]').val(temp_start_yishi_name);
								}
								else
								{
									temp_start_yishi_name = edit_yizhu.find("[name='start_yishi_name']").text();
									if(temp_start_yishi_name=="")
										temp_start_yishi_name = yishi_name;
									$('input:[name="start_yishi_name"]').val(temp_start_yishi_name);
									$('input:[name="start_zhiye_yishi_name"]').val(yishi_name);
								}
								//change变换输入框状态
								$("[name='yongfa_type']").change(function(){
									var type = $(this).val();
									if(type=="护理")
									{
										$(this).parent().next().next().find('[name="ciliang"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="yongfa"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="pinlv"]').attr("disabled","disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else if(type=="医嘱整理")
									{
										$(this).parent().next().next().find('[name="ciliang"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="yongfa"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="pinlv"]').attr("disabled","disabled");
										$(this).parent().parent().find('[name="biaoshi"]').val("zhengli");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else if(type=="诊疗项目")
									{
										$(this).parent().next().next().find('[name="ciliang"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="yongfa"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="pinlv"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else if(type=="西药中成药")
									{
										$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="ciliang"]')
												.enterTo('[name="shiyong_danwei"]')
												.enterTo('[name="yongfa"]')
												.enterTo('[name="pinlv"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else if(type=="中草药")
									{
										$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="ciliang"]')
												.enterTo('[name="shiyong_danwei"]')
												.enterTo('[name="yongfa"]')
												.enterTo('[name="pinlv"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else if(type=="组合")
									{
										$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="ciliang"]')
												.enterTo('[name="shiyong_danwei"]')
												.enterTo('[name="yongfa"]')
												.enterTo('[name="pinlv"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
									else
									{
										$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="pinlv"]').removeAttr("disabled");
										$(this).parent().next().next().find('[name="yongfa"]').removeAttr("disabled");
										$('[name="start_time"]')
												.enterTo('[name="content"]')
												.enterTo('[name="ciliang"]')
												.enterTo('[name="shiyong_danwei"]')
												.enterTo('[name="shifou_jiaji"]')
												.enterComplete(function (){
												$('[name="add_one"]').focus();
										});
									}
								});
							}
						});
					}//end of if(current_yizhu_state=="开始待核对")
					else if(current_yizhu_state=="开始执行" || current_yizhu_state == "停止待审核")
					{
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+	
											'<li>'+
												'<span class="info_title">停止时间:</span><input type="text" action_type="datetime" name="stop_time" id="datetime_input" value="'+yizhu_date+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
												'<span >执行医生:</span><input type="text" name="stop_yishi_name" class="input_type" value="'
												+yishi_name+'" disabled="disabled"/>'+
											'</li>'+
											'<li>'+
												'<span class="info_title">其它信息:</span>'+
												'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
												+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
											'</li>'+
											'<li>'+
												'<input type="button" class="edit_yizhu_button" name="stop_zhixing" value="停止执行" />'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
												'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
												'<input type="hidden" name="stop_yishi_name" value='+yishi_name+' />'+
												'<input type="hidden" name="stop_zhiye_yishi_name" value='+yishi_name+' />'+
												'<span name="tips" class="right_tips"></span>'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {
								//无职业医师证件医生改变按钮名称以及医师信息：
								if(user_kebie_position == "助理执业医师")
								{
									$('[name="stop_zhixing"]').val("提交停止审核");
									temp_stop_yishi_name = edit_yizhu.find("[name='stop_yishi_name']").text();
									if(temp_stop_yishi_name=="")
										temp_stop_yishi_name = yishi_name;
									$('input:[name="stop_yishi_name"]').val(temp_stop_yishi_name);
								}
								else
								{
									temp_stop_yishi_name = edit_yizhu.find("[name='stop_yishi_name']").text();
									if(temp_stop_yishi_name=="")
										temp_stop_yishi_name = yishi_name;
									$('input:[name="stop_yishi_name"]').val(temp_stop_yishi_name);
									$('input:[name="stop_zhiye_yishi_name"]').val(yishi_name);
								}
							}
						});
					}//end of if(current_yizhu_state=="开始执行")
					else if(current_yizhu_state=="待停止核对")
					{
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+	
											'<li>'+
												'<span class="info_title">停止:</span>'+
												'<span >时间:</span><input type="text" action_type="datetime" name="stop_time" id="datetime_input" value="'
												+$(this).find("[name='stop_time']").html()+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
												'<span >执行医生:</span><input type="text" name="stop_yishi_name" class="input_type" value="'
												+yishi_name+'" disabled="disabled"/>'+
											'</li>'+
											'<li>'+
												'<span class="info_title">其它信息:</span>'+
												'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
												+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
											'</li>'+
											'<li>'+
												'<input type="button" class="edit_yizhu_button" name="save_stop_info" value="保存修改" />'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
												'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
												'<input type="hidden" name="stop_yishi_name" value='+yishi_name+' />'+
												'<span name="tips" class="right_tips"></span>'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {
								
							}
						});
					}//end of if(current_yizhu_state=="待停止核对")
					else if(current_yizhu_state=="停止待核对" || current_yizhu_state=="停止执行")
					{
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/addChangqi">'+
											'<li>'+
												'<span class="info_title">此项医嘱已经停止执行</span>'+
											'</li>'+
											'<li>'+
													'<span class="info_title">停止时间:</span><input type="text" id="datetime_input_2" action_type="datetime" name="stop_time" value="'
													+$(this).find("[name='stop_time']").html()+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input_2\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
												'</li>'+
											'<li>'+
												'<span class="info_title">其它信息:</span>'+
												'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
												+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
											'</li>'+
											'<li>'+
												'<input type="button" class="edit_yizhu_button" name="save_start_info" value="保存修改" />'+
												'<input type="submit" class="edit_yizhu_button" name="reconstruct" value="重新开立" />'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
												'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
												'<input type="hidden" name="biaoshi" value="recon" />'+
												// '<input type="hidden" name="start_yishi_name" value='+yishi_name+' />'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {
								$("input[name='save_start_info']").click(function(){	
									var zuhao = $(this).parent().find("input[name='zuhao']").val()
									var stop_time = $(this).parent().parent().find("input[name='stop_time']").val();
									$(this).parent().parent().attr("action","http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/updateChangqi");
									$(edit_yizhu.siblings()).each(function(){
										if($(this).attr('name')==zuhao)
											$(this).find("[name='stop_time']").html(stop_time);
									})							
							  });
							}
						});
					}
					else
					{
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/addChangqi">'+
											'<li>'+
												'<span class="info_title">此项医嘱已经停止执行</span>'+
											'</li>'+
											'<li>'+
													'<span class="info_title">停止时间:</span><input type="text" id="datetime_input_2" action_type="datetime" name="stop_time" value="'
													+$(this).find("[name='stop_time']").html()+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input_2\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
												'</li>'+
											'<li>'+
												'<span class="info_title">其它信息:</span>'+
												'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
												+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
											'</li>'+
											'<li>'+
												'<input type="submit" class="edit_yizhu_button" name="save_start_info" value="保存修改" />'+
												'<input type="submit" class="edit_yizhu_button" name="reconstruct" value="重新开立" />'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
												'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
												'<input type="hidden" name="biaoshi" value="recon" />'+
												'<input type="hidden" name="start_yishi_name" value='+yishi_name+' />'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {
								$("input[name='save_start_info']").click(function(){	
									var zuhao = $(this).parent().find("input[name='zuhao']").val()
									var stop_time = $(this).parent().parent().find("input[name='stop_time']").val();
									$(this).parent().parent().attr("action","http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/updateChangqi");
									$(edit_yizhu.siblings()).each(function(){
										if($(this).attr('name')==zuhao)
											$(this).find("[name='stop_time']").html(stop_time);
									})							
							  });
							}
						});
					}
				}
				else
				{
					var start_time = $(this).find("[name='start_time']").html();
					var state = $(this).find("[name='state']").html();
					var disable_arr = new Array();
					disable_arr[0] = 'disabled="disabled"';
					disable_arr[1] = 'disabled="disabled"';
					disable_arr[2] = 'disabled="disabled"';
					disable_arr[3] = 'disabled="disabled"';
					if(state=="已添加" || state=="开始待审核" || state=="开始待核对")
					{
						disable_arr[0] = 'disabled="disabled"';
						disable_arr[1] = 'disabled="disabled"';
						disable_arr[2] = 'disabled="disabled"';
						disable_arr[3] = 'disabled="disabled"';
					}
					else if(state=="开始执行" || state=="医嘱有误")
					{
						disable_arr[0] = '';
						disable_arr[1] = 'disabled="disabled"';
						disable_arr[2] = 'disabled="disabled"';
						disable_arr[3] = 'disabled="disabled"';
					}
					else if(state=="停止待审核" || state=="停止待核对")
					{
						disable_arr[0] = '';
						disable_arr[1] = '';
						disable_arr[2] = '';
						disable_arr[3] = 'disabled="disabled"';
					}
					else
					{
						disable_arr[0] = '';
						disable_arr[1] = '';
						disable_arr[2] = '';
						disable_arr[3] = '';
					}
					
					art.dialog({
						id:"edit_yizhu_dialog",
						title:"编辑医嘱",
						content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
												'<li>'+
													'<span class="info_title">医嘱状态:</span>'+
													'<select name="state" class="select_type">'+
														'<option value="已添加">已添加</option>'+
														'<option value="开始待审核">开始待审核</option>'+
														'<option value="开始待核对">开始待核对</option>'+
														'<option value="开始执行">开始执行</option>'+
														'<option value="医嘱有误">医嘱有误</option>'+
														'<option value="停止待审核">停止待审核</option>'+
														'<option value="停止待核对">停止待核对</option>'+
														'<option value="停止执行">停止执行</option>'+
													'</select>'+
												'</li>'+
												'<li>'+
													'<span class="info_title">开始时间:</span><input type="text" action_type="datetime" id="datetime_input_1" name="start_time" value="'
													+$(this).find("[name='start_time']").html().replace(/<BR>/i,' ')+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input_1\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
													'<span >执行医生:</span><input type="text" name="start_yishi_name" class="input_type" value="'+$(this).find("[name='start_yishi_name']").html()+'"/>'+
													'<span >执行护士:</span><input type="text" name="start_hushi_name" class="input_type" '+disable_arr[0]+' value="'+$(this).find("[name='start_hushi_name']").html()+'"/>'+
												'</li>'+
												'<li>'+
													'<span class="info_title">停止时间:</span><input type="text" action_type="datetime" id="datetime_input_2" '+disable_arr[1]+' name="stop_time" value="'
													+$(this).find("[name='stop_time']").html().replace(/<BR>/i,' ')+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input_2\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
													'<span >执行医生:</span><input type="text" name="stop_yishi_name" class="input_type" '+disable_arr[2]+' value="'+$(this).find("[name='stop_yishi_name']").html()+'"/>'+
													'<span >执行护士:</span><input type="text" name="stop_hushi_name" class="input_type" '+disable_arr[3]+' value="'+$(this).find("[name='stop_hushi_name']").html()+'"/>'+
												'</li>'+
												'<li>'+
													'<input type="button" class="edit_yizhu_button" name="save_start_info" value="保存修改" />'+
													'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
													'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
													'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
													'<input type="hidden" name="zhuyuan_id" value="'+zhuyuan_id+'" />'+
													'<input type="hidden" name="biaoshi" value="supervisor" />'+
													'<span name="tips" class="right_tips"></span>'+
												'</li>'+
											'</form>',
						lock: true,
						padding:5,
						init: function () {
							$("select[name='state']").children("option").each(function(){
								if($(this).html()==state)
								{
									$(this).attr("selected",true);
								}
								else
								{
									$(this).attr("selected",false);
								}
							});
							$("select[name='state']").change(function(){
								var state_val = $(this).val();
								if(state_val=="已添加" || state_val=="开始待审核" || state_val=="开始待核对")
								{
									$("[name='start_hushi_name']").attr("disabled",true);
									$("[name='stop_time']").attr("disabled",true);
									$("[name='stop_yishi_name']").attr("disabled",true);
									$("[name='stop_hushi_name']").attr("disabled",true);
								}
								else if(state_val=="开始执行" || state_val=="医嘱有误")
								{
									$("[name='start_hushi_name']").attr("disabled",false);
									$("[name='stop_time']").attr("disabled",true);
									$("[name='stop_yishi_name']").attr("disabled",true);
									$("[name='stop_hushi_name']").attr("disabled",true);
								}
								else if(state_val=="停止待审核" || state_val=="停止待核对")
								{
									$("[name='start_hushi_name']").attr("disabled",false);
									$("[name='stop_time']").attr("disabled",false);
									$("[name='stop_yishi_name']").attr("disabled",false);
									$("[name='stop_hushi_name']").attr("disabled",true);
								}
								else
								{
									$("[name='start_hushi_name']").attr("disabled",false);
									$("[name='stop_time']").attr("disabled",false);
									$("[name='stop_yishi_name']").attr("disabled",false);
									$("[name='stop_hushi_name']").attr("disabled",false);
								}
							});
							var cache_start_yishi_name = {},lastXhr_start_yishi_name;
							$( "[name='start_yishi_name']" ).autocomplete({
								minLength: 0,
								source: function( request, response ) {
									var temp_state_val = $("select[name='state']").val();
									var temp_kebie_position = "";
									if(temp_state_val=="开始待审核" || temp_state_val=="停止待审核")
									{
										temp_kebie_position = "助理执业医师";
									}
									term = request.term;
									if ( term in cache_start_yishi_name ) {
										response( cache_start_yishi_name [ term ] );
										return;
									}
									lastXhr_start_yishi_name = $.getJSON( "http://"+server_url+"/tiantan_emr/Common/Data/getDataYishiListJson", {"user_type":"医生","user_department":user_department,"term":term,"user_kebie_position":temp_kebie_position}, function( data, status, xhr ) {
										cache_start_yishi_name [ term ] = data;
										if ( xhr === lastXhr_start_yishi_name ) {
											response( data );
										}
									});
								},
								select: function( event, ui ) {
									$( "[name='start_yishi_name']" ).val( ui.item.label );
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
							var cache_stop_yishi_name = {},lastXhr_stop_yishi_name;
							$( "[name='stop_yishi_name']" ).autocomplete({
								minLength: 0,
								source: function( request, response ) {
									var temp_state_val = $("select[name='state']").val();
									var temp_kebie_position = "";
									if(temp_state_val=="开始待审核" || temp_state_val=="停止待审核")
									{
										temp_kebie_position = "助理执业医师";
									}
									term = request.term;
									if ( term in cache_stop_yishi_name ) {
										response( cache_stop_yishi_name [ term ] );
										return;
									}
									lastXhr_stop_yishi_name = $.getJSON( "http://"+server_url+"/tiantan_emr/Common/Data/getDataYishiListJson", {"user_type":"医生","user_department":user_department,"term":term,"user_kebie_position":temp_kebie_position}, function( data, status, xhr ) {
										cache_stop_yishi_name [ term ] = data;
										if ( xhr === lastXhr_stop_yishi_name ) {
											response( data );
										}
									});
								},
								select: function( event, ui ) {
									$( "[name='stop_yishi_name']" ).val( ui.item.label );
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
							var cache_start_hushi_name = {},lastXhr_start_hushi_name;
							$( "[name='start_hushi_name']" ).autocomplete({
								minLength: 0,
								source: function( request, response ) {
									term = request.term;
									if ( term in cache_start_hushi_name ) {
										response( cache_start_hushi_name [ term ] );
										return;
									}
									lastXhr_start_hushi_name = $.getJSON( "http://"+server_url+"/tiantan_emr/Common/Data/getDataYishiListJson", {"user_type":"护士","user_department":user_department,"term":term}, function( data, status, xhr ) {
										cache_start_hushi_name [ term ] = data;
										if ( xhr === lastXhr_start_hushi_name ) {
											response( data );
										}
									});
								},
								select: function( event, ui ) {
									$( "[name='start_hushi_name']" ).val( ui.item.label );
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
							var cache_stop_hushi_name = {},lastXhr_stop_hushi_name;
							$( "[name='stop_hushi_name']" ).autocomplete({
								minLength: 0,
								source: function( request, response ) {
									term = request.term;
									if ( term in cache_stop_hushi_name ) {
										response( cache_stop_hushi_name [ term ] );
										return;
									}
									lastXhr_stop_hushi_name = $.getJSON( "http://"+server_url+"/tiantan_emr/Common/Data/getDataYishiListJson", {"user_type":"护士","user_department":user_department,"term":term}, function( data, status, xhr ) {
										cache_stop_hushi_name [ term ] = data;
										if ( xhr === lastXhr_stop_hushi_name ) {
											response( data );
										}
									});
								},
								select: function( event, ui ) {
									$( "[name='stop_hushi_name']" ).val( ui.item.label );
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
						}
					});
				}
			}
			if(operator_type=="hushi")
			{
				if(current_yizhu_state=="已添加"||current_yizhu_state=="医嘱有误")
				{
					art.dialog({
						id:"edit_yizhu_dialog",
						title:"编辑医嘱",
						content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
										'<li>'+
											'<span class="info_title">请等待医师开始执行后进行核对</span>'+
										'</li>'+
										'<li>'+
											'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
										'</li>'+
										'</form>',
						lock: true,
						padding:5,
						init: function () {}
					});
				}//end of if(current_yizhu_state=="已添加")
				else if(current_yizhu_state=="开始待核对")
				{
					art.dialog({
						id:"edit_yizhu_dialog",
						title:"编辑医嘱",
						content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+	
										'<li>'+
											'<span class="info_title">开始时间:</span><input type="text" name="start_time" class="input_type" value="'
											+$(this).find("[name='start_time']").html()+'" disabled="disabled"/>'+
											'<span >执行医生:</span><input type="text" name="start_yishi_name" class="input_type" value="'
											+$(this).find("[name='start_yishi_name']").html()+'" disabled="disabled"/>'+
											'<span >执行护士:</span><input type="text" name="start_hushi_name" class="input_type" value="'
											+hushi_name+'" disabled="disabled"/>'+
										'</li>'+
										'<li>'+
											'<span class="info_title">医嘱内容:</span><input type="text" name="content" class="input_type_full" value="'
											+$(this).find("[name='content']").html()+'" disabled="disabled"/>'+
										'</li>'+
										'<li>'+
											'<input type="button" class="edit_yizhu_button" name="check_right" value="医嘱正确" />'+
											'<input type="button" class="edit_yizhu_button" name="check_error" value="医嘱有误" />'+
											'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
											'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
											'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
											'<input type="hidden" name="state" value="" />'+
											'<input type="hidden" name="zhuyuan_id" value="'+zhuyuan_id+'" />'+
											'<input type="hidden" name="start_hushi_name" value="'+hushi_name+'" />'+
											'<span name="tips" class="right_tips"></span>'+
										'</li>'+
										'</form>',
						lock: true,
						padding:5,
						init: function () {}
					});
				}//end of if(current_yizhu_state=="开始待核对")
				else if(current_yizhu_state=="开始执行")
				{
					art.dialog({
						id:"edit_yizhu_dialog",
						title:"编辑医嘱",
						content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
										'<li>'+
											'<span class="info_title">医嘱执行中</span>'+
										'</li>'+
										'<li>'+
											'<span class="info_title">其它信息:</span>'+
											'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
											+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
										'</li>'+
										'<li>'+
											'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
										'</li>'+
										'</form>',
						lock: true,
						padding:5,
						init: function () {}
					});
				}//end of if(current_yizhu_state=="开始执行")
				else if(current_yizhu_state=="停止待核对")
				{
					art.dialog({
						id:"edit_yizhu_dialog",
						title:"编辑医嘱",
						content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+	
										'<li>'+
											'<span class="info_title">停止:</span>'+
											'<span >时间:</span><input type="text" name="stop_time" class="input_type" value="'+$(this).find("[name='stop_time']").html()+'" disabled="disabled"/>'+
											'<span >执行医生:</span><input type="text" name="stop_yishi_name" class="input_type" value="'
											+$(this).find("[name='stop_yishi_name']").html()+'" disabled="disabled"/>'+
											'<span >执行护士:</span><input type="text" name="stop_hushi_name" class="input_type" value="'
											+hushi_name+'" disabled="disabled"/>'+
										'</li>'+
										'<li>'+
											'<span class="info_title">其它信息:</span>'+
											'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
											+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
										'</li>'+
										'<li>'+
											'<input type="button" class="edit_yizhu_button" name="check_stop" value="确认停止" />'+
											'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
											'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
											'<input type="hidden" name="state" value="" />'+
											'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
											'<input type="hidden" name="zhuyuan_id" value="'+zhuyuan_id+'" />'+
											'<input type="hidden" name="stop_hushi_name" value="'+hushi_name+'" />'+
											'<span name="tips" class="right_tips"></span>'+
										'</li>'+
										'</form>',
						lock: true,
						padding:5,
						init: function () {}
					});
							
				}//end of if(current_yizhu_state=="停止待核对")
				else
				{
					art.dialog({
						id:"edit_yizhu_dialog",
						title:"编辑医嘱",
						content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
										'<li>'+
											'<span class="info_title">此项医嘱已经停止执行</span>'+
										'</li>'+
										'<li>'+
											'<span class="info_title">其它信息:</span>'+
											'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
											+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
										'</li>'+
										'<li>'+
											'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
										'</li>'+
										'</form>',
						lock: true,
						padding:5,
						init: function () {}
					})
				}
			}//end of if(operator_type=='hushi')
			
			//开始执行事件:
			if(type=="护理")
			{
				$('[name="start_time"]')
						.enterTo('[name="content"]')
						.enterTo('[name="shifou_jiaji"]')
						.enterComplete(function (){
						$('[name="save_start_info"]').focus();
				});
			}
			else if(type=="医嘱整理")
			{
				$('[name="start_time"]')
						.enterTo('[name="content"]')
						.enterTo('[name="shifou_jiaji"]')
						.enterComplete(function (){
						$('[name="save_start_info"]').focus();
				});
			}
			else if(type=="诊疗项目")
			{
				$('[name="start_time"]')
						.enterTo('[name="content"]')
						.enterTo('[name="pinlv"]')
						.enterTo('[name="shifou_jiaji"]')
						.enterComplete(function (){
						$('[name="save_start_info"]').focus();
				});
			}
			else if(type=="西药中成药")
			{
				$('[name="start_time"]')
						.enterTo('[name="content"]')
						.enterTo('[name="ciliang"]')
						.enterTo('[name="shiyong_danwei"]')
						.enterTo('[name="yongfa"]')
						.enterTo('[name="pinlv"]')
						.enterTo('[name="shifou_jiaji"]')
						.enterComplete(function (){
						$('[name="save_start_info"]').focus();
				});
			}
			else if(type=="中草药")
			{
				$('[name="start_time"]')
						.enterTo('[name="content"]')
						.enterTo('[name="ciliang"]')
						.enterTo('[name="shiyong_danwei"]')
						.enterTo('[name="yongfa"]')
						.enterTo('[name="pinlv"]')
						.enterTo('[name="shifou_jiaji"]')
						.enterComplete(function (){
						$('[name="save_start_info"]').focus();
				});
			}
			else
			{
				$('[name="start_time"]')
						.enterTo('[name="content"]')
						.enterTo('[name="ciliang"]')
						.enterTo('[name="shiyong_danwei"]')
						.enterTo('[name="shifou_jiaji"]')
						.enterComplete(function (){
						$('[name="save_start_info"]').focus();
				});
			}
		//开始执行事件
		$("[name='start_zhixing']").click(function(){
				//把新的编辑内容更新到页面中:
				edit_yizhu.find("[name='content']").html($(this).parent().parent().find("[name='content']").val());
				var temp_yishi_name = $(this).parent().parent().find("[name='start_yishi_name']").val();
				edit_yizhu.find("[name='start_yishi_name']").html(temp_yishi_name);
				edit_yizhu.find("[name='start_time']").html($(this).parent().parent().find("[name='start_time']").val());
				edit_yizhu.find("[name='ciliang']").html($(this).parent().parent().find("[name='ciliang']").val());
				edit_yizhu.find("[name='yongfa']").html($(this).parent().parent().find("[name='yongfa']").val());
				edit_yizhu.find("[name='pinlv']").html($(this).parent().parent().find("[name='pinlv']").val());
				edit_yizhu.find("[name='zhouqi']").html($(this).parent().parent().find("[name='zhouqi']").val());
				edit_yizhu.find("[name='shifou_jiaji']").html($(this).parent().parent().find("[name='shifou_jiaji']").val());
				//切换医嘱状态
				//无职业医师证件医生使用特殊状态：
				if(user_kebie_position == "助理执业医师" || user_kebie_position == "执业助理医师")
				{
					yizhu_temp_state = "开始待审核";
				}
				else
				{
					yizhu_temp_state = "开始待核对";
				}
				$(this).parent().find("[name='state']").val(yizhu_temp_state);
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
					ob1.eq(i).find("span[name='state']").html(yizhu_temp_state);
					ob1.eq(i).find("span[name='state']").parent().removeClass("new_added");
				}
				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				edit_yizhu.click();
				art.dialog.list['edit_yizhu_dialog'].close();
		});
		//停止执行事件：
		$("[name='stop_zhixing']").click(function(){
			//验证医嘱开始时间是否为空
			if($(this).parent().parent().find("[name='stop_time']").val()=="")
			{
				$(this).parent().parent().find("[name='tips']").html("请先输入开始执行医嘱的时间后再添加!");
				$(this).parent().parent().find("[name='tips']").addClass("error_tips");
				$(this).parent().parent().find("[name='tips']").fadeOut();
				$(this).parent().parent().find("[name='tips']").fadeIn();
				return false;
			}
			//把新的编辑内容更新到页面中:
			edit_yizhu.find("[name='content']").html($(this).parent().parent().find("[name='content']").val());
			var temp_yishi_name = $(this).parent().parent().find("[name='stop_yishi_name']").val();
			edit_yizhu.find("[name='stop_yishi_name']").html(temp_yishi_name);
			edit_yizhu.find("[name='stop_time']").html($(this).parent().parent().find("[name='stop_time']").val());
			//切换医嘱状态
			//同时非职业医师切换状态权限
			if(user_kebie_position == "助理执业医师")
			{
				yizhu_temp_state = "停止待审核";
			}
			else
			{
				yizhu_temp_state = "停止待核对";
			}
			$(this).parent().find("[name='state']").val(yizhu_temp_state);
			var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
			var nu = ob1.length;
			for(var i=0;i<nu;i++){
				var temp_yishi_name = $(this).parent().parent().find("[name='stop_yishi_name']").val();
				ob1.eq(i).find("[name='stop_yishi_name']").html(temp_yishi_name);
				ob1.eq(i).find("[name='stop_time']").html($(this).parent().parent().find("[name='stop_time']").val());
				ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
			}
			//表单ajax提交
			$(this).parent().parent().ajaxSubmit(form_options); 
			edit_yizhu.click();
			art.dialog.list['edit_yizhu_dialog'].close();
		});
		//删除医嘱事件：
		$("[name='delete']").click(function(){
			if (confirm('是否确认进行删除操作？'))
			{
				//切换医嘱状态
				var temp_action = $(this).parent().parent().attr("action");
				if(temp_action.indexOf("addChangqi")!=-1)
				{
					temp_action = temp_action.replace("addChangqi","updateChangqi");
					$(this).parent().parent().attr("action",temp_action);
				}
				$(this).parent().find("[name='state']").val("已删除");
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
					ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
				}
				
				/*
				$temp = $(this).parent().parent().parent().parent().parent().prev().find("[name='state']");
				$temp.html($(this).parent().parent().find("[name='state']").val());
				$temp.parent().parent().prevUntil("[name]").find("[name='state']").html($(this).parent().parent().find("[name='state']").val());
				*/
				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				
				edit_yizhu.click();
				ob1.remove();
				/*
				$temp.parent().parent().prevUntil("[name]").remove();
				$(this).parent().parent().parent().parent().parent().prev().remove();
				*/
				art.dialog.list['edit_yizhu_dialog'].close();
			}
			else
			{
				
			}
		});
		//点击保存开始信息修改事件：
		$("[name='save_start_info']").click(function(){
			//验证每次用量是否为空
			/*if($(this).parent().parent().find("[name='ciliang']").val()=="")
			{
				$(this).parent().parent().find("[name='tips']").html("请先输入每次用量后再添加!");
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
			}*/
			//把新的编辑内容更新到页面中:
			edit_yizhu.find("[name='content']").html($(this).parent().parent().find("[name='content']").val());
			var temp_yishi_name = $(this).parent().parent().find("[name='start_yishi_name']").val();
			edit_yizhu.find("[name='start_yishi_name']").html(temp_yishi_name);
			edit_yizhu.find("[name='start_time']").html($(this).parent().parent().find("[name='start_time']").val());
			edit_yizhu.find("[name='stop_time']").html($(this).parent().parent().find("[name='stop_time']").val());
			edit_yizhu.find("[name='start_hushi_name']").html($(this).parent().parent().find("[name='start_hushi_name']").val());
			edit_yizhu.find("[name='stop_yishi_name']").html($(this).parent().parent().find("[name='stop_yishi_name']").val());
			edit_yizhu.find("[name='stop_hushi_name']").html($(this).parent().parent().find("[name='stop_hushi_name']").val());
			edit_yizhu.find("[name='ciliang']").html($(this).parent().parent().find("[name='ciliang']").val());
			edit_yizhu.find("[name='yongfa']").html($(this).parent().parent().find("[name='yongfa']").val());
			edit_yizhu.find("[name='pinlv']").html($(this).parent().parent().find("[name='pinlv']").val());
			edit_yizhu.find("[name='zhouqi']").html($(this).parent().parent().find("[name='zhouqi']").val());
			edit_yizhu.find("[name='shifou_jiaji']").html($(this).parent().parent().find("[name='shifou_jiaji']").val());
			edit_yizhu.find("[name='shiyong_danwei']").html($(this).parent().parent().find("[name='shiyong_danwei']").val());
			edit_yizhu.find("[name='yongfa_type']").html($(this).parent().parent().find("[name='yongfa_type']").val());
			edit_yizhu.find("[name='pinlv']").html($(this).parent().parent().find("[name='pinlv']").val());
			//edit_yizhu.find("[name='content']").html($(this).parent().parent().find("[name='content']").val());
			if(supervisor_authority=="false")
				$(this).parent().parent().find("[name='state']").val(edit_yizhu.find("[name='state']").html());
			else
				edit_yizhu.find("[name='state']").html($(this).parent().parent().find("[name='state']").val());
				
			if(supervisor_authority=="true")
			{
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
					ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
					if($(this).parent().parent().find("[name='start_time']").attr("disabled")=="disabled")
					{
						ob1.eq(i).find("[name='start_time']").html("");
					}
					else
					{
						ob1.eq(i).find("[name='start_time']").html($(this).parent().parent().find("[name='start_time']").val());
					}
					if($(this).parent().parent().find("[name='stop_time']").attr("disabled")=="disabled")
					{
						ob1.eq(i).find("[name='stop_time']").html("");
					}
					else
					{
						ob1.eq(i).find("[name='stop_time']").html($(this).parent().parent().find("[name='stop_time']").val());
					}
					if($(this).parent().parent().find("[name='start_yishi_name']").attr("disabled")=="disabled")
					{
						ob1.eq(i).find("[name='start_yishi_name']").html("");
					}
					else
					{
						ob1.eq(i).find("[name='start_yishi_name']").html($(this).parent().parent().find("[name='start_yishi_name']").val());
					}
					if($(this).parent().parent().find("[name='start_hushi_name']").attr("disabled")=="disabled")
					{
						ob1.eq(i).find("[name='start_hushi_name']").html("");
					}
					else
					{
						ob1.eq(i).find("[name='start_hushi_name']").html($(this).parent().parent().find("[name='start_hushi_name']").val());
					}
					if($(this).parent().parent().find("[name='stop_yishi_name']").attr("disabled")=="disabled")
					{
						ob1.eq(i).find("[name='stop_yishi_name']").html("");
					}
					else
					{
						ob1.eq(i).find("[name='stop_yishi_name']").html($(this).parent().parent().find("[name='stop_yishi_name']").val());
					}
					if($(this).parent().parent().find("[name='stop_hushi_name']").attr("disabled")=="disabled")
					{
						ob1.eq(i).find("[name='stop_hushi_name']").html("");
					}
					else
					{
						ob1.eq(i).find("[name='stop_hushi_name']").html($(this).parent().parent().find("[name='stop_hushi_name']").val());
					}
				}
			}
				
				
				
			//表单ajax提交
			$(this).parent().parent().ajaxSubmit(form_options); 
			edit_yizhu.click();
			art.dialog.list['edit_yizhu_dialog'].close();
		});
		//点击保存停止信息修改事件：
		$("[name='save_stop_info']").click(function(){
			//把新的编辑内容更新到页面中:
			var temp_yishi_name = $(this).parent().parent().find("[name='stop_yishi_name']").val();
			edit_yizhu.find("[name='stop_yishi_name']").html(temp_yishi_name);
			edit_yizhu.find("[name='stop_time']").html($(this).parent().parent().find("[name='stop_time']").val());
			
			$(this).parent().parent().find("[name='stop_yishi_name']").val($(this).parent().parent().find("[name='stop_yishi_name']").val());
			$(this).parent().parent().find("[name='state']").val(edit_yizhu.find("[name='state']").html());
			//表单ajax提交
			$(this).parent().parent().ajaxSubmit(form_options); 
			edit_yizhu.click();
			art.dialog.list['edit_yizhu_dialog'].close();
		});
		//护士核对-医嘱正确：
		$("[name='check_right']").click(function(){
			//护士不能对医嘱内容进行更改，不更新内容
			//增加执行信息
			edit_yizhu.find("[name='start_hushi_name']").html($(this).parent().parent().find("[name='start_hushi_name']").val());
			//切换医嘱状态
			$(this).parent().find("[name='state']").val("开始执行")
			var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
			var nu = ob1.length;
			for(var i=0;i<nu;i++){
				ob1.eq(i).find("[name='start_hushi_name']").html($(this).parent().parent().find("[name='start_hushi_name']").val());
				ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
			}
			//表单ajax提交
			$(this).parent().parent().ajaxSubmit(form_options);
			edit_yizhu.click();
			art.dialog.list['edit_yizhu_dialog'].close();
		});
		//护士核对-医嘱有误：
		$("[name='check_error']").click(function(){
			//护士不能对医嘱内容进行更改，不更新内容
			//增加执行信息
			edit_yizhu.find("[name='start_hushi_name']").html($(this).parent().parent().find("[name='start_hushi_name']").val());
			//切换医嘱状态
			$(this).parent().find("[name='state']").val("医嘱有误");
			var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
			var nu = ob1.length;
			for(var i=0;i<nu;i++){
				ob1.eq(i).find("[name='start_hushi_name']").html($(this).parent().parent().find("[name='start_hushi_name']").val());
				ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
			}
			//表单ajax提交
			$(this).parent().parent().ajaxSubmit(form_options); 
			
			edit_yizhu.click();
			art.dialog.list['edit_yizhu_dialog'].close();
		});
		//护士核对-确认停止：
		$("[name='check_stop']").click(function(){
			//护士不能对医嘱内容进行更改，不更新内容
			//增加执行信息
			edit_yizhu.find("[name='stop_hushi_name']").html($(this).parent().parent().find("[name='stop_hushi_name']").val());
			//切换医嘱状态
			$(this).parent().find("[name='state']").val("停止执行");
			var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
			var nu = ob1.length;
			for(var i=0;i<nu;i++){
				ob1.eq(i).find("[name='stop_hushi_name']").html($(this).parent().parent().find("[name='stop_hushi_name']").val());
				ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
			}
			//表单ajax提交
			$(this).parent().parent().ajaxSubmit(form_options); 
			
			edit_yizhu.click();
			art.dialog.list['edit_yizhu_dialog'].close();
		});
		//取消编辑事件：
		$("[name='edit_cancel']").click(function(){//关闭、取消编辑按钮事件
			//取消编辑按钮点击后直接关闭
			edit_yizhu.click();
			art.dialog.list['edit_yizhu_dialog'].close();
		});
	},//end of function
		function(){
			//$(this).next().find("[class='edit_table']").hide();
			$(this).removeClass("editable_on_edit");
		}
	);//end of $(".editable").toggle
	
	$(".editable_partly").toggle(
		function(){
			$(this).addClass("editble_partly_on_edit");
			var current_yizhu_state = $(this).find("[name='state']").html();
			var editable_partly_yizhu = $(this);
			if(operator_type=="yishi")
			{
				if(supervisor_authority=="false")
				{
					if(current_yizhu_state=="已添加"||current_yizhu_state=="医嘱有误"||current_yizhu_state=="开始待核对")
					{
						art.dialog({
							id:"editpart_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
											'<li>'+
												'<span >医嘱内容:</span><input type="text" name="content" class="input_type_small" value="'
												+$(this).find("[name='content']").html()+'" style="width:60%" />'+
											'</li>'+
											'<li name="shuliang_info">'+
												'<span >每次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >执行次序:</span><select name="shifou_jiaji" class="select_type" action_type="others"><option>'
												+$(this).find("[name='shifou_jiaji']").html()+'</option><option val="1">1</option><option val="2">2</option><option val="3">3</option><option val="4">4</option><option val="5">5</option><option val="0">加急</option></select>'+
											'</li>'+
											'<li>'+
												'<input type="button" class="edit_yizhu_button" name="save_start_info" value="保存修改" />'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
												'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
												'<span name="tips" class="right_tips"></span>'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {
								/*$('[name="shifou_jiaji"]').append(
									'<option value="1">11</option>'+
									'<option value="2">2</option>'+
									'<option value="3">3</option>'+
									'<option value="4">4</option>'+
									'<option value="5">5</option>'+
									'<option value="0">加急</option>');*/
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
							}
						});
					}//end of if(current_yizhu_state=="已添加")
					else
					{
						art.dialog({
							id:"editpart_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateChangqi">'+
											'<li>'+
												'<span class="info_title">此项医嘱已经停止执行</span>'+
											'</li>'+
											'<li>'+
												'<span class="info_title">其它信息:</span>'+
												'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
												+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+
											'</li>'+
											'<li>'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {}
						});
					}
				}
			}
			
			//删除医嘱事件：
			$("[name='delete']").click(function(){
				if (confirm('是否确认进行删除操作？'))
					{
						//切换医嘱状态
						$(this).parent().parent().find("[name='state']").val("已删除");
//						$temp = $(this).parent().parent().parent().parent().parent().prev().find("[name='state']");
//						$temp.html($(this).parent().parent().find("[name='state']").val());
//						$temp.parent().parent().prevUntil("[name]").find("[name='state']").html($(this).parent().parent().find("[name='state']").val()).remove();
						//表单ajax提交
						$(this).parent().parent().ajaxSubmit(form_options); 
						
						editable_partly_yizhu.click();
						editable_partly_yizhu.remove();
						art.dialog.list['editpart_yizhu_dialog'].close();
					}
				else
					{
					}
			});
			
			//点击保存开始信息修改事件：
			$("[name='save_start_info']").click(function(){
				if(supervisor_authority=="false")
				{
					//验证每次用量是否为空
					if($(this).parent().parent().find("[name='ciliang']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先输入每次用量后再添加!");
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
				}
				//把新的编辑内容更新到页面中:
				if(supervisor_authority=="false")
				{
					editable_partly_yizhu.find("[name='start_time']").html($(this).parent().parent().find("[name='start_time']").val());
					editable_partly_yizhu.find("[name='ciliang']").html($(this).parent().parent().find("[name='ciliang']").val());
					editable_partly_yizhu.find("[name='shifou_jiaji']").html($(this).parent().parent().find("[name='shifou_jiaji']").val());
					editable_partly_yizhu.find("[name='shiyong_danwei']").html($(this).parent().parent().find("[name='shiyong_danwei']").val());
					editable_partly_yizhu.find("[name='content']").html($(this).parent().parent().find("[name='content']").val());
					$(this).parent().parent().find("[name='state']").val(editable_partly_yizhu.find("[name='state']").html());
				}
				
				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				
				editable_partly_yizhu.click();
				art.dialog.list['editpart_yizhu_dialog'].close();
			});
			
			//取消编辑事件：
			$("[name='edit_cancel']").click(function(){
				//取消编辑按钮点击后直接关闭
				editable_partly_yizhu.click();
				art.dialog.list['editpart_yizhu_dialog'].close();
			});
			
			//输入框类型的事件
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
			});
			$(".input_type_small").focus(function(){
				$(this).addClass("input_type_small_focus");
			});
			$(".input_type_small").blur(function(){
				$(this).removeClass("input_type_small_focus");
			});
			
			//下拉显示编辑框
			//$(this).next().find("[class='edit_table']").show();
		},//end of function
		function(){
			$(this).removeClass("editable_partly_on_edit");
			//$(this).next().find("[class='edit_table']").hide();
		}//end of $(".editable_partly").toggle
	)
}//end of function initialEditEvent

//自动关闭提示语句
//************************************************************************
function auto_close(){
	$("body").qtip("hide");
}//end of function auto_close

