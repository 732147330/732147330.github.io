/**
 * Created by pgr on 17/11/7.
 */
'use strict';
app.controller('myCommentCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$ionicPlatform,$stateParams,$state,$timeout) {
    $scope.diffTime=function(startDate,endDate) {
        var diff=new Date(endDate).getTime() - new Date(startDate).getTime();//时间差的毫秒数

        //计算出相差天数
        var days=Math.floor(diff/(24*3600*1000));

        //计算出小时数
        var leave1=diff%(24*3600*1000);    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000));

        //计算相差秒数
        var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000);

        var returnStr = seconds + "秒";
        if(minutes>0) {
            returnStr = minutes + "分" + returnStr;
        }
        if(hours>0) {
            returnStr = hours + "小时" + returnStr;
        }
        if(days>0) {
            returnStr = days + "天" + returnStr;
        }
        return returnStr;
    };
        //定义一个数组 映射五颗星星的位置和图片
          $scope.starArray = [
             {"id" : 1,
              "src":"./img/starBack.png"
             },
             {"id" : 2,
              "src":"./img/starBack.png"},
              { "id" : 3,
                  "src":"./img/starBack.png"},
              { "id" : 4,
                  "src":"./img/starBack.png"},
              { "id" : 5,
                   "src":"./img/starBack.png"
                 }
          ];
     //初始化评价星级为0
    $scope.currentStar = 0;
     //改变星星的背景图  点击的当前星星和做左边的星星换成亮图，右边的星星变成灰图
     function changeStars(){
          for(var i = 0;i < $scope.starArray.length; i++){
                if($scope.currentStar >= $scope.starArray[i].id){
                       $scope.starArray[i].src = "./img/star.png";
                    }else{
                       $scope.starArray[i].src = "./img/starBack.png";
                     }
               }
        }

    //点击星星的操作
   $scope.clickStar = function(item){
       if(!localStorage.userInfo){
           var myPopup = $ionicPopup.show({
               title: languageSetting.tip,
               cssClass: 'jyAlert jyAlert1',
               template: languageSetting.unlogin,
               buttons: [
                   {
                       text: languageSetting.cancel,
                       type: 'button-default',
                       onTap: function () {
                           myPopup.close();
                       }
                   },
                   {
                       text: languageSetting.login,
                       type: 'button-calm',
                       onTap: function (e) {
                           myPopup.close();
                           $state.go('login', {viewName: 'myComment', urlParams: JSON.stringify($stateParams)});
                       }
                   }
               ]
           });
       }else{
           httpService.getData(JYApi.findBlackWhiteListL, 'post', {
               params:JSON.stringify({
                   type:'QUERY_MEMBER_COMMENT'
               })
           }, function (res) {
               if(res.status=="S"&&res.count!=0){
                   var myPopup = $ionicPopup.show({
                       title: languageSetting.tip,
                       cssClass: 'jyAlert jyAlert1',
                       template: '您已被管理员禁言，'+$scope.diffTime(res.data[0].now*1000,res.data[0].endDateActive)+'后解除禁言'
                   });
                   $timeout(function () {
                       myPopup.close();
                   },2000);
               }else if(res.status=="S"&&res.count==0){
                   $scope.currentStar = item.id;
                   changeStars();
               }
           });
       }
      };
    //点击评价按钮 判断用户是否已经点击星星 给与评价
    $scope.clickPublish = function() {
      if($scope.currentStar == 0){
               //若没点击，弹出提示
           //Popup.loadMsg('请点击对应的星星给协作人评价！', 1500);
          }else{
              //TODO
           }
       };

    $scope.user={};

    //提交
    $scope.save=function(){
        if(!$scope.user.content){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: '请您输入您的影评！'
            });
            $timeout(function () {
                myPopup.close();
            },2000);
            return
        }
        if(!localStorage.userInfo){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.unlogin,
                buttons: [
                    {
                        text: languageSetting.cancel,
                        type: 'button-default',
                        onTap: function () {
                            myPopup.close();
                        }
                    },
                    {
                        text: languageSetting.login,
                        type: 'button-calm',
                        onTap: function (e) {
                            myPopup.close();
                            $state.go('login', {viewName: 'myComment', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else{
        httpService.getData(JYApi.saveCommentFilmDetail, 'post', {
            params:JSON.stringify({
                score:$scope.currentStar,
                type:"FILE_REVIEW",
                sourceId:$stateParams.movieId,
                content:$scope.user.content,
                memberName:JSON.parse(localStorage.userInfo).mmbName
            })
        }, function (res) {
            if(res.status=="S"){
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i> '+res.msg
                });
                $timeout(function () {
                    myPopup.close();
                    $state.go('movieDetail',{movieId: $stateParams.movieId});
                },2000);
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
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: res.msg
                });
                $timeout(function(){
                    myPopup.close();
                },2000);
            }
        });
        }
    }

});