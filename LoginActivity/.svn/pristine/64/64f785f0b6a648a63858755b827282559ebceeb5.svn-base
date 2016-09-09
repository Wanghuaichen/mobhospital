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
var yongfa = "数据错误";
var shuliang = "数据错误";
var pinlv = "数据错误";
var dachufanghao = "";
var kaili_time = "";
var kaili_yishi_name ="";
var update_result = false;
var group_name;
var form_options={
	async:false,
   dataType: 'json',
   success:function showResponse(data){
   	console.log(data);
   		update_result = data.result;
		//alert(data[0].message);
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
								  when: {event: 'unfocus'}
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
			if(data.row_number!=null)
			{
				$(".blank_yaopin_data:eq("+data.row_number+")").css("background-color", "#C66");
				$(".blank_yaopin_data:eq("+data.row_number+")").find("[name='yaopin_mingcheng[]']").focus();
			}
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
	// 
	if(group_name==null)
	{
		group_name = "Common";
	}
//初始化编辑事件：
	initialEditEvent();
	editChufang();
	var add_count;
	if($(".blank_yaopin_data").length==0)
	{
		add_count = 0;
	}
	else
	{
		add_count = $(".blank_yaopin_data:last").attr("number");
	}
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
		if(input_number >= 25)
		{
			if(confirm("是否添加新的药品?"))
			{
				$('input[name="save_yaopin"]').trigger("click");
				if(update_result=="false")
				{
					// art.dialog.list['kaili_chufang_dialog'].close();
					return;
				}
				else
				{
					table.find('input:visible[name="add_yaopin"]').each(function(){
						$(this).attr("disabled","disabled");
					});
					var arr = new Array();
					$.ajaxSetup({
						async: false
					});
					$.getJSON("/tiantan_emr/"+group_name+"/Chufangguanli/chuangjianNewChufang", { chufang_id: last_chufang_id }, function(json){
						//alert("JSON Data: " + json['id']);
						arr = json;
					});
					last_chufang_id = arr['id'];
					var submit_id;
					$.ajaxSetup({
						async: false
					});
					$.post("http://"+server_url+"/tiantan_emr/"+group_name+"/Chufangguanli/addOneYaopin", { "chufang_id": arr['id'],"dachufanghao":dachufanghao,"type":"中草药"},function(data){
						submit_id = data.id;
					}, "json");
					$.ajaxSetup({
						async: true
					});
					$(table).parent().after(
						'<table border="0" cellpadding="0" cellspacing="0" class="content_table" style="width:100%;margin-top:20px;">'+
							'<tr class="blank_yaopin_data" id="'+submit_id+'">'+
							'<td width="6%" class="info_title">1</td>'+
							'<td width="20%" class="long_content">'+
								'<input style="width:90%;" type="text" name="yaopin_mingcheng[]" value=""/>'+
							'</td>'+
							'<td width="12%">'+
								'<input style="width:40%;" type="text" name="ciliang[]" value="" />'+
								'<input style="width:30%;" type="text" name="shiyong_danwei[]" value=""/>'+
							'</td>'+
							'<td width="12%">'+
								'<input style="width:30%;" type="text" name="shuliang[]" value="" disabled="disabled"/><input style="width:30%;" type="text" name="lingshou_danwei[]" value="" disabled="disabled"/>'+
							'</td>'+
							'<td width="10%"><input style="width:60%;" type="text" name="danjia[]" value="" />元</td>'+
							'<td width="10%"><input style="width:60%;" type="text" name="xiaoji[]" value="" disabled="disabled"/>元</td>'+
							'<td width="15%"><input style="width:80%;" type="text" name="fufeifangshi[]" value="" /></td>'+
							'<td width="15%"><select name="teshuyaoqiu[]" value="无"><option value="无">无</option><option value="打碎">打碎</option><option value="先煎">先煎</option><option value="后下">后下</option><option value="单包">单包</option><option value="冲服">冲服</option><option value="去头足">去头足</option></select>'+
							'<td width="10%" style="display: none;"><input style="width:80%;" type="text" name="shifou_zibei[]" value="" disabled="disabled"/></td>'+
							'<td width="10%">'+
								'<div style="width:80px;">'+
									'<input type="button" name="add_yaopin" class="add_chufang" value="">&nbsp;'+
									'<input type="button" name="delete_yaopin" class="delete_chufang" value="" disabled="disabled">'+
								'</div>'+
							'</td>'+
								'<input type="hidden" name="id[]" value='+submit_id+' />'+
								'<input type="hidden" name="chufang_id[]" value='+last_chufang_id+' />'+
								'<input type="hidden" name="dachufanghao[]" value='+dachufanghao+' />'+
								'<input type="hidden" name="'+qianzui+'_id[]" value='+zhuyuan_id+' />'+
								'<input type="hidden" name="shuliang[]" value="'+shuliang+'" />'+
								'<input type="hidden" name="yaopin_id[]" value="" />'+
								'<input type="hidden" name="xiaoji[]" value="" />'+
								//'<input type="hidden" name="fufeifangshi[]" value="" />'+
								//'<input type="hidden" name="danjia[]" value="" />'+
								//'<input type="hidden" name="shiyong_danwei[]" value="" />'+
								'<input type="hidden" name="guige_number[]" value="" />'+
								'<input type="hidden" name="jiliang[]" value="" />'+
								'<input type="hidden" name="lingshou_danwei[]" value="" />'+
								'<input type="hidden" name="zhixingkeshi[]" value="" />'+
								'<input type="hidden" name="shifou_zibei[]" value="否" />'+
								'<input type="hidden" name="type[]" value="中草药" />'+
							'</tr>'+
						'</table>'
					);
					$(document).scrollTop($(document).scrollTop()+25);
					inputnumber = inputnumber + $(this).parent().parent().parent().find(":input:visible[disabled!='disabled']").length;
					editChufang();
				}
			}
		}
		else
		{
			var submit_id;
			$.ajaxSetup({
				async: false
			});
			$.post("http://"+server_url+"/tiantan_emr/"+group_name+"/Chufangguanli/addOneYaopin", { "chufang_id": last_chufang_id,"dachufanghao":dachufanghao,"type":"中草药"},function(data){
				submit_id = data.id;
			}, "json");
			$.ajaxSetup({
				async: true
			});
			$($(this).parent().parent().parent()).after(
				'<tr class="blank_yaopin_data" id="'+submit_id+'">'+
				'<td width="6%" class="info_title">1</td>'+
				'<td width="20%" class="long_content">'+
					'<input style="width:90%;" type="text" name="yaopin_mingcheng[]" value=""/>'+
				'</td>'+
				'<td width="12%">'+
					'<input style="width:40%;" type="text" name="ciliang[]" value="" />'+
					'<input style="width:30%;" type="text" name="shiyong_danwei[]" value=""/>'+
				'</td>'+
				'<td width="12%">'+
					'<input style="width:30%;" type="text" name="shuliang[]" value="" disabled="disabled"/><input style="width:30%;" type="text" name="lingshou_danwei[]" value="" disabled="disabled"/>'+
				'</td>'+
				'<td width="10%"><input style="width:60%;" type="text" name="danjia[]" value="" />元</td>'+
				'<td width="10%"><input style="width:60%;" type="text" name="xiaoji[]" value="" disabled="disabled"/>元</td>'+
				'<td width="15%"><input style="width:80%;" type="text" name="fufeifangshi[]" value="" /></td>'+
				'<td width="15%"><select name="teshuyaoqiu[]" value="无"><option value="无">无</option><option value="打碎">打碎</option><option value="先煎">先煎</option><option value="后下">后下</option><option value="单包">单包</option><option value="冲服">冲服</option><option value="去头足">去头足</option></select></td>'+
				'<td width="10%" style="display: none;"><input style="width:80%;" type="text" name="shifou_zibei[]" value="" disabled="disabled"/></td>'+
				'<td width="10%">'+
					'<div style="width:80px;">'+
						'<input type="button" name="add_yaopin" class="add_chufang" value="">&nbsp;'+
						'<input type="button" name="delete_yaopin" class="delete_chufang" value="">'+
					'</div>'+
				'</td>'+
					'<input type="hidden" name="id[]" value='+submit_id+' />'+
					'<input type="hidden" name="chufang_id[]" value='+last_chufang_id+' />'+
					'<input type="hidden" name="dachufanghao[]" value='+dachufanghao+' />'+
					'<input type="hidden" name="'+qianzui+'_id[]" value='+zhuyuan_id+' />'+
					'<input type="hidden" name="shuliang[]" value="'+shuliang+'" />'+
					'<input type="hidden" name="yaopin_id[]" value="" />'+
					'<input type="hidden" name="xiaoji[]" value="" />'+
					//'<input type="hidden" name="fufeifangshi[]" value="" />'+
					//'<input type="hidden" name="danjia[]" value="" />'+
					//'<input type="hidden" name="shiyong_danwei[]" value="" />'+
					'<input type="hidden" name="guige_number[]" value="" />'+
					'<input type="hidden" name="jiliang[]" value="" />'+
					'<input type="hidden" name="lingshou_danwei[]" value="" />'+
					'<input type="hidden" name="zhixingkeshi[]" value="" />'+
					'<input type="hidden" name="shifou_zibei[]" value="否" />'+
					'<input type="hidden" name="type[]" value="中草药" />'+
			'</tr>'
			);
			$(document).scrollTop($(document).scrollTop()+25);
			inputnumber = inputnumber + $(this).parent().parent().parent().find(":input:visible[disabled!='disabled']").length;
		}
		var xuhaonumber = 0;
		$(".content_table .info_title").each(function(){
			xuhaonumber = parseInt(xuhaonumber)+1;
			$(this).html(xuhaonumber)
		});
		$(this).parent().parent().parent().next().find('input[name="yaopin_mingcheng[]"]').focus();
		editChufang();
	});
	$("[name='delete_yaopin']").live("click",function(){
		if($(".blank_yaopin_data").length!=0)
		{
			add_count--;
			//var ob_yaopin = $(".blank_yaopin_data:last");
			//yaopin_id = $(".blank_yaopin_data:last").attr("id");
			var ob_yaopin = $(this).parent().parent().parent();
			yaopin_id = $(this).parent().parent().parent().attr("id");
			if(confirm("确定要删除吗?"))
			{
				$.post("http://"+server_url+"/tiantan_emr/"+group_name+"/Chufangguanli/deleteOneYaopin", { "id": yaopin_id},function(data){}, "json");
				ob_yaopin.remove();
			}
			$('input[name="save_yaopin"]').trigger("click");
		}
	});
	$("[name='save_yaopin']").click(function(){
		var jine=0;
		$(".blank_yaopin_data").each(function(){
			jine = Number($(this).find("[name='xiaoji[]']").val())+Number(jine);
		});
		$("#jine_zongji").html(jine.toFixed(2));
		var sava_data = new Array()
		var temp_number = 0;
		var temp_state = true;
		
		//保存药品规格单位是否正确，默认是：正确
		var temp_guige = true;
		
		//判断是否有重复药品
		$("input[name='yaopin_mingcheng[]']").each(function ()
		{
			var this_value = $(this).val();
			
			for(var i in sava_data)
			{
				if(sava_data[i]==this_value)
				{
					temp_state = false;
				}
			}
			sava_data[temp_number] = this_value;
			temp_number++;
        });
        
    //判断药品规格是否是'袋'，中药处方中的规格只能是g，不能是袋(三七粉和川贝粉除外)
    //三七粉单位是瓶，川贝粉目前医院暂时不用，这里先不做处理
 		$("input[type='text'][name='lingshou_danwei[]']").each(function ()
		{
			var this_value = $(this).val();
			var yaopin_mingcheng = $(this).parent().parent().find("[name='yaopin_mingcheng[]']").val();
			if(this_value.indexOf("袋")!= -1 && yaopin_mingcheng.indexOf("川贝母") == -1)
			{
			   temp_guige = false;
			}
    });
              
        
		if(temp_state)
		{
			if(temp_guige)
			{
			  $("#yaopin_form").submit();
			}
			else
			{
			   alert('药品单位不对，请不要选择\' 袋装药品 \'');
			}
			
		}
		else
		{
			alert('有重复的药品');
		}
	});
	
	function editChufang()
	{
		$("[name='yaopin_mingcheng[]']").each(function(){
			$(this).live("keyup",function(){
				$("[name='yaopin_mingcheng[]']").parent().parent().css("background-color", "#FFF");
			})
			//根据药品名称自动获取药品信息
			var temp_yaopin_mingcheng_null = "";
			var cache_content = {},lastXhr_content;
			$(this).autocomplete({
				minLength: 2,
				autoFocus: true,
				source: function( request, response ) {
					term = request.term;
					if ( term in cache_content ) {
						response( cache_content[ term ] );
						return;
					};
					lastXhr_content = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getDataYaopinJson/pid/1', request, function( data, status, xhr ) {
						cache_content[ term ] = data;
						if ( xhr === lastXhr_content ) {
							response( data );
						}
						if(data == "")
						{
							temp_yaopin_mingcheng_null = "no";
						}
					});
				},
				focus: function( event, ui ) {
					//$(this).parent().parent().find("[name='yaopin_mingcheng[]']").val( ui.item.label );
					return false;
				},
				select: function( event, ui ) {
					temp_yaopin_mingcheng_null = "yes";
					$(this).parent().next().find('[name="shiyong_danwei[]"]').attr("disabled","disabled");
					$(this).parent().next().next().next().find('[name="danjia[]"]').attr("disabled","disabled");
					$(this).parent().next().next().next().next().next().find('[name="fufeifangshi[]"]').attr("disabled","disabled");
					if($(this).parent().parent().find("input[type='hidden'][name='shiyong_danwei[]']").length==0)
					{
						$(this).parent().parent().append('<input type="hidden" name="shiyong_danwei[]" value="" />');
					}
					if($(this).parent().parent().find("input[type='hidden'][name='danjia[]']").length==0)
					{
						$(this).parent().parent().append('<input type="hidden" name="danjia[]" value="" />');
					}
					if($(this).parent().parent().find("input[type='hidden'][name='fufeifangshi[]']").length==0)
					{
						$(this).parent().parent().append('<input type="hidden" name="fufeifangshi[]" value="" />');
					}
					$(this).parent().parent().find("[name='yaopin_mingcheng[]']").val( ui.item.label );
					$(this).parent().parent().find('[name="shiyong_danwei[]"]').val( ui.item.measure_unit );
					$(this).parent().parent().find('[name="lingshou_danwei[]"]').val( ui.item.lingshou_danwei );
					//$(this).parent().parent().find('[name="kucun[]"]').val( ui.item.kucun );
					$(this).parent().parent().find('[name="zhixingkeshi[]"]').val( ui.item.zhixingkeshi );
					$(this).parent().parent().find('[name="danjia[]"]').val( ui.item.danjia );
					$(this).parent().parent().find('[name="fufeifangshi[]"]').val( ui.item.fufeifangshi );
					$(this).parent().parent().find('[name="yaopin_id[]"]').val( ui.item.id );
					$(this).parent().parent().find('[name="guige_number[]"]').val( ui.item.guige_number );
					$(this).parent().parent().find('[name="jiliang[]"]').val( ui.item.jiliang );
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
			$(this).blur(function(){
				if(temp_yaopin_mingcheng_null == "no")
				{
					$(this).parent().parent().find('[name="danjia[]"]').val("0");
					$(this).parent().parent().find('[name="fufeifangshi[]"]').val("自付");
				}
			})
		});
		
		$("[name='ciliang[]']").each(function(){
			//计算小计以及总数量事件
			$(this).change(function(){
				var jiliang = $(this).parent().parent().find("[name='jiliang[]']").val();
				var zongji_shuliang = $(this).val()*shuliang/jiliang;
				$(this).parent().parent().find("[name='shuliang[]']").val(zongji_shuliang);
				var xiaoji = parseInt($(this).parent().parent().find("[name='danjia[]']").val()*$(this).parent().parent().find("[name='shuliang[]']").val()*100)/100;
				$(this).parent().parent().find("[name='xiaoji[]']").val(xiaoji.toFixed(2));
			});
		});
	}
		
//编辑处方用法用量：
	$("[name='edit_chufang']").click(function() {  
		var edit_chufang = $(this);
		art.dialog({
			id:"edit_chufang_dialog",
			title:"修改本处方的用法用量",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Chufangguanli/updateChufang">'+
									'<li>'+
										'<span >总计数量:</span><input type="text" name="shuliang" class="input_type_small" value="'+shuliang+'" />剂'+
										'<span >使用方法:</span><input name="yongfa" id="yongfa" class="input_type" value="'+yongfa+'" />'+
										'<span >使用频率:</span><input name="pinlv" id="pinlv" class="input_type" value="'+pinlv+'" />'+					
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_chufang_button" name="save_info" value="确定修改" />'+
										'<input type="button" class="edit_chufang_button" name="edit_cancel" value="取消" />'+
										'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="id" value='+chufang_id+' />'+
										'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
										'<input type="hidden" name="type" value="中草药" />'+
										'<span name="tips" class="right_tips"></span>'+
									'</li>'+
							'</form>',
			lock: true,
			padding:5,
			init: function () {
				$('[name="shuliang"]')
					.enterTo('[name="yongfa"]')
					.enterTo('[name="pinlv"]')
					.enterComplete();
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
						lastXhr_yongfa = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoJson',{"pid":"12000", "term":"" }, function( data, status, xhr ) {
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
						lastXhr_pinlv = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoJson',{"pid":"14000", "term":"" }, function( data, status, xhr ) {
						cache_pinlv [ term ] = data;
						if ( xhr === lastXhr_pinlv ) {
							response( data );
						}
					});
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
				//点击添加，先判断内容完整性等，并判断是否已经关闭了其他编辑框
				$("[name='save_info']").click(function(){
					if($(this).parent().parent().find("[name='shuliang']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请输入总计数量!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						return false;
					}
					//验证总计数量是否为数字输入
					else if(!(new RegExp("^\\d{1,3}$")).test($(this).parent().parent().find("[name='shuliang']").val()))
					{
						$(this).parent().parent().find("[name='tips']").html("请输入数字格式的总计数量!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='shuliang']").fadeOut();
						$(this).parent().parent().find("[name='shuliang']").fadeIn();
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
						art.dialog.list['edit_chufang_dialog'].close();
					}
				});
				//取消添加事件
				$("[name='edit_cancel']").click(function(){
					art.dialog.list['edit_chufang_dialog'].close();
				});
				//输入框类型事件
				$(".input_type").focus(function(){
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
				});
			}
		});
		//下拉显示添加框
		//$(this).parent().parent().next().find("[name='edit_chufang_table']").slideDown();
	});//end of $("[name='kaili_chufang']").click(function() {
		
