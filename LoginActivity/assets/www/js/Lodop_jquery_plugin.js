// JavaScript Document
var LODOP = new Array();
//var print_page_percent = "80%";//16K
var print_page_percent = "89%";//A4

//标记护理记录
var have_hulijilu_qianming = false;

/**
 +------------------------------------------------------------------------------
 * jQuery Plug-in
 +------------------------------------------------------------------------------
 */
;(function(){
	//添加对象方法
	$.fn.extend({
		/**
		 +------------------------------------------------------------------------------
		 * 增加 Html 打印项
		 +------------------------------------------------------------------------------
		 */
		"creatHtmPrint" : function(options){
			options = $.extend({
				is_new_LODOP:false,
				object_id:"LODOP_OB",
				embed_id:"LODOP_EM",
				lodop_id:0,
				top:"8mm",
				left:"22mm",
				width:"RightMargin:12mm",
				height:"BottomMargin:8mm",
				print_page_percent:print_page_percent,
				print_setting_name:null
			},options);
			
			LODOP[options.lodop_id]=getLodop(document.getElementById(options.object_id),document.getElementById(options.embed_id));
			if(options.is_new_LODOP)
			{
				LODOP[options.lodop_id].PRINT_INIT(options.print_setting_name);
			}
			LODOP[options.lodop_id].ADD_PRINT_HTM(options.top,options.left,options.width,options.height,$(this).html());
			LODOP[options.lodop_id].SET_PRINT_MODE("PRINT_PAGE_PERCENT",options.print_page_percent);
			
			return this;
		},
		/**
		 +------------------------------------------------------------------------------
		 * 增加 table 打印项
		 +------------------------------------------------------------------------------
		 */
		"creatTablePrint" : function(options){
			options = $.extend({
				is_new_LODOP:false,
				object_id:"LODOP_OB",
				embed_id:"LODOP_EM",
				lodop_id:0,
				top:"8mm",
				left:"22mm",
				width:"RightMargin:12mm",
				height:"BottomMargin:8mm",
				print_page_percent:print_page_percent,
				print_setting_name:null
			},options);
			
			LODOP[options.lodop_id]=getLodop(document.getElementById(options.object_id),document.getElementById(options.embed_id));
			if(options.is_new_LODOP)
			{
				LODOP[options.lodop_id].PRINT_INIT(options.print_setting_name);
			}
			LODOP[options.lodop_id].ADD_PRINT_TABLE(options.top,options.left,options.width,options.height,$(this).html());
			LODOP[options.lodop_id].SET_PRINT_MODE("PRINT_PAGE_PERCENT",options.print_page_percent);
			
			return this;
		}
	});
	//添加全局函数
	$.extend({
		/**
		 +------------------------------------------------------------------------------
		 * 导入 Lodop Object
		 +------------------------------------------------------------------------------
		 */
		"importLodop" : function(options){
			options = $.extend({
				object_id:"LODOP_OB",
				embed_id:"LODOP_EM",
				importLabel:"body",
				width:0,
				height:0,
				caption:"",
				border:"",
				color:""
			},options);
			
			var lodop_object = "<object id='"+options.object_id+"' classid='clsid:2105C259-1E0C-4534-8141-A753534CB4CA' width='"+options.width+"' height='"+options.height+"'>";
			
			lodop_object += (options.caption.length > 0) ? "<param name='Caption' value='"+options.caption+"'>" : "";
			lodop_object += (options.border.length > 0) ? "<param name='Border' value='"+options.border+"'>" : "";
			lodop_object += (options.color.length > 0) ? "<param name='Color' value='"+options.color+"'>" : "";
				
			if(options.embed_id.length > 0){
				lodop_object += "<embed id='"+options.embed_id+"' type='application/x-print-lodop' width='"+options.width+"' height='"+options.height+"'"+
								((options.border.length > 0) ? ("border='"+options.border+"'") : "")+
								((options.color.length > 0) ? ("color='"+options.color+"'") : "")+
								"></embed>";
			}
			lodop_object += "</object>";
			
			if($("#"+options.object_id).size() < 1 || $("#"+options.embed_id).size() < 1)
			{
				if(have_hulijilu_qianming==true)
					$(options.importLabel).after(lodop_object);
				else
					$(options.importLabel).after(lodop_object);
			}
		},
		/**
		 +------------------------------------------------------------------------------
		 * 检查是否已安装 Lodop 控件
		 +------------------------------------------------------------------------------
		 */
		"checkIsInstall" : function(options){
			options = $.extend({
				object_id:"LODOP_OB",
				embed_id:"LODOP_EM",
				lodop_id:0
			},options);
			
			try{
				LODOP[options.lodop_id]=getLodop(document.getElementById(options.object_id),document.getElementById(options.embed_id));
				if ((LODOP[options.lodop_id]!=null)&&(typeof(LODOP[options.lodop_id].VERSION)!="undefined")&&(typeof(LODOP[options.lodop_id].VERSION)!="unknown"))
					return true;
				else
					return false;
				//alert("本机已成功安装过Lodop控件!\n  版本号:"+LODOP[options.lodop_id].VERSION);
			}catch(err){
				//alert("Error:本机未安装或需要升级!");
				return false;
			}
		},
		/**
		 +------------------------------------------------------------------------------
		 * 增加 URL 打印项
		 +------------------------------------------------------------------------------
		 */
		"creatUrlPrint" : function(options){
			options = $.extend({
				is_new_LODOP:false,
				object_id:"LODOP_OB",
				embed_id:"LODOP_EM",
				lodop_id:0,
				top:"10mm",
				left:"22mm",  
				width:"RightMargin:12mm",
				height:"BottomMargin:14mm",
				print_page_percent:print_page_percent,
				print_setting_name:null,
				print_url:""
			},options);
			
			LODOP[options.lodop_id]=getLodop(document.getElementById(options.object_id),document.getElementById(options.embed_id));
			if(options.is_new_LODOP)
			{
				LODOP[options.lodop_id].PRINT_INIT(options.print_setting_name);
			}
			if(options.print_url != "")
			{
				LODOP[options.lodop_id].ADD_PRINT_URL(options.top,options.left,options.width,options.height,options.print_url);
				LODOP[options.lodop_id].SET_PRINT_MODE("PRINT_PAGE_PERCENT",options.print_page_percent);
				LODOP[options.lodop_id].SET_SHOW_MODE("NP_NO_RESULT",true);
			}
			else
			{
				alert("打印页面URL错误!");
			}
		},
		/**
		 +------------------------------------------------------------------------------
		 * 增加 TABLE 打印项
		 +------------------------------------------------------------------------------
		 */
		"creatWTablePrint" : function(options){
			options = $.extend({
				is_new_LODOP:false,
				object_id:"LODOP_OB",
				embed_id:"LODOP_EM",
				lodop_id:0,
				top:"10mm",
				left:"22mm",  
				width:"RightMargin:12mm",
				height:"BottomMargin:14mm",
				fd_top:0,
				sd_top:0,
				print_page_percent:print_page_percent,
				print_setting_name:null,
				print_table_title:"",
				print_table_head:"",
				print_table:""
			},options);
			
			LODOP[options.lodop_id]=getLodop(document.getElementById(options.object_id),document.getElementById(options.embed_id));
			if(options.is_new_LODOP)
			{
				LODOP[options.lodop_id].PRINT_INIT(options.print_setting_name);
			}
			if(options.print_table != "")
			{
				var table_head_top = parseInt(options.top.replace("px",""))+options.fd_top;
				var table_body_top = parseInt(options.top.replace("px",""))+options.sd_top;
				LODOP[options.lodop_id].ADD_PRINT_TABLE(options.top,options.left,options.width,options.height,options.print_table_title);
				LODOP[options.lodop_id].ADD_PRINT_TABLE(table_head_top+"px",options.left,options.width,options.height,options.print_table_head);
				LODOP[options.lodop_id].ADD_PRINT_TABLE(table_body_top+"px",options.left,options.width,options.height,options.print_table);
				LODOP[options.lodop_id].SET_PRINT_MODE("PRINT_PAGE_PERCENT",options.print_page_percent);
				LODOP[options.lodop_id].SET_SHOW_MODE("NP_NO_RESULT",true);
			}
			else
			{
				alert("打印页面URL错误!");
			}
		},
		/**
		 +------------------------------------------------------------------------------
		 * 增加 条形码 打印项
		 +------------------------------------------------------------------------------
		 */
		"creatBarcodePrint" : function(options){
			options = $.extend({  
				is_new_LODOP:false,
				object_id:"LODOP_OB",
				embed_id:"LODOP_EM",
				lodop_id:0,
				top:"2mm",  
				left:"190mm",  
				width:"45mm",
				height:"16mm",
				code_type:"128A",
				code_value:"000000000000",
				is_show_chart:false,
				print_setting_name:null
			},options);
			
			LODOP[options.lodop_id]=document.getElementById(options.object_id);
			if(options.is_new_LODOP)
			{
				LODOP[options.lodop_id].PRINT_INIT(options.print_setting_name);
			}
			LODOP[options.lodop_id].ADD_PRINT_BARCODE(options.top,options.left,options.width,options.height,options.code_type,options.code_value);
			if(options.is_show_chart)
			{
				LODOP[options.lodop_id].SHOW_CHART();
			}
		},
		"setPrintStyle":function(options){
			options = $.extend({
				lodop_id:0,
				FontName:"",
				FontSize:"",
				FontColor:"",
				Bold:"",
				Alignment:""
			},options);
			
			for(var prop in options)
			{
				if(options[prop].length > 0 && prop != "lodop_id")
				{
					LODOP[options.lodop_id].SET_PRINT_STYLE(prop,options[prop]);
				}
			}
		},
		"addYehao":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:2,
				FontSize:13.5,
				content:"",
				top:"1150",
				left:"113mm",
				width:"RightMargin:83mm",
				height:"BottomMargin:0"
			},options);
			
			if(page_number!="0")
			{
			}
			else
			{
				LODOP[options.lodop_id].ADD_PRINT_TEXT(options.top,options.left,options.width,options.height,"第#页");
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			}
				
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", options.FontSize);
		},
		"addYehao_v4":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:2,
				FontSize:12,
				content:"",
				top:"36mm",
				left:"113mm",
				width:"RightMargin:83mm",
				height:"BottomMargin:0"
			},options);
			
			if(page_number!="0")
			{
			}
			else
			{
				LODOP[options.lodop_id].ADD_PRINT_TEXT(options.top,options.left,options.width,options.height,"(第#页)");
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontName","华文楷体");
			}
				
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", options.FontSize);
		},
		"addYehaoLimitedPage":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:2,
				FontSize:13.5,
				content:"",
				top:"1150",
				left:"113mm",
				width:"RightMargin:83mm",
				height:"BottomMargin:0"
			},options);
			
			if(page_number!="0")
			{
			}
			else
			{
				LODOP[options.lodop_id].ADD_PRINT_TEXT(options.top,options.left,options.width,options.height,"第#页");
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
				
				var limit_page = ""+options.start_page;
				
				for(count=options.start_page-1;count>0;count--)
				{
					limit_page = limit_page+","+count;
				}
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"PageUnIndex",limit_page);

			}
				
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", options.FontSize);
		},
		"addYehaoLimitedPage_v4":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:2,
				FontSize:12,
				content:"",
				top:"36mm",
				left:"113mm",
				width:"RightMargin:83mm",
				height:"BottomMargin:0"
			},options);
			
			if(page_number!="0")
			{
			}
			else
			{
				LODOP[options.lodop_id].ADD_PRINT_TEXT(options.top,options.left,options.width,options.height,"(第#页)");
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontName","华文楷体");
				if(parent.bingli_yema_lianxu_fangshi=="1"&&document_type.toLowerCase().indexOf("bingchengjilu")!=-1)
				{
					var temp_start_yema = parseInt(parent.ruyuan_jilu_yeshu)+1;
					LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"StartNumberValue",temp_start_yema);
				}
				var limit_page = ""+options.start_page;
				
				for(count=options.start_page-1;count>0;count--)
				{
					limit_page = limit_page+","+count;
				}
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"PageUnIndex",limit_page);

			}
				
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", options.FontSize);
		},
		"addYemei":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:1,
				FontSize:12,
				content:"",
				top:"12mm",  
				left:"22mm",  
				width:"RightMargin:0mm",
				lineWidth:"RightMargin:10mm",
				height:"5mm",
				lineTop:"17mm"
			},options);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT(options.top,options.left,options.width,options.height,options.content);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", options.FontSize);
			LODOP[options.lodop_id].ADD_PRINT_LINE(options.lineTop,options.left,options.lineTop,options.lineWidth,0,1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
		},
		"addYemei_v2":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:1,
				FontSize:12,
				content:"",
				top:"12mm",  
				left:"22mm",  
				width:"RightMargin:0mm",
				lineWidth:"RightMargin:10mm",
				height:"5mm",
				lineTop:"17mm"
			},options);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT(options.top,"80mm",options.width,options.height,options.hospital_name);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", "22");
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("25mm",options.left,options.width,options.height,options.content);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", options.FontSize);
			
			LODOP[options.lodop_id].ADD_PRINT_LINE("30mm",options.left,"30mm",options.lineWidth,0,1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
		},
		"addYemei_v3":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:1,
				FontSize:12,
				content:"",
				top:"8mm",  
				left:"15mm",  
				width:"RightMargin:0mm",
				lineWidth:"RightMargin:10mm",
				height:"5mm",
				lineTop:"17mm"
			},options);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT(options.top,"85mm",options.width,options.height,options.hospital_name);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", "14");

			LODOP[options.lodop_id].ADD_PRINT_LINE("13mm",options.left,"13mm",options.lineWidth,0,1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
		},
		"addYemei_v4":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:1,
				FontSize:12,
				content:"",
				top:"6mm",  
				left:"15mm",  
				width:"RightMargin:-25mm",
				lineWidth:"RightMargin:10mm",
				height:"5mm",
				lineTop:"17mm"
			},options);
			LODOP[options.lodop_id].ADD_PRINT_TEXT("12mm","85mm",options.width,options.height,options.hospital_name);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 18);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontName","华文楷体");

			LODOP[options.lodop_id].ADD_PRINT_TEXT("24mm","100mm",options.width,options.height,options.document_name);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", 1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 21);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"Bold", 1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontName","华文楷体");

			LODOP[options.lodop_id].ADD_PRINT_TEXT("36mm","15mm",options.width,options.height,options.content);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 12);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontName","华文楷体");
			if(options.line_style!="no_line")
			{
				LODOP[options.lodop_id].ADD_PRINT_LINE("41mm","15mm","41mm",options.lineWidth,0,1);
			}
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
		},
		"addYemeiLimitedPage":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:1,
				FontSize:12,
				content:"",
				top:"12mm",  
				left:"22mm",  
				width:"RightMargin:0mm",
				lineWidth:"RightMargin:10mm",
				height:"5mm",
				lineTop:"17mm"
			},options);
			
			if(page_number!="0")
			{
			}
			else
			{
			
				var limit_page = ""+options.start_page;
				
				for(count=options.start_page-1;count>0;count--)
				{
					limit_page = limit_page+","+count;
				}
				
				LODOP[options.lodop_id].ADD_PRINT_TEXT(options.top,options.left,options.width,options.height,options.content);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"PageUnIndex",limit_page);

				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", options.FontSize);
				LODOP[options.lodop_id].ADD_PRINT_LINE(options.lineTop,options.left,options.lineTop,options.lineWidth,0,1);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"PageUnIndex",limit_page);
			}
		},
		"addYemeiLimitedPage_v4":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:1,
				FontSize:12,
				content:"",
				top:"6mm",  
				left:"15mm",  
				width:"RightMargin:-25mm",
				lineWidth:"RightMargin:10mm",
				height:"5mm",
				lineTop:"17mm"
			},options);
			
			if(page_number!="0")
			{
			}
			else
			{
			
				var limit_page = ""+options.start_page;
				
				for(count=options.start_page-1;count>0;count--)
				{
					limit_page = limit_page+","+count;
				}
				
				LODOP[options.lodop_id].ADD_PRINT_TEXT("12mm","85mm",options.width,options.height,options.hospital_name);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 18);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontName","华文楷体");
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"PageUnIndex",limit_page);

				LODOP[options.lodop_id].ADD_PRINT_TEXT("24mm","100mm",options.width,options.height,options.document_name);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", 1);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 21);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"Bold", 1);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontName","华文楷体");
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"PageUnIndex",limit_page);

				LODOP[options.lodop_id].ADD_PRINT_TEXT("36mm","15mm",options.width,options.height,options.content);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 12);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontName","华文楷体");
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"PageUnIndex",limit_page);

				LODOP[options.lodop_id].ADD_PRINT_LINE("41mm","15mm","41mm",options.lineWidth,0,1);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"PageUnIndex",limit_page);
			}
		},
		"addHuliJiluYemei":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:1,
				FontSize:12,
				hospital_name:"",
				title:"",
				patient_name:"",
				bingqu:"",
				chuanghao:"",
				zhuyuanhao:"",
				width:"RightMargin:0mm",
				height:"5mm"
			},options);
			
			//计算医院名称长度，调整居中效果:
			var str_length = options.hospital_name.length;
			var left_pos = (23.5-str_length)/2*10.5;
			//医院名称
			LODOP[options.lodop_id].ADD_PRINT_TEXT("11mm",left_pos+"mm",options.width,options.height,options.hospital_name);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 26);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"Bold", 1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			//档案名称
			LODOP[options.lodop_id].ADD_PRINT_TEXT("23mm","85mm",options.width,options.height,options.title);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 22);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"Bold", 1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);

			/*LODOP[options.lodop_id].ADD_PRINT_TEXT("35mm","20mm",options.width,options.height,
			"姓名:"+options.patient_name);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 14);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);

			LODOP[options.lodop_id].ADD_PRINT_TEXT("35mm","70mm",options.width,options.height,
			"性别:"+options.patient_xingbie);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 14);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("35mm","100mm",options.width,options.height,
			"年龄:"+options.patient_nianling+"");
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 14);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("35mm","130mm",options.width,options.height,
			"病区:"+options.bingqu);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 14);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("35mm","170mm",options.width,options.height,
			"病床号:"+options.chuanghao);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 14);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("42mm","20mm",options.width,options.height,
			"住院号:"+options.zhuyuanhao);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 14);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("42mm","70mm",options.width,options.height,
			"诊断:"+options.zhenduan_info);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 14);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			//绘制表头表格:
			var img_label = "<img width='750px' height='130px' style='position:absolute;' transcolor='#FFFFFF' src='/tiantan_emr/Public/runtime_image/hulijilu_table_title.jpg'/>";
			LODOP[options.lodop_id].ADD_PRINT_IMAGE("51.5mm","14mm","750px","130px",img_label);*/
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
		},
		"addYizhuYemei":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:1,
				FontSize:12,
				hospital_name:"",
				title:"",
				patient_name:"",
				patient_xingbie:"",
				patient_nianling:"",
				bingqu:"",
				chuanghao:"",
				zhuyuanhao:"",
				width:"RightMargin:0mm",
				height:"5mm"
			},options);
			
			//计算医院名称长度，调整居中效果:
			var str_length = options.hospital_name.length;
			var left_pos = (23.5-str_length)/2*10.5;
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("21mm",left_pos+"mm",options.width,options.height,options.hospital_name);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 26);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"Bold", 1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("33mm","85mm",options.width,options.height,options.title);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 22);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"Bold", 1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("45mm","13mm",options.width,options.height,
			"姓名:"+options.patient_name);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 12);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_LINE("50.5mm","23mm","50.5mm","43mm",0,1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("45mm","46mm",options.width,options.height,			
			"性别:"+options.patient_xingbie);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 12);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_LINE("50.5mm","52mm","50.5mm","60mm",0,1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("45mm","64mm",options.width,options.height,
			"年龄:"+options.patient_nianling);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 12);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_LINE("50.5mm","74mm","50.5mm","88mm",0,1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("45mm","91mm",options.width,options.height,


			"科室:"+options.bingqu);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 12);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_LINE("50.5mm","101mm","50.5mm","125mm",0,1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("45mm","128mm",options.width,options.height,
			"病室床号:"+options.chuanghao);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 12);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_LINE("50.5mm","147mm","50.5mm","163.5mm",0,1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_TEXT("45mm","166mm",options.width,options.height,
			"住院号:"+options.zhuyuanhao);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", 12);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			
			LODOP[options.lodop_id].ADD_PRINT_LINE("50.5mm","181mm","50.5mm","208mm",0,1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			

			//LODOP[options.lodop_id].ADD_PRINT_LINE(options.lineTop,options.left,options.lineTop,options.lineWidth,0,1);
			//LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			//LODOP[options.lodop_id].ADD_PRINT_LINE(options.lineTop,options.left,options.lineTop,options.lineWidth,0,1);
			//LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
		},
		"addYejiao":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:1,
				FontSize:12,
				content:"",
				top:"1146",
				left:"22mm",
				width:"RightMargin:0mm",
				height:"BottomMargin:10mm",
				lineWidth:"RightMargin:22mm",
				lineTop:"1162"
			},options);
			LODOP[options.lodop_id].ADD_PRINT_TEXT(options.top,options.left,options.width,options.height,options.content);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", options.FontSize);
			LODOP[options.lodop_id].ADD_PRINT_LINE(options.lineTop,options.left,options.lineTop,options.lineWidth,0,1);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
			if(page_number!="0")
			{
				LODOP[options.lodop_id].ADD_PRINT_TEXT("1166","113mm",options.width,options.height,"第"+page_number+"页");
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
				LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"FontSize", "13.5");
			}
		},
		"addImageYemei":function(options){
			options = $.extend({
				lodop_id:0,
				ItemType:1,
				FontSize:12,
				img_url:"",
				top:"20",
				left:"700",
				width:"RightMargin:0mm",
				height:"1200"
			},options);
			
			var img_label = "<img style='position:absolute;' transcolor='#FFFFFF' src='" + options.img_url + "' />";
			LODOP[options.lodop_id].ADD_PRINT_IMAGE(options.top,options.left,options.width,options.height,img_label);
			LODOP[options.lodop_id].SET_PRINT_STYLEA(0,"ItemType", options.ItemType);
		}
	});
})(jQuery);

