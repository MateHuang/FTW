var app = angular.module('myApp',['ngRoute']);

// angular.module('routingDemoApp',['ngRoute'])
app.config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/intro_1',{templateUrl:'./lib/html/second_1.htm'})
            .when('/intro_2',{templateUrl:'./lib/html/second_2.htm'})
            .when('/intro_3',{templateUrl:'./lib/html/second_3.htm'})
            .otherwise({redirectTo:'/'});
    }]);


app.controller('ctl1', function($scope) {
    //ajax 获取到图片视频信息
    $scope.left_nav =[{
        "id":"nav1",
        "href":"intro_1",
        "title":"/ 短视频",
        "items":["产品主图","视频宣传片","微电影"]
        },
        {
            "id":"nav2",
            "href":"intro_2",
            "title":"/ 电商摄影",
            "items":["产品静物拍摄","产品模特拍摄"]
        },
        {
            "id":"nav3",
            "href":"intro_3",
            "title":"/ 视觉设计",
            "items":["vi体系设计","电商视觉设计","ui设计","H5页面设计"]
        }];

    //提交信息


});
