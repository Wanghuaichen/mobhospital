package com.tiantanhehe.yidongchafang.conf;

import java.util.HashMap;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.services.BluetoothService;

/*************************************************************
 * Created : 2016/4/1. Info :程序的整体配置信息
 * 
 * @Tiantanhehe (C)2011-3011 Tiantanhehe
 * @Author hooke <huke@tiantanhehe.com>
 * @Version
 * @Updated History:
 **************************************************************/
public class AppConf {

	public AppConf() {

	}

	public int scanner_film_driver = 0;
	// 系统版本号，登陆时设置
	public String version;
	public int isUpdate = 1;
	// 设备号
	public String device_id;
	public String server_ip = "192.168.1.15";// 10.139.44.202//192.168.100.238//10.200.3.54
	public String server_ip_lan = "192.168.1.15";
	public String RDP_server_ip = "119.29.36.42";
	public String RDP_port = "3389";// 13569//3389
	public String RDP_user_name = "";
	public String RDP_password = "";

	public String server_port = "80";
	public String server_url = "http://" + server_ip + ":" + server_port
			+ "/tiantan_emr/";
	public String server_url_default_port = "http://" + server_ip
			+ "/tiantan_emr/";
	public String remote_app_url = "http://" + server_ip + ":" + server_port
			+ "/tiantan_emr_mobile_v4/";
	public static String database_name = "yidongchafang.db";
	//public String xiaobianque_url = "http://" + server_ip + ":" + server_port + "/xiaobianque/wapXiaobianque/index.html";
	public String xiaobianque_url = server_url + "/Data/showXiaobianque";
	public String versionName;// 版本号影响到系统更新，配置在androidManifest.xml里面，当前最新版本号为4.7.6
	public boolean http_data_compression_flag = true;// 数据压缩标志，是否对请求和下载的数据进行压缩处理
	public boolean sync_data_shoudong_chufa = false;
	public boolean sync_data_flag = true; // 手动控制同步任务的开始和停止
	public boolean sysc_data_state = false; // 标示当前同步任务是否正在运行
	public boolean suoping_flag = true; // 标示当前程序的锁屏状态
	public boolean open_data_tongbu = true;
	public boolean open_xiezuo = false;
	public int monitor_period = 3600; // 后台性能检测周期，单位s
	public int screen_orientation = 2;// 0表示根据系统默认，1表示固定竖屏，2表示固定横屏

	public String[] showinfo = null;// 全院通知的消息内容。
	public boolean denglubiaozhi = true;// 登录界面控制这个开关，来标示是否从登录界面进入到的主界面。
	public boolean qiangzhi_tuichu = false;// 为true时，后台可以强制退出
	public String enableToUse = "是";// 是 不强制退出 否 强制退出
	public boolean kaifuzhiliao_kaiguan = false;// 是否开启康复治疗

	public String hospital_name = "";
	public String current_user_number = "";
	public String current_user_name = "";
	public String current_user_password = ""; // 成功登录后保存用户密码，用于其他应用自动登录
	public String current_his_user_name = "";
	public String current_his_user_password = "";
	public String current_emr_user_name = "";
	public String current_emr_user_password = "";
	public String current_pacs_user_name = "";
	public String current_pacs_user_password = "";
	public String current_user_department_id = "";
	public String current_user_department = ""; // 当前用户所登陆的科室
	public String current_user_department_position = "";
	public String current_user_suoshu_department = ""; // 当前用户所属的所有科室
	public String current_user_suoshu_number = ""; // 当前用户所属的所有user_number
	public String current_user_suoshu_name = ""; // 当前用户所属的所有姓名
	public String current_user_suoshu_department_position = ""; // 当前用户所属的所有科室的职位
	public String current_user_suoshu_group = ""; // 当前用户所属的所有科室的所属小组，基层康复诊疗组代表下属卫生院

	public String current_user_group = "";
	public int current_user_logintimes = 0;
	public String current_patient_id = "";
	public String current_patient_zhuyuan_id = "";
	public String current_patient_zhuyuan_bingqu = "";
	public String current_patient_bingchuang_hao = "";
	public String current_patient_xingming = "";
	public String current_patient_xingbie = "";
	public String current_patient_nianling = "";
	public String current_mokuai = "";// 当前护士操作的模块名
	public String current_menu = "";
	public String current_patient_huli_jibie = "";
	public String current_patient_zhenduan = "";
	public String current_patient_zhuyuan_id_show = "";
	public String dangqian_mokuai = ""; // 用于记录当前所在的模块

