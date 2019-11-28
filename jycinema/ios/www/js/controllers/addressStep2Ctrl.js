/**
 * Created by pgr on 2017/9/16.
 */
'use strict';
app.controller('addressStep2Ctrl', function($state,httpService,$ionicHistory,$timeout,$ionicPopup,$ionicPlatform,$ionicActionSheet,JYApi,$scope,$interval,$rootScope,$stateParams) {
    $scope.addressStatus=$stateParams.addressStatus;
    $scope.address={};
    //区分修改还是新增
    $scope.change = function(){
        if($stateParams.addressStatus =="add"){
            $state.go('sinceTheater',{status:"add",product:$stateParams.product,id:$stateParams.id});
        }else if($stateParams.addressStatus =="edit"){
            $state.go('sinceTheater',{status:"edit",id:$stateParams.id,product:$stateParams.product,addressId:$stateParams.addressId});
        }

    };
    //获取收货地址
    $scope.findMemberAddress=function (id) {
        httpService.getData(JYApi.findMemberAddress, 'post', {
            params:JSON.stringify({
                pageRows:10,
                pageIndex:1,
                addressId:id,
                addressType:"SINCE_ADDRESS"
            })
        }, function (res) {
            $scope.addressList=res.sinceAddressData;
            if($stateParams.addressStatus=="edit"){
                $scope.address.name=$scope.addressList[0].consignee;
                $scope.address.phone=$scope.addressList[0].moblie;
                $scope.address.selCinemaName=$scope.addressList[0].cinemaName;
                $scope.address.selCinemaAddress=$scope.addressList[0].address;
                $scope.address.isDefault=$scope.addressList[0].defualtFlag;
                if($scope.address.isDefault == "Y"){
                    $scope.address.checked =true
                }else{
                    $scope.address.checked =false
                }
            }
        });
    };
    $scope.findMemberAddress($stateParams.addressId);
    $scope.$on('$ionicView.enter',function () {
        if(sessionStorage.selSinceTheater){
            $scope.sessionCinemaData=JSON.parse(sessionStorage.selSinceTheater);
            if($stateParams.addressStatus=="add"){
                $scope.address.selCinemaName=$scope.sessionCinemaData.cinemaName;
                $scope.address.selCinemaAddress=$scope.sessionCinemaData.address1;
            }else if($stateParams.addressStatus=="edit"&&$stateParams.status=='product'){
                $scope.address.selCinemaName=$scope.sessionCinemaData.cinemaName;
                $scope.address.selCinemaAddress=$scope.sessionCinemaData.address1;
            }

        }
    });

    //提示
    $scope.showTip=function(msg){
        var myPopup = $ionicPopup.show({
            title: '',
            cssClass: 'jyAlert jyAlert1 sucTip',
            template: msg
        });
        $timeout(function () {
            myPopup.close();
        }, 2000);
    };

    //检查地址输入合法
    $scope.checkAddress=function () {
        var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(!$scope.address.name){
            $scope.showTip('请输入提货人姓名');
            return false;
        }
        if(!reg.test($scope.address.phone)){
            $scope.showTip('手机号码不正确');
            return false;
        }
        if(!$scope.address.selCinemaAddress){
            $scope.showTip('请选择提货影院');
            return false;
        }
        return true;
    };

    //保存新增地址
    $scope.saveAddress = function () {
        if($scope.address.checked==true){
            $scope.address.isDefault="Y"
        }
        if($scope.address.checked==false){
            $scope.address.isDefault="N"
        }
        if($scope.checkAddress()){
            if($stateParams.addressStatus=="add") {
                httpService.getData(JYApi.saveMemberAddress, 'post', {
                    params: JSON.stringify({
                        provinceId: JSON.parse(sessionStorage.selSinceTheater).provinceId,
                        cinemaId: JSON.parse(sessionStorage.selSinceTheater).cinemaId,
                        cinemaName: JSON.parse(sessionStorage.selSinceTheater).cinemaName,
                        cityId: JSON.parse(sessionStorage.selSinceTheater).cityId,
                        consignee: $scope.address.name,
                        addressType: "SINCE_ADDRESS",
                        moblie: $scope.address.phone,
                        defualtFlag: $scope.address.isDefault?'Y':'N',
                        address: $scope.address.selCinemaAddress
                    })
                }, function (res) {
                    if (res.status == "S") {
                        var myPopup = $ionicPopup.show({
                            title: '',
                            cssClass: 'jyAlert jyAlert1 sucTip',
                            template: '<div class="mb5"><i class="iconfont jyicon fs30" style="color: #3dd067;">&#xe61e;</i></div>保存成功'
                        });
                        $timeout(function () {
                            myPopup.close();
                            if($stateParams.id==1){
                                $state.go('mallOrder',{addressStatus:$stateParams.product,id:$stateParams.id,addressId:res.data.addressId,status:$stateParams.status,allflag:$stateParams.allflag});
                            }else{
                                $state.go('address',{person:'person'});
                            }
                        }, 2000);
                    }
                })
            }else if($stateParams.addressStatus=="edit") {
                httpService.getData(JYApi.updateMemberAddress, 'post', {
                    params: JSON.stringify({
                        addressId:$scope.addressList[0].addressId,
                        provinceId: $scope.address.provinceId,
                        cinemaId: $scope.address.cinemaId,
                        cinemaName: $scope.address.selCinemaName,
                        cityId: $scope.address.cityId,
                        consignee: $scope.address.name,
                        addressType: "SINCE_ADDRESS",
                        moblie: $scope.address.phone,
                        defualtFlag:$scope.address.isDefault,
                        address: $scope.address.selCinemaAddress
                    })
                }, function (res) {
                    if (res.status == "S") {
                        var myPopup = $ionicPopup.show({
                            title: '',
                            cssClass: 'jyAlert jyAlert1 sucTip',
                            template: '<div class="mb5"><i class="iconfont jyicon fs30" style="color: #3dd067;">&#xe61e;</i></div>更新成功'
                        });
                        $timeout(function () {
                            myPopup.close();
                            if($stateParams.id==1){
                                $state.go('mallOrder',{addressStatus:$stateParams.product,id:$stateParams.id,addressId:$stateParams.addressId?$stateParams.addressId:res.data.addressId,status:$stateParams.status,allflag:$stateParams.allflag});
                            }else{
                                $state.go('address',{person:'person'});
                            }
                        }, 2000);
                    }
                });
            }
        }
    };


});