/**
 +------------------------------------------------------------------------------
 * LodopFuncs.js
 +------------------------------------------------------------------------------
 */
function getLodop(oOBJECT,oEMBED){
/**
 +------------------------------------------------------------------------------
 * 本函数根据浏览器类型决定采用哪个对象作为控件实例：
 * IE系列、IE内核系列的浏览器采用oOBJECT，
 * 其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED,
 * 对于64位浏览器指向64位的安装程序install_lodop64.exe
 +------------------------------------------------------------------------------
 */
		var strHtmInstall="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='Lodop/install_lodop32.exe'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
		var strHtmUpdate="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='Lodop/install_lodop32.exe'>执行升级</a>,升级后请重新进入。</font>";
		var strHtm64_Install="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='Lodop/install_lodop64.exe'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
		var strHtm64_Update="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='Lodop/install_lodop64.exe'>执行升级</a>,升级后请重新进入。</font>";
		var strHtmFireFox="<br><br><font color='#FF00FF'>注意：<br>1：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它。</font>";
		var testLODOP=oEMBED;
	try{
		 if (navigator.appVersion.indexOf("MSIE")>=0) testLODOP=oOBJECT;
		 if ((testLODOP==null)||(typeof(testLODOP.VERSION)=="undefined")) {
		 if (navigator.userAgent.indexOf('Firefox')>=0)
  			 document.documentElement.innerHTML=strHtmFireFox+document.documentElement.innerHTML;
		 if (navigator.userAgent.indexOf('Win64')>=0){
		 	if (navigator.appVersion.indexOf("MSIE")>=0) document.write(strHtm64_Install); else
		 	document.documentElement.innerHTML=strHtm64_Install+document.documentElement.innerHTML;		 
		 } else {
		 	if (navigator.appVersion.indexOf("MSIE")>=0) document.write(strHtmInstall); else
		 	document.documentElement.innerHTML=strHtmInstall+document.documentElement.innerHTML;
		 }
		 return testLODOP; 
		 } else if (testLODOP.VERSION<"6.1.1.8") {
		if (navigator.userAgent.indexOf('Win64')>=0){
				if (navigator.appVersion.indexOf("MSIE")>=0) document.write(strHtm64_Update); else
			document.documentElement.innerHTML=strHtm64_Update+document.documentElement.innerHTML; 
		} else {
				if (navigator.appVersion.indexOf("MSIE")>=0) document.write(strHtmUpdate); else
			document.documentElement.innerHTML=strHtmUpdate+document.documentElement.innerHTML; 
		}
		 return testLODOP;
		 }
		 //=====如下空白位置适合调用统一功能:=====		 
		// testLODOP.SET_LICENSES("北京天坦呵呵软件有限责任公司","653687367698075919295898093190","","");
		testLODOP.SET_LICENSES("(中国)移动护士工作站","93F6ED3BD0A7BDEE5148962B021849AC","","");

		 //=======================================
		 return testLODOP; 
	}catch(err){
		if (navigator.userAgent.indexOf('Win64')>=0)	
		document.documentElement.innerHTML="Error:"+strHtm64_Install+document.documentElement.innerHTML;else
		document.documentElement.innerHTML="Error:"+strHtmInstall+document.documentElement.innerHTML;
		 return testLODOP; 
	}
}

