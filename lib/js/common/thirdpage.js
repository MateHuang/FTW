$(function () {
    $.ajax({
        // url: "https://ftw.la/api/get_recent_posts/?callback=CALLBACK&per_page=1&page=2",
        url: "https://ftw.la/api/get_recent_posts/?callback=CALLBACK&json=1&p=296",
        type: "POST",   //post请求方式
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            console.log(data);

            var result = JSON.stringify(data);
            // $("#text").val(result);

            var ohtml="";
            var fObj=(data.post);

            // alert(fObj[0].content);
            $("#article").prepend(fObj.content);
            $("#title").prepend(fObj.title);

        }
    });
});

var app = angular.module('myApp',['ngRoute']);

// angular.module('routingDemoApp',['ngRoute'])
// app.config(['$routeProvider', function($routeProvider){
//         $routeProvider
//             .when('/intro_1',{templateUrl:'./lib/html/second_1.htm'})
//             .when('/intro_2',{templateUrl:'./lib/html/second_2.htm'})
//             .when('/intro_3',{templateUrl:'./lib/html/second_3.htm'})
//             .otherwise({templateUrl:'./lib/html/second_1.htm'});
//     }]);


app.controller('ctl1', function($scope,$http) {
    $scope.selectednav="nav1";

    $scope.loadcontext=function (id) {
        $.ajax({
            // url: "https://ftw.la/api/get_recent_posts/?callback=CALLBACK&per_page=1&page=2",
            url: "https://ftw.la/api/get_recent_posts/?callback=CALLBACK&json=1&p="+id,
            type: "POST",   //post请求方式
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                console.log(data);

                var result = JSON.stringify(data);
                // $("#text").val(result);

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
        "selected":true,
        "href":"secondpage.html#/intro_1",
        "title":"/ 短视频",
        "items":["产品主图","视频宣传片","微电影"],
        "success":[{"name":"短akplayer","url":"273"},
            {"name":"短nancy的传奇","url":"271"},
            {"name":"短妖精的口袋","url":"269"},
            {"name":"短天谜女装","url":"267"},
            {"name":"短诺诗兰户外","url":"264"}]
        },
        {
            "id":"nav2",
            "selected":false,
            "href":"secondpage.html#/intro_2",
            "title":"/ 电商摄影",
            "items":["产品静物拍摄","产品模特拍摄","画册拍摄"],
            "success":[{"name":"点akplayer","url":"273"},
                {"name":"点nancy的传奇","url":"271"},
                {"name":"3妖精的口袋","url":"269"},
                {"name":"3天谜女装","url":"267"},
                {"name":"3诗兰户外","url":"264"}]
        },
        {
            "id":"nav3",
            "selected":false,
            "href":"secondpage.html#/intro_3",
            "title":"/ 视觉设计",
            "items":["vi体系设计","电商视觉设计","ui设计","H5页面设计"],
            "success":[{"name":"点akplayer","url":"273"},
                {"name":"6nancy的传奇","url":"271"},
                {"name":"6妖精的口袋","url":"269"},
                {"name":"6天谜女装","url":"267"},
                {"name":"6诗兰户外","url":"264"}]
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
