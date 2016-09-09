var baseineval = 128;
var last_time = '';
var adu = 52;
var adu_xue = 10;
var adu_huxi = 10;
var samplingrate = 128;
var max_times = 135;
var points_one_times = 8;
var points_one_times_xue = 8;
var points_one_times_huxi = 8;
var gride_width = 25;
var gx = points_one_times * (gride_width * 5 / samplingrate);
var x_start = 50;
var y_starts = GetYStarts(2);
var draw_lines_index = [0, 1];
var last_points = [
	[50, 100],
	[50, 200],
	[50, 300],
	[50, 400],
	[50, 500],
];
var ecg_scope = 1;
var current_times = 0;
var current_times_xue = 0;
var current_times_huxi = 0;
var hits = 1;
var channels = 8;
var count = draw_lines_index.length;
var loop_flag = "false"

function innitHuaban(){
	window["get_data_interval"] = window.setInterval('getData()',500);
	drawecg();
	ecg()
}

function ecg() {
	initparm();
	window.setInterval('loop()',110);
	window.setInterval('loop_xue()',110);
	window.setInterval('loop_huxi()',110);
}

function Queue_monitor(){
	if(oQueue.GetSize()/100 > 10){
		clearInterval(window["get_data_interval"]);
		window["get_data_interval"] = "false"
	}else{
		if(window["get_data_interval"] == "false"){
			window["get_data_interval"] = window.setInterval('getData()',1000);
		}
	}
}

var datas = new Array("");

function adddata(F, E, data) {
	if (F == null || F.length < 4) {
		return
	} else {
		var I = new Array(F.length / 2 );
		
			I = F		
		for (var A = 0; A < I.length / 2 / E; A++) {			
			var G = new Array(E);
			var H = I.substr(A * 4, 4);
			for (var B = 0; B < E; B++) {
				G[B] = new Array(10)
				G[B]['xinbo'] = parseInt(H.substr(B * 2, 2), 16)
				// G[B]["data"] = data.result;
				G[B]["xueya_gao"] = data.result.xueya_gao;
				G[B]["xueya_di"] = data.result.xueya_di;
				G[B]["xueya_pingjun"] = data.result.xueya_pingjun;
				G[B]["tiwen_t1"] = data.result.tiwen_t1;
				G[B]["tiwen_t2"] = data.result.tiwen_t2;
				G[B]["xinlv"] = data.result.xinlv;
			}
			oQueue.EnQueue(G)		
		}

		var I = new Array(data.result.xueyang_bo.length / 2 );
		
		I = data.result.xueyang_bo
		for (var A = 0; A < I.length / 2 ; A++) {			
			var G = new Array(1);
			var H = I.substr(A * 2, 2);
			for (var B = 0; B < 1; B++) {
				G[B] = new Array(10)
				G[B]['xueyangbo'] = parseInt(H.substr(B * 2, 2), 16)
				G[B]["xueyang"] = data.result.xueyang;
			}
			queue_xueyang.EnQueue(G)		
		}

		var I = new Array(data.result.huxi_bo.length / 2 );
		
		I = data.result.huxi_bo
		for (var A = 0; A < I.length / 2 ; A++) {			
			var G = new Array(1);
			var H = I.substr(A * 2, 2);
			for (var B = 0; B < 1; B++) {
				G[B] = new Array(10)
				G[B]['huxi_bo'] = parseInt(H.substr(B * 2, 2), 16)
				G[B]["huxilv"] = data.result.huxilv;
			}
			queue_huxi.EnQueue(G)		
		}
	}
}

function getData(){
	$.get("/tiantan_emr/Xindian/Xindian/getData", {"last_time":last_time}, function(data){
		if(data.status=='success'){
			$("#bingchuanghao").html(data.result.bingchuanghao)

			var str1 = data.result.yitongdao;
			var str2 = data.result.ertongdao;

			var str3 = "";
			if(((str1.length%2) != 0) || ((str2.length%2) != 0) || str1.length != str2.length){
				alert("data error")
			}

			for (var A = 0; A < str1.length; A=A+2) {
				str3+=str1.substr(A, 2)+""+str2.substr(A, 2)
			}
			datas[0] = str3
			last_time = data.result.time
			// Convert16Scale(data);
			adddata(datas[0], 2,data)
			datas[0] =""
			loop_flag = "true"
		}
		else if(data.status == "error" && data.message == "noDAta"){

			clearInterval(window["get_data_interval"]);
			clearInterval(window["queue_monitor_interval"]);
			
		}
		else{
			clearInterval(window["get_data_interval"]);
			clearInterval(window["queue_monitor_interval"]);
		}
	},"json");
}

