//定义全局变量菜单信息
var main_menu_info=new Array();
var current_content_url="";
var current_zhixing_id="";
var current_patient_xingming="";
var current_patient_zhuangtai="";
var current_patient_special_info="";
var user_number = "";
var quanxian = "";
var zhurenyishi_id = "";
var zhuzhiyishi_id = "";
var zhuyuanyishi_id = "";
var chuyuan_type = "";
var last_content_url="";
var chuanghao = "";

$(document).ready(function(){
	//初始化等待条位置:
	var left_pos = $("#conframe").offset().left+($("#conframe").width()/2);
	var top_pos = $("#conframe").offset().top+($("#conframe").height()/2);
	$(".loading").offset({top:top_pos,left:left_pos});
	
	//添加基本控制按钮的功能：
	$("#log_out").click(function(){
		window.location.href="http://"+server_url+"/tiantan_emr/Common/System/logout";
	});
	$("#go_menu").click(function(){
		document.getElementById('conframe').contentWindow.history.go(1);
	});
	$("#refresh_menu").click(function(){
		document.getElementById('conframe').contentWindow.history.go(0);
	});
	$("#back_menu").click(function(){
		document.getElementById('conframe').contentWindow.history.go(-1);
	});
	
	$("#print").click(function(){
		document.getElementById('printer_conframe').contentWindow.printerPrint();
	});
	$("#preview").click(function(){
		document.getElementById('printer_conframe').contentWindow.printerPreview();
	});
	$("#search").click(function(){
	});
	
	//判断用户类型，加载不同的控制系统：
	if(user_type=="医生")
		loadYishengConfig();
	else if(user_type=="检验")
		loadJianyanConfig();
	else if(user_type=="放射")
		loadYingxiangConfig();
	else if(user_type=="超声电诊")
		loadChaoshengConfig();
	else if(user_type=="护士")
		loadHushiConfig();
	else if(user_type=="健康体检")
		loadJiankangTijianConfig();
	else if(user_type=="质控")
		loadZhiKongConfig();
	else if(user_type=="统计")
		loadTongjiConfig();
	else if(user_type=="患者")
		updateSubMenuByHuanzhe();
	else if(user_type=="药房")
		loadYaoFangConfig();
	else if(user_type=="管理员")
		loadAdminConfig();
	else if(user_type=="健康档案管理员")
		loadJiankangDanganYishiConfig();
	else if(user_type=="卫生信息统计员")
		loadJiankangDanganWeishengjuConfig();
	else if(user_type=="门诊医生")
		loadMenzhenyishengConfig();
	else if(user_type=="收费")
		loadShoufeiConfig();
	else
		loadOtherConfig();

	var iframe = document.getElementById("conframe");
	if(iframe.attachEvent){
		iframe.attachEvent("onload", function(){
			temp_current_content_url = document.getElementById('conframe').contentWindow.window.location.href;
			if(temp_current_content_url.indexOf("undefined")!=-1)
			{
				return false;
			}
			else
			{
				last_content_url = current_content_url;
				current_content_url = temp_current_content_url;
				analysisUrl(current_content_url);
			}
		});
	}
	else
	{
		iframe.onload = function(){
			temp_current_content_url = document.getElementById('conframe').contentWindow.window.location.href;
			if(temp_current_content_url.indexOf("undefined")!=-1)
			{
				return false;
			}
			else
			{
				last_content_url = current_content_url;
				current_content_url = temp_current_content_url;
				analysisUrl(current_content_url);
			}
		};
	}

	document.getElementById("conframe").onbeforeunload=function(){
		temp_current_content_url = document.getElementById('conframe').contentWindow.window.location.href;
		if(temp_current_content_url.indexOf("undefined")!=-1)
		{
			return false;
		}
	};

	document.getElementById("printer_conframe").onbeforeunload=function(){
		temp_current_content_url = document.getElementById('printer_conframe').contentWindow.window.location.href;
		if(temp_current_content_url.indexOf("undefined")!=-1)
		{
			return false;
		}
	};
});

function analysisUrl(current_content_url)
{
	current_content_url = UrlDecode(current_content_url);
	var arrs = new Array();
	var url_names = current_content_url;
	var arrs = url_names.split("/");
	var lengths = arrs.length;
	var length_s = lengths-1;
	chuyuan_type = arrs[length_s];

	//变换打印地址：
	home_page = server_url +"/tiantan_emr/";
	if (current_content_url.indexOf("tiantan_add_form") == -1 && (current_content_url.indexOf("/edit") == -1||current_content_url.indexOf("Jiancha/edit") != -1))
	{
		current_url = current_content_url;
		//如果浏览患者信息页面，获取一次患者的具体住院信息：
		if (current_url.indexOf("Patient/showPatientZhuyuanDetail/") != -1)
		{
			current_zhixing_id = current_url.substring(current_url.indexOf("/zhuyuan_id") + 12);
		}
		
		if (current_url.indexOf("zhuyuan_id") != -1 && this.current_zhuyuan_id == "000")
		{
			current_zhixing_id = current_url.substring(current_url.indexOf("/zhuyuan_id") + 12);
		}
		
		if (current_url.indexOf("Jiancha/edit") != -1 || current_url.indexOf("Jiancha/update") != -1)
		{
			if (current_url.indexOf("yingxiang_table") != -1)
			{
				if (current_url.indexOf("已申请") != -1 || current_url.indexOf("检查完毕") != -1)
					printer_url = "http://"+home_page + "/Yingxiang/Xiangmu/printShenqingdan/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).replace("jiancha_id", "jianyan_id");
				else
					printer_url = "http://"+home_page + "/Yingxiang/Xiangmu/printReport/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).replace("jiancha_id", "jianyan_id");
			}
			else if (current_url.indexOf("bingqu_tables") != -1)
			{
				if (current_url.indexOf("已申请") != -1 || current_url.indexOf("检查完毕") != -1)
					printer_url = "http://"+home_page + "/Jianyan/Xiangmu/printShenqingdan/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).replace("jiancha_id", "jianyan_id");
				else
					printer_url = "http://"+home_page + "/Jianyan/Xiangmu/printReport/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).replace("jiancha_id", "jianyan_id");
			}
			else
			{
				if (current_url.indexOf("已申请") != -1 || current_url.indexOf("检查完毕") != -1)
					printer_url = "http://"+home_page + "/Jianyan/Xiangmu/printShenqingdan/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).replace("jiancha_id", "jianyan_id");
				else
					printer_url = "http://"+home_page + "/Jianyan/Xiangmu/printReport/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).replace("jiancha_id", "jianyan_id");
			}
		}
		else
		{
			if (current_content_url.indexOf("View") != -1)
				printer_url = current_content_url.replace("View", "Print");
			else if (current_content_url.indexOf("TiwenJiludan/showSancedan/") != -1 || current_content_url.indexOf("TijianDaoyindan") != -1)
				printer_url = current_content_url;
			else if(current_content_url.toLowerCase().indexOf("print") == -1)
				printer_url = current_content_url.replace("show", "print");
			else
				printer_url = current_content_url;
		}
		
		if (current_content_url.indexOf("System/showUserLoginInfo") != -1)
		{
			printer_url = current_content_url;
		}
		//alert(current_url);
		//alert(printer_url);
		$("#printer_conframe").attr("src",printer_url);
	}

	//如果因为住院ID发生变化
	if(current_content_url.indexOf("showPatientZhuyuanDetail")!=-1 || (current_content_url.indexOf("###")==-1 && current_content_url.indexOf("editPatientBasicInfo")!=-1) || (current_content_url.indexOf("editChuyuanInfo")!=-1 && last_content_url.indexOf("updateChuyuanInfo")!=-1))
	{
		//获取最新的住院ID
		if(current_content_url.indexOf("/",current_content_url.indexOf("zhuyuan_id/")+11)!=-1)
		{
			current_zhixing_id = current_content_url.substring(current_content_url.indexOf("zhuyuan_id/")+11,current_content_url.indexOf("/",current_content_url.indexOf("zhuyuan_id/")+11));
		}
		else if(current_content_url.indexOf("zhuyuan_id/")!=-1)
			current_zhixing_id = current_content_url.substring(current_content_url.indexOf("zhuyuan_id/")+11);

		//患者姓名
		if(current_content_url.indexOf("xingming/")!=-1)
		{
			if(current_content_url.indexOf("/",current_content_url.indexOf("xingming/")+9)!=-1)
				current_patient_xingming = current_content_url.substring(current_content_url.indexOf("xingming/")+9,current_content_url.indexOf("/",current_content_url.indexOf("xingming/")+9));
			else
				current_patient_xingming = current_content_url.substring(current_content_url.indexOf("xingming/")+9);
		}
		current_patient_xingming = decodeURI(current_patient_xingming);

		//患者状态
		if(current_content_url.indexOf("zhuangtai/")!=-1)
		{
			if(current_content_url.indexOf("/",current_content_url.indexOf("zhuangtai/")+10)!=-1)
				current_patient_zhuangtai = current_content_url.substring(current_content_url.indexOf("zhuangtai/")+10,current_content_url.indexOf("/",current_content_url.indexOf("zhuangtai/")+10));
			else
				current_patient_zhuangtai = current_content_url.substring(current_content_url.indexOf("zhuangtai/")+10);
		}
		current_patient_zhuangtai = decodeURI(current_patient_zhuangtai);
		
		//患者特殊属性
		if(current_content_url.indexOf("special_info/")!=-1)
		{
			if(current_content_url.indexOf("/",current_content_url.indexOf("special_info/")+13)!=-1)
				current_patient_special_info = current_content_url.substring(current_content_url.indexOf("special_info/")+13,current_content_url.indexOf("/",current_content_url.indexOf("special_info/")+13));
			else
				current_patient_special_info = current_content_url.substring(current_content_url.indexOf("special_info/")+13);
		}
		//current_shifou_chanchengjilu
		current_patient_special_info = decodeURI(current_patient_special_info);
		
		if(current_content_url.indexOf("editPatientBasicInfo")!=-1)
			updateSubMenuByZhuyuanIDforYishi();
		else if(user_type=="护士")
			updateSubMenuByZhuyuanIDforHushi();
		else if(user_type=="医生")
		{
			var url = current_content_url.split("/");
			url = url.slice(0,5);
			url_str = url.join("/")+"/Patient";
			$.post(url_str+"/yishengAuthority",{id:"ajax_application"},function(data){
				if(data == "zhengque"){
					updateSubMenuByZhuyuanIDforYishi();
				}else if(data == "cuowu"){
					updateSubMenuByZhuyuanIDforYishi_limitedAuthority();
				}
			});
		}
	}
	
	//如果因为门诊ID发生变化
	if(current_content_url.indexOf("showPatientMenzhenDetail")!=-1 && current_content_url.indexOf("###")==-1)
	{
		//alert(current_content_url.indexOf("showPatientMenzhenDetail"));
		//获取最新的menzhen_id
		if(current_content_url.indexOf("/",current_content_url.indexOf("menzhen_id/")+11)!=-1)
		{
			current_zhixing_id = current_content_url.substring(current_content_url.indexOf("menzhen_id/")+11,current_content_url.indexOf("/",current_content_url.indexOf("menzhen_id/")+11));
		}
		else if(current_content_url.indexOf("menzhen_id/")!=-1)
			current_zhixing_id = current_content_url.substring(current_content_url.indexOf("menzhen_id/")+11);

		//患者姓名
		if(current_content_url.indexOf("xingming/")!=-1)
		{
			if(current_content_url.indexOf("/",current_content_url.indexOf("xingming/")+9)!=-1)
				current_patient_xingming = current_content_url.substring(current_content_url.indexOf("xingming/")+9,current_content_url.indexOf("/",current_content_url.indexOf("xingming/")+9));
			else
				current_patient_xingming = current_content_url.substring(current_content_url.indexOf("xingming/")+9);
		}
		current_patient_xingming = decodeURI(current_patient_xingming);
		updateSubMenuByMenzhenIDforYishi();
	}
	
	//如果因为单位ID发生变化
	if(current_content_url.indexOf("Danwei/viewDetail/danwei_id")!=-1)
	{
		if(current_content_url.indexOf("/",current_content_url.indexOf("danwei_id/")+10)!=-1)
			new_zhixing_id = current_content_url.substring(current_content_url.indexOf("danwei_id/")+10,current_content_url.indexOf("/",current_content_url.indexOf("danwei_id/")+10));
		else
			new_zhixing_id = current_content_url.substring(current_content_url.indexOf("danwei_id/")+10);
		if(current_zhixing_id!=new_zhixing_id)
		{
			current_danwei_id = new_zhixing_id;
			updateSubMenuByDanweiID();
		}
	}
	
	//健康档案左侧变化
	if(current_content_url.indexOf("showJiankangDanganDetail")!=-1&& current_content_url.indexOf("###")==-1)
	{
		if(current_content_url.indexOf("/",current_content_url.indexOf("patient_id/")+11)!=-1)
			current_zhixing_id = current_content_url.substring(current_content_url.indexOf("patient_id/")+11,current_content_url.indexOf("/",current_content_url.indexOf("patient_id/")+11));
		else
			current_zhixing_id = current_content_url.substring(current_content_url.indexOf("patient_id/")+11);
		updateSubMenuByJiankangDanganForYishi();
	}
	
	//如果因为单位ID发生变化
	if(current_content_url.indexOf("TijianDanwei/viewDetail/danwei_tijian_id")!=-1)
	{
		if(current_content_url.indexOf("/",current_content_url.indexOf("danwei_tijian_id/")+17)!=-1)
			new_zhixing_id = current_content_url.substring(current_content_url.indexOf("danwei_tijian_id/")+17,current_content_url.indexOf("/",current_content_url.indexOf("danwei_tijian_id/")+17));
		else
			new_zhixing_id = current_content_url.substring(current_content_url.indexOf("danwei_tijian_id/")+17);
		//修改中
		if(current_content_url.indexOf("/",current_content_url.indexOf("danwei_id/")+10)!=-1)
			current_danwei_id = current_content_url.substring(current_content_url.indexOf("danwei_id/")+10,current_content_url.indexOf("/",current_content_url.indexOf("danwei_id/")+10));
		else
			current_danwei_id = current_content_url.substring(current_content_url.indexOf("danwei_id/")+10);
		
		if(current_zhixing_id!=new_zhixing_id)
		{
			current_zhixing_id = new_zhixing_id;
			updateSubMenuByDanweiTijianID();
		}
	}
	
	//如果因为体检ID发生变化
	if(current_content_url.indexOf("JiankangTijian/PatientBasicInfo/showEdit/tijian_id")!=-1)
	{
		if(current_content_url.indexOf("/",current_content_url.indexOf("tijian_id/")+10)!=-1)
			new_zhixing_id = current_content_url.substring(current_content_url.indexOf("tijian_id/")+10,current_content_url.indexOf("/",current_content_url.indexOf("tijian_id/")+10));
		else
			new_zhixing_id = current_content_url.substring(current_content_url.indexOf("tijian_id/")+10);
	
	
	  if(current_content_url.indexOf("danwei_tijian_id/")!=-1)
		{
			if(current_content_url.indexOf("/",current_content_url.indexOf("danwei_tijian_id/")+17)!=-1)
				current_danwei_tijian_id = current_content_url.substring(current_content_url.indexOf("danwei_tijian_id/")+17,current_content_url.indexOf("/",current_content_url.indexOf("danwei_tijian_id/")+17));
			else
				current_danwei_tijian_id = current_content_url.substring(current_content_url.indexOf("danwei_tijian_id/")+17);
		}
	
		if(current_zhixing_id!=new_zhixing_id)
		{
			current_zhixing_id = new_zhixing_id;
			updateSubMenuByTijianID();
		}
	}
	
	//如果因为质控住院ID发生变化
	if(current_content_url.indexOf("showBingliDetail")!=-1)
	{
		if(current_content_url.indexOf("/",current_content_url.indexOf("zhuyuan_id/")+11)!=-1)
			current_zhixing_id = current_content_url.substring(current_content_url.indexOf("zhuyuan_id/")+11,current_content_url.indexOf("/",current_content_url.indexOf("zhuyuan_id/")+11));
		else if(current_content_url.indexOf("zhuyuan_id/")!=-1)
			current_zhixing_id = current_content_url.substring(current_content_url.indexOf("zhuyuan_id/")+11);

    if(current_content_url.indexOf("xingming/")!=-1)
		{
			if(current_content_url.indexOf("/",current_content_url.indexOf("xingming/")+9)!=-1)
				current_patient_xingming = current_content_url.substring(current_content_url.indexOf("xingming/")+9,current_content_url.indexOf("/",current_content_url.indexOf("xingming/")+9));
			else
				current_patient_xingming = current_content_url.substring(current_content_url.indexOf("xingming/")+9);
		}
		
		current_patient_xingming = decodeURI(current_patient_xingming);
		
		//alert(current_zhixing_id)
		updateSubMenuByZhikongIDforZhikong();
	}
}

//患者查询子菜单
function updateSubMenuByHuanzhe()
{
	var main_menu_number = 5;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<6;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	main_menu_info[0][0] = "家庭成员列表";
	main_menu_info[0][1] = "member_list";
	main_menu_info[0][2] = "/tiantan_emr/Huanzhe/Huanzhe/showMemberList";
	main_menu_info[0][3] = "家庭成员列表";
	main_menu_info[0][4] = new Array();
	
	main_menu_info[1][0] = "我的健康档案";
	main_menu_info[1][1] = "my_dangan";
	main_menu_info[1][2] = "/tiantan_emr/Huanzhe/Huanzhe/showMyDangan";
	main_menu_info[1][3] = "我的健康档案";
	main_menu_info[1][4] = new Array();
	
	main_menu_info[2][0] = "住院历史病历";
	main_menu_info[2][1] = "zhuyuan_history";
	main_menu_info[2][2] = "/tiantan_emr/Huanzhe/Huanzhe/showZhuyuanHistory";
	main_menu_info[2][3] = "住院历史病历";
	main_menu_info[2][4] = new Array();
	
	main_menu_info[3][0] = "检查单查询";
	main_menu_info[3][1] = "jiancha_chaxun";
	main_menu_info[3][2] = "/tiantan_emr/Huanzhe/Huanzhe/showJianchaChaxun";
	main_menu_info[3][3] = "检查单查询";
	main_menu_info[3][4] = new Array();
	
	main_menu_info[4][0] = "体征状况查询";
	main_menu_info[4][1] = "tizheng_chaxun";
	main_menu_info[4][2] = "/tiantan_emr/Huanzhe/Huanzhe/showTizhengChaxun";
	main_menu_info[4][3] = "体征状况查询";
	main_menu_info[4][4] = new Array();
	
	initinalMainMenu(main_menu_info);
}

//病历质控管理子菜单
function updateSubMenuByZhikongIDforZhikong()
{
	$(".left_menu_title").html("当前病历："+current_patient_xingming);
		$(".left_menu_title").css("color","black");
		var temp_sub_menu = new Array();
	
		temp_sub_menu[0] = new Array();
			temp_sub_menu[0][0] = "住院信息总览";
			temp_sub_menu[0][1] = "zhuyuan_xinxi_zonglan";
			temp_sub_menu[0][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliDetail/zhuyuan_id/"+current_zhixing_id+"/zhuangtai/"+chuyuan_type;
			temp_sub_menu[0][3] = new Array();
			
		temp_sub_menu[1] = new Array();
			temp_sub_menu[1][0] = "病案首页";
			temp_sub_menu[1][1] = "huanzhe_xinxi";
			temp_sub_menu[1][2] = "/tiantan_emr/ZhuyuanYishi/BinganShouye/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[1][3] = new Array();
			
		temp_sub_menu[2] = new Array();
			temp_sub_menu[2][0] = "入院记录";
			temp_sub_menu[2][1] = "ruyuan_jilu";
			temp_sub_menu[2][2] = "/tiantan_emr/ZhuyuanYishi/RuyuanJilu/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[2][3] = new Array();
			
		temp_sub_menu[3] = new Array();
			temp_sub_menu[3][0] = "病程记录";
			temp_sub_menu[3][1] = "bingcheng_jilu";
			temp_sub_menu[3][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[3][3] = new Array();
			
		temp_sub_menu[4] = new Array();
			temp_sub_menu[4][0] = "医嘱查看";
			temp_sub_menu[4][1] = "yizhu_guanli";
			temp_sub_menu[4][2] = "/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[4][3] = new Array();
				temp_sub_menu[4][3][0] = new Array();
					temp_sub_menu[4][3][0][0] = "长期医嘱";
					temp_sub_menu[4][3][0][1] = "changqiyizhu";
					temp_sub_menu[4][3][0][2] = "/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+current_zhixing_id+"/###";
				temp_sub_menu[4][3][1] = new Array();
					temp_sub_menu[4][3][1][0] = "临时医嘱";
					temp_sub_menu[4][3][1][1] = "linshiyizhu";
					temp_sub_menu[4][3][1][2] = "/tiantan_emr/Common/Yizhuguanli/showLinshi/zhuyuan_id/"+current_zhixing_id;

		temp_sub_menu[5] = new Array();
			temp_sub_menu[5][0] = "质控评分";
			temp_sub_menu[5][1] = "zhikongpingfen";
			temp_sub_menu[5][2] = "/tiantan_emr/Zhikong/BingliPingfen/editPingfen/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[5][3] = new Array();
			
		temp_sub_menu[6] = new Array();
			temp_sub_menu[6][0] = "住院费用";
			temp_sub_menu[6][1] = "zhuyuan_feiyong";
			temp_sub_menu[6][2] = "/tiantan_emr/ZhuyuanYishi/Feiyong/editZhuyuanFeiyong/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[6][3] = new Array();
			
		temp_sub_menu[7] = new Array();
			temp_sub_menu[7][0] = "质控信息";
			temp_sub_menu[7][1] = "zhikongxinxi";
			temp_sub_menu[7][2] = "/tiantan_emr/Zhikong/BingliGuanli/editZhikongInfo/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[7][3] = new Array();
		
		if(chuyuan_type == "已出院"){
		temp_sub_menu[8] = new Array();
			temp_sub_menu[8][0] = "出院记录";
			temp_sub_menu[8][1] = "chuyuanjilu";
			temp_sub_menu[8][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanJilu/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[8][3] = new Array();
		}
		else if(chuyuan_type == "24小时内出院")
		{
			temp_sub_menu[8] = new Array();
			temp_sub_menu[8][0] = "24小时内出院记录";
			temp_sub_menu[8][1] = "chuyuanjilu";
			temp_sub_menu[8][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanShortJilu/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[8][3] = new Array();
		}
		else if(chuyuan_type == "自动出院")
		{
			temp_sub_menu[8] = new Array();
			temp_sub_menu[8][0] = "自动出院记录";
			temp_sub_menu[8][1] = "chuyuanjilu";
			temp_sub_menu[8][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanZidongJilu/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[8][3] = new Array();
		}
		else if(chuyuan_type == "24小时内自动出院")
		{
			temp_sub_menu[8] = new Array();
			temp_sub_menu[8][0] = "24小时内自动出院记录";
			temp_sub_menu[8][1] = "chuyuanjilu";
			temp_sub_menu[8][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanShortZidongJilu/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[8][3] = new Array();
		}
		else if(chuyuan_type == "死亡")
		{
			temp_sub_menu[8] = new Array();
			temp_sub_menu[8][0] = "死亡记录";
			temp_sub_menu[8][1] = "chuyuanjilu";
			temp_sub_menu[8][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanSiwangJilu/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[8][3] = new Array();
		}
		else if(chuyuan_type == "24小时内死亡")
		{
			temp_sub_menu[8] = new Array();
			temp_sub_menu[8][0] = "24小时内死亡记录";
			temp_sub_menu[8][1] = "chuyuanjilu";
			temp_sub_menu[8][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanShortSiwangJilu/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[8][3] = new Array();
		}
		
		refreshSubMenu(temp_sub_menu);
}

//责任医师子菜单
function updateSubMenuByZhuyuanIDforYishi()
{
		var zhiliao_leibie = "西医治疗";
		$.ajaxSetup({
			async: false
		});
		$.get("http://"+server_url+"/tiantan_emr/Common/Data/getChuanghao", {zhuyuan_id: current_zhixing_id}, function(data){
			var temp_data = data.split("|");
			if(temp_data[0]!="")
				chuanghao = "/chuanghao/"+data;
			if(temp_data[1]!="")
				zhiliao_leibie = temp_data[1];
		});
		$.ajaxSetup({
			async: true
		});
		var xingming_url = "";
		if(current_patient_xingming!="")
		{
			xingming_url = "/xingming/"+current_patient_xingming;
		}
		var huanzhe_a = "<a href=\"/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetail/zhuyuan_id/"+current_zhixing_id+"/xingming/"+current_patient_xingming+"/zhuangtai/"+current_patient_zhuangtai+"\" target=\"conframe\" style=\"text-decoration:none;color:#000;\">当前患者："+current_patient_xingming+"</a>";
		$(".left_menu_title").html(huanzhe_a);
		$(".left_menu_title").css("color","black");
		var temp_sub_menu_bingli = new Array();
		var temp_sub_menu_linchuang = new Array();
		var temp_sub_menu_huli = new Array();
		continue_number_bingli = 0;
		continue_number_linchuang = 0;
		continue_number_huli = 0;
		
		temp_sub_menu_bingli[continue_number_bingli] = new Array();
			temp_sub_menu_bingli[continue_number_bingli][0] = "住院信息总览";
			temp_sub_menu_bingli[continue_number_bingli][1] = "zhuyuan_xinxi_zonglan";
			temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetail/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
		continue_number_bingli++;
		
		temp_sub_menu_bingli[continue_number_bingli] = new Array();
			temp_sub_menu_bingli[continue_number_bingli][0] = "病案首页信息";
			temp_sub_menu_bingli[continue_number_bingli][1] = "huanzhe_xinxi";
			temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/BinganShouye/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
				temp_sub_menu_bingli[continue_number_bingli][3][0] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][3][0][0] = "基本信息";
					temp_sub_menu_bingli[continue_number_bingli][3][0][1] = "jiben_xinxi";
					temp_sub_menu_bingli[continue_number_bingli][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Patient/editPatientBasicInfo/zhuyuan_id/"+current_zhixing_id+"/###";
				temp_sub_menu_bingli[continue_number_bingli][3][1] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][3][1][0] = "联系方式";
					temp_sub_menu_bingli[continue_number_bingli][3][1][1] = "lianxi_fangshi";
					temp_sub_menu_bingli[continue_number_bingli][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Patient/editPatientContactInfo/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_bingli[continue_number_bingli][3][2] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][3][2][0] = "其他住院信息";
					temp_sub_menu_bingli[continue_number_bingli][3][2][1] = "qita_zhuyuan_xinxi";
					temp_sub_menu_bingli[continue_number_bingli][3][2][2] = "/tiantan_emr/ZhuyuanYishi/Patient/editPatientZhuyuanInfo/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_bingli[continue_number_bingli][3][3] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][3][3][0] = "责任医师";
					temp_sub_menu_bingli[continue_number_bingli][3][3][1] = "zenren_yishi";
					temp_sub_menu_bingli[continue_number_bingli][3][3][2] = "/tiantan_emr/ZhuyuanYishi/Patient/editZhuyuanYishiInfo/zhuyuan_id/"+current_zhixing_id;
		continue_number_bingli++;
		
		temp_sub_menu_bingli[continue_number_bingli] = new Array();
			temp_sub_menu_bingli[continue_number_bingli][0] = "诊断";
			temp_sub_menu_bingli[continue_number_bingli][1] = "zhenduan";
			temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showZongjie/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
			temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
				temp_sub_menu_bingli[continue_number_bingli][3][0] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][3][0][0] = "门诊诊断";
					temp_sub_menu_bingli[continue_number_bingli][3][0][1] = "menzhen_zhenduan";
					temp_sub_menu_bingli[continue_number_bingli][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showMenzhenZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				temp_sub_menu_bingli[continue_number_bingli][3][1] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][3][1][0] = "入院诊断";
					temp_sub_menu_bingli[continue_number_bingli][3][1][1] = "ruyuan_zhenduan";
					temp_sub_menu_bingli[continue_number_bingli][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showRuyuanZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				temp_sub_menu_bingli[continue_number_bingli][3][2] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][3][2][0] = "出院诊断";
					temp_sub_menu_bingli[continue_number_bingli][3][2][1] = "chuyuan_zhenduan";
					temp_sub_menu_bingli[continue_number_bingli][3][2][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showChuyuanZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				temp_sub_menu_bingli[continue_number_bingli][3][3] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][3][3][0] = "其它诊断";
					temp_sub_menu_bingli[continue_number_bingli][3][3][1] = "qita_zhenduan";
					temp_sub_menu_bingli[continue_number_bingli][3][3][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showQitaZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				if(current_patient_zhuangtai=="死亡")
				{
					temp_sub_menu_bingli[continue_number_bingli][3][4] = new Array();
						temp_sub_menu_bingli[continue_number_bingli][3][4][0] = "死亡诊断";
						temp_sub_menu_bingli[continue_number_bingli][3][4][1] = "siwang_zhenduan";
						temp_sub_menu_bingli[continue_number_bingli][3][4][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showSiwangZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				}
		continue_number_bingli++;
			
		temp_sub_menu_bingli[continue_number_bingli] = new Array();
			temp_sub_menu_bingli[continue_number_bingli][0] = "病历调阅";
			temp_sub_menu_bingli[continue_number_bingli][1] = "ruyuan_jilu";
			temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/Common/AnboweiDataInterface/getBingliList/zhuyuan_id/3301182";
			temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
		continue_number_bingli++;
			
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "医嘱管理";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "yizhu_guanli";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][0] = "口服医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][1] = "changqi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/yongfa|口服"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][1] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][0] = "输液医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][1] = "linshi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/yongfa_type|输液"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][2] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][0] = "中草药医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][1] = "changqi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/yongfa_type|中草药"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][0] = "其他医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][1] = "linshi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/others"+xingming_url+chuanghao;
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "辅助检查";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "fuzhu_jiancha";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showZongjie/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][0] = "添加检查";
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][1] = "tianjia_jiancha";
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showAddJiancha/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][1] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][0] = "查看检查";
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][1] = "chakan_jiancha";
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showList/zhuyuan_id/"+current_zhixing_id;
		continue_number_linchuang++;
		if(shifou_zhuyuan_chufang=="on" || zhiliao_leibie!="西医治疗")
		{
			temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][0] = "处方管理";
				temp_sub_menu_linchuang[continue_number_linchuang][1] = "chufang_guanli";
				temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/Chufangguanli/showList/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
			continue_number_linchuang++;
		}

		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "会诊记录";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "huizhen_jilu";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Huizhen/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;

		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "手术操作记录";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "shoushu_caozuo_jilu";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Zhiliao/shoushuCaozuoShowList/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "抢救记录";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "qiangjiu_jilu";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Zhiliao/editQiangjiuJilu/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "输血记录";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "shuxue_jilu";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Zhiliao/editShuxueJilu/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;
			
		temp_sub_menu_huli[continue_number_huli] = new Array();
			temp_sub_menu_huli[continue_number_huli][0] = "护理记录";
			temp_sub_menu_huli[continue_number_huli][1] = "huli_jilu";
			temp_sub_menu_huli[continue_number_huli][2] = "/tiantan_emr/HuliJilu/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_huli[continue_number_huli][3] = new Array();
				temp_sub_menu_huli[continue_number_huli][3][0] = new Array();
					temp_sub_menu_huli[continue_number_huli][3][0][0] = "护理管理";
					temp_sub_menu_huli[continue_number_huli][3][0][1] = "yiban_huli_jilu";
					temp_sub_menu_huli[continue_number_huli][3][0][2]  = "/tiantan_emr/Common/HuliJilu/editZongjie/zhuyuan_id/"+current_zhixing_id;
		continue_number_huli++;
		
		temp_sub_menu_huli[continue_number_huli] = new Array();
			temp_sub_menu_huli[continue_number_huli][0] = "三测单";
			temp_sub_menu_huli[continue_number_huli][1] = "sancedan";
			temp_sub_menu_huli[continue_number_huli][2] = "/tiantan_emr/Common/TiwenJiludan/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_huli[continue_number_huli][3] = new Array();
		continue_number_huli++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "住院费用";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "zhuyuan_feiyong";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/Feiyong/editZhuyuanFeiyong/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "健康分析";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "jiankang_fenxi";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/DataAnalysis/showLineChartPlot/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;

		temp_sub_menu_bingli[continue_number_bingli] = new Array();
			temp_sub_menu_bingli[continue_number_bingli][0] = "病历质控";
			temp_sub_menu_bingli[continue_number_bingli][1] = "bingli_zhikong";
			temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/Zhikong/BingliPingfen/showPingfen/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
		continue_number_bingli++;
		
		refreshSubMultiMenu(temp_sub_menu_bingli,temp_sub_menu_linchuang,temp_sub_menu_huli);
}

