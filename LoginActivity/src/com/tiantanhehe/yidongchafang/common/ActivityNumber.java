package com.tiantanhehe.yidongchafang.common;

import java.util.ArrayList;
import android.app.Activity;
/**************************************************
*  Created:  2015-03
*  Info:
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author Lake <shaojunguang@tiantanhehe.com>
*  @Version 1.0
*  @Updated History:  
***************************************************/
public class ActivityNumber
{
	public static ArrayList<Activity> activityList = new ArrayList<Activity>();
	public static ArrayList<Activity> getActivityList()
	{
		return activityList;
	}

	public static void setActivityList(ArrayList<Activity> activityList)
	{
		ActivityNumber.activityList = activityList;
	}
	
	public void addActivity(Activity activity)
	{
		activityList.add(activity);
	}
	
	public ArrayList<Activity> activityList()
	{
		return activityList;
	}
}
