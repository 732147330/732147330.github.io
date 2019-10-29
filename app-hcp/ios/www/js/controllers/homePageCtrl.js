/**
 * Created by pgr on 2017/10/9.
 */
'use strict';
app.controller('homePageCtrl', function($scope,$rootScope,$ionicPopup,$ionicModal,$ionicBackdrop,$timeout,$state,httpService,JYApi,$stateParams,$ionicSlideBoxDelegate) {


    $scope.showShare = function (e) {
        $scope.modal.show();
        $ionicBackdrop.retain();
        e.stopPropagation();
        $(document).bind("click", function (e) {
            $scope.hideShare(e);
        });
    };

    $scope.hideShare = function (e) {
        $scope.modal.hide();
        $timeout(function(){
            $ionicBackdrop.release();
        },500);
        e.stopPropagation();
    };

    //$scope.getEncryption=function (value) {
    //    var val = Base64.encode(value);
    //    var arr = [];
    //    for(var i=0;i<val.length;i++){
    //        arr.push(val.charAt(i));
    //        if(i%2){
    //            var num1 =  Math.floor(10*Math.random());
    //            arr.push(num1);
    //            var num2 =  Math.floor(10*Math.random());
    //            arr.push(num2);
    //            var num3 =  Math.floor(10*Math.random());
    //            arr.push(num3)
    //        }
    //    }
    //    return arr.join("");
    //};
    //$scope.shareTime=new Date().getTime();
    //if(localStorage.userInfo){
    //    $scope.shareCode=JSON.parse(localStorage.userInfo).memberId+$scope.shareTime;
    //}

    //微信好友分享
    $scope.shareWechat = function () {
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
                            $state.go('login', {viewName: 'homePage', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else {
            Wechat.share({
                message: {
                    title: $scope.memberData.mmbName,
                    description: '',
                    thumb: $scope.memberData.logoImageUrl,
                    media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl: locals.returnUrl() + "/#/homePage?memberId=" + $scope.shareId
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
                            $state.go('login', {viewName: 'homePage', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else {
            Wechat.share({
                message: {
                    title: $scope.memberData.mmbName,
                    description: '',
                    thumb: $scope.memberData.logoImageUrl,
                    media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl:  locals.returnUrl() + "/#/homePage?memberId=" +$scope.shareId
                    }
                },
                scene: Wechat.Scene.Timeline
            }, function () {
                //httpService.getData(JYApi.shareInfo,'post',{
                //    params:JSON.stringify({
                //        "sourceId":$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
                //        "shareCode":$scope.getEncryption($scope.shareCode)
                //    })
                //},function(res){
                //});
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
                            $state.go('login', {viewName: 'homePage', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else {
            var args = {};
            args.url = locals.returnUrl() + "/#/homePage?memberId=" + $scope.shareId;
            args.title = $scope.memberData.mmbName;
            args.description = '';
            args.imageUrl = $scope.memberData.logoImageUrl;
            args.defaultText = languageSetting.jydy;
            YCWeibo.shareToWeibo(function () {
                //httpService.getData(JYApi.shareInfo,'post',{
                //    params:JSON.stringify({
                //        "sourceId":$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
                //        "shareCode":$scope.getEncryption($scope.shareCode)
                //    })
                //},function(res){
                //});
            }, function (failReason) {

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
                            $state.go('login', {viewName: 'homePage', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else {
            var args = {};
            args.url =  locals.returnUrl() + "/#/homePage?memberId=" + $scope.shareId;
            args.title = $scope.memberData.mmbName;
            args.description = '';
            args.imageUrl = $scope.memberData.logoImageUrl;
            args.appName = languageSetting.jydy;
            YCQQ.shareToQQ(function () {

            }, function (failReason) {

            }, args);
        }
    };


    $scope.index=1;
    $scope.activeIndex=$scope.index;
    $scope.getCurrentData=function(index){
        $scope.activeIndex=index;
        $ionicSlideBoxDelegate.update();
    };
    $scope.slideHasChanged=function(index){
        $scope.activeIndex=index;
        $ionicSlideBoxDelegate.update();
    };
    $scope.slideTo=function(){
        return $scope.activeIndex;
    };
    //$scope.findLytTxnPointValue=function(flag,suc,isDorefresh){
    //    httpService.getData(JYApi.findLytTxnPointValue, 'post', {
    //        params:JSON.stringify({
    //            memberId:$rootScope.userInfo.memberId,
    //            pointTypeId:flag,
    //            pageIndex:1,
    //            pageRows:1000
    //        })
    //    }, function (res) {
    //        //console.log(res)
    //        //if(res.status=="S"){
    //        suc(res);
    //
    //        //}
    //    },2,'',isDorefresh);
    //};
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $ionicModal.fromTemplateUrl('templates/modal4.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
    });
    $scope.$on('$ionicView.leave',function(event,data){
        $(document).unbind("click");
    });
    $scope.$on('$ionicView.enter',function(){
        if($stateParams.memberId&&!localStorage.userInfo){
            $scope.sMemberId=$stateParams.memberId;
        }else if($stateParams.memberId&&localStorage.userInfo){
            if(JSON.parse(localStorage.userInfo).memberId==$stateParams.memberId){
                $scope.memberId=JSON.parse(localStorage.userInfo).memberId;
                $scope.sMemberId=null;
            }else{
                $scope.sMemberId=$stateParams.memberId;
            }
        }else if(!$stateParams.memberId){
            $scope.sMemberId=null;
            $scope.memberId=JSON.parse(localStorage.userInfo).memberId
        }
        $scope.findFanOrFollowCount();
        $scope.findMemberInfo();
        $scope.findPersonCenter($scope.page,$scope.pageSize);
        $scope.shareId=$scope.sMemberId?$scope.sMemberId:$scope.memberId;
        ////我的文章
        //$scope.findLytTxnPointValue(1,function(res){
        //    $scope.untakeData=res.data;
        //
        //});
        ////我的影评
        //$scope.findLytTxnPointValue(2,function(res){
        //    $scope.takedData=res.data;
        //
        //});
    });

    //下拉刷新
    $scope.doRefresh = function () {
        //刷新数据
        //if($scope.activeIndex==0){
        //    $scope.findLytTxnPointValue(1,function(res){
        //        $scope.untakeData=res.data;
        //    },true);
        //}else if($scope.activeIndex==1){
        //    $scope.findLytTxnPointValue(2,function(res){
        //        $scope.takedData=res.data;
        //    },true);
        //}
        //$scope.$broadcast('scroll.refreshComplete');
    };
    //查询会员信息
    $scope.findMemberInfo =function(){
        httpService.getData(JYApi.findMemberInfo, 'post', {
            params:JSON.stringify({
                sMemberId: $scope.sMemberId?$scope.sMemberId:$scope.memberId
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.memberData=res.data[0];
            }
        });
    };

    //查询粉丝、关注数量
    $scope.findFanOrFollowCount =function(){
        httpService.getData(JYApi.findFanOrFollowCount, 'post', {
            params:JSON.stringify({
                sMemberId: $scope.sMemberId?$scope.sMemberId:$scope.memberId
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.fanOrFollowCountData=res.data
            }
        });
    };

    //查询影评
    $scope.noMorePage=false;
    $scope.pageSize=10;
    $scope.page=1;
    $scope.findPersonCenter =function(page,pageSize){
        httpService.getData(JYApi.findPersonCenter, 'post', {
            params:JSON.stringify({
                sMemberId: $scope.sMemberId?$scope.sMemberId:$scope.memberId,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            if(res.status=="S"&& res.data.length>0) {
                if($scope.page==1){
                    $scope.personCenterData=[];
                }
                angular.forEach(res.data,function(value,key){
                    if(value.creationDate){
                        value.date=value.creationDate.substring(0,10);
                    }
                    value.strs= [];
                    if(value.laber){
                        value.strs=value.laber.split(","); //字符分割
                    }
                    angular.forEach(value.list,function(v1,k1){
                        v1.starArr=[];
                        for(var i=0;i<v1.score;i++){
                            v1.starArr.push(i);
                        }
                    });
                    $scope.personCenterData.push(value);
                });
                if(res.data.length<$scope.pageSize){
                    $scope.noMorePage=true;
                }
                $scope.homePageFlag=true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }else{
                $scope.noMorePage=true;
                //$scope.noDataFlag=true;
                $scope.homePageFlag=true;
            }
        });
        console.log($scope.personCenterData)
    };

    //上拉加载更多
    $scope.loadMore=function(){
        $scope.page++;
        $scope.findCommentFilmDetail($scope.page,$scope.pageSize);
    };
    //关注
    $scope.saveCmtFanFollowP =function(){
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
                            $state.go('login', {viewName: 'homePage', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else {
            httpService.getData(JYApi.saveCmtFanFollowP, 'post', {
                params: JSON.stringify({
                    type: "FAN",
                    cmtMemberId: $scope.sMemberId
                })
            }, function (res) {
                if (res.status == "S") {
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i>已关注'
                    });
                    $timeout(function () {
                        $scope.findMemberInfo();
                        $scope.findFanOrFollowCount();
                        myPopup.close();
                    }, 2000);
                }
            });
        }
    };

});