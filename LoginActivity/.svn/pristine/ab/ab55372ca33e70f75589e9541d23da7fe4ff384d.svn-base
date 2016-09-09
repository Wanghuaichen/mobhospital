var media_url;
var media_id;
var zhuyuan_id;
var file_name;

$(function(){
	zhuyuan_id = art.dialog.data("zhuyuan_id");

	$(".media-show").click(function(){
		var temp = this;
		// $(this).focus();
		// $(this).css("background-color","gray");
		media_id = $(this).attr("id");
		$("#update-media-info").css("display","block");
		$("#insert-media").css("display","block");
		$.post("/tiantan_emr/Common/Media/showMediaDetail",{"media_id":media_id},function(data){
			$("#media-detail").html(data);
			media_url = $(temp).children("img").attr("src");
			// console.log("-----------------"+media_url);
		});
	});

	

	$("#insert-media").click(function(){
		art.dialog.data("insert","yes");
		art.dialog.data("media","<img src='"+media_url+"'/>");
		art.dialog.close();
	});

	// $("#update-media-info").click(function(){
	// 	$.post("/tiantan_emr/Media/updateMediaInfo",
	// 		{"media_id":media_id,
	// 			"title":$("#title").val(),
	// 			"description":$("#description").val()
	// 		},function(data){
	// 		// $("#media-detail").html(data);
	// 		console.log(data);
	// 	});
	// });

	$("#update-media-info").click(function(){
		$.post("/tiantan_emr/Common/Media/updateMediaInfo",
			{"media_id":media_id,
				"title":$("#title").val(),
				"description":$("#description").val()
			},function(data){
			// $("#media-detail").html(data);
			console.log(data);
		});
	});
});
