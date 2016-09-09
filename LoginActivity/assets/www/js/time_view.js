$(document).ready(function(){
	//初始化底部弹出
	$(".bottom_menu").css("left","200px");
	$(".bottom_menu").css("right","250px");
})
function getHuaban(start_time,end_time){
	if(current_zhixing_id==""||current_zhixing_id==null)
	{
		return;
	}
	//初始化视图面板
	$.post("/tiantan_emr/Data/timeView/",{zhuyuan_id:current_zhixing_id,start_time:start_time,end_time:end_time},function(data){
			if(data=='false')
				return false;
			else
			{
				menu_width=data.width;
				//alert(data.shijian_html)
				$('.zhuyuan_info').css('width',data.width+120);
				$('.zhuyuan_info_right').css('width',data.width);
				$('.zhuyuan_info_right').html('');
				$('#shijianzhou').css('width',data.width+120);
				$('#shijianzhou').html(data.shijian_html);
				$('.hulijilu').html('<canvas id="hulijilu" style="position:absolute" height="60px" width="'+data.width+'px;" ></canvas>');
				$('.tiwen').html('<canvas id="tiwen" style="position:absolute;top:0px; left:0px;" height="60px" width="'+data.width+'px;" ></canvas>');
				$('.xinlv').html('<canvas id="xinlv" style="position:absolute;top:0px; left:0px;" height="60px" width="'+data.width+'px;" ></canvas>');
				$('.xueya').html('<canvas id="xueya" style="position:absolute;top:0px; left:0px;" height="60px" width="'+data.width+'px;" ></canvas>');
				//住院事件画图
				$.post("/tiantan_emr/Data/getZhuyuanEventforTimeView/",{zhuyuan_id:current_zhixing_id,start_time:start_time,end_time:end_time},function(data){
					for(var i=0;i<data.length;i++)
					{
						$('.zhuyuan_shijian').append('<div style="color:#063803;left:'+(data[i].x_pos)+'px;top:'+data[i].y_pos+'px;" class="time_view_tag" keyword="'+data[i].keyword+'">○'+data[i].des+'</div>');
					}
					
				},"json");
				//住院用药件画图
				$.post("/tiantan_emr/Data/getYongyaoEventforTimeView/",{zhuyuan_id:current_zhixing_id,start_time:start_time,end_time:end_time},function(data){
					if(data=='false')
						return false;
					else
					{
						var max = 0;
						for(var i=0;i<data.length;i++)
						{
							if (data[i].y_pos>max)
								max=data[i].y_pos;
						}
						$('.zhuyuan_yongyao').html('<canvas id="zhuyuan_yongyao" height="'+(max+20)+'px" width="'+(menu_width)+'px;" ></canvas>');
							var yongyao_changqi = document.getElementById('zhuyuan_yongyao');
							var yongyao_changqi = yongyao_changqi.getContext('2d');
							for(var i=0;i<data.length;i++)
							{
								yongyao_changqi.beginPath();
								if(data[i].state == "zhixingwanbi")
									yongyao_changqi.strokeStyle = 'red';
								else
									yongyao_changqi.strokeStyle = '#00ff00';
												
								yongyao_changqi.moveTo(data[i].x_pos_k,data[i].y_pos);
								yongyao_changqi.lineTo(data[i].x_pos_j,data[i].y_pos);
								yongyao_changqi.lineWidth=1;
								yongyao_changqi.closePath();
								yongyao_changqi.stroke();
								var k=data[i].x_pos_k;
								do{
									$('.zhuyuan_yongyao').append('<div style="color:#000;left:'+(k)+'px;top:'+(data[i].y_pos+2)+'px;" class="time_view_tag" keyword="'+data[i].keyword+'">'+data[i].des+'</div>');
									k=k+850;
								}
								while(k<data[i].x_pos_j)
				
							}
							for(var i=0;i<data.length;i++)
							{
								if (data[i].huanbu_str_k=='true')
								{
									yongyao_changqi.beginPath();
									yongyao_changqi.arc(data[i].x_pos_k,data[i].y_pos,1,0,Math.PI*2,false);
									yongyao_changqi.closePath();
									yongyao_changqi.lineWidth = 3;
								}
								

								if (data[i].type=='changqi')
									yongyao_changqi.strokeStyle = 'red';
								else
									yongyao_changqi.strokeStyle = 'blue';		
									
								yongyao_changqi.stroke();
							
								if (data[i].x_pos_k != data[i].x_pos_j && data[i].state == "zhixingwanbi" && data[i].huanbu_str_j=='true')
								{
									yongyao_changqi.beginPath();
									yongyao_changqi.arc(data[i].x_pos_j,data[i].y_pos,1,0,Math.PI*2,false);
									yongyao_changqi.closePath();
									yongyao_changqi.stroke();
								}
							}
						}
							
					},"json");
				//辅助检查事件画图
				$.post("/tiantan_emr/Data/getFuzhujianchaEventforTimeView/",{zhuyuan_id:current_zhixing_id,start_time:start_time,end_time:end_time},function(data){
					$('.fuzhujiancha').append('<div style=" width:100%;height:20px;"></div><div style=" width:100%;height:20px;"></div><div style=" width:100%;height:20px;"></div>');
					var j=50;
					for(var i=0;i<data.length;i++)
					{	
						var jiancha_name = data[i].des;
						var jiancah_length = jiancha_name.length;
						if(jiancah_length>17)
						{
							var jiancha_name_new = jiancha_name.substr(1,10)+"...";
						}
						else
						{
							var jiancha_name_new = jiancha_name;
						}
						$('.fuzhujiancha').append('<div style="color:#c600ff;left:'+(data[i].x_pos)+'px;top:'+data[i].y_pos+'px;" class="time_view_tag" keyword="'+data[i].keyword+'">☆'+jiancha_name_new+'</div>');
						if(data[i].y_pos>j)
						{
							$('.fuzhujiancha').append('<div style=" width:100%;height:20px;"></div>');
							j=j+20;
						}
					}
				},"json");
				//护理记录画图
				$.post("/tiantan_emr/Data/getHulijiluEventforTimeView/",{zhuyuan_id:current_zhixing_id,start_time:start_time,end_time:end_time},function(data){
					if(data==false)
					{
						return false;
					}
					else
					{
						$('.hulijilu').html('<canvas id="hulijilu" height="'+(data[data.length-1].y_pos+30)+'px" width="'+menu_width+'px;" ></canvas>');
							var hulijilu = document.getElementById('hulijilu');
							var hulijilu = hulijilu.getContext('2d');
							for(var i=0;i<data.length;i++)
							{
								hulijilu.beginPath();
								if(data[i].state == "zhixingwanbi")
									hulijilu.strokeStyle = 'red';
								else
									hulijilu.strokeStyle = '#00ff00';
								hulijilu.moveTo(data[i].x_pos_k,data[i].y_pos);
								hulijilu.lineTo(data[i].x_pos_j,data[i].y_pos);
								hulijilu.lineWidth=1;
								hulijilu.closePath();
								hulijilu.stroke();
								var k=data[i].x_pos_k;
								do{
									$('.hulijilu').append('<div style="color:#000;left:'+(k)+'px;top:'+(data[i].y_pos+2)+'px;" class="time_view_tag" keyword="'+data[i].keyword+'">'+data[i].des+'</div>');
									k=k+850;
								}
								while(k<data[i].x_pos_j)
								
							}
							for(var i=0;i<data.length;i++)
							{
								if (data[i].huanbu_str_k=='true')
								{
									hulijilu.beginPath();
									hulijilu.arc(data[i].x_pos_k,data[i].y_pos,1,0,Math.PI*2,false);
									hulijilu.closePath();
									hulijilu.lineWidth = 3;
									hulijilu.strokeStyle = 'red';
									hulijilu.stroke();
								}



								if (data[i].x_pos_k != data[i].x_pos_j && data[i].state == "zhixingwanbi" && data[i].huanbu_str_j=='true')
								{
									hulijilu.beginPath();
									hulijilu.arc(data[i].x_pos_j,data[i].y_pos,1,0,Math.PI*2,false);
									hulijilu.closePath();
									hulijilu.stroke();
								}
							}
						}
				   },"json");
	   	 		//病历记录画图
				$.post("/tiantan_emr/Data/getBinglijiluEventforTimeView/",{zhuyuan_id:current_zhixing_id,start_time:start_time,end_time:end_time},function(data){
					$('.bingchengjilu').append('<div style=" width:100%;height:20px;"></div><div style=" width:100%;height:20px;"></div><div style=" width:100%;height:20px;"></div>');
					
					var j=50;
					for(var i=0;i<data.length;i++)
					{
						$('.bingchengjilu').append('<div style=" color:#00f;left:'+(data[i].x_pos)+'px;top:'+data[i].y_pos+'px;" class="time_view_tag" keyword="'+data[i].keyword+'">□'+data[i].des+'</div>');
						if(data[i].y_pos>j)
						{
							$('.bingchengjilu').append('<div style=" width:100%;height:20px;"></div>');
							j=j+20;
						}
						
					}
									
				},"json");
				//体温件画图
				$.post("/tiantan_emr/Data/getTiwenEventforTimeView/",{zhuyuan_id:current_zhixing_id,start_time:start_time,end_time:end_time},function(data){
						var tiwen = document.getElementById('tiwen');
						var tiwen = tiwen.getContext('2d');
						//循环data变量
						if(data[0].x_pos!='' || data[0].y_pos!='' || data[0].x_pos!=null || data[0].y_pos!=null)
						tiwen.moveTo(data[0].x_pos,data[0].y_pos);//第一个起点
						tiwen.fillStyle="blue";
						if(data[0].x_pos!='' || data[0].y_pos!='' || data[0].x_pos!=null || data[0].y_pos!=null)
							tiwen.fillText(data[0].des,(data[0].x_pos-10),(data[0].y_pos-10));
						for(var i=1;i<data.length;i++)
						{	
							tiwen.fillText(data[i].des,(data[i].x_pos-5),(data[i].y_pos+12));
							tiwen.lineTo(data[i].x_pos,data[i].y_pos);
							
						}
						tiwen.lineWidth=1;
						tiwen.strokeStyle = '#c600ff';
						tiwen.stroke();
						
						for(var i=0;i<data.length;i++)
						{
							tiwen.beginPath();
							tiwen.arc(data[i].x_pos,data[i].y_pos,1,0,Math.PI*2,false);
							tiwen.closePath();
							tiwen.lineWidth = 3;
							tiwen.strokeStyle = 'blue';
							tiwen.stroke();
						}
						
				   },"json");
				//心率
				$.post("/tiantan_emr/Data/getXinlvEventforTimeView/",{zhuyuan_id:current_zhixing_id,start_time:start_time,end_time:end_time},function(data){
						var xinlv = document.getElementById('xinlv');
						var xinlv = xinlv.getContext('2d');
						//循环data变量
						if(data[0].x_pos!='' || data[0].y_pos!='' || data[0].x_pos!=null || data[0].y_pos!=null)
							xinlv.moveTo(data[0].x_pos,data[0].y_pos);//第一个起点
						
						$('.xinlv').append('<div style=" width:100%;height:20px;"></div><div style=" width:100%;height:20px;"></div><div style=" width:100%;height:20px;"></div>');
						var j=50;
						
						for(var i=1;i<data.length;i++)
						{	
							xinlv.lineTo(data[i].x_pos,data[i].y_pos);
							if(data[i].y_pos>j)
							{
								$('.bingchengjilu').append('<div style=" width:100%;height:20px;"></div>');
								j=j+20;
							}
						}
						xinlv.lineWidth=1;
						xinlv.strokeStyle = '#0f0';
						xinlv.stroke();
						xinlv.fillStyle="red";
						for(var i=0;i<data.length;i++)
						{
							xinlv.beginPath();
							xinlv.arc(data[i].x_pos,data[i].y_pos,1,0,Math.PI*2,false);
							xinlv.closePath();
							xinlv.lineWidth = 3;
							xinlv.strokeStyle = 'red';
							
							xinlv.fillText(data[i].des,(data[i].x_pos-10),(data[i].y_pos-10));
							xinlv.stroke();
						}
				   },"json");
				//血压
				$.post("/tiantan_emr/Data/getXueyaEventforTimeView/",{zhuyuan_id:current_zhixing_id,start_time:start_time,end_time:end_time},function(data){
						var xueya = document.getElementById('xueya');
						var xueya = xueya.getContext('2d');
						xueya.fillStyle="#f00";
						//循环data变量
						for(var i=0;i<data.length;i++)
						{	
							xueya.moveTo(data[i].x_pos,data[i].y_pos_s);
							xueya.lineTo(data[i].x_pos,data[i].y_pos_x);
							xueya.fillText(data[i].val,(data[i].x_pos-10),(data[i].y_pos_s-5));
							xueya.fillText(data[i].des,(data[i].x_pos-5),(data[i].y_pos_x+10));
			
						}
						xueya.lineWidth=1;
						xueya.strokeStyle = '#f00';
						xueya.stroke();
				},"json");
			}
			 $('.time_view_tag').live('click',function(){
					var keyword = $(this).attr('keyword');
					wenYiWen(keyword);
			})
	},"json");
	
	$(function(){
		$("#bottom_menu").scroll(function(){
			//$("#shijianzhou").animate({'top':$("#bottom_menu").scrollTop()+''},{'duration':'duration||350','queue':'false'});
			$("#shijianzhou").css("top","+"+$("#bottom_menu").scrollTop()+"px");
		});
	});
	/* 在平板上面有问题
	var scroll_x=$(".bottom_menu").scrollLeft()
	$(".bottom_menu").bind('scroll',function(){
	
		var wendang_kuangdu = parseInt($(".bottom_menu").prop('scrollWidth'))
		var zuopanyi =  parseInt($(this).scrollLeft())
		if(wendang_kuangdu-zuopanyi==$(this).width() && scroll_x!=$(this).scrollLeft())
		alert(123)

		scroll_x=$(this).scrollLeft()


	});*/
}

$('.kuadu_shijian').live('click',function(){
	var type = $(this).attr('name');
	$.post("/tiantan_emr/Data/SetKuadu/",{type:type},function(data){
		getHuaban()
	});
})


$('.shijianzhou_qiu').live('click',function(){
	if($(".bottom_menu").is(":hidden")){
		$.post("/tiantan_emr/Data/SetKuadu/",{type:'moren'},function(data){
			getHuaban()
		});
		$('.bottom_menu').show();
		$(".bottom_menu").css("height",'auto');
		}else{
		$('.bottom_menu').hide();
	}
})
 
$('.shijianzhou_pre').live('click',function(){
	$.post("/tiantan_emr/Data/getShijianzhouEndTime/",{type:'pre'},function(data){
		getHuaban(data)
	});
})
$('.shijianzhou_next').live('click',function(){
	$.post("/tiantan_emr/Data/getShijianzhouEndTime/",{type:'next'},function(data){
		getHuaban(data)
	});
	
})