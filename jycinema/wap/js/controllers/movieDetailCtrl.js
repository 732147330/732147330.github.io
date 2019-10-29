/**
 * Created by xiongshengzhong on 16/8/18.
 * 2017.1.10 影片详情剧照无数据不出现下滑按钮
 */
'use strict';
app.controller('movieDetailCtrl', function ($scope,$rootScope,$state, $stateParams,$location,$interval,$ionicViewSwitcher, $ionicPlatform, $ionicPopup, $ionicSlideBoxDelegate, httpService, JYApi, $ionicBackdrop, myhrefService, $ionicModal, $ionicScrollDelegate, $timeout) {
    //$scope.shareCode=$stateParams.shareCode?true:false;
    $scope.movieId = $stateParams.movieId;
    $scope.noSale=$stateParams.noSale?true:false;
    $scope.theatreId = $stateParams.theatreId ? $stateParams.theatreId : '-1';
    $scope.vFlag = true;
    $scope.Math=Math;
    $scope.noMorePage=false;
    $scope.noMorePage1=false;
    $scope.pageSize=10;
    $scope.page=1;
    $scope.readData=[];

    //影片详情
    $scope.getMovieDetail = function () {
        httpService.getData(JYApi.findFilms, 'post', {
            params: JSON.stringify({
                filmId: $scope.movieId,
                type: 'ordinary'
            })
        }, function (res) {
            if (res.status == "S") {
                if(res.data.length>0){
                    $scope.movieData = res.data[0];
                    $scope.thumb=$scope.movieData.posterUrl;
                }
                if(res.actorData && res.actorData.data.length>0){
                    $scope.actors = res.actorData.data;
                    $scope.actors.unshift({
                        "actorName":$scope.movieData.directorName,
                        "actorId":$scope.movieData.actorId,
                        "imagesUrl":$scope.movieData.directorUrl,
                        "actorTypeAlt":languageSetting.director
                    });
                }
                $timeout(function () {
                    var swiper = new Swiper('.swiper-container2', {
                        pagination: '.swiper-pagination',
                        slidesPerView: 4,
                        paginationClickable: true,
                        spaceBetween: 10,
                        freeMode: true,
                        observer:true
                    });
                }, 100);
            }
            $scope.findFilmsFlag=true;
            $scope.isWeixin();
        });
    };
    //获取影片海报
    $scope.getMovieBanner = function () {
        httpService.getData(JYApi.findImages, 'post', {
            params: JSON.stringify({
                targetId:$scope.movieId,
                targetType:'FILM_BANNER',
                imgChannel:'APP',
                type:'filmImg'
            })
        }, function (res) {
            if (res.status == "S" ) {
                $scope.movieBanner=res.data.length>0?res.data[0].url:'';
                $scope.getMovieDetail();
            }
            $scope.findImagesFlag=true;
        });
    };
    //剧照
    $scope.getPicDetail = function () {
        httpService.getData(JYApi.findImages, 'post', {
            params: JSON.stringify({
                targetId: $scope.movieId,
                targetType: "FILM_STILL",
                mtimeMessageType: "STILLSURL",
                type: 'ordinary'
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.movieSmallPicData = res.data;
            }
        });
    };
    //喜欢不喜欢
    $scope.likeFlag = false;
    $scope.unlikeFlag = false;
    $scope.updateLike = function () {
        if(!$scope.likeFlag && !$scope.unlikeFlag){
            httpService.getData(JYApi.updateLikeUnLike, 'post', {
                params: JSON.stringify({
                    "filmId": $scope.movieId,
                    "likeIndex": 1
                })
            }, function (res) {
                if (res.status == "S") {
                    $scope.likeFlag=true;
                    $scope.movieData.likeIndex=Number($scope.movieData.likeIndex)+1;
                }
            });
        }else if(!$scope.likeFlag && $scope.unlikeFlag){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.hasZan+'!'
            });
            $timeout(function () {
                myPopup.close();
            }, 1000);
        }else if($scope.likeFlag && !$scope.unlikeFlag){
            httpService.getData(JYApi.updateLikeUnLike, 'post', {
                params: JSON.stringify({
                    "filmId": $scope.movieId,
                    "likeIndex": 0
                })
            }, function (res) {
                if (res.status == "S") {
                    $scope.likeFlag=false;
                    $scope.movieData.likeIndex=Number($scope.movieData.likeIndex)-1;
                }
            });
        }
    };
    $scope.updateUnLike=function(){
        if(!$scope.likeFlag && !$scope.unlikeFlag){
            httpService.getData(JYApi.updateLikeUnLike, 'post', {
                params: JSON.stringify({
                    "filmId": $scope.movieId,
                    "unlikeIndex": 1
                })
            }, function (res) {
                if (res.status == "S") {
                    $scope.unlikeFlag=true;
                    $scope.movieData.unlikeIndex=Number($scope.movieData.unlikeIndex)+1;
                }
            });
        }else if(!$scope.unlikeFlag && $scope.likeFlag){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.hasZan+'!'
            });
            $timeout(function () {
                myPopup.close();
            }, 1000);
        }else if($scope.unlikeFlag && !$scope.likeFlag){
            httpService.getData(JYApi.updateLikeUnLike, 'post', {
                params: JSON.stringify({
                    "filmId": $scope.movieId,
                    "unlikeIndex": 0
                })
            }, function (res) {
                if (res.status == "S") {
                    $scope.unlikeFlag=false;
                    $scope.movieData.unlikeIndex=Number($scope.movieData.unlikeIndex)-1;
                }
            });
        }
    };

    $scope.$on("$ionicView.afterEnter", function (event, data) {
        $timeout(function(){
            $scope.getMovieBanner();
        },500);
        $scope.getPicDetail();
    });

    $scope.clearFix = function () {
        if ($scope.maskFix) {
            $scope.maskFix = false;
        }
    };

    //幻灯展示
    $scope.showSlide = function (index) {
        $scope.activeIndex = index;
        $scope.slideFlag = true;
        $scope.slideF = true;
    };
    $scope.hideSlide = function () {
        $scope.slideFlag = false;
        $timeout(function () {
            $scope.slideF = false;
        }, 300);
    };


    $scope.checkGoBack = function () {
        $scope.slideUp();
    };
    $scope.toggleVflag = function () {
        $scope.vFlag = !$scope.vFlag;
        $timeout(function(){
            $ionicScrollDelegate.resize();
        },10);
    };
    $scope.getPos = function () {
        $scope.scrollTop = $ionicScrollDelegate.getScrollPosition().top;
        if ($scope.scrollTop > 200) {
            $scope.topFlag = false;
        } else {
            $scope.topFlag = true;
        }
        $scope.$apply();
    };
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $scope.findCommentFilmDetail($scope.isTicket,$scope.page,$scope.pageSize);
        $scope.findCommentCount();
        $scope.flag3 = true;
        $ionicModal.fromTemplateUrl('templates/modal3.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
    });
    $scope.$on('$ionicView.leave',function(event,data){
        $(document).unbind("click");
    });
    $scope.$on("$ionicView.beforeLeave", function (event, data) {
        $ionicScrollDelegate.scrollTo(0, 0, false);
    });
    $scope.showShare = function (e) {
        $scope.modal.show();
        $ionicBackdrop.retain();
        e.stopPropagation();
        $(document).bind("click", function (e) {
            if(e.target.nodeName!='I'){
                $scope.hideShare(e);
            }
        });
    };
    $scope.hideShare = function (e) {
        $scope.modal.hide();
        $timeout(function(){
            $ionicBackdrop.release();
        },500);
        e.stopPropagation();
    };

    $scope.checkDown = function () {
        if ($ionicScrollDelegate.getScrollPosition().top == 0) {
            $scope.showMaskFix();
        }
    };
    //详情页动画
    $scope.flag1 = true;//购票按钮
    $scope.flag2 = false;//返回按钮
    $scope.flag3 = true;//返回按钮
    $scope.isShow = true;//下部上滑
    $scope.isSlide = true;//上部下滑
    $scope.topFlag = true;//返回分享按钮
    $scope.flag4 = true;
    //下滑
    $scope.slideDown = function () {
        $scope.isShow = false;
        $scope.flag1 = false;
        $scope.flag3 = false;
        $scope.flag4 = true;

    };
    //上滑
    $scope.slideUp = function () {
        $ionicScrollDelegate.scrollTo(0, 0, false);
        $scope.flag2 = false;
        $scope.isShow = true;

    };
    $scope.slideEndEvent = function (event) {
        if (!$scope.isShow) {//下滑结束
            $scope.flag2 = true;
        } else {//上滑结束
            $scope.flag1 = true;
            $scope.flag4 = false;

        }
        $scope.$apply();
    };
    $scope.checkPos = function (event) {
        $scope.sTop = $ionicScrollDelegate.getScrollPosition().top;
        $scope.direction = event.gesture.direction;
    };
    $scope.beginSlide = function () {
        if ($scope.sTop == 0 && $scope.direction == 'down') {
            $scope.slideDown();
        }
    };
    //影片阅读文章
    $scope.getArticle = function (page, pageSize) {
        if(!$scope.noMorePage) {
            httpService.getData(JYApi.findArticle, 'post', {
                params: JSON.stringify({
                    articleType: "FILM_REVIEW",
                    type: "filmTypeHot",
                    pageNo: page,
                    pageSize: pageSize,
                    articleFilmId: $scope.movieId
                })
            }, function (res) {
                if (res.status == "S" && res.data.length>0) {
                    if($scope.page==1){
                        $scope.readData=[];
                    }
                    angular.forEach(res.data,function(v,k){
                        v.strs= [];
                        if(v.laber){
                            v.strs=v.laber.split(","); //字符分割
                        }
                        v.date=v.creationDate.substring(0,10);
                        $scope.readData.push(v);
                    });
                    if(res.data.length<$scope.pageSize){
                        $scope.noMorePage=true;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }else{

                }
            });
        }else{
            $scope.noMorePage=true;
        }
    };
    $scope.getArticle(1, $scope.pageSize);

    //计算系统时间与回复影评时间相差天数
    $scope.formatDate=function (obj) {
        if(obj<10){
            obj='0'+obj;
        }
        return obj
    };
    $scope.mytime= new Date().getFullYear()+'-'+$scope.formatDate(new Date().getMonth()+1)+'-'+$scope.formatDate(new Date().getDate());
    function getDays(strDateStart,strDateEnd){
        var strSeparator = "-"; //日期分隔符
        var oDate1;
        var oDate2;
        var iDays;
        oDate1= strDateStart.split(strSeparator);
        oDate2= strDateEnd.split(strSeparator);
        var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
        var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
        iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24);//把相差的毫秒数转换为天数
        return iDays ;
    }

    //查询影评
    $scope.noDataFlag=false;
    $scope.findCommentFilmDetail =function(isTicket,page,pageSize){
        httpService.getData(JYApi.findCommentFilmDetail, 'post', {
            params:JSON.stringify({
                firstQuery:'firstQuery',
                type:"FILE_REVIEW",
                sourceId:$stateParams.movieId,
                isTicket:isTicket,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            if(res.status=="S" && res.data.length>0){
                if($scope.page==1){
                    $scope.commentFilmDetailData=[];
                }
                angular.forEach(res.data,function(value,key){
                    value.date=value.creationDate.substring(0,10);
                    value.starArr=[];
                    for(var i=0;i<value.score;i++){
                        value.starArr.push(i);
                    }
                    value.date=getDays(value.date,$scope.mytime);//评论时间与当前相差多少
                    if(value.date==0){
                        value.date="今天"
                    }
                    if(value.isFabulous=='N'){
                        value.fabulousTypeFlag=false;
                    }else if(value.isFabulous=='Y'){
                        value.fabulousTypeFlag=true;
                    }
                    $scope.commentFilmDetailData.push(value);
                });
                if(res.data.length<$scope.pageSize){
                    $scope.noMorePage1=true;
                    $scope.noDataFlag=false;
                }else{
                    $scope.noMorePage1=false;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }else{
                $scope.commentFilmDetailData=[];
                $scope.noMorePage1=true;
                $scope.noDataFlag=true;
            }
        });
    };
    //$scope.findCommentFilmDetail();
    //购票影评
    $scope.haveTicket=function(){
        $scope.findCommentFilmDetail('Y',1,$scope.pageSize);
        $scope.isTicket="Y";
        $scope.page=1;
        $scope.noMorePage1=true;
    };
    //未购票影评
    $scope.noTicket=function(){
        $scope.findCommentFilmDetail('N',1,$scope.pageSize);
        $scope.isTicket="N";
        $scope.page=1;
        $scope.noMorePage1=true;
    };
    //上拉加载更多
    $scope.loadMore1=function(){
        $scope.page++;
        $scope.findCommentFilmDetail($scope.isTicket,$scope.page,$scope.pageSize);
    };

    //查询购票和未购票评论总数
    $scope.findCommentCount =function(){
        httpService.getData(JYApi.findCommentCount, 'post', {
            params:JSON.stringify({
                type:"FILE_REVIEW",
                sourceId:$stateParams.movieId,
                queryType:"GET_COMMENT_COUNT"
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.alComment=res.data[0].alComment;
                $scope.unComment=res.data[0].unComment;

            }
        });
    };

    //评论举报
    $scope.showList=function (item,e) {
        if(!localStorage.userInfo){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: languageSetting.unlogin,
                buttons: [
                    {
                        text: languageSetting.cancel,
                        type: 'button-default',
                        onTap: function () {
                            myPopup.close();
                        }
                    },
                    {
                        text: languageSetting.login,
                        type: 'button-calm',
                        onTap: function (e) {
                            myPopup.close();
                            $state.go('login', {viewName: 'movieDetail', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else{
        if(item.showFlag==true){
            item.showFlag=false;
        }else{
            angular.forEach($scope.commentFilmDetailData,function(value,key){
                if(item==value&&item.showFlag!=true){
                    value.showFlag=true;
                }else{
                    value.showFlag=false;
                }
            });
        }
        e.stopPropagation();
        }
    };
    //举报
    $scope.getFilter=function (id,e) {
        httpService.getData(JYApi.saveCommentReport, 'post', {
            params:JSON.stringify({
                commentFilmDetailId:id
            })
        }, function (res) {
            if(res.status=="S"){
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i> 举报成功'
                });
                $timeout(function () {
                    angular.forEach($scope.commentFilmDetailData,function(value,key){
                        if(value.commentFilmDetailId==id){
                            value.isReport='Y'
                        }
                    });
                    myPopup.close();
                },500);
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '请求失败,请重新登陆!'
                });
                $timeout(function(){
                    myPopup.close();
                    localStorage.removeItem('userInfo');
                    $scope.userInfo = null;
                    $state.go('login');
                },2000);
            }
        });
        e.stopPropagation();
    };
    document.addEventListener('click',function () {
        angular.forEach($scope.commentFilmDetailData,function(value,key){
            value.showFlag=false;
        });
        $scope.$apply();
    });
    //点赞
    $scope.updateCommentFilmDetail =function(item){
        if(!localStorage.userInfo){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.unlogin,
                buttons: [
                    {
                        text: languageSetting.cancel,
                        type: 'button-default',
                        onTap: function () {
                            myPopup.close();
                        }
                    },
                    {
                        text: languageSetting.login,
                        type: 'button-calm',
                        onTap: function (e) {
                            myPopup.close();
                            $state.go('login', {viewName: 'movieDetail', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else{
            angular.forEach($scope.commentFilmDetailData,function(value,key){
                if(item.fabulousTypeFlag==true){
                    value.fabulousTypeFlag=false;
                    return
                }
                if(item==value){
                    value.fabulousTypeFlag=true;
                }
            });
            if(item.isFabulous=='N'){
                $scope.fabulousType="FABULOUS"
            }else{
                $scope.fabulousType="CANCEL"
            }
            httpService.getData(JYApi.updateCommentFilmDetail, 'post', {
                params:JSON.stringify({
                    commentFilmDetailId:item.commentFilmDetailId,
                    fabulousType:$scope.fabulousType
                })
            }, function (res) {
                if(res.status=="S"){
                    angular.forEach($scope.commentFilmDetailData,function(value,key){
                        if(item==value&&$scope.fabulousType=="FABULOUS"){
                            value.fabulous+=1;
                            value.isFabulous='Y'
                        }else if(item==value&&$scope.fabulousType=="CANCEL"){
                            value.fabulous-=1;
                            value.isFabulous='N'
                        }
                    });
                }else{
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: '请求失败,请重新登陆!'
                    });
                    $timeout(function(){
                        myPopup.close();
                        localStorage.removeItem('userInfo');
                        $scope.userInfo = null;
                        $state.go('login');
                    },2000);
                }
            });
        }

    }

    $scope.getEncryption=function (value) {
        var val = Base64.encode(value);
        var arr = [];
        for(var i=0;i<val.length;i++){
            arr.push(val.charAt(i));
            if(i%2){
                var num1 =  Math.floor(10*Math.random());
                arr.push(num1);
                var num2 =  Math.floor(10*Math.random());
                arr.push(num2);
                var num3 =  Math.floor(10*Math.random());
                arr.push(num3)
            }
        }
        return arr.join("");
    };
    $scope.$on("$ionicView.enter", function (event, data) {

    });
    //wap微信分享
    $scope.weixin=function(){
        httpService.getData(JYApi.generateConfigSignature, 'post', {
            url:encodeURIComponent(location.href)
        }, function (res) {
            if(res.status=='S'){
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.appId, // 必填，公众号的唯一标识
                    timestamp: res.timestamp , // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }

        })
    };
    //$scope.absurl = $location.absUrl();
    //$scope.weixin();
    $scope.isWeixin=function() {
        $scope.shareTime=new Date().getTime();
        if(localStorage.userInfo){
            $scope.shareCode=JSON.parse(localStorage.userInfo).memberId+$scope.shareTime;
        }
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            wx.ready(function(){
                //分享朋友圈
                if($scope.movieData){
                    wx.onMenuShareTimeline({
                        title:$scope.movieData.mtimeFilmName, // 分享标题
                        link: locals.returnUrl() + "/?from=singlemessage#/movieDetail?movieId="+$scope.movieId+'&sourceId='+$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId)+'&shareCode='+ $scope.getEncryption($scope.shareCode),
                        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: $scope.movieData.posterUrl, // 分享图标
                        success: function () {
                            httpService.getData(JYApi.shareInfo,'post',{
                                params:JSON.stringify({
                                    "sourceId":$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
                                    "shareCode":$scope.getEncryption($scope.shareCode)
                                })
                            },function(res){
                                if(res.status=='noLogin'){
                                    var myPopup = $ionicPopup.show({
                                        title: languageSetting.tip,
                                        cssClass: 'jyAlert',
                                        template: '小主，登录可以分享有奖哦!',
                                        buttons: [
                                            {
                                                text: languageSetting.cancel,
                                                type: 'button-default',
                                                onTap: function () {
                                                    myPopup.close();
                                                }
                                            },
                                            {
                                                text: languageSetting.login,
                                                type: 'button-calm',
                                                onTap: function (e) {
                                                    myPopup.close();
                                                    $state.go('login', {viewName: 'movieDetail', urlParams: JSON.stringify($stateParams)});
                                                }
                                            }
                                        ]
                                    });
                                }
                                if(res.status=='S'){
                                    var myPopup = $ionicPopup.show({
                                        title: languageSetting.tip,
                                        cssClass: 'jyAlert',
                                        template: res.msg,
                                        buttons: [
                                            {
                                                text: '确定',
                                                type: 'button-calm',
                                                onTap: function (e) {
                                                    myPopup.close();
                                                }
                                            }
                                        ]
                                    });
                                }
                            });
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {

                            // 用户取消分享后执行的回调函数
                        }
                    });

                    //分享朋友
                    wx.onMenuShareAppMessage({
                        title: $scope.movieData.mtimeFilmName,// 分享标题
                        desc: $scope.movieData.ratingDescription, // 分享描述
                        link: locals.returnUrl() + "/?from=singlemessage#/movieDetail?movieId="+$scope.movieId,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:$scope.movieData.posterUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {

                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {

                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享qq
                    wx.onMenuShareQQ({
                        title: $scope.movieData.mtimeFilmName,// 分享标题
                        desc: $scope.movieData.ratingDescription, // 分享描述
                        link: locals.returnUrl() + "/?from=singlemessage#/movieDetail?movieId="+$scope.movieId,// 分享链接
                        imgUrl: $scope.movieData.posterUrl, // 分享图标
                        success: function () {

                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {

                            // 用户取消分享后执行的回调函数
                        }
                    });
                }
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
            wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        } else {
        }
    };


    //分享进来必须登录
    $scope.shareCodeFlag=$stateParams.shareCode?true:false;
    if($scope.shareCodeFlag==true){
        $scope.joinFlag=true;
    }else{
        $scope.joinFlag=false;
    }
    $scope.join=function(){
        if(localStorage.userInfo){
            $state.go('home');
            $ionicViewSwitcher.nextDirection("none")
        }else{
            $scope.needBind=true;
        }
    };
    $scope.hide=function () {
        $scope.needBind=false;
    };
    //if($scope.shareCodeFlag==true) {
    //    $scope.needBind=true;
    //}
    //生成登录交易信息--忠诚度计划
    $scope.getLoginCount=function () {
        $.ajax({
            type:'POST',
            url:JYApi.saveLytTxn,
            data:{
                params:JSON.stringify({
                    planId:3,
                    txnType:'LOGIN',
                    subType:'WAP',
                    status:'PENDING',
                    MemberCardNumber:JSON.parse(localStorage.userInfo).chipNumber?JSON.parse(localStorage.userInfo).chipNumber:'',
                    memberId:JSON.parse(localStorage.userInfo).memberId
                })
            },
            success:function () {
            }
        });
    };
    //获取会员基础信息
    $scope.findMember=function(memberId){
        httpService.getData(JYApi.findMember, 'post', {
            params:JSON.stringify({
                "memberId":memberId
            })
        }, function (res) {
            if(res.status=="S"){
                var userInfo=res.data;
                userInfo.token= JSON.parse(localStorage.userInfo).token;
                localStorage.userInfo=JSON.stringify(userInfo);
                localStorage.cacheTime=new Date().getTime();
                $scope.getLoginCount();
                $rootScope.userInfo=userInfo;
                //$state.go("movieDetail",{movieId:$scope.movieId});
                $state.go('home');
                $ionicViewSwitcher.nextDirection("none")
            }else{
                $rootScope.showTip('获取会员信息失败');
            }
        });
    };

    $scope.bindPhone={};
    $scope.sendYzmFlag='获取验证码';
    $scope.sendYzm=function () {
        if(!$scope.bindPhone.mobileNumber){
            $rootScope.showTip('请输入手机号码');
        }else{
            if (!(/^1[34578]\d{9}$/.test($scope.bindPhone.mobileNumber))) {
                $rootScope.showTip('手机号码格式不正确');
            }else{
                if($scope.sendYzmFlag=='获取验证码'){
                    httpService.getData(JYApi.sendMg, 'post', {
                        params: JSON.stringify({
                            "mobileNumber": $scope.bindPhone.mobileNumber,
                            sendType: 'login'
                        })
                    }, function (res) {
                        if (res.status == 'S') {
                            $scope.sendYzmFlag=60;
                            var djs = $interval(function () {
                                if ($scope.sendYzmFlag > 1) {
                                    $scope.sendYzmFlag--;
                                } else {
                                    $interval.cancel(djs);
                                    $scope.sendYzmFlag = '获取验证码';
                                }
                            }, 1000);
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: '<i class="iconTip ion-close-circled"></i>' + res.msg
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        }
                    },2);
                }
            }
        }
    };
    $scope.getCode=function(){
        $scope.yzmCode=locals.baseUrl()+'/frontUIWebapp/appserver/validateCodeService/createImage?id='+Math.random();
    };
    $scope.getCode();
    $scope.login=function(){
        httpService.getData(JYApi.lockSeatLogin, 'post', {
            params: JSON.stringify({
                "mobileNumber":$scope.bindPhone.mobileNumber,
                "numCode":$scope.bindPhone.vertifyCode,
                imgCode:$scope.bindPhone.captcha1,
                sourceId:$stateParams.sourceId,
                shareCode:$stateParams.shareCode
            })
        }, function (res) {
            if(res.status=='200'){
                $scope.needBind=false;
                if(res.data.memberId){
                    res.data.token=res.token;
                    localStorage.userInfo=JSON.stringify(res.data);
                    $scope.findMember(res.data.memberId);
                }
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: res.msg
                });
                $timeout(function () {
                    myPopup.close();
                }, 2000);
            }
        })
    };
    $scope.goLogin=function(){
        $scope.needBind=false;
        //$state.go('login', {viewName: 'home', urlParams: JSON.stringify($stateParams)});
        $state.go('login', {viewName: 'home'});
        $ionicViewSwitcher.nextDirection("none")
    };
    $scope.onSwipeDown =function(){
        if ($scope.sTop == 0 && $scope.direction == 'down') {
            $scope.slideDown();
        }
    };
    $scope.playVideo=function(){
        $state.go('playVideo',{movieId: $scope.movieId});
    };
    $scope.playVideoFlag=false;
    $scope.findImages=function(){
        httpService.getData(JYApi.findImages, 'post', {
            params: JSON.stringify({
                "targetId":$scope.movieId,
                "targetType":"FILM_BANNER",
                "mtimeMessageType":"TRAILER",
                "type":"filmImg",
                "imgChannel":"APP"
            })
        }, function (res) {
            if(res.status=="S"){
              if(res.data.length>1){
                  $scope.playVideoFlag=true;
              }
            }
        })
    };
    $scope.findImages();
    //$scope.goArticleDetail=function(id){
    //    window.location.href=locals.returnUrl() +"/?from=timeline#/articleDetail?id="+id;
    //};
    //$scope.goHome=function(){
    //    window.location.href=locals.returnUrl();
    //};
});
