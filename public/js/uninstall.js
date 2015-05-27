(function() {

	bindListener();

	function bindListener() {
		$('#uninsSubmit').bind('click', function(event) {
			var value = $('textarea').val().replace(/\n/g, '*');

			if (value == '') {
				alert('删除列表为空');
				return;
			}

			$.get('apkm/uninstall?content=' + value)
				.success(function(ret) {
					if (ret.code == 1) {
						alert('删除列表保存成功');
					}
				})
				.error(function() {
					console.log('UNINSTALL failed.');
				});
		});

		$('#uninsReset').bind('click', function(event) {
			$('textarea').val('');
			$('textarea').focus();
		});

		$('#uninsCheck').bind('click', function(event) {
			$.get('uninstall')
				.success(function(ret) {
					var list = '';
					for( var i = 0, len = ret.list.length; i < len; i++ ){
						list += ret.list[i]['package_name'] + '\n';
					}
					alert(list);
				})
				.error(function() {
					console.log('UNINSTALL failed.');
				});
		});
	}
})();