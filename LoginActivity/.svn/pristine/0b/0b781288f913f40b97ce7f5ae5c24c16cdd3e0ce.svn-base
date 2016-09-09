/*常量设置*/
/*
 +-----------------------------------------------------------------------
 * timyMCE设置
 +-----------------------------------------------------------------------
 */
var current_editor_id = "notinyemc";

/*选项设置*/
/*
 +-----------------------------------------------------------------------
 * ajax 设置
 +-----------------------------------------------------------------------
 */
var form_options={ 
	dataType: 'json',
/*	beforeSerialize:function validateForm(){
		$(".textarea_type_auto").each(function(){
			$("."+$(this).attr("submit_name")+"_submit").val($(this).html());
		});
		$(".textarea_type_small").each(function(){
			$("."+$(this).attr("submit_name")+"_submit").val($(this).html());
		});
	},
	beforeSubmit:function validateForm(){
		var validate_flag = true;
		$("[reg]").each(function(){
			if(!validate($(this))){
				validate_flag = false;
			}
		});
		return 	validate_flag;
	},*/
	success:function showResponse(data){
		//alert(data[0].message);
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

/*文章系统js插件*/
;(function($){
	//添加对象方法
	$.fn.extend({
		/*
		 +-----------------------------------------------------------------------
		 * showList插件
		 +-----------------------------------------------------------------------
		 */
		//鼠标经过表格样式变化
		"hoverHand" : function(){
			this.hover(
				function () {
					$(this).addClass("tr_hover");
				},
				function () {
					$(this).removeClass("tr_hover");
				}
			);
			
			return this;
		},
		//文章列表跳转
		"linkJump" : function(){
			this.click(function () {
				parent.last_conframe_content = window.location.href;
				parent.current_conframe_content = $(this).attr("href");
				window.location.href = $(this).attr("href");
			});
			
			return this;
		},
		//文章列表排序
		"orderTypeChange" : function(){
			this.change(function(){
				$(this).parents("form").submit();
			});
			
			return this;
		},
		/*
		 +-----------------------------------------------------------------------
		 * showArticle, showAddArticle插件
		 +-----------------------------------------------------------------------
		 */
		 //打开tinyMCE编辑器
		"openEditer" : function(){
			this.click(function(){
				if(current_editor_id!="notinyemc")
				{
					saved=false;
					tinyMCE.execCommand("mceRemoveControl", true, current_editor_id);
					tinyMCE.execCommand("mceAddControl", true, "article_content_edit");
					current_editor_id = "article_content_edit";	
				}
				else
				{
					saved=false;
					tinyMCE.execCommand("mceAddControl", true, "article_content_edit");
					current_editor_id = "article_content_edit";				
				}
				//$("#"+current_editor_id.replace(/edit/,"link")).ScrollTo("top");
				
				return false;
			});
			
			return this;
		},
		 //关闭tinyMCE编辑器
		"closeEditer" : function(){
			this.click(function(){
				if(current_editor_id!="notinyemc")
				{
					tinyMCE.execCommand("mceRemoveControl", true, current_editor_id);
					$("#article_content_edit").animate({borderWidth:"5px"});
					$("#article_content_edit").animate({borderWidth:"1px"});
				}
				else
				{
					$("#article_content_edit").animate({borderWidth:"5px"});
					$("#article_content_edit").animate({borderWidth:"1px"});
				}
				
				return false;
			});
			
			return this;
		},
		//打分星星控制
		"starsMarking" : function(){
			$(".star").css('cursor','pointer');
			
			var is_marked = $('#is_marked').val();
			
			if(is_marked == 'false'){
				this.children("img").hover(
					function(){
						var img_src = $(this).attr('src');
						$(this).attr('src',img_src.replace(/off/,"on"))
							   .prevAll('img').attr('src',img_src.replace(/off/,"on"));
					},
					function(){
						var img_src = $(this).attr('src');
						$(this).attr('src',img_src.replace(/on/,"off"))
							   .prevAll('img').attr('src',img_src.replace(/on/,"off"));
					}
				);
				this.children("img").click(function(){
					var star_mark = $(this).attr('alt');
					$(this).nextAll('#star_mark').val(star_mark);
					$(".star").unbind();
					
					$(".edit_form").submit();
					//$(".edit_form").ajaxSubmit(form_options);
				});
			}
			
			return this;
		},
		"updateModify" : function(){
			this.click(function(){
				var flag = true;
				
				if(current_editor_id!="notinyemc")
				{
					tinyMCE.execCommand("mceRemoveControl", true, current_editor_id);
				}
				
				if($("[reg]").length > 0)
				{
					if(!validate($("[reg]")))
						flag = false;
				}
				$('#post_status').val('编辑中');
				
				$('[name="article_content"]').val($('#article_content_edit').html());
				
				return flag;
			});
			
			return this;
		},
		"updatePost" : function(){
			this.click(function(){
				var flag = true;
				
				if(current_editor_id!="notinyemc")
				{
					tinyMCE.execCommand("mceRemoveControl", true, current_editor_id);
				}
				
				if($("[reg]").length > 0)
				{
					if(!validate($("[reg]")))
						flag = false;
				}
				$('#post_status').val('已发布');
				
				$('[name="article_content"]').val($('#article_content_edit').html());
				
				return flag;
			});
			
			return this;
		},
		"resetBtn" : function(){
			this.click(function(){
				location.reload();
				return false;
			});
			
			return this;
		},
		"deleteBtn" : function(){
			this.click(function(){
				if (confirm('是否确认进行删除操作？'))
				{
					var action_function = $(".edit_form").attr('action').replace(/updateArticle/,"deleteArticle");
					$(".edit_form").attr('action',action_function);
					
					return true;
				}
				else
				{
					return false;
				}
			});
			
			return this;
		},
		"addDateTimePicker" : function(){
			this.datepicker({
				timeFormat: 'hh:mm',
				dateFormat: 'yy-mm-dd'
			});
			
			return this;
		},
		"checkStandard" : function(){
			$(this).click(function(){
				var standard = "<div style='width:500px;height:300px;overflow-y:scroll;'>"+$(this).next("#article_standard").val()+"</div>";
				art.dialog({
					id: "",
					title: "",
					ok: "确定",
					lock: true,
					content: standard
				});
				
				return false;
			});
			
			return this;
		}
	});
})(jQuery);

//表格验证函数
//*************************************************************************
function validate(obj){
	var reg = new RegExp(obj.attr("reg"));
	var obj_value = obj.attr("value");
	var right_message = obj.attr("right_message");
	var error_message = obj.attr("error_message");
	var tipObj = obj.parent().next().find("[name='tips_message']")
	var tips_message = tipObj.html();

	tipObj.removeClass();	
	// 检测 是否符合正则表达
	if(!reg.test(obj_value)){
		tipObj.html(error_message);
		tipObj.addClass("onError");
		return false;
	}
	else
	{
		if(obj.is("[data_type='needed_radio']")){  //判断radio表单元素;
			//alert(obj.attr("value"));
			var inputname=obj.attr("name");
			var radiovalue=obj.parent().find(":radio[name="+inputname+"]:checked").val();
			if(!radiovalue){
				tipObj.html(error_message);
				tipObj.addClass("onError");
				return false;
			}
		}
		if(obj.is("[data_type='needed_checkbox']")){  //判断checkbox表单元素;
			//alert(obj.attr("value"));
			var inputname=obj.attr("name");
			var checkboxvalue=obj.parent().find(":checkbox[name="+inputname+"]:checked").val();
			if(!checkboxvalue){
				tipObj.html(error_message);
				tipObj.addClass("error_tips");
				return false;
			}
		}
		tipObj.html(right_message);
		tipObj.addClass("right_tips");
		return true;
	}
}