//开立此处方：
	$("[name='kaili_chufang']").click(function() {
		$('input[name="save_yaopin"]').trigger("click");
		if(update_result=="false")
		{
			// art.dialog.list['kaili_chufang_dialog'].close();
			return;
		}
		else
		{
			var myDate = new Date();
			var kaili_time = myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes();
			art.dialog({
				id:"kaili_chufang_dialog",
				title:"同步医嘱",
				content:'<form class="add_form" id="kaili_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Chufangguanli/updateChufang">'+
										'<li>'+
										'<span >同步时间:</span><input type="text" action_type="datetime" name="kaili_time" class="Wdate" onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:false})" value="'+chufang_date+'"/>'+
										'<span >执行医生:</span><input type="text" name="kaili_yishi_name" class="input_type_small" value="'+yishi_name+'" disabled="disabled"/>'+
										'<span >药品金额总计:</span><input type="text" name="jine_zongji" class="input_type_small" value="'+$(".chufang_bottom").find("[name=jine_zongji]").html()+'" disabled="disabled"/>元'+
										'</li>'+
										'<li>'+
											'<input type="button" class="edit_chufang_button" name="add_multi" value="确定同步" />'+
											'<input type="button" class="edit_chufang_button" name="add_cancel" value="取消" />'+
											'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
											'<input type="hidden" name="yizhu_type" value="" />'+
											'<input type="hidden" name="id" value='+chufang_id+' />'+
											'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
											'<input type="hidden" name="state" value="新添加" />'+
											'<input type="hidden" name="kaili_yishi_name" value='+yishi_name+' />'+
											'<input type="hidden" name="type" value="中草药" />'+
											'<input type="hidden" name="yongfa_type" value="中草药" />'+
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
						if($(this).parent().parent().find("[name='kaili_time']").val()=="" || $(this).parent().parent().find("[name='kaili_time']").val()=="null")
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
								//cancelVal: '取消',
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
					$(".input_type").focus(function(){
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
					});
				}
			});
		}		
		//下拉显示添加框
		//$(this).parent().parent().next().find("[name='kaili_chufang_table']").slideDown();
	});//end of $("[name='kaili_chufang']").click(function() {

