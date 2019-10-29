/*
 * 2017.2.9 获取验证码请求参数加密处理,防止接口被恶意调用
 *
 */
angular.module('jyApp.services', [])
//ajax请求
    .factory('httpService',function ($http,$rootScope,$ionicLoading,$ionicPopup,$state,$ionicPlatform,$timeout) {
        var service = {};
        service.getData = function (path, method, params, callback,flag,text,isDorefresh) {
            var text=text?text:'';
            var className=flag==1?'loadStyle':'';
            try{
                var token = localStorage.userInfo ? JSON.parse(localStorage.userInfo).token : '';
                var memberId = localStorage.userInfo ? JSON.parse(localStorage.userInfo).memberId : '';
            }catch(err){
                var token='';
                var memberId='';
                localStorage.removeItem('userInfo');
            }
            if(!isDorefresh){
                if(flag==1 || flag==2){
                    $ionicLoading.show({
                        template:'<div class="'+className+'"><ion-spinner icon="ios-small"></ion-spinner><p class="fs12">'+text+'</p></div>',
                        animation: 'fade-in',
                        showBackdrop: false,
                        showDelay: 0
                    });
                }
            }
            if(params.params){
                //if(JSON.parse(params.params).channelId==8){
                //
                //}else{
                    params.params=JSON.stringify(_.extend(JSON.parse(params.params),{channelId:7},{channelCode:"J0005"},{memberId:memberId}));
                //}

            }

            //密码加密
            $rootScope.getEncryption=function (value) {
                var val = Base64.encode(value);
                var arr = [];
                for(var i=0;i<val.length;i++){
                    arr.push(val.charAt(i));
                    if(i%2){
                        var num1 =  Math.floor(10*Math.random());
                        arr.push(num1);
                        var num2 =  Math.floor(10*Math.random());
                        arr.push(num2);
                        var num3 =  Math.floor(10*Math.random());
                        arr.push(num3)
                    }
                }
                return arr.join("");
            };
            if(path.indexOf('newsSendMessage')>0 || path.indexOf('updateItemGiftCard')>0 ){
                params.params=$rootScope.getEncryption(params.params);
            }
            $ionicPlatform.ready(function(){
                "use strict";
                if($rootScope.isMobile){
                    // $cordovaToast
                    //     .show(languageSetting.noNetwork+'!', 'long', 'top')
                    //     .then(function(success) {
                    //         //$ionicLoading.hide();
                    //     }, function (error) {
                    //         $ionicLoading.hide();
                    //     });
                }else{
                    $http({
                        url: path,
                        method: method,
                        data: $.param(params),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                            "token":token
                        },
                        timeout:20000
                    }).success(function (res,status,headers,config) {
                        $ionicLoading.hide();
                        if(res.status && res.status=="loginTimeOut"){
                            $rootScope.userInfo=null;
                            localStorage.removeItem('userInfo');
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: '登录失效,请重新登录'
                            });
                            $timeout(function(){
                                myPopup.close();
                                $state.go('login');
                            },2000);
                        }else{
                            callback(res);
                        }
                    }).error(function(err){
                        if(path.indexOf('refund')>0){
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: '系统正在处理中，请耐心等待。若长时间未退款请联系客服。'
                            });
                            $timeout(function(){
                                myPopup.close();
                            },3000);
                        }
                        $ionicLoading.hide();
                    });
                }
            });
        };
        return service;
    })
    //定位城市
    .factory('cityService', function ($http,$rootScope,$ionicPlatform,$timeout,$ionicPopup,httpService,JYApi) {
        // var service = {};
        // service.getGpsInfo = function (suc) {
        //     $ionicPlatform.ready(function() {
        //         var posOptions = {timeout: 10000, enableHighAccuracy: false};
        //         $cordovaGeolocation
        //             .getCurrentPosition(posOptions)
        //             .then(function (position) {
        //                 var lat = position.coords.latitude;
        //                 var long = position.coords.longitude;
        //                 var point = new BMap.Point(long, lat);
        //                 var geoc = new BMap.Geocoder();
        //                 geoc.getLocation(point, function (res) {
        //                     var gpsInfo = res.addressComponents;
        //                     gpsInfo.lat = lat;
        //                     gpsInfo.long = long;
        //                     suc(gpsInfo);
        //                     sessionStorage.gpsInfo = JSON.stringify(gpsInfo);
        //                 });
        //             }, function (err) {
        //                 var myPopup = $ionicPopup.show({
        //                     title: languageSetting.tip,
        //                     cssClass: 'jyAlert jyAlert1',
        //                     template: languageSetting.iosGpsFail,
        //                     buttons: [
        //                         {
        //                             text: languageSetting.tip,
        //                             type: 'button-calm',
        //                             onTap: function (e) {
        //                                 myPopup.close();
        //                             }
        //                         }
        //                     ]
        //                 });
        //             });
        //     });
        // };
        // return service;
    })
    //链接跳转
    .factory('myhrefService', function ($http,$rootScope,$ionicViewSwitcher,$state) {
        var service = {};
        var paramsObj={};
        service.goPage = function (target,paramsArr,effect) {
            if(paramsArr){
                for(var i=0;i<paramsArr.length;i++){
                    paramsObj[paramsArr[i].name]= paramsArr[i].value;
                }
            }
            effect=effect || 'forward';
            $ionicViewSwitcher.nextDirection(effect);
            $state.go(target, paramsObj);
        };
        return service;
    })
    //二维码扫描
    .factory('scanService', function ($ionicPlatform) {
        var service = {};
        service.doScan = function () {
            $ionicPlatform.ready(function () {
                "use strict";
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        // alert("We got a barcode\n" +
                        //     "Result: " + result.text + "\n" +
                        //     "Format: " + result.format + "\n" +
                        //     "Cancelled: " + result.cancelled);
                    },
                    function (error) {
                        //alert("Scanning failed: " + error);
                    }
                );
            });
        };
        return service;
    })
;
