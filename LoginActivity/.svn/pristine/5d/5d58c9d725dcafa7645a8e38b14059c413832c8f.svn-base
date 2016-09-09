/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: YiDongYiHuMultiMediaActivity.java
 * @Package com.tiantanhehe.yidongchafang.views.activities
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月10日 上午9:07:53 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.views.activities;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.capricorn.ArcMenu;
import com.capricorn.OnRayItemClickListener;
import com.capricorn.RayBeamMenu;
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;
import com.nostra13.universalimageloader.core.display.SimpleBitmapDisplayer;
import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.db.wrapper.HuanzheWrapper;
import com.tiantanhehe.yidongchafang.utils.BitmapUtil;
import com.tiantanhehe.yidongchafang.utils.DateUtil;
import com.tiantanhehe.yidongchafang.utils.MediaUtil;
import com.tiantanhehe.yidongchafang.utils.StringUtil;
import com.tiantanhehe.yidongchafang.views.activities.tools.TipNoteActivity;
import com.tiantanhehe.yidongchafang.views.adapters.MultiMediaListAdapter;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Toast;

/**
 * @ClassName: YiDongYiHuMultiMediaActivity
 * @Description: TODO 用于实现多媒体数据采集功能的封装。
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月10日 上午9:07:53
 * 
 */
public class YiDongYiHuMultiMediaActivity extends YiDongYiHuActivity {

	// protected Intent intent;
	private Bitmap photo;
	private ImageView take_photo;
	AlertDialog ad_note_dialog;
	public static final int TAKE_PHOTO = 1;
	public static final int TAKE_VEDIO = 2;
	public static final int TAKE_AUDIO = 3;
	public static final int TAKE_PHOTO_ORI = 4;
	public static final String UPLOAD_PHOTO_ERROR = "error";
	public static final String UPLOAD_PHOTO_SUCCESS = "success";
	public static final String DOWNLOAD_PHOTO_ERROR = "error";
	public static final String DOWNLOAD_PHOTO_SUCCESS = "success";
	public static final String DOWNLOAD_PHOTO_NONE = "none";
	public int full_screen_status = 0;

	protected ListView lv_multimedia_list;
	protected MultiMediaListAdapter multiMedia_adapter;
	protected List<Map<String, Object>> report_listData;