//下达此医嘱:
	$("[name='xiada_yizhu']").click(function() {
		
		var yizhu_type = $('input[name="yizhu_type"]').val();

		$('input[name="save_yaopin"]').trigger("click");
		if(update_result=="false")
		{
			// art.dialog.list['kaili_chufang_dialog'].close();
			return;
		}
		else
		{
			var myDate = new Date();
			var kaili_time = myDate.getFullYear() + '-' + (myDate.getMonth()+1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes();
			art.dialog({
				id:"kaili_chufang_dialog",
				title:"下达医嘱",
				content:'<form class="add_form" id="kaili_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Chufangguanli/updateChufang">'+
										'<li>'+
										'<span >下达时间:</span><input type="text" action_type="datetime" name="kaili_time" class="Wdate" onclick="WdatePicker({skin:\'twoer\',dateFmt:\'yyyy-MM-dd HH:mm\',enableKeyboard:false})" value="'+chufang_date+'"/>'+
										'<span >执行医生:</span><input type="text" name="kaili_yishi_name" class="input_type_small" value="'+yishi_name+'" disabled="disabled"/>'+
										'<span >药品金额总计:</span><input type="text" name="jine_zongji" class="input_type_small" value="'+$(".chufang_bottom").find("[name=jine_zongji]").html()+'" disabled="disabled"/>元'+
										'</li>'+
										'<li>'+
											'<input type="submit" class="edit_chufang_button"  value="确定下达" />'+
											'<input type="button" class="edit_chufang_button" name="add_cancel" value="取消" />'+
											'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
											'<input type="hidden" name="yizhu_type" value="'+yizhu_type+'" />'+
											'<input type="hidden" name="id" value='+chufang_id+' />'+
											'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
											'<input type="hidden" name="state" value="新添加" />'+
											'<input type="hidden" name="kaili_yishi_name" value='+yishi_name+' />'+
											'<input type="hidden" name="type" value="中草药" />'+
											'<input type="hidden" name="yongfa_type" value="中草药" />'+
											'<input type="hidden" name="shifou_daiyao" value="否" />'+
											'<input type="hidden" name="add_multi" value="确定开立" />'+
											'<input type="hidden" name="url_type" value="'+yizhu_type+'" />'+
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
						if($(this).parent().parent().find("[name='kaili_time']").val()=="" || $(this).parent().parent().find("[name='kaili_time']").val()=="null")
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
					$(".input_type").focus(function(){
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
					});
				}
			});
		}
		
		//下拉显示添加框
		//$(this).parent().parent().next().find("[name='kaili_chufang_table']").slideDown();
	});//end of $("[name='kaili_chufang']").click(function() {
	

