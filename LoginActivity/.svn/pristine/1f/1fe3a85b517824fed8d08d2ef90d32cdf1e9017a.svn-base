package com.tiantanhehe.yidongchafang.services;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.utils.PackageUtil;

import android.app.KeyguardManager;
import android.app.KeyguardManager.KeyguardLock;
import android.app.Service;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.AsyncTask;
import android.os.Binder;
import android.os.IBinder;
import android.os.PowerManager;
import android.util.Log;

public class BluetoothService extends Service implements OnReceivedPacketListener {

	public GlobalInfoApplication current_application;
	private OnReceivedPacketListener mPacketListener = null;
	private BluetoothAdapter mBluetoothAdapter;
	private int mState;
	private ConnectThread mConnectThread;
	private ConnectedThread mConnectedThread;
	private DiscoveryThread mDiscoveryThread;
	public Timer mTimer;
	public Thread mMonitorThread;
	public TimerTask discoveryTask;

	public Thread mSendTestThread;

	private static final UUID MY_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
	public static final int STATE_NONE = 0;
	public static final int STATE_LISTEN = 1;
	public static final int STATE_CONNECTING = 2;
	public static final int STATE_CONNECTED = 3;
	public static final String BT_HEADER = "$$5A5";
	public static final int BT_LENGTH = 17;
	public static final String BT_TAIL = "~!@#$";
	public static final int BT_FRONT_COST_LENGTH = 21;
	public static final int BT_BACK_COST_LENGTH = 1;
	public static final int BT_TOTAL_COST_LENGTH = 22;
	public static final int BT_BUFFER_LENGTH = 1024;
	public static final ByteBuffer packetByteBuffer = ByteBuffer.allocate(BT_BUFFER_LENGTH);

	public static final int BT_DEVICE_INIT_OK = 1;

	public static final int BT_VISABLE_TIME = 30;
	public static final int BT_DIS_THRETHOLD = -60;

	public static long mLastBTTime;
	private KeyguardManager km;
	private KeyguardLock kl;
	private PowerManager pm;
	private PowerManager.WakeLock wl;
	public static final int BT_WAKEUP_OK = 1;
	public int m_bt_running;
	public boolean m_wakeup;
	public static final int BT_RUNNING = 1;
	public static final int BT_STOP = 1;

	public static final int BT_BROADCAST_LOGIN = 1;
	public static final int BT_BROADCAST_CONNECT_FAILED = 2;
	public static final int BT_BROADCAS_INVALID_ID = 3;
	public static final int BT_BROADCAST_CONNECT_SUCCESS = 4;
	public static final int BT_BROADCAST_SHEBEI_ID = 5;
	
	protected SharedPreferences preferences;
	public static final String BT_SERVER = "bluetooth_server";
	public static final String MATCH_NAME = "MI1A";//nut
	private boolean mScanning;

	public static final int BT_MODE_DEFAULT = 1;
	public static final int BT_MODE_LE = 2;

	@Override
	public void onCreate() {
		super.onCreate();
		current_application = GlobalInfoApplication.getInstance();
		Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[1]" + ":" + "start bluetooth service!");
		mPacketListener = this;
		packetByteBuffer.clear();
		m_bt_running = 1;
		m_wakeup = false;
		// mState = BluetoothService.STATE_NONE;
		// 注册时发送广播给设备
		IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
		this.registerReceiver(mReceiver, filter);

		// 广播时发现已完成注册
		filter = new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
		this.registerReceiver(mReceiver, filter);

		setState(STATE_NONE);
		// 查找对应蓝牙设备
		initBTDevice();

		
	}

