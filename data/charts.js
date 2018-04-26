function chart1() {
//With credit to https://forum.highcharts.com/highcharts-usage/treemap-using-csv-t36898/
$.ajax({
    url: 'http://tsypoc.ddns.net/data/tree.csv',
    success: function (csv) {	

	$('#chart1').highcharts({
        data: {
          csv: csv,
		  complete: function(options) {
        var seriesOp = $.extend(true, [], options.series),
          pointsLength = seriesOp[0].data.length,
          newData = [];

        options.series = [];
        for (var i = 0; i < pointsLength; i++) {
		
          newData.push({
            name: seriesOp[0].data[i][0],
            id: seriesOp[0].data[i][1],
            parent: seriesOp[1].data[i][1],
            value: seriesOp[2].data[i][1]
          });
        }
		
        var newSeries = {
          name: 'Description',
          data: newData
        };

        options.series.push(newSeries);
      }
    },
	plotOptions: {
		series: {
			colorByPoint: true
        }
		},
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      allowDrillToNode: true,
      levelIsConstant: false,
      dataLabels: {
        enabled: false
      },
      levels: [{
        level: 1,
        layoutAlgorithm: 'sliceAndDice',
        dataLabels: {
          enabled: true
        }
      }]
    }],
    title: {
      text: 'Budget Result'
    },
	exporting: {
	  buttons: {
       contextButton: {
        align: 'left'//,
        //x: 50
		}
	  }
	}
  });
  }
});
}

function chart2() {	
$.ajax({
    url: 'http://tsypoc.ddns.net/data/3.1.csv',
    success: function (csv) {	
	
	
	$('#chart2').highcharts({
        chart: {
            type: 'line'
        },
        data: {
            csv: csv
        },
        title: {
            text: 'Chart 3.1: Modest wages growth and inflation pressures'
        },
		tooltip: {
			valueSuffix: '%'
		},
		plotOptions: {
        series: {
			label: {
                enabled: false
			},			
            marker: {
                enabled: false
            }
        },
		},
		series: [{
			color: 'rgb(5,121,185)'
			}, {
			color: 'rgb(149,193,31)'
		}],
        yAxis: {
            title: {
                text: 'Per cent, through the year'
            },
			labels: {
				format: '{value}%'
			}
        }
	});
 }
});
}

function chart3() {
$.ajax({
    url: 'http://tsypoc.ddns.net/data/3.3.csv',
    success: function (csv) {	
	
	
	$('#chart3').highcharts({
        chart: {
            type: 'area'
        },
        data: {
            csv: csv
        },
        title: {
            text: 'Chart 3.3: Infrastructure delivered by public and private sectors'
        },
		tooltip: {
			pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:,.0f} million ({point.percentage:.1f}%)</b><br/>',
			split: true,
			valueSuffix: ' million'
		},
		plotOptions: {
		area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
		},
        series: {
			label: {
                enabled: false
			},			
            marker: {
                enabled: false
            }
        },
		},
		series: [{
			color: 'rgb(149,193,31)'
			}, {
			color: 'rgb(5,121,185)'
		}],
        yAxis: {
            title: {
                text: '$ Billion, Annual Sum'
            },
			labels: {
            formatter: function () {var label = 
                this.value / 1000;
			return label+'B'}
			}
		}
	});
 }
});
}

function chart4 () {
$.ajax({
    url: 'http://tsypoc.ddns.net/data/3.9.csv',
    success: function (csv) {	
	
	
	$('#chart4').highcharts({
        chart: {
            type: 'column'
        },
        data: {
            csv: csv
        },
        title: {
            text: 'Chart 3.9: Services the driver of regional employment'
        },
		tooltip: {
			pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:,.1f}%</b><br/>'
			//split: true
		},
		plotOptions: {
		column: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
		},
        series: {
			label: {
                enabled: false
			},			
            marker: {
                enabled: false
            }
        },
		},
		series: [{
			color: 'rgb(149,193,31)'
			}, {
			color: 'rgb(37,169,225)'
			}, {
			color: 'rgb(87,81,77)'
			}, {
			color: 'rgb(5,121,185)'
			}, {
			color: 'rgb(29,50,120)',
			type: 'line'
		}],
        yAxis: {
            title: {
                text: 'Per Cent, Annual Average'
            },
			labels: {
				format: '{value}%'
			}
        }
	});
 }
});
}

function chart5() {
$.ajax({
    url: 'http://tsypoc.ddns.net/data/3.10.csv',
    success: function (csv) {	

	$('#chart5').highcharts({	
        chart: {
            type: 'line'
        },
        data: {
            csv: csv
        },
        title: {
            text: 'Chart 3.10: As the national labour market tightens, NSW wages will lift'
        },
		tooltip: {
			valueSuffix: '%'
		},
		plotOptions: {
		series: {
			label: {
                enabled: false
			},			
            marker: {
                enabled: false
            },
			zoneAxis: 'x',
			zones: [{
				value: 1496275200000
			}, {
				dashStyle: 'dot'
			}]
        }
		},
		series: [{
			color: 'rgb(5,121,185)',
			connectNulls: true
			}, {
			color: 'rgb(149,193,31)',
			connectNulls: true,
			yAxis: 1
		}],
        xAxis: [{
			//investigate why date doesn't parse correctly?
			type: 'datetime',
			labels: {
            formatter: function() {
                return Highcharts.dateFormat('%b %Y', this.value);}},
			plotLines: [{
			color: 'red', 
			dashStyle: 'dot',
			label: { 
				text: 'Forecast',
				align: 'left'
			},			
			value: 1496275200000, 
			width: 2 
			}]
		}],
		yAxis: [{ // Primary yAxis
        title: {
            text: 'NSW Wage Price Index',
            style: {
                color: 'rgb(5,121,185)'
            }
        },
		labels: {
            format: '{value}%',
            style: {
                color: 'rgb(5,121,185)'
            }
		},
    }, { // Secondary yAxis
        title: {
            text: 'National Unemployment Gap',
            style: {
                color: 'rgb(149,193,31)'
            }
        },
		labels: {
            format: '{value}%',
            style: {
                color: 'rgb(149,193,31)'
            }
		},
        reversed: true,
		opposite: true
    }],
	});
 }
});
}	
	
	
	