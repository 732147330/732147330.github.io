/**
 * Created by pgr
 */
'use strict';
app.controller('personalLetterCtrl', function ($scope,$rootScope,httpService,JYApi,$stateParams) {
    $scope.messageRecordId=$stateParams.id;
    $scope.messageContent=$stateParams.messageContent;
    $scope.platform=$stateParams.platform;
    httpService.getData(JYApi.updateCmsPushMessageRecord, 'post', {
        params:JSON.stringify({
            messageRecordId:$scope.messageRecordId,
            readFlag:"Y"
        })
    }, function (res) {
        if(res.status=="S"){
        }
    });
});
