/**
 * Created by OuYongQiang on 16/9/13.
 */
'use strict';
app.controller('agreeMentCtrl', function($scope,$rootScope,$cordovaStatusbar) {
    $scope.$on('$ionicView.enter',function(event,data){
        if(locals.isMobile){
            $cordovaStatusbar.style(0);
        }
    });
});
