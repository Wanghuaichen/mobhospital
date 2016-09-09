$(function(){
	//添加模板内容：
	$("#right_menu").html(
	'小扁鹊，您身边的医学助手:)'+
	'<div class="xiaobianque_zhushou" name="xiaobianque_zhushou">'+
		'<input type="input" class="xiaobianque_keyword" name="xiaobianque_keyword" value="这里输入您想查询的问题" />&nbsp'+
		'<input type="button" class="submit_button" name="xiaobianque_search" value="问一问" />&nbsp'+
	'</div>'+
	'<div class="template_tab" >'+
		'<div class="template_tab_content">'+
			'<div class="template_category_list">'+
					'<div class="template_list"></div>'+
			'</div>'+
			'<div class="template_content_title">扁鹊说：</div>'+
			'<div class="template_content" name="template_content">'+
			'</div>'+
		'</div>'+
	'</div>');

	//初始化扁鹊助手各种问题：
	$('[name="xiaobianque_keyword"]').focus(function(){
		if($(this).val()=="这里输入您想查询的问题")
		{
			$(this).val("");
			$(this).css("color","black");
		}
	});
	
	$('[name="xiaobianque_keyword"]').blur(function(){
		if($(this).val()=="")
		{			
			$(this).val("这里输入您想查询的问题");
			$(this).css("color","#C0C0C0");
		}
	});
	
	$('[name="xiaobianque_keyword"]').bind('keydown', function (e) {
		var key = e.which;
		if (key == 13) {
			e.preventDefault();
			$("[name='xiaobianque_search']").click();
		}
	});
	
	//问一问操作
	$("[name='xiaobianque_search']").click(function(e) {
		var keyword = $('[name="xiaobianque_keyword"]').val();
		$.get("http://"+server_url+"/tiantan_emr/Common/Data/xiaobianqueSearch", {"keyword":keyword}, function(data){
			$(".template_list").html(data);
			$(".template_content").html("想知道些什么呢？");
			$("[template_content]").click(function(){
				 $(".template_content").html($(this).attr("template_content")) 
			});
			$(".template_category").click(function(){
				initialCategoryEvent($(this));
			});
		});
	});
	
	$.get("http://"+server_url+"/tiantan_emr/Common/Data/xiaobianqueSearch", {"keyword":"index"}, function(data){
			$(".template_list").html(data);
			$(".template_content").html("想知道些什么呢？");
			$("[template_content]").click(function(){
				 $(".template_content").html($(this).attr("template_content")) 
			});
		});
});