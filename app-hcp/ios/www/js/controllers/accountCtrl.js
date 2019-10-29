/**
 * Created by OuYongQiang
 */
'use strict';
app.controller('accountCtrl', function ($scope, $rootScope, $ionicPlatform,$window,$ionicLoading, $timeout, $ionicPopup,$ionicBackdrop,$ionicModal, $ionicActionSheet, $cordovaCamera, $cordovaStatusbar, $ionicViewSwitcher, $state, httpService, JYApi) {
    if (localStorage.userInfo) {
        $rootScope.userInfo = JSON.parse(localStorage.userInfo);
    }
    $scope.userPic = './img/user.png';
    //头像选择
    $scope.showImageUploadChoices = function () {
        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: languageSetting.cameraUpload
            }, {
                text: languageSetting.album
            }],
            cancelText: languageSetting.cancel,
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                // 相册文件选择上传
                if (index == 0) {
                    $scope.taskPicture(0);
                } else if (index == 1) {
                    // 拍照上传
                    $scope.taskPicture(1);
                }
                return true;
            }
        });
    };
    // 拍照
    $scope.taskPicture = function (index) {
        if (index == 0) {
            var type = Camera.PictureSourceType.CAMERA;
        } else if (index == 1) {
            var type = Camera.PictureSourceType.PHOTOLIBRARY;
        }
        $ionicPlatform.ready(function () {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: type,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };
            $cordovaCamera.getPicture(options).then(function (imageData) {
                var imgSrc = "data:image/jpeg;base64," + imageData;
                httpService.getData(JYApi.imageUpload, 'post', {
                    str: imageData
                }, function (res) {
                    if (res.status == "S") {
                        //修改图像
                        var userPath = res.data[0].accessPath;
                        httpService.getData(JYApi.updateMember, 'post', {
                            params: JSON.stringify({
                                "memberId": $rootScope.userInfo.memberId,
                                "logoImageUrl": userPath
                            })
                        }, function (res) {
                            if (res.status == "S") {
                                $rootScope.userInfo.logoImageUrl = userPath;
                                localStorage.userInfo = JSON.stringify($rootScope.userInfo);
                            }
                        });
                    }
                }, 2);
            }, function (err) {

            });
        });
    };
    //$scope.$on('$ionicView.beforeEnter', function (event, data) {
    //    if (locals.isMobile) {
    //        $cordovaStatusbar.style(1);
    //    }
    //});
    //
    //$scope.$on('$ionicView.leave', function (event, data) {
    //    if (locals.isMobile) {
    //        $cordovaStatusbar.style(0);
    //    }
    //});
    $scope.menuSelect = function (menuType) {
        $ionicViewSwitcher.nextDirection("forward");
        switch (menuType) {
            case "myTickets": {
                $state.go(menuType);
            }
            case "myVipHome": {
                $state.go(menuType);
            }
            case "shake": {
                $state.go(menuType);
            }
            case "myFootprint": {
                $state.go(menuType);
            }
            case "messageCenter": {
                $state.go(menuType);
            }
        }
    };

  //获取私信
  $scope.getMsg=function(){
    httpService.getData(JYApi.findCmsPushMessageRecord, 'post', {
      params:JSON.stringify({
        type:'queryAll'
      })
    }, function (res) {
      if(res.status=="S" && res.data.length>0){
        $scope.msgData=res.data;
        $scope.num=0;
        for (var i in  $scope.msgData) {
          if($scope.msgData[i].readFlag=="N"){
            $scope.num++
          }
        }

        $scope.noRead=parseInt($scope.num);
      }else{
        $scope.noRead="";
      }
    });
  };
    ////签到查询
    //$scope.findActionHistory=function(){
    //    httpService.getData(JYApi.findActionHistory, 'post', {
    //        params:JSON.stringify({
    //            memberId:JSON.parse(localStorage.userInfo).memberId
    //        })
    //    }, function (res) {
    //        $scope.sign=res.data
    //    });
    //};
    ////签到
    //$scope.saveActionHistory=function(){
    //    if($scope.sign==false){
    //        return;
    //    }
    //    httpService.getData(JYApi.saveActionHistory, 'post', {
    //        params:JSON.stringify({
    //            memberId:JSON.parse(localStorage.userInfo).memberId,
    //            subType:"WAP",
    //            actionFrom:"WAP",
    //            actionType:"SIGN_IN"
    //        })
    //    }, function (res) {
    //        if(res.status=="S"){
    //            var myPopup = $ionicPopup.show({
    //                title: languageSetting.tip,
    //                cssClass: 'jyAlert jyAlert1',
    //                template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i> 签到成功'
    //            });
    //            $timeout(function () {
    //                myPopup.close();
    //                $scope.findActionHistory();
    //            },2000);
    //        }
    //    });
    //};


    //$scope.findReceivingCenterInfo=function(){
    //    httpService.getData(JYApi.findReceivingCenterInfo,'post',{
    //        params:JSON.stringify({})
    //    },function(res){
    //        if(res.status=='S'){
    //            $scope.showNewYear='Y';
    //            $scope.findReceivingCenterInfoData = res.data;
    //            $scope.RedBadFlag=false;
    //            $scope.accountRedBad.show();
    //            //$ionicBackdrop.retain();
    //        }else{
    //            $scope.showNewYear='N';
    //        }
    //
    //    });
    //};
    //$scope.findReceivingCenterInfoAngain=function(){
    //    httpService.getData(JYApi.findReceivingCenterInfo,'post',{
    //        params:JSON.stringify({})
    //    },function(res){
    //        if(res.status=='S'){
    //            $scope.showNewYear='Y';
    //            //$scope.findReceivingCenterInfoData = res.data;
    //        }else{
    //            $scope.showNewYear='N';
    //        }
    //
    //    });
    //};
    $scope.$on("$ionicView.enter", function (event, data) {
        //$ionicModal.fromTemplateUrl('templates/accountRedBad.html', {
        //    scope: $scope
        //}).then(function (modal) {
        //    $scope.accountRedBad = modal;
        //});
        $scope.chooseActiveFlag=false;
        if(localStorage.userInfo){
            $scope.RedBadFlag=false;
            //$scope.findReceivingCenterInfo();

        }
    });
    $scope.showRedBad=function(){
        $scope.RedBadFlag=true;
    };
    $scope.choose=function(item){
        $scope.chooseActiveData=item;
        angular.forEach($scope.findReceivingCenterInfoData[0].rcLineList,function(v,k){
            if(item==v){
                v.active=false
            }else{
                v.active=true
            }
        });
    };
    $scope.chooseActiveFlag=false;
    //$scope.chooseActive=function(){
    //    if($scope.chooseActiveData==null){
    //        var myPopup = $ionicPopup.show({
    //            title: languageSetting.tip,
    //            cssClass: 'jyAlert jyAlert1',
    //            template: '请您任选一张礼券！'
    //        });
    //        $timeout(function(){
    //            myPopup.close();
    //        },1000);
    //    }else{
    //        httpService.getData(JYApi.receiveGift,'post',{
    //            params:JSON.stringify({
    //                "receivingCenterHeaderId":  $scope.chooseActiveData.receivingCenterHeaderId,
    //                "receivingCenterLineId":  $scope.chooseActiveData.receivingCenterLineId
    //            })
    //        },function(res){
    //            if(res.status=='S'){
    //                $scope.chooseActiveFlag=true;
    //                $scope.findReceivingCenterInfoAngain();
    //                $timeout(function(){
    //                    $scope.accountRedBad.hide();
    //                    $ionicBackdrop.release();
    //                },3000);
    //            }else{
    //
    //            }
    //        });
    //    }
    //};
    //$scope.hideRed=function(){
    //    $scope.accountRedBad.hide();
    //    $ionicBackdrop.release();
    //    $scope.RedBadFlag=false;
    //};
    //$scope.$on("$ionicView.leave", function (event, data) {
    //    $scope.accountRedBad.hide();
    //    $ionicBackdrop.release();
    //});
    $scope.callPhone=function(){
        $window.location.href="tel:400 000 8008";
    };

    $scope.findLookupCode=function(id){
        httpService.getData(JYApi.findLookupCode, 'post', {
            params:JSON.stringify({
                "type":"ordinary",
                lookupType:'MMB_LEVEL_POINT_MAP_'+id
            })
        }, function (res) {
            $scope.leveGrowData=res.data;
            $scope.findPlan(id);
        });
    };
    $scope.findPlan=function(id){
        httpService.getData(JYApi.findPlan, 'post', {
            params:JSON.stringify({
                planId:id
            })
        }, function (res) {
            if(res.status=='S'){
                $scope.memberLevelData=res.data.memberLevel;
                $scope.planData=res.data.plan;
                $scope.pointData=res.data.point;
                $scope.high=false;
                if($scope.pointData.length===0) return;
                if(0<$scope.pointData[0].pointValue&&$scope.pointData[0].pointValue<=$scope.leveGrowData[0].tag){
                    $scope.pp=$scope.leveGrowData[0].tag-$scope.pointData[0].pointValue==0?1:$scope.leveGrowData[0].tag-$scope.pointData[0].pointValue+1;
                    $scope.ppLevel=$scope.leveGrowData[1].lookupCode;
                    $scope.progress=($scope.pointData[0].pointValue/($scope.leveGrowData[0].tag/0.22)*100)
                }else if($scope.leveGrowData[0].tag<$scope.pointData[0].pointValue&&$scope.pointData[0].pointValue<=$scope.leveGrowData[1].tag){
                    $scope.pp=$scope.leveGrowData[1].tag-$scope.pointData[0].pointValue==0?1:$scope.leveGrowData[1].tag-$scope.pointData[0].pointValue+1;
                    $scope.ppLevel=$scope.leveGrowData[2].lookupCode;
                    $scope.progress=(22+$scope.pointData[0].pointValue/($scope.leveGrowData[1].tag/0.22)*100)
                }else if($scope.leveGrowData[1].tag<$scope.pointData[0].pointValue&&$scope.pointData[0].pointValue<=$scope.leveGrowData[2].tag){
                    $scope.pp=$scope.leveGrowData[2].tag-$scope.pointData[0].pointValue==0?1:$scope.leveGrowData[2].tag-$scope.pointData[0].pointValue+1;
                    $scope.ppLevel=$scope.leveGrowData[3].lookupCode;
                    $scope.progress=(40+$scope.pointData[0].pointValue/($scope.leveGrowData[2].tag/0.23)*100)
                }else if($scope.leveGrowData[2].tag<$scope.pointData[0].pointValue&&$scope.pointData[0].pointValue<=$scope.leveGrowData[3].tag){
                    $scope.pp=$scope.leveGrowData[3].tag-$scope.pointData[0].pointValue==0?1:$scope.leveGrowData[3].tag-$scope.pointData[0].pointValue+1;
                    $scope.ppLevel=$scope.leveGrowData[4].lookupCode;
                    $scope.progress=(50+$scope.pointData[0].pointValue/($scope.leveGrowData[3].tag/0.32)*100)
                }else if($scope.leveGrowData[3].tag<$scope.pointData[0].pointValue&&$scope.pointData[0].pointValue<=9999999){
                    $scope.high=true;
                    $scope.progress=90;
                }
            }
        });
    };
    $scope.findAllPlan=function(){
        httpService.getData(JYApi.findAllPlan, 'post', {
            params:JSON.stringify({})
        }, function (res) {
            $scope.identityData=res.data;
            angular.forEach($scope.identityData,function(value,key){
                value.text=value.description;
            })
        });
    };
    //修改身份
    $scope.show = function() {
        $ionicActionSheet.show({
            buttons:$scope.identityData,
            cancelText: languageSetting.cancel,
            buttonClicked: function(index) {
                $scope.findLookupCode($scope.identityData[index].planId);
                return true;
            }
        });
    };
    $scope.syncMmbInfo=function(){
        httpService.getData(JYApi.syncMmbInfo, 'post', {
            params:JSON.stringify({})
        }, function (res) {
            if(res.status=='S'){
                $scope.syncMmbInfoFlag=true;
                $scope.findAllPlan();
                $scope.findLookupCode(3);
            }
        });
    };

    $scope.$on('$ionicView.enter',function () {
        if(localStorage.userInfo){
            $scope.getMsg();
            if($scope.syncMmbInfoFlag){
                $scope.findAllPlan();
                $scope.findLookupCode(3);
            }else{
                $scope.syncMmbInfo();
            }
            //$scope.findActionHistory();
        }else{
            $scope.noRead="";
        }

    });

    $scope.sougou=function(){
        if(sessionStorage.newcurrentLineList=='undefined'){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: '小主，您所在的城市没有金逸影院!请您切换到有金逸影院的城市进行选购吧！'
            });
            $timeout(function () {
                myPopup.close();
            }, 2000);
        }else{
            $scope.newcinemaData=sessionStorage.newcinemaData?JSON.parse(sessionStorage.newcinemaData):'';
            $scope.newcurrentLineList=sessionStorage.newcurrentLineList?JSON.parse(sessionStorage.newcurrentLineList):'';
            console.log( $scope.newcinemaData)
            console.log($scope.newcurrentLineList)
            $state.go('schedule',{'movieId':$scope.newcurrentLineList.filmId,theatreId: $scope.newcinemaData.cinemaId})
        }
    }

    //获取积分、余额、成长值和可用券数量
    $scope.cardIntegral = 0;
    $scope.cardBalance = 0;
    $scope.cardLevel = "无";
    $scope.couponCount = 0;
    $scope.findCardInfo = function () {
        httpService.getData(JYApi.getCardInfo, 'post', {
            params:JSON.stringify({
            })
        }, function (res) {
            if(res.data) {
                var data = res.data;
                if(!res.data.error || res.data.error != 'F'){
                    $scope.cardIntegral = data.integro ? data.integro : 0;
                    $scope.cardBalance = data.cardBalance ? data.cardBalance : 0;
                    $scope.cardLevel = data.level ? data.level : "无";
                }else {
                    $scope.cardIntegral = 0;
                    $scope.cardBalance = 0;
                    $scope.cardLevel = "无";
                }
            }
        });
        httpService.getData(JYApi.findMyVouLifetimeCount, 'post', {
            params:JSON.stringify({
            })
        }, function (res) {
            if(res) {
                $scope.couponCount = res.count ? res.count : 0;
            }else {
                $scope.couponCount = 0;
            }
        });
    }
    $scope.$on("$ionicView.enter", function (event, data) {
        $scope.findCardInfo();
    })
    $scope.findCardInfo();
});
