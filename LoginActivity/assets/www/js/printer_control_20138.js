/**************************************************
*  Created:  2012-11-01
*  Info:天坦打印控制器
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author DongJie <dongjie@tiantanhehe.com>
*  @Author LiHui <LiHui@tiantanhehe.com>
*  @Version 3.0
*  @Updated History:  
***************************************************/

var background_url = "";
var img_yemei_url ="";
var server_url = "";
var zhuyuan_id = "";
var patient_xingming = "";
var document_name = "";
var start_page = 1;
var end_page = 1;
var document_type = "";
var document_id = "";
var document_relate_table = "";
var document_name = "";
var searchString = "";
var page_type = "";
var printer_type = "";
var print_direction = "";
var page_left_dis = "22mm";
var page_top_dis = "8mm";
var page_bottom_dis = "BottomMargin:8mm";
var page_right_dis = "RightMargin:12mm";
var have_yemei_yejiao = false;
var have_yizhu_qianming = false;
var have_image = false;
var part_print_mode = true;
var part_print_start_page = 0;
var hospital_name = "";
var title = "";
var patient_name = "";
var bingqu = "";
var chuanghao = "";
var zhuyuanhao = "";

var page_size_adjust = 0;
var page_number = "0";

var new_content_count=0;

function printControlInitial()
{
	current_url = window.location.href;
	var item = "";
	if(current_url.indexOf("Yizhuguanli/showChangqi")!=-1)
	{
		if(operator_type=="yishi")
		{
			item = '<input type="button" name="add_new" class="quick_menu_button" value="添加医嘱" />'+
						'<input type="button" name="add_multinew" class="quick_menu_button" value="添加套餐" />'+
						'<input type="button" name="start_all" class="quick_menu_button" value="执行所有" />'+
						'<input type="button" name="stop_all" class="quick_menu_button" value="停止所有" />'+
						'<input type="button" name="rebuilt_yizhu" class="quick_menu_button" value="重整所有" />';
		}
		else
		{
			item = '<input type="button" name="start_all" class="quick_menu_button" value="所有正确" />';
		}
		
	}
	else if(current_url.indexOf("Yizhuguanli/showLinshi")!=-1)
	{
		if(operator_type=="yishi")
		{
			item = '<input type="button" name="add_new" class="quick_menu_button" value="添加医嘱" />'+
						'<input type="button" name="add_multinew" class="quick_menu_button" value="添加套餐" />'+
						'<input type="button" name="add_supplement" class="quick_menu_button" value="补录医嘱" />'+
						'<input type="button" name="quxiao_all" class="quick_menu_button" value="取消所有" />';
		}
		else
		{
			item = '<input type="button" name="right_all" class="quick_menu_button" value="开始全部" />';
		}
	}
	$("body").append(
			'<div class="top_piaofu" >'+item+'<div class="top_piaofu_b" id="jiacu" title="加粗"></div><div class="top_piaofu_b" id="shangbiao" title="上标"></div><div class="top_piaofu_b" id="xiabiao" title="下标"></div><div class="top_piaofu_b" id="xieti" title="斜体"></div><div class="top_piaofu_b" id="font_color" title="更改文字颜色"></div><div class="top_piaofu_b"><input type="color" id="color_board" title="选择颜色"/></div><div class="top_piaofu_b" id="chexiao" title="撤销"></div><div class="top_piaofu_b" id="huifu" title="恢复"></div>'+
				'<form class="ajax_form" method="post" action="'+action_url+'" style="float:right; padding:0px;">'+
					// '<input type="button" id="add_media" class="quick_menu_button" value="插入图片" />'+
					'<input type="button" id="add_new_bingcheng" class="quick_menu_button" value="添加病程" />'+
					'<input type="button" id="add_new_hulijilu" class="quick_menu_button" value="添加记录" />'+
					'<input type="button" id="guifan_geshi" class="quick_menu_button" value="自动排版" />'+
					//'<input type="button" id="tongbu" class="quick_menu_button" value="自动书写" />'+
					'<input type="button" id="show_print_selector" class="quick_menu_button" value="接续打印" />'+
					'<input type="submit" id="submit" class="quick_menu_button_special" value=" 保 存 " />'+
					'<input type="hidden" name="zhuyuan_id" value="'+zhuyuan_id+'" />'+
					'<div name="ajax_dynamic_content"></div>'+
				'</form>'+
			'</div>'+
			'<a href="#bottom" class="go_bottom" alt="点我,快速浏览页面最下面的内容" title="点我,快速浏览页面最下面的内容"></a>'+
			'<a href="#" class="go_top" alt="点我,快速返回页面最顶端" title="点我,快速返回页面最顶端"></a>'
			);
	//监听鼠标坐标，控制顶部菜单：
	$(".top_piaofu").hide();
	$(document).mousemove(function(e){
		e = window.event || e;
		if(e.clientY<100)
		{
			$(".top_piaofu").slideDown();
		}
		else
		{
			if(hold_controller==false)
				$(".top_piaofu").slideUp();
		}
	});
	//快速跳转控制：
	//根据浏览位置隐藏或者显示快速跳转按钮：
	$(".go_top").hide();
	$(window.document).scroll(function () {
		if($(window.document).scrollTop() < 100)
			$(".go_top").hide();
		else
			$(".go_top").show();
			
		if($(window.document).scrollTop() >= $(document).height()-$(window).height())
			$(".go_bottom").hide();
		else
			$(".go_bottom").show();
	});

	$(".page").append('<div id="print_cover_top" class="view_cover"></div>');
	$(".page").append('<div id="print_cover_left" class="view_cover"></div>');
	$(".page").append('<div id="print_cover_right" class="view_cover"></div>');
	$(".page").append('<div id="print_cover_bottom" class="view_cover"></div>');
	$(".page").append('<div id="print_selector">请拖拽此区域以圈选打印范围</div>');
	$("#print_selector").hide();
	setPrintCover(0,0,0,0,"normal");
	if(current_url.indexOf("Yizhuguanli/showChangqi")!=-1)
	{
		yizhuChangqiFuc();
	}
	else if(current_url.indexOf("Yizhuguanli/showLinshi")!=-1)
	{
		yizhuLinshiFuc();
	}
	$("#add_new_bingcheng").click(function(){
		var bingcheng_date = $("#current_time").val();
		new_content_count++;
		$(".page").append(
			'<div class="blank" ></div>'+
			'<table id="new" border="0" cellpadding="0" cellspacing="0" class="content_table_without_border" database_table_name="zhuyuan_bingcheng_jilu">'+
				'<tr>'+
					'<td width="180"> <input type="text" id="onebingcheng_new'+new_content_count+'_record_time" name="onebingcheng_new'+new_content_count+'_record_time" class="ajax_input" value="'+bingcheng_date+'"/></td>'+
					'<td bingcheng_sub_leibie="日常病程记录" chafang_doctor="" class="info_center_title bingcheng_title" huanzhe_jiashu_qianzi="不需要" class="info_center_title bingcheng_title" width="400" contenteditable="true"><span name="bingcheng_title"><span id="chafang_doctor" name="onebingcheng_new'+new_content_count+'_chafang_doctor" class="hidden_info" contenteditable="true"></span><span id="bingcheng_sub_leibie" name="onebingcheng_new'+new_content_count+'_bingcheng_sub_leibie" class="hidden_info" contenteditable="true">日常病程记录</span><span id="huanzhe_jiashu_qianzi" name="onebingcheng_new'+new_content_count+'_huanzhe_jiashu_qianzi" class="hidden_info" contenteditable="true">日常病程记录</span></span></td>'+
					'<td width="140" class="info_area" ></td>'+
				'</tr>'+
				'<tr>'+
					'<td colspan="3" class="info_block"><div name="onebingcheng_new'+new_content_count+'_content" contenteditable="true"></div></td>'+
				'</tr>'+
			'</table>'+
			'<table id="2" border="0" cellpadding="0" cellspacing="0" class="content_table_without_border" database_table_name="zhuyuan_bingcheng_jilu">'+
				'<tr>'+
					'<td width="450px" ></td>'+
					'<td class="info_title" name="doctor_name"></td>'+
				'</tr>'+
			'</table>'+
			'</div>'
		);
		$('.ajax_input').datetimepicker({
			timeFormat: 'hh:mm',
			dateFormat: 'yy-mm-dd'
		});
		$('html, body').animate({scrollTop: $(document).height()}, 'fast');
		$('[contenteditable="true"]').addClass("editable");
	});
	
	$("#show_print_selector").click(function(){
		if($(this).val()=="接续打印")
		{
			$(this).val("取消遮盖");
			var temp_top = 0;
			$.ajaxSettings.async = false;
			$.getJSON(
				"http://"+server_url+"/tiantan_emr/Common/Data/getDayinJilu",
				{
					"document_id":document_id,
					"document_relate_table":document_relate_table,
					"print_type":"memory"
				},
				function(data){
					temp_top = data[0].part_print_top;
				}
			);
			$.ajaxSettings.async = true;
			$("#print_selector").show();
			var top_pos = $(document).scrollTop();
			if(temp_top!=0 && $(".page").height()>temp_top)
			{
				top_pos = temp_top;
				$(document).scrollTop(temp_top);
				$("#print_selector").css({'top':temp_top+"px"});
				var temp_height = $(".page").height()-temp_top;
				$("#print_selector").css({'height':temp_height+"px"});
			}
			var left_pos = $( "#print_selector" ).offset().left-$( ".page" ).offset().left;
			var width_pos = $( "#print_selector" ).width();
			var height_pos = $( "#print_selector" ).height();

			setPrintCover(top_pos,left_pos,width_pos,height_pos,"normal");
			
			//清空多余内容：
			//1. 隐藏显示时的边框
			$('[contenteditable="true"]').removeClass("editable");
			//2. 隐藏空的专科检查
			if($('[name="ruyuan_zhuanke_jiancha"]').text().length < 2)
			{
				$('#ruyuan_zhuanke_jiancha_title').hide();
				$('#ruyuan_zhuanke_jiancha_content').hide();
			}
			
			//计算打印区域的宽度：
			$( "#print_selector" ).resizable({
				maxWidth: $(".page").width(),
				maxHeight: $(".page").height(),
				helper: "ui-resizable-helper",
				handles:"n, e, s, w, ne, se, sw, nw",
				stop: function( event, ui ){
				var top_pos = $( "#print_selector" ).offset().top-$( ".page" ).offset().top;
				var left_pos = $( "#print_selector" ).offset().left-$( ".page" ).offset().left;
				var width_pos = $( "#print_selector" ).width();
				var height_pos = $( "#print_selector" ).height();
				setPrintCover(top_pos,left_pos,width_pos,height_pos,"normal");
				}
			});
			$( "#print_selector" ).draggable({
				containment: "parent",
				stop: function( event, ui ){
				var top_pos = ui.position.top;
				var left_pos = ui.position.left;
				var width_pos = $( "#print_selector" ).width();
				var height_pos = $( "#print_selector" ).height();
				setPrintCover(top_pos,left_pos,width_pos,height_pos,"normal");
				}
			});
		}
		else
		{
			$(this).val("接续打印");
			$("#print_selector").hide();
			hidePrintCover();
			$('[contenteditable="true"]').addClass("editable");
			$('#ruyuan_zhuanke_jiancha_title').show();
			$('#ruyuan_zhuanke_jiancha_content').show();
		}
	});
	
	$(".delete_one_bingcheng").click(function(){
		if (confirm('是否确认进行删除操作？'))
		{
			var post_param = {};
			post_param['bingcheng_id'] = $(this).attr("bingcheng_id");
			$.post("http://"+server_url+"/tiantan_emr/ZhuyuanYishi/Bingli/deleteOneBingcheng", post_param,function(data){
				window.setTimeout(auto_close,2000); 
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
			}, "json");
			//进行删除操作：
			$("[div_bingcheng_id='"+$(this).attr("bingcheng_id")+"']").remove();
		}
		else
			return false;
	});
}

