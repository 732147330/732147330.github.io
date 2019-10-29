/**
 * Created by pgr on 18/3/19.
 */
'use strict';
app.controller('meetingCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$stateParams) {

            $scope.findSpecialSkuPageInfo=function(){
                httpService.getData(JYApi.findSpecialSkuPageInfo, 'post', {
                    params:JSON.stringify({
                        "skuId":$stateParams.skuId
                    })
                }, function (res) {
                    if(res.status=='S'){
                        $scope.actorData=res.actorData;
                        if(res.activityDescription){
                            $scope.activityDescription=res.activityDescription.split('\n');
                        }
                        $scope.pageTitle=res.pageTitle
                    }else{

                    }

                });
            };
            $scope.findSpecialSkuPageInfo();

});