function Queue() {
	var B = new Array();
	var A = 50;
	Queue.prototype.EnQueue = function(C) {
		if (C == null) {
			return -1
		}
		if (B.length >= this.capacity) {
			B.remove(0)
		}
		B.push(C)
	};
	Queue.prototype.DeQueue = function() {
		if (B.length == 0) {
			return null
		} else {
			return B.shift()
		}
	};
	Queue.prototype.GetSize = function() {
		return B.length
	};
	Queue.prototype.GetHead = function() {
		if (B.length == 0) {
			return null
		} else {
			return B[0]
		}
	};
	Queue.prototype.MakeEmpty = function() {
		B.length = 0
	};
	Queue.prototype.IsEmpty = function() {
		if (B.length == 0) {
			return true
		} else {
			return false
		}
	}
	Queue.prototype.getB = function() {
		return B;
	}
}

function Queue_xueyang() {
	var B_xue = new Array();
	var A = 50;
	Queue_xueyang.prototype.EnQueue = function(C) {
		if (C == null) {
			return -1
		}
		if (B_xue.length >= this.capacity) {
			B_xue.remove(0)
		}
		B_xue.push(C)
	};
	Queue_xueyang.prototype.DeQueue = function() {
		if (B_xue.length == 0) {
			return null
		} else {
			return B_xue.shift()
		}
	};
	Queue_xueyang.prototype.GetSize = function() {
		return B_xue.length
	};
	Queue_xueyang.prototype.GetHead = function() {
		if (B_xue.length == 0) {
			return null
		} else {
			return B_xue[0]
		}
	};
	Queue_xueyang.prototype.MakeEmpty = function() {
		B_xue.length = 0
	};
	Queue_xueyang.prototype.IsEmpty = function() {
		if (B_xue.length == 0) {
			return true
		} else {
			return false
		}
	}
	Queue_xueyang.prototype.getB = function() {
		return B_xue;
	}
}


function Queue_huxi() {
	var B_huxi = new Array();
	var A = 50;
	Queue_huxi.prototype.EnQueue = function(C) {
		if (C == null) {
			return -1
		}
		if (B_huxi.length >= this.capacity) {
			B_huxi.remove(0)
		}
		B_huxi.push(C)
	};
	Queue_huxi.prototype.DeQueue = function() {
		if (B_huxi.length == 0) {
			return null
		} else {
			return B_huxi.shift()
		}
	};
	Queue_huxi.prototype.GetSize = function() {
		return B_huxi.length
	};
	Queue_huxi.prototype.GetHead = function() {
		if (B_huxi.length == 0) {
			return null
		} else {
			return B_huxi[0]
		}
	};
	Queue_huxi.prototype.MakeEmpty = function() {
		B_huxi.length = 0
	};
	Queue_huxi.prototype.IsEmpty = function() {
		if (B_huxi.length == 0) {
			return true
		} else {
			return false
		}
	}
	Queue_huxi.prototype.getB = function() {
		return B_huxi;
	}
}

var canvas = null;
var canvasline = null;
var canvasline2 = null;
var ctx = null;
var linectx = null;
var linectx2 = null;
var width = 0;
var height = 0;
var isstop = true;

function drawecg() {
	canvas = document.getElementById("background");
	canvasline = document.getElementById("line");
	canvasline2 = document.getElementById("line2");
	canvasline3 = document.getElementById("line3");
	width = canvas.width;
	height = canvas.height;
	ctx = canvas.getContext("2d");
	linectx = canvasline.getContext("2d");
	linectx2 = canvasline2.getContext("2d");
	linectx3 = canvasline3.getContext("2d");
	// drawgrid();
	addfilltext()
}

var oQueue = new Queue();
var queue_xueyang = new Queue_xueyang();
var queue_huxi = new Queue_huxi();

// function Convert16Scale(data) {
// 	var A = datas.length;
// 	for (var C = 0; C < A; C++) {
// 		var B = datas[C];
// 		adddata(datas[0], 2,data)
// 	}
// }

function addfilltext() {
	ctx.font = "bold 40pt ";
	ctx.fillStyle="#00FA20";
	ctx.fillText("├ 1mv", -2, 69)
	ctx.fillText("├ 1mv", -2, 203)
}

