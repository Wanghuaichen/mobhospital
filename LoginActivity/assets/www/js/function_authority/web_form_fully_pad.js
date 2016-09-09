//定义全局变量菜单信息
var main_menu_info=new Array();
var current_content_url="";
var current_zhixing_id="";
var current_patient_xingming="";
var current_patient_zhuangtai="";
var current_patient_special_info="";
var current_patient_id="";
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
	setyicengCengMenuMarginTop();
	//添加基本控制按钮的功能：
	$("#log_out").click(function(){
		window.location.href="http://"+server_url+"/tiantan_emr/Common/System/logout";
	});

	//为一层菜单添加click事件响应
	$(".left_icon_yiceng").click(function(){
		$(".full_screan_menu_right").css("display","block");
		$(".right_icon_erceng").css("display","none");
		icon_click($(this).attr("id"));
	});
	//因为二层菜单比较多，所以这里用了个获取子类的方法来做
	$(".right_icon_erceng").children().click(function(){
		icon_click($(this).attr("id"));
	});

	//判断用户类型，加载不同的控制系统：
	if(user_type=="医生")
		loadYishengConfig();
	else if(user_type=="门诊医生")
		loadMenzhenyishengConfig();
	else if(user_type=="护士")
		loadHushiConfig();
	else
	    loadYishengConfig();

	function setErCengMenuMarginTop(menu_class){
		var right_menu_height = $(menu_class).height();
	    var screan_height = $(document).height();
	    var right_menu_new_height = (screan_height - right_menu_height)/2;
		// alert(screan_height+" "+right_menu_height+""+right_menu_new_height);
		$(menu_class).css("margin-top",right_menu_new_height+"px");
	}
	function setyicengCengMenuMarginTop(){
		var left_menu_height = $(".full_screan_menu_left").height();
	    var screan_height = $(document).height();
	    var left_menu_new_height = (screan_height - left_menu_height)/2;
		// alert(screan_height+" "+right_menu_height+""+right_menu_new_height);
		$(".full_screan_menu_left").css("margin-top",left_menu_new_height+"px");
	}

	//点击左侧一层按钮时，应该将右侧二层按钮变为不可见
	function icon_click(click_id){
		if ($('#outer_container').hasClass('inactive')==false && $('#outer_container').hasClass('active')==true)
			$('.menu_button').trigger("click");
		var xingming_url = "";
		if(current_patient_xingming!="")
		{
			xingming_url = "/xingming/"+current_patient_xingming;
		}
		switch (click_id)
		{
			case "menu_left_bingli":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Bingli/bingchengJiluShowList/zhuyuan_id/"+current_zhixing_id);
				$(".bingli_sub").css("display","block");
				setErCengMenuMarginTop(".bingli_sub");
			}
			break;
			case "menu_left_changqi_yizhu":{
				$("#conframe").attr("src","/tiantan_emr/Common/Yizhuguanli/showChangqi/zhuyuan_id/"+current_zhixing_id);
				$(".changqi_yizhu_sub").css("display","block");
				setErCengMenuMarginTop(".changqi_yizhu_sub");
			}
			break;
			case "menu_left_linshi_yizhu":{
				$("#conframe").attr("src","/tiantan_emr/Common/Yizhuguanli/showLinshi/zhuyuan_id/"+current_zhixing_id);
				$(".linshi_yizhu_sub").css("display","block");
				setErCengMenuMarginTop(".linshi_yizhu_sub");
			}
			break;
			case "menu_left_jiancha":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Jiancha/showList/zhuyuan_id/"+current_zhixing_id);
				$(".jiancha_sub").css("display","block");
				setErCengMenuMarginTop(".jiancha_sub");
			}
			break;
			case "menu_left_huanzhe_liebiao":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Patient/showPatientListPad/suoyoubingren/suoyou");
			}
			break;
			case "menu_left_chafang_gailan":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Patient/showPatientZongheChafang/zhuyuan_id/"+current_zhixing_id);
			}
			break;
			//下面的是点击二级菜单是得响应
			case "bingli_bingshi_jilu":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Bingli/editBingshiJilu/zhuyuan_id/"+current_zhixing_id);
			}
			break;
			case "bingli_ruyuan_tige_jiancha":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanTigejiancha/zhuyuan_id/"+current_zhixing_id);
			}
			break;
			case "bingli_ruyuan_zhuanke_jiancha":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanZhuankejiancha/zhuyuan_id/"+current_zhixing_id);
			}
			break;
			case "bingli_ruyuan_fuzhu_jiancha":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanFuzhujiancha/zhuyuan_id/"+current_zhixing_id);
			}
			break;
			case "bingli_ruyuan_zhognyi_jiancha":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanZhongyijiancha/zhuyuan_id/"+current_zhixing_id);
			}
			break;
			case "bingli_bingan_shouye":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/BinganShouye/showView/zhuyuan_id/"+current_zhixing_id);
			}
			break;
			case "bingli_ruyuan_jilu":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/RuyuanJilu/showView/zhuyuan_id/"+current_zhixing_id);
			}
			break;
			case "bingli_bingcheng_jilu_small":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/BingchengJilu/showView/zhuyuan_id/"+current_zhixing_id);
			}
			break;

			case "changqi_yizhu_koufu":{
				$("#conframe").attr("src","/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/口服"+xingming_url);
			}
			break;
			case "changqi_yizhu_shuye":{
				$("#conframe").attr("src","/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/输液"+xingming_url);
			}
			break;
			case "changqi_yizhu_zhongcaoyao":{
				$("#conframe").attr("src","/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/中草药"+xingming_url);
			}
			break;
			case "changqi_yizhu_qita":{
				$("#conframe").attr("src","/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/others"+xingming_url);
			}
			break;
			
			case "linshi_yizhu_koufu":{
				$("#conframe").attr("src","/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/yongfa|口服"+xingming_url+chuanghao);
			}
			break;
			case "linshi_yizhu_shuye":{
				$("#conframe").attr("src","/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/输液"+xingming_url+chuanghao);
			}
			break;
			case "linshi_yizhu_zhongcaoyao":{
				$("#conframe").attr("src","/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/中草药"+xingming_url+chuanghao);
			}
			break;
			case "linshi_yizhu_qita":{
				$("#conframe").attr("src","/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/others"+xingming_url+chuanghao);
			}
			break;
			case "jiancha_jianyan":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Jiancha/showList/zhuyuan_id/"+current_zhixing_id+"/jiancha_keshi_name/检验");
			}
			break;
			case "jiancha_chaosheng":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Jiancha/showList/zhuyuan_id/"+current_zhixing_id+"/jiancha_keshi_name/超声");
			}
			break;
			case "jiancha_yingxiang":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Jiancha/showList/zhuyuan_id/"+current_zhixing_id+"/jiancha_keshi_name/CT");
			}
			break;
			case "jiancha_qita":{
				$("#conframe").attr("src","/tiantan_emr/ZhuyuanYishi/Jiancha/showList/zhuyuan_id/"+current_zhixing_id+"/jiancha_keshi_name/其他");
			}
			break;
			default:alert("wrong "+click_id);
		}
	}
	
	

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
	
	
	var temp_zhuyuan_id = '';
	$(".left_menu_div").live("click",function(){
		parent.patientInfo($(this).attr("zhuyuanid"));
		current_zhixing_id = $(this).attr("zhuyuanid");
		$(".left_menu_div").css("background-color","#fff");
		$(".left_menu_div").css("color","#000000");
		$(".left_menu_div").attr("yanse","");
		var huanzhe_name = "当前患者：";
		huanzhe_name += $(this).find("div:first").html();
		var huanzhe_a = "<a href=\"/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetailPad/zhuyuan_id/"+current_zhixing_id+"/xingming/"+$(this).find("div:first").html()+"/zhuangtai/"+current_patient_zhuangtai+"\" target=\"conframe\" style=\"text-decoration:none;color:#000;\">"+huanzhe_name+"</a>";
		$(".left_menu_title").html(huanzhe_a);
		$(".left_menu_title").css("color","white");
		$(".left_menu_title").css("font-weight","bold");
		
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
		if (current_url.indexOf("Patient/showPatientZhuyuanDetailPad/") != -1)
		{
			current_zhixing_id = current_url.substring(current_url.indexOf("/zhuyuan_id") + 12);
		}
		
		if (current_url.indexOf("zhuyuan_id") != -1 && this.current_zhixing_id == "000")
		{
			current_zhixing_id = current_url.substring(current_url.indexOf("/zhuyuan_id") + 12);
		}
	}

	//如果因为住院ID发生变化
	if((current_content_url.indexOf("###")==-1 && current_content_url.indexOf("showPatientZhuyuanDetailPad")!=-1)|| (current_content_url.indexOf("###")==-1 && current_content_url.indexOf("showPatientZongheChafang")!=-1) || (current_content_url.indexOf("###")==-1 && current_content_url.indexOf("editPatientBasicInfo")!=-1) || (current_content_url.indexOf("editChuyuanInfo")!=-1 && last_content_url.indexOf("updateChuyuanInfo")!=-1))
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
		if(user_type=="医生")
			updateSubMenuByZhuyuanIDforYishi();
		else if(user_type=="护士")
			updateSubMenuByZhuyuanIDforHushi();
		else if(user_type=="门诊医生")
			updateSubMenuByMenzhenIDforYishi();
	}

	//如果查看门诊就诊历史
	if(current_content_url.indexOf("MenzhenYishi/Patient/showPatientMenzhenHistory")!=-1)
	{
		//患者身份证号
		if(current_content_url.indexOf("patient_id/")!=-1)
		{
			if(current_content_url.indexOf("/",current_content_url.indexOf("patient_id/")+11)!=-1)
				current_patient_id = current_content_url.substring(current_content_url.indexOf("patient_id/")+11,current_content_url.indexOf("/",current_content_url.indexOf("patient_id/")+11));
			else
				current_patient_id = current_content_url.substring(current_content_url.indexOf("patient_id/")+11);
		}
		if(user_type=="门诊医生")
			updateSubMenuByMenzhenIDforYishi();

	}

	if(current_content_url.indexOf("MenzhenYishi/Patient/showHuanzheJibenXinxi")!=-1)
	{
		current_zhixing_id = current_content_url.substring(current_content_url.indexOf("zhixing_id/")+11);
		// var huanzhe_a = "<a href=\"/tiantan_emr/Muban/DianxingBingli/showEditDianxingBingli/muban_id/"+current_zhixing_id+"/muban_mingcheng/"+current_muban_mingcheng+"/special_info/"+current_muban_special_info+"\" target=\"conframe\" style=\"text-decoration:none;color:#000;\">当前患者："+current_muban_mingcheng+"</a>";
		// $(".left_menu_title").html(123);
		// $(".left_menu_title").css("color","black");
		updateSubMenuByMenzhenIDforYishi();
	}
	
	//如果查看门诊就诊历史
	if(current_content_url.indexOf("MenzhenYishi/Patient/showPatientMenzhenHistory")!=-1)
	{
		//患者身份证号
		if(current_content_url.indexOf("patient_id/")!=-1)
		{
			if(current_content_url.indexOf("/",current_content_url.indexOf("patient_id/")+11)!=-1)
				current_patient_id = current_content_url.substring(current_content_url.indexOf("patient_id/")+11,current_content_url.indexOf("/",current_content_url.indexOf("patient_id/")+11));
			else
				current_patient_id = current_content_url.substring(current_content_url.indexOf("patient_id/")+11);
		}
		if(user_type=="门诊医生")
			updateSubMenuByMenzhenIDforYishi();

	}

	if((current_content_url.indexOf("###")==-1 && current_content_url.indexOf("showUserLoginInfo")!=-1)||(current_content_url.indexOf("###")==-1 && current_content_url.indexOf("showPatientMenzhenHistory")!=-1))
	{
		// if(user_type=="门诊医生")
		// 	updateSubMenuByMenzhenIDforYishi();
	}
	if((current_content_url.indexOf("###")==-1 && current_content_url.indexOf("showUserLoginInfo")!=-1))
	{
		if(user_type=="门诊患者")
			updateSubMenuByMenzhenIDforHuanzhe();
	}
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
				chuanghao = "/chuanghao/"+temp_data[0];
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
		var huanzhe_a = "<a href=\"/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetailPad/zhuyuan_id/"+current_zhixing_id+"/xingming/"+current_patient_xingming+"/zhuangtai/"+current_patient_zhuangtai+"\" target=\"conframe\" style=\"text-decoration:none;color:#000;\">当前患者："+current_patient_xingming+"</a>";
		$(".left_menu_title").html(huanzhe_a);
		$(".left_menu_title").css("color","white");
		$(".left_menu_title").css("font-weight","bold");
		var temp_sub_menu_bingli = new Array();
		var temp_sub_menu_linchuang = new Array();
		var temp_sub_menu_huli = new Array();
		continue_number_bingli = 0;
		continue_number_linchuang = 0;
		continue_number_huli = 0;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "住院信息总览";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "zhuyuan_xinxi_zonglan";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetailPad/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "综合查房视图";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "zonghe_chafang_shitu";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZongheChafang/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "查房引导";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "chafang_yindao";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Patient/chafangYindao/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "诊断";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "zhenduan";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showRuyuanZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][0] = "门诊诊断";
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][1] = "menzhen_zhenduan";
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showMenzhenZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][1] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][0] = "入院诊断";
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][1] = "ruyuan_zhenduan";
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showRuyuanZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][2] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][2][0] = "出院诊断";
					temp_sub_menu_linchuang[continue_number_linchuang][3][2][1] = "chuyuan_zhenduan";
					temp_sub_menu_linchuang[continue_number_linchuang][3][2][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showChuyuanZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][3] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][3][0] = "其它诊断";
					temp_sub_menu_linchuang[continue_number_linchuang][3][3][1] = "qita_zhenduan";
					temp_sub_menu_linchuang[continue_number_linchuang][3][3][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showQitaZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				if(current_patient_zhuangtai=="死亡")
				{
					temp_sub_menu_linchuang[continue_number_linchuang][3][4] = new Array();
						temp_sub_menu_linchuang[continue_number_linchuang][3][4][0] = "死亡诊断";
						temp_sub_menu_linchuang[continue_number_linchuang][3][4][1] = "siwang_zhenduan";
						temp_sub_menu_linchuang[continue_number_linchuang][3][4][2] = "/tiantan_emr/ZhuyuanYishi/Zhenduan/showSiwangZhenduan/zhixing_type/住院/zhixing_id/"+current_zhixing_id;
				}
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "病历文书";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "bingcheng_jilu";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/bingchengJiluShowList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][0] = "病史记录";
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][1] = "bingshi_jilu";
					temp_sub_menu_linchuang[continue_number_linchuang][3][0][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/editBingshiJilu/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][1] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][0] = "入院体格检查";
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][1] = "ruyuan_tige_jiancha";
					temp_sub_menu_linchuang[continue_number_linchuang][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanTigejiancha/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][2] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][2][0] = "入院专科检查";
					temp_sub_menu_linchuang[continue_number_linchuang][3][2][1] = "ruyuan_zhuanke_jiancha";
					temp_sub_menu_linchuang[continue_number_linchuang][3][2][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanZhuankejiancha/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][3] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][3][0] = "入院辅助检查";
					temp_sub_menu_linchuang[continue_number_linchuang][3][3][1] = "ruyuan_fuzhu_jiancha";
					temp_sub_menu_linchuang[continue_number_linchuang][3][3][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanFuzhujiancha/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][4] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][4][0] = "入院中医检查";
					temp_sub_menu_linchuang[continue_number_linchuang][3][4][1] = "ruyuan_zhognyi_jiancha";
					temp_sub_menu_linchuang[continue_number_linchuang][3][4][2] = "/tiantan_emr/ZhuyuanYishi/Bingli/editRuyuanZhongyijiancha/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][5] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][5][0] = "病案首页";
					temp_sub_menu_linchuang[continue_number_linchuang][3][5][1] = "bingan_shouye";
					temp_sub_menu_linchuang[continue_number_linchuang][3][5][2] = "/tiantan_emr/ZhuyuanYishi/BinganShouye/showView/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][6] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][6][0] = "入院记录";
					temp_sub_menu_linchuang[continue_number_linchuang][3][6][1] = "ruyuan_jilu";
					temp_sub_menu_linchuang[continue_number_linchuang][3][6][2] = "/tiantan_emr/ZhuyuanYishi/RuyuanJilu/showView/zhuyuan_id/"+current_zhixing_id;
				temp_sub_menu_linchuang[continue_number_linchuang][3][7] = new Array();
					temp_sub_menu_linchuang[continue_number_linchuang][3][7][0] = "病程记录";
					temp_sub_menu_linchuang[continue_number_linchuang][3][7][1] = "bingcheng_jilu_small";
					temp_sub_menu_linchuang[continue_number_linchuang][3][7][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showView/zhuyuan_id/"+current_zhixing_id;
		continue_number_linchuang ++;

		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "医嘱管理";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "yizhu_guanli";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/Yizhuguanli/showChangqi/state/开始执行/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][0] = "口服医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][1] = "changqi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/口服"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][1] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][0] = "输液医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][1] = "linshi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/输液"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][2] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][0] = "中草药医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][1] = "changqi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/中草药"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][0] = "其他医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][1] = "linshi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/others"+xingming_url+chuanghao;
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "辅助检查";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "fuzhu_jiancha";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;

		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "三测单";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "sancedan";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/TiwenJiludan/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;

		refreshSubMultiMenu(temp_sub_menu_bingli,temp_sub_menu_linchuang,temp_sub_menu_huli);
}

