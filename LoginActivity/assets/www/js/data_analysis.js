/**************************************************
*  Created:  2011-11-23
*  Info:数据分析页面前台js代码
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author DongJie <dj7229@126.com>
*
***************************************************/
//一些全局变量：
var analysis_chart ;
var server_url = "127.0.0.1/web_emr/web_emr_V1";
var patient_id = "";
var relate_table_name = "";
var xiangmu_zhongwen_mingcheng = "";
var xiangmu_id = "";

$(document).ready(function(){
	var plot_result=[[['2009-11-12 10:00', 42],['2009-11-12 11:00', 42],['2009-11-12 12:00', 42],['2009-11-13 12:00', 42],['2009-11-15 12:00', 42],['2009-11-12 16:00', 42], ['2009-11-12 18:00', 56], ['2009-11-12 20:00', 39], ['2009-12-12 22:00', 81]]];
	analysis_chart = $.jqplot('analysis_chart', plot_result);
	$( "#start_time" ).blur();
	$( "#start_time" ).datepicker();
	$( "#start_time" ).datepicker( "option", "dateFormat", "yy-mm-dd");
	$( "#start_time" ).datepicker( "option", "showAnim", "slideDown");
	$( "#end_time" ).datepicker();
	$( "#end_time" ).datepicker( "option", "dateFormat", "yy-mm-dd");
	$( "#end_time" ).datepicker( "option", "showAnim", "slideDown");
	
	//为输入框等添加动作：
	$(".input_type").focus(function(){
		saved=false;
		$(this).css({"border":"#09F 2px solid"});
		$(this).parent().parent().removeClass();
		$(this).parent().parent().addClass("onShow");	
		return false;
	});
	$(".input_type").blur(function(){
		$(this).css({"border":"#6F88C4 1px solid"});
		$(this).removeClass("onFocusInput");	
		$(this).parent().parent().removeClass();
		$(this).parent().parent().addClass("info_input");
		return false;
	});
	
	
	
	//添加联动菜单的数据获取事件：
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	//1.先自动获取所有第一级的内容：

	if(relate_table_name!="")
	{
		$("#xianmgu").html("<option value='"+xiangmu_id+"|"+relate_table_name+"'>"+xiangmu_zhongwen_mingcheng+"</option>");
		$.get("http://"+server_url+"/tiantan_emr/Common/DataAnalysis/getAnalysableZhibiao", {"relate_table_name":relate_table_name}, function(data){
			$("#zhibiao").html(data);
		});
	}
	else if($("#xianmgu").val()=="0|")
	{
		$.get("http://"+server_url+"/tiantan_emr/Common/DataAnalysis/getAnalysableSelection", function(data){
			$("#xianmgu").html(data);
		});
	}
	
	//2.再增加二级的动作
	$("#xianmgu").change(function(e) {
		relate_table_name = $(this).val().split("|")[1];
		$.get("http://"+server_url+"/tiantan_emr/Common/DataAnalysis/getAnalysableZhibiao", {"relate_table_name":relate_table_name}, function(data){
			$("#zhibiao").html(data);
		});
	});
	
	
	//3.点击了分析按钮后进行分析绘图:
	$("#analysis").click(function(e) {
		//首先检查参数的完整性:
		var table_name = $("#xianmgu").val().split("|")[1];
		var zhibiao_name = $("#zhibiao").val().split("|")[0];
		var zhibiao_zhongwen_name = $("#zhibiao").val().split("|")[1];
		var danwei = $("#zhibiao").val().split("|")[2];
		var start_time = $( "#start_time" ).val();
		var end_time = $( "#end_time" ).val();
		if(table_name=="")
		{
			$("#analysis_chart").addClass("table_chart_error_tips");
			$("#analysis_chart").html("请选择分析项目");
			$("#analysis_chart").fadeOut();
			$("#analysis_chart").fadeIn();
		}
		else if(zhibiao_name=="0")
		{	
			$("#analysis_chart").addClass("table_chart_error_tips");
			$("#analysis_chart").html("请选择分析的具体指标");
			$("#analysis_chart").fadeOut();
			$("#analysis_chart").fadeIn();
		}	
		else if(start_time=="")
		{	
			$("#analysis_chart").addClass("table_chart_error_tips");
			$("#analysis_chart").html("请选择分析的起始时间");
			$("#analysis_chart").fadeOut();
			$("#analysis_chart").fadeIn();
		}
		else if(end_time=="")
		{	
			$("#analysis_chart").addClass("table_chart_error_tips");
			$("#analysis_chart").html("请选择分析的截止时间");
			$("#analysis_chart").fadeOut();
			$("#analysis_chart").fadeIn();
		}
		else
		{
			var time_label = "";
			if(start_time==end_time)
			{
				time_label = start_time;
			}
			else
			{
				time_label = start_time + "至" + end_time;
			}
			var title = time_label+" "+ zhibiao_zhongwen_name +"分析图";
			//动态获取数据并绘制分析图形:
			$.get("http://"+server_url+"/tiantan_emr/Common/DataAnalysis/getAnalysisResult", {"table_name":table_name,"zhibiao_name":zhibiao_name,"patient_id":patient_id,"start_time":start_time,"end_time":end_time}, function(data){
				if(data=="false")
				{
					$("#analysis_chart").addClass("table_chart_error_tips");
					$("#analysis_chart").html("数据获取失败，请重新尝试或者联系管理员!");
					$("#analysis_chart").fadeOut();
					$("#analysis_chart").fadeIn();
				}
				else if(data=="")
				{
					$("#analysis_chart").addClass("table_chart_error_tips");
					$("#analysis_chart").html("还没有相应的检查结果");
					$("#analysis_chart").fadeOut();
					$("#analysis_chart").fadeIn();
				}
				else
				{
					$("#analysis_chart").removeClass("table_chart_error_tips");
					var plot_reslut = [[]];
					var data_table_html =
							'<tr>'+
								'<td colspan="4" class="sub_title">检查结果列表：</td>'+
							'</tr>'+
							'<tr>'+
								'<td class="info_sub_title">检查时间</td>'+
								'<td class="info_input">检查结果</td>'+
							'</tr>';
					var total_value = 0;
					var mean_value = 0;
					resluts = data.split("@");
					for(i=0;i<resluts.length;i++)
					{
						plot_temp = resluts[i].split("^");
						plot_reslut[0].push([plot_temp[0],parseFloat(plot_temp[1])]);
						data_table_html +=
							'<tr>'+
								'<td class="info_sub_title">'+plot_temp[0]+'</td>'+
								'<td class="info_input">'+plot_temp[1]+danwei+'</td>'+
							'</tr>';
						total_value	+= parseFloat(plot_temp[1]);
					}
					mean_value = Math.round(total_value/(resluts.length)* 100)/100;
					//计算标准差
					total_temp = 0;
					for(i=0;i<resluts.length;i++)
					{
						plot_temp = resluts[i].split("^");
						plot_reslut[0].push([plot_temp[0],parseFloat(plot_temp[1])]);
						total_temp += (parseFloat(plot_temp[1])-mean_value)*(parseFloat(plot_temp[1])-mean_value);
					}
					standard_deviation = Math.sqrt(total_temp/(resluts.length-1));
					var data_html =
							'<tr>'+
								'<td width="30%" class="info_sub_title" >分析项目</td>'+
								'<td width="70%" class="info_input">分析结果</td>'+
							'</tr>'+
							'<tr>'+
								'<td colspan="2" class="sub_title">统计分析结果：</td>'+
							'</tr>'+
							'<tr>'+
								'<td class="info_sub_title">平均值：</td>'+
								'<td class="info_input">'+mean_value+danwei+'</td>'+
							'</tr>'+
							'<tr>'+
								'<td class="info_sub_title">平均值标准差：</td>'+
								'<td class="info_input">'+standard_deviation+danwei+'</td>'+
							'</tr>';
					data_html+= data_table_html;		
					plot_chart(plot_reslut,title,danwei);
					refreshDataTable(data_html);
				}
			});
		}
	});
});//end of $(document).ready(function(){


