var app = angular.module('jyApp', [
    'ionic',
    'oc.lazyLoad',
    'ngAnimate',
    'ngCordova',
    'jyApp.services',
    'jyApp.directives',
    "ngSanitize",
    "ionicLazyLoad",
    "angular-nicescroll",
    "LocalForageModule"
])
.constant('$ionicLoadingConfig', {
    template: 'Loading...'
})
.run(function ($rootScope,$http,JYApi,httpService, $ionicPlatform,$ionicSlideBoxDelegate,$cordovaInAppBrowser,$state, $ionicPopup, $location,$timeout, $ionicHistory, $cordovaNetwork,$cordovaAppVersion, $cordovaToast) {
    $rootScope.defaultPic = './img/default.png';
    $rootScope.languageSetting=languageSetting;
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            window.cordova.plugins.Keyboard.disableScroll(false);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        //提示
        $rootScope.showTip=function(msg){
            var myPopup = $ionicPopup.show({
                title: '',
                cssClass: 'jyAlert jyAlert1 sucTip',
                template: msg
            });
            $timeout(function () {
                myPopup.close();
            }, 2000);
        };
        //检查网络连接
        if ($rootScope.isMobile) {
            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                $cordovaToast
                    .show(languageSetting.noNetwork+'!', 'long', 'top')
                    .then(function (success) {
                        // success
                    }, function (error) {
                        // error
                    });
            });
        }
    });


    //监听页面跳转
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        "use strict";
        if ($location.path() == '/search') {
            $rootScope.searchHistoryFlag = true;
        }
        if($location.path()=='/registerNext' && localStorage.userInfo){
            $state.go('account');
        }
    });
})
.config(['$stateProvider', '$ionicConfigProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider',
    function ($stateProvider, $ionicConfigProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider) {
        $ionicConfigProvider.scrolling.jsScrolling(true);
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
        $ocLazyLoadProvider.config({
            debug: false,
            events: false
        });
    }])
.filter('trustAsResourceUrl', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);