function setPrintCover(top_pos,left_pos,width_pos,height_pos,print_type)
{
	if(top_pos!=0||left_pos!=0||width_pos!=0||height_pos!=0)
	{
		var page_width = $(".page").width();
		var page_height = $(".page").height();
		$("#print_cover_top").css({'display':'block','top':0,'left':0,'width':page_width,"height":top_pos});
		$("#print_cover_left").css({'display':'block','top':top_pos,'left':0,'width':left_pos,"height":height_pos+24});
		$("#print_cover_right").css({'display':'block','top':top_pos,'left':left_pos+width_pos+24,'width':page_width-width_pos-left_pos-24,"height":height_pos+24});
		$("#print_cover_bottom").css({'display':'block','top':top_pos+height_pos+24,'left':0,'width':page_width,"height":page_height-top_pos-height_pos-24});
		
		$("#print_selector").css({'top':top_pos});


	}
	
	//ajax上传打印记录；
	setDaYinJiLu(document_id,document_relate_table,top_pos,left_pos,width_pos,height_pos,print_type);
}

function setPrintCoverPrint(top_pos,left_pos,width_pos,height_pos)
{
	if(top_pos!=0||left_pos!=0||width_pos!=0||height_pos!=0)
	{
		top_pos = parseInt(top_pos);
		left_pos = parseInt(left_pos);
		width_pos = parseInt(width_pos);
		height_pos = parseInt(height_pos);

		var page_width = $(".page").width();
		var page_height = $(".page").height();

		//计算从第几页开始续打的:
		part_print_start_page = parseInt(top_pos/1040)+1;

		//遮罩高度修正：
		var top_refine = -0;
		var hieght_refine = 23; 
		var left_refine = -0;
		var width_refine = 23;
		//alert(top_refine);
		$("#print_cover_top").css({'display':'block','top':0,'left':0,'width':page_width,"height":top_pos+top_refine});
		$("#print_cover_left").css({'display':'block','top':top_pos+top_refine,'left':0,'width':left_pos,"height":height_pos+hieght_refine});
		$("#print_cover_right").css({'display':'block','top':top_pos+top_refine,'left':left_pos+width_pos+width_refine,'width':page_width-width_pos-width_refine-left_pos,"height":height_pos+hieght_refine});
		$("#print_cover_bottom").css({'display':'block','top':top_pos+top_refine+height_pos+hieght_refine,'left':0,'width':page_width,"height":page_height-(top_pos+top_refine)-(height_pos+hieght_refine)});
		
		$('td').each(function() {
			//判断此标签是否会落在遮罩范围内
			var top_distance = $(this).offset().top - top_pos - top_refine - height_pos - hieght_refine;
			var bottom_distance = $(this).offset().top+$(this).height() - top_pos;
			//顶部在遮罩区域下
			if(top_distance>0)
			{
				$(this).css("color","white");
				$(this).css("border","white");
			}
			//底部在遮罩区域上
			if(bottom_distance<0)
			{
				$(this).css("color","white");
				$(this).css("border","white");
			}
		});
		
		$('p').each(function() {
			//判断此标签是否会落在遮罩范围内
			var top_distance = $(this).offset().top - top_pos - top_refine - height_pos - hieght_refine;
			var bottom_distance = $(this).offset().top+$(this).height() - top_pos;
			//顶部在遮罩区域下
			if(top_distance>0)
			{
				$(this).css("color","white");
				$(this).css("border","white");
			}
			//底部在遮罩区域上
			if(bottom_distance<0)
			{
				$(this).css("color","white");
				$(this).css("border","white");
			}
		});
	}
}

