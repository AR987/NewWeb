jQuery.fn.myPlugin = function(){
	var settings = {
				"level1": {
					"ducks_number": 2,
					"ducks_killed": 0,
					"ducks_missed": 0,
					"dots_number": 3,
					"ammo": 3,
					"timer": 3000
				},
				"level2": {
					"ducks_number": 3,
					"ducks_killed": 0,
					"ducks_missed": 0,
					"dots_number": 3,
					"ammo": 5,
					"timer": 2500
				},
				"level3": {
					"ducks_number": 5,
					"ducks_killed": 0,
					"ducks_missed": 0,
					"dots_number": 4,
					"ammo": 7,
					"timer": 1500
				},
			};
			var level = 0;
			var ammo = 0;
			function getRandomInt(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min)) + min;
			}
			function playTheGame() {
				level++;
				if (typeof settings['level'+level] != 'undefined') {
					ammo = settings['level'+level]['ammo'];
					$('.welcome').hide();
					$('.ammo').css('opacity', '1');
					$('.ammo').html('');
					for (var i = 0; i < ammo; i++) {
						$('.ammo').append('<div></div>');
					}
					$('.level h1').html('Уровень '+level);
					$('.level p').html('');
					$('.level').slideDown(200).delay(2000).slideUp(200);
					setTimeout(function() {
						for (var j = 0; j < settings['level'+level]['ducks_number']; j++) {
							$('.hunt-field').append('<div class="duck" id="duck'+j+'"></div>');
							for (var i = 0; i < settings['level'+level]['dots_number']; i++) {
								var x = $('.hunt-field').width() - getRandomInt(100, $('.hunt-field').width() - 100);
								var y = $('.hunt-field').height() - getRandomInt(100, $('.hunt-field').height() - 100);
								var delta = getRandomInt(-500, 500);
								$('#duck'+j).animate({top: y, left: x}, settings['level'+level]['timer'] + delta);
							}
							var x = $('.hunt-field').width() - getRandomInt(100, $('.hunt-field').width() - 100);
							var delta = getRandomInt(-500, 500);
							$('#duck'+j).animate({top: "-160px", left: x}, settings['level'+level]['timer'] + delta, function() {
								$(this).remove();
								settings['level'+level]['ducks_missed']++;
								if ($('.duck').length < 1) {
									$('.level h1').html('Уровень '+level);
									$('.level p').html('Убито уток: '+settings['level'+level]['ducks_killed']+', уток улетело: '+settings['level'+level]['ducks_missed']);
									$('.level').slideDown(200).delay(2000).slideUp(200);
									setTimeout(function() {
										playTheGame();
									}, 2400);
								}
							});
						}
					}, 2400);
				} else {
					var total_killed = 0;
					var total_missed = 0;
					for (var i = 1; i < level; i++) {
						$('.game-over .stats').append('<p><strong>Уровень '+i+'</strong> - убито уток: '+settings['level'+i]['ducks_killed']+', уток улетело: '+settings['level'+i]['ducks_missed']+'</p>');
						total_killed += settings['level'+i]['ducks_killed'];
						total_missed += settings['level'+i]['ducks_missed'];
						settings['level'+i]['ducks_killed'] = 0;
						settings['level'+i]['ducks_missed'] = 0;
					}
					$('.game-over .stats').append('<p><strong>Всего уток убито: '+total_killed+'</p>');
					$('.game-over .stats').append('<p><strong>Всего уток улетело: '+total_missed+'</p>');
					$('.game-over').slideDown(200);
					level = 0;
				}
			}
			$('.hunt-field').on('click', function() {
				if (ammo > -1) {
					ammo--;
					$('.ammo div').eq(ammo).remove();
				}
				if (ammo < 0) {
					$('.ammo div').html('');
				}
				if (level < 1) {
					playTheGame();
				}
			});
			$('#reset').on('click', function() {
				level = 0;
				ammo = 0;
				$('.game-over').slideUp(200);
				$('.game-over p').remove();
			});
			$(document).on('click', '.duck', function() {
				if (ammo > -1) {
					$(this).clearQueue();
					$(this).stop();
					$(this).css('background', 'url(img/dead.gif)');
					$(this).animate({top: "100%"}, 1000, function() {
						$(this).remove();
						settings['level'+level]['ducks_killed']++;
						if ($('.duck').length < 1) {
							$('.level h1').html('Уровень '+level);
							$('.level p').html('Убито уток: '+settings['level'+level]['ducks_killed']+', уток улетело: '+settings['level'+level]['ducks_missed']);
							$('.level').slideDown(200).delay(2000).slideUp(200);
							setTimeout(function() {
								playTheGame();
							}, 2400);
						}
					});
				}
			});
};