	public void initBTDevice() {
		mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
		new AsyncTask<String, Integer, Integer>() {

			@Override
			protected Integer doInBackground(String... params) {
				if (!mBluetoothAdapter.isEnabled()) {
					Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[1.1]" + ":"
							+ "no enable bluetooth adapter!");
					// stopSelf();
					mBluetoothAdapter.enable();
					Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[1.1]" + ":"
							+ "enable bluetooth adapter!");
				}

				try {
					Thread.sleep(1000);// 等待1s系统将蓝牙初始化
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				// mState = BluetoothService.STATE_LISTEN;
				setState(STATE_LISTEN);



				return BT_DEVICE_INIT_OK;
			}



			@Override
			protected void onPostExecute(Integer result) {
				// 连接
				boolean isBT4 = getPackageManager().hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE);
				Log.i("tiantan", "[data access]" + "-" + "[]" + "-" + "[]" + ":" + "is support bluetooth 4.0" + isBT4);

				if (result == BT_DEVICE_INIT_OK) {
					Log.i("tiantan",
							"[data access]" + "-" + "[bluetooth login]" + "-" + "[2]" + ":" + "connectBTDevice!");

					connectBTDevice();

					Log.i("tiantan",
							"[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":" + "discoverBTDevice!");
					discoverBTDevice();

				}
			}
		}.execute("");


	}

	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {

		Log.i("tiantan",
				"[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":" + "onStartCommand bluetooth service!");
		super.onStartCommand(intent, flags, startId);
		return START_NOT_STICKY; // service 被自动关闭不重新启动
	}

	@Override
	public void onDestroy() {
		m_bt_running = 0;
		if (mBluetoothAdapter != null && mScanning == true) {
			mBluetoothAdapter.stopLeScan(mLeScanCallback);
			mScanning = false;
			Log.i("tiantan",
					"[data access]" + "-" + "[bluetooth discovery]" + "-" + "[]" + ":" + "discover device stop!");
		}
		if (discoveryTask != null) {
			discoveryTask.cancel();
		}

		if (mTimer != null) {
			mTimer.cancel();
		}

		Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":" + "destroy bluetooth service!");
		this.stop();
		super.onDestroy();

	}

	public void discoverBTDevice() {
		
		if (mBluetoothAdapter != null) {
			if (mBluetoothAdapter.isDiscovering()) {
				mBluetoothAdapter.cancelDiscovery();
			}
		}

		switch (current_application.appConf.bluetooth_discover_mode) {
		case BT_MODE_DEFAULT:

			// if (mBluetoothAdapter != null) {
			// if (mBluetoothAdapter.isDiscovering()) {
			// mBluetoothAdapter.cancelDiscovery();
			// }
			// }

			if (current_application.appConf.bluetooth_discovery) {
				mDiscoveryThread = new DiscoveryThread(mBluetoothAdapter);
				mDiscoveryThread.start();
			}
			break;
		case BT_MODE_LE:
			if (current_application.appConf.bluetooth_discovery) {
				if (discoveryTask != null) {
					discoveryTask.cancel();
				}

				if (mTimer != null) {
					mTimer.cancel();
				}

				mTimer = new Timer();
				discoveryTask = new DiscoveryTask(mBluetoothAdapter);
				mTimer.schedule(discoveryTask, 0, 5000);

			}

			break;
		default:
			Log.i("tiantan", "[data access]" + "-" + "[]" + "-" + "[]" + ":" + "no support discover mode!");
		}

	}

	private void connectBTDevice() {

		String address = getMacByID();

		// String address = "98:D3:31:20:9B:4D"; // 通过配置

		if (!BluetoothAdapter.checkBluetoothAddress(address)) {
			// 进行错误提示
			Intent intent = new Intent();

			intent.putExtra("bt_type", BT_BROADCAS_INVALID_ID);
			intent.putExtra("user_number", "");
			// intent.putExtra("", value)

			intent.setAction("com.tiantanhehe.mobileemr.BluetoothService");
			sendBroadcast(intent);
			Log.i("tiantan", "[data access]" + "-" + "[]" + "-" + "[]" + ":" + "sendbtInvalidIDbroadcast!");

			return;
		}

		BluetoothDevice device = mBluetoothAdapter.getRemoteDevice(address);
		if (mConnectedThread != null) {
			mConnectedThread.cancel();
			mConnectedThread = null;
		}
		Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":" + device.getName());

		// 启动线程连接的设备
		mConnectThread = new ConnectThread(device);
		mConnectThread.start();

		// mState = STATE_CONNECTING;
		setState(STATE_CONNECTING);

	}

	private String getMacByID() {
		// TODO Auto-generated method stub
		preferences = getSharedPreferences(BT_SERVER, MODE_PRIVATE);
		String id = preferences.getString("bt_id", "");
		// String mac = preferences.getString("bt_mac", "");
		String mac = preferences.getString("bt_mac", current_application.appConf.bluetooth_default_device);

		// 下一步根据ID通过请求向后台查询对应的mac地址
		// if (id.equals("") || mac.equals("")) {
		// return null;
		//
		// }

		if (id.equals("12345")) {

			return mac;
		} else {
			return null;
		}


	}

	@Override
	public IBinder onBind(Intent intent) {
		// TODO Auto-generated method stub
		return new MsgBinder();

		// return null;
	}

	@Override
	public synchronized boolean onReceived(byte[] pktbuff, int size) {
		// TODO Auto-generated method stub

		if (packetByteBuffer.limit() - packetByteBuffer.position() < size) {
			packetByteBuffer.clear();
			return false;
		}

		try {
		packetByteBuffer.put(pktbuff, 0, size);
		packetByteBuffer.flip();
		byte[] receivedBytes = new byte[1024];
		// int receivedBytesLength = packetByteBuffer.limit() > BT_LENGTH ?
		// BT_LENGTH : packetByteBuffer.limit();
		int receivedBytesLength = packetByteBuffer.limit();

		packetByteBuffer.get(receivedBytes, 0, receivedBytesLength);
		final String receivedString = new String(receivedBytes, 0, receivedBytesLength);
		Log.i("tiantan", "reveived bluetooth origin packet" + receivedString);


		if (receivedString.startsWith(BT_HEADER)) {

			if (receivedBytesLength > BT_HEADER.length()) {

				int thisPacketLength = receivedBytes[BT_HEADER.length()];

					if (receivedBytesLength > thisPacketLength + BT_TOTAL_COST_LENGTH) {
					Log.i("tiantan", "reveived bluetooth packet" + receivedString);

					wakeAndUnlock(true);
					m_wakeup = true;
					Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":"
							+ "wakeAndUnlock(true) m_wakeup " + m_wakeup);

					byte[] thisPacketBytes = PackageUtil.subBytes(receivedBytes, 0,
							thisPacketLength + BT_TOTAL_COST_LENGTH);
					byte[] remainPacketBytes = PackageUtil.subBytes(receivedBytes,
							thisPacketLength + BT_TOTAL_COST_LENGTH,
							receivedBytesLength - (thisPacketLength + BT_TOTAL_COST_LENGTH));

						final String thisPacketString = new String(thisPacketBytes, BT_FRONT_COST_LENGTH,
								thisPacketLength); // 将全部数据包转换为字符串传递，也可以将packet里面的data单独传递


					new AsyncTask<String, Integer, Integer>() {

						@Override
						protected Integer doInBackground(String... params) {

							try {
								Thread.sleep(500);//
							} catch (InterruptedException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}

							return BT_WAKEUP_OK;
						}

						@Override
						protected void onPostExecute(Integer result) {
								// 连接

							if (result == BT_WAKEUP_OK) {
								Intent intent = new Intent();
								intent.putExtra("bt_type", BT_BROADCAST_LOGIN);
								intent.putExtra("user_number", thisPacketString);

								intent.setAction("com.tiantanhehe.mobileemr.BluetoothService");
								sendBroadcast(intent);
								Log.i("tiantan",
										"[data access]" + "-" + "[]" + "-" + "[]" + ":" + "sendbtMsgbroadcast!");
							}
						}
					}.execute("");

						packetByteBuffer.clear();
						// packetByteBuffer.put(remainPacketBytes);

					} else if (receivedBytesLength == thisPacketLength + BT_TOTAL_COST_LENGTH) {
					new AsyncTask<String, Integer, Integer>() {

						@Override
						protected Integer doInBackground(String... params) {

							try {
									Thread.sleep(500);// 等待1s系统唤醒系统
							} catch (InterruptedException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}

							return BT_WAKEUP_OK;
						}

						@Override
						protected void onPostExecute(Integer result) {
								// 连接

							if (result == BT_WAKEUP_OK) {
								Intent intent = new Intent();
								intent.putExtra("user_number", receivedString);

								intent.setAction("com.tiantanhehe.mobileemr.BluetoothService");
								sendBroadcast(intent);
								Log.i("tiantan",
										"[data access]" + "-" + "[]" + "-" + "[]" + ":" + "sendbtMsgbroadcast!");
							}
						}
					}.execute("");
						packetByteBuffer.clear();
					} else {
						packetByteBuffer.clear();
						packetByteBuffer.put(receivedBytes, 0, receivedBytesLength);
						Log.i("tiantan", "reput bluetooth packet of type 1" + receivedString);
				}


			} else {
				packetByteBuffer.compact();
				packetByteBuffer.put(receivedBytes, 0, receivedBytesLength);
					Log.i("tiantan", "reput bluetooth packet of type 2" + receivedString);
			}

		} else {
			if (BT_HEADER.startsWith(receivedString)) {
				packetByteBuffer.clear();
				packetByteBuffer.put(receivedBytes, 0, receivedBytesLength);
					Log.i("tiantan", "reput bluetooth packet of type 3" + receivedString);

			} else {
				packetByteBuffer.compact();
				Log.i("tiantan", "drop bluetooth packet" + receivedString);
			}
		}

		} catch (Exception e) {
			e.printStackTrace();
		}




		return false;
	}

	private void connectionSuccess() {

		Intent intent = new Intent();

		intent.putExtra("bt_type", BT_BROADCAST_CONNECT_SUCCESS);
		intent.putExtra("user_number", "");
		// intent.putExtra("", value)

		intent.setAction("com.tiantanhehe.mobileemr.BluetoothService");
		sendBroadcast(intent);
		Log.i("tiantan", "[data access]" + "-" + "[]" + "-" + "[]" + ":" + "sendbtMsgbroadcast!");
	}

	/**
	 * Indicate that the connection attempt failed and notify the UI Activity.
	 */
	private void connectionFailed() {
		// setState(STATE_LISTEN);
		Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":" + "connectionFailed()");
		// mState = STATE_LISTEN;

		Intent intent = new Intent();

		intent.putExtra("bt_type", BT_BROADCAST_CONNECT_FAILED);
		intent.putExtra("user_number", "");
		// intent.putExtra("", value)

		intent.setAction("com.tiantanhehe.mobileemr.BluetoothService");
		sendBroadcast(intent);
		Log.i("tiantan", "[data access]" + "-" + "[]" + "-" + "[]" + ":" + "sendbtMsgbroadcast!");

		setState(STATE_LISTEN);

	}

	/**
	 * Indicate that the connection was lost and notify the UI Activity.
	 */
	private void connectionLost() {
		// setState(STATE_LISTEN);
		Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":" + "connectionLost()");
		// mState = STATE_LISTEN;
		setState(STATE_LISTEN);
	}

	/**
	 * 本线程试图使传出联系 与设备。它径直穿过连接；或者 成功或失败。
	 */
	private class ConnectThread extends Thread {
		private final BluetoothSocket mmSocket;
		private final BluetoothDevice mmDevice;

		public ConnectThread(BluetoothDevice device) {
			mmDevice = device;
			BluetoothSocket tmp = null;

			// 得到一个bluetoothsocket为与连接
			// 由于蓝牙设备
			try {
				tmp = device.createRfcommSocketToServiceRecord(MY_UUID);
			} catch (IOException e) {
				e.printStackTrace();
			}
			mmSocket = tmp;
		}

		public void run() {
			// Log.i(TAG, "BEGIN mConnectThread");
			Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":" + "ConnectThread start");
			setName("ConnectThread");

			startMonitorThread();

			mBluetoothAdapter.cancelDiscovery();

			try {
				mmSocket.connect();
				Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":" + "mmSocket.connect()");

				connectionSuccess();

				// startSendTestThread();// 发送测试线程
			} catch (IOException e) {
				connectionFailed();
				try {
					mmSocket.close();
				} catch (IOException e2) {
					e.printStackTrace();
				}
				return;
			}

			synchronized (BluetoothService.this) {
				mConnectThread = null;
			}

			connected(mmSocket, mmDevice);
		}

		public void cancel() {
			try {
				mmSocket.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 本线在连接与远程设备。 它处理所有传入和传出的传输。
	 */
	private class ConnectedThread extends Thread {
		private final BluetoothSocket mmSocket;
		private final InputStream mmInStream;
		private final OutputStream mmOutStream;

		public ConnectedThread(BluetoothSocket socket) {

			mmSocket = socket;
			InputStream tmpIn = null;
			OutputStream tmpOut = null;

			// 获得bluetoothsocket输入输出流
			try {
				tmpIn = socket.getInputStream();
				tmpOut = socket.getOutputStream();
			} catch (IOException e) {
				Log.e("tiantan", "没有创建临时sockets", e);
			}

			mmInStream = tmpIn;
			mmOutStream = tmpOut;

		}

		public void run() {
			Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":" + "start ConnectedThread");
			byte[] buffer = new byte[1024];
			int size;
			setState(STATE_CONNECTED);
			// 继续听InputStream同时连接
			while (true) {
				try {
					// 读取输入流

					Thread.sleep(100);
					size = mmInStream.read(buffer);

					if (size > 0 && size <= BT_BUFFER_LENGTH) {
						mLastBTTime = System.currentTimeMillis();
						mPacketListener.onReceived(buffer, size);
					}

				} catch (Exception e) {
					Log.e("tiantan", "disconnected", e);
					connectionLost();
					break;
				}
			}
		}

		/**
		 * 写输出的连接。
		 * 
		 * @param buffer
		 *            这是一个字节流
		 */
		public void write(byte[] buffer) {
			try {

				mmOutStream.write(buffer);
				Log.d("tiantan", "write buffer" + new String(buffer));

				// 分享发送的信息到Activity
			} catch (IOException e) {
				Log.e("tiantan", "Exception during write", e);
			}

		}

		public void cancel() {
			try {
				mmSocket.close();
			} catch (IOException e) {
				Log.e("tiantan", "close() of connect socket failed", e);
			}
		}
	}

	/**
	 * 蓝牙发现线程，配合startDiscovery使用
	 */
	private class DiscoveryThread extends Thread {
		BluetoothAdapter mBtAdapter;

		public DiscoveryThread(BluetoothAdapter bluetoothAdapter) {

			mBtAdapter = bluetoothAdapter;

		}

		public void run() {
			Log.i("tiantan",
					"[data access]" + "-" + "[bluetooth discovery]" + "-" + "[]" + ":" + "discoverthread start!");
			try {
				Thread.sleep(100);

				if (mBtAdapter != null) {
					if (mBtAdapter.isDiscovering()) {
						// mBtAdapter.cancelDiscovery();
					} else {
						mBluetoothAdapter.startDiscovery();
						Log.i("tiantan", "[data access]" + "-" + "[bluetooth discovery]" + "-" + "[]" + ":"
								+ "discover device start!");
					}

					//
					// if (mScanning) {
					// mBtAdapter.stopLeScan(mLeScanCallback);
					// }
					// mBtAdapter.startLeScan(mLeScanCallback);
					// mScanning = true;
					// Log.i("tiantan", "[data access]" + "-" + "[bluetooth
					// discovery]" + "-" + "[]" + ":"
					// + "discover device start!");
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

	}

	/**
	 * 蓝牙发现任务，配合startLeScan使用
	 */
	private class DiscoveryTask extends TimerTask {
		BluetoothAdapter mBtAdapter;

		public DiscoveryTask(BluetoothAdapter bluetoothAdapter) {

			mBtAdapter = bluetoothAdapter;

		}

		public void run() {
			Log.i("tiantan",
					"[data access]" + "-" + "[bluetooth discovery]" + "-" + "[]" + ":" + "discovertask start!");
			try {


				 if (mBtAdapter != null) {

					// if (mScanning) {
					mBtAdapter.stopLeScan(mLeScanCallback);
					// }
					Thread.sleep(100);
					mBtAdapter.startLeScan(mLeScanCallback);
					mScanning = true;
					Log.i("tiantan", "[data access]" + "-" + "[bluetooth discovery]" + "-" + "[]" + ":"
							+ "discover device start!");
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}


		}

	}



	/**
	 * 设置当前状态的聊天连接
	 * 
	 * @param state
	 *            整数定义当前连接状态
	 */
	private synchronized void setState(int state) {

		mState = state;
		Log.d("tiantan", "setState to " + state);
		// 给新状态的处理程序，界面活性可以更新
	}

	/**
	 * 返回当前的连接状态。
	 */
	public synchronized int getState() {
		return mState;
	}

	public synchronized void start() {

		// 取消任何线程试图建立连接
		if (mConnectThread != null) {
			mConnectThread.cancel();
			mConnectThread = null;
		}

		// 取消任何线程正在运行的连接
		if (mConnectedThread != null) {
			mConnectedThread.cancel();
			mConnectedThread = null;
		}

		// 启动线程来听一个bluetoothserversocket
		// if (mAcceptThread == null) {
		// mAcceptThread = new AcceptThread();
		// mAcceptThread.start();
		// }
		// setState(STATE_LISTEN);

		// mState = STATE_LISTEN;

		setState(STATE_LISTEN);
	}

	public synchronized void connect(BluetoothDevice device) {
		Log.d("tiantan", "connect to: " + device);

		// 取消任何线程试图建立连接
		if (getState() == STATE_CONNECTING) {
			if (mConnectThread != null) {
				mConnectThread.cancel();
				mConnectThread = null;
			}
		}

		// 取消任何线程正在运行的连接
		if (mConnectedThread != null) {
			mConnectedThread.cancel();
			mConnectedThread = null;
		}

		// 启动线程连接的设备
		mConnectThread = new ConnectThread(device);
		mConnectThread.start();
		// mState = STATE_CONNECTING;
		setState(STATE_CONNECTING);
	}

	/**
	 * 开始connectedthread开始管理一个蓝牙连接
	 * 
	 * @param bluetoothsocket插座上连接了
	 * @param 设备已连接的蓝牙设备
	 */
	@SuppressWarnings("unused")
	public synchronized void connected(BluetoothSocket socket, BluetoothDevice device) {
		Log.i("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":" + "connected");

		// 取消线程完成连接
		if (mConnectThread != null) {
			mConnectThread.cancel();
			mConnectThread = null;
		}

		// 取消任何线程正在运行的连接
		if (mConnectedThread != null) {
			mConnectedThread.cancel();
			mConnectedThread = null;
		}


		// 启动线程管理连接和传输
		mConnectedThread = new ConnectedThread(socket);
		mConnectedThread.start();

	}

	/**
	 * 停止所有的线程
	 */
	public synchronized void stop() {
		if (mConnectThread != null) {
			mConnectThread.cancel();
			mConnectThread = null;
		}
		if (mConnectedThread != null) {
			mConnectedThread.cancel();
			mConnectedThread = null;
		}

		// mState = STATE_NONE;
		setState(STATE_NONE);
	}

	private void wakeAndUnlock(boolean b) {
		if (b) {
			// 获取电源管理器对象
			pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
			wl = pm.newWakeLock(PowerManager.ACQUIRE_CAUSES_WAKEUP | PowerManager.SCREEN_BRIGHT_WAKE_LOCK, "tiantan");
			// 点亮屏幕
			wl.acquire();
			// 得到键盘锁管理器对象
			km = (KeyguardManager) getSystemService(Context.KEYGUARD_SERVICE);
			kl = km.newKeyguardLock("unLock");
			// 解锁
			kl.disableKeyguard();
		} else {
			// 锁屏
			try {
				if (kl != null) {
					kl.reenableKeyguard();
				}
				// 释放wakeLock，关灯
				if (wl != null) {
					wl.release();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * Write to the ConnectedThread in an unsynchronized manner
	 * 
	 * @param out
	 *            The bytes to write
	 * @see ConnectedThread#write(byte[])
	 */
	public void write(byte[] out) {
		// 创建临时对象
		ConnectedThread r;
		// 同步副本的connectedthread
		synchronized (this) {
			if (mState != STATE_CONNECTED)
				return;
			r = mConnectedThread;
		}
		// 执行写同步
		r.write(out);
	}

	// 控制查房笔
	// redLed 1代表红色LED亮，0代表红色LED灭
	// blueLed 1代表蓝色LED亮，0代表蓝色LED灭
	// beep 1代表振子震动+蜂鸣器响，0代表振子+蜂鸣器不工作

	public boolean controlDev(int redLed, int blueLed, int beep) {
		String header = "$$5B5";
		String reserve = "-";
		String tail = "\r\n";
		String cmd = header + reserve + redLed + blueLed + beep + tail;

		try {
			write(cmd.getBytes("utf-8"));

			Log.i("tiantan",
 "[data access]" + "-" + "[]" + "-" + "[]" + ":" + "send bluetooth msg : " + cmd);

			// Thread.sleep(10000);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return true;
	}

	// 实时监测蓝牙连接状态及数据接收状态
	public void startMonitorThread() {
		if (mMonitorThread == null) {
			mMonitorThread = new Thread(new Runnable() {

				@Override
				public void run() {
					while (m_bt_running == BluetoothService.BT_RUNNING) {
						// 根据目前所处的不同状态进行不同操作

						switch (getState()) {
						case BluetoothService.STATE_NONE:
							initBTDevice(); // 重新初始化蓝牙
							break;
						case BluetoothService.STATE_LISTEN:
							connectBTDevice(); // 重新进行蓝牙连接
							break;
						default:

						}

						long current_time = System.currentTimeMillis();
						// 蓝牙信息显示一段时间之后释放锁
						if ((current_time - BluetoothService.mLastBTTime) > (BluetoothService.BT_VISABLE_TIME * 1000)) {
							wakeAndUnlock(false);
							m_wakeup = false;
							Log.d("tiantan", "[data access]" + "-" + "[bluetooth login]" + "-" + "[]" + ":"
									+ "wakeAndUnlock(false) m_wakeup " + m_wakeup);
						}

						try {
							Thread.sleep(3000);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				}
			});

			mMonitorThread.start();
		}
	}

	// 启动发送数据测试线程
	public void startSendTestThread() {
		if (mSendTestThread == null) {
			mSendTestThread = new Thread(new Runnable() {

				@Override
				public void run() {
					while (m_bt_running == BluetoothService.BT_RUNNING) {
						// 根据目前所处的不同状态进行不同操作



						try {
							// String testString = "510\r\n";
							// write(testString.getBytes("utf-8"));
							controlDev(0, 1, 0);
							Thread.sleep(10000);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			});

			mSendTestThread.start();
		}
	}

	// 该broadcastreceiver监听设备和
	// 变化的标题时，发现完成
	private final BroadcastReceiver mReceiver = new BroadcastReceiver() {
		@Override
		public void onReceive(Context context, Intent intent) {
			String action = intent.getAction();

			// 当发现设备
			if (BluetoothDevice.ACTION_FOUND.equals(action)) {
				// 把蓝牙设备对象的意图
				BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
				String deviceNameStr = device.getName();
				String deviceAddressStr = device.getAddress();
				short rssi = intent.getExtras().getShort(BluetoothDevice.EXTRA_RSSI);
				Log.i("tiantan", "[data access]" + "-" + "[bluetooth discovery]" + "-" + "[]" + ":"
						+ "discover device --- NAME : " + deviceNameStr + " ,ADDRESS : " + deviceAddressStr);
				if (deviceNameStr == null) {
					return;
				}
				if (deviceNameStr.equals(MATCH_NAME)) {

					// current_application.data_manager.updateIncidentTime(deviceAddressStr,
					// "诊疗事件贴片");
					String shebei = deviceAddressStr.replace(":", "");
					Intent incidentIntent = new Intent();
					incidentIntent.putExtra("bt_type", BT_BROADCAST_SHEBEI_ID);
					incidentIntent.putExtra("user_number", shebei);
					incidentIntent.setAction("com.tiantanhehe.mobileemr.BluetoothService");
					sendBroadcast(incidentIntent);
					System.out.println("guojin:"+shebei+":"+rssi);
				}
				

			} else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
				Log.i("tiantan",
						"[data access]" + "-" + "[bluetooth discovery]" + "-" + "[]" + ":" + "discover device finish!");

				if (current_application.appConf.bluetooth_discovery) {
					mDiscoveryThread = new DiscoveryThread(mBluetoothAdapter);
					mDiscoveryThread.start();
				}

		}
		}
	};

	// Device scan callback.
	private BluetoothAdapter.LeScanCallback mLeScanCallback = new BluetoothAdapter.LeScanCallback() {

		@Override
		public void onLeScan(final BluetoothDevice device, int rssi, byte[] scanRecord) {
			String deviceNameStr = device.getName();
			String deviceAddressStr = device.getAddress();
			Log.i("tiantan", "[data access]" + "-" + "[bluetooth discovery]" + "-" + "[]" + ":"
 + "discover device --- NAME : "
							+ deviceNameStr + " ,ADDRESS : " + deviceAddressStr + ",rssi :" + rssi);
			if (deviceNameStr == null) {
				return;
			}

			if (deviceNameStr.equals(MATCH_NAME) && (rssi > BT_DIS_THRETHOLD) ) {

				// current_application.data_manager.updateIncidentTime(deviceAddressStr,
				// "诊疗事件贴片");
				String shebei = deviceAddressStr.replace(":", "");
				Intent incidentIntent = new Intent();
				incidentIntent.putExtra("bt_type", BT_BROADCAST_SHEBEI_ID);
				incidentIntent.putExtra("user_number", shebei);
				incidentIntent.setAction("com.tiantanhehe.mobileemr.BluetoothService");
				sendBroadcast(incidentIntent);
				System.out.println("guojin:" + deviceAddressStr + ":" + rssi);
			}
		}
	};

	// 从Activity接收消息发送service
	public class MsgBinder extends Binder {
		/**
		 * 获取当前Service的实例
		 * 
		 * @return
		 */
		public BluetoothService getService() {
			return BluetoothService.this;
		}
	}


}

interface OnReceivedPacketListener {
	public boolean onReceived(byte[] pktbuff, int size);
}
