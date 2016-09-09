/**
 * Project Name:MobileEMR
 * File Name:PingTools.java
 * Package Name:com.tiantanhehe.mobileemr.tools
 * Date:2015-8-14下午6:57:35
 * Copyright (c) 2015, tiantan All Rights Reserved.
 */

package com.tiantanhehe.yidongchafang.views.activities.tools;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.views.activities.MainActivity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.text.Html;
import android.text.Spanned;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ScrollView;
import android.widget.TextView;

/**
 * ClassName:PingTools <br/>
 * Desc: ping 工具，主要测试网络状况 <br/>
 * Date: 2015-8-14 下午6:57:35 <br/>
 * 
 * @author wuwenlong
 * @since JDK 1.6
 * @see
 */
@SuppressLint("NewApi")
public class PingToolsActivity extends Activity {

	private Button ping_start, ping_stop;
	private EditText editText_port, editText_ip;
	private ScrollView scrollview;
	private TextView InfoView;
	private static int DAYTIME_PORT = 80;
	private int port = 80;
	private String host = "";
	private Printer printer;
	Connector connector = null;
	TargetKiller targetKiller = null;
	private boolean isStop = false;
	private final ConcurrentLinkedQueue<Target> targets = new ConcurrentLinkedQueue<Target>();
	private GlobalInfoApplication current_application;
	private static int PING_NUM = 10000;
	private int pingCount = PING_NUM;
	private boolean isDestory = false;

	private MyHandler mHandler;

