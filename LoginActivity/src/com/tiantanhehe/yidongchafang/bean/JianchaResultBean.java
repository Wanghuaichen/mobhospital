package com.tiantanhehe.yidongchafang.bean;

import java.util.List;

public class JianchaResultBean {

	private String staus;

	private List<ResultBean> result;

	public String getStaus() {
		return staus;
	}

	public void setStaus(String staus) {
		this.staus = staus;
	}

	public List<ResultBean> getResult() {
		return result;
	}

	public void setResult(List<ResultBean> result) {
		this.result = result;
	}

	public static class ResultBean {
		private String id;
		private String zhixing_id;
		private String zhixing_type;
		private String jiancha_leibie;
		private String jiancha_mingcheng;
		private String jiancha_code;
		private String jiancha_jieguo;
		private String jiancha_yichangjieguo;
		private String songjian_zhe_id;
		private String songjian_zhe_name;
		private String shenhe_doctor_id;
		private String shenhe_doctor_name;
		private String jiancha_zhuangtai;
		private String jiancha_keshi_id;
		private String jiancha_keshi_name;
		private String jiancha_table_name;
		private String songjian_time;
		private String shenqing_keshi_name;
		private String patient_id;
		private String caiji_time;
		private String caiji_zhe_name;
		private String songjian_wu;
		private String caiji_zhe_name_id;
		private String beizhu;
		private String print_state;
		private String relate_zhenduan_id;
		private String jianyan_doctor_name;
		private String jianyan_doctor_id;
		private String jiancha_time;
		private String shenhe_time;
		private String xiangmu_id;
		private String hedui_doctor_id;
		private String hedui_doctor_name;
		private String shenqing_zhe_name;
		private String shenqing_zhe_id;
		private String shenqing_time;
		private String jiancha_shebei;
		private String jiancha_buwei;
		private String jiancha_fangshi;
		private String yingxiang_miaoshu;
		private String yingxiang_jianyi;
		private String yingxiang_yinxiang;
		private String renti_xitong_pinyin;
		private String jiancha_hedui_zhuangtai;
		private String jiancha_hedui_hushi_id;
		private String jiancha_hedui_hushi_name;
		private String jiancha_hedui_time;
		private String biaoben_tiaoma;
		private String isReFunds;
		private String upload_state;

