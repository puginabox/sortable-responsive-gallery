var thumbnailSpacing = 15;

$(document).ready(function() {
	$('a.sortLink').on('click', function(e){
		e.preventDefault();
		$('a.sortLink').removeClass('selected');
		$(this).addClass('selected');
		var keyword = $(this).attr('data-keyword');	
		sortThumbnails(keyword);
	});
	$('.gallery .sorting').css('margin-bottom',thumbnailSpacing+'px');
	$('.thumbnail_container a.thumbnail').addClass('fancybox').addClass('showMe').attr('rel','group');
	positionThumbnails();
	setInterval('checkViewPort()', 750);
});

function checkViewPort(){
	var photosWidth = $('.photos').width();
	var thumbnailContainerWidth = $('.thumbnail_container').width();
	var thumbnailWidth = $('.thumbnail:first-child').outerWidth();
	if( photosWidth < thumbnailContainerWidth){
		positionThumbnails();
	}
	if( (photosWidth-thumbnailWidth) > (thumbnailContainerWidth) ){
		positionThumbnails();
	}
	$('.debug-size').html('photosWidth = '+photosWidth+' thumbnailContainerWidth = '+thumbnailContainerWidth);
}

function sortThumbnails(keyword){

	$('.thumbnail_container a.thumbnail').each(function(){
		var thumbnailKeywords = $(this).attr('data-keywords');
		if(keyword == 'all'){
			$(this).addClass('showMe').removeClass('hideMe').attr('rel','group');
		}else{
			if(thumbnailKeywords.indexOf(keyword) != -1){
				$(this).addClass('showMe').removeClass('hideMe').attr('rel','none');
			}else{
				$(this).addClass('hideMe').removeClass('showMe').attr('rel','group');
			}
		}
	});
	positionThumbnails();
}

function positionThumbnails(){
	
	/* debug */ $('.debug-remainder').html('');
	
	// Hide Thumbnails
	$('.thumbnail_container a.thumbnail.hideMe').animate({opacity:0},500, function(){
		$(this).css({'display':'none','top':'0px','left':'0px'});
	});
	
	// Show Thumbnails
	var containerWidth = $('.photos').width();
	var thumbnail_R = 0;
	var thumbnail_C = 0;
	var thumbnailWidth = $('a.thumbnail img:first-child').outerWidth() + window.thumbnailSpacing;
	var thumbnailHeight = $('a.thumbnail img:first-child').outerHeight() + window.thumbnailSpacing;
	var max_C = Math.floor(containerWidth/thumbnailWidth);
	
	$('.thumbnail_container a.thumbnail.showMe').each(function(index){
		
		var remainder = (index % max_C) / 100;
		var maxIndex = 0;
		
		/* debug */ $('.debug-remainder').append(remainder+' - ');
		
		if(remainder == 0){
			if(index != 0 ){
				thumbnail_R += thumbnailHeight;
			}
			thumbnail_C = 0;
		}else{
			thumbnail_C += thumbnailWidth;
		}
		
		$(this).css('display','block').animate({'opacity':1,'top':thumbnail_R+'px','left':thumbnail_C+'px'}, 500);
		
		var newWidth = max_C * thumbnailWidth;
		var newHeight = thumbnail_R + thumbnailHeight;
		
		$('.thumbnail_container').css({'width':newWidth+'px','height':newHeight+'px'});
		
		detectFancyboxLinks();

	});
	
	//detectFancyboxLinks();
	
	// Makes width match width of thumbnails
	var sortingWidth = $('.thumbnail_container').width() / thumbnailWidth;
	var newWidth = sortingWidth * thumbnailWidth - window.thumbnailSpacing;
	
	$('.sorting').css('width',newWidth+'px');

}

function detectFancyboxLinks(){

	// Remove fancybox links
	$('a.fancybox[rel="group"]').unbind('click.fb');
	
	// Check stage size
	if( $(window).width() < 550 ){
		// alert('under 400');
		$('.thumbnail_container a.thumbnail').removeClass('fancybox').attr('target','_blank');
	}else{
		$('.thumbnail_container a.thumbnail').addClass('fancybox').removeAttr('target');
	}
	
	// Activate Fancybox links
	$('a.fancybox[rel="group"]').fancybox({
		'transitionIn'   : 'elastic',
		'transitionOut'  : 'elastic',
		'titlePosition'	: 'over',
		'speedIn'        : 500,
		'overlayColor'   : '#000',
		'padding'        :  0,
		'overlayOpacity' : .75
	});
	
	
}
