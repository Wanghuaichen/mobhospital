package com.tiantanhehe.yidongchafang.views.views;

import java.util.ArrayList;
import java.util.List;

import android.content.Context;
import android.text.TextWatcher;
import android.util.AttributeSet;
import android.widget.EditText;

public class MyEditText extends EditText {
	private List<TextWatcher> watchers = new ArrayList<TextWatcher>();

	public MyEditText(Context context) {
		super(context);
	}

	public MyEditText(Context context, AttributeSet attrs) {
		super(context, attrs);
	}

	public MyEditText(Context context, AttributeSet attrs, int defStyle) {
		super(context, attrs, defStyle);
	}

	@Override
	public void addTextChangedListener(TextWatcher watcher) {
		watchers.add(watcher);
		super.addTextChangedListener(watcher);
	}

	public void removeTextChangedListener() {
		for (int i = 0; i < watchers.size(); i++) {
			removeTextChangedListener(watchers.get(i));
		}
	}
}
