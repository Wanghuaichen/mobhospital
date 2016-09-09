// JavaScript Document
shujuyuan_imported = true;

;(function(){
	//添加对象方法
	$.fn.extend({
		//单选型数据源
		"replaceParent":function(){
			this.click(function(){
				//关闭自动保存
				window.clearInterval(auto_save_timer);
				//锁定聚焦的表格
				without_event_lock = true;
				
				var $shujuyuan_this = $(this);
				var $shujuyuan_zu = $(this).parent();											//定义 父节点
				var $shujuyuan_danxuan = $shujuyuan_zu.find("[name='shujuyuan_danxuan']");		//获得选项
				var original_shujuyuan_content = $shujuyuan_zu.html();							//定义还原点，若取消则返回该状态
				var original_shujuyuan_danxuan_content = new Array();							//存储选项内容，防止IE下内容神秘丢失
				for(var i=0; i<$shujuyuan_danxuan.size(); i++){
					original_shujuyuan_danxuan_content[i] = $shujuyuan_danxuan.eq(i).html();
				}
				var $tempMark = $shujuyuan_zu.clone();
				$tempMark.children("[name='shujuyuan_danxuan']").attr('alt','editing');
				$shujuyuan_zu.after($tempMark);
				
				$shujuyuan_zu.removeOtherShujuyuanFunction();
				
				/**
				 *	为选项添加表格标签及隐藏的单选按钮
				 *	!--判断选择jQuery 全局函数 方式还是 对象方法 方式添加--!
				 */
				 /*jQuery全局函数方式添加*/
				//var shujuyuan_content = $.addDanxuanLabel($shujuyuan_danxuan);
				/*jQuery对象方法方式添加*/
				var shujuyuan_content = $shujuyuan_danxuan.addDanxuanLabel();
					
				//添加弹出窗口
				art.dialog({
					id: 'shujuyuan_dialog',
					title: '请选择元素:',
    				padding: 0,
					content: $shujuyuan_zu[0],
					follow: $tempMark[0],
					fixed: true,
					esc: true,
					init: function(){	
						$shujuyuan_danxuan.removeClass('shujuyuan_hide');
						$shujuyuan_zu.html(shujuyuan_content);										//将 父节点 内容替换为新标签形式
																									//artDialog弹窗时会将这部分内容
																									//移动到弹出窗口中
																									
						$shujuyuan_zu.find("[name='shujuyuan_danxuan']").radioSelect();				//为选项添加单选动作
					},
					ok: function(){
						var $danxuan_radios = $shujuyuan_zu.find("[name='danxuan']");			//获取选项标签组
						var flag = false;
						//循环查找是否有被选中选项
						for(var i=0;i<$danxuan_radios.size();i++){
							$temp_radio = $danxuan_radios.eq(i);
							
							if($temp_radio.attr('checked')=='checked'){
								$shujuyuan_danxuan.addClass("shujuyuan_hide").replaceParent()
												  .eq(i).removeClass("shujuyuan_hide");
												  
								flag = true;
								break;
							}
						}
						if(!flag){
							//若无被选中内容, 则提示用户选择一个选项, 并阻止弹出窗口关闭
							//弹出窗口会显示0.8s, 之后自动关闭						
							art.dialog({
								id: 'warning',
								title: '',
    							//padding: 0,
								follow: $shujuyuan_zu[0],
								content: "请先选择一个选项",
								icon: 'warning',
								time: 0.8
							});
						}else{
							for(var i=0; i<original_shujuyuan_danxuan_content.length; i++){
								$shujuyuan_danxuan.eq(i).html(original_shujuyuan_danxuan_content[i]);
							}
							$shujuyuan_zu.html($shujuyuan_danxuan);
						}
						
						return flag;
					},
					cancel: function(){
						$shujuyuan_zu.html(original_shujuyuan_content);
						$shujuyuan_zu.find("[name='shujuyuan_danxuan']").replaceParent();
						
						return true;
					},
					close: function(){
						$.removeAllShujuyuanFunction();
						$.addAllShujuyuanFunction();
						$tempMark.remove();
						
						//开启自动保存
						auto_save_timer = window.setInterval(auto_save,time_of_auto_save); 
						//取消锁定聚焦表格
						without_event_lock = false;
					}
				});
			});
			
			return this;
		},
		"replaceParentMulti":function(){
			this.click(function(){
				//关闭自动保存
				window.clearInterval(auto_save_timer);
				//锁定聚焦的表格
				without_event_lock = true;
				
				var $shujuyuan_this = $(this);
				var $shujuyuan_zu = $(this).parent();											//定义 父节点
				var $shujuyuan_duoxuan = $shujuyuan_zu.find("[name='shujuyuan_duoxuan']");		//获得选项
				var original_shujuyuan_content = $shujuyuan_zu.html();							//定义还原点，若取消则返回该状状态
				var original_shujuyuan_duoxuan_content = new Array();							//存储选项内容，防止IE下内容神秘丢失
				for(var i=0; i<$shujuyuan_duoxuan.size(); i++){
					original_shujuyuan_duoxuan_content[i] = $shujuyuan_duoxuan.eq(i).html();
				}
				var $tempMark = $shujuyuan_zu.clone();
				$tempMark.children("[name='shujuyuan_duoxuan']").attr('alt','editing');
				$shujuyuan_zu.before($tempMark);
				
				$shujuyuan_zu.removeOtherShujuyuanFunction();
				
				/**
				 *	为选项添加表格标签及隐藏的多选按钮
				 *	!--需要选择jQuery 全局函数 方式还是 对象方法 方式添加--!
				 */
				 /*jQuery全局函数方式添加*/
				//var shujuyuan_content = $.addDanxuanLabel($shujuyuan_danxuan);
				/*jQuery对象方法方式添加*/
				var shujuyuan_content = $shujuyuan_duoxuan.addDuoxuanLabel();				
					
				//添加弹出窗口
				art.dialog({
					id: 'shujuyuan_dialog',
					title: '请选择元素:',
    				padding: 0,
					content: $shujuyuan_zu[0],
					follow: $tempMark[0],
					fixed: true,
					esc: true,
					init: function(){
						$shujuyuan_duoxuan.removeClass('shujuyuan_hide');
						$shujuyuan_zu.html(shujuyuan_content);										//将 父节点 内容替换为新标签形式
																									//artDialog弹窗时会将这部分内容
																									//移动到弹出窗口中
																									
						$shujuyuan_zu.find("[name='shujuyuan_duoxuan']").checkboxSelect();			//为选项添加多选动作
					},
					ok: function(){
						var $duoxuan_checkboxes = $shujuyuan_zu.find("[name='duoxuan']");			//获取选项标签组
						var checked_boxes = new Array();
						var flag = false;
						
						$shujuyuan_duoxuan.addClass("shujuyuan_hide").replaceParentMulti();
						//循环查找是否有被选中选项
						for(var i=0;i<$duoxuan_checkboxes.size();i++){
							$temp_checkbox = $duoxuan_checkboxes.eq(i);
							checked_boxes[i] = false;
							
							if($temp_checkbox.attr('checked')=='checked'){
								$shujuyuan_duoxuan.eq(i).removeClass('shujuyuan_hide');
								
								checked_boxes[i] = true;
								flag = true;
							}
						}
						
						if(!flag){
							//若无被选中内容, 则提示用户选择一个选项, 并阻止弹出窗口关闭
							//弹出窗口会显示0.8s, 之后自动关闭						
							art.dialog({
								id: "shujuyuan_warning",
								title: '',
    							//padding: 0,
								follow: $shujuyuan_zu[0],
								content: "请先选择一个选项",
								icon: 'warning',
								time: 0.8
							});
						}else{
							//$shujuyuan_zu.html($shujuyuan_duoxuan);
							
							$shujuyuan_zu.html("");
														
							//checked_boxes[checked_boxes.lastIndexOf(true)] = false;
							var last_inedx = checked_boxes.length-1-$.inArray(true,checked_boxes.reverse());
							checked_boxes.reverse();
							checked_boxes[last_inedx] = false;
							for(var i=0; i<$duoxuan_checkboxes.size(); i++){
								$shujuyuan_duoxuan.eq(i).html(original_shujuyuan_duoxuan_content[i]);
								$shujuyuan_zu.append($shujuyuan_duoxuan.eq(i));
								
								if(checked_boxes[i]){
									$shujuyuan_zu.append("、");									
								}
							}
						}
						
						return flag;
					},
					cancel: function(){
						$shujuyuan_zu.html(original_shujuyuan_content);
						$shujuyuan_zu.find("[name='shujuyuan_duoxuan']").replaceParentMulti();
						
						return true;
					},
					close: function(){
						$.removeAllShujuyuanFunction();
						$.addAllShujuyuanFunction();
						$tempMark.remove();
						
						//开启自动保存
						auto_save_timer = window.setInterval(auto_save,time_of_auto_save); 
						//取消锁定聚焦表格
						without_event_lock = false;
					}
				});
				
			});
			
			return this;
		},
		//输入型数据源
		"replaceInput":function(){
			this.click(function(){
				//关闭自动保存
				window.clearInterval(auto_save_timer);
				//锁定聚焦的表格
				without_event_lock = true;
				
				//$.removeAllShujuyuanFunction();
				var $shujuyuan_this = $(this);
				var $shujuyuan_input = $(this).parent();												//定义 父节点
				var $shujuyuan_shuru = $shujuyuan_input.find("[name='shujuyuan_shuru']");				//获得选项
				var original_shujuyuan_content = $shujuyuan_input.html();								//定义还原点，若取消则返回该状态
				
				//获取数据类型
				if($shujuyuan_this.attr('rel')!=null && $shujuyuan_this.attr('rel')!=' '){
					var dataType = $shujuyuan_this.attr('rel');
				}
				
				//获取数据范围
				if($shujuyuan_this.attr('rev')!=null && $shujuyuan_this.attr('rev')!=' '){
					var range = $shujuyuan_this.attr('rev');
					var minVal = range.split('/')[0];
					var maxVal = range.split('/')[1];
				}
				
				//取消其他数据源动作
				$shujuyuan_input.removeOtherShujuyuanFunction();
				
				var $tempMark = $shujuyuan_input.clone();
				$tempMark.children("[name='shujuyuan_shuru']").attr('alt','editing');
				//var $tempMark = $(original_shujuyuan_content);
				$shujuyuan_input.after($tempMark);
				
				var shujuyuan_title = $shujuyuan_shuru.attr("title");
				var shujuyuan_content = "<input type='text' size='10' name='input_of_shujuyuan' />";	
				
				$shujuyuan_input.html(shujuyuan_content);
				$input_of_shujuyuan = $shujuyuan_input.find("[name='input_of_shujuyuan']");
				
				
				var closeType = false;
				art.dialog({
					id: "InputDialog",
					title: "请输入"+shujuyuan_title,
					content: $shujuyuan_input[0],
    				padding: 0,
					follow: $tempMark[0],
					fixed: true,
					esc: true,
					/*
					lock: true,
					background: 'orange', // 背景色
					opacity: 0.17,	// 透明度
					*/
					init: function(){
						$input_of_shujuyuan.keydown(function(e){
							if(e.keyCode == 13){
								closeType = true;
								art.dialog({id: "InputDialog"}).close();
							}else if(e.keyCode == 27){
								closeType = false;
								art.dialog({id: "InputDialog"}).close();
							}
						});
						//聚焦用，解决IE7下无法聚焦问题
						art.dialog({
								id:'focusing',
								init: function(){
									this.focus();
								},
								close: function(){
									$input_of_shujuyuan.focus();
								}
						}).hide().time(0.001);
					},
					close: function(){
						if(closeType){
							if($input_of_shujuyuan.val()!=''){
								var dataValidate = true;
								var newLabel = "<a class='shujuyuan' name='shujuyuan_shuru' href='###' title='"+
														shujuyuan_title+"' ";
														
								if(dataType!=null){
									dataValidate = inputDataTypeValidate($input_of_shujuyuan,dataType);
									newLabel += "rel='"+dataType+"' ";
								}
								if(range!=null){
									inputRangeTypeValidate($input_of_shujuyuan,minVal,maxVal);
									newLabel += "rev='"+range+"' ";
								}
								if(dataValidate){
									$shujuyuan_input.html(newLabel+">"+
															$input_of_shujuyuan.val()+"</a>");
									$shujuyuan_input.find("[name='shujuyuan_shuru']").replaceInput();
									
									$tempMark.remove();
									//开启自动保存
									auto_save_timer = window.setInterval(auto_save,time_of_auto_save); 
									//取消锁定聚焦表格
									without_event_lock = false;
									
									$.removeAllShujuyuanFunction();
									$.addAllShujuyuanFunction();
									return true;
								}else {
									return false;
								}
							}
							//若无被选中内容, 则提示用户选择一个选项, 并阻止弹出窗口关闭
							//弹出窗口会显示0.8s, 之后自动关闭											
							art.dialog({
								title: '',
								id: "shujuyuan_shuru_warning",
								content: '<div style="padding: 0 1em;">请先输入一个值</div>',
	    						padding: 0,
								follow: $input_of_shujuyuan[0],
								close: function(){
									$input_of_shujuyuan.focus();
								},
								icon: 'warning',
								time: 0.8
							});
							//轻量级提示, 问题为无法定位
							//art.dialog.tips('请先输入一个值',0.8);
							return false;
						}else {
							$shujuyuan_input.html(original_shujuyuan_content);
							$shujuyuan_input.find("[name='shujuyuan_shuru']").replaceInput();
							
							$tempMark.remove();
							
							//开启自动保存
							auto_save_timer = window.setInterval(auto_save,time_of_auto_save); 
							//取消锁定聚焦表格
							without_event_lock = false;
							
							$.removeAllShujuyuanFunction();
							$.addAllShujuyuanFunction();
							return true;
						}
					},
					ok: function(){
						closeType = true;
						//art.dialog({id: "InputDialog"}).close();
					},
					cancel: function(){
						closeType = false;
						//art.dialog({id: "InputDialog"}).close();
					}
				});
				/*
				$(this).parent(".shujuyuan_input").after(
					"<span name='div_of_shujuyuan_input'>"+
						"<input type='text' size='10' name='input_of_shujuyuan' />"+
					"</span>"
				);
				
				$(this).parent(".shujuyuan_input").next().find("[name='input_of_shujuyuan']").focus()
					.keydown(function (e) {
						if (e.keyCode == 13){
							if($(this).val()!='')
								$(this).parent().prev(".shujuyuan_input").html($(this).val());
							$(this).parent().remove();
							return false;
						}
					});
					*/
			});
			
			return this;
		},
		/*---------------------------------------------------------------------------------------------------------------------*/
		//为单选类型元素添加动作
		"radioSelect":function(){
			this.click(function(){						
				$(this)
					.removeClass('shujuyuan_tr').addClass('selected')
					.siblings().removeClass('selected').addClass('shujuyuan_tr')
					.end()
					.find(':radio').attr('checked',true);
			});
			
			return this;
		},
		//为多选类型元素添加动作
		"checkboxSelect":function(){
			this.click(function(){						
				var hasSelected = $(this).hasClass('selected');
				$(this)[hasSelected?"removeClass":"addClass"]('selected')
					[!hasSelected?"removeClass":"addClass"]('shujuyuan_tr')
					.find(':checkbox').attr('checked',!hasSelected);
			});
			
			return this;
		},
		/*---------------------------------------------------------------------------------------------------------------------*/
		//为单选型数据源的artDialog选项添加元素, 此处为从原模板提取元素转换. 下一步改进从ajax获取元素
		"addDanxuanLabel" : function(){
				var shujuyuan_content = "<table>";
				for(var i=0; i<this.size(); i++){
					shujuyuan_content += "<tr name='shujuyuan_danxuan' class='shujuyuan_tr'><td>"+
											"<input type='radio' name='danxuan' style='display:none;' />"+
											"<span name='danxuan_content'>"+
												this.eq(i).html()+
											"</span>"+
										 "</td></tr>";
				}
					shujuyuan_content += "</table>";
					
			return shujuyuan_content;
		},
		//为多选型数据源的artDialog选项添加元素, 此处为从原模板提取元素转换. 下一步改进从ajax获取元素
		"addDuoxuanLabel" : function(){
				var shujuyuan_content = "<table>";
				for(var i=0; i<this.size(); i++){
					shujuyuan_content += "<tr name='shujuyuan_duoxuan' class='shujuyuan_tr'><td>"+
											"<input type='checkbox' name='duoxuan' style='display:none;' />"+
											"<span name='duoxuan_content'>"+
												this.eq(i).html()+
											"</span>"+
										 "</td></tr>";
				}
					shujuyuan_content += "</table>";
					
			return shujuyuan_content;
		},
		/*---------------------------------------------------------------------------------------------------------------------*/
		//为其他标签取消插件
		"removeOtherShujuyuanFunction" : function(){
			var $tempThis = this;
			
			while($tempThis[0].tagName!="BODY"){
				$tempThis.siblings().find("[name='shujuyuan_danxuan']").unbind('click');
				$tempThis.siblings().find("[name='shujuyuan_duoxuan']").unbind('click');
				$tempThis.siblings().find("[name='shujuyuan_shuru']").unbind('click');
				$tempThis = $tempThis.parent();
			}
			
			/*解决方法V0.2
			this.siblings().find("[name='shujuyuan_danxuan']").unbind('click');
			this.parent().parent().parent().parent().siblings().find("[name='shujuyuan_danxuan']").unbind('click');
			
			this.siblings().find("[name='shujuyuan_duoxuan']").unbind('click');
			this.parent().parent().parent().parent().siblings().find("[name='shujuyuan_duoxuan']").unbind('click');
			
			this.siblings().find("[name='shujuyuan_shuru']").unbind('click');
			this.parent().parent().parent().parent().siblings().find("[name='shujuyuan_shuru']").unbind('click');
			*/
			/*解决方法V0.1
			this.prevAll().find("[name='shujuyuan_danxuan']").unbind('click');
			this.nextAll().find("[name='shujuyuan_danxuan']").unbind('click');
			this.parent().parent().parent().parent().prevAll().find("[name='shujuyuan_danxuan']").unbind('click');
			this.parent().parent().parent().parent().nextAll().find("[name='shujuyuan_danxuan']").unbind('click');
			
			this.prevAll().find("[name='shujuyuan_duoxuan']").unbind('click');
			this.nextAll().find("[name='shujuyuan_duoxuan']").unbind('click');
			this.parent().parent().parent().parent().prevAll().find("[name='shujuyuan_duoxuan']").unbind('click');
			this.parent().parent().parent().parent().nextAll().find("[name='shujuyuan_duoxuan']").unbind('click');
			
			this.prevAll().find("[name='shujuyuan_shuru']").unbind('click');
			this.nextAll().find("[name='shujuyuan_shuru']").unbind('click');
			this.parent().parent().parent().parent().prevAll().find("[name='shujuyuan_shuru']").unbind('click');
			this.parent().parent().parent().parent().nextAll().find("[name='shujuyuan_shuru']").unbind('click');
			*/
			
			return this;
		}
	});
	//添加全局函数
	$.extend({
		//为所有标签添加插件
		addAllShujuyuanFunction:function(){
			$("[name='shujuyuan_danxuan']").replaceParent();
			$("[name='shujuyuan_duoxuan']").replaceParentMulti();
			$("[name='shujuyuan_shuru']").replaceInput();
			
			return true;
		},
		//为单选数据源添加插件
		addDanxuanShujuyuanFunction:function(){
			$("[name='shujuyuan_danxuan']").replaceParent();
		},
		//为多选数据源添加插件
		addDanxuanShujuyuanFunction:function(){
			$("[name='shujuyuan_duoxuan']").replaceParentMulti();
		},
		//为出入数据源添加插件
		addDanxuanShujuyuanFunction:function(){
			$("[name='shujuyuan_shuru']").replaceInput();
		},
		//为所有标签取消插件
		removeAllShujuyuanFunction:function(){
			$("[name='shujuyuan_danxuan']").unbind('click');
			$("[name='shujuyuan_duoxuan']").unbind('click');
			$("[name='shujuyuan_shuru']").unbind('click');
			
			return true;
		},
		//为单选数据源取消插件
		removeDanxuanShujuyuanFunction:function(){
			$("[name='shujuyuan_danxuan']").unbind('click');
		},
		//为多选数据源取消插件
		removeDanxuanShujuyuanFunction:function(){
			$("[name='shujuyuan_duoxuan']").unbind('click');
		},
		//为出入数据源取消插件
		removeDanxuanShujuyuanFunction:function(){
			$("[name='shujuyuan_shuru']").unbind('click');
		}
		/*---------------------------------------------------------------------------------------------------------------------*/
		/*
		//为单选型数据源的artDialog选项添加元素, 此处为从原模板提取元素转换. 下一步改进从ajax获取元素
		,addDanxuanLabel : function($shujuyuan_danxuan){
			var shujuyuan_content = "<p>请选择元素:<p>";
					shujuyuan_content += "<table>";
				for(var i=0; i<$shujuyuan_danxuan.size(); i++){
					shujuyuan_content += "<tr name='shujuyuan_danxuan' class='shujuyuan_tr'><td>"+
											"<input type='radio' name='danxuan' style='display:none;' />"+
											"<span name='danxuan_content'>"+
												$shujuyuan_danxuan.eq(i).html()+
											"</span>"+
										 "</td></tr>";
				}
					shujuyuan_content += "</table>";
					
			return shujuyuan_content;
		}*/
	});
})(jQuery);