		@Override
		public String toString() {
			return "ResultBean [id=" + id + ", zhixing_id=" + zhixing_id + ", zhixing_type=" + zhixing_type
					+ ", jiancha_leibie=" + jiancha_leibie + ", jiancha_mingcheng=" + jiancha_mingcheng
					+ ", jiancha_code=" + jiancha_code + ", jiancha_jieguo=" + jiancha_jieguo
					+ ", jiancha_yichangjieguo=" + jiancha_yichangjieguo + ", songjian_zhe_id=" + songjian_zhe_id
					+ ", songjian_zhe_name=" + songjian_zhe_name + ", shenhe_doctor_id=" + shenhe_doctor_id
					+ ", shenhe_doctor_name=" + shenhe_doctor_name + ", jiancha_zhuangtai=" + jiancha_zhuangtai
					+ ", jiancha_keshi_id=" + jiancha_keshi_id + ", jiancha_keshi_name=" + jiancha_keshi_name
					+ ", jiancha_table_name=" + jiancha_table_name + ", songjian_time=" + songjian_time
					+ ", shenqing_keshi_name=" + shenqing_keshi_name + ", patient_id=" + patient_id + ", caiji_time="
					+ caiji_time + ", caiji_zhe_name=" + caiji_zhe_name + ", songjian_wu=" + songjian_wu
					+ ", caiji_zhe_name_id=" + caiji_zhe_name_id + ", beizhu=" + beizhu + ", print_state=" + print_state
					+ ", relate_zhenduan_id=" + relate_zhenduan_id + ", jianyan_doctor_name=" + jianyan_doctor_name
					+ ", jianyan_doctor_id=" + jianyan_doctor_id + ", jiancha_time=" + jiancha_time + ", shenhe_time="
					+ shenhe_time + ", xiangmu_id=" + xiangmu_id + ", hedui_doctor_id=" + hedui_doctor_id
					+ ", hedui_doctor_name=" + hedui_doctor_name + ", shenqing_zhe_name=" + shenqing_zhe_name
					+ ", shenqing_zhe_id=" + shenqing_zhe_id + ", shenqing_time=" + shenqing_time + ", jiancha_shebei="
					+ jiancha_shebei + ", jiancha_buwei=" + jiancha_buwei + ", jiancha_fangshi=" + jiancha_fangshi
					+ ", yingxiang_miaoshu=" + yingxiang_miaoshu + ", yingxiang_jianyi=" + yingxiang_jianyi
					+ ", yingxiang_yinxiang=" + yingxiang_yinxiang + ", renti_xitong_pinyin=" + renti_xitong_pinyin
					+ ", jiancha_hedui_zhuangtai=" + jiancha_hedui_zhuangtai + ", jiancha_hedui_hushi_id="
					+ jiancha_hedui_hushi_id + ", jiancha_hedui_hushi_name=" + jiancha_hedui_hushi_name
					+ ", jiancha_hedui_time=" + jiancha_hedui_time + ", biaoben_tiaoma=" + biaoben_tiaoma
					+ ", isReFunds=" + isReFunds + ", upload_state=" + upload_state + "]";
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getZhixing_id() {
			return zhixing_id;
		}

		public void setZhixing_id(String zhixing_id) {
			this.zhixing_id = zhixing_id;
		}

		public String getZhixing_type() {
			return zhixing_type;
		}

		public void setZhixing_type(String zhixing_type) {
			this.zhixing_type = zhixing_type;
		}

		public String getJiancha_leibie() {
			return jiancha_leibie;
		}

		public void setJiancha_leibie(String jiancha_leibie) {
			this.jiancha_leibie = jiancha_leibie;
		}

		public String getJiancha_mingcheng() {
			return jiancha_mingcheng;
		}

		public void setJiancha_mingcheng(String jiancha_mingcheng) {
			this.jiancha_mingcheng = jiancha_mingcheng;
		}

		public String getJiancha_code() {
			return jiancha_code;
		}

		public void setJiancha_code(String jiancha_code) {
			this.jiancha_code = jiancha_code;
		}

		public String getJiancha_jieguo() {
			return jiancha_jieguo;
		}

		public void setJiancha_jieguo(String jiancha_jieguo) {
			this.jiancha_jieguo = jiancha_jieguo;
		}

		public String getJiancha_yichangjieguo() {
			return jiancha_yichangjieguo;
		}

		public void setJiancha_yichangjieguo(String jiancha_yichangjieguo) {
			this.jiancha_yichangjieguo = jiancha_yichangjieguo;
		}

		public String getSongjian_zhe_id() {
			return songjian_zhe_id;
		}

		public void setSongjian_zhe_id(String songjian_zhe_id) {
			this.songjian_zhe_id = songjian_zhe_id;
		}

		public String getSongjian_zhe_name() {
			return songjian_zhe_name;
		}

		public void setSongjian_zhe_name(String songjian_zhe_name) {
			this.songjian_zhe_name = songjian_zhe_name;
		}

		public String getShenhe_doctor_id() {
			return shenhe_doctor_id;
		}

		public void setShenhe_doctor_id(String shenhe_doctor_id) {
			this.shenhe_doctor_id = shenhe_doctor_id;
		}

		public String getShenhe_doctor_name() {
			return shenhe_doctor_name;
		}

		public void setShenhe_doctor_name(String shenhe_doctor_name) {
			this.shenhe_doctor_name = shenhe_doctor_name;
		}

		public String getJiancha_zhuangtai() {
			return jiancha_zhuangtai;
		}

		public void setJiancha_zhuangtai(String jiancha_zhuangtai) {
			this.jiancha_zhuangtai = jiancha_zhuangtai;
		}

		public String getJiancha_keshi_id() {
			return jiancha_keshi_id;
		}

		public void setJiancha_keshi_id(String jiancha_keshi_id) {
			this.jiancha_keshi_id = jiancha_keshi_id;
		}

		public String getJiancha_keshi_name() {
			return jiancha_keshi_name;
		}

		public void setJiancha_keshi_name(String jiancha_keshi_name) {
			this.jiancha_keshi_name = jiancha_keshi_name;
		}

		public String getJiancha_table_name() {
			return jiancha_table_name;
		}

		public void setJiancha_table_name(String jiancha_table_name) {
			this.jiancha_table_name = jiancha_table_name;
		}

		public String getSongjian_time() {
			return songjian_time;
		}

		public void setSongjian_time(String songjian_time) {
			this.songjian_time = songjian_time;
		}

		public String getShenqing_keshi_name() {
			return shenqing_keshi_name;
		}

		public void setShenqing_keshi_name(String shenqing_keshi_name) {
			this.shenqing_keshi_name = shenqing_keshi_name;
		}

		public String getPatient_id() {
			return patient_id;
		}

		public void setPatient_id(String patient_id) {
			this.patient_id = patient_id;
		}

		public String getCaiji_time() {
			return caiji_time;
		}

		public void setCaiji_time(String caiji_time) {
			this.caiji_time = caiji_time;
		}

		public String getCaiji_zhe_name() {
			return caiji_zhe_name;
		}

		public void setCaiji_zhe_name(String caiji_zhe_name) {
			this.caiji_zhe_name = caiji_zhe_name;
		}

		public String getSongjian_wu() {
			return songjian_wu;
		}

		public void setSongjian_wu(String songjian_wu) {
			this.songjian_wu = songjian_wu;
		}

		public String getCaiji_zhe_name_id() {
			return caiji_zhe_name_id;
		}

		public void setCaiji_zhe_name_id(String caiji_zhe_name_id) {
			this.caiji_zhe_name_id = caiji_zhe_name_id;
		}

		public String getBeizhu() {
			return beizhu;
		}

		public void setBeizhu(String beizhu) {
			this.beizhu = beizhu;
		}

		public String getPrint_state() {
			return print_state;
		}

		public void setPrint_state(String print_state) {
			this.print_state = print_state;
		}

		public String getRelate_zhenduan_id() {
			return relate_zhenduan_id;
		}

		public void setRelate_zhenduan_id(String relate_zhenduan_id) {
			this.relate_zhenduan_id = relate_zhenduan_id;
		}

		public String getJianyan_doctor_name() {
			return jianyan_doctor_name;
		}

		public void setJianyan_doctor_name(String jianyan_doctor_name) {
			this.jianyan_doctor_name = jianyan_doctor_name;
		}

		public String getJianyan_doctor_id() {
			return jianyan_doctor_id;
		}

		public void setJianyan_doctor_id(String jianyan_doctor_id) {
			this.jianyan_doctor_id = jianyan_doctor_id;
		}

		public String getJiancha_time() {
			return jiancha_time;
		}

		public void setJiancha_time(String jiancha_time) {
			this.jiancha_time = jiancha_time;
		}

		public String getShenhe_time() {
			return shenhe_time;
		}

		public void setShenhe_time(String shenhe_time) {
			this.shenhe_time = shenhe_time;
		}

		public String getXiangmu_id() {
			return xiangmu_id;
		}

		public void setXiangmu_id(String xiangmu_id) {
			this.xiangmu_id = xiangmu_id;
		}

		public String getHedui_doctor_id() {
			return hedui_doctor_id;
		}

		public void setHedui_doctor_id(String hedui_doctor_id) {
			this.hedui_doctor_id = hedui_doctor_id;
		}

		public String getHedui_doctor_name() {
			return hedui_doctor_name;
		}

		public void setHedui_doctor_name(String hedui_doctor_name) {
			this.hedui_doctor_name = hedui_doctor_name;
		}

		public String getShenqing_zhe_name() {
			return shenqing_zhe_name;
		}

		public void setShenqing_zhe_name(String shenqing_zhe_name) {
			this.shenqing_zhe_name = shenqing_zhe_name;
		}

		public String getShenqing_zhe_id() {
			return shenqing_zhe_id;
		}

		public void setShenqing_zhe_id(String shenqing_zhe_id) {
			this.shenqing_zhe_id = shenqing_zhe_id;
		}

		public String getShenqing_time() {
			return shenqing_time;
		}

		public void setShenqing_time(String shenqing_time) {
			this.shenqing_time = shenqing_time;
		}

		public String getJiancha_shebei() {
			return jiancha_shebei;
		}

		public void setJiancha_shebei(String jiancha_shebei) {
			this.jiancha_shebei = jiancha_shebei;
		}

		public String getJiancha_buwei() {
			return jiancha_buwei;
		}

		public void setJiancha_buwei(String jiancha_buwei) {
			this.jiancha_buwei = jiancha_buwei;
		}

		public String getJiancha_fangshi() {
			return jiancha_fangshi;
		}

		public void setJiancha_fangshi(String jiancha_fangshi) {
			this.jiancha_fangshi = jiancha_fangshi;
		}

		public String getYingxiang_miaoshu() {
			return yingxiang_miaoshu;
		}

		public void setYingxiang_miaoshu(String yingxiang_miaoshu) {
			this.yingxiang_miaoshu = yingxiang_miaoshu;
		}

		public String getYingxiang_jianyi() {
			return yingxiang_jianyi;
		}

		public void setYingxiang_jianyi(String yingxiang_jianyi) {
			this.yingxiang_jianyi = yingxiang_jianyi;
		}

		public String getYingxiang_yinxiang() {
			return yingxiang_yinxiang;
		}

		public void setYingxiang_yinxiang(String yingxiang_yinxiang) {
			this.yingxiang_yinxiang = yingxiang_yinxiang;
		}

		public String getRenti_xitong_pinyin() {
			return renti_xitong_pinyin;
		}

		public void setRenti_xitong_pinyin(String renti_xitong_pinyin) {
			this.renti_xitong_pinyin = renti_xitong_pinyin;
		}

		public String getJiancha_hedui_zhuangtai() {
			return jiancha_hedui_zhuangtai;
		}

		public void setJiancha_hedui_zhuangtai(String jiancha_hedui_zhuangtai) {
			this.jiancha_hedui_zhuangtai = jiancha_hedui_zhuangtai;
		}

		public String getJiancha_hedui_hushi_id() {
			return jiancha_hedui_hushi_id;
		}

		public void setJiancha_hedui_hushi_id(String jiancha_hedui_hushi_id) {
			this.jiancha_hedui_hushi_id = jiancha_hedui_hushi_id;
		}

		public String getJiancha_hedui_hushi_name() {
			return jiancha_hedui_hushi_name;
		}

		public void setJiancha_hedui_hushi_name(String jiancha_hedui_hushi_name) {
			this.jiancha_hedui_hushi_name = jiancha_hedui_hushi_name;
		}

		public String getJiancha_hedui_time() {
			return jiancha_hedui_time;
		}

		public void setJiancha_hedui_time(String jiancha_hedui_time) {
			this.jiancha_hedui_time = jiancha_hedui_time;
		}

		public String getBiaoben_tiaoma() {
			return biaoben_tiaoma;
		}

		public void setBiaoben_tiaoma(String biaoben_tiaoma) {
			this.biaoben_tiaoma = biaoben_tiaoma;
		}

		public String getIsReFunds() {
			return isReFunds;
		}

		public void setIsReFunds(String isReFunds) {
			this.isReFunds = isReFunds;
		}

		public String getUpload_state() {
			return upload_state;
		}

		public void setUpload_state(String upload_state) {
			this.upload_state = upload_state;
		}
	}
}
