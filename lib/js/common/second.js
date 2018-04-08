
//存储标签的值
function record(name, _this) {
    var a=$(_this).parent().attr(name);

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
            $(item).mouseover(function (e) {
                var offsetLeft = $('ul', parentCls)[0].offsetLeft;
                ismax(index + 1);

                // $('p',parentCls).hasClass('hidden') && $('p',parentCls).removeClass('hidden');
                // $('p',parentCls).css({'left':index*$(this).width() + 12 + 'px'});

            });

            // 鼠标移出
            $(item).mouseout(function () {
                ismax();
                !$('p', parentCls).hasClass('hidden') && $('p', parentCls).addClass('hidden');
            });

            // 鼠标点击
            $(item).click(function (e) {
                var index = $(_config.selector + ' li', parentCls).index($(this));
                _cache.iStar = index + 1;
                // alert("1");
                //赋值
                $(this).parents('.star').attr('data-score', index + 1);

                !$('p', parentCls).hasClass('hidden') && $('p', parentCls).addClass('hidden');
            });

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

$(function () {
    //渲染界面

    $.ajax({
        url: "http://weixin8.xiaoheqingting.com/app/index.php?i=1&c=entry&id=2&do=GetSelectData&m=xc_tmall&custom_id=23",
        type: "POST",   //post请求方式
        dataType: "jsonp",
        jsonp: "cbfunc",
        success: function (data) {
            $.each(data.message.selection,function (n,value) {
                var ohtml=
                    '<div class="row col-lg-3 col-md-6 big_pic">'+
                    '    <div class="pic_area">'+
                    '        <div class="pic_container video-box2" data-movie="'+value.video+'">'+
                    '            <img style="height: 305px;" src="'+value.poster+'">'+
                    '            <video style="display: none;-moz-box-shadow:-7px -6px 14px #333333; -webkit-box-shadow:-7px -6px 14px #333333; box-shadow:-7px -6px 14px rgb(193,190,183);" height="300px" width="100%" poster="'+value.poster+'">'+
                    '                <source src="'+value.video+'"  type="video/mp4">'+
                    '                您的浏览器不支持 video 标签。'+
                    '            </video>'+
                    '        </div>'+
                    '        <p style="margin-top: 1.5rem;"><span style="color: rgb(68,184,199);">类目</span>-'+value.tag+'</p>'+
                    '        <p>'+value.title+'</p>'+
                    '        <div class="star" data-id="'+value.id+'" data-score="'+value.rate+'">'+
                    '            <ul>'+
                    '                <li><a href="javascript:;">1</a></li>'+
                    '                <li><a href="javascript:;">2</a></li>'+
                    '                <li><a href="javascript:;">3</a></li>'+
                    '                <li><a href="javascript:;">4</a></li>'+
                    '                <li><a href="javascript:;">5</a></li>'+
                    '            </ul>'+
                    '            <div class="heart" id="like2" rel="like"></div>'+
                    '        </div>'+
                    '        <div class="pic_foot" data-music="0" data-style="0" data-back="0" data-struct="0" data-mode="0"'+
                    '             data-copy="0">'+
                    '            <div onclick="record(\'data-music\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">'+
                    '                <div class="pic_foot_2">'+
                    '   <span class="glyphicon glyphicon-thumbs-up pic_normal"></span><span class="pic_normal"  style="margin-left: 0.2rem;">音乐</span>'+
                    '                </div>'+
                    '            </div>'+
                    '            <div onclick="record(\'data-style\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">'+
                    '                <div class="pic_foot_2">'+
                    '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span><span class="pic_normal" style="margin-left: 0.2rem;">风格</span>'+
                    '                </div>'+
                    '            </div>'+
                    '            <div onclick="record(\'data-back\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">'+
                    '                <div class="pic_foot_2">'+
                    '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span><span class="pic_normal" style="margin-left: 0.2rem;">背景</span>'+
                    '                </div>'+
                    '            </div>'+
                    '            <div onclick="record(\'data-struct\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">'+
                    '                <div class="pic_foot_2">'+
                    '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span><span class="pic_normal" style="margin-left: 0.2rem;">结构</span>'+
                    '                </div>'+
                    '            </div>'+
                    '            <div onclick="record(\'data-mode\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">'+
                    '                <div class="pic_foot_2">'+
                    '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span><span class="pic_normal" style="margin-left: 0.2rem;">构图</span>'+
                    '                </div>'+
                    '            </div>'+
                    '            <div onclick="record(\'data-copy\',this)" style="padding:0 0.5rem" class="col-lg-4 col-md-4 col-xs-4">'+
                    '                <div class="pic_foot_2">'+
                    '                    <span class="glyphicon glyphicon-thumbs-up pic_normal"></span>'+
                    '					 <span class="pic_normal" style="margin-left: 0.2rem;">文案</span>'+
                    '                </div>'+
                    '            </div>'+
                    '        </div>'+
                    '    </div>'+
                    '</div>';
                $("#main").prepend(ohtml);
            })

            // var result = JSON.stringify(data);
            console.log("输出的结果：");
            console.log(data);

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
            $('.pic_foot_2').on("click", function () {
                var _this = $(this);
                if (_this.hasClass("pic_hover")) {
                    _this.addClass("pic_foot_2")
                    _this.removeClass("pic_hover")
                }
                else {
                    _this.addClass("pic_hover")
                    _this.removeClass("pic_foot_2")
                }

            });

            //提交用户的评价信息
            $('.confirm').on('click', function () {
                var pics=$(".pic_area");
                var allScores=[];
                pics.each(function () {
                    var _this=$(this);
                    var star=_this.children().find(".star");
                    var pic={};

                    pic.score=star.attr('data-score');
                    var labels=_this.find(".pic_foot");
                    pic.music=labels.attr('data-music');
                    pic.style=labels.attr('data-style');
                    pic.background=labels.attr('data-back');
                    pic.struct=labels.attr('data-struct');
                    pic.mode=labels.attr('data-mode');
                    pic.copy=labels.attr('data-copy');
                    allScores.push(pic);
                });

                $.ajax({
                    url: "http://weixin8.xiaoheqingting.com/app/index.php?i=1&c=entry&id=2&do=SaveSelectResult&m=xc_tmall&custom_id=23&cbfunc=myJsonCb&selection=xxx",
                    type: "POST",   //post请求方式
                    dataType: "jsonp",
                    jsonp: "cbfunc",
                    data:JSON.stringify(allScores),
                    success: function (data) {
                        var result = JSON.stringify(data);
                        alert(JSON.stringify(allScores));
                    }
                });


                // var stars = $('.star');
                // var all = [];
                // for (var i = 0; i < stars.length; i++) {
                //     // alert(stars[i].getAttribute('data-score'));
                //     if (stars[i].getAttribute('data-score') == null)
                //         all.push(0);
                //     else
                //         all.push(stars[i].getAttribute('data-score'));
                // }
                // alert(all);
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

            $('.video-box2').hover(function() {
                // alert($(this).find("img").attr("id"));
                $(this).find("img").hide();
                //
                $(this).find("video").show();

                $(this).find("video").get(0).play();
                $(this).find("video").attr("loop", "loop");
            }, function() {
                $(this).find("img").show();
                //
                $(this).find("video").hide();
                $(this).find("video").get(0).pause();
            })

            //点击阴影区域，关闭视频模态框
            $('.body-cover').bind('click', function (e) {
                var o = e.target;
                if($(o).closest('.video-play').length==0)//不是特定区域
                    $('#close').trigger("click");
            });

        }
    });

});