function hidePrintCover()
{
	$("#print_cover_top").hide();
	$("#print_cover_left").hide();
	$("#print_cover_right").hide();
	$("#print_cover_bottom").hide();
	//ajax上传打印记录；
	setDaYinJiLu(document_id,document_relate_table,"0","0","0","0","normal");
}

function showPrintCover()
{
	$(".page").append('<div id="print_cover_top" class="print_cover"></div>');
	$(".page").append('<div id="print_cover_left" class="print_cover"></div>');
	$(".page").append('<div id="print_cover_right" class="print_cover"></div>');
	$(".page").append('<div id="print_cover_bottom" class="print_cover"></div>');
	getDaYinJiLu(document_id,document_relate_table);
}

function controlPrinterByLodop()
{
	if(document_type=="")
		document_type = getCurrentDocumentType();

	//调用部分打印函数
	if(document_id!=""&&document_relate_table!="")
		showPrintCover();

	var page_hieght = 1;
	
	if(document_type.toLowerCase().indexOf("chufang")!=-1||document_type.toLowerCase().indexOf("shenqing")!=-1)
	{
		page_left_dis = "15mm";
		page_top_dis = "5mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+5)+"mm";
		page_right_dis = "RightMargin:5mm";
		page_height = 1200;
		printer_type = "A4";
		page_type = "A4";
		print_direction = "1";
	}
	else if(document_type.toLowerCase().indexOf("showzhikongtu")!=-1)
	{
		page_left_dis = "0mm";
		page_top_dis = "8mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+8)+"mm";
		page_right_dis = "RightMargin:12mm";
		page_height = 1200;
		printer_type = "A4";
		page_type = "A4";
		print_direction = "2";
	}
	else if(document_type.toLowerCase().indexOf("binganshouye")!=-1)
	{
		page_left_dis = "16mm";
		page_top_dis = "8mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+12)+"mm";
		page_right_dis = "RightMargin:12mm";
		page_height = 1200;
		printer_type = "A4";
		page_type = "16K";
		print_direction = "1";
	}
	else if(document_type.toLowerCase().indexOf("sancedan")!=-1)
	{
		page_left_dis = "15mm";
		page_top_dis = "0mm";
		page_bottom_dis = "3000mm";
		page_right_dis = "3000mm";
		page_height = 1200;
		printer_type = "hushizhan";
		page_type = "A4";
		print_direction = "1";
	}
	else if(document_type.toLowerCase().indexOf("peiyaoka")!=-1||document_type.toLowerCase().indexOf("shuyeka")!=-1||document_type.toLowerCase().indexOf("hulijilu")!=-1)
	{
		page_left_dis = "15mm";
		page_top_dis = "5mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+5)+"mm";
		page_right_dis = "RightMargin:5mm";
		page_height = 750;
		printer_type = "A4";
		page_type = "A4";
		print_direction = "1";
	}
	else if(document_type.toLowerCase().indexOf("yizhu")!=-1)
	{
		page_left_dis = "14mm";
		page_top_dis = "50mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+64)+"px";
		page_right_dis = "RightMargin:12mm";
		page_height = 1200;
		printer_type = "A4";
		page_type = "A4";
		print_direction = "1";
	}
	//以下为打印机功能性配置项
	else if(document_type.toLowerCase().indexOf("dashenghua")!=-1)
	{
		page_left_dis = "22mm";
		page_top_dis = "0mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+8)+"mm";
		page_right_dis = "RightMargin:12mm";
		page_height = 1200;
		printer_type = "dashenghua";
		page_type = "A4";
		print_direction = "1";
	}
	else if(document_type.toLowerCase().indexOf("A4_report")!=-1)
	{
		page_left_dis = "22mm";
		page_top_dis = "0mm";
		page_bottom_dis = "BottomMargin:8mm";
		page_right_dis = "RightMargin:12mm";
		page_height = 1200;
		printer_type = "xuechanggui";
		page_type = "A4";
		print_direction = "1";
	}
	else if(document_type.toLowerCase().indexOf("daoyindan")!=-1)
	{
		page_left_dis = "22mm";
		page_top_dis = "8mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+8)+"mm";
		page_right_dis = "RightMargin:14mm";
		page_height = 1200;
		printer_type = "A4";
		page_type = "A4";
		print_direction = "1";
	}
	else if(document_type.toLowerCase().indexOf("yingxiang_table")!=-1)
	{
		page_left_dis = "26mm";
		page_top_dis = "10mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+14)+"mm";
		page_right_dis = "RightMargin:14mm";
		page_height = 1200;
		printer_type = "A4";
		page_type = "A4";
		print_direction = "1";
	}
	else if(document_type.toLowerCase().indexOf("viewgroupprint")!=-1)
	{
		page_left_dis = "15mm";
		page_top_dis = "5mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+5)+"mm";
		page_right_dis = "RightMargin:5mm";
		page_height = 300;
		printer_type = "A4";
		page_type = "A4";
		print_direction = "2";
	}
	else if(document_type.toLowerCase().indexOf("gerentijianbaogao")!=-1)
	{
		page_left_dis = "15mm";
		page_top_dis = "5mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+25)+"mm";
		page_right_dis = "RightMargin:25mm";
		page_height = 1200;
		printer_type = "A4";
		page_type = "A4";
		print_direction = "1";
	}
	else if(document_type.toLowerCase().indexOf("xinfeng")!=-1)
	{
		page_left_dis = "10mm";
		page_top_dis = "10mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+10)+"mm";
		page_right_dis = "RightMargin:10mm";
		page_height = 1200;
		printer_type = "A4";
		page_type = "A4";
		print_direction = "1";
	}
	else if(document_type.toLowerCase().indexOf("printreportlist")!=-1)
	{
		page_left_dis = "5mm";
		page_top_dis = "5mm";
		page_bottom_dis = "BottomMargin:"+(page_size_adjust+10)+"mm";
		page_right_dis = "RightMargin:10mm";
		page_height = 1200;
		printer_type = "A4";
		page_type = "A4";
		print_direction = "2";
	}
	else
	{
		page_left_dis = "22mm";
		page_top_dis = "90.5px";
		//page_bottom_dis = "BottomMargin:"+(page_size_adjust+29)+"mm";
		page_bottom_dis = "272.5mm";
		page_right_dis = "RightMargin:18mm";
		page_height = 1200;
		printer_type = "A4";
		page_type = "A4";
		print_direction = "1";
	}
	$.importLodop();
}