//***************************************************************************************************************
//更新绘制分析图函数
//传入参数
//plot_result 绘制数据
//title 绘制图形标题
//tick_unit 绘制图形单位
function plot_chart(plot_result,title_name,tick_unit)
{
	//先清空之前的绘图
	analysis_chart.destroy();
	//初始化表单绘制的测试数据等					     
	analysis_chart = $.jqplot('analysis_chart', plot_result, {
				animate: true,
				title: title_name, 
				axesDefaults:{
					tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
					tickOptions: {
							angle:10,
							fontFamily:"Arial",
							fontSize: '10pt'
						}
					},
				seriesDefaults:{
					showMarker:true,
					pointLabels: { show:true }
					},
				axes:{
					 xaxis:{
						 	renderer: $.jqplot.DateAxisRenderer ,
							tickOptions:{formatString:'%y-%m-%d %H:%M'},
							min : plot_result[0][0][0],
							max : plot_result[0][plot_result[0].length-1][0]
					 },
					 yaxis:{          
							label:'('+tick_unit+')',                   
							labelOptions: {            
								fontFamily: 'Georgia, Serif',            
								fontSize: '10pt'          
								}	
							}
					},      
				highlighter: {        
					show: true,        
					sizeAdjust: 7.5,
					tooltipLocation : 'n'
					},      
				cursor: {        
					show: true      
					}  
			});
}//end of function plot_chart(plot_result,title,tick_unit)


//***************************************************************************************************************
//刷新表格数据
//传入参数
//data_html:表格中显示的数据
function refreshDataTable(data_html)
{
	test = "sa";
	$("#data_table").html(data_html);
}//end of 