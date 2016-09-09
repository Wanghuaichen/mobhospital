/**   
 * @Copyright: Copyright (c) 2016 天坦软件
 * @Title: ContentWindowFragment.java
 * @Package com.tiantanhehe.yidongchafang.views.fragments
 * @Description: TODO 
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月19日 下午3:11:07 
 * @version V4.0   
 */
package com.tiantanhehe.yidongchafang.views.fragments;

import com.tiantanhehe.yidongchafang.R;

import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

/**
 * @ClassName: ContentWindowFragment
 * @Description: TODO
 * @author Huke <huke@tiantanhehe.com>
 * @date 2016年4月19日 下午3:11:07
 * 
 */
public class ContentWindowFragment extends Fragment {
	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
		return inflater.inflate(R.layout.fragment_content_window, container, false);
	}

	@Override
	public void onActivityCreated(Bundle savedInstanceState) {
		super.onActivityCreated(savedInstanceState);
	}

}
