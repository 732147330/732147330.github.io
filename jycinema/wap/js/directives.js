angular.module('jyApp.directives', [])
    .directive('backButton', function ($ionicHistory) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    "use strict";
                    $ionicHistory.goBack();
                });
            }
        }
    })
    .directive('tabsClick', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.find('a').bind('click', function () {
                    "use strict";
                    var curIndex = $(this).index();
                    console.log(curIndex)
                    $(this).addClass('active').siblings().removeClass('active');
                    scope.getCurrentData(curIndex);
                    scope.$apply();
                });
            }
        }
    })
    .directive('citybarScroll', function ($ionicScrollDelegate) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.find('a').bind('click', function () {
                    "use strict";
                    var index = $(this).index();
                    $(this).addClass('active').siblings().removeClass('active');
                    if (!scope.hArr) {
                        scope.hArr = [];
                        for (var i = 0; i < $('.cityPosTop').length; i++) {
                            scope.hArr.push($('.cityPosTop').eq(i).position().top);
                        }
                    }
                    $ionicScrollDelegate.scrollTo(0, scope.hArr[index], true);
                });
            }
        }
    })
    .directive('stateTo', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function () {

                });
            }
        }
    })
    .directive('setFocus', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                "use strict";
                element[0].focus();
                scope.$apply();
            }
        }
    })
    .directive('animationend', function () {
        return {
            restrict: 'A',
            scope: {
                animationend: '&'
            },
            link: function (scope, element) {
                var callback = scope.animationend(),
                    events = 'animationend webkitAnimationEnd MSAnimationEnd' +
                        'transitionend webkitTransitionEnd';

                element.on(events, function (event) {
                    callback.call(element[0], event);
                });
            }
        };
    })
    .directive('selectSeat', function ($ionicPopup, $timeout, $ionicScrollDelegate) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', 'i', function (e) {
                    var x = e.clientX;
                    var curData = JSON.parse($(this).attr('data'));
                    if (curData.status == '1') {
                        return;
                    } else {
                        //控制小视窗
                        scope.changeViewStatus();
                    }
                    if (scope.selSeatData.length == 6 && curData.flag != 'Y') {
                        var myPopup = $ionicPopup.show({
                            title: '提示',
                            cssClass: 'jyAlert jyAlert1',
                            template: '最多可选6个座位!'
                        });
                        $timeout(function () {
                            "use strict";
                            myPopup.close();
                        }, 1000);
                        return;
                    }
                    angular.forEach(scope.ableSeatData[scope.rows - (curData.rowIndex)].data, function (value, key) {
                        "use strict";
                        if (value.columnIndex === curData.columnIndex) {
                            if (value.flag == 'N') {
                                value.flag = 'Y';
                                if (curData.partnerSeat) {
                                    if (curData.columnIndex > curData.partnerSeat.columnIndex) {
                                        scope.selSeatData.push(curData);
                                        scope.selSeatData.push(curData.partnerSeat);
                                        scope.ableSeatData[scope.rows - (curData.rowIndex)].data[key + 1].flag = 'Y';
                                    } else {
                                        scope.selSeatData.push(curData.partnerSeat);
                                        scope.selSeatData.push(curData);
                                        scope.ableSeatData[scope.rows - (curData.rowIndex)].data[key - 1].flag = 'Y';
                                    }
                                } else {
                                    scope.selSeatData.push(curData);
                                }
                                $ionicScrollDelegate.$getByHandle('small').zoomTo(1.5, true, e.clientX, e.clientY - 160);
                            } else {
                                value.flag = 'N';
                                if (curData.partnerSeat) {
                                    if (curData.columnIndex > curData.partnerSeat.columnIndex) {
                                        scope.ableSeatData[scope.rows - (curData.rowIndex)].data[key + 1].flag = 'N';
                                        angular.forEach(scope.selSeatData, function (v, k) {
                                            if (v.columnIndex == value.columnIndex && v.rowIndex == value.rowIndex) {
                                                scope.selSeatData.splice(k, 2);
                                            }
                                        });
                                    } else {
                                        scope.ableSeatData[scope.rows - (curData.rowIndex)].data[key - 1].flag = 'N';
                                        angular.forEach(scope.selSeatData, function (v, k) {
                                            if (v.columnIndex == value.columnIndex && v.rowIndex == value.rowIndex) {
                                                scope.selSeatData.splice(k - 1, 2);
                                            }
                                        });
                                    }
                                } else {
                                    angular.forEach(scope.selSeatData, function (v, k) {
                                        if (v.columnIndex == value.columnIndex && v.rowIndex == value.rowIndex) {
                                            scope.selSeatData.splice(k, 1);
                                        }
                                    });
                                }

                                $ionicScrollDelegate.$getByHandle('small').zoomTo(.8, true, 0, 0);

                            }
                        }
                    });
                    scope.getSeat(scope.selSeatData);
                    scope.$apply();
                });
            }
        }
    })
    .directive('removeSeat', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (e) {
                    var data = JSON.parse(element.attr('data'));
                    angular.forEach(scope.seatData, function (value, key) {
                        "use strict";
                        angular.forEach(value.data, function (v, k) {
                            if (v.columnIndex == data.columnIndex && v.rowIndex == data.rowIndex) {
                                $('.seatScrollRange div').eq(key).find('span').eq(k).find('i').trigger('click');
                            }
                        });
                    });
                });
            }
        }
    })
    .directive('stopPropagation', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function (e) {
                    e.stopPropagation();
                });
            }
        }
    })
    .directive('getCurrent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', function () {
                    "use strict";
                    element.toggleClass('active');
                    var currentClass = element.attr('class').indexOf('active') >= 0;
                    if (currentClass) {
                        element.parent().siblings().find('div').removeClass('active');
                    }
                    scope.currentData = [];
                    scope.activeNum = $('.filterArea li .active').length;
                    switch (scope.activeNum) {
                        case 0:
                            scope.currentData['area'] = {cAreaId: ''};
                            scope.currentData['theatre'] = {name: ''};
                            break;
                        case 1:
                            if ($('.filterArea li .active').eq(0).attr('data-area')) {
                                scope.currentData['area'] = JSON.parse($('.filterArea li .active').eq(0).attr('data-area'));
                                scope.currentData['theatre'] = {name: ''};
                            } else {
                                scope.currentData['area'] = {cAreaId: ''};
                                scope.currentData['theatre'] = JSON.parse($('.filterArea li .active').eq(0).attr('data-theatre'));
                            }
                            break;
                        case 2:
                            scope.currentData['area'] = JSON.parse($('.filterArea li .active').eq(0).attr('data-area'));
                            scope.currentData['theatre'] = JSON.parse($('.filterArea li .active').eq(1).attr('data-theatre'));
                            break;
                    }
                    scope.getCondition(scope.currentData);
                    scope.$apply();
                });

            }
        }
    })
    .directive('checkLogin', function (myhrefService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.find('td').bind('click', function () {
                    "use strict";
                    var isLogin = localStorage.userInfo ? true : false;
                    if ($(this).attr('ref')) {
                        var goLink = isLogin ? $(this).attr('ref') : 'login';
                        myhrefService.goPage(goLink);
                    } else {
                        if (isLogin == false && $(this).attr('ref')) {
                            myhrefService.goPage('login');
                        } else if (isLogin == false && !$(this).attr('ref')) {

                        }
                    }
                });

            }
        }
    })
    .directive('wapMenu', function ($state) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.flag = true;
                element.bind('click', function (e) {
                    "use strict";
                    e.stopPropagation();
                    if (scope.flag) {
                        $('body').append(
                            '<div class="menuAlert">' +
                            '<a><i class="ion-android-home"></i> 推荐</a>' +
                            '<a><i class="ion-android-person"></i> 个人中心</a></div>');
                        scope.flag = false;
                        $('.menuAlert a').on('click', function (e) {
                            e.stopPropagation();
                            var index = $(this).index();
                            $('.menuAlert').remove();
                            scope.flag = true;
                            if (index == 0) {
                                $state.go('home');

                            } else if (index == 1) {
                                $state.go('account');
                            }
                        });
                        $(document).bind('click', function () {
                            $('.menuAlert').remove();
                            scope.flag = true;
                        });
                    } else {
                        $('.menuAlert').remove();
                        scope.flag = true;
                    }
                });
            }
        }
    })
    .directive('focusInput', ['$ionicScrollDelegate', '$window', '$timeout', '$ionicPosition', function ($ionicScrollDelegate, $window, $timeout, $ionicPosition) {
        return {
            restrict: 'A',
            scope: false,
            link: function ($scope, iElm, iAttrs, controller) {
                if (ionic.Platform.isIOS()) {
                    iElm.on('focus', function () {
                        var top = $ionicScrollDelegate.getScrollPosition().top;
                        var eleTop = ($ionicPosition.offset(iElm).top) / 2
                        var realTop = eleTop + top;
                        $timeout(function () {
                            if (!$scope.$last) {
                                $ionicScrollDelegate.scrollTo(0, realTop);
                            } else {
                                try {
                                    var aim = angular.element(document).find('.scroll')
                                    aim.css('transform', 'translate3d(0px,' + '-' + realTop + 'px, 0px) scale(1)');
                                    $timeout(function () {
                                        iElm[0].focus();
                                        console.log(2);
                                    }, 100)
                                } catch (e) {
                                }

                            }
                        }, 500)
                    })
                }

            }
        }
    }])
    .directive('loading', function() {
        return {
            restrict: 'EA',
            templateUrl: '../wap/templates/onLoading.html',
            controller:function($scope){
            },
            link: function (scope, el, attrs, ctrl) {
            }
        }
    })
;
