package com.tiantanhehe.yidongchafang.services;

import org.json.JSONObject;
/**************************************************
*  Created:  2015-03
*  Info:数据传输完毕的监听类，与ServerComminicationTask类关联使用，用于网络传输完毕后获取传输结果
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author Jack <dongjie@tiantanhehe.com>
*  @Version 1.0
*  @Updated History:  
***************************************************/
public interface DataFinishListener {

	void dataFinishSuccessfully(JSONObject response_sate);
}

