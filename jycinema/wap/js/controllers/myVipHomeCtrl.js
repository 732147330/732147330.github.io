/**
 * Created by OuYongQiang
 */
'use strict';
app.controller('myVipHomeCtrl', function ($scope, $rootScope, httpService, JYApi, $timeout, $ionicPopup, $state) {
  $scope.obj = {};
  //获取会员基础信息
  $scope.findMember = function (isDoRefresh) {
    httpService.getData(JYApi.getCardInfo, 'post', {
      params: JSON.stringify({})
    }, function (res) {
      if (res.status == "S") {
        var userInfo = res.data;
        userInfo.token = JSON.parse(localStorage.userInfo).token;
        localStorage.userInfo = JSON.stringify(userInfo);
        $rootScope.userInfo = userInfo;
        if (res.data.chipNumber) {
          $scope.obj.memFlag = true;
          $scope.obj.noMemFlag = false;
        } else {
          $scope.obj.noMemFlag = true;
          $scope.obj.memFlag = false;
        }
        console.log($scope.obj);
      } else {
        var myPopup = $ionicPopup.show({
          title: languageSetting.tip,
          cssClass: 'jyAlert jyAlert1',
          template: '请求失败,请重新登陆!'
        });
        $timeout(function () {
          myPopup.close();
          localStorage.removeItem('userInfo');
          $rootScope.userInfo = null;
          $state.go('login');
        }, 2000);
      }
    }, 1, '加载中', isDoRefresh);
  };

  $scope.findJy = function () {
    httpService.getData(JYApi.findJy, 'post', {
      params: JSON.stringify({
        "type": "QUERY_JY_ARTICLE",
        "articleType": "MEMBERSHIP_INTERESTS",
        "articleId": "3140"
      })
    }, function (res) {
      $scope.jydtTit = res.data[0].articleContent
    })
  };
  $scope.findJy()

  $scope.$on('$ionicView.enter', function () {
    if (localStorage.userInfo) {
      $scope.findMember();
    } else {
      $state.go('login');
    }
  });

  $scope.doRefresh = function () {
    $scope.findMember(true);
    $scope.$broadcast('scroll.refreshComplete');
  };
});
