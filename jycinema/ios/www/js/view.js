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
          templateUrl: 'templates/home.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/homeCtrl.js');
        }]
      }
    })
    .state('activity', {
      url: "/activity",
      views: {
        "": {
          controller: 'activityCtrl',
          templateUrl: 'templates/activity.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/activityCtrl.js');
        }]
      }
    })
    .state('activityDetail', {
      url: "/activityDetail?activityGroupId",
      views: {
        "": {
          controller: 'activityDetailCtrl',
          templateUrl: 'templates/activityDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/activityDetailCtrl.js');
        }]
      }
    })
    .state('jointlyActivity', {
          url: "/jointlyActivity?jointlyHeaderId&title",
          views: {
              "": {
                  controller: 'jointlyActivityCtrl',
                  templateUrl: 'templates/jointlyActivity.html?t=' + locals.version
              }
          },
          resolve: {
              deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                  return $ocLazyLoad.load('js/controllers/jointlyActivityCtrl.js?t=' + locals.version);
              }]
          }
      })
    .state('find', {
      url: "/find",
      views: {
        "": {
          controller: 'findCtrl',
          templateUrl: 'templates/find.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/findCtrl.js');
        }]
      }
    })
    .state('shop', {
      url: "/shop",
      views: {
        "": {
          controller: 'shopCtrl',
          templateUrl: 'templates/shop.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/shopCtrl.js');
        }]
      }
    })
    .state('forum', {
      url: "/forum",
      views: {
        "": {
          controller: 'forumCtrl',
          templateUrl: 'templates/forum.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/forumCtrl.js');
        }]
      }
    })
    .state('account', {
      url: "/account",
      views: {
        "": {
          controller: 'accountCtrl',
          templateUrl: 'templates/account.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/accountCtrl.js');
        }]
      }
    })
    .state('currentLine', {
      url: "/currentLine?activeIndex",
      views: {
        "": {
          controller: 'currentLineCtrl',
          templateUrl: 'templates/currentLine.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/currentLineCtrl.js');
        }]
      }
    })
    .state('futrueLine', {
      url: "/futrueLine",
      views: {
        "": {
          controller: 'futrueLineCtrl',
          templateUrl: 'templates/futrueLine.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/futrueLineCtrl.js');
        }]
      }
    })
    .state('theatre', {
      url: "/theatre/:movieId",
      views: {
        "": {
          controller: 'theatreCtrl',
          templateUrl: 'templates/theatre.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/theatreCtrl.js');
        }]
      }
    })
    .state('theatreDetail', {
      url: "/theatreDetail?movieId&theatreId&flag",
      views: {
        "": {
          controller: 'theatreDetailCtrl',
          templateUrl: 'templates/theatreDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/theatreDetailCtrl.js');
        }]
      }
    })
    .state('movieDetail', {
      url: "/movieDetail?movieId&theatreId&noSale&sourceId&shareCode",
      views: {
        "": {
          controller: 'movieDetailCtrl',
          templateUrl: 'templates/movieDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/movieDetailCtrl.js');
        }]
      }
    })
    .state('mapPage', {
      url: "/mapPage/:theatreId",
      views: {
        "": {
          controller: 'mapPageCtrl',
          templateUrl: 'templates/mapPage.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mapPageCtrl.js');
        }]
      }
    })
    .state('moviePlay', {
      url: "/moviePlay/:id",
      views: {
        "": {
          controller: 'moviePlayCtrl',
          templateUrl: 'templates/moviePlay.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/moviePlayCtrl.js');
        }]
      }
    })
    .state('register', {
      url: "/register?invitationCode&sourceId&ruleHeaderId",
      views: {
        "": {
          controller: 'registerCtrl',
          templateUrl: 'templates/register.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/registerCtrl.js');
        }]
      }
    })
    .state('registerNext', {
      url: "/registerNext?params",
      views: {
        "": {
          controller: 'registerNextCtrl',
          templateUrl: 'templates/registerNext.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/registerNextCtrl.js');
        }]
      }
    })
    .state('login', {
      url: "/login?viewName&urlParams",
      views: {
        "": {
          controller: 'loginCtrl',
          templateUrl: 'templates/login.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/loginCtrl.js');
        }]
      }
    })
    .state('loginByVip', {
      url: "/loginByVip",
      views: {
        "": {
          controller: 'loginCtrl',
          templateUrl: 'templates/loginByVip.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/loginCtrl.js');
        }]
      }
    })
    .state('search', {
      url: "/search",
      views: {
        "": {
          controller: 'searchCtrl',
          templateUrl: 'templates/search.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/searchCtrl.js');
        }]
      }
    })
    .state('loginByYzm', {
      url: "/loginByYzm",
      views: {
        "": {
          controller: 'loginCtrl',
          templateUrl: 'templates/loginByYzm.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/loginCtrl.js');
        }]
      }
    })
    .state('findPassword', {
      url: "/findPassword",
      views: {
        "": {
          controller: 'findPasswordCtrl',
          templateUrl: 'templates/findPassword.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/findPasswordCtrl.js');
        }]
      }
    })
    .state('findPasswordStep2', {
      url: "/findPasswordStep2",
      views: {
        "": {
          controller: 'findPasswordCtrl',
          templateUrl: 'templates/findPasswordStep2.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/findPasswordCtrl.js');
        }]
      }
    })
    .state('schedule', {
      url: "/schedule?movieId&theatreId&city",
      views: {
        "": {
          controller: 'scheduleCtrl',
          templateUrl: 'templates/schedule.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/scheduleCtrl.js');
        }]
      }
    })

    .state('selectCity', {
      url: "/selectCity",
      views: {
        "": {
          controller: 'selectCityCtrl',
          templateUrl: 'templates/selectCity.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/selectCityCtrl.js');
        }]
      }
    })
    .state('selectSeat', {
      url: "/selectSeat?movieId&theatreId&scheduleTime&curIndex&sessionOutId&cinemaOuterId&filmIdAlt",
      views: {
        "": {
          controller: 'selectSeatCtrl',
          templateUrl: 'templates/selectSeat.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/selectSeatCtrl.js');
        }]
      }
    })
    .state('queryOrder', {
      url: "/queryOrder?obj&showtime&filmName&filmId&price&skuId&areaName&cinemaName&screenName&surchargeAmount&flag",
      views: {
        "": {
          controller: 'queryOrderCtrl',
          templateUrl: 'templates/queryOrder.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/queryOrderCtrl.js');
        }]
      }
    })
    .state('pay', {
      url: "/pay?ordNum",
      views: {
        "": {
          controller: 'payCtrl',
          templateUrl: 'templates/pay.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/payCtrl.js');
        }]
      }
    })
    .state('paySales', {
      url: "/paySales?ordNum",
      views: {
        "": {
          controller: 'paySalesCtrl',
          templateUrl: 'templates/paySales.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/paySalesCtrl.js');
        }]
      }
    })
    .state('recharge', {
      url: "/recharge?fromPage",
      views: {
        "": {
          controller: 'rechargeCtrl',
          templateUrl: 'templates/recharge.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/rechargeCtrl.js');
        }]
      }
    })
    .state('rechargeRecord', {
      url: "/rechargeRecord",
      views: {
        "": {
          controller: 'rechargeRecordCtrl',
          templateUrl: 'templates/rechargeRecord.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/rechargeRecordCtrl.js');
        }]
      }
    })
    .state('bindCard', {
      url: "/bindCard",
      views: {
        "": {
          controller: 'bindCardCtrl',
          templateUrl: 'templates/bindCard.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/bindCardCtrl.js');
        }]
      }
    })
    .state('myVipHome', {
      url: "/myVipHome",
      views: {
        "": {
          controller: 'myVipHomeCtrl',
          templateUrl: 'templates/myVipHome.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myVipHomeCtrl.js');
        }]
      }
    })
    .state('helpCenter', {
      url: "/helpCenter",
      views: {
        "": {
          controller: 'helpCenterCtrl',
          templateUrl: 'templates/helpCenter.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/helpCenterCtrl.js');
        }]
      }
    })
    .state('problems', {
      url: "/problems",
      views: {
        "": {
          controller: 'problemsCtrl',
          templateUrl: 'templates/problems.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/problemsCtrl.js');
        }]
      }
    })
    .state('personalInformation', {
      url: "/personalInformation",
      views: {
        "": {
          controller: 'personalInformationCtrl',
          templateUrl: 'templates/personalInformation.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/personalInformationCtrl.js');
        }]
      }
    })
    .state('myTickets', {
      url: "/myTickets?obj",
      views: {
        "": {
          controller: 'myTicketsCtrl',
          templateUrl: 'templates/myTickets.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myTicketsCtrl.js');
        }]
      }
    })
    .state('mySales', {
      url: "/mySales",
      views: {
        "": {
          controller: 'mySalesCtrl',
          templateUrl: 'templates/mySales.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mySalesCtrl.js');
        }]
      }
    })
    .state('messageCenter', {
      url: "/messageCenter",
      views: {
        "": {
          controller: 'messageCenterCtrl',
          templateUrl: 'templates/messageCenter.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/messageCenterCtrl.js');
        }]
      }
    })
    .state('privateLetter', {
      url: "/privateLetter",
      views: {
        "": {
          controller: 'messageCenterCtrl',
          templateUrl: 'templates/privateLetter.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/messageCenterCtrl.js');
        }]
      }
    })
    .state('otherBuild', {
      url: "/otherBuild",
      views: {
        "": {
          controller: 'otherBuildCtrl',
          templateUrl: 'templates/otherBuild.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/otherBuildCtrl.js');
        }]
      }
    })
    .state('changePassword', {
      url: "/changePassword",
      views: {
        "": {
          controller: 'changePasswordCtrl',
          templateUrl: 'templates/changePassword.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/changePasswordCtrl.js');
        }]
      }
    })
    .state('changeEmail', {
      url: "/changeEmail",
      views: {
        "": {
          controller: 'changeEmailCtrl',
          templateUrl: 'templates/changeEmail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/changeEmailCtrl.js');
        }]
      }
    })
    .state('changeSignature', {
      url: "/changeSignature",
      views: {
        "": {
          controller: 'changeSignatureCtrl',
          templateUrl: 'templates/changeSignature.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/changeSignatureCtrl.js');
        }]
      }
    })
    .state('changePhone', {
      url: "/changePhone",
      views: {
        "": {
          controller: 'personalInformationCtrl',
          templateUrl: 'templates/changePhone.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/personalInformationCtrl.js');
        }]
      }
    })
    .state('changePhoneStep2', {
      url: "/changePhoneStep2",
      views: {
        "": {
          controller: 'personalInformationCtrl',
          templateUrl: 'templates/changePhoneStep2.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/personalInformationCtrl.js');
        }]
      }
    })
    .state('address', {
      url: "/address?product&id&person&status&allflag",
      views: {
        "": {
          controller: 'addressCtrl',
          templateUrl: 'templates/address.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/addressCtrl.js');
        }]
      }
    })
    .state('addressStep2', {
      url: "/addressStep2?addressStatus&addressId&flag&product&id&status&allflag",
      views: {
        "": {
          controller: 'addressStep2Ctrl',
          templateUrl: 'templates/addressStep2.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/addressStep2Ctrl.js');
        }]
      }
    })
    .state('addressStep3', {
      url: "/addressStep3?addressStatus&addressId&flag&product&id&status&allflag",
      views: {
        "": {
          controller: 'addressStep3Ctrl',
          templateUrl: 'templates/addressStep3.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/addressStep3Ctrl.js');
        }]
      }
    })
    .state('setUp', {
      url: "/setUp",
      views: {
        "": {
          controller: 'setUpCtrl',
          templateUrl: 'templates/setUp.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/setUpCtrl.js');
        }]
      }
    })
    .state('aboutUs', {
      url: "/aboutUs",
      views: {
        "": {
          controller: 'aboutUsCtrl',
          templateUrl: 'templates/aboutUs.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/aboutUsCtrl.js');
        }]
      }
    })
    .state('feedBack', {
      url: "/feedBack?scanCodeFlag",
      views: {
        "": {
          controller: 'feedBackCtrl',
          templateUrl: 'templates/feedBack.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/feedBackCtrl.js');
        }]
      }
    })
    .state('nickName', {
      url: "/nickName",
      views: {
        "": {
          controller: 'nickNameCtrl',
          templateUrl: 'templates/nickName.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/nickNameCtrl.js');
        }]
      }
    })
    .state('myFootprint', {
      url: "/myFootprint",
      views: {
        "": {
          controller: 'myFootprintCtrl',
          templateUrl: 'templates/myFootprint.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myFootprintCtrl.js');
        }]
      }
    })
    .state('getOrderTicket', {
      url: "/getOrderTicket?ordNum&orderType",
      views: {
        "": {
          controller: 'getOrderTicketCtrl',
          templateUrl: 'templates/getOrderTicket.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/getOrderTicketCtrl.js');
        }]
      }
    })
    .state('orderSuccessfully', {
      url: "/orderSuccessfully?tid&ordNum&fromPage&pingfen",
      views: {
        "": {
          controller: 'orderSuccessfullyCtrl',
          templateUrl: 'templates/orderSuccessfully.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/orderSuccessfullyCtrl.js');
        }]
      }
    })
    .state('shake', {
      url: "/shake",
      views: {
        "": {
          controller: 'shakeCtrl',
          templateUrl: 'templates/shake.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/shakeCtrl.js');
        }]
      }
    })
    .state('chargePayment', {
      url: "/chargePayment?params",
      views: {
        "": {
          controller: 'chargePaymentCtrl',
          templateUrl: 'templates/chargePayment.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/chargePaymentCtrl.js');
        }]
      }
    })
    .state('actorDetail', {
      url: "/actorDetail?id&index",
      views: {
        "": {
          controller: 'actorDetailCtrl',
          templateUrl: 'templates/actorDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/actorDetailCtrl.js');
        }]
      }
    })
    .state('articleDetail', {
      url: "/articleDetail?id&sourceId&shareCode",
      views: {
        "": {
          controller: 'articleDetailCtrl',
          templateUrl: 'templates/articleDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/articleDetailCtrl.js');
        }]
      }
    })
    .state('agreeMent', {
      url: "/agreeMent",
      views: {
        "": {
          controller: 'agreeMentCtrl',
          templateUrl: 'templates/agreeMent.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/agreeMentCtrl.js');
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
          templateUrl: 'templates/noticeDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/noticeDetailCtrl.js');
        }]
      }
    })
    .state('commonDetail', {
      url: "/commonDetail?params",
      views: {
        "": {
          controller: 'commonDetailCtrl',
          templateUrl: 'templates/commonDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/commonDetailCtrl.js');
        }]
      }
    })
    .state('business', {
      url: "/business",
      views: {
        "": {
          controller: 'businessCtrl',
          templateUrl: 'templates/business.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/businessCtrl.js');
        }]
      }
    })
    .state('businessDetail', {
      url: "/businessDetail?id&name",
      views: {
        "": {
          controller: 'businessDetailCtrl',
          templateUrl: 'templates/businessDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/businessDetailCtrl.js');
        }]
      }
    })
    .state('trainDetail', {
      url: "/trainDetail?id",
      views: {
        "": {
          controller: 'trainDetailCtrl',
          templateUrl: 'templates/trainDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/trainDetailCtrl.js');
        }]
      }
    })
    .state('jydtDetail', {
      url: "/jydtDetail?id",
      views: {
        "": {
          controller: 'jydtDetailCtrl',
          templateUrl: 'templates/jydtDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/jydtDetailCtrl.js');
        }]
      }
    })
    .state('ljycDetail', {
      url: "/ljycDetail?id",
      views: {
        "": {
          controller: 'ljycDetailCtrl',
          templateUrl: 'templates/ljycDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/ljycDetailCtrl.js');
        }]
      }
    })
    .state('hyqy', {
      url: "/hyqy?cardType&title",
      views: {
        "": {
          controller: 'hyqyCtrl',
          templateUrl: 'templates/hyqy.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/hyqyCtrl.js');
        }]
      }
    })
    .state('myPin', {
      url: "/myPin",
      views: {
        "": {
          controller: 'myPinCtrl',
          templateUrl: 'templates/myPin.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myPinCtrl.js');
        }]
      }
    })
    .state('myWallet', {
      url: "/myWallet",
      views: {
        "": {
          controller: 'myWalletCtrl',
          templateUrl: 'templates/myWallet.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myWalletCtrl.js');
        }]
      }
    })
    .state('yhj', {
      url: "/yhj?index",
      views: {
        "": {
          controller: 'yhjCtrl',
          templateUrl: 'templates/yhj.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/yhjCtrl.js');
        }]
      }
    })
    .state('myOrder', {
      url: "/myOrder",
      views: {
        "": {
          controller: 'myOrderCtrl',
          templateUrl: 'templates/myOrder.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myOrderCtrl.js');
        }]
      }
    })
    .state('mealList', {
      url: "/mealList/:cinemaOutId/:screenName/:seatDeatilMessage/:scanCodeFlag",
      views: {
        "": {
          controller: 'mealListCtrl',
          templateUrl: 'templates/mealList.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mealListCtrl.js');
        }]
      }
    })
    .state('giftCards', {
      url: "/giftCards",
      views: {
        "": {
          controller: 'giftCardsCtrl',
          templateUrl: 'templates/giftCards.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/giftCardsCtrl.js');
        }]
      }
    })
    .state('giftCardsList', {
      url: "/giftCardsList",
      views: {
        "": {
          controller: 'giftCardsListCtrl',
          templateUrl: 'templates/giftCardsList.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/giftCardsListCtrl.js');
        }]
      }
    })
    .state('sharePage', {
      url: "/sharePage/:ruleHeaderId/:sourceId",
      views: {
        "": {
          controller: 'sharePageCtrl',
          templateUrl: 'templates/sharePage.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/sharePageCtrl.js');
        }]
      }
    })
    .state('wxPay', {
      url: "/wxPay/:ordNum",
      views: {
        "": {
          controller: 'wxPayCtrl',
          templateUrl: 'templates/wxPay.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/wxPayCtrl.js');
        }]
      }
    })
    .state('question', {
      url: "/question",
      views: {
        "": {
          controller: 'questionCtrl',
          templateUrl: 'templates/question.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/questionCtrl.js');
        }]
      }
    })
    .state('questionDetail', {
      url: "/questionDetail/:surveyHeaderId/:surveyTitle",
      views: {
        "": {
          controller: 'questionDetailCtrl',
          templateUrl: 'templates/questionDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/questionDetailCtrl.js');
        }]
      }
    })
    .state('mall', {
      url: "/mall",
      views: {
        "": {
          controller: 'mallCtrl',
          templateUrl: 'templates/mall.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mallCtrl.js');
        }]
      }
    })
    .state('productDetail', {
        url: "/productDetail?skuId&cardId&ruleHeaderIdList&cardRenewalFlag&itemId&cinemaId&openChannel",
        views: {
        "": {
          controller: 'productDetailCtrl',
          templateUrl: 'templates/productDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/productDetailCtrl.js');
        }]
      }
    })
    .state('mallOrder', {
        url: "/mallOrder?addressId&status&allflag&id&confirmRegulationsFlag&ruleHeaderIdList&skuId&cardId&cardRenewalFlag&growthSign&skuItemType&cinemaId&openChannel",
        views: {
        "": {
          controller: 'mallOrderCtrl',
          templateUrl: 'templates/mallOrder.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mallOrderCtrl.js');
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
          templateUrl: 'templates/myCart.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myCartCtrl.js');
        }]
      }
    })
    .state('myGoods', {
      url: "/myGoods",
      views: {
        "": {
          controller: 'myGoodsCtrl',
          templateUrl: 'templates/myGoods.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myGoodsCtrl.js');
        }]
      }
    })
    .state('orderDetails', {
      url: "/orderDetails?tid",
      views: {
        "": {
          controller: 'orderDetailsCtrl',
          templateUrl: 'templates/orderDetails.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/orderDetailsCtrl.js');
        }]
      }
    })
    .state('category', {
      url: "/category?catId&title&index&cinemaNameAlt&cinemaOuterId&catName",
      views: {
        "": {
          controller: 'categoryCtrl',
          templateUrl: 'templates/category.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/categoryCtrl.js');
        }]
      }
    })
    .state('mallSearch', {
      url: "/mallSearch?catId&title",
      views: {
        "": {
          controller: 'mallSearchCtrl',
          templateUrl: 'templates/mallSearch.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/mallSearchCtrl.js');
        }]
      }
    })
    .state('myRightsCard', {
      url: "/myRightsCard",
      views: {
        "": {
          controller: 'myRightsCardCtrl',
          templateUrl: 'templates/myRightsCard.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myRightsCardCtrl.js');
        }]
      }
    })
    .state('myRightsCardDetail', {
      url: "/myRightsCardDetail?equitycardInfoId&memberId",
      views: {
        "": {
          controller: 'myRightsCardDetailCtrl',
          templateUrl: 'templates/myRightsCardDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myRightsCardDetailCtrl.js');
        }]
      }
    })
    .state('myRights', {
      url: "/myRights",
      views: {
        "": {
          controller: 'myRightsCtrl',
          templateUrl: 'templates/myRights.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myRightsCtrl.js');
        }]
      }
    })
    .state('setMyRightsCard', {
      url: "/setMyRightsCard",
      views: {
        "": {
          controller: 'setMyRightsCardCtrl',
          templateUrl: 'templates/setMyRightsCard.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/setMyRightsCardCtrl.js');
        }]
      }
    })
    .state('moreRightsCard', {
      url: "/moreRightsCard",
      views: {
        "": {
          controller: 'moreRightsCardCtrl',
          templateUrl: 'templates/moreRightsCard.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/moreRightsCardCtrl.js');
        }]
      }
    })
    .state('buyRightsDetail', {
      url: "/buyRightsDetail?skuId&status&equitycardInfoId",
      views: {
        "": {
          controller: 'buyRightsDetailCtrl',
          templateUrl: 'templates/buyRightsDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/buyRightsDetailCtrl.js');
        }]
      }
    })
    .state('myElectronicCode', {
      url: "/myElectronicCode",
      views: {
        "": {
          controller: 'myElectronicCodeCtrl',
          templateUrl: 'templates/myElectronicCode.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myElectronicCodeCtrl.js');
        }]
      }
    })
    .state('equityAgreement', {
      url: "/equityAgreement",
      views: {
        "": {
          controller: 'equityAgreementCtrl',
          templateUrl: 'templates/equityAgreement.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/equityAgreementCtrl.js');
        }]
      }
    })

    .state('delilocals.versionyMethod', {
      url: "/delilocals.versionyMethod",
      views: {
        "": {
          controller: 'delilocals.versionyMethodCtrl',
          templateUrl: 'templates/delilocals.versionyMethod.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/delilocals.versionyMethodCtrl.js');
        }]
      }
    })
    .state('sinceTheater', {
      url: "/sinceTheater?status&id&product&itemId&skuId&addressId",
      views: {
        "": {
          controller: 'sinceTheaterCtrl',
          templateUrl: 'templates/sinceTheater.html?t=20170809'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/sinceTheaterCtrl.js?t=20170809');
        }]
      }
    })
    .state('requestRefund', {
      url: "/requestRefund/:tid/:oid",
      views: {
        "": {
          controller: 'requestRefundCtrl',
          templateUrl: 'templates/requestRefund.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/requestRefundCtrl.js');
        }]
      }
    })
    .state('pickUpProgress', {
      url: "/pickUpProgress?tid&oid",
      views: {
        "": {
          controller: 'pickUpProgressCtrl',
          templateUrl: 'templates/pickUpProgress.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/pickUpProgressCtrl.js');
        }]
      }
    })
    .state('pointsMall', {
      url: "/pointsMall",
      views: {
        "": {
          controller: 'pointsMallCtrl',
          templateUrl: 'templates/pointsMall.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/pointsMallCtrl.js');
        }]
      }
    })
    .state('allPointsGood', {
      url: "/allPointsGood",
      views: {
        "": {
          controller: 'allPointsGoodCtrl',
          templateUrl: 'templates/allPointsGood.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/allPointsGoodCtrl.js');
        }]
      }
    })
    .state('pointProductDetail', {
        url: "/pointProductDetail/:skuId",
        views: {
        "": {
          controller: 'pointProductDetailCtrl',
          templateUrl: 'templates/pointProductDetail.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/pointProductDetailCtrl.js');
        }]
      }
    })
    .state('pointMallOrder', {
      url: "/pointMallOrder?addressId&status&allflag",
      views: {
        "": {
          controller: 'pointMallOrderCtrl',
          templateUrl: 'templates/pointMallOrder.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/pointMallOrderCtrl.js');
        }]
      }
    })
    .state('memberCenter', {
      url: "/memberCenter",
      views: {
        "": {
          controller: 'memberCenterCtrl',
          templateUrl: 'templates/memberCenter.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/memberCenterCtrl.js');
        }]
      }
    })
    .state('memberBenefits', {
      url: "/memberBenefits",
      views: {
        "": {
          controller: 'memberBenefitsCtrl',
          templateUrl: 'templates/memberBenefits.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/memberBenefitsCtrl.js');
        }]
      }
    })
    .state('roadCourse', {
      url: "/roadCourse",
      views: {
        "": {
          controller: 'roadCourseCtrl',
          templateUrl: 'templates/roadCourse.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/roadCourseCtrl.js');
        }]
      }
    })
    .state('memberCheats', {
      url: "/memberCheats",
      views: {
        "": {
          controller: 'memberCheatsCtrl',
          templateUrl: 'templates/memberCheats.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/memberCheatsCtrl.js');
        }]
      }
    })
    .state('querySalesOrder', {
      url: "/querySalesOrder",
      views: {
        "": {
          controller: 'querySalesOrderCtrl',
          templateUrl: 'templates/querySalesOrder.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/querySalesOrderCtrl.js');
        }]
      }
    })
    .state('personalLetter', {
      url: "/personalLetter?id&messageContent&platform",
      views: {
        "": {
          controller: 'personalLetterCtrl',
          templateUrl: 'templates/personalLetter.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/personalLetterCtrl.js');
        }]
      }
    })
    .state('awardBigWheel', {
      url: "/awardBigWheel/:lotteryDrawHeaderId",
      views: {
        "": {
          controller: 'awardBigWheelCtrl',
          templateUrl: 'templates/awardBigWheel.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/awardBigWheelCtrl.js');
        }]
      }
    })
    .state('awardGuagua', {
      url: "/awardGuagua/:lotteryDrawHeaderId",
      views: {
        "": {
          controller: 'awardGuaguaCtrl',
          templateUrl: 'templates/awardGuagua.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/awardGuaguaCtrl.js');
        }]
      }
    })
    .state('awardGoldenEggs', {
      url: "/awardGoldenEggs/:lotteryDrawHeaderId",
      views: {
        "": {
          controller: 'awardGoldenEggsCtrl',
          templateUrl: 'templates/awardGoldenEggs.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/awardGoldenEggsCtrl.js');
        }]
      }
    })

    .state('myFans', {
      url: "/myFans",
      views: {
        "": {
          controller: 'myFansCtrl',
          templateUrl: 'templates/myFans.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myFansCtrl.js');
        }]
      }
    })
    .state('myAttention', {
      url: "/myAttention",
      views: {
        "": {
          controller: 'myAttentionCtrl',
          templateUrl: 'templates/myAttention.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myAttentionCtrl.js');
        }]
      }
    })
    .state('myComment', {
      url: "/myComment?movieId",
      views: {
        "": {
          controller: 'myCommentCtrl',
          templateUrl: 'templates/myComment.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/myCommentCtrl.js');
        }]
      }
    })
    .state('filmCritic', {
      url: "/filmCritic?commentFilmDetailId",
      views: {
        "": {
          controller: 'filmCriticCtrl',
          templateUrl: 'templates/filmCritic.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/filmCriticCtrl.js');
        }]
      }
    })
    .state('homePage', {
      url: "/homePage?memberId",
      views: {
        "": {
          controller: 'homePageCtrl',
          templateUrl: 'templates/homePage.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/homePageCtrl.js');
        }]
      }
    })
    .state('deliveryMethod', {
      url: "/deliveryMethod?status&allflag",
      views: {
        "": {
          controller: 'deliveryMethodCtrl',
          templateUrl: 'templates/deliveryMethod.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/deliveryMethodCtrl.js');
        }]
      }
    })
    .state('checkLogistics', {
      url: "/checkLogistics?expressCode&deliveryOrderCode&accessPath",
      views: {
        "": {
          controller: 'checkLogisticsCtrl',
          templateUrl: 'templates/checkLogistics.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/checkLogisticsCtrl.js');
        }]
      }
    })
    .state('refunds', {
      url: "/refunds/:tid/:oid",
      views: {
        "": {
          controller: 'refundsCtrl',
          templateUrl: 'templates/refunds.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/refundsCtrl.js');
        }]
      }
    })
    .state('receivingCenter', {
      url: "/receivingCenter",
      views: {
        "": {
          controller: 'receivingCenterCtrl',
          templateUrl: 'templates/receivingCenter.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/receivingCenterCtrl.js');
        }]
      }
    })
    .state('playVideo', {
      url: "/playVideo?movieId",
      views: {
        "": {
          controller: 'playVideoCtrl',
          templateUrl: 'templates/playVideo.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/playVideoCtrl.js');
        }]
      }
    })
    .state('invitedScan', {
      url: "/invitedScan/:employeeNumber",
      views: {
        "": {
          controller: 'invitedScanCtrl',
          templateUrl: 'templates/invitedScan.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/invitedScanCtrl.js');
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
    .state('start', {
      url: "/start",
      views: {
        "": {
          controller: 'startCtrl',
          templateUrl: 'templates/start.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/controllers/startCtrl.js');
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
  $urlRouterProvider.otherwise('/start');
});
