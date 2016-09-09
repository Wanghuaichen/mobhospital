$(document).ready(function(){
	$('.shurukuang2').live('click',function(){
		$('.shurukuang').attr("class",'shurukuang2');
		$(this).attr('class','shurukuang');
	})
	$('.leibie_del').live('click',function(){
		$(this).parent().remove();
	})
	$("#fuwei").live('click',function(){
		if($('.tizheng_list tr:last td:last').text()=='' && $('.tizheng_list tr:last td:first').text()!='')
		{
			$('.jianpan_top').html('<tr><td>35.</td><td>36.</td><td>37.</td><td>38.</td><td>39.</td><td>40.</td></tr>');
			$('.tizheng_list tr:last').remove();
			$('.tizheng_class ul').html("<li>体温</li><li>脉搏</li><li>呼吸</li><li>血压</li><li>操作</li><li>血氧</li><li>出量</li><li>入量</li><li>大便次数</li><li>身高</li><li>体重</li><li>过敏药物</li><li>意识</li><li>瞳孔大小</li>");
		}
		else
		{
			$('.tizheng_class ul').html("<li>体温</li><li>脉搏</li><li>呼吸</li><li>血压</li><li>操作</li><li>血氧</li><li>出量</li><li>入量</li><li>大便次数</li><li>身高</li><li>体重</li><li>过敏药物</li><li>意识</li><li>瞳孔大小</li>");
		}
		$('.tizheng_class2 ul').html("");
	})
	$(".tizheng_class ul li").live('vmousedown',function(){
		var myDate = new Date();
		myDate.getFullYear();
		myDate.getMonth();
		myDate.getDate();
		myDate.getHours();
		myDate.getMinutes();
		myDate.getSeconds();
		var nowdate = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes();
		var dataarr = new Array();
		var data = $(this).text();
		var li_class = $(this).attr("class");
		if(data == '体温')
		{
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="42"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="体温">体温</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="tiwen">腋温</li><li class="tiwen">口温</li><li class="tiwen">肛温</li><li class="tiwen">复查</li><li class="tiwen">降温30分钟后测量</li>');
			$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div><div class="danwei"> ℃</div></li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="腋温">腋温');
			$(".tiwen").unbind().bind('vmousedown',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
			})
		}
		else if(data == '脉搏'&&li_class != "maibo")
		{
			$('.jianpan_top').html('<tr><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td></tr>');
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="43"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="脉搏">脉搏</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="maibo">脉搏</li><li class="maibo_duanchu">短绌脉</li><li class="maibo_xinlv">心率</li>');
			$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div><div class="danwei"> 次/分钟</div></li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="脉搏">脉搏');
			
			$(".maibo_duanchu").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
				$('.tizheng_class2 ul').html('<li class="input_data"><div style="height:26px;line-height:26px;float:left;" class="danwei"></div><div class="shurukuang" style="float:left"></div><div class="danwei"  style="float:left">/</div><div style="height:26px;line-height:26px;float:left;" class="danwei" style="float:left"></div><div class="shurukuang2" style="float:left"></div><div class="danwei" style="float:left"> 次</div></li>');
			});
			$(".maibo_xinlv").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
				$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div><div class="danwei"> 次/分钟</div></li>');
			});
			$(".maibo").unbind().bind('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
				$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div><div class="danwei"> 次/分钟</div></li>');
			});
		}
		else if(data == '呼吸')
		{
			$('.jianpan_top').html('<tr><td>20</td><td>22</td><td>24</td><td>26</td><td>30</td><td>40</td></tr>');
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="44"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="呼吸">呼吸</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="huxi">自主呼吸</li><li class="huxiji">使用呼吸机</li>');
			$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div><div class="danwei"> 次/分钟</div></li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="自主呼吸">自主呼吸');
			$(".huxiji").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
			});
			$(".huxi").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="自主呼吸">自主呼吸');
			});
			
		}
		else if(data == '血压')
		{
			$('.jianpan_top').html('<tr><td>80</td><td>90</td><td>100</td><td>110</td><td>120</td><td>130</td></tr>');
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="45"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="血压">血压</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="xueya_shoushu">收缩压/舒张压</li><li class="xueya">单收缩压</li><li class="xueya">单舒张压</li>');
			$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div>/<div class="shurukuang2"></div><div class="danwei"> mmHg</div></li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="收缩/舒张压">收缩/舒张压');
			$(".xueya").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
				$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div><div class="danwei"> mmHg</div></li>');
			});
			$(".xueya_shoushu").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
				$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div>/<div class="shurukuang2"></div><div class="danwei"> mmHg</div></li>');
			});
		}
		else if(data == '操作')
		{
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="-1"><input name="tongji_item_name[]" type="hidden" value=""><input name="jiancha_type[]" type="hidden" value="操作">操作</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="caozuo">请假</li><li class="caozuo">返回</li>');
			$(".caozuo").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
				$('.tizheng_list tr:last td:eq(2)').html($(this).text());
			})
		}
		else if(data == '血氧')
		{
			$('.jianpan_top').html('<tr><td>100</td><td>99</td><td>98</td><td>97</td><td>96</td><td>95</td></tr>');
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="46"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="血氧">血氧</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="xueyang">常规</li>');
			$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div><div class="danwei"> %</div></li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="常规">常规');
			$(".xueyang").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
			})
		}
		else if(data == '出量')
		{
			$('.jianpan_top').html('<tr><td>800</td><td>1000</td><td>1500</td><td>2000</td><td>2500</td><td>3000</td></tr>');
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="47"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="出量">出量</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="chuliang">尿量</li><li class="chuliang">其它</li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="尿量">尿量');
			$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div><div class="danwei"> ml</div></li>');
			$(".chuliang").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
			})
		}
		else if(data == '入量')
		{
			$('.jianpan_top').html('<tr><td>200</td><td>500</td><td>800</td><td>1000</td><td>1500</td><td>2000</td></tr>');
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="48"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="入量">入量</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="ruliang">输液</li><li class="ruliang">口服</li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="输液">输液');
			$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div><div class="danwei"> ml</div></li>');
			$(".ruliang").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
			})
		}
		else if(data == '大便次数')
		{
			$('.jianpan_top').html('<tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>');
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="54"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="大便次数">大便次数</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="dabiancishu">自行排便</li><li class="dabiancishu">灌肠后排便</li><li class="dabiancishu">大便失禁</li><li class="dabiancishu">人工肛门</li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="自行排便">自行排便');
			$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div><div class="danwei"> 次</div></li>');
			$(".dabiancishu").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
			})
		}
		else if(data == '身高')
		{
			$('.jianpan_top').html('<tr><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td></tr>');
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="49"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="身高">身高</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="shengao">常规</li><li class="shengao">卧床</li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="常规">常规');
			$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang"></div><div class="danwei"> cm</div></li>');
			$(".shengao").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
			})
		}
		else if(data == '体重')
		{
			$('.jianpan_top').html('<tr><td>4</td><td>5</td><td>6</td><7></td><td>8</td><td>9</td></tr>');
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="50"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="体重">体重</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="tizhong_changgui">常规</li><li class="tizhong_wochuang">卧床</li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="常规">常规');
			$('.tizheng_class2 ul').html('<li class="input_data"><div class="shurukuang">'+tizhong_changgui+'</div><div class="danwei"> kg</div></li>');
			$(".tizhong_changgui").live('click',function(){
				$('.shurukuang').html(tizhong_changgui);
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
			});
			$(".tizhong_wochuang").live('click',function(){
				$('.shurukuang').html(tizhong_wochuang);
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
			});
		}
		else if(data == '过敏药物')
		{
			$('.jianpan_top').html('<tr><td>青霉素</td><td>磺胺类</td><td>头孢类</td><td>阿司匹林</td><td>茶碱类</td></tr>');
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="51"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="过敏药物">过敏药物</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="guominyaowu">阳性</li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="阳性">阳性');
			$('.tizheng_class2 ul').html('<li class="input_data" style="width:50%;"><div class="shurukuang" contenteditable="true" style="width:100%;"></div></li>');
			$(".guominyaowu").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
			})
		}
		else if(data == '意识')
		{
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="52"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="意识">意识</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="yishi">清醒</li><li class="yishi">模糊</li><li class="yishi">谵妄</li><li class="yishi">嗜睡</li><li class="yishi">昏睡</li><li class="yishi">潜昏迷</li><li class="yishi">中昏迷</li><li class="yishi">深昏迷</li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="清醒">清醒');
			$('.tizheng_list tr:last td:eq(2)').html('清醒');
			$(".yishi").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
				$('.tizheng_list tr:last td:eq(2)').html($(this).text());
			})
		}
		else if(data == '瞳孔大小')
		{
			$('.jianpan_top').html('<tr><td>1.</td><td>2.</td><td>3.</td><td>4.</td><td>5.</td><td>6.</td></tr>');
			$('.tizheng_list').append('<tr><td><input name="jiancha_type_id[]" type="hidden" value="53"><input name="tongji_item_name[]" type="hidden" value="体征"><input name="jiancha_type[]" type="hidden" value="瞳孔大小">瞳孔大小</td><td></td><td></td><td class="leibie_del"></td></tr>');
			$('.tizheng_class ul').html('<li class="tongkongdaxiao">常规</li>');
			$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="常规">常规');
			$('.tizheng_class2 ul').html('<li class="input_data">左<div class="shurukuang"></div>/右<div class="shurukuang2"></div><div class="danwei"> mm</div></li>');
			$(".tongkongdaxiao").live('click',function(){
				$('.tizheng_list tr:last td:eq(1)').html('<input name="jiancha_fangshi[]" type="hidden" value="'+$(this).text()+'">' + $(this).text());
			})
		}
	})
	$("#tizheng_add").live('click',function(){
		var type_data = $('.tizheng_list tr:last td:eq(0)').text();
		var type_data_value = $('.shurukuang').text();
		if(type_data == '体温')
		{
			if (type_data_value<35 || type_data_value>43 || type_data_value=='')
				alert ('超出范围值');
			else
				tianjia();
		}
		else if(type_data == '脉搏')
		{
			if (type_data_value<0 || type_data_value>180 || type_data_value=='')
				alert ('超出范围值');
			else
				tianjia();
		}
		else if(type_data == '呼吸')
		{
			if($('.tizheng_list tr:last td:eq(2)').text() == '使用呼吸机')
				tianjia();
			else
			{
				if (type_data_value<0 || type_data_value>40 || type_data_value=='')
					alert ('超出范围值');
				else
					tianjia();
			}
			
		}
		else if(type_data == '血压')
		{
			if($('.tizheng_list tr:last td:eq(2)').text()=='收缩压/舒张压')
			{
				var type_data_value2 = $('.shurukuang2').text();
				if (type_data_value<0 || type_data_value>300 || type_data_value=='')
					alert ('超出范围值');
				else if (type_data_value2<0 || type_data_value2>300 || type_data_value2=='')
					alert ('超出范围值');
				else
					tianjia();
			}
			else
			{
				if (type_data_value<0 || type_data_value>300 || type_data_value=='')
					alert ('超出范围值');
				else
					tianjia();
			}
			
		}
		else if(type_data == '血氧')
		{
			if (type_data_value<80 || type_data_value>100 || type_data_value=='')
				alert ('超出范围值');
			else
				tianjia();
		}
		else if(type_data == '出量' || type_data == '入量')
		{
			if (type_data_value<1 || type_data_value>10000 || type_data_value=='')
				alert ('超出范围值');
			else
				tianjia();
		}
		else if(type_data == '大便次数')
		{
			if (type_data_value<0 || type_data_value>100 || type_data_value=='')
				alert ('超出范围值');
			else
				tianjia();
		}
		else if(type_data == '身高')
		{
			if (type_data_value<0 || type_data_value>280 || type_data_value=='')
				alert ('超出范围值');
			else
				tianjia();
		}
		else if(type_data == '体重')
		{
			if (type_data_value<0 || type_data_value>500 || type_data_value=='')
				alert ('超出范围值');
			else
				tianjia();
		}
		else if(type_data == '过敏药物')
		{
			if(type_data_value=='')
				alert ('值不能为空');
			else
				tianjia();
		}
		else if(type_data == '瞳孔大小')
		{

			var type_data_value2 = $('.shurukuang2').text();
			if (type_data_value<0 || type_data_value=='')
				alert ('超出范围值');
			else if (type_data_value2<0  || type_data_value2=='')
				alert ('超出范围值');
			else
				tianjia();
		}
		else
			tianjia();
	})
	$(".jianpan_top td").live('vmousedown',function(){
			$(".shurukuang").html($(this).text());
		})

	$(".jianpan_main td").live('vmousedown',function(){
		if($(this).attr("id")=='del')
		{
			var str = $(".shurukuang").html();
			$(".shurukuang").html(str.substring(0,str.length-1));
		}
		else
		{
			if(($(this).attr("id")!='tizheng_add') && ($(this).attr("id")!='tizheng_shangchuan') && ($(this).attr("id")!='fuwei'))
			{
				$(".shurukuang").append($(this).html());
			}
		}
	})
});

function tianjia()
{
	$('.jianpan_top').html('<tr><td>35.</td><td>36.</td><td>37.</td><td>38.</td><td>39.</td><td>40.</td></tr>');
	$('.tizheng_list tr:last td:eq(2)').append('<input name="jiancha_value[]" type="hidden" value="'+$('.input_data').text()+'">'+$('.input_data').text());
	$('.tizheng_list tr:last td:last').html('删除');
	$('.tizheng_class ul').html("<li>体温</li><li>脉搏</li><li>呼吸</li><li>血压</li><li>操作</li><li>血氧</li><li>出量</li><li>入量</li><li>大便次数</li><li>身高</li><li>体重</li><li>过敏药物</li><li>意识</li><li>瞳孔大小</li>");
	$('.tizheng_class2 ul').html("");
}

