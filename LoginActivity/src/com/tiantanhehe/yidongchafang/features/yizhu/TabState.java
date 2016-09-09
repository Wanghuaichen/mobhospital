package com.tiantanhehe.yidongchafang.features.yizhu;

import java.util.ArrayList;
import java.util.List;

import com.tiantanhehe.yidongchafang.dao.db.wrapper.DaoWrapper;

import android.database.Cursor;

/**
 * 医嘱的状态
 * 
 * @ClassName: TabState
 * @Description: TODO
 * @author Gao ZhiDong <gaozhidong@tiantanhehe.com>
 * @date 2016-1-27 上午10:45:09
 * 
 */
public class TabState extends DaoWrapper {

	// /**
	// * 医嘱执行顺序排序
	// */
	// private int stateSort;

	/**
	 * tab的title
	 */
	private String tabTitle;
	/**
	 * tab的Tag
	 */
	private String tabTag;
	/**
	 * 执行历史的名字
	 */
	private String zhixingType;
	/**
	 * 当前状态是否能被执行
	 */
	private boolean enableZhixing = true;
	/**
	 * 前一个执行状态
	 */
	private String preZhixingState;
	/**
	 * 当前执行状态
	 */
	private String currentZhixingState;
	/**
	 * 当前执行状态对应的初始状态
	 */
	private String currentChushiState;
	/**
	 * 下一个执行状态
	 */
	private String nextZhixingState;
	/**
	 * 取消button文字 空不显示
	 */
	private String neutralButtonText;
	/**
	 * 点击取消button 切换的状态
	 */
	private String neutralZhixingState;
	/**
	 * 点击取消button 录入执行type
	 */
	private String neutralZhixingType;
	/**
	 * 状态是否显示
	 */
	private boolean isVisible = true;
	/**
	 * 默认选中的状态
	 */
	private boolean firstCurrent = false;
	/**
	 * 能够自动完成
	 */
	private boolean enableAutoComplete = false;
	/**
	 * 能否批量执行
	 */
	private boolean enableBatchExecute = false;

	/**
	 * 前一个状态和当前的状态能否是同一个护士执行
	 */
	private boolean enablePreAndCurrentSameUser = true;
	/**
	 * 能否立即执行到下一个状态
	 */
	private boolean enableFinishImmediately = true;
	/**
	 * 执行到下一个状态的时间间隔
	 */
	private long finishJiange = 0;

	public TabState() {

	}

	public TabState(Cursor tabData) {
		this.setAttr(tabData);
	}

	@Override
	public void setAttr(Cursor huanzheData) {

		// this.setStateSort(huanzheData.getInt(huanzheData
		// .getColumnIndex("stateSort")));
		this.setTabTitle(huanzheData.getString(huanzheData
				.getColumnIndex("tabTitle")));
		this.setTabTag(huanzheData.getString(huanzheData
				.getColumnIndex("tabTag")));
		this.setZhixingType(huanzheData.getString(huanzheData
				.getColumnIndex("zhixingType")));
		this.setPreZhixingState(huanzheData.getString(huanzheData
				.getColumnIndex("preZhixingState")));
		this.setCurrentZhixingState(huanzheData.getString(huanzheData
				.getColumnIndex("currentZhixingState")));
		this.setCurrentChushiState(huanzheData.getString(huanzheData
				.getColumnIndex("currentChushiState")));
		this.setNextZhixingState(huanzheData.getString(huanzheData
				.getColumnIndex("nextZhixingState")));
		this.setNeutralButtonText(huanzheData.getString(huanzheData
				.getColumnIndex("neutralButtonText")));
		this.setNeutralZhixingType(huanzheData.getString(huanzheData
				.getColumnIndex("neutralZhixingType")));
		this.setNeutralZhixingState(huanzheData.getString(huanzheData
				.getColumnIndex("neutralZhixingState")));
		this.setFinishJiange(huanzheData.getLong(huanzheData
				.getColumnIndex("finishJiange")));

		// 设置能否执行
		if (huanzheData.getInt(huanzheData.getColumnIndex("enableZhixing")) == 1) {
			this.setEnableZhixing(true);
		} else {
			this.setEnableZhixing(false);
		}

		// 状态是否显示
		if (huanzheData.getInt(huanzheData.getColumnIndex("isVisible")) == 1) {
			this.setVisible(true);
		} else {
			this.setVisible(false);
		}

		// 默认选中的状态
		if (huanzheData.getInt(huanzheData.getColumnIndex("firstCurrent")) == 1) {
			this.setFirstCurrent(true);
		} else {
			this.setFirstCurrent(false);
		}

		// 能够自动完成
		if (huanzheData
				.getInt(huanzheData.getColumnIndex("enableAutoComplete")) == 1) {
			this.setEnableAutoComplete(true);
		} else {
			this.setEnableAutoComplete(false);
		}

		// 能否批量执行
		if (huanzheData
				.getInt(huanzheData.getColumnIndex("enableBatchExecute")) == 1) {
			this.setEnableBatchExecute(true);
		} else {
			this.setEnableBatchExecute(false);
		}

		// 前一个状态和当前的状态能否是同一个护士执行
		if (huanzheData.getInt(huanzheData
				.getColumnIndex("enablePreAndCurrentSameUser")) == 1) {
			this.setEnablePreAndCurrentSameUser(true);
		} else {
			this.setEnablePreAndCurrentSameUser(false);
		}

		// 能否立即执行到下一个状态
		if (huanzheData.getInt(huanzheData
				.getColumnIndex("enableFinishImmediately")) == 1) {
			this.setEnableFinishImmediately(true);
		} else {
			this.setEnableFinishImmediately(false);
		}
	}

