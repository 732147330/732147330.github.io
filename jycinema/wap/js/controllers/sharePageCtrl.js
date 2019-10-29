'use strict';
app.controller('sharePageCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$timeout,$ionicPlatform,$stateParams) {
        $scope.ruleHeaderId=$stateParams.ruleHeaderId;
        $scope.sourceId=$stateParams.sourceId;
        $scope.share={};


        //请求活动信息
        $scope.getActivity=function () {
            httpService.getData(JYApi.findActivityGuidanceInfo, 'post', {
                params:JSON.stringify({
                    activityGroupId:$scope.ruleHeaderId,
                    imgChannel:"APP"
                })
            }, function (res) {
                if(res.status=="S"){
                    $scope.activityData=res.data[0];
                    angular.forEach($scope.activityData.imgDate,function (value,key) {
                        if(value.targetType=='ACTIVITY_THUMBNAIL'){
                            $scope.activityImg=value.url;
                        }
                    });
                    $scope.activityStatus=res.data[0].flag;
                }
            });
        };
        $scope.getActivity();

        $scope.getVoucher=function () {
            if(!(/^1[34578]\d{9}$/).test($scope.share.phoneNumber)){
                var myPopup = $ionicPopup.show({
                    title: '提示',
                    cssClass: 'jyAlert jyAlert1',
                    template: '<i class="iconTip ion-close-circled"></i>'+'请输入正确的手机号码'
                });
                $timeout(function(){
                    myPopup.close();
                },2000);
                return;
            }
           httpService.getData(JYApi.shareRegisterMember, 'post', {
               params:JSON.stringify({
                   sourceId:$scope.sourceId,
                   ruleHeaderId:$scope.ruleHeaderId,
                   mobileNumber:$scope.share.phoneNumber
               })
           }, function (res) {
               if(res.status=="S"){
                   var myPopup = $ionicPopup.show({
                       title: languageSetting.tip,
                       cssClass: 'jyAlert',
                       template: '请在会员中心我的钱包查看卡券信息',
                       buttons: [
                           {
                               text: '去登录',
                               type: 'button-calm',
                               onTap: function (e) {
                                   myPopup.close();
                                   $state.go('login');
                               }
                           }
                       ]
                   });
               }else{
                   var myPopup = $ionicPopup.show({
                       title: languageSetting.tip,
                       cssClass: 'jyAlert jyAlert1',
                       template: '<i class="iconTip ion-close-circled"></i>'+res.msg
                   });
                   $timeout(function(){
                       myPopup.close();
                   },2000);
               }
           });
       };
});