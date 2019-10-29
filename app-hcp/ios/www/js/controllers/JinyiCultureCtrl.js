/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('JinyiCultureCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$stateParams) {
    $scope.id=$stateParams.id;
    $scope.findJy=function(){
        httpService.getData(JYApi.findJy, 'post', {
            params:JSON.stringify({
                "articleId":$scope.id,
                "type":"QUERY_JY_ARTICLE"
            })
        }, function (res) {
            $scope.jydtTit=res.data
        })
    };
    $scope.findJy()


});