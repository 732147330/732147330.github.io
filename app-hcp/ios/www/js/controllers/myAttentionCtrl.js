/**
 * Created by pgr on 17/11/7.
 */
'use strict';
app.controller('myAttentionCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$ionicPlatform,$state,$timeout) {

    //查询关注
    $scope.findCmtFanFollowP =function(){
        httpService.getData(JYApi.findCmtFanFollowP, 'post', {
            params:JSON.stringify({
                cmtMemberId:JSON.parse(localStorage.userInfo).memberId,
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
    //取消关注
    $scope.deleteCmtFanFollowP =function(id){
        httpService.getData(JYApi.deleteCmtFanFollowP, 'post', {
            params:JSON.stringify({
                type:"FAN",
                cmtFanFollowId:id
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.findCmtFanFollowP()
            }
        });
    };

});