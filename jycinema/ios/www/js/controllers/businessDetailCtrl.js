/**
 * Created by OuYongQiang
 */
'use strict';
app.controller('businessDetailCtrl', function($scope,httpService,JYApi,$stateParams) {


    $scope.id=$stateParams.id;
    $scope.name=$stateParams.name;
    $scope.findJy=function(){
        httpService.getData(JYApi.findJy, 'post', {
            params:JSON.stringify({
                "articleType":$scope.articleType,
                "bigCategory":$scope.id,
                "type":"QUERY_JY_ARTICLE",
                "pageIndex":1,"pageRows":50
            })
        }, function (res) {
            $scope.jydtTit=res.data
        })
    };
    if($scope.id=='SHARE_TRAINING' || $scope.id=='TRAINING'){
        $scope.articleType='ENTER_JINYI_TRA';
    }else if($scope.id=='INTRODUCTION'){
        $scope.articleType='ENTER_JINYI_INTRODUCTION';
    } else if($scope.id=='INTRODUCTION'){
        $scope.articleType='ENTER_JINYI_BUS';
    }else if($scope.id=='SOICIAL_REC' || $scope.id=='INTERNAL_REC' || $scope.id=='CAMPUS_REC'){
        $scope.articleType='ENTER_JINYI_REC';
    }else if($scope.id=='BUSINESS_CONSULTANT' || $scope.id=='HR_RECRUIT'|| $scope.id=='COMPLAINT_ADVISE'){
        $scope.articleType='ENTER_JINYI_CONTACT';
    }
    $scope.findJy()




});
