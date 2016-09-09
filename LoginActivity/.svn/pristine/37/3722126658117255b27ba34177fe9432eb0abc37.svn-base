// JavaScript Document
$(function(){
	var zhuyuan_id_full = $("[name='zhuyuan_id'],[name='zhixing_id']").text();
	if(zhuyuanhao!="")
		zhuyuan_id_full = zhuyuanhao;
	if(zhuyuan_id_full=="")
		zhuyuan_id_full = zhuyuan_id;
	var zhuyuan_id_sim = zhuyuan_id_full.split("-")[0];
	zhuyuan_id = zhuyuan_id_sim;
	zhuyuanhao = zhuyuan_id_sim;
	$("[name='zhuyuan_id'],[name='zhixing_id']").text(zhuyuan_id_sim);
});