    /**
 * Created by OuYongQiang
 */
'use strict';
app.controller('noticeDetailCtrl', function ($scope,$rootScope,httpService,JYApi,$stateParams) {
    $scope.noticeId=$stateParams.id;
    httpService.getData(JYApi.findCmsNoticeMessage, 'post', {
        params:JSON.stringify({
            noticeId:$scope.noticeId
        })
    }, function (res) {
        if(res.status=="S"){
           $scope.noticeDetailData=res.data[0];
        }
    });
});
