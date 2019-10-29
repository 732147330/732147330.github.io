/**
 * Created by pgr on 17/08/31.
 */
'use strict';
app.controller('requestRefundCtrl', function($scope,$rootScope,httpService,JYApi,$stateParams,$timeout,$ionicPopup,$state,$ionicActionSheet) {
    $scope.findOrderDetails=function () {
        httpService.getData(JYApi.findDerivativeOrders, 'post', {
            params:JSON.stringify({
                tid:$stateParams.tid
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.OrderDetailData=res.data;
                $scope.OrderDetailData[0].lineInfoList.filter(function (item,index) {
                    if(item.oid==$stateParams.oid){
                        $scope.currentOrderDetailData=item;
                    }
                });
            }else{

            }
        });
    };
    $scope.findOrderDetails();
    $scope.findLookupCode=function () {
        httpService.getData(JYApi.findLookupCode, 'post', {
            params:JSON.stringify({
                lookupType:'REFUND_BASICSTATUS',
                "type":"QUERY_LOOKUP_VALUES"
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.codeData=res.data;
                angular.forEach($scope.codeData,function(v,k){
                    v.text=v.description
                })
            }
        });
    };
    $scope.findLookupCode();

    $scope.show = function() {

        // 显示操作表
        $ionicActionSheet.show({
            buttons: [
                { text: '质量不好' },
                { text: '不满意' },
                { text: '其它' },
            ],
            titleText: '请选择退款理由',
            cancelText: '取消',
            buttonClicked: function(index) {
                $scope.selReason=$scope.reason[index];
                return true;
            },
            cancel:function () {
                $scope.selReason='';
            }
        });

    };
    $scope.show1 = function() {

        // 显示操作表
        $ionicActionSheet.show({
            buttons: $scope.codeData,
            titleText: '请选择退款类型',
            cancelText: '取消',
            buttonClicked: function(index) {
                $scope.codeReason=$scope.codeData[index].description;
                $scope.code=$scope.codeData[index].lookupCode;
                return true;
            },
            cancel:function () {
                $scope.codeReason='';
            }
        });

    };
    $scope.Refund={};
    $scope.reason=['质量不好','不满意','其它'];
    $scope.queryrefund=function () {
        if(!$scope.selReason){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: '请选择退款理由',
                buttons: [
                    {
                        text: '确定',
                        type: 'button-calm',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            return;
        }
        if(!$scope.code){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert',
                template: '请选择退款类型',
                buttons: [
                    {
                        text: '确定',
                        type: 'button-calm',
                        onTap: function (e) {

                        }
                    }
                ]
            });
            return;
        }
        httpService.getData(JYApi.applyForRefund, 'post', {
            params:JSON.stringify({
                tid:$stateParams.tid,
                oid:$stateParams.oid,
                applyForRefundAmount:$scope.currentOrderDetailData.num,
                applyForRefundReason:$scope.selReason,
                applyForRefundDesc:$scope.Refund.applyForRefundDesc,
                refundType:$scope.code,
                imagesInfo:$scope.imagesInfo
            })
        }, function (res) {
            if(res.status=="S"){
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: res.msg
                });
                $timeout(function () {
                    myPopup.close();
                    $state.go('myGoods');
                }, 2000);

            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert',
                    template: res.msg,
                    buttons: [
                        {
                            text: '确定',
                            type: 'button-calm',
                            onTap: function (e) {

                            }
                        }
                    ]
                });
            }
        },2);
    };



   $scope.upload = function(c){
        var $c = document.querySelector(c),
            file = $c.files;
            $scope.file=file;
           if(file.length>3){
               var myPopup = $ionicPopup.show({
                   title: languageSetting.tip,
                   cssClass: 'jyAlert',
                   template: '最多上传3张图片！'
               });
               $timeout(function () {
                   myPopup.close();
               }, 2000);
               return
           }
           if(file.length>0){
               $('#imgWap').html('');
           }
       $scope.imagesInfo=[];
       for(var i=0; i<file.length;i++){
          var reader = new FileReader();
               reader.readAsDataURL(file[i]);
           reader.onload = function(e){
               $('#imgWap').append('<img src="'+e.target.result+'" style="width: 60px;height:60px" />')
               httpService.getData(JYApi.imageUpload, 'post', {
                   str: e.target.result
               }, function (res) {
                   $scope.imagesInfo.push(res.data[0]);
               })

           };
       }
       console.log($scope.imagesInfo)
    };


});

