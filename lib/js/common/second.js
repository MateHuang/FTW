
//存储标签的值
function record(name, _this) {
    if ($(_this).parent().attr(name) == '0' || $(_this).parent().attr(name) == 'undefined')
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
    new Score({});

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

    //控制下方六个标签的点击事件
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
            pic.back=labels.attr('data-back');
            pic.struct=labels.attr('data-struct');
            pic.mode=labels.attr('data-mode');
            pic.copy=labels.attr('data-copy');
            allScores.push(pic);
        });
        alert(JSON.stringify(allScores));
        console.log(allScores);

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

});
