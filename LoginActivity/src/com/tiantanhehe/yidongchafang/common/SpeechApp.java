/**
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: LazySingleton.java
 * @Package com.iflytek.mscv5plusdemo
 * @Description: TODO
 * @author Hu Ri Chang <tianran@tiantanhehe.com>
 * @date 2016-2-29 下午8:22:28
 * @version V4.0
 */
package com.tiantanhehe.yidongchafang.common;

import com.iflytek.cloud.InitListener;
import com.iflytek.cloud.SpeechConstant;
import com.iflytek.cloud.SpeechError;
import com.iflytek.cloud.SpeechSynthesizer;
import com.iflytek.cloud.SpeechUtility;
import com.iflytek.cloud.SynthesizerListener;
import com.iflytek.cloud.util.ResourceUtil;
import com.iflytek.cloud.util.ResourceUtil.RESOURCE_TYPE;
import com.tiantanhehe.yidongchafang.R;

import android.content.Context;
import android.os.Bundle;


/**
 * @ClassName: LazySingleton
 * @Description: TODO
 * @author Tian Ran <tianran@tiantanhehe.com>
 * @date 2016-2-29 下午8:22:28
 * 
 */
public class SpeechApp {

	// 懒汉式单例模式
	// 比较懒，在类加载时，不创建实例，因此类加载速度快，但运行时获取对象的速度慢


	private static SpeechApp intance = null;// 静态私用成员，没有初始化

	public static Context mContext = null;

	private static String TAG = "TtsDemo";

	// 语音合成对象
	private SpeechSynthesizer mTts;


	// 默认本地发音人
	public static String voicerLocal = "xiaoyan";


	// 本地发音人列表
	// private final String[] localVoicersEntries;
	//
	// private final String[] localVoicersValue;


	// 引擎类型
	// private final String mEngineType = SpeechConstant.TYPE_LOCAL;

	// private SharedPreferences mSharedPreferences;


	private SpeechApp() {
		init();
	}


	private void init() {
		// 应用程序入口处调用,避免手机内存过小，杀死后台进程,造成SpeechUtility对象为null
		// 设置你申请的应用appid
		StringBuffer param = new StringBuffer();
		param.append("appid=" + mContext.getString(R.string.app_id));
		param.append(",");
		// 设置使用v5+
		param.append(SpeechConstant.ENGINE_MODE + "=" + SpeechConstant.MODE_MSC);
		SpeechUtility.createUtility(mContext, param.toString());

		// 初始化合成对象
		mTts = SpeechSynthesizer.createSynthesizer(mContext, mTtsInitListener);
		// 本地发音人名称列表
		// localVoicersEntries =
		// mContext.getResources().getStringArray(R.array.voicer_local_entries);
		// localVoicersValue =
		// mContext.getResources().getStringArray(R.array.voicer_local_values);

		setParam();

		// mTts.startSpeaking("你好", mTtsListener);
	}


	public static SpeechApp getInstance( Context context ) {
		// 静态，同步，公开访问点
		mContext = context;
		if ( intance == null ) {
			intance = new SpeechApp();
		}
		return intance;
	}


	public void speak( String text ) {
		mTts.startSpeaking(text, mTtsListener);
	}

	/**
	 * 初始化监听。
	 */
	private final InitListener mTtsInitListener = new InitListener() {

		@Override
		public void onInit( int code ) {
		}
	};


	/**
	 * 参数设置
	 * 
	 * @param param
	 * @return
	 */
	private void setParam() {
		// 清空参数
		mTts.setParameter(SpeechConstant.PARAMS, null);
		// 设置合成
		// if ( mEngineType.equals(SpeechConstant.TYPE_CLOUD) ) {} else {
		// 设置使用本地引擎
		mTts.setParameter(SpeechConstant.ENGINE_TYPE, SpeechConstant.TYPE_LOCAL);
		// 设置发音人资源路径
		mTts.setParameter(ResourceUtil.TTS_RES_PATH, getResourcePath());
		// 设置发音人
		mTts.setParameter(SpeechConstant.VOICE_NAME, voicerLocal);

		// 设置数字读法
		mTts.setParameter(SpeechConstant.PARAMS, "rdn=2");
		// }

		// // 设置语速
		// mTts.setParameter(SpeechConstant.SPEED, 50 + "");
		//
		// // 设置音调
		// mTts.setParameter(SpeechConstant.PITCH,
		// mSharedPreferences.getString("pitch_preference", "50"));
		//
		// // 设置音量
		// mTts.setParameter(SpeechConstant.VOLUME,
		// mSharedPreferences.getString("volume_preference", "50"));
		//
		// // 设置播放器音频流类型
		// mTts.setParameter(SpeechConstant.STREAM_TYPE,
		// mSharedPreferences.getString("stream_preference", "3"));
	}


	// 获取发音人资源路径
	private String getResourcePath() {
		StringBuffer tempBuffer = new StringBuffer();
		// 合成通用资源
		tempBuffer.append(ResourceUtil.generateResourcePath(mContext, RESOURCE_TYPE.assets, "tts/common.jet"));
		tempBuffer.append(";");
		// 发音人资源
		tempBuffer.append(ResourceUtil.generateResourcePath(mContext, RESOURCE_TYPE.assets, "tts/"
				+ voicerLocal + ".jet"));
		return tempBuffer.toString();
	}

	/**
	 * 合成回调监听。
	 */
	private final SynthesizerListener mTtsListener = new SynthesizerListener() {

		@Override
		public void onSpeakBegin() {
		}


		@Override
		public void onSpeakPaused() {
		}


		@Override
		public void onSpeakResumed() {
		}


		@Override
		public void onBufferProgress( int percent, int beginPos, int endPos, String info ) {
		}


		@Override
		public void onSpeakProgress( int percent, int beginPos, int endPos ) {
		}


		@Override
		public void onCompleted( SpeechError error ) {
		}


		@Override
		public void onEvent( int arg0, int arg1, int arg2, Bundle arg3 ) {
			// TODO Auto-generated method stub

		}
	};
}
