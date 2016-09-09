var current_template_category_id ="0";
var current_template_category_name ="总模板目录";
var current_template_id ="0";
var current_template_name ="";
var current_template_content ="";
var current_template_type = "";

$(document).ready(function() {
	$.get("http://"+server_url+"/tiantan_emr/Common/Data/getDataTemplate", {"pid":current_template_category_id}, function(data){
		$(".template_list").html(data);
		$(".template_content").html("请选择模板");
		$(".template_content_name").click(function(){
			$('[name="edit_template"]').show();
			$('[name="delete_template"]').show();
			current_template_id = $(this).attr("id");
			current_template_name =$(this).html();
			current_template_content = $(this).attr("template_content");
			current_template_type = $(this).attr("template_type");
			$('.content').html(current_template_content);
			$('.template_name').val(current_template_name);
			$('#edit_template_type').html('<option value="'+current_template_type+'">'+current_template_type+'</option>'); 
			$('.id').val(current_template_id);
			$(".template_content").html(current_template_content); 
			$(".delete_template_content").html(current_template_content);
		});
			  
		$(".template_category").click(function(){
			initialCategoryEvent($(this));
		});
	});

	$("[name='view_template']").click(function(){
		$(".template_content").show();
		$(".template_add").hide();
		$(".template_edit").hide();
		$(".template_delete").hide();
	});

	$("[name='add_template']").click(function(){
		$(".template_add").show();
		$('[name="cancel_oprate"]').show();
		$('[contenteditable="true"]').css("display","block");
		$(".template_content").hide();
		$(".template_edit").hide();
		$(".template_delete").hide();
		$('[name="delete_template"]').hide();

		$('.template_category_name').html(current_template_category_name);
		$('.content').html("");
		$('.template_name').val("");
		$('.pid').val(current_template_category_id);
	});
	
	//点击编辑按钮的时候触发的事件
	$("[name='edit_template']").click(function(){
		$(".template_edit").show();
		$('[name="cancel_oprate"]').show();
		$('[name="delete_template"]').show();
		$('[name="add_template"]').hide();
		$(".template_content").hide();
		$(".template_add").hide();
		$(".template_delete").hide();
		
		$('.template_category_name').html(current_template_category_name);
		$('.content').html(current_template_content);
		$('.template_name').val(current_template_name);
		$('#edit_template_type').html('<option value="'+current_template_type+'">'+current_template_type+'</option>');
		$('.id').val(current_template_id);
	});
	
	//点击取消操作按钮的时候触发的事件
	$("[name='cancel_oprate']").click(function(){
		$(".template_content").show();
		$('[name="add_template"]').show();
		$('[name="edit_template"]').hide();
		$('[name="delete_template"]').hide();
		$(".template_edit").hide();
		$(".template_add").hide();
		$(".template_delete").hide();
		$('.template_category_name').html("返回上级");
		$(this).hide();
	});

	$("[name='delete_template']").click(function(){	
		//获取模板内容
		$(".template_delete").show();
		$('[name="cancel_oprate"]').show();
		$('[name="add_template"]').hide();
		$('[name="edit_template"]').hide();
		$(".template_content").hide();
		$(".template_edit").hide();
		$(".template_add").hide();
		
		$('.content').html(current_template_content);
		$('.template_name').val(current_template_name);
		$('#edit_template_type').html('<option value="'+current_template_type+'">'+current_template_type+'</option>'); 
		$('.id').val(current_template_id);
	});
	
	$(".template_list_title").click(function(){
		goback();
	});
	
//对表格提交动作进行覆盖
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	var form_options={
	   dataType: 'json',
	   beforeSerialize:function validateForm(){
			$(".textarea_type").each(function(){
				$("."+$(this).attr("name")+"_submit").val($(this).html());
			});
		},
	   success:function showResponse(data){
			window.setTimeout(auto_close,2000); 
			saved = true;
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
				//刷新浏览树
				refreshTreeView();
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
			}	
		};
		
	$(".edit_form").ajaxForm(form_options);

	$(".input_type").focus(function(){
		$(this).css({"border":"#09F 2px solid"});	
		return false;
	});
	
	$(".input_type").blur(function(){
		$(this).css({"border":"#6F88C4 1px solid"});
	});

	//文本框变形事件
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	$("[action='open_edit_textarea']").click(function(e){
		current_editor_id = $(this).parent().next().attr("id");
		return false;
	});
	$("[action='open_view_textarea']").click(function(e){
		return false;
	});
		
	//点击删除按钮时弹出的提示
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	$("[action_type='delete']").click(function(){
		 if (confirm('是否确认进行删除操作？'))
		   return true;
		 else
		   return false;
	});
});

