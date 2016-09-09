/*
   Network State Receiver

   Copyright 2013 Thinstuff Technologies GmbH, Author: Martin Fleisz

   This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
   If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

package com.tiantanhehe.tiantanrdp;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

public class NetworkStateReceiver extends BroadcastReceiver {

	public static boolean isConnectedTo3G(Context context)
	{
		ConnectivityManager connectivity = (ConnectivityManager)context.getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo info = connectivity.getActiveNetworkInfo();

		// no connection or background data disabled
		if(info == null || !info.isConnected())
			return false;
	
		return (info.getType() != ConnectivityManager.TYPE_WIFI && info.getType() != ConnectivityManager.TYPE_WIMAX);		
	}
	
	@Override
	public void onReceive(Context context, Intent intent) {
		if(intent.getExtras() != null)
		{
			NetworkInfo info = (NetworkInfo)intent.getExtras().get(ConnectivityManager.EXTRA_NETWORK_INFO);

			// are we connected at all?
			if(info != null && info.isConnected())
			{
				GlobalInfoApplication.ConnectedTo3G = (info.getType() != ConnectivityManager.TYPE_WIFI && info.getType() != ConnectivityManager.TYPE_WIMAX);
			}
		}
	}
}