	public DisplayImageOptions options;
	public ImageLoader imageLoader;
	public String current_uid = "";
	protected String curphotoTime = "";
	private static final String DEFAULT_UID = "000000";

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		viewInit(); // 界面相关初始化
		dataInit(savedInstanceState); // 数据初始化
	}

	private void viewInit() {

	}

	private void dataInit(Bundle savedInstanceState) {

		report_listData = new ArrayList<Map<String, Object>>();
		multiMedia_adapter = new MultiMediaListAdapter(this, report_listData);
		current_uid = "";
		if (savedInstanceState != null) {
			
			if ((savedInstanceState.getString("current_uid") != null)
					&& (!savedInstanceState.getString("current_uid").equals(""))) {
				current_uid = savedInstanceState.getString("current_uid");
			}
			if ((savedInstanceState.getString("curphotoTime") != null)
					&& (!savedInstanceState.getString("curphotoTime").equals(""))) {
				curphotoTime = savedInstanceState.getString("curphotoTime");
			}

			if ((savedInstanceState.getString("current_user_number") != null)
					&& (!savedInstanceState.getString("current_user_number").equals(""))) {
				current_application.appConf.current_user_number = savedInstanceState.getString("current_user_number");
			}
			
			if ((savedInstanceState.getString("current_patient_zhuyuan_id") != null)
					&& (!savedInstanceState.getString("current_patient_zhuyuan_id").equals(""))) {
				current_application.appConf.current_patient_zhuyuan_id = savedInstanceState
						.getString("current_patient_zhuyuan_id");
			}

			Log.d("tiantan",
					"[UI]" + "[yidongyihumultimeidiaactivity]" + "restore data: current_uid:" + current_uid
							+ "curphotoTime" + curphotoTime + "current_user_number"
							+ current_application.appConf.current_user_number + "current_patient_zhuyuan_id"
							+ current_application.appConf.current_patient_zhuyuan_id);

			if (current_application.appConf.current_patient_zhuyuan_id != null) {
				HuanzheWrapper huanzhe = mZhuyuanHuanzheDao
						.getHuanzheByZhuyuanID(current_application.appConf.current_patient_zhuyuan_id);
				if (huanzhe != null) {
					huanzhe.setGlobalData(current_application);
				}
				// setDingbuHuanZheXinXi();
			}

		}

		new Thread(new dataInitThread()).start();
	}

	/**
	 * @Title: initImageLoader
	 * @Description: TODO
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月25日 下午7:33:17
	 */
	private void initImageLoader() {

		ImageLoaderConfiguration config = ImageLoaderConfiguration.createDefault(this);
		ImageLoader.getInstance().init(config);

		options = new DisplayImageOptions.Builder().showStubImage(R.drawable.ic_launcher) // 在ImageView加载过程中显示图片
				.showImageForEmptyUri(R.drawable.ic_launcher) // image连接地址为空时
				.showImageOnFail(R.drawable.ic_launcher) // image加载失败
				.cacheInMemory(true) // 加载图片时会在内存中加载缓存
				.cacheOnDisc(true) // 加载图片时会在磁盘中加载缓存
				.displayer(new SimpleBitmapDisplayer()) // 设置用户加载图片task(这里是圆角图片显示)
				.build();

		imageLoader = ImageLoader.getInstance();
	}

	public class dataInitThread implements Runnable {

		@Override
		public void run() {
			// TODO Auto-generated method stub
			initImageLoader();
		}

	}

	public void initRayMenu() {
		RayBeamMenu rayMenu = (RayBeamMenu) findViewById(R.id.ray_menu);
		int[] itemDrawables = { R.drawable.arcmenu_shijianzhou, R.drawable.arcmenu_bianqian, R.drawable.arcmenu_photo,
				R.drawable.arcmenu_record_audio, R.drawable.arcmenu_tianjia, R.drawable.arcmenu_tongxunlu,
				R.drawable.arcmenu_full_screen };
		final int itemCount = itemDrawables.length;
		for (int i = 0; i < itemCount; i++) {
			ImageView item = new ImageView(this);
			item.setImageResource(itemDrawables[i]);

			final int position = i;
			OnClickListener rayMenuOnclickListener = null;
			switch (position) {
			case 0: // 时间轴
				rayMenuOnclickListener = new OnRayItemClickListener() {

					@Override
					public void onClick(View v) {

						goShijianShitu(v);
					}
				};
				break;
			case 1: // 便签
				rayMenuOnclickListener = new OnRayItemClickListener() {
					@Override
					public void onClick(View v) {
						genBlankNote(v);
					}
				};
				break;
			case 2:
				rayMenuOnclickListener = new OnRayItemClickListener() {

					@Override
					public void onClick(View v) {
						genScreenshotNote(v);
					}
				};
				break;
			case 3:
				rayMenuOnclickListener = new OnRayItemClickListener() {

					@Override
					public void onClick(View v) {
						doAudio(v);
					}
				};
				break;
			case 4:
				rayMenuOnclickListener = new OnRayItemClickListener() {

					@Override
					public void onClick(View v) {
						doVedio(v);

					}
				};
				break;
			case 5: // 多媒体列表
				rayMenuOnclickListener = new OnClickListener() {
					@Override
					public void onClick(View v) {
						doMultiMedia(v);

					}
				};
				break;
			case 6: // full screen
				rayMenuOnclickListener = new OnClickListener() {

					@Override
					public void onClick(View v) {
						// doFullScreen(v);
					}
				};
				break;
			default:
				rayMenuOnclickListener = new OnClickListener() {

					@Override
					public void onClick(View v) {

					}
				};

			}

			// if (position != 0 && position != 5) {
			rayMenu.addItem(item, rayMenuOnclickListener);
			// }
		}
	}

	public void initArcMenu() {
		ArcMenu arcMenu = (ArcMenu) findViewById(R.id.arc_menu);
		int[] itemDrawables = { R.drawable.arcmenu_shijianzhou, R.drawable.arcmenu_bianqian, R.drawable.arcmenu_photo,
				R.drawable.arcmenu_record_audio, R.drawable.arcmenu_record_vedio, R.drawable.arcmenu_xiaobianque,
				R.drawable.arcmenu_tongxunlu,
				R.drawable.arcmenu_full_screen };
		final String[] arc_menu_name = current_application.appConf.arc_menu;


		final int itemCount = itemDrawables.length;
		for (int i = 0; i < itemCount; i++) {
			ImageView item = new ImageView(this);
			item.setImageResource(itemDrawables[i]);
			boolean addFlag = false;

			final int position = i;
			OnClickListener arcMenuOnclickListener;
			switch (position) {
			case 0: // 时间轴
				if (StringUtil.isHave(arc_menu_name, "时间轴")) {
					addFlag = true;
				}
				arcMenuOnclickListener = new OnClickListener() {

					@Override
					public void onClick(View v) {

					}
				};
				break;
			case 1: // 便签
				if (StringUtil.isHave(arc_menu_name, "便签")) {
					addFlag = true;
				}
				arcMenuOnclickListener = new OnClickListener() {
					@Override
					public void onClick(View v) {
						doNote(v);
					}
				};
				break;
			case 2:
				if (StringUtil.isHave(arc_menu_name, "拍照")) {
					addFlag = true;
				}
				arcMenuOnclickListener = new OnClickListener() {

					@Override
					public void onClick(View v) {
						doPhoto(v);
					}
				};
				break;
			case 3:
				if (StringUtil.isHave(arc_menu_name, "录音")) {
					addFlag = true;
				}
				arcMenuOnclickListener = new OnClickListener() {

					@Override
					public void onClick(View v) {
						doAudio(v);
					}
				};
				break;
			case 4:
				if (StringUtil.isHave(arc_menu_name, "视频")) {
					addFlag = true;
				}
				arcMenuOnclickListener = new OnClickListener() {

					@Override
					public void onClick(View v) {
						doSearch(v);

					}
				};
				break;

			case 5:
				if (StringUtil.isHave(arc_menu_name, "小扁鹊")) {
					addFlag = true;
				}
				arcMenuOnclickListener = new OnClickListener() {

					@Override
					public void onClick(View v) {
						doSearch(v);

					}
				};
				break;
			case 6: // 多媒体列表
				if (StringUtil.isHave(arc_menu_name, "显示")) {
					addFlag = true;
				}
				arcMenuOnclickListener = new OnClickListener() {
					@Override
					public void onClick(View v) {
						doMultiMedia(v);
					}
				};
				break;
			case 7: // full screen
				if (StringUtil.isHave(arc_menu_name, "全屏")) {
					addFlag = true;
				}
				arcMenuOnclickListener = new OnClickListener() {

					@Override
					public void onClick(View v) {
						doFullScreen(v);
					}
				};
				break;
			default:
				addFlag = false;
				arcMenuOnclickListener = new OnClickListener() {

					@Override
					public void onClick(View v) {

					}
				};

			}

			if (addFlag) {
				arcMenu.addItem(item, arcMenuOnclickListener);
			}
		}
	}

	public void doPhoto(View view) {
		Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
		startActivityForResult(intent, TAKE_PHOTO);
	}

	public void doPhotoOri(View view) {
		Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
		String path = MediaUtil.CACHE_PATH_PREFIX + "note" + File.separator;
		File photoPath = new File(path);
		if (!photoPath.exists()) {
			photoPath.mkdir();
		}
		curphotoTime = DateUtil.getCurrentTime("-");
		File photoFile = new File(photoPath, curphotoTime + ".jpeg");

		Uri uri = Uri.fromFile(photoFile);
		// 指定存储路径，这样就可以保存原图了
		intent.putExtra(MediaStore.EXTRA_OUTPUT, uri);
		startActivityForResult(intent, TAKE_PHOTO_ORI);
		// startActivityForResult(intent, TAKE_PHOTO);
	}

	public void doVedio(View view) {
		Intent intent = new Intent("android.media.action.VIDEO_CAPTURE");
		startActivityForResult(intent, TAKE_VEDIO);
	}

	public void doAudio(View view) {
		Intent intent = new Intent(MediaStore.Audio.Media.RECORD_SOUND_ACTION);
		// intent.setType("audio/amr");
		try {
			startActivityForResult(intent, TAKE_AUDIO);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void doNote(View v) {
		LayoutInflater inflater = getLayoutInflater();
		View layout = inflater.inflate(R.layout.select_bianqian,
				(ViewGroup) findViewById(R.id.select_bianqian));

		AlertDialog.Builder builder = new AlertDialog.Builder(YiDongYiHuMultiMediaActivity.this);
				
		builder.setTitle("选择便签种类").setIcon(R.drawable.ic_launcher1).setView(layout).setNegativeButton("取消",
				new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int whichButton) {
			}
		});

		ad_note_dialog = builder.show();
	}

	public void doSearch(View v) {
		if (ll_xiaobianque_content == null) {
			return;
		}

		right_content_state = 3;
		menu.showSecondaryMenu();
		switchRightContent();

	}

	public void doMultiMedia(View v) {
		if (ll_huanzhe_list_content == null || ll_multimedia_list_content == null) {
			return;
		}
		right_content_state = 2;
		menu.showSecondaryMenu();
		switchRightContent();
		// right_state = true;
		// ll_huanzhe_list_content.setVisibility(View.GONE);
		// ll_multimedia_list_content.setVisibility(View.VISIBLE);
		getMultiMedia();

	}

	public void getMultiMedia() {

		if (!current_uid.equals(current_application.appConf.current_patient_zhuyuan_id)) {
			report_listData.clear();
		}

		if (multiMedia_adapter == null) {
			multiMedia_adapter = new MultiMediaListAdapter(this, report_listData);
		}

		current_uid = current_application.appConf.current_patient_zhuyuan_id;
		// 获取该患者视图下的本地检查图片
		if (lv_multimedia != null) {
			lv_multimedia.setAdapter(multiMedia_adapter);
			// setListViewHeightBasedOnChildren(lv_multimedia);
			lv_multimedia.setOnItemClickListener(new OnItemClickListener() {

				@Override
				public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
					// TODO Auto-generated method stub

					String report_type = multiMedia_adapter.getListData().get(position).get("report_type")
							.toString();

					try {
						if (report_type.equals("vedio")) {
							Intent intent2 = new Intent(Intent.ACTION_VIEW);
							String vedioPath = MediaUtil.VEDIO_PATH_PREFIX
									+ current_application.appConf.current_patient_zhuyuan_id
									+ File.separator
									+ multiMedia_adapter.getListData().get(position)
											.get("report_time").toString()
									+ ".3gp";
							File file = new File(vedioPath);
							Log.d("tiantan", "播放的文件为:" + vedioPath);
							intent2.setDataAndType(Uri.fromFile(file), "video/*");
							startActivity(intent2);
						} else if (report_type.equals("audio")) {
							Intent intent2 = new Intent(Intent.ACTION_VIEW);
							String vedioPath = MediaUtil.AUDIO_PATH_PREFIX
									+ current_application.appConf.current_patient_zhuyuan_id
									+ File.separator
									+ multiMedia_adapter.getListData().get(position)
											.get("report_time").toString()
									+ ".amr";
							Log.d("tiantan", "播放的文件为:" + vedioPath);
							File file = new File(vedioPath);
							intent2.setDataAndType(Uri.fromFile(file), "audio/*");
							startActivity(intent2);
						} else if (report_type.equals("photo")) {
							Intent intent2 = new Intent(Intent.ACTION_VIEW);
							String photopath = MediaUtil.PHOTO_PATH_PREFIX
									+ current_application.appConf.current_patient_zhuyuan_id
									+ File.separator
									+ multiMedia_adapter.getListData().get(position)
											.get("report_time").toString()
									+ ".jpeg";
							Log.d("tiantan", "播放的文件为:" + photopath);
							File file = new File(photopath);
							intent2.setDataAndType(Uri.fromFile(file), "image/*");
							startActivity(intent2);
						} else {

						}
					} catch (Exception e) {
						e.printStackTrace();
						Toast.makeText(YiDongYiHuMultiMediaActivity.this, "没有找到合适的播放程序", Toast.LENGTH_LONG).show();
					}
				}

			});
		}

		// 获取本地相关文件
		List<Map<String, Object>> reportListData = MediaUtil
				.loadLocalPhotoNames(
				current_application.appConf.current_patient_zhuyuan_id);
		if (multiMedia_adapter != null) {
			multiMedia_adapter.addlistData(reportListData, false, MediaUtil.LOCAL_MEDIA);
		}

		reportListData = MediaUtil.loadLocalVedioAudioNames(current_application.appConf.current_patient_zhuyuan_id);
		if (multiMedia_adapter != null) {
			multiMedia_adapter.addlistData(reportListData, false, MediaUtil.LOCAL_MEDIA);
		}

		// 比较本地文件与服务器上文件差异，只下载不存在的文件
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		pairList.add(new BasicNameValuePair("zhuyuan_id", current_application.appConf.current_patient_zhuyuan_id));
		pairList.add(new BasicNameValuePair("jianyan_id", current_application.appConf.current_patient_zhuyuan_id));

		String url = current_application.appConf.server_url + "Common/Data/downloadMediaNameAndroid";

		downLoadMediaName(url, pairList);

	}

	public void doFullScreen(View v) {
		// if (YiDongYiHuMultiMediaActivity.this instanceof MainActivity) {
		// Toast.makeText(context, "主界面无需全屏", Toast.LENGTH_SHORT).show();
		// return;
		// }
		if (full_screen_status == 0) {
			// WindowManager.LayoutParams params =
			// getWindow().getAttributes();
			// params.flags &=
			// (~WindowManager.LayoutParams.FLAG_FULLSCREEN);
			// getWindow().setAttributes(params);
			// getWindow().clearFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
			if (ll_left_window != null) {
				ll_left_window.setVisibility(View.GONE);
			}

			if (actionBar != null) {
				actionBar.hide();
			}
			full_screen_status = 1;
			Toast.makeText(context, "进入全屏", Toast.LENGTH_SHORT).show();
			;
		} else if (full_screen_status == 1) {
			// WindowManager.LayoutParams params =
			// getWindow().getAttributes();
			// params.flags |=
			// WindowManager.LayoutParams.FLAG_FULLSCREEN;
			// getWindow().setAttributes(params);
			// getWindow().addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
			if (ll_left_window != null) {
				ll_left_window.setVisibility(View.VISIBLE);

			}

			if (actionBar != null) {
				actionBar.show();
			}
			full_screen_status = 0;
			Toast.makeText(context, "退出全屏", Toast.LENGTH_SHORT).show();
		}
	}

	public void genVedioNote(View view) {
		doVedio(view);
	}

	public void genAudioNote(View view) {
		doAudio(view);
	}

	public void genPhotoNote(View view) {
		// doPhoto(view);
		doPhotoOri(view);
	}

	public void genBlankNote(View view) {
		// 空白便签处理

		if (ad_note_dialog != null) {
			ad_note_dialog.dismiss();
		}

		Intent intent = new Intent(YiDongYiHuMultiMediaActivity.this, TipNoteActivity.class);
		intent.putExtra("note_type", "blank");
		startActivity(intent);

	}

	/**
	 * @Title: genScreenshotNote
	 * @Description: 生成截图便签
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月12日 上午10:30:38
	 * @param view
	 */
	public void genScreenshotNote(View view) {
		if (ad_note_dialog != null) {
			ad_note_dialog.dismiss();
		}

		Intent intent = new Intent(YiDongYiHuMultiMediaActivity.this, TipNoteActivity.class);
		intent.putExtra("note_type", "screensnot");

		if (ll_main_window != null) {

			ll_main_window.setDrawingCacheEnabled(true);
			ll_main_window.buildDrawingCache();
			Bitmap bitmap = ll_main_window.getDrawingCache(true);

			String bitmapPath = BitmapUtil.saveBitmapToSDCard(bitmap, MediaUtil.CACHE_PATH_PREFIX + "note", 1);

			intent.putExtra("bitmap", bitmapPath);

			bitmap.recycle();
			ll_main_window.destroyDrawingCache();
		}

		// View screenshot = this.getWindow().getDecorView();
		// screenshot.buildDrawingCache();
		// screenshot.setDrawingCacheEnabled(true);
		// Bitmap bitmap = screenshot.getDrawingCache(true);
		// bitmap = Bitmap.createBitmap(screenshot.getWidth(), view.getHeight(),
		// Bitmap.Config.ARGB_8888);

		// String bitmapPath = BitmapUtil.saveBitmapToSDCard(bitmap,
		// MediaUtil.CACHE_PATH_PREFIX + "note", 1);
		// intent.putExtra("bitmap", bitmapPath);

		startActivity(intent);
	}

	/**
	 * @Title: genTextNote
	 * @Description: 生成文字便签
	 * @author: Huke <Huke@tiantanhehe.com>
	 * @date: 2016年4月12日 上午10:30:22
	 * @param v
	 */
	public void genTextNote(View v) {

		if (ad_note_dialog != null) {
			ad_note_dialog.dismiss();
		}

		Intent intent = new Intent(YiDongYiHuMultiMediaActivity.this, TipNoteActivity.class);
		intent.putExtra("note_type", "text");
		startActivity(intent);

	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {

		Log.d("tiantan", "结束采集返回");
		try {
			if (requestCode == TAKE_PHOTO) {
				Log.d("tiantan", "requestCode" + TAKE_PHOTO);
				if (data == null) {
					return;
				}
				final Bundle bundle = data.getExtras();
				if (bundle != null) {

					processPhoto(bundle);

				}
				// }
			} else if (requestCode == TAKE_VEDIO) {

				Log.d("tiantan", "requestCode" + TAKE_VEDIO);
				final Uri uri = data.getData();
				if (uri != null) {

						processVedio(uri);

				}
			} else if (requestCode == TAKE_AUDIO) {
				Log.d("tiantan", "requestCode" + TAKE_AUDIO);
				final Uri uri = data.getData();
				if (uri != null) {

						processAudio(uri);
				}

			} else if (requestCode == TAKE_PHOTO_ORI) {
				Log.d("tiantan", "requestCode" + TAKE_PHOTO_ORI);

					processPhotoOri(null);

			}

			else {
				Toast.makeText(this, "采集失败", Toast.LENGTH_LONG).show();
				return;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void processAudio(Uri uri) throws IOException {
		String vedioTime = DateUtil.getCurrentTime("-");
		String savedAudioPath = MediaUtil.saveLocalAudio(uri, current_application.appConf.current_patient_zhuyuan_id,
				vedioTime);
		Log.d("tiantan", "本地录音保存地址：" + savedAudioPath);

		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		pairList.add(new BasicNameValuePair("zhuyuan_id", current_application.appConf.current_patient_zhuyuan_id));
		pairList.add(new BasicNameValuePair("jianyan_id", current_application.appConf.current_patient_zhuyuan_id));
		pairList.add(new BasicNameValuePair("media_type", "audio"));
		pairList.add(new BasicNameValuePair("label", item_type));
		pairList.add(new BasicNameValuePair("time", vedioTime));


		String url = current_application.appConf.server_url + "Common/Data/uploadVAAndroid";
		Log.e("aa", "封装上传参数");
		Log.e("aa", "zhuyuan_id:"+current_application.appConf.current_patient_zhuyuan_id);
		Log.e("aa", "jianyan_id:"+current_application.appConf.current_patient_zhuyuan_id);
		Log.e("aa", "media_type:audio");
		Log.e("aa", "label:"+item_type);
		Log.e("aa", "time:"+vedioTime);
		upLoadVedioAudio(savedAudioPath, url, pairList);

		// multiMedia_adapter.addVedioAudio(null, vedioTime,
		// "audio");
		// multiMedia_adapter.notifyDataSetChanged();
	}

	private void processVedio(Uri uri) throws IOException {
		String vedioTime = DateUtil.getCurrentTime("-");
		String savedVedioPath = MediaUtil.saveLocalVedio(uri, current_application.appConf.current_patient_zhuyuan_id,
				vedioTime);
		Log.d("tiantan", "本地录像保存地址：" + savedVedioPath);

		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		pairList.add(new BasicNameValuePair("zhuyuan_id", current_application.appConf.current_patient_zhuyuan_id));
		pairList.add(new BasicNameValuePair("jianyan_id", current_application.appConf.current_patient_zhuyuan_id));
		pairList.add(new BasicNameValuePair("media_type", "vedio"));
		pairList.add(new BasicNameValuePair("label", item_type));
		pairList.add(new BasicNameValuePair("time", vedioTime));

		String url = current_application.appConf.server_url + "Common/Data/uploadVAAndroid";
		Log.d("tiantan", "封装上传参数");
		Log.e("aa", "zhuyuan_id-2:"+current_application.appConf.current_patient_zhuyuan_id);
		Log.e("aa", "jianyan_id-2:"+current_application.appConf.current_patient_zhuyuan_id);
		Log.e("aa", "media_type-2:audio");
		Log.e("aa", "label-2:"+item_type);
		Log.e("aa", "time-2:"+vedioTime);
		upLoadVedioAudio(savedVedioPath, url, pairList);

		// multiMedia_adapter.addVedioAudio(null, vedioTime,
		// "vedio");
		// multiMedia_adapter.notifyDataSetChanged();
	}

	private void processPhotoOri(String filePath) throws IOException {
		String path = MediaUtil.CACHE_PATH_PREFIX + "note"
				+ File.separator + curphotoTime + ".jpeg";

		// this.photo = MediaUtil.loadLocalPhotoByPath(path);
		// this.photo = MediaUtil.formatPhoto(photo);

		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		// pairList.add(new BasicNameValuePair("data", new
		// String(Base64.encode(stream.toByteArray(), Base64.DEFAULT))));
		pairList.add(new BasicNameValuePair("zhuyuan_id", current_application.appConf.current_patient_zhuyuan_id));
		pairList.add(new BasicNameValuePair("jianyan_id", current_application.appConf.current_patient_zhuyuan_id));
		pairList.add(new BasicNameValuePair("media_type", "photo"));
		pairList.add(new BasicNameValuePair("label", item_type));
		pairList.add(new BasicNameValuePair("time", curphotoTime));

		// stream.close();

		// 不上传拍照图片，编辑完成之后再保存上传
		// String url = current_application.appConf.server_url +
		// "Common/Data/uploadVAAndroid";
		// Log.d("tiantan", "封装上传参数");
		// upLoadVedioAudio(path, url, pairList);


		if (ad_note_dialog != null) {
			ad_note_dialog.dismiss();
		}

		Intent intent = new Intent(YiDongYiHuMultiMediaActivity.this, TipNoteActivity.class);
		intent.putExtra("note_type", TipNoteActivity.PHOTO_NOTE);

		intent.putExtra("bitmap", path);
		startActivity(intent);
	}

	private void processPhoto(Bundle bundle) throws IOException {
		this.photo = (Bitmap) bundle.get("data");
		this.photo = MediaUtil.formatPhoto(photo);
		String photoTime = DateUtil.getCurrentTime("-");
		// multiMedia_adapter.addPhoto(photo, photoTime);
		Log.d("tiantan", "图片加入listview");

		Log.d("tiantan", "本地图片保存");
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		this.photo.compress(Bitmap.CompressFormat.JPEG, 100, stream); // convert
																		// Bitmap
																		// to
																		// ByteArrayOutputStream
		try {
			stream.flush();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		MediaUtil.saveLocalPhoto(this.photo, current_application.appConf.current_patient_zhuyuan_id, photoTime);

		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		pairList.add(new BasicNameValuePair("data", new String(Base64.encode(stream.toByteArray(), Base64.DEFAULT))));
		pairList.add(new BasicNameValuePair("zhuyuan_id", current_application.appConf.current_patient_zhuyuan_id));
		pairList.add(new BasicNameValuePair("jianyan_id", current_application.appConf.current_patient_zhuyuan_id));
		pairList.add(new BasicNameValuePair("media_type", "photo"));
		pairList.add(new BasicNameValuePair("label", item_type));
		pairList.add(new BasicNameValuePair("time", photoTime));

		stream.close();

		String url = current_application.appConf.server_url + "Common/Data/updatePicAndroid";
		Log.d("aa", "封装上传参数");
		upLoadPhoto(url, pairList);
	}

	public void upLoadPhoto(final String url, final List<NameValuePair> pairList) {
		new AsyncTask<String, List<Map<String, Object>>, String>() {
			// ProgressDialog proDialog = null;

			@Override
			protected String doInBackground(String... params) {
				String result = UPLOAD_PHOTO_ERROR;
				HttpPost httpPost;
				try {
					httpPost = new HttpPost(url);
					httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
					HttpClient httpClient = new DefaultHttpClient();
					Log.d("tiantan", "开始上传");
					HttpResponse httpResponse = httpClient.execute(httpPost);

					if (httpResponse.getStatusLine().getStatusCode() == 200) {
						result = UPLOAD_PHOTO_SUCCESS;

					}

				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				return result;
			}

			@Override
			protected void onPostExecute(String result) {
				if (result.equals(UPLOAD_PHOTO_SUCCESS)) {
					Toast.makeText(YiDongYiHuMultiMediaActivity.this, "多媒体记录上传成功", Toast.LENGTH_LONG).show();
				} else {
					Toast.makeText(YiDongYiHuMultiMediaActivity.this, "多媒体记录上传失败", Toast.LENGTH_LONG).show();
				}
			}

		}.execute(url);
	}

	public void upLoadVedioAudio(final String path, final String url, final List<NameValuePair> pairList) {
		Log.e("aa", "上传路劲："+path+"----"+url);
		new AsyncTask<String, List<Map<String, Object>>, String>() {
			// ProgressDialog proDialog = null;

			@Override
			protected String doInBackground(String... params) {
				String result = UPLOAD_PHOTO_ERROR;
				HttpClient httpclient = new DefaultHttpClient();
				try {
					HttpPost httppost = new HttpPost(url);
					//httppost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
					MultipartEntity entity = new MultipartEntity();
					// String srcPath =
					// Environment.getExternalStorageDirectory().getPath() +
					// File.separator + "DCIM" + File.separator + "94331" +
					// File.separator + "2015-12-07 21-27-24.3gp";
					File file = new File(path);
					FileBody fileBody = new FileBody(file);
					entity.addPart("uploadedfile", fileBody);

					for (NameValuePair nameValuePair : pairList) {
						entity.addPart(nameValuePair.getName(),
								new StringBody(nameValuePair.getValue(), Charset.forName("UTF-8")));
						Log.d("tiantan", "封装的参数为：" + nameValuePair.getName() + ":" + nameValuePair.getValue());
					}
					// entity.addPart("time", new StringBody("2015-12-07
					// 21-27-24", Charset.forName("UTF-8")));

					httppost.setEntity(entity);
					HttpResponse response = httpclient.execute(httppost);

					HttpEntity resEntity = response.getEntity();
					Log.e("aa", "上传路劲返回内容："+response.getStatusLine().getStatusCode());
					if (resEntity != null) {
						result = UPLOAD_PHOTO_SUCCESS;
					}
					httpclient.getConnectionManager().shutdown();

				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return result;
			}

			@Override
			protected void onPostExecute(String result) {
				if (result.equals(UPLOAD_PHOTO_SUCCESS)) {
					Toast.makeText(YiDongYiHuMultiMediaActivity.this, "多媒体记录上传成功", Toast.LENGTH_LONG).show();
					Log.d("tiantan", "录像录音报告结果上传成功");
				} else {
					Toast.makeText(YiDongYiHuMultiMediaActivity.this, "多媒体记录上传失败", Toast.LENGTH_LONG).show();
					Log.d("tiantan", "录像录音报告结果上传失败");
				}
			}

		}.execute(url);
	}

	// 从服务器下载相关文件名
	public void downLoadMediaName(final String url, final List<NameValuePair> pairList) {

		new AsyncTask<String, List<String>, String>() {
			// ProgressDialog proDialog = null;

			List<String> listData = new ArrayList<String>();

			@Override
			protected String doInBackground(String... params) {
				String result = DOWNLOAD_PHOTO_ERROR;
				HttpPost httpPost;
				try {
					httpPost = new HttpPost(url);
					httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
					HttpClient httpClient = new DefaultHttpClient();
					Log.d("tiantan", "开始获取media文件名");
					Thread.sleep(500);
					HttpResponse httpResponse = httpClient.execute(httpPost);

					if (httpResponse.getStatusLine().getStatusCode() == 200) {
						result = DOWNLOAD_PHOTO_SUCCESS;

						String retSrc = EntityUtils.toString(httpResponse.getEntity(), HTTP.UTF_8);
						JSONObject jsonObject = new JSONObject(retSrc);
						int count = jsonObject.getInt("count");
						Log.d("tiantan", "服务器文件数量：" + count);

						JSONArray picDatas = jsonObject.getJSONArray("data");

						for (int i = 0; i < picDatas.length(); i++) {
							JSONObject picData = (JSONObject) picDatas.get(i);
							Log.d("tiantan", "获取的文件名：" + picData.getString("name"));
							String mediaName = picData.getString("name");
							listData.add(mediaName);
						}

					} else {

						Log.d("tiantan", "获取文件名失败");
					}

				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				return result;
			}

			@Override
			protected void onPostExecute(String result) {
				if (result.equals(DOWNLOAD_PHOTO_SUCCESS)) {
					// 对比查出本地不存在的文件
					List<String> listData2 = MediaUtil
							.loadLocalMediaName(current_application.appConf.current_patient_zhuyuan_id);
					List<String> listDataDiffMedia = new ArrayList<String>();
					List<String> listDataDiffBigFile = new ArrayList<String>();
					for (String name : listData) {
						boolean flag = false;
						for (String localName : listData2) {
							if (name.equals(localName)) {
								flag = true;
								break;
							}
						}
						if (!flag) {
							if (name.endsWith(".jpeg") || name.endsWith(".amr")) {
								listDataDiffMedia.add(name);

							} else if (name.endsWith(".3gp")) {
								listDataDiffBigFile.add(name);
							} else {
								Log.d("tiantan", "获取到未知的文件名：" + name);
							}
						}
					}
					// 获取该患者视图下的服务器检查media
					List<NameValuePair> pairList = new ArrayList<NameValuePair>();
					pairList.add(new BasicNameValuePair("zhuyuan_id",
							current_application.appConf.current_patient_zhuyuan_id));
					pairList.add(new BasicNameValuePair("jianyan_id",
							current_application.appConf.current_patient_zhuyuan_id));
					String namestoString = listDataDiffMedia.toString();
					String namesString = namestoString.substring(1, namestoString.length() - 1);
					pairList.add(new BasicNameValuePair("media_names", namesString));

					String url = current_application.appConf.server_url + "Common/Data/downloadPicAndroid";
					Log.e("aa", current_application.appConf.current_patient_zhuyuan_id+"---"+current_application.appConf.current_patient_zhuyuan_id+"---"+namesString);
					downLoadMedia(url, pairList, multiMedia_adapter);

					String url2 = current_application.appConf.server_url + "Uploads/";
					downLoadBigFile(url2, mIntent.getStringExtra("id"), listDataDiffBigFile,
							multiMedia_adapter);

				} else {
				}
			}

		}.execute(url);

		// return listData;
	}

	// 从服务器上下载相关内容
	public void downLoadMedia(final String url, final List<NameValuePair> pairList,
			final MultiMediaListAdapter jiancha_report_adapter) {
		Log.e("aa", "下载地址："+url);
		new AsyncTask<String, List<Map<String, Object>>, String>() {
			// ProgressDialog proDialog = null;
			List<Map<String, Object>> listData = new ArrayList<Map<String, Object>>();

			@Override
			protected String doInBackground(String... params) {
				String result = DOWNLOAD_PHOTO_NONE;
				HttpPost httpPost;
				try {
					httpPost = new HttpPost(url);
					httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
					HttpClient httpClient = new DefaultHttpClient();
					Log.e("aa", "开始下载图片");
					Thread.sleep(100);
					HttpResponse httpResponse = httpClient.execute(httpPost);

					if (httpResponse.getStatusLine().getStatusCode() == 200) {

						String retSrc = EntityUtils.toString(httpResponse.getEntity(), HTTP.UTF_8);
						JSONObject jsonObject = new JSONObject(retSrc);
						int count = jsonObject.getInt("count");
						Log.e("aa", "下载的数量：" + count);

						if (count > 0) {
							result = DOWNLOAD_PHOTO_SUCCESS; // 若存在需下载的多媒体数据提示
						}

						JSONArray picDatas = jsonObject.getJSONArray("data");

						for (int i = 0; i < picDatas.length(); i++) {
							JSONObject picData = (JSONObject) picDatas.get(i);
							Map<String, Object> map = new HashMap<String, Object>();
							Log.e("aa", "下载的文件时间：" + picData.getString("time"));
							map.put("report_type", picData.getString("type"));
							map.put("report_time", picData.getString("time"));

							byte[] dataBytes = Base64.decode(picData.getString("context"), Base64.DEFAULT);

							if (picData.getString("type").equals("photo")) {
								Bitmap bitMap = MediaUtil
										.formatPhoto(BitmapFactory.decodeByteArray(dataBytes, 0, dataBytes.length));

								String savedPhotoPath = MediaUtil.savePhotoToSDCard(bitMap,
										current_application.appConf.current_patient_zhuyuan_id,
										picData.getString("time"));
								map.put("report_path", savedPhotoPath);
								bitMap.recycle();

								// map.put("report_img", bitMap);
							} else {
								map.put("report_vedio_audio", dataBytes);
								MediaUtil.saveLocalVedioAudio(dataBytes,current_application.appConf.current_patient_zhuyuan_id,picData.getString("time").toString(),picData.getString("type").toString());
								Log.e("aa", "开始下载音频文件");
							}
							listData.add(map);

						}

					} else {
						result = DOWNLOAD_PHOTO_ERROR;
						Log.e("aa", "下载失败");
						jiancha_report_adapter.notifyDataSetChanged();
						// setListViewHeightBasedOnChildren(lv_multimedia);
					}

				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				return result;
			}

			@Override
			protected void onPostExecute(String result) {
				if (result.equals(DOWNLOAD_PHOTO_SUCCESS)) {
					Toast.makeText(YiDongYiHuMultiMediaActivity.this, "多媒体记录下载成功", Toast.LENGTH_LONG).show();
					jiancha_report_adapter.addlistData(listData, true, MediaUtil.LOCAL_MEDIA);

					// 滚动至报告的顶部
					// ScrollView sv = (ScrollView)
					// findViewById(R.id.scrollView1);
					// if (sv != null) {
					// sv.fullScroll(View.FOCUS_UP);
					// }
				} else if (result.equals(DOWNLOAD_PHOTO_ERROR)) {
					Toast.makeText(YiDongYiHuMultiMediaActivity.this, "多媒体记录下载失败", Toast.LENGTH_LONG).show();
				} else {
					jiancha_report_adapter.notifyDataSetChanged();
				}
			}

		}.execute(url);

		// return listData;
	}

	@SuppressWarnings("unchecked")
	public void downLoadBigFile(final String urlString, final String uid, List<String> listDataDiffBigFile,
			final MultiMediaListAdapter jiancha_report_adapter) {
		// TODO Auto-generated method stub
		if (listDataDiffBigFile == null || listDataDiffBigFile.size() == 0) {
			return;
		}

		new AsyncTask<List<String>, String, String>() {
			@Override
			protected void onPreExecute() {
			}

			@SuppressWarnings("unchecked")
			@Override
			protected String doInBackground(List<String>... params) {
				Log.d("tiantan", "开始进行视频大文件下载");
				for (String name : params[0]) {
					String downloadurl;
					int buffread = 0;
					URL url;
					HttpURLConnection urlcon = null;
					try {
						downloadurl = urlString + uid + File.separator
								+ URLEncoder.encode(name, "utf-8").replace("+", "%20");
						url = new URL(downloadurl);
						urlcon = (HttpURLConnection) url.openConnection();

						FileOutputStream fos = null;

						String path = MediaUtil.VEDIO_PATH_PREFIX + uid + File.separator;
						File vedioPath = new File(path);
						if (!vedioPath.exists()) {
							vedioPath.mkdir();
						}
						Log.d("tiantan", "下载的文件路径：" + path);

						String filePath = path + name;
						File file = new File(filePath);
						if (file.exists()) {
							continue;
						}
						InputStream is = urlcon.getInputStream();
						file.createNewFile();
						fos = new FileOutputStream(file);
						byte[] buf = new byte[1024];
						while ((buffread = is.read(buf)) != -1) {
							fos.write(buf, 0, buffread);

						}
						is.close();
						fos.flush();
						fos.close();
					} catch (Exception e) {
						e.printStackTrace();
					}

					Log.d("tiantan", "视频大文件下载完成：" + name);

				}
				return null;
			}

			@Override
			protected void onProgressUpdate(String... values) {
			}

			@Override
			protected void onPostExecute(String result) {
				Log.d("tiantan", "全部视频大文件下载完成");
				if (jiancha_report_adapter != null) {
					jiancha_report_adapter.addlistData(MediaUtil.loadLocalVedioAudioNames(uid), true,
							MediaUtil.LOCAL_MEDIA);
				}
				// 滚动至报告的顶部
				// ScrollView sv = (ScrollView) findViewById(R.id.scrollView1);
				// if (sv != null) {
				// sv.fullScroll(View.FOCUS_UP);
				// }
			}

		}.execute(listDataDiffBigFile);
	}

	public void saveLocalPhoto(Map<String, Object> map) {
		MediaUtil.saveLocalPhoto(map, current_application.appConf.current_patient_zhuyuan_id);
	}

	public void saveLocalVedioAudio(Map<String, Object> map) {
		MediaUtil.saveLocalVedioAudio((byte[]) map.get("report_vedio_audio"), mIntent.getStringExtra("id"),
				map.get("report_time").toString(), map.get("report_type").toString());
	}

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		outState.putString("current_uid", current_uid);
		outState.putString("curphotoTime", curphotoTime);
		outState.putString("current_user_number", current_application.appConf.current_user_number);
		outState.putString("current_patient_zhuyuan_id", current_application.appConf.current_patient_zhuyuan_id);
		Log.d("tiantan",
				"[UI]" + "[yidongyihumultimeidiaactivity]" + "onSaveInstanceState: current_uid:" + current_uid
						+ "curphotoTime" + curphotoTime + "current_user_number"
						+ current_application.appConf.current_user_number + "current_patient_zhuyuan_id"
						+ current_application.appConf.current_patient_zhuyuan_id);
	}

	@Override
	public void onDestroy() {
		if (ad_note_dialog != null) {
			ad_note_dialog.dismiss();
		}
		super.onDestroy();
	}

}
