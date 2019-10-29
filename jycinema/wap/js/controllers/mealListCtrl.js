'use strict';
app.controller('mealListCtrl', function ($scope, $rootScope,$timeout,$ionicViewSwitcher,httpService,$location, $interval,JYApi,$stateParams,$ionicPopup,$state,$ionicBackdrop,$ionicModal,$ionicScrollDelegate,$http) {

    $scope.goLogin=function(){
        $scope.needBind=false;
        $state.go('login', {viewName: 'mealList', urlParams: JSON.stringify($stateParams)});
        $ionicViewSwitcher.nextDirection("none")
    };

    //获取卖品信息
  $scope.page=1;
  $scope.pageSize=10;
  $scope.findItemGood=function (pageIndex,pageRows) {
    httpService.getData(JYApi.findItemGood, 'post', {
      params:JSON.stringify({
        imgChannel:"APP",
        skuItemType:"GROUND_GOODS",
        cinemaOuterId:$stateParams.cinemaOutId,
        type:"itemGoods",
        pageIndex:pageIndex,
        pageRows:pageRows
      })
    }, function (res) {
        $scope.salesData=res.data;
        $scope.getMinValue($scope.salesData);
        $scope.calcTotal();

        // if(res.data.length>0){
        //   $scope.hasSales=true;
        // }
        // if(pageIndex==1){
        //   $scope.salesData=res.data;
        // }else{
        //   angular.forEach(res.data,function (value,key) {
        //     $scope.salesData.push(value);
        //   });
        // }
        // angular.forEach($scope.salesData,function (value,key) {
        //   value.salesQty=0;
        // });
        // if(res.count>$scope.salesData.length){
        //   $scope.hasMore=true;
        //   $scope.page++;
        // }else{
        //   $scope.hasMore=false;
        // }
        // $ionicScrollDelegate.resize();
    },2);
  };
  //$scope.findItemGood(1,100);

    //计算最优
    $scope.getMinValue=function (data) {
        //console.log(data)
        angular.forEach(data,function (value,key) {
            value.minValue= _.min(value.activityInfo,(item)=>{
                return item.newPriceincents;
            });
        });
        //分组显示
        $scope.newActivityGroupIdArr=[];
        $scope.activityGroupIdArr=[];
        $scope.activeIndexArr=[];
        angular.forEach($scope.salesData,function (value,key) {
            $scope.activityGroupIdArr.push(value.minValue.activityGroupId)
        });
        $scope.activityGroupIdArr=_.uniq($scope.activityGroupIdArr);
    
        angular.forEach($scope.activityGroupIdArr,function (v,k) {
            angular.forEach($scope.salesData,function (value,key) {
                if (value.minValue.activityGroupId == v) {
                    $scope.newActivityGroupIdArr.push(value);
                    $scope.activeIndexArr[k]=key
                }
            })
        });
        //console.log($scope.newActivityGroupIdArr)
        // angular.forEach($scope.newActivityGroupIdArr,function (value,key) {
        //     angular.forEach($scope.activeIndexArr,function (v,k) {
        //         if(key==v){
        //             $scope.newActivityGroupIdArr[key].active=true;
        //         }
        //     });
        // });
    };




  //加载更多
  // $scope.getMoreSales=function () {
  //   $scope.findItemGood($scope.page,$scope.pageSize);
  // };

  //购物数量控制
  $scope.add=function (row,index) {
      if(!row[index].salesQty){
          row[index].salesQty=0;
      }
      row[index].salesQty++;
    $scope.calcTotal();
  };
  $scope.reduce=function (row,index) {
    if(row[index].salesQty && row[index].salesQty>0){
      row[index].salesQty--;
    }
    $scope.calcTotal();
  };
  //计算总价(包含卖品)
    $scope.valuesData=[];
  $scope.calcTotal=function () {
    $scope.salesTotal=0;
    $scope.valuesData=[];
      console.log($scope.categoryListNewData)
    angular.forEach($scope.categoryListNewData,function (v,k) {
        angular.forEach(v.itemGoodsList,function(value,key){
            if(value.selValue){
                // value.selValue.newPriceincents=value.selValue.newPriceincents<0?0:value.selValue.newPriceincents;
                //
                //判断满减

                $scope.salesTotal+=Number(value.costPrice/100 * value.salesQty)
            }else{
                // value.minValue.newPriceincents=value.minValue.newPriceincents<0?0:value.minValue.newPriceincents;
                value.salesQty=value.salesQty?value.salesQty:0;
                $scope.salesTotal+=Number(value.costPrice/100) * Number(value.salesQty)
            }

            if(value.salesQty>0){
                $scope.valuesData.push({
                    bn:value.bn,
                    title:value.title,
                    num:value.salesQty,
                    price:value.costPrice
                });
            }
        })

    });

  };
    $scope.getCode=function(){
        $scope.yzmCode=locals.baseUrl()+'/frontUIWebapp/appserver/validateCodeService/createImage?id='+Math.random();
    };
    $scope.getCode();
  //
    $scope.login=function(){
        httpService.getData(JYApi.lockSeatLogin, 'post', {
            params: JSON.stringify({
                "mobileNumber":$scope.bindPhone.mobileNumber,
                "numCode":$scope.bindPhone.vertifyCode,
                imgCode:$scope.bindPhone.captcha1
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
    $scope.hide=function () {
        $scope.needBind=false;
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
  $scope.buildSales=function () {
      $scope.params=[];
      console.log($scope.categoryListNewData)
      if($stateParams.scanCodeFlag==1){
          $scope.scanCode='ORDER_FOR_GOODS'
      }else if($stateParams.scanCodeFlag==2){
          $scope.scanCode='ORDER_FOR_GOODS'
      }else{
          $scope.scanCode=''
      }
      angular.forEach($scope.categoryListNewData,function (v,k) {
          angular.forEach(v.itemGoodsList,function(value,key) {
              if (value.salesQty) {
                  $scope.params.push({
                      skuId: value.skuId,
                      cinemaOuterId: value.cinemaOuterId,
                      screenName: $stateParams.screenName,
                      seatDeatilMessage: $stateParams.seatDeatilMessage,
                      scanCodeFlag: $scope.scanCode,
                      salesQty: value.salesQty,
                      title: value.titleAlt,
                      accessPath: value.accessPath,
                      costPrice: value.costPrice,
                      cinemaId: value.cinemaId,
                      specInfo: value.specInfo
                  });
              }
          })
      });
      sessionStorage.selesParams=JSON.stringify($scope.params);
      //判断是否登录
      if($scope.valuesData.length==0){
          var myPopup = $ionicPopup.show({
              title: languageSetting.tip,
              cssClass: 'jyAlert',
              template: "！请选择您要购买的卖品",
              buttons: [
                  {
                      text: "确定",
                      type: 'button-default',
                      onTap: function () {
                          myPopup.close();
                      }
                  }
              ]
          });
          return;
      }
      if(!localStorage.userInfo){
          $scope.needBind=true;
          return;
      }else{
          $scope.userInfo = JSON.parse(localStorage.userInfo);
      }
      if($scope.valuesData.length>0){
          $state.go('querySalesOrder');
      } else{
              var myPopup = $ionicPopup.show({
                  title: languageSetting.tip,
                  cssClass: 'jyAlert',
                  template: "！请选择您要购买的卖品",
                  buttons: [
                      {
                          text: "确定",
                          type: 'button-default',
                          onTap: function () {
                              myPopup.close();
                          }
                      }
                  ]
              });
          }
  };


    $scope.$on("$ionicView.enter", function (event, data) {
        localStorage.removeItem('urlMealList');
        $ionicModal.fromTemplateUrl('meallist', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
    });

    $scope.$on("$ionicView.leave", function (event, data) {
        if($scope.modal){
            $scope.modal.hide();
            $ionicBackdrop.release();
        }
    });

    $scope.hideModal = function () {
        $scope.modal.hide();
        $ionicBackdrop.release();
    };

    $scope.showModal = function (index) {
        $scope.currentIndex=index;

        if(!$scope.newActivityGroupIdArr[index].selValue){
            angular.forEach($scope.newActivityGroupIdArr[index].activityInfo,function (value,key) {
                if(value.activityGroupId==$scope.newActivityGroupIdArr[index].minValue.activityGroupId){
                    value.active=true;
                }
            });
        }

        $scope.modal.show();
        $ionicBackdrop.retain();
    };

    //切换
    $scope.changeSel=function (index) {
        angular.forEach($scope.newActivityGroupIdArr[$scope.currentIndex].activityInfo,function (value,key) {
            if(key==index){
                value.active=true;
            }else{
                value.active=false;
            }
        });
    };

    //确定
    $scope.confirm=function () {
        angular.forEach($scope.newActivityGroupIdArr[$scope.currentIndex].activityInfo,function (value,key) {
            if(value.active){
                $scope.newActivityGroupIdArr[$scope.currentIndex].selValue=value;
            }
        });
        $scope.hideModal();
    }

//新需求
    //初始化设置
    $scope.pageSize=100;
    $scope.page=1;
    $scope.noMorePage=false;
    //获取商品分类
    $scope.getCategoryNew=function () {
        httpService.getData(JYApi.findIc, 'post', {
            params:JSON.stringify({
                type:"ITEM_GOODS"
            })
        }, function (res) {
            if(res.status=='S'){
                $scope.categoryNewData=res.data;
                angular.forEach($scope.categoryNewData,function(value,key){
                    value.active=false;
                });
                $scope.categoryNewData[0].active=true;
                $scope.catId=$scope.categoryNewData[0].catId;
                $scope.findItemGoodNew(1,$scope.pageSize,$scope.catId);
            }
        })
    };
    //$scope.getCategoryNew();

    $scope.findItemGoodNew=function (page,pageSize,catId) {
        httpService.getData(JYApi.findItemGood, 'post', {
            params:JSON.stringify({
                imgChannel:"APP",
                skuItemType:"GROUND_GOODS",
                //cinemaOuterId:$stateParams.cinemaOutId,
                cinemaOuterId: $stateParams.cinemaOutId,
                type:"itemGoods",
                secondCatId:catId,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            if(res.status=="S" && res.data.length>0){
                if($scope.page==1){
                    $scope.salesData=[];
                }
                angular.forEach(res.data,function(v,k){
                    $scope.salesData.push(v);
                });
                if(res.data.length<$scope.pageSize){
                    $scope.noMorePage=true;
                }
                $scope.getMinValue($scope.salesData);
                $scope.calcTotal();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }else{
                $scope.noMorePage=true;
            }
        });
    };

    //切换
    $scope.changeFindItemGoodNew=function(catId,index){
        $scope.catId=catId;
        if(index==0){
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, 0, [true])
        }else{
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, $scope.categoryListNewData[index-1].numHigh, [true])
        }
    };
    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop();
    };
    //上拉加载更多
    $scope.loadMore=function(){
        $scope.page++;
        $scope.findItemGoodNew($scope.page,$scope.pageSize,$scope.catId);

    };
    //展开活动详情
    $scope.showDetial=function(row,index){
        row[index].showCon = !row[index].showCon;
    };
    $scope.scrollContent=function () {
        $scope.top=$ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top;
        var index = 0;
        for(var k = 0; k < $scope.categoryListNewData.length; k++){
            if(k == 0){
                if(0<= $scope.top&&$scope.top<$scope.categoryListNewData[0].numHigh){
                    index = k;
                }
            }else{
                if($scope.categoryListNewData[k-1].numHigh <= $scope.top && $scope.top < $scope.categoryListNewData[k].numHigh){
                    index = k;
                    break;
                }
            }
        }
        $scope.test(index);
        $scope.$apply();
    };

    $scope.test =function(k){
        if(k == 0){
            if(0<= $scope.top&&$scope.top<$scope.categoryListNewData[0].numHigh){
                $scope.categoryListNewData[0].active=true;
                angular.forEach($scope.categoryListNewData,function(v,key){
                    if(key!=k){
                        $scope.categoryListNewData[key].active=false;
                    }
                })
            }else{
                $scope.categoryListNewData[0].active=false;
            }
        }else{
            if($scope.categoryListNewData[k-1].numHigh <= $scope.top &&  $scope.top < $scope.categoryListNewData[k].numHigh){
                $scope.categoryListNewData[k].active=true;
                angular.forEach($scope.categoryListNewData,function(v,key){
                    if(key!=k){
                        $scope.categoryListNewData[key].active=false;
                    }
                })
            }else{
                $scope.categoryListNewData[k].active=false;
            }
        }
        $scope.$apply();
    };
    $scope.findScheduleProductList=function () {
        httpService.getData(JYApi.findScheduleProductList, 'post', {
            params:JSON.stringify({
                imgChannel:"APP",
                "typeIn": "itemGoods",
                "typeOut": "ITEM_GOODS",
                "skuItemType": "GROUND_GOODS",
                //cinemaOuterId:$stateParams.cinemaOutId,
                purchaseType:$scope.scanCodeFlag?'Y':'',
                cinemaOuterId: $stateParams.cinemaOutId,
                pageIndex:1,
                pageRows:100
            })
        }, function (res) {
            var num =0;
            angular.forEach(res.data,function(v,k){
                res.data[0].active=true;
                if(v.itemGoodsList[0].activityInfo){
                    v.high = v.itemGoodsList.length*135;
                }else{
                    v.high = v.itemGoodsList.length*114;
                }
                num=num+  v.high;
                v.numHigh =num
            });
            $scope.categoryListNewData=res.data;
            console.log($scope.categoryListNewData)
            $scope.cinemaNameAlt=res.cinemaNameAlt;
            //alert($scope.categoryListNewData)
        })
    };
    //$scope.findScheduleProductList();
    //扫码自动登录
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
    $scope.findMember=function(memberId,openId){
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
            }else{
                $rootScope.showTip('获取会员信息失败');
            }
        });
    };
    $scope.isWeixin=function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            $scope.weixinFlag=true;
        } else {
            $scope.weixinFlag=false;
        }
    };
    $scope.isWeixin();
    //if($stateParams.scanCodeFlag!=1&&!$scope.scanCodeFlag){
    //    alert(4)
    //    $scope.findScheduleProductList();
    //}else if($stateParams.scanCodeFlag==1&&!$scope.weixinFlag){
    //    alert(8)
    //    $scope.scanCodeFlag= $stateParams.scanCodeFlag?$stateParams.scanCodeFlag:'';
    //    $scope.findScheduleProductList();
    //}

    //第三方微信登陆
    $scope.weixinLogin=function(){
        location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5d69bdaaa9765cda&redirect_uri='
            +encodeURIComponent(locals.returnUrl()+'/#/mealList/'+$stateParams.cinemaOutId+'/'+$stateParams.screenName+'/'+$stateParams.seatDeatilMessage+'/2')
            +'&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect';
    };
    if($scope.weixinFlag==true&&$stateParams.scanCodeFlag==1){
        $scope.weixinLogin();
    }else if($scope.weixinFlag==false&&$stateParams.scanCodeFlag==1){
        $scope.scanCodeFlag= $stateParams.scanCodeFlag?$stateParams.scanCodeFlag:'';
        $scope.findScheduleProductList();
    }else if($stateParams.scanCodeFlag!=1&&$stateParams.scanCodeFlag!=2){
        $scope.findScheduleProductList();
    }else if($stateParams.scanCodeFlag==2){
        $scope.scanCodeFlag= $stateParams.scanCodeFlag?1:'';
        $scope.findScheduleProductList();
    }
    $scope.$on('$ionicView.enter',function(){
        var url=window.location.href;
        if (url.indexOf('?code') > 0&&$stateParams.scanCodeFlag==2) {
            var code = url.split('?')[1].split('&')[0].split('=')[1];
            var params={platform:'WX_LOGIN', code:code};
            $http({
                url: JYApi.getWechatUserinfo,
                method: 'post',
                data: $.param(params),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                timeout: 20000
            }).success(function (res) {
                $scope.unionid=res.unionid;
                if(res.unionid){
                    $http({
                        url: JYApi.loginAPPNew + '?unionid=' + res.unionid+'&channelCode='+"J0005"+'&isScanCode='+'Y',
                        method: 'get',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                        },
                        timeout: 20000
                    }).success(function (res) {
                        if (res.status == '200') {
                            var userInfo = res.data;
                            userInfo.token = res.token;
                            $rootScope.userInfo = userInfo;
                            localStorage.userInfo = JSON.stringify(userInfo);
                            $scope.findMember(res.data.memberId);
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: '<i class="iconTip ion-close-circled"></i>'+res.msg
                            });
                            $timeout(function(){
                                myPopup.close();
                            },2000);
                        }
                    },2);

                }else{
                    //var myPopup = $ionicPopup.show({
                    //    title: languageSetting.tip,
                    //    cssClass: 'jyAlert jyAlert1',
                    //    template: '<i class="iconTip ion-close-circled"></i>'+res.msg
                    //});
                    //$timeout(function(){
                    //    myPopup.close();
                    //},2000);
                }
            });
        }
    });



});
