var validate_value=false;
var claculate_value = Array();
var unit_value = Array();
$(document).ready(function(){
	unit_data = $("[class='unit_selector'][checked]").val();
	unit_data=unit_data.split("@");
	unit_label = unit_data[0].split("^");
	unit_value = unit_data[1].split("^");
	count_label = 0;
	count_value = 0;
	$("[class='unit']").each(function(){
		$(this).html(unit_label[count_label]);
		count_label++;
	}); 
	$("[name='calculater']").each(function(){
		$(this).attr("unit_value",unit_value[count_value]);
		count_value++;
	});
		
	$("[reg]").keyup(function(){
		validate_value = validate($(this));
		calculate();
	});
	$("[reg]").blur(function(){
		validate_value = validate($(this));
		calculate();
	});
   
	$("[name='unit_selector']").click(function(){								
		unit_data = $(this).val();
		unit_data=unit_data.split("@");
		unit_label = unit_data[0].split("^");
		unit_value = unit_data[1].split("^");
		count_label = 0;
		count_value = 0;
		$("[class='unit']").each(function(){
			$(this).html(unit_label[count_label]);
			count_label++;
		}); 
		$("[name='calculater']").each(function(){
			$(this).attr("unit_value",unit_value[count_value]);
			count_value++;
		});
		calculate();
	}); 
	
	$("[name='reslut_1']").click(function(){
		calculate();
	});

})  
  
function calculate()
{
	var result_1  = $("[name='result_1']");
	var result_tip1 = result_1.parent().find("[name='calculate_tips']");
	result_tip1.removeClass();
	result_1.removeClass();
	if(validate_value){
		count_value = 0;
		$("[name='calculater']").each(function(){
			claculate_value[count_value] = parseFloat($(this).attr("unit_value"))*parseFloat($(this).val());
			count_value++;
		});
		var result_1_value= calculate_detail()
		if(isNaN(result_1_value))
		{
			result_1.val("");
			result_tip1.html("请输入正确的计算数值");
			result_tip1.addClass("on_error");
		}
		else
		{
			result_1.val(result_1_value);
			result_tip1.html("计算完毕");
			result_tip1.addClass("calculate_tip_normal");
		}		
	}
	else{
		result_1.val("");
		result_tip1.html("请输入正确的计算数值");
		result_tip1.addClass("on_error");
		result_1.addClass("result_right");
	}
}
  
function validate(obj){
	var reg = new RegExp(obj.attr("reg"));
	var obj_value = obj.attr("value");
	var obj_unit = parseFloat(obj.attr("unit_value"));
	var tip_Obj = obj.parent().find("[name='calculate_tips']");
	var obj_tip = obj.attr("tips");
	tip_Obj.removeClass();
	
	if(obj_value==""){
		tip_Obj.html("此项不能为空，可填写0");
		tip_Obj.addClass("on_error");
		return false;
	}
	
	if(!reg.test(obj_value)){
		tip_Obj.addClass("on_error");
		tip_Obj.html(obj_tip);
		return false;
	}
	else{
		tip_Obj.addClass("calculate_tip_normal");
		tip_Obj.html("输入正确");
		return true;
	}
} 