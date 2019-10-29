/**
 * Created by pgr on 17/11/7.
 */
'use strict';
app.controller('myFansCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$ionicPlatform,$timeout,$state) {

    //查询粉丝
    $scope.findCmtFanFollowP =function(){
        httpService.getData(JYApi.findCmtFanFollowP, 'post', {
            params:JSON.stringify({
                type:"FAN",
                pageIndex:1,
                pageRows:10
            })
        }, function (res) {
            if(res.status=='S'){
                $scope.fanFollowData=res.data
            }else if(res.status=='NOTLOGIN'){
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '请求失败,请重新登陆!'
                });
                $timeout(function(){
                    myPopup.close();
                    localStorage.removeItem('userInfo');
                    $scope.userInfo = null;
                    $state.go('login');
                },2000);
            }
        });
    };
    $scope.findCmtFanFollowP();
    //关注
    $scope.saveCmtFanFollowP =function(id){
        httpService.getData(JYApi.saveCmtFanFollowP, 'post', {
            params:JSON.stringify({
                type:"FAN",
                cmtMemberId:id
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.findCmtFanFollowP()
            }
        });
    };

});