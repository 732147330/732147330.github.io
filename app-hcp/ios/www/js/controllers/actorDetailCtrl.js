    /**
 * Created by OuYongQiang
 */
'use strict';
app.controller('actorDetailCtrl', function ($rootScope,$scope,httpService,$cordovaStatusbar,$stateParams,JYApi,$timeout) {
    $scope.actorId=$stateParams.id;
    $scope.index=$stateParams.index;
    $scope.getPicDetail=function() {
        httpService.getData(JYApi.findActor, 'post', {
            params: JSON.stringify({
                actorId: $scope.actorId,
                type:'queryAll'
            })
        }, function (res) {
            if (res.status == "S" && res.data.length>0) {
                $scope.actorData=res.data[0];
            }
        });
    };
    $scope.getActorProduct=function() {
        $scope.spaceBetween=screen.width>680?25:10;
        $scope.swipperNum=screen.width>680?5:3.5;
        httpService.getData(JYApi.findFilmActor, 'post', {
            params: JSON.stringify({
                "actorId":$scope.actorId,
                "type":"actorWork"
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.actorProductData=res.data;
                $timeout(function(){
                    var swiper = new Swiper('.swiper-container10', {
                        pagination: '.swiper-pagination',
                        slidesPerView: $scope.swipperNum,
                        paginationClickable: true,
                        spaceBetween: $scope.spaceBetween,
                        freeMode: true
                    });
                },100);
            }
        });
    };
    $scope.getActorBanner = function() {
        httpService.getData(JYApi.findImages, 'post', {
            params: JSON.stringify({
                targetId: $scope.actorId,
                targetType:'PERFORMER_BANNER',
                imgChannel:'APP'
            })
        }, function (res) {
            if (res.status == "S" && res.data.length>0) {
                $scope.actorBanner=res.data[0].url;
            }
        });
    };
    $scope.getPicDetail();
    $scope.getActorProduct();
    $scope.getActorBanner();
    $scope.changeStatusBar=function(){
        $cordovaStatusbar.style(1);
    };
    $scope.$on('$ionicView.beforeEnter',function(event,data){
        if(locals.isMobile){
            $cope.changeStatusBar();
        }
    });
});
