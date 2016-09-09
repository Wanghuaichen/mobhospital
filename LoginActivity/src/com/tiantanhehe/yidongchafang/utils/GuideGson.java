package com.tiantanhehe.yidongchafang.utils;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/***
 * 
 * @ClassName: GuideGson
 * @Description: TODO
 * @author zhangyali <zhangyali@tiantanhehe.com>
 * @date 2016年7月11日 下午5:33:04
 *
 */
public class GuideGson {
	 /**
	 * jibing : 肺痿病 conten :
	 * [{"xiangmu":"尿常规","cishu":"2","zhixing_cishu":"22","guize"
	 * :[{"name":"正常","cishu"
	 * :"17"},{"name":"异常","cishu":"5"}]},{"xiangmu":"血常规",
	 * "cishu":"1","zhixing_cishu"
	 * :"2","guize":[{"name":"正常","cishu":"1"},{"name"
	 * :"异常","cishu":"1"}]},{"xiangmu"
	 * :"体温","cishu":"4","zhixing_cishu":"9","guize"
	 * :[{"name":"偏低","cishu":"3"},{
	 * "name":"正常","cishu":"4"},{"name":"偏高","cishu"
	 * :"2"}]},{"xiangmu":"脉搏","cishu"
	 * :"4","zhixing_cishu":"3","guize":[{"name":"正常"
	 * ,"cishu":"2"},{"name":"异常","cishu":"1"}]}]
	 */

    private String jibing;
    /**
	 * xiangmu : 尿常规 cishu : 2 zhixing_cishu : 22 guize :
	 * [{"name":"正常","cishu":"17"},{"name":"异常","cishu":"5"}]
	 */

    private List<ContenBean> conten;

	public static GuideGson objectFromData(String str) {

		return new Gson().fromJson(str, GuideGson.class);
    }

    public String getJibing() {
        return jibing;
    }

    public void setJibing(String jibing) {
        this.jibing = jibing;
    }

    public List<ContenBean> getConten() {
        return conten;
    }

    public void setConten(List<ContenBean> conten) {
        this.conten = conten;
    }

    public static class ContenBean {
        private String xiangmu;
        private String cishu;
        private String zhixing_cishu;
        /**
		 * name : 正常 cishu : 17
		 */

        private List<GuizeBean> guize;

        public static ContenBean objectFromData(String str) {

            return new Gson().fromJson(str, ContenBean.class);
        }

        public String getXiangmu() {
            return xiangmu;
        }

        public void setXiangmu(String xiangmu) {
            this.xiangmu = xiangmu;
        }

        public String getCishu() {
            return cishu;
        }

        public void setCishu(String cishu) {
            this.cishu = cishu;
        }

        public String getZhixing_cishu() {
            return zhixing_cishu;
        }

        public void setZhixing_cishu(String zhixing_cishu) {
            this.zhixing_cishu = zhixing_cishu;
        }

        public List<GuizeBean> getGuize() {
            return guize;
        }

        public void setGuize(List<GuizeBean> guize) {
            this.guize = guize;
        }

        public static class GuizeBean {
            private String name;
            private String cishu;

            public static GuizeBean objectFromData(String str) {

                return new Gson().fromJson(str, GuizeBean.class);
            }

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public String getCishu() {
                return cishu;
            }

            public void setCishu(String cishu) {
                this.cishu = cishu;
            }
        }
    }

	public static ArrayList<GuideGson> getObject(String json) {
        if(json == null){
            return null;
        }
        try {
            Gson gson = new Gson();
			ArrayList<GuideGson> br = gson.fromJson(json,
					new TypeToken<List<GuideGson>>() {
					}.getType());
            return br;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