//修改出院带药状态：
	$("[name='shifou_daiyao']").click(function() {  
		if($(this).parent().parent().parent().find("[name='xiugai_chuyuan_daiyao_table']").length==0)
		{
				$(this).parent().parent().after(
				'<tr class="none_border" id="xiugai_chuyuan_daiyao_table_false" style="display: none;" >'+	
				'<td colspan="8" class="none_border">'+
				'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Chufangguanli/changeChuyuanDaiyao">'+
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
				'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Chufangguanli/changeChuyuanDaiyao">'+
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

//取消开立此处方：
	$("[name='kaili_cancle']").click(function() {  
		art.dialog({
			id:"kaili_cancle_dialog",
			title:"取消开立处方",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Chufangguanli/updateChufang">'+
									'<li>'+
									'<span class="info_title">是否确认取消开立此处方？</span>'+
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_chufang_button" name="queding_quxiao" value="确定取消" />'+
										'<input type="button" class="edit_chufang_button" name="cancel" value="取消" />'+
										'<input type="hidden" name="id" value='+chufang_id+' />'+
										'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
										'<input type="hidden" name="state" value="新添加" />'+
										'<input type="hidden" name="type" value="中草药" />'+
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
				});
			}
		});
		//下拉显示添加框
		//$(this).parent().parent().next().find("[name='delete_chufang_table']").slideDown();
	});//end of $("[name='kaili_cancle']").click(function() {

//设置处方已给药：
	$("[name='chufang_geiyao']").click(function() {  
		art.dialog({
			id:"chufang_geiyao_dialog",
			title:"确定给药",
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Chufangguanli/updateChufang">'+
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
										'<input type="hidden" name="type" value="中草药" />'+
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
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Chufangguanli/deleteOneChufang">'+
									'<li>'+
									'<span class="info_title">是否确认删除此处方？</span>'+
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_chufang_button" name="queding_delete" value="确定删除" />'+
										'<input type="button" class="edit_chufang_button" name="delete_cancel" value="取消" />'+
										'<input type="hidden" name="id" value='+chufang_id+' />'+
										'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
										'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
										'<input type="hidden" name="type" value="中草药" />'+
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
			content:'<form class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Chufangguanli/copyOneChufang">'+
									'<li>'+
									'<span class="info_title">是否确定重新开立此处方？此操作将复制一份新的处方用于再次开立。</span>'+
									'</li>'+
									'<li>'+
										'<input type="button" class="edit_chufang_button" name="queding_fuzhi" value="确定" />'+
										'<input type="button" class="edit_chufang_button" name="fuzhi_cancel" value="取消" />'+
										'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
										'<input type="hidden" name="id" value='+chufang_id+' />'+
										'<input type="hidden" name="'+qianzui+'_id" value='+zhuyuan_id+' />'+
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
	$("[name='linchuang_zhenduan']").change(function() {
		$(".zhenduan").empty();
		$.get( 'http://'+server_url+'/tiantan_emr/Common/Data/getChufangZhenduan',{"zhixing_id":zhuyuan_id, "zhenduan_type":$(this).val(), "chufang_id":chufang_id}, function( data ) {
			$(".zhenduan").html(data);
			});
	});//end of $("[name='linchuang_zhenduan']").click(function() {

	//处方页面使用频率
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
			lastXhr_pinlv = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoJson',{"pid":"14000", "term":"" }, function( data, status, xhr ) {
			cache_pinlv [ term ] = data;
			if ( xhr === lastXhr_pinlv ) {
				response( data );
			}
		});
		},
		select: function( event, ui ) {
			$("#pinlv").val( ui.item.label );
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
	//处方页面使用方法
	var cache_yongfa = {},lastXhr_yongfa;
	$("#yongfa").autocomplete({
		minLength:0,
		autoFocus: true,
		source:function( request, response ) {
			term = request.term;
			if ( term in cache_yongfa ) {
				response( cache_yongfa [ term ] );
				return;
			}
			lastXhr_yongfa = $.getJSON( 'http://'+server_url+'/tiantan_emr/Common/Data/getXiangmuInfoJson',{"pid":"12000", "term":"" }, function( data, status, xhr ) {
			cache_yongfa [ term ] = data;
			if ( xhr === lastXhr_yongfa ) {
				response( data );
			}
		});
		},
		select: function( event, ui ) {
			$("#yongfa").val( ui.item.label );
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
					art.dialog({
						id:"edit_chufang_dialog",
						title:"编辑处方",
						content:'<form style="width:820px;" class="ajax_form" method="post" action="http://'+server_url+'/tiantan_emr/'+group_name+'/Chufangguanli/updateOneYaopin">'+
												'<li>'+
													'<span >药品名称:</span><input type="text" name="yaopin_mingcheng" class="input_type_full" value="'
													+$(this).find("[name='yaopin_mingcheng']").html()+
													'" disabled="disabled"/>'+
												'</li>'+
												'<li>'+
													'<span >每剂用量:</span><input type="text" name="ciliang" class="input_type_small" value="'
													+$(this).find("[name='ciliang']").html()+
													'" />'+
													'<input type="text" name="shiyong_danwei" class="input_type_small" value="'
													+$(this).find("[name='shiyong_danwei']").html()+
													'" disabled="disabled"/>'+
													'<span >总计数量:</span><input type="text" name="shuliang" class="input_type_small" value="'
													+$(this).find("[name='shuliang']").html()+
													'" disabled="disabled"/>'+
													'<input type="text" name="lingshou_danwei" class="input_type_small" value="'
													+$(this).find("[name='lingshou_danwei']").html()+
													'" disabled="disabled"/>'+
													'<span >库存:</span><input type="text" name="kucun" class="input_type_small" value="'
													+$(this).find("[name='kucun']").html()+
													'" disabled="disabled"/>'+
													'<input type="text" name="lingshou_danwei" class="input_type_small" value="'
													+$(this).find("[name='lingshou_danwei']").html()+
													'" disabled="disabled"/>'+
												'</li>'+
												'<li>'+
													'<span >使用方法:</span><select name="yongfa" class="select_type" value="" action_type="others" disabled="disabled">'+
														'<option value="'+yongfa+'">'+yongfa+'</option>'+
													'</select>'+
													'<span >使用频率:</span><select name="pinlv" class="select_type" value="" action_type="others" disabled="disabled">'+
														'<option value="'+pinlv+'">'+pinlv+'</option>'+
													'</select>'+
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
													//shifou_zibei1+shifou_zibei2+'</select>'+
													'</select>'+
												'</li>'+
												'<li>'+
													'<input type="button" class="edit_chufang_button" name="update_one_yaopin" value="保存修改" />'+
													'<input type="button" class="edit_chufang_button" name="delete_one_yaopin" value="删除" />'+
													'<input type="button" class="edit_chufang_button" name="edit_cancel" value="取消编辑" />'+
													'<input type="hidden" name="id" value=""/>'+
													'<input type="hidden" name="dachufanghao" value='+dachufanghao+' />'+
													'<input type="hidden" name="'+qianzui+'_id" value="'+zhuyuan_id+'"/>'+
													'<input type="hidden" name="chufang_id" value="'+chufang_id+'"/>'+
													'<input type="hidden" name="type" value="中草药"/>'+
													'<input type="hidden" name="yaopin_id" value="" />'+
													'<input type="hidden" name="shuliang" value="'
													+$(this).find("[name='shuliang']").html()+
													'" />'+
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
													'<span name="tips" class="right_tips"></span>'+
												'</li>'+
										'</form>',
						lock: true,
						padding:5,
						init: function () {
							// 为自备下拉选择框添加事件
							$('[name="shifou_zibei"]').change(function(e){
								if($(e.currentTarget).val()=="自备")
								{
									$(e.currentTarget).parent().prev().find('[name="xiaoji"]').val("0.00");
									$(e.currentTarget).parent().prev().find('[name="fufeifangshi"]').val("-");
									$(e.currentTarget).parent().prev().find('[name="zhixingkeshi"]').val("自备");
								}
								else 
								{
									var xiaoji = $(e.currentTarget).parent().prev().find("[name='danjia']").val()*$(e.currentTarget).parent().prev().prev().prev().find("[name='shuliang']").val();
									$(e.currentTarget).parent().prev().find('[name="xiaoji"]').val(xiaoji.toFixed(2));
									yaopin_id = 101889;
									yaopin_info = $.getJSON('http://'+server_url+'/tiantan_emr/Common/Data/getYaopinByID?yid='+yaopin_id, function( data, status, xhr ) {
										$(e.currentTarget).parent().prev().find('[name="fufeifangshi"]').val(data[18]["fufeifangshi"]);
										$(e.currentTarget).parent().prev().find('[name="zhixingkeshi"]').val(data[17]["zhixingkeshi"]);
									});
									//$.parseJSON(yaopin_info.responseText);
								}
							});
							var yaopin_id = editable_chufang.attr("yaopin_id");
							$('[name="yaopin_id"]').val(yaopin_id);
							var id = editable_chufang.attr("id");
							$('[name="id"]').val(id);
							//根据药品名称自动获取药品信息
							var cache_content = {},lastXhr_content;
							$('[name="yaopin_mingcheng"]').autocomplete({
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
									
									$('[name="yaopin_mingcheng"]').ScrollTo("top");
								},
								focus: function( event, ui ) {
									//$(this).parent().parent().parent().find('[name="yaopin_mingcheng"]').val( ui.item.label );
									
									$('[name="yaopin_mingcheng"]').ScrollTo("top");
									return false;
								},
								select: function( event, ui ) {
									$(this).parent().parent().parent().find('[name="yaopin_mingcheng"]').val( ui.item.label );
									$(this).parent().parent().parent().find('[name="shiyong_danwei"]').val( ui.item.shiyong_danwei );
									$(this).parent().parent().parent().find('[name="lingshou_danwei"]').val( ui.item.lingshou_danwei );
									$(this).parent().parent().parent().find('[name="kucun"]').val( ui.item.kucun );
									$(this).parent().parent().parent().find('[name="zhixingkeshi"]').val( ui.item.zhixingkeshi );
									$(this).parent().parent().parent().find('[name="danjia"]').val( ui.item.danjia );
									$(this).parent().parent().parent().find('[name="fufeifangshi"]').val( ui.item.fufeifangshi );
									$(this).parent().parent().parent().find('[name="jiliang"]').val( ui.item.jiliang );
									$(this).parent().parent().parent().find('[name="guige_number"]').val( ui.item.fufeifangshi );
									$(this).parent().parent().parent().find('[name="yaopin_id"]').val( ui.item.id );
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
					//验证药品名称选择是否正确
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
					//验证每剂用量是否为空
					else if($(this).parent().parent().find("[name='ciliang']").val()=="")
					{
						$(this).parent().parent().find("[name='tips']").html("请输入此药品的每剂用量!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='ciliang']").fadeOut();
						$(this).parent().parent().find("[name='ciliang']").fadeIn();
						return false;
					}
					//验证每剂用量是否为数字输入
					else if(!(new RegExp("^\\d{1,3}$")).test($(this).parent().parent().find("[name='ciliang']").val()))
					{
						$(this).parent().parent().find("[name='tips']").html("请输入数字格式的每剂用量!");
						$(this).parent().parent().find("[name='tips']").addClass("error_tips");
						$(this).parent().parent().find("[name='tips']").fadeOut();
						$(this).parent().parent().find("[name='tips']").fadeIn();
						$(this).parent().parent().find("[name='ciliang']").fadeOut();
						$(this).parent().parent().find("[name='ciliang']").fadeIn();
						return false;
					}
					else
					{
						var original_xiaoji = editable_chufang.find("[name='xiaoji']").html();
						var original_zongji = $("[name='jine_zongji']").html();
						//更新内容：
						editable_chufang.find("[name='yaopin_mingcheng']").html($(this).parent().parent().find("[name='yaopin_mingcheng']").val());
						editable_chufang.find("[name='ciliang']").html($(this).parent().parent().find("[name='ciliang']").val());
						editable_chufang.find("[name='shuliang']").html($(this).parent().parent().find("[name='shuliang']").val());
						editable_chufang.find("[name='danjia']").html($(this).parent().parent().find("[name='danjia']").val());
						editable_chufang.find("[name='xiaoji']").html($(this).parent().parent().find("[name='xiaoji']").val());
						editable_chufang.find("[name='fufeifangshi']").html($(this).parent().parent().find("[name='fufeifangshi']").val());
						editable_chufang.find("[name='zhixingkeshi']").html($(this).parent().parent().find("[name='zhixingkeshi']").val());
						//验证通过，ajax方式添加新的药品内容:
						$(this).parent().parent().ajaxSubmit(form_options); 
						editable_chufang.click();
						//更新总金额
						var new_xiaoji = $(this).parent().parent().find("[name='xiaoji']").val();
						var new_zongji = parseFloat(original_zongji)-parseFloat(original_xiaoji)+parseFloat(new_xiaoji);
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
						$(this).parent().parent().attr("action",'http://'+server_url+'/tiantan_emr/'+group_name+'/Chufangguanli/deleteOneYaopin')
						$(this).parent().parent().ajaxSubmit(form_options); 
												
						//更新总金额
						var original_xiaoji = editable_chufang.find("[name='xiaoji']").html();
						var original_zongji = $("[name='jine_zongji']").html();
						var new_zongji = parseFloat(original_zongji)-parseFloat(original_xiaoji);
						$("[name='jine_zongji']").html(new_zongji.toFixed(2)+"");
						
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
				
				//计算小计以及总数量事件
				$("[name='ciliang']").change(function(){
					//如果是自备
					if($(this).parent().next().next().next().children().next().val() == "自备")
					{
						var jiliang = $(this).parent().parent().find("[name='jiliang[]']").val();
						var zongji_shuliang = $(this).val()*shuliang/jiliang;
						$(this).parent().parent().find("[name='shuliang']").val(zongji_shuliang);
						var xiaoji = 0;
						$(this).parent().parent().find("[name='xiaoji']").val(xiaoji.toFixed(2));
					}
					else{
						var jiliang = $(this).parent().parent().find("[name='jiliang[]']").val();
						var zongji_shuliang = $(this).val()*shuliang/jiliang;
						$(this).parent().parent().find("[name='shuliang']").val(zongji_shuliang);
						var xiaoji = $(this).parent().parent().find("[name='danjia']").val()*$(this).parent().parent().find("[name='shuliang']").val();
						$(this).parent().parent().find("[name='xiaoji']").val(xiaoji.toFixed(2));
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
			}
		},//end of function(){
		function(){
			//$(this).next().find("[class='edit_table']").slideUp();
			$(this).removeClass("editable_on_edit");
		}
	);//end of $(".editable").toggle(function() {nd of function initialEditEvent()
}
//自动关闭提示语句
//************************************************************************
function auto_close(){
	$("body").qtip("hide");
}
function page_reload(){
	window.location.reload();
}
//
