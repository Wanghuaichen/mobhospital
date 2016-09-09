/**************************************************
*  Created:  2014-06-17
*  Info:LIS接口
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author Dongjie <dongjie@tiantanhehe.com>
*  @Version 1.0
*  @Updated History:  
***************************************************/

$(function(){
	$("[name='daoru_lis_reult']").click(function(){
				var xiangmu_mingcheng = $(this).parent().text();
				art.dialog({
					id:"lis_result_daoru",
					title:"请选择一项最近的"+xiangmu_mingcheng+"检查结果导入病历中",
					content:
							'<div class="lis_daoru_result">'+
								'<ul>'+
									'<li>快速查询：'+
									'<input type="" name="bingzong_name" value=""/>'+
									'<input type="button" name="bingzong_name_btn" value="查询" class="search_button"/>'+
									'<input type="button" name="bingzong_name_btn_all" value="显示全部" class="search_button"/>'+
									'</li>'+
									'<li class="one_rsult" style="display:list-item;">2014-06-15 09:08 '+xiangmu_mingcheng+'检查结果</li>'+
									'<li class="one_rsult" style="display:list-item;">2014-06-14 10:12 '+xiangmu_mingcheng+'检查结果</li>'+
									'<li class="one_rsult" style="display:list-item;">2014-06-13 09:23 '+xiangmu_mingcheng+'检查结果</li>'+
									'<li class="one_rsult" style="display:list-item;">2014-06-12 09:00 '+xiangmu_mingcheng+'检查结果</li>'+
									'<li class="one_rsult" style="display:list-item;">2014-06-11 10:00 '+xiangmu_mingcheng+'检查结果</li>'+
								'</ul>'+
							'</div>'+
							'<div class="lis_daoru_confirm">'+
								'<input type="button"  class="submit_button" id="confirm" value=" 确 定 " />'+
								'<input type="button"  class="submit_button" id="cancel" value=" 取 消 " />'+
							'</div>',
					lock: true,
					padding:5,
					drag: false,
					resize: false,
					fixed: true,
					close:function(){
						$("body").eq(0).css("overflow","scroll");
					},
					init: function () {
						$(".one_rsult").click(function(){
							//模拟添加数据：
							$("[name='xuehongdanbai']").val("12");
							$("[name='hongxibaojishu']").val("1");
							$("[name='baixibaojishu']").val("2");
							$("[name='xuexibaorongji']").val("4.5");
							$("[name='xuexiaobanjishu']").val("6.2");
							
							art.dialog.list['lis_result_daoru'].close();
						});
						$("#confirm").click(function(){
							art.dialog.list['lis_result_daoru'].close();
						});
						$("#cancel").click(function(){
							art.dialog.list['lis_result_daoru'].close();
						});
					}
				});//art.dialog linchuanglujing_dialog
	});
});