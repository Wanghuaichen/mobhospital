/**************************************************
*  Created:  2011-11-01
*  Info:长期医嘱管理前台js代码
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author DongJie <dj7229@126.com>
*  @Cooperation Author YuanLin <yuanjinlin_2006@163.com> 
*
***************************************************/
var server_url = "";
var yishi_id = "000";
var yishi_name = "未登录";
var hushi_id = "000";
var hushi_name = "未登录";
var operator_type = "weizhi";
var zhuyuan_id = "000";
var group_name;
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
	try{parent.loadingEnd();}catch(ex){}
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
//初始化编辑事件：
	initialEditEvent();
});//end of $(document).ready(function() {	
function yizhuLinshiFuc()
{
	//医嘱页面跳转:
	$("[name='yizhu_type_changyi']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showChangqi/zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_linshi']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showLinshi/zhuyuan_id/"+zhuyuan_id;
	});

	$("[name='yizhu_type_linshi_xintianjia']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showLinshi/state/已添加/zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_linshi_daihedui']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showLinshi/state/下达待核对_下达待审核/zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_linshi_yixiada']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showLinshi/state/已下达/zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_linshi_yizhuyouwu']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showLinshi/state/医嘱有误/zhuyuan_id/"+zhuyuan_id;
	});
	$("[name='yizhu_type_linshi_zhixingwanbi']").click(function() {
		window.location.href = "http://"+server_url+"/tiantan_emr/"+group_name+"/Yizhuguanli/showLinshi/state/执行完毕/zhuyuan_id/"+zhuyuan_id;
	});

	//添加新医嘱事件：
	$("[name='add_new']").click(function(){
		var yaopin_option = "";
		if(zhiliao_leibie!="西医治疗")
		{
			yaopin_option = "<option>中草药</option>";
		}
		//生成新的编辑框
		art.dialog({
			id:"add_new_dialog",
			title:"添加医嘱",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/addLinshi">'+
								'<li style="width:820px">'+
								'<span class="info_title">下达时间:</span><input type="text" action_type="datetime" name="xiada_time" id="datetime_input" value="'+yizhu_start_date+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
								'<span >下达医生:</span><input type="text" name="xiada_yishi_name" class="input_type" value="'+yishi_name+'" disabled="disabled"/>'+
								'<span >类型:</span>'+
								'<select name="yongfa_type" class="select_type" value="" action_type="others" type="yizhutiaozhuang">'+
									'<option>检查</option>'+
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
									'<span >此次用量:</span><input type="text" name="ciliang" class="input_type_small" value="" />'+
									'<input type="text" name="shiyong_danwei" class="input_type_small" disabled="disabled" value="" />'+	
									'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" disabled="disabled" class="input_type" value="" />'+
									'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" disabled="disabled" class="input_type" value="" />'+
								'</li>'+
								'<li name="zhixing_con">'+
									'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="" disabled="disabled"/>'+
									'<span >执行次序:</span><select name="shifou_jiaji" class="select_type" value="" action_type="others"><option val="1">1</option><option val="2">2</option><option val="3">3</option><option val="4">4</option><option val="5">5</option><option val="0">加急</option></select>'+
									'<span >费用:</span><input type="text" name="danjia" class="input_type" value=""/>'+
									'</li>'+
								'<li name="add_changqi_yizhu">'+
									'<input type="button" class="edit_yizhu_button" name="add_one" value="添加医嘱" />'+
									'<input type="button" class="edit_yizhu_button" name="add_cancel" value="取消添加" />'+
									'<input type="hidden" name="state" value="已添加" />'+
									'<input type="hidden" name="biaoshi" value="" />'+
									'<input type="hidden" name="yizhu_id" value="" />'+
									'<input type="hidden" name="zhixing_keshi" value="" />'+
									'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
									'<input type="hidden" name="xiada_yishi_name" value='+yishi_name+' />'+
									'<span name="tips" class="right_tips"></span>'+
								'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				$('[name="xiada_time"]').focus();
				//添加回车后自动切换下一输入窗
				$('[name="xiada_time"]')
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
						else if(type=="检查")
						{
							$(this).parent().next().find('[name="ciliang"]').removeAttr("disabled");
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
						else if(type=="手术")
						{
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
						.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
						.appendTo( ul );
				};
				//变化输入框状态
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
					else if(type=="检查")
					{
						$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
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
					else if(type=="手术")
					{
						$(this).parent().next().next().find('[name="ciliang"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="shiyong_danwei"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="yongfa"]').attr("disabled","disabled");
						$(this).parent().next().next().find('[name="pinlv"]').attr("disabled","disabled");
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
					var temp_val = $(this).val();
					if(temp_val == "西药中成药")
					{
						$.post("/tiantan_emr/"+group_name+"/Chufangguanli/addOneChufangYizhu", { zhuyuan_id: zhuyuan_id, type: "西药中成药",yizhu:"linshi" },function(data){
							if(data != "no")
							{
								location.href = data;
							}
						});
					}
					else if(temp_val == "中草药")
					{
						$.post("/tiantan_emr/"+group_name+"/Chufangguanli/addOneChufangYizhu", { zhuyuan_id: zhuyuan_id, type: "中草药",yizhu:"linshi" },function(data){
							if(data != "no")
							{
								location.href = data;
							}
						});
					}
					else if(temp_val == "组合")
					{
						$.post("/tiantan_emr/"+group_name+"/Chufangguanli/addOneChufangYizhu", { zhuyuan_id: zhuyuan_id, type: "组合",yizhu:"linshi" },function(data){
							if(data != "no")
							{
								location.href = data;
							}
						});
					}
				});
				$("[name='add_one']").click(function(){
					/*//验证医嘱内容是否为空
					if($(this).parent().parent().find("[name='content']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先输入医嘱内容后再添加!");
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
					//验证此次用量是否为空
					else if($(this).parent().parent().find("[name='ciliang']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先输入此次用量后再添加!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='ciliang']").fadeOut();
						$(this).parent().parent().find("[name='ciliang']").fadeIn();
						return false;
					}
					//验证此次用量是否为数字输入
					else if(!(new RegExp("^\\d{1,3}.?\\d{0,3}$")).test($(this).parent().parent().find("[name='ciliang']").val()))
					{
						$(this).parent().parent().find("[name='tips']").html("请输入数字格式的此次用量!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='ciliang']").fadeOut();
						$(this).parent().parent().find("[name='ciliang']").fadeIn();
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
					}*/
					$(this).parent().parent().submit();
				});
				//为添加新医嘱里面的其它编辑项添加动态效果
				//取消添加按钮，关闭当前编辑框
				$("[name='add_cancel']").click(function(){
					art.dialog.list['add_new_dialog'].close();
				});
			}
		});
	});//end of $("[name='add_new']").click(function() {
	//点击添加医嘱套餐事件
	$("[name='add_multinew']").click(function() {
		art.dialog({
			id:"add_multinew_dialog",
			title:"添加医嘱套餐",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/addLinshi">'+
									'<li style="width:700px;">'+
									'<span class="info_title">下达时间:</span><input type="text" action_type="datetime" name="xiada_time" id="datetime_input" value="'+yizhu_start_date+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
									'<span >下达医生:</span><input type="text" name="xiada_yishi_name" class="input_type" value="'+yishi_name+'" disabled="disabled"/>'+
									'</li>'+
									'<li>'+
									'<span class="info_title">医嘱套餐:</span><input type="text" name="content" class="input_type_full" value=""/>'+
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_yizhu_button" name="add_multi" value="添加医嘱" />'+
										'<input type="button" class="edit_yizhu_button" name="add_cancel" value="取消添加" />'+
										'<input type="hidden" name="state" value="已添加" />'+
										'<input type="hidden" name="biaoshi" value="quxiao" />'+
										'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="xiada_yishi_name" value='+yishi_name+' />'+
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
						.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
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
					//验证医嘱下达时间是否为空
					else if($(this).parent().parent().find("[name='xiada_time']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先输入下达医嘱医嘱的时间后再添加!");
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
			}
		});
		//下拉显示添加框
		//$(this).parent().parent().next().find("[class='edit_table']").show();
	});//end of $("[name='add_multinew']").click(function() {
	//补充录入医嘱事件
	$("[name='add_supplement']").click(function() {
		var yaopin_option = "";
		if(zhiliao_leibie!="西医治疗")
		{
			yaopin_option = "<option>中草药</option>";
		}
		art.dialog({
			id:"add_supplement_dialog",
			title:"补录医嘱",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/addLinshi">'+
									'<li style="width:700px;">'+
									'<span class="info_title">下达时间:</span><input type="text" action_type="datetime" name="xiada_time" id="datetime_input" value="'+yizhu_start_date+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
									'<span >下达医生:</span><input type="text" name="xiada_yishi_name" class="input_type" value="'+yishi_name+'" disabled="disabled"/>'+
									'<span >类型:</span>'+
									'<select name="yongfa_type" class="select_type_small" value="" action_type="others">'+
										'<option>护理</option>'+
										'<option>诊疗项目</option>'+
										'<option>手术</option>'+
										'<option>检查</option>'+
										'<option>西药中成药</option>'+
										yaopin_option+
										'<option>其它</option>'+
										'<option>医嘱整理</option>'+
									'</select>'+
									'</li>'+
									'<li>'+
									'<span class="info_title">执行时间:</span><input type="text" action_type="datetime" name="zhixing_time" id="datetime_input" value="'+yizhu_date+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
									'<span >执&nbsp;&nbsp;行&nbsp;者:</span><input type="text" name="zhixing_name" id="zhixing_name" class="input_type" value=""/>'+
									'</li>'+
									'<li>'+
									'<span class="info_title">医嘱内容:</span><input type="text" name="content" class="input_type_full" value=""/>'+
									'</li>'+
									'<li name="shuliang_info">'+
										'<span >此次用量:</span><input type="text" name="ciliang" class="input_type_small" value="" />'+
										'<input type="text" name="shiyong_danwei" class="input_type_small" value="" />'+	
										'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" value="" />'+
									'</li>'+
									'<li>'+
										'<span >执行次序:</span><select name="shifou_jiaji" class="select_type" value="" action_type="others"><option val="1">1</option><option val="2">2</option><option val="2">3</option><option val="4">4</option><option val="5">5</option><option val="0">加急</option></select>'+
										'&nbsp;<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="" disabled="disabled"/>'+	
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_yizhu_button" name="add_one" value="添加医嘱" />'+
										'<input type="button" class="edit_yizhu_button" name="add_cancel" value="取消添加" />'+
										'<input type="hidden" name="state" value="补录医嘱" />'+
										'<input type="hidden" name="yizhu_id" value="" />'+
										'<input type="hidden" name="zhixing_keshi" value="" />'+
										'<input type="hidden" name="yongfa_type" value="" />'+
										'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="xiada_yishi_name" value='+yishi_name+' />'+
										'<span name="tips" class="right_tips"></span>'+
									'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				$('[name="content"]').focus();
				//添加回车后自动切换下一输入窗
				$('[name="xiada_time"]')
					.enterTo('[name="zhixing_time"]')
					.enterTo('[name="zhixing_name"]')
					.enterTo('[name="content"]')
					.enterTo('[name="ciliang"]')
					.enterTo('[name="shiyong_danwei"]')
					.enterTo('[name="yongfa"]')
					.enterTo('[name="shifou_jiaji"]')
					.enterComplete(function (){
						$('[name="add_one"]').focus();
				});
				
				//执行医师
				var cache_shoushu_zhu_yishi = {},lastXhr_shoushu_zhu_yishi;
				$("#zhixing_name").autocomplete({
					minLength: 0,
					autoFocus: false,
					source: function( request, response ) {
						term = request.term;
						if ( term in cache_shoushu_zhu_yishi ) {
							response( cache_shoushu_zhu_yishi [ term ] );
							return;
						}
						lastXhr_shoushu_zhu_yishi = $.getJSON( "http://"+server_url+"/tiantan_emr/Common/Data/getDataYishiListJson/key_filed/user_department/key_word/", request, function( data, status, xhr ) {
							cache_shoushu_zhu_yishi [ term ] = data;
							if ( xhr === lastXhr_shoushu_zhu_yishi ) {
								response( data );
							}
						});
					},
					focus: function( event, ui ) {
						$( "#zhixing_name" ).val( ui.item.label );
						return false;
					},
					select: function( event, ui ) {
						$( "#zhixing_name" ).val( ui.item.label );
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
						.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
						.appendTo( ul );
				};
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
						$(this).parent().parent().parent().find('[name="content"]').val( ui.item.label );
						return false;
					},
					select: function( event, ui ) {
						$(this).parent().parent().parent().find('[name="content"]').val( ui.item.label );
						$(this).parent().parent().parent().find('[name="content"]').val( ui.item.label );
						$(this).parent().parent().parent().find('[name="yizhu_id"]').val( ui.item.id );
						$(this).parent().parent().parent().find('[name="shiyong_danwei"]').val( ui.item.shiyong_danwei );
						$(this).parent().parent().parent().find('[name="zhixing_keshi"]').val( ui.item.zhixing_keshi );
						$(this).parent().parent().parent().find('[name="yongfa_type"]').val( ui.item.yongfa_type );
						
						var type = ui.item.yongfa_type;
						if(type=="住院信息")
						{
							$(this).parent().parent().parent().find('[name="ciliang"]').val("0");
							$(this).parent().parent().parent().find('[name="shuliang_info"]').hide();
						}
						else
						{
							yongfa_pid = '15000';
							var cache_yongfa = {},lastXhr_yongfa;
							$(this).parent().parent().parent().find('#yongfa').autocomplete({
								minLength:0,
								autoFocus: false,
								source:function( request, response ) {
									term = request.term;
									if ( term in cache_yongfa ) {
										response( cache_yongfa [ term ] );
										return;
									}
									lastXhr_yongfa = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoJson',{"pid":yongfa_pid, "term":"" }, function( data, status, xhr ) {
									cache_yongfa [ "" ] = data;
									if ( xhr === lastXhr_yongfa ) {
										response( data );
									}
								});
								},
								focus: function( event, ui ) {
									$(this).parent().parent().parent().find("#yongfa").val( ui.item.label );
									return false;
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
								var desc = item.desc.replace(
												new RegExp(
													"(?![^&;]+;)(?!<[^<>]*)(" +
													tmp_term +
													")(?![^<>]*>)(?![^&;]+;)", "gi"
												), "<span class=\"keyword\">$1</span>" );
								return $( "<li></li>" )
									.data( "item.autocomplete", item )
									.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
									.appendTo( ul );
							};
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
						.append( "<a>" + label + "<br><span class=\"desc\">" + desc + "</span></a>" )
						.appendTo( ul );
				};
				//点击添加医嘱
				$("[name='add_one']").click(function(){
					//验证医嘱内容是否为空
					if($(this).parent().parent().find("[name='content']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先输入医嘱内容后再添加!");
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
					//验证此次用量是否为空
					else if($(this).parent().parent().find("[name='ciliang']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先输入此次用量后再添加!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='ciliang']").fadeOut();
						$(this).parent().parent().find("[name='ciliang']").fadeIn();
						return false;
					}
					//验证此次用量是否为数字输入
					else if(!(new RegExp("^\\d{1,3}.?\\d{0,3}$")).test($(this).parent().parent().find("[name='ciliang']").val()))
					{
						$(this).parent().parent().find("[name='tips']").html("请输入数字格式的此次用量!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='ciliang']").fadeOut();
						$(this).parent().parent().find("[name='ciliang']").fadeIn();
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
				//为添加新医嘱里面的其它编辑项添加动态效果
				//取消添加按钮，关闭当前编辑框
				$("[name='add_cancel']").click(function(){
					art.dialog.list['add_supplement_dialog'].close();
				});
			}
		});
		//最后显示添加新医嘱添加框
		//$(this).parent().parent().parent().find("[name='addsupplement_table']").show();
	});//end of $("[name='add_supplement']").click(function() {
	
	//医生：开始所有医嘱，对应按钮：开始所有
	$("[name='kaishi_all']").click(function() {
		art.dialog({
			id:"right_all_dialog",
			title:"开始核对所有临时医嘱",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
								'<li>'+
									//'<span >确认时间:</span><input type="text" action_type="datetime" name="right_time" id="datetime_input" value="'+yizhu_date+'"/>'+
									'<span >确认医生:</span><input type="text" name="right_hushi_name" class="input_type" value="'
									+yishi_name+'" disabled="disabled"/>'+
								'</li>'+
								'<li>'+
									'<input type="button" class="edit_yizhu_button" name="right_confirm" value="确认" />'+
									'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
									'<input type="hidden" name="biaoshi" value="kaishi" />'+
									'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
									'<span name="tips" class="right_tips"></span>'+
								'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				//点击确认停止之前，先判断内容输入的正确性
				$("[name='right_confirm']").click(function(){
					//验证医嘱停止时间是否为空
					if($(this).parent().parent().find("[name='right_time']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先输入确认医嘱的时间后再确认!");
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
					art.dialog.list['right_all_dialog'].close();
				});
			}
		});
	});
	//护士：核对所有医嘱正确，对应按钮：所有正确
	$("[name='right_all']").click(function() {
		art.dialog({
			id:"right_all_dialog",
			title:"开始执行全部医嘱",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
								'<li>'+
									'<span >确认护士:</span><input type="text" name="right_hushi_name" class="input_type" value="'
									+hushi_name+'" disabled="disabled"/>'+
								'</li>'+
								'<li>'+
									'<input type="button" class="edit_yizhu_button" name="right_confirm" value="确认" />'+
									'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
									'<input type="hidden" name="biaoshi" value="right" />'+
									'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
									'<span name="tips" class="right_tips"></span>'+
								'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				
				//点击确认停止之前，先判断内容输入的正确性
				$("[name='right_confirm']").click(function(){
					//验证医嘱停止时间是否为空
					if($(this).parent().parent().find("[name='right_time']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先输入确认医嘱的时间后再确认!");
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
					art.dialog.list['right_all_dialog'].close();
				});
			}
		});
		//最后显示添加新医嘱添加框
		//$(this).parent().parent().parent().find("[name='rightall_table']").show();
	});
	//护士：执行所有医嘱，对应按钮，执行所有
	$("[name='zhixing_all']").click(function() {
		art.dialog({
			id:"right_all_dialog",
			title:"开始执行全部医嘱",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
								'<li>'+
									'<span >确认护士:</span><input type="text" name="right_hushi_name" class="input_type" value="'
									+hushi_name+'" disabled="disabled"/>'+
								'</li>'+
								'<li>'+
									'<input type="button" class="edit_yizhu_button" name="right_confirm" value="确认" />'+
									'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
									'<input type="hidden" name="biaoshi" value="zhixing" />'+
									'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
									'<span name="tips" class="right_tips"></span>'+
								'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				
				//点击确认停止之前，先判断内容输入的正确性
				$("[name='right_confirm']").click(function(){
					//验证医嘱停止时间是否为空
					if($(this).parent().parent().find("[name='right_time']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请先输入确认医嘱的时间后再确认!");
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
					art.dialog.list['right_all_dialog'].close();
				});
			}
		});
		//最后显示添加新医嘱添加框
		//$(this).parent().parent().parent().find("[name='rightall_table']").show();
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
				if(supervisor_authority=="false")
				{
					if(current_yizhu_state=="已添加"||current_yizhu_state=="医嘱有误"||current_yizhu_state=="下达待审核"||current_yizhu_state=="下达待核对")
					{
						if($(this).find("[name='shifou_jiaji']").html() == 0)
						{
							var temp_shifou_jiaji = "加急";
						}
						else
						{
							var temp_shifou_jiaji = $(this).find("[name='shifou_jiaji']").html();
						}
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
						else if(type == '检查')
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
												'<span >此次用量:</span><input type="text" name="ciliang" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" disabled="disabled" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else if(type == '手术')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >此次用量:</span><input type="text" name="ciliang" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" disabled="disabled" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" disabled="disabled" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" disabled="disabled" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						else if(type == '西药中成药')
						{
							temp_panduan = '<li name="shuliang_info">'+
												'<span >此次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
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
												'<span >此次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
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
												'<span >此次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+	
												'<span >使用方法:</span><input type="text" id="yongfa" name="yongfa" class="input_type" disabled="disabled" value="'+$(this).find("[name='yongfa']").html()+'" />'+
												'<span >使用频率:</span><input type="text" id="pinlv" name="pinlv" class="input_type_small" disabled="disabled" value="'+$(this).find("[name='pinlv']").html()+'" />'+
											'</li>';
						}
						var yaopin_option = "";
						if(zhiliao_leibie!="西医治疗")
						{
							yaopin_option = "<option>中草药</option>";
						}
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
											'<li>'+
												'<span class="info_title">下达时间:</span><input type="text" action_type="datetime" name="xiada_time" id="datetime_input" value="'
												+$(this).find("[name='xiada_time']").html()+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
												'<span >下达医生:</span><input type="text" name="xiada_yishi_name" class="input_type" value="'
												+yishi_name+'" disabled="disabled"/>'+
												'<span >类型:</span>'+
														'<select name="yongfa_type" class="select_type_small" value="">'+
															'<option>'+$(this).find("[name='yongfa_type']").html()+'</option>'+
															'<option>护理</option>'+
															'<option>诊疗项目</option>'+
															'<option>手术</option>'+
															'<option>西药中成药</option>'+
															yaopin_option+
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
												'<input type="button" class="edit_yizhu_button" name="xiada_yizhu" value="下达医嘱" />'+
												'<input type="button" class="edit_yizhu_button" name="save_xiada_info" value="保存修改" />'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
												'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="xiada_yishi_name" value="" />'+
												'<input type="hidden" name="xiada_zhiye_yishi_name" value="" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
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
									$('[name="xiada_yizhu"]').val("提交下达审核");
									temp_xiada_yishi_name = edit_yizhu.find("[name='xiada_yishi_name']").text();
									if(temp_xiada_yishi_name=="")
										temp_xiada_yishi_name = yishi_name;
									$('input:[name="xiada_yishi_name"]').val(temp_xiada_yishi_name);
								}
								else
								{
									temp_xiada_yishi_name = edit_yizhu.find("[name='xiada_yishi_name']").text();
									if(temp_xiada_yishi_name=="")
										temp_xiada_yishi_name = yishi_name;
									// $('input:[name="xiada_yishi_name"]').val(temp_xiada_yishi_name);
									$('input:[name="xiada_yishi_name"]').val(yishi_name);
									$('input:[name="xiada_zhiye_yishi_name"]').val(yishi_name);
								}
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
								//变化输入框状态
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
									else if(type=="检查")
									{
										$(this).parent().next().next().find('[name="ciliang"]').removeAttr("disabled");
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
									else if(type=="手术")
									{
										$(this).parent().next().next().find('[name="ciliang"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="shiyong_danwei"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="yongfa"]').attr("disabled","disabled");
										$(this).parent().next().next().find('[name="pinlv"]').attr("disabled","disabled");
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
					else if(current_yizhu_state=="下达待核对")
					{
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
											'<li>'+
												'<span class="info_title">请等待护士对此医嘱内容进行核对</span>'+
											'</li>'+
											'<li>'+
												'<span class="info_title">其它信息:</span>'+
												'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
												+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
											'</li>'+
											'<li>'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
												'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {}
						});
					}//end of if(current_yizhu_state=="下达待核对")
					else if(current_yizhu_state=="已下达")
					{
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
											'<li>'+
												'<span class="info_title">等待护士执行此医嘱</span>'+
											'</li>'+
											'<li>'+
												'<span class="info_title">取消:</span>'+
												'<span >取消时间:</span><input type="text" action_type="datetime" name="quxiao_time" id="datetime_input" value="'+yizhu_date+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
												'<span >取消医生:</span><input type="text" name="quxiao_yishi_name" class="input_type" value="'
												+yishi_name+'" disabled="disabled"/>'+
											'</li>'+
											'<li>'+
												'<span class="info_title">医嘱内容:</span><input type="text" name="orginal_content" class="input_type_full" value="'
												+$(this).find("[name='content']").html()+'" disabled="disabled"/>'+
											'</li>'+
											'<li>'+
												'<span class="info_title">其它信息:</span>'+
												'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
												+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
											'</li>'+
											'<li>'+
												'<input type="button" class="edit_yizhu_button" name="quxiao_zhixing" value="取消执行" />'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
												'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="content" value="" />'+
												'<span name="tips" class="right_tips"></span>'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {
								
							}
						});
					}//end of if(current_yizhu_state=="已下达")
					else if(current_yizhu_state=="执行完毕"||current_yizhu_state=="补录医嘱")
					{
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
											'<li>'+
												'<span class="info_title">此项医嘱已经执行完毕</span>'+
											'</li>'+
											'<li>'+
												'<span class="info_title">其它信息:</span>'+
												'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
												+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
											'</li>'+
											'<li>'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
												'<input type="button" class="edit_yizhu_button" name="save_xiada_info" value="保存修改" />'+
												'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {}
						});
					}//end of if(current_yizhu_state=="执行完毕"
					else
					{
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/addLinshi">'+
											'<li>'+
												'<span class="info_title">此项医嘱已经取消执行</span>'+
											'</li>'+
											'<li>'+
												'<span class="info_title">其它信息:</span>'+
												'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
												+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
											'</li>'+
											'<li>'+
												//'<input type="button" class="edit_yizhu_button" name="reconstruct" value="重新开立" />'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
												'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
												'<input type="hidden" name="biaoshi" value="recon" />'+
												'<input type="hidden" name="xiada_yishi_name" value='+yishi_name+' />'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {}
						});
					}//end of esle
				}
				else
				{
					var xiada_time = $(this).find("[name='xiada_time']").html();
					var state = $(this).find("[name='state']").html();
					var disable_arr = new Array();
					disable_arr[0] = 'disabled="disabled"';
					disable_arr[1] = 'disabled="disabled"';
					if(state=="执行完毕")
					{
						disable_arr[0] = '';
						disable_arr[1] = '';
					}
					else
					{
						disable_arr[0] = 'disabled="disabled"';
						disable_arr[1] = 'disabled="disabled"';
					}
					art.dialog({
						id:"edit_yizhu_dialog",
						title:"编辑医嘱",
						content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
												'<li>'+
													'<span class="info_title">医嘱状态:</span>'+
													'<select name="state" class="select_type">'+
														'<option value="已添加">已添加</option>'+
														'<option value="下达待审核">下达待审核</option>'+
														'<option value="下达待核对">下达待核对</option>'+
														'<option value="已下达">已下达</option>'+
														'<option value="医嘱有误">医嘱有误</option>'+
														'<option value="执行完毕">执行完毕</option>'+
													'</select>'+
												'</li>'+
												'<li>'+
													'<span class="info_title">下达时间:</span><input type="text" action_type="datetime" id="datetime_input_1" name="xiada_time" value="'
													+$(this).find("[name='xiada_time']").html().replace(/<BR>/i,' ')+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input_1\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
													'<span >下达医生:</span><input type="text" name="xiada_yishi_name" class="input_type" value="'+$(this).find("[name='xiada_yishi_name']").html()+'"/>'+
												'</li>'+
												'<li>'+
													'<span class="info_title">执行时间:</span><input type="text" action_type="datetime" id="datetime_input_2" '+disable_arr[0]+' name="zhixing_time" value="'
													+$(this).find("[name='zhixing_time']").html().replace(/<BR>/i,' ')+'"/><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input_2\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
													'<span >执行护士:</span><input type="text" name="zhixing_name" class="input_type" '+disable_arr[1]+' value="'+$(this).find("[name='zhixing_name']").html()+'"/>'+
												'</li>'+
												'<li>'+
													'<input type="button" class="edit_yizhu_button" name="save_xiada_info" value="保存修改" />'+
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
								if(state_val=="执行完毕")
								{
									$("[name='zhixing_name']").attr("disabled",false);
									$("[name='zhixing_time']").attr("disabled",false);
								}
								else
								{
									$("[name='zhixing_name']").attr("disabled",true);
									$("[name='zhixing_time']").attr("disabled",true);
								}
							});
							var cache_xiada_yishi_name = {},lastXhr_xiada_yishi_name;
							$( "[name='xiada_yishi_name']" ).autocomplete({
								minLength: 0,
								source: function( request, response ) {
									var temp_state_val = $("select[name='state']").val();
									var temp_kebie_position = "";
									if(temp_state_val=="下达待审核")
									{
										temp_kebie_position = "助理执业医师";
									}
									term = request.term;
									if ( term in cache_xiada_yishi_name ) {
										response( cache_xiada_yishi_name [ term ] );
										return;
									}
									lastXhr_xiada_yishi_name = $.getJSON( "http://"+server_url+"/tiantan_emr/Common/Data/getDataYishiListJson", {"user_type":"医生","user_department":user_department,"term":term,"user_kebie_position":temp_kebie_position}, function( data, status, xhr ) {
										cache_xiada_yishi_name [ term ] = data;
										if ( xhr === lastXhr_xiada_yishi_name ) {
											response( data );
										}
									});
								},
								select: function( event, ui ) {
									$( "[name='xiada_yishi_name']" ).val( ui.item.label );
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
									.append( "<a>" + label + "</a>" )
									.appendTo( ul );
							};
							
							var cache_zhixing_name = {},lastXhr_zhixing_name;
							$( "[name='zhixing_name']" ).autocomplete({
								minLength: 0,
								source: function( request, response ) {
									term = request.term;
									if ( term in cache_zhixing_name ) {
										response( cache_zhixing_name [ term ] );
										return;
									}
									lastXhr_zhixing_name = $.getJSON( "http://"+server_url+"/tiantan_emr/Common/Data/getDataYishiListJson", {"user_type":"护士","user_department":user_department,"term":term}, function( data, status, xhr ) {
										cache_zhixing_name [ term ] = data;
										if ( xhr === lastXhr_zhixing_name ) {
											response( data );
										}
									});
								},
								select: function( event, ui ) {
									$( "[name='zhixing_name']" ).val( ui.item.label );
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
									.append( "<a>" + label + "</a>" )
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
						content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
										'<li>'+
											'<span class="info_title">请等待医师下达医嘱后进行核对</span>'+
										'</li>'+
										'<li>'+
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
				}//end of if(current_yizhu_state=="已添加")
				else if(current_yizhu_state=="下达待核对")
				{
					art.dialog({
						id:"edit_yizhu_dialog",
						title:"编辑医嘱",
						content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+	
										'<li>'+
											'<span class="info_title">下达:</span>'+
											'<span >时间:</span><input type="text" name="xiada_time" class="input_type" value="'
											+$(this).find("[name='xiada_time']").html()+'" disabled="disabled"/>'+
											'<span >执行者:</span><input type="text" name="zhixing_name" class="input_type" value="'
											+hushi_name+'" disabled="disabled"/>'+
										'</li>'+
										'<li>'+
											'<span class="info_title">医嘱内容:</span><input type="text" name="content" class="input_type_full" value="'
											+$(this).find("[name='content']").html()+'" disabled="disabled"/>'+
										'</li>'+
										'<li>'+
											'<span class="info_title">其它信息:</span>'+
											'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
											+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
										'</li>'+								
										'<li>'+
											'<input type="button" class="edit_yizhu_button" name="check_right" value="医嘱正确" />'+
											'<input type="button" class="edit_yizhu_button" name="check_error" value="医嘱有误" />'+
											'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
											'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
											'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
											'<input type="hidden" name="state" value="" />'+
											'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
											'<span name="tips" class="right_tips"></span>'+
										'</li>'+
										'</form>',
						lock: true,
						padding:5,
						init: function () {}
					});
				}//end of if(current_yizhu_state=="下达待核对")
				else if(current_yizhu_state=="已下达")
				{
					Date.prototype.format = function(format){ 
						var o = { 
						"M+" : this.getMonth()+1, //month 
						"d+" : this.getDate(), //day 
						"h+" : this.getHours(), //hour 
						"m+" : this.getMinutes(), //minute 
						"s+" : this.getSeconds(), //second 
						"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
						"S" : this.getMilliseconds() //millisecond 
						} 

						if(/(y+)/.test(format)) { 
								format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
						} 

						for(var k in o) { 
							if(new RegExp("("+ k +")").test(format)) { 
								format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
							} 
						} 
						return format; 
					} 
					var now = new Date(); 
					var current_time = now.format("yyyy-MM-dd hh:mm");
					var function_button = "";
					if($(this).find("[name='content']").html().indexOf("皮试")!=-1||$(this).find("[name='content']").html().indexOf("试敏")!=-1)
					{
						function_button = '<input type="button" class="edit_yizhu_button_alert" name="zhixing_wanbi_yangxing" value="阳性结果" />';
						function_button += '<input type="button" class="edit_yizhu_button" name="zhixing_wanbi_yinxing" value="阴性结果" />';
					}
					else
					{
						function_button = '<input type="button" class="edit_yizhu_button" name="zhixing_wanbi" value="执行完毕" />';
					}
					art.dialog({
						id:"edit_yizhu_dialog",
						title:"编辑医嘱",
						content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
										'<li>'+
											'<span class="yizhu_name">'+$(this).find("[name='content']").html()+'</span>'+
											'<span class="info_title">医嘱执行中</span>'+
										'</li>'+
										'<li>'+
											'<span class="info_title">其它信息:</span>'+
											'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
											+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
										'</li>'+
										'<li>'+
											'<span class="info_title">执行:</span>'+
											//'<span >执行时间:</span><input type="text" name="zhixing_time" class="input_type" value="'
											//+$(this).find("[name='zhixing_time']").html()+'" />'+
											'<span >执行时间:</span><input type="text" action_type="datetime" name="zhixing_time" id="datetime_input" value="'+current_time+'" /><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
											'<span >执行者:</span><input type="text" name="zhixing_name" class="input_type" value="'
											+hushi_name+'" disabled="disabled"/>'+
										'</li>'+
										'<li>'+
										function_button+
											'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
											'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
											'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
											'<input type="hidden" name="state" value="" />'+
											'<input type="hidden" name="content" value="'+$(this).find("[name='content']").text()+'" />'+
											'<input type="hidden" name="show_content" value="'+$(this).find("[name='content']").text()+'" />'+
											'<input type="hidden" name="original_content" value="'+$(this).find("[name='content']").text()+'" />'+
											'<input type="hidden" name="zhixing_name" value='+hushi_name+' />'+
											'<span name="tips" class="right_tips"></span>'+
										'</li>'+
										'</form>',
						lock: true,
						padding:5,
						init: function () {
						}
					});
				}//end of if(current_yizhu_state=="已下达")
				else if(current_yizhu_state=="执行完毕"||current_yizhu_state=="补录医嘱")
				{
					Date.prototype.format = function(format){ 
						var o = {
						"M+" : this.getMonth()+1, //month 
						"d+" : this.getDate(), //day 
						"h+" : this.getHours(), //hour 
						"m+" : this.getMinutes(), //minute 
						"s+" : this.getSeconds(), //second 
						"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
						"S" : this.getMilliseconds() //millisecond 
						} 

						if(/(y+)/.test(format)) { 
								format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
						} 

						for(var k in o) { 
							if(new RegExp("("+ k +")").test(format)) { 
								format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
							} 
						} 
						return format; 
					} 
					var now = new Date(); 
					var current_time = now.format("yyyy-MM-dd hh:mm");
					var function_button = "";
					if($(this).find("[name='content']").html().indexOf("皮试")!=-1||$(this).find("[name='content']").html().indexOf("试敏")!=-1)
					{
						function_button = '<input type="button" class="edit_yizhu_button_alert" name="xiugai_wanbi_yangxing" value="阳性结果" />';
						function_button += '<input type="button" class="edit_yizhu_button" name="xiugai_wanbi_yinxing" value="阴性结果" />';
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"医嘱查看",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
											'<li>'+
												'<span class="yizhu_name">'+$(this).find("[name='content']").html()+'</span>'+
												'<span class="info_title">医嘱已经执行完毕</span>'+
											'</li>'+
											'<li>'+
												'<span class="info_title">其它信息:</span>'+
												'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
												+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
											'</li>'+
											'<li>'+
												'<span class="info_title">执行:</span>'+
												//'<span >执行时间:</span><input type="text" name="zhixing_time" class="input_type" value="'
												//+$(this).find("[name='zhixing_time']").html()+'" />'+
												'<span >执行时间:</span><input type="text" action_type="datetime" name="zhixing_time" id="datetime_input" value="'+current_time+'" /><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
												'<span >执行者:</span><input type="text" name="zhixing_name" class="input_type" value="'
												+hushi_name+'" disabled="disabled"/>'+
											'</li>'+
											'<li>'+
											function_button+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
												'<input type="button" class="edit_yizhu_button" name="save_xiada_info" value="保存修改" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="state" value="" />'+
												'<input type="hidden" name="content" value="'+$(this).find("[name='content']").text()+'" />'+
												'<input type="hidden" name="show_content" value="'+$(this).find("[name='content']").text()+'" />'+
												'<input type="hidden" name="original_content" value="'+$(this).find("[name='content']").text()+'" />'+
												'<input type="hidden" name="zhixing_name" value='+hushi_name+' />'+
												'<span name="tips" class="right_tips"></span>'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {
							}
						});
					}
					else
					{
						art.dialog({
							id:"edit_yizhu_dialog",
							title:"医嘱查看",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
											'<li>'+
												'<span class="yizhu_name">'+$(this).find("[name='content']").html()+'</span>'+
												'<span class="info_title">医嘱已经执行完毕</span>'+
											'</li>'+
											'<li>'+
												'<span class="info_title">其它信息:</span>'+
												'<span >执行科室:</span><input type="text" name="zhixing_keshi" class="input_type" value="'
												+$(this).find("[name='zhixing_keshi']").html()+'" disabled="disabled" />'+	
											'</li>'+
											'<li>'+
												'<span class="info_title">执行:</span>'+
												'<span >执行时间:</span><input type="text" action_type="datetime" name="zhixing_time" id="datetime_input" value="'
												+$(this).find("[name='zhixing_time']").html()+'" /><img onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:true,el:\'datetime_input\'})" class="datetime_picker" width="16" height="22" align="absmiddle"/>'+
												'<span >执行者:</span><input type="text" name="zhixing_name" class="input_type" value="'
												+hushi_name+'" disabled="disabled"/>'+
											'</li>'+
											'<li>'+
												'<input type="button" class="edit_yizhu_button" name="save_xiada_info" value="保存修改" />'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="关闭" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="zuhao" value="'+$(this).attr("name")+'" />'+
												'<input type="hidden" name="zhixing_name" value='+hushi_name+' />'+
												'<span name="tips" class="right_tips"></span>'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {
							}
						});
					}
				}//end of if(current_yizhu_state=="执行完毕")
				else
				{
					art.dialog({
						id:"edit_yizhu_dialog",
						title:"编辑医嘱",
						content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
										'<li>'+
											'<span class="info_title">此项医嘱已经取消执行</span>'+
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
				}//end of else
			}//end of if(operator_type=='hushi')
			if(type=="护理")
			{
				$('[name="start_time"]')
						.enterTo('[name="content"]')
						.enterTo('[name="shifou_jiaji"]')
						.enterComplete(function (){
						$('[name="save_xiada_info"]').focus();
				});
			}
			else if(type=="医嘱整理")
			{
				$('[name="start_time"]')
						.enterTo('[name="content"]')
						.enterTo('[name="shifou_jiaji"]')
						.enterComplete(function (){
						$('[name="save_xiada_info"]').focus();
				});
			}
			else if(type=="检查")
			{
				$('[name="start_time"]')
						.enterTo('[name="content"]')
						.enterTo('[name="shifou_jiaji"]')
						.enterComplete(function (){
						$('[name="save_xiada_info"]').focus();
				});
			}
			else if(type=="诊疗项目")
			{
				$('[name="start_time"]')
						.enterTo('[name="content"]')
						.enterTo('[name="pinlv"]')
						.enterTo('[name="shifou_jiaji"]')
						.enterComplete(function (){
						$('[name="save_xiada_info"]').focus();
				});
			}
			else if(type=="手术")
			{
				$('[name="start_time"]')
						.enterTo('[name="content"]')
						.enterTo('[name="pinlv"]')
						.enterTo('[name="shifou_jiaji"]')
						.enterComplete(function (){
						$('[name="save_xiada_info"]').focus();
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
						$('[name="save_xiada_info"]').focus();
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
						$('[name="save_xiada_info"]').focus();
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
						$('[name="save_xiada_info"]').focus();
				});
			}
			//下达医嘱事件：
			$("[name='xiada_yizhu']").click(function(){
				//验证医嘱下达时间是否为空
				if($(this).parent().parent().find("[name='xiada_time']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入下达医嘱医嘱的时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//验证医嘱内容是否为空
				if($(this).parent().parent().find("[name='content']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入下达医嘱医嘱的时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//验证此次用量是否为空
				else if($(this).parent().parent().find("[name='ciliang']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入此次用量后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					$(this).parent().parent().find("[name='ciliang']").fadeOut();
					$(this).parent().parent().find("[name='ciliang']").fadeIn();
					return false;
				}
				//验证此次用量是否为数字输入
				else if(!(new RegExp("^\\d{1,3}.?\\d{0,3}$")).test($(this).parent().parent().find("[name='ciliang']").val()))
				{
					$(this).parent().parent().find("[name='tips']").html("请输入数字格式的此次用量!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					$(this).parent().parent().find("[name='ciliang']").fadeOut();
					$(this).parent().parent().find("[name='ciliang']").fadeIn();
					return false;
				}
				//把新的编辑内容更新到页面中:
				edit_yizhu.find("[name='content']").html($(this).parent().parent().find("[name='content']").val());
				var temp_yishi_name = $(this).parent().parent().find("[name='xiada_yishi_name']").val();
				edit_yizhu.find("[name='xiada_yishi_name']").html(temp_yishi_name);
				edit_yizhu.find("[name='xiada_time']").html($(this).parent().parent().find("[name='xiada_time']").val());
				edit_yizhu.find("[name='ciliang']").html($(this).parent().parent().find("[name='ciliang']").val());
				edit_yizhu.find("[name='yongfa']").html($(this).parent().parent().find("[name='yongfa']").val());
				edit_yizhu.find("[name='shifou_jiaji']").html($(this).parent().parent().find("[name='shifou_jiaji']").val());
				//切换医嘱状态
				//无职业医师证件医生使用特殊状态：
				if(user_kebie_position == "助理执业医师")
				{
					yizhu_temp_state = "下达待审核";
				}
				else
				{
					yizhu_temp_state = "下达待核对";
				}
				$(this).parent().find("[name='state']").val(yizhu_temp_state);
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
					ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
					ob1.eq(i).find("span[name='state']").parent().removeClass("new_added");
				}

				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				
				edit_yizhu.click();
				art.dialog.list['edit_yizhu_dialog'].close();
			});
			//取消执行事件：
			$("[name='quxiao_zhixing']").click(function(){
				//验证医嘱下达时间是否为空
				if($(this).parent().parent().find("[name='quxiao_time']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入取消执行的时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//把新的编辑内容更新到页面中:
				// var content_temp  =$(this).parent().parent().find("[name='orginal_content']").val()+"["+$(this).parent().parent().find("[name='quxiao_time']").val()+" "+yishi_name+" "+"取消执行]";
			//	var content_temp  =$(this).parent().parent().find("[name='orginal_content']").val()+"["+yishi_name+" "+"取消执行]";
				var content_temp  =$(this).parent().parent().find("[name='orginal_content']").val()+"[<font color='#F00'>取消</font> "+" "+yishi_name+"]";
				$(this).parent().parent().find("[name='content']").val(content_temp);
				edit_yizhu.find(".float_left [name='show_content']").html($(this).parent().parent().find("[name='content']").val());
				//切换医嘱状态
				$(this).parent().find("[name='state']").val("取消执行");
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
					ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
				}

				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				edit_yizhu.click();
				art.dialog.list['edit_yizhu_dialog'].close();
			});
			//医嘱删除
			$("[name='delete']").click(function(){
				if (confirm('是否确认进行删除操作？'))
				{
					//切换医嘱状态
					var temp_action = $(this).parent().parent().attr("action");
					if(temp_action.indexOf("addLinshi")!=-1)
					{
						temp_action = temp_action.replace("addLinshi","updateLinshi");
						$(this).parent().parent().attr("action",temp_action);
					}
					$(this).parent().find("[name='state']").val("已删除");
					var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
					var nu = ob1.length;
					for(var i=0;i<nu;i++){
						ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
					}

					//表单ajax提交
					$(this).parent().parent().ajaxSubmit(form_options); 
					
					edit_yizhu.click();
					ob1.remove();
					edit_yizhu.remove();
					art.dialog.list['edit_yizhu_dialog'].close();
				}
				else
				{
				}
			});
			//点击保存下达信息修改事件：
			$("[name='save_xiada_info']").click(function(){
				//验证医嘱下达时间是否为空
				/*
				if($(this).parent().parent().find("[name='xiada_time']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入下达医嘱医嘱的时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//验证医嘱内容是否为空
				if($(this).parent().parent().find("[name='content']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入下达医嘱医嘱的时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//验证此次用量是否为空
				else if($(this).parent().parent().find("[name='ciliang']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入此次用量后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					$(this).parent().parent().find("[name='ciliang']").fadeOut();
					$(this).parent().parent().find("[name='ciliang']").fadeIn();
					return false;
				}
				//验证此次用量是否为数字输入
				else if(!(new RegExp("^\\d{1,3}.?\\d{0,3}$")).test($(this).parent().parent().find("[name='ciliang']").val()))
				{
					$(this).parent().parent().find("[name='tips']").html("请输入数字格式的此次用量!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					$(this).parent().parent().find("[name='ciliang']").fadeOut();
					$(this).parent().parent().find("[name='ciliang']").fadeIn();
					return false;
				}*/

				//把新的编辑内容更新到页面中:
				edit_yizhu.find("[name='show_content']").html($(this).parent().parent().find("[name='content']").val());
				var temp_yishi_name = $(this).parent().parent().find("[name='xiada_yishi_name']").val();
				edit_yizhu.find("[name='xiada_yishi_name']").html(temp_yishi_name);
				edit_yizhu.find("[name='xiada_time']").html($(this).parent().parent().find("[name='xiada_time']").val());
				edit_yizhu.find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
				edit_yizhu.find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
				edit_yizhu.find("[name='ciliang']").html($(this).parent().parent().find("[name='ciliang']").val());
				edit_yizhu.find("[name='yongfa']").html($(this).parent().parent().find("[name='yongfa']").val());
				edit_yizhu.find("[name='shifou_jiaji']").html($(this).parent().parent().find("[name='shifou_jiaji']").val());
				edit_yizhu.find("[name='shiyong_danwei']").html($(this).parent().parent().find("[name='shiyong_danwei']").val());
				edit_yizhu.find("[name='pinlv']").html($(this).parent().parent().find("[name='pinlv']").val());
				edit_yizhu.find("[name='yongfa_type']").html($(this).parent().parent().find("[name='yongfa_type']").val());
				//切换医嘱状态
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
						if($(this).parent().parent().find("[name='xiada_time']").attr("disabled")=="disabled")
						{
							ob1.eq(i).find("[name='xiada_time']").html("");
						}
						else
						{
							ob1.eq(i).find("[name='xiada_time']").html($(this).parent().parent().find("[name='xiada_time']").val());
						}
						if($(this).parent().parent().find("[name='zhixing_time']").attr("disabled")=="disabled")
						{
							ob1.eq(i).find("[name='zhixing_time']").html("");
						}
						else
						{
							ob1.eq(i).find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
						}
						if($(this).parent().parent().find("[name='xiada_yishi_name']").attr("disabled")=="disabled")
						{
							ob1.eq(i).find("[name='xiada_yishi_name']").html("");
						}
						else
						{
							ob1.eq(i).find("[name='xiada_yishi_name']").html($(this).parent().parent().find("[name='xiada_yishi_name']").val());
						}
						if($(this).parent().parent().find("[name='zhixing_name']").attr("disabled")=="disabled")
						{
							ob1.eq(i).find("[name='zhixing_name']").html("");
						}
						else
						{
							ob1.eq(i).find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
						}
					}
				}
				
				
				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				
				edit_yizhu.click();
				art.dialog.list['edit_yizhu_dialog'].close();
			});
			//护士核对-医嘱正确：
			$("[name='check_right']").click(function(){
				//护士不能对医嘱内容进行更改，不更新内容
				//切换医嘱状态
				$(this).parent().find("[name='state']").val("已下达");
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
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
				//切换医嘱状态
				$(this).parent().find("[name='state']").val("医嘱有误");
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
					ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
				}

				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				edit_yizhu.click();
				art.dialog.list['edit_yizhu_dialog'].close();
			});
			//护士核对-执行完毕：
			$("[name='zhixing_wanbi']").click(function(){
				//验证执行的时间是否为空
				if($(this).parent().parent().find("[name='zhixing_time']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入执行时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//增加执行信息
				$(this).parent().parent().parent().parent().parent().prev().find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
				$(this).parent().parent().parent().parent().parent().prev().find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
				//切换医嘱状态
				$(this).parent().find("[name='state']").val("执行完毕");
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
					ob1.eq(i).find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
					ob1.eq(i).find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
					ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
					ob1.eq(i).find("span[name='show_content']").html(ob1.eq(i).find("span[name='show_content']").html().replace($(this).parent().parent().find("[name='original_content']").val(),$(this).parent().parent().find("[name='show_content']").val()));
					ob1.eq(i).find("span[name='content']").html(ob1.eq(i).find("span[name='show_content']").html().replace($(this).parent().parent().find("[name='original_content']").val(),$(this).parent().parent().find("[name='content']").val()));
				}

				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				edit_yizhu.click();
				art.dialog.list['edit_yizhu_dialog'].close();
			});
			//医嘱【执行】阳性结果事件：
			$("[name='zhixing_wanbi_yangxing']").click(function(){
				$(this).parent().parent().find("[name='show_content']").val($(this).parent().parent().find("[name='content']").val()+"（+）");
				$(this).parent().parent().find("[name='content']").val($(this).parent().parent().find("[name='content']").val()+"（+）");
				//验证执行的时间是否为空
				if($(this).parent().parent().find("[name='zhixing_time']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入执行时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//增加执行信息
				$(this).parent().parent().parent().parent().parent().prev().find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
				$(this).parent().parent().parent().parent().parent().prev().find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
				//切换医嘱状态
				$(this).parent().find("[name='state']").val("执行完毕");
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
					ob1.eq(i).find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
					ob1.eq(i).find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
					ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
					ob1.eq(i).find("span[name='show_content']").html($(this).parent().parent().find("[name='show_content']").val());
					ob1.eq(i).find("span[name='content']").html($(this).parent().parent().find("[name='content']").val());
				}

				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				edit_yizhu.click();
				art.dialog.list['edit_yizhu_dialog'].close();
			});
			//医嘱【执行】为阳性性结果事件：
			$("[name='zhixing_wanbi_yinxing']").click(function(){
				$(this).parent().parent().find("[name='show_content']").val($(this).parent().parent().find("[name='content']").val()+"（-）");
				$(this).parent().parent().find("[name='content']").val($(this).parent().parent().find("[name='content']").val()+"（-）");
				//验证执行的时间是否为空
				if($(this).parent().parent().find("[name='zhixing_time']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入执行时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//增加执行信息
				$(this).parent().parent().parent().parent().parent().prev().find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
				$(this).parent().parent().parent().parent().parent().prev().find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
				//切换医嘱状态
				$(this).parent().find("[name='state']").val("执行完毕");
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
					ob1.eq(i).find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
					ob1.eq(i).find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
					ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
					ob1.eq(i).find("span[name='show_content']").html($(this).parent().parent().find("[name='show_content']").val());
					ob1.eq(i).find("span[name='content']").html($(this).parent().parent().find("[name='content']").val());
				}

				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				edit_yizhu.click();
				art.dialog.list['edit_yizhu_dialog'].close();
			});
			//医嘱【修改】阳性结果事件：
			$("[name='xiugai_wanbi_yangxing']").click(function(){
				if($(this).parent().parent().find("[name='show_content']").val().indexOf("（-）")==-1&&$(this).parent().parent().find("[name='show_content']").val().indexOf("（+）")==-1)
				{
					// 执行全部后并没有加上+-号，导致无法修改
					$(this).parent().parent().find("[name='show_content']").val($(this).parent().parent().find("[name='show_content']").val()+"（+）");
					$(this).parent().parent().find("[name='content']").val($(this).parent().parent().find("[name='show_content']").val());
				}
				else
				{
					$(this).parent().parent().find("[name='show_content']").val($(this).parent().parent().find("[name='show_content']").val().replace("（-）","（+）"));
					$(this).parent().parent().find("[name='content']").val($(this).parent().parent().find("[name='show_content']").val().replace("（-）","（+）"));
				}
				
				
				//验证执行的时间是否为空
				if($(this).parent().parent().find("[name='zhixing_time']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入执行时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//增加执行信息
				$(this).parent().parent().parent().parent().parent().prev().find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
				$(this).parent().parent().parent().parent().parent().prev().find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
				//切换医嘱状态
				$(this).parent().find("[name='state']").val("执行完毕");
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
					ob1.eq(i).find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
					ob1.eq(i).find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
					ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
					ob1.eq(i).find("span[name='show_content']").html($(this).parent().parent().find("[name='show_content']").val());
					ob1.eq(i).find("span[name='content']").html($(this).parent().parent().find("[name='content']").val());
				}

				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				edit_yizhu.click();
				art.dialog.list['edit_yizhu_dialog'].close();
			});
			//医嘱【修改】为阴性结果事件：
			$("[name='xiugai_wanbi_yinxing']").click(function(){
				if($(this).parent().parent().find("[name='show_content']").val().indexOf("（-）")==-1&&$(this).parent().parent().find("[name='show_content']").val().indexOf("（+）")==-1)
				{
					$(this).parent().parent().find("[name='show_content']").val($(this).parent().parent().find("[name='show_content']").val()+"（-）");
					$(this).parent().parent().find("[name='content']").val($(this).parent().parent().find("[name='show_content']").val());
				}
				else
				{
					$(this).parent().parent().find("[name='show_content']").val($(this).parent().parent().find("[name='show_content']").val().replace("（+）","（-）"));
					$(this).parent().parent().find("[name='content']").val($(this).parent().parent().find("[name='show_content']").val().replace("（+）","（-）"));
				}
				
				//验证执行的时间是否为空
				if($(this).parent().parent().find("[name='zhixing_time']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入执行时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//增加执行信息
				$(this).parent().parent().parent().parent().parent().prev().find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
				$(this).parent().parent().parent().parent().parent().prev().find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
				//切换医嘱状态
				$(this).parent().find("[name='state']").val("执行完毕");
				var ob1 = $("[name='"+edit_yizhu.attr("name")+"']");
				var nu = ob1.length;
				for(var i=0;i<nu;i++){
					ob1.eq(i).find("[name='zhixing_name']").html($(this).parent().parent().find("[name='zhixing_name']").val());
					ob1.eq(i).find("[name='zhixing_time']").html($(this).parent().parent().find("[name='zhixing_time']").val());
					ob1.eq(i).find("span[name='state']").html($(this).parent().parent().find("[name='state']").val());
					ob1.eq(i).find("span[name='show_content']").html($(this).parent().parent().find("[name='show_content']").val());
					ob1.eq(i).find("span[name='content']").html($(this).parent().parent().find("[name='content']").val());
				}

				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				edit_yizhu.click();
				art.dialog.list['edit_yizhu_dialog'].close();
			});
			//取消编辑按钮，关闭编辑框
			$("[name='edit_cancel']").click(function(){
				edit_yizhu.click();
				art.dialog.list['edit_yizhu_dialog'].close();
			});
			//下拉显示编辑框
			//$(this).next().find("[class='edit_table']").show();
		},//end of function(){
		function(){
			//$(this).next().find("[class='edit_table']").hide();
			$(this).removeClass("editable_on_edit");
		}
	);//end of $(".editable").toggle(function() {
	
	$(".editable_partly").toggle(
		function(){
			$(this).addClass("editable_partly_on_edit");
			var current_yizhu_state = $(this).find("[name='state']").html();
			var editable_partly_yizhu = $(this);
			if(operator_type=="yishi")
			{
				if(supervisor_authority=="false")
				{
					if(current_yizhu_state=="已添加"||current_yizhu_state=="医嘱有误")
					{
						art.dialog({
							id:"editpart_yizhu_dialog",
							title:"编辑医嘱",
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
											'<li>'+
												'<span >医嘱内容:</span><input type="text" name="content" class="input_type_small" value="'
												+$(this).find("[name='content']").html()+'" style="width:60%" />'+
											'</li>'+
											'<li name="shuliang_info">'+
												'<span >此次用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
												+$(this).find("[name='ciliang']").html()+'" />'+
												'<input type="text" name="shiyong_danwei" class="input_type_small" value="'
												+$(this).find("[name='shiyong_danwei']").html()+'" />'+
												'<span >执行次序:</span><select name="shifou_jiaji" class="select_type" action_type="others"><option>'
												+$(this).find("[name='shifou_jiaji']").html()+'</option><option val="1">1</option><option val="2">2</option><option val="3">3</option><option val="4">4</option><option val="5">5</option><option val="0">加急</option></select>'+
											'</li>'+
											'<li>'+
												'<input type="button" class="edit_yizhu_button" name="save_xiada_info" value="保存修改" />'+
												'<input type="button" class="edit_yizhu_button" name="edit_cancel" value="取消编辑" />'+
												'<input type="button" class="edit_yizhu_button" name="delete" action_type="delete" value="删除此条" />'+
												'<input type="hidden" name="id" value="'+$(this).attr("id")+'" />'+
												'<input type="hidden" name="state" value="'+$(this).attr("state")+'" />'+
												'<input type="hidden" name="zhuyuan_id" value='+zhuyuan_id+' />'+
												'<span name="tips" class="right_tips"></span>'+
											'</li>'+
											'</form>',
							lock: true,
							padding:5,
							init: function () {
								$('[name="xiada_time"]').datetimepicker({
									timeFormat: 'hh:mm',
									dateFormat: 'yy-mm-dd'
								});
								if(editable_partly_yizhu.find("[name='content']").html() == '中草药'){
									$(this).next().find('[name="ciliang"]').hide().prev().hide();
									$(this).next().find('[name="shiyong_danwei"]').hide();
								}
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
							content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Yizhuguanli/updateLinshi">'+
											'<li>'+
												'<span class="info_title">此项医嘱已经取消执行</span>'+
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
					}//end of esle
				}
			}
			//医嘱删除
			$("[name='delete']").click(function(){
				if (confirm('是否确认进行删除操作？'))
				{
					//切换医嘱状态
					$(this).parent().find("[name='state']").val("已删除");
					//表单ajax提交
					$(this).parent().parent().ajaxSubmit(form_options); 
					
					editable_partly_yizhu.click();
					editable_partly_yizhu.remove();
					art.dialog.list['editpart_yizhu_dialog'].close();
				}
				else
				{
				}
				return false;
			});
			//点击保存下达信息修改事件：
			$("[name='save_xiada_info']").click(function(){
				//验证医嘱下达时间是否为空
				if($(this).parent().parent().find("[name='xiada_time']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入下达医嘱医嘱的时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//验证医嘱内容是否为空
				if($(this).parent().parent().find("[name='content']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入下达医嘱医嘱的时间后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					return false;
				}
				//验证此次用量是否为空
				else if($(this).parent().parent().find("[name='ciliang']").val()=="")
				{
					$(this).parent().parent().find("[name='tips']").html("请先输入此次用量后再添加!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					$(this).parent().parent().find("[name='ciliang']").fadeOut();
					$(this).parent().parent().find("[name='ciliang']").fadeIn();
					return false;
				}
				//验证此次用量是否为数字输入
				else if(!(new RegExp("^\\d{1,3}.?\\d{0,3}$")).test($(this).parent().parent().find("[name='ciliang']").val()))
				{
					$(this).parent().parent().find("[name='tips']").html("请输入数字格式的此次用量!");
					$(this).parent().parent().find("[name='tips']").addClass("error_tips");
					$(this).parent().parent().find("[name='tips']").fadeOut();
					$(this).parent().parent().find("[name='tips']").fadeIn();
					$(this).parent().parent().find("[name='ciliang']").fadeOut();
					$(this).parent().parent().find("[name='ciliang']").fadeIn();
					return false;
				}
				//把新的编辑内容更新到页面中:
				editable_partly_yizhu.find("[name='content']").html($(this).parent().parent().find("[name='content']").val());
				var temp_yishi_name = $(this).parent().parent().find("[name='xiada_yishi_name']").val();
				editable_partly_yizhu.find("[name='xiada_yishi_name']").html(temp_yishi_name);
				editable_partly_yizhu.find("[name='xiada_time']").html($(this).parent().parent().find("[name='xiada_time']").val());
				editable_partly_yizhu.find("[name='ciliang']").html($(this).parent().parent().find("[name='ciliang']").val());
				editable_partly_yizhu.find("[name='yongfa']").html($(this).parent().parent().find("[name='yongfa']").val());
				editable_partly_yizhu.find("[name='shifou_jiaji']").html($(this).parent().parent().find("[name='shifou_jiaji']").val());
				editable_partly_yizhu.find("[name='shiyong_danwei']").html($(this).parent().parent().find("[name='shiyong_danwei']").val());
				//表单ajax提交
				$(this).parent().parent().ajaxSubmit(form_options); 
				
				editable_partly_yizhu.click();
				art.dialog.list['editpart_yizhu_dialog'].close();
				
			});
			//取消编辑按钮，关闭编辑框
			$("[name='edit_cancel']").click(function(){
				editable_partly_yizhu.click();
				art.dialog.list['editpart_yizhu_dialog'].close();
			});
		},//end of function(){
		function(){
			$(this).removeClass("editable_partly_on_edit");
			//$(this).next().find("[class='edit_table']").hide();
		}
	)
}//end of function initialEditEvent()

//自动关闭提示语句
//************************************************************************
function auto_close(){
	$("body").qtip("hide");
}