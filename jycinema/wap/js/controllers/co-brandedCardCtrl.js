/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('co-brandedCardCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$stateParams,$state) {

    $scope.go=function(){
        window.location.href="https://txwk.10010.com/KCard/wxCommon/goto?state=WX_KCARD_JY_MOVIE_CARD_BIND";
    };
    //生成登录交易信息--忠诚度计划
    $scope.getLoginCount=function () {
        $.ajax({
            type:'POST',
            url:JYApi.saveLytTxn,
            data:{
                params:JSON.stringify({
                    planId:3,
                    txnType:'LOGIN',
                    subType:'WAP',
                    status:'PENDING',
                    MemberCardNumber:JSON.parse(localStorage.userInfo).chipNumber?JSON.parse(localStorage.userInfo).chipNumber:'',
                    memberId:JSON.parse(localStorage.userInfo).memberId
                })
            },
            success:function () {
            }
        });
    };
    //获取会员基础信息
    $scope.findMember=function(memberId){
        httpService.getData(JYApi.findMember, 'post', {
            params:JSON.stringify({
                "memberId":memberId
            })
        }, function (res) {
            if(res.status=="S"){
                var userInfo=res.data;
                userInfo.token= JSON.parse(localStorage.userInfo).token;
                localStorage.userInfo=JSON.stringify(userInfo);
                localStorage.cacheTime=new Date().getTime();
                $scope.getLoginCount();
                $rootScope.userInfo=userInfo;
            }else{
                $rootScope.showTip('获取会员信息失败');
            }
        });
    };
    $scope.tel=$stateParams.tel;
    $scope.paySubmit=function(){
            //if (!(/^1[345678]\d{9}$/.test($scope.tel))) {
            //    $rootScope.showTip('手机号码格式不正确');
            //    return
            //}
            httpService.getData(JYApi.createBrandedCardOrders, 'post', {
                    mobileNumber:$stateParams.tel,
                    data:$stateParams.data,
                    signCode:$stateParams.sign,
                    channelId:'8',
                    channelCode:'J0006'
            }, function (res) {
                if(res.status=='S'){
                    if(res.data.memberId){
                        res.data.token=res.token;
                        localStorage.userInfo=JSON.stringify(res.data);
                        $scope.findMember(res.data.memberId);
                    }
                    //支付宝支付
                    //httpService.getData(JYApi.payurl, 'post',{
                    //    payType:'ALI_PAY',
                    //    subject:'-WAP-联名卡',
                    //    body:'支付宝WAP联名卡支付订单',
                    //    totalFee:res.totalAmount,
                    //    tradeNo: res.paymentBankNumber,
                    //    orderTime:$scope.OrderTime,
                    //    timeout:240000
                    //}, function (res) {
                    //    if(res.status=="S"){
                    //        location.href=res.data;
                    //    }
                    //});
                    $state.go('waiting',{paymentBankNumber: res.paymentBankNumber});
                    ////微信公众号支付
                    //location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5d69bdaaa9765cda&redirect_uri='+encodeURIComponent(locals.returnUrl()+'/#/wxPay/'+res.orderCode)+'&response_type=code&scope=snsapi_base&state='+res.orderCode+'&connect_redirect=1#wechat_redirect'
                }else{
                    $rootScope.showTip(res.msg);
                }
            });

    };


});