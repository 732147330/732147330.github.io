var app = angular.module('jyApp', [
  'ionic',
  'oc.lazyLoad',
  'ngAnimate',
  'jyApp.services',
  'jyApp.directives',
  "ngSanitize",
  "ionicLazyLoad",
  'angular-nicescroll',
  'mobiscroll-datetime',
  'LocalForageModule',
  'ionic-citypicker'
])
  .constant('$ionicLoadingConfig', {
    template: 'Loading...'
  })
  .run(function ($rootScope, $ionicPlatform, $ionicPopup, $location, $ionicHistory, $templateCache, $timeout, $http, JYApi, $state) {
    $rootScope.defaultPic = './img/default.png';
    $rootScope.languageSetting = languageSetting;
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      //提示
      $rootScope.showTip = function (msg) {
        var myPopup = $ionicPopup.show({
          title: '',
          cssClass: 'jyAlert jyAlert1 sucTip',
          template: msg
        });
        $timeout(function () {
          myPopup.close();
        }, 2000);
      };

      //获取启动宣传图
      $rootScope.hasData = false;
      if (localStorage.userInfo && JSON.parse(localStorage.userInfo).level == '上市纪念卡') {
        $rootScope.carouseStartlData = [
          {
            url: './img/splash_tuhao.jpg'
          }
        ];
        $timeout(function () {
          var swiper = new Swiper('.swiper-container-start', {
            loop: false,
            noSwiping: true
          });
        }, 0);
      } else {
        $http({
          url: JYApi.findAdvertisImageInfo,
          method: 'post',
          data: $.param({
            params: JSON.stringify({
              "adverPosition": "APP_AD_START",
              "cityName": ""
            })
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "token": localStorage.userInfo ? JSON.parse(localStorage.userInfo).token : ''
          },
          timeout: 500
        }).success(function (res) {
          if (res.status == "S") {
            $rootScope.carouseStartlData = res.data;
            $timeout(function () {
              var swiper = new Swiper('.swiper-container-start', {
                loop: false,
                noSwiping: true
              });
            }, 0);
            if (res.data.length == 0) {
              $rootScope.hasData = true;
            }
          } else {
            $rootScope.hasData = true;
          }
        }).error(function (err) {
          $rootScope.hasData = true;
        });
      }

      //安卓返回键
      $ionicPlatform.registerBackButtonAction(function (e) {
        function showConfirm() {
          var confirmPopup = $ionicPopup.confirm({
            title: '<strong>退出应用?</strong>',
            template: '你确定要退出应用吗?',
            okText: '退出',
            cancelText: '取消'
          });
          confirmPopup.then(function (res) {
            if (res) {
              ionic.Platform.exitApp();
            } else {

            }
          });
        }

        //判断处于哪个页面时双击退出
        if ($location.path() == '/home') {
          showConfirm();
        } else if ($ionicHistory.backView()) {
          $ionicHistory.goBack();
        } else {
          $state.go('home');
        }
        e.preventDefault();
        return false;
      }, 100);
    });
    //监听页面跳转
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      "use strict";

      if (typeof(current) != 'undefined') {
        $templateCache.remove(current);
      }
      if ($location.path() == '/search') {
        $rootScope.searchHistoryFlag = true;
      }
      if ($location.path() == '/registerNext' && localStorage.userInfo) {
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