/**
 +------------------------------------------------------------------------------
 * 直接打印
 +------------------------------------------------------------------------------
 * 不经打印预览的直接打印
 +------------------------------------------------------------------------------
 */
function printerPrint(){
	var lodop_id;
	
	if(arguments.length < 1)
		lodop_id = 0
	else if(typeof(arguments[0]) != "number")
		lodop_id = 0;
	else
		lodop_id = arguments[0];
		
	if(typeof(pageDesign)=="function")
	{
		pageDesign();
	}
	else
	{
		alert("页面未设置打印！");
	}

	if($(LODOP[lodop_id]).size() > 0)
	{
		if(part_print_start_page!==0&&part_print_mode==true)
		{
			LODOP[lodop_id].SET_PRINT_MODE ("PRINT_START_PAGE",part_print_start_page);
		}
		/*
		暂时取消对打印页数的控制
			
			if(end_page!=0)
				LODOP[lodop_id].SET_PRINT_MODE ("PRINT_END_PAGE",end_page);
		*/
		if(document_type.toLowerCase().indexOf("peiyaoka")!=-1||document_type.toLowerCase().indexOf("shuyeka")!=-1||document_type.toLowerCase().indexOf("yizhuzhixing")!=-1)
			LODOP[lodop_id].SET_PRINT_MODE("PRINT_PAGE_PERCENT","65%");
			
		LODOP[lodop_id].PRINTA();
		//if(document_type.toLowerCase().indexOf("tijian")==-1&&document_type.toLowerCase().indexOf("xiangmu")==-1&&document_type.toLowerCase().indexOf("chufang")==-1&&document_type.toLowerCase().indexOf("tiwen")==-1&&document_type.toLowerCase().indexOf("zhikong")==-1&&document_type.toLowerCase().indexOf("binganshouye")==-1)
			//setDaYinJiLu(zhuyuan_id,server_url,document_type);
		if(window.parent.print_memory_switch=="on"&&(document_type.toLowerCase().indexOf("bingchengjilu")!=-1||document_type.toLowerCase().indexOf("binglitaoda")!=-1)&&window.parent.document.getElementById('conframe').contentWindow.document.getElementById("show_print_selector").value == "接续打印")
		{
			setDaYinJiluV4(zhixing_id,zhixing_type,$(".one_bingli_block:last").attr("div_bingli_block_id"),$(".one_bingli_block:last").attr("div_bingli_block_type"),"全部打印");
		}
		setDaYinJiLu(document_id,document_relate_table,$(".page").height(),0,0,0,"memory");
		setDaYinState(document_id,document_relate_table,"已经打印");
	}
}