function updateSubMenuByMenzhenIDforYishi()
{
	// temp_sub_menu[5] = new Array();
	// 	temp_sub_menu[5][0] = "5. 处方管理";
	// 	temp_sub_menu[5][1] = "chufang_guanli";
	// 	temp_sub_menu[5][2] = "/tiantan_emr/Common/Chufangguanli/showList/menzhen_id/"+current_zhixing_id;
	// 	temp_sub_menu[5][3] = new Array();
		var temp_sub_menu = new Array();
		
		temp_sub_menu[0] = new Array();
		temp_sub_menu[0][0] = "患者基本信息";
		temp_sub_menu[0][1] = "huanzhe_liebiao";
		temp_sub_menu[0][2] = "/tiantan_emr/MenzhenYishi/Patient/showHuanzheJibenXinxi/zhixing_id/"+current_zhixing_id;
		temp_sub_menu[0][3] = new Array();

		temp_sub_menu[1] = new Array();
		temp_sub_menu[1][0] = "门诊诊断";
		temp_sub_menu[1][1] = "zhenduan";
		temp_sub_menu[1][2] = "/tiantan_emr/MenzhenYishi/Zhenduan/showMenzhenZhenduan/zhixing_type/门诊/zhixing_id/"+current_zhixing_id;
		temp_sub_menu[1][3] = new Array();

		temp_sub_menu[2] = new Array();
		temp_sub_menu[2][0] = "门诊病历";
		temp_sub_menu[2][1] = "bingli_guanli";
		temp_sub_menu[2][2] = "/tiantan_emr/MenzhenYishi/Bingli/biaozhunBingli/menzhen_id/"+current_zhixing_id;
		temp_sub_menu[2][3] = new Array();

		

		temp_sub_menu[3] = new Array();
		temp_sub_menu[3][0] = "检验检查";
		temp_sub_menu[3][1] = "fuzhu_jiancha";
		temp_sub_menu[3][2] = "/tiantan_emr/MenzhenYishi/Jiancha/showZongjie/menzhen_id/"+current_zhixing_id;
		temp_sub_menu[3][3] = new Array();
		temp_sub_menu[3][3][0] = new Array();
			temp_sub_menu[3][3][0][0] = "添加检查";
			temp_sub_menu[3][3][0][1] = "tianjia_jiancha";
			temp_sub_menu[3][3][0][2] = "/tiantan_emr/MenzhenYishi/Jiancha/showAddJiancha/menzhen_id/"+current_zhixing_id;
		temp_sub_menu[3][3][1] = new Array();
			temp_sub_menu[3][3][1][0] = "查看检查";
			temp_sub_menu[3][3][1][1] = "chakan_jiancha";
			temp_sub_menu[3][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showList/zhuyuan_id/080528-4";

		temp_sub_menu[4] = new Array();
		temp_sub_menu[4][0] = "医嘱管理";
		temp_sub_menu[4][1] = "yuanzhen_guanli";
		temp_sub_menu[4][2] = "/tiantan_emr/MenzhenYishi/Yizhuguanli/showChangqi/zhixing_id/"+current_zhixing_id;
		temp_sub_menu[4][3] = new Array();

		temp_sub_menu[5] = new Array();
		temp_sub_menu[5][0] = "体温单";
		temp_sub_menu[5][1] = "chufang_guanli";
		temp_sub_menu[5][2] = "/tiantan_emr/MenzhenYishi/TiwenJiludan/showList/zhixing_id/"+current_zhixing_id;
		temp_sub_menu[5][3] = new Array();

		temp_sub_menu[6] = new Array();
		temp_sub_menu[6][0] = "护理记录";
		temp_sub_menu[6][1] = "zonghe_chafang_shitu";
		temp_sub_menu[6][2] = "/tiantan_emr/MenzhenYishi/HuliJilu/showJilu/zhuyuan_id/"+current_zhixing_id;
		temp_sub_menu[6][3] = new Array();

		temp_sub_menu[7] = new Array();
		temp_sub_menu[7][0] = "健康分析";
		temp_sub_menu[7][1] = "zhuyuan_xinxi_zonglan";
		temp_sub_menu[7][2] = "/tiantan_emr/Common/DataAnalysis/showLineChartPlot/patient_id/"+current_patient_id;
		temp_sub_menu[7][3] = new Array();

				
		// temp_sub_menu[8] = new Array();
		// 	temp_sub_menu[8][0] = "病史信息";
		// 	temp_sub_menu[8][1] = "huanzhe_xinxi";
		// 	temp_sub_menu[8][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiBasicInfo/patient_id/"+current_patient_id;
		// 	temp_sub_menu[8][3] = new Array();
		// 		temp_sub_menu[8][3][0] = new Array();
		// 			temp_sub_menu[8][3][0][0] = "一般病史信息";
		// 			temp_sub_menu[8][3][0][1] = "jiben_xinxi";
		// 			temp_sub_menu[8][3][0][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiBasicInfo/patient_id/"+current_patient_id;
		// 		temp_sub_menu[8][3][1] = new Array();
		// 			temp_sub_menu[8][3][1][0] = "药物过敏史";
		// 			temp_sub_menu[8][3][1][1] = "lianxi_fangshi";
		// 			temp_sub_menu[8][3][1][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiYaowuInfo/patient_id/"+current_patient_id;
		// 		temp_sub_menu[8][3][2] = new Array();
		// 			temp_sub_menu[8][3][2][0] = "免疫预防接种史";
		// 			temp_sub_menu[8][3][2][1] = "qita_zhuyuan_xinxi";
		// 			temp_sub_menu[8][3][2][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiMianyiInfo/patient_id/"+current_patient_id;
		// 		temp_sub_menu[8][3][3] = new Array();
		// 			temp_sub_menu[8][3][3][0] = "其它病史";
		// 			temp_sub_menu[8][3][3][1] = "zenren_yishi";
		// 			temp_sub_menu[8][3][3][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiOtherInfo/patient_id/"+current_patient_id;
		
		// temp_sub_menu[9] = new Array();
		// 	temp_sub_menu[9][0] = "诊疗记录";
		// 	temp_sub_menu[9][1] = "ruyuan_jilu";
		// 	temp_sub_menu[9][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showBingliHistory/patient_id/"+current_patient_id;
		// 	temp_sub_menu[9][3] = new Array();
		// 		temp_sub_menu[9][3][0] = new Array();
		// 			temp_sub_menu[9][3][0][0] = "诊断历史";
		// 			temp_sub_menu[9][3][0][1] = "zhenduan_history";
		// 			temp_sub_menu[9][3][0][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showZhenduanHistory/patient_id/"+current_patient_id;
		// 		temp_sub_menu[9][3][1] = new Array();
		// 			temp_sub_menu[9][3][1][0] = "病历记录";
		// 			temp_sub_menu[9][3][1][1] = "bingli_history";
		// 			temp_sub_menu[9][3][1][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showBingliHistory/patient_id/"+current_patient_id;
		// 		temp_sub_menu[9][3][2] = new Array();
		// 			temp_sub_menu[9][3][2][0] = "用药历史";
		// 			temp_sub_menu[9][3][2][1] = "yongyao_history";
		// 			temp_sub_menu[9][3][2][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showYongyaoHistory/patient_id/"+current_patient_id;
		// 		temp_sub_menu[9][3][3] = new Array();
		// 			temp_sub_menu[9][3][3][0] = "体征分析";
		// 			temp_sub_menu[9][3][3][1] = "tizheng_history";
		// 			temp_sub_menu[9][3][3][2] = "/tiantan_emr/Common/DataAnalysis/showLineChartPlot/patient_id/"+current_patient_id;
		// 		temp_sub_menu[9][3][4] = new Array();
		// 			temp_sub_menu[9][3][4][0] = "检查历史";
		// 			temp_sub_menu[9][3][4][1] = "jiancha_history";
		// 			temp_sub_menu[9][3][4][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showJianchaHistory/patient_id/"+current_patient_id;
		
		// temp_sub_menu[10] = new Array();
		// temp_sub_menu[10][0] = "就诊患者";
		// temp_sub_menu[10][1] = "huanzhe_liebia";
		// temp_sub_menu[10][2] = "/tiantan_emr/MenzhenYishi/Patient/showPatientList/menzhenyishi_id/"+user_number;
		// temp_sub_menu[10][3] = new Array();

		// temp_sub_menu[11] = new Array();
		// temp_sub_menu[11][0] = "1. 急诊预诊";
		// temp_sub_menu[11][1] = "";
		// temp_sub_menu[11][2] = "/tiantan_emr/MenzhenYishi/Bingli/showZhongyiLiangbiaoList/menzhen_id/"+current_zhixing_id;
		// temp_sub_menu[11][3] = new Array();

		// temp_sub_menu[12] = new Array();
		// temp_sub_menu[12][0] = "综合监测";
		// temp_sub_menu[12][1] = "zong";
		// temp_sub_menu[12][2] = "/tiantan_emr/MenzhenYishi/Patient/showPatientListPad/menzhenyishi_id/"+user_number;
		// temp_sub_menu[12][3] = new Array();
		// 		temp_sub_menu[12][3][0] = new Array();
		// 			temp_sub_menu[12][3][0][0] = "动态监测";
		// 			temp_sub_menu[12][3][0][1] = "dongtai_jiance";
		// 			temp_sub_menu[12][3][0][2] = "/tiantan_emr_v5/index.html";
		// 		temp_sub_menu[12][3][1] = new Array();
		// 			temp_sub_menu[12][3][1][0] = "主动预警";
		// 			temp_sub_menu[12][3][1][1] = "zhudongyujing";
		// 			temp_sub_menu[12][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZongheChafang/zhuyuan_id/080528-4";
		// 		temp_sub_menu[12][3][2] = new Array();
		// 			temp_sub_menu[12][3][2][0] = "数据分析";
		// 			temp_sub_menu[12][3][2][1] = "shuju_fenxi";
		// 			temp_sub_menu[12][3][2][2] = "/tiantan_emr/Common/DataAnalysis/showLineChartPlot/patient_id/"+current_patient_id;

		// temp_sub_menu[14] = new Array();
		// 	temp_sub_menu[14][0] = "健康概况";
		// 	temp_sub_menu[14][1] = "zhuyuan_xinxn";
		// 	temp_sub_menu[14][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatient360Shitu/patient_id/"+current_patient_id+"###";
		// 	temp_sub_menu[14][3] = new Array();
		// 		temp_sub_menu[14][3][0] = new Array();
		// 			temp_sub_menu[14][3][0][0] = "基本信息";
		// 			temp_sub_menu[14][3][0][1] = "jiben_xinxi";
		// 			temp_sub_menu[14][3][0][2] = "/tiantan_emr/JiankangDangan/Dangan/editDanganBasicInfo/patient_id/"+current_patient_id;
		// 		temp_sub_menu[14][3][1] = new Array();
		// 			temp_sub_menu[14][3][1][0] = "联系方式";
		// 			temp_sub_menu[14][3][1][1] = "lianxi_fangshi";
		// 			temp_sub_menu[14][3][1][2] = "/tiantan_emr/JiankangDangan/Dangan/editDanganContactInfo/patient_id/"+current_patient_id;
		// 		temp_sub_menu[14][3][2] = new Array();
		// 			temp_sub_menu[14][3][2][0] = "其它健康信息";
		// 			temp_sub_menu[14][3][2][1] = "qita_zhuyuan_xinxi";
		// 			temp_sub_menu[14][3][2][2] = "/tiantan_emr/JiankangDangan/Dangan/editDanganOtherInfo/patient_id/"+current_patient_id;

		refreshSubMenu(temp_sub_menu);
}

function updateSubMenuByMenzhenIDforYishi_zonghejiance()
{
	temp_sub_menu[0] = new Array();
	temp_sub_menu[0][0] = "动态监测";
	temp_sub_menu[0][1] = "dongtai_jiance";
	temp_sub_menu[0][2] = "/tiantan_emr/MenzhenYishi/Patient/showPatientList/menzhenyishi_id/"+user_number;
	temp_sub_menu[0][3] = new Array();

	temp_sub_menu[0] = new Array();
	temp_sub_menu[0][0] = "主动预警";
	temp_sub_menu[0][1] = "zhudongyujing";
	temp_sub_menu[0][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZongheChafang/zhuyuan_id/080528-4";
	temp_sub_menu[0][3] = new Array();

	temp_sub_menu[0] = new Array();
	temp_sub_menu[0][0] = "数据分析";
	temp_sub_menu[0][1] = "shuju_fenxi";
	temp_sub_menu[0][2] = "/tiantan_emr/Common/DataAnalysis/showLineChartPlot/patient_id/"+current_patient_id;
	temp_sub_menu[0][3] = new Array();

	// temp_sub_menu[12][3][0] = new Array();
	// 				temp_sub_menu[12][3][0][0] = "动态监测";
	// 				temp_sub_menu[12][3][0][1] = "dongtai_jiance";
	// 				temp_sub_menu[12][3][0][2] = "/tiantan_emr_v5/index.html";
	// 			temp_sub_menu[12][3][1] = new Array();
	// 				temp_sub_menu[12][3][1][0] = "主动预警";
	// 				temp_sub_menu[12][3][1][1] = "zhudongyujing";
	// 				temp_sub_menu[12][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZongheChafang/zhuyuan_id/080528-4";
	// 			temp_sub_menu[12][3][2] = new Array();
	// 				temp_sub_menu[12][3][2][0] = "数据分析";
	// 				temp_sub_menu[12][3][2][1] = "shuju_fenxi";
	// 				temp_sub_menu[12][3][2][2] = "/tiantan_emr/Common/DataAnalysis/showLineChartPlot/patient_id/"+current_patient_id;
		// temp_sub_menu[8] = new Array();
		// temp_sub_menu[8][0] = "病史信息";
		// temp_sub_menu[8][1] = "huanzhe_xinxi";
		// temp_sub_menu[8][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiBasicInfo/patient_id/"+current_patient_id;
		// temp_sub_menu[8][3] = new Array();
		// 	temp_sub_menu[8][3][0] = new Array();
		// 	temp_sub_menu[8][3][0][0] = "一般病史信息";
		// 	temp_sub_menu[8][3][0][1] = "jiben_xinxi";
		// 	temp_sub_menu[8][3][0][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiBasicInfo/patient_id/"+current_patient_id;
		// 	temp_sub_menu[8][3][1] = new Array();
		// 	temp_sub_menu[8][3][1][0] = "药物过敏史";
		// 	temp_sub_menu[8][3][1][1] = "lianxi_fangshi";
		// 	temp_sub_menu[8][3][1][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiYaowuInfo/patient_id/"+current_patient_id;
		// 	temp_sub_menu[8][3][2] = new Array();
		// 	temp_sub_menu[8][3][2][0] = "免疫预防接种史";
		// 	temp_sub_menu[8][3][2][1] = "qita_zhuyuan_xinxi";
		// 	temp_sub_menu[8][3][2][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiMianyiInfo/patient_id/"+current_patient_id;
		// 	temp_sub_menu[8][3][3] = new Array();
		// 	temp_sub_menu[8][3][3][0] = "其它病史";
		// 	temp_sub_menu[8][3][3][1] = "zenren_yishi";
		// 	temp_sub_menu[8][3][3][2] = "/tiantan_emr/JiankangDangan/Bingshi/editBingshiOtherInfo/patient_id/"+current_patient_id;
		
		// temp_sub_menu[9] = new Array();
		// 	temp_sub_menu[9][0] = "诊疗记录";
		// 	temp_sub_menu[9][1] = "ruyuan_jilu";
		// 	temp_sub_menu[9][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showBingliHistory/patient_id/"+current_patient_id;
		// 	temp_sub_menu[9][3] = new Array();
		// 		temp_sub_menu[9][3][0] = new Array();
		// 			temp_sub_menu[9][3][0][0] = "诊断历史";
		// 			temp_sub_menu[9][3][0][1] = "zhenduan_history";
		// 			temp_sub_menu[9][3][0][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showZhenduanHistory/patient_id/"+current_patient_id;
		// 		temp_sub_menu[9][3][1] = new Array();
		// 			temp_sub_menu[9][3][1][0] = "病历记录";
		// 			temp_sub_menu[9][3][1][1] = "bingli_history";
		// 			temp_sub_menu[9][3][1][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showBingliHistory/patient_id/"+current_patient_id;
		// 		temp_sub_menu[9][3][2] = new Array();
		// 			temp_sub_menu[9][3][2][0] = "用药历史";
		// 			temp_sub_menu[9][3][2][1] = "yongyao_history";
		// 			temp_sub_menu[9][3][2][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showYongyaoHistory/patient_id/"+current_patient_id;
		// 		temp_sub_menu[9][3][3] = new Array();
		// 			temp_sub_menu[9][3][3][0] = "体征分析";
		// 			temp_sub_menu[9][3][3][1] = "tizheng_history";
		// 			temp_sub_menu[9][3][3][2] = "/tiantan_emr/Common/DataAnalysis/showLineChartPlot/patient_id/"+current_patient_id;
		// 		temp_sub_menu[9][3][4] = new Array();
		// 			temp_sub_menu[9][3][4][0] = "检查历史";
		// 			temp_sub_menu[9][3][4][1] = "jiancha_history";
		// 			temp_sub_menu[9][3][4][2] = "/tiantan_emr/JiankangDangan/JiankangManager/showJianchaHistory/patient_id/"+current_patient_id;
		
		// temp_sub_menu[10] = new Array();
		// temp_sub_menu[10][0] = "就诊患者";
		// temp_sub_menu[10][1] = "huanzhe_liebia";
		// temp_sub_menu[10][2] = "/tiantan_emr/MenzhenYishi/Patient/showPatientList/menzhenyishi_id/"+user_number;
		// temp_sub_menu[10][3] = new Array();

		// temp_sub_menu[11] = new Array();
		// temp_sub_menu[11][0] = "1. 急诊预诊";
		// temp_sub_menu[11][1] = "";
		// temp_sub_menu[11][2] = "/tiantan_emr/MenzhenYishi/Bingli/showZhongyiLiangbiaoList/menzhen_id/"+current_zhixing_id;
		// temp_sub_menu[11][3] = new Array();

		// temp_sub_menu[12] = new Array();
		// temp_sub_menu[12][0] = "综合监测";
		// temp_sub_menu[12][1] = "zong";
		// temp_sub_menu[12][2] = "/tiantan_emr/MenzhenYishi/Patient/showPatientListPad/menzhenyishi_id/"+user_number;
		// temp_sub_menu[12][3] = new Array();
		// 		temp_sub_menu[12][3][0] = new Array();
		// 			temp_sub_menu[12][3][0][0] = "动态监测";
		// 			temp_sub_menu[12][3][0][1] = "dongtai_jiance";
		// 			temp_sub_menu[12][3][0][2] = "/tiantan_emr_v5/index.html";
		// 		temp_sub_menu[12][3][1] = new Array();
		// 			temp_sub_menu[12][3][1][0] = "主动预警";
		// 			temp_sub_menu[12][3][1][1] = "zhudongyujing";
		// 			temp_sub_menu[12][3][1][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZongheChafang/zhuyuan_id/080528-4";
		// 		temp_sub_menu[12][3][2] = new Array();
		// 			temp_sub_menu[12][3][2][0] = "数据分析";
		// 			temp_sub_menu[12][3][2][1] = "shuju_fenxi";
		// 			temp_sub_menu[12][3][2][2] = "/tiantan_emr/Common/DataAnalysis/showLineChartPlot/patient_id/"+current_patient_id;

		// temp_sub_menu[14] = new Array();
		// 	temp_sub_menu[14][0] = "健康概况";
		// 	temp_sub_menu[14][1] = "zhuyuan_xinxn";
		// 	temp_sub_menu[14][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatient360Shitu/patient_id/"+current_patient_id+"###";
		// 	temp_sub_menu[14][3] = new Array();
		// 		temp_sub_menu[14][3][0] = new Array();
		// 			temp_sub_menu[14][3][0][0] = "基本信息";
		// 			temp_sub_menu[14][3][0][1] = "jiben_xinxi";
		// 			temp_sub_menu[14][3][0][2] = "/tiantan_emr/JiankangDangan/Dangan/editDanganBasicInfo/patient_id/"+current_patient_id;
		// 		temp_sub_menu[14][3][1] = new Array();
		// 			temp_sub_menu[14][3][1][0] = "联系方式";
		// 			temp_sub_menu[14][3][1][1] = "lianxi_fangshi";
		// 			temp_sub_menu[14][3][1][2] = "/tiantan_emr/JiankangDangan/Dangan/editDanganContactInfo/patient_id/"+current_patient_id;
		// 		temp_sub_menu[14][3][2] = new Array();
		// 			temp_sub_menu[14][3][2][0] = "其它健康信息";
		// 			temp_sub_menu[14][3][2][1] = "qita_zhuyuan_xinxi";
		// 			temp_sub_menu[14][3][2][2] = "/tiantan_emr/JiankangDangan/Dangan/editDanganOtherInfo/patient_id/"+current_patient_id;

		refreshSubMenu(temp_sub_menu);
}

function updateSubMenuByMenzhenIDforHuanzhe()
{
		var temp_sub_menu = new Array();
		
		temp_sub_menu[0] = new Array();
		temp_sub_menu[0][0] = "预诊管理";
		temp_sub_menu[0][1] = "yuanzhen_guanli";
		temp_sub_menu[0][2] = "/tiantan_emr/MenzhenYishi/Bingli/showZhongyiLiangbiaoList/menzhen_id/"+user_number;
		temp_sub_menu[0][3] = new Array();

		temp_sub_menu[1] = new Array();
		temp_sub_menu[1][0] = "就诊信息";
		temp_sub_menu[1][1] = "zhenduan";
		temp_sub_menu[1][2] = "/tiantan_emr/MenzhenYishi/Patient/showPatientMenzhenHistory/patient_id/"+current_patient_id;
		temp_sub_menu[1][3] = new Array();
		
		temp_sub_menu[2] = new Array();
		temp_sub_menu[2][0] = "处方信息";
		temp_sub_menu[2][1] = "chufang_guanli";
		temp_sub_menu[2][2] = "/tiantan_emr/Common/Chufangguanli/showList/menzhen_id/"+user_number;
		temp_sub_menu[2][3] = new Array();

		temp_sub_menu[3] = new Array();
		temp_sub_menu[3][0] = "检查报告";
		temp_sub_menu[3][1] = "fuzhu_jiancha";
		temp_sub_menu[3][2] = "/tiantan_emr/MenzhenYishi/Jiancha/showList/menzhen_id/"+user_number;
		temp_sub_menu[3][3] = new Array();

		refreshSubMenu(temp_sub_menu);
}

function updateSubMenuByZhuyuanIDforHushi()
{
		var zhiliao_leibie = "西医治疗";
		$.ajaxSetup({
			async: false
		});
		$.get("http://"+server_url+"/tiantan_emr/Common/Data/getChuanghao", {zhuyuan_id: current_zhixing_id}, function(data){
			var temp_data = data.split("|");
			if(temp_data[0]!="")
				chuanghao = "/chuanghao/"+temp_data[0];
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
		var huanzhe_a = "<a href=\"/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetailPad/zhuyuan_id/"+current_zhixing_id+"/xingming/"+current_patient_xingming+"/zhuangtai/"+current_patient_zhuangtai+"\" target=\"conframe\" style=\"text-decoration:none;color:#000;\">当前患者："+current_patient_xingming+"</a>";
		$(".left_menu_title").html(huanzhe_a);
		$(".left_menu_title").css("color","white");
		$(".left_menu_title").css("font-weight","bold");
		var temp_sub_menu_bingli = new Array();
		var temp_sub_menu_linchuang = new Array();
		var temp_sub_menu_huli = new Array();
		continue_number_bingli = 0;
		continue_number_linchuang = 0;
		continue_number_huli = 0;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "住院信息总览";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "zhuyuan_xinxi_zonglan";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetailPad/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "护理质控";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "zhikongxinxi";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Zhikong/HuliPingfen/editPingfen/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "综合查房视图";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "zonghe_chafang_shitu";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZongheChafang/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;

		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "医嘱执行";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "yizhu_guanli";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/Yizhuguanli/showChangqi/state/开始执行/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][0] = "口服医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][1] = "changqi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/口服"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][1] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][0] = "输液医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][1] = "linshi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/输液"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][2] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][0] = "中草药医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][1] = "changqi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/中草药"+xingming_url+chuanghao;
				temp_sub_menu_linchuang[continue_number_linchuang][3][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][0] = "其他医嘱";
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][1] = "linshi_yizhu";
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/binglihao/"+current_zhixing_id+"/geiyao_fangshi/others"+xingming_url+chuanghao;
		continue_number_linchuang++;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "辅助检查";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "fuzhu_jiancha";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;

		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][0] = "三测单";
			temp_sub_menu_linchuang[continue_number_linchuang][1] = "sancedan";
			temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Common/TiwenJiludan/showList/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
		continue_number_linchuang++;

		refreshSubMultiMenu(temp_sub_menu_bingli,temp_sub_menu_linchuang,temp_sub_menu_huli);
}

