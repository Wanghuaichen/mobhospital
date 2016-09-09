package com.tiantanhehe.yidongchafang.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.Gson;
import com.tiantanhehe.mobileemr.initdb.InitDatatbase;
import com.tiantanhehe.yidongchafang.GlobalInfoApplication;
import com.tiantanhehe.yidongchafang.common.compression.GlibCompression;
import com.tiantanhehe.yidongchafang.common.compression.ICompression;
import com.tiantanhehe.yidongchafang.dao.db.DatabaseHelper;
import com.tiantanhehe.yidongchafang.views.activities.MainActivity;
import com.tiantanhehe.yidongchafang.views.activities.TiantanActivity;
import com.tiantanhehe.yidongchafang.views.activities.tools.ResetPasswordActivity;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.SQLException;
import android.os.StrictMode;
import android.util.Log;

/**************************************************
 * Created: 2015-03 Info:本地缓存数据库管理类，管理本地缓存，包括患者信息、医嘱信息、医嘱执行信息
 * 使用SQLite数据库，所有数据的刷新同步均由此控制
 * 
 * @Tiantanhehe (C)2011-3011 Tiantanhehe
 * @Author Jack <dongjie@tiantanhehe.com>
 * @Version 1.0
 * @Updated History:
 ***************************************************/
public class DataManager {
	// private final SQLiteDatabase db;
	public GlobalInfoApplication current_application;
	DatabaseHelper db;
	/**
	 * 初始化数据库
	 */
	private InitDatatbase mInitDatatbase;
	private final TiantanActivity context;
	private final ICompression mCompress = new GlibCompression();
	private AfterSyncDataWithServerLogin mAfterSyncDataWithServerLogin = null;
	private List<String> tizhengIDList = new ArrayList<String>();

	/**
	 * 下载数据之后 刷新画面 仅用于MainActivity
	 * 
	 * @ClassName: AfterSyncDataWithServerLogin
	 * @Description: TODO
	 * @author Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date 2016-1-19 下午3:41:00
	 * 
	 */
	public interface AfterSyncDataWithServerLogin {
		public void doAfter();
	}

	public void setAfterSyncDataWithServerLogin(
			AfterSyncDataWithServerLogin pAfterSyncDataWithServerLogin) {
		mAfterSyncDataWithServerLogin = pAfterSyncDataWithServerLogin;
	}

