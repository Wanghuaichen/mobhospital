/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: LeftWindowFragment.java
 * @Package com.tiantanhehe.yidongchafang.views.fragments
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月19日 下午1:59:43 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.views.fragments;

import com.tiantanhehe.yidongchafang.R;

import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.ListView;

/**
 * @ClassName: LeftWindowFragment
 * @Description: 左侧窗口分片
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月19日 下午1:59:43
 * 
 */
public class LeftWindowFragment extends Fragment {

	protected LinearLayout ll_left_window;
	public ListView lv_left_menu;

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
		return inflater.inflate(R.layout.fragment_left_window, container, false);
	}

	@Override
	public void onActivityCreated(Bundle savedInstanceState) {
		super.onActivityCreated(savedInstanceState);

	}

}
