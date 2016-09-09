/**************************************************
*  Created:  2014-04-01
*  Info:整合了多种文档读写功能的全能编辑器
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author Dongjie <dongjie@tiantanhehe.com>
*  @Version 0.1
*  @Updated History:  
***************************************************/

//说明：伴随初始化文档打开编辑器
//参数：
//			parent_div:父容器，初始化在哪里
//			document_url:文档路径，包含文档全称
//			document_type:文档类型

// 河南html版文书，后期与office版整合
$(function(){
	$("#submit").live("click",function(e){
		e.preventDefault();
		beforeSubmit();
		var str_html = "<html>"+$("html").html()+"</html>";
		$.post("/tiantan_emr/Common/OtherDocuments/updateOneDocument",{document_id:document_id,document_content:str_html},function(data){
			console.log(data);
			window.setTimeout(auto_close,2000);
			if(data.result=="true"){
				$("body").qtip({
					content: data.message,
					style: {
							'font-size': 30,
							border: {
								width: 5,
								radius: 5
							},
							padding: 10, 
							textAlign: 'center',
							name: 'green',
							width: { max: 600 }
				 	},
					position: {
									corner: {
										target: 'topMiddle',
										tooltip: 'topMiddle'
									}
								},
					show: {
								delay:0,
								solo:true,
								when:false,
								ready: true
								},
					hide: {
								delay:500,
								when: {event: 'click'}
								}
				}); 
			}
			else{
				$("body").qtip({
					content: data.message,
					style: {
								'font-size': 30,
								border: {
										width: 5,
										radius: 5
										},
								padding: 10, 
								textAlign: 'center',
								name: 'red',
								width: { max: 600 }
								},
					position: {
									corner: {
											target: 'topMiddle',
											tooltip: 'topMiddle'
									}
								},
					show: {
								delay:0,
								solo:true,
								when:false,
								ready: true
								},
				  	hide: {
								delay:500,
								when: {event: 'unfocus'}
								}
				});
			}
		},"json");
		printControlInitial();
	});
});

// 提交表单前处理
function beforeSubmit()
{
	// 去掉多余内容
	$(".top_piaofu").remove();
	$(".go_top").remove();
	$(".go_bottom").remove();
	$("#bottom").remove();
	$("[class^='aui_']").remove();
	$("[class^='qtip']").remove();

	// 各表单元素处理
	$("input[type='text']").each(function(){
		$(this).attr("value",$(this).val());
	});

	$("textarea").each(function(){
		$(this).html($(this).val());
	});

	$("input[type='checkbox']").each(function(){
		if($(this).attr("checked")=="checked")
		{
			$(this).attr("checked","checked");
		}
	});
}

//自动关闭提示语句
//************************************************************************
function auto_close(){
	$("body").qtip("hide");
}