	/**
	 * 初始化
	 * 
	 * @Title:YizhuState
	 * @Description: 构造方法
	 * @param stateName
	 * @param tabName
	 */
	public TabState(String tabTitle, String tabTag, String zhixingType,
			boolean enableZhixing, String preZhixingState,
			String currentZhixingState, String nextZhixingState,
			String neutralButtonText, String neutralZhixingType) {

		this.tabTitle = tabTitle;
		this.tabTag = tabTag;
		this.zhixingType = zhixingType;
		this.enableZhixing = enableZhixing;
		this.preZhixingState = preZhixingState;
		this.currentZhixingState = currentZhixingState;
		this.nextZhixingState = nextZhixingState;
		this.neutralButtonText = neutralButtonText;
		this.neutralZhixingType = neutralZhixingType;
	}

	/**
	 * 初始化
	 * 
	 * @Title:TabState
	 * @Description: 构造方法
	 * @param tabTitle
	 * @param tabTag
	 * @param zhixingType
	 * @param enableZhixing
	 * @param preZhixingState
	 * @param currentZhixingState
	 * @param nextZhixingState
	 * @param neutralButtonText
	 * @param neutralZhixingType
	 * @param isVisible
	 */
	public TabState(String tabTitle, String tabTag, String zhixingType,
			boolean enableZhixing, String preZhixingState,
			String currentZhixingState, String nextZhixingState,
			String neutralButtonText, String neutralZhixingType,
			boolean isVisible) {

		this.tabTitle = tabTitle;
		this.tabTag = tabTag;
		this.zhixingType = zhixingType;
		this.enableZhixing = enableZhixing;
		this.preZhixingState = preZhixingState;
		this.currentZhixingState = currentZhixingState;
		this.nextZhixingState = nextZhixingState;
		this.neutralButtonText = neutralButtonText;
		this.neutralZhixingType = neutralZhixingType;
		this.isVisible = isVisible;
	}

	/**
	 * 初始化
	 * 
	 * @Title:TabState
	 * @Description: 构造方法
	 * @param tabTitle
	 * @param tabTag
	 * @param zhixingType
	 * @param enableZhixing
	 * @param preZhixingState
	 * @param currentZhixingState
	 * @param nextZhixingState
	 * @param neutralButtonText
	 * @param neutralZhixingType
	 * @param isVisible
	 * @param firstCurrent
	 */
	public TabState(String tabTitle, String tabTag, String zhixingType,
			boolean enableZhixing, String preZhixingState,
			String currentZhixingState, String nextZhixingState,
			String neutralButtonText, String neutralZhixingType,
			boolean isVisible, boolean firstCurrent) {

		this.tabTitle = tabTitle;
		this.tabTag = tabTag;
		this.zhixingType = zhixingType;
		this.enableZhixing = enableZhixing;
		this.preZhixingState = preZhixingState;
		this.currentZhixingState = currentZhixingState;
		this.nextZhixingState = nextZhixingState;
		this.neutralButtonText = neutralButtonText;
		this.neutralZhixingType = neutralZhixingType;
		this.isVisible = isVisible;
		this.firstCurrent = firstCurrent;
	}