	// private EditText
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_ping_tool);
		InfoView = (TextView) this.findViewById(R.id.InfoView);
		editText_port = (EditText) this.findViewById(R.id.editText_port);
		editText_ip = (EditText) this.findViewById(R.id.editText_ip);
		scrollview = (ScrollView) this.findViewById(R.id.scrollView);
		current_application = GlobalInfoApplication.getInstance();
		editText_ip.setText(GlobalInfoApplication.getInstance().appConf.server_ip);
		printer = new Printer();
		printer.start();
		try {
			connector = new Connector(printer);
		} catch (IOException e) {
			e.printStackTrace();
		}
		connector.start();
		Looper mainLooper = Looper.getMainLooper();
		mHandler = new MyHandler(mainLooper);
		mHandler.removeMessages(0);
		// targetKiller = new TargetKiller();
		isDestory = false;
		// targetKiller.start();
	}

	@Override
	protected void onDestroy() {
		connector.shutdown();
		isDestory = true;
		printer.interrupt();
		super.onDestroy();
	}
	
	private void triggerOne() {
		if (pingCount > 0 && !isDestory) {
			Target t = new Target(host, pingCount);
			targets.add(t);
			connector.add(t);
			pingCount--;
		} else {
			isStop = true;
		}
	}
	
	private void resetPingCount() {
		this.pingCount = PING_NUM;
	}

	@SuppressLint("ResourceAsColor")
	public void startToPing(View view) {
		resetPingCount();
		isStop = false;
		InfoView.setText("");
		host = editText_ip.getText().toString();
		if (host == "" || host.isEmpty()) {
			host = (String) editText_ip.getHint();
		}
		//
		String port_str = editText_port.getText().toString();
		if (port_str == "" || port_str.isEmpty()) {
			port_str = (String) editText_port.getHint();
		}
		if (port_str == "" || port_str.isEmpty()) {
			port_str = "80";
		}
		port = Integer.parseInt(port_str);

		triggerOne();

	}
	
	public void stopToPing(View view) {
		isStop = true;
	}

	// Thread for printing targets as they're heard from
	//
	static class Printer extends Thread {
		LinkedList pending = new LinkedList();

		Printer() {
			setName("Printer");
			setDaemon(true);
		}

		void add(Target t) {
			synchronized (pending) {
				pending.add(t);
				pending.notify();
				}
			}

		@Override
		public void run() {
			try {
				for (;;) {
					Target t = null;
					synchronized (pending) {
						while (pending.size() == 0)
							pending.wait();
						t = (Target) pending.removeFirst();
					}
					t.show();
					}
			} catch (InterruptedException x) {
				return;
				}
			}

		}

	class TargetKiller extends Thread {
		boolean shutdown = false;

		void shutdown() {
			shutdown = true;
		}
		@Override
		public void run() {
			for (;;) {
				if (!targets.isEmpty()) {
					for (Iterator i = targets.iterator(); i.hasNext();) {
						 Target t = (Target) i.next();
					if ((System.currentTimeMillis() - t.connectStart) > 2000) {
						if (!t.shown)
							t.show();
						i.remove();
					}
					}
				}

				if (shutdown) {
						return;
					}
			}
		}
	}

	// Thread for connecting to all targets in parallel via a single selector
	//
	static class Connector extends Thread {
		Selector sel;
		Printer printer;

		// List of pending targets. We use this list because if we try to
		// register a channel with the selector while the connector thread is
		// blocked in the selector then we will block.
		//
		LinkedList pending = new LinkedList();

		Connector(Printer pr) throws IOException {
			printer = pr;
			sel = Selector.open();
			setName("Connector");
		}

		// Initiate a connection sequence to the given target and add the
		// target to the pending-target list
		//
		void add(Target t) {
			SocketChannel sc = null;
				try {

				// Open the channel, set it to non-blocking, initiate connect
				sc = SocketChannel.open();
				sc.configureBlocking(false);

				boolean connected = sc.connect(t.address);

				// Record the time we started
				t.channel = sc;
				t.connectStart = System.currentTimeMillis();

				if (connected) {
					t.connectFinish = t.connectStart;
						sc.close();
						printer.add(t);
				} else {
					// Add the new channel to the pending list
					synchronized (pending) {
						pending.add(t);
					}

					// Nudge the selector so that it will process the pending
					// list
					sel.wakeup();
					}
				} catch (IOException x) {
				if (sc != null) {
					try {
						sc.close();
					} catch (IOException xx) {
					}
				}
					t.failure = x;
					printer.add(t);
				}
			}


		void processPendingTargets() throws IOException {
			synchronized (pending) {
				while (pending.size() > 0) {
					Target t = (Target) pending.removeFirst();
					try {

						// Register the channel with the selector, indicating
						// interest in connection completion and attaching the
						// target object so that we can get the target back
						// after the key is added to the selector's
						// selected-key set
						t.channel.register(sel, SelectionKey.OP_CONNECT, t);
						// Timer timer = new Timer();
						// timer.schedule(new CloseConTask(t), 4000);

					} catch (IOException x) {

						// Something went wrong, so close the channel and
						// record the failure
						t.channel.close();
						t.failure = x;
						printer.add(t);

					}

					}
				}
			}

		// Process keys that have become selected
		void processSelectedKeys() throws IOException {
			for (Iterator i = sel.selectedKeys().iterator(); i.hasNext();) {

				// Retrieve the next key and remove it from the set
				SelectionKey sk = (SelectionKey) i.next();
				i.remove();

				// Retrieve the target and the channel
				Target t = (Target) sk.attachment();
				SocketChannel sc = (SocketChannel) sk.channel();

				// Attempt to complete the connection sequence
				try {
					if (sc.finishConnect()) {
						sk.cancel();
						t.connectFinish = System.currentTimeMillis();
						sc.close();
						printer.add(t);
					}
				} catch (IOException x) {
					sc.close();
					t.failure = x;
					printer.add(t);
				}
			}
		}

		volatile boolean shutdown = false;

		// Invoked by the main thread when it's time to shut down
		void shutdown() {
			shutdown = true;
			sel.wakeup();
			}

		// Connector loop
		@Override
		public void run() {
				for (;;) {
				try {
					int n = sel.select();
					if (n > 0)
						processSelectedKeys();
					processPendingTargets();
					if (shutdown) {
						sel.close();
						return;
					}
				} catch (IOException x) {
					x.printStackTrace();
					}
				}
			}
		}

	private class MyHandler extends Handler {
		public MyHandler(Looper looper) {
			super(looper);
		}

		@Override
		public void handleMessage(Message msg) {

			Spanned temp = null;
			if(msg.obj.toString() == "Timed out" || "Timed out".equals(msg.obj.toString())){
				temp = Html
.fromHtml(
						"来自" + host + "的回复 ttl="
						+ "<font color=\"#ff0000\">" + msg.obj.toString()
						+ "</font>");
			} else {
				temp = Html.fromHtml(
						"来自" + host + "的回复 ttl="
						+ "<font color=\"#00FF00\">" + msg.obj.toString()
						+ "</font>");
			}
			InfoView.append(temp);
			InfoView.append("\n");
			scrollview.fullScroll(ScrollView.FOCUS_DOWN);
			try {
				if (!isStop) {
					Thread.sleep(500);
					triggerOne();
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * Target wuwenlong 2015-8-14 下午7:45:49<br>
	 * 封装一次ping操作
	 * 
	 * @version 1.0.0
	 */
	class Target {

		InetSocketAddress address;
		SocketChannel channel;
		Exception failure;
		long connectStart;
		long connectFinish = 0;
		boolean shown = false;
		String name = "";

		Target(String host, int num) {
			this.name = "target:" + num;
			try {
				address = new InetSocketAddress(InetAddress.getByName(host),
						port);
			} catch (IOException x) {
				failure = x;
			}
		}

		synchronized void show() {
			if(shown){
				return;
			}
			shown = true;
			String result;
			if (connectFinish != 0)
				result = Long.toString(connectFinish - connectStart) + "ms";
			else
				result = "Timed out";
			Message m = mHandler.obtainMessage(1, 1, 1, result);
			mHandler.sendMessage(m);
			try {
				channel.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (event.getKeyCode() == KeyEvent.KEYCODE_BACK) {
			if (event.getAction() == KeyEvent.ACTION_DOWN
					&& event.getRepeatCount() == 0) {
				goMain();
			}

			return true;
		}
		return super.onKeyDown(keyCode, event);
	}

	public void goMain() {
		Intent intent = new Intent(this, MainActivity.class);
		finish();
		startActivity(intent);
		overridePendingTransition(android.R.anim.slide_in_left, android.R.anim.slide_out_right);
	}

}

