/**
 * Created by xiongshengzhong on 16/8/31.
 */
app.config(function ($stateProvider, $urlRouterProvider) {
  "use strict";
  $stateProvider
    .state('home', {
      url: "/home",
      views: {
        "": {
          controller: 'homeCtrl',
          templateUrl: 'templates/home.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/homeCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('activity', {
      url: "/activity/:obj",
      views: {
        "": {
          controller: 'activityCtrl',
          templateUrl: 'templates/activity.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/activityCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('activityDetail', {
      url: "/activityDetail?activityGroupId&sourceId&shareCode&channelCode",
      views: {
        "": {
          controller: 'activityDetailCtrl',
          templateUrl: 'templates/activityDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/activityDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('find', {
      url: "/find",
      views: {
        "": {
          controller: 'findCtrl',
          templateUrl: 'templates/find.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/findCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('shop', {
      url: "/shop",
      views: {
        "": {
          controller: 'shopCtrl',
          templateUrl: 'templates/shop.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/shopCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('forum', {
      url: "/forum?channelCode",
      views: {
        "": {
          controller: 'forumCtrl',
          templateUrl: 'templates/forum.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/forumCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('account', {
      url: "/account",
      views: {
        "": {
          controller: 'accountCtrl',
          templateUrl: 'templates/account.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/accountCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('currentLine', {
      url: "/currentLine?activeIndex",
      views: {
        "": {
          controller: 'currentLineCtrl',
          templateUrl: 'templates/currentLine.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/currentLineCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('futrueLine', {
      url: "/futrueLine",
      views: {
        "": {
          controller: 'futrueLineCtrl',
          templateUrl: 'templates/futrueLine.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/futrueLineCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('theatre', {
      url: "/theatre/:movieId",
      views: {
        "": {
          controller: 'theatreCtrl',
          templateUrl: 'templates/theatre.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/theatreCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('theatreDetail', {
      url: "/theatreDetail?movieId&theatreId&flag",
      views: {
        "": {
          controller: 'theatreDetailCtrl',
          templateUrl: 'templates/theatreDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/theatreDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('movieDetail', {
      url: "/movieDetail?movieId&theatreId&noSale&sourceId&shareCode",
      views: {
        "": {
          controller: 'movieDetailCtrl',
          templateUrl: 'templates/movieDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/movieDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('mapPage', {
      url: "/mapPage/:theatreId",
      views: {
        "": {
          controller: 'mapPageCtrl',
          templateUrl: 'templates/mapPage.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mapPageCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('moviePlay', {
      url: "/moviePlay/:id",
      views: {
        "": {
          controller: 'moviePlayCtrl',
          templateUrl: 'templates/moviePlay.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/moviePlayCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('register', {
      url: "/register?invitationCode&sourceId&shareCode&ruleHeaderId",
      views: {
        "": {
          controller: 'registerCtrl',
          templateUrl: 'templates/register.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/registerCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('registerNext', {
      url: "/registerNext?params",
      views: {
        "": {
          controller: 'registerNextCtrl',
          templateUrl: 'templates/registerNext.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/registerNextCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('login', {
      url: "/login?viewName&urlParams",
      views: {
        "": {
          controller: 'loginCtrl',
          templateUrl: 'templates/login.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/loginCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('loginByVip', {
      url: "/loginByVip",
      views: {
        "": {
          controller: 'loginCtrl',
          templateUrl: 'templates/loginByVip.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/loginCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('search', {
      url: "/search",
      views: {
        "": {
          controller: 'searchCtrl',
          templateUrl: 'templates/search.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/searchCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('loginByYzm', {
      url: "/loginByYzm",
      views: {
        "": {
          controller: 'loginCtrl',
          templateUrl: 'templates/loginByYzm.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/loginCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('findPassword', {
      url: "/findPassword",
      views: {
        "": {
          controller: 'findPasswordCtrl',
          templateUrl: 'templates/findPassword.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/findPasswordCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('findPasswordStep2', {
      url: "/findPasswordStep2",
      views: {
        "": {
          controller: 'findPasswordCtrl',
          templateUrl: 'templates/findPasswordStep2.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/findPasswordCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('schedule', {
      url: "/schedule?movieId&theatreId",
      views: {
        "": {
          controller: 'scheduleCtrl',
          templateUrl: 'templates/schedule.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/scheduleCtrl.js?t=' + locals.version);
        }]
      }
    })

    .state('selectCity', {
      url: "/selectCity",
      views: {
        "": {
          controller: 'selectCityCtrl',
          templateUrl: 'templates/selectCity.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/selectCityCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('selectSeat', {
      url: "/selectSeat?movieId&theatreId&scheduleTime&curIndex&sessionOutId&cinemaOuterId&filmIdAlt",
      views: {
        "": {
          controller: 'selectSeatCtrl',
          templateUrl: 'templates/selectSeat.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/selectSeatCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('queryOrder', {
      url: "/queryOrder?obj&showtime&filmName&filmId&price&skuId&areaName&cinemaName&screenName&surchargeAmount&flag",
      views: {
        "": {
          controller: 'queryOrderCtrl',
          templateUrl: 'templates/queryOrder.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/queryOrderCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('querySalesOrder', {
      url: "/querySalesOrder",
      views: {
        "": {
          controller: 'querySalesOrderCtrl',
          templateUrl: 'templates/querySalesOrder.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/querySalesOrderCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('pay', {
      url: "/pay/:ordNum",
      views: {
        "": {
          controller: 'payCtrl',
          templateUrl: 'templates/pay.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/payCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('paySales', {
      url: "/paySales/:ordNum",
      views: {
        "": {
          controller: 'paySalesCtrl',
          templateUrl: 'templates/paySales.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/paySalesCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('recharge', {
      url: "/recharge/:fromPage",
      views: {
        "": {
          controller: 'rechargeCtrl',
          templateUrl: 'templates/recharge.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/rechargeCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('rechargeRecord', {
      url: "/rechargeRecord",
      views: {
        "": {
          controller: 'rechargeRecordCtrl',
          templateUrl: 'templates/rechargeRecord.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/rechargeRecordCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('bindCard', {
      url: "/bindCard",
      views: {
        "": {
          controller: 'bindCardCtrl',
          templateUrl: 'templates/bindCard.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/bindCardCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myVipHome', {
      url: "/myVipHome",
      views: {
        "": {
          controller: 'myVipHomeCtrl',
          templateUrl: 'templates/myVipHome.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myVipHomeCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('helpCenter', {
      url: "/helpCenter?active&channelCode",
      views: {
        "": {
          controller: 'helpCenterCtrl',
          templateUrl: 'templates/helpCenter.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/helpCenterCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('problems', {
      url: "/problems",
      views: {
        "": {
          controller: 'problemsCtrl',
          templateUrl: 'templates/problems.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/problemsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('personalInformation', {
      url: "/personalInformation",
      views: {
        "": {
          controller: 'personalInformationCtrl',
          templateUrl: 'templates/personalInformation.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/personalInformationCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myTickets', {
      url: "/myTickets?obj",
      views: {
        "": {
          controller: 'myTicketsCtrl',
          templateUrl: 'templates/myTickets.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myTicketsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('mySales', {
      url: "/mySales",
      views: {
        "": {
          controller: 'mySalesCtrl',
          templateUrl: 'templates/mySales.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mySalesCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('messageCenter', {
      url: "/messageCenter",
      views: {
        "": {
          controller: 'messageCenterCtrl',
          templateUrl: 'templates/messageCenter.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/messageCenterCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('privateLetter', {
      url: "/privateLetter",
      views: {
        "": {
          controller: 'messageCenterCtrl',
          templateUrl: 'templates/privateLetter.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/messageCenterCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('otherBuild', {
      url: "/otherBuild",
      views: {
        "": {
          controller: 'otherBuildCtrl',
          templateUrl: 'templates/otherBuild.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/otherBuildCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('changePassword', {
      url: "/changePassword",
      views: {
        "": {
          controller: 'changePasswordCtrl',
          templateUrl: 'templates/changePassword.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/changePasswordCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('changeEmail', {
      url: "/changeEmail",
      views: {
        "": {
          controller: 'changeEmailCtrl',
          templateUrl: 'templates/changeEmail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/changeEmailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('changeSignature', {
      url: "/changeSignature",
      views: {
        "": {
          controller: 'changeSignatureCtrl',
          templateUrl: 'templates/changeSignature.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/changeSignatureCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('changePhone', {
      url: "/changePhone",
      views: {
        "": {
          controller: 'personalInformationCtrl',
          templateUrl: 'templates/changePhone.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/personalInformationCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('changePhoneStep2', {
      url: "/changePhoneStep2",
      views: {
        "": {
          controller: 'personalInformationCtrl',
          templateUrl: 'templates/changePhoneStep2.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/personalInformationCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('address', {
      url: "/address?product&id&person&status&allflag",
      views: {
        "": {
          controller: 'addressCtrl',
          templateUrl: 'templates/address.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/addressCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('addressStep2', {
      url: "/addressStep2?addressStatus&addressId&flag&product&id&status&allflag",
      views: {
        "": {
          controller: 'addressStep2Ctrl',
          templateUrl: 'templates/addressStep2.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/addressStep2Ctrl.js?t=' + locals.version);
        }]
      }
    })
    .state('addressStep3', {
      url: "/addressStep3?addressStatus&addressId&flag&product&id&status&allflag",
      views: {
        "": {
          controller: 'addressStep3Ctrl',
          templateUrl: 'templates/addressStep3.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/addressStep3Ctrl.js?t=' + locals.version);
        }]
      }
    })
    .state('setUp', {
      url: "/setUp",
      views: {
        "": {
          controller: 'setUpCtrl',
          templateUrl: 'templates/setUp.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/setUpCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('aboutUs', {
      url: "/aboutUs",
      views: {
        "": {
          controller: 'aboutUsCtrl',
          templateUrl: 'templates/aboutUs.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/aboutUsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('feedBack', {
      url: "/feedBack?scanCodeFlag",
      views: {
        "": {
          controller: 'feedBackCtrl',
          templateUrl: 'templates/feedBack.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/feedBackCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('nickName', {
      url: "/nickName",
      views: {
        "": {
          controller: 'nickNameCtrl',
          templateUrl: 'templates/nickName.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/nickNameCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myFootprint', {
      url: "/myFootprint",
      views: {
        "": {
          controller: 'myFootprintCtrl',
          templateUrl: 'templates/myFootprint.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myFootprintCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('getOrderTicket', {
      url: "/getOrderTicket?ordNum&orderType&paymentBankNumber",
      views: {
        "": {
          controller: 'getOrderTicketCtrl',
          templateUrl: 'templates/getOrderTicket.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/getOrderTicketCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('orderSuccessfully', {
      url: "/orderSuccessfully?tid&ordNum&fromPage",
      views: {
        "": {
          controller: 'orderSuccessfullyCtrl',
          templateUrl: 'templates/orderSuccessfully.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/orderSuccessfullyCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('shake', {
      url: "/shake",
      views: {
        "": {
          controller: 'shakeCtrl',
          templateUrl: 'templates/shake.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/shakeCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('chargePayment', {
      url: "/chargePayment/:totalAmount/:num/:fromPage",
      views: {
        "": {
          controller: 'chargePaymentCtrl',
          templateUrl: 'templates/chargePayment.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/chargePaymentCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('actorDetail', {
      url: "/actorDetail?id&index",
      views: {
        "": {
          controller: 'actorDetailCtrl',
          templateUrl: 'templates/actorDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/actorDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('articleDetail', {
      url: "/articleDetail?id&sourceId&shareCode",
      views: {
        "": {
          controller: 'articleDetailCtrl',
          templateUrl: 'templates/articleDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/articleDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('agreeMent', {
      url: "/agreeMent",
      views: {
        "": {
          controller: 'agreeMentCtrl',
          templateUrl: 'templates/agreeMent.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/agreeMentCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('privacyMent', {
      url: "/privacyMent",
        views: {
        "": {
            controller: 'privacyMentCtrl',
            templateUrl: 'templates/privacyMent.html?t=' + locals.version
        }
    },
    resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('js/controllers/privacyMentCtrl.js?t=' + locals.version);
        }]
    }
})
    .state('noticeDetail', {
      url: "/noticeDetail?id",
      views: {
        "": {
          controller: 'noticeDetailCtrl',
          templateUrl: 'templates/noticeDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/noticeDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('commonDetail', {
      url: "/commonDetail?params",
      views: {
        "": {
          controller: 'commonDetailCtrl',
          templateUrl: 'templates/commonDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/commonDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('business', {
      url: "/business",
      views: {
        "": {
          controller: 'businessCtrl',
          templateUrl: 'templates/business.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/businessCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('businessDetail', {
      url: "/businessDetail?id&name",
      views: {
        "": {
          controller: 'businessDetailCtrl',
          templateUrl: 'templates/businessDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/businessDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('trainDetail', {
      url: "/trainDetail?id",
      views: {
        "": {
          controller: 'trainDetailCtrl',
          templateUrl: 'templates/trainDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/trainDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('jydtDetail', {
      url: "/jydtDetail?id",
      views: {
        "": {
          controller: 'jydtDetailCtrl',
          templateUrl: 'templates/jydtDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/jydtDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('JinyiCulture', {
      url: "/JinyiCulture?id",
      views: {
        "": {
          controller: 'JinyiCultureCtrl',
          templateUrl: 'templates/JinyiCulture.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/JinyiCultureCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('hyqy', {
      url: "/hyqy?cardType&title",
      views: {
        "": {
          controller: 'hyqyCtrl',
          templateUrl: 'templates/hyqy.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/hyqyCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myPin', {
      url: "/myPin",
      views: {
        "": {
          controller: 'myPinCtrl',
          templateUrl: 'templates/myPin.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myPinCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myWallet', {
      url: "/myWallet",
      views: {
        "": {
          controller: 'myWalletCtrl',
          templateUrl: 'templates/myWallet.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myWalletCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('yhj', {
      url: "/yhj?index",
      views: {
        "": {
          controller: 'yhjCtrl',
          templateUrl: 'templates/yhj.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/yhjCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myOrder', {
      url: "/myOrder",
      views: {
        "": {
          controller: 'myOrderCtrl',
          templateUrl: 'templates/myOrder.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myOrderCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('sharePage', {
      url: "/sharePage/:ruleHeaderId/:sourceId",
      views: {
        "": {
          controller: 'sharePageCtrl',
          templateUrl: 'templates/sharePage.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/sharePageCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('wxPay', {
      url: "/wxPay/:ordNum",
      views: {
        "": {
          controller: 'wxPayCtrl',
          templateUrl: 'templates/wxPay.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/wxPayCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('question', {
      url: "/question",
      views: {
        "": {
          controller: 'questionCtrl',
          templateUrl: 'templates/question.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/questionCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('questionDetail', {
      url: "/questionDetail/:surveyHeaderId/:surveyTitle",
      views: {
        "": {
          controller: 'questionDetailCtrl',
          templateUrl: 'templates/questionDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/questionDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('mealList', {
      url: "/mealList/:cinemaOutId/:screenName/:seatDeatilMessage/:scanCodeFlag",
      views: {
        "": {
          controller: 'mealListCtrl',
          templateUrl: 'templates/mealList.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mealListCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('mall', {
      url: "/mall",
      views: {
        "": {
          controller: 'mallCtrl',
          templateUrl: 'templates/mall.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mallCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('productDetail', {
      url: "/productDetail?skuId&cardId&ruleHeaderIdList&cardRenewalFlag&itemId&cinemaId&openChannel",
      views: {
        "": {
          controller: 'productDetailCtrl',
          templateUrl: 'templates/productDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/productDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('mallOrder', {
      url: "/mallOrder?addressId&status&allflag&id&confirmRegulationsFlag&ruleHeaderIdList&skuId&cardId&cardRenewalFlag&growthSign&skuItemType&cinemaId&openChannel",
      views: {
        "": {
          controller: 'mallOrderCtrl',
          templateUrl: 'templates/mallOrder.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mallOrderCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('membershipRegulations', {
      url: "/membershipRegulations?articleType&articleId&articleTitle",
      views: {
        "": {
          controller: 'membershipRegulationsCtrl',
          templateUrl: 'templates/membershipRegulations.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/membershipRegulationsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myCart', {
      url: "/myCart",
      views: {
        "": {
          controller: 'myCartCtrl',
          templateUrl: 'templates/myCart.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myCartCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myGoods', {
      url: "/myGoods",
      views: {
        "": {
          controller: 'myGoodsCtrl',
          templateUrl: 'templates/myGoods.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myGoodsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('orderDetails', {
      url: "/orderDetails?tid",
      views: {
        "": {
          controller: 'orderDetailsCtrl',
          templateUrl: 'templates/orderDetails.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/orderDetailsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('category', {
      url: "/category?catId&title&index&cinemaNameAlt&cinemaOuterId&catName",
      views: {
        "": {
          controller: 'categoryCtrl',
          templateUrl: 'templates/category.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/categoryCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('mallSearch', {
      url: "/mallSearch?catId&title",
      views: {
        "": {
          controller: 'mallSearchCtrl',
          templateUrl: 'templates/mallSearch.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mallSearchCtrl.js?t=' + locals.version);
        }]
      }
    })

    .state('myRightsCard', {
      url: "/myRightsCard",
      views: {
        "": {
          controller: 'myRightsCardCtrl',
          templateUrl: 'templates/myRightsCard.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myRightsCardCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myRightsCardDetail', {
      url: "/myRightsCardDetail/:equitycardInfoId",
      views: {
        "": {
          controller: 'myRightsCardDetailCtrl',
          templateUrl: 'templates/myRightsCardDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myRightsCardDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myRights', {
      url: "/myRights",
      views: {
        "": {
          controller: 'myRightsCtrl',
          templateUrl: 'templates/myRights.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myRightsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('setMyRightsCard', {
      url: "/setMyRightsCard",
      views: {
        "": {
          controller: 'setMyRightsCardCtrl',
          templateUrl: 'templates/setMyRightsCard.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/setMyRightsCardCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('moreRightsCard', {
      url: "/moreRightsCard",
      views: {
        "": {
          controller: 'moreRightsCardCtrl',
          templateUrl: 'templates/moreRightsCard.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/moreRightsCardCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('buyRightsDetail', {
      url: "/buyRightsDetail?skuId&status&equitycardInfoId",
      views: {
        "": {
          controller: 'buyRightsDetailCtrl',
          templateUrl: 'templates/buyRightsDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/buyRightsDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myElectronicCode', {
      url: "/myElectronicCode",
      views: {
        "": {
          controller: 'myElectronicCodeCtrl',
          templateUrl: 'templates/myElectronicCode.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myElectronicCodeCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('equityAgreement', {
      url: "/equityAgreement",
      views: {
        "": {
          controller: 'equityAgreementCtrl',
          templateUrl: 'templates/equityAgreement.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/equityAgreementCtrl.js?t=' + locals.version);
        }]
      }
    })

    .state('delilocals.versionyMethod', {
      url: "/delilocals.versionyMethod",
      views: {
        "": {
          controller: 'delilocals.versionyMethodCtrl',
          templateUrl: 'templates/delilocals.versionyMethod.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/delilocals.versionyMethodCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('sinceTheater', {
      url: "/sinceTheater?status&id&product&itemId&skuId&addressId",
      views: {
        "": {
          controller: 'sinceTheaterCtrl',
          templateUrl: 'templates/sinceTheater.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/sinceTheaterCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('requestRefund', {
      url: "/requestRefund/:tid/:oid",
      views: {
        "": {
          controller: 'requestRefundCtrl',
          templateUrl: 'templates/requestRefund.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/requestRefundCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('pickUpProgress', {
      url: "/pickUpProgress?tid&oid",
      views: {
        "": {
          controller: 'pickUpProgressCtrl',
          templateUrl: 'templates/pickUpProgress.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/pickUpProgressCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('giftCards', {
      url: "/giftCards",
      views: {
        "": {
          controller: 'giftCardsCtrl',
          templateUrl: 'templates/giftCards.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/giftCardsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('giftCardsList', {
      url: "/giftCardsList",
      views: {
        "": {
          controller: 'giftCardsListCtrl',
          templateUrl: 'templates/giftCardsList.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/giftCardsListCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('pointsMall', {
      url: "/pointsMall",
      views: {
        "": {
          controller: 'pointsMallCtrl',
          templateUrl: 'templates/pointsMall.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/pointsMallCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('allPointsGood', {
      url: "/allPointsGood",
      views: {
        "": {
          controller: 'allPointsGoodCtrl',
          templateUrl: 'templates/allPointsGood.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/allPointsGoodCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('pointProductDetail', {
      url: "/pointProductDetail/:skuId",
      views: {
        "": {
          controller: 'pointProductDetailCtrl',
          templateUrl: 'templates/pointProductDetail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/pointProductDetailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('pointMallOrder', {
      url: "/pointMallOrder?addressId&status&allflag",
      views: {
        "": {
          controller: 'pointMallOrderCtrl',
          templateUrl: 'templates/pointMallOrder.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/pointMallOrderCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('memberCenter', {
      url: "/memberCenter",
      views: {
        "": {
          controller: 'memberCenterCtrl',
          templateUrl: 'templates/memberCenter.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/memberCenterCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('memberBenefits', {
      url: "/memberBenefits",
      views: {
        "": {
          controller: 'memberBenefitsCtrl',
          templateUrl: 'templates/memberBenefits.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/memberBenefitsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('roadCourse', {
      url: "/roadCourse",
      views: {
        "": {
          controller: 'roadCourseCtrl',
          templateUrl: 'templates/roadCourse.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/roadCourseCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('memberCheats', {
      url: "/memberCheats",
      views: {
        "": {
          controller: 'memberCheatsCtrl',
          templateUrl: 'templates/memberCheats.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/memberCheatsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('personalLetter', {
      url: "/personalLetter?id&messageContent&platform",
      views: {
        "": {
          controller: 'personalLetterCtrl',
          templateUrl: 'templates/personalLetter.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/personalLetterCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('awardBigWheel', {
      url: "/awardBigWheel?lotteryDrawHeaderId&sourceId&shareCode&channelCode",
      views: {
        "": {
          controller: 'awardBigWheelCtrl',
          templateUrl: 'templates/awardBigWheel.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/awardBigWheelCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('awardGuagua', {
      url: "/awardGuagua?lotteryDrawHeaderId&sourceId&shareCode&channelCode",
      views: {
        "": {
          controller: 'awardGuaguaCtrl',
          templateUrl: 'templates/awardGuagua.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/awardGuaguaCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('awardGoldenEggs', {
      url: "/awardGoldenEggs?lotteryDrawHeaderId&sourceId&shareCode&channelCode",
      views: {
        "": {
          controller: 'awardGoldenEggsCtrl',
          templateUrl: 'templates/awardGoldenEggs.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/awardGoldenEggsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myFans', {
      url: "/myFans",
      views: {
        "": {
          controller: 'myFansCtrl',
          templateUrl: 'templates/myFans.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myFansCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myAttention', {
      url: "/myAttention",
      views: {
        "": {
          controller: 'myAttentionCtrl',
          templateUrl: 'templates/myAttention.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myAttentionCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('myComment', {
      url: "/myComment?movieId",
      views: {
        "": {
          controller: 'myCommentCtrl',
          templateUrl: 'templates/myComment.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myCommentCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('filmCritic', {
      url: "/filmCritic?commentFilmDetailId",
      views: {
        "": {
          controller: 'filmCriticCtrl',
          templateUrl: 'templates/filmCritic.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/filmCriticCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('homePage', {
      url: "/homePage?memberId&sourceId&shareCode",
      views: {
        "": {
          controller: 'homePageCtrl',
          templateUrl: 'templates/homePage.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/homePageCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('deliveryMethod', {
      url: "/deliveryMethod?status&allflag",
      views: {
        "": {
          controller: 'deliveryMethodCtrl',
          templateUrl: 'templates/deliveryMethod.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/deliveryMethodCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('checkLogistics', {
      url: "/checkLogistics?expressCode&deliveryOrderCode&accessPath",
      views: {
        "": {
          controller: 'checkLogisticsCtrl',
          templateUrl: 'templates/checkLogistics.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/checkLogisticsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('refunds', {
      url: "/refunds/:tid/:oid",
      views: {
        "": {
          controller: 'refundsCtrl',
          templateUrl: 'templates/refunds.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/refundsCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('receivingCenter', {
      url: "/receivingCenter",
      views: {
        "": {
          controller: 'receivingCenterCtrl',
          templateUrl: 'templates/receivingCenter.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/receivingCenterCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('playVideo', {
      url: "/playVideo?movieId",
      views: {
        "": {
          controller: 'playVideoCtrl',
          templateUrl: 'templates/playVideo.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/playVideoCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('invitedScan', {
      url: "/invitedScan?employeeNumber",
      views: {
        "": {
          controller: 'invitedScanCtrl',
          templateUrl: 'templates/invitedScan.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/invitedScanCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('payCard', {
      url: "/payCard?paymentBankNumber&totalAmount",
      views: {
        "": {
          controller: 'payCardCtrl',
          templateUrl: 'templates/payCard.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/payCardCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('meeting', {
      url: "/meeting?skuId",
      views: {
        "": {
          controller: 'meetingCtrl',
          templateUrl: 'templates/meeting.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/meetingCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('dailyQuestion', {
      url: "/dailyQuestion",
      views: {
        "": {
          controller: 'dailyQuestionCtrl',
          templateUrl: 'templates/dailyQuestion.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/dailyQuestionCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('pickingCode', {
      url: "/pickingCode?vistaBookingId",
      views: {
        "": {
          controller: 'pickingCodeCtrl',
          templateUrl: 'templates/pickingCode.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/pickingCodeCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('gessLove', {
      url: "/gessLove",
      views: {
        "": {
          controller: 'gessLoveCtrl',
          templateUrl: 'templates/gessLove.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/gessLoveCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('dailyCheck', {
      url: "/dailyCheck",
      views: {
        "": {
          controller: 'dailyCheckCtrl',
          templateUrl: 'templates/dailyCheck.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/dailyCheckCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('worldCup-quiz', {
      url: "/worldCup-quiz",
      views: {
        "": {
          controller: 'worldCup-quizCtrl',
          templateUrl: 'templates/worldCup-quiz.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/worldCup-quizCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('worldCup-detail', {
      url: "/worldCup-detail",
      views: {
        "": {
          controller: 'worldCup-detailCtrl',
          templateUrl: 'templates/worldCup-detail.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/worldCup-detailCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('worldCup', {
      url: "/worldCup",
      views: {
        "": {
          controller: 'worldCupCtrl',
          templateUrl: 'templates/worldCup.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/worldCupCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('co-brandedCard', {
      url: "/co-brandedCard?tel&data&sign",
      views: {
        "": {
          controller: 'co-brandedCardCtrl',
          templateUrl: 'templates/co-brandedCard.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/co-brandedCardCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('waiting', {
      url: "/waiting?paymentBankNumber",
      views: {
        "": {
          controller: 'waitingCtrl',
          templateUrl: 'templates/waiting.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/waitingCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('couponCenter', {
      url: "/couponCenter",
      views: {
        "": {
          controller: 'couponCenterCtrl',
          templateUrl: 'templates/couponCenter.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/couponCenterCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('cinema', {
      url: "/cinema",
      views: {
        "": {
          controller: 'cinemaCtrl',
          templateUrl: 'templates/cinema.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/cinemaCtrl.js?t=' + locals.version);
        }]
      }
    })
    //.state('JinyiCulture', {
    //    url: "/JinyiCulture",
    //    views: {
    //        "": {
    //            controller: 'JinyiCultureCtrl',
    //            templateUrl: 'templates/JinyiCulture.html?t='+locals.version
    //        }
    //    },
    //    resolve: {
    //        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
    //            return $ocLazyLoad.load('js/controllers/JinyiCultureCtrl.js?t='+locals.version);
    //        }]
    //    }
    //})
    .state('myRedemption', {
      url: "/myRedemption",
      views: {
        "": {
          controller: 'myRedemptionCtrl',
          templateUrl: 'templates/myRedemption.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myRedemptionCtrl.js?t=' + locals.version);
        }]
      }
    })
    .state('awardTiger', {
      url: "/awardTiger?lotteryDrawHeaderId&sourceId&shareCode&channelCode",
      views: {
        "": {
          controller: 'awardTigerCtrl',
          templateUrl: 'templates/awardTiger.html?t=' + locals.version
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/awardTigerCtrl.js?t=' + locals.version);
        }]
      }
    })
  ;
  $urlRouterProvider.otherwise('/home');

});
