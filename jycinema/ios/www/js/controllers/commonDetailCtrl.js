    /**
 * Created by OuYongQiang
 */
'use strict';
app.controller('commonDetailCtrl', function ($scope,$rootScope,$sce,$ionicBackdrop,$ionicModal,httpService,JYApi,$stateParams) {
    $scope.title=$stateParams.params;
    $scope.getMenuInfo=function(menu){
        httpService.getData(JYApi.findCmsFaqMessage2,'post',{
            params:JSON.stringify({faqTitle:$scope.title})
        },function(res){
            if(res.status=="S"){
                $scope.content=res.data[0].faqContent;
            }
        });
    };
    $scope.getMenuInfo();
});