//页面设计函数，控制页眉页脚、打印格式、打印方式等功能
function pageDesign()
{
	if($.checkIsInstall())
	{
		if(have_image==true)
			$("body").parent().creatHtmPrint({is_new_LODOP:true,top:page_top_dis,left:page_left_dis,width:page_right_dis,height:page_bottom_dis});
		else
			$.creatUrlPrint({is_new_LODOP:true,top:page_top_dis,left:page_left_dis,width:page_right_dis,height:page_bottom_dis,print_url:window.location.href});
		
		//再次调用部分打印函数以更新页眉页脚参数
		if(document_id!=""&&document_relate_table!="")
			showPrintCover();
	
		if(document_type.toLowerCase().indexOf("showsancedan")!=-1 || document_type.toLowerCase().indexOf("showzhikongtu")!=-1)
			have_image = true;
		else
			have_image = false;

		if(have_yizhu_qianming == true&&part_print_mode==false)
			yemeiyejiaoYizhu();
		else if(part_print_mode==false)
			yemeiyejiaoBingli(patient_xingming,zhuyuan_id,document_name);
		else if(document_name!="")
			yemeiyejiaoBingliPrintMode(patient_xingming,zhuyuan_id,document_name);
			
		setPageSizeAndOrient(print_direction, page_type, 0);
		//setPrinterByName(printer_type, 0);
		if(have_image==true)
			addImage(image_url,0);
		if(img_yemei_url != "")
		{
			$.addImageYemei({img_url:img_yemei_url});
		}
	}
}

