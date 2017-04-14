
var g1 = 0;
var g2 = 0;
var gP1 = 0; 
var gP2 = 0;
var gP1A = 0; 
var gP2A = 0;
var tP1 = 0; 
var tP2 = 0;  
var tP1A = 0; 
var tP2A = 0;
var sP1 = 0; 
var sP2 = 0;  
var sP1A = 0; 
var sP2A = 0; 
var dP1 = 0; 
var dP2 = 0;
var dP1A = 0; 
var dP2A = 0; 
const M = 21;	
const hst = 0.13;

function transform() {
// "+" keeps var a number type and doesn't turn it into a string
	var m1 = +document.getElementById("month1").value;	
	var d1 = +document.getElementById("day1").value;
	var y1 = +document.getElementById("year1").value;
	var m2 = +document.getElementById("month2").value;
	var d2 = +document.getElementById("day2").value;
	var y2 = +document.getElementById("year2").value;
	
	var g1 = +document.getElementById("gas1_m3").value;
	var g2 = +document.getElementById("gas2_m3").value;
	
	var gP1 = (+document.getElementById("gas1price").value)/100;
	var gP2 = (+document.getElementById("gas2price").value)/100;
	var gP1A = (+document.getElementById("gas1priceA").value)/100;
	var gP2A = (+document.getElementById("gas2priceA").value)/100;
	
	var tP1 = (+document.getElementById("trans1price").value)/100;
	var tP2 = (+document.getElementById("trans2price").value)/100;
	var tP1A = (+document.getElementById("trans1priceA").value)/100;
	var tPA2 = (+document.getElementById("trans2priceA").value)/100;
	
	var sP1 = (+document.getElementById("stor1price").value)/100;
	var sP2 = (+document.getElementById("stor2price").value)/100;
	var sP1A = (+document.getElementById("stor1priceA").value)/100;
	var sP2A = (+document.getElementById("stor2priceA").value)/100;
	
	var dP1 = (+document.getElementById("del1price").value)/100;
	var dP2 = (+document.getElementById("del2price").value)/100;
	var dP1A = (+document.getElementById("del1priceA").value)/100;
	var dP2A = (+document.getElementById("del2priceA").value)/100;

	var usage = g1 + g2;
	var range = Math.ceil((new Date(y2, m2, d2) - new Date(y1, m1, d1)) / 86400000)
	var aveUsage = usage/range;
	
	var costTotal = ((g1 * gP1) + (g2 * gP2) + (g1 * gP1A) + (g2 * gP2A) + (g1 * tP1) + (g2 * tP2) + (g1 * tP1A) + (g2 * tP2A) + (g1 * sP1) + (g2 * sP2) + (g1 * sP1A) + (g2 * sP2A) + (g1 * dP1) + (g2 * dP2) + (g1 * dP1A) + (g2 * dP2A) + M ) * ( 1 + hst );
	
	var aveCost = costTotal/usage;
	
	var costGas = (g1 * gP1) + (g2 * gP2) + (g1 * gP1A) + (g2 * gP2A)
	var costRatio = (costGas/costTotal)*100
	
	document.getElementById("costAll").innerHTML = '$' + costTotal.toFixed(2);
	document.getElementById("costGas").innerHTML = '$' + costGas.toFixed(2);
	document.getElementById("costRemainder").innerHTML = '$' + (costTotal - costGas).toFixed(2);
	document.getElementById("aveUsage").innerHTML = aveUsage.toFixed(1) + ' m^3/day';
	document.getElementById("cost").innerHTML = (costGas*100/usage).toFixed(1) + ' cents/m^3';
	document.getElementById("totalCost").innerHTML = (costTotal*100/usage).toFixed(1) +' cents/m^3';
	document.getElementById("percent").innerHTML = costRatio.toFixed(0) + '%';

	var transportation = (tP1 + tP1A) * g1 + (tP2 + tP2A) * g2;
	var storage = (sP1 + sP1A) * g1 + (sP2 + sP2A) * g2;
	var delivery = (dP1 + dP1A) * g1 + (dP2 + dP2A) * g2;
	var tax = (costTotal / (1 + hst)) * hst;
	var gas = costGas;

	var monthlyFeeWidth = M*100/costTotal;
	var transportationWidth = transportation*100/costTotal;
	var storageWidth = storage*100/costTotal;
	var deliveryWidth = delivery*100/costTotal;
	var taxWidth = tax*100/costTotal;
	var gasWidth = gas*100/costTotal;

	Highcharts.chart('container', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    title: {
	        text: 'Cost Breakdown'
	    },
	    tooltip: {
	        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
	                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                style: {
	                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                }
	            }
	        }
	    },
	    series: [{
	        name: 'Brands',
	        colorByPoint: true,
	        data: [{
	            name: 'monthly fee',
	            y: monthlyFeeWidth
	        }, {
	            name: 'nat gas',
	            y: gasWidth,
	            sliced: true,
	            selected: true
	        }, {
	            name: 'storage',
	            y: storageWidth
	        }, {
	            name: 'delivery',
	            y: deliveryWidth
	        }, {
	            name: 'tax',
	            y: taxWidth
	        }, {
	            name: 'transportation',
	            y: transportationWidth
	        }]
	    }]
	});


};

