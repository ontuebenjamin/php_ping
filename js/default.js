var count = 1;
var audio_duration;
var audio_element;
var interval = 1000;
(function($){
	$(document).ready(function(){
		var $body = $('body');
		
		//takes time for audio to load
		setTimeout(function(){
			audio_element = $('audio')[0];
			audio_duration = audio_element.duration;			
			do_ajax();
		},500);
		
	})
})(jQuery);

function do_ajax(){
	data = {};
	data.domain = 'philgo.com';
	
	$.ajax({
		url: "API.php",
		data: data,
		type: "POST",
		success: function(re){
			re = JSON.parse( re );
			scrollheight = $('.ping-message')[0].scrollHeight;
			
			console.log( "duration: " + audio_duration );
			console.log( "current:" + audio_element.currentTime );			
			
			if( audio_element.currentTime >= audio_duration ){
				audio_element.currentTime = 0;//reset the time when it finished the mp3 file
			}
			
			if( re.error ){
				$('.ping-message').append("<div>Sequence " + count + " - Cannot connect to server " + data.domain + "!</div>");
				
				if( $('audio')[0].paused ){
					console.log('Connection lost! Start the alarm!');
					$('audio')[0].play();					
				}
			}
			else{			
				message = 'Done ping on '+re.domain+' with '+re.ms+'ms';
				$html = "<div>Sequence: <span class='num'>"+count+"</span> - <span class='message'>"+message+"</span></div>";
				$('.ping-message').append($html);
				if( !$('audio')[0].paused ){
					console.log('We now have a connection, stop the alarm!');
					$('audio')[0].pause();
				}
			}
			if( scrollheight > 500 ) $('.ping-message').scrollTop( scrollheight );
			count++;
			
			setTimeout(function(){		
				do_ajax();		
				//run_ajax_timeout();
			}, interval);
		}
	});
}