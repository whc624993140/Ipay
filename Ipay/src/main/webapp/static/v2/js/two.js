//$(function () {
//
//    $('#two').highcharts({
//
//            chart: {
//
//        type: 'pie' //图表类型还是pie图
//
//    },
//
//    plotOptions: {
//
//        pie: {
//
//            innerSize: '60' //也可以配置为10%的百分比形式
//
//        }
//
//    },
//
//    credits:{
//
//
//
//    },
//
//    series: [{
//
//            data: [
//
//            ['Firefox',   44.2],
//
//            ['IE7',       26.6],
//
//            ['IE6',       20],
//
//            ['Chrome',    3.1],
//
//            ['Other',    5.4]
//
//    ]
//
//}]
//});
//});


$(function () {

    $('#two').highcharts({

            chart: {

        type: 'pie'



    },

    title:{

        text:"圆环示例图"

    },

    plotOptions: {

        pie: {

            size:130,//图表直径大小

            borderColor:null,

            dataLabels: {

                distance:-60,

                formatter:function(){

                    if(this.point.name == "Firefox")

                    return "";

                else

                    return this.percentage.toFixed(2)+"%";

                },

                style:{

                    fontSize:"20px"

                }

            },

            innerSize:'75%',

            colors: [

                '#8bbc21',

                '#0d233a'

            ]

        }

    },

    tooltip:{

        enabled:false

    },

    credits:{



        style:{

            color:"#ffffff"

        }

    },

    series: [{

            data: [

            ['Firefox',   44.2],

            ['IE7',       6.6]

    ]

}]

},function(chart){

//在图表内的指定位置画一个圆

//第一个参数表示圆心距离图表左侧边缘的距离值

//第二个参数表示圆心距离图表上侧边缘的距离值

//第三个参数表示圆半径大小

//    chart.renderer.circle(200, 212, 115).attr({
//
//            fill: '#1aadce',
//
//    stroke: 'black',
//
//    'stroke-width': 0
//
//}).add();

});

});