/**
 * Created by OuYongQiang
 */
'use strict';
app.controller('hyqyCtrl', function ($scope, httpService, JYApi, $stateParams) {

  $scope.articleType = "MEMBERSHIP_INTERESTS";
  $scope.articleId = "3140";
  $scope.title = "会员权益";
  if($stateParams.cardType && $stateParams.title) {
      $scope.articleType = "EQUITYCARD_INTERESTS";
      $scope.articleId = "3309";
      $scope.title = $stateParams.title;
  }

  $scope.findJy = function () {
    httpService.getData(JYApi.findJy, 'post', {
      params: JSON.stringify({
        "type": "QUERY_JY_ARTICLE",
        "articleType": $scope.articleType,
        "articleId": $scope.articleId
      })
    }, function (res) {
      $scope.jydtTit = res.data[0].articleContent;
    })
  };
  $scope.findJy()
});