/**
 +------------------------------------------------------------------------------
 * 打印预览
 +------------------------------------------------------------------------------
 * 打印预览输出页
 +------------------------------------------------------------------------------
 */
function printerPreview(){//guojin
	if((document_type.toLowerCase().indexOf("bingchengjilu")!=-1||document_type.toLowerCase().indexOf("binglitaoda")!=-1)&&window.parent.document.getElementById('conframe').contentWindow.document.getElementById("show_print_selector").value == "取消遮盖")
	{
		if(confirm("续打是否包含页眉页脚？"))
		{
			window.parent.document.getElementById('conframe').contentWindow.bingcheng_part_print_mode = false;
		}
		else
		{
			window.parent.document.getElementById('conframe').contentWindow.bingcheng_part_print_mode = true;
		}
	}
	var lodop_id;
	if(arguments.length < 1)
		lodop_id = 0
	else if(typeof(arguments[0]) != "number")
		lodop_id = 0;
	else
		lodop_id = arguments[0];
		
	if(typeof(pageDesign)=="function")
	{
		pageDesign();
	}
	else
	{
		alert("页面未设置打印！");
	}
	
	if($(LODOP[lodop_id]).size() > 0)
	{
		LODOP[lodop_id].SET_PREVIEW_WINDOW(0, 0, 0, 0, 0, "预览查看.开始打印");
		if(part_print_start_page!==0&&part_print_mode==true)
		{
			LODOP[lodop_id].SET_PRINT_MODE ("PRINT_START_PAGE",part_print_start_page);
		}
		/*
		暂时取消对打印页数的控制
		LODOP[lodop_id].SET_PRINT_MODE ("PRINT_START_PAGE",start_page);
		if(end_page!=0)
			LODOP[lodop_id].SET_PRINT_MODE ("PRINT_END_PAGE",end_page);
		*/
		LODOP[lodop_id].SET_SHOW_MODE ("LANDSCAPE_DEFROTATED",1);
		LODOP[lodop_id].SET_SHOW_MODE ("HIDE_SBUTTIN_PREVIEW",1);
		LODOP[lodop_id].SET_SHOW_MODE ("NP_NO_RESULT",1);
		if(document_type.toLowerCase().indexOf("peiyaoka")!=-1||document_type.toLowerCase().indexOf("shuyeka")!=-1||document_type.toLowerCase().indexOf("yizhuchuli")!=-1)
			LODOP[lodop_id].SET_PRINT_MODE("PRINT_PAGE_PERCENT","65%");
			
		LODOP[lodop_id].PREVIEW();
		if(document_type.toLowerCase().indexOf("ruyuanjilu")!=-1)
		{
			parent.ruyuan_jilu_yeshu = LODOP[lodop_id].GET_VALUE('PRINTSETUP_PAGE_COUNT',0);
		}
		if(document_type.toLowerCase().indexOf("bingchengjilu")!=-1)
		{
			parent.bingcheng_jilu_yeshu = LODOP[lodop_id].GET_VALUE('PRINTSETUP_PAGE_COUNT',0);
		}
		if(window.parent.print_memory_switch=="on"&&(document_type.toLowerCase().indexOf("bingchengjilu")!=-1||document_type.toLowerCase().indexOf("binglitaoda")!=-1)&&window.parent.document.getElementById('conframe').contentWindow.document.getElementById("show_print_selector").value == "接续打印")
		{
			setDaYinJiluV4(zhixing_id,zhixing_type,$(".one_bingli_block:last").attr("div_bingli_block_id"),$(".one_bingli_block:last").attr("div_bingli_block_type"),"全部打印");
		}
		setDaYinJiLu(document_id,document_relate_table,$(".page").height(),0,0,0,"memory");
	}
}

