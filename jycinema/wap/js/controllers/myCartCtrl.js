'use strict';
app.controller('myCartCtrl', function($scope,$rootScope,httpService,$state,JYApi,$stateParams,$ionicSlideBoxDelegate,$ionicPopup, $ionicPlatform, $timeout,$location) {

    //查询购物车
    $scope.findCartInfo=function () {
        httpService.getData(JYApi.findCartInfo, 'post', {
            params:JSON.stringify({})
        }, function (res) {
            if(res.status=="S"){
                $scope.cartData=res.data;
                $scope.num=0;
               angular.forEach($scope.cartData,function(value,key){
                   $scope.num+=$scope.cartData[key].quantity
               });
                $scope.cartData.filter(function (item,index) {
                    item.chooseAttrubute='';
                    item.salesData.filter(function(subItem,subIndex){
                        item.chooseAttrubute+=(subItem.propName+':'+subItem.propValue+';')
                    });
                });
                $scope.getTotalPrice();
            }else if(res.status=="L"){
                $location.path('/login')
            }
        },2);
    };

    $scope.$on('$ionicView.enter',function (event,data) {
        $scope.activeAllFlag=false;
        if(!localStorage.userInfo){
            $state.go('login');
        }else{
            $scope.findCartInfo();
        }
    });



//单选
    $scope.changeCart=function (index) {
        $scope.activeNum=0;
        $scope.cartData[index].activeFlag=!$scope.cartData[index].activeFlag;
        $scope.cartData.filter(function (item,index) {
            if(item.activeFlag){
                $scope.activeNum++;
                $scope.productDetailData =item;
                $scope.selectData = item.salesData;
            }
        });
        if($scope.activeNum==$scope.cartData.length){
            $scope.activeAllFlag=true;
        }else{
            $scope.activeAllFlag=false;
        }
        $scope.cartData[index].editFlag=false;
        $scope.getTotalPrice();
       if($scope.activeNum==1){
           $scope.allFlag = false;
       }else{
           $scope.allFlag = true;
           $scope.productDetailDataArr =[];
           $scope.cartData.filter(function (item,index) {
               if(item.activeFlag){
                   $scope.productDetailDataArr.push(item)
               }
           });
       }
    };

    //全选
    $scope.changeSelAll=function () {
        $scope.allFlag = true;
        $scope.productDetailDataArr =[];
        $scope.activeAllFlag=!$scope.activeAllFlag;
        $scope.cartData.filter(function (item,index) {
            item.activeFlag=$scope.activeAllFlag;
            item.editFlag=false;
            $scope.productDetailDataArr.push(item)
        });
        $scope.getTotalPrice();
    };

    //编辑
    $scope.edit=function (index) {
        $scope.cartData[index].editFlag=true;
    };

    //完成
    $scope.ok=function (index) {
        $scope.cartData[index].editFlag=false;
    };

    //新增
    $scope.add=function (index) {
        $scope.cartData[index].quantity++;
        //$scope.cartData[index].activeFlag=true;
        $scope.num++;
        $scope.updateCartInfo($scope.cartData[index].cartId,$scope.cartData[index].quantity);
        $scope.getTotalPrice();
    };

    //减少
    $scope.reduce=function (index) {
        if($scope.cartData[index].quantity>1){
            $scope.cartData[index].quantity--;
            $scope.num--;
            //$scope.cartData[index].activeFlag=true;
            $scope.updateCartInfo($scope.cartData[index].cartId,$scope.cartData[index].quantity);
            $scope.getTotalPrice();
        }
    };
    //更新购物车数量
    $scope.updateCartInfo=function (cartId,quantity) {
        httpService.getData(JYApi.updateCartInfo, 'post', {
            params:JSON.stringify({
                cartId:cartId,
                quantity:quantity
            })
        }, function (res) {
            if(res.status=="S"){
                //$scope.cartData=res.data;
            }
        });
    };
    //删除
    $scope.del=function (index) {
        httpService.getData(JYApi.deleteShopsFromCart, 'post', {
            params:JSON.stringify({
                deleteData: [
                    { cartId: $scope.cartData[index].cartId}
                ]
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.findCartInfo();
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i> 删除成功'
                });
                $timeout(function () {
                    myPopup.close();
                },1000);

            }
        },2);
    };

    //计算总价
    $scope.getTotalPrice=function () {
        $scope.totalPrice=0;
        $scope.cartNum=0;
        $scope.cartData.filter(function (item,index) {
            if(item.activeFlag){
                $scope.totalPrice+=item.quantity*item.price;
                $scope.cartNum+=$scope.cartData[index].quantity;
            }
        });
    };
//结算
    $scope.account=function(){
        if($scope.cartNum==0){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '<i class="jyicon iconfont" style="color:orangered;">&#xe640;</i> 请选中您要购买的商品'
            });
            $timeout(function () {
                myPopup.close();
            },2000);
            return;
        }
        if(!localStorage.userInfo) {
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
                            $state.go('login', {viewName: 'myCart', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        } else{
            if($scope.allFlag == true){
                sessionStorage.myCartDataArr=JSON.stringify( $scope.productDetailDataArr);
                //去生成订单详情页
                $state.go('mallOrder',{status:'cart',allflag:'true'})
            }else{
                sessionStorage.myCartData=JSON.stringify($scope.productDetailData);
                sessionStorage.selectArr=JSON.stringify( $scope.selectData);
                //去生成订单详情页
                $state.go('mallOrder',{status:'cart',allflag:'false'})
            }

        }
    }


});
