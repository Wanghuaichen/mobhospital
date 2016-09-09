$(function(){
	/* *************common************/

	// 扫码后自动聚焦
	$("#opensaoma").click(function(){
		setTimeout(function(){
			$("input[name='zhuyuan_id']").focus();
		},200);
	});

	// 扫码后跳转
	$("#saoma_zhuyuan_id").live("input",function(){
		// 去除空白符
		$(this).val($(this).val().replace(new RegExp(" ","gmi"),""));
	   $('form[name="search_number"]').submit();
	});

	// 扫码表单验证
	$('form[name="search_number"]').submit(function(e){
		var zhuyuan_id = $("#saoma_zhuyuan_id").val();
		var huanzhe = "";
		if(zhuyuan_id == "")
		{
		  $("#saoma_tishi").html("请填写住院号");
		  return false;
		}
		else
		{
			$.ajaxSetup({
				async: false
			});
			$.get("/tiantan_emr/Common/Data/huanzheZhuyuanhaoIsNull", { zhuyuan_id: zhuyuan_id },function(data){
				if(data == "no")
				{
					$("#saoma_tishi").html("这个患者不存在");
					huanzhe = "no";
				}
			});
		};
		if(huanzhe == "no")
		{
			return false;
		}
	});

	//右侧点击加载更多患者
	$(".huanzhe_list_right_gengduo").live("click",function(){
		var type = $(this).attr("type");
		var temp_page = $(this).attr("page");
		$.get("/tiantan_emr/Mobile/Patient/showRightPatientListMore", {type:type, page: temp_page },function(data){
			if(data != "")
			{
				$("#huanzhe_list_right_content").append(data);
				var next_page = parseFloat(temp_page) + parseFloat(1);
				$(".huanzhe_list_right_gengduo").attr("page",next_page)
			}
			else
			{
				$(".huanzhe_list_right_gengduo").html("已经没有啦");
			}
	  });
	});

});

// 获取当前日期
function getCurrentDate()
{
	var myDate = new Date();
    var m = myDate.getMonth()+1;
    var d = myDate.getDate();
    var h = myDate.getHours();
    var m2 = myDate.getMinutes();
    if(m<10)
    {
        m = "0"+m;
    }
    if(d<10)
    {
        d = "0"+d;
    }
    if(h<10)
    {
        h = "0"+h;
    }
    if(m2<10)
    {
        m2 = "0"+m2;
    }
    // var nowdate = myDate.getFullYear()+'-'+m+'-'+d+' '+h+':'+m2;
    var nowdate = myDate.getFullYear()+'-'+m+'-'+d;
    return nowdate;
}

// 获取当前日期时间
function getCurrentDateTime()
{
	var myDate = new Date();
    var m = myDate.getMonth()+1;
    var d = myDate.getDate();
    var h = myDate.getHours();
    var m2 = myDate.getMinutes();
    if(m<10)
    {
        m = "0"+m;
    }
    if(d<10)
    {
        d = "0"+d;
    }
    if(h<10)
    {
        h = "0"+h;
    }
    if(m2<10)
    {
        m2 = "0"+m2;
    }
    var nowdate = myDate.getFullYear()+'-'+m+'-'+d+' '+h+':'+m2;
    // var nowdate = myDate.getFullYear()+'-'+m+'-'+d;
    return nowdate;
}