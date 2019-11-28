/**
 * Created by xiongshengzhong on 16/8/18.
 * 2017.1.10 影片详情剧照无数据不出现下滑按钮
 */
'use strict';
app.controller('movieDetailCtrl', function ($scope,$rootScope,$state, $stateParams, $ionicPlatform, $ionicPopup, $ionicSlideBoxDelegate, httpService, JYApi, $ionicBackdrop, myhrefService, $ionicModal, $ionicScrollDelegate, $timeout, $cordovaStatusbar) {
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
        if($rootScope.isMobile){
            $cordovaStatusbar.style(1);
        }
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
        if($rootScope.isMobile){
            $cordovaStatusbar.style(0);
        }
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
    $scope.onSwipeDown =function(){
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
    $scope.shareTime=new Date().getTime();
    if(localStorage.userInfo){
        $scope.shareCode=JSON.parse(localStorage.userInfo).memberId+$scope.shareTime;
    }
    //微信好友分享
    $scope.shareWechat = function () {
        //Share link
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
            Wechat.share({
                message: {
                    title:$scope.movieData.mtimeFilmName,
                    description:$scope.movieData.ratingDescription,
                    thumb:$scope.thumb,
                    media: {
                        type: Wechat.Type.WEBPAGE,
                        // webpageUrl: locals.baseUrl()+"/wap/#/movieDetail?movieId="+$scope.movieId+'&sendId='+Base64.encode(JSON.parse(localStorage.userInfo).memberId)
                        webpageUrl: locals.baseUrl()+"/wap/#/movieDetail?movieId="+$scope.movieId
                    }
                },
                scene: Wechat.Scene.SESSION
            }, function () {

            }, function (reason) {

            });
        }
    };

    //微信朋友圈分享
    $scope.shareWechatFriend=function(){
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
        }else {
            Wechat.share({
                message: {
                    title: $scope.movieData.mtimeFilmName,
                    description: $scope.movieData.ratingDescription,
                    thumb: $scope.thumb,
                    media: {
                        type: Wechat.Type.WEBPAGE,
                        // webpageUrl: locals.baseUrl() + "/wap/#/movieDetail?movieId=" + $scope.movieId + '&sendId=' + Base64.encode(JSON.parse(localStorage.userInfo).memberId)
                        webpageUrl: locals.baseUrl() + "/wap/#/movieDetail?movieId=" + $scope.movieId+'&sourceId='+$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId)+'&shareCode='+ $scope.getEncryption($scope.shareCode)
                    }
                },
                scene: Wechat.Scene.Timeline
            }, function () {
                httpService.getData(JYApi.shareInfo,'post',{
                    params:JSON.stringify({
                        "sourceId":$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
                        "shareCode":$scope.getEncryption($scope.shareCode)
                    })
                },function(res){
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
            }, function (reason) {

            });
        }
    };
    //微博分享
    $scope.shareWeibo=function(){
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
        }else {
            var args = {};
             //args.url = 'http://sie-test.jycinema.com:6680/wap/#/articleDetail?id=54';
            args.url = locals.baseUrl() + '/wap/#/movieDetail?movieId=' + $scope.movieId+'&sourceId='+$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId)+'&shareCode='+ $scope.getEncryption($scope.shareCode);
            args.title = $scope.movieData.mtimeFilmName;
            args.description = $scope.movieData.ratingDescription;
            //args.imageUrl = $scope.movieData.posterUrl;
            args.imageUrl =  'http://file.jycinema.com:9680/group1/M00/00/D4/wKgoalpxpfSAGPYrAAA6gkLzRRs788.jpg';
            args.defaultText = languageSetting.jydy;
            YCWeibo.shareToWeibo(function () {
                //httpService.getData(JYApi.shareInfo,'post',{
                //    params:JSON.stringify({
                //        "sourceId":$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
                //        "shareCode":$scope.getEncryption($scope.shareCode)
                //    })
                //},function(res){
                //    if(res.status=='S'){
                //        var myPopup = $ionicPopup.show({
                //            title: languageSetting.tip,
                //            cssClass: 'jyAlert',
                //            template: res.msg,
                //            buttons: [
                //                {
                //                    text: '确定',
                //                    type: 'button-calm',
                //                    onTap: function (e) {
                //                        myPopup.close();
                //                    }
                //                }
                //            ]
                //        });
                //    }
                //});
            }, function (failReason) {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: languageSetting.shareFail + '!'
                });
                $timeout(function () {
                    myPopup.close();
                }, 2000);
            }, args);
        }
    };

    //qq分享
    $scope.shareQq=function(){
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
        }else {
            var args = {};
            // args.url = locals.baseUrl() + "/wap/#/movieDetail?movieId=" + $scope.movieId + '&sendId=' + Base64.encode(JSON.parse(localStorage.userInfo).memberId);
            args.url = locals.baseUrl() + "/wap/#/movieDetail?movieId=" + $scope.movieId;
            args.title = $scope.movieData.mtimeFilmName;
            args.description = $scope.movieData.ratingDescription;
            args.imageUrl = $scope.movieData.posterUrl;
            args.appName = languageSetting.jydy;
            YCQQ.shareToQQ(function () {

            }, function (failReason) {

            }, args);
        }
    };

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
});
