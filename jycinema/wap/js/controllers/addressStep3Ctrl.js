/**
 * Created by pgr on 2018/1/13.
 */
'use strict';
app.controller('addressStep3Ctrl', function($state,httpService,$ionicHistory,$timeout,$ionicPopup,$ionicPlatform,$ionicActionSheet,JYApi,$scope,$interval,$rootScope,$stateParams) {

    $scope.addressStatus=$stateParams.addressStatus;
    $scope.findProvinceCityArea=function(){
        httpService.getData(JYApi.findProvinceCityArea, 'post', {
            params: JSON.stringify({})
        }, function (res) {
            if(res.status=='S'){
                $scope.areaData=res.data;
                var area = new LArea();
                area.init({
                    'trigger': '#demo1',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                    'valueTo':'#value1',//选择完毕后id属性输出到该位置
                    'keys':{id:'id',name:'value'},//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                    'type':1,//数据源类型
                    'data':$scope.areaData//数据源
                });
            }
        })
    };
    $scope.findProvinceCityArea();

    //获取收货地址
    $scope.findMemberAddress=function (id) {
        httpService.getData(JYApi.findMemberAddress, 'post', {
            params:JSON.stringify({
                pageRows:10,
                pageIndex:1,
                addressId:id,
                addressType:"DELIVERY_ADDRESS"
            })
        }, function (res) {
            $scope.addressListOther=res.deliveryAddressData;
            if($stateParams.addressStatus=="edit"){
                $scope.address.name=$scope.addressListOther[0].consignee;
                $scope.address.phone=$scope.addressListOther[0].moblie;
                $scope.address.demo1=$scope.addressListOther[0].province+','+$scope.addressListOther[0].city+','+$scope.addressListOther[0].county;
                $scope.address.detial=$scope.addressListOther[0].address;
                $scope.address.valueData=$scope.addressListOther[0].provinceId+','+$scope.addressListOther[0].cityId+','+$scope.addressListOther[0].countyId;
                $scope.address.isDefault=$scope.addressListOther[0].defualtFlag;
                if($scope.address.isDefault == "Y"){
                    $scope.address.checked =true
                }else{
                    $scope.address.checked =false
                }
            }
        });
    };
    $scope.findMemberAddress($stateParams.addressId);

    //保存地址
    $scope.address={};
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
        if(!$scope.address.demo1){
            $scope.showTip('请选择所在地区');
            return false;
        }
        if(!$scope.address.detial){
            $scope.showTip('请填写详细地址');
            return false;
        }
        return true;
    };
    $scope.saveAddress = function () {
        $scope.valueData=[];
        $scope.addressDemo1=[];
        if($scope.address.checked==true){
            $scope.address.isDefault="Y"
        }
        if($scope.address.checked==false){
            $scope.address.isDefault="N"
        }
        if($scope.checkAddress()){
            $scope.valueData= $('#value1').val().split(',');
            $scope.addressDemo1=$scope.address.demo1.split(',');
            if($scope.valueData.length<2){
                $scope.valueData=$scope.address.valueData.split(',')
            }
            if($stateParams.addressStatus=="add") {
                httpService.getData(JYApi.saveMemberAddress, 'post', {
                    params: JSON.stringify({
                        consignee: $scope.address.name,
                        addressType: "DELIVERY_ADDRESS",
                        moblie: $scope.address.phone,
                        defualtFlag: $scope.address.isDefault?'Y':'N',
                        address: $scope.address.detial,
                        provinceId: $scope.valueData[0],
                        province: $scope.addressDemo1[0],
                        cityId: $scope.valueData[1],
                        city:  $scope.addressDemo1[1],
                        countyId: $scope.valueData[2],
                        county: $scope.addressDemo1[2]
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
                            if($stateParams.id==2){
                                $state.go('mallOrder',{addressStatus:$stateParams.product,id:$stateParams.id,addressId:res.data.addressId,status:$stateParams.status,allflag:$stateParams.allflag});
                            }else{
                                $state.go('address',{person:'person'});
                            }
                        }, 2000);
                    }
                })
            }
            else if($stateParams.addressStatus=="edit") {
                httpService.getData(JYApi.updateMemberAddress, 'post', {
                    params: JSON.stringify({
                        addressId:$scope.addressListOther[0].addressId,
                        consignee: $scope.address.name,
                        addressType: "DELIVERY_ADDRESS",
                        moblie: $scope.address.phone,
                        defualtFlag: $scope.address.isDefault,
                        address: $scope.address.detial,
                        provinceId: $scope.valueData[0],
                        province: $scope.addressDemo1[0],
                        cityId: $scope.valueData[1],
                        city:  $scope.addressDemo1[1],
                        countyId: $scope.valueData[2],
                        county: $scope.addressDemo1[2]
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
                            if($stateParams.id==2){
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