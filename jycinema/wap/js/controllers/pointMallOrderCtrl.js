'use strict';
app.controller('pointMallOrderCtrl', function($scope,$rootScope,httpService,JYApi,$state,$stateParams,$ionicPopup) {
    $scope.addressType=[{name:'影院自提',value:'SINCE_ADDRESS'},{name:'快递配送',value:'DELIVERY_ADDRESS'}];
    $scope.currentIndex=0;
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.$on('$ionicView.enter',function () {
        $scope.findMemberAddress();

        if($stateParams.status=="cart"){
            $scope.allflag=$stateParams.allflag;
            $scope.status='cart';
            if($stateParams.allflag=='true'){
                $scope.productDetailDataArr=JSON.parse(sessionStorage.myCartDataArr);
                $scope.qty=0;
                $scope.pointsAmount=0;
                $scope.productDetailDataArr.map(function(item){
                    $scope.qty += item.quantity;
                    $scope.pointsAmount += item.pointsAmount;
                });
            }else if($stateParams.allflag=='false'){
                $scope.selectData =JSON.parse(sessionStorage.selectArr);
                $scope.productDetailData=JSON.parse(sessionStorage.myCartData);
                $scope.productDetailData.appAbbImg=$scope.productDetailData.accessPath;
                $scope.productDetailData.bnName=$scope.productDetailData.title;
                $scope.productDetailData.qty=$scope.productDetailData.quantity;
                $scope.productDetailData.catId=$scope.productDetailData.cartId
            }
        }else if($stateParams.status=="product"){
            $scope.allflag='false';
            $scope.selectData =JSON.parse(sessionStorage.selectArr);
            $scope.productDetailData=JSON.parse(sessionStorage.productDetailData);
            console.log($scope.productDetailData)
            $scope.productDetailData.bnName=$scope.productDetailData.title;
        }

    })
    //购物数量控制
    $scope.add=function () {
        $scope.productDetailData.qty++;
    };
    $scope.reduce=function () {
        if($scope.productDetailData.qty>0){
            $scope.productDetailData.qty--;
        }
    };
    $scope.params ={};
    //提交订单
    $scope.buildOrder=function () {
        if($stateParams.status=="cart"){
            if($stateParams.allflag=='true'){
                var fromCartDataArr =[];
                $scope.productDetailDataArr.map(function(item){
                    var obj = {
                        cartId: item.cartId
                    };
                    fromCartDataArr.push(obj)
                });
                var params=JSON.stringify({
                    memberId:$scope.userInfo.memberId?$scope.userInfo.memberId:'',
                    memberName:$scope.userInfo.mmbName?$scope.userInfo.mmbName:'',
                    receivePhoneNumber:$scope.userInfo.mobileNumber?$scope.userInfo.mobileNumber:'',
                    addressId:$scope.addressListDefault.addressId,
                    quantity:$scope.qty,
                    skuItemType:"ONLINE_GOODS",
                    fromCartData:fromCartDataArr,
                    remark: $scope.params.remark
                });
            }else if($stateParams.allflag=='false'){
                var params=JSON.stringify({
                    memberId:$scope.userInfo.memberId?$scope.userInfo.memberId:'',
                    memberName:$scope.userInfo.mmbName?$scope.userInfo.mmbName:'',
                    receivePhoneNumber:$scope.userInfo.mobileNumber?$scope.userInfo.mobileNumber:'',
                    addressId:$scope.addressListDefault.addressId,
                    quantity:$scope.productDetailData.qty,
                    skuItemType:"ONLINE_GOODS",
                    fromCartData:[{"cartId": $scope.productDetailData.catId}],
                    remark: $scope.params.remark
                });
            }
        }else if($stateParams.status=="product"){
            if($scope.productDetailData.skuItemType=="ONLINE_VIRTUAL_GOODS"){
                var params=JSON.stringify({
                    memberId:$scope.userInfo.memberId?$scope.userInfo.memberId:'',
                    receivePhoneNumber:$scope.userInfo.mobileNumber?$scope.userInfo.mobileNumber:'',
                    memberName:$scope.userInfo.mmbName?$scope.userInfo.mmbName:'',
                    quantity:$scope.productDetailData.skuSourceType=="ONLINE_INTEGRAL"? $scope.productDetailData.qty:1,
                    skuItemType:"ONLINE_VIRTUAL_GOODS",
                    cardRenewalFlag:"N",
                    buyNowData:[{"skuId": $scope.productDetailData.skuId}]
                });
            }else{
                var params = JSON.stringify({
                    memberId: $scope.userInfo.memberId ? $scope.userInfo.memberId : '',
                    memberName: $scope.userInfo.mmbName ? $scope.userInfo.mmbName : '',
                    receivePhoneNumber: $scope.userInfo.mobileNumber ? $scope.userInfo.mobileNumber : '',
                    addressId: $scope.addressListDefault.addressId,
                    quantity: $scope.productDetailData.qty,
                    skuItemType: "ONLINE_GOODS",
                    buyNowData: [{"skuId": $scope.productDetailData.skuId}],
                    remark: $scope.params.remark
                });
            }
        }
        console.log(params)
        httpService.getData(JYApi.mallOrders, 'post', {
            params:params
        }, function (res) {
            if(res.status=="S"){
                //$state.go('paySales',{ordNum:res.orderCode});
            }else{
                var myPopup = $ionicPopup.show({
                    title: '',
                    cssClass: 'jyAlert jyAlert1',
                    template: res.msg,
                    buttons: [{
                        text: '确定',
                        type: 'button-positive',
                        onTap: function() {
                            myPopup.close();
                        }}]
                });
            }
        },1,'生成订单...')
    };
//卖品生成订单
    $scope.buildSales=function(){
        $scope.valuesData=[{
            bn:$scope.productDetailData.bn,
            title:$scope.productDetailData.bnName,
            num:$scope.productDetailData.qty,
            price:$scope.productDetailData.price
        }];

        //判断是否登录
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
                            $state.go('login', {viewName: 'mealList', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
            return;
        }else{
            $scope.userInfo = JSON.parse(localStorage.userInfo);
        }

        if($scope.valuesData.length>0){
            var params=JSON.stringify({
                cardId:$scope.userInfo.memberCardId?$scope.userInfo.memberCardId:'',
                receivePhoneNumber:$scope.userInfo.mobileNumber?$scope.userInfo.mobileNumber:'',
                cinemaOutId:$scope.productDetailData.cinemaOuterId,
                valuesData:$scope.valuesData,
                memberName:$scope.userInfo.mmbName?$scope.userInfo.mmbName:'',
                cardType:$scope.userInfo.level?$scope.userInfo.level:'',
                cardNumber:$scope.userInfo.chipNumber?$scope.userInfo.chipNumber:''
            });
            httpService.getData(JYApi.goodsOrder, 'post', {
                params:params
            }, function (res) {
                if(res.status=="S"){
                    $state.go('paySales',{ordNum:res.orderCode});
                }
            },1,'生成订单');
        }else{

        }
    }

    //获取提货地址
    $scope.findMemberAddress=function () {
        httpService.getData(JYApi.findMemberAddress, 'post', {
            params:JSON.stringify({
                pageRows:10,
                pageIndex:1,
                addressType:$scope.addressType[$scope.currentIndex].value
            })
        }, function (res) {
            $scope.addressList=res.data;
            if($scope.addressList && $scope.addressList.length>0){
                $scope.addressList.filter(function (item,index) {
                    if(item.defualtFlag=='Y'){
                        $scope.addressListDefault=item;
                    }
                    if(item.addressId==$stateParams.addressId){
                        $scope.addressListSelect= item;
                    }
                });
            }else{
                $scope.addressListDefault='';
            }
            $scope.mallOrderFlag=true;
        });
    };




});