function showgrid() {
	var A = document.getElementById("chkshowgrid").checked;
	if (A) {
		drawgrid()
	} else {
		ctx.beginPath();
		ctx.clearRect(0, 0, width, height);
		ctx.stroke()
	}
	addfilltext()
}
function initparm() {
	
	if (width < 150) {
		alert("��Ļ�ߴ��С�������Ҫ150px��ȣ���")
	} else {
		max_times = parseInt((width - 50) / gx)
	}
	// alert(max_times);
	linectx.strokeStyle = "#00FA20"
	linectx2.strokeStyle = "red"
	linectx3.strokeStyle = "yellow"
}
var current_time_millis = 0;
var current_time_millis_xue = 0;
function loop() {
	var A = new Date().getTime();

	current_time_millis = A;
	draw(y_starts, baseineval, adu, samplingrate, max_times, points_one_times, linectx, draw_lines_index);
	// if (isstop) {
	// 	setTimeout(loop, 52);
	// 	var C = new Date().getTime();
	// 	var B = C - current_time_millis + 1;
	// 	if (B < 62) {
	// 		sleep(62 - B)
	// 	}
	// }

}

function loop_xue() {
	var A = new Date().getTime();

	current_time_millis_xue = A;
	draw_xue(y_starts, baseineval, adu_xue, samplingrate, max_times, points_one_times_xue, linectx2, draw_lines_index);
	// if (isstop) {
	// 	setTimeout(loop_xue, 200);
	// 	var C = new Date().getTime();
	// 	var B = C - current_time_millis_xue + 1;
	// 	if (B < 62) {
	// 		sleep(62 - B)
	// 	}
	// }

}

function loop_huxi() {
	var A = new Date().getTime();

	current_time_millis_xue = A;
	draw_huxi(y_starts, baseineval, adu_huxi, samplingrate, max_times, points_one_times_huxi, linectx3, draw_lines_index);
	// if (isstop) {
	// 	setTimeout(loop_xue, 200);
	// 	var C = new Date().getTime();
	// 	var B = C - current_time_millis_xue + 1;
	// 	if (B < 62) {
	// 		sleep(62 - B)
	// 	}
	// }

}

function sleep(B) {
	var A = new Date().getTime();
	for (var C = 0; C < 10000000; C++) {
		if ((new Date().getTime() - A) > B) {
			break
		}
	}
}

function GetYStarts(C) {
	var B = new Array();
	if (C >= 3) {
		for (var A = 0; A < C; A++) {
			if (height < 480) {
				B[A] = 100 + A * 100
			} else {
				B[A] = 100 + A * 100
			}
		}
	} else {
		if (C == 2) {
			B[0] = 80;
			B[1] = 220
			
		} else {
			if (C == 1) {
				B[0] = 200
			} else {
				return null
			}
		}
	}
	return B
}

function draw(Q, B, P, N, G, H, A, E) {
	current_times = current_times % G;
	if (oQueue.IsEmpty()) {
		return
	}
	if (oQueue.GetSize() < H) {
		return
	}
	clearcanvans(current_times, H, N, A);
	var F = new Array();
	for (var J = 0; J < H; J++) {
		F.push(oQueue.DeQueue())
	}

	A.beginPath();
	for (var J = 0; J < E.length; J++) {
		for (var K = 0; K < F.length; K++) {
			var O = F[K];

			var C = O[E[J]]['xinbo'] - B;
			setHtmlValue_xinlv(O[E[J]]);
			var I = K * parseFloat((gride_width * 5 / N));
			var M;
			if (ecg_scope != 0) {
				M = parseFloat((Math.abs(C)) * (P / (gride_width * 2)) * ecg_scope)
			} else {
				M = parseFloat((Math.abs(C)) * (P / (gride_width * 2)) / 2)
			}
			var L = parseFloat(x_start + current_times * H * (gride_width * 5 / N));
			if (K == 0) {
				if (current_times != 0) {
					A.moveTo(last_points[J][0], last_points[J][1]);
					var D = parseFloat(C >= 0 ? Q[J] - M : Q[J] + M);
					A.lineTo(last_points[J][0], D);
					last_points[J][0] = last_points[J][0];
					last_points[J][1] = D
				} else {
					var D = parseFloat(C >= 0 ? Q[J] - M : Q[J] + M);
					A.moveTo(x_start, D);
					last_points[J][0] = x_start;
					last_points[J][1] = D
				}
			} else {
				var D = parseFloat(C >= 0 ? Q[J] - M : Q[J] + M);
				A.lineTo(L + I, D);
				last_points[J][0] = L + I;
				last_points[J][1] = D
			}
		}
	}
	A.stroke();
	current_times++
}

