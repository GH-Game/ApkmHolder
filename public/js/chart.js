(function() {
  var data = JSON.parse($('#data').html()).data;

  var ykeys = ['sn', 'sn_gh', 'sn_9u', 'sn_360', 'sn_baidu', 'fk', 'fk_360', 'fk_baidu', 'dt', 'pkq', 'xxj', 'hhw'],
      labels = ['少年三国志', '少年三国志(公会)', '少年三国志(9u)', '少年三国志(360)', '少年三国志(百度)', '放开那三国', '放开那三国(360)', '放开那三国(百度)', '刀塔传奇', '去吧皮卡丘', '新仙剑奇侠传', '航海王', ];
      lineColors = ['#0b62a4', '#7A92A3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed', '#0b62a4', '#7A92A3', '#4da74d', '#afd8f8', '#edc240'];

  var map = {
    sn: {
      info: '少年三国志',
      color: '#0b62a4'
    },
    sn_gh: {
      info: '少年三国志(公会)',
      color: '#7A92A3'
    },
    sn_9u: {
      info: '少年三国志(9u)',
      color: '#4da74d'
    },
    sn_360: {
      info: '少年三国志(360)',
      color: '#afd8f8'
    },
    sn_baidu: {
      info: '少年三国志(百度)',
      color: '#edc240'
    },
    fk: {
      info: '放开那三国',
      color: '#cb4b4b'
    },
    fk_360: {
      info: '放开那三国(360)',
      color: '#9440ed'
    },
    fk_baidu: {
      info: '放开那三国(百度)',
      color: '#0b62a4'
    },
    dt: {
      info: '刀塔传奇',
      color: '#7A92A3'
    },
    pkq: {
      info: '去吧皮卡丘',
      color: '#4da74d'
    },
    xxj: {
      info: '新仙剑奇侠传',
      color: '#afd8f8'
    },
    hhw: {
      info: '航海王',
      color: '#edc240'
    }
  };

  refreshChart();

  $('input[type=checkbox]').bind('click', function(e) {
    var _this = $(this),
      value = _this.attr('data');

    if (!!_this.attr('checked')) {
      _this.removeAttr('checked');
    } else {
      _this.attr('checked', 'true');
    }

    var list = $('input[type=checkbox]');

    // 清空列表
    ykeys = [], labels = [], lineColors = [];

    for (var i = 0, len = list.length; i < len; i++) {
      if ($(list[i]).attr('checked')) {
        var key = $(list[i]).attr('data');

        ykeys.push(key);
        labels.push(map[key].info);
        lineColors.push(map[key].color);
      }
    }

    refreshChart();
  });

  function refreshChart() {
    $('#chart-container').html('<div id="chart" style="height: 400px;"></div>');

    new Morris.Line({
      element: 'chart',
      data: data,
      xkey: 'date',
      ykeys: ykeys,
      labels: labels,
      lineColors: lineColors
    });
  }
})();