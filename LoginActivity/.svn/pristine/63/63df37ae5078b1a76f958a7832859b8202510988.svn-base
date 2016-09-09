
$(document).ready(function(){
	var total_width = parseInt((win_width*0.6));
	var total_height = parseInt((win_height*0.9));
	$(".record_note_fa").width(total_width) ;
	$("#canvas_note")[0].width = total_width;
	$("#canvas_note")[0].height = parseInt((total_height*0.67));
	$("#record_remark_text").width(total_width) ;
	//$(".record_note_top").height(parseInt((total_height*0.15)));
	$("#record_remark_text").height(parseInt((total_height*0.15)));
	var canvas_width = 600;
	var canvas_height = 400;
})

var win_width = $(window).width();
var win_height = $(window).height();
var left_index = parseInt((win_width*0.15));
var top_index = parseInt((win_height*0.01));

// 添加便签按钮功能：
$("#record_note").live("click", function() {
	var dialog_choose_str = "";
	dialog_choose_str += '<div class="note_choose">';
	dialog_choose_str += '<div onclick="blankNoteClick()" class="note_item">空白便签</div><br/>';
	dialog_choose_str += '<div onclick="screenshotNoteClick()" class="note_item">截图便签</div><br/>';
	dialog_choose_str += '<div onclick="photoNoteClick()" class="note_item">拍照便签</div><br/>';
	dialog_choose_str += '<div onclick="bingchengNoteClick()" class="note_item">病程便签</div><br/>';
	dialog_choose_str += '</div>';
	art.dialog({
		id:"note_choose_dialog",
		title:"选择便签种类",
		content:dialog_choose_str,
		lock: true,
		padding:5,
		
	});
});

