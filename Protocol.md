# SecondaryPages

## 展示页码地址

http://weixin8.xiaoheqingting.com/app/index.php?i=1&c=entry&id=2&do=select&m=xc_tmall&custom_id=23232232


## 获取选品数据

### 接口地址：

> http://weixin8.xiaoheqingting.com/app/index.php?i=1&c=entry&do=GetSelectData&m=xc_tmall&custom_id=23232232&cbfunc=YourJSCbFunc


 - cbfunc
 
 jsonp 的回调函数
 
 - custom_id

客户 ID

custom_id 我可以通过两种方式给你，看哪种你更方便：

方法1. 的具体值会在 SecondaryPages.html 最前面作为全局变量传入 custom_id，例如

```
<script>
var custom_id = 323243;
</script>
```

方法2. 参考“展示页码地址” 一节的 URL，里面有`custom_id=23232232`字段。


### 返回结果

返回 jsonp 结果.

当出现异常时， errno 不为 0 ，message 字段提示出错原因。
成功时， errno 为 0， message 字段是具体结果内容

```
{
    "errno": 0, 
    "message": {
        "custom_id": 3, 
        "custom_name": "Mr.Mudada", 
        "selection": [
            {
                "id": 1323, 
                "rate": "4", 
                "title": "物生物焖烧杯超长保温饭盒便当成人儿童粥汤桶闷烧壶罐304不锈钢 - 天猫Tmall.com", 
                "video": "http://cloud.video.taobao.com/play/u/1689522943/p/2/e/6/t/1/50001222925.mp4?appKey=38824", 
                "poster": "http://weixin8.xiaoheqingting.com/addons/xc_tmall/template/mobile/videos/poster01.jpg", 
                "tag": "饭盒"
            }, 
            {
                "id": 1324, 
                "rate": "2", 
                "title": "304不锈钢超长保温饭盒3层成人12/24小时多层真空便携保温桶学生", 
                "video": "http://cloud.video.taobao.com/play/u/1689522943/p/2/e/6/t/1/50001222925.mp4?appKey=38824", 
                "poster": "http://weixin8.xiaoheqingting.com/addons/xc_tmall/template/mobile/videos/poster02.jpg", 
                "tag": "饭盒"
            }, 
            {
                "id": 1323, 
                "rate": "4", 
                "title": "手提大容量不锈钢饭盒学生双层保温便当盒成人日式分格多层餐盒子", 
                "video": "http://cloud.video.taobao.com/play/u/1689522943/p/2/e/6/t/1/50001222925.mp4?appKey=38824", 
                "poster": "http://weixin8.xiaoheqingting.com/addons/xc_tmall/template/mobile/videos/poster03.jpg", 
                "tag": "饭盒"
            }, 
            {
                "id": 1323, 
                "rate": "4", 
                "title": "物生物焖烧杯保温桶 焖烧壶罐饭桶保温盒学生保温饭盒", 
                "video": "http://cloud.video.taobao.com/play/u/1689522943/p/2/e/6/t/1/50001222925.mp4?appKey=38824", 
                "poster": "http://weixin8.xiaoheqingting.com/addons/xc_tmall/template/mobile/videos/poster04.jpg", 
                "tag": "饭盒"
            }
        ]
    }
}

```


## 提交选择结果

### 接口地址：

> http://weixin8.xiaoheqingting.com/app/index.php?i=1&c=entry&do=SaveSelectResult&m=xc_tmall

### 提交字段：
 - cbfunc
 
 jsonp 的回调函数
 
 - data

data 是一个 json 字符串，包含了

 1. 客户 ID
 1. 客户选择的结果

```
{
    "custom_id": 3,
    "selection": [
        {
            "id": 1323,
            "like": 1,
            "tag": "音乐,构图"
        },
        {
            "id": 2012,
            "like": 1,
            "tag": "文案,构图"
        },
        {
            "id": 1323,
            "like": 0,
            "tag": "构图"
        },
        {
            "id": 1373,
            "like": 0,
            "tag": "背景"
        }
    ]
}
```

### 提交结果

返回 jsonp 结果, errno 为 0 表示成功，非 0 表示失败， message 指示具体失败原因。

```
{"errno":"2","message":"\u975e\u6cd5\u8bf7\u6c42"}
```