	/**
	 * 初始化
	 * 
	 * @Title:TabState
	 * @Description: 构造方法
	 * @param tabTitle
	 * @param tabTag
	 * @param zhixingType
	 * @param enableZhixing
	 * @param preZhixingState
	 * @param currentZhixingState
	 * @param nextZhixingState
	 * @param neutralButtonText
	 * @param neutralZhixingType
	 * @param isVisible
	 * @param firstCurrent
	 * @param enableAutoComplete
	 */
	public TabState(String tabTitle, String tabTag, String zhixingType,
			boolean enableZhixing, String preZhixingState,
			String currentZhixingState, String nextZhixingState,
			String neutralButtonText, String neutralZhixingType,
			boolean isVisible, boolean firstCurrent, boolean enableAutoComplete) {

		this.tabTitle = tabTitle;
		this.tabTag = tabTag;
		this.zhixingType = zhixingType;
		this.enableZhixing = enableZhixing;
		this.preZhixingState = preZhixingState;
		this.currentZhixingState = currentZhixingState;
		this.nextZhixingState = nextZhixingState;
		this.neutralButtonText = neutralButtonText;
		this.neutralZhixingType = neutralZhixingType;
		this.isVisible = isVisible;
		this.firstCurrent = firstCurrent;
		this.enableAutoComplete = enableAutoComplete;
	}

	/**
	 * 初始化
	 * 
	 * @Title:TabState
	 * @Description: 构造方法
	 * @param tabTitle
	 * @param tabTag
	 * @param zhixingType
	 * @param enableZhixing
	 * @param preZhixingState
	 * @param currentZhixingState
	 * @param nextZhixingState
	 * @param neutralButtonText
	 * @param neutralZhixingType
	 * @param isVisible
	 * @param firstCurrent
	 * @param enableAutoComplete
	 */
	public TabState(String tabTitle, String tabTag, String zhixingType,
			boolean enableZhixing, String preZhixingState,
			String currentZhixingState, String nextZhixingState,
			String neutralButtonText, String neutralZhixingType,
			boolean isVisible, boolean firstCurrent,
			boolean enableAutoComplete, boolean enableBatchExecute) {

		this.tabTitle = tabTitle;
		this.tabTag = tabTag;
		this.zhixingType = zhixingType;
		this.enableZhixing = enableZhixing;
		this.preZhixingState = preZhixingState;
		this.currentZhixingState = currentZhixingState;
		this.nextZhixingState = nextZhixingState;
		this.neutralButtonText = neutralButtonText;
		this.neutralZhixingType = neutralZhixingType;
		this.isVisible = isVisible;
		this.firstCurrent = firstCurrent;
		this.enableAutoComplete = enableAutoComplete;
		this.enableBatchExecute = enableBatchExecute;
	}

	// public int getStateSort() {
	// return stateSort;
	// }
	//
	// public void setStateSort(int stateSort) {
	// this.stateSort = stateSort;
	// }

	public String getTabTitle() {
		return tabTitle;
	}

	public void setTabTitle(String tabTitle) {
		this.tabTitle = tabTitle;
	}

	public String getTabTag() {
		return tabTag;
	}

	public void setTabTag(String tabTag) {
		this.tabTag = tabTag;
	}

	public String getZhixingType() {
		return zhixingType;
	}

	public void setZhixingType(String zhixingType) {
		this.zhixingType = zhixingType;
	}

	public boolean isEnableZhixing() {
		return enableZhixing;
	}

	public void setEnableZhixing(boolean enableZhixing) {
		this.enableZhixing = enableZhixing;
	}

	public String getCurrentChushiState() {
		return currentChushiState;
	}

	public void setCurrentChushiState(String currentChushiState) {
		this.currentChushiState = currentChushiState;
	}

	public String getCurrentZhixingState() {
		return currentZhixingState;
	}

	public void setCurrentZhixingState(String currentZhixingState) {
		this.currentZhixingState = currentZhixingState;
	}

	public String getNextZhixingState() {
		return nextZhixingState;
	}

	public void setNextZhixingState(String nextZhixingState) {
		this.nextZhixingState = nextZhixingState;
	}