/**
 +------------------------------------------------------------------------------
 * 打印维护
 +------------------------------------------------------------------------------
 * 对整页的打印布局和打印风格进行界面维护，它与打印设计的区别是不具有打印项增删功能
 +------------------------------------------------------------------------------
 */
function printerSetup()
{
	if((document_type.toLowerCase().indexOf("bingchengjilu")!=-1||document_type.toLowerCase().indexOf("binglitaoda")!=-1)&&window.parent.document.getElementById('conframe').contentWindow.document.getElementById("show_print_selector").value == "取消遮盖")
	{
		if(confirm("续打是否包含页眉页脚？"))
		{
			window.parent.document.getElementById('conframe').contentWindow.bingcheng_part_print_mode = false;
		}
		else
		{
			window.parent.document.getElementById('conframe').contentWindow.bingcheng_part_print_mode = true;
		}
	}
	var lodop_id;
	if(arguments.length < 1)
		lodop_id = 0
	else if(typeof(arguments[0]) != "number")
		lodop_id = 0;
	else
		lodop_id = arguments[0];
		
	if(typeof(pageDesign)=="function")
	{
		pageDesign();
	}
	else
	{
		alert("页面未设置打印！");
	}
		
	if($(LODOP[lodop_id]).size() > 0)
	{
		LODOP[lodop_id].PRINT_SETUP();
	}
}

