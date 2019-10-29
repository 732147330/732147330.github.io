/**
 * Created by pgr on 2017/9/16.
 */
'use strict';
app.controller('addressCtrl', function($scope,httpService,JYApi,$timeout,$ionicPopup,$state,$stateParams) {
    $scope.deliveryId=$stateParams.id?$stateParams.id:'';
    if($stateParams.person=='person'){
        $scope.person=true;
    }
    //获取收货地址
    $scope.findMemberAddress=function () {
        httpService.getData(JYApi.findMemberAddress, 'post', {
            params:JSON.stringify({})
        }, function (res) {
            $scope.addressList=res.sinceAddressData;
            $scope.addressListOther=res.deliveryAddressData;

        });
    };
    if($stateParams.product=="product"){
    $scope.product ='product'
    }

    $scope.$on('$ionicView.enter',function () {
        $scope.findMemberAddress();
    });

    $scope.setDefault=function (index,type) {
        if($scope.addressList[index].defualtFlag=='N' || $scope.addressListOther[index].defualtFlag=='N'){
            httpService.getData(JYApi.updateMemberAddress, 'post', {
                params:JSON.stringify({
                    pageRows:10,
                    pageIndex:1,
                    addressType:type,
                    defualtFlag:'Y',
                    addressId:type=='SINCE_ADDRESS'?$scope.addressList[index].addressId:$scope.addressListOther[index].addressId
                })
            }, function (res) {
                if(res.status=="S"){
                    var myPopup = $ionicPopup.show({
                        title: '',
                        cssClass: 'jyAlert jyAlert1 sucTip',
                        template: '<div class="mb5"><i class="iconfont jyicon fs30" style="color: #3dd067;">&#xe61e;</i></div>设置成功'
                    });
                    $timeout(function () {
                        myPopup.close();
                        $scope.findMemberAddress();
                    }, 2000);
                }
            });
        }
    };

    $scope.selAddress=function (index,type) {
        $scope.selAddressObj= $scope.addressList[index];
    };

    $scope.editAddress = function(index,type){
        if(type=='SINCE_ADDRESS'){
            $state.go('addressStep2',{addressStatus:'edit',id:$scope.deliveryId,status:$stateParams.status,addressId:$scope.addressList[index].addressId});
        }else{
            $state.go('addressStep3',{addressStatus:'edit',id:$scope.deliveryId,status:$stateParams.status,addressId:$scope.addressListOther[index].addressId});
        }
    };
    
    $scope.delAddress=function (index,type) {
        var myPopup = $ionicPopup.show({
            title: '',
            cssClass: 'jyAlert jyAlert1',
            template: '您确定要删除吗？',
            buttons: [
                {
                    text: '取消',
                    type: 'button-default',
                    onTap: function () {
                        myPopup.close();
                    }
                },
                {
                    text: '确定',
                    type: 'button-calm',
                    onTap: function (e) {
                        httpService.getData(JYApi.deleteMemberAddress, 'post', {
                            params:JSON.stringify({
                                pageRows:10,
                                pageIndex:1,
                                addressType:type,
                                addressId:type=='SINCE_ADDRESS'?$scope.addressList[index].addressId:$scope.addressListOther[index].addressId
                            })
                        }, function (res) {
                            if(res.status=="S"){
                                var myPopup = $ionicPopup.show({
                                    title: '',
                                    cssClass: 'jyAlert jyAlert1 sucTip',
                                    template: '<div class="mb5"><i class="iconfont jyicon fs30" style="color: #3dd067;">&#xe61e;</i></div>删除成功'
                                });
                                $timeout(function () {
                                    myPopup.close();
                                    $scope.findMemberAddress();
                                }, 2000);
                            }
                        },2);

                    }
                }
            ]
        });
    };
    $scope.mallOrder=function(addressId){
        $state.go('mallOrder',{product:'product',status:$stateParams.status,allflag:$stateParams.allflag,id:$scope.deliveryId,addressId:addressId})
    }
    $scope.addressStep=function(view){
        if(view==1){
            $state.go('addressStep3',{product:'product',addressStatus:'add',status:$stateParams.status,allflag:$stateParams.allflag,id:$scope.deliveryId})
        }else if(view==2){
            $state.go('addressStep2',{product:'product',addressStatus:'add',status:$stateParams.status,allflag:$stateParams.allflag,id:$scope.deliveryId})
        }
    }

});