function updateSubMenuByHuliguanliforHushi()
{
		var zhiliao_leibie = "西医治疗";
		$.ajaxSetup({
			async: false
		});
		$.get("http://"+server_url+"/tiantan_emr/Common/Data/getChuanghao", {zhuyuan_id: current_zhixing_id}, function(data){
			var temp_data = data.split("|");
			if(temp_data[0]!="")
				chuanghao = "/chuanghao/"+temp_data[0];
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
		var huanzhe_a = "<a href=\"/tiantan_emr/ZhuyuanYishi/Patient/showPatientZhuyuanDetailPad/zhuyuan_id/"+current_zhixing_id+"/xingming/"+current_patient_xingming+"/zhuangtai/"+current_patient_zhuangtai+"\" target=\"conframe\" style=\"text-decoration:none;color:#000;\">当前患者："+current_patient_xingming+"</a>";
		$(".left_menu_title").html(huanzhe_a);
		$(".left_menu_title").css("color","white");
		$(".left_menu_title").css("font-weight","bold");
		var temp_sub_menu_bingli = new Array();
		var temp_sub_menu_linchuang = new Array();
		var temp_sub_menu_huli = new Array();
		continue_number_bingli = 0;
		continue_number_linchuang = 0;
		continue_number_huli = 0;
		
		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
		temp_sub_menu_linchuang[continue_number_linchuang][0] = "护理考核";
		temp_sub_menu_linchuang[continue_number_linchuang][1] = "huli_kaohe";
		temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Zhikong/HuliPingfen/editPingfen/pingfen_mode/keshi/pingfen_type/护理单元考核/zhuyuan_id/"+current_zhixing_id;
		temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][0] = "护理单元";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][1] = "keshi_tongji";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][2]  = "/tiantan_emr/Zhikong/HuliPingfen/editPingfen/pingfen_mode/keshi/pingfen_type/护理单元考核/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3][1] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][0] = "护士长工作";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][1] = "geren_tongji";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][2]  = "/tiantan_emr/Zhikong/HuliPingfen/editPingfen/pingfen_mode/geren/pingfen_type/护士长工作考核/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3][2] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][3][2][0] = "护理星级服务";
			temp_sub_menu_linchuang[continue_number_linchuang][3][2][1] = "hulixingji_fuwu";
			temp_sub_menu_linchuang[continue_number_linchuang][3][2][2]  = "/tiantan_emr/Zhikong/HuliPingfen/editPingfen/pingfen_mode/keshi/pingfen_type/护理星级服务考核/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3][3] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][3][3][0] = "手术室护理工作";
			temp_sub_menu_linchuang[continue_number_linchuang][3][3][1] = "shoushushi_linchuang_gongzuo";
			temp_sub_menu_linchuang[continue_number_linchuang][3][3][2]  = "/tiantan_emr/Zhikong/HuliPingfen/editPingfen/pingfen_mode/keshi/pingfen_type/手术室护理工作考核/zhuyuan_id/"+current_zhixing_id;
		continue_number_linchuang++;

		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
		temp_sub_menu_linchuang[continue_number_linchuang][0] = "护理统计";
		temp_sub_menu_linchuang[continue_number_linchuang][1] = "huli_tongji";
		temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/ZhuyuanHushi/HuliTongji/showKeshiTongji";
		temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][0] = "科室工作量";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][1] = "keshi_tongji";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][2]  = "/tiantan_emr/ZhuyuanHushi/HuliTongji/showKeshiTongji";
			temp_sub_menu_linchuang[continue_number_linchuang][3][1] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][0] = "个人工作量";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][1] = "geren_tongji";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][2]  = "/tiantan_emr/ZhuyuanHushi/HuliTongji/showGerenTongji";
			temp_sub_menu_linchuang[continue_number_linchuang][3][2] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][3][2][0] = "工作量详细";
			temp_sub_menu_linchuang[continue_number_linchuang][3][2][1] = "tongji_detail";
			temp_sub_menu_linchuang[continue_number_linchuang][3][2][2]  = "/tiantan_emr/ZhuyuanHushi/HuliTongji/showTongjiDetail";
		continue_number_linchuang++;

		temp_sub_menu_linchuang[continue_number_linchuang] = new Array();
		temp_sub_menu_linchuang[continue_number_linchuang][0] = "护理评优";
		temp_sub_menu_linchuang[continue_number_linchuang][1] = "huli_pingyou";
		temp_sub_menu_linchuang[continue_number_linchuang][2] = "/tiantan_emr/Zhikong/HuliPingfen/editPingfenPingyou/pingfen_mode/keshi/pingfen_type/科室总评分/zhuyuan_id/"+current_zhixing_id;
		temp_sub_menu_linchuang[continue_number_linchuang][3] = new Array();
			temp_sub_menu_linchuang[continue_number_linchuang][3][0] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][0] = "病区管理";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][1] = "jichu_huli";
				temp_sub_menu_linchuang[continue_number_linchuang][3][0][2]  = "/tiantan_emr/Zhikong/HuliPingfen/editPingfenPingyou/pingfen_mode/keshi/pingfen_type/病区管理质量评分/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3][1] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][0] = "护士长工作";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][1] = "jichu_huli";
				temp_sub_menu_linchuang[continue_number_linchuang][3][1][2]  = "/tiantan_emr/Zhikong/HuliPingfen/editPingfenPingyou/pingfen_mode/geren/pingfen_type/护士长工作管理质量评分/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3][2] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][0] = "基础护理质量";
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][1] = "jichu_huli";
				temp_sub_menu_linchuang[continue_number_linchuang][3][2][2]  = "/tiantan_emr/Zhikong/HuliPingfen/editPingfenPingyou/pingfen_mode/keshi/pingfen_type/基础护理质量评分/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3][3] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][0] = "物品管理质量";
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][1] = "jichu_huli";
				temp_sub_menu_linchuang[continue_number_linchuang][3][3][2]  = "/tiantan_emr/Zhikong/HuliPingfen/editPingfenPingyou/pingfen_mode/keshi/pingfen_type/物品管理质量评分/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3][4] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][4][0] = "消毒隔离质量";
				temp_sub_menu_linchuang[continue_number_linchuang][3][4][1] = "jichu_huli";
				temp_sub_menu_linchuang[continue_number_linchuang][3][4][2]  = "/tiantan_emr/Zhikong/HuliPingfen/editPingfenPingyou/pingfen_mode/keshi/pingfen_type/消毒隔离质量评分/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3][5] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][5][0] = "科室总评分";
				temp_sub_menu_linchuang[continue_number_linchuang][3][5][1] = "keshi_tongji";
				temp_sub_menu_linchuang[continue_number_linchuang][3][5][2]  = "/tiantan_emr/Zhikong/HuliPingfen/editPingfenPingyou/pingfen_mode/keshi/pingfen_type/科室总评分/zhuyuan_id/"+current_zhixing_id;
			temp_sub_menu_linchuang[continue_number_linchuang][3][6] = new Array();
				temp_sub_menu_linchuang[continue_number_linchuang][3][6][0] = "个人总评分";
				temp_sub_menu_linchuang[continue_number_linchuang][3][6][1] = "geren_tongji";
				temp_sub_menu_linchuang[continue_number_linchuang][3][6][2]  = "/tiantan_emr/Zhikong/HuliPingfen/editPingfenPingyou/pingfen_mode/geren/pingfen_type/个人总评分/zhuyuan_id/"+current_zhixing_id;
		continue_number_linchuang++;

		refreshSubMultiMenu(temp_sub_menu_bingli,temp_sub_menu_linchuang,temp_sub_menu_huli);
}

