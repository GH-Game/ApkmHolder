(function() {

	setOpInfo();
	bindListener();
	animation(); //  Animation of animal

	function bindListener() {
		$('#submit').bind('click', function(event) {
			var value = $('#apk').val();

			if (value == '') {
				alert('apk文件为空');
				return;
			} else {
				var path = value.toLowerCase(),
					filename = path.substring(path.lastIndexOf('\\') + 1, path.lastIndexOf('.')),
					ext = path.substring(path.lastIndexOf('.') + 1, path.length);

				if (isChinese(filename)) {
					alert('文件名只支持中文');
					return;
				}
				if (ext != 'apk') {
					alert('只支持apk文件');
					return;
				}
			}

			// Upload apk
			$.ajaxFileUpload({
				url: 'http://localhost:3001/upload', // Env PORT
				// url: 'http://192.168.2.99:3001/upload', // Env PORT
				secureuri: false,
				fileElementId: "apk", // INPUT's name
				dataType: 'json',
				success: function(data) {
					alert("UPLOAD success");

					setOpInfo();

					// 重新绑定
					$('#apk').bind('change', function(event) {
						var _this = $(this);

						if (_this.val() != '') {
							var path = _this.val().toLowerCase();
							fileName = path.substring(path.lastIndexOf('\\') + 1, path.length);

							$('#fileName').text(fileName);
						}
					});
				},
				error: function(data, status, e) {
					if (e.code == 18) {
						console.log('WARNING cross-domain upload.');
					} else {
						alert('UPLOAD failed');
						console.log(e);
					}
				}
			});
		});

		$('#clear').bind('click', function(event) {});

		$('#apk').bind('change', function(event) {
			var _this = $(this);

			if (_this.val() != '') {
				var path = _this.val().toLowerCase();
				fileName = path.substring(path.lastIndexOf('\\') + 1, path.length);

				$('#fileName').text(fileName);
			}
		});
	}

	function print(info) {
		if (typeof info == 'string') {
			$('#resp_info').text(info);
		} else if (typeof info == 'object') {

			$('#resp_info').empty();

			var apkTable = $('<table>').addClass('table table-hover');
			var thead = '<thead><tr><th>#</th><th>包名</th><th>文件名</th><th>操作类型</th><th>上传时间</th><th></th></tr></thead>';

			apkTable.append(thead);

			var list = info.list;

			if (list.length == 0) {
				var apkRow = $('<tr>');
				var apkid = $('<td>').text(0),
					pname = $('<td>').text('暂无包名'),
					fname = $('<td>').text('暂无文件'),
					delTd = $('<td>').text('');

				apkRow.append(apkid);
				apkRow.append(pname);
				apkRow.append(fname);
				apkRow.append(delTd);

				apkTable.append(apkRow);
			} else {
				for (var i = 0, len = list.length; i < len; i++) {
					var apkRow = $('<tr>').addClass('apkRow');
					var apkid = $('<td>').text(i + 1).addClass('apkid'),
						pname = $('<td>').text(list[i].package_name).addClass('pname'),
						fname = $('<td>').text(list[i].file_name).addClass('fname'),
						optype = $('<td>').addClass('optype'),
						time = $('<td>').text(list[i].time).addClass('time'),
						ins = $('<td>'),
						unins = $('<td>'),
						delTd = $('<td>'),
						insBtn = $('<a>').text('⬆').addClass('op no-choose btn btn-primary'),
						uninsBtn = $('<a>').text('⬇').addClass('op no-choose btn btn-warning'),
						delBtn = $('<a>').text('×').addClass('op no-choose btn btn-danger');

					switch (list[i].op_type) {
						case 0:
							optype.text('我只想一个人静静');
							delBtn.removeClass('no-choose');
							break;
						case 1:
							optype.text('主人，安装我吧');
							insBtn.removeClass('no-choose');
							break;
						case 2:
							optype.text('快来卸载我');
							uninsBtn.removeClass('no-choose');
							break;
					}

					delTd.append(insBtn);
					delTd.append(uninsBtn);
					delTd.append(delBtn);

					apkRow.append(apkid);
					apkRow.append(pname);
					apkRow.append(fname);
					apkRow.append(optype);
					apkRow.append(time);
					apkRow.append(delTd);

					(function(pname) {
						delBtn.bind('click', function() {
							$.get('delete?pname=' + pname)
								.success(function(data) {
									console.log('DELETE success.');
									print(data);
								})
								.error(function() {
									console.log('DELETE failed.');
								});
						});

						insBtn.bind('click', function() {
							$.get('update?pname=' + pname + '&op=1')
								.success(function(data) {
									console.log('UPDATE success.');
									print(data);
								})
								.error(function() {
									console.log('UPDATE failed.');
								});
						});

						uninsBtn.bind('click', function() {
							$.get('update?pname=' + pname + '&op=2')
								.success(function(data) {
									console.log('UPDATE success.');
									print(data);
								})
								.error(function() {
									console.log('UPDATE failed.');
								});
						});

					})(pname.text());

					apkTable.append(apkRow);
				}
			}

			$('#resp_info').append(apkTable);
		}
	}

	function setOpInfo() {
		// Empty filename text
		$('#fileName').text('');

		$.get('getops')
			.success(function(ops) {
				console.log('PULL success.');
				print(ops);
			})
			.error(function() {
				console.log('PULL failed.');
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

	function isChinese(str) {
		var reg = /^[\u4E00-\u9FA5]{2,4}$/i;
		return reg.test(str);
	}
})();