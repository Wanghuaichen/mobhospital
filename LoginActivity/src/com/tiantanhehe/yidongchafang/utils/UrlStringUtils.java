package com.tiantanhehe.yidongchafang.utils;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.conf.AppConf;

public class UrlStringUtils {
	GlobalInfoApplication application = new GlobalInfoApplication();
	AppConf appConf = new AppConf();
	public String mainPatientList = "http://" + appConf.server_ip
			+ "/tiantan_emr/Mobile/YidongChafangClientCommunication/showPatientListPad";
}