//增加病历的页眉页脚
function yemeiyejiaoBingli(patient_xingming, zhuyuan_id,document_name){
	var yemei_str = "   患者:"+patient_xingming;
	
	for(i=0;i<30-document_name.length;i++)
	{
		yemei_str += " ";
	}
	
	yemei_str += document_name;
	yemei_str += "                   " +
							 "住院号:"+zhuyuan_id;

	var yejiao_str = "   主任医师签字" +
					 "                        " +
					 "主治医师签字" +
					 "                      " +
					 "住院医师签字";
	//添加页眉
	$.addYemei({content:yemei_str});
	
	//添加页号
	$.addYehao();
}

//增加病历的页眉页脚-局部打印状态
function yemeiyejiaoBingliPrintMode(patient_xingming, zhuyuan_id,document_name){
	//添加页号
	$.addYehaoLimitedPage({start_page:(part_print_start_page)});
}

//增加医嘱的页眉页脚
function yemeiyejiaoYizhu(){
	var yejiao_str = "   医师签字" +
					 "                        " +
					 "            " +
					 "        护士签字";
	//添加页眉
	$.addYizhuYemei({hospital_name:hospital_name,title:title,patient_name:patient_name,bingqu:bingqu,chuanghao:chuanghao,zhuyuanhao:zhuyuanhao});
	//添加页脚
	$.addYejiao({content:yejiao_str});
	//添加页号
	$.addYehao();
}

