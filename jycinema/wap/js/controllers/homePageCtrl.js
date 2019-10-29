/**
 * Created by pgr on 2017/10/9.
 */
'use strict';
app.controller('homePageCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$location,$state,httpService,JYApi,$stateParams,$ionicSlideBoxDelegate) {

    $scope.shareCode=$stateParams.shareCode?true:false;


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
    //wap微信分享
    $scope.absurl = $location.absUrl();
    $scope.weixin=function(){
        httpService.getData(JYApi.generateConfigSignature, 'post', {
            url:$scope.absurl
        }, function (res) {
            $scope.appId=res.appId;
            $scope.nonceStr=res.nonceStr;
            $scope.timestamp=res.timestamp;
            $scope.signature=res.signature;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: $scope.appId, // 必填，公众号的唯一标识
                timestamp: $scope.timestamp , // 必填，生成签名的时间戳
                nonceStr: $scope.nonceStr, // 必填，生成签名的随机串
                signature:  $scope.signature,// 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        })
    };
    //$scope.weixin();
    wx.ready(function(){
        //分享朋友圈
        if($scope.memberData){
            wx.onMenuShareTimeline({
                title:$scope.memberData.mmbName, // 分享标题
                link: locals.returnUrl() + "/?from=singlemessage#/homePage?memberId="+$scope.shareId,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: $scope.memberData.logoImageUrl, // 分享图标
                success: function () {
                    //httpService.getData(JYApi.shareInfo,'post',{
                    //    params:JSON.stringify({
                    //        "sourceId":$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
                    //        "shareCode":$scope.getEncryption($scope.shareCode)
                    //    })
                    //},function(res){
                    //});
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            //分享朋友
            wx.onMenuShareAppMessage({
                title: $scope.memberData.mmbName,// 分享标题
                desc: '', // 分享描述
                link: locals.returnUrl() + "/?from=singlemessage#/homePage?memberId="+$scope.shareId,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: $scope.memberData.logoImageUrl, // 分享图标
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
                title: $scope.memberData.mmbName,// 分享标题
                desc: '影评', // 分享描述
                link: locals.returnUrl() + "/?from=singlemessage#/homePage?memberId="+$scope.shareId,// 分享链接
                imgUrl: $scope.memberData.logoImageUrl,// 分享图标
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


});