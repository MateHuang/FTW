//处理鼠标悬停切换动态图的效果
// $(".instro-one-box div").on('mouseover', function() {
//     var _this = $(this);
//     var dynamicImg = _this.find('.hover-gif');
//     var dynamicSrc = _this.find('img').attr('data-dynamic-src');
//     if(dynamicImg.length) {
//         dynamicImg.show();
//     }else{
//         if(dynamicSrc) {
//             _this.append(`<img src="${dynamicSrc}" class="hover-gif" />`);
//         }
//     }
// })

//鼠标悬浮播放视频
$(".instro-one-box div").hover(function () {

    $(this).find("video").get(0).play();
    $(this).find("video").attr("loop", "loop");


    //获取图片的高度给video
    // var img=$(this).find("img");
    // debugger;
    // $(this).find("video").height=img.height();

    // img.hide();
    $(this).find("video").show();
},function () {
    $(this).find("video").get(0).pause();
    $(this).find("video").get(0).currentTime = 0;
    // $(this).find("img").show();
    // $(this).find("video").hide();
});



$(".instro-one-box div,.images-box section").on('mouseout', function() {
    var _this = $(this);
    var dynamicImg = _this.find('img.hover-gif');
    if(dynamicImg) {
        dynamicImg.hide();
    }
})
//点击预览大图
$(".images-box section").on("click", function() {
    var _this = $(this).find('img');
    var imgSrc =_this.attr('src');
    if(imgSrc) {
        $('.image-previous').attr('src', imgSrc);
        $('.body-cover-img').show();
        $('body').css('overflow','hidden');
    }
})
//视频点击出现
$(".instro-one-box div").on('click', function() {
    var _this = $(this);
    var videoSrc =_this.attr('data-movie');
    if(videoSrc) {
        $('.video-play').attr('src', videoSrc);
        $('.body-cover').show();
        $('body').css('overflow','hidden');
    }
})
//关闭遮罩层
$(".close").on('click', function() {
    $('.video-play').attr('src', '');
    $('.image-previous').attr('src', '');
    $('.body-cover').hide();
    $('.body-cover-img').hide();
    $('body').css('overflow','auto');
})
//处理图片的切换
$('.switch-div').on('mouseover', function() {
    var _this = $(this);
    var _parentUl = _this.parents('ul');
    var leader = _this.find('article.leader');
    var this_index = _this.parent('li').find('div').index(_this);
    if(leader && !leader.hasClass('hover-active')) {
        _this.parent('li').find('.leader').removeClass('hover-active');
        _this.find('.leader').addClass('hover-active');
    }
    _parentUl.find(".images-box").removeClass('show');
    _parentUl.find(".images-box").eq(this_index).addClass('show');
})
//展示滚动图片
var imgArr = ['./lib/images/scroll_1.png','./lib/images/scroll_2.png','./lib/images/scroll_3.png','./lib/images/scroll_4.png','./lib/images/scroll_5.png'];
var articlebox = $('.scroll-images>article');
var scrollImages = $('.scroll-images');
var should = 1;
function showScrollImg() {
    if(!imgArr.length) {
        return;
    }
    var i = 0;
    //先填充一次DOM
    for(img in imgArr) {
        $('.scroll-images>article').append(`<img src="${imgArr[img]}"/>`);
    }
    // setTimeout(function() {
    //     if(scrollImages.width() > $('.scroll-images>article').width()) {
    //         should = Math.ceil(scrollImages.width()/$('.scroll-images>article').width());
    //     }
    //     console.log(scrollImages.width());
    //     console.log($('.scroll-images>article').width());
    //     while(i<should) {
    //         for(img in imgArr) {
    //             $('.scroll-images>article').append(`<img src="${imgArr[img]}"/>`);
    //         }
    //         i++;
    //     }
    // }, 500)
    scrollImg(20);
}
//滚动图片
function scrollImg(speed) {
    setInterval(function() {
        var currentLeft = parseInt(articlebox.css('left'));
        if(Math.abs(currentLeft) > (articlebox.width()/(should+1))) {
            articlebox.css({
                left: 0 + 'px'
            })
        }
        articlebox.css({
            left: (parseInt(articlebox.css('left')) - 1) + 'px'
        })
    },speed)
}
showScrollImg();
