/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('messageCenterCtrl', function($scope,httpService,JYApi,$rootScope,$ionicScrollDelegate) {
    $scope.activeIndex=0;
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.getCurrentData=function(index){
        $scope.activeIndex=index;

    };
    $scope.slideHasChanged=function(index){
        $scope.activeIndex=index;
        $ionicScrollDelegate.scrollTop();
    };
    $scope.slideTo=function(){
        return $scope.activeIndex;
    };
    //获取通告
    $scope.getNotice=function(id){
        httpService.getData(JYApi.findCmsNoticeMessage, 'post', {
            params:JSON.stringify({
                noticeId:id
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.noticeData=res.data;
            }
        });
    };
    $scope.getNotice('');
    //获取私信
    $scope.getMsg=function(){
        httpService.getData(JYApi.findCmsPushMessageRecord, 'post', {
            params:JSON.stringify({
                "memberId":JSON.parse(localStorage.userInfo).memberId,
                type:'queryAll'
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.msgData=res.data;
            }
        });
    };
    $scope.readsFlag=false;
    $scope.getMsgCount=function(){
        httpService.getData(JYApi.findCmsPushMessageRecord, 'post', {
            params:JSON.stringify({
                "memberId":JSON.parse(localStorage.userInfo).memberId,
                type:'total'
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.reads=res.data[0].reads;
                if($scope.reads!=0){
                    $scope.readsFlag=true
                }else{
                    $scope.readsFlag=false;
                }
            }
        });
    };
    //$scope.getMsg();
    //下拉刷新
    $scope.doRefresh = function () {
        //刷新数据
        if($scope.activeIndex==0){
            $scope.getNotice('');
        }else if($scope.activeIndex==1){
            $scope.getMsg();
        }
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.$on('$ionicView.enter',function () {
        $scope.getMsg();
        $scope.getMsgCount();
    });
});