//非责任医师子菜单
function updateSubMenuByZhuyuanIDforYishi_limitedAuthority()
{
		var zhiliao_leibie = "西医治疗";
		$.ajaxSetup({
			async: false
		});
		$.get("http://"+server_url+"/tiantan_emr/Common/Data/getChuanghao", {zhuyuan_id: current_zhixing_id}, function(data){
			var temp_data = data.split("|");
			if(temp_data[0]!="")
				chuanghao = "/chuanghao/"+data;
			if(temp_data[1]!="")
				zhiliao_leibie = temp_data[1];
		});
		$.ajaxSetup({
			async: true
		});
		var xingming_url = "";
		if(current_patient_xingming!="")
		{
			xingming_url = "/xingming/"+current_patient_xingming;
		}
		$(".left_menu_title").html("当前患者："+current_patient_xingming);
		$(".left_menu_title").css("color","black");
		var temp_sub_menu = new Array();
	
		temp_sub_menu[0] = new Array();
			temp_sub_menu[0][0] = "住院信息总览";
			temp_sub_menu[0][1] = "zhuyuan_xinxi_zonglan";
			temp_sub_menu[0][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetail/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[0][3] = new Array();
		
		temp_sub_menu[1] = new Array();
			temp_sub_menu[1][0] = "病案首页信息";
			temp_sub_menu[1][1] = "huanzhe_xinxi";
			temp_sub_menu[1][2] = "/tiantan_emr/ZhuyuanYishi/BinganShouye/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[1][3] = new Array();
		
		temp_sub_menu[2] = new Array();
			temp_sub_menu[2][0] = "入院记录";
			temp_sub_menu[2][1] = "ruyuan_jilu";
			temp_sub_menu[2][2] = "/tiantan_emr/ZhuyuanYishi/RuyuanJilu/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[2][3] = new Array();
		
		temp_sub_menu[3] = new Array();
			temp_sub_menu[3][0] = "病程记录";
			temp_sub_menu[3][1] = "bingcheng_jilu";
			temp_sub_menu[3][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[3][3] = new Array();
				temp_sub_menu[3][3][0] = new Array();
					temp_sub_menu[3][3][0][0] = "添加病程记录";
					temp_sub_menu[3][3][0][1] = "tianjia_bingcheng_jilu";
					temp_sub_menu[3][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/bingchengJiluShowAdd/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu[3][3][1] = new Array();
					temp_sub_menu[3][3][1][0] = "查看病程记录";
					temp_sub_menu[3][3][1][1] = "bingcheng_jilu_zonglan";
					temp_sub_menu[3][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/bingchengJiluShowList/zhuyuan_id/"+current_zhixing_id;
		
		var chuyuan_jilu_mingcheng = "";
		
		switch(current_patient_zhuangtai)
		{
			case "24小时内出院":
				chuyuan_jilu_mingcheng = "ChuyuanShortJilu";
			break;
			case "24小时内自动出院":
				chuyuan_jilu_mingcheng = "ChuyuanShortZidongJilu";
			break;
			case "24小时内死亡":
				chuyuan_jilu_mingcheng = "ChuyuanShortSiwangJilu";
			break;
			case "死亡":
				chuyuan_jilu_mingcheng = "ChuyuanSiwangJilu";
			break;
			case "已出院":
				chuyuan_jilu_mingcheng = "ChuyuanJilu";
			break;
			case "自动出院":
				chuyuan_jilu_mingcheng = "ChuyuanZidongJilu";
			break;
			default:
				chuyuan_jilu_mingcheng = "zhuyuanzhong";
			break;
		}
		continue_number = 4;
		if(chuyuan_jilu_mingcheng!="zhuyuanzhong")
		{
			continue_number = 5;
			temp_sub_menu[4] = new Array();
				temp_sub_menu[4][0] = "出院记录";
				temp_sub_menu[4][1] = "chuyuan_jilu";
				temp_sub_menu[4][2] = "/tiantan_emr/ZhuyuanYishi/"+chuyuan_jilu_mingcheng+"/showView/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu[4][3] = new Array();
		}
		
		temp_sub_menu[continue_number] = new Array();
			temp_sub_menu[continue_number][0] = "辅助检查";
			temp_sub_menu[continue_number][1] = "fuzhu_jiancha";
			temp_sub_menu[continue_number][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showZongjie/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[continue_number][3] = new Array();
				temp_sub_menu[continue_number][3][0] = new Array();
					temp_sub_menu[continue_number][3][0][0] = "添加检查";
					temp_sub_menu[continue_number][3][0][1] = "tianjia_jiancha";
					temp_sub_menu[continue_number][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showAddJiancha/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu[continue_number][3][1] = new Array();
					temp_sub_menu[continue_number][3][1][0] = "查看检查";
					temp_sub_menu[continue_number][3][1][1] = "chakan_jiancha";
					temp_sub_menu[continue_number][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showList/zhuyuan_id/"+current_zhixing_id;
		continue_number++;
		
		temp_sub_menu[continue_number] = new Array();
			temp_sub_menu[continue_number][0] = "医嘱管理";
			temp_sub_menu[continue_number][1] = "yizhu_guanli";
			temp_sub_menu[continue_number][2] = "/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[continue_number][3] = new Array();
				temp_sub_menu[continue_number][3][0] = new Array();
				temp_sub_menu[continue_number][3][0][0] = "口服医嘱";
				temp_sub_menu[continue_number][3][0][1] = "changqi_yizhu";
				temp_sub_menu[continue_number][3][0][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/yongfa|口服"+xingming_url+chuanghao;
				temp_sub_menu[continue_number][3][1] = new Array();
				temp_sub_menu[continue_number][3][1][0] = "输液医嘱";
				temp_sub_menu[continue_number][3][1][1] = "linshi_yizhu";
				temp_sub_menu[continue_number][3][1][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/yongfa_type|输液"+xingming_url+chuanghao;
				temp_sub_menu[continue_number][3][2] = new Array();
				temp_sub_menu[continue_number][3][2][0] = "中草药医嘱";
				temp_sub_menu[continue_number][3][2][1] = "changqi_yizhu";
				temp_sub_menu[continue_number][3][2][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/yongfa_type|中草药"+xingming_url+chuanghao;
				temp_sub_menu[continue_number][3][3] = new Array();
				temp_sub_menu[continue_number][3][3][0] = "其他医嘱";
				temp_sub_menu[continue_number][3][3][1] = "linshi_yizhu";
				temp_sub_menu[continue_number][3][3][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/others"+xingming_url+chuanghao;
		continue_number++;
		
		temp_sub_menu[continue_number] = new Array();
			temp_sub_menu[continue_number][0] = "处方管理";
			temp_sub_menu[continue_number][1] = "chufang_guanli";
			temp_sub_menu[continue_number][2] = "/tiantan_emr/Common/Chufangguanli/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[continue_number][3] = new Array();
		continue_number++;
		
		temp_sub_menu[continue_number] = new Array();
			temp_sub_menu[continue_number][0] = "体征记录";
			temp_sub_menu[continue_number][1] = "tizhengjilu";
			temp_sub_menu[continue_number][2] = "/tiantan_emr/TiwenJiludan/showOneweek/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[continue_number][3] = new Array();
		continue_number++;
		
		temp_sub_menu[continue_number] = new Array();
			temp_sub_menu[continue_number][0] = "护理记录";
			temp_sub_menu[continue_number][1] = "huli_jilu";
			temp_sub_menu[continue_number][2] = "/tiantan_emr/HuliJilu/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[continue_number][3] = new Array();
				temp_sub_menu[continue_number][3][0] = new Array();
					temp_sub_menu[continue_number][3][0][0] = "护理管理";
					temp_sub_menu[continue_number][3][0][1] = "yiban_huli_jilu";
					temp_sub_menu[continue_number][3][0][2] = "/tiantan_emr/Common/HuliJilu/editZongjie/zhuyuan_id/"+current_zhixing_id;
		continue_number++;
		
		temp_sub_menu[continue_number] = new Array();
			temp_sub_menu[continue_number][0] = "三测单";
			temp_sub_menu[continue_number][1] = "sancedan";
			temp_sub_menu[continue_number][2] = "/tiantan_emr/Common/TiwenJiludan/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[continue_number][3] = new Array();
		continue_number++;
		
		temp_sub_menu[continue_number] = new Array();
			temp_sub_menu[continue_number][0] = "健康分析";
			temp_sub_menu[continue_number][1] = "jiankang_fenxi";
			temp_sub_menu[continue_number][2] = "/tiantan_emr/Common/DataAnalysis/showLineChartPlot/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[continue_number][3] = new Array();
		continue_number++;
		
		temp_sub_menu[continue_number] = new Array();
			temp_sub_menu[continue_number][0] = "病历质控";
			temp_sub_menu[continue_number][1] = "bingli_zhikong";
			temp_sub_menu[continue_number][2] = "/tiantan_emr/Zhikong/BingliPingfen/showPingfen/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[continue_number][3] = new Array();
		continue_number++;
		
		$("#"+main_menu_info[2][1]+"").attr("url",main_menu_info[2][2]);
		$("#"+main_menu_info[3][1]+"").attr("url",main_menu_info[3][2]);
		
		refreshSubMenu(temp_sub_menu);
}

//健康档案医师子菜单
function updateSubMenuByJiankangDanganForYishi()
{
		$(".left_menu_title").html("请选择");
		var temp_sub_menu = new Array();
		
		temp_sub_menu[0] = new Array();
			temp_sub_menu[0][0] = "健康概况";
			temp_sub_menu[0][1] = "zhuyuan_xinxi_zonglan";
			temp_sub_menu[0][2] = "/tiantan_emr/JiankangDangan/Dangan/showJiankangDanganDetail/patient_id/"+current_zhixing_id+"###";
			temp_sub_menu[0][3] = new Array();
				temp_sub_menu[0][3][0] = new Array();
					temp_sub_menu[0][3][0][0] = "基本信息";
					temp_sub_menu[0][3][0][1] = "jiben_xinxi";
					temp_sub_menu[0][3][0][2] = "/tiantan_emr/JiankangDangan/Dangan/editDanganBasicInfo/patient_id/"+current_zhixing_id;
				temp_sub_menu[0][3][1] = new Array();
					temp_sub_menu[0][3][1][0] = "联系方式";
					temp_sub_menu[0][3][1][1] = "lianxi_fangshi";
					temp_sub_menu[0][3][1][2] = "/tiantan_emr/JiankangDangan/Dangan/editDanganContactInfo/patient_id/"+current_zhixing_id;
				temp_sub_menu[0][3][2] = new Array();
					temp_sub_menu[0][3][2][0] = "其它健康信息";
					temp_sub_menu[0][3][2][1] = "qita_zhuyuan_xinxi";
					temp_sub_menu[0][3][2][2] = "/tiantan_emr/JiankangDangan/Dangan/editDanganOtherInfo/patient_id/"+current_zhixing_id;

				
		temp_sub_menu[1] = new Array();
			temp_sub_menu[1][0] = "病史信息";
			temp_sub_menu[1][1] = "huanzhe_xinxi";
			temp_sub_menu[1][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiBasicInfo/patient_id/"+current_zhixing_id;
			temp_sub_menu[1][3] = new Array();
				temp_sub_menu[1][3][0] = new Array();
					temp_sub_menu[1][3][0][0] = "一般病史信息";
					temp_sub_menu[1][3][0][1] = "jiben_xinxi";
					temp_sub_menu[1][3][0][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiBasicInfo/patient_id/"+current_zhixing_id;
				temp_sub_menu[1][3][1] = new Array();
					temp_sub_menu[1][3][1][0] = "药物过敏史";
					temp_sub_menu[1][3][1][1] = "lianxi_fangshi";
					temp_sub_menu[1][3][1][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiYaowuInfo/patient_id/"+current_zhixing_id;
				temp_sub_menu[1][3][2] = new Array();
					temp_sub_menu[1][3][2][0] = "免疫预防接种史";
					temp_sub_menu[1][3][2][1] = "qita_zhuyuan_xinxi";
					temp_sub_menu[1][3][2][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiMianyiInfo/patient_id/"+current_zhixing_id;
				temp_sub_menu[1][3][3] = new Array();
					temp_sub_menu[1][3][3][0] = "其它病史";
					temp_sub_menu[1][3][3][1] = "zenren_yishi";
					temp_sub_menu[1][3][3][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiOtherInfo/patient_id/"+current_zhixing_id;
					
		temp_sub_menu[2] = new Array();
			temp_sub_menu[2][0] = "健康体检";
			temp_sub_menu[2][1] = "yiban_tijian_xiangmu";
			temp_sub_menu[2][2] = "/tiantan_emr/JiankangTijian/TijianZongjian/yibanxiangmu/tijian_id/"+current_zhixing_id;

			temp_sub_menu[2][3] = new Array();
				temp_sub_menu[2][3][0] = new Array();
					temp_sub_menu[2][3][0][0] = "内科";
					temp_sub_menu[2][3][0][1] = "neike";
					temp_sub_menu[2][3][0][2] = "/tiantan_emr/JiankangTijian/TijianNeike/showedit/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][1] = new Array();
					temp_sub_menu[2][3][1][0] = "外科";
					temp_sub_menu[2][3][1][1] = "waike";
					temp_sub_menu[2][3][1][2] = "/tiantan_emr/JiankangTijian/TijianWaike/showedit/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][2] = new Array();
					temp_sub_menu[2][3][2][0] = "妇科";
					temp_sub_menu[2][3][2][1] = "fuke";
					temp_sub_menu[2][3][2][2] = "/tiantan_emr/JiankangTijian/TijianFuke/showedit/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][3] = new Array();
					temp_sub_menu[2][3][3][0] = "口腔科";
					temp_sub_menu[2][3][3][1] = "kouqiangke";
					temp_sub_menu[2][3][3][2] = "/tiantan_emr/JiankangTijian/TijianKouqiangke/showedit/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][4] = new Array();
					temp_sub_menu[2][3][4][0] = "五官科";
					temp_sub_menu[2][3][4][1] = "wuguanke";
					temp_sub_menu[2][3][4][2] = "/tiantan_emr/JiankangTijian/TijianWuguanke/showedit/tijian_id/"+current_zhixing_id;

		temp_sub_menu[3] = new Array();
			temp_sub_menu[3][0] = "治未病体质判断";
			temp_sub_menu[3][1] = "zhiweibing_tizhi_panduan";
			temp_sub_menu[3][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/ShowZongjie/tijian_id/"+current_zhixing_id;
			temp_sub_menu[3][3] = new Array();
				temp_sub_menu[3][3][0] = new Array();
					temp_sub_menu[3][3][0][0] = "概况";
					temp_sub_menu[3][3][0][1] = "gaikuang";
					temp_sub_menu[3][3][0][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/ShowZongjie/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][1] = new Array();
					temp_sub_menu[3][3][1][0] = "平和质";
					temp_sub_menu[3][3][1][1] = "pinghezhi";
					temp_sub_menu[3][3][1][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/pinghe/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][2] = new Array();
					temp_sub_menu[3][3][2][0] = "阳虚质";
					temp_sub_menu[3][3][2][1] = "yangxuzhi";
					temp_sub_menu[3][3][2][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/yangxu/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][3] = new Array();
					temp_sub_menu[3][3][3][0] = "阴虚质";
					temp_sub_menu[3][3][3][1] = "yinxuzhi";
					temp_sub_menu[3][3][3][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/yinxu/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][4] = new Array();
					temp_sub_menu[3][3][4][0] = "痰湿质";
					temp_sub_menu[3][3][4][1] = "tanshizhi";
					temp_sub_menu[3][3][4][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/tanshi/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][5] = new Array();
					temp_sub_menu[3][3][5][0] = "湿热质";
					temp_sub_menu[3][3][5][1] = "shirezhi";
					temp_sub_menu[3][3][5][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/shire/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][6] = new Array();
					temp_sub_menu[3][3][6][0] = "血瘀质";
					temp_sub_menu[3][3][6][1] = "xueyuzhi";
					temp_sub_menu[3][3][6][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/xueyu/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][7] = new Array();
					temp_sub_menu[3][3][7][0] = "气郁质";
					temp_sub_menu[3][3][7][1] = "qiyuzhi";
					temp_sub_menu[3][3][7][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/qiyu/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][8] = new Array();
					temp_sub_menu[3][3][8][0] = "特禀质";
					temp_sub_menu[3][3][8][1] = "tebingzhi";
					temp_sub_menu[3][3][8][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/tebing/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][9] = new Array();
					temp_sub_menu[3][3][9][0] = "气虚质";
					temp_sub_menu[3][3][9][1] = "qixuzhi";
					temp_sub_menu[3][3][9][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/qixu/tijian_id/"+current_zhixing_id;
		
		temp_sub_menu[4] = new Array();
			temp_sub_menu[4][0] = "诊疗记录";
			temp_sub_menu[4][1] = "ruyuan_jilu";
			temp_sub_menu[4][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showZhenduanHistory/patient_id/"+current_zhixing_id;
			temp_sub_menu[4][3] = new Array();
				temp_sub_menu[4][3][0] = new Array();
					temp_sub_menu[4][3][0][0] = "诊断历史";
					temp_sub_menu[4][3][0][1] = "zhenduan_history";
					temp_sub_menu[4][3][0][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showZhenduanHistory/patient_id/"+current_zhixing_id;
				temp_sub_menu[4][3][1] = new Array();
					temp_sub_menu[4][3][1][0] = "病历记录";
					temp_sub_menu[4][3][1][1] = "bingli_history";
					temp_sub_menu[4][3][1][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showBingliHistory/patient_id/"+current_zhixing_id;
				temp_sub_menu[4][3][2] = new Array();
					temp_sub_menu[4][3][2][0] = "用药历史";
					temp_sub_menu[4][3][2][1] = "yongyao_history";
					temp_sub_menu[4][3][2][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showYongyaoHistory/patient_id/"+current_zhixing_id;
				temp_sub_menu[4][3][3] = new Array();
					temp_sub_menu[4][3][3][0] = "体征分析";
					temp_sub_menu[4][3][3][1] = "tizheng_history";
					temp_sub_menu[4][3][3][2] = "/tiantan_emr/Common/DataAnalysis/showLineChartPlot/patient_id/"+current_zhixing_id;
				temp_sub_menu[4][3][4] = new Array();
					temp_sub_menu[4][3][4][0] = "检查历史";
					temp_sub_menu[4][3][4][1] = "jiancha_history";
					temp_sub_menu[4][3][4][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showJianchaHistory/patient_id/"+current_zhixing_id;
		
		refreshSubMenu(temp_sub_menu);
}

//护士子菜单
function updateSubMenuByZhuyuanIDforHushi()
{
		var zhiliao_leibie = "西医治疗";
		$.ajaxSetup({
			async: false
		});
		$.get("http://"+server_url+"/tiantan_emr/Common/Data/getChuanghao", {zhuyuan_id: current_zhixing_id}, function(data){
			var temp_data = data.split("|");
			if(temp_data[0]!="")
				chuanghao = "/chuanghao/"+data;
			if(temp_data[1]!="")
				zhiliao_leibie = temp_data[1];
		});
		$.ajaxSetup({
			async: true
		});
		var xingming_url = "";
		if(current_patient_xingming!="")
		{
			xingming_url = "/xingming/"+current_patient_xingming;
		}
		
		//更新左侧患者姓名刷新功能
		var huanzhe_a = "<a href=\"/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetail/zhuyuan_id/"+current_zhixing_id+"/xingming/"+current_patient_xingming+"/zhuangtai/"+current_patient_zhuangtai+"\" target=\"conframe\" style=\"text-decoration:none;color:#000;\">当前患者："+current_patient_xingming+"</a>";
		$(".left_menu_title").html(huanzhe_a);
		$(".left_menu_title").css("color","black");
		
		var temp_sub_menu_bingli = new Array();
		var temp_sub_menu_linchuang = new Array();
		var temp_sub_menu_huli = new Array();
		continue_number_bingli = 0;
		continue_number_linchuang = 0;
		continue_number_huli = 0;

		temp_sub_menu_bingli[continue_number_bingli] = new Array();
			temp_sub_menu_bingli[continue_number_bingli][0] = "患者概览";
			temp_sub_menu_bingli[continue_number_bingli][1] = "zhuyuan_xinxi_zonglan";
			temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetail/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
		continue_number_bingli++;
		
		temp_sub_menu_bingli[continue_number_bingli] = new Array();
			temp_sub_menu_bingli[continue_number_bingli][0] = "病案首页";
			temp_sub_menu_bingli[continue_number_bingli][1] = "huanzhe_xinxi";
			temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/BinganShouye/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
		continue_number_bingli++;
		
		temp_sub_menu_bingli[continue_number_bingli] = new Array();
			temp_sub_menu_bingli[continue_number_bingli][0] = "入院记录";
			temp_sub_menu_bingli[continue_number_bingli][1] = "ruyuan_jilu";
			temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/RuyuanJilu/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
		continue_number_bingli++;
		
		temp_sub_menu_bingli[continue_number_bingli] = new Array();
			temp_sub_menu_bingli[continue_number_bingli][0] = "病程记录";
			temp_sub_menu_bingli[continue_number_bingli][1] = "bingcheng_jilu";
			temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showPrint/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
		continue_number_bingli++;

			if(current_patient_special_info=="孕妇")
			{
				temp_sub_menu_bingli[continue_number_bingli] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][0] = "产程记录";
					temp_sub_menu_bingli[continue_number_bingli][1] = "chancheng_jilu";
					temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showChanchengJilu/zhuyuan_id/"+current_zhixing_id;
					temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
						temp_sub_menu_bingli[continue_number_bingli][3][0] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][0][0] = "临产附页";
							temp_sub_menu_bingli[continue_number_bingli][3][0][1] = "linchan_fuye";
							temp_sub_menu_bingli[continue_number_bingli][3][0][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showLinchanFuye/zhuyuan_id/"+current_zhixing_id;
						temp_sub_menu_bingli[continue_number_bingli][3][1] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][1][0] = "伴行产程图";
							temp_sub_menu_bingli[continue_number_bingli][3][1][1] = "bangxing_chanchengtu";
							temp_sub_menu_bingli[continue_number_bingli][3][1][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showBanxingChanchengtu/zhuyuan_id/"+current_zhixing_id;
				continue_number_bingli++;

				temp_sub_menu_bingli[continue_number_bingli] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][0] = "新生儿记录";
					temp_sub_menu_bingli[continue_number_bingli][1] = "xinshenger_jilu";
					temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/Patient/editPatientXinshenerInfo/muqin_zhuyuan_id/"+current_zhixing_id;
					temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
						temp_sub_menu_bingli[continue_number_bingli][3][0] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][0][0] = "出生记录";
							temp_sub_menu_bingli[continue_number_bingli][3][0][1] = "xinshenger_chusheng_jilu";
							temp_sub_menu_bingli[continue_number_bingli][3][0][2] = "/tiantan_emr/ZhuyuanYishi/XinshengerJilu/showView/muqin_zhuyuan_id/"+current_zhixing_id;
						temp_sub_menu_bingli[continue_number_bingli][3][1] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][1][0] = "查房记录";
							temp_sub_menu_bingli[continue_number_bingli][3][1][1] = "xinshenger_chafang_jilu";
							temp_sub_menu_bingli[continue_number_bingli][3][1][2] = "/tiantan_emr/ZhuyuanYishi/XinshengerChafangjilu/showXinshengerChafangjilu/muqin_zhuyuan_id/"+current_zhixing_id;
						temp_sub_menu_bingli[continue_number_bingli][3][2] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][2][0] = "三测单";
							temp_sub_menu_bingli[continue_number_bingli][3][2][1] = "xinshenger_sancedan";
							temp_sub_menu_bingli[continue_number_bingli][3][2][2] = "/tiantan_emr/Common/TiwenJiludan/showList/muqin_zhuyuan_id/"+current_zhixing_id;
						temp_sub_menu_bingli[continue_number_bingli][3][3] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][3][0] = "体征记录";
							temp_sub_menu_bingli[continue_number_bingli][3][3][1] = "xinshenger_tizhengjilu";
							temp_sub_menu_bingli[continue_number_bingli][3][3][2] = "/tiantan_emr/TiwenJiludan/showOneweek/muqin_zhuyuan_id/"+current_zhixing_id;
						temp_sub_menu_bingli[continue_number_bingli][3][4] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][4][0] = "医嘱管理";
							temp_sub_menu_bingli[continue_number_bingli][3][4][1] = "xinshenger_yizhu";
							temp_sub_menu_bingli[continue_number_bingli][3][4][2] = "/tiantan_emr/Common/Yizhuguanli/showChangqi/muqin_zhuyuan_id/"+current_zhixing_id;
				continue_number_bingli++;
			}
			if(current_patient_special_info=="双胞胎孕妇")
			{
				temp_sub_menu_bingli[continue_number_bingli] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][0] = "产程记录";
					temp_sub_menu_bingli[continue_number_bingli][1] = "chancheng_jilu";
					temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showChanchengJilu/zhuyuan_id/"+current_zhixing_id;
					temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
						temp_sub_menu_bingli[continue_number_bingli][3][0] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][0][0] = "临产附页";
							temp_sub_menu_bingli[continue_number_bingli][3][0][1] = "linchan_fuye";
							temp_sub_menu_bingli[continue_number_bingli][3][0][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showLinchanFuye/zhuyuan_id/"+current_zhixing_id;
						temp_sub_menu_bingli[continue_number_bingli][3][1] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][1][0] = "伴行产程图";
							temp_sub_menu_bingli[continue_number_bingli][3][1][1] = "bangxing_chanchengtu";
							temp_sub_menu_bingli[continue_number_bingli][3][1][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showBanxingChanchengtu/zhuyuan_id/"+current_zhixing_id;
				continue_number_bingli++;

				temp_sub_menu_bingli[continue_number_bingli] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][0] = "新生儿记录1";
					temp_sub_menu_bingli[continue_number_bingli][1] = "xinshenger_jilu";
					temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/Patient/editPatientXinshenerInfo/zhuyuan_id/"+current_zhixing_id+"-1";
					temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
						temp_sub_menu_bingli[continue_number_bingli][3][0] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][0][0] = "出生记录";
							temp_sub_menu_bingli[continue_number_bingli][3][0][1] = "xinshenger_chusheng_jilu";
							temp_sub_menu_bingli[continue_number_bingli][3][0][2] = "/tiantan_emr/ZhuyuanYishi/XinshengerJilu/showView/zhuyuan_id/"+current_zhixing_id+"-1";
						temp_sub_menu_bingli[continue_number_bingli][3][1] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][1][0] = "查房记录";
							temp_sub_menu_bingli[continue_number_bingli][3][1][1] = "xinshenger_chafang_jilu";
							temp_sub_menu_bingli[continue_number_bingli][3][1][2] = "/tiantan_emr/ZhuyuanYishi/XinshengerChafangjilu/showXinshengerChafangjilu/zhuyuan_id/"+current_zhixing_id+"-1";
						temp_sub_menu_bingli[continue_number_bingli][3][2] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][2][0] = "三测单";
							temp_sub_menu_bingli[continue_number_bingli][3][2][1] = "xinshenger_sancedan";
							temp_sub_menu_bingli[continue_number_bingli][3][2][2] = "/tiantan_emr/Common/TiwenJiludan/showList/zhuyuan_id/"+current_zhixing_id+"-1";
						temp_sub_menu_bingli[continue_number_bingli][3][3] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][3][0] = "体征记录";
							temp_sub_menu_bingli[continue_number_bingli][3][3][1] = "xinshenger_tizhengjilu";
							temp_sub_menu_bingli[continue_number_bingli][3][3][2] = "/tiantan_emr/TiwenJiludan/showOneweek/zhuyuan_id/"+current_zhixing_id+"-1";
						temp_sub_menu_bingli[continue_number_bingli][3][4] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][4][0] = "医嘱管理";
							temp_sub_menu_bingli[continue_number_bingli][3][4][1] = "xinshenger_yizhu";
							temp_sub_menu_bingli[continue_number_bingli][3][4][2] = "/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+current_zhixing_id+"-1";
				continue_number_bingli++;
				

				temp_sub_menu_bingli[continue_number_bingli] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][0] = "新生儿记录2";
					temp_sub_menu_bingli[continue_number_bingli][1] = "xinshenger_jilu_er";
					temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/Patient/editPatientXinshenerInfo/zhuyuan_id/"+current_zhixing_id+"-2";
					temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
						temp_sub_menu_bingli[continue_number_bingli][3][0] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][0][0] = "出生记录";
							temp_sub_menu_bingli[continue_number_bingli][3][0][1] = "xinshenger_chusheng_jilu";
							temp_sub_menu_bingli[continue_number_bingli][3][0][2] = "/tiantan_emr/ZhuyuanYishi/XinshengerJilu/showView/zhuyuan_id/"+current_zhixing_id+"-2";
						temp_sub_menu_bingli[continue_number_bingli][3][1] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][1][0] = "查房记录";
							temp_sub_menu_bingli[continue_number_bingli][3][1][1] = "xinshenger_chafang_jilu";
							temp_sub_menu_bingli[continue_number_bingli][3][1][2] = "/tiantan_emr/ZhuyuanYishi/XinshengerChafangjilu/showXinshengerChafangjilu/zhuyuan_id/"+current_zhixing_id+"-2";
						temp_sub_menu_bingli[continue_number_bingli][3][2] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][2][0] = "三测单";
							temp_sub_menu_bingli[continue_number_bingli][3][2][1] = "xinshenger_sancedan";
							temp_sub_menu_bingli[continue_number_bingli][3][2][2] = "/tiantan_emr/Common/TiwenJiludan/showList/zhuyuan_id/"+current_zhixing_id+"-2";
						temp_sub_menu_bingli[continue_number_bingli][3][3] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][3][0] = "体征记录";
							temp_sub_menu_bingli[continue_number_bingli][3][3][1] = "xinshenger_tizhengjilu";
							temp_sub_menu_bingli[continue_number_bingli][3][3][2] = "/tiantan_emr/TiwenJiludan/showOneweek/zhuyuan_id/"+current_zhixing_id+"-2";
						temp_sub_menu_bingli[continue_number_bingli][3][4] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][4][0] = "医嘱管理";
							temp_sub_menu_bingli[continue_number_bingli][3][4][1] = "xinshenger_yizhu";
							temp_sub_menu_bingli[continue_number_bingli][3][4][2] = "/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+current_zhixing_id+"-2";
				continue_number_bingli++;
				
			}
			var chuyuan_jilu_mingcheng = "";
			switch(current_patient_zhuangtai)
			{
				case "24小时内出院":
					chuyuan_jilu_mingcheng = "ChuyuanShortJilu";
				break;
				case "24小时内自动出院":
					chuyuan_jilu_mingcheng = "ChuyuanShortZidongJilu";
				break;
				case "24小时内死亡":
					chuyuan_jilu_mingcheng = "ChuyuanShortSiwangJilu";
				break;
				case "死亡":
					chuyuan_jilu_mingcheng = "ChuyuanSiwangJilu";
				break;
				case "已出院":
					chuyuan_jilu_mingcheng = "ChuyuanJilu";
				break;
				case "自动出院":
					chuyuan_jilu_mingcheng = "ChuyuanZidongJilu";
				break;
				default:
					chuyuan_jilu_mingcheng = "zhuyuanzhong";
				break;
			}
			
			if(chuyuan_jilu_mingcheng!="zhuyuanzhong")
			{
				temp_sub_menu_bingli[continue_number_bingli] = new Array();
					temp_sub_menu_bingli[continue_number_bingli][0] = "出院记录";
					temp_sub_menu_bingli[continue_number_bingli][1] = "chuyuan_jilu";
					temp_sub_menu_bingli[continue_number_bingli][2] = "/tiantan_emr/ZhuyuanYishi/"+chuyuan_jilu_mingcheng+"/showView/zhuyuan_id/"+current_zhixing_id;
					temp_sub_menu_bingli[continue_number_bingli][3] = new Array();
						temp_sub_menu_bingli[continue_number_bingli][3][0] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][0][0] = "出院信息";
							temp_sub_menu_bingli[continue_number_bingli][3][0][1] = "chuyuan_info";
							temp_sub_menu_bingli[continue_number_bingli][3][0][2] = "/tiantan_emr/ZhuyuanYishi/"+chuyuan_jilu_mingcheng+"/editChuyuanInfo/zhuyuan_id/"+current_zhixing_id;
						temp_sub_menu_bingli[continue_number_bingli][3][1] = new Array();
							temp_sub_menu_bingli[continue_number_bingli][3][1][0] = "记录填写";
							temp_sub_menu_bingli[continue_number_bingli][3][1][1] = "jilu_tianxie";
							temp_sub_menu_bingli[continue_number_bingli][3][1][2] = "/tiantan_emr/ZhuyuanYishi/"+chuyuan_jilu_mingcheng+"/editJilu/zhuyuan_id/"+current_zhixing_id;
				continue_number_bingli++;
			}

		temp_sub_menu_huli[continue_number_huli] = new Array();
			temp_sub_menu_huli[continue_number_huli][0] = "护理记录";
			temp_sub_menu_huli[continue_number_huli][1] = "huli_jilu";
			temp_sub_menu_huli[continue_number_huli][2] = "/tiantan_emr/HuliJilu/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_huli[continue_number_huli][3] = new Array();
				temp_sub_menu_huli[continue_number_huli][3][0] = new Array();
				temp_sub_menu_huli[continue_number_huli][3][0][0] = "护理管理";
				temp_sub_menu_huli[continue_number_huli][3][0][1] = "yiban_huli_jilu";
				temp_sub_menu_huli[continue_number_huli][3][0][2] = "/tiantan_emr/Common/HuliJilu/editZongjie/zhuyuan_id/"+current_zhixing_id;
		continue_number_huli++;
		
		temp_sub_menu_huli[continue_number_huli] = new Array();
			temp_sub_menu_huli[continue_number_huli][0] = "体征记录";
			temp_sub_menu_huli[continue_number_huli][1] = "tizhengjilu";
			temp_sub_menu_huli[continue_number_huli][2] = "/tiantan_emr/TiwenJiludan/showOneweek/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_huli[continue_number_huli][3] = new Array();
		continue_number_huli++;
		
		temp_sub_menu_huli[continue_number_huli] = new Array();
			temp_sub_menu_huli[continue_number_huli][0] = "三测单";
			temp_sub_menu_huli[continue_number_huli][1] = "sancedan";
			temp_sub_menu_huli[continue_number_huli][2] = "/tiantan_emr/Common/TiwenJiludan/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_huli[continue_number_huli][3] = new Array();
		continue_number_huli++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "医嘱管理";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "yizhu_guanli";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][0] = "口服医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][1] = "changqi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/yongfa|口服"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][1] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][0] = "输液医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][1] = "linshi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/yongfa_type|输液"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][2] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][0] = "中草药医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][1] = "changqi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/yongfa_type|中草药"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][0] = "其他医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][1] = "linshi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/others"+xingming_url+chuanghao;
		continue_number_linchuang++;
		if(shifou_zhuyuan_chufang=="on" || zhiliao_leibie!="西医治疗")
		{
			temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][0] = "处方管理";
				temp_sub_menu_linchuang[continue_number_linchuang][1] = "chufang_guanli";
				temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/Chufangguanli/showList/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
			continue_number_linchuang++;
		}
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "辅助检查";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "fuzhu_jiancha";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showZongjie/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][0] = "添加检查";
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][1] = "tianjia_jiancha";
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showAddJiancha/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][1] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][0] = "查看检查";
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][1] = "chakan_jiancha";
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showList/zhuyuan_id/"+current_zhixing_id;
		continue_number_linchuang++;

		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "健康分析";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "jiankang_fenxi";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/DataAnalysis/showLineChartPlot/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;
		
		temp_sub_menu_huli[continue_number_huli] = new Array();
			temp_sub_menu_huli[continue_number_huli][0] = "护理文书";
			temp_sub_menu_huli[continue_number_huli][1] = "huli_wenshu";
			temp_sub_menu_huli[continue_number_huli][2] = "/tiantan_emr/ZhuyuanHushi/HuliWenshu/showHuliPingguDan/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_huli[continue_number_huli][3] = new Array();
				temp_sub_menu_huli[continue_number_huli][3][0] = new Array();
					temp_sub_menu_huli[continue_number_huli][3][0][0] = "护理评估单";
					temp_sub_menu_huli[continue_number_huli][3][0][1] = "huli_pinggudan";
					temp_sub_menu_huli[continue_number_huli][3][0][2]  = "/tiantan_emr/ZhuyuanHushi/HuliWenshu/showHuliPingguDan/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_huli[continue_number_huli][3][1] = new Array();
					temp_sub_menu_huli[continue_number_huli][3][1][0] = "健康宣教";
					temp_sub_menu_huli[continue_number_huli][3][1][1] = "jiankang_xuanjiao";
					temp_sub_menu_huli[continue_number_huli][3][1][2]  = "/tiantan_emr/ZhuyuanHushi/HuliWenshu/showJiankangXuanjiao/zhuyuan_id/"+current_zhixing_id;
		continue_number_huli++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "住院费用";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "zhuyuan_feiyong";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/Feiyong/editZhuyuanFeiyong/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;
		
		refreshSubMultiMenu(temp_sub_menu_bingli,temp_sub_menu_linchuang,temp_sub_menu_huli);
		//refreshSubMenu(temp_sub_menu);
}

