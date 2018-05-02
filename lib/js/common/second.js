//存储标签的值
function record(name, _this) {
    var a = $(_this).parent().attr(name);

    if ($(_this).parent().attr(name) == "0" || $(_this).parent().attr(name) == 'undefined')
        $(_this).parent().attr(name, 1);
    else
        $(_this).parent().attr(name, 0);
}

/**
 * JS评分效果
 */
function Score(options) {
    this.config = {
        selector: '.star',     // 评分容器
        renderCallback: null,        // 渲染页面后回调
        callback: null         // 点击评分回调
    };

    this.cache = {
        iStar: 0,
        iScore: 0
    };

    this.init(options);
}

Score.prototype = {

    constructor: Score,

    init: function (options) {
        this.config = $.extend(this.config, options || {});
        var self = this,
            _config = self.config,
            _cache = self.cache;

        self._renderHTML();
    },
    _renderHTML: function () {
        var self = this,
            _config = self.config;
        var html = '<span class="desc"></span>' +
            '<p class="star-p hidden"></p>';
        $(_config.selector).each(function (index, item) {
            $(item).append(html);
            $(item).wrap($('<div class="parentCls" style="position:relative"></div>'));
            var parentCls = $(item).closest('.parentCls');
            self._bindEnv(parentCls);
        });

    },
    _bindEnv: function (parentCls) {
        var self = this,
            _config = self.config,
            _cache = self.cache;

        $(_config.selector + ' li', parentCls).each(function (index, item) {

            // 鼠标移上
            // $(item).mouseover(function (e) {
            //     var offsetLeft = $('ul', parentCls)[0].offsetLeft;
            //     ismax(index + 1);
            // });

            // 鼠标移出
            // $(item).mouseout(function () {
            //     ismax();
            //     !$('p', parentCls).hasClass('hidden') && $('p', parentCls).addClass('hidden');
            // });

            // 鼠标点击
            // $(item).click(function (e) {
            //     var index = $(_config.selector + ' li', parentCls).index($(this));
            //     _cache.iStar = index + 1;
            //
            //     //赋值
            //     $(this).parents('.star').attr('data-score', index + 1);
            //
            //     !$('p', parentCls).hasClass('hidden') && $('p', parentCls).addClass('hidden');
            // });

        });

        function ismax(iArg) {
            _cache.iScore = iArg || _cache.iStar;
            var lis = $(_config.selector + ' li', parentCls);

            for (var i = 0; i < lis.length; i++) {
                lis[i].className = i < _cache.iScore ? "on" : "";
            }
        }
    }
};

//根据url获取id
function UrlSearch() {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            if (arr[i].substring(0, num) == 'custom_id')
                return arr[i].substr(num + 1);
        }
    }
    return "000000000";
}