function draw_xue(Q, B, P, N, G, H, A, E) {

	current_times_xue = current_times_xue % G;
	if (queue_xueyang.IsEmpty()) {
		return
	}
	if (queue_xueyang.GetSize() < H) {
		return
	}
	clearcanvans(current_times_xue, H, N, A);
	var F = new Array();
	for (var J = 0; J < H; J++) {
		F.push(queue_xueyang.DeQueue())
	}
	A.beginPath();
	for (var K = 0; K < F.length; K++) {
		var O = F[K];

		var C = O[0]['xueyangbo'] - B;
		setHtmlValue_xueyang(O[0]);
		var I = K * parseFloat((gride_width * 5 / N));
		var M;
		if (ecg_scope != 0) {
			M = parseFloat((Math.abs(C)) * (P / (gride_width * 2)) * ecg_scope)
		} else {
			M = parseFloat((Math.abs(C)) * (P / (gride_width * 2)) / 2)
		}
		var L = parseFloat(x_start + current_times_xue * H * (gride_width * 5 / N));
		if (K == 0) {
			if (current_times_xue != 0) {
				A.moveTo(last_points[3][0], last_points[3][1]);
				var D = parseFloat(C >= 0 ? Q[0] - M : Q[0] + M);
				A.lineTo(last_points[3][0], D);
				last_points[3][0] = last_points[3][0];
				last_points[3][1] = D
			} else {
				var D = parseFloat(C >= 0 ? Q[0] - M : Q[0] + M);
				A.moveTo(x_start, D);
				last_points[3][0] = x_start;
				last_points[3][1] = D
			}
		} else {
			var D = parseFloat(C >= 0 ? Q[0] - M : Q[0] + M);
			A.lineTo(L + I, D);
			last_points[3][0] = L + I;
			last_points[3][1] = D
		}
	}
	A.stroke();
	current_times_xue++
}

function draw_huxi(Q, B, P, N, G, H, A, E) {

	current_times_huxi = current_times_huxi % G;
	if (queue_huxi.IsEmpty()) {
		return
	}
	if (queue_huxi.GetSize() < H) {
		return
	}
	clearcanvans(current_times_huxi, H, N, A);
	var F = new Array();
	for (var J = 0; J < H; J++) {
		F.push(queue_huxi.DeQueue())
	}
	A.beginPath();
	for (var K = 0; K < F.length; K++) {
		var O = F[K];

		var C = O[0]['huxi_bo'] - B;
		setHtmlValue_huxi(O[0]);
		var I = K * parseFloat((gride_width * 5 / N));
		var M;
		if (ecg_scope != 0) {
			M = parseFloat((Math.abs(C)) * (P / (gride_width * 2)) * ecg_scope)
		} else {
			M = parseFloat((Math.abs(C)) * (P / (gride_width * 2)) / 2)
		}
		var L = parseFloat(x_start + current_times_huxi * H * (gride_width * 5 / N));
		if (K == 0) {
			if (current_times_huxi != 0) {
				A.moveTo(last_points[4][0], last_points[4][1]);
				var D = parseFloat(C >= 0 ? Q[0] - M : Q[0] + M);
				A.lineTo(last_points[4][0], D);
				last_points[4][0] = last_points[4][0];
				last_points[4][1] = D
			} else {
				var D = parseFloat(C >= 0 ? Q[0] - M : Q[0] + M);
				A.moveTo(x_start, D);
				last_points[4][0] = x_start;
				last_points[4][1] = D
			}
		} else {
			var D = parseFloat(C >= 0 ? Q[0] - M : Q[0] + M);
			A.lineTo(L + I, D);
			last_points[4][0] = L + I;
			last_points[4][1] = D
		}
	}
	A.stroke();
	current_times_huxi++
}

function clearcanvans(B, F, C, D) {
	var A = parseFloat(F * (gride_width * 5 / C));
	var E = x_start + B * A;
	if (B != 0) {
		D.clearRect(E, 0, 20, height)
	} else {
		D.clearRect(E - 10, 0, E + 20, height)
	}
};

function setHtmlValue_xinlv(G){
	$("#ECGValue").html(G["xinlv"])
	$("#xueya_gao").html(G["xueya_gao"])
	$("#xueya_di").html(G["xueya_di"])
	$("#xueya_pingjun").html(G["xueya_pingjun"])
	$("#tiwen_t1").html(G["tiwen_t1"])
	$("#tiwen_t2").html(G["tiwen_t2"])
}
function setHtmlValue_xueyang(G){
	
	$("#xueyang").html(G["xueyang"])
}

function setHtmlValue_huxi(G){
	
	$("#huxilv").html(G["huxilv"])
}