	public String user_bar_code_title = "gp";// 识别登陆工牌的前缀
	public int heart_beart_period = 40;// 心跳信息发送时间间隔，单位s
	public int suoping_dengdai_time = 1000 * 20 * 60; // 锁屏等待事件，锁屏当超过若干时间后，让软件自动退出
	public String[] huanzhe_shaixuan_peizhi = { "总患者", "特级护理", "一级护理", "二级护理",
			"三级护理", "其他" };// 患者列表筛选按钮可配置化。
	public String[] mokuai_peizhi = { "查房概要", "查看医嘱", "病程记录", "检验检查", "三测单",
			"时间视图" };
	public String[] left_menu = { "住院总览", "查房概要", "查房引导", "查看医嘱", "病历记录",
			"病历编辑", "检验记录", "检查记录", "护理记录", "三测单", "时间视图", "康复治疗", "查房演示",
			"应用集成", "入院记录", "出院记录", "电子病历" };
	@SuppressWarnings("serial")
	public HashMap<String, String> left_menu_lang_map = new HashMap<String, String>() {
		{
			put("住院总览", "zyzl");
			put("查房概要", "cfgy");
			put("查房引导", "cfyd");
			put("查看医嘱", "ckyz");
			put("病历记录", "bljl");
			put("入院记录", "ryjl");
			put("出院记录", "cyjl");
			put("病历编辑", "blbj");
			put("检验记录", "jyjl");
			put("检查记录", "jcjl");
			put("护理记录", "hljl");
			put("三测单", "scd");
			put("时间视图", "sjst");
			put("查房演示", "cfys");
			put("查房跟随", "cfys");
			put("应用集成", "yzxd");
			put("检查影像", "yxbg");
			put("报道系统", "yxbg");
			put("康复治疗", "zyzl");
			put("电子病历", "dzbl");
		}

	};

	int[] leftMenuTubiao = { R.drawable.pyhd, R.drawable.bbjc, R.drawable.yzzx,
			R.drawable.lrtz, R.drawable.hlws, R.drawable.hzxs, R.drawable.rypg,
			R.drawable.hljl, R.drawable.xtjc1, R.drawable.hzxx,
			R.drawable.zyjf, R.drawable.jxtj, R.drawable.blsj1,
			R.drawable.hlcz, R.drawable.chakanyizhu, R.drawable.jianyanjiancha,
			R.drawable.tshz, R.drawable.mokuai_chafang_gailan,
			R.drawable.mokuai_show_yizhu, R.drawable.mokuai_view_bingchengjilu,
			R.drawable.mokuai_view_jiancha, R.drawable.mokuai_show_sancedan,
			R.drawable.mokuai_shijianshitu, R.drawable.mokuai_show_patient };

	public String[] arc_menu = { "便签", "小扁鹊", "显示", "全屏" };

	public int patient_sort_mode = 1; // 患者列表排序方式 0-按床号字符串排序;1-按床号数值排序
	public boolean huanzhe_yijing_saomiaochuangtouka = false;// 患者已经被扫描床头卡

	public boolean bluetooth_login = true; // 是否允许蓝牙登录
	public boolean bluetooth_vertify = false;// 是否开去蓝牙认证
	public boolean bluetooth_discovery = false;// 是否开启蓝牙贴片发现

	public String bluetooth_default_device = "98:D3:31:90:66:E7";
	public int bluetooth_discover_mode = BluetoothService.BT_MODE_DEFAULT; // 蓝牙发现模式BT_MODE_LE：低功耗模式，BT_MODE_DEFAULT：普通模式

	public boolean yuyin_tishi = false;

	public String[] js_enable = { "查看患者", "病区概览", "查房引导", "查看医嘱", "病历记录",
			"病历编辑", "检验记录", "检查记录", "护理记录", "三测单", "时间视图", "入院记录", "出院记录", "电子病历" };

}
