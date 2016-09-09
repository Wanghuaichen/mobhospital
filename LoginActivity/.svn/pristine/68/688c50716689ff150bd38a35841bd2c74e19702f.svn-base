/**
 * Created at 2015年12月3日.
 * Info:日期工具类，多媒体工具类，提供照片、录像、录音等的本地保存、加载以及上传
 * Tiantanhehe (C)2011-3011 Tiantanhehe
 * Author huke <husthuke@163.com>
 */

package com.tiantanhehe.yidongchafang.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.views.activities.TiantanActivity;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListAdapter;
import android.widget.ListView;

public class MediaUtil {

	public static final String UPLOAD_PHOTO_ERROR = "error";
	public static final String UPLOAD_PHOTO_SUCCESS = "success";
	public static final String DOWNLOAD_PHOTO_ERROR = "error";
	public static final String DOWNLOAD_PHOTO_SUCCESS = "success";

	public static final String PHOTO_PATH_PREFIX = Environment.getExternalStorageDirectory().getPath() + File.separator
			+ "tiantan" + File.separator;
	public static final String VEDIO_PATH_PREFIX = Environment.getExternalStorageDirectory().getPath() + File.separator
			+ "tiantan" + File.separator;
	public static final String AUDIO_PATH_PREFIX = Environment.getExternalStorageDirectory().getPath() + File.separator
			+ "tiantan" + File.separator;
	public static final String MEDIA_PATH_PREFIX = Environment.getExternalStorageDirectory().getPath() + File.separator
			+ "tiantan" + File.separator;
	public static final String NOTE_PATH_PREFIX = Environment.getExternalStorageDirectory().getPath() + File.separator
			+ "tiantan" + File.separator;
	public static final String CACHE_PATH_PREFIX = TiantanActivity.TIANTAN_TMP_PATH;

	public static final int LOCAL_MEDIA = 1;
	public static final int NETWORK_MEDIA = 2;

