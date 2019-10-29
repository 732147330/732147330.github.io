/**
 * Created by OuYongQiang
 */
'use strict';
app.controller('problemsCtrl', function($scope,httpService,JYApi) {
    $scope.help={
      keywords:''
    };
    $scope.getProblems=function(content){
        httpService.getData(JYApi.findCmsFaqMessage, 'post', {
            params:JSON.stringify({
                faqTitle:content
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.problemsData=res.data;
            }
        });
    };
    $scope.getProblems('');
    //搜索代码
    $scope.searchByKeywords = function(){
        $scope.getProblems($scope.help.keywords);
    };
});