//获取当前的文档类型
function getCurrentDocumentType()
{
	var strUrl=window.location.href;
 
	var arrUrl=strUrl.split("/");
	var temp = 0;
	for(i=0;i<arrUrl.length;i++)
	{
		if(arrUrl[i]=="tiantan_emr")
		{
			temp = i;
			document_type = arrUrl[temp+1]+arrUrl[temp+2]+arrUrl[temp+3];
			break;
		}
	}
	for(i=0;i<arrUrl.length;i++)
	{
		if(arrUrl[i]=="table_name"&&strUrl.toLowerCase().indexOf("shenqing")==-1)
		{
			temp = i;
			document_type = arrUrl[temp]+arrUrl[temp+1];
			document_type = document_type.replace("jianyan_table_","");
			break;
		}
	}
	return document_type;
}

//得到打印记录
function getDaYinJiLu(document_id,document_relate_table)
{
	$.ajaxSettings.async = false;
	$.getJSON(
		"http://"+server_url+"/tiantan_emr/Common/Data/getDayinJilu",
		{
			"document_id":document_id,
			"document_relate_table":document_relate_table
		},
		function(data){
			if(document_relate_table=="yizhu_linshi"||document_relate_table=="yizhu_changqi")
			{
				if(data[0].part_print_top==0&&data[0].part_print_left==0&&data[0].part_print_width==0&&data[0].part_print_height==0)
				{
					part_print_mode = false;
				}
				else if(document_relate_table=="yizhu_linshi")
				{
					if(parseInt(data[0].part_print_left)>0)
						data[0].part_print_left = parseInt(data[0].part_print_left)+1;
					data[0].part_print_width = parseInt(data[0].part_print_width);
					data[0].part_print_top = parseInt(data[0].part_print_top)-138;
					part_print_mode = true;
				}
				else if(document_relate_table=="yizhu_changqi")
				{
					data[0].part_print_left = parseInt(data[0].part_print_left)-4;
					data[0].part_print_width = parseInt(data[0].part_print_width)+4;
					data[0].part_print_top = parseInt(data[0].part_print_top)-138;
					part_print_mode = true;
				}
				setPrintCoverPrint(data[0].part_print_top,data[0].part_print_left,data[0].part_print_width,data[0].part_print_height);
			}
			else
			{
				setPrintCoverPrint(data[0].part_print_top,data[0].part_print_left,data[0].part_print_width,data[0].part_print_height);
				if(data[0].part_print_top==0&&data[0].part_print_left==0&&data[0].part_print_width==0&&data[0].part_print_height==0)
					part_print_mode = false;
				else
					part_print_mode = true;
			}

			if(document_relate_table=="zhuyuan_fuzhujiancha")
			{
				part_print_mode = true;
			}
		}
	);
}

//设置打印记录
function setDaYinJiLu(document_id,document_relate_table,part_print_top,part_print_left,part_print_width,part_print_height,print_type)
{
	$.get(
		"http://"+server_url+"/tiantan_emr/Common/Data/setDayinJilu",
		{
			"document_id":document_id,
			"document_relate_table":document_relate_table,
			"part_print_top":part_print_top,
			"part_print_left":part_print_left,
			"part_print_width":part_print_width,
			"part_print_height":part_print_height,
			"print_type":print_type
		}, 
		function(data){
			//alert(data);
			//alert(document_id+"|"+document_type+"|"+document_relate_table+"|"+part_print_top+part_print_left+part_print_width+part_print_height);
		}
	);
}

//设置打印状态，主要用于检验科标识是否打印完毕
function setDaYinState(document_id,document_relate_table,print_state)
{
	$.get(
		"http://"+server_url+"/tiantan_emr/Common/Data/setDaYinState",
		{
			"document_id":document_id,
			"document_relate_table":document_relate_table,
			"print_state":print_state
		}, 
		function(data){
			//alert(data);
			//alert(document_id+"|"+document_type+"|"+document_relate_table+"|"+part_print_top+part_print_left+part_print_width+part_print_height);
		}
	);
}