/**
 +------------------------------------------------------------------------------
 * 打印设计
 +------------------------------------------------------------------------------
 * 对整页的打印布局和打印风格进行界面设计，它与打印维护的区别是具有打印项增删功能
 +------------------------------------------------------------------------------
 */
function printerDesign()
{
	var lodop_id;
	if(arguments.length < 1)
		lodop_id = 0
	else if(typeof(arguments[0]) != "number")
		lodop_id = 0;
	else
		lodop_id = arguments[0];
		
	if(typeof(pageDesign)=="function")
	{
		pageDesign();
	}
	else
	{
		alert("页面未设置打印！");
	}
		
	if($(LODOP[lodop_id]).size() > 0)
		LODOP[lodop_id].SET_SHOW_MODE("BKIMG_IN_PREVIEW","true");
		LODOP[lodop_id].PRINT_DESIGN();
}

function setPageSizeAndOrient(orient, pageName, lodop_id)
{
	/**
		* intOrient：
		* 打印方向及纸张类型，数字型，
		* 1---纵(正)向打印，固定纸张； 
		* 2---横向打印，固定纸张； 
		* 3---纵(正)向打印，宽度固定，高度按打印内容的高度自适应；
		* 0(或其它)----打印方向由操作者自行选择或按打印机缺省设置；
	*/
	if(!arguments[0]) orient = 1;
	if(!arguments[1]) pageName = "A4";
	if(!arguments[2]) lodop_id = 0;
	
	var pageWidth = 0;
	var pageHeight = 0;

}

