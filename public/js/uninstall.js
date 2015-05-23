(function() {

	bindListener();
	animation(); //  Animation of animal

	function bindListener() {
		$('#unins-submit').bind('click', function(event) {
			var value = $('textarea').val().replace(/\n/g, '*');

			if (value == '') {
				alert('删除列表为空');
				return;
			}

			$.get('uninstall?content=' + value)
				.success(function(ret) {
					if (ret.code == 1) {
						alert('删除列表保存成功');
					}
				})
				.error(function() {
					console.log('UNINSTALL failed.');
				});
		});

		$('#unins-reset').bind('click', function(event) {
			$('textarea').val('');
			$('textarea').focus();
		});
	}

	function animation() {
		var sleepImg = new Image(),
			wakeImg = new Image();

		sleepImg.src = './img/sleep.jpg';
		wakeImg.src = './img/start.jpg';

		var timer = setInterval(function() {

			setTimeout(wake, 100);
			setTimeout(sleep, 1000);

		}, 5000);

		function sleep() {
			$('#logo').attr('src', sleepImg.src);
		}

		function wake() {
			$('#logo').attr('src', wakeImg.src);
		}
	}
})();