$(function () {
    //获取url地址
    var custom_id = UrlSearch();

    var counter = 0;
    // 每页展示4个
    var num = 8;
    var pageStart = 0;
    var pageEnd = 0;

    $('#main').dropload({
        scrollArea: window,
        loadDownFn: function (me) {
            $.ajax({
                type: "POST",   //post请求方式
                jsonp: "callback",
                url: "//weixin8.xiaoheqingting.com/app/index.php?i=1&c=entry&id=2&do=GetSelectData&m=xc_tmall&custom_id=" + custom_id,
                dataType: 'jsonp',
                success: function (data) {
                    var ohtml = '';
                    counter++;
                    pageEnd = num * counter;
                    pageStart = pageEnd - num;

                    $('#name').html(data.message.custom_name);

                    var n = 0;

                    for (var i = pageStart; i < pageEnd; i++) {

                        console.log(data);

                        var value = data.message.selection[i];
                        var tags = value.chosen_tag;
                        // alert(tags);
                        var like = value.like;
                        var rate = value.rate;

                        var data_music = "0";
                        var data_style = "0";
                        var data_background = "0";
                        var data_struct = "0";
                        var data_mode = "0";
                        var data_copy = "0"

                        var array_tags = tags.split(",");

                        if ($.inArray("音乐", array_tags) > -1)
                            data_music = "1";
                        if ($.inArray("风格", array_tags) > -1)
                            data_style = "1";
                        if ($.inArray("背景", array_tags) > -1)
                            data_background = "1";
                        if ($.inArray("结构", array_tags) > -1)
                            data_struct = "1";
                        if ($.inArray("构图", array_tags) > -1)
                            data_mode = "1";
                        if ($.inArray("文案", array_tags) > -1)
                            data_copy = "1";

                        ohtml += '<div class="row col-lg-3 col-md-6 big_pic">\n' +
                            '    <div class="pic_area">\n' +
                            '        <div style="cursor: pointer;" class="pic_container video-box2" data-movie="' + value.video + '">\n' +
                            '            <video id="video' + i + '" preload="meta"\n' +
                            '                   style="-moz-box-shadow:-7px -6px 14px #333333; -webkit-box-shadow:-7px -6px 14px #333333; box-shadow:-7px -6px 14px rgb(193,190,183);"\n' +
                            '                   height="305px" width="100%">\n' +
                            '                <source src="' + value.video + '" type="video/mp4">\n' +
                            '                您的浏览器不支持 video 标签。\n' +
                            '            </video>\n' +
                            '        </div>\n' +
                            '        <p style="margin-top: 1.5rem;"><span style="color: rgb(68,184,199);">类目</span>' + value.tag + '</p>\n' +
                            '        <p class="title">' + value.title + '</p>\n' +
                            '        <div class="star" data-id="' + value.id + '" data-score="' + value.rate + '">\n' +
                            '            <ul>\n';

                        for (var k = 1; k < 6; k++) {
                            if (rate >= k) {
                                ohtml += '<li class="on"><a href="javascript:;">';
                                ohtml += k.toString();
                                ohtml += '</a></li>';
                            }
                            else {
                                ohtml += '<li><a href="javascript:;">';
                                ohtml += k.toString();
                                ohtml += '</a></li>';
                            }
                        }

                        ohtml += '            </ul>\n';


                        if (like == '1') {
                            ohtml += '<div style="cursor:pointer" class="heart heartAnimation" id="like" rel="unlike"></div>\n';
                        }
                        else {
                            ohtml += '<div style="cursor:pointer" class="heart" id="like" rel="like"></div>\n';
                        }


                        ohtml += '        </div>\n' +
                            '        <div class="pic_foot" data-music="' + data_music + '" data-style="' + data_style + '" data-back="' + data_background + '"\n' +
                            '             data-struct="' + data_struct + '" data-mode="' + data_mode + '"\n' +
                            '             data-copy="' + data_copy + '">\n' +
                            '            <div onclick="record(\'data-music\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">\n';

                        if (data_music == '1')
                            ohtml += '<div style="cursor:pointer" class="pic_hover">';
                        else
                            ohtml += '<div style="cursor:pointer" class="pic_foot_2">';

                        ohtml += '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span>\n' +
                            '                    <span class="pic_normal" style="margin-left: 0.2rem;">音乐</span>\n' +
                            '                </div>\n' +
                            '            </div>\n' +
                            '            <div onclick="record(\'data-style\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">\n';

                        if (data_style == '1')
                            ohtml += '<div style="cursor:pointer" class="pic_hover">';
                        else
                            ohtml += '<div style="cursor:pointer" class="pic_foot_2">';

                        ohtml += '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span>\n' +
                            '                    <span class="pic_normal" style="margin-left: 0.2rem;">风格</span>\n' +
                            '                </div>\n' +
                            '            </div>\n' +
                            '            <div onclick="record(\'data-back\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">\n';

                        if (data_background == '1')
                            ohtml += '<div style="cursor:pointer" class="pic_hover">\n';
                        else
                            ohtml += '<div style="cursor:pointer" class="pic_foot_2">\n';

                        ohtml += '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span>\n' +
                            '                    <span class="pic_normal" style="margin-left: 0.2rem;">背景</span>\n' +
                            '                </div>\n' +
                            '            </div>\n' +
                            '            <div onclick="record(\'data-struct\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">\n';


                        if (data_struct == '1')
                            ohtml += '<div style="cursor:pointer" class="pic_hover">\n';
                        else
                            ohtml += '<div style="cursor:pointer" class="pic_foot_2">\n';


                        ohtml += '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span>\n' +
                            '                    <span class="pic_normal" style="margin-left: 0.2rem;">结构</span>\n' +
                            '                </div>\n' +
                            '            </div>\n' +
                            '            <div onclick="record(\'data-mode\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">\n';

                        if (data_mode == '1')
                            ohtml += '<div style="cursor:pointer" class="pic_hover">\n';
                        else
                            ohtml += '<div style="cursor:pointer" class="pic_foot_2">\n';

                        ohtml += '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span>' +
                            '                    <span class="pic_normal" style="margin-left: 0.2rem;">构图</span>\n' +
                            '                </div>\n' +
                            '            </div>\n' +
                            '            <div onclick="record(\'data-copy\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">\n';

                        if (data_copy == '1')
                            ohtml += '<div style="cursor:pointer" class="pic_hover">\n';
                        else
                            ohtml += '<div style="cursor:pointer" class="pic_foot_2">\n';

                        ohtml += '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span>\n' +
                            '                    <span class="pic_normal" style="margin-left: 0.2rem;">文案</span>\n' +
                            '                </div>\n' +
                            '            </div>\n' +
                            '        </div>\n' +
                            '    </div>\n' +
                            '</div>';


                        if ((i + 1) >= data.message.selection.length) {
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            break;
                        }
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function () {
                        $('#context').append(ohtml);
                        // 每次数据加载完，必须重置
                        me.resetload();
                        $('.heart').on("click", function () {
                            var A = $(this).attr("id");
                            var B = A.split("like");
                            var messageID = B[1];
                            var C = parseInt($("#likeCount" + messageID).html());
                            $(this).css("background-position", "")
                            var D = $(this).attr("rel");
                            if (D === 'like') {
                                $("#likeCount" + messageID).html(C + 1);
                                $(this).addClass("heartAnimation").attr("rel", "unlike");
                            }
                            else {
                                $("#likeCount" + messageID).html(C - 1);
                                $(this).removeClass("heartAnimation").attr("rel", "like");
                                $(this).css("background-position", "left");
                            }
                        });


                        new Score({});

                        // 控制下方六个标签的点击事件
                        $('.pic_hover').on("click", function () {
                            var _this = $(this);
                            if (_this.hasClass("pic_hover")) {
                                _this.removeClass("pic_hover")
                                _this.addClass("pic_foot_2")

                            }
                            else {
                                _this.addClass("pic_hover")
                                _this.removeClass("pic_foot_2")
                            }

                        });
                        // 控制下方六个标签的点击事件
                        $('.pic_foot_2').on("click", function () {
                            var _this = $(this);
                            if (_this.hasClass("pic_hover")) {
                                _this.removeClass("pic_hover")
                                _this.addClass("pic_foot_2")

                            }
                            else {
                                _this.addClass("pic_hover")
                                _this.removeClass("pic_foot_2")
                            }

                        });

                        //提交用户的评价信息
                        $('.confirm').on('click', function () {
                            var pics = $(".pic_area");
                            var allScores = [];
                            pics.each(function () {
                                var _this = $(this);
                                var star = _this.children().find(".star");
                                var heart = _this.children().find(".heart");
                                var pic = {};

                                var labels = _this.find(".pic_foot");

                                var tgs = '';
                                if (labels.attr('data-music') == '1')
                                    tgs += ',音乐';
                                if (labels.attr('data-style') == '1')
                                    tgs += ',风格';
                                if (labels.attr('data-back') == '1')
                                    tgs += ',背景';
                                if (labels.attr('data-struct') == '1')
                                    tgs += ',结构';
                                if (labels.attr('data-mode') == '1')
                                    tgs += ',构图';
                                if (labels.attr('data-copy') == '1')
                                    tgs += ',文案';

                                var new_tag = tgs.substring(1, tgs.length);

                                pic.chosen_tag = new_tag;
                                pic.id = star.attr('data-id');
                                pic.like = heart.attr('rel') == 'like' ? 0 : 1;

                                allScores.push(pic);
                            });


                            var obj_new = {
                                "data": {
                                    "custom_id": custom_id,
                                    "selection": allScores
                                }
                            }


                            //提交数据    TestJsonP     SaveSelectResult
                            $.ajax({
                                url: "//weixin8.xiaoheqingting.com/app/index.php?i=1&c=entry&do=SaveSelectResult&m=xc_tmall",
                                type: "POST",   //post请求方式
                                dataType: "jsonp",
                                jsonp: "callback",
                                data: obj_new,
                                success: function (data) {
                                    var result = JSON.stringify(data);
                                    if (data.errno == '0')//成功
                                    {
                                        alert("提交成功，我们会尽快与您联系。与此同时，您可以再次修改选择，二次提交。");
                                        location.reload();
                                    }
                                    else {
                                        alert(data.message);
                                        location.reload();
                                    }

                                }
                            });
                        });

                        //视频点击出现
                        $(".pic_container").on('click', function () {
                            var _this = $(this);
                            var videoSrc = _this.attr('data-movie');
                            if (videoSrc) {
                                $('.video-play').attr('src', videoSrc);
                                $('.body-cover').show();
                                $('body').css('overflow', 'hidden');
                            }
                        });

                        $('.video-box2').hover(function () {
                            // alert($(this).find("img").attr("id"));
                            // $(this).find("img").hide();
                            //
                            // $(this).find("video").show();

                            $(this).find("video").get(0).play();
                            $(this).find("video").attr("loop", "loop");
                        }, function () {
                            // $(this).find("img").show();
                            //
                            // $(this).find("video").hide();
                            $(this).find("video").get(0).pause();
                        })

                        //点击阴影区域，关闭视频模态框
                        $('.body-cover').bind('click', function (e) {
                            var o = e.target;
                            if ($(o).closest('.video-play').length == 0)//不是特定区域
                            {
                                $('.body-cover').hide();
                                // $('body').css('overflow', 'hidden');
                                // $('#close').trigger("click");
                            }
                        });

                    }, 1000);
                },
                error: function (xhr, type) {
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        }
    });


    //渲染dom
    // $.ajax({
    //     url: "//weixin8.xiaoheqingting.com/app/index.php?i=1&c=entry&id=2&do=GetSelectData&m=xc_tmall&custom_id="+custom_id,
    //     type: "POST",   //post请求方式
    //     dataType: "jsonp",
    //     jsonp: "callback",
    //     success: function (data) {
    //        $('#name').html( data.message.custom_name);
    //
    //         var count=0;
    //         $.each(data.message.selection,function (n,value) {
    //
    //             count++;
    //             var tags=value.chosen_tag;
    //             var like=value.like;
    //             var rate=value.rate;
    //
    //             var data_music="0" ;
    //             var data_style="0" ;
    //             var data_background="0" ;
    //             var data_struct="0";
    //             var data_mode="0";
    //             var data_copy="0"
    //
    //             var array_tags=tags.split(",");
    //
    //             if($.inArray("音乐", array_tags)>-1)
    //                 data_music="1";
    //             if($.inArray("风格", array_tags)>-1)
    //                 data_style="1";
    //             if($.inArray("背景", array_tags)>-1)
    //                 data_background="1";
    //             if($.inArray("结构", array_tags)>-1)
    //                 data_struct="1";
    //             if($.inArray("构图", array_tags)>-1)
    //                 data_mode="1";
    //             if($.inArray("文案", array_tags)>-1)
    //                 data_copy="1";
    //
    //
    //             var ohtml=
    //                 '<div class="row col-lg-3 col-md-6 big_pic">'+
    //                 '    <div class="pic_area">'+
    //                 '        <div style="cursor: pointer;" class="pic_container video-box2" data-movie="'+value.video+'">';
    //
    //             //http://iph.href.lu/300x300?text=FTW  alert(value.poster);   //http://localhost:63342/MateHuang.github.io/selected.html?custom_id=45756
    //             // ohtml+='            <img id="img'+n+'" style="max-height: 305px;" src="'+value.poster+'">';
    //
    //             ohtml+='            <video preload="meta" id="video'+n+'" style="-moz-box-shadow:-7px -6px 14px #333333; -webkit-box-shadow:-7px -6px 14px #333333; box-shadow:-7px -6px 14px rgb(193,190,183);" height="305px" width="100%">'+
    //                 '                <source src="'+value.video+'"  type="video/mp4">'+
    //                 '                您的浏览器不支持 video 标签。'+
    //                 '            </video>'+
    //                 '        </div>'+
    //                 '        <p style="margin-top: 1.5rem;"><span style="color: rgb(68,184,199);">类目</span>-'+value.tag+'</p>'+
    //                 '        <p class="title">'+value.title+'</p>'+
    //                 '        <div class="star" data-id="'+value.id+'" data-score="'+value.rate+'">'+
    //                 '            <ul>';
    //             for(var i=1;i<6;i++){
    //                 if(rate>=i) {
    //                     ohtml += '<li class="on"><a href="javascript:;">';
    //                     ohtml+=i.toString();
    //                     ohtml+='</a></li>';
    //                 }
    //                 else {
    //                     ohtml += '<li><a href="javascript:;">';
    //                     ohtml+=i.toString();
    //                     ohtml+='</a></li>';
    //                 }
    //             }
    //
    //             ohtml+='            </ul>';
    //
    //             if(like=='1')
    //             {
    //                 ohtml+='            <div style="cursor:pointer" class="heart heartAnimation" id="like" rel="unlike"></div>';
    //             }
    //             else {
    //                 ohtml+='            <div style="cursor:pointer" class="heart" id="like" rel="like"></div>';
    //             }
    //
    //
    //             ohtml+='        </div>'+
    //                 '        <div class="pic_foot" data-music="'+data_music+'" data-style="'+data_style+'" data-back="'+data_background+'" data-struct="'+data_struct+'" data-mode="'+data_mode+'"'+
    //                 '             data-copy="'+data_copy+'">'+
    //                 '            <div onclick="record(\'data-music\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">';
    //             if(data_music=='1')
    //                 ohtml+= '<div style="cursor:pointer" class="pic_hover">';
    //             else
    //                 ohtml+= '<div style="cursor:pointer" class="pic_foot_2">';
    //
    //             ohtml+= '   <span class="glyphicon glyphicon-thumbs-up pic_normal"></span><span class="pic_normal"  style="margin-left: 0.2rem;">音乐</span>'+
    //                 '                </div>'+
    //                 '            </div>'+
    //                 '            <div onclick="record(\'data-style\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">';
    //             if(data_style=='1')
    //                 ohtml+= '<div style="cursor:pointer" class="pic_hover">';
    //             else
    //                 ohtml+= '<div style="cursor:pointer" class="pic_foot_2">';
    //             ohtml+='                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span><span class="pic_normal" style="margin-left: 0.2rem;">风格</span>'+
    //                 '                </div>'+
    //                 '            </div>'+
    //                 '            <div onclick="record(\'data-back\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">';
    //
    //             if(data_background=='1')
    //                 ohtml+= '<div style="cursor:pointer" class="pic_hover">';
    //             else
    //                 ohtml+= '<div style="cursor:pointer" class="pic_foot_2">';
    //
    //             ohtml+='    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span><span class="pic_normal" style="margin-left: 0.2rem;">背景</span>'+
    //                 '                </div>'+
    //                 '            </div>'+
    //                 '            <div onclick="record(\'data-struct\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">';
    //
    //             if(data_struct=='1')
    //                 ohtml+= '<div style="cursor:pointer" class="pic_hover">';
    //             else
    //                 ohtml+= '<div style="cursor:pointer" class="pic_foot_2">';
    //
    //             ohtml+='     <span class="glyphicon glyphicon-thumbs-up pic_normal"></span><span class="pic_normal" style="margin-left: 0.2rem;">结构</span>'+
    //                 '                </div>'+
    //                 '            </div>'+
    //                 '            <div onclick="record(\'data-mode\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">';
    //
    //                 // '                <div class="pic_foot_2">'+
    //             if(data_mode=='1')
    //                 ohtml+= '<div style="cursor:pointer" class="pic_hover">';
    //             else
    //                 ohtml+= '<div style="cursor:pointer" class="pic_foot_2">';
    //
    //             ohtml+='      <span class="glyphicon glyphicon-thumbs-up pic_normal"></span><span class="pic_normal" style="margin-left: 0.2rem;">构图</span>'+
    //                 '                </div>'+
    //                 '            </div>'+
    //                 '            <div onclick="record(\'data-copy\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">';
    //
    //             if(data_copy=='1')
    //                 ohtml+= '<div style="cursor:pointer" class="pic_hover">';
    //             else
    //                 ohtml+= '<div style="cursor:pointer" class="pic_foot_2">';
    //
    //             ohtml+=  '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span>'+
    //                 '					 <span class="pic_normal" style="margin-left: 0.2rem;">文案</span>'+
    //                 '                </div>'+
    //                 '            </div>'+
    //                 '        </div>'+
    //                 '    </div>'+
    //                 '</div>';
    //             $("#main").prepend(ohtml);
    //
    //
    //         })
    //
    //
    //
    //
    //         //视频渲染完毕 图片取第一帧
    //         // for(var j=0; j<count; j++) {
    //         //     $("#video"+j).on("loadeddata", function (e) {
    //         //         var obj = e.target;
    //         //         var scale = 0.8;
    //         //         var canvas = document.createElement("canvas");
    //         //         canvas.width = obj.videoWidth * scale;
    //         //         canvas.height = obj.videoHeight * scale;
    //         //         canvas.getContext('2d').drawImage(obj, 0, 0, canvas.width, canvas.height);
    //         //         // obj.setAttribute("poster", canvas.toDataURL("image/png"));
    //         //
    //         //         $("#img"+j).attr("src",canvas.toDataURL("image/png"));
    //         //     } )
    //         // }
    //
    //
    //
    //
    //
    //
    //         $('.heart').on("click", function () {
    //             var A = $(this).attr("id");
    //             var B = A.split("like");
    //             var messageID = B[1];
    //             var C = parseInt($("#likeCount" + messageID).html());
    //             $(this).css("background-position", "")
    //             var D = $(this).attr("rel");
    //             if (D === 'like') {
    //                 $("#likeCount" + messageID).html(C + 1);
    //                 $(this).addClass("heartAnimation").attr("rel", "unlike");
    //             }
    //             else {
    //                 $("#likeCount" + messageID).html(C - 1);
    //                 $(this).removeClass("heartAnimation").attr("rel", "like");
    //                 $(this).css("background-position", "left");
    //             }
    //         });
    //
    //
    //
    //         new Score({});
    //
    //         // 控制下方六个标签的点击事件
    //         $('.pic_hover').on("click", function () {
    //             var _this = $(this);
    //             if (_this.hasClass("pic_hover")) {
    //                 _this.removeClass("pic_hover")
    //                 _this.addClass("pic_foot_2")
    //
    //             }
    //             else {
    //                 _this.addClass("pic_hover")
    //                 _this.removeClass("pic_foot_2")
    //             }
    //
    //         });
    //         // 控制下方六个标签的点击事件
    //         $('.pic_foot_2').on("click", function () {
    //             var _this = $(this);
    //             if (_this.hasClass("pic_hover")) {
    //                 _this.removeClass("pic_hover")
    //                 _this.addClass("pic_foot_2")
    //
    //             }
    //             else {
    //                 _this.addClass("pic_hover")
    //                 _this.removeClass("pic_foot_2")
    //             }
    //
    //         });
    //
    //         //提交用户的评价信息
    //         $('.confirm').on('click', function () {
    //             var pics=$(".pic_area");
    //             var allScores=[];
    //             pics.each(function () {
    //                 var _this=$(this);
    //                 var star=_this.children().find(".star");
    //                 var heart=_this.children().find(".heart");
    //                 var pic={};
    //
    //                 //分数
    //                 // pic.score=star.attr('data-score');data-id
    //
    //                 var labels=_this.find(".pic_foot");
    //
    //                 var tgs='';
    //                 if(labels.attr('data-music')=='1')
    //                     tgs+=',音乐';
    //                 if(labels.attr('data-style')=='1')
    //                     tgs+=',风格';
    //                 if(labels.attr('data-back')=='1')
    //                     tgs+=',背景';
    //                 if(labels.attr('data-struct')=='1')
    //                     tgs+=',结构';
    //                 if(labels.attr('data-mode')=='1')
    //                     tgs+=',构图';
    //                 if(labels.attr('data-copy')=='1')
    //                     tgs+=',文案';
    //
    //                 var new_tag=tgs.substring(1,tgs.length);
    //
    //                 pic.chosen_tag=new_tag;
    //                 pic.id=star.attr('data-id');
    //                 pic.like=heart.attr('rel')=='like'?0:1;
    //
    //                 allScores.push(pic);
    //             });
    //
    //             console.log("数据：");
    //
    //             var obj_new={
    //                 "data":{
    //                     "custom_id":custom_id,
    //                     "selection":allScores
    //                 }}
    //
    //             console.log(JSON.stringify(obj_new));
    //
    //
    //
    //             //提交数据    TestJsonP     SaveSelectResult
    //             $.ajax({
    //                 url: "//weixin8.xiaoheqingting.com/app/index.php?i=1&c=entry&do=SaveSelectResult&m=xc_tmall",
    //                 type: "POST",   //post请求方式
    //                 dataType: "jsonp",
    //                 jsonp: "callback",
    //                 data:obj_new,
    //                 success: function (data) {
    //                     var result = JSON.stringify(data);
    //                     if(data.errno=='0')//成功
    //                     {
    //                         alert("提交成功，我们会尽快与您联系。与此同时，您可以再次修改选择，二次提交。");
    //                         location.reload();
    //                     }
    //                     else {
    //                         alert(data.message);
    //                         location.reload();
    //                     }
    //
    //                 }
    //             });
    //         });
    //
    //         //视频点击出现
    //         $(".pic_container").on('click', function () {
    //             var _this = $(this);
    //             var videoSrc = _this.attr('data-movie');
    //             if (videoSrc) {
    //                 $('.video-play').attr('src', videoSrc);
    //                 $('.body-cover').show();
    //                 $('body').css('overflow', 'hidden');
    //             }
    //         });
    //
    //         $('.video-box2').hover(function() {
    //             // alert($(this).find("img").attr("id"));
    //             // $(this).find("img").hide();
    //             //
    //             // $(this).find("video").show();
    //
    //             $(this).find("video").get(0).play();
    //             $(this).find("video").attr("loop", "loop");
    //         }, function() {
    //             // $(this).find("img").show();
    //             //
    //             // $(this).find("video").hide();
    //             $(this).find("video").get(0).pause();
    //         })
    //
    //         //点击阴影区域，关闭视频模态框
    //         $('.body-cover').bind('click', function (e) {
    //             var o = e.target;
    //             if($(o).closest('.video-play').length==0)//不是特定区域
    //                 $('#close').trigger("click");
    //         });
    //
    //     }
    // });

});


