/**
 */
'use strict';
app.controller('questionCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$state,httpService,JYApi,$ionicScrollDelegate,$ionicSlideBoxDelegate,$stateParams) {

    //查询问卷列表
    $scope.findQuestion=function(){
        httpService.getData(JYApi.findQuestionHeader, 'post', {
            params:JSON.stringify({
                "pageIndex": '',
                "pageRows": ''
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.questionListData=res.data;
            }
        },2);
    };
    $scope.findQuestion();

});