	public static void saveLocalPhoto(Bitmap photo, String uid, String photoTime) {
		// TODO Auto-generated method stub

		String path = PHOTO_PATH_PREFIX + uid + File.separator;
		File photoPath = new File(path);
		if (!photoPath.exists()) {
			photoPath.mkdir();
		}
		Log.d("tiantan", "保存的文件路径：" + path);

		try {
			File photoFile = new File(photoPath, photoTime + ".jpeg");
			if (!photoFile.exists()) {
				photoFile.createNewFile();
			}

			FileOutputStream fOut = new FileOutputStream(photoFile);
			photo.compress(Bitmap.CompressFormat.JPEG, 100, fOut);
			fOut.flush();
			fOut.close();
			Log.d("tiantan", "保存文件至本地");

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public static String savePhotoToSDCard(Bitmap photo, String uid, String photoTime) {
		// TODO Auto-generated method stub
		String result = null;
		String path = PHOTO_PATH_PREFIX + uid + File.separator;
		File photoPath = new File(path);
		if (!photoPath.exists()) {
			photoPath.mkdir();
		}
		Log.d("tiantan", "保存的文件路径：" + path);

		try {
			result = path + photoTime + ".jpeg";
			File photoFile = new File(result);
			if (!photoFile.exists()) {
				photoFile.createNewFile();
			}

			FileOutputStream fOut = new FileOutputStream(photoFile);
			photo.compress(Bitmap.CompressFormat.JPEG, 100, fOut);
			fOut.flush();
			fOut.close();
			Log.d("tiantan", "保存文件至本地");

		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;

	}

	public static void saveCachePhoto(Bitmap photo, String uid, String photoTime) {
		// TODO Auto-generated method stub
		String tmpPath = CACHE_PATH_PREFIX;
		File tmpFile = new File(tmpPath);
		if (!tmpFile.exists()) {
			tmpFile.mkdir();
		}

		String path = CACHE_PATH_PREFIX + uid + File.separator;
		File photoPath = new File(path);
		if (!photoPath.exists()) {
			photoPath.mkdir();
		}
		Log.d("tiantan", "保存的文件路径：" + path);

		FileOutputStream fOut = null;

		try {
			File photoFile = new File(photoPath, photoTime + ".jpeg");
			if (!photoFile.exists()) {
				photoFile.createNewFile();
			} else {
				return;
			}

			fOut = new FileOutputStream(photoFile);
			photo.compress(Bitmap.CompressFormat.JPEG, 100, fOut);
			fOut.flush();

			Log.d("tiantan", "保存文件至本地");

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (fOut != null) {
				try {
					fOut.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

	}

	public static Bitmap loadCachePhoto(String uid, String photoTime) {
		Bitmap bitmap = null;
		String path = CACHE_PATH_PREFIX + uid + File.separator + photoTime + ".jpeg";
		File photoFile = new File(path);
		if (!photoFile.exists()) {
			return null;
		}
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(photoFile);
			bitmap = BitmapFactory.decodeStream(fis);
			// bitmap = formatPhoto(BitmapFactory.decodeStream(fis));
			fis.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			try {
				fis.close();
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		return bitmap;
	}

	public static String saveLocalVedio(Uri uri, String uid, String VedioTime) {
		// TODO Auto-generated method stub

		if (uri == null) {
			return null;
		}
		String strVideoPath = "";
		String savedVedioPath = null;
		// Cursor cursor =
		// GlobalInfoApplication.getInstance().getApplicationContext().getContentResolver().query(uri,
		// null, null, null, null);
		// if (cursor.moveToNext()) {
		// strVideoPath = cursor.getString(cursor.getColumnIndex("_data"));
		//
		// }
		// cursor.close();

		strVideoPath = GetPathFromUri4kitkat.getPath(GlobalInfoApplication.getInstance().getApplicationContext(), uri);
		File originalFile = new File(strVideoPath);
		long length = originalFile.length();
		Log.d("tiantan", "保存的文件长度：" + length);

		String path = VEDIO_PATH_PREFIX + uid + File.separator;
		File vedioPath = new File(path);
		if (!vedioPath.exists()) {
			vedioPath.mkdir();
		}
		Log.d("tiantan", "保存的文件路径：" + path);

		try {
			File vedioFile = new File(vedioPath, VedioTime + ".3gp");
			if (!vedioFile.exists()) {
				vedioFile.createNewFile();
			}

			boolean result = originalFile.renameTo(vedioFile);
			Log.d("tiantan", "文件本地转存结果：" + result);
			if (result) {
				savedVedioPath = vedioFile.getPath();
			} else {

				result = FileUtil.copyFile(strVideoPath, path + VedioTime + ".3gp");
				savedVedioPath = vedioFile.getPath();
				Log.d("tiantan", "文件本地复制结果：" + result);
				if (!result) {
					vedioFile.delete();
				}
			}

		} catch (Exception e) {
			e.printStackTrace();

		}
		return savedVedioPath;

	}

	public static String saveLocalVedioAudio(byte[] bytes, String uid, String VedioTime, String type) {
		if (bytes == null) {
			return null;
		}

		String path = VEDIO_PATH_PREFIX + uid + File.separator;
		File vedioPath = new File(path);
		if (!vedioPath.exists()) {
			vedioPath.mkdir();
		}
		Log.d("tiantan", "保存的文件路径：" + path);

		String savedVedioPath = "";
		if (type.equals("vedio")) {
			savedVedioPath = path + VedioTime + ".3gp";
		} else if (type.equals("audio")) {
			savedVedioPath = path + VedioTime + ".amr";
		}
		try {
			FileOutputStream fos = new FileOutputStream(savedVedioPath);
			fos.write(bytes);
			fos.flush();
			fos.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return savedVedioPath;

	}

	public static void saveLocalPhoto(Map<String, Object> map, String uid) {
		if (map == null) {
			return;
		}
		if (map.get("report_img") == null || map.get("report_time") == null) {
			return;
		}
		saveLocalPhoto((Bitmap) map.get("report_img"), uid, (String) map.get("report_time"));
	}

	public static String saveLocalAudio(Uri uri, String jianyan_id, String AudioTime) {
		if (uri == null) {
			return null;
		}
		String strVideoPath = "";
		String savedVedioPath = null;
		// Cursor cursor =
		// GlobalInfoApplication.getContext().getContentResolver().query(uri,
		// null, null, null, null);
		// if (cursor.moveToNext()) {
		// strVideoPath = cursor.getString(cursor.getColumnIndex("_data"));
		//
		// }
		// cursor.close();

		strVideoPath = GetPathFromUri4kitkat.getPath(GlobalInfoApplication.getInstance().getApplicationContext(), uri);
		File originalFile = new File(strVideoPath);

		String path = AUDIO_PATH_PREFIX + jianyan_id + File.separator;
		File vedioPath = new File(path);
		if (!vedioPath.exists()) {
			vedioPath.mkdir();
		}
		Log.d("tiantan", "保存的文件路径：" + path);

		try {
			File vedioFile = new File(vedioPath, AudioTime + ".amr");
			if (!vedioFile.exists()) {
				vedioFile.createNewFile();
			}

			boolean result = originalFile.renameTo(vedioFile);
			Log.d("tiantan", "文件本地保存结果：" + result);
			if (result) {
				savedVedioPath = vedioFile.getPath();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return savedVedioPath;

	}

	public static List<Map<String, Object>> loadLocalPhotos(String uid) {
		// TODO Auto-generated method stub
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		// GlobalInfoApplication.getContext().getFilesDir().getAbsolutePath()
		String path = PHOTO_PATH_PREFIX + uid + File.separator;
		File photoPath = new File(path);
		if (photoPath.isDirectory()) {
			File[] files = photoPath.listFiles();
			if (null == files) {
				return listData;
			}

			for (int i = 0; i < files.length; i++) {
				try {

					String photoname = files[i].getName();
					if (photoname.endsWith("jpeg")) {
						FileInputStream fis = new FileInputStream(files[i]);
						Bitmap bitmap = formatPhoto(BitmapFactory.decodeStream(fis));
						Log.d("tiantan", "载入文件名：" + photoname);
						Map<String, Object> map = new HashMap<String, Object>();
						map.put("report_img", bitmap);
						String phototime = photoname.substring(0, 19);
						map.put("report_time", phototime);
						map.put("report_type", "photo");
						listData.add(0, map);
						fis.close();
					}

				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}

		return listData;
	}

	public static List<Map<String, Object>> loadLocalPhotoNames(String uid) {
		// TODO Auto-generated method stub
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		String path = PHOTO_PATH_PREFIX + uid + File.separator;
		File photoPath = new File(path);
		if (photoPath.isDirectory()) {
			File[] files = photoPath.listFiles();
			if (null == files) {
				return listData;
			}

			for (int i = 0; i < files.length; i++) {
				try {

					String photoname = files[i].getName();
					if (photoname.endsWith("jpeg")) {
						FileInputStream fis = new FileInputStream(files[i]);
						// Bitmap bitmap =
						// formatPhoto(BitmapFactory.decodeStream(fis));
						Log.d("tiantan", "载入文件名：" + photoname);
						Map<String, Object> map = new HashMap<String, Object>();
						map.put("report_path", path + photoname);
						String phototime = photoname.substring(0, 19);
						map.put("report_time", phototime);
						map.put("report_type", "photo");
						listData.add(0, map);
						fis.close();
					}

				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}

		return listData;
	}

	public static List<String> loadLocalMediaName(String uid) {
		// TODO Auto-generated method stub
		List<String> listData = new ArrayList<String>();
		// GlobalInfoApplication.getContext().getFilesDir().getAbsolutePath()
		String path = MEDIA_PATH_PREFIX + uid + File.separator;
		File photoPath = new File(path);
		if (photoPath.isDirectory()) {
			File[] files = photoPath.listFiles();
			if (null == files) {
				return listData;
			}

			for (int i = 0; i < files.length; i++) {
				String photoname = files[i].getName();
				listData.add(photoname);
			}
		}

		return listData;
	}

	public static List<Map<String, Object>> loadLocalVedioAudio(String uid) {
		// TODO Auto-generated method stub
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		String path = VEDIO_PATH_PREFIX + uid + File.separator;
		File photoPath = new File(path);
		if (photoPath.isDirectory()) {
			File[] files = photoPath.listFiles();
			if (null == files) {
				return listData;
			}

			for (int i = 0; i < files.length; i++) {
				String vedioaudioname = files[i].getName();
				if (vedioaudioname.endsWith(".3gp") || vedioaudioname.endsWith(".amr")) {

					Log.d("tiantan", "载入文件名：" + vedioaudioname);
					Map<String, Object> map = new HashMap<String, Object>();
					String vedioaudiotime = vedioaudioname.substring(0, 19);
					map.put("report_time", vedioaudiotime);
					if (vedioaudioname.endsWith(".3gp")) {
						map.put("report_type", "vedio");
					} else if (vedioaudioname.endsWith(".amr")) {
						map.put("report_type", "audio");
					} else {
						//
					}

					listData.add(0, map);
				}
			}
		}

		return listData;
	}

	/**
	 * @Title: loadLocalVedioAudioNames
	 * @Description: 获取本地音频视频的文件名
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月25日 下午8:06:36
	 * @param uid
	 * @return
	 */
	public static List<Map<String, Object>> loadLocalVedioAudioNames(String uid) {
		// TODO Auto-generated method stub
		List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();
		String path = VEDIO_PATH_PREFIX + uid + File.separator;
		File photoPath = new File(path);
		if (photoPath.isDirectory()) {
			File[] files = photoPath.listFiles();
			if (null == files) {
				return listData;
			}

			for (int i = 0; i < files.length; i++) {
				String vedioaudioname = files[i].getName();
				if (vedioaudioname.endsWith(".3gp") || vedioaudioname.endsWith(".amr")) {

					Log.d("tiantan", "载入文件名：" + vedioaudioname);
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("report_path", path + vedioaudioname);

					String vedioaudiotime = vedioaudioname.substring(0, 19);
					map.put("report_time", vedioaudiotime);
					if (vedioaudioname.endsWith(".3gp")) {
						map.put("report_type", "vedio");
					} else if (vedioaudioname.endsWith(".amr")) {
						map.put("report_type", "audio");
					} else {
						//
					}

					listData.add(0, map);
				}
			}
		}

		return listData;
	}

	/**
	 * 
	 * @Title: formatPhoto @Description: 将拍照获得的图片bitmap数据进行格式统一 @param:
	 *         v @return: void @throws
	 */
	public static Bitmap formatPhoto(Bitmap photo) {
		// if(photo.getWidth() > photo.getHeight()){
		// Matrix matrix = new Matrix();
		// matrix.preRotate(90);
		// return Bitmap.createBitmap(photo ,0,0, photo.getWidth(),
		// photo.getHeight(),matrix,true);
		// }else{
		// return photo;
		// }

		return photo;
	}

	public static void setListViewHeightBasedOnChildren(ListView listView) {

		// 获取ListView对应的Adapter

		ListAdapter listAdapter = listView.getAdapter();

		if (listAdapter == null) {

			return;

		}

		int totalHeight = 0;

		for (int i = 0; i < listAdapter.getCount(); i++) { // listAdapter.getCount()返回数据项的数目

			View listItem = listAdapter.getView(i, null, listView);

			listItem.measure(0, 0); // 计算子项View 的宽高

			totalHeight += listItem.getMeasuredHeight(); // 统计所有子项的总高度

		}

		ViewGroup.LayoutParams params = listView.getLayoutParams();

		params.height = totalHeight + (listView.getDividerHeight() * (listAdapter.getCount() - 1));

		// listView.getDividerHeight()获取子项间分隔符占用的高度

		// params.height最后得到整个ListView完整显示需要的高度

		listView.setLayoutParams(params);

	}

	public static ByteArrayOutputStream readFileToStream(String path) {
		File file = new File(path);
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		if (file.exists()) {

			try {
				FileInputStream fis = new FileInputStream(file);
				byte[] buffer = new byte[1024];
				int iLength = 0;
				while ((iLength = fis.read(buffer)) != -1) {
					outStream.write(buffer, 0, iLength);
				}
				fis.close();
				// outStream.close();

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else {

		}

		return outStream;
	}

	/**
	 * @Title: loadLocalPhotoByPath
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月27日 下午9:51:15
	 * @param path
	 * @return
	 */
	public static Bitmap loadLocalPhotoByPath(String path) {
		FileInputStream is = null;
		Bitmap bitmap = null;
		try {
			is = new FileInputStream(path);
			BitmapFactory.Options options = new BitmapFactory.Options();
			options.inSampleSize = 2;
			bitmap = BitmapFactory.decodeStream(is, null, options);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				is.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		return bitmap;
	}

	/**
	 * @Title: MoveLocalPhoto
	 * @Description: 移动内存卡中图片
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月27日 下午9:53:02
	 * @param srcFilePathString
	 * @param dstPathString
	 * @param dstNameString
	 * @return
	 */
	public static boolean MoveLocalPhoto(String srcFilePathString, String dstPathString, String dstNameString) {
		boolean result = false;
		File srcFile = new File(srcFilePathString);
		File dstPath = new File(dstPathString);
		if (!dstPath.exists()) {
			dstPath.mkdir();
		}

		try {
			File dstFile = new File(dstPath, dstNameString);
			if (!dstFile.exists()) {
				dstFile.createNewFile();

			}

			result = srcFile.renameTo(dstFile);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

}