function setPrinterByName(printer_name, lodop_id)
{
	 if(!arguments[0]) printer_name = "A4";
	 if(!arguments[1]) lodop_id = 0;
	 
	 var printer_id = -1;
	
	var printer_count = LODOP[lodop_id].GET_PRINTER_COUNT();
	var temp_printer_name = " ";
	for(var i = 0; i < printer_count; i++)
	{
		temp_printer_name = LODOP[lodop_id].GET_PRINTER_NAME(i);
		if(temp_printer_name.indexOf(printer_name) > -1)
		{
			printer_id = i;
			LODOP[lodop_id].SET_PRINTER_INDEXA(printer_id);
			break;
		}
	}
	
}

function setBackgroundImg(img_url, lodop_id, top, left)
{
	if(!arguments[0]) img_url = "";
	if(!arguments[1]) lodop_id = 0;
	if(!arguments[2]) top = "10mm";
	if(!arguments[3]) left = "18mm";
	
	var img_label = "<img src='" + img_url + "' />";
	LODOP[lodop_id].ADD_PRINT_SETUP_BKIMG(img_label);
	LODOP[lodop_id].SET_SHOW_MODE("BKIMG_TOP",top);
	LODOP[lodop_id].SET_SHOW_MODE("BKIMG_LEFT",left);
	LODOP[lodop_id].SET_SHOW_MODE("BKIMG_IN_PREVIEW","true");
}

function addImage(img_url,lodop_id)
{
	var img_label = "<img src='" + img_url + "' />";
	if(document_type.toLowerCase().indexOf("showsancedan")!=-1)
		LODOP[lodop_id].ADD_PRINT_IMAGE(20,50,800,1200,img_label);
	else if(document_type.toLowerCase().indexOf("showzhikongtu")!=-1)
		LODOP[lodop_id].ADD_PRINT_IMAGE(64,10,1200,750,img_label);
	else
		LODOP[lodop_id].ADD_PRINT_IMAGE(50,94,750,1200,img_label);
}

function calculatePageRange(start_pos,end_pos,page_height)
{
	if(!arguments[0]) start_pos = 0;
	if(!arguments[1]) end_pos = 0;
	if(!arguments[2]) page_height = 1;
	
	start_page = parseInt(start_pos/page_height+1);
	end_page = parseInt(end_pos/page_height+1);
}