/*---------------------------------------------------------------------------------------------------------------------*/
//对输入值类型进行判断
function inputDataTypeValidate($inputer,dataType){
	var reg = '';
	var warningStr = '输入的数据类型错误！';
	if(dataType == 'int'){
		reg = /^-?\d+$/;
		warningStr += '请输入一个整数';
	}else if(dataType == 'float'){
		reg = /^(-?\d+)(\.\d+)?$/;
		warningStr += '请输入一个浮点数';
	}else {
		reg = /^[^x00-xffA-Za-z]+$/;
		warningStr += '请输入一段文字';
	}
	
	if(reg.test($inputer.val().toString())){
		return true;
	}else {
		art.dialog({
			content: warningStr,
			follow: $inputer[0],
			icon: 'warning',
			time: 1
		});
		return false;
	}
}
//对输入值类型进行判断
function inputRangeTypeValidate($inputer,minVal,maxVal){
	var warningStr = '请检查输入的数据范围！';
	var dataVal = $inputer.val();
	var flag = true;
	
	if(dataVal < parseFloat(minVal)){
		warningStr += '不应低于'+minVal;
		flag = false;
	}else if(dataVal > parseFloat(maxVal)){
		warningStr += '不应高于'+maxVal;
		flag = false;
	}
	
	if(!flag){
		art.dialog({
			content: warningStr,
			follow: $inputer[0],
			icon: 'warning',
			time: 1.5
		});
	}
	
	return flag;
}