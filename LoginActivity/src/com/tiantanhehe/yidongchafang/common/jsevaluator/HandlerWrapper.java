package com.tiantanhehe.yidongchafang.common.jsevaluator;

import com.tiantanhehe.yidongchafang.common.jsevaluator.interfaces.HandlerWrapperInterface;

import android.os.Handler;

public class HandlerWrapper implements HandlerWrapperInterface {
	private final Handler mHandler;

	public HandlerWrapper() {
		mHandler = new Handler();
	}

	@Override
	public void post(Runnable r) {
		mHandler.post(r);
	}
}