function initialCategoryEvent(object)
{
	$(".template_content").show();
	$(".template_add").hide();
	$(".template_edit").hide();
	$(".template_delete").hide();

	$('[name="edit_template"]').hide();
	$('[name="delete_template"]').hide();
	
	current_template_category_id = object.attr("id");
	current_template_category_type = object.attr("template_type");
	current_template_category_name = object.html();
	$('.template_list_title').val(current_template_category_name);
	$('.template_list_title').html("返回上级");
	$('.template_category_id').html(current_template_category_id);
	if(current_template_category_id==0)
	  $('.template_list_title').html("请选择");
	else
		$('.template_list_title').html("返回上级");
	
	$.get("http://"+server_url+"/tiantan_emr/Common/Data/getDataTemplate", {"pid":current_template_category_id}, function(data){
		$(".template_list").html(data);
		$(".template_content").html(object.attr("template_content"));
		$(".template_content_name").click(function(){
			//判断template_add是否隐藏
			if($(".template_add").css('display')=='block')
			{
				$(".template_edit").show();
				$(".template_add").hide();
				$(".template_content").hide();
				$(".template_delete").hide();
			}
			
			$('[name="edit_template"]').show();
			$('[name="delete_template"]').show();
			
			current_template_id = $(this).attr("id");
			current_template_name =$(this).html();
			current_template_content = $(this).attr("template_content");
			current_template_type = $(this).attr("template_type");
			
			//获取模板类型ID
			$('#edit_shuoming').html(current_template_content);
			$('#edit_template_name').val(current_template_name);
			$('#edit_template_type').html('<option value="'+current_template_type+'">'+current_template_type+'</option>'); 
			$('.id').val(current_template_id);
			$(".template_content").html(current_template_content); 
			$(".delete_template_content").html(current_template_content);
		});
		
			//提示框
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	  $('.template_list_title').each(function() {
			 if(current_template_category_id==0)
		     var content = '请选择模板';
		   else
			   var content = '点击返回上一级';
			$(this).qtip({
			   content: content,
			    style: {
					  'font-size' : 12,
					  border: {
						 width: 2,
						 radius: 1
					  },
					  padding: 2, 
					  textAlign: 'left',
					  tip: true,
					  name: 'cream',
					  width: { max: 250 }
               },
				position: {
							  corner: {
								 target: 'bottomLeft',
								 tooltip: 'bottomRight'
							  },
							  adjust: { screen: true }
						   },
				show: {
						  delay:0,
						  solo: true,
						  when: { event: 'mouseover' },
						  ready: false
					   },
               hide: {
				   		  delay:100,
						  when: { event: 'mouseout' }
					   }		
			});
	  });

		$(".template_category").click(function(){	
			initialCategoryEvent($(this));
		});
		
	});	
}

function refreshTreeView()
{
	$(".template_content").show();
	$(".template_add").hide();
	$(".template_edit").hide();
	$(".template_delete").hide();
	
	$.get("http://"+server_url+"/tiantan_emr/Common/Data/getDataTemplate", {"pid":current_template_category_id}, function(data){
		$(".template_list").html(data);
		$(".template_content").html("请选择模板");
		$(".template_content_name").click(function(){
			$('[name="edit_template"]').show();
			$('[name="delete_template"]').show();
			
			//判断template_add是否隐藏
			if($(".template_add").css('display')=='block')
			{
				$(".template_edit").show();
				$(".template_add").hide();
				$(".template_content").hide();
				$(".template_delete").hide();
			}
	
			current_template_id = $(this).attr("id");
			current_template_name =$(this).html();
			current_template_content = $(this).attr("template_content");
			current_template_type = $(this).attr("template_type");
			
			$('#edit_shuoming').html(current_template_content);
			$('#edit_template_name').val(current_template_name);
			$('#edit_template_type').html('<option value="'+current_template_type+'">'+current_template_type+'</option>'); 
			$('.id').val(current_template_id);
			$(".template_content").html(current_template_content); 
			$(".delete_template_content").html(current_template_content);
		});
		
		$(".template_category").click(function(){	
			initialCategoryEvent($(this));
		});
	});
}

function goback()
{
	$('[name="edit_template"]').hide();
	$('[name="delete_template"]').hide();
			
	$.get("http://"+server_url+"/tiantan_emr/Common/Data/getDataTemplateGoback", {"pid":current_template_category_id,"template_type":"common"}, function(data){
		$(".template_left").html(data);
		$(".template_content").html("请选择模板");
		current_template_name = "";
		
		current_template_category_id = $(".template_list_title").attr("id");		
		current_template_category_name = $(".template_list_title").val();
		$('.template_category_name').html(current_template_category_name);
		$('.template_category_id').html(current_template_category_id);
		if(current_template_category_id==0)
			$('.template_list_title').html("请选择");
		else
			$('.template_list_title').html("返回上级");
		
		//提示框
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	$('.template_list_title').each(function() {
		  if(current_template_category_id==0)
		     var content = '请选择模板';
		   else
			   var content = '点击返回上一级';
			$(this).qtip({
			   content: content,
			    style: {
					  'font-size' : 12,
					  border: {
						 width: 2,
						 radius: 1
					  },
					  padding: 2, 
					  textAlign: 'left',
					  tip: true,
					  name: 'cream',
					  width: { max: 250 }
               },
				position: {
							  corner: {
								 target: 'bottomLeft',
								 tooltip: 'bottomRight'
							  },
							  adjust: { screen: true }
						   },
				show: {
						  delay:0,
						  solo:true,
						  when: { event: 'mouseover' },
						  ready: false
							},
				hide: {
							delay:100,
							when: { event: 'mouseout' }
						}
			});
		});

		$(".template_list_title").click(function(){
			goback();
		});
		
		$(".template_content_name").click(function(){
			$('[name="edit_template"]').show();
			$('[name="delete_template"]').show();
			
			$(".template_content").show();
			$(".template_add").hide();
			$(".template_edit").hide();
			$(".template_delete").hide();
	
			current_template_id = $(this).attr("id");
			current_template_name =$(this).html();
			current_template_content = $(this).attr("template_content");
			current_template_type = $(this).attr("template_type");
			
			$('.content').html(current_template_content);
			$('.template_name').val(current_template_name);
			$('#edit_template_type').html('<option value="'+current_template_type+'">'+current_template_type+'</option>'); 
			$('.id').val(current_template_id);
			$(".template_content").html(current_template_content); 
			$(".delete_template_content").html(current_template_content);
		});
		
		$(".template_category").click(function(){	
			initialCategoryEvent($(this));
		});
		
	});
}

//自动关闭提示语句
//************************************************************************
function auto_close()
{
	$("body").qtip("hide");
}