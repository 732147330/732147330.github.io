/**
 * Created by pgr
 * 2018.1.14
 */
'use strict';
app.controller('receivingCenterCtrl', function($scope,httpService,JYApi,$ionicModal,$ionicBackdrop,$ionicPopup,$timeout) {

    $scope.$on("$ionicView.enter", function (event, data) {
        $ionicModal.fromTemplateUrl('templates/centerRedBad.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.centerRedBad = modal;
        });
    });

    $scope.findReceivingCenterInfo=function(){
        httpService.getData(JYApi.findReceivingCenterInfo,'post',{
            params:JSON.stringify({})
        },function(res){
            if(res.status=='S'){
                $scope.findReceivingCenterInfoData = res.data;
            }else{
                $scope.findReceivingCenterInfoData=[];
            }

        });
    };
    $scope.findReceivingCenterInfo();
    $scope.getRed=function(item){
        $scope.chooseActiveFlag=false;
        $scope.rcLineList=item.rcLineList;
        $scope.centerRedBad.show();
        //$ionicBackdrop.retain();
    };

    $scope.choose=function(item){
        $scope.chooseActiveData=item;
        angular.forEach($scope.rcLineList,function(v,k){
            if(item==v){
                v.active=false
            }else{
                v.active=true
            }
        });
    };

    $scope.chooseActive=function(){
        if($scope.chooseActiveData==null){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '请您任选一张礼券！'
            });
            $timeout(function(){
                myPopup.close();
            },1000);
        }else{
            httpService.getData(JYApi.receiveGift,'post',{
                params:JSON.stringify({
                    "receivingCenterHeaderId":  $scope.chooseActiveData.receivingCenterHeaderId,
                    "receivingCenterLineId":  $scope.chooseActiveData.receivingCenterLineId
                })
            },function(res){
                if(res.status=='S'){
                    $scope.chooseActiveFlag=true;
                    $scope.findReceivingCenterInfo();
                    $timeout(function(){
                        $scope.centerRedBad.hide();
                        $ionicBackdrop.release();
                    },3000);
                }else{

                }
            });
        }

    };
    $scope.hideRed=function() {
        angular.forEach($scope.rcLineList,function(v,k){
                v.active=true
        });
        $scope.chooseActiveData=null;
        $scope.centerRedBad.hide();
        $ionicBackdrop.release();
    };
    $scope.$on("$ionicView.leave", function (event, data) {
        $scope.centerRedBad.hide();
        $ionicBackdrop.release();
    });
});
