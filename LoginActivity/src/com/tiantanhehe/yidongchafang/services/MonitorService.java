/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: MonitorService.java
 * @Package com.tiantanhehe.yidongchafang.services
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年5月18日 下午2:02:20 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.services;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;

import android.app.ActivityManager;
import android.app.Service;
import android.content.Intent;
import android.os.Debug;
import android.os.IBinder;
import android.util.Log;

/**
 * @ClassName: MonitorService
 * @Description: 监测类服务，定期监测应用的性能指标
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年5月18日 下午2:02:20
 * 
 */
public class MonitorService extends Service {

	private GlobalInfoApplication globalInfoApplication;
	private int monitorRuning = 1;
	private ActivityManager activityManager;
	private ActivityManager.MemoryInfo activityMemInfo;
	private Debug.MemoryInfo debugMemInfo;

	private Thread monitorThread;


	@Override
	public void onCreate() {
		super.onCreate();

		activityManager = (ActivityManager) getSystemService(ACTIVITY_SERVICE);
		activityMemInfo = new ActivityManager.MemoryInfo();
		debugMemInfo = new Debug.MemoryInfo();

		Log.d("tiantan", "xiezuoService start");
		monitorRuning = 1;
		globalInfoApplication = GlobalInfoApplication.getInstance();

		if (monitorThread == null) {
			monitorThread = new Thread(new MonitorThread());
			monitorThread.start();
		}

	}

	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		// TODO Auto-generated method stub
		// if (monitorThread == null) {
		// monitorThread = new Thread(new MonitorThread());
		// monitorThread.start();
		// }
		return super.onStartCommand(intent, flags, startId);
	}

	@Override
	public IBinder onBind(Intent intent) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void onDestroy() {
		monitorRuning = 0;
		super.onDestroy();
		Log.d("tiantan", "monitorService destroy");
	}
	public class MonitorThread implements Runnable {

		@Override
		public void run() {
			// 进行引用性能监视操作
			while (monitorRuning == 1) {


				MemMonitor();
				try {
					Thread.sleep(globalInfoApplication.appConf.monitor_period * 1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			// Log.d("tiantan", "chafangtongbu exit");

		}

		/**
		 * @Title: MemMonitor
		 * @Description: 应用内存监测
		 * @author: Huke <Huke@tiantanhehe.com>
		 * @date: 2016年5月18日 下午2:08:34
		 */
		private void MemMonitor() {
			activityManager.getMemoryInfo(activityMemInfo);
			Debug.getMemoryInfo(debugMemInfo);
			
			Log.d("tiantan",
					"monitor activity mem:" + "totalMem:" + (activityMemInfo.totalMem >> 10) + "   availMem:"
							+ (activityMemInfo.availMem >> 10) + "   lowMemory:" + activityMemInfo.lowMemory
							+ "   threshold:" + activityMemInfo.threshold);

			Log.d("tiantan",
					"monitor debug mem:" + "dalvikPrivateDirty:" + (debugMemInfo.dalvikPrivateDirty) + "   dalvikPss:"
							+ (debugMemInfo.dalvikPss) + "   dalvikSharedDirty :" + (debugMemInfo.dalvikSharedDirty)
							+ "	  nativePrivateDirty :" + (debugMemInfo.nativePrivateDirty) + "   nativePss :"
							+ (debugMemInfo.nativePss) + "   nativeSharedDirty  :" + (debugMemInfo.nativeSharedDirty));

		}

	}

}