	public String getNeutralButtonText() {
		return neutralButtonText;
	}

	public void setNeutralButtonText(String neutralButtonText) {
		this.neutralButtonText = neutralButtonText;
	}

	public String getNeutralZhixingState() {
		return neutralZhixingState;
	}

	public void setNeutralZhixingState(String neutralZhixingState) {
		this.neutralZhixingState = neutralZhixingState;
	}

	public String getNeutralZhixingType() {
		return neutralZhixingType;
	}

	public void setNeutralZhixingType(String neutralZhixingType) {
		this.neutralZhixingType = neutralZhixingType;
	}

	public String getPreZhixingState() {
		return preZhixingState;
	}

	public void setPreZhixingState(String preZhixingState) {
		this.preZhixingState = preZhixingState;
	}

	public boolean isVisible() {
		return isVisible;
	}

	public void setVisible(boolean isVisible) {
		this.isVisible = isVisible;
	}

	public boolean isFirstCurrent() {
		return firstCurrent;
	}

	public void setFirstCurrent(boolean firstCurrent) {
		this.firstCurrent = firstCurrent;
	}

	public boolean isEnableAutoComplete() {
		return enableAutoComplete;
	}

	public void setEnableAutoComplete(boolean enableAutoComplete) {
		this.enableAutoComplete = enableAutoComplete;
	}

	public boolean isEnableBatchExecute() {
		return enableBatchExecute;
	}

	public void setEnableBatchExecute(boolean enableBatchExecute) {
		this.enableBatchExecute = enableBatchExecute;
	}

	public boolean isEnablePreAndCurrentSameUser() {
		return enablePreAndCurrentSameUser;
	}

	public void setEnablePreAndCurrentSameUser(
			boolean enablePreAndCurrentSameUser) {
		this.enablePreAndCurrentSameUser = enablePreAndCurrentSameUser;
	}

	public boolean isEnableFinishImmediately() {
		return enableFinishImmediately;
	}

	public void setEnableFinishImmediately(boolean enableFinishImmediately) {
		this.enableFinishImmediately = enableFinishImmediately;
	}

	public long getFinishJiange() {
		return finishJiange;
	}

	public void setFinishJiange(long finishJiange) {
		this.finishJiange = finishJiange;
	}

	/**
	 * 获得默认的配液执行状态
	 * 
	 * @Title: getNolmalPeiYeZhiXingStates
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-1-27 上午10:55:46
	 * @return
	 */
	public static List<TabState> getNolmalPeiYeZhiXingStates() {

		List<TabState> list = new ArrayList<TabState>();

		list.add(new TabState("待配液", "weipeiye", "配液", true, "", "待配液", "已配液",
				"", ""));
		list.add(new TabState("已配液", "yipeiye", "校对", true, "", "已配液", "已校对", "撤销", "待配液"));
		list.add(new TabState("已校对", "yijiaodui", "", false, "", "已校对", "", "",
				""));

		return list;
	}

	/**
	 * 获得默认的医嘱执行状态
	 * 
	 * @Title: getNolmalYiZhuZhiXingStates
	 * @Description: TODO
	 * @author: Gao ZhiDong <gaozhidong@tiantanhehe.com>
	 * @date: 2016-3-7 下午2:40:05
	 * @return
	 */
	public static List<TabState> getNolmalYiZhuZhiXingStates() {

		List<TabState> list = new ArrayList<TabState>();

		list.add(new TabState("全部", "quanbu", "配液", false, "", "全部", "已配液", "",
				"", true, true));
		list.add(new TabState("待配液", "weipeiye", "配液", false, "", "待配液", "已配液",
				"", ""));
		list.add(new TabState("已配液", "yipeiye", "校对", true, "待配液", "已配液", "已校对", "撤销", "待配液", false));
		list.add(new TabState("已校对", "yijiaodui", "", false, "已配液", "已校对", "开始执行", "", "", false));
		list.add(new TabState("未执行", "weizhixing", "开始执行", true, "已配液", "已校对", "开始执行", "", "", true, false, false,
				true));
		list.add(new TabState("开始", "kaishizhixing", "执行完毕", true, "已校对", "开始执行", "初始状态", "", "", true, false, true));
		list.add(new TabState("完成", "zhixingwanbi", "", false, "开始执行", "初始状态",
				"", "", ""));
		return list;
	}
}
