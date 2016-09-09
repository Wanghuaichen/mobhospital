/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: FeatureConf.java
 * @Package com.tiantanhehe.yidongchafang.conf
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月6日 下午4:30:50 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.conf;

/**
 * @ClassName: FeatureConf
 * @Description: 具体功能的相关配置
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月6日 下午4:30:50
 * 
 */
public class FeatureConf {

	/******************************* 患者相关 ************************/

	/***************************************************************/

	/******************************* 医嘱相关 *************************/
	public boolean yizhu_local_update = false;// 判断医嘱是否在终端进行了最后更新，如果标识为true则不会进行医嘱数据下载操作

	public String yizhuVersion = "v415";
	public long linshi_yizhu_xianshi = 26;// 显示当前时间之前12个小时以内的临时医嘱
	public int yizhu_conf = 0; // 0：正常版本，1医嘱可编辑演示版本

	/***************************************************************/

	/******************************* 体征相关 *************************/
	public boolean tizheng_local_update = false;// 判断体征是否再终端进行了最后更新，如果标识为true则不会进行体征数据下载操作

	/***************************************************************/

	/******************************* 标本相关 *************************/

	/***************************************************************/

	/******************************* 护理记录相关 ********************/
	public String[] hulijilu_type_arr;

	/***************************************************************/

	/******************************* 护理文书相关 ********************/
	public String[] huliwenshu_type_arr;

	/***************************************************************/

	/******************************* 协助相关 ********************/
	public int chafanggensui_reflesh_period = 3600;
	public int chafangtongbu_reflesh_period = 30;
	public String now_url;
	public boolean chafangtongbu_switch = false;
	/***************************************************************/

	/******************************* RDP相关 ********************/

	public boolean rdp_mask_switch = true;
	public String his_remote_app_name = "";
	public String his_remote_work_dir = "";
	public int his_rdp_resolution_width = 800;
	public int his_rdp_resolution_height = 600;
	public String[] his_init_macro_command = { "type@dbclick#delay_time@2000#x_pos@734#y_pos@127",
			"type@click#delay_time@2000#x_pos@121#y_pos@40" };
	
	public boolean emr_mask_switch = true;
	public String emr_remote_app_name = "";
	public String emr_remote_work_dir = "";
	public int emr_rdp_resolution_width = 800;
	public int emr_rdp_resolution_height = 600;
	public String[] emr_init_macro_command = { "type@dbclick#delay_time@2000#x_pos@734#y_pos@127",
			"type@click#delay_time@2000#x_pos@121#y_pos@40" };


	public String pacs_remote_app_name = "";
	public int pacs_rdp_resolution_width = 800;
	public int pacs_rdp_resolution_height = 600;
	public String[] pacs_init_macro_command = { "type@dbclick#delay_time@2000#x_pos@734#y_pos@127",
			"type@click#delay_time@2000#x_pos@121#y_pos@40" };

	public String bdxt_remote_app_name = "";
	public int bdxt_rdp_resolution_width = 800;
	public int bdxt_rdp_resolution_height = 600;
	public String[] bdxt_init_macro_command = { "type@dbclick#delay_time@2000#x_pos@0#y_pos@0" };
	/***************************************************************/

	/******************************* EIM协作 ********************/
	public String xmpp_server_ip = "120.27.138.144";
	public String xmpp_server_port = "5222";
	public String xmpp_server_name = "iZ231ilzp7cZ";

	/***************************************************************/
}
