/**************************************************
*  Created:  2012-11-15
*  Info:检验科质控管理js代码
*  @Tiantanhehe (C)2011-3011 Tiantanhehe
*  @Author Gaojie JING <jinggj@gmail.com>
*  @Cooperation Author
*
***************************************************/

//列出质控靶值
(function($){
	$.fn.listZhikongBazhi = function(){
		
		return this.each(function(){
			$('.slide_block:has(.zhikong_bazhi_all)').show();
			
			$('#zhikong_bazhi').removeClass();
			$('#zhikong_bazhi').removeAttr('reg');
			$('#zhikong_bazhi').removeAttr('right_message');
			$('#zhikong_bazhi').removeAttr('error_message');
			$('#zhikong_bazhi').addClass('disabled_input');
			$('#zhikong_bazhi').attr('disabled','true');
			$('#zhikong_bazhi').removeAttr('style');
			
			$('.zhikong_bazhi_all').val('');
			$('#zhikong_bazhi').parent().parent().removeClass("onShow");
			$('#zhikong_bazhi').parent().next().children().first().removeClass().addClass('onFocus').html('请在下方分项填写');
		});
	};
	
	$.fn.hideZhikongBazhiList = function(){
		
		return this.each(function(){
			$('#zhikong_bazhi').removeClass();
			$('#zhikong_bazhi').attr('reg', '^[\\W\\S]{1,20}$');
			$('#zhikong_bazhi').attr('right_message', '录入正确');
			$('#zhikong_bazhi').attr('error_message', '请输入数字的靶值');
			$('#zhikong_bazhi').addClass('input_type');
			$('#zhikong_bazhi').removeAttr('disabled');
			
			$('#zhikong_bazhi').parent().next().children().first().html('质控靶值');
			$('#zhikong_bazhi').parent().next().children().first().removeClass().addClass('onFocus');
			
			$('.zhikong_bazhi_all').parent().next().children().removeClass().addClass('onFocus');
			$('.zhikong_bazhi_all').parent().next().children().html($('.slide_input_type').parent().next().next().children().attr('detail_info'));
		});
	};
	
})(jQuery);

//列出质控标准差
(function($){
	$.fn.listZhikongBiaozhuncha = function(){
		
		return this.each(function(){
			$('.slide_block:has(.zhikong_biaozhuncha_all)').show();
			
			$('#zhikong_biaozhuncha').removeClass();
			$('#zhikong_biaozhuncha').addClass('disabled_input');
			$('#zhikong_biaozhuncha').attr('disabled','true');
			$('#zhikong_biaozhuncha').removeAttr('style');
			
			$('.zhikong_biaozhuncha_all').val('');
			$('#zhikong_biaozhuncha').parent().parent().removeClass("onShow");
			$('#zhikong_biaozhuncha').parent().next().children().first().removeClass().addClass('onFocus').html('请在下方分项填写');
		});

	};
	
	$.fn.hideZhikongBiaozhunchaList = function(){
		
		return this.each(function(){
			$('#zhikong_biaozhuncha').removeClass();
			$('#zhikong_biaozhuncha').addClass('input_type');
			$('#zhikong_biaozhuncha').removeAttr('disabled');
			
			$('#zhikong_biaozhuncha').parent().next().children().first().html('质控标准差，如果不输入则自动计算全月标准差');
			$('#zhikong_biaozhuncha').parent().next().children().first().removeClass().addClass('onFocus');
			
			$('.zhikong_biaozhuncha_all').parent().next().children().removeClass().addClass('onFocus');
			$('.zhikong_biaozhuncha_all').parent().next().children().html($('.slide_input_type').parent().next().next().children().attr('detail_info'));
		});
	};
})(jQuery);