function updateSubMenuByDanweiID()
{
	var temp_sub_menu = new Array();
	
		temp_sub_menu[1] = new Array();
			temp_sub_menu[1][0] = "添加单位体检";
			temp_sub_menu[1][1] = "tianjia_danwei_tijian";
			temp_sub_menu[1][2] = "/tiantan_emr/JiankangTijian/TijianDanwei/showAdd/danwei_id/"+current_danwei_id;
			temp_sub_menu[1][3] = new Array();
				
		temp_sub_menu[0] = new Array();
			temp_sub_menu[0][0] = "查看体检信息";
			temp_sub_menu[0][1] = "chakan_tijian_xinxi";
			temp_sub_menu[0][2] = "/tiantan_emr/JiankangTijian/Danwei/viewDetail/danwei_id/"+current_danwei_id;
			temp_sub_menu[0][3] = new Array();

	refreshSubMenu(temp_sub_menu);
}

function updateSubMenuByDanweiTijianID()
{
	var temp_sub_menu = new Array();
	
		temp_sub_menu[0] = new Array();
			temp_sub_menu[0][0] = "添加体检者";
			temp_sub_menu[0][1] = "tianjia_tijian_zhe";
			temp_sub_menu[0][2] = "/tiantan_emr/JiankangTijian/PatientBasicInfo/showAdd/danwei_tijian_id/"+current_zhixing_id+"/danwei_id/"+current_danwei_id;
			temp_sub_menu[0][3] = new Array();
				
		temp_sub_menu[1] = new Array();
			temp_sub_menu[1][0] = "查看体检信息";
			temp_sub_menu[1][1] = "chakan_tijian_xinxi";
			temp_sub_menu[1][2] = "/tiantan_emr/JiankangTijian/TijianDanwei/viewDetail/danwei_tijian_id/"+current_zhixing_id;
			temp_sub_menu[1][3] = new Array();
			
		temp_sub_menu[2] = new Array();
			temp_sub_menu[2][0] = "批量添加体检者";
			temp_sub_menu[2][1] = "piliang_tianjia_tijianzhe";
			temp_sub_menu[2][2] = "/tiantan_emr/JiankangTijian/TijianDanwei/showGroup/danwei_tijian_id/"+current_zhixing_id;
			temp_sub_menu[2][3] = new Array();

		temp_sub_menu[3] = new Array();
			temp_sub_menu[3][0] = "查看导引单";
			temp_sub_menu[3][1] = "chakan_daoyindan";
			temp_sub_menu[3][2] = "/tiantan_emr/JiankangTijian/TijianDaoyindan/showDanwei/danwei_tijian_id/"+current_zhixing_id;
			temp_sub_menu[3][3] = new Array();

		temp_sub_menu[4] = new Array();
			temp_sub_menu[4][0] = "单位体检报告";
			temp_sub_menu[4][1] = "danwei_tijian_baogao";
			temp_sub_menu[4][2] = "/tiantan_emr/JiankangTijian/TijianDanwei/showReportList/danwei_tijian_id/"+current_zhixing_id;
			temp_sub_menu[4][3] = new Array();

		temp_sub_menu[5] = new Array();
			temp_sub_menu[5][0] = "个人体检报告";
			temp_sub_menu[5][1] = "geren_tijian_baogao";
			temp_sub_menu[5][2] = "/tiantan_emr/JiankangTijian/TijianDanwei/showTijianList/danwei_tijian_id/"+current_zhixing_id;
			temp_sub_menu[5][3] = new Array();

	refreshSubMenu(temp_sub_menu);
}

