/**
 * Created by pgr on 17/8/30.
 */
'use strict';
app.controller('deliveryMethodCtrl', function ($scope,httpService,JYApi,$state,$ionicPopup,$stateParams,$rootScope,$timeout) {

    $scope.checkbox = function(id){
        if(id==1){
            $scope.isSelected1 = true;
            $scope.isSelected2 = false
        }else{
            $scope.isSelected1 = false;
            $scope.isSelected2 = true
        }
        $scope.id=id;
    };
    $scope.save=function(){
        if(!$scope.id){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '请您选择配送方式'
            });
            $timeout(function(){
                myPopup.close();
            },1000);
        }else{
            $state.go('mallOrder',{status:$stateParams.status,allflag:$stateParams.allflag,id:$scope.id})
        }

    };
});
