package com.tiantanhehe.yidongchafang.common.appupdate;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.R;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.widget.Toast;

public class AppUpdate extends Activity {
	protected static final int UPDATA_CLIENT = 1;
	protected static final int GET_UNDATAINFO_ERROR = 0;
	protected static final int DOWN_ERROR = 2;
	String versionname; // 版本号
	Context context;
	HashMap<String, String> mHashMap;
	public GlobalInfoApplication current_application;

	// @Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
	}

	public AppUpdate(Context context) {
		this.context = context;
		current_application = (GlobalInfoApplication) context
				.getApplicationContext();
	}

	public void checkUpdataApp() {
		try {
			versionname = getVersionName();
		} catch (Exception e) {
			e.printStackTrace();
		}
		new Thread(new MyThread()).start();
	}

	// 获取当前程序的版本号
	public String getVersionName() throws Exception {
		PackageManager packageManager = context.getPackageManager(); // 获取packagemanager的实例
		// getPackageName()是你当前类的包名，0代表是获取版本信息
		PackageInfo packInfo = packageManager.getPackageInfo(
				context.getPackageName(), 0);
		this.current_application.appConf.versionName = packInfo.versionName;
		return packInfo.versionName;
	}

	public static File getFileFromServer(String path, ProgressDialog pd)
			throws Exception {
		// 如果相等的话表示当前的sdcard挂载在手机上并且是可用的
		if (Environment.getExternalStorageState().equals(
				Environment.MEDIA_MOUNTED)) {
			URL url = new URL(path);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setConnectTimeout(5000);
			// 获取到文件的大小
			pd.setMax(conn.getContentLength());
			InputStream is = conn.getInputStream();
			File file = new File(Environment.getExternalStorageDirectory(),
					"updata.apk");
			FileOutputStream fos = new FileOutputStream(file);
			BufferedInputStream bis = new BufferedInputStream(is);
			byte[] buffer = new byte[1024];
			int len;
			int total = 0;
			while ((len = bis.read(buffer)) != -1) {
				fos.write(buffer, 0, len);
				total += len;
				// 获取当前下载量
				pd.setProgress(total);
			}
			fos.close();
			bis.close();
			is.close();
			return file;
		} else {
			return null;
		}
	}

	// 显示是否更新的弹窗
	protected void showUpdataDialog() {
		new AlertDialog.Builder(context)
				.setTitle(
						context.getResources()
								.getString(R.string.banbenshengji))
				// "版本升级"
				.setMessage(mHashMap.get("description").toString())
				.setIcon(R.drawable.ic_launcher)
				.setPositiveButton(
						context.getResources().getString(R.string.queren),
						new DialogInterface.OnClickListener() {// "确认"
							public void onClick(DialogInterface dialog,
									int whichButton) {
								downLoadApk();
							}
						})
				.setNegativeButton(
						context.getResources().getString(R.string.quxiao_but),
						new DialogInterface.OnClickListener() {// "取消"
							public void onClick(DialogInterface dialog,
									int whichButton) {

							}
						}).show();
	}

	// 开始下载APP
	protected void downLoadApk() {
		final ProgressDialog pd; // 进度条对话框
		pd = new ProgressDialog(context);
		pd.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
		pd.setMessage(context.getResources().getString(R.string.xiazaigengxin));// "正在下载更新"
		pd.show();
		new Thread() {
			@Override
			public void run() {
				try {
					File file = AppUpdate.getFileFromServer(mHashMap.get("url")
							.toString(), pd);
					sleep(1500);
					installApk(file);
					pd.dismiss(); // 结束掉进度条对话框
				} catch (Exception e) {
					Message msg = new Message();
					msg.what = DOWN_ERROR;
					handler.sendMessage(msg);
					e.printStackTrace();
				}
			}
		}.start();
	}

	// 安装apk
	protected void installApk(File file) {
		Intent intent = new Intent();
		// 执行动作
		intent.setAction(Intent.ACTION_VIEW);
		// 执行的数据类型
		intent.setDataAndType(Uri.fromFile(file),
				"application/vnd.android.package-archive");
		// 删除原有的数据库,再次重新启动时重新创建数据库
		context.deleteDatabase(current_application.appConf.database_name);
		context.startActivity(intent);
	}

	// 解析XML文件
	public HashMap<String, String> parseXml(InputStream inStream)
			throws Exception {
		HashMap<String, String> hashMap = new HashMap<String, String>();

		// 实例化一个文档构建器工厂
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		// 通过文档构建器工厂获取一个文档构建器
		DocumentBuilder builder = factory.newDocumentBuilder();
		// 通过文档通过文档构建器构建一个文档实例
		Document document = builder.parse(inStream);
		// 获取XML文件根节点
		Element root = document.getDocumentElement();
		// 获得所有子节点
		NodeList childNodes = root.getChildNodes();
		for (int j = 0; j < childNodes.getLength(); j++) {
			// 遍历子节点
			Node childNode = (Node) childNodes.item(j);
			if (childNode.getNodeType() == Node.ELEMENT_NODE) {
				Element childElement = (Element) childNode;
				// 版本号
				if ("version".equals(childElement.getNodeName())) {
					hashMap.put("version", childElement.getFirstChild()
							.getNodeValue());
				}
				// 软件名称
				else if (("description".equals(childElement.getNodeName()))) {
					hashMap.put("description", childElement.getFirstChild()
							.getNodeValue());
				}
				// 下载地址
				else if (("url".equals(childElement.getNodeName()))) {
					hashMap.put("url", childElement.getFirstChild()
							.getNodeValue());
				}
			}
		}
		return hashMap;
	}

	@SuppressLint("HandlerLeak")
	Handler handler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			// TODO Auto-generated method stub
			super.handleMessage(msg);
			switch (msg.what) {
			case UPDATA_CLIENT:
				// 对话框通知用户升级程序
				showUpdataDialog();
				break;
			case GET_UNDATAINFO_ERROR:
				// 服务器超时
				// Toast.makeText(context, "获取服务器更新信息失败",
				// Toast.LENGTH_SHORT).show();
				break;
			case DOWN_ERROR:
				// 下载失败
				Toast.makeText(
						context,
						context.getResources()
								.getString(R.string.xiazaigengxin),
 Toast.LENGTH_SHORT)
						.show();// "APP文件更新失败"
				break;
			}
		}
	};

	public class MyThread implements Runnable {
		@Override
		public void run() {
			try {
				String path = context.getResources().getString(
R.string.serverurl); // 从资源文件获取服务器
																					// 地址
				URL url = new URL(current_application.appConf.remote_app_url + path); // 包装成url的对象
				HttpURLConnection conn = (HttpURLConnection) url
						.openConnection();
				conn.setConnectTimeout(5000);
				InputStream is = conn.getInputStream();
				mHashMap = parseXml(is);
				if (mHashMap.get("version").toString().equals(versionname)) {
					return;
				} else {
					Message msg = new Message();
					msg.what = UPDATA_CLIENT;
					handler.sendMessage(msg);
				}
			} catch (Exception e) {
				Message msg = new Message();
				msg.what = GET_UNDATAINFO_ERROR;
				handler.sendMessage(msg);
				e.printStackTrace();
			}
		}
	}
}