function updateSubMenuByTijianID()
{
	var temp_sub_menu = new Array();
		
		temp_sub_menu[0] = new Array();
			temp_sub_menu[0][0] = "导引单";
			temp_sub_menu[0][1] = "daoyindan";
			temp_sub_menu[0][2] = "/tiantan_emr/JiankangTijian/TijianDaoyindan/showGeren/tijian_id/"+current_zhixing_id+"/danwei_tijian_id/"+current_danwei_tijian_id;
			                                
			temp_sub_menu[0][3] = new Array();

		temp_sub_menu[1] = new Array();
			temp_sub_menu[1][0] = "一般体检项目";
			temp_sub_menu[1][1] = "yiban_tijian_xiangmu";
			temp_sub_menu[1][2] = "/tiantan_emr/JiankangTijian/TijianZongjian/yibanxiangmu/tijian_id/"+current_zhixing_id+"/danwei_tijian_id/"+current_danwei_tijian_id;
		                                    	 
			
			temp_sub_menu[1][3] = new Array();
				temp_sub_menu[1][3][0] = new Array();
					temp_sub_menu[1][3][0][0] = "内科";
					temp_sub_menu[1][3][0][1] = "neike";
					temp_sub_menu[1][3][0][2] = "/tiantan_emr/JiankangTijian/TijianNeike/showedit/tijian_id/"+current_zhixing_id;
				temp_sub_menu[1][3][1] = new Array();
					temp_sub_menu[1][3][1][0] = "外科";
					temp_sub_menu[1][3][1][1] = "waike";
					temp_sub_menu[1][3][1][2] = "/tiantan_emr/JiankangTijian/TijianWaike/showedit/tijian_id/"+current_zhixing_id;
				temp_sub_menu[1][3][2] = new Array();
					temp_sub_menu[1][3][2][0] = "妇科";
					temp_sub_menu[1][3][2][1] = "fuke";
					temp_sub_menu[1][3][2][2] = "/tiantan_emr/JiankangTijian/TijianFuke/showedit/tijian_id/"+current_zhixing_id;
				temp_sub_menu[1][3][3] = new Array();
					temp_sub_menu[1][3][3][0] = "口腔科";
					temp_sub_menu[1][3][3][1] = "kouqiangke";
					temp_sub_menu[1][3][3][2] = "/tiantan_emr/JiankangTijian/TijianKouqiangke/showedit/tijian_id/"+current_zhixing_id;
				temp_sub_menu[1][3][4] = new Array();
					temp_sub_menu[1][3][4][0] = "五官科";
					temp_sub_menu[1][3][4][1] = "wuguanke";
					temp_sub_menu[1][3][4][2] = "/tiantan_emr/JiankangTijian/TijianWuguanke/showedit/tijian_id/"+current_zhixing_id;

		temp_sub_menu[2] = new Array();
			temp_sub_menu[2][0] = "治未病体质判断";
			temp_sub_menu[2][1] = "zhiweibing_tizhi_panduan";
			temp_sub_menu[2][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/ShowZongjie/tijian_id/"+current_zhixing_id;
			temp_sub_menu[2][3] = new Array();
				temp_sub_menu[2][3][0] = new Array();
					temp_sub_menu[2][3][0][0] = "病史";
					temp_sub_menu[2][3][0][1] = "bingshi";
					temp_sub_menu[2][3][0][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/bingshi/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][1] = new Array();
					temp_sub_menu[2][3][1][0] = "平和质";
					temp_sub_menu[2][3][1][1] = "pinghezhi";
					temp_sub_menu[2][3][1][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/pinghe/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][2] = new Array();
					temp_sub_menu[2][3][2][0] = "阳虚质";
					temp_sub_menu[2][3][2][1] = "yangxuzhi";
					temp_sub_menu[2][3][2][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/yangxu/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][3] = new Array();
					temp_sub_menu[2][3][3][0] = "阴虚质";
					temp_sub_menu[2][3][3][1] = "yinxuzhi";
					temp_sub_menu[2][3][3][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/yinxu/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][4] = new Array();
					temp_sub_menu[2][3][4][0] = "痰湿质";
					temp_sub_menu[2][3][4][1] = "tanshizhi";
					temp_sub_menu[2][3][4][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/tanshi/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][5] = new Array();
					temp_sub_menu[2][3][5][0] = "湿热质";
					temp_sub_menu[2][3][5][1] = "shirezhi";
					temp_sub_menu[2][3][5][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/shire/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][6] = new Array();
					temp_sub_menu[2][3][6][0] = "血瘀质";
					temp_sub_menu[2][3][6][1] = "xueyuzhi";
					temp_sub_menu[2][3][6][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/xueyu/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][7] = new Array();
					temp_sub_menu[2][3][7][0] = "气郁质";
					temp_sub_menu[2][3][7][1] = "qiyuzhi";
					temp_sub_menu[2][3][7][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/qiyu/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][8] = new Array();
					temp_sub_menu[2][3][8][0] = "特禀质";
					temp_sub_menu[2][3][8][1] = "tebingzhi";
					temp_sub_menu[2][3][8][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/tebing/tijian_id/"+current_zhixing_id;
				temp_sub_menu[2][3][9] = new Array();
					temp_sub_menu[2][3][9][0] = "气虚质";
					temp_sub_menu[2][3][9][1] = "qixuzhi";
					temp_sub_menu[2][3][9][2] = "/tiantan_emr/JiankangTijian/PatientZhongyitizhi/showedit/type/qixu/tijian_id/"+current_zhixing_id;
		
		temp_sub_menu[3] = new Array();
			temp_sub_menu[3][0] = "检验科项目";
			temp_sub_menu[3][1] = "jianyanke_xiangmu";
			temp_sub_menu[3][2] = "/tiantan_emr/JiankangTijian/TijianZongjian/jianyanke/tijian_id/"+current_zhixing_id+"/danwei_tijian_id/"+current_danwei_tijian_id;
			                                   
			temp_sub_menu[3][3] = new Array();
			
 		   temp_sub_menu[3][3][0] = new Array();
					temp_sub_menu[3][3][0][0] = "大生化";
					temp_sub_menu[3][3][0][1] = "dashenghua";
					temp_sub_menu[3][3][0][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_dashenghua/jianyan_mingcheng/大生化/tijian_id/"+current_zhixing_id;																					
 
				temp_sub_menu[3][3][1] = new Array();
					temp_sub_menu[3][3][1][0] = "尿常规";
					temp_sub_menu[3][3][1][1] = "niaochangguo";
					temp_sub_menu[3][3][1][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_niaochanggui/jianyan_mingcheng/尿常规/tijian_id/"+current_zhixing_id;																			               
			
	
				temp_sub_menu[3][3][2] = new Array();
					temp_sub_menu[3][3][2][0] = "血脂";
					temp_sub_menu[3][3][2][1] = "xuezhi";
					temp_sub_menu[3][3][2][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_xuezhi/jianyan_mingcheng/血脂/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][3] = new Array();
					temp_sub_menu[3][3][3][0] = "肝功能";
					temp_sub_menu[3][3][3][1] = "gangongneng";
					temp_sub_menu[3][3][3][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_gangongneng/jianyan_mingcheng/肝功能/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][4] = new Array();
					temp_sub_menu[3][3][4][0] = "肾功能";
					temp_sub_menu[3][3][4][1] = "shengongneng";
					temp_sub_menu[3][3][4][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_shengongneng/jianyan_mingcheng/肾功能/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][5] = new Array();
					temp_sub_menu[3][3][5][0] = "血常规";
					temp_sub_menu[3][3][5][1] = "xuechanggui";
					temp_sub_menu[3][3][5][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_xuechanggui/jianyan_mingcheng/血常规/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][6] = new Array();
					temp_sub_menu[3][3][6][0] = "乙肝五项";
					temp_sub_menu[3][3][6][1] = "yiganwuxiang";
					temp_sub_menu[3][3][6][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_yiganwuxiang/jianyan_mingcheng/乙肝五项/tijian_id/"+current_zhixing_id;;
				temp_sub_menu[3][3][7] = new Array();
					temp_sub_menu[3][3][7][0] = "癌胚抗原";
					temp_sub_menu[3][3][7][1] = "aipeikangyuan";
					temp_sub_menu[3][3][7][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_aipeikangyuan/jianyan_mingcheng/癌胚抗原/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][8] = new Array();
					temp_sub_menu[3][3][8][0] = "胃幽门螺旋杆菌抗体";
					temp_sub_menu[3][3][8][1] = "weiyoumenluoxuanganjunkangti";
					temp_sub_menu[3][3][8][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_weiyoumenluoxuanganjunkangti/jianyan_mingcheng/胃幽门螺旋杆菌抗体/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][9] = new Array();
					temp_sub_menu[3][3][9][0] = "糖化血红蛋白";
					temp_sub_menu[3][3][9][1] = "tanghuaxuehongdanbai";
					temp_sub_menu[3][3][9][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_tanghuaxuehongdanbai/jianyan_mingcheng/糖化血红蛋白/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][10] = new Array();
					temp_sub_menu[3][3][10][0] = "阴道图片";
					temp_sub_menu[3][3][10][1] = "yindaotupian";
					temp_sub_menu[3][3][10][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_yindaotupian/jianyan_mingcheng/阴道图片/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][11] = new Array();
					temp_sub_menu[3][3][11][0] = "便常规";
					temp_sub_menu[3][3][11][1] = "bianchanggui";
					temp_sub_menu[3][3][11][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_bianchanggui/jianyan_mingcheng/便常规/tijian_id/"+current_zhixing_id;
				temp_sub_menu[3][3][12] = new Array();
					temp_sub_menu[3][3][12][0] = "便潜血";
					temp_sub_menu[3][3][12][1] = "bianqianxue";
					temp_sub_menu[3][3][12][2] = "/tiantan_emr/JiankangTijian/JianyanXiangmu/showedit/jianyan_table_name/jianyan_table_bianqianxue/jianyan_mingcheng/便潜血/tijian_id/"+current_zhixing_id;

		temp_sub_menu[4] = new Array();
			temp_sub_menu[4][0] = "超声科项目";
			temp_sub_menu[4][1] = "chaoshengke_xiangmu";
			temp_sub_menu[4][2] = "/tiantan_emr/JiankangTijian/TijianZongjian/chaoshengke/tijian_id/"+current_zhixing_id+"/danwei_tijian_id/"+current_danwei_tijian_id;

			temp_sub_menu[4][3] = new Array();
				temp_sub_menu[4][3][0] = new Array();
					temp_sub_menu[4][3][0][0] = "彩色超声";
					temp_sub_menu[4][3][0][1] = "caise_chaosheng";
					temp_sub_menu[4][3][0][2] = "/tiantan_emr/JiankangTijian/YingxiangXiangmu/showedit/jianyan_table_name/yingxiang_table_caisechaosheng/jianyan_mingcheng/彩色超声/tijian_id/"+current_zhixing_id;

				temp_sub_menu[4][3][1] = new Array();
					temp_sub_menu[4][3][1][0] = "黑白超声";
					temp_sub_menu[4][3][1][1] = "heibai_chaosheng";
					temp_sub_menu[4][3][1][2] = "/tiantan_emr/JiankangTijian/YingxiangXiangmu/showedit/jianyan_table_name/yingxiang_table_heibaichaosheng/jianyan_mingcheng/黑白超声/tijian_id/"+current_zhixing_id;
				temp_sub_menu[4][3][2] = new Array();
					temp_sub_menu[4][3][2][0] = "心电图";
					temp_sub_menu[4][3][2][1] = "xindiantu";
					temp_sub_menu[4][3][2][2] = "/tiantan_emr/JiankangTijian/YingxiangXiangmu/showedit/jianyan_table_name/yingxiang_table_xindiantu/jianyan_mingcheng/心电图/tijian_id/"+current_zhixing_id;
				temp_sub_menu[4][3][3] = new Array();
					temp_sub_menu[4][3][3][0] = "经颅多普勒超声";
					temp_sub_menu[4][3][3][1] = "jingluduopulechaosheng";
					temp_sub_menu[4][3][3][2] = "/tiantan_emr/JiankangTijian/YingxiangXiangmu/showedit/jianyan_table_name/yingxiang_table_jingluduopulechaosheng/jianyan_mingcheng/经颅多普勒超声/tijian_id/"+current_zhixing_id;

		temp_sub_menu[5] = new Array();
			temp_sub_menu[5][0] = "放射科项目";
			temp_sub_menu[5][1] = "fangsheke_xiangmu";
			temp_sub_menu[5][2] = "/tiantan_emr/JiankangTijian/TijianZongjian/fangsheke/tijian_id/"+current_zhixing_id+"/danwei_tijian_id/"+current_danwei_tijian_id;

			temp_sub_menu[5][3] = new Array();
				temp_sub_menu[5][3][0] = new Array();
					temp_sub_menu[5][3][0][0] = "CT";
					temp_sub_menu[5][3][0][1] = "CT";
					temp_sub_menu[5][3][0][2] = "/tiantan_emr/JiankangTijian/YingxiangXiangmu/showEdit/jianyan_table_name/yingxiang_table_ct/jianyan_mingcheng/CT/tijian_id/"+current_zhixing_id;

				temp_sub_menu[5][3][1] = new Array();
					temp_sub_menu[5][3][1][0] = "DR";
					temp_sub_menu[5][3][1][1] = "DR";
					temp_sub_menu[5][3][1][2] = "/tiantan_emr/JiankangTijian/YingxiangXiangmu/showEdit/jianyan_table_name/yingxiang_table_dr/jianyan_mingcheng/DR/tijian_id/"+current_zhixing_id+"/danwei_tijian_id/"+current_danwei_tijian_id;;

				temp_sub_menu[5][3][2] = new Array();
					temp_sub_menu[5][3][2][0] = "数字胃肠造影";
					temp_sub_menu[5][3][2][1] = "shuziweichang_zaoying";
					temp_sub_menu[5][3][2][2] = "/tiantan_emr/JiankangTijian/YingxiangXiangmu/showEdit/jianyan_table_name/yingxiang_table_shuziweichangzaoying/jianyan_mingcheng/数字胃肠造影/tijian_id/"+current_zhixing_id;
		temp_sub_menu[6] = new Array();
			temp_sub_menu[6][0] = "个人体检报告";
			temp_sub_menu[6][1] = "geren_tijian_baogao";
	    temp_sub_menu[6][2] = "/tiantan_emr/JiankangTijian/GerenTijianBaogao/showView/tijian_id/"+current_zhixing_id+"/danwei_tijian_id/"+current_danwei_tijian_id+"/server_url/"+server_url;
			temp_sub_menu[6][3] = new Array();
				
	refreshSubMenu(temp_sub_menu);
}

function updateSubMenuByMenzhenIDforYishi()
{
		var temp_sub_menu = new Array();
			
		temp_sub_menu[0] = new Array();
			temp_sub_menu[0][0] = "门诊病案首页";
			temp_sub_menu[0][1] = "huanzhe_xinxi";
			temp_sub_menu[0][2] = "/tiantan_emr/MenzhenYishi/Patient/showPatientMenzhenDetail/menzhen_id/"+current_zhixing_id+"###";
			temp_sub_menu[0][3] = new Array();
				temp_sub_menu[0][3][0] = new Array();
					temp_sub_menu[0][3][0][0] = "基本信息";
					temp_sub_menu[0][3][0][1] = "jiben_xinxi";
					temp_sub_menu[0][3][0][2] = "/tiantan_emr/MenzhenYishi/Patient/editPatientBasicInfo/menzhen_id/"+current_zhixing_id+"/###";
				temp_sub_menu[0][3][1] = new Array();
					temp_sub_menu[0][3][1][0] = "联系方式";
					temp_sub_menu[0][3][1][1] = "lianxi_fangshi";
					temp_sub_menu[0][3][1][2] = "/tiantan_emr/MenzhenYishi/Patient/editPatientContactInfo/menzhen_id/"+current_zhixing_id;
				temp_sub_menu[0][3][2] = new Array();
					temp_sub_menu[0][3][2][0] = "其他住院信息";
					temp_sub_menu[0][3][2][1] = "qita_zhuyuan_xinxi";
					temp_sub_menu[0][3][2][2] = "/tiantan_emr/MenzhenYishi/Patient/editPatientZhuyuanInfo/menzhen_id/"+current_zhixing_id;

		temp_sub_menu[1] = new Array();
			temp_sub_menu[1][0] = "门诊诊断";
			temp_sub_menu[1][1] = "zhenduan";
			temp_sub_menu[1][2] = "/tiantan_emr/MenzhenYishi/Zhenduan/showMenzhenZhenduan/zhixing_type/门诊/zhixing_id/"+current_zhixing_id;
			temp_sub_menu[1][3] = new Array();
			
		temp_sub_menu[2] = new Array();
			temp_sub_menu[2][0] = "辅助检查";
			temp_sub_menu[2][1] = "fuzhu_jiancha";
			temp_sub_menu[2][2] = "/tiantan_emr/MenzhenYishi/Jiancha/showZongjie/menzhen_id/"+current_zhixing_id;
			temp_sub_menu[2][3] = new Array();
				temp_sub_menu[2][3][0] = new Array();
					temp_sub_menu[2][3][0][0] = "添加检查";
					temp_sub_menu[2][3][0][1] = "tianjia_jiancha";
					temp_sub_menu[2][3][0][2] = "/tiantan_emr/MenzhenYishi/Jiancha/showAddJiancha/menzhen_id/"+current_zhixing_id;
				temp_sub_menu[2][3][1] = new Array();
					temp_sub_menu[2][3][1][0] = "查看检查";
					temp_sub_menu[2][3][1][1] = "chakan_jiancha";
					temp_sub_menu[2][3][1][2] = "/tiantan_emr/MenzhenYishi/Jiancha/showList/menzhen_id/"+current_zhixing_id;
		
		refreshSubMenu(temp_sub_menu);
}

function addTreeViewEvent()
{
	$("div.menu_link>li>a").click(function(){
		if($(this).parent().attr("state")=="closed")
		{
			$("li [state='opened']").each(function(){
				$(this).css("color","white");
				$(this).attr("state","closed");
				$(this).next().find("a").css("color","white");
				$(this).next().hide();
			});
			$(this).css("color","black");
			$(this).next().show();
			$(this).attr("state","opened");
		}
		else
		{
			$(this).next().hide();
			$(this).next().find("a").css("color","white");
		}
	});
	
	$("div.menu_link>li>ul>li>a").click(function(){
		$(this).parent().parent().find("a").css("color","white");
		$(this).css("color","black");
	});
	
	$("li a").click(function(){
		$("#conframe").attr("src","http://"+server_url+$(this).attr("iframe_url"));
		$(".loading").show();
		window.setTimeout(loadingEnd,1500);
	});
	$(".menu_link").find("a:first").attr("state","opened");
	$(".menu_link").find("a:first").css("color","black");
}

//检验科控制系统
function loadJianyanConfig()
{
	var main_menu_number = 5;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<5;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	main_menu_info[0][0] = "住院检查";
	main_menu_info[0][1] = "zhuyuan_jiancha";
	main_menu_info[0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/住院";
	main_menu_info[0][3] = "住院检查";
	main_menu_info[0][4] = new Array();
		main_menu_info[0][4][0] = new Array();
			main_menu_info[0][4][0][0] = "常用检查";
			main_menu_info[0][4][0][1] = "changyong_jiancha";
			main_menu_info[0][4][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/住院";
			main_menu_info[0][4][0][3] = new Array();
       main_menu_info[0][4][0][3][0] = new Array();
					main_menu_info[0][4][0][3][0][0] = "大生化";
					main_menu_info[0][4][0][3][0][1] = "dashenghua";
					main_menu_info[0][4][0][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dashenghua/zhixing_type/住院";                                                        
				main_menu_info[0][4][0][3][1] = new Array();
					main_menu_info[0][4][0][3][1][0] = "尿常规";
					main_menu_info[0][4][0][3][1][1] = "niaochanggui";
					main_menu_info[0][4][0][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaochanggui/zhixing_type/住院";
				main_menu_info[0][4][0][3][2] = new Array();
					main_menu_info[0][4][0][3][2][0] = "血气分析";
					main_menu_info[0][4][0][3][2][1] = "xueqifenxi";
					main_menu_info[0][4][0][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xueqifenxi/zhixing_type/住院";
				main_menu_info[0][4][0][3][3] = new Array();
					main_menu_info[0][4][0][3][3][0] = "电解质分析";
					main_menu_info[0][4][0][3][3][1] = "dianjiezhifenxi";
					main_menu_info[0][4][0][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dianjiezhifenxi/zhixing_type/住院";
				main_menu_info[0][4][0][3][4] = new Array();
					main_menu_info[0][4][0][3][4][0] = "血常规";
					main_menu_info[0][4][0][3][4][1] = "xuechanggui";
					main_menu_info[0][4][0][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuechanggui/zhixing_type/住院";

 	main_menu_info[0][4][1] = new Array();
			main_menu_info[0][4][1][0] = "生化类检查";
			main_menu_info[0][4][1][1] = "shenghualei_jiancha";
			main_menu_info[0][4][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/住院";
			main_menu_info[0][4][1][3] = new Array();
				main_menu_info[0][4][1][3][0] = new Array();
					main_menu_info[0][4][1][3][0][0] = "大生化";
					main_menu_info[0][4][1][3][0][1] = "dashenghua";
					main_menu_info[0][4][1][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dashenghua/zhixing_type/住院";
				main_menu_info[0][4][1][3][1] = new Array();
					main_menu_info[0][4][1][3][1][0] = "血脂";
					main_menu_info[0][4][1][3][1][1] = "xuezhi";
					main_menu_info[0][4][1][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuezhi/zhixing_type/住院";
				main_menu_info[0][4][1][3][2] = new Array();
					main_menu_info[0][4][1][3][2][0] = "肝功能";
					main_menu_info[0][4][1][3][2][1] = "gangongneng";
					main_menu_info[0][4][1][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_gangongneng/zhixing_type/住院";
				main_menu_info[0][4][1][3][3] = new Array();
					main_menu_info[0][4][1][3][3][0] = "肾功能";
					main_menu_info[0][4][1][3][3][1] = "shengongneng";
					main_menu_info[0][4][1][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_shengongneng/zhixing_type/住院";
				main_menu_info[0][4][1][3][4] = new Array();
					main_menu_info[0][4][1][3][4][0] = "心肌酶";
					main_menu_info[0][4][1][3][4][1] = "xinjimei";
					main_menu_info[0][4][1][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xinjimei/zhixing_type/住院";
				main_menu_info[0][4][1][3][5] = new Array();
					main_menu_info[0][4][1][3][5][0] = "血淀粉酶";
					main_menu_info[0][4][1][3][5][1] = "xuedianfenmei";
					main_menu_info[0][4][1][3][5][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuedianfenmei/zhixing_type/住院";
				main_menu_info[0][4][1][3][6] = new Array();
					main_menu_info[0][4][1][3][6][0] = "尿淀粉酶";
					main_menu_info[0][4][1][3][6][1] = "niaodianfenmei";
					main_menu_info[0][4][1][3][6][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaodianfenmei/zhixing_type/住院";
				main_menu_info[0][4][1][3][7] = new Array();
					main_menu_info[0][4][1][3][7][0] = "餐后半小时血糖";
					main_menu_info[0][4][1][3][7][1] = "canhoubanxiaoshixuetang";
					main_menu_info[0][4][1][3][7][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_canhoubanxiaoshixuetang/zhixing_type/住院";
				main_menu_info[0][4][1][3][8] = new Array();
					main_menu_info[0][4][1][3][8][0] = "胆碱脂酶";
					main_menu_info[0][4][1][3][8][1] = "dianjianzhimei";
					main_menu_info[0][4][1][3][8][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_danjianzhimei/zhixing_type/住院";

		main_menu_info[0][4][2] = new Array();
			main_menu_info[0][4][2][0] = "免疫类检查";
			main_menu_info[0][4][2][1] = "mianyilei_jiancha";
			main_menu_info[0][4][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/住院";
			main_menu_info[0][4][2][3] = new Array();
				main_menu_info[0][4][2][3][0] = new Array();
					main_menu_info[0][4][2][3][0][0] = "结核抗体";
					main_menu_info[0][4][2][3][0][1] = "jiehekangti";
					main_menu_info[0][4][2][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_jiehekangti/zhixing_type/住院";
				main_menu_info[0][4][2][3][1] = new Array();
					main_menu_info[0][4][2][3][1][0] = "类风湿因子";
					main_menu_info[0][4][2][3][1][1] = "leifengshi";
					main_menu_info[0][4][2][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_leifengshiyinzi/zhixing_type/住院";
				main_menu_info[0][4][2][3][2] = new Array();
					main_menu_info[0][4][2][3][2][0] = "乙肝五项";
					main_menu_info[0][4][2][3][2][1] = "yiganwuxiang";
					main_menu_info[0][4][2][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_yiganwuxiang/zhixing_type/住院";
				main_menu_info[0][4][2][3][3] = new Array();
					main_menu_info[0][4][2][3][3][0] = "抗链‘O’";
					main_menu_info[0][4][2][3][3][1] = "kanglian_0";
					main_menu_info[0][4][2][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_kanglian_o/zhixing_type/住院";
				main_menu_info[0][4][2][3][4] = new Array();
					main_menu_info[0][4][2][3][4][0] = "乙肝表面抗原";
					main_menu_info[0][4][2][3][4][1] = "yiganbiaomiankangyuan";
					main_menu_info[0][4][2][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_yiganbiaomiankangyuan/zhixing_type/住院";
				main_menu_info[0][4][2][3][5] = new Array();
					main_menu_info[0][4][2][3][5][0] = "解尿支原体";
					main_menu_info[0][4][2][3][5][1] = "jieniaozhiyuanti";
					main_menu_info[0][4][2][3][5][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_jieniaozhiyuanti/zhixing_type/住院";
				main_menu_info[0][4][2][3][6] = new Array();
					main_menu_info[0][4][2][3][6][0] = "沙眼支原体";
					main_menu_info[0][4][2][3][6][1] = "shayanyiyuanti";
					main_menu_info[0][4][2][3][6][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_shayanyiyuanti/zhixing_type/住院";
				main_menu_info[0][4][2][3][7] = new Array();
					main_menu_info[0][4][2][3][7][0] = "梅毒抗体";
					main_menu_info[0][4][2][3][7][1] = "meidukangti";
					main_menu_info[0][4][2][3][7][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_meidukangti/zhixing_type/住院";
				main_menu_info[0][4][2][3][8] = new Array();
					main_menu_info[0][4][2][3][8][0] = "疱疹病毒抗体";
					main_menu_info[0][4][2][3][8][1] = "paozhenbingdukangti";
					main_menu_info[0][4][2][3][8][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_paozhenbingdukangti/zhixing_type/住院";
				main_menu_info[0][4][2][3][9] = new Array();
					main_menu_info[0][4][2][3][9][0] = "癌胚抗原";
					main_menu_info[0][4][2][3][9][1] = "aipeikangyuan";
					main_menu_info[0][4][2][3][9][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_aipeikangyuan/zhixing_type/住院";
				main_menu_info[0][4][2][3][10] = new Array();
					main_menu_info[0][4][2][3][10][0] = "丙肝抗原";
					main_menu_info[0][4][2][3][10][1] = "patient_lao";
					main_menu_info[0][4][2][3][10][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_binggankangyuan/zhixing_type/住院";
				main_menu_info[0][4][2][3][11] = new Array();
					main_menu_info[0][4][2][3][11][0] = "胃幽门螺旋杆菌抗体";
					main_menu_info[0][4][2][3][11][1] = "patient_lao";
					main_menu_info[0][4][2][3][11][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_weiyoumenluoxuanganjunkangti/zhixing_type/住院";

		main_menu_info[0][4][3] = new Array();
			main_menu_info[0][4][3][0] = "其他检查";
			main_menu_info[0][4][3][1] = "qita_jiancha";
			main_menu_info[0][4][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/住院";
			main_menu_info[0][4][3][3] = new Array();
				main_menu_info[0][4][3][3][0] = new Array();
					main_menu_info[0][4][3][3][0][0] = "尿常规";
					main_menu_info[0][4][3][3][0][1] = "niaochanggui";
					main_menu_info[0][4][3][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaochanggui/zhixing_type/住院";
				main_menu_info[0][4][3][3][1] = new Array();
					main_menu_info[0][4][3][3][1][0] = "血气分析";
					main_menu_info[0][4][3][3][1][1] = "xueqifenxi";
					main_menu_info[0][4][3][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xueqifenxi/zhixing_type/住院";
				main_menu_info[0][4][3][3][2] = new Array();
					main_menu_info[0][4][3][3][2][0] = "电解质分析";
					main_menu_info[0][4][3][3][2][1] = "dianjiezhifenxi";
					main_menu_info[0][4][3][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dianjiezhifenxi/zhixing_type/住院";
				main_menu_info[0][4][3][3][3] = new Array();
					main_menu_info[0][4][3][3][3][0] = "血常规";
					main_menu_info[0][4][3][3][3][1] = "xuechanggui";
					main_menu_info[0][4][3][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuechanggui/zhixing_type/住院";
				main_menu_info[0][4][3][3][4] = new Array();
					main_menu_info[0][4][3][3][4][0] = "血凝";
					main_menu_info[0][4][3][3][4][1] = "xuening";
					main_menu_info[0][4][3][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuening/zhixing_type/住院";
				main_menu_info[0][4][3][3][5] = new Array();
					main_menu_info[0][4][3][3][5][0] = "血沉";
					main_menu_info[0][4][3][3][5][1] = "xuechen";
					main_menu_info[0][4][3][3][5][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuechen/zhixing_type/住院";
				main_menu_info[0][4][3][3][6] = new Array();
					main_menu_info[0][4][3][3][6][0] = "糖化血红蛋白";
					main_menu_info[0][4][3][3][6][1] = "tanghuaxuehongdanbai";
					main_menu_info[0][4][3][3][6][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_tanghuaxuehongdanbai/zhixing_type/住院";
				main_menu_info[0][4][3][3][7] = new Array();
					main_menu_info[0][4][3][3][7][0] = "尿微量蛋白";
					main_menu_info[0][4][3][3][7][1] = "niaoweiliangdanbai";
					main_menu_info[0][4][3][3][7][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaoweiliangdanbai/zhixing_type/住院";
				main_menu_info[0][4][3][3][8] = new Array();
					main_menu_info[0][4][3][3][8][0] = "肺炎支原体抗体-IgG";
					main_menu_info[0][4][3][3][8][1] = "feiyanzhiyuantikangti_igg";
					main_menu_info[0][4][3][3][8][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanzhiyuantikangti_igg/zhixing_type/住院";
				main_menu_info[0][4][3][3][9] = new Array();
					main_menu_info[0][4][3][3][9][0] = "肺炎衣原体抗体-IgM";
					main_menu_info[0][4][3][3][9][1] = "feiyanyiyuantikangti_igm";
					main_menu_info[0][4][3][3][9][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanyiyuantikangti_igm/zhixing_type/住院";
				main_menu_info[0][4][3][3][10] = new Array();
					main_menu_info[0][4][3][3][10][0] = "肺炎衣原体抗体-IgG";
					main_menu_info[0][4][3][3][10][1] = "feiyanyiyuantikangti_igg";
					main_menu_info[0][4][3][3][10][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanyiyuantikangti_igg/zhixing_type/住院";
				main_menu_info[0][4][3][3][11] = new Array();
					main_menu_info[0][4][3][3][11][0] = "柯萨奇病毒抗体-IgM";
					main_menu_info[0][4][3][3][11][1] = "kesaqibingdukangti_igm";
					main_menu_info[0][4][3][3][11][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_kesaqibingdukangti_igm/zhixing_type/住院";
				main_menu_info[0][4][3][3][12] = new Array();
					main_menu_info[0][4][3][3][12][0] = "呼吸合胞病毒-IgM";
					main_menu_info[0][4][3][3][12][1] = "huxidaohebaobingdu_igm";
					main_menu_info[0][4][3][3][12][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_huxidaohebaobingdu_igm/zhixing_type/住院";
				main_menu_info[0][4][3][3][13] = new Array();
					main_menu_info[0][4][3][3][13][0] = "腺病毒抗体-IgM";
					main_menu_info[0][4][3][3][13][1] = "xianbingdukangti_igm";
					main_menu_info[0][4][3][3][13][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xianbingdukangti_igm/zhixing_type/住院";
				main_menu_info[0][4][3][3][14] = new Array();
					main_menu_info[0][4][3][3][14][0] = "流感病毒抗体-IgM";
					main_menu_info[0][4][3][3][14][1] = "liuganbingdukangti_igm";
					main_menu_info[0][4][3][3][14][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_liuganbingdukangti_igm/zhixing_type/住院";
				main_menu_info[0][4][3][3][15] = new Array();
					main_menu_info[0][4][3][3][15][0] = "D-二聚体";
					main_menu_info[0][4][3][3][15][1] = "d_erjuti";
					main_menu_info[0][4][3][3][15][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_d_erjuti/zhixing_type/住院";
				main_menu_info[0][4][3][3][16] = new Array();
					main_menu_info[0][4][3][3][16][0] = "过敏原总IgE";
					main_menu_info[0][4][3][3][16][1] = "guomingyuanzong_ige";
					main_menu_info[0][4][3][3][16][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_guomingyuanzong_ige/zhixing_type/住院";							
    	 main_menu_info[0][4][3][3][17] = new Array();
					main_menu_info[0][4][3][3][17][0] = "肺炎支原体抗体-IgM";
					main_menu_info[0][4][3][3][17][1] = "feiyanzhiyuantikangti_igm";
					main_menu_info[0][4][3][3][17][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanzhiyuantikangti_igm/zhixing_type/住院";
				main_menu_info[0][4][3][3][18] = new Array();
					main_menu_info[0][4][3][3][18][0] = "CK-MB";
					main_menu_info[0][4][3][3][18][1] = "ck_mb";
					main_menu_info[0][4][3][3][18][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_ck_mb/zhixing_type/住院";
				main_menu_info[0][4][3][3][19] = new Array();
					main_menu_info[0][4][3][3][19][0] = "阴道涂片";
					main_menu_info[0][4][3][3][19][1] = "yindaotupian";
					main_menu_info[0][4][3][3][19][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_yindaotupian/zhixing_type/住院";		
				main_menu_info[0][4][3][3][20] = new Array();
					main_menu_info[0][4][3][3][20][0] = "便常规";
					main_menu_info[0][4][3][3][20][1] = "bianchanggui";
					main_menu_info[0][4][3][3][20][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_bianchanggui/zhixing_type/住院";
				main_menu_info[0][4][3][3][21] = new Array();
					main_menu_info[0][4][3][3][21][0] = "便潜血";
					main_menu_info[0][4][3][3][21][1] = "bianqianxue";
					main_menu_info[0][4][3][3][21][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_bianqianxue/zhixing_type/住院";
				main_menu_info[0][4][3][3][22] = new Array();
					main_menu_info[0][4][3][3][22][0] = "C-反应蛋白";
					main_menu_info[0][4][3][3][22][1] = "cfanyingdanbai";
					main_menu_info[0][4][3][3][22][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_cfanyingdanbai/zhixing_type/住院";
				main_menu_info[0][4][3][3][23] = new Array();
					main_menu_info[0][4][3][3][23][0] = "痰常规+检菌";
					main_menu_info[0][4][3][3][23][1] = "tanchangguijiajianjun";
					main_menu_info[0][4][3][3][23][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_tanchangguijiajianjun/zhixing_type/住院";
			  main_menu_info[0][4][3][3][24] = new Array();
					main_menu_info[0][4][3][3][24][0] = "胸、腹水常规";
					main_menu_info[0][4][3][3][24][1] = "xiongfushuichanggui";
					main_menu_info[0][4][3][3][24][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xiongfushuichanggui/zhixing_type/住院";
				main_menu_info[0][4][3][3][25] = new Array();
					main_menu_info[0][4][3][3][25][0] = "随机血糖";
					main_menu_info[0][4][3][3][25][1] = "suijixuetang";
					main_menu_info[0][4][3][3][25][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_suijixuetang/zhixing_type/住院";
	
		main_menu_info[1][0] = "门诊检查";
	main_menu_info[1][1] = "menzhen_jiancha";
	main_menu_info[1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_yiganwuxiang/zhixing_type/门诊";
	main_menu_info[1][3] = "门诊检查";
	main_menu_info[1][4] = new Array();	
		main_menu_info[1][4][0] = new Array();
			main_menu_info[1][4][0][0] = "常用检查";
			main_menu_info[1][4][0][1] = "changyong_jiancha";
			main_menu_info[1][4][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/门诊";
			main_menu_info[1][4][0][3] = new Array();
       main_menu_info[1][4][0][3][0] = new Array();
					main_menu_info[1][4][0][3][0][0] = "大生化";
					main_menu_info[1][4][0][3][0][1] = "dashenghua";
					main_menu_info[1][4][0][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dashenghua/zhixing_type/门诊";                                                        
				main_menu_info[1][4][0][3][1] = new Array();
					main_menu_info[1][4][0][3][1][0] = "尿常规";
					main_menu_info[1][4][0][3][1][1] = "niaochanggui";
					main_menu_info[1][4][0][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaochanggui/zhixing_type/门诊";
				main_menu_info[1][4][0][3][2] = new Array();
					main_menu_info[1][4][0][3][2][0] = "血气分析";
					main_menu_info[1][4][0][3][2][1] = "xueqifenxi";
					main_menu_info[1][4][0][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xueqifenxi/zhixing_type/门诊";
				main_menu_info[1][4][0][3][3] = new Array();
					main_menu_info[1][4][0][3][3][0] = "电解质分析";
					main_menu_info[1][4][0][3][3][1] = "dianjiezhifenxi";
					main_menu_info[1][4][0][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dianjiezhifenxi/zhixing_type/门诊";
				main_menu_info[1][4][0][3][4] = new Array();
					main_menu_info[1][4][0][3][4][0] = "血常规";
					main_menu_info[1][4][0][3][4][1] = "xuechanggui";
					main_menu_info[1][4][0][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuechanggui/zhixing_type/门诊";
					
 	main_menu_info[1][4][1] = new Array();
			main_menu_info[1][4][1][0] = "生化类检查";
			main_menu_info[1][4][1][1] = "shenghualei_jiancha";
			main_menu_info[1][4][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/门诊";
			main_menu_info[1][4][1][3] = new Array();
				main_menu_info[1][4][1][3][0] = new Array();
					main_menu_info[1][4][1][3][0][0] = "大生化";
					main_menu_info[1][4][1][3][0][1] = "dashenghua";
					main_menu_info[1][4][1][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dashenghua/zhixing_type/门诊";
				main_menu_info[1][4][1][3][1] = new Array();
					main_menu_info[1][4][1][3][1][0] = "血脂";
					main_menu_info[1][4][1][3][1][1] = "xuezhi";
					main_menu_info[1][4][1][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuezhi/zhixing_type/门诊";
				main_menu_info[1][4][1][3][2] = new Array();
					main_menu_info[1][4][1][3][2][0] = "肝功能";
					main_menu_info[1][4][1][3][2][1] = "gangongneng";
					main_menu_info[1][4][1][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_gangongneng/zhixing_type/门诊";
				main_menu_info[1][4][1][3][3] = new Array();
					main_menu_info[1][4][1][3][3][0] = "肾功能";
					main_menu_info[1][4][1][3][3][1] = "shengongneng";
					main_menu_info[1][4][1][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_shengongneng/zhixing_type/门诊";
				main_menu_info[1][4][1][3][4] = new Array();
					main_menu_info[1][4][1][3][4][0] = "心肌酶";
					main_menu_info[1][4][1][3][4][1] = "xinjimei";
					main_menu_info[1][4][1][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xinjimei/zhixing_type/门诊";
				main_menu_info[1][4][1][3][5] = new Array();
					main_menu_info[1][4][1][3][5][0] = "血淀粉酶";
					main_menu_info[1][4][1][3][5][1] = "xuedianfenmei";
					main_menu_info[1][4][1][3][5][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuedianfenmei/zhixing_type/门诊";
				main_menu_info[1][4][1][3][6] = new Array();
					main_menu_info[1][4][1][3][6][0] = "尿淀粉酶";
					main_menu_info[1][4][1][3][6][1] = "niaodianfenmei";
					main_menu_info[1][4][1][3][6][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaodianfenmei/zhixing_type/门诊";
				main_menu_info[1][4][1][3][7] = new Array();
					main_menu_info[1][4][1][3][7][0] = "餐后半小时血糖";
					main_menu_info[1][4][1][3][7][1] = "canhoubanxiaoshixuetang";
					main_menu_info[1][4][1][3][7][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_canhoubanxiaoshixuetang/zhixing_type/门诊";
				main_menu_info[1][4][1][3][8] = new Array();
					main_menu_info[1][4][1][3][8][0] = "胆碱脂酶";
					main_menu_info[1][4][1][3][8][1] = "dianjianzhimei";
					main_menu_info[1][4][1][3][8][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_danjianzhimei/zhixing_type/门诊";
										
		main_menu_info[1][4][2] = new Array();
			main_menu_info[1][4][2][0] = "免疫类检查";
			main_menu_info[1][4][2][1] = "mianyilei_jiancha";
			main_menu_info[1][4][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/门诊";
			main_menu_info[1][4][2][3] = new Array();
				main_menu_info[1][4][2][3][0] = new Array();
					main_menu_info[1][4][2][3][0][0] = "结核抗体";
					main_menu_info[1][4][2][3][0][1] = "jiehekangti";
					main_menu_info[1][4][2][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_jiehekangti/zhixing_type/门诊";
				main_menu_info[1][4][2][3][1] = new Array();
					main_menu_info[1][4][2][3][1][0] = "类风湿因子";
					main_menu_info[1][4][2][3][1][1] = "leifengshi";
					main_menu_info[1][4][2][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_leifengshiyinzi/zhixing_type/门诊";
				main_menu_info[1][4][2][3][2] = new Array();
					main_menu_info[1][4][2][3][2][0] = "乙肝五项";
					main_menu_info[1][4][2][3][2][1] = "yiganwuxiang";
					main_menu_info[1][4][2][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_yiganwuxiang/zhixing_type/门诊";
				main_menu_info[1][4][2][3][3] = new Array();
					main_menu_info[1][4][2][3][3][0] = "抗链‘O’";
					main_menu_info[1][4][2][3][3][1] = "kanglian_0";
					main_menu_info[1][4][2][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_kanglian_o/zhixing_type/门诊";
				main_menu_info[1][4][2][3][4] = new Array();
					main_menu_info[1][4][2][3][4][0] = "乙肝表面抗原";
					main_menu_info[1][4][2][3][4][1] = "yiganbiaomiankangyuan";
					main_menu_info[1][4][2][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_yiganbiaomiankangyuan/zhixing_type/门诊";
				main_menu_info[1][4][2][3][5] = new Array();
					main_menu_info[1][4][2][3][5][0] = "解尿支原体";
					main_menu_info[1][4][2][3][5][1] = "jieniaozhiyuanti";
					main_menu_info[1][4][2][3][5][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_jieniaozhiyuanti/zhixing_type/门诊";
				main_menu_info[1][4][2][3][6] = new Array();
					main_menu_info[1][4][2][3][6][0] = "沙眼支原体";
					main_menu_info[1][4][2][3][6][1] = "shayanyiyuanti";
					main_menu_info[1][4][2][3][6][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_shayanyiyuanti/zhixing_type/门诊";
				main_menu_info[1][4][2][3][7] = new Array();
					main_menu_info[1][4][2][3][7][0] = "梅毒抗体";
					main_menu_info[1][4][2][3][7][1] = "meidukangti";
					main_menu_info[1][4][2][3][7][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_meidukangti/zhixing_type/门诊";
				main_menu_info[1][4][2][3][8] = new Array();
					main_menu_info[1][4][2][3][8][0] = "疱疹病毒抗体";
					main_menu_info[1][4][2][3][8][1] = "paozhenbingdukangti";
					main_menu_info[1][4][2][3][8][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_paozhenbingdukangti/zhixing_type/门诊";
				main_menu_info[1][4][2][3][9] = new Array();
					main_menu_info[1][4][2][3][9][0] = "癌胚抗原";
					main_menu_info[1][4][2][3][9][1] = "aipeikangyuan";
					main_menu_info[1][4][2][3][9][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_aipeikangyuan/zhixing_type/门诊";
				main_menu_info[1][4][2][3][10] = new Array();
					main_menu_info[1][4][2][3][10][0] = "丙肝抗原";
					main_menu_info[1][4][2][3][10][1] = "patient_lao";
					main_menu_info[1][4][2][3][10][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_binggankangyuan/zhixing_type/门诊";
				main_menu_info[1][4][2][3][11] = new Array();
					main_menu_info[1][4][2][3][11][0] = "胃幽门螺旋杆菌抗体";
					main_menu_info[1][4][2][3][11][1] = "patient_lao";
					main_menu_info[1][4][2][3][11][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_weiyoumenluoxuanganjunkangti/zhixing_type/门诊";
														
		main_menu_info[1][4][3] = new Array();
			main_menu_info[1][4][3][0] = "其他检查";
			main_menu_info[1][4][3][1] = "qita_jiancha";
			main_menu_info[1][4][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/门诊";
			main_menu_info[1][4][3][3] = new Array();
				main_menu_info[1][4][3][3][0] = new Array();
					main_menu_info[1][4][3][3][0][0] = "尿常规";
					main_menu_info[1][4][3][3][0][1] = "niaochanggui";
					main_menu_info[1][4][3][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaochanggui/zhixing_type/门诊";
				main_menu_info[1][4][3][3][1] = new Array();
					main_menu_info[1][4][3][3][1][0] = "血气分析";
					main_menu_info[1][4][3][3][1][1] = "xueqifenxi";
					main_menu_info[1][4][3][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xueqifenxi/zhixing_type/门诊";
				main_menu_info[1][4][3][3][2] = new Array();
					main_menu_info[1][4][3][3][2][0] = "电解质分析";
					main_menu_info[1][4][3][3][2][1] = "dianjiezhifenxi";
					main_menu_info[1][4][3][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dianjiezhifenxi/zhixing_type/门诊";
				main_menu_info[1][4][3][3][3] = new Array();
					main_menu_info[1][4][3][3][3][0] = "血常规";
					main_menu_info[1][4][3][3][3][1] = "xuechanggui";
					main_menu_info[1][4][3][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuechanggui/zhixing_type/门诊";
				main_menu_info[1][4][3][3][4] = new Array();
					main_menu_info[1][4][3][3][4][0] = "血凝";
					main_menu_info[1][4][3][3][4][1] = "xuening";
					main_menu_info[1][4][3][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuening/zhixing_type/门诊";
				main_menu_info[1][4][3][3][5] = new Array();
					main_menu_info[1][4][3][3][5][0] = "血沉";
					main_menu_info[1][4][3][3][5][1] = "xuechen";
					main_menu_info[1][4][3][3][5][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuechen/zhixing_type/门诊";
				main_menu_info[1][4][3][3][6] = new Array();
					main_menu_info[1][4][3][3][6][0] = "糖化血红蛋白";
					main_menu_info[1][4][3][3][6][1] = "tanghuaxuehongdanbai";
					main_menu_info[1][4][3][3][6][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_tanghuaxuehongdanbai/zhixing_type/门诊";
				main_menu_info[1][4][3][3][7] = new Array();
					main_menu_info[1][4][3][3][7][0] = "尿微量蛋白";
					main_menu_info[1][4][3][3][7][1] = "niaoweiliangdanbai";
					main_menu_info[1][4][3][3][7][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaoweiliangdanbai/zhixing_type/门诊";
				main_menu_info[1][4][3][3][8] = new Array();
					main_menu_info[1][4][3][3][8][0] = "肺炎支原体抗体-IgG";
					main_menu_info[1][4][3][3][8][1] = "feiyanzhiyuantikangti_igg";
					main_menu_info[1][4][3][3][8][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanzhiyuantikangti_igg/zhixing_type/门诊";
				main_menu_info[1][4][3][3][9] = new Array();
					main_menu_info[1][4][3][3][9][0] = "肺炎衣原体抗体-IgM";
					main_menu_info[1][4][3][3][9][1] = "feiyanyiyuantikangti_igm";
					main_menu_info[1][4][3][3][9][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanyiyuantikangti_igm/zhixing_type/门诊";
				main_menu_info[1][4][3][3][10] = new Array();
					main_menu_info[1][4][3][3][10][0] = "肺炎衣原体抗体-IgG";
					main_menu_info[1][4][3][3][10][1] = "feiyanyiyuantikangti_igg";
					main_menu_info[1][4][3][3][10][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanyiyuantikangti_igg/zhixing_type/门诊";
				main_menu_info[1][4][3][3][11] = new Array();
					main_menu_info[1][4][3][3][11][0] = "柯萨奇病毒抗体-IgM";
					main_menu_info[1][4][3][3][11][1] = "kesaqibingdukangti_igm";
					main_menu_info[1][4][3][3][11][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_kesaqibingdukangti_igm/zhixing_type/门诊";
				main_menu_info[1][4][3][3][12] = new Array();
					main_menu_info[1][4][3][3][12][0] = "呼吸合胞病毒-IgM";
					main_menu_info[1][4][3][3][12][1] = "huxidaohebaobingdu_igm";
					main_menu_info[1][4][3][3][12][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_huxidaohebaobingdu_igm/zhixing_type/门诊";
				main_menu_info[1][4][3][3][13] = new Array();
					main_menu_info[1][4][3][3][13][0] = "腺病毒抗体-IgM";
					main_menu_info[1][4][3][3][13][1] = "xianbingdukangti_igm";
					main_menu_info[1][4][3][3][13][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xianbingdukangti_igm/zhixing_type/门诊";
				main_menu_info[1][4][3][3][14] = new Array();
					main_menu_info[1][4][3][3][14][0] = "流感病毒抗体-IgM";
					main_menu_info[1][4][3][3][14][1] = "liuganbingdukangti_igm";
					main_menu_info[1][4][3][3][14][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_liuganbingdukangti_igm/zhixing_type/门诊";
				main_menu_info[1][4][3][3][15] = new Array();
					main_menu_info[1][4][3][3][15][0] = "D-二聚体";
					main_menu_info[1][4][3][3][15][1] = "d_erjuti";
					main_menu_info[1][4][3][3][15][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_d_erjuti/zhixing_type/门诊";
				main_menu_info[1][4][3][3][16] = new Array();
					main_menu_info[1][4][3][3][16][0] = "过敏原总IgE";
					main_menu_info[1][4][3][3][16][1] = "guomingyuanzong_ige";
					main_menu_info[1][4][3][3][16][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_guomingyuanzong_ige/zhixing_type/门诊";							
    	 main_menu_info[1][4][3][3][17] = new Array();
					main_menu_info[1][4][3][3][17][0] = "肺炎支原体抗体-IgM";
					main_menu_info[1][4][3][3][17][1] = "feiyanzhiyuantikangti_igm";
					main_menu_info[1][4][3][3][17][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanzhiyuantikangti_igm/zhixing_type/门诊";
				main_menu_info[1][4][3][3][18] = new Array();
					main_menu_info[1][4][3][3][18][0] = "CK-MB";
					main_menu_info[1][4][3][3][18][1] = "ck_mb";
					main_menu_info[1][4][3][3][18][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_ck_mb/zhixing_type/门诊";
				main_menu_info[1][4][3][3][19] = new Array();
					main_menu_info[1][4][3][3][19][0] = "阴道涂片";
					main_menu_info[1][4][3][3][19][1] = "yindaotupian";
					main_menu_info[1][4][3][3][19][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_yindaotupian/zhixing_type/门诊";		
				main_menu_info[1][4][3][3][20] = new Array();
					main_menu_info[1][4][3][3][20][0] = "便常规";
					main_menu_info[1][4][3][3][20][1] = "bianchanggui";
					main_menu_info[1][4][3][3][20][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_bianchanggui/zhixing_type/门诊";
				main_menu_info[1][4][3][3][21] = new Array();
					main_menu_info[1][4][3][3][21][0] = "便潜血";
					main_menu_info[1][4][3][3][21][1] = "bianqianxue";
					main_menu_info[1][4][3][3][21][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_bianqianxue/zhixing_type/门诊";
				main_menu_info[1][4][3][3][22] = new Array();
					main_menu_info[1][4][3][3][22][0] = "C-反应蛋白";
					main_menu_info[1][4][3][3][22][1] = "cfanyingdanbai";
					main_menu_info[1][4][3][3][22][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_cfanyingdanbai/zhixing_type/门诊";
				main_menu_info[1][4][3][3][23] = new Array();
					main_menu_info[1][4][3][3][23][0] = "痰常规+检菌";
					main_menu_info[1][4][3][3][23][1] = "tanchangguijiajianjun";
					main_menu_info[1][4][3][3][23][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_tanchangguijiajianjun/zhixing_type/门诊";
			  main_menu_info[1][4][3][3][24] = new Array();
					main_menu_info[1][4][3][3][24][0] = "胸、腹水常规";
					main_menu_info[1][4][3][3][24][1] = "xiongfushuichanggui";
					main_menu_info[1][4][3][3][24][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xiongfushuichanggui/zhixing_type/门诊";
				main_menu_info[1][4][3][3][25] = new Array();
					main_menu_info[1][4][3][3][25][0] = "随机血糖";
					main_menu_info[1][4][3][3][25][1] = "suijixuetang";
					main_menu_info[1][4][3][3][25][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_suijixuetang/zhixing_type/门诊";
								
	main_menu_info[2][0] = "体检检查";
	main_menu_info[2][1] = "tijian_jiancha";
	main_menu_info[2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/体检";
	main_menu_info[2][3] = "体检检查";
	main_menu_info[2][4] = new Array();
	main_menu_info[2][4][0] = new Array();
			main_menu_info[2][4][0][0] = "常用检查";
			main_menu_info[2][4][0][1] = "changyong_jiancha";
			main_menu_info[2][4][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/体检";
			main_menu_info[2][4][0][3] = new Array();
       main_menu_info[2][4][0][3][0] = new Array();
					main_menu_info[2][4][0][3][0][0] = "大生化";
					main_menu_info[2][4][0][3][0][1] = "dashenghua";
					main_menu_info[2][4][0][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dashenghua/zhixing_type/体检";                                                        
				main_menu_info[2][4][0][3][1] = new Array();
					main_menu_info[2][4][0][3][1][0] = "尿常规";
					main_menu_info[2][4][0][3][1][1] = "niaochanggui";
					main_menu_info[2][4][0][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaochanggui/zhixing_type/体检";
				main_menu_info[2][4][0][3][2] = new Array();
					main_menu_info[2][4][0][3][2][0] = "血气分析";
					main_menu_info[2][4][0][3][2][1] = "xueqifenxi";
					main_menu_info[2][4][0][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xueqifenxi/zhixing_type/体检";
				main_menu_info[2][4][0][3][3] = new Array();
					main_menu_info[2][4][0][3][3][0] = "电解质分析";
					main_menu_info[2][4][0][3][3][1] = "dianjiezhifenxi";
					main_menu_info[2][4][0][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dianjiezhifenxi/zhixing_type/体检";
				main_menu_info[2][4][0][3][4] = new Array();
					main_menu_info[2][4][0][3][4][0] = "血常规";
					main_menu_info[2][4][0][3][4][1] = "xuechanggui";
					main_menu_info[2][4][0][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuechanggui/zhixing_type/体检";

 	main_menu_info[2][4][1] = new Array();
			main_menu_info[2][4][1][0] = "生化类检查";
			main_menu_info[2][4][1][1] = "shenghualei_jiancha";
			main_menu_info[2][4][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/体检";
			main_menu_info[2][4][1][3] = new Array();
				main_menu_info[2][4][1][3][0] = new Array();
					main_menu_info[2][4][1][3][0][0] = "大生化";
					main_menu_info[2][4][1][3][0][1] = "dashenghua";
					main_menu_info[2][4][1][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dashenghua/zhixing_type/体检";
				main_menu_info[2][4][1][3][1] = new Array();
					main_menu_info[2][4][1][3][1][0] = "血脂";
					main_menu_info[2][4][1][3][1][1] = "xuezhi";
					main_menu_info[2][4][1][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuezhi/zhixing_type/体检";
				main_menu_info[2][4][1][3][2] = new Array();
					main_menu_info[2][4][1][3][2][0] = "肝功能";
					main_menu_info[2][4][1][3][2][1] = "gangongneng";
					main_menu_info[2][4][1][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_gangongneng/zhixing_type/体检";
				main_menu_info[2][4][1][3][3] = new Array();
					main_menu_info[2][4][1][3][3][0] = "肾功能";
					main_menu_info[2][4][1][3][3][1] = "shengongneng";
					main_menu_info[2][4][1][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_shengongneng/zhixing_type/体检";
				main_menu_info[2][4][1][3][4] = new Array();
					main_menu_info[2][4][1][3][4][0] = "心肌酶";
					main_menu_info[2][4][1][3][4][1] = "xinjimei";
					main_menu_info[2][4][1][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xinjimei/zhixing_type/体检";
				main_menu_info[2][4][1][3][5] = new Array();
					main_menu_info[2][4][1][3][5][0] = "血淀粉酶";
					main_menu_info[2][4][1][3][5][1] = "xuedianfenmei";
					main_menu_info[2][4][1][3][5][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuedianfenmei/zhixing_type/体检";
				main_menu_info[2][4][1][3][6] = new Array();
					main_menu_info[2][4][1][3][6][0] = "尿淀粉酶";
					main_menu_info[2][4][1][3][6][1] = "niaodianfenmei";
					main_menu_info[2][4][1][3][6][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaodianfenmei/zhixing_type/体检";
				main_menu_info[2][4][1][3][7] = new Array();
					main_menu_info[2][4][1][3][7][0] = "餐后半小时血糖";
					main_menu_info[2][4][1][3][7][1] = "canhoubanxiaoshixuetang";
					main_menu_info[2][4][1][3][7][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_canhoubanxiaoshixuetang/zhixing_type/体检";
				main_menu_info[2][4][1][3][8] = new Array();
					main_menu_info[2][4][1][3][8][0] = "胆碱脂酶";
					main_menu_info[2][4][1][3][8][1] = "dianjianzhimei";
					main_menu_info[2][4][1][3][8][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_danjianzhimei/zhixing_type/体检";

		main_menu_info[2][4][2] = new Array();
			main_menu_info[2][4][2][0] = "免疫类检查";
			main_menu_info[2][4][2][1] = "mianyilei_jiancha";
			main_menu_info[2][4][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/体检";
			main_menu_info[2][4][2][3] = new Array();
				main_menu_info[2][4][2][3][0] = new Array();
					main_menu_info[2][4][2][3][0][0] = "结核抗体";
					main_menu_info[2][4][2][3][0][1] = "jiehekangti";
					main_menu_info[2][4][2][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_jiehekangti/zhixing_type/体检";
				main_menu_info[2][4][2][3][1] = new Array();
					main_menu_info[2][4][2][3][1][0] = "类风湿因子";
					main_menu_info[2][4][2][3][1][1] = "leifengshi";
					main_menu_info[2][4][2][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_leifengshiyinzi/zhixing_type/体检";
				main_menu_info[2][4][2][3][2] = new Array();
					main_menu_info[2][4][2][3][2][0] = "乙肝五项";
					main_menu_info[2][4][2][3][2][1] = "yiganwuxiang";
					main_menu_info[2][4][2][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_yiganwuxiang/zhixing_type/体检";
				main_menu_info[2][4][2][3][3] = new Array();
					main_menu_info[2][4][2][3][3][0] = "抗链‘O’";
					main_menu_info[2][4][2][3][3][1] = "kanglian_0";
					main_menu_info[2][4][2][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_kanglian_o/zhixing_type/体检";
				main_menu_info[2][4][2][3][4] = new Array();
					main_menu_info[2][4][2][3][4][0] = "乙肝表面抗原";
					main_menu_info[2][4][2][3][4][1] = "yiganbiaomiankangyuan";
					main_menu_info[2][4][2][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_yiganbiaomiankangyuan/zhixing_type/体检";
				main_menu_info[2][4][2][3][5] = new Array();
					main_menu_info[2][4][2][3][5][0] = "解尿支原体";
					main_menu_info[2][4][2][3][5][1] = "jieniaozhiyuanti";
					main_menu_info[2][4][2][3][5][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_jieniaozhiyuanti/zhixing_type/体检";
				main_menu_info[2][4][2][3][6] = new Array();
					main_menu_info[2][4][2][3][6][0] = "沙眼支原体";
					main_menu_info[2][4][2][3][6][1] = "shayanyiyuanti";
					main_menu_info[2][4][2][3][6][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_shayanyiyuanti/zhixing_type/体检";
				main_menu_info[2][4][2][3][7] = new Array();
					main_menu_info[2][4][2][3][7][0] = "梅毒抗体";
					main_menu_info[2][4][2][3][7][1] = "meidukangti";
					main_menu_info[2][4][2][3][7][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_meidukangti/zhixing_type/体检";
				main_menu_info[2][4][2][3][8] = new Array();
					main_menu_info[2][4][2][3][8][0] = "疱疹病毒抗体";
					main_menu_info[2][4][2][3][8][1] = "paozhenbingdukangti";
					main_menu_info[2][4][2][3][8][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_paozhenbingdukangti/zhixing_type/体检";
				main_menu_info[2][4][2][3][9] = new Array();
					main_menu_info[2][4][2][3][9][0] = "癌胚抗原";
					main_menu_info[2][4][2][3][9][1] = "aipeikangyuan";
					main_menu_info[2][4][2][3][9][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_aipeikangyuan/zhixing_type/体检";
				main_menu_info[2][4][2][3][10] = new Array();
					main_menu_info[2][4][2][3][10][0] = "丙肝抗原";
					main_menu_info[2][4][2][3][10][1] = "patient_lao";
					main_menu_info[2][4][2][3][10][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_binggankangyuan/zhixing_type/体检";
				main_menu_info[2][4][2][3][11] = new Array();
					main_menu_info[2][4][2][3][11][0] = "胃幽门螺旋杆菌抗体";
					main_menu_info[2][4][2][3][11][1] = "patient_lao";
					main_menu_info[2][4][2][3][11][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_weiyoumenluoxuanganjunkangti/zhixing_type/体检";

		main_menu_info[2][4][3] = new Array();
			main_menu_info[2][4][3][0] = "其他检查";
			main_menu_info[2][4][3][1] = "qita_jiancha";
			main_menu_info[2][4][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/zhixing_type/体检";
			main_menu_info[2][4][3][3] = new Array();
				main_menu_info[2][4][3][3][0] = new Array();
					main_menu_info[2][4][3][3][0][0] = "尿常规";
					main_menu_info[2][4][3][3][0][1] = "niaochanggui";
					main_menu_info[2][4][3][3][0][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaochanggui/zhixing_type/体检";
				main_menu_info[2][4][3][3][1] = new Array();
					main_menu_info[2][4][3][3][1][0] = "血气分析";
					main_menu_info[2][4][3][3][1][1] = "xueqifenxi";
					main_menu_info[2][4][3][3][1][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xueqifenxi/zhixing_type/体检";
				main_menu_info[2][4][3][3][2] = new Array();
					main_menu_info[2][4][3][3][2][0] = "电解质分析";
					main_menu_info[2][4][3][3][2][1] = "dianjiezhifenxi";
					main_menu_info[2][4][3][3][2][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_dianjiezhifenxi/zhixing_type/体检";
				main_menu_info[2][4][3][3][3] = new Array();
					main_menu_info[2][4][3][3][3][0] = "血常规";
					main_menu_info[2][4][3][3][3][1] = "xuechanggui";
					main_menu_info[2][4][3][3][3][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuechanggui/zhixing_type/体检";
				main_menu_info[2][4][3][3][4] = new Array();
					main_menu_info[2][4][3][3][4][0] = "血凝";
					main_menu_info[2][4][3][3][4][1] = "xuening";
					main_menu_info[2][4][3][3][4][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuening/zhixing_type/体检";
				main_menu_info[2][4][3][3][5] = new Array();
					main_menu_info[2][4][3][3][5][0] = "血沉";
					main_menu_info[2][4][3][3][5][1] = "xuechen";
					main_menu_info[2][4][3][3][5][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xuechen/zhixing_type/体检";
				main_menu_info[2][4][3][3][6] = new Array();
					main_menu_info[2][4][3][3][6][0] = "糖化血红蛋白";
					main_menu_info[2][4][3][3][6][1] = "tanghuaxuehongdanbai";
					main_menu_info[2][4][3][3][6][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_tanghuaxuehongdanbai/zhixing_type/体检";
				main_menu_info[2][4][3][3][7] = new Array();
					main_menu_info[2][4][3][3][7][0] = "尿微量蛋白";
					main_menu_info[2][4][3][3][7][1] = "niaoweiliangdanbai";
					main_menu_info[2][4][3][3][7][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_niaoweiliangdanbai/zhixing_type/体检";
				main_menu_info[2][4][3][3][8] = new Array();
					main_menu_info[2][4][3][3][8][0] = "肺炎支原体抗体-IgG";
					main_menu_info[2][4][3][3][8][1] = "feiyanzhiyuantikangti_igg";
					main_menu_info[2][4][3][3][8][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanzhiyuantikangti_igg/zhixing_type/体检";
				main_menu_info[2][4][3][3][9] = new Array();
					main_menu_info[2][4][3][3][9][0] = "肺炎衣原体抗体-IgM";
					main_menu_info[2][4][3][3][9][1] = "feiyanyiyuantikangti_igm";
					main_menu_info[2][4][3][3][9][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanyiyuantikangti_igm/zhixing_type/体检";
				main_menu_info[2][4][3][3][10] = new Array();
					main_menu_info[2][4][3][3][10][0] = "肺炎衣原体抗体-IgG";
					main_menu_info[2][4][3][3][10][1] = "feiyanyiyuantikangti_igg";
					main_menu_info[2][4][3][3][10][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanyiyuantikangti_igg/zhixing_type/体检";
				main_menu_info[2][4][3][3][11] = new Array();
					main_menu_info[2][4][3][3][11][0] = "柯萨奇病毒抗体-IgM";
					main_menu_info[2][4][3][3][11][1] = "kesaqibingdukangti_igm";
					main_menu_info[2][4][3][3][11][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_kesaqibingdukangti_igm/zhixing_type/体检";
				main_menu_info[2][4][3][3][12] = new Array();
					main_menu_info[2][4][3][3][12][0] = "呼吸合胞病毒-IgM";
					main_menu_info[2][4][3][3][12][1] = "huxidaohebaobingdu_igm";
					main_menu_info[2][4][3][3][12][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_huxidaohebaobingdu_igm/zhixing_type/体检";
				main_menu_info[2][4][3][3][13] = new Array();
					main_menu_info[2][4][3][3][13][0] = "腺病毒抗体-IgM";
					main_menu_info[2][4][3][3][13][1] = "xianbingdukangti_igm";
					main_menu_info[2][4][3][3][13][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xianbingdukangti_igm/zhixing_type/体检";
				main_menu_info[2][4][3][3][14] = new Array();
					main_menu_info[2][4][3][3][14][0] = "流感病毒抗体-IgM";
					main_menu_info[2][4][3][3][14][1] = "liuganbingdukangti_igm";
					main_menu_info[2][4][3][3][14][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_liuganbingdukangti_igm/zhixing_type/体检";
				main_menu_info[2][4][3][3][15] = new Array();
					main_menu_info[2][4][3][3][15][0] = "D-二聚体";
					main_menu_info[2][4][3][3][15][1] = "d_erjuti";
					main_menu_info[2][4][3][3][15][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_d_erjuti/zhixing_type/体检";
				main_menu_info[2][4][3][3][16] = new Array();
					main_menu_info[2][4][3][3][16][0] = "过敏原总IgE";
					main_menu_info[2][4][3][3][16][1] = "guomingyuanzong_ige";
					main_menu_info[2][4][3][3][16][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_guomingyuanzong_ige/zhixing_type/体检";							
    	 main_menu_info[2][4][3][3][17] = new Array();
					main_menu_info[2][4][3][3][17][0] = "肺炎支原体抗体-IgM";
					main_menu_info[2][4][3][3][17][1] = "feiyanzhiyuantikangti_igm";
					main_menu_info[2][4][3][3][17][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_feiyanzhiyuantikangti_igm/zhixing_type/体检";
				main_menu_info[2][4][3][3][18] = new Array();
					main_menu_info[2][4][3][3][18][0] = "CK-MB";
					main_menu_info[2][4][3][3][18][1] = "ck_mb";
					main_menu_info[2][4][3][3][18][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_ck_mb/zhixing_type/体检";
				main_menu_info[2][4][3][3][19] = new Array();
					main_menu_info[2][4][3][3][19][0] = "阴道涂片";
					main_menu_info[2][4][3][3][19][1] = "yindaotupian";
					main_menu_info[2][4][3][3][19][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_yindaotupian/zhixing_type/体检";		
				main_menu_info[2][4][3][3][20] = new Array();
					main_menu_info[2][4][3][3][20][0] = "便常规";
					main_menu_info[2][4][3][3][20][1] = "bianchanggui";
					main_menu_info[2][4][3][3][20][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_bianchanggui/zhixing_type/体检";
				main_menu_info[2][4][3][3][21] = new Array();
					main_menu_info[2][4][3][3][21][0] = "便潜血";
					main_menu_info[2][4][3][3][21][1] = "bianqianxue";
					main_menu_info[2][4][3][3][21][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_bianqianxue/zhixing_type/体检";
				main_menu_info[2][4][3][3][22] = new Array();
					main_menu_info[2][4][3][3][22][0] = "C-反应蛋白";
					main_menu_info[2][4][3][3][22][1] = "cfanyingdanbai";
					main_menu_info[2][4][3][3][22][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_cfanyingdanbai/zhixing_type/体检";
				main_menu_info[2][4][3][3][23] = new Array();
					main_menu_info[2][4][3][3][23][0] = "痰常规+检菌";
					main_menu_info[2][4][3][3][23][1] = "tanchangguijiajianjun";
					main_menu_info[2][4][3][3][23][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_tanchangguijiajianjun/zhixing_type/体检";
			  main_menu_info[2][4][3][3][24] = new Array();
					main_menu_info[2][4][3][3][24][0] = "胸、腹水常规";
					main_menu_info[2][4][3][3][24][1] = "xiongfushuichanggui";
					main_menu_info[2][4][3][3][24][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_xiongfushuichanggui/zhixing_type/体检";
				main_menu_info[2][4][3][3][25] = new Array();
					main_menu_info[2][4][3][3][25][0] = "随机血糖";
					main_menu_info[2][4][3][3][25][1] = "suijixuetang";
					main_menu_info[2][4][3][3][25][2] = "/tiantan_emr/Jianyan/Xiangmu/showList/jiancha_zhuangtai/已申请/table_name/jianyan_table_suijixuetang/zhixing_type/体检";

	main_menu_info[3][0] = "管理项目";
	main_menu_info[3][1] = "xiangmu_guanli";
	main_menu_info[3][2] = "/tiantan_emr/Jianyan/Admin/showTableList";
	main_menu_info[3][3] = "管理项目";
	main_menu_info[3][4] = new Array();

	main_menu_info[4][0] = "系统设置";
	main_menu_info[4][1] = "system_config";
	main_menu_info[4][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[4][3] = "选择设置项目";
	main_menu_info[4][4] = new Array();

	initinalMainMenu(main_menu_info);
}

//超声科控制系统
function loadChaoshengConfig()
{
	var main_menu_number = 5;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<5;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	main_menu_info[0][0] = "住院检查";
	main_menu_info[0][1] = "zhuyuan_jiancha";
	main_menu_info[0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/zhixing_type/住院";
	main_menu_info[0][3] = "住院检查";
	main_menu_info[0][4] = new Array();
		main_menu_info[0][4][0] = new Array();
			main_menu_info[0][4][0][0] = "彩色超声";
			main_menu_info[0][4][0][1] = "caise_chaosheng";
			main_menu_info[0][4][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_caisechaosheng/zhixing_type/住院";
			main_menu_info[0][4][0][3] = new Array();
       main_menu_info[0][4][0][3][0] = new Array();
					main_menu_info[0][4][0][3][0][0] = "已申请";
					main_menu_info[0][4][0][3][0][1] = "yishenqing";
					main_menu_info[0][4][0][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_caisechaosheng/zhixing_type/住院";                                                        
				main_menu_info[0][4][0][3][1] = new Array();
					main_menu_info[0][4][0][3][1][0] = "检查完毕";
					main_menu_info[0][4][0][3][1][1] = "jianchawanbi";
					main_menu_info[0][4][0][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_caisechaosheng/zhixing_type/住院";
				main_menu_info[0][4][0][3][2] = new Array();
					main_menu_info[0][4][0][3][2][0] = "已审核";
					main_menu_info[0][4][0][3][2][1] = "yishenhe";
					main_menu_info[0][4][0][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_caisechaosheng/zhixing_type/住院";
				main_menu_info[0][4][0][3][3] = new Array();
					main_menu_info[0][4][0][3][3][0] = "已取消";
					main_menu_info[0][4][0][3][3][1] = "yiquxiao";
					main_menu_info[0][4][0][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_caisechaosheng/zhixing_type/住院";
				
 	main_menu_info[0][4][1] = new Array();
			main_menu_info[0][4][1][0] = "黑白超声";
			main_menu_info[0][4][1][1] = "heibai_chaosheng";
			main_menu_info[0][4][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_heibaichaosheng/zhixing_type/住院";
			main_menu_info[0][4][1][3] = new Array();
				main_menu_info[0][4][1][3][0] = new Array();
					main_menu_info[0][4][1][3][0][0] = "已申请";
					main_menu_info[0][4][1][3][0][1] = "yishenqing";
					main_menu_info[0][4][1][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_heibaichaosheng/zhixing_type/住院";
				main_menu_info[0][4][1][3][1] = new Array();
					main_menu_info[0][4][1][3][1][0] = "检查完毕";
					main_menu_info[0][4][1][3][1][1] = "jianchawanbi";
					main_menu_info[0][4][1][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_heibaichaosheng/zhixing_type/住院";
				main_menu_info[0][4][1][3][2] = new Array();
					main_menu_info[0][4][1][3][2][0] = "已审核";
					main_menu_info[0][4][1][3][2][1] = "yishenhe";
					main_menu_info[0][4][1][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_heibaichaosheng/zhixing_type/住院";
				main_menu_info[0][4][1][3][3] = new Array();
					main_menu_info[0][4][1][3][3][0] = "已取消";
					main_menu_info[0][4][1][3][3][1] = "yiquxiao";
					main_menu_info[0][4][1][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_heibaichaosheng/zhixing_type/住院";
			
		main_menu_info[0][4][2] = new Array();
			main_menu_info[0][4][2][0] = "心电图";
			main_menu_info[0][4][2][1] = "xindiantu";
			main_menu_info[0][4][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_xindiantu/zhixing_type/住院";
			main_menu_info[0][4][2][3] = new Array();
				main_menu_info[0][4][2][3][0] = new Array();
					main_menu_info[0][4][2][3][0][0] = "已申请";
					main_menu_info[0][4][2][3][0][1] = "yishenqing";
					main_menu_info[0][4][2][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_xindiantu/zhixing_type/住院";
				main_menu_info[0][4][2][3][1] = new Array();
					main_menu_info[0][4][2][3][1][0] = "检查完毕";
					main_menu_info[0][4][2][3][1][1] = "jianchawanbi";
					main_menu_info[0][4][2][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_xindiantu/zhixing_type/住院";
				main_menu_info[0][4][2][3][2] = new Array();
					main_menu_info[0][4][2][3][2][0] = "已审核";
					main_menu_info[0][4][2][3][2][1] = "yishenhe";
					main_menu_info[0][4][2][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_xindiantu/zhixing_type/住院";
				main_menu_info[0][4][2][3][3] = new Array();
					main_menu_info[0][4][2][3][3][0] = "已取消";
					main_menu_info[0][4][2][3][3][1] = "yiquxiao";
					main_menu_info[0][4][2][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_xindiantu/zhixing_type/住院";
			
		main_menu_info[0][4][3] = new Array();
			main_menu_info[0][4][3][0] = "经颅多普勒超声";
			main_menu_info[0][4][3][1] = "jingluduopule_chaosheng";
			main_menu_info[0][4][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/住院";
			main_menu_info[0][4][3][3] = new Array();
				main_menu_info[0][4][3][3][0] = new Array();
					main_menu_info[0][4][3][3][0][0] = "已申请";
					main_menu_info[0][4][3][3][0][1] = "yishenqing";
					main_menu_info[0][4][3][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/住院";
				main_menu_info[0][4][3][3][1] = new Array();
					main_menu_info[0][4][3][3][1][0] = "检查完毕";
					main_menu_info[0][4][3][3][1][1] = "jianchawanbi";
					main_menu_info[0][4][3][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/住院";
				main_menu_info[0][4][3][3][2] = new Array();
					main_menu_info[0][4][3][3][2][0] = "已审核";
					main_menu_info[0][4][3][3][2][1] = "yishenhe";
					main_menu_info[0][4][3][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/住院";
				main_menu_info[0][4][3][3][3] = new Array();
					main_menu_info[0][4][3][3][3][0] = "已取消";
					main_menu_info[0][4][3][3][3][1] = "yiquxiao";
					main_menu_info[0][4][3][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/住院";

	main_menu_info[1][0] = "门诊检查";
	main_menu_info[1][1] = "menzhen_jiancha";
	main_menu_info[1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/zhixing_type/门诊";
	main_menu_info[1][3] = "门诊检查";
	main_menu_info[1][4] = new Array();
			main_menu_info[1][4][0] = new Array();
			main_menu_info[1][4][0][0] = "彩色超声";
			main_menu_info[1][4][0][1] = "caise_chaosheng";
			main_menu_info[1][4][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_caisechaosheng/zhixing_type/门诊";
			main_menu_info[1][4][0][3] = new Array();
       main_menu_info[1][4][0][3][0] = new Array();
					main_menu_info[1][4][0][3][0][0] = "已申请";
					main_menu_info[1][4][0][3][0][1] = "yishenqing";
					main_menu_info[1][4][0][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_caisechaosheng/zhixing_type/门诊";                                                        
				main_menu_info[1][4][0][3][1] = new Array();
					main_menu_info[1][4][0][3][1][0] = "检查完毕";
					main_menu_info[1][4][0][3][1][1] = "jianchawanbi";
					main_menu_info[1][4][0][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_caisechaosheng/zhixing_type/门诊";
				main_menu_info[1][4][0][3][2] = new Array();
					main_menu_info[1][4][0][3][2][0] = "已审核";
					main_menu_info[1][4][0][3][2][1] = "yishenhe";
					main_menu_info[1][4][0][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_caisechaosheng/zhixing_type/门诊";
				main_menu_info[1][4][0][3][3] = new Array();
					main_menu_info[1][4][0][3][3][0] = "已取消";
					main_menu_info[1][4][0][3][3][1] = "yiquxiao";
					main_menu_info[1][4][0][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_caisechaosheng/zhixing_type/门诊";
				
 	main_menu_info[1][4][1] = new Array();
			main_menu_info[1][4][1][0] = "黑白超声";
			main_menu_info[1][4][1][1] = "heibai_chaosheng";
			main_menu_info[1][4][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_heibaichaosheng/zhixing_type/门诊";
			main_menu_info[1][4][1][3] = new Array();
				main_menu_info[1][4][1][3][0] = new Array();
					main_menu_info[1][4][1][3][0][0] = "已申请";
					main_menu_info[1][4][1][3][0][1] = "yishenqing";
					main_menu_info[1][4][1][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_heibaichaosheng/zhixing_type/门诊";
				main_menu_info[1][4][1][3][1] = new Array();
					main_menu_info[1][4][1][3][1][0] = "检查完毕";
					main_menu_info[1][4][1][3][1][1] = "jianchawanbi";
					main_menu_info[1][4][1][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_heibaichaosheng/zhixing_type/门诊";
				main_menu_info[1][4][1][3][2] = new Array();
					main_menu_info[1][4][1][3][2][0] = "已审核";
					main_menu_info[1][4][1][3][2][1] = "yishenhe";
					main_menu_info[1][4][1][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_heibaichaosheng/zhixing_type/门诊";
				main_menu_info[1][4][1][3][3] = new Array();
					main_menu_info[1][4][1][3][3][0] = "已取消";
					main_menu_info[1][4][1][3][3][1] = "yiquxiao";
					main_menu_info[1][4][1][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_heibaichaosheng/zhixing_type/门诊";
			
		main_menu_info[1][4][2] = new Array();
			main_menu_info[1][4][2][0] = "心电图";
			main_menu_info[1][4][2][1] = "xindiantu";
			main_menu_info[1][4][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_xindiantu/zhixing_type/门诊";
			main_menu_info[1][4][2][3] = new Array();
				main_menu_info[1][4][2][3][0] = new Array();
					main_menu_info[1][4][2][3][0][0] = "已申请";
					main_menu_info[1][4][2][3][0][1] = "yishenqing";
					main_menu_info[1][4][2][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_xindiantu/zhixing_type/门诊";
				main_menu_info[1][4][2][3][1] = new Array();
					main_menu_info[1][4][2][3][1][0] = "检查完毕";
					main_menu_info[1][4][2][3][1][1] = "jianchawanbi";
					main_menu_info[1][4][2][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_xindiantu/zhixing_type/门诊";
				main_menu_info[1][4][2][3][2] = new Array();
					main_menu_info[1][4][2][3][2][0] = "已审核";
					main_menu_info[1][4][2][3][2][1] = "yishenhe";
					main_menu_info[1][4][2][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_xindiantu/zhixing_type/门诊";
				main_menu_info[1][4][2][3][3] = new Array();
					main_menu_info[1][4][2][3][3][0] = "已取消";
					main_menu_info[1][4][2][3][3][1] = "yiquxiao";
					main_menu_info[1][4][2][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_xindiantu/zhixing_type/门诊";
			
		main_menu_info[1][4][3] = new Array();
			main_menu_info[1][4][3][0] = "经颅多普勒超声";
			main_menu_info[1][4][3][1] = "jingluduopule_chaosheng";
			main_menu_info[1][4][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/门诊";
			main_menu_info[1][4][3][3] = new Array();
				main_menu_info[1][4][3][3][0] = new Array();
					main_menu_info[1][4][3][3][0][0] = "已申请";
					main_menu_info[1][4][3][3][0][1] = "yishenqing";
					main_menu_info[1][4][3][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/门诊";
				main_menu_info[1][4][3][3][1] = new Array();
					main_menu_info[1][4][3][3][1][0] = "检查完毕";
					main_menu_info[1][4][3][3][1][1] = "jianchawanbi";
					main_menu_info[1][4][3][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/门诊";
				main_menu_info[1][4][3][3][2] = new Array();
					main_menu_info[1][4][3][3][2][0] = "已审核";
					main_menu_info[1][4][3][3][2][1] = "yishenhe";
					main_menu_info[1][4][3][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/门诊";
				main_menu_info[1][4][3][3][3] = new Array();
					main_menu_info[1][4][3][3][3][0] = "已取消";
					main_menu_info[1][4][3][3][3][1] = "yiquxiao";
					main_menu_info[1][4][3][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/门诊";

	main_menu_info[2][0] = "体检检查";
	main_menu_info[2][1] = "tijian_jiancha";
	main_menu_info[2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/zhixing_type/体检";
	main_menu_info[2][3] = "体检检查";
	main_menu_info[2][4] = new Array();
		
		main_menu_info[2][4][0] = new Array();
			main_menu_info[2][4][0][0] = "彩色超声";
			main_menu_info[2][4][0][1] = "caise_chaosheng";
			main_menu_info[2][4][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_caisechaosheng/zhixing_type/体检";
			main_menu_info[2][4][0][3] = new Array();
				main_menu_info[2][4][0][3][0] = new Array();
					main_menu_info[2][4][0][3][0][0] = "已申请";
					main_menu_info[2][4][0][3][0][1] = "yishenqing";
					main_menu_info[2][4][0][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_caisechaosheng/zhixing_type/体检";                                                        
				main_menu_info[2][4][0][3][1] = new Array();
					main_menu_info[2][4][0][3][1][0] = "检查完毕";
					main_menu_info[2][4][0][3][1][1] = "jianchawanbi";
					main_menu_info[2][4][0][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_caisechaosheng/zhixing_type/体检";
				main_menu_info[2][4][0][3][2] = new Array();
					main_menu_info[2][4][0][3][2][0] = "已审核";
					main_menu_info[2][4][0][3][2][1] = "yishenhe";
					main_menu_info[2][4][0][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_caisechaosheng/zhixing_type/体检";
				main_menu_info[2][4][0][3][3] = new Array();
					main_menu_info[2][4][0][3][3][0] = "已取消";
					main_menu_info[2][4][0][3][3][1] = "yiquxiao";
					main_menu_info[2][4][0][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_caisechaosheng/zhixing_type/体检";
				
		main_menu_info[2][4][1] = new Array();
			main_menu_info[2][4][1][0] = "黑白超声";
			main_menu_info[2][4][1][1] = "heibai_chaosheng";
			main_menu_info[2][4][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_heibaichaosheng/zhixing_type/体检";
			main_menu_info[2][4][1][3] = new Array();
				main_menu_info[2][4][1][3][0] = new Array();
					main_menu_info[2][4][1][3][0][0] = "已申请";
					main_menu_info[2][4][1][3][0][1] = "yishenqing";
					main_menu_info[2][4][1][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_heibaichaosheng/zhixing_type/体检";
				main_menu_info[2][4][1][3][1] = new Array();
					main_menu_info[2][4][1][3][1][0] = "检查完毕";
					main_menu_info[2][4][1][3][1][1] = "jianchawanbi";
					main_menu_info[2][4][1][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_heibaichaosheng/zhixing_type/体检";
				main_menu_info[2][4][1][3][2] = new Array();
					main_menu_info[2][4][1][3][2][0] = "已审核";
					main_menu_info[2][4][1][3][2][1] = "yishenhe";
					main_menu_info[2][4][1][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_heibaichaosheng/zhixing_type/体检";
				main_menu_info[2][4][1][3][3] = new Array();
					main_menu_info[2][4][1][3][3][0] = "已取消";
					main_menu_info[2][4][1][3][3][1] = "yiquxiao";
					main_menu_info[2][4][1][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_heibaichaosheng/zhixing_type/体检";
			
		main_menu_info[2][4][2] = new Array();
			main_menu_info[2][4][2][0] = "心电图";
			main_menu_info[2][4][2][1] = "xindiantu";
			main_menu_info[2][4][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_xindiantu/zhixing_type/体检";
			main_menu_info[2][4][2][3] = new Array();
				main_menu_info[2][4][2][3][0] = new Array();
					main_menu_info[2][4][2][3][0][0] = "已申请";
					main_menu_info[2][4][2][3][0][1] = "yishenqing";
					main_menu_info[2][4][2][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_xindiantu/zhixing_type/体检";
				main_menu_info[2][4][2][3][1] = new Array();
					main_menu_info[2][4][2][3][1][0] = "检查完毕";
					main_menu_info[2][4][2][3][1][1] = "jianchawanbi";
					main_menu_info[2][4][2][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_xindiantu/zhixing_type/体检";
				main_menu_info[2][4][2][3][2] = new Array();
					main_menu_info[2][4][2][3][2][0] = "已审核";
					main_menu_info[2][4][2][3][2][1] = "yishenhe";
					main_menu_info[2][4][2][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_xindiantu/zhixing_type/体检";
				main_menu_info[2][4][2][3][3] = new Array();
					main_menu_info[2][4][2][3][3][0] = "已取消";
					main_menu_info[2][4][2][3][3][1] = "yiquxiao";
					main_menu_info[2][4][2][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_xindiantu/zhixing_type/体检";
			
		main_menu_info[2][4][3] = new Array();
			main_menu_info[2][4][3][0] = "经颅多普勒超声";
			main_menu_info[2][4][3][1] = "jingluduopule_chaosheng";
			main_menu_info[2][4][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/体检";
			main_menu_info[2][4][3][3] = new Array();
				main_menu_info[2][4][3][3][0] = new Array();
					main_menu_info[2][4][3][3][0][0] = "已申请";
					main_menu_info[2][4][3][3][0][1] = "yishenqing";
					main_menu_info[2][4][3][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已申请/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/体检";
				main_menu_info[2][4][3][3][1] = new Array();
					main_menu_info[2][4][3][3][1][0] = "检查完毕";
					main_menu_info[2][4][3][3][1][1] = "jianchawanbi";
					main_menu_info[2][4][3][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/体检";
				main_menu_info[2][4][3][3][2] = new Array();
					main_menu_info[2][4][3][3][2][0] = "已审核";
					main_menu_info[2][4][3][3][2][1] = "yishenhe";
					main_menu_info[2][4][3][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已审核/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/体检";
				main_menu_info[2][4][3][3][3] = new Array();
					main_menu_info[2][4][3][3][3][0] = "已取消";
					main_menu_info[2][4][3][3][3][1] = "yiquxiao";
					main_menu_info[2][4][3][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/7/jiancha_zhuangtai/已取消/table_name/yingxiang_table_jingluduopulechaosheng/zhixing_type/体检";
		
		main_menu_info[3][0] = "项目管理";
		main_menu_info[3][1] = "xiangmu_guanli";
		main_menu_info[3][2] = "/tiantan_emr/Yingxiang/Admin/showTableList";
		main_menu_info[3][4] = new Array();

		main_menu_info[4][0] = "系统设置";
		main_menu_info[4][1] = "system_config";
		main_menu_info[4][2] = "/tiantan_emr/Common/System/showUserInfo";
		main_menu_info[4][3] = "选择设置项目";
		main_menu_info[4][4] = new Array();
	
		initinalMainMenu(main_menu_info);
}

//影像科控制系统
function loadYingxiangConfig()
{
	var main_menu_number = 5;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<5;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	main_menu_info[0][0] = "住院检查";
	main_menu_info[0][1] = "zhuyuan_jiancha";
	main_menu_info[0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/zhixing_type/住院";
	main_menu_info[0][3] = "住院检查";
	main_menu_info[0][4] = new Array();
		main_menu_info[0][4][0] = new Array();
			main_menu_info[0][4][0][0] = "CT";
			main_menu_info[0][4][0][1] = "CT";
			main_menu_info[0][4][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/table_name/yingxiang_table_ct/zhixing_type/住院";

			main_menu_info[0][4][0][3] = new Array();
       main_menu_info[0][4][0][3][0] = new Array();
					main_menu_info[0][4][0][3][0][0] = "已申请";
					main_menu_info[0][4][0][3][0][1] = "yishenqing";
					main_menu_info[0][4][0][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已申请/table_name/yingxiang_table_ct/zhixing_type/住院";                                                        		                                                     
				main_menu_info[0][4][0][3][1] = new Array();
					main_menu_info[0][4][0][3][1][0] = "检查完毕";
					main_menu_info[0][4][0][3][1][1] = "jianchawanbi";
					main_menu_info[0][4][0][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_ct/zhixing_type/住院";
				main_menu_info[0][4][0][3][2] = new Array();
					main_menu_info[0][4][0][3][2][0] = "已审核";
					main_menu_info[0][4][0][3][2][1] = "yishenhe";
					main_menu_info[0][4][0][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已审核/table_name/yingxiang_table_ct/zhixing_type/住院";
				main_menu_info[0][4][0][3][3] = new Array();
					main_menu_info[0][4][0][3][3][0] = "已取消";
					main_menu_info[0][4][0][3][3][1] = "yiquxiao";
					main_menu_info[0][4][0][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已取消/table_name/yingxiang_table_ct/zhixing_type/住院";

 	main_menu_info[0][4][1] = new Array();
			main_menu_info[0][4][1][0] = "DR";
			main_menu_info[0][4][1][1] = "DR";
			main_menu_info[0][4][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/table_name/yingxiang_table_dr/zhixing_type/住院";
			main_menu_info[0][4][1][3] = new Array();
				main_menu_info[0][4][1][3][0] = new Array();
					main_menu_info[0][4][1][3][0][0] = "已申请";
					main_menu_info[0][4][1][3][0][1] = "yishenqing";
					main_menu_info[0][4][1][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已申请/table_name/yingxiang_table_dr/zhixing_type/住院";
				main_menu_info[0][4][1][3][1] = new Array();
					main_menu_info[0][4][1][3][1][0] = "检查完毕";
					main_menu_info[0][4][1][3][1][1] = "jianchawanbi";
					main_menu_info[0][4][1][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_dr/zhixing_type/住院";
				main_menu_info[0][4][1][3][2] = new Array();
					main_menu_info[0][4][1][3][2][0] = "已审核";
					main_menu_info[0][4][1][3][2][1] = "yishenhe";
					main_menu_info[0][4][1][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已审核/table_name/yingxiang_table_dr/zhixing_type/住院";
				main_menu_info[0][4][1][3][3] = new Array();
					main_menu_info[0][4][1][3][3][0] = "已取消";
					main_menu_info[0][4][1][3][3][1] = "yiquxiao";
					main_menu_info[0][4][1][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已取消/table_name/yingxiang_table_dr/zhixing_type/住院";
			
		main_menu_info[0][4][2] = new Array();
			main_menu_info[0][4][2][0] = "数字胃肠造影";
			main_menu_info[0][4][2][1] = "shuziweichangzaoying";
			main_menu_info[0][4][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/住院";
			main_menu_info[0][4][2][3] = new Array();
				main_menu_info[0][4][2][3][0] = new Array();
					main_menu_info[0][4][2][3][0][0] = "已申请";
					main_menu_info[0][4][2][3][0][1] = "yishenqing";
					main_menu_info[0][4][2][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已申请/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/住院";
				main_menu_info[0][4][2][3][1] = new Array();
					main_menu_info[0][4][2][3][1][0] = "检查完毕";
					main_menu_info[0][4][2][3][1][1] = "jianchawanbi";
					main_menu_info[0][4][2][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/住院";
				main_menu_info[0][4][2][3][2] = new Array();
					main_menu_info[0][4][2][3][2][0] = "已审核";
					main_menu_info[0][4][2][3][2][1] = "yishenhe";
					main_menu_info[0][4][2][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已审核/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/住院";
				main_menu_info[0][4][2][3][3] = new Array();
					main_menu_info[0][4][2][3][3][0] = "已取消";
					main_menu_info[0][4][2][3][3][1] = "yiquxiao";
					main_menu_info[0][4][2][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已取消/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/住院";
			

	main_menu_info[1][0] = "门诊检查";
	main_menu_info[1][1] = "menzhen_jiancha";
	main_menu_info[1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/zhixing_type/门诊";
	main_menu_info[1][3] = "门诊检查";
	main_menu_info[1][4] = new Array();
	
				main_menu_info[1][4][0] = new Array();
			main_menu_info[1][4][0][0] = "CT";
			main_menu_info[1][4][0][1] = "CT";
			main_menu_info[1][4][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/table_name/yingxiang_table_ct/zhixing_type/门诊";

			main_menu_info[1][4][0][3] = new Array();
				main_menu_info[1][4][0][3][0] = new Array();
					main_menu_info[1][4][0][3][0][0] = "已申请";
					main_menu_info[1][4][0][3][0][1] = "yishenqing";
					main_menu_info[1][4][0][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已申请/table_name/yingxiang_table_ct/zhixing_type/门诊";                                                        		                                                     
				main_menu_info[1][4][0][3][1] = new Array();
					main_menu_info[1][4][0][3][1][0] = "检查完毕";
					main_menu_info[1][4][0][3][1][1] = "jianchawanbi";
					main_menu_info[1][4][0][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_ct/zhixing_type/门诊";
				main_menu_info[1][4][0][3][2] = new Array();
					main_menu_info[1][4][0][3][2][0] = "已审核";
					main_menu_info[1][4][0][3][2][1] = "yishenhe";
					main_menu_info[1][4][0][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已审核/table_name/yingxiang_table_ct/zhixing_type/门诊";
				main_menu_info[1][4][0][3][3] = new Array();
					main_menu_info[1][4][0][3][3][0] = "已取消";
					main_menu_info[1][4][0][3][3][1] = "yiquxiao";
					main_menu_info[1][4][0][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已取消/table_name/yingxiang_table_ct/zhixing_type/门诊";
				
 	main_menu_info[1][4][1] = new Array();
			main_menu_info[1][4][1][0] = "DR";
			main_menu_info[1][4][1][1] = "DR";
			main_menu_info[1][4][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/table_name/yingxiang_table_dr/zhixing_type/门诊";
			main_menu_info[1][4][1][3] = new Array();
				main_menu_info[1][4][1][3][0] = new Array();
					main_menu_info[1][4][1][3][0][0] = "已申请";
					main_menu_info[1][4][1][3][0][1] = "yishenqing";
					main_menu_info[1][4][1][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已申请/table_name/yingxiang_table_dr/zhixing_type/门诊";
				main_menu_info[1][4][1][3][1] = new Array();
					main_menu_info[1][4][1][3][1][0] = "检查完毕";
					main_menu_info[1][4][1][3][1][1] = "jianchawanbi";
					main_menu_info[1][4][1][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_dr/zhixing_type/门诊";
				main_menu_info[1][4][1][3][2] = new Array();
					main_menu_info[1][4][1][3][2][0] = "已审核";
					main_menu_info[1][4][1][3][2][1] = "yishenhe";
					main_menu_info[1][4][1][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已审核/table_name/yingxiang_table_dr/zhixing_type/门诊";
				main_menu_info[1][4][1][3][3] = new Array();
					main_menu_info[1][4][1][3][3][0] = "已取消";
					main_menu_info[1][4][1][3][3][1] = "yiquxiao";
					main_menu_info[1][4][1][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已取消/table_name/yingxiang_table_dr/zhixing_type/门诊";
			
		main_menu_info[1][4][2] = new Array();
			main_menu_info[1][4][2][0] = "数字胃肠造影";
			main_menu_info[1][4][2][1] = "shuziweichangzaoying";
			main_menu_info[1][4][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/门诊";
			main_menu_info[1][4][2][3] = new Array();
				main_menu_info[1][4][2][3][0] = new Array();
					main_menu_info[1][4][2][3][0][0] = "已申请";
					main_menu_info[1][4][2][3][0][1] = "yishenqing";
					main_menu_info[1][4][2][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已申请/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/门诊";
				main_menu_info[1][4][2][3][1] = new Array();
					main_menu_info[1][4][2][3][1][0] = "检查完毕";
					main_menu_info[1][4][2][3][1][1] = "jianchawanbi";
					main_menu_info[1][4][2][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/门诊";
				main_menu_info[1][4][2][3][2] = new Array();
					main_menu_info[1][4][2][3][2][0] = "已审核";
					main_menu_info[1][4][2][3][2][1] = "yishenhe";
					main_menu_info[1][4][2][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已审核/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/门诊";
				main_menu_info[1][4][2][3][3] = new Array();
					main_menu_info[1][4][2][3][3][0] = "已取消";
					main_menu_info[1][4][2][3][3][1] = "yiquxiao";
					main_menu_info[0][4][2][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已取消/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/门诊";
			
	main_menu_info[2][0] = "体检检查";
	main_menu_info[2][1] = "tijian_jiancha";
	main_menu_info[2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/zhixing_type/体检";
	main_menu_info[2][3] = "体检检查";
	main_menu_info[2][4] = new Array();
			main_menu_info[2][4][0] = new Array();
				main_menu_info[2][4][0][0] = "CT";
				main_menu_info[2][4][0][1] = "CT";
				main_menu_info[2][4][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/table_name/yingxiang_table_ct/zhixing_type/体检";			                                            
			main_menu_info[2][4][0][3] = new Array();
       main_menu_info[2][4][0][3][0] = new Array();
					main_menu_info[2][4][0][3][0][0] = "已申请";
					main_menu_info[2][4][0][3][0][1] = "yishenqing";
					main_menu_info[2][4][0][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已申请/table_name/yingxiang_table_ct/zhixing_type/体检";                                                        		                                                     
				main_menu_info[2][4][0][3][1] = new Array();
					main_menu_info[2][4][0][3][1][0] = "检查完毕";
					main_menu_info[2][4][0][3][1][1] = "jianchawanbi";
					main_menu_info[2][4][0][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_ct/zhixing_type/体检";
				main_menu_info[2][4][0][3][2] = new Array();
					main_menu_info[2][4][0][3][2][0] = "已审核";
					main_menu_info[2][4][0][3][2][1] = "yishenhe";
					main_menu_info[2][4][0][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已审核/table_name/yingxiang_table_ct/zhixing_type/体检";
				main_menu_info[2][4][0][3][3] = new Array();
					main_menu_info[2][4][0][3][3][0] = "已取消";
					main_menu_info[2][4][0][3][3][1] = "yiquxiao";
					main_menu_info[2][4][0][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已取消/table_name/yingxiang_table_ct/zhixing_type/体检";
				
 	main_menu_info[2][4][1] = new Array();
			main_menu_info[2][4][1][0] = "DR";
			main_menu_info[2][4][1][1] = "DR";
			main_menu_info[2][4][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/table_name/yingxiang_table_dr/zhixing_type/体检";
			main_menu_info[2][4][1][3] = new Array();
				main_menu_info[2][4][1][3][0] = new Array();
					main_menu_info[2][4][1][3][0][0] = "已申请";
					main_menu_info[2][4][1][3][0][1] = "yishenqing";
					main_menu_info[2][4][1][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已申请/table_name/yingxiang_table_dr/zhixing_type/体检";
				main_menu_info[2][4][1][3][1] = new Array();
					main_menu_info[2][4][1][3][1][0] = "检查完毕";
					main_menu_info[2][4][1][3][1][1] = "jianchawanbi";
					main_menu_info[2][4][1][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_dr/zhixing_type/体检";
				main_menu_info[2][4][1][3][2] = new Array();
					main_menu_info[2][4][1][3][2][0] = "已审核";
					main_menu_info[2][4][1][3][2][1] = "yishenhe";
					main_menu_info[2][4][1][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已审核/table_name/yingxiang_table_dr/zhixing_type/体检";
				main_menu_info[2][4][1][3][3] = new Array();
					main_menu_info[2][4][1][3][3][0] = "已取消";
					main_menu_info[2][4][1][3][3][1] = "yiquxiao";
					main_menu_info[2][4][1][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已取消/table_name/yingxiang_table_dr/zhixing_type/体检";
			
		main_menu_info[2][4][2] = new Array();
			main_menu_info[2][4][2][0] = "数字胃肠造影";
			main_menu_info[2][4][2][1] = "shuziweichangzaoying";
			main_menu_info[2][4][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/体检";
			main_menu_info[2][4][2][3] = new Array();
				main_menu_info[2][4][2][3][0] = new Array();
					main_menu_info[2][4][2][3][0][0] = "已申请";
					main_menu_info[2][4][2][3][0][1] = "yishenqing";
					main_menu_info[2][4][2][3][0][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已申请/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/体检";
				main_menu_info[2][4][2][3][1] = new Array();
					main_menu_info[2][4][2][3][1][0] = "检查完毕";
					main_menu_info[2][4][2][3][1][1] = "jianchawanbi";
					main_menu_info[2][4][2][3][1][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/检查完毕/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/体检";
				main_menu_info[2][4][2][3][2] = new Array();
					main_menu_info[2][4][2][3][2][0] = "已审核";
					main_menu_info[2][4][2][3][2][1] = "yishenhe";
					main_menu_info[2][4][2][3][2][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已审核/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/体检";
				main_menu_info[2][4][2][3][3] = new Array();
					main_menu_info[2][4][2][3][3][0] = "已取消";
					main_menu_info[2][4][2][3][3][1] = "yiquxiao";
					main_menu_info[2][4][2][3][3][2] = "/tiantan_emr/Yingxiang/Xiangmu/showList/jiancha_keshi_id/8/jiancha_zhuangtai/已取消/table_name/yingxiang_table_shuziweichangzaoying/zhixing_type/体检";

	main_menu_info[3][0] = "项目管理";
	main_menu_info[3][1] = "xiangmu_guanli";
	main_menu_info[3][2] = "/tiantan_emr/Yingxiang/Admin/showTableList";
	main_menu_info[3][3] = "选择要管理的项目";
	main_menu_info[3][4] = new Array();

	main_menu_info[4][0] = "系统设置";
	main_menu_info[4][1] = "system_config";
	main_menu_info[4][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[4][3] = "选择设置项目";
	main_menu_info[4][4] = new Array();
	
	initinalMainMenu(main_menu_info);
}

//质控管理系统
function loadZhiKongConfig()
{
	var main_menu_number = 6;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<4;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	main_menu_info[0][0] = "查看病历";
	main_menu_info[0][1] = "chakanbingli";
	main_menu_info[0][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliList/guidang_zhuangtai/归档中";
	main_menu_info[0][3] = "查看病历";
	main_menu_info[0][4] = new Array();

	main_menu_info[1][0] = "检索病历";
	main_menu_info[1][1] = "jiansuobingli";
	main_menu_info[1][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliSearch";
	main_menu_info[1][3] = "检索病历";
	main_menu_info[1][4] = new Array();
		main_menu_info[1][4][0] = new Array();
			main_menu_info[1][4][0][0] = "检索病历";
			main_menu_info[1][4][0][1] = "edit_config";
			main_menu_info[1][4][0][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliSearch";
			main_menu_info[1][4][0][3] = new Array();
		main_menu_info[1][4][1] = new Array();
			main_menu_info[1][4][1][0] = "病历统计";
			main_menu_info[1][4][1][1] = "add_config";
			main_menu_info[1][4][1][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliTongji";
			main_menu_info[1][4][1][3] = new Array();
		main_menu_info[1][4][2] = new Array();
			main_menu_info[1][4][2][0] = "病历分析";
			main_menu_info[1][4][2][1] = "bingli_analysis";
			main_menu_info[1][4][2][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliAnalysis";
			main_menu_info[1][4][2][3] = new Array();
		main_menu_info[1][4][3] = new Array();
			main_menu_info[1][4][3][0] = "出院情况统计";
			main_menu_info[1][4][3][1] = "chuyuan_qingkuang_tongji";
			main_menu_info[1][4][3][2] = "/tiantan_emr/Zhikong/BingliGuanli/showChuyuanQingkuangTongji";
			main_menu_info[1][4][3][3] = new Array();
	
	main_menu_info[2][0] = "患者管理";
	main_menu_info[2][1] = "daochuhuanzhe";
	main_menu_info[2][2] = "/tiantan_emr/Zhikong/BingliGuanli/showHuanzheGuanli";
	main_menu_info[2][3] = "患者管理";
	main_menu_info[2][4] = new Array();


	main_menu_info[3][0] = "导出病历";
	main_menu_info[3][1] = "daochubingli";
	main_menu_info[3][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliShuchu";
	main_menu_info[3][3] = "导出病历";
	main_menu_info[3][4] = new Array();
	
	
	main_menu_info[4][0] = "疾病查询";
	main_menu_info[4][1] = "jibingchaxun";
	main_menu_info[4][2] = "/tiantan_emr/Zhikong/BingliGuanli/jibingChaxun";
	main_menu_info[4][3] = "疾病查询";
	main_menu_info[3][4] = new Array();

	main_menu_info[5][0] = "系统设置";
	main_menu_info[5][1] = "system_config";
	main_menu_info[5][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[5][3] = "选择设置项目";
	main_menu_info[5][4] = new Array();
	
	initinalMainMenu(main_menu_info);
}

//信息统计系统
function loadTongjiConfig()
{
	var main_menu_number = 3;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<4;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}

	main_menu_info[0][0] = "检索病历";
	main_menu_info[0][1] = "jiansuobingli";
	main_menu_info[0][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliSearch";
	main_menu_info[0][3] = "检索病历";
	main_menu_info[0][4] = new Array();
		main_menu_info[0][4][0] = new Array();
			main_menu_info[0][4][0][0] = "检索病历";
			main_menu_info[0][4][0][1] = "edit_config";
			main_menu_info[0][4][0][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliSearch";
			main_menu_info[0][4][0][3] = new Array();
	main_menu_info[0][4][1] = new Array();
			main_menu_info[0][4][1][0] = "病历分析";
			main_menu_info[0][4][1][1] = "bingli_analysis";
			main_menu_info[0][4][1][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliAnalysis";
			main_menu_info[0][4][1][3] = new Array();
	
	
	main_menu_info[1][0] = "数据统计";
	main_menu_info[1][1] = "shujutongji";
	main_menu_info[1][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliSearch";
	main_menu_info[1][3] = "数据统计";
	main_menu_info[1][4] = new Array();
		main_menu_info[1][4][0] = new Array();
			main_menu_info[1][4][0][0] = "病历统计";
			main_menu_info[1][4][0][1] = "add_config";
			main_menu_info[1][4][0][2] = "/tiantan_emr/Zhikong/BingliGuanli/showBingliTongji";
			main_menu_info[1][4][0][3] = new Array();
		main_menu_info[1][4][1] = new Array();
			main_menu_info[1][4][1][0] = "床位使用";
			main_menu_info[1][4][1][1] = "chuangwei_shiyong";
			main_menu_info[1][4][1][2] = "/tiantan_emr/Zhikong/BingliGuanli/showChuangweiTongji";
			main_menu_info[1][4][1][3] = new Array();
		main_menu_info[1][4][2] = new Array();
			main_menu_info[1][4][2][0] = "住院经费统计";
			main_menu_info[1][4][2][1] = "zhuyuan_jingfei";
			main_menu_info[1][4][2][2] = "/tiantan_emr/Zhikong/BingliGuanli/showJingfeiTongji";
			main_menu_info[1][4][2][3] = new Array();
		main_menu_info[1][4][3] = new Array();
			main_menu_info[1][4][3][0] = "用药统计";
			main_menu_info[1][4][3][1] = "yongyao_tongji";
			main_menu_info[1][4][3][2] = "/tiantan_emr/Zhikong/BingliGuanli/showYongyaoTongji";
			main_menu_info[1][4][3][3] = new Array();
		main_menu_info[1][4][4] = new Array();
			main_menu_info[1][4][4][0] = "诊断统计";
			main_menu_info[1][4][4][1] = "zhenduan_tongji";
			main_menu_info[1][4][4][2] = "/tiantan_emr/Zhikong/BingliGuanli/showZhenduanTongji";
			main_menu_info[1][4][4][3] = new Array();
		main_menu_info[1][4][5] = new Array();
			main_menu_info[1][4][5][0] = "出院情况统计";
			main_menu_info[1][4][5][1] = "chuyuan_qingkuang_tongji";
			main_menu_info[1][4][5][2] = "/tiantan_emr/Zhikong/BingliGuanli/showChuyuanQingkuangTongji";
			main_menu_info[1][4][5][3] = new Array();
		main_menu_info[1][4][6] = new Array();
			main_menu_info[1][4][6][0] = "其他病历统计";
			main_menu_info[1][4][6][1] = "qita_bingli_tongji";
			main_menu_info[1][4][6][2] = "/tiantan_emr/Zhikong/BingliGuanli/showQitaBingliTongji";
			main_menu_info[1][4][6][3] = new Array();

	main_menu_info[2][0] = "系统设置";
	main_menu_info[2][1] = "system_config";
	main_menu_info[2][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[2][3] = "选择设置项目";
	main_menu_info[2][4] = new Array();
	
	initinalMainMenu(main_menu_info);
}

//药房管理系统
function loadYaoFangConfig()
{
	var main_menu_number = 1;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<4;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	main_menu_info[0][0] = "药房管理";
	main_menu_info[0][1] = "yaofang_guanli";
	main_menu_info[0][2] = "/tiantan_emr/YaofangGuanli/YaopinGuanli/showYaopinlist";
	main_menu_info[0][3] = "药房管理";
	main_menu_info[0][4] = new Array();
		main_menu_info[0][4][0] = new Array();
			main_menu_info[0][4][0][0] = "药品列表";
			main_menu_info[0][4][0][1] = "search_yaopin";
			main_menu_info[0][4][0][2] = "/tiantan_emr/YaofangGuanli/YaopinGuanli/showYaopinlist";
			main_menu_info[0][4][0][3] = new Array();
		main_menu_info[0][4][1] = new Array();
			main_menu_info[0][4][1][0] = "添加药品";
			main_menu_info[0][4][1][1] = "add_yaopin";
			main_menu_info[0][4][1][2] = "/tiantan_emr/YaofangGuanli/YaopinGuanli/showAddYaopin";
			main_menu_info[0][4][1][3] = new Array();
		main_menu_info[0][4][2] = new Array();
			main_menu_info[0][4][2][0] = "导入导出药品";
			main_menu_info[0][4][2][1] = "ex_import_yaopin";
			main_menu_info[0][4][2][2] = "/tiantan_emr/YaofangGuanli/YaopinGuanli/daoChuDaoRuExcel";
			main_menu_info[0][4][2][3] = new Array();
	
	initinalMainMenu(main_menu_info);
}

function loadYishengConfig()
{
	var main_menu_number = 6;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<6;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	main_menu_info[0][0] = "查看患者";
	main_menu_info[0][1] = "show_patient";
	if(user_department_position=="科主任"||user_department_position=="主任医师"||user_department_position=="副主任医师"||user_department_position=="主治医师")
	{
		main_menu_info[0][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientList/suoyoubingren/suoyou";
	}
	else
	{
		main_menu_info[0][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientList/guidang_zhuangtai/未归档/zhuyuan_bingqu/"+user_department;
	}
	main_menu_info[0][3] = "查看患者";
	main_menu_info[0][4] = new Array();
	
	main_menu_info[1][0] = "病程记录";
	main_menu_info[1][1] = "add_bingchengjilu";
	main_menu_info[1][2] = "bingchengjilu";
	main_menu_info[1][3] = "添加病程记录";
	main_menu_info[1][4] = new Array();

	main_menu_info[2][0] = "电子处方";
	main_menu_info[2][1] = "add_new_chufang";
	main_menu_info[2][2] = "addchufang";
	main_menu_info[2][3] = "添加处方";
	main_menu_info[2][4] = new Array();

	main_menu_info[3][0] = "电子医嘱";
	main_menu_info[3][1] = "add_new_yizhu";
	main_menu_info[3][2] = "add_new_yizhu";
	main_menu_info[3][3] = "查看医嘱";
	main_menu_info[3][4] = new Array();

	main_menu_info[4][0] = "申请检查";
	main_menu_info[4][1] = "add_jiancha";
	//main_menu_info[5][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showAddJiancha";
	main_menu_info[4][2] = "add_jiancha";
	main_menu_info[4][3] = "申请检查";
	main_menu_info[4][4] = new Array();
	
	main_menu_info[5][0] = "系统设置";
	main_menu_info[5][1] = "system_config";
	main_menu_info[5][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[5][3] = "选择设置项目";
	main_menu_info[5][4] = new Array();
	
	initinalMainMenu(main_menu_info);
}

function loadHushiConfig()
{
	//护士端主按钮配置：
	//查看患者       show_patient
	//添加体征记录   add_style_records
	//系统设置       system_config
	var main_menu_number = 7;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<5;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}

	main_menu_info[0][0] = "查看患者";
	main_menu_info[0][1] = "show_patient";
	main_menu_info[0][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientList/guidang_zhuangtai/未归档/suoyoubingren/suoyou/";
	main_menu_info[0][3] = "患者分类";
	temp_sub_menu = new Array();
	
	main_menu_info[1][0] = "护理查房";
	main_menu_info[1][1] = "add_tizhengjilu";
	//main_menu_info[1][2] = "/tiantan_emr/Common/TiwenJiludan/showAddTiwendan";
	main_menu_info[1][2] = "add_tizhengjilu";
	main_menu_info[1][3] = "录入体征记录值";
	main_menu_info[1][4] = new Array();

	main_menu_info[2][0] = "查看三测单";
	main_menu_info[2][1] = "show_sancedan";
	//main_menu_info[2][2] = "/tiantan_emr/Common/TiwenJiludan/showAddTiwendan";
	main_menu_info[2][2] = "show_sancedan";
	main_menu_info[2][3] = "查看三测单";
	main_menu_info[2][4] = new Array();

	main_menu_info[3][0] = "医嘱执行";
	main_menu_info[3][1] = "yizhuzhixing";
	main_menu_info[3][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/geiyao_fangshi/yongfa|口服";
	main_menu_info[3][3] = "医嘱执行";
	main_menu_info[3][4] = new Array();

	main_menu_info[4][0] = "查看护理记录";
	main_menu_info[4][1] = "show_hulijilu";
	//main_menu_info[4][2] = "/tiantan_emr/Common/TiwenJiludan/showAddTiwendan";
	main_menu_info[4][2] = "show_hulijilu";
	main_menu_info[4][3] = "查看护理记录";
	main_menu_info[4][4] = new Array();

	main_menu_info[5][0] = "查看医嘱";
	main_menu_info[5][1] = "show_yizhu_hushi";
	//main_menu_info[5][2] = "/tiantan_emr/Common/TiwenJiludan/showAddTiwendan";
	main_menu_info[5][2] = "show_yizhu_hushi";
	main_menu_info[5][3] = "查看医嘱";
	main_menu_info[5][4] = new Array();

	main_menu_info[6][0] = "系统管理";
	main_menu_info[6][1] = "system_config";
	main_menu_info[6][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[6][3] = "选择设置项目";
	main_menu_info[6][4] = new Array();
	
	initinalMainMenu(main_menu_info);
}

function loadJiankangTijianConfig()
{
	var main_menu_number = 3;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<5;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	main_menu_info[0][0] = "添加单位";
	main_menu_info[0][1] = "add_danwei";
	main_menu_info[0][2] = "/tiantan_emr/JiankangTijian/Danwei/showAdd";
	main_menu_info[0][3] = "添加单位";
	main_menu_info[0][4] = new Array();
	
	main_menu_info[1][0] = "查看单位";
	main_menu_info[1][1] = "show_danwei";
	main_menu_info[1][2] = "/tiantan_emr/JiankangTijian/Danwei/view";
	main_menu_info[1][3] = "查看单位";
	main_menu_info[1][4] = new Array();
	
	main_menu_info[2][0] = "系统设置";
	main_menu_info[2][1] = "system_config";
	main_menu_info[2][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[2][3] = "系统设置";
	main_menu_info[2][4] = new Array();
	
	initinalMainMenu(main_menu_info);
}

function loadOtherConfig()
{
	//其它端主按钮配置：
	var main_menu_number = 2;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<5;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	main_menu_info[0][0] = "文章管理";
	main_menu_info[0][1] = "article_manage";
	main_menu_info[0][2] = "/tiantan_emr/Common/Article/showList/list_range/all";
	main_menu_info[0][3] = "文章管理";
	main_menu_info[0][4] = new Array();
		main_menu_info[0][4][0] = new Array();
			main_menu_info[0][4][0][0] = "添加新文章";
			main_menu_info[0][4][0][1] = "add_article";
			main_menu_info[0][4][0][2] = "/tiantan_emr/Common/Article/showList/jiancha_keshi_id/8/table_name/yingxiang_table_ct/zhixing_type/住院";
		main_menu_info[0][4][1] = new Array();
			main_menu_info[0][4][1][0] = "我的文章";
			main_menu_info[0][4][1][1] = "my_article";
			main_menu_info[0][4][1][2] = "/tiantan_emr/Common/Article/showList/list_range/my/user_number/"+user_number;
		main_menu_info[0][4][2] = new Array();
			main_menu_info[0][4][2][0] = "全部文章";
			main_menu_info[0][4][2][1] = "all_article";
			main_menu_info[0][4][2][2] = "/tiantan_emr/Common/Article/showList/list_range/all";

	main_menu_info[1][0] = "系统设置";
	main_menu_info[1][1] = "system_config";
	main_menu_info[1][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[1][3] = "选择设置项目";
	main_menu_info[1][4] = new Array();


	initinalMainMenu(main_menu_info);
}

function loadMenzhenyishengConfig()
{
	//门诊医生主按钮配置：
	var main_menu_number = 4;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<5;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	main_menu_info[0][0] = "添加患者";
	main_menu_info[0][1] = "add_patient";
	main_menu_info[0][2] = "/tiantan_emr/MenzhenYishi/Patient/showAddPatient/menzhen_kebie/"+user_kebie;
	main_menu_info[0][3] = "添加患者";
	main_menu_info[0][4] = new Array();
	
	main_menu_info[1][0] = "查看患者";
	main_menu_info[1][1] = "show_patient";
	main_menu_info[1][2] = "/tiantan_emr/MenzhenYishi/Patient/showPatientList/menzhenyishi_id/"+user_number;
	main_menu_info[1][3] = "查看患者";
	temp_sub_menu = new Array();
	
	main_menu_info[2][0] = "文章管理";
	main_menu_info[2][1] = "article_manage";
	main_menu_info[2][2] = "/tiantan_emr/Common/Article/showList/list_range/all";
	main_menu_info[2][3] = "文章管理";
	main_menu_info[2][4] = new Array();
		main_menu_info[2][4][0] = new Array();
			main_menu_info[2][4][0][0] = "添加新文章";
			main_menu_info[2][4][0][1] = "add_article";
			main_menu_info[2][4][0][2] = "/tiantan_emr/Common/Article/showList/jiancha_keshi_id/8/table_name/yingxiang_table_ct/zhixing_type/住院";
		main_menu_info[2][4][1] = new Array();
			main_menu_info[2][4][1][0] = "我的文章";
			main_menu_info[2][4][1][1] = "my_article";
			main_menu_info[2][4][1][2] = "/tiantan_emr/Common/Article/showList/list_range/my/user_number/"+user_number;
		main_menu_info[2][4][2] = new Array();
			main_menu_info[2][4][2][0] = "全部文章";
			main_menu_info[2][4][2][1] = "all_article";
			main_menu_info[2][4][2][2] = "/tiantan_emr/Common/Article/showList/list_range/all";

	main_menu_info[3][0] = "系统设置";
	main_menu_info[3][1] = "system_config";
	main_menu_info[3][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[3][3] = "选择设置项目";
	main_menu_info[3][4] = new Array();

	initinalMainMenu(main_menu_info);
}

function loadShoufeiConfig()
{
	//门诊医生主按钮配置：
	var main_menu_number = 4;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<5;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	main_menu_info[0][0] = "处方划价";
	main_menu_info[0][1] = "chufang_huajia";
	main_menu_info[0][2] = "/tiantan_emr/Shoufei/Shoufei/showChufangList";
	main_menu_info[0][3] = "处方划价";
	main_menu_info[0][4] = new Array();

	main_menu_info[1][0] = "检查划价";
	main_menu_info[1][1] = "jiancha_huajia";
	main_menu_info[1][2] = "/tiantan_emr/Shoufei/Shoufei/showJianchaList";
	main_menu_info[1][3] = "检查划价";
	main_menu_info[1][4] = new Array();

	main_menu_info[2][0] = "治疗划价";
	main_menu_info[2][1] = "zhiliao_huajia";
	main_menu_info[2][2] = "/tiantan_emr/Shoufei/Shoufei/showZhiliaoList";
	main_menu_info[2][3] = "治疗划价";
	main_menu_info[2][4] = new Array();

	main_menu_info[3][0] = "系统设置";
	main_menu_info[3][1] = "system_config";
	main_menu_info[3][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[3][3] = "选择设置项目";
	main_menu_info[3][4] = new Array();

	initinalMainMenu(main_menu_info);
}

//管理员系统
function loadAdminConfig()
{
	var main_menu_number = 5;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<5;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	main_menu_info[0][0] = "参数配置";
	main_menu_info[0][1] = "parameter_config";
	main_menu_info[0][2] = "/tiantan_emr/Admin/ParameterConfig/showParameterList";
	main_menu_info[0][3] = "参数配置";
	main_menu_info[0][4] = new Array();
		main_menu_info[0][4][0] = new Array();
			main_menu_info[0][4][0][0] = "修改参数";
			main_menu_info[0][4][0][1] = "edit_config";
			main_menu_info[0][4][0][2] = "/tiantan_emr/Admin/ParameterConfig/showParameterList";
			main_menu_info[0][4][0][3] = new Array();
		main_menu_info[0][4][1] = new Array();
			main_menu_info[0][4][1][0] = "添加参数";
			main_menu_info[0][4][1][1] = "add_config";
			main_menu_info[0][4][1][2] = "/tiantan_emr/Admin/ParameterConfig/showAddParameter";
			main_menu_info[0][4][1][3] = new Array();
		main_menu_info[0][4][2] = new Array();
			main_menu_info[0][4][2][0] = "ip设置";
			main_menu_info[0][4][2][1] = "ip_config";
			main_menu_info[0][4][2][2] = "/tiantan_emr/Admin/ParameterConfig/ipConfig";
			main_menu_info[0][4][2][3] = new Array();
		main_menu_info[0][4][3] = new Array();
			main_menu_info[0][4][3][0] = "test";
			main_menu_info[0][4][3][1] = "test";
			main_menu_info[0][4][3][2] = "/tiantan_emr/Admin/ParameterConfig/test";
			main_menu_info[0][4][3][3] = new Array();

	main_menu_info[1][0] = "账号管理";
	main_menu_info[1][1] = "user_manage";
	main_menu_info[1][2] = "/tiantan_emr/Admin/UserManage/showUserInfo";
	main_menu_info[1][3] = "账号管理";
	main_menu_info[1][4] = new Array();
		main_menu_info[1][4][0] = new Array();
			main_menu_info[1][4][0][0] = "科室信息";
			main_menu_info[1][4][0][1] = "keshi_info";
			main_menu_info[1][4][0][2] = "/tiantan_emr/Admin/UserManage/showKeshiInfo";
			main_menu_info[1][4][0][3] = new Array();
		main_menu_info[1][4][1] = new Array();
			main_menu_info[1][4][1][0] = "账户信息";
			main_menu_info[1][4][1][1] = "account_info";
			main_menu_info[1][4][1][2] = "/tiantan_emr/Admin/UserManage/showUserInfo";
			main_menu_info[1][4][1][3] = new Array();
	
	main_menu_info[2][0] = "公共资源";
	main_menu_info[2][1] = "public_resource";
	main_menu_info[2][2] = "/tiantan_emr/Admin/PublicResource/showResource";
	main_menu_info[2][3] = "公共资源";
	main_menu_info[2][4] = new Array();
		main_menu_info[2][4][0] = new Array();
			main_menu_info[2][4][0][0] = "药品信息";
			main_menu_info[2][4][0][1] = "data_yaopin";
			main_menu_info[2][4][0][2] = "/tiantan_emr/Admin/PublicResource/showDataYaopin";
			main_menu_info[2][4][0][3] = new Array();
		main_menu_info[2][4][1] = new Array();
			main_menu_info[2][4][1][0] = "医嘱信息";
			main_menu_info[2][4][1][1] = "data_yizhu";
			main_menu_info[2][4][1][2] = "/tiantan_emr/Admin/PublicResource/showDataYizhu";
			main_menu_info[2][4][1][3] = new Array();
		main_menu_info[2][4][2] = new Array();
			main_menu_info[2][4][2][0] = "项目信息";
			main_menu_info[2][4][2][1] = "data_xiangmu";
			main_menu_info[2][4][2][2] = "/tiantan_emr/Admin/PublicResource/showDataXiangmu";
			main_menu_info[2][4][2][3] = new Array();
				main_menu_info[2][4][2][3][0] = new Array();
				main_menu_info[2][4][2][3][0][0] = "用法";
				main_menu_info[2][4][2][3][0][1] = "data_xiangmu_yongfa";
				main_menu_info[2][4][2][3][0][2] = "/tiantan_emr/Admin/PublicResource/showDataXiangmuYongfaList";
				main_menu_info[2][4][2][3][0][3] = new Array();
				main_menu_info[2][4][2][3][1] = new Array();
				main_menu_info[2][4][2][3][1][0] = "频率";
				main_menu_info[2][4][2][3][1][1] = "data_xiangmu_pinlv";
				main_menu_info[2][4][2][3][1][2] = "/tiantan_emr/Admin/PublicResource/showDataXiangmuPinlvList";
				main_menu_info[2][4][2][3][1][3] = new Array();
				main_menu_info[2][4][2][3][2] = new Array();
				main_menu_info[2][4][2][3][2][0] = "单位";
				main_menu_info[2][4][2][3][2][1] = "data_xiangmu_danwei";
				main_menu_info[2][4][2][3][2][2] = "/tiantan_emr/Admin/PublicResource/showDataXiangmuDanweiList";
				main_menu_info[2][4][2][3][2][3] = new Array();
		main_menu_info[2][4][3] = new Array();
			main_menu_info[2][4][3][0] = "其它文书";
			main_menu_info[2][4][3][1] = "zhiqing_tongyishu";
			main_menu_info[2][4][3][2] = "/tiantan_emr/Admin/PublicResource/showOtherDocumentList";
			main_menu_info[2][4][3][3] = new Array();
		main_menu_info[2][4][4] = new Array();
			main_menu_info[2][4][4][0] = "规则录入";
			main_menu_info[2][4][4][1] = "guize_luru";
			main_menu_info[2][4][4][2] = "/tiantan_emr/Admin/PublicResource/showDataGuizeList";
			main_menu_info[2][4][4][3] = new Array();

	main_menu_info[3][0] = "数据纠正";
	main_menu_info[3][1] = "data_correct";
	main_menu_info[3][2] = "/tiantan_emr/Admin/DataCorrect/showPatientList";
	main_menu_info[3][3] = "数据纠正";
	main_menu_info[3][4] = new Array();
		main_menu_info[3][4][0] = new Array();
			main_menu_info[3][4][0][0] = "患者信息";
			main_menu_info[3][4][0][1] = "data_xiangmu";
			main_menu_info[3][4][0][2] = "/tiantan_emr/Admin/DataCorrect/showPatientList";
			main_menu_info[3][4][0][3] = new Array();
		main_menu_info[3][4][1] = new Array();
			// main_menu_info[3][4][1][0] = "账户信息";
			// main_menu_info[3][4][1][1] = "account_info";
			// main_menu_info[3][4][1][2] = "/tiantan_emr/Admin/UserManage/showUserInfo";
			// main_menu_info[3][4][1][3] = new Array();
	
	main_menu_info[4][0] = "快速配置";
	main_menu_info[4][1] = "quick_config";
	main_menu_info[4][2] = "/tiantan_emr/Admin/QuickConfig/showConfig";
	main_menu_info[4][3] = "快速配置";
	main_menu_info[4][4] = new Array();
	
	initinalMainMenu(main_menu_info);
}

//健康档案管理系统
function loadJiankangDanganYishiConfig()
{
	var main_menu_number = 4;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<6;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	main_menu_info[0][0] = "新增档案";
	main_menu_info[0][1] = "add_dangan";
	main_menu_info[0][2] = "/tiantan_emr/JiankangDangan/Dangan/showAddDangan";
	main_menu_info[0][3] = "新增档案";
	main_menu_info[0][4] = new Array();
	
	main_menu_info[1][0] = "查看档案";
	main_menu_info[1][1] = "show_dangan";
	main_menu_info[1][2] = "/tiantan_emr/JiankangDangan/Dangan/showDanganList";
	main_menu_info[1][3] = "查看档案";
	main_menu_info[1][4] = new Array();
	
	main_menu_info[2][0] = "档案传输";
	main_menu_info[2][1] = "dangan_chuanshu";
	main_menu_info[2][2] = "/tiantan_emr/JiankangDangan/Dangan/showDanganChuanshu";
	main_menu_info[2][3] = "查看档案";
	main_menu_info[2][4] = new Array();
	
	main_menu_info[3][0] = "系统设置";
	main_menu_info[3][1] = "system_config";
	main_menu_info[3][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[3][3] = "查看档案";
	main_menu_info[3][4] = new Array();
	
	initinalMainMenu(main_menu_info);
}

function loadJiankangDanganWeishengjuConfig()
{
	var main_menu_number = 5;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<6;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	
	main_menu_info[0][0] = "新增档案";
	main_menu_info[0][1] = "add_dangan";
	main_menu_info[0][2] = "/tiantan_emr/JiankangDangan/Dangan/showAddDangan";
	main_menu_info[0][3] = "新增档案";
	main_menu_info[0][4] = new Array();
	
	main_menu_info[1][0] = "查看档案";
	main_menu_info[1][1] = "show_dangan";
	main_menu_info[1][2] = "/tiantan_emr/JiankangDangan/Dangan/showDanganList";
	main_menu_info[1][3] = "查看档案";
	main_menu_info[1][4] = new Array();
	
	main_menu_info[2][0] = "信息统计";
	main_menu_info[2][1] = "information_statistics";
	main_menu_info[2][2] = "/tiantan_emr/JiankangDangan/Dangan/infoStatistics";
	main_menu_info[2][3] = "查看档案";
	main_menu_info[2][4] = new Array();
	
	main_menu_info[3][0] = "档案传输";
	main_menu_info[3][1] = "dangan_chuanshu";
	main_menu_info[3][2] = "/tiantan_emr/JiankangDangan/Dangan/showDanganChuanshu";
	main_menu_info[3][3] = "查看档案";
	main_menu_info[3][4] = new Array();
	
	main_menu_info[4][0] = "系统设置";
	main_menu_info[4][1] = "system_config";
	main_menu_info[4][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[4][3] = "查看档案";
	main_menu_info[4][4] = new Array();
	
	initinalMainMenu(main_menu_info);
}

function initinalMainMenu(main_menu_info)
{
	var main_menu_number = main_menu_info.length;
	$(".header_menu").html("");
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		$(".header_menu").append('<li main_menu_count="'+main_menu_count+'" url="'+main_menu_info[main_menu_count][2]+'" id="'+main_menu_info[main_menu_count][1]+'" name="'+main_menu_info[main_menu_count][1]+'"><a>'+main_menu_info[main_menu_count][0]+'</a></li>');
		$.imgButton(main_menu_info[main_menu_count][1]);
		$("#"+main_menu_info[main_menu_count][1]+"").click(function(){
			var temp_click_id = $(this).attr("id");
			if(temp_click_id == "yizhuzhixing")
			{
				$.get("/tiantan_emr/Common/Data/getAllHushiPatient",{ type: "yizhuzhixing"}, function(data){
						$(".menu_link").html(data);
					});
			}
			if($(this).attr("url")=="addchufang")
			{
				if(current_zhixing_id != '')
				{
					var temp_url = "/tiantan_emr/Common/Chufangguanli/showList/zhuyuan_id/"+current_zhixing_id;
					window.open(temp_url,'conframe');
					$.get("/tiantan_emr/Common/Data/getAllYishiPatient",{ type: "addchufang",zhuyuan_id: current_zhixing_id}, function(data){
						$(".menu_link").html(data);
					});
				}
				else
				{
					$.get("/tiantan_emr/Common/Data/getAllYishiPatient",{ type: "addchufang"}, function(data){
						$(".menu_link").html(data);
					});
					setTimeout(openOneChufang,'500');
					function openOneChufang()
					{
						$(".left_menu_div:first").css("background-color","#D2942C");
						$(".left_menu_div:first").css("color","#FFFFFF");
						var temp_zhuyuan_id = $(".left_menu_div:first").attr("zhuyuanid");
						var bingchengjilu_url = "/tiantan_emr/Common/Chufangguanli/showList/zhuyuan_id/"+temp_zhuyuan_id;
						window.open(bingchengjilu_url,'conframe');
					}
				}
			}
			else if($(this).attr("url")=="bingchengjilu")
			{
				if(current_zhixing_id != '')
				{
					var temp_url = "/tiantan_emr/AnboweiDataInterface/xinlianjie/case_id/"+current_zhixing_id+"/name/病程记录";
					window.open(temp_url,'conframe');
					$.get("/tiantan_emr/Common/Data/getAllYishiPatient",{ type: "bingchengjilu",zhuyuan_id: current_zhixing_id}, function(data){
						$(".menu_link").html(data);
					});
				}
				else
				{
					$.get("/tiantan_emr/Common/Data/getAllYishiPatient",{ type: "bingchengjilu"}, function(data){
						$(".menu_link").html(data);
					});
					setTimeout(openOneBingcheng,'500');
					function openOneBingcheng()
					{
						$(".left_menu_div:first").css("background-color","#D2942C");
						$(".left_menu_div:first").css("color","#FFFFFF");
						var temp_zhuyuan_id = $(".left_menu_div:first").attr("zhuyuanid");
						var bingchengjilu_url = "/tiantan_emr/AnboweiDataInterface/xinlianjie/case_id/"+temp_zhuyuan_id+"/name/病程记录";
						window.open(bingchengjilu_url,'conframe');
					}
				}
			}
			else if($(this).attr("url")=="add_ruyuanjilu")
			{
				if(current_zhixing_id != '')
				{
					var temp_url = "/tiantan_emr/ZhuyuanYishi/RuyuanJilu/showView/zhuyuan_id/"+current_zhixing_id;
					window.open(temp_url,'conframe');
					$.get("/tiantan_emr/Common/Data/getAllYishiPatient",{ type: "add_ruyuanjilu",zhuyuan_id: current_zhixing_id}, function(data){
						$(".menu_link").html(data);
					});
				}
				else
				{
					$.get("/tiantan_emr/Common/Data/getAllYishiPatient",{ type: "add_ruyuanjilu"}, function(data){
						$(".menu_link").html(data);
					});
					setTimeout(openOneRuyuanjilu,'500');
					function openOneRuyuanjilu()
					{
						$(".left_menu_div:first").css("background-color","#D2942C");
						$(".left_menu_div:first").css("color","#FFFFFF");
						var temp_zhuyuan_id = $(".left_menu_div:first").attr("zhuyuanid");
						var bingchengjilu_url = "/tiantan_emr/ZhuyuanYishi/RuyuanJilu/showView/zhuyuan_id/"+temp_zhuyuan_id;
						window.open(bingchengjilu_url,'conframe');
					}
				}
			}
			else if($(this).attr("url")=="add_new_yizhu")
			{
				if(current_zhixing_id != '')
				{
					var temp_url = "/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+current_zhixing_id;
					window.open(temp_url,'conframe');
					$.get("/tiantan_emr/Common/Data/getAllYishiPatient",{ type: "add_new_yizhu",zhuyuan_id: current_zhixing_id}, function(data){
						$(".menu_link").html(data);
					});
				}
				else
				{
					$.get("/tiantan_emr/Common/Data/getAllYishiPatient",{ type: "add_new_yizhu"}, function(data){
						$(".menu_link").html(data);
					});
					setTimeout(openOneYizhu,'500');
					function openOneYizhu()
					{
						$(".left_menu_div:first").css("background-color","#D2942C");
						$(".left_menu_div:first").css("color","#FFFFFF");
						var temp_zhuyuan_id = $(".left_menu_div:first").attr("zhuyuanid");
						var bingchengjilu_url = "/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+temp_zhuyuan_id;
						window.open(bingchengjilu_url,'conframe');
					}
				}
			}
			else if($(this).attr("url")=="add_jiancha")
			{
				if(current_zhixing_id != '')
				{
					var temp_url = "/tiantan_emr/ZhuyuanYishi/Jiancha/showAddJiancha/zhuyuan_id/"+current_zhixing_id;
					window.open(temp_url,'conframe');
					$.get("/tiantan_emr/Common/Data/getAllYishiPatient",{ type: "add_jiancha",zhuyuan_id: current_zhixing_id}, function(data){
						$(".menu_link").html(data);
					});
				}
				else
				{
					$.get("/tiantan_emr/Common/Data/getAllYishiPatient",{ type: "add_jiancha"}, function(data){
						$(".menu_link").html(data);
					});
					setTimeout(openOneJiancha,'500');
					function openOneJiancha()
					{
						$(".left_menu_div:first").css("background-color","#D2942C");
						$(".left_menu_div:first").css("color","#FFFFFF");
						var temp_zhuyuan_id = $(".left_menu_div:first").attr("zhuyuanid");
						var bingchengjilu_url = "/tiantan_emr/ZhuyuanYishi/Jiancha/showAddJiancha/zhuyuan_id/"+temp_zhuyuan_id;
						window.open(bingchengjilu_url,'conframe');
					}
				}
			}
			else if($(this).attr("url")=="add_tizhengjilu")
			{
				if(current_zhixing_id != '')
				{
					var temp_url = "/tiantan_emr/Common/TiwenJiludan/showAddTiwendan/zhuyuan_id/"+current_zhixing_id;
					window.open(temp_url,'conframe');
					$.get("/tiantan_emr/Common/Data/getAllHushiPatient",{ type: "add_tizhengjilu",zhuyuan_id: current_zhixing_id}, function(data){
						$(".menu_link").html(data);
					});
				}
				else
				{
					$.get("/tiantan_emr/Common/Data/getAllHushiPatient",{ type: "add_tizhengjilu"}, function(data){
						$(".menu_link").html(data);
					});
					setTimeout(openOnetizhengjilu,'500');
					function openOnetizhengjilu()
					{
						$(".left_menu_div:first").css("background-color","#D2942C");
						$(".left_menu_div:first").css("color","#FFFFFF");
						var temp_zhuyuan_id = $(".left_menu_div:first").attr("zhuyuanid");
						var bingchengjilu_url = "/tiantan_emr/Common/TiwenJiludan/showAddTiwendan/zhuyuan_id/"+temp_zhuyuan_id;
						window.open(bingchengjilu_url,'conframe');
					}
				}
			}
			else if($(this).attr("url")=="show_sancedan")
			{
				if(current_zhixing_id != '')
				{
					var temp_url = "/tiantan_emr/Common/TiwenJiludan/showList/zhuyuan_id/"+current_zhixing_id;
					window.open(temp_url,'conframe');
					$.get("/tiantan_emr/Common/Data/getAllHushiPatient",{ type: "show_sancedan",zhuyuan_id: current_zhixing_id}, function(data){
						$(".menu_link").html(data);
					});
				}
				else
				{
					$.get("/tiantan_emr/Common/Data/getAllHushiPatient",{ type: "show_sancedan"}, function(data){
						$(".menu_link").html(data);
					});
					setTimeout(openOnesancedan,'500');
					function openOnesancedan()
					{
						$(".left_menu_div:first").css("background-color","#D2942C");
						$(".left_menu_div:first").css("color","#FFFFFF");
						var temp_zhuyuan_id = $(".left_menu_div:first").attr("zhuyuanid");
						var bingchengjilu_url = "/tiantan_emr/Common/TiwenJiludan/showList/zhuyuan_id/"+temp_zhuyuan_id;
						window.open(bingchengjilu_url,'conframe');
					}
				}
			}
			else if($(this).attr("url")=="show_yizhu_hushi")
			{
				if(current_zhixing_id != '')
				{
					var temp_url = "/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+current_zhixing_id;
					window.open(temp_url,'conframe');
					$.get("/tiantan_emr/Common/Data/getAllHushiPatient",{ type: "show_yizhu_hushi",zhuyuan_id: current_zhixing_id}, function(data){
						$(".menu_link").html(data);
					});
				}
				else
				{
					$.get("/tiantan_emr/Common/Data/getAllHushiPatient",{ type: "show_yizhu_hushi"}, function(data){
						$(".menu_link").html(data);
					});
					setTimeout(openOneyizhu_hushi,'500');
					function openOneyizhu_hushi()
					{
						$(".left_menu_div:first").css("background-color","#D2942C");
						$(".left_menu_div:first").css("color","#FFFFFF");
						var temp_zhuyuan_id = $(".left_menu_div:first").attr("zhuyuanid");
						var bingchengjilu_url = "/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+temp_zhuyuan_id;
						window.open(bingchengjilu_url,'conframe');
					}
				}
			}
			else if($(this).attr("url")=="show_hulijilu")
			{
				if(current_zhixing_id != '')
				{
					var temp_url = "/tiantan_emr/HuliJilu/showList/zhuyuan_id/"+current_zhixing_id;
					window.open(temp_url,'conframe');
					$.get("/tiantan_emr/Common/Data/getAllHushiPatient",{ type: "show_hulijilu",zhuyuan_id: current_zhixing_id}, function(data){
						$(".menu_link").html(data);
					});
				}
				else
				{
					$.get("/tiantan_emr/Common/Data/getAllHushiPatient",{ type: "show_hulijilu",zhuyuan_id: current_zhixing_id}, function(data){
						$(".menu_link").html(data);
					});
					setTimeout(openOnehulijilu,'500');
					function openOnehulijilu()
					{
						$(".left_menu_div:first").css("background-color","#D2942C");
						$(".left_menu_div:first").css("color","#FFFFFF");
						var temp_zhuyuan_id = $(".left_menu_div:first").attr("zhuyuanid");
						var bingchengjilu_url = "/tiantan_emr/HuliJilu/showList/zhuyuan_id/"+temp_zhuyuan_id+"#bottom";
						window.open(bingchengjilu_url,'conframe');
					}
				}
			}
			else
			{
				$("#conframe").attr("src","http://"+server_url+$(this).attr("url"));
			}
						
			$(".loading").show();
			setTimeout(checkOnePatient,'500');
			function checkOnePatient()
			{
				if(temp_click_id != 'show_patient' && temp_click_id != 'add_patient' && temp_click_id != 'system_config')
				{
					$("#hidden_button").trigger("click");
					if(current_zhixing_id != '')
					{
						var huanzhe_a = $(".left_menu_title:first").html();
						$(".left_menu_title").html(huanzhe_a);
					}
					else
					{
						var huanzhe_name = "当前患者：";
						if($(".left_menu_div:first").find("div:first").html() != null)
						{
							huanzhe_name += $(".left_menu_div:first").find("div:first").html();
							var huanzhe_a = "<a href=\"/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetail/zhuyuan_id/"+$(".left_menu_div:first").attr("zhuyuanid")+"/xingming/"+$(".left_menu_div:first").find("div:first").html()+"/zhuangtai/"+current_patient_zhuangtai+"\" target=\"conframe\" style=\"text-decoration:none;color:#000;\">"+huanzhe_name+"</a>";
							$(".left_menu_title").html(huanzhe_a);
							$(".left_menu_title").css("color","#000000");
						}
					}
				}
			}
			if(main_menu_info[$(this).attr("main_menu_count")][4].length > 1)
				initinalSubMenu($(this).attr("main_menu_count"));
			new_zhixing_id = "";
		});
	}
}
function initinalSubMenu(main_menu_count)
{
	$(".left_menu_title").html(main_menu_info[main_menu_count][3]);
	//以下为循环生成树形目录
	//先清空树形菜单
	$(".menu_link").html("");
	//遍历数组追加子菜单信息
	for(var sub_menu_count=0;sub_menu_count<main_menu_info[main_menu_count][4].length;sub_menu_count++)
	{
		//单级目录：
		if(main_menu_info[main_menu_count][4][sub_menu_count][3].length<1)
		{
			$(".menu_link").append(
				'<li class="noSubMenu" state="closed"><b></b><a iframe_url="'+main_menu_info[main_menu_count][4][sub_menu_count][2]+'" id="'+main_menu_info[main_menu_count][4][sub_menu_count][1]+'">'+main_menu_info[main_menu_count][4][sub_menu_count][0]+'</a></li>'
			);
			$.imgTitleButton(main_menu_info[main_menu_count][4][sub_menu_count][1]);
		}
		//多级目录：
		else
		{
			var menu_link_content = '<li state="closed">';
			menu_link_content += '<span></span><a iframe_url="'+main_menu_info[main_menu_count][4][sub_menu_count][2]+'" id="'+main_menu_info[main_menu_count][4][sub_menu_count][1]+'">'+main_menu_info[main_menu_count][4][sub_menu_count][0]+'</a>';
			menu_link_content += '<ul>';
			for(var sub_sub_menu_count=0;sub_sub_menu_count<main_menu_info[main_menu_count][4][sub_menu_count][3].length;sub_sub_menu_count++)
			{
				menu_link_content += '<li><a iframe_url="'+main_menu_info[main_menu_count][4][sub_menu_count][3][sub_sub_menu_count][2]+'" id="'+main_menu_info[main_menu_count][4][sub_menu_count][3][sub_sub_menu_count][1]+'">'+main_menu_info[main_menu_count][4][sub_menu_count][3][sub_sub_menu_count][0]+'</a></li>';
			}
			menu_link_content += '</ul>';
			menu_link_content += '</li>';
			$(".menu_link").append(menu_link_content);
			$.imgTitleButton(main_menu_info[main_menu_count][4][sub_menu_count][1]);
		}
	}
	addTreeViewEvent();
}

function refreshSubMenu(temp_sub_menu)
{
	//以下为循环生成树形目录
	//先清空树形菜单
	$("#bingli").html("");
	//遍历数组追加子菜单信息
	for(var sub_menu_count=0;sub_menu_count<temp_sub_menu.length;sub_menu_count++)
	{
		//单级目录：
		if(temp_sub_menu[sub_menu_count][3].length<1)
		{
			$("#bingli").append(
				'<li class="noSubMenu" state="closed"><b></b><a iframe_url="'+temp_sub_menu[sub_menu_count][2]+'" id="'+temp_sub_menu[sub_menu_count][1]+'">'+temp_sub_menu[sub_menu_count][0]+'</a></li>'
			);
			$.imgTitleButton(temp_sub_menu[sub_menu_count][1]);
		}
		//多级目录：
		else
		{
			var menu_link_content = '<li state="closed">';
			menu_link_content += '<span></span><a iframe_url="'+temp_sub_menu[sub_menu_count][2]+'" id="'+temp_sub_menu[sub_menu_count][1]+'">'+temp_sub_menu[sub_menu_count][0]+'</a>';
			menu_link_content += '<ul>';
			for(var sub_sub_menu_count=0;sub_sub_menu_count<temp_sub_menu[sub_menu_count][3].length;sub_sub_menu_count++)
			{
				menu_link_content += '<li><a iframe_url="'+temp_sub_menu[sub_menu_count][3][sub_sub_menu_count][2]+'" id="'+temp_sub_menu[sub_menu_count][3][sub_sub_menu_count][1]+'">'+temp_sub_menu[sub_menu_count][3][sub_sub_menu_count][0]+'</a></li>';
			}
			menu_link_content += '</ul>';
			menu_link_content += '</li>';
			$("#bingli").append(menu_link_content);
			$.imgTitleButton(temp_sub_menu[sub_menu_count][1]);
		}
	}
	addTreeViewEvent();
}

function refreshSubMultiMenu(temp_sub_menu_bingli,temp_sub_menu_linchuang,temp_sub_menu_huli)
{
	//为病历菜单tab生成内容
	//先清空树形菜单
	$("#bingli").html("");
	//遍历数组追加子菜单信息
	for(var sub_menu_bingli_count=0;sub_menu_bingli_count<temp_sub_menu_bingli.length;sub_menu_bingli_count++)
	{
		//单级目录：
		if(temp_sub_menu_bingli[sub_menu_bingli_count][3].length<1)
		{
			$("#bingli").append(
				'<li class="noSubMenu" state="closed"><b></b><a iframe_url="'+temp_sub_menu_bingli[sub_menu_bingli_count][2]+'" id="'+temp_sub_menu_bingli[sub_menu_bingli_count][1]+'">'+temp_sub_menu_bingli[sub_menu_bingli_count][0]+'</a></li>'
			);
			$.imgTitleButton(temp_sub_menu_bingli[sub_menu_bingli_count][1]);
		}
		//多级目录：
		else
		{
			var menu_link_content = '<li state="closed">';
			menu_link_content += '<span></span><a iframe_url="'+temp_sub_menu_bingli[sub_menu_bingli_count][2]+'" id="'+temp_sub_menu_bingli[sub_menu_bingli_count][1]+'">'+temp_sub_menu_bingli[sub_menu_bingli_count][0]+'</a>';
			menu_link_content += '<ul>';
			for(var sub_sub_menu_bingli_count=0;sub_sub_menu_bingli_count<temp_sub_menu_bingli[sub_menu_bingli_count][3].length;sub_sub_menu_bingli_count++)
			{
				menu_link_content += '<li><a iframe_url="'+temp_sub_menu_bingli[sub_menu_bingli_count][3][sub_sub_menu_bingli_count][2]+'" id="'+temp_sub_menu_bingli[sub_menu_bingli_count][3][sub_sub_menu_bingli_count][1]+'">'+temp_sub_menu_bingli[sub_menu_bingli_count][3][sub_sub_menu_bingli_count][0]+'</a></li>';
			}
			menu_link_content += '</ul>';
			menu_link_content += '</li>';
			$("#bingli").append(menu_link_content);
			$.imgTitleButton(temp_sub_menu_bingli[sub_menu_bingli_count][1]);
		}
	}
	//为临床菜单tab生成内容
	//先清空树形菜单
	$("#linchuang").html("");
	//遍历数组追加子菜单信息
	for(var sub_menu_linchuang_count=0;sub_menu_linchuang_count<temp_sub_menu_linchuang.length;sub_menu_linchuang_count++)
	{
		//单级目录：
		if(temp_sub_menu_linchuang[sub_menu_linchuang_count][3].length<1)
		{
			$("#linchuang").append(
				'<li class="noSubMenu" state="closed"><b></b><a iframe_url="'+temp_sub_menu_linchuang[sub_menu_linchuang_count][2]+'" id="'+temp_sub_menu_linchuang[sub_menu_linchuang_count][1]+'">'+temp_sub_menu_linchuang[sub_menu_linchuang_count][0]+'</a></li>'
			);
			$.imgTitleButton(temp_sub_menu_linchuang[sub_menu_linchuang_count][1]);
		}
		//多级目录：
		else
		{
			var menu_link_content = '<li state="closed">';
			menu_link_content += '<span></span><a iframe_url="'+temp_sub_menu_linchuang[sub_menu_linchuang_count][2]+'" id="'+temp_sub_menu_linchuang[sub_menu_linchuang_count][1]+'">'+temp_sub_menu_linchuang[sub_menu_linchuang_count][0]+'</a>';
			menu_link_content += '<ul>';
			for(var sub_sub_menu_linchuang_count=0;sub_sub_menu_linchuang_count<temp_sub_menu_linchuang[sub_menu_linchuang_count][3].length;sub_sub_menu_linchuang_count++)
			{
				menu_link_content += '<li><a iframe_url="'+temp_sub_menu_linchuang[sub_menu_linchuang_count][3][sub_sub_menu_linchuang_count][2]+'" id="'+temp_sub_menu_linchuang[sub_menu_linchuang_count][3][sub_sub_menu_linchuang_count][1]+'">'+temp_sub_menu_linchuang[sub_menu_linchuang_count][3][sub_sub_menu_linchuang_count][0]+'</a></li>';
			}
			menu_link_content += '</ul>';
			menu_link_content += '</li>';
			$("#linchuang").append(menu_link_content);
			$.imgTitleButton(temp_sub_menu_linchuang[sub_menu_linchuang_count][1]);
		}
	}
	//为工具菜单tab生成内容
	//先清空树形菜单
	$("#huli").html("");
	//遍历数组追加子菜单信息
	for(var sub_menu_huli_count=0;sub_menu_huli_count<temp_sub_menu_huli.length;sub_menu_huli_count++)
	{
		//单级目录：
		if(temp_sub_menu_huli[sub_menu_huli_count][3].length<1)
		{
			$("#huli").append(
				'<li class="noSubMenu" state="closed"><b></b><a iframe_url="'+temp_sub_menu_huli[sub_menu_huli_count][2]+'" id="'+temp_sub_menu_huli[sub_menu_huli_count][1]+'">'+temp_sub_menu_huli[sub_menu_huli_count][0]+'</a></li>'
			);
			$.imgTitleButton(temp_sub_menu_huli[sub_menu_huli_count][1]);
		}
		//多级目录：
		else
		{
			var menu_link_content = '<li state="closed">';
			menu_link_content += '<span></span><a iframe_url="'+temp_sub_menu_huli[sub_menu_huli_count][2]+'" id="'+temp_sub_menu_huli[sub_menu_huli_count][1]+'">'+temp_sub_menu_huli[sub_menu_huli_count][0]+'</a>';
			menu_link_content += '<ul>';
			for(var sub_sub_menu_huli_count=0;sub_sub_menu_huli_count<temp_sub_menu_huli[sub_menu_huli_count][3].length;sub_sub_menu_huli_count++)
			{
				menu_link_content += '<li><a iframe_url="'+temp_sub_menu_huli[sub_menu_huli_count][3][sub_sub_menu_huli_count][2]+'" id="'+temp_sub_menu_huli[sub_menu_huli_count][3][sub_sub_menu_huli_count][1]+'">'+temp_sub_menu_huli[sub_menu_huli_count][3][sub_sub_menu_huli_count][0]+'</a></li>';
			}
			menu_link_content += '</ul>';
			menu_link_content += '</li>';
			$("#huli").append(menu_link_content);
			$.imgTitleButton(temp_sub_menu_huli[sub_menu_huli_count][1]);
		}
	}
	addTreeViewEvent();
}

$("#fuzhu_jiancha").live("mousemove",function(){
	
});

function loadingEnd()
{
	$(".loading").hide();
}

function UrlDecode(zipStr)
{  
     var uzipStr="";  
     for(var i=0;i<zipStr.length;i++){  
         var chr = zipStr.charAt(i);  
         if(chr == "+"){  
             uzipStr+=" ";  
         }else if(chr=="%"){  
             var asc = zipStr.substring(i+1,i+3);  
             if(parseInt("0x"+asc)>0x7f){  
                 uzipStr+=decodeURI("%"+asc.toString()+zipStr.substring(i+3,i+9).toString());  
                 i+=8;  
             }else{  
                 uzipStr+=AsciiToString(parseInt("0x"+asc));  
                 i+=2;  
             }  
         }else{  
             uzipStr+= chr;  
         }  
     }  
   
     return uzipStr;  
}  
   
 function StringToAscii(str){  
     return str.charCodeAt(0).toString(16);  
 }  
 function AsciiToString(asccode){  
     return String.fromCharCode(asccode);  
 }
 var temp_zhuyuan_id = '';
/*$(".left_menu_div").live("mousemove",function(){
	$(this).css("background-color","#EAEAEA");
});*/
$(".left_menu_div").live("click",function(){
	current_zhixing_id = $(this).attr("zhuyuanid");
	$(".left_menu_div").css("background-color","#fff");
	$(".left_menu_div").css("color","#000000");
	$(".left_menu_div").attr("yanse","");
	var huanzhe_name = "当前患者：";
	huanzhe_name += $(this).find("div:first").html();
	var huanzhe_a = "<a href=\"/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetail/zhuyuan_id/"+current_zhixing_id+"/xingming/"+$(this).find("div:first").html()+"/zhuangtai/"+current_patient_zhuangtai+"\" target=\"conframe\" style=\"text-decoration:none;color:#000;\">"+huanzhe_name+"</a>";
	$(".left_menu_title").html(huanzhe_a);
	$(".left_menu_title").css("color","#000000");
	$(this).css("background-color","#D2942C");
	$(this).css("color","#FFFFFF");
	$(this).attr("yanse","Y");
	$(".loading").show();
});
$(".left_menu_div").live("mousemove",function(){
	var temp_beijing_color = $(this).css("background-color");
	var temp_zhuanhuan = RGBToHex(temp_beijing_color);
	if(temp_zhuanhuan == "#FFFFFF")
	{
		$(this).css("background-color","#D2942C");
		$(this).live("mouseout",function(){
			if($(this).attr("yanse") != 'Y')
			{
				$(this).css("background-color","#fff");
			}
		});
	}
});

function RGBToHex(rgb)
{        
	var regexp = /^rgb\(([0-9]{0,3})\,\s([0-9]{0,3})\,\s([0-9]{0,3})\)/g;
	var re = rgb.replace(regexp, "$1 $2 $3").split(" ");//利用正则表达式去掉多余的部分
	var hexColor = "#";
	var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	for (var i = 0; i < 3; i++)
	{
		var r = null;
		var c = re[i];
		var hexAr = [];
		while (c > 16)
		{
			r = c % 16;
			c = (c / 16) >> 0;
			hexAr.push(hex[r]);
		}
		hexAr.push(hex[c]);
		hexColor += hexAr.reverse().join('');
	}
	return hexColor;
}

$(".left_menu_title a").live("mouseover",function(){
	$(this).css("color","#fff");
}).live("mouseout",function(){
	$(this).css("color","#000");
});