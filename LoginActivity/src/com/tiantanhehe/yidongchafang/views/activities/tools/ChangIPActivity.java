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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.utils.SharedPreferencesUtils;
import com.tiantanhehe.yidongchafang.views.activities.LoginActivity;
import com.tiantanhehe.yidongchafang.views.activities.MainActivity;

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
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

public class ChangIPActivity extends Activity {
	private static String TAG = "ChangIPActivity";
	private Button ping_start, ping_stop;
	private static EditText editText_port, editText_ip;
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
	private static int PING_NUM = 10000;
	private int pingCount = PING_NUM;
	private boolean isDestory = false;
	private TextView viewPort;
	private MyHandler mHandler;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_ping_tool);
		InfoView = (TextView) findViewById(R.id.InfoView);
		editText_port = (EditText) findViewById(R.id.editText_port);
		editText_ip = (EditText) findViewById(R.id.editText_ip);
		scrollview = (ScrollView) findViewById(R.id.scrollView);
		ping_start = (Button) findViewById(R.id.ping_start);
		ping_stop = (Button) findViewById(R.id.ping_stop);
		viewPort = (TextView) findViewById(R.id.textView1);
		ping_start.setText("检测");
		ping_stop.setText("保存");
		printer = new Printer();
		printer.start();
		editText_ip.setText(GlobalInfoApplication.getInstance().appConf.server_ip);
		editText_port.setText(GlobalInfoApplication.getInstance().appConf.server_port);
		try {
			connector = new Connector(printer);
		} catch (IOException e) {
			e.printStackTrace();
		}
		connector.start();
		Looper mainLooper = Looper.getMainLooper();
		mHandler = new MyHandler(mainLooper);
		mHandler.removeMessages(0);
		isDestory = false;
		// 修改ip和port 并保存
		ping_stop.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {

				if (!editText_ip.getText().toString().equals("") && !editText_port.getText().toString().equals("")) {
					if (isboollp(editText_ip.getText().toString())) {
						// 将输入的IP存储到SharedPreferences里面
						SharedPreferencesUtils.setParam(ChangIPActivity.this, "ip", editText_ip.getText().toString());
						SharedPreferencesUtils.setParam(ChangIPActivity.this, "port",
								editText_port.getText().toString());


						GlobalInfoApplication.getInstance().resetServerIP(editText_ip.getText().toString(),
								editText_port.getText().toString());

						// 提醒用户 IP 更改正确
						Toast.makeText(ChangIPActivity.this,
								"当前IP为：" + GlobalInfoApplication.getInstance().appConf.server_ip, Toast.LENGTH_SHORT)
								.show();
						Intent intent = new Intent(ChangIPActivity.this, LoginActivity.class);
						startActivity(intent);
					} else {
						Toast.makeText(ChangIPActivity.this, "IP格式不正确", Toast.LENGTH_SHORT).show();
					}
				} else {
					Toast.makeText(ChangIPActivity.this, "IP不能为空", Toast.LENGTH_SHORT).show();
				}

			}
		});
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

	public void startToPing(View view) {
		resetPingCount();
		isStop = false;
		InfoView.setText("");
		host = editText_ip.getText().toString();
		if (host == "" || host.isEmpty()) {
			host = (String) editText_ip.getHint();
		}
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

	// 正则表达式：判断IP输入格式正确
	public boolean isboollp(String ipAddress) {

		String ip = "(2[5][0-5]|2[0-4]\\d|1\\d{2}|\\d{1,2})\\.(25[0-5]|2[0-4]\\d|1\\d{2}|\\d{1,2})\\.(25[0-5]|2[0-4]\\d|1\\d{2}|\\d{1,2})\\.(25[0-5]|2[0-4]\\d|1\\d{2}|\\d{1,2})";
		Pattern pattern = Pattern.compile(ip);
		Matcher matcher = pattern.matcher(ipAddress);
		return matcher.matches();

	}

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
						t.channel.register(sel, SelectionKey.OP_CONNECT, t);
					} catch (IOException x) {
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

	public class MyHandler extends Handler {
		public MyHandler(Looper looper) {
			super(looper);
		}

		@Override
		public void handleMessage(Message msg) {

			Spanned temp = null;
			if (msg.obj.toString() == "Timed out" || "Timed out".equals(msg.obj.toString())) {
				temp = Html.fromHtml(
						"来自" + host + "的回复 ttl=" + "<font color=\"#ff0000\">" + msg.obj.toString() + "</font>");
			} else {
				temp = Html.fromHtml(
						"来自" + host + "的回复 ttl=" + "<font color=\"#00FF00\">" + msg.obj.toString() + "</font>");
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
				address = new InetSocketAddress(InetAddress.getByName(host), port);
			} catch (IOException x) {
				failure = x;
			}
		}

		synchronized void show() {
			if (shown) {
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
				if (channel != null) {
					channel.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (event.getKeyCode() == KeyEvent.KEYCODE_BACK) {
			if (event.getAction() == KeyEvent.ACTION_DOWN && event.getRepeatCount() == 0) {
				finish();
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
