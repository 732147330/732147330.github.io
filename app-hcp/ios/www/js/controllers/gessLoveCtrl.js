/**
 * Created by pgr on 18/3/26.
 */
'use strict';
app.controller('gessLoveCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$state) {
    //²ÂÄãÏ²»¶
    $scope.findRecommend=function(){
        httpService.getData(JYApi.findRecommend,'post',{
            params:JSON.stringify({"type":"recommendGoods",
                "recommendType":"HOME_GOODS_RECOMMEND",
                "pageIndex":1,
                "pageRows":10,
                "cityName":localStorage.currentCity})
        },function(res){
            if(res.status=='S'){
                $scope.recommendOneData = _.filter(res.data, function(item){ return item.sourceType=='GOODS'; });
                $scope.recommendTwoData = _.filter(res.data, function(item){ return item.sourceType=='FILM'; });
            }else{
            }
        });
    };
    $scope.findRecommend();
    $scope.recommendGo=function(item){
        if(item.sourceType=='GOODS'){
            $state.go('productDetail',{skuId:item.sourceId})
        }else if(item.sourceType=='FILM'){
            $state.go('movieDetail',{movieId:item.sourceId})
        }
    }
});