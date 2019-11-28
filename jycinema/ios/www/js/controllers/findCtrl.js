/**
 * Created by xiongshengzhong on 16/8/18.
 */
'use strict';
app.controller('findCtrl', function ($scope) {
    $scope.getCurrentData=function(index){
        $scope.currentIndex=index;
    };
});
