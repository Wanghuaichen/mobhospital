/**************************************************
*  Created:  2013-09-01
*  Info:登录页面
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author DongJie <dongjie@tiantanhehe.com>
*  @Version 1.0
*  @Updated History:  
***************************************************/
//表单相关事件的配置参数：
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
var user_type = "";
var agent_type = "";
var form_options={
			dataType: 'json',
			success:function showResponse(data){
				if(data.result=="true")
				{
					user_type = data.user_type;
					agent_type = data.agent_type;

					if(data.login_type != 'multi')
					{
						if(data.user_type == '门诊医生')
						{
							window.location.href="/tiantan_emr/System/showSystem";
						}
						else if(data.agent_type == 'phone')
						{
							window.location.href="/tiantan_emr/System/showSystemPad";
						}
						else if(data.agent_type == 'pad')
						{
							window.location.href="/tiantan_emr/System/showSystemPad";
						}
						else
						{
							window.location.href="/tiantan_emr/System/showSystem";
						}
					}
					else
					{
						if(data.login_type == 'multi')
						{
							var type_server_url = data.server_url;
							console.log(data);
							var agent_type = data.type;
							if(data.usersys.length>1)
							{
								var art_dialog_str = "";
								for(var i=0;i<data.usersys.length;i++)
								{
									art_dialog_str += '<div id="'+data.usersys[i].number+'" user_department="'+data.usersys[i].user_department+'" class="keshi_item">'+data.usersys[i].sys+'</div><br/>'
								}
								art.dialog({
									id:"keshi_login_dialog",
									title:"请选择要登陆的系统",
									content:'<div class="keshi_login">'+
														art_dialog_str+
													'</div>',
									lock: false,
									cancel:false,
									padding:5,
									init: function () {
										$(".keshi_item").click(function(){
											var user_department =  $(this).attr("user_department");
											var userid = $(this).attr("id");
											$.getJSON("http://"+type_server_url+"/tiantan_emr/Common/System/multiLogin", { userid:userid,user_department:user_department }, function(data){
												if(data.flag=="true")
												{
													art.dialog.list['keshi_login_dialog'].close();
													if(data.user_type == '门诊医生')
													{
														window.location.href="showSystem";
													}
													else if(agent_type == 'phone')
													{
														window.location.href="showSystemPad";
													}
													else if(agent_type == 'pad')
													{
														window.location.href="showSystemPad";
													}
													else
													{
														window.location.href="showSystem";
													}
												}
											});
										});
									}
								});
							}
							else
							{
								var userid = data.usersys[0].number;
								$.getJSON("http://"+type_server_url+"/tiantan_emr/Common/System/multiLogin", { userid:userid }, function(data){
									if(data.flag=="true")
									{
										window.location.href="showSystem";
									}
								});
							}
						}
						else
						{
							window.location.href="showSystem";
						}
					}
				}
				else
				{
					$(".login_tips").html(data.message);
				}
			}
};

$(function(){
	$(".ajax_form").ajaxForm(form_options);
	$("[name='user_number']").focus();
});
