package com.tiantanhehe.yidongchafang.utils;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.listener.SimpleImageLoadingListener;
import com.tiantanhehe.yidongchafang.R;

import android.graphics.Bitmap;
import android.graphics.Bitmap.Config;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff.Mode;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.graphics.RectF;
import android.os.StrictMode;
import android.view.View;
import android.widget.ImageView;

public class DataZhuanhuan {
	// 将json 数组转换为Map 对象
	public static Map<String, Object> getMap(String jsonString) {
		JSONObject jsonObject;
		try {
			jsonObject = new JSONObject(jsonString);
			@SuppressWarnings("unchecked")
			Iterator<String> keyIter = jsonObject.keys();
			String key;
			Object value;
			Map<String, Object> valueMap = new HashMap<String, Object>();
			while (keyIter.hasNext()) {
				key = keyIter.next();
				value = jsonObject.get(key);
				if (value.toString() == "null") {
					valueMap.put(key, " ");
				} else {
					valueMap.put(key, value);
				}

				}
			return valueMap;
		} catch (JSONException e) {
			e.printStackTrace();
			}
		return null;
		}

	// 把json 转换为 ArrayList 形式
	public static List<Map<String, Object>> getList(String jsonString) {
		List<Map<String, Object>> list = null;
		try {
			JSONArray jsonArray = new JSONArray(jsonString);
			JSONObject jsonObject;
			list = new ArrayList<Map<String, Object>>();
			for (int i = 0; i < jsonArray.length(); i++) {
				jsonObject = jsonArray.getJSONObject(i);
				list.add(getMap(jsonObject.toString()));
			}
		} catch (Exception e) {
			e.printStackTrace();
			}
		return list;
		}

	// 返回图片对象转换
	public static Bitmap returnBitMap(String imgurl) {
		StrictMode.setThreadPolicy(
				new StrictMode.ThreadPolicy.Builder().detectDiskReads().detectDiskWrites().detectNetwork() // 这里可以替换为detectAll()
																											// 就包括了磁盘读写和网络I/O
						.penaltyLog() // 打印logcat，当然也可以定位到dropbox，通过文件保存相应的log
						.build());
		StrictMode.setVmPolicy(new StrictMode.VmPolicy.Builder().detectLeakedSqlLiteObjects() // 探测SQLite数据库操作
				.penaltyLog() // 打印logcat
				.penaltyDeath().build());
		URL myFileUrl = null;
		Bitmap bitmap = null;
		try {
			myFileUrl = new URL(imgurl);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		try {
			HttpURLConnection conn = (HttpURLConnection) myFileUrl.openConnection();
			conn.setDoInput(true);
			conn.connect();
			InputStream is = conn.getInputStream();
			bitmap = BitmapFactory.decodeStream(is);
			is.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return bitmap;
		}

	public static Bitmap toRoundCorner(Bitmap bitmap, float pixels) {
		Bitmap output = Bitmap.createBitmap(bitmap.getWidth(), bitmap.getHeight(), Config.ARGB_8888);
		Canvas canvas = new Canvas(output);

		final int color = 0xff424242;
		final Paint paint = new Paint();
		final Rect rect = new Rect(0, 0, bitmap.getWidth(), bitmap.getHeight());
		final RectF rectF = new RectF(rect);
		final float roundPx = pixels;

		paint.setAntiAlias(true);
		canvas.drawARGB(0, 0, 0, 0);

		paint.setColor(color);
		canvas.drawRoundRect(rectF, roundPx, roundPx, paint);
		paint.setXfermode(new PorterDuffXfermode(Mode.SRC_IN));
		canvas.drawBitmap(bitmap, rect, rect, paint);
		return output;
		}

	public String getData(String url) {
		String strResult = "";
		HttpGet httpRequest = new HttpGet(url);
		HttpResponse httpResponse;
		try {
			httpResponse = new DefaultHttpClient().execute(httpRequest);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String tempResult = EntityUtils.toString(httpResponse.getEntity());
				JSONObject jsonObject = new JSONObject(tempResult);
				int json_type = jsonObject.getInt("staus");
				if (json_type == 1) {
					strResult = jsonObject.get("result").toString();
				}
				}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			}
		return strResult;
		}



	// 异步加载网络图像
	public static void getImages(String url, ImageView imageView) {
		// 显示图片的配置
		DisplayImageOptions options = new DisplayImageOptions.Builder().showImageOnLoading(R.drawable.ic_launcher)
				.showImageOnFail(R.drawable.ic_launcher).cacheInMemory(true).cacheOnDisk(true)
				.bitmapConfig(Bitmap.Config.RGB_565).build();

		ImageLoader.getInstance().displayImage(url, imageView, options);
	}

	// 异步加载网络图像并切割成圆角
	public static void getYuanjiaoImages(String url, final ImageView imageView, float jiaodu, View view) {
		ImageLoader.getInstance().loadImage(url, new SimpleImageLoadingListener() {
			@Override
			public void onLoadingComplete(String imageUri, View view, Bitmap loadedImage) {
				super.onLoadingComplete(imageUri, view, loadedImage);
				Bitmap aa = DataZhuanhuan.toRoundCorner(loadedImage, 90);
				imageView.setImageBitmap(aa);
			}

		});
		}
	
}
