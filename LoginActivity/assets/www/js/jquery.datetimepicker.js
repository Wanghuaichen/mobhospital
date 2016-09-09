/**
 * @原创作者 郭瑾
 * @改进作者 tiantanhehe
 * @版本 jquery.datetimepicker.js(version="1.1.0")
 */

	var begin_pos = new Array(0,5,8,11,14);
	var end_pos = new Array(4,7,10,13,16);
	var time = new Array();
	var input_key_number = new Array(0,0,0,0,0);
	var pos_index = 0;
	var temp_key = 0;
	$("[action_type='datetime']").live('focus',function(){
		time[0] = $(this).val().substring(0, 4);
		time[1] = $(this).val().substring(5, 7);
		time[2] = $(this).val().substring(8, 10);
		time[3] = $(this).val().substring(11, 13);
		time[4] = $(this).val().substring(14, 16);
	});
	$("[action_type='datetime']").live('click',function(){
		var textNode=document.getElementById($(this).attr("id"));
		time[0] = $(this).val().substring(0, 4);
		time[1] = $(this).val().substring(5, 7);
		time[2] = $(this).val().substring(8, 10);
		time[3] = $(this).val().substring(11, 13);
		time[4] = $(this).val().substring(14, 16);
		input_key_number[0] = 0;
		input_key_number[1] = 0;
		input_key_number[2] = 0;
		input_key_number[3] = 0;
		input_key_number[4] = 0;
		if(textNode.createTextRange)
		{
			var range = textNode.createTextRange();
			var s=document.selection.createRange();
			s.setEndPoint("StartToStart",range);
			if(s.text.length<=5)
			{
				range.moveEnd("character",-12);
				range.moveStart("character", 0);
				range.select();
				pos_index = 0;
			}
			else if(s.text.length<=8)
			{
				range.moveEnd("character",-9);
				range.moveStart("character", 5);
				range.select();
				pos_index = 1;
			}
			else if(s.text.length<=11)
			{
				range.moveEnd("character",-6);
				range.moveStart("character", 8);
				range.select();
				pos_index = 2;
			}
			else if(s.text.length<=14)
			{
				range.moveEnd("character",-3);
				range.moveStart("character", 11);
				range.select();
				pos_index = 3;
			}
			else if(s.text.length<=16)
			{
				range.moveEnd("character",0);
				range.moveStart("character", 14);
				range.select();
				pos_index = 4;
			}
		}
		else
		{
			if(textNode.selectionStart<=5)
			{
				textNode.setSelectionRange(0, 4);
				textNode.focus();
				pos_index = 0;
			}
			else if(textNode.selectionStart<=8)
			{
				textNode.setSelectionRange(5, 7);
				textNode.focus();
				pos_index = 1;
			}
			else if(textNode.selectionStart<=11)
			{
				textNode.setSelectionRange(8, 10);
				textNode.focus();
				pos_index = 2;
			}
			else if(textNode.selectionStart<=14)
			{
				textNode.setSelectionRange(11, 13);
				textNode.focus();
				pos_index = 3;
			}
			else if(textNode.selectionStart<=16)
			{
				textNode.setSelectionRange(14, 16);
				textNode.focus();
				pos_index = 4;
			}
		}
		return false;
	});
	$("[action_type='datetime']").live('keydown',function(){
		var key_type;
		var range;
		var content;
		var textNode=document.getElementById($(this).attr("id"));
		if(textNode.createTextRange)
		{
			key_type = event.keyCode;
			range = textNode.createTextRange();
			content = document.selection.createRange();
			if(content.text.indexOf("-")!=-1 || content.text.indexOf(":")!=-1 || content.text.indexOf(" ")!=-1)
			{
				range.moveEnd("character",-12);
				range.moveStart("character", 0);
				range.select();
				return false;
			}
		}
		else
		{
			key_type = event.which;
			content = window.getSelection();
			if(content.toString().indexOf("-")!=-1 || content.toString().indexOf(":")!=-1 || content.toString().indexOf(" ")!=-1)
			{
				textNode.setSelectionRange(0, 4);
				textNode.focus();
				return false;
			}
		}
		if(key_type>=96 && key_type<=105)
		{
			key_type = key_type - 48;
		}
		if(key_type>=48 && key_type<=57)
		{
			if(pos_index==0)
			{
				if(input_key_number[0]>=4)
				{
					return false;
				}
				else if(input_key_number[0]==0)
				{
					if(key_type>=49 && key_type<=50)
					{
						input_key_number[0]++;
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					input_key_number[0]++;
					return true;
				}
			}
			else if(pos_index==1)
			{
				if(input_key_number[1]>=2)
				{
					return false;
				}
				else if(input_key_number[1]==0)
				{
					temp_key = key_type;
					input_key_number[1]++;
					return true;
				}
				else if(input_key_number[1]==1)
				{
					if(temp_key==48 && key_type!=48)
					{
						input_key_number[1]++;
						return true;
					}
					else if(temp_key==49 && key_type>=48 && key_type<=50)
					{
						input_key_number[1]++;
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					input_key_number[1]++;
					return true;
				}
			}
			else if(pos_index==2)
			{
				var day_number = getDateNumber(time[0],time[1]);
				var first_key_limit = parseInt(day_number.toString().substring(0,1))+48;
				var second_key_limit = parseInt(day_number.toString().substring(1,2))+48;
				if(input_key_number[2]>=2)
				{
					return false;
				}
				else if(input_key_number[2]==0)
				{
					temp_key = key_type;
					input_key_number[2]++;
					return true;
				}
				else if(input_key_number[2]==1)
				{
					if(temp_key==48 && key_type!=48)
					{
						input_key_number[2]++;
						return true;
					}
					else if(temp_key<first_key_limit)
					{
						input_key_number[2]++;
						return true;
					}
					else if(temp_key==first_key_limit && key_type>=48 && key_type<=second_key_limit)
					{
						input_key_number[2]++;
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					input_key_number[2]++;
					return true;
				}
			}
			else if(pos_index==3)
			{
				if(input_key_number[3]>=2)
				{
					return false;
				}
				else if(input_key_number[3]==0)
				{
					temp_key = key_type;
					input_key_number[3]++;
					return true;
				}
				else if(input_key_number[3]==1)
				{
					if(temp_key<=49)
					{
						input_key_number[3]++;
						return true;
					}
					else if(temp_key==50 && key_type>=48 && key_type<=51)
					{
						input_key_number[3]++;
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					input_key_number[3]++;
					return true;
				}
			}
			else if(pos_index==4)
			{
				if(input_key_number[4]>=2)
				{
					return false;
				}
				else if(input_key_number[4]==0)
				{
					temp_key = key_type;
					input_key_number[4]++;
					return true;
				}
				else if(input_key_number[4]==1)
				{
					if(temp_key<=53)
					{
						input_key_number[4]++;
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					input_key_number[4]++;
					return true;
				}
			}
			else
			{
				return false;
			}
		}
		else if(key_type==37)
		{
			if(pos_index==0 && input_key_number[0]<4 && input_key_number[0]>0)
			{
				time[0] = $(this).val().substring(0, input_key_number[0]);
				var temp_time = parseInt(time[0],10);
				temp_time = temp_time+2000;
				time[0] = temp_time.toString();
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==1 && input_key_number[1]==1)
			{
				time[1] = $(this).val().substring(5, 5+input_key_number[1]);
				time[1] = "0"+time[1];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==2 && input_key_number[2]==1)
			{
				time[2] = $(this).val().substring(8, 8+input_key_number[2]);
				time[2] = "0"+time[2];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==3 && input_key_number[3]==1)
			{
				time[3] = $(this).val().substring(11, 11+input_key_number[3]);
				time[3] = "0"+time[3];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==4 && input_key_number[4]==1)
			{
				time[4] = $(this).val().substring(14, 14+input_key_number[4]);
				time[4] = "0"+time[4];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			time[0] = $(this).val().substring(0, 4);
			time[1] = $(this).val().substring(5, 7);
			time[2] = $(this).val().substring(8, 10);
			time[3] = $(this).val().substring(11, 13);
			time[4] = $(this).val().substring(14, 16);
			input_key_number[0] = 0;
			input_key_number[1] = 0;
			input_key_number[2] = 0;
			input_key_number[3] = 0;
			input_key_number[4] = 0;
			pos_index--;
			if(pos_index<0)
			{
				pos_index = pos_index+5;
			}
			pos_index = pos_index%5;
			if(textNode.createTextRange)
			{
				range.moveEnd("character",end_pos[pos_index]-16);
				range.moveStart("character", begin_pos[pos_index]);
				range.select();
			}
			else
			{
				textNode.setSelectionRange(begin_pos[pos_index], end_pos[pos_index]);
				textNode.focus();
			}
			return false;
		}
		else if(key_type==39)
		{
			if(pos_index==0 && input_key_number[0]<4 && input_key_number[0]>0)
			{
				time[0] = $(this).val().substring(0, input_key_number[0]);
				var temp_time = parseInt(time[0],10);
				temp_time = temp_time+2000;
				time[0] = temp_time.toString();
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==1 && input_key_number[1]==1)
			{
				time[1] = $(this).val().substring(5, 5+input_key_number[1]);
				time[1] = "0"+time[1];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==2 && input_key_number[2]==1)
			{
				time[2] = $(this).val().substring(8, 8+input_key_number[2]);
				time[2] = "0"+time[2];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==3 && input_key_number[3]==1)
			{
				time[3] = $(this).val().substring(11, 11+input_key_number[3]);
				time[3] = "0"+time[3];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==4 && input_key_number[4]==1)
			{
				time[4] = $(this).val().substring(14, 14+input_key_number[4]);
				time[4] = "0"+time[4];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			time[0] = $(this).val().substring(0, 4);
			time[1] = $(this).val().substring(5, 7);
			time[2] = $(this).val().substring(8, 10);
			time[3] = $(this).val().substring(11, 13);
			time[4] = $(this).val().substring(14, 16);
			input_key_number[0] = 0;
			input_key_number[1] = 0;
			input_key_number[2] = 0;
			input_key_number[3] = 0;
			input_key_number[4] = 0;
			pos_index++;
			pos_index = pos_index%5;
			if(textNode.createTextRange)
			{
				range.moveEnd("character",end_pos[pos_index]-16);
				range.moveStart("character", begin_pos[pos_index]);
				range.select();
			}
			else
			{
				textNode.setSelectionRange(begin_pos[pos_index], end_pos[pos_index]);
				textNode.focus();
			}
			return false;
		}
		else if(key_type==38)
		{
			var temp_time;
			if(pos_index==0)
			{
				temp_time = parseInt(time[0],10);
				temp_time++;
				temp_time = temp_time%3000;
				if(temp_time==0)
				{
					temp_time = 1000;
					time[0] = temp_time.toString();
				}
				else
				{
					time[0] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==1)
			{
				temp_time = parseInt(time[1],10);
				temp_time++;
				temp_time = temp_time%13;
				if(temp_time==0)
				{
					temp_time=1;
					time[1] = "0"+temp_time.toString();
				}
				else if(temp_time<10)
				{
					time[1] = "0"+temp_time.toString();
				}
				else
				{
					time[1] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==2)
			{
				var day_number = getDateNumber(time[0],time[1]);
				temp_time = parseInt(time[2],10);
				temp_time++;
				temp_time = temp_time%(day_number+1);
				if(temp_time==0)
				{
					temp_time=1;
					time[2] = "0"+temp_time.toString();
				}
				else if(temp_time<10)
				{
					time[2] = "0"+temp_time.toString();
				}
				else
				{
					time[2] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==3)
			{
				temp_time = parseInt(time[3],10);
				temp_time++;
				temp_time = temp_time%24;
				if(temp_time<10)
				{
					time[3] = "0"+temp_time.toString();
				}
				else
				{
					time[3] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==4)
			{
				temp_time = parseInt(time[4],10);
				temp_time++;
				temp_time = temp_time%60;
				if(temp_time<10)
				{
					time[4] = "0"+temp_time.toString();
				}
				else
				{
					time[4] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			if(textNode.createTextRange)
			{
				range.moveEnd("character",end_pos[pos_index]-16);
				range.moveStart("character", begin_pos[pos_index]);
				range.select();
			}
			else
			{
				textNode.setSelectionRange(begin_pos[pos_index], end_pos[pos_index]);
				textNode.focus();
			}
			return false;
		}
		else if(key_type==40)
		{
			var temp_time;
			if(pos_index==0)
			{
				temp_time = parseInt(time[0],10);
				temp_time--;
				temp_time = temp_time%3000;
				if(temp_time<1000)
				{
					temp_time = temp_time+2000;
					time[0] = temp_time.toString();
				}
				else
				{
					time[0] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==1)
			{
				temp_time = parseInt(time[1],10);
				temp_time--;
				temp_time = temp_time%13;
				if(temp_time<=0)
				{
					temp_time = temp_time+12;
					time[1] = temp_time.toString();
				}
				else if(temp_time<10)
				{
					time[1] = "0"+temp_time.toString();
				}
				else
				{
					time[1] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==2)
			{
				var day_number = getDateNumber(time[0],time[1]);
				temp_time = parseInt(time[2],10);
				temp_time--;
				temp_time = temp_time%(day_number+1);
				if(temp_time<=0)
				{
					temp_time = temp_time+day_number;
					time[2] = temp_time.toString();
				}
				else if(temp_time<10)
				{
					time[2] = "0"+temp_time.toString();
				}
				else
				{
					time[2] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==3)
			{
				temp_time = parseInt(time[3],10);
				temp_time--;
				temp_time = temp_time%24;
				if(temp_time<0)
				{
					temp_time = temp_time+24;
					time[3] = temp_time.toString();
				}
				else if(temp_time<10)
				{
					time[3] = "0"+temp_time.toString();
				}
				else
				{
					time[3] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			else if(pos_index==4)
			{
				temp_time = parseInt(time[4],10);
				temp_time--;
				temp_time = temp_time%60;
				if(temp_time<0)
				{
					temp_time = temp_time+60;
					time[4] = temp_time.toString();
				}
				else if(temp_time<10)
				{
					time[4] = "0"+temp_time.toString();
				}
				else
				{
					time[4] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]+" "+time[3]+":"+time[4]);
			}
			if(textNode.createTextRange)
			{
				range.moveEnd("character",end_pos[pos_index]-16);
				range.moveStart("character", begin_pos[pos_index]);
				range.select();
			}
			else
			{
				textNode.setSelectionRange(begin_pos[pos_index], end_pos[pos_index]);
				textNode.focus();
			}
			return false;
		}
		else
		{
			return false;
		}
	});
	$("[action_type='datetime']").live('keyup',function(){
		var textNode=document.getElementById($(this).attr("id"));
		if((pos_index==0 && input_key_number[0]==4) || (pos_index==1 && input_key_number[1]==2) || (pos_index==2 && input_key_number[2]==2) || (pos_index==3 && input_key_number[3]==2) || (pos_index==4 && input_key_number[4]==2))
		{
			pos_index++;
			pos_index = pos_index%5;
			if(textNode.createTextRange)
			{
				var range = textNode.createTextRange();
				range.moveEnd("character",end_pos[pos_index]-16);
				range.moveStart("character", begin_pos[pos_index]);
				range.select();
			}
			else
			{
				textNode.setSelectionRange(begin_pos[pos_index], end_pos[pos_index]);
				textNode.focus();
			}
			time[0] = $(this).val().substring(0, 4);
			time[1] = $(this).val().substring(5, 7);
			time[2] = $(this).val().substring(8, 10);
			time[3] = $(this).val().substring(11, 13);
			time[4] = $(this).val().substring(14, 16);
		}
	});
	$("[action_type='date']").live('focus',function(){
		time[0] = $(this).val().substring(0, 4);
		time[1] = $(this).val().substring(5, 7);
		time[2] = $(this).val().substring(8, 10);
	});
	$("[action_type='date']").live('click',function(){
		var textNode=document.getElementById($(this).attr("id"));
		time[0] = $(this).val().substring(0, 4);
		time[1] = $(this).val().substring(5, 7);
		time[2] = $(this).val().substring(8, 10);
		input_key_number[0] = 0;
		input_key_number[1] = 0;
		input_key_number[2] = 0;
		if(textNode.createTextRange)
		{
			var range = textNode.createTextRange();
			var s=document.selection.createRange();
			s.setEndPoint("StartToStart",range);
			if(s.text.length<=5)
			{
				range.moveEnd("character",-6);
				range.moveStart("character", 0);
				range.select();
				pos_index = 0;
			}
			else if(s.text.length<=8)
			{
				range.moveEnd("character",-3);
				range.moveStart("character", 5);
				range.select();
				pos_index = 1;
			}
			else if(s.text.length<=10)
			{
				range.moveEnd("character",0);
				range.moveStart("character", 8);
				range.select();
				pos_index = 2;
			}
		}
		else
		{
			if(textNode.selectionStart<=5)
			{
				textNode.setSelectionRange(0, 4);
				textNode.focus();
				pos_index = 0;
			}
			else if(textNode.selectionStart<=8)
			{
				textNode.setSelectionRange(5, 7);
				textNode.focus();
				pos_index = 1;
			}
			else if(textNode.selectionStart<=10)
			{
				textNode.setSelectionRange(8, 10);
				textNode.focus();
				pos_index = 2;
			}
		}
		return false;
	});
	$("[action_type='date']").live('keydown',function(){
		var key_type;
		var range;
		var content;
		var textNode=document.getElementById($(this).attr("id"));
		if(textNode.createTextRange)
		{
			key_type = event.keyCode;
			range = textNode.createTextRange();
			content = document.selection.createRange();
			if(content.text.indexOf("-")!=-1 || content.text.indexOf(":")!=-1 || content.text.indexOf(" ")!=-1)
			{
				range.moveEnd("character",-6);
				range.moveStart("character", 0);
				range.select();
				return false;
			}
		}
		else
		{
			key_type = event.which;
			content = window.getSelection();
			if(content.toString().indexOf("-")!=-1 || content.toString().indexOf(":")!=-1 || content.toString().indexOf(" ")!=-1)
			{
				textNode.setSelectionRange(0, 4);
				textNode.focus();
				return false;
			}
		}
		if(key_type>=96 && key_type<=105)
		{
			key_type = key_type - 48;
		}
		if(key_type>=48 && key_type<=57)
		{
			if(pos_index==0)
			{
				if(input_key_number[0]>=4)
				{
					return false;
				}
				else if(input_key_number[0]==0)
				{
					if(key_type>=49 && key_type<=50)
					{
						input_key_number[0]++;
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					input_key_number[0]++;
					return true;
				}
			}
			else if(pos_index==1)
			{
				if(input_key_number[1]>=2)
				{
					return false;
				}
				else if(input_key_number[1]==0)
				{
					temp_key = key_type;
					input_key_number[1]++;
					return true;
				}
				else if(input_key_number[1]==1)
				{
					if(temp_key==48 && key_type!=48)
					{
						input_key_number[1]++;
						return true;
					}
					else if(temp_key==49 && key_type>=48 && key_type<=50)
					{
						input_key_number[1]++;
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					input_key_number[1]++;
					return true;
				}
			}
			else if(pos_index==2)
			{
				var day_number = getDateNumber(time[0],time[1]);
				var first_key_limit = parseInt(day_number.toString().substring(0,1))+48;
				var second_key_limit = parseInt(day_number.toString().substring(1,2))+48;
				if(input_key_number[2]>=2)
				{
					return false;
				}
				else if(input_key_number[2]==0)
				{
					temp_key = key_type;
					input_key_number[2]++;
					return true;
				}
				else if(input_key_number[2]==1)
				{
					if(temp_key==48 && key_type!=48)
					{
						input_key_number[2]++;
						return true;
					}
					else if(temp_key<first_key_limit)
					{
						input_key_number[2]++;
						return true;
					}
					else if(temp_key==first_key_limit && key_type>=48 && key_type<=second_key_limit)
					{
						input_key_number[2]++;
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					input_key_number[2]++;
					return true;
				}
			}
			else
			{
				return false;
			}
		}
		else if(key_type==37)
		{
			if(pos_index==0 && input_key_number[0]<4 && input_key_number[0]>0)
			{
				time[0] = $(this).val().substring(0, input_key_number[0]);
				var temp_time = parseInt(time[0],10);
				temp_time = temp_time+2000;
				time[0] = temp_time.toString();
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			else if(pos_index==1 && input_key_number[1]==1)
			{
				time[1] = $(this).val().substring(5, 5+input_key_number[1]);
				time[1] = "0"+time[1];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			else if(pos_index==2 && input_key_number[2]==1)
			{
				time[2] = $(this).val().substring(8, 8+input_key_number[2]);
				time[2] = "0"+time[2];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			time[0] = $(this).val().substring(0, 4);
			time[1] = $(this).val().substring(5, 7);
			time[2] = $(this).val().substring(8, 10);
			input_key_number[0] = 0;
			input_key_number[1] = 0;
			input_key_number[2] = 0;
			pos_index--;
			if(pos_index<0)
			{
				pos_index = pos_index+3;
			}
			pos_index = pos_index%3;
			if(textNode.createTextRange)
			{
				range.moveEnd("character",end_pos[pos_index]-10);
				range.moveStart("character", begin_pos[pos_index]);
				range.select();
			}
			else
			{
				textNode.setSelectionRange(begin_pos[pos_index], end_pos[pos_index]);
				textNode.focus();
			}
			return false;
		}
		else if(key_type==39)
		{
			if(pos_index==0 && input_key_number[0]<4 && input_key_number[0]>0)
			{
				time[0] = $(this).val().substring(0, input_key_number[0]);
				var temp_time = parseInt(time[0],10);
				temp_time = temp_time+2000;
				time[0] = temp_time.toString();
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			else if(pos_index==1 && input_key_number[1]==1)
			{
				time[1] = $(this).val().substring(5, 5+input_key_number[1]);
				time[1] = "0"+time[1];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			else if(pos_index==2 && input_key_number[2]==1)
			{
				time[2] = $(this).val().substring(8, 8+input_key_number[2]);
				time[2] = "0"+time[2];
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			time[0] = $(this).val().substring(0, 4);
			time[1] = $(this).val().substring(5, 7);
			time[2] = $(this).val().substring(8, 10);
			input_key_number[0] = 0;
			input_key_number[1] = 0;
			input_key_number[2] = 0;
			pos_index++;
			pos_index = pos_index%3;
			if(textNode.createTextRange)
			{
				range.moveEnd("character",end_pos[pos_index]-10);
				range.moveStart("character", begin_pos[pos_index]);
				range.select();
			}
			else
			{
				textNode.setSelectionRange(begin_pos[pos_index], end_pos[pos_index]);
				textNode.focus();
			}
			return false;
		}
		else if(key_type==38)
		{
			var temp_time;
			if(pos_index==0)
			{
				temp_time = parseInt(time[0],10);
				temp_time++;
				temp_time = temp_time%3000;
				if(temp_time==0)
				{
					temp_time = 1000;
					time[0] = temp_time.toString();
				}
				else
				{
					time[0] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			else if(pos_index==1)
			{
				temp_time = parseInt(time[1],10);
				temp_time++;
				temp_time = temp_time%13;
				if(temp_time==0)
				{
					temp_time=1;
					time[1] = "0"+temp_time.toString();
				}
				else if(temp_time<10)
				{
					time[1] = "0"+temp_time.toString();
				}
				else
				{
					time[1] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			else if(pos_index==2)
			{
				var day_number = getDateNumber(time[0],time[1]);
				temp_time = parseInt(time[2],10);
				temp_time++;
				temp_time = temp_time%(day_number+1);
				if(temp_time==0)
				{
					temp_time=1;
					time[2] = "0"+temp_time.toString();
				}
				else if(temp_time<10)
				{
					time[2] = "0"+temp_time.toString();
				}
				else
				{
					time[2] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			if(textNode.createTextRange)
			{
				range.moveEnd("character",end_pos[pos_index]-10);
				range.moveStart("character", begin_pos[pos_index]);
				range.select();
			}
			else
			{
				textNode.setSelectionRange(begin_pos[pos_index], end_pos[pos_index]);
				textNode.focus();
			}
			return false;
		}
		else if(key_type==40)
		{
			var temp_time;
			if(pos_index==0)
			{
				temp_time = parseInt(time[0],10);
				temp_time--;
				temp_time = temp_time%3000;
				if(temp_time<1000)
				{
					temp_time = temp_time+2000;
					time[0] = temp_time.toString();
				}
				else
				{
					time[0] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			else if(pos_index==1)
			{
				temp_time = parseInt(time[1],10);
				temp_time--;
				temp_time = temp_time%13;
				if(temp_time<=0)
				{
					temp_time = temp_time+12;
					time[1] = temp_time.toString();
				}
				else if(temp_time<10)
				{
					time[1] = "0"+temp_time.toString();
				}
				else
				{
					time[1] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			else if(pos_index==2)
			{
				var day_number = getDateNumber(time[0],time[1]);
				temp_time = parseInt(time[2],10);
				temp_time--;
				temp_time = temp_time%(day_number+1);
				if(temp_time<=0)
				{
					temp_time = temp_time+day_number;
					time[2] = temp_time.toString();
				}
				else if(temp_time<10)
				{
					time[2] = "0"+temp_time.toString();
				}
				else
				{
					time[2] = temp_time.toString();
				}
				$(this).val(time[0]+"-"+time[1]+"-"+time[2]);
			}
			if(textNode.createTextRange)
			{
				range.moveEnd("character",end_pos[pos_index]-10);
				range.moveStart("character", begin_pos[pos_index]);
				range.select();
			}
			else
			{
				textNode.setSelectionRange(begin_pos[pos_index], end_pos[pos_index]);
				textNode.focus();
			}
			return false;
		}
		else
		{
			return false;
		}
	});
	$("[action_type='date']").live('keyup',function(){
		var textNode=document.getElementById($(this).attr("id"));
		if((pos_index==0 && input_key_number[0]==4) || (pos_index==1 && input_key_number[1]==2) || (pos_index==2 && input_key_number[2]==2))
		{
			pos_index++;
			pos_index = pos_index%3;
			if(textNode.createTextRange)
			{
				var range = textNode.createTextRange();
				range.moveEnd("character",end_pos[pos_index]-10);
				range.moveStart("character", begin_pos[pos_index]);
				range.select();
			}
			else
			{
				textNode.setSelectionRange(begin_pos[pos_index], end_pos[pos_index]);
				textNode.focus();
			}
			time[0] = $(this).val().substring(0, 4);
			time[1] = $(this).val().substring(5, 7);
			time[2] = $(this).val().substring(8, 10);
		}
	});
	function getDateNumber(year,mouth)
	{
		year = parseInt(year,10);
		month = parseInt(mouth,10);
		var day = 0;
		switch(month)
		{
			case 4:
			case 6:
			case 9:
			case 11:
				day = 30;
				break;
			default:
				day = 31;
		}
		if(month==2)
		{
			if(year%100==0)
			{
				if(year%400==0)
				{
					day = 29;
				}
				else
				{
					day = 28;
				}
			}
			else if(year%4==0)
			{
				day = 29;
			}
			else
			{
				day = 28;
			}
		}
		return day;
	}

