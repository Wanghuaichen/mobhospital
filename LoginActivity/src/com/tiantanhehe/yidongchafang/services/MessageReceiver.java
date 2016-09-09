package com.tiantanhehe.yidongchafang.services;

import com.tiantanhehe.yidongchafang.views.activities.tools.ZidongExitActivity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class MessageReceiver extends BroadcastReceiver
{
	@Override
	public void onReceive(Context context, Intent intent)
	{
		Intent intentTiaozhuang = new Intent(context,ZidongExitActivity.class);
		intentTiaozhuang.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		context.startActivity(intentTiaozhuang);
	}
}
