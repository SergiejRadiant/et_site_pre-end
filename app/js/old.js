$(function() {
	
	$("img, a").on("dragstart", function(event) {
		event.preventDefault();
	});

	var h = $(".header-bottom-line").css('margin-top');

	$('.tabs-controls-item').on('click', function(e) {
		e.preventDefault();

		var item = $(this).closest('.tabs-controls-item'),
				contentItem = $('.tabs-item'),
				itemPosition = item.index();
		
		$(".tabs-controls-item").removeClass("active");
		$(this).addClass('active');
		if (itemPosition > 1)
			$(".header-bottom-line").animate({marginTop: '0px'}, 100);
		else {
			$(".header-bottom-line").animate({ marginTop: h }, 100);	
		}
			
		// contentItem.hide();
		console.log(contentItem);
		$(".tabs-item").hide();
		$($(".tabs-item")[itemPosition]).slideToggle(600);
		// contentItem.eq(itemPosition)
		// 	.add(item)
		// 	// .slideToggle();
			// .addClass('active')
			//  .siblings()
			//  .hide();
			// .removeClass('active');
	});

});

(() => {

	
	
})();