	public DataManager(TiantanActivity context) {
		current_application = (GlobalInfoApplication) context
				.getApplicationContext();
		this.context = context;
		db = DatabaseHelper.getInstance(context, context.current_application.appConf.database_name);
		mInitDatatbase = InitDatatbase.getInstance(db);

		try {
			mInitDatatbase.CreateTable();
		} catch (SQLException e) {

		}
		StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder()
				.detectDiskReads().detectDiskWrites().detectAll() // problems
				.penaltyLog().build());
		StrictMode.setVmPolicy(new StrictMode.VmPolicy.Builder()
				.detectLeakedSqlLiteObjects().detectLeakedClosableObjects()
				.penaltyLog().penaltyDeath().build());
	}

	@SuppressWarnings("unchecked")
	public String syncDataWithServerLogin(Context cont) {
		String sync_result = "false";
		ServerCommunicationTask asyncTask = new ServerCommunicationTask(
				this.context, current_application);
		ArrayList<NameValuePair> request_info = new ArrayList<NameValuePair>();
		// 为了兼容老版本4.15及以前的移动护理
		// request_info.add(new BasicNameValuePair("request_url",
		// this.context.current_application.appConf.server_url
		// +
		// "Mobile/YidongChafangClientCommunication/asyncWithServerLoginChafang/user_number/"
		// + this.context.current_application.appConf.current_user_number));
		request_info.add(new BasicNameValuePair("request_url",
				this.context.current_application.appConf.server_url
						+ "Mobile/YidongChafangClientCommunication/asyncWithServerLogin/user_number/"
						+ this.context.current_application.appConf.current_user_number));
		request_info.add(new BasicNameValuePair("user_department",
				this.context.current_application.appConf.current_user_department));
		request_info.add(new BasicNameValuePair("user_department_id",
				this.context.current_application.appConf.current_user_department_id));
		if (current_application.appConf.http_data_compression_flag) {
			request_info.add(new BasicNameValuePair("compression_http_data",
					"on"));
		}

		asyncTask.setFinishListener(new DataFinishListener() {
			@Override
			public void dataFinishSuccessfully(JSONObject response_info) {
				try {
					if (response_info.get("response_state").toString() == "true") {
						// 存储患者信息
						try {
							db.execSQL(response_info.get("zhuyuan_basic_info_update_sql").toString());
						} catch (Exception e) {
						} finally {

						}

						// 存储标本信息
						if (!response_info.get("biaoben_info_update_sql").equals("")) {
							JSONArray biaoben_sql_arr = new JSONArray();
							biaoben_sql_arr = (JSONArray) response_info.get("biaoben_info_update_sql");
							for (int i = 0; i < biaoben_sql_arr.length(); i++) {
								try {
									db.execSQL(biaoben_sql_arr.get(i).toString());
								} catch (Exception e) {
									continue;
								} finally {

								}
							}
						}

						// 存储床位信息
						if (!response_info.get("bingchuang_update_sql").equals("")) {
							JSONArray chuangwei_sql_arr = new JSONArray();
							chuangwei_sql_arr = (JSONArray) response_info.get("bingchuang_update_sql");
							for (int i = 0; i < chuangwei_sql_arr.length(); i++) {
								try {
									db.execSQL(chuangwei_sql_arr.get(i).toString());
								} catch (Exception e) {
									continue;
								} finally {

								}
							}
						}
						
						// 存储yiyuan_user信息
						if (!response_info.get("yiyuan_user_update_sql").equals("")) {
							JSONArray yiyuan_user_sql_arr = new JSONArray();
							yiyuan_user_sql_arr = (JSONArray) response_info.get("yiyuan_user_update_sql");
							for (int i = 0; i < yiyuan_user_sql_arr.length(); i++) {
								try {
									db.execSQL(yiyuan_user_sql_arr.get(i).toString());
								} catch (Exception e) {
									continue;
								} finally {

								}
							}
						}

						// 存储巡查记录默认显示数据
						// if (!response_info.get("xunchajilu_item").equals(""))
						// {
						// JSONArray xuncha_sql_arr = new JSONArray();
						// xuncha_sql_arr = (JSONArray)
						// response_info.get("xunchajilu_item");
						// for (int i = 0; i < xuncha_sql_arr.length(); i++) {
						// try {
						// db.execSQL(xuncha_sql_arr.get(i).toString());
						// } catch (Exception e) {
						// continue;
						// } finally {
						//
						// }
						// }
						// }

						// 存储体征默认显示数据
						// if
						// (!response_info.get("zhuyuan_tizheng_moren").equals(""))
						// {
						// JSONArray tizheng_sql_arr = new JSONArray();
						// tizheng_sql_arr = (JSONArray)
						// response_info.get("zhuyuan_tizheng_moren");
						// for (int i = 0; i < tizheng_sql_arr.length(); i++) {
						// try {
						// db.execSQL(tizheng_sql_arr.get(i).toString());
						// } catch (Exception e) {
						// continue;
						// } finally {
						//
						// }
						// }
						// }

						// 存储体征模板默认显示数据
						// if
						// (!response_info.get("data_tizheng_template").equals(""))
						// {
						// JSONArray tizhengtemplate_sql_arr = new JSONArray();
						// tizhengtemplate_sql_arr = (JSONArray)
						// response_info.get("data_tizheng_template");
						// // 删除表中的全部数据
						// String sql = "delete from data_tizheng_template";
						//
						// for (int i = 0; i < tizhengtemplate_sql_arr.length();
						// i++) {
						// try {
						// if (i == 0) {
						// db.execSQL(sql);
						// }
						// db.execSQL(tizhengtemplate_sql_arr.get(i).toString());
						// } catch (Exception e) {
						// continue;
						// } finally {
						//
						// }
						// }
						// }

						// 存储医嘱执行tab模板默认显示数据
						// if
						// (!response_info.get("data_tabstate_template").equals(""))
						// {
						// JSONArray tabstatetemplate_sql_arr = new JSONArray();
						// tabstatetemplate_sql_arr = (JSONArray)
						// response_info.get("data_tabstate_template");
						// // 删除表中的全部数据
						// String sql = "delete from data_tabstate_template";
						//
						// for (int i = 0; i <
						// tabstatetemplate_sql_arr.length(); i++) {
						// try {
						// if (i == 0) {
						// db.execSQL(sql);
						// }
						// db.execSQL(tabstatetemplate_sql_arr.get(i).toString());
						// } catch (Exception e) {
						// continue;
						// } finally {
						//
						// }
						// }
						// }

						// 存储医嘱用法类型模板默认显示数据
						// if
						// (!response_info.get("data_yongfatype_template").equals(""))
						// {
						// JSONArray yongfatypetemplate_sql_arr = new
						// JSONArray();
						// yongfatypetemplate_sql_arr = (JSONArray)
						// response_info.get("data_yongfatype_template");
						// // 删除表中的全部数据
						// String sql = "delete from data_yongfatype_template";
						//
						// for (int i = 0; i <
						// yongfatypetemplate_sql_arr.length(); i++) {
						// try {
						// if (i == 0) {
						// db.execSQL(sql);
						// }
						// db.execSQL(yongfatypetemplate_sql_arr.get(i).toString());
						// } catch (Exception e) {
						// continue;
						// } finally {
						//
						// }
						// }
						// }

						// 存储情景模式数据
						// if
						// (!response_info.get("qingjing_update_sql").equals(""))
						// {
						// JSONArray qingjing_sql_arr = new JSONArray();
						// qingjing_sql_arr = (JSONArray)
						// response_info.get("qingjing_update_sql");
						// for (int i = 0; i < qingjing_sql_arr.length(); i++) {
						// try {
						// db.execSQL(qingjing_sql_arr.get(i).toString());
						// } catch (Exception e) {
						// continue;
						// } finally {
						//
						// }
						// }
						// }

						// 存储住院体征预警值数据
						// if
						// (!response_info.get("tizheng_yujingzhi_update_sql").equals(""))
						// {
						// JSONArray yujing_sql_arr = new JSONArray();
						// yujing_sql_arr = (JSONArray)
						// response_info.get("tizheng_yujingzhi_update_sql");
						// for (int i = 0; i < yujing_sql_arr.length(); i++) {
						// try {
						// db.execSQL(yujing_sql_arr.get(i).toString());
						// } catch (Exception e) {
						// continue;
						// } finally {
						//
						// }
						// }
						// }

						// 护理模板
						// if
						// (!response_info.get("zhuyuan_block_template_update_sql").equals(""))
						// {
						// JSONArray yujing_sql_arr = new JSONArray();
						// yujing_sql_arr = (JSONArray)
						// response_info.get("zhuyuan_block_template_update_sql");
						// for (int i = 0; i < yujing_sql_arr.length(); i++) {
						// try {
						// db.execSQL(yujing_sql_arr.get(i).toString());
						// } catch (Exception e) {
						// continue;
						// } finally {
						// }
						// }
						// }

						// 护理记录明细模板
						// if
						// (!response_info.get("data_hulijilu_template_update_sql").equals(""))
						// {
						// JSONArray hulijilu_sql_arr = new JSONArray();
						// hulijilu_sql_arr = (JSONArray)
						// response_info.get("data_hulijilu_template_update_sql");
						// for (int i = 0; i < hulijilu_sql_arr.length(); i++) {
						// try {
						// db.execSQL(hulijilu_sql_arr.get(i).toString());
						// } catch (Exception e) {
						// continue;
						// } finally {
						// }
						// }
						// }
						// 护理记录明细模板名称
						// if
						// (!response_info.get("hulijilu_biaodan_name").equals(""))
						// {
						// JSONArray hulijilu_arr = new JSONArray();
						// hulijilu_arr = (JSONArray)
						// response_info.get("hulijilu_biaodan_name");
						// current_application.featureConf.hulijilu_type_arr =
						// new String[hulijilu_arr.length()];
						// for (int i = 0; i < hulijilu_arr.length(); i++) {
						// try {
						// current_application.featureConf.hulijilu_type_arr[i]
						// = hulijilu_arr.get(i)
						// .toString();
						// } catch (Exception e) {
						// continue;
						// } finally {
						// }
						// }
						// }
						// 护理文书明细模板名称
						// if
						// (!response_info.get("huliwenshu_biaodan_name").equals(""))
						// {
						// JSONArray huliwenshu_arr = new JSONArray();
						// huliwenshu_arr = (JSONArray)
						// response_info.get("huliwenshu_biaodan_name");
						// current_application.featureConf.huliwenshu_type_arr =
						// new String[huliwenshu_arr.length()];
						// for (int i = 0; i < huliwenshu_arr.length(); i++) {
						// try {
						// current_application.featureConf.huliwenshu_type_arr[i]
						// = huliwenshu_arr.get(i)
						// .toString();
						// } catch (Exception e) {
						// continue;
						// } finally {
						// }
						// }
						// }

						// 第一次登陆强制修改密码
						if (current_application.appConf.current_user_logintimes == 0) {
							Intent intent = new Intent(context, ResetPasswordActivity.class);
							context.finish();
							context.startActivity(intent);
						} else {
							if (mAfterSyncDataWithServerLogin == null) {
								Intent intent = new Intent(context, MainActivity.class);
								context.finish();
								context.startActivity(intent);
							}
						}

						if (mAfterSyncDataWithServerLogin != null) {
							mAfterSyncDataWithServerLogin.doAfter();
							mAfterSyncDataWithServerLogin = null;
						}
					}
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		});
		asyncTask.execute(request_info);
		return sync_result;
	}

	public boolean dataUpload() {
		boolean zhuangtai = false;
		biaobenDataUpload(
				context.current_application.appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/biaobenDataUpload/");

		if (current_application.featureConf.yizhuVersion.equals("v415")) {
			yizhuDataUploadv415(
					current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/yizhuDataUploadv415/");
		} else {
			yizhuDataUpload(current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/yizhuDataUpload/");
			yizhuHistoryDataUpload(
					current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/yizhuHistoryDataUpload/");
		}

		tizhengDataUpload(
				context.current_application.appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/tizhengDataUpload/");
		xunchaDataUpload(
				context.current_application.appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/xunchaDataUpload/");
		hulitongjiDataUpload(
				context.current_application.appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/hulitongjiDataUpload/");
		zhuangtai = true;
		return zhuangtai;
	}

	public void qingkongChuangjian() {
		try {
			db.execSQL("delete from zhuyuan_basic_info");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_basic_info'");

			db.execSQL("delete from yizhu_info");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='yizhu_info'");

			db.execSQL("delete from yizhu_zhixing_history");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='yizhu_zhixing_history'");

			db.execSQL("delete from yizhu_zhixing_history_lishi");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='yizhu_zhixing_history_lishi'");

			db.execSQL("delete from zhuyuan_yizhu_tixing");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_yizhu_tixing'");

			db.execSQL("delete from zhuyuan_fuzhujiancha");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_fuzhujiancha'");

			db.execSQL("delete from zhuyuan_tizheng_moren");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_tizheng_moren'");

			db.execSQL("delete from zhuyuan_tizheng");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_tizheng'");

			db.execSQL("delete from zhuyuan_tizheng_lishi");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_tizheng_lishi'");

			db.execSQL("delete from yiyuan_bingchuanghao");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='yiyuan_bingchuanghao'");

			db.execSQL("delete from data_xuncha_item");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='data_xuncha_item'");

			db.execSQL("delete from zhuyuan_xuncha_jilu");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_xuncha_jilu'");

			db.execSQL("delete from zhuyuan_xuncha_jilu_lishi");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_xuncha_jilu_lishi'");

			db.execSQL("delete from data_input_frequency");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='data_input_frequency'");

			db.execSQL("delete from zhuyuan_tizheng_yujingzhi");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_tizheng_yujingzhi'");

			db.execSQL("delete from zhuyuan_hulitongji_jilu");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_hulitongji_jilu'");

			db.execSQL("delete from data_hulitongji_item");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='data_hulitongji_item'");

			db.execSQL("delete from zhuyuan_xuncha_jilu_detail");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_xuncha_jilu_detail'");

			db.execSQL("delete from zhuyuan_xuncha_jilu_detail_lishi");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_xuncha_jilu_detail_lishi'");

			db.execSQL("delete from zhuyuan_block_template");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_block_template'");

			db.execSQL("delete from zhuyuan_hulijilu_moren");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_hulijilu_moren'");

			db.execSQL("delete from xinyizhu_tixing_info");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='xinyizhu_tixing_info'");

			db.execSQL("delete from xinyizhu_duqu_lishi");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='xinyizhu_duqu_lishi'");

			db.execSQL("delete from data_hulijilu_template");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='data_hulijilu_template'");
			
			db.execSQL("delete from yiyuan_user");
			db.execSQL("update sqlite_sequence SET seq = 0 where name ='yiyuan_user'");
		} catch (SQLException e) {
			Log.d("tiantan", e.getMessage());
		}
	}

	// 从本地上传医嘱信息到服务器
	public boolean yizhuDataUpload(String url) {
		
		String last_gengxin_sql = "UPDATE yizhu_info SET state = 'last_udpate' WHERE state = 'update' ";
		this.db.execSQL(last_gengxin_sql);

		String sql = "SELECT yizhu_id,yizhu_type,zuhao,zhixing_state,wancheng_cishu,operate_time FROM yizhu_info where state='last_udpate' ";
		Cursor yizhuData = this.db.rawQuery(sql, new String[] {});
		if (yizhuData.getCount() <= 0) {
			yizhuData.close();
			return true;
		}
		ArrayList<String> idArray = new ArrayList<String>();
		JSONArray jsonArray = new JSONArray();
		while (yizhuData.moveToNext()) {
			JSONObject object = new JSONObject();
			try {
				idArray.add(yizhuData.getString(yizhuData
						.getColumnIndex("zuhao")));
				object.put("yizhu_type", yizhuData.getString(yizhuData
						.getColumnIndex("yizhu_type")));
				object.put("zuhao",
						yizhuData.getString(yizhuData.getColumnIndex("zuhao")));
				object.put("zhixing_state", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_state")));
				object.put("operate_time", yizhuData.getString(yizhuData
						.getColumnIndex("operate_time")));
				object.put("wancheng_cishu", yizhuData.getInt(yizhuData
						.getColumnIndex("wancheng_cishu")));

				jsonArray.put(object);
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		yizhuData.close();
		String jsonData = jsonArray.toString();
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		if (context.current_application.appConf.http_data_compression_flag) {
			pairList.add(new BasicNameValuePair("data", new Gson()
					.toJson(mCompress.compress(jsonData.getBytes()))));
			pairList.add(new BasicNameValuePair("compression_http_data", "on"));
		} else {
			pairList.add(new BasicNameValuePair("data", jsonData));
		}

		pairList.add(new BasicNameValuePair("user_department_id",
				context.current_application.appConf.current_user_department_id));
		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse httpResponse = httpClient.execute(httpPost);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {

				String retSrc = "";
				byte[] result = null;
				if (context.current_application.appConf.http_data_compression_flag) {
					result = EntityUtils.toByteArray(httpResponse.getEntity());
					// TiantanLog.error("wwl", "开始解压数据,解压前数据大小: " +
					// result.length);
					retSrc = mCompress.decompress(result);
					// TiantanLog.error("wwl",
					// "开始解压数据,解压后数据大小: " + retSrc.getBytes().length);
				} else {
					retSrc = EntityUtils.toString(httpResponse.getEntity());
				}

				// String strResult =
				// EntityUtils.toString(httpResponse.getEntity());
				JSONObject return_data = new JSONObject(retSrc);
				if (return_data.get("state").equals("ok")) {
					for (int i = 0; i < idArray.size(); i++) {
						String gengxin_sql = "UPDATE yizhu_info SET state = '' WHERE state = 'last_udpate' and zuhao = '"
								+ idArray.get(i) + "' ";
						db.execSQL(gengxin_sql);
					}
					return true;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	// 从本地上传医嘱history信息到服务器
	public boolean yizhuHistoryDataUpload(String url) {

		String sql = "SELECT * FROM yizhu_zhixing_history ";
		Cursor yizhuData = this.db.rawQuery(sql, new String[] {});
		if (yizhuData.getCount() <= 0) {
			yizhuData.close();
			return true;
		}
		ArrayList<String> idArray = new ArrayList<String>();
		JSONArray jsonArray = new JSONArray();
		while (yizhuData.moveToNext()) {
			JSONObject object = new JSONObject();
			try {
				idArray.add(yizhuData.getInt(yizhuData
						.getColumnIndex("history_id")) + "");
				object.put("zhuyuan_id", yizhuData.getString(yizhuData
						.getColumnIndex("zhuyuan_id")));
				object.put("yizhu_id", yizhuData.getString(yizhuData
						.getColumnIndex("yizhu_id")));
				object.put("zhixing_state", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_state")));
				object.put("zhixing_type", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_type")));
				object.put("zhixing_hushi_id", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_hushi_id")));
				object.put("zhixing_hushi_name", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_hushi_name")));
				object.put("other_info", yizhuData.getString(yizhuData
						.getColumnIndex("other_info")));
				object.put("zhixing_zuhao", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_zuhao")));
				object.put("zhixing_time", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_time")));
				object.put("type",
						yizhuData.getString(yizhuData.getColumnIndex("type")));
				object.put("zhixing_fangshi", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_fangshi")));
				object.put("yizhuyongfa_type", yizhuData.getString(yizhuData
						.getColumnIndex("yizhuyongfa_type")));
				object.put("wancheng_cishu", yizhuData.getString(yizhuData
						.getColumnIndex("wancheng_cishu")));
				object.put("user_department_id", yizhuData.getString(yizhuData
						.getColumnIndex("user_department_id")));
				object.put("user_department", yizhuData.getString(yizhuData
						.getColumnIndex("user_department")));
				object.put("confirm_user_number", yizhuData.getString(yizhuData
						.getColumnIndex("confirm_user_number")));
				object.put("confirm_user_name", yizhuData.getString(yizhuData
						.getColumnIndex("confirm_user_name")));

				jsonArray.put(object);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		yizhuData.close();
		String jsonData = jsonArray.toString();
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		if (context.current_application.appConf.http_data_compression_flag) {
			pairList.add(new BasicNameValuePair("data", new Gson()
					.toJson(mCompress.compress(jsonData.getBytes()))));
			pairList.add(new BasicNameValuePair("compression_http_data", "on"));
		} else {
			pairList.add(new BasicNameValuePair("data", jsonData));
		}
		// pairList.add(new BasicNameValuePair("data", jsonData));
		pairList.add(new BasicNameValuePair("user_department_id",
				context.current_application.appConf.current_user_department_id));
		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse httpResponse = httpClient.execute(httpPost);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String retSrc = "";
				byte[] result = null;
				if (context.current_application.appConf.http_data_compression_flag) {
					result = EntityUtils.toByteArray(httpResponse.getEntity());
					// TiantanLog.error("wwl", "开始解压数据,解压前数据大小: " +
					// result.length);
					retSrc = mCompress.decompress(result);
					// TiantanLog.error("wwl",
					// "开始解压数据,解压后数据大小: " + retSrc.getBytes().length);
				} else {
					retSrc = EntityUtils.toString(httpResponse.getEntity());
				}

				// String strResult =
				// EntityUtils.toString(httpResponse.getEntity());
				JSONObject return_data = new JSONObject(retSrc);
				if (return_data.get("state").equals("ok")) {
					for (int i = 0; i < idArray.size(); i++) {
						db.execSQL("delete from yizhu_zhixing_history where history_id = '"
								+ idArray.get(i) + "' ");
					}
					// db.execSQL("delete from yizhu_zhixing_history");
					// db.execSQL("update sqlite_sequence SET seq = 0 where name ='yizhu_zhixing_history'");
					return true;
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 医嘱数据上传
	 * 
	 * @Title: yizhuDataUploadv415
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-3-30 下午1:55:31
	 * @param url
	 * @return
	 */
	public boolean yizhuDataUploadv415(String url) {
		String last_gengxin_sql = "UPDATE yizhu_info SET state = 'last_udpate' WHERE state = 'update' ";
		this.db.execSQL(last_gengxin_sql);

		String sql = "SELECT yizhu_type,zuhao,zhixing_state,wancheng_cishu,operate_time,last_zhixing_time FROM yizhu_info where state='last_udpate' group by zuhao ";
		Cursor yizhuData = this.db.rawQuery(sql, new String[] {});
		if (yizhuData.getCount() <= 0) {
			yizhuData.close();
			return true;
		}
		ArrayList<String> idArray = new ArrayList<String>();
		JSONArray jsonArray = new JSONArray();
		while (yizhuData.moveToNext()) {
			JSONObject object = new JSONObject();
			try {
				idArray.add(yizhuData.getString(yizhuData.getColumnIndex("zuhao")));
				object.put("yizhu_type", yizhuData.getString(yizhuData.getColumnIndex("yizhu_type")));
				object.put("zuhao", yizhuData.getString(yizhuData.getColumnIndex("zuhao")));
				object.put("zhixing_state", yizhuData.getString(yizhuData.getColumnIndex("zhixing_state")));
				object.put("operate_time", yizhuData.getString(yizhuData.getColumnIndex("operate_time")));
				object.put("wancheng_cishu", yizhuData.getInt(yizhuData.getColumnIndex("wancheng_cishu")));
				object.put("last_zhixing_time", yizhuData.getString(yizhuData.getColumnIndex("last_zhixing_time")));

				jsonArray.put(object);
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		yizhuData.close();

		for (int i = 0; i < jsonArray.length(); i++) {
			try {
				jsonArray.getJSONObject(i).put("lishi",
						getYizhuZhixingHistory(jsonArray.getJSONObject(i).get("zuhao").toString()));
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}

		String jsonData = jsonArray.toString();

		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		if (context.current_application.appConf.http_data_compression_flag) {
			pairList.add(new BasicNameValuePair("data", new Gson().toJson(mCompress.compress(jsonData.getBytes()))));
			pairList.add(new BasicNameValuePair("compression_http_data", "on"));
		} else {
			pairList.add(new BasicNameValuePair("data", jsonData));
		}

		pairList.add(
new BasicNameValuePair("user_department_id",
				context.current_application.appConf.current_user_department_id));
		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse httpResponse = httpClient.execute(httpPost);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {

				String retSrc = "";
				byte[] result = null;
				if (context.current_application.appConf.http_data_compression_flag) {
					result = EntityUtils.toByteArray(httpResponse.getEntity());
					retSrc = mCompress.decompress(result);
				} else {
					retSrc = EntityUtils.toString(httpResponse.getEntity());
				}

				JSONObject return_data = new JSONObject(retSrc);
				if (return_data.get("state").equals("ok")) {
					for (int i = 0; i < idArray.size(); i++) {
						String gengxin_sql = "UPDATE yizhu_info SET state = '',last_zhixing_time='"
								+ return_data.get(idArray.get(i)) + "' WHERE state = 'last_udpate' and zuhao = '"
								+ idArray.get(i) + "' ";
						db.execSQL(gengxin_sql);
					}

					for (int i = 0; i < tizhengIDList.size(); i++) {
						db.execSQL(
								"delete from yizhu_zhixing_history where history_id = '" + tizhengIDList.get(i) + "' ");
					}

					return true;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 获得组号对应的医嘱执行历史
	 * 
	 * @Title: getYizhuZhixingHistory
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-3-30 下午2:53:47
	 * @param zuhao
	 * @return
	 */
	public JSONArray getYizhuZhixingHistory(String zuhao) {

		tizhengIDList.clear();

		String sql = "SELECT * FROM yizhu_zhixing_history where zhixing_zuhao = '"
				+ zuhao + "' ";
		Cursor yizhuData = this.db.rawQuery(sql, new String[] {});
		if (yizhuData.getCount() <= 0) {
			yizhuData.close();
			return null;
		}

		JSONArray jsonArray = new JSONArray();

		while (yizhuData.moveToNext()) {
			JSONObject object = new JSONObject();
			try {
				tizhengIDList.add(yizhuData.getInt(yizhuData
						.getColumnIndex("history_id")) + "");
				object.put("zhuyuan_id", yizhuData.getString(yizhuData
						.getColumnIndex("zhuyuan_id")));
				object.put("yizhu_id", yizhuData.getString(yizhuData
						.getColumnIndex("yizhu_id")));
				object.put("zhixing_state", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_state")));
				object.put("zhixing_type", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_type")));
				object.put("zhixing_hushi_id", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_hushi_id")));
				object.put("zhixing_hushi_name", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_hushi_name")));
				object.put("other_info", yizhuData.getString(yizhuData
						.getColumnIndex("other_info")));
				object.put("zhixing_zuhao", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_zuhao")));
				object.put("zhixing_time", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_time")));
				object.put("type",
						yizhuData.getString(yizhuData.getColumnIndex("type")));
				object.put("zhixing_fangshi", yizhuData.getString(yizhuData
						.getColumnIndex("zhixing_fangshi")));
				object.put("yizhuyongfa_type", yizhuData.getString(yizhuData
						.getColumnIndex("yizhuyongfa_type")));
				object.put("wancheng_cishu", yizhuData.getString(yizhuData
						.getColumnIndex("wancheng_cishu")));
				object.put("user_department_id", yizhuData.getString(yizhuData
						.getColumnIndex("user_department_id")));
				object.put("user_department", yizhuData.getString(yizhuData
						.getColumnIndex("user_department")));
				object.put("confirm_user_number", yizhuData.getString(yizhuData
						.getColumnIndex("confirm_user_number")));
				object.put("confirm_user_name", yizhuData.getString(yizhuData
						.getColumnIndex("confirm_user_name")));
				object.put("yongfa_type", yizhuData.getString(yizhuData
						.getColumnIndex("yongfa_type")));
				
				jsonArray.put(object);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		yizhuData.close();

		return jsonArray;
	}

	// 数据从本地上传到服务器
	public boolean biaobenDataUpload(String url) {
		StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder()
				.detectDiskReads().detectDiskWrites().detectAll() // problems
				.penaltyLog().build());
		StrictMode.setVmPolicy(new StrictMode.VmPolicy.Builder()
				.detectLeakedSqlLiteObjects().detectLeakedClosableObjects()
				.penaltyLog().penaltyDeath().build());
		String sql = "SELECT * FROM zhuyuan_fuzhujiancha WHERE jiancha_zhuangtai = '已核对' ";
		Cursor biaobenData = this.db.rawQuery(sql, new String[] {});
		if (biaobenData.getCount() <= 0) {
			biaobenData.close();
			return true;
		}
		JSONArray jsonArray = new JSONArray();
		while (biaobenData.moveToNext()) {
			JSONObject object = new JSONObject();
			try {
				object.put("id",
						biaobenData.getInt(biaobenData.getColumnIndex("id")));
				object.put("biaoben_tiaoma", biaobenData.getString(biaobenData
						.getColumnIndex("tiaoma")));
				object.put("jiancha_hedui_zhuangtai", biaobenData
						.getString(biaobenData
								.getColumnIndex("jiancha_zhuangtai")));
				object.put("hedui_hushi_mingcheng", biaobenData
						.getString(biaobenData
								.getColumnIndex("hedui_hushi_mingcheng")));
				object.put("hedui_hushi_id", biaobenData.getString(biaobenData
						.getColumnIndex("hedui_hushi_id")));
				object.put("hedui_time", biaobenData.getString(biaobenData
						.getColumnIndex("hedui_time")));
				jsonArray.put(object);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		biaobenData.close();
		String jsonData = jsonArray.toString();
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		if (context.current_application.appConf.http_data_compression_flag) {
			pairList.add(new BasicNameValuePair("data", new Gson()
					.toJson(mCompress.compress(jsonData.getBytes()))));
			pairList.add(new BasicNameValuePair("compression_http_data", "on"));
		} else {
			pairList.add(new BasicNameValuePair("data", jsonData));
		}
		// pairList.add(new BasicNameValuePair("data", jsonData));
		pairList.add(new BasicNameValuePair("user_department_id",
				context.current_application.appConf.current_user_department_id));
		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse httpResponse = httpClient.execute(httpPost);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String retSrc = "";
				byte[] result = null;
				if (context.current_application.appConf.http_data_compression_flag) {
					result = EntityUtils.toByteArray(httpResponse.getEntity());
					// TiantanLog.error("wwl", "开始解压数据,解压前数据大小: " +
					// result.length);
					retSrc = mCompress.decompress(result);
					// TiantanLog.error("wwl",
					// "开始解压数据,解压后数据大小: " + retSrc.getBytes().length);
				} else {
					retSrc = EntityUtils.toString(httpResponse.getEntity());
				}
				// String strResult =
				// EntityUtils.toString(httpResponse.getEntity());
				JSONObject return_data = new JSONObject(retSrc);
				if (return_data.get("state").equals("ok")) {
					return true;
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	// 从本地上传体征数据到服务器
	public boolean tizhengDataUpload(String url) {
		String sql = "SELECT * FROM zhuyuan_tizheng ";
		Cursor tizhengData = this.db.rawQuery(sql, new String[] {});
		if (tizhengData.getCount() <= 0) {
			tizhengData.close();
			return true;
		}
		ArrayList<String> idArray = new ArrayList<String>();
		JSONArray jsonArray = new JSONArray();
		while (tizhengData.moveToNext()) {
			JSONObject object = new JSONObject();
			try {
				idArray.add(tizhengData.getInt(tizhengData.getColumnIndex("id"))
						+ "");
				object.put("patient_id", tizhengData.getString(tizhengData
						.getColumnIndex("patient_id")));
				object.put("zhuyuan_id", tizhengData.getString(tizhengData
						.getColumnIndex("zhuyuan_id")));
				object.put("jiancha_time", tizhengData.getString(tizhengData
						.getColumnIndex("jiancha_time")));
				object.put("jiancha_doctor_name", tizhengData
						.getString(tizhengData
								.getColumnIndex("jiancha_doctor_name")));
				object.put("jiancha_doctor_id", tizhengData
						.getString(tizhengData
								.getColumnIndex("jiancha_doctor_id")));
				object.put("jiancha_type", tizhengData.getString(tizhengData
						.getColumnIndex("jiancha_type")));
				object.put("jiancha_danwei", tizhengData.getString(tizhengData
						.getColumnIndex("jiancha_danwei")));
				object.put("jiancha_value", tizhengData.getString(tizhengData
						.getColumnIndex("jiancha_value")));
				object.put("jiancha_fangshi", tizhengData.getString(tizhengData
						.getColumnIndex("jiancha_fangshi")));
				object.put("beizhu", tizhengData.getString(tizhengData
						.getColumnIndex("beizhu")));
				object.put("enabled", tizhengData.getString(tizhengData
						.getColumnIndex("enabled")));
				jsonArray.put(object);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		tizhengData.close();
		String jsonData = jsonArray.toString();
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		if (context.current_application.appConf.http_data_compression_flag) {
			pairList.add(new BasicNameValuePair("data", new Gson()
					.toJson(mCompress.compress(jsonData.getBytes()))));
			pairList.add(new BasicNameValuePair("compression_http_data", "on"));
		} else {
			pairList.add(new BasicNameValuePair("data", jsonData));
		}
		// pairList.add(new BasicNameValuePair("data", jsonData));
		pairList.add(new BasicNameValuePair("user_department_id",
				context.current_application.appConf.current_user_department_id));
		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse httpResponse = httpClient.execute(httpPost);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				// String strResult =
				// EntityUtils.toString(httpResponse.getEntity());
				String retSrc = "";
				byte[] result = null;
				if (context.current_application.appConf.http_data_compression_flag) {
					result = EntityUtils.toByteArray(httpResponse.getEntity());
					// TiantanLog.error("wwl", "开始解压数据,解压前数据大小: " +
					// result.length);
					retSrc = mCompress.decompress(result);
					// TiantanLog.error("wwl",
					// "开始解压数据,解压后数据大小: " + retSrc.getBytes().length);
				} else {
					retSrc = EntityUtils.toString(httpResponse.getEntity());
				}

				JSONObject return_data = new JSONObject(retSrc);
				if (return_data.get("state").equals("ok")) {
					for (int i = 0; i < idArray.size(); i++) {
						db.execSQL("delete from zhuyuan_tizheng where id = '"
								+ idArray.get(i) + "' ");
					}
					// db.execSQL("delete from zhuyuan_tizheng");
					// db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_tizheng'");
					return true;
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	// 从本地上传巡查数据到服务器
	public boolean xunchaDataUpload(String url) {
		String sql = "SELECT * FROM zhuyuan_xuncha_jilu ";
		Cursor xunchaData = this.db.rawQuery(sql, new String[] {});
		if (xunchaData.getCount() <= 0) {
			xunchaData.close();
			return true;
		}
		ArrayList<String> idArray = new ArrayList<String>();
		JSONArray jsonArray = new JSONArray();
		while (xunchaData.moveToNext()) {
			JSONObject object = new JSONObject();
			try {
				idArray.add(xunchaData.getInt(xunchaData.getColumnIndex("id"))
						+ "");
				object.put("zhuyuan_id", xunchaData.getString(xunchaData
						.getColumnIndex("zhuyuan_id")));
				object.put("xuncha_time", xunchaData.getString(xunchaData
						.getColumnIndex("xuncha_time")));
				object.put("xuncha_hushi_id", xunchaData.getString(xunchaData
						.getColumnIndex("xuncha_hushi_id")));
				object.put("xuncha_hushi_name", xunchaData.getString(xunchaData
						.getColumnIndex("xuncha_hushi_name")));
				String detailSql = "SELECT * FROM zhuyuan_xuncha_jilu_detail where xuncha_jilu_id = '"
						+ xunchaData.getString(xunchaData.getColumnIndex("id"))
						+ "' ";
				Cursor detailXunchaDataData = this.db.rawQuery(detailSql,
						new String[] {});
				JSONArray detailJsonArray = new JSONArray();
				while (detailXunchaDataData.moveToNext()) {
					JSONObject detailObject = new JSONObject();
					detailObject.put("xuncha_jilu_id", detailXunchaDataData
							.getString(detailXunchaDataData
									.getColumnIndex("xuncha_jilu_id")));
					detailObject.put("xuncha_item_code", detailXunchaDataData
							.getString(detailXunchaDataData
									.getColumnIndex("xuncha_item_code")));
					detailObject.put("xuncha_item_name", detailXunchaDataData
							.getString(detailXunchaDataData
									.getColumnIndex("xuncha_item_name")));
					detailObject.put("xuncha_item_type", detailXunchaDataData
							.getString(detailXunchaDataData
									.getColumnIndex("xuncha_item_type")));
					detailJsonArray.put(detailObject);
				}
				detailXunchaDataData.close();
				object.put("detail", detailJsonArray);
				jsonArray.put(object);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		xunchaData.close();
		String jsonData = jsonArray.toString();
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		if (context.current_application.appConf.http_data_compression_flag) {
			pairList.add(new BasicNameValuePair("data", new Gson()
					.toJson(mCompress.compress(jsonData.getBytes()))));
			pairList.add(new BasicNameValuePair("compression_http_data", "on"));
		} else {
			pairList.add(new BasicNameValuePair("data", jsonData));
		}
		// pairList.add(new BasicNameValuePair("data", jsonData));
		pairList.add(new BasicNameValuePair("user_department_id",
				context.current_application.appConf.current_user_department_id));
		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse httpResponse = httpClient.execute(httpPost);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String retSrc = "";
				byte[] result = null;
				if (context.current_application.appConf.http_data_compression_flag) {
					result = EntityUtils.toByteArray(httpResponse.getEntity());
					// TiantanLog.error("wwl", "开始解压数据,解压前数据大小: " +
					// result.length);
					retSrc = mCompress.decompress(result);
					// TiantanLog.error("wwl",
					// "开始解压数据,解压后数据大小: " + retSrc.getBytes().length);
				} else {
					retSrc = EntityUtils.toString(httpResponse.getEntity());
				}
				// String strResult =
				// EntityUtils.toString(httpResponse.getEntity());
				JSONObject return_data = new JSONObject(retSrc);
				if (return_data.get("state").equals("ok")) {
					for (int i = 0; i < idArray.size(); i++) {
						db.execSQL("delete from zhuyuan_xuncha_jilu where id = '"
								+ idArray.get(i) + "' ");
						db.execSQL("delete from zhuyuan_xuncha_jilu_detail where xuncha_jilu_id = '"
								+ idArray.get(i) + "' ");
					}
					// db.execSQL("delete from zhuyuan_xuncha_jilu");
					// db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_xuncha_jilu'");
					// db.execSQL("delete from zhuyuan_xuncha_jilu_detail");
					// db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_xuncha_jilu_detail'");
					return true;
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	// 从本地上传护理统计数据到服务器
	public boolean hulitongjiDataUpload(String url) {
		String sql = "SELECT * FROM zhuyuan_hulitongji_jilu ";
		Cursor tongjiData = this.db.rawQuery(sql, new String[] {});
		if (tongjiData.getCount() <= 0) {
			tongjiData.close();
			return true;
		}
		ArrayList<String> idArray = new ArrayList<String>();
		JSONArray jsonArray = new JSONArray();
		while (tongjiData.moveToNext()) {
			JSONObject object = new JSONObject();
			try {
				idArray.add(tongjiData.getInt(tongjiData.getColumnIndex("id"))
						+ "");
				object.put("tongji_item_id", tongjiData.getString(tongjiData
						.getColumnIndex("tongji_item_id")));
				object.put("tongji_item_name", tongjiData.getString(tongjiData
						.getColumnIndex("tongji_item_name")));
				object.put("record_time", tongjiData.getString(tongjiData
						.getColumnIndex("record_time")));
				object.put("hushi_id", tongjiData.getString(tongjiData
						.getColumnIndex("hushi_id")));
				object.put("hushi_name", tongjiData.getString(tongjiData
						.getColumnIndex("hushi_name")));
				object.put("user_department", tongjiData.getString(tongjiData
						.getColumnIndex("user_department")));
				object.put("zhuyuan_id", tongjiData.getString(tongjiData
						.getColumnIndex("zhuyuan_id")));
				object.put("tongji_item_type", tongjiData.getString(tongjiData
						.getColumnIndex("tongji_item_type")));
				jsonArray.put(object);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		tongjiData.close();
		String jsonData = jsonArray.toString();
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		// pairList.add(new BasicNameValuePair("data", jsonData));
		if (context.current_application.appConf.http_data_compression_flag) {
			pairList.add(new BasicNameValuePair("data", new Gson()
					.toJson(mCompress.compress(jsonData.getBytes()))));
			pairList.add(new BasicNameValuePair("compression_http_data", "on"));
		} else {
			pairList.add(new BasicNameValuePair("data", jsonData));
		}
		pairList.add(new BasicNameValuePair("user_department_id",
				context.current_application.appConf.current_user_department_id));
		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse httpResponse = httpClient.execute(httpPost);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String retSrc = "";
				byte[] result = null;
				if (context.current_application.appConf.http_data_compression_flag) {
					result = EntityUtils.toByteArray(httpResponse.getEntity());
					// TiantanLog.error("wwl", "开始解压数据,解压前数据大小: " +
					// result.length);
					retSrc = mCompress.decompress(result);
					// TiantanLog.error("wwl",
					// "开始解压数据,解压后数据大小: " + retSrc.getBytes().length);
				} else {
					retSrc = EntityUtils.toString(httpResponse.getEntity());
				}
				// String strResult =
				// EntityUtils.toString(httpResponse.getEntity());
				JSONObject return_data = new JSONObject(retSrc);
				if (return_data.get("state").toString().equals("ok")) {
					for (int i = 0; i < idArray.size(); i++) {
						db.execSQL("delete from zhuyuan_hulitongji_jilu where id = '"
								+ idArray.get(i) + "' ");
					}
					// db.execSQL("delete from zhuyuan_hulitongji_jilu");
					// db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_hulitongji_jilu'");
					return true;
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}

	// 获取已有的标本数据
	public String getLocalBiaobenData() {
		String jsonData = "";
		String sql = "SELECT tiaoma FROM zhuyuan_fuzhujiancha ";
		Cursor biaobenData = this.db.rawQuery(sql, new String[] {});
		JSONArray jsonArray = new JSONArray();
		while (biaobenData.moveToNext()) {
			jsonArray.put(biaobenData.getString(biaobenData
					.getColumnIndex("tiaoma")));
		}
		biaobenData.close();
		jsonData = jsonArray.toString();
		return jsonData;
	}

	// 获取已有的医嘱数据
	public String getLocalYizhuData() {
		String jsonData = "";
		String sql = "SELECT zuhao FROM yizhu_info ";
		Cursor yizhuData = this.db.rawQuery(sql, new String[] {});
		JSONArray jsonArray = new JSONArray();
		while (yizhuData.moveToNext()) {
			jsonArray
					.put(yizhuData.getString(yizhuData.getColumnIndex("zuhao")));
		}
		yizhuData.close();
		jsonData = jsonArray.toString();
		return jsonData;
	}

	// 获取已有的医嘱数据
	public String getLocalYizhuHistorData() {
		String jsonData = "";
		String sql = "SELECT history_id FROM yizhu_zhixing_history_lishi ";
		Cursor yizhuHistorData = this.db.rawQuery(sql, new String[] {});
		JSONArray jsonArray = new JSONArray();
		while (yizhuHistorData.moveToNext()) {
			jsonArray.put(yizhuHistorData.getString(yizhuHistorData
					.getColumnIndex("history_id")));
		}
		yizhuHistorData.close();
		jsonData = jsonArray.toString();
		return jsonData;
	}

	// 获取已有的体征数据
	public String getLocalTizhengData() {
		String jsonData = "";
		String sql = "SELECT id FROM zhuyuan_tizheng_lishi ";
		Cursor tizhengData = this.db.rawQuery(sql, new String[] {});
		JSONArray jsonArray = new JSONArray();
		while (tizhengData.moveToNext()) {
			jsonArray.put(tizhengData.getString(tizhengData
					.getColumnIndex("id")));
		}
		tizhengData.close();
		jsonData = jsonArray.toString();
		return jsonData;
	}

	// 获取已有的巡查记录数据
	public String getLocalXunchaData() {
		String jsonData = "";
		String sql = "SELECT id FROM zhuyuan_xuncha_jilu_lishi ";
		Cursor xunchaData = this.db.rawQuery(sql, new String[] {});
		JSONArray jsonArray = new JSONArray();
		while (xunchaData.moveToNext()) {
			jsonArray
					.put(xunchaData.getString(xunchaData.getColumnIndex("id")));
		}
		xunchaData.close();
		jsonData = jsonArray.toString();
		return jsonData;
	}

	// 获取已有的巡查记录数据
	public String getLocalXunchaDetailData() {
		String jsonData = "";
		String sql = "SELECT id FROM zhuyuan_xuncha_jilu_detail ";
		Cursor xunchaData = this.db.rawQuery(sql, new String[] {});
		JSONArray jsonArray = new JSONArray();
		while (xunchaData.moveToNext()) {
			jsonArray
					.put(xunchaData.getString(xunchaData.getColumnIndex("id")));
		}
		xunchaData.close();
		jsonData = jsonArray.toString();
		return jsonData;
	}

	// 数据同步到本地
	public boolean dataDownload(String str) {
		String jsonData = "";
		String url = "";
		if (str.equals("huanzhe")) {
			url = context.current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/getHuanzheDataJsonChafang";
		} else if (str.equals("biaoben")) {
			url = context.current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/getJianchaDataJson";
			jsonData = getLocalBiaobenData();
		} else if (str.equals("yizhu")) {
			url = context.current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/getYizhuDataJson";
			jsonData = getLocalYizhuData();
		} else if (str.equals("yizhuState")) {
			url = context.current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/getYizhuStateDataJson";
			jsonData = getLocalYizhuData();
		} else if (str.equals("yizhuDelete")) {
			url = context.current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/getTingzhiYizhuSql";
		} else if (str.equals("allYizhu")) {
			if ("v415".equals(current_application.featureConf.yizhuVersion)) {
				url = context.current_application.appConf.server_url
						+ "Mobile/YidongChafangClientCommunication/getYizhuAllInfoJsonV415";
			} else {
				url = context.current_application.appConf.server_url
						+ "Mobile/YidongChafangClientCommunication/getYizhuAllInfoJson";
			}
		} else if (str.equals("yizhuHistor")) {
			if ("v415".equals(current_application.featureConf.yizhuVersion)) {
				url = context.current_application.appConf.server_url
						+ "Mobile/YidongChafangClientCommunication/getYizhuHistoryDataJsonV415";
			} else {
				url = context.current_application.appConf.server_url
						+ "Mobile/YidongChafangClientCommunication/getYizhuHistoryDataJson";
			}
			jsonData = getLocalYizhuHistorData();
		} else if (str.equals("tizheng")) {
			url = context.current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/getTizhengDataJson";
			jsonData = getLocalTizhengData();
		} else if (str.equals("xuncha")) {
			url = context.current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/getXunchaDataJson";
			jsonData = getLocalXunchaData();
		} else if (str.equals("xunchaDetail")) {
			url = context.current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/getXunchaDetailDataJson";
			jsonData = getLocalXunchaDetailData();
		} else if (str.equals("xinyizhutixing")) {
			url = context.current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/getYizhuTixingData";
		} else {
			return false;
		}
		// TiantanLog.error("wwl", "开始dataDownload，url：" + url
		// + ", jsonData size:" + jsonData.length() + ", byte[] size:"
		// + jsonData.getBytes().length);
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();

		pairList.add(new BasicNameValuePair("user_department",
 context.current_application.appConf.current_user_department));
		pairList.add(new BasicNameValuePair("user_department_id",
				context.current_application.appConf.current_user_department_id));

		if (context.current_application.appConf.http_data_compression_flag) {
			pairList.add(new BasicNameValuePair("data", new Gson()
					.toJson(mCompress.compress(jsonData.getBytes()))));
			pairList.add(new BasicNameValuePair("compression_http_data", "on"));
		} else {
			pairList.add(new BasicNameValuePair("data", jsonData));
		}

		HttpPost httpPost;
		try {
			httpPost = new HttpPost(url);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse httpResponse = httpClient.execute(httpPost);

			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				String retSrc = "";
				byte[] result = null;
				if (context.current_application.appConf.http_data_compression_flag) {
					result = EntityUtils.toByteArray(httpResponse.getEntity());					
					retSrc = mCompress.decompress(result);
				} else {
					retSrc = EntityUtils.toString(httpResponse.getEntity());
				}

				JSONObject jsonObject = new JSONObject(retSrc);
				if ("true".equals(jsonObject.get("response_state").toString())) {
					JSONArray sql_arr = new JSONArray();

					sql_arr = (JSONArray) jsonObject.get("update_sql");
					for (int i = 0; i < sql_arr.length(); i++) {
						try {
							// 检查数据库更新状态，如果存在锁死就不更新数据
							if (current_application.featureConf.yizhu_local_update == true
									&& (str.equals("allYizhu") || str
											.equals("yizhu"))) {

							} else if (current_application.featureConf.tizheng_local_update == true
									&& str.equals("tizheng")) {

							} else {
								if (str.equals("huanzhe")) {
									db.execSQL("delete from zhuyuan_basic_info");
									db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_basic_info'");
								}

								if (str.equals("allYizhu")
										|| str.equals("yizhu")) {
									String sql = "select * from yizhu_info where  state <>'' ";
									Cursor yizhuData = this.db.rawQuery(sql,
											new String[] {});
									if (yizhuData.getCount() <= 0) {
										yizhuData.close();
										db.execSQL(sql_arr.get(i).toString());
									} else {
										yizhuData.close();
									}

								} else {
									db.execSQL(sql_arr.get(i).toString());
								}
							}
						} catch (Exception e) {
							continue;
						} finally {

						}
					}
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}

	// 单个患者数据同步到本地
	// public boolean oneDataDownload(String str, String zhuyuan_id) {
	// String url = "";
	// if (str.equals("yizhu")) {
	// url = context.current_application.appConf.server_url
	// + "Mobile/YidongChafangClientCommunication/getOneHuanzheYizhuDataJson";
	// } else if (str.equals("yizhuHistor")) {
	// url = context.current_application.appConf.server_url
	// + "Mobile/YidongChafangClientCommunication/getOneHuanzheYizhuHistoryData";
	// } else if (str.equals("tizheng")) {
	// url = context.current_application.appConf.server_url
	// + "Mobile/YidongChafangClientCommunication/getOneHuanzheTizhengListJson";
	// } else {
	// return false;
	// }
	// List<NameValuePair> pairList = new ArrayList<NameValuePair>();
	// pairList.add(new BasicNameValuePair("zhuyuan_id", zhuyuan_id));
	// pairList.add(new BasicNameValuePair("user_department",
	// context.current_application.current_user_department));
	// pairList.add(new BasicNameValuePair("user_department_id",
	// context.current_application.current_user_department_id));
	// HttpPost httpPost;
	// try {
	// httpPost = new HttpPost(url);
	// httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
	// HttpClient httpClient = new DefaultHttpClient();
	// HttpResponse httpResponse = httpClient.execute(httpPost);
	// if (httpResponse.getStatusLine().getStatusCode() == 200) {
	// String strResult = EntityUtils.toString(httpResponse
	// .getEntity());
	// JSONObject jsonObject = new JSONObject(strResult);
	// if (jsonObject.get("response_state").toString().equals("true")) {
	// JSONArray sql_arr = new JSONArray();
	// sql_arr = (JSONArray) jsonObject.get("update_sql");
	// for (int i = 0; i < sql_arr.length(); i++) {
	// try {
	// db.execSQL(sql_arr.get(i).toString());
	// } catch (Exception e) {
	// continue;
	// } finally {
	//
	// }
	// }
	// }
	// }
	// } catch (Exception e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// }
	// return true;
	// }

	public boolean syncDataWithServerInterval() {
		List<NameValuePair> pairList = new ArrayList<NameValuePair>();
		pairList.add(new BasicNameValuePair("user_department",
 context.current_application.appConf.current_user_department));
		pairList.add(new BasicNameValuePair("user_department_id",
				context.current_application.appConf.current_user_department_id));
		HttpPost httpPost;
		try {
			httpPost = new HttpPost(this.context.current_application.appConf.server_url
					+ "Mobile/YidongChafangClientCommunication/asyncWithServer/user_number/"
					+ this.context.current_application.appConf.current_user_number);
			httpPost.setEntity(new UrlEncodedFormEntity(pairList, HTTP.UTF_8));
			HttpClient httpClient = new DefaultHttpClient();
			HttpResponse httpResponse = httpClient.execute(httpPost);
			if (httpResponse.getStatusLine().getStatusCode() == 200) {
				// String strResult =
				// EntityUtils.toString(httpResponse.getEntity());

				// 使用StringBuilder来获取可能较大的字符串，优化内存使用
				BufferedReader bufferedReader = new BufferedReader(
						new InputStreamReader(httpResponse.getEntity()
								.getContent(), "UTF-8"), 8 * 1024);
				StringBuilder entityStringBuilder = new StringBuilder();
				String line = null;
				while ((line = bufferedReader.readLine()) != null) {
					entityStringBuilder.append(line);
				}

				JSONObject response_info = new JSONObject(
						entityStringBuilder.toString());

				if (response_info.get("response_state").toString() == "true") {
					// 存储患者信息
					try {
						db.execSQL("delete from zhuyuan_basic_info");
						db.execSQL("update sqlite_sequence SET seq = 0 where name ='zhuyuan_basic_info'");
						db.execSQL(response_info.get(
								"zhuyuan_basic_info_update_sql").toString());
					} catch (Exception e) {
					} finally {

					}

					// 存储医嘱信息
					if (!response_info.get("yizhu_info_update_sql").equals("")) {
						JSONArray yizhu_sql_arr = new JSONArray();
						yizhu_sql_arr = (JSONArray) response_info
								.get("yizhu_info_update_sql");
						for (int i = 0; i < yizhu_sql_arr.length(); i++) {
							try {
								db.execSQL(yizhu_sql_arr.get(i).toString());
							} catch (Exception e) {
								continue;
							} finally {

							}
						}
					}

					// 同步医嘱执行历史信息
					if (!response_info.get("yizhu_lishi_update_sql").equals("")) {
						JSONArray yizhu_lishi_arr = new JSONArray();
						yizhu_lishi_arr = (JSONArray) response_info
								.get("yizhu_lishi_update_sql");
						for (int i = 0; i < yizhu_lishi_arr.length(); i++) {
							try {
								db.execSQL(yizhu_lishi_arr.get(i).toString());
							} catch (Exception e) {
								continue;
							} finally {

							}
						}
					}

					// 删除停止医嘱信息
					if (!response_info.get("yizhu_tingzhi_update_sql").equals(
							"")) {
						try {
							db.execSQL(response_info.get(
									"yizhu_tingzhi_update_sql").toString());
						} catch (Exception e) {
						} finally {

						}
					}

					// 存储标本信息
					if (!response_info.get("biaoben_info_update_sql")
							.equals("")) {
						JSONArray biaoben_sql_arr = new JSONArray();
						biaoben_sql_arr = (JSONArray) response_info
								.get("biaoben_info_update_sql");
						for (int i = 0; i < biaoben_sql_arr.length(); i++) {
							try {
								db.execSQL(biaoben_sql_arr.get(i).toString());
							} catch (Exception e) {
								continue;
							} finally {

							}
						}
					}
					// db.execSQL(response_info.get("yizhu_zhixing_history_update_sql").toString());

					// 存储床位信息
					if (!response_info.get("bingchuang_update_sql").equals("")) {
						JSONArray chuangwei_sql_arr = new JSONArray();
						chuangwei_sql_arr = (JSONArray) response_info
								.get("bingchuang_update_sql");
						for (int i = 0; i < chuangwei_sql_arr.length(); i++) {
							try {
								db.execSQL(chuangwei_sql_arr.get(i).toString());
							} catch (Exception e) {
								continue;
							} finally {

							}
						}
					}

					// 存储体征数据
					if (!response_info.get("zhuyuan_tizheng_update_sql")
							.equals("")) {
						JSONArray tizheng_sql_arr = new JSONArray();
						tizheng_sql_arr = (JSONArray) response_info
								.get("zhuyuan_tizheng_update_sql");
						for (int i = 0; i < tizheng_sql_arr.length(); i++) {
							try {
								db.execSQL(tizheng_sql_arr.get(i).toString());
							} catch (Exception e) {
								continue;
							} finally {

							}
						}
					}

					// 存储巡查记录历史数据
					if (!response_info.get("zhuyuan_xunchajilu_update_sql")
							.equals("")) {
						JSONArray xuncha_sql_arr = new JSONArray();
						xuncha_sql_arr = (JSONArray) response_info
								.get("zhuyuan_xunchajilu_update_sql");
						for (int i = 0; i < xuncha_sql_arr.length(); i++) {
							try {
								db.execSQL(xuncha_sql_arr.get(i).toString());
							} catch (Exception e) {
								continue;
							} finally {

							}
						}
					}

					// 存储巡查记录详细历史数据
					if (!response_info.get(
							"zhuyuan_xunchajilu_detail_update_sql").equals("")) {
						JSONArray xuncha_sql_arr = new JSONArray();
						xuncha_sql_arr = (JSONArray) response_info
								.get("zhuyuan_xunchajilu_detail_update_sql");
						for (int i = 0; i < xuncha_sql_arr.length(); i++) {
							try {
								db.execSQL(xuncha_sql_arr.get(i).toString());
							} catch (Exception e) {
								continue;
							} finally {

							}
						}
					}

					// 存储情景模式数据
					if (!response_info.get("qingjing_update_sql").equals("")) {
						JSONArray qingjing_sql_arr = new JSONArray();
						qingjing_sql_arr = (JSONArray) response_info
								.get("qingjing_update_sql");
						for (int i = 0; i < qingjing_sql_arr.length(); i++) {
							try {
								db.execSQL(qingjing_sql_arr.get(i).toString());
							} catch (Exception e) {
								continue;
							} finally {

							}
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

}
