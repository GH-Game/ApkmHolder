(function() {

	bindListener();

	function bindListener() {
		$('#hhSubmit').bind('click', function(event) {
			var value = $('#hhFile').val();

			if (value == '') {
				alert('喊话内容文件为空');
				return;
			} else {
				var path = value.toLowerCase(),
					filename = path.substring(path.lastIndexOf('\\') + 1, path.lastIndexOf('.')),
					ext = path.substring(path.lastIndexOf('.') + 1, path.length);

				if (ext != 'txt') {
					$('#hhName').text('');
					alert('只支持txt文件');
					return;
				}
			}

			$.ajaxFileUpload({
				url: '/apkm/settext?type=1', 
				secureuri: false,
				fileElementId: "hhFile", // INPUT's name
				dataType: 'json',
				success: function(data) {
					if(data.code == 1){
						alert('喊话内容上传成功');
					}

					// 重新绑定
					$('#hhName').text('');
					$('#hhFile').bind('change', function(event) {
						var _this = $(this);

						if (_this.val() != '') {
							var path = _this.val().toLowerCase();
							fileName = path.substring(path.lastIndexOf('\\') + 1, path.length);

							$('#hhName').text(fileName);
						}
					});
				},
				error: function(data, status, e) {
					if (e.code == 18) {
						console.log('WARNING cross-domain upload.');
					} else {
						alert(data.descrip);
						console.log(e);
					}
				}
			});
		});

		$('#wbSubmit').bind('click', function(event) {
			var value = $('#wbFile').val();

			if (value == '') {
				alert('喊话内容文件为空');
				return;
			} else {
				var path = value.toLowerCase(),
					filename = path.substring(path.lastIndexOf('\\') + 1, path.lastIndexOf('.')),
					ext = path.substring(path.lastIndexOf('.') + 1, path.length);

				if (ext != 'txt') {
					$('#wbName').text('');
					alert('只支持txt文件');
					return;
				}
			}

			$.ajaxFileUpload({
				url: '/apkm/settext?type=2', 
				secureuri: false,
				fileElementId: "wbFile", // INPUT's name
				dataType: 'json',
				success: function(data) {
					if(data.code == 1){
						alert('手机文本上传成功');
					}

					// 重新绑定
					$('#wbName').text('');
					$('#wbFile').bind('change', function(event) {
						var _this = $(this);

						if (_this.val() != '') {
							var path = _this.val().toLowerCase();
							fileName = path.substring(path.lastIndexOf('\\') + 1, path.length);

							$('#wbName').text(fileName);
						}
					});
				},
				error: function(data, status, e) {
					if (e.code == 18) {
						console.log('WARNING cross-domain upload.');
					} else {
						alert(data.descrip);
						console.log(e);
					}
				}
			});
		});

		$('#hhFile').bind('change', function(event) {
			var _this = $(this);

			if (_this.val() != '') {
				var path = _this.val().toLowerCase();
				fileName = path.substring(path.lastIndexOf('\\') + 1, path.length);
				$('#hhName').text(fileName);
			}
		});

		$('#wbFile').bind('change', function(event) {
			var _this = $(this);

			if (_this.val() != '') {
				var path = _this.val().toLowerCase();
				fileName = path.substring(path.lastIndexOf('\\') + 1, path.length);
				$('#wbName').text(fileName);
			}
		});

		$('#hhCheck').bind('click', function(event) {
			$.get('gettext?type=1')
				.success(function(ret){
					alert(ret.data);
				})
				.error(function(){
					alert('喊话内容查看失败！')
				});
		});

		$('#wbCheck').bind('click', function(event) {
			$.get('gettext?type=2')
				.success(function(ret){
					alert(ret.data);
				})
				.error(function(){
					alert('手机文本查看失败！')
				});
		});
	}
})();