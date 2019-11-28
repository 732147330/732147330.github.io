/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('shopCtrl', function ($scope, $rootScope) {
    $scope.getCurrentData=function(index){
        $scope.currentIndex=index;
    };

});
