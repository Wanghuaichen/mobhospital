//定义全局变量菜单信息
var main_menu_info=new Array();
var current_content_url="";
var current_zhixing_id="";
var current_patient_xingming="";
var current_patient_zhuangtai="";
var user_number = "";
var quanxian = "";
var zhurenyishi_id = "";
var zhuzhiyishi_id = "";
var zhuyuanyishi_id = "";
var chuyuan_type = "";
var last_content_url="";

$(document).ready(function(){
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
	else if(user_type=="质控")
		loadZhiKongConfig();
	else if(user_type=="管理员")
		loadAdminConfig();
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
	var arrs = new Array();
	var url_names = current_content_url;
	var arrs = url_names.split("/");
	var lengths = arrs.length;
	var length_s = lengths-1;
	chuyuan_type = arrs[length_s];

	//变换打印地址：
	home_page = server_url +"/tiantan_emr/";
	if (current_content_url.indexOf("tiantan_add_form") == -1 && current_content_url.indexOf("/edit") == -1)
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
					printer_url = home_page + "/Yingxiang/Xiangmu/printShenqingdan/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).Replace("jiancha_id", "jianyan_id");
				else
					printer_url = home_page + "/Yingxiang/Xiangmu/printReport/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).Replace("jiancha_id", "jianyan_id");
			}
			else if (current_url.indexOf("bingqu_tables") != -1)
			{
				if (current_url.indexOf("已申请") != -1 || current_url.indexOf("检查完毕") != -1)
					printer_url = home_page + "/ZhuyuanYishi/Jiancha/printShenqingdan/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).Replace("jiancha_id", "jianyan_id");
				else
					printer_url = home_page + "/ZhuyuanYishi/Jiancha/printReport/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).Replace("jiancha_id", "jianyan_id");
			}
			else
			{
				if (current_url.indexOf("已申请") != -1 || current_url.indexOf("检查完毕") != -1)
					printer_url = home_page + "/Jianyan/Xiangmu/printShenqingdan/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).Replace("jiancha_id", "jianyan_id");
				else
					printer_url = home_page + "/Jianyan/Xiangmu/printReport/zhixing_type/住院/zhixing_id/" + current_zhixing_id + "/" + current_url.substring(current_url.indexOf("jiancha_id/")).Replace("jiancha_id", "jianyan_id");
			}
		}
		else
		{
			if (current_content_url.indexOf("View") != -1)
				printer_url = current_content_url.replace("View", "Print");
			else if (current_content_url.indexOf("TiwenJiludan/showSancedan/") != -1)
				printer_url = current_content_url;
			else
				printer_url = current_content_url.replace("show", "print");
		}
		
		if (current_content_url.indexOf("System/showUserLoginInfo") != -1)
		{
			printer_url = current_content_url;
		}

		$("#printer_conframe").attr("src",printer_url);
	}

	//如果因为住院ID发生变化
	if(current_content_url.indexOf("showPatientZhuyuanDetail")!=-1 || (current_content_url.indexOf("###")==-1 && current_content_url.indexOf("editPatientBasicInfo")!=-1) || (current_content_url.indexOf("editChuyuanInfo")!=-1 && last_content_url.indexOf("updateChuyuanInfo")!=-1))
	{
		//获取最新的住院ID
		if(current_content_url.indexOf("/",current_content_url.indexOf("zhuyuan_id/")+11)!=-1)
			current_zhixing_id = current_content_url.substring(current_content_url.indexOf("zhuyuan_id/")+11,current_content_url.indexOf("/",current_content_url.indexOf("zhuyuan_id/")+11));
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
	
	//如果因为单位ID发生变化
	if(current_content_url.indexOf("Danwei/viewdetail/danwei_id")!=-1)
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
	
	//如果因为单位ID发生变化
	if(current_content_url.indexOf("TijianDanwei/viewdetail/danwei_tijian_id")!=-1)
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
	if(current_content_url.indexOf("tijian_id")!=-1)
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

	$(".left_menu_title").html("菜单列表");
		$(".left_menu_title").css("color","black");
		var temp_sub_menu = new Array();
	
		temp_sub_menu[0] = new Array();
			temp_sub_menu[0][0] = "检查项目";
			temp_sub_menu[0][1] = "jiancha_result";
			temp_sub_menu[0][2] = "/tiantan_emr/Huanzhe/Huanzhe/showJianchaList/user_name/"+user_name;
			temp_sub_menu[0][3] = new Array();

		temp_sub_menu[1] = new Array();
			temp_sub_menu[1][0] = "药品查询";
			temp_sub_menu[1][1] = "yaopin_search";
			temp_sub_menu[1][2] = "/tiantan_emr/Huanzhe/Huanzhe/yaopinSearch";
			temp_sub_menu[1][3] = new Array();
				
		temp_sub_menu[2] = new Array();
			temp_sub_menu[2][0] = "密码修改";
			temp_sub_menu[2][1] = "pass_update";
			temp_sub_menu[2][2] = "/tiantan_emr/Huanzhe/Huanzhe/updateInfo/user_name/"+user_name;
			temp_sub_menu[2][3] = new Array();
	
		refreshSubMenu(temp_sub_menu);
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
			
		temp_sub_menu[4] = new Array();
			temp_sub_menu[4][0] = "质控评分";
			temp_sub_menu[4][1] = "zhikongpingfen";
			temp_sub_menu[4][2] = "/tiantan_emr/Zhikong/BingliPingfen/editPingfen/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[4][3] = new Array();
			
		temp_sub_menu[5] = new Array();
			temp_sub_menu[5][0] = "住院费用";
			temp_sub_menu[5][1] = "zhuyuan_feiyong";
			temp_sub_menu[5][2] = "/tiantan_emr/ZhuyuanYishi/Feiyong/editZhuyuanFeiyong/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[5][3] = new Array();
			
		temp_sub_menu[6] = new Array();
			temp_sub_menu[6][0] = "质控信息";
			temp_sub_menu[6][1] = "zhikongxinxi";
			temp_sub_menu[6][2] = "/tiantan_emr/Zhikong/BingliGuanli/editZhikongInfo/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[6][3] = new Array();
		
		if(chuyuan_type == "已出院"){
		temp_sub_menu[7] = new Array();
			temp_sub_menu[7][0] = "出院记录";
			temp_sub_menu[7][1] = "chuyuanjilu";
			temp_sub_menu[7][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanJilu/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[7][3] = new Array();
		}
		else if(chuyuan_type == "24小时内出院")
		{
			temp_sub_menu[7] = new Array();
			temp_sub_menu[7][0] = "24小时内出院记录";
			temp_sub_menu[7][1] = "chuyuanjilu";
			temp_sub_menu[7][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanShortJilu/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[7][3] = new Array();
		}
		else if(chuyuan_type == "自动出院")
		{
			temp_sub_menu[7] = new Array();
			temp_sub_menu[7][0] = "自动出院记录";
			temp_sub_menu[7][1] = "chuyuanjilu";
			temp_sub_menu[7][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanZidongJilu/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[7][3] = new Array();
		}
		else if(chuyuan_type == "24小时内自动出院")
		{
			temp_sub_menu[7] = new Array();
			temp_sub_menu[7][0] = "24小时内自动出院记录";
			temp_sub_menu[7][1] = "chuyuanjilu";
			temp_sub_menu[7][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanShortZidongJilu/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[7][3] = new Array();
		}
		else if(chuyuan_type == "死亡")
		{
			temp_sub_menu[7] = new Array();
			temp_sub_menu[7][0] = "死亡记录";
			temp_sub_menu[7][1] = "chuyuanjilu";
			temp_sub_menu[7][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanSiwangJilu/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[7][3] = new Array();
		}
		else if(chuyuan_type == "24小时内死亡")
		{
			temp_sub_menu[7] = new Array();
			temp_sub_menu[7][0] = "24小时内死亡记录";
			temp_sub_menu[7][1] = "chuyuanjilu";
			temp_sub_menu[7][2] = "/tiantan_emr/ZhuyuanYishi/ChuyuanShortSiwangJilu/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[7][3] = new Array();
		}
		refreshSubMenu(temp_sub_menu);
}

function updateSubMenuByZhuyuanIDforYishi()
{
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
				temp_sub_menu[1][3][0] = new Array();
					temp_sub_menu[1][3][0][0] = "基本信息";
					temp_sub_menu[1][3][0][1] = "jiben_xinxi";
					temp_sub_menu[1][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Patient/editPatientBasicInfo/zhuyuan_id/"+current_zhixing_id+"/###";
				temp_sub_menu[1][3][1] = new Array();
					temp_sub_menu[1][3][1][0] = "联系方式";
					temp_sub_menu[1][3][1][1] = "lianxi_fangshi";
					temp_sub_menu[1][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Patient/editPatientContactInfo/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu[1][3][2] = new Array();
					temp_sub_menu[1][3][2][0] = "其他住院信息";
					temp_sub_menu[1][3][2][1] = "qita_zhuyuan_xinxi";
					temp_sub_menu[1][3][2][2] = "/tiantan_emr/ZhuyuanYishi/Patient/editPatientZhuyuanInfo/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu[1][3][3] = new Array();
					temp_sub_menu[1][3][3][0] = "责任医师";
					temp_sub_menu[1][3][3][1] = "zenren_yishi";
					temp_sub_menu[1][3][3][2] = "/tiantan_emr/ZhuyuanYishi/Patient/editZhuyuanYishiInfo/zhuyuan_id/"+current_zhixing_id;
					
		temp_sub_menu[2] = new Array();
			temp_sub_menu[2][0] = "诊断";
			temp_sub_menu[2][1] = "zhenduan";
			temp_sub_menu[2][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showZongjie/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
			temp_sub_menu[2][3] = new Array();
				temp_sub_menu[2][3][0] = new Array();
					temp_sub_menu[2][3][0][0] = "门诊诊断";
					temp_sub_menu[2][3][0][1] = "menzhen_zhenduan";
					temp_sub_menu[2][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showMenzhenZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				temp_sub_menu[2][3][1] = new Array();
					temp_sub_menu[2][3][1][0] = "入院诊断";
					temp_sub_menu[2][3][1][1] = "ruyuan_zhenduan";
					temp_sub_menu[2][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showRuyuanZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				temp_sub_menu[2][3][2] = new Array();
					temp_sub_menu[2][3][2][0] = "出院诊断";
					temp_sub_menu[2][3][2][1] = "chuyuan_zhenduan";
					temp_sub_menu[2][3][2][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showChuyuanZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				temp_sub_menu[2][3][3] = new Array();
					temp_sub_menu[2][3][3][0] = "其他诊断";
					temp_sub_menu[2][3][3][1] = "qita_zhenduan";
					temp_sub_menu[2][3][3][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showQitaZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;

		temp_sub_menu[3] = new Array();
			temp_sub_menu[3][0] = "入院记录";
			temp_sub_menu[3][1] = "ruyuan_jilu";
			temp_sub_menu[3][2] = "/tiantan_emr/ZhuyuanYishi/RuyuanJilu/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[3][3] = new Array();
				temp_sub_menu[3][3][0] = new Array();
					temp_sub_menu[3][3][0][0] = "病史记录";
					temp_sub_menu[3][3][0][1] = "bingshi_jilu";
					temp_sub_menu[3][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/editBingshiJilu/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu[3][3][1] = new Array();
					temp_sub_menu[3][3][1][0] = "入院体格检查";
					temp_sub_menu[3][3][1][1] = "ruyuan_tige_jiancha";
					temp_sub_menu[3][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanTigejiancha/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu[3][3][2] = new Array();
					temp_sub_menu[3][3][2][0] = "入院专科检查";
					temp_sub_menu[3][3][2][1] = "ruyuan_zhuanke_jiancha";
					temp_sub_menu[3][3][2][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanZhuankejiancha/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu[3][3][3] = new Array();
					temp_sub_menu[3][3][3][0] = "入院辅助检查";
					temp_sub_menu[3][3][3][1] = "ruyuan_fuzhu_jiancha";
					temp_sub_menu[3][3][3][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanFuzhujiancha/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu[3][3][4] = new Array();
					temp_sub_menu[3][3][4][0] = "入院中医检查";
					temp_sub_menu[3][3][4][1] = "ruyuan_zhognyi_jiancha";
					temp_sub_menu[3][3][4][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanZhongyijiancha/zhuyuan_id/"+current_zhixing_id;

		temp_sub_menu[4] = new Array();
			temp_sub_menu[4][0] = "病程记录";
			temp_sub_menu[4][1] = "bingcheng_jilu";
			temp_sub_menu[4][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showView/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu[4][3] = new Array();
				temp_sub_menu[4][3][0] = new Array();
					temp_sub_menu[4][3][0][0] = "首次病程记录";
					temp_sub_menu[4][3][0][1] = "shouci_bingcheng_jilu";
					temp_sub_menu[4][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/editShouciBingchengJilu/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu[4][3][1] = new Array();
					temp_sub_menu[4][3][1][0] = "添加病程记录";
					temp_sub_menu[4][3][1][1] = "tianjia_bingcheng_jilu";
					temp_sub_menu[4][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/bingchengJiluShowAdd/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu[4][3][2] = new Array();
					temp_sub_menu[4][3][2][0] = "查看病程记录";
					temp_sub_menu[4][3][2][1] = "bingcheng_jilu_zonglan";
					temp_sub_menu[4][3][2][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/bingchengJiluShowList/zhuyuan_id/"+current_zhixing_id;
		
				temp_sub_menu[5] = new Array();
					temp_sub_menu[5][0] = "住院费用";
					temp_sub_menu[5][1] = "zhuyuan_feiyong";
					temp_sub_menu[5][2] = "/tiantan_emr/ZhuyuanYishi/Feiyong/editZhuyuanFeiyong/zhuyuan_id/"+current_zhixing_id;
					temp_sub_menu[5][3] = new Array();
		
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
				temp_sub_menu[6] = new Array();
					temp_sub_menu[6][0] = "出院记录";
					temp_sub_menu[6][1] = "chuyuan_jilu";
					temp_sub_menu[6][2] = "/tiantan_emr/ZhuyuanYishi/"+chuyuan_jilu_mingcheng+"/showView/zhuyuan_id/"+current_zhixing_id;
					temp_sub_menu[6][3] = new Array();
						temp_sub_menu[6][3][0] = new Array();
							temp_sub_menu[6][3][0][0] = "出院信息";
							temp_sub_menu[6][3][0][1] = "chuyuan_info";
							temp_sub_menu[6][3][0][2] = "/tiantan_emr/ZhuyuanYishi/"+chuyuan_jilu_mingcheng+"/editChuyuanInfo/zhuyuan_id/"+current_zhixing_id;
						temp_sub_menu[6][3][1] = new Array();
							temp_sub_menu[6][3][1][0] = "记录填写";
							temp_sub_menu[6][3][1][1] = "jilu_tianxie";
							temp_sub_menu[6][3][1][2] = "/tiantan_emr/ZhuyuanYishi/"+chuyuan_jilu_mingcheng+"/editJilu/zhuyuan_id/"+current_zhixing_id;
			}
		
		main_menu_info[2][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/bingchengJiluShowAdd/zhuyuan_id/"+current_zhixing_id;
		main_menu_info[3][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showAddPiliang/zhuyuan_id/"+current_zhixing_id;

		$("#"+main_menu_info[2][1]+"").attr("url",main_menu_info[2][2]);
		$("#"+main_menu_info[3][1]+"").attr("url",main_menu_info[3][2]);
		
		refreshSubMenu(temp_sub_menu);
}

function updateSubMenuByZhuyuanIDforYishi_limitedAuthority()
{
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
			
			if(chuyuan_jilu_mingcheng!="zhuyuanzhong")
			{
				temp_sub_menu[4] = new Array();
					temp_sub_menu[4][0] = "出院记录";
					temp_sub_menu[4][1] = "chuyuan_jilu";
					temp_sub_menu[4][2] = "/tiantan_emr/ZhuyuanYishi/"+chuyuan_jilu_mingcheng+"/showView/zhuyuan_id/"+current_zhixing_id;
					temp_sub_menu[4][3] = new Array();
						temp_sub_menu[4][3][0] = new Array();
							temp_sub_menu[4][3][0][0] = "出院信息";
							temp_sub_menu[4][3][0][1] = "chuyuan_info";
							temp_sub_menu[4][3][0][2] = "/tiantan_emr/ZhuyuanYishi/"+chuyuan_jilu_mingcheng+"/editChuyuanInfo/zhuyuan_id/"+current_zhixing_id;
						temp_sub_menu[4][3][1] = new Array();
							temp_sub_menu[4][3][1][0] = "记录填写";
							temp_sub_menu[4][3][1][1] = "jilu_tianxie";
							temp_sub_menu[4][3][1][2] = "/tiantan_emr/ZhuyuanYishi/"+chuyuan_jilu_mingcheng+"/editJilu/zhuyuan_id/"+current_zhixing_id;
			}
			
		main_menu_info[2][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/bingchengJiluShowAdd/zhuyuan_id/"+current_zhixing_id;
		main_menu_info[3][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showAddPiliang/zhuyuan_id/"+current_zhixing_id;

		$("#"+main_menu_info[2][1]+"").attr("url",main_menu_info[2][2]);
		$("#"+main_menu_info[3][1]+"").attr("url",main_menu_info[3][2]);
		
		refreshSubMenu(temp_sub_menu);
}

function updateSubMenuByDanweiID()
{
	var temp_sub_menu = new Array();
	
		temp_sub_menu[1] = new Array();
			temp_sub_menu[1][0] = "添加单位体检";
			temp_sub_menu[1][1] = "tianjia_danwei_tijian";
			temp_sub_menu[1][2] = "/tiantan_emr/JiankangTijian/TijianDanwei/showadd/danwei_id/"+current_danwei_id;
			temp_sub_menu[1][3] = new Array();
				
		temp_sub_menu[0] = new Array();
			temp_sub_menu[0][0] = "查看体检信息";
			temp_sub_menu[0][1] = "chakan_tijian_xinxi";
			temp_sub_menu[0][2] = "/tiantan_emr/JiankangTijian/Danwei/viewdetail/danwei_id/"+current_danwei_id;
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
			temp_sub_menu[1][2] = "/tiantan_emr/JiankangTijian/TijianDanwei/viewdetail/danwei_tijian_id/"+current_zhixing_id;
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
	    temp_sub_menu[6][2] = "/tiantan_emr/JiankangTijian/GerenTijianBaogao/show/tijian_id/"+current_zhixing_id+"/danwei_tijian_id/"+current_danwei_tijian_id;
			temp_sub_menu[6][3] = new Array();
				
	refreshSubMenu(temp_sub_menu);
}

function addTreeViewEvent()
{
	$("ul.menu_link>li>a").click(function(){
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
	
	$("ul.menu_link>li>ul>li>a").click(function(){
		$(this).parent().parent().find("a").css("color","white");
		$(this).css("color","black");
	});
	
	$("li a").click(function(){
		$("#conframe").attr("src","http://"+server_url+$(this).attr("iframe_url"));
		$(".loading").show();
		window.setTimeout(loadingEnd,1500);
	});
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

//管理员系统
function loadAdminConfig()
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
	
	main_menu_info[3][0] = "快速配置";
	main_menu_info[3][1] = "quick_config";
	main_menu_info[3][2] = "/tiantan_emr/Admin/QuickConfig/showConfig";
	main_menu_info[3][3] = "快速配置";
	main_menu_info[3][4] = new Array();
	
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
	
	main_menu_info[0][0] = "添加患者";
	main_menu_info[0][1] = "add_patient";
	main_menu_info[0][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showAddPatient/ruyuan_bingqu/"+user_department+"/ruyuan_kebie/"+user_kebie;
	main_menu_info[0][3] = "添加患者";
	main_menu_info[0][4] = new Array();
	
	main_menu_info[1][0] = "查看患者";
	main_menu_info[1][1] = "show_patient";
	main_menu_info[1][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientList/guidang_zhuangtai/未归档/zhuyuan_bingqu/"+user_department;
	main_menu_info[1][3] = "患者分类";
	main_menu_info[1][4] = new Array();
	
	main_menu_info[2][0] = "添加病程记录";
	main_menu_info[2][1] = "add_bingchengjilu";
	main_menu_info[2][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/bingchengJiluShowAdd";
	main_menu_info[2][3] = "患者分类";
	main_menu_info[1][4] = new Array();
	
	main_menu_info[3][0] = "申请检查";
	main_menu_info[3][1] = "add_jiancha";
	main_menu_info[3][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showAddPiliang";
	main_menu_info[3][3] = "患者分类";
	main_menu_info[3][4] = new Array();
	
	main_menu_info[5][0] = "系统设置";
	main_menu_info[5][1] = "system_config";
	main_menu_info[5][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[5][3] = "选择设置项目";
	main_menu_info[5][4] = new Array();
	
	main_menu_info[4][0] = "添加处方";
	main_menu_info[4][1] = "add_new_chufang";
	main_menu_info[4][2] = "addchufang";
	main_menu_info[4][3] = "添加处方";
	main_menu_info[4][4] = new Array();
	
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

function initinalMainMenu(main_menu_info)
{
	var main_menu_number = main_menu_info.length;
	$(".header_menu").html("");
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		$(".header_menu").append('<li main_menu_count="'+main_menu_count+'" url="'+main_menu_info[main_menu_count][2]+'" id="'+main_menu_info[main_menu_count][1]+'" name="'+main_menu_info[main_menu_count][1]+'"><a>'+main_menu_info[main_menu_count][0]+'</a></li>');
		$.imgButton(main_menu_info[main_menu_count][1]);
		$("#"+main_menu_info[main_menu_count][1]+"").click(function(){
			if($(this).attr("url")=="addchufang")
			{
				if(current_zhixing_id!="")
				{
					art.dialog({
						id:"chufang_dialog",
						title:"选择添加的处方",
						content:'<form class="dialog_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/addOneChufang">'+
											'<input type="button" class="edit_chufang_button" name="add_multi" value="中草药处方" />'+
											'<input type="hidden" name="type" value="中草药"/>'+
											'<input type="hidden" name="kaili_time" value="now"/>'+
											'<input type="hidden" name="zhuyuan_id" value="'+current_zhixing_id+'" />'+
											'<input type="hidden" name="state" value="新添加" />'+
											'<input type="hidden" name="jine_zongji" value="0" />'+
											'<input type="hidden" name="kaili_yishi_name" value="'+user_name+'" />'+
											'<input type="hidden" name="output" value="output" />'+
										'</form>'+
										'<form class="dialog_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/addOneChufang">'+
											'<input type="button" class="edit_chufang_button" name="add_multi" value="西药及中成药处方" />'+
											'<input type="hidden" name="type" value="西药及中成药"/>'+
											'<input type="hidden" name="kaili_time" value="now"/>'+
											'<input type="hidden" name="zhuyuan_id" value="'+current_zhixing_id+'" />'+
											'<input type="hidden" name="state" value="新添加" />'+
											'<input type="hidden" name="jine_zongji" value="0" />'+
											'<input type="hidden" name="kaili_yishi_name" value="'+user_name+'" />'+
											'<input type="hidden" name="output" value="output" />'+
										'</form>'+
										'<form class="dialog_form" method="post" action="http://'+server_url+'/tiantan_emr/Common/Chufangguanli/addOneChufang">'+
											'<input type="button" class="edit_chufang_button" name="add_multi" value="组合处方" />'+
											'<input type="hidden" name="type" value="组合"/>'+
											'<input type="hidden" name="kaili_time" value="now"/>'+
											'<input type="hidden" name="zhuyuan_id" value="'+current_zhixing_id+'" />'+
											'<input type="hidden" name="state" value="新添加" />'+
											'<input type="hidden" name="jine_zongji" value="0" />'+
											'<input type="hidden" name="kaili_yishi_name" value="'+user_name+'" />'+
											'<input type="hidden" name="output" value="output" />'+
										'</form>',
						lock: true,
						padding:5,
						init: function () {
							$(".dialog_form").submit(function() {
								return false();
							});
							$(".edit_chufang_button").click(function() {
								var post_url = $(this).parent().attr('action');
								var post_param = {};
								post_param['type'] = $(this).parent().find("[name='type']").val();
								post_param['kaili_time'] = $(this).parent().find("[name='kaili_time']").val();
								post_param['zhuyuan_id'] = $(this).parent().find("[name='zhuyuan_id']").val();
								post_param['state'] = $(this).parent().find("[name='state']").val();
								post_param['jine_zongji'] = $(this).parent().find("[name='jine_zongji']").val();
								post_param['kaili_yishi_name'] = $(this).parent().find("[name='kaili_yishi_name']").val();
								post_param['output'] = $(this).parent().find("[name='output']").val();
								$.post(post_url, post_param, function(dom) {
										art.dialog.list['chufang_dialog'].close();
										if(post_param['type']=="中草药")
										{
											$("#conframe").attr("src","http://"+server_url+"/tiantan_emr/Common/Chufangguanli/showChufangZhongcaoyao/dachufanghao/"+dom.split('|')[1]+"/zhuyuan_id/"+current_zhixing_id+"/chufang_id/"+dom.split('|')[0]);
										}
										else if(post_param['type']=="西药及中成药")
										{
											$("#conframe").attr("src","http://"+server_url+"/tiantan_emr/Common/Chufangguanli/showChufangXiYaoZhongchengYao/dachufanghao/"+dom.split('|')[1]+"/zhuyuan_id/"+current_zhixing_id+"/chufang_id/"+dom.split('|')[0]);
										}
										else if(post_param['type']=="组合")
										{
											$("#conframe").attr("src","http://"+server_url+"/tiantan_emr/Common/Chufangguanli/showChufangZuhe/dachufanghao/"+dom.split('|')[1]+"/zhuyuan_id/"+current_zhixing_id+"/chufang_id/"+dom.split('|')[0]);
										}
										else
										{
											$("#conframe").attr("src","http://"+server_url+"/tiantan_emr/Common/Chufangguanli/showList/type/"+post_param['type']+"/zhuyuan_id/"+current_zhixing_id);
										}
									});
							});
						}
					});
				}
			}
			else
				$("#conframe").attr("src","http://"+server_url+$(this).attr("url"));
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
	$(".menu_link").html("");
	//遍历数组追加子菜单信息
	for(var sub_menu_count=0;sub_menu_count<temp_sub_menu.length;sub_menu_count++)
	{
		//单级目录：
		if(temp_sub_menu[sub_menu_count][3].length<1)
		{
			$(".menu_link").append(
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
			$(".menu_link").append(menu_link_content);
			$.imgTitleButton(temp_sub_menu[sub_menu_count][1]);
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