//空白便签
function blankNoteClick(){
	var my_canvas = document.getElementById("canvas_note");				
	ctx = my_canvas.getContext("2d");
	ctx.clearRect(0, 0, my_canvas.width, my_canvas.height);
	document.getElementById("record_remark_text").value = "";
	art.dialog({
		title : "画板",
		content : document.getElementById('record_note_place'),
		id : 'note_area_dialog',
		drag : false,
		left : left_index,
		top : top_index,
		fixed:true
	})
	initRecordNote();
	art.dialog.list['note_choose_dialog'].close();
}
//截屏便签
function screenshotNoteClick(){
	var conframe = $("#conframe")[0].contentDocument.body;
	html2canvas(conframe,{
		onrendered:function (canvas){
			var my_canvas = document.getElementById("canvas_note");	
			var pic_width = $("#conframe")[0].clientWidth;
			var pic_height = $("#right_menu")[0].clientHeight>$("#conframe")[0].clientHeight?$("#conframe")[0].clientHeight:$("#right_menu")[0].clientHeight;
			ctx = my_canvas.getContext("2d");
			ctx.clearRect(0, 0, my_canvas.width, my_canvas.height);
			document.getElementById("record_remark_text").value = "";
			ctx.drawImage(canvas,0,0,pic_width,pic_height,0,0,my_canvas.width,my_canvas.height);
			art.dialog({
				title : "画板",
				content : document.getElementById('record_note_place'),
				id : 'note_area_dialog',
				drag : false,
				left : left_index,
				top : top_index
			})
		}
	})
	initRecordNote();
	art.dialog.list['note_choose_dialog'].close();
}
function initRecordNote(){ 
	var paint=
	{ 
		init:function() 
		{ 
			this.load(); 
		}, 
		load:function() 
		{ 
			this.x=[];//记录鼠标移动是的X坐标 
			this.y=[];//记录鼠标移动是的Y坐标 
			this.clickDrag=[]; 
			this.lock=false;//鼠标移动前，判断鼠标是否按下 
			this.isEraser=false; 
			//this.Timer=null;//橡皮擦启动计时器 
			//this.radius=5; 
			this.storageColor="#000000"; 
			this.eraserRadius=15;//擦除半径值 
			this.color=["#000000","#FF0000","#80FF00","#00FFFF","#808080","#FF8000","#408080","#8000FF","#CCCC00"];//画笔颜色值 
			this.fontWeight=[2,5,8]; 
			this.$=function(id){return typeof id=="string"?document.getElementById(id):id;}; 
			this.canvas=this.$("canvas_note"); 
			if (this.canvas.getContext) { 
			} else { 
				alert("您的浏览器不支持 canvas 标签"); 
			return; 
			} 
			this.cxt=this.canvas.getContext('2d'); 
			this.cxt.lineJoin = "round";//context.lineJoin - 指定两条线段的连接方式 
			this.cxt.lineWidth = 5;//线条的宽度 
			this.iptClear=this.$("clear"); 
			this.revocation=this.$("revocation"); 
			this.save_note=this.$("save_note");//存储便签
			this.w=this.canvas.width;//取画布的宽 
			this.h=this.canvas.height;//取画布的高 
			this.touch =("createTouch" in document);//判定是否为手持设备 
			this.StartEvent = this.touch ? "touchstart" : "mousedown";//支持触摸式使用相应的事件替代 
			this.MoveEvent = this.touch ? "touchmove" : "mousemove"; 
			this.EndEvent = this.touch ? "touchend" : "mouseup"; 
			this.bind(); 
		}, 
		bind:function() 
		{ 
			var t=this; 
			
			/*鼠标按下事件，记录鼠标位置，并绘制，解锁lock，打开mousemove事件*/ 
			this.canvas['on'+t.StartEvent]=function(e) 
			{ 
				e.preventDefault();
				var touch=t.touch ? e.touches[0] : e; 
				var _x=touch.clientX - touch.target.offsetLeft - left_index ;//鼠标在画布上的x坐标，以画布左上角为起点 
				var _y=touch.clientY - touch.target.offsetTop - top_index - 29;//鼠标在画布上的y坐标，以画布左上角为起点 
				if(t.isEraser) 
				{ 
					/* 
					t.cxt.globalCompositeOperation = "destination-out"; 
					t.cxt.beginPath(); 
					t.cxt.arc(_x, _y,t.eraserRadius, 0, Math.PI * 2); 
					t.cxt.strokeStyle = "rgba(250,250,250,0)"; 
					t.cxt.fill(); 
					t.cxt.globalCompositeOperation = "source-over"; 
					*/ 
					t.resetEraser(_x,_y,touch); 
				}else 
				{ 
					t.movePoint(_x,_y);//记录鼠标位置 
					t.drawPoint();//绘制路线 
				} 
				t.lock=true; 
			}; 
			/*鼠标移动事件*/ 
			this.canvas['on'+t.MoveEvent]=function(e) 
			{ 
				var touch=t.touch ? e.touches[0] : e; 
				
				if(t.touch || t.lock)//t.lock为true则执行 
				{ 
					var _x=touch.clientX - touch.target.offsetLeft - left_index ;//鼠标在画布上的x坐标，以画布左上角为起点 
					var _y=touch.clientY - touch.target.offsetTop - top_index - 29;//鼠标在画布上的y坐标，以画布左上角为起点 
					if(t.isEraser) 
					{ 
						//if(t.Timer)clearInterval(t.Timer); 
						//t.Timer=setInterval(function(){ 
						t.resetEraser(_x,_y,touch); 
						//},10); 
					} 
					else 
					{ 
						t.movePoint(_x,_y,true);//记录鼠标位置 
						t.drawPoint();//绘制路线 
					} 
				} 
			}; 
			this.canvas['on'+t.EndEvent]=function(e) 
			{ 
				/*重置数据*/ 
				t.lock=false; 
				t.x=[]; 
				t.y=[]; 
				t.clickDrag=[]; 
			}; 
			this.revocation.onclick=function() 
			{ 
				t.redraw(); 
			}; 
			this.changeColor(); 
			this.save_note.onclick=function() 
			{ 
				art.dialog({
				    okValue: '确认',
				    lock: true,
				    content: "是否保存",
				    ok: function () {
				    	var my_can = document.getElementById("canvas_note"); 
				    	var remark = document.getElementById("record_remark_text").value;
				    	var img = my_can.toDataURL("image/png"); 
				    	$.post("/tiantan_emr/ZhuyuanYishi/Patient/editPatientBianqian",{
				    		url:img,
				    		description:remark,
				    		zhuyuan_id:current_zhixing_id,
				    		},function(data,state){
				            if (data){
				            	alert("成功");
				            	art.dialog.list['note_area_dialog'].close();
				            }
				            else{
				            	alert("失败");
				            }
				        })
				    	
				    },
				    cancelValue: '取消',
				    cancel: function () {
				    	
				    }
				}).show();
			}; 
			/*清除画布*/ 
			this.iptClear.onclick=function() 
			{ 
				var my_canvas = document.getElementById("canvas_note");	
				ctx = my_canvas.getContext("2d");
				ctx.clearRect(0, 0, my_canvas.width, my_canvas.height);//清除画布，左上角为起点 
			}; 
			/*橡皮擦*/ 
			this.$("eraser").onclick=function(e) 
			{ 
				t.isEraser=true; 
				//t.$("error").style.color="red"; 
				//t.$("error").innerHTML="您已使用橡皮擦！"; 
			}; 
		}, 
		movePoint:function(x,y,dragging) 
		{ 
			/*将鼠标坐标添加到各自对应的数组里*/ 
			this.x.push(x); 
			this.y.push(y); 
			this.clickDrag.push(y); 
		}, 
		drawPoint:function(x,y,radius) 
		{ 
			for(var i=0; i < this.x.length; i++)//循环数组 
			{ 
				this.cxt.beginPath();//context.beginPath() , 准备绘制一条路径 
				
				if(this.clickDrag[i] && i){//当是拖动而且i!=0时，从上一个点开始画线。 
					this.cxt.moveTo(this.x[i-1], this.y[i-1]);//context.moveTo(x, y) , 新开一个路径，并指定路径的起点
				}else{ 
					this.cxt.moveTo(this.x[i]-1, this.y[i]); 
				} 

				this.cxt.lineTo(this.x[i], this.y[i]);//context.lineTo(x, y) , 将当前点与指定的点用一条笔直的路径连接起来 
				this.cxt.closePath();//context.closePath() , 如果当前路径是打开的则关闭它 
				this.cxt.stroke();//context.stroke() , 绘制当前路径 
			} 
		}, 
		clear:function() 
		{ 
			this.cxt.clearRect(0, 0, this.w, this.h);//清除画布，左上角为起点 
		}, 
		redraw:function() 
		{ 
			/*撤销*/ 
			this.cxt.restore(); 
		}, 
		preventDefault:function(e){ 
			/*阻止默认*/ 
			var touch=this.touch ? e.touches[0] : e; 
			if(this.touch)touch.preventDefault(); 
			else window.event.returnValue = false; 
		}, 
		changeColor:function() 
		{ 
			/*为按钮添加事件*/ 
			var t=this,iptNum=this.$("record_note_color").getElementsByTagName("input"),fontIptNum=this.$("record_note_font").getElementsByTagName("input"); 
			for(var i=0,l=iptNum.length;i<l;i++) 
			{ 
				iptNum[i].index=i; 
				iptNum[i].onclick=function() 
				{ 
					t.cxt.save(); 
					t.cxt.strokeStyle = t.color[this.index]; 
					t.storageColor=t.color[this.index]; 
					//t.$("error").style.color="#000"; 
					//t.$("error").innerHTML="如果有错误，请使用橡皮擦："; 
					t.cxt.strokeStyle = t.storageColor; 
					t.isEraser=false; 
				} 
			} 
			for(var i=0,l=fontIptNum.length;i<l;i++) 
			{ 
				t.cxt.save(); 
				fontIptNum[i].index=i; 
				fontIptNum[i].onclick=function() 
				{ 
					t.changeBackground(this.index); 
					t.cxt.lineWidth = t.fontWeight[this.index]; 
					//t.$("error").style.color="#000"; 
					//t.$("error").innerHTML="如果有错误，请使用橡皮擦："; 
					t.isEraser=false; 
					t.cxt.strokeStyle = t.storageColor; 
				} 
			} 
		}, 
		changeBackground:function(num) 
		{ 
			/*添加画笔粗细的提示背景颜色切换，灰色为当前*/ 
			var fontIptNum=this.$("record_note_font").getElementsByTagName("input"); 
			for(var j=0,m=fontIptNum.length;j<m;j++) 
			{ 
				fontIptNum[j].className=""; 
				if(j==num) fontIptNum[j].className="grea"; 
			} 
		}, 
		getUrl:function() 
		{ 
			this.$("html").innerHTML=this.canvas.toDataURL(); 
		}, 
		resetEraser:function(_x,_y,touch) 
		{ 
			/*使用橡皮擦-提醒*/ 
			var t=this; 
			//this.cxt.lineWidth = 30; 
			/*source-over 默认,相交部分由后绘制图形的填充(颜色,渐变,纹理)覆盖,全部浏览器通过*/ 
			t.cxt.globalCompositeOperation = "destination-out"; 
			t.cxt.beginPath(); 
			t.cxt.arc(_x, _y, t.eraserRadius, 0, Math.PI * 2); 
			t.cxt.strokeStyle = "rgba(250,250,250,0)"; 
			t.cxt.fill(); 
			t.cxt.globalCompositeOperation = "source-over" 
		} 
	}; 
	paint.init(); 
}
//病程便签
function bingchengNoteClick(){
	art.dialog.list['note_choose_dialog'].close();
	$.post('/tiantan_emr/ZhuyuanYishi/Patient/bingchengBianqian',{zhuyuan_id:parent.current_zhixing_id},function(data){
		data = eval('('+data+')')
		var str='<div style="background:#2ba5fa;color:#fff;padding:10px;font-weight:bolder;">'+data.viewInfo+'</div>';
		str+='<div style="width:100%; display:block; margin-bottom:5px;">西医诊断:<span class="zhenduan_tag">'+data.zhenduan.zhenduan_xiyi+'</span>中医诊断:<span class="zhenduan_tag">'+data.zhenduan.zhenduan_zhongyi+'</span></div>'
		str+='<table width="100%" border="0" cellspacing="0" cellpadding="0">'
		str+=	'<tr>'
		str+=		'<td valign="top"><textarea id="bingcheng" name="bingcheng" style="width:99%;height:99%;border:1px solid #ccc;"></textarea></td>'
		str+=		'<td width="65%" valign="top" style="padding:10px;">'
		str+=			'<table width="100%" border="0" cellspacing="0" cellpadding="0">'
		str+=				'<tr>'
		str+=					'<td width="80" valign="top"><span style="color:#00f;float:right;margin-top:8px;">诊断:</span></td><td valign="bottom">西医:'+data.zhenduan.zhenduan_xiyi+'&nbsp;&nbsp;中医:'+data.zhenduan.zhenduan_zhongyi+'</td>'
		str+=				'</tr>'
		str+=				'<tr>'
		str+=					'<td valign="top"><span style="color:#00f;float:right;margin-top:8px;">护理级别:</span></td><td valign="bottom">'+data.hulijibie+'</td>'
		str+=				'</tr>'
		str+=				'<tr>'
		str+=					'<td valign="top"><span style="color:#00f;float:right;margin-top:8px;" class="chati" chati="'+data.tizheng.chati+'">体征:</span></td><td valign="top">'+data.tizheng.tizheng+'</td>'
		str+=				'</tr>'
		str+=				'<tr>'
		str+=					'<td valign="top"><span style="color:#00f;float:right;margin-top:8px;">辅助检查:</span></td><td valign="top">'+data.fuzhujiancha+'</td>'
		str+=				'</tr>'
		str+=				'<tr>'
		str+=					'<td valign="top"><span style="color:#00f;float:right;margin-top:8px;">用药:</span></td><td valign="top">'+data.yongyao+'</td>'
		str+=				'</tr>'
		str+=			'</table>'
		str+=		'</td>'
		str+=	'</tr>'
		str+='</table>'
		art.dialog({
			okVal: '保存',
			title : "病程便签",
			content :str ,
			id : 'bingcheng_area_dialog',
			drag : false,
			width :'',
			height : '',
			init: function () {
				//设置护理级别
				$("[name='hulijibie']").change(function(){
					var hulijibie_value = $(this);
					if(confirm("您是否确定更新此患者的护理级别？"))
					{
						$.get("http://"+server_url+"/tiantan_emr/Common/Data/setHuliJibie",{type:hulijibie_value.val(),id:hulijibie_value.attr('zhuyuan_id')},function(data){
							if(data=="success")
								alert("护理级别更新成功");
							else
								alert("护理级别更新失败");
						});
					}
				});
				//体征
				$('.chati').bind('click',function(){
					var bingchengjilu = $("#bingcheng").val()+$(this).attr('chati')
					$("#bingcheng").val(bingchengjilu)
				})
				$('.bingcheng_tag').bind('click',function(){
					var bingchengjilu = $("#bingcheng").val()+$(this).attr('tag')
					$("#bingcheng").val(bingchengjilu)
				})
			},
			ok: function () {							
				$.post('/tiantan_emr/ZhuyuanYishi/Patient/bingchengBianqianInsert',{zhuyuan_id:parent.current_zhixing_id,bingcheng:$("#bingcheng").val()},function(data){
					if(data=="true")
						alert("病程便签保存成功");
					else
						alert("病程便签保存失败");
				})
			},
		})
	})
}
//拍照便签
function photoNoteClick(){
//alert(current_zhixing_id)
	capturePhotoEditBianqian(current_zhixing_id,"bianqian");
}

function capturePhotoEditBianqian()
{
	navigator.camera.getPicture(onPhotoURISuccessBianqian, onFail, {
		quality: 50, allowEdit: true,
		destinationType:destinationType.DATA_URL,
		targetWidth: 700,
		targetHeight: 520
	});
}
function onPhotoURISuccessBianqian(imageURI) {
	var img_count_temp = 0;
	var img=document.getElementById("photoBianqian");
	imageURI="data:image/png\;base64\,"+imageURI;
	img.src=imageURI;
	$.post("http://"+server_url+"/tiantan_emr/Common/Data/photoBianqian",function(data){
		if(data=="true")
		{		
			var my_canvas = document.getElementById("canvas_note");				
			ctx = my_canvas.getContext("2d");
			ctx.drawImage(document.getElementById("photoBianqian"),0,0,693,520,0,0,700,520);
			document.getElementById("record_remark_text").value = "";
			art.dialog({
				title : "画板",
				content : document.getElementById('record_note_place'),
				id : 'note_area_dialog',
				drag : false,
				left : left_index,
				top : top_index
			})
			initRecordNote();
			art.dialog.list['note_choose_dialog'].close();
		}
	});
}