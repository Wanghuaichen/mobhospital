/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: ChafangOverviewActivity.java
 * @Package com.tiantanhehe.yidongchafang.features.overview
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月8日 上午11:08:50 
 * @version V4.0   
 */
/**   
 * @Description: 添加功能 
 * @author Arno <zhongxinzhen@tiantanhehe.com>
 * @date 2016年7月14日 上午10:23:50 
 * @version V5.0   
 */
package com.tiantanhehe.yidongchafang.features.overview;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tiantanhehe.yidongchafang.R;
import com.tiantanhehe.yidongchafang.dao.network.HttpHelper;
import com.tiantanhehe.yidongchafang.dao.network.IHandleHttpHelperResult;
import com.tiantanhehe.yidongchafang.views.activities.YiDongYiHuBrowserActivity;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.text.method.ScrollingMovementMethod;
import android.widget.TextView;

/**
 * @ClassName: ChafangOverviewActivity
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月8日 上午11:08:50
 * 
 */
public class ZhuyuanOverviewActivity extends YiDongYiHuBrowserActivity {

	// 基本信息

	private TextView nianlingTextView = null;
	private TextView xingbieTextView = null;
	private TextView zhuyuanhaoTextView = null;
	private TextView bingchuanghaoTextView = null;
	private TextView suozaiBingquTextView = null;
	private TextView zhuyuanZhuangtaiTextView = null;
	private TextView ruyuanRiqiTextView = null;
	// 最新身体状况
	private TextView tiwenTextView = null;
	private TextView maiboTextView = null;
	private TextView shengaoTextView = null;
	private TextView xueyaTextView = null;
	private TextView chuliangTextView = null;
	private TextView ruliangTextView = null;
	// 最新护理状况
	private TextView huliTextView = null;
	// 最近病程记录
	private TextView bingchengJiluTextView = null;
	// 相关负责医师
	private TextView kezhurenTextView = null;
	private TextView zhurenYishiTextView = null;
	private TextView zhuzhiYishiTextView = null;
	private TextView zhuyuanYishiTextView = null;
	private TextView jinxiuYishiTextView = null;
	private TextView shixiYishiTextView = null;
	private TextView yanjiushengShixiYishiTextView = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_zhuyuan_zonglan);
		this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		// 初始化界面
		dataInit();
		// 获取后台传递的数据并给界面加载数据
		getDataFromNet();

	}

	/**
	 * 数据初始化
	 */
	private void dataInit() {
		// 基本信息
		nianlingTextView = (TextView) findViewById(R.id.nianling);
		xingbieTextView = (TextView) findViewById(R.id.xingbie);
		zhuyuanhaoTextView = (TextView) findViewById(R.id.zhuyuan_id);
		bingchuanghaoTextView = (TextView) findViewById(R.id.bingchuang_hao);
		suozaiBingquTextView = (TextView) findViewById(R.id.suozai_bingqu);
		zhuyuanZhuangtaiTextView = (TextView) findViewById(R.id.zhuyuan_zhuangtai);
		ruyuanRiqiTextView = (TextView) findViewById(R.id.ruyuan_riqi_time);
		// 最新身体状况
		tiwenTextView = (TextView) findViewById(R.id.zuijin_tiwen);
		maiboTextView = (TextView) findViewById(R.id.zuijin_maibo);
		shengaoTextView = (TextView) findViewById(R.id.zuijin_shengao);
		xueyaTextView = (TextView) findViewById(R.id.zuijin_xueya);
		chuliangTextView = (TextView) findViewById(R.id.zuijin_chuliang);
		ruliangTextView = (TextView) findViewById(R.id.zuijin_ruliang);
		// 最新护理状况
		huliTextView = (TextView) findViewById(R.id.zuijin_huli_zhuangkuang);
		// 最近病程记录
		bingchengJiluTextView = (TextView) findViewById(R.id.zuixin_bingcheng_jilu);
		bingchengJiluTextView.setMovementMethod(ScrollingMovementMethod.getInstance());
		// 相关负责医师
		kezhurenTextView = (TextView) findViewById(R.id.kezhuren);
		zhurenYishiTextView = (TextView) findViewById(R.id.zhuren_yishi);
		zhuzhiYishiTextView = (TextView) findViewById(R.id.zhuzhi_yishi);
		zhuyuanYishiTextView = (TextView) findViewById(R.id.zhuyuan_yishi);
		jinxiuYishiTextView = (TextView) findViewById(R.id.jinxiu_yishi);
		shixiYishiTextView = (TextView) findViewById(R.id.shixi_yishi);
		yanjiushengShixiYishiTextView = (TextView) findViewById(R.id.yanjiusheng_shixi_yishi);

	}

	/**
	 * 获取后台传递的数据
	 * 
	 * @return
	 */
	private void getDataFromNet() {
		String url = current_application.appConf.server_url
				+ "Mobile/YidongChafangClientCommunication/showPatientZhuyuanDetailPadJson";
		Map<String, String> map = new HashMap<String, String>() {
			private static final long serialVersionUID = 1L;

			{
				put("zhuyuan_id", current_application.appConf.current_patient_zhuyuan_id);
			}
		};

		new HttpHelper(ZhuyuanOverviewActivity.this, new IHandleHttpHelperResult() {
			@Override
			public void handleResult(final List<Map<String, Object>> httpData) {
				Map<String, Object> resultMap = new HashMap<String, Object>();
				if (httpData != null && httpData.size() > 0) {
					for (Map<String, Object> map_http : httpData) {
						resultMap = map_http;
					}
					dataInView(resultMap);// 加载界面数据
					fontOverstriking();// 界面样式修改

				}
			}

		}).getDataFromServer(url, map);
	}

	/**
	 * 给界面加载数据
	 * 
	 * @author arno
	 * @param resultMap
	 *            界面数据
	 */
	private void dataInView(Map<String, Object> resultMap) {

		zhuyuanhaoTextView.setText(current_application.appConf.current_patient_zhuyuan_id);
		if (resultMap.get("staus").equals("1")) {
			// 年龄
			if (resultMap.get("nianling") != null && !resultMap.get("nianling").equals("")) {
				nianlingTextView.setText((String) resultMap.get("nianling"));
			} else {
				nianlingTextView.setText("");
			}
			// 性别
			if (resultMap.get("xingbie") != null && !resultMap.get("xingbie").equals("")) {
				xingbieTextView.setText((String) resultMap.get("xingbie"));
			} else {
				xingbieTextView.setText("");
			}
			// 病床号
			if (resultMap.get("bingchuang_hao") != null && !resultMap.get("bingchuang_hao").equals("")) {
				bingchuanghaoTextView.setText((String) resultMap.get("bingchuang_hao"));
			} else {
				bingchuanghaoTextView.setText("");
			}
			// 所在病区
			if (resultMap.get("suozai_bingqu") != null && !resultMap.get("suozai_bingqu").equals("")) {
				suozaiBingquTextView.setText((String) resultMap.get("suozai_bingqu"));
			} else {
				suozaiBingquTextView.setText("");
			}
			// 住院状态
			if (resultMap.get("zhuyuan_zhuangtai") != null && !resultMap.get("zhuyuan_zhuangtai").equals("")) {
				zhuyuanZhuangtaiTextView.setText((String) resultMap.get("zhuyuan_zhuangtai"));
			} else {
				zhuyuanZhuangtaiTextView.setText("");
			}
			// 入院日期
			if (resultMap.get("ruyuan_riqi") != null && !resultMap.get("ruyuan_riqi").equals("")) {
				ruyuanRiqiTextView.setText((String) resultMap.get("ruyuan_riqi"));
			} else {
				ruyuanRiqiTextView.setText("");
			}
			// 科主任
			if (resultMap.get("kezhuren_name") != null && !resultMap.get("kezhuren_name").equals("")) {
				kezhurenTextView.setText((String) resultMap.get("kezhuren_name"));
			} else {
				kezhurenTextView.setText("");
			}
			// 主(副)任医师
			if (resultMap.get("zhurenyishi_neme") != null && !resultMap.get("zhurenyishi_neme").equals("")) {
				zhurenYishiTextView.setText((String) resultMap.get("zhurenyishi_neme"));
			} else {
				zhurenYishiTextView.setText("");
			}
			// 主治医师
			if (resultMap.get("zhuzhi_yishi_neme") != null && !resultMap.get("zhuzhi_yishi_neme").equals("")) {
				zhuzhiYishiTextView.setText((String) resultMap.get("zhuzhi_yishi_neme"));
			} else {
				zhuzhiYishiTextView.setText("");
			}
			// 住院医师
			if (resultMap.get("zhuyuan_yishi_name") != null && !resultMap.get("zhuyuan_yishi_name").equals("")) {
				zhuyuanYishiTextView.setText((String) resultMap.get("zhuyuan_yishi_name"));
			} else {
				zhuyuanYishiTextView.setText("");
			}
			// 进修医师
			if (resultMap.get("jinxiu_yishi_name") != null && !resultMap.get("jinxiu_yishi_name").equals("")) {
				jinxiuYishiTextView.setText((String) resultMap.get("jinxiu_yishi_name"));
			} else {
				jinxiuYishiTextView.setText("");
			}
			// 实习医师
			if (resultMap.get("shixi_yishi_name") != null && !resultMap.get("shixi_yishi_name").equals("")) {
				shixiYishiTextView.setText((String) resultMap.get("shixi_yishi_name"));
			} else {
				shixiYishiTextView.setText("");
			}
			// 研究生实习医师
			if (resultMap.get("yanjiusheng_shixi_yishi_name") != null
					&& !resultMap.get("yanjiusheng_shixi_yishi_name").equals("")) {
				yanjiushengShixiYishiTextView.setText((String) resultMap.get("yanjiusheng_shixi_yishi_name"));
			} else {
				yanjiushengShixiYishiTextView.setText("");
			}
			// 体温
			if (resultMap.get("tiwen") != null && !resultMap.get("tiwen").equals("")) {
				tiwenTextView.setText((String) resultMap.get("tiwen"));
			} else {
				tiwenTextView.setText("");
			}
			// 脉搏
			if (resultMap.get("maibo") != null && !resultMap.get("maibo").equals("")) {
				maiboTextView.setText((String) resultMap.get("maibo"));
			} else {
				maiboTextView.setText("");
			}
			// 血压
			if (resultMap.get("xueya") != null && !resultMap.get("xueya").equals("")) {
				xueyaTextView.setText((String) resultMap.get("xueya"));
			} else {
				xueyaTextView.setText("");
			}
			// 身高
			if (resultMap.get("shengao") != null && !resultMap.get("shengao").equals("")) {
				shengaoTextView.setText((String) resultMap.get("shengao"));
			} else {
				shengaoTextView.setText("");
			}
			// 入量
			if (resultMap.get("ruliang") != null && !resultMap.get("ruliang").equals("")) {
				ruliangTextView.setText((String) resultMap.get("ruliang"));
			} else {
				ruliangTextView.setText("");
			}
			// 出量
			if (resultMap.get("chuliang") != null && !resultMap.get("chuliang").equals("")) {
				chuliangTextView.setText((String) resultMap.get("chuliang"));
			} else {
				chuliangTextView.setText("");
			}
			// 护理状况
			if (resultMap.get("hulizhuangkuang") != null && !resultMap.get("hulizhuangkuang").equals("")) {
				huliTextView.setText((String) resultMap.get("hulizhuangkuang"));
			} else {
				huliTextView.setText("");
			}
			// 病程记录
			if (resultMap.get("bingchengjilu") != null && !resultMap.get("bingchengjilu").equals("")) {
				bingchengJiluTextView.setText((String) resultMap.get("bingchengjilu"));
			} else {
				bingchengJiluTextView.setText("");
			}

		}
	}

	/**
	 * @author arno 界面样式修改
	 */
	protected void fontOverstriking() {

		// 基本信息
		// TextView jibenXinxiTextView = (TextView)
		// findViewById(R.id.jiben_xinxi);
		// TextPaint jibenXinxi = jibenXinxiTextView.getPaint();
		// jibenXinxi.setFakeBoldText(true);
		// TextView nianlingBtTextView = (TextView)
		// findViewById(R.id.nianling_bt);
		// TextPaint nianlingTextPaint = nianlingBtTextView.getPaint();
		// nianlingTextPaint.setFakeBoldText(true);
		// TextView xingbieBtTextView = (TextView)
		// findViewById(R.id.xingbie_bt);
		// TextPaint xingbie = xingbieBtTextView.getPaint();
		// xingbie.setFakeBoldText(true);
		// TextView zhuyuanhaoBtTextView = (TextView)
		// findViewById(R.id.zhuyuan_id_bt);
		// TextPaint zhuyuanhao = zhuyuanhaoBtTextView.getPaint();
		// zhuyuanhao.setFakeBoldText(true);
		// TextView bingchuanghaoBtTextView = (TextView)
		// findViewById(R.id.bingchuang_hao_bt);
		// TextPaint bingchuanghao = bingchuanghaoBtTextView.getPaint();
		// bingchuanghao.setFakeBoldText(true);
		// TextView suozaiBingquBtTextView = (TextView)
		// findViewById(R.id.suozai_bingqu_bt);
		// TextPaint suozaiBingqu = suozaiBingquBtTextView.getPaint();
		// suozaiBingqu.setFakeBoldText(true);
		// TextView zhuyuanZhuangtaiBtTextView = (TextView)
		// findViewById(R.id.zhuyuan_zhuangtai_bt);
		// TextPaint zhuyuanZhuangtai =
		// zhuyuanZhuangtaiBtTextView.getPaint();
		// zhuyuanZhuangtai.setFakeBoldText(true);
		// TextView ruyuanRiqiBtTextView = (TextView)
		// findViewById(R.id.ruyuan_riqi_time_bt);
		// TextPaint ruyuanRiqi = ruyuanRiqiBtTextView.getPaint();
		// ruyuanRiqi.setFakeBoldText(true);
		// // 最新身体状况
		// TextView zuijinShentiZhuangkuangTextView = (TextView)
		// findViewById(R.id.tizheng_xinxi);
		// TextPaint zuijinShentiZhuangkuang =
		// zuijinShentiZhuangkuangTextView.getPaint();
		// zuijinShentiZhuangkuang.setFakeBoldText(true);
		// TextView tiwenBtTextView = (TextView)
		// findViewById(R.id.zuijin_tiwen_bt);
		// TextPaint tiwen = tiwenBtTextView.getPaint();
		// tiwen.setFakeBoldText(true);
		// TextView maiboBtTextView = (TextView)
		// findViewById(R.id.zuijin_maibo_bt);
		// TextPaint maibo = maiboBtTextView.getPaint();
		// maibo.setFakeBoldText(true);
		// TextView shengaoBtTextView = (TextView)
		// findViewById(R.id.zuijin_shengao_bt);
		// TextPaint shengao = shengaoBtTextView.getPaint();
		// shengao.setFakeBoldText(true);
		// TextView xueyaBtTextView = (TextView)
		// findViewById(R.id.zuijin_xueya_bt);
		// TextPaint xueya = xueyaBtTextView.getPaint();
		// xueya.setFakeBoldText(true);
		// TextView chuliangBtTextView = (TextView)
		// findViewById(R.id.zuijin_chuliang_bt);
		// TextPaint chuliang = chuliangBtTextView.getPaint();
		// chuliang.setFakeBoldText(true);
		// TextView ruliangBtTextView = (TextView)
		// findViewById(R.id.zuijin_ruliang_bt);
		// TextPaint ruliang = ruliangBtTextView.getPaint();
		// ruliang.setFakeBoldText(true);
		// // 最近护理状况
		// TextView zuijinHuliZhuangkuangTextView = (TextView)
		// findViewById(R.id.zuijin_huli);
		// TextPaint zuijinHuliZhuangkuang =
		// zuijinHuliZhuangkuangTextView.getPaint();
		// zuijinHuliZhuangkuang.setFakeBoldText(true);
		// // 最近病程记录
		// TextView zuijinBingxhengJiluTextView = (TextView)
		// findViewById(R.id.zuixin_bingchengjilu);
		// TextPaint zuijinBingxhengJilu =
		// zuijinBingxhengJiluTextView.getPaint();
		// zuijinBingxhengJilu.setFakeBoldText(true);
		// // 相关责任
		// TextView xiangguanZerenYishiTextView = (TextView)
		// findViewById(R.id.xiangguan_zeren_yishi);
		// TextPaint xiangguanZerenYishi =
		// xiangguanZerenYishiTextView.getPaint();
		// xiangguanZerenYishi.setFakeBoldText(true);
		// TextView kezhurenBtTextView = (TextView)
		// findViewById(R.id.kezhuren_bt);
		// TextPaint kezhuren = kezhurenBtTextView.getPaint();
		// kezhuren.setFakeBoldText(true);
		// TextView zhurenYishiBtTextView = (TextView)
		// findViewById(R.id.zhuren_yishi_bt);
		// TextPaint zhurenYishi = zhurenYishiBtTextView.getPaint();
		// zhurenYishi.setFakeBoldText(true);
		// TextView huzhiYishiBtTextView = (TextView)
		// findViewById(R.id.zhuzhi_yishi_bt);
		// TextPaint huzhiYishi = huzhiYishiBtTextView.getPaint();
		// huzhiYishi.setFakeBoldText(true);
		// TextView zhuyuanYishiBtTextView = (TextView)
		// findViewById(R.id.zhuyuan_yishi_bt);
		// TextPaint zhuyuanYishi = zhuyuanYishiBtTextView.getPaint();
		// zhuyuanYishi.setFakeBoldText(true);
		// TextView jinxiuYishiBtTextView = (TextView)
		// findViewById(R.id.jinxiu_yishi_bt);
		// TextPaint jinxiuYishi = jinxiuYishiBtTextView.getPaint();
		// jinxiuYishi.setFakeBoldText(true);
		// TextView shixiYishiBtTextView = (TextView)
		// findViewById(R.id.shixi_yishi_bt);
		// TextPaint shixiYishi = shixiYishiBtTextView.getPaint();
		// shixiYishi.setFakeBoldText(true);
		// TextView yanjiushengShixiYishiBtTextView = (TextView)
		// findViewById(R.id.yanjiusheng_shixi_yishi_bt);
		// TextPaint yanjiushengShixiYishi =
		// yanjiushengShixiYishiBtTextView.getPaint();
		// yanjiushengShixiYishi.setFakeBoldText(true);

	}

}
