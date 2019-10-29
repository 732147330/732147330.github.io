/**
 */
'use strict';
app.controller('jointlyActivityCtrl', function($scope,$rootScope,$stateParams,$ionicPopup,$ionicModal,$ionicBackdrop,$cordovaInAppBrowser,$ionicLoading,$cordovaGeolocation,$state,$timeout,httpService,JYApi,$sce) {

    var iframe = document.getElementById("kaola-frame");
    var childURL = "http://private.jycinema.com/wapprivate/kaola";
    // var childURL = "http://localhost:8080/wapprivate/kaola";
    var jointlyHeaderId = $stateParams.jointlyHeaderId;
    iframe.src = childURL + "?type=app" + "&appType=ios" + "&jointlyHeaderId="+ jointlyHeaderId;

    $scope.title = $stateParams.title;

    //接收子iframe的参数
    window.addEventListener('message', function (e) {
        var data=e.data;
        // console.log(data)
        if(data.flag) {
            $('#kaola-header').css("display","none");
            $('#kaola-content').removeClass("has-header");
            $('#kaola-header').hide();
        }else {
            $('#kaola-header').css("display","");
            $('#kaola-content').addClass("has-header");
            $('#kaola-header').show();
        }
        if(data.move) {
            // $('#kaola-content').height($('#kaola-content')[0].offsetHeight + 328);
            // console.log($('#kaola-content')[0].offsetHeight);
            // $('#kaola-foot').css("height", data.top);
        }else {
            // $('#kaola-content').height($('#kaola-content')[0].offsetHeight - 0);
            // $('#kaola-foot').css("height", "0px");
        }
    }, false);


});

