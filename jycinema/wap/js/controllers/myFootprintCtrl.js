/**
 * Created by pgr on 2016/9/13.
 */
'use strict';
app.controller('myFootprintCtrl', function(httpService,JYApi,$scope,$rootScope) {
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    //格式化时间戳
    $scope.formatTime=function(timeStr){
        var tim = new Date(parseInt(timeStr) * 1000);
        var year = tim.getFullYear(); //年
        var month = tim.getMonth() + 1; //月
        month = month < 10 ? '0' + month : month;
        var day = tim.getDate();//日
        day = day < 10 ? '0' + day : day;
        return  month + '-' + day;
    };
    $scope.footTime=[];

    httpService.getData(JYApi.MemberFootprint, 'post', {
        params:JSON.stringify({
            "memberId":JSON.parse(localStorage.userInfo).memberId
        })
    }, function (res) {
        if(res.status=="S"){
            $scope.counts=res.count;
            $scope.myFootprint = res.data;
        }
    },1,'加载中');

    $scope.doRefresh=function(){
        httpService.getData(JYApi.MemberFootprint, 'post', {
            params:JSON.stringify({
                "memberId":JSON.parse(localStorage.userInfo).memberId
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.counts=res.count;
                $scope.myFootprint = res.data;
                $scope.$broadcast('scroll.refreshComplete');
            }
        });
    };
});
