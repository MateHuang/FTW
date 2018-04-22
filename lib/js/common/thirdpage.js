$(function () {
    var id=-1;

    //根据url获取id
    var name,value;
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?")
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            if(arr[i].substring(0,num)=='id')
                id=arr[i].substr(num+1);
        }
    }


    $.ajax({
        url: "https://ftw.la/api/get_recent_posts/?callback=CALLBACK&json=1&p="+id,
        type: "POST",   //post请求方式
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            console.log(data);

            var result = JSON.stringify(data);

            var ohtml="";
            var fObj=(data.post);

            $("#article").prepend(fObj.content);
            $("#title").prepend(fObj.title);
        }
    });
});

var app = angular.module('myApp',['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/intro_1',{templateUrl:'./lib/html/second_1.htm'})
        .when('/intro_2',{templateUrl:'./lib/html/second_2.htm'})
        .when('/intro_3',{templateUrl:'./lib/html/second_3.htm'})
        .otherwise({templateUrl:'./lib/html/second_1.htm'});
}]);

app.controller('ctl1', function($scope,$location) {
    // var name="";
    // var num=-1;
    // var numm=$location.url();
    //
    // // alert(numm);
    // var arr=numm.split("&");
    // for(var i=0;i < arr.length;i++){
    //     num=arr[i].indexOf("=");
    //     debugger;
    //     if(num>0){
    //         if(arr[i].substring(0,num).indexOf('name')!=-1)
    //             name=arr[i].substr(num+1);
    //     }
    // }





    $scope.selectednav="nav2";

    $scope.loadcontext=function (id) {
        $.ajax({
            url: "https://ftw.la/api/get_recent_posts/?callback=CALLBACK&json=1&p="+id,
            type: "POST",   //post请求方式
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                console.log(data);

                var result = JSON.stringify(data);
                var ohtml="";
                var fObj=(data.post);

                // alert(fObj[0].content);
                $("#article").html(fObj.content);
                $("#title").html("").prepend(fObj.title);

            }
        });
    }

    //ajax 获取到图片视频信息
    $scope.left_nav =[{
        "id":"nav1",
        "selected":false,
        "href":"secondpage.html#/intro_1",
        "title":"/ 短视频",
        "items":["产品主图","视频宣传片","微电影"],
        "success":[{"name":"短akplayer","url":"792"},
            {"name":"短nancy的传奇","url":"794"},
            {"name":"短妖精的口袋","url":"796"},
            {"name":"短天谜女装","url":"798"},
            {"name":"短诺诗兰户外","url":"800"}]
        },
        {
            "id":"nav2",
            "selected":true,
            "href":"secondpage.html#/intro_2",
            "title":"/ 电商摄影",
            "items":["产品静物拍摄","产品模特拍摄","画册拍摄"],
            "success":[{"name":"点akplayer","url":"802"},
                {"name":"点nancy的传奇","url":"804"},
                {"name":"3妖精的口袋","url":"806"},
                {"name":"3天谜女装","url":"808"},
                {"name":"3诗兰户外","url":"810"}]
        },
        {
            "id":"nav3",
            "selected":false,
            "href":"secondpage.html#/intro_3",
            "title":"/ 视觉设计",
            "items":["vi体系设计","电商视觉设计","ui设计","H5页面设计"],
            "success":[{"name":"点akplayer","url":"792"},
                {"name":"6nancy的传奇","url":"794"},
                {"name":"6妖精的口袋","url":"796"},
                {"name":"6天谜女装","url":"800"},
                {"name":"6诗兰户外","url":"802"}]
        }];

    $scope.hoverevent=function (id) {

    }

    $scope.leaveevent=function () {
        // 改变样式
        angular.forEach($scope.left_nav,function (value,key) {
            if(value.id==$scope.selectednav){
                value.selected=true;
            }
            else {
                value.selected=false;
            }
        });
    }


    $scope.jumpto=function (url,id) {
        // 改变样式
        angular.forEach($scope.left_nav,function (value,key) {
            if(value.id==id){
                value.selected=true;
                $scope.selectednav=id;
            }
            else {
                value.selected=false;
            }
        });

        //缓慢返回顶部
        $('html,body').stop().animate({scrollTop: '0px'}, 1000);

    }

    //提交信息


});
