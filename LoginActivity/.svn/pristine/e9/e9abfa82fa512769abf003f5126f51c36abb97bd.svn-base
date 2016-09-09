$(function(){
	$('div[tiantan="zidingyi"]').each(function(){
		var type = $(this).attr("type");
		var name = $(this).attr("name");
		name = name.replace("[]","");
		var style = $(this).attr("style");
		var checked_temp = $(this).attr("xuanzhong") || "";
		var checked = checked_temp.split("|");
		var value = $(this).attr("value");
		var qiege = value.split("|");
		var show = $(this).attr("show");
		var map = $(this).attr("map");
		if(map=="differ")
		{
			var label_name = $(this).attr("label_name").split("|");
			if(show == "all")
			{
				var html = '';
				if(type == "radio")
				{
					for(temp in qiege)
					{
						if(in_array(qiege[temp],checked))
						{
							html += '<input type="radio" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'" checked="checked"><label for="'+name+'_'+temp+'">'+label_name[temp]+'</label>';
						}
						else
						{
							html += '<input type="radio" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'"><label for="'+name+'_'+temp+'">'+label_name[temp]+'</label>';
						}
					}
				}
				else if(type == "checkbox")
				{
					if(qiege.length > 1)
					{
						name += '[]';
					}
					for(temp in qiege)
					{
						if(in_array(qiege[temp],checked))
						{
							html += '<input type="checkbox" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'" checked="checked"><label for="'+name+'_'+temp+'">'+label_name[temp]+'</label>';
						}
						else
						{
							html += '<input type="checkbox" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'"><label for="'+name+'_'+temp+'">'+label_name[temp]+'</label>';
						}
					}
				}
				$(this).html(html);
			}
			else if(show == "one")
			{
				var html = '';
				if(type == "radio")
				{
					for(temp in qiege)
					{
						if(in_array(qiege[temp],checked))
						{
							html += '<div tiantan="zidingyi" style=" float:left;'+style+'"><input type="radio" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'" checked="checked"><label for="'+name+'_'+temp+'">'+label_name[temp]+'</label></div>';
						}
						else
						{
							html += '<div tiantan="zidingyi" style=" float:left;'+style+'"><input type="radio" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'"><label for="'+name+'_'+temp+'">'+label_name[temp]+'</label></div>';
						}
					}
				}
				else if(type == "checkbox")
				{
					if(qiege.length > 1)
					{
						name += '[]';
					}
					for(temp in qiege)
					{
						if(in_array(qiege[temp],checked))
						{
							html += '<div tiantan="zidingyi" style=" float:left;'+style+'"><input type="checkbox" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'" checked="checked"><label for="'+name+'_'+temp+'">'+label_name[temp]+'</label></div>';
						}
						else
						{
							html += '<div tiantan="zidingyi" style=" float:left;'+style+'"><input type="checkbox" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'"><label for="'+name+'_'+temp+'">'+label_name[temp]+'</label></div>';
						}
					}
				}
				$(this).html(html);
			}
		}
		else
		{
			if(show == "all")
			{
				var html = '';
				if(type == "radio")
				{
					for(temp in qiege)
					{
						if(in_array(qiege[temp],checked))
						{
							html += '<input type="radio" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'" checked="checked"><label for="'+name+'_'+temp+'">'+qiege[temp]+'</label>';
						}
						else
						{
							html += '<input type="radio" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'"><label for="'+name+'_'+temp+'">'+qiege[temp]+'</label>';
						}
					}
				}
				else if(type == "checkbox")
				{
					if(qiege.length > 1)
					{
						name += '[]';
					}
					for(temp in qiege)
					{
						if(in_array(qiege[temp],checked))
						{
							html += '<input type="checkbox" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'" checked="checked"><label for="'+name+'_'+temp+'">'+qiege[temp]+'</label>';
						}
						else
						{
							html += '<input type="checkbox" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'"><label for="'+name+'_'+temp+'">'+qiege[temp]+'</label>';
						}
					}
				}
				$(this).html(html);
			}
			else if(show == "one")
			{
				var html = '';
				if(type == "radio")
				{
					for(temp in qiege)
					{
						if(in_array(qiege[temp],checked))
						{
							html += '<div tiantan="zidingyi" style=" float:left;'+style+'"><input type="radio" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'" checked="checked"><label for="'+name+'_'+temp+'">'+qiege[temp]+'</label></div>';
						}
						else
						{
							html += '<div tiantan="zidingyi" style=" float:left;'+style+'"><input type="radio" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'"><label for="'+name+'_'+temp+'">'+qiege[temp]+'</label></div>';
						}
					}
				}
				else if(type == "checkbox")
				{
					if(qiege.length > 1)
					{
						name += '[]';
					}
					for(temp in qiege)
					{
						if(in_array(qiege[temp],checked))
						{
							html += '<div tiantan="zidingyi" style=" float:left;'+style+'"><input type="checkbox" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'" checked="checked"><label for="'+name+'_'+temp+'">'+qiege[temp]+'</label></div>';
						}
						else
						{
							html += '<div tiantan="zidingyi" style=" float:left;'+style+'"><input type="checkbox" id="'+name+'_'+temp+'" name="'+name+'" value="'+qiege[temp]+'"><label for="'+name+'_'+temp+'">'+qiege[temp]+'</label></div>';
						}
					}
				}
				$(this).html(html);
			}
		}
		$(this).removeAttr("type");
		$(this).removeAttr("show");
		$(this).removeAttr("name");
		$(this).removeAttr("value");
	})
	$('div[tiantan="zidingyi"]').buttonset();
	function in_array(search,array){
		for(var i in array){
			if(array[i]==search){
				return true;
			}
		}
		return false;
	}
})