//增加事件
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
	if(user_type!="门诊医生" && user_type!="门诊患者")
	{
		$(".menu_link").find("a:first").attr("state","opened");
		$(".menu_link").find("a:first").css("color","black");
	}
}

function loadYishengConfig()
{
	var main_menu_number = 8;
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
	if(user_department_position=="科主任"||user_department_position=="主任医师"||user_department_position=="副主任医师")
	{
		main_menu_info[0][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientListPad/suoyoubingren/suoyou";
	}
	else
	{
		main_menu_info[0][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientListPad/guidang_zhuangtai/未归档/zhuyuan_bingqu/"+user_department;
	}
	main_menu_info[0][3] = "查看患者";
	main_menu_info[0][4] = new Array();
	
	
	main_menu_info[1][0] = "查房概览";
	main_menu_info[1][1] = "chafang_gailan";
	main_menu_info[1][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientZongheChafang";
	main_menu_info[1][3] = "查房概览";
	main_menu_info[1][4] = new Array();

	main_menu_info[2][0] = "时间视图";
	main_menu_info[2][1] = "time_view";
	main_menu_info[2][2] = "time_view";
	main_menu_info[2][3] = "查看时间视图";
	main_menu_info[2][4] = new Array();
	
	
	main_menu_info[3][0] = "病程记录";
	main_menu_info[3][1] = "view_bingchengjilu";
	main_menu_info[3][2] = "/tiantan_emr/ZhuyuanYishi/BingchengJilu/showView";
	main_menu_info[3][3] = "查看病程记录";
	main_menu_info[3][4] = new Array();

	main_menu_info[4][0] = "查看医嘱";
	main_menu_info[4][1] = "show_yizhu";
	main_menu_info[4][2] = "/tiantan_emr/Common/Yizhuguanli/showChangqi/state/开始执行";
	main_menu_info[4][3] = "查看医嘱";
	main_menu_info[4][4] = new Array();

	main_menu_info[5][0] = "查看检查";
	main_menu_info[5][1] = "view_jiancha";
	main_menu_info[5][2] = "/tiantan_emr/ZhuyuanYishi/Jiancha/showList";
	main_menu_info[5][3] = "查看检查";
	main_menu_info[5][4] = new Array();

	main_menu_info[6][0] = "三测单";
	main_menu_info[6][1] = "show_sancedan";
	main_menu_info[6][2] = "/tiantan_emr/Common/TiwenJiludan/showList";
	main_menu_info[6][3] = "三测单";
	main_menu_info[6][4] = new Array();
	
	main_menu_info[7][0] = "系统管理";
	main_menu_info[7][1] = "system_config";
	main_menu_info[7][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[7][3] = "选择设置项目";
	main_menu_info[7][4] = new Array();
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
	
	main_menu_info[0][0] = "查看患者";
	main_menu_info[0][1] = "show_patient";
	main_menu_info[0][2] = "/tiantan_emr/MenzhenYishi/Patient/showPatientList/menzhenyishi_id/"+user_number;
	main_menu_info[0][3] = "查看患者";
	main_menu_info[0][4] = new Array();

	main_menu_info[1][0] = "综合监测";
	main_menu_info[1][1] = "zonghe_jiance";
	main_menu_info[1][2] = "/tiantan_emr/JiankangDangan/Dangan/infoStatistics";
	main_menu_info[1][3] = "综合监测";
	main_menu_info[1][4] = new Array();

	main_menu_info[2][0] = "统计分析";
	main_menu_info[2][1] = "information_statistics";
	main_menu_info[2][2] = "/tiantan_emr/JiankangDangan/Dangan/infoStatistics";
	main_menu_info[2][3] = "统计分析";
	main_menu_info[2][4] = new Array();
	

	main_menu_info[3][0] = "系统设置";
	main_menu_info[3][1] = "system_config";
	main_menu_info[3][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[3][3] = "选择设置项目";
	main_menu_info[3][4] = new Array();

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
	main_menu_info[0][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientListPad/guidang_zhuangtai/未归档/suoyoubingren/suoyou/";
	main_menu_info[0][3] = "患者分类";
	temp_sub_menu = new Array();
	
	main_menu_info[1][0] = "护理查房";
	main_menu_info[1][1] = "add_tizhengjilu";
	main_menu_info[1][2] = "/tiantan_emr/Common/TiwenJiludan/showAddTiwendan";
	main_menu_info[1][3] = "录入体征记录值";
	main_menu_info[1][4] = new Array();

	main_menu_info[2][0] = "查看三测单";
	main_menu_info[2][1] = "show_sancedan";
	main_menu_info[2][2] = "/tiantan_emr/Common/TiwenJiludan/showList";
	main_menu_info[2][3] = "查看三测单";
	main_menu_info[2][4] = new Array();

	main_menu_info[3][0] = "医嘱执行";
	main_menu_info[3][1] = "yizhuzhixing";
	main_menu_info[3][2] = "/tiantan_emr/Common/Yizhuguanli/showYizhuZhixing/user_department/"+user_department+"/geiyao_fangshi/yongfa|口服";
	main_menu_info[3][3] = "医嘱执行";
	main_menu_info[3][4] = new Array();

	main_menu_info[4][0] = "查看护理记录";
	main_menu_info[4][1] = "show_hulijilu";
	main_menu_info[4][2] = "/tiantan_emr/HuliJilu/showList";
	main_menu_info[4][3] = "查看护理记录";
	main_menu_info[4][4] = new Array();

	main_menu_info[5][0] = "护理管理";
	main_menu_info[5][1] = "huli_guanli";
	main_menu_info[5][2] = "huli_guanli";
	main_menu_info[5][3] = "护理管理";
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
	main_menu_info[3][2] = "/tiantan_emr/Admin/DataCorrect/showPatientListPad";
	main_menu_info[3][3] = "数据纠正";
	main_menu_info[3][4] = new Array();
		main_menu_info[3][4][0] = new Array();
			main_menu_info[3][4][0][0] = "患者信息";
			main_menu_info[3][4][0][1] = "data_xiangmu";
			main_menu_info[3][4][0][2] = "/tiantan_emr/Admin/DataCorrect/showPatientListPad";
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
	
	main_menu_info[5][0] = "患者信息";
	main_menu_info[5][1] = "system_config";
	main_menu_info[5][2] = "/tiantan_emr/Admin/Config/ConfigYiyuan";
	main_menu_info[5][3] = "患者信息";
	main_menu_info[5][4] = new Array();
		main_menu_info[5][4][0] = new Array();
			main_menu_info[5][4][0][0] = "医院列表";
			main_menu_info[5][4][0][1] = "keshi_info";
			main_menu_info[5][4][0][2] = "/tiantan_emr/Admin/Config/ConfigYiyuan";
			main_menu_info[5][4][0][3] = new Array();
		main_menu_info[5][4][1] = new Array();
			main_menu_info[5][4][1][0] = "医院添加";
			main_menu_info[5][4][1][1] = "account_info";
			main_menu_info[5][4][1][2] = "/tiantan_emr/Admin/Config/ConfigYiyuanAdd";
			main_menu_info[5][4][1][3] = new Array();


	
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

function loadArtConfig()
{
	var main_menu_number = 7;
	for(var main_menu_count=0;main_menu_count<main_menu_number;main_menu_count++)
	{
		main_menu_info[main_menu_count]=new Array();
		//固定配置信息组成：中文名称，id，url，子目录标题，子目录内容结构，其它信息
		for(var main_menu_info_count=0;main_menu_info_count<6;main_menu_info_count++)
		{
				main_menu_info[main_menu_count][main_menu_info_count]="";
		}
	}
	
	main_menu_info[0][0] = "门诊管理";
	main_menu_info[0][1] = "menzhen_guanli";
	main_menu_info[0][2] = "/tiantan_emr/MenzhenYishi/Patient/showPatientListPad/menzhenyishi_id/"+user_number;
	main_menu_info[0][3] = "门诊管理";
	main_menu_info[0][4] = new Array();
	
	main_menu_info[1][0] = "周期管理";
	main_menu_info[1][1] = "zhouqi_guanli";
	main_menu_info[1][2] = "/tiantan_emr/Art/ZhouqiGuanli/showZhouqiList";
	main_menu_info[1][3] = "周期管理";
	main_menu_info[1][4] = new Array();
	
	main_menu_info[2][0] = "冷冻管理";
	main_menu_info[2][1] = "lengdong_guanli";
	main_menu_info[2][2] = "/tiantan_emr/Art/ZhouqiGuanli/showZhouqiList";
	main_menu_info[2][3] = "冷冻管理";
	main_menu_info[2][4] = new Array();

	main_menu_info[3][0] = "捐赠管理";
	main_menu_info[3][1] = "juanzeng_guanli";
	main_menu_info[3][2] = "/tiantan_emr/Art/ZhouqiGuanli/showZhouqiList";
	main_menu_info[3][3] = "捐赠管理";
	main_menu_info[3][4] = new Array();
	
	main_menu_info[4][0] = "住院管理";
	main_menu_info[4][1] = "zhuyuan_guanli";
	if(user_department_position=="科主任"||user_department_position=="主任医师"||user_department_position=="副主任医师")
	{
		main_menu_info[4][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientListPad/suoyoubingren/suoyou";
	}
	else
	{
		main_menu_info[4][2] = "/tiantan_emr/ZhuyuanYishi/Patient/showPatientListPad/guidang_zhuangtai/未归档/zhuyuan_bingqu/"+user_department;
	}
	main_menu_info[4][3] = "住院管理";
	main_menu_info[4][4] = new Array();
	
	main_menu_info[5][0] = "随访管理";
	main_menu_info[5][1] = "suifang_guanli";
	main_menu_info[5][2] = "/tiantan_emr/Art/SuifangGuanli/showZhouqiList";
	main_menu_info[5][3] = "随访管理";
	main_menu_info[5][4] = new Array();
	
	main_menu_info[6][0] = "系统设置";
	main_menu_info[6][1] = "system_config";
	main_menu_info[6][2] = "/tiantan_emr/Common/System/showUserInfo";
	main_menu_info[6][3] = "选择设置项目";
	main_menu_info[6][4] = new Array();
	
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
			//临时获取点击按钮名称
			var temp_click_id = $(this).attr("id");
			//加载页面
			//根据点击按钮重新设置按钮响应
			if(temp_click_id == "time_view")
			{
				if($(".bottom_menu").is(":hidden")){
					$.post("/tiantan_emr/Data/SetKuadu/",{type:'moren'},function(data){
						getHuaban()
					});
					$('.bottom_menu').show();
					$(".bottom_menu").css("height",'auto');
					//$(".bottom_menu").css("width","100%");
				}else{
					$('.bottom_menu').hide();
				}
			}
			else if(temp_click_id == "chafang_gailan")
			{
				$("#conframe").attr("src","http://"+server_url+$(this).attr("url")+"/zhuyuan_id/"+current_zhixing_id);
			}
			else if(temp_click_id == "huli_guanli")
			{
				//如果是护理管理主菜单，刷新护理管理功能按钮
				updateSubMenuByHuliguanliforHushi();
			}
			else if(temp_click_id != "show_patient")
			{
				//显示加载条
				$(".loading").show();
				//切换左侧患者列表
				$.ajaxSetup({
					async: true
				});
				$.get("/tiantan_emr/Common/Data/getPatientListForQuickMenu",{ function_url: $(this).attr("url"),zhuyuan_id: current_zhixing_id}, function(data){
					$(".menu_link").html(data);
				});
				$("#conframe").attr("src","http://"+server_url+$(this).attr("url")+"/zhuyuan_id/"+current_zhixing_id);
			}
			else
			{
				$("#conframe").attr("src","http://"+server_url+$(this).attr("url")+"/zhuyuan_id/"+current_zhixing_id);
			}
			if(main_menu_info[$(this).attr("main_menu_count")][4].length > 1)
				initinalSubMenu($(this).attr("main_menu_count"));
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
	$("#linchuang").html("");
	//遍历数组追加子菜单信息
	for(var sub_menu_count=0;sub_menu_count<temp_sub_menu.length;sub_menu_count++)
	{
		//单级目录：
		if(temp_sub_menu[sub_menu_count][3].length<1)
		{
			$("#linchuang").append(
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
			$("#linchuang").append(menu_link_content);
			$.imgTitleButton(temp_sub_menu[sub_menu_count][1]);
		}
	}
	addTreeViewEvent();
}

function refreshSubMultiMenu(temp_sub_menu_bingli,temp_sub_menu_linchuang,temp_sub_menu_huli)
{
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
	//为病历菜单tab生成内容
	//先清空树形菜单
	$("#bingli").html("");
	//修正分类标签名称
	if(current_content_url.toLowerCase().indexOf("art")!=-1)
	{
		$("[name='huli']").html("实验");
	}
	else
	{
		$("[name='huli']").html("护理");
	}
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
	//为护理菜单tab生成内容
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

function loadingEnd()
{
	$(".loading").hide();
}

function loadingStart()
{
	$(".loading").show();
	window.setTimeout(loadingEnd,1500);
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

function StringToAscii(str)
{
	return str.charCodeAt(0).toString(16);  
}

function AsciiToString(asccode)
{
	return String.fromCharCode(asccode);  
}

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