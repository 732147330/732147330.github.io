    /**
 * Created by OuYongQiang
 * 2016.12.16 分享按钮点击后关闭content内容需二次点击触发滑动问题 v1.2需更新内容*
 * 2017.1.11 修改选座购票按钮跳转逻辑
 */
'use strict';
app.controller('articleDetailCtrl', function ($scope,$rootScope,$filter,$timeout,$ionicViewSwitcher,$window,$location,$sce,$interval,$ionicBackdrop,$state,$ionicScrollDelegate,$ionicModal,httpService,JYApi,$stateParams,$ionicPopup) {
    $scope.articleId=$stateParams.id;
    $scope.shareCode=$stateParams.shareCode?true:false;
    //验证是否登录和是否被禁言
    $scope.yzLogin=function(edit){
        if (!localStorage.userInfo) {
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.unlogin,
                buttons: [
                    {
                        text: languageSetting.cancel,
                        type: 'button-default',
                        onTap: function () {
                            myPopup.close();
                        }
                    },
                    {
                        text: languageSetting.login,
                        type: 'button-calm',
                        onTap: function (e) {
                            myPopup.close();
                            $state.go('login', {viewName: 'articleDetail', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
            document.getElementById("abc").blur();
            $scope.tiFlag=true;
        }else{
            if(edit=='abc'){
                httpService.getData(JYApi.findBlackWhiteListL, 'post', {
                    params:JSON.stringify({
                        type:'QUERY_MEMBER_COMMENT'
                    })
                }, function (res) {
                    if(res.status=="S"&&res.count!=0){
                        var myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert1',
                            template: '您已被管理员禁言，'+$scope.diffTime(res.data[0].now*1000,res.data[0].endDateActive)+'后解除禁言'
                        });
                        $timeout(function () {
                            myPopup.close();
                        },2000);
                    }else if(res.status=="S"&&res.count==0){
                        document.getElementById("abc").focus();
                        $scope.tiFlag=false;
                    }
                });
            }else if(edit=='cba'){
                document.getElementById("abc").focus();
                $scope.tiFlag=false;
            }
        }
    };
   $scope.diffTime=function(startDate,endDate) {
        var diff=new Date(endDate).getTime() - new Date(startDate).getTime();//时间差的毫秒数

        //计算出相差天数
        var days=Math.floor(diff/(24*3600*1000));

        //计算出小时数
        var leave1=diff%(24*3600*1000);    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000));

        //计算相差秒数
        var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000);

        var returnStr = seconds + "秒";
        if(minutes>0) {
            returnStr = minutes + "分" + returnStr;
        }
        if(hours>0) {
            returnStr = hours + "小时" + returnStr;
        }
        if(days>0) {
            returnStr = days + "天" + returnStr;
        }
        return returnStr;
    };
    //文章详情
    $scope.getAticleDetail=function(){
        httpService.getData(JYApi.findArticle, 'post', {
            params:JSON.stringify({
                type:'filmTypeHot',
                articleId:$scope.articleId,
            })
        }, function (res) {
            if(res.status=="S"){
                $scope.articleDetailData=res.data[0];
                $scope.strs= [];
                if($scope.articleDetailData.laber){
                    $scope.strs=$scope.articleDetailData.laber.split(","); //字符分割
                }
                $scope.movieId=res.data[0].articleFilmId?res.data[0].articleFilmId:'';
                $scope.status=res.data[0].status?res.data[0].status:'';
                $scope.targetUrl=$sce.trustAsResourceUrl(res.data[0].articleContentUrl);
                $scope.findActivityGuidanceInfo();
                $scope.findArt();
                $scope.findFilmMessage();
                $scope.isWeixin();
            }
        });
    };
    $scope.getAticleDetail();

    $scope.showShare = function (e) {
        $scope.modal.show();
        $ionicBackdrop.retain();
        e.stopPropagation();
        $(document).bind("click", function (e) {
            $scope.hideShare(e);

        });
    };

    $scope.hideShare = function (e) {
        $scope.modal.hide();
        $timeout(function(){
            $ionicBackdrop.release();
        },500);
        e.stopPropagation();
    };

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        $ionicModal.fromTemplateUrl('templates/modal4.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
    });

    $scope.$on('$ionicView.leave',function(event,data){
        $(document).unbind("click");
    });


    //文章点赞
    $scope.updateFabulous =function(item){
        if(!localStorage.userInfo){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.unlogin,
                buttons: [
                    {
                        text: languageSetting.cancel,
                        type: 'button-default',
                        onTap: function () {
                            myPopup.close();
                        }
                    },
                    {
                        text: languageSetting.login,
                        type: 'button-calm',
                        onTap: function (e) {
                            myPopup.close();
                            $state.go('login', {viewName: 'articleDetail', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else{
            if(item.isFabulous=='N'){
                $scope.fabulousType="FABULOUS"
            }else{
                $scope.fabulousType="CANCEL"
            }
            httpService.getData(JYApi.updateFabulous, 'post', {
                params:JSON.stringify({
                    articleId:item.articleId,
                    fabulousType:$scope.fabulousType
                })
            }, function (res) {
                if(res.status=="S"){
                    if($scope.fabulousType=='FABULOUS'){
                        $scope.articleDetailData.fabulous+=1;
                        $scope.articleDetailData.isFabulous='Y'
                    }else{
                        $scope.articleDetailData.fabulous-=1;
                        $scope.articleDetailData.isFabulous='N'
                    }

                }else{
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: '请求失败,请重新登陆!'
                    });
                    $timeout(function(){
                        myPopup.close();
                        localStorage.removeItem('userInfo');
                        $scope.userInfo = null;
                        $state.go('login');
                    },2000);
                }
            });
        }
    };
    //$scope.activeF=true;
    //$scope.updateFabulous=function(){
    //    httpService.getData(JYApi.updateFabulous, 'post', {
    //        params:JSON.stringify({
    //            articleId:$scope.articleId
    //        })
    //    }, function (res) {
    //        if(res.status=="S"){
    //            if($scope.articleDetailData.fabulous==undefined){
    //                $scope.articleDetailData.fabulous=0;
    //            }
    //            var myPopup = $ionicPopup.show({
    //                title: languageSetting.tip,
    //                cssClass: 'jyAlert jyAlert1',
    //                template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i>已点赞'
    //            });
    //            $timeout(function () {
    //                $scope.articleDetailData.fabulous+=1;
    //                $scope.activeF=false;
    //                myPopup.close();
    //            },500);
    //        }else{
    //            var myPopup = $ionicPopup.show({
    //                title: languageSetting.tip,
    //                cssClass: 'jyAlert jyAlert1',
    //                template: '请求失败,请重新登陆!'
    //            });
    //            $timeout(function(){
    //                myPopup.close();
    //                localStorage.removeItem('userInfo');
    //                $scope.userInfo = null;
    //                $state.go('login');
    //            },2000);
    //        }
    //    });
    //};

    //查询活动
    $scope.findActivityGuidanceInfo=function(){
        httpService.getData(JYApi.findActivityGuidanceInfo,'post',{
                params:JSON.stringify({
                    cityName:localStorage.currentCity?localStorage.currentCity:'广州',
                    sourceNameId:$scope.movieId,
                    imgChannel:"APP",
                    sourceType:"FILM",
                    pageIndex:1,
                    pageRows:10
                })
            },function(res){
                if(res.status=="S"){
                    $scope.ActivityGuidanceInfoData=[];
                    $scope.ActivityGuidanceInfoData = _.filter(res.data, function(item){ return item.flag=="START"||item.flag=="NOT_START"; });
                    angular.forEach($scope.ActivityGuidanceInfoData,function (value,key) {
                        if (value.flag == 'NOT_START') {
                            var leftDay = Math.floor((value.startDateActive - new Date().getTime()) / (1000 * 60 * 60 * 24));
                            var leftHour = Math.ceil((value.startDateActive - new Date().getTime()) / (1000 * 60 * 60) - leftDay * 24);
                            value.leftTime = leftDay + '天' + leftHour + '小时后开始';
                        } else if (value.flag == 'START') {
                            var leftDay = Math.floor((value.endDateActive - new Date().getTime()) / (1000 * 60 * 60 * 24));
                            var leftHour = Math.ceil((value.endDateActive - new Date().getTime()) / (1000 * 60 * 60) - leftDay * 24);
                            value.leftTime = leftDay + '天' + leftHour + '小时后结束';
                        }
                    });
                }

            }
        )
    };

    $scope.theatreData=[
        {id:'BEDHALL',name:languageSetting.bed,code:'&#xe67d;'},
        {id:'LOVERSHALL',name:languageSetting.couple,code:'&#xe686;'},
        {id:'SOUNDHALL',name:languageSetting.soundHall,code:'&#xe672;'},
        {id:'4DHALL',name:languageSetting.hall4D,code:'&#xe686;'},
        {id:'DOUBLE',name:languageSetting.doubleHall,code:'&#xe69a;'},
        {id:'SCREEN_TYPE',name:languageSetting.hugeScreen,code:'&#xe687;'},
        {id:'IMAX',name:languageSetting.imax,code:'&#xe63a;'},
        {id:'VIP',name:languageSetting.vip,code:'&#xe69e;'},
        {id:'COMMON',name:languageSetting.common,code:''},
        {id:'MX4D',name:languageSetting.mx4D,code:'&#xe686'}
    ];

    //查询相关电影
    $scope.findFilmMessage=function(){
        httpService.getData(JYApi.findFilmMessage,'post',{
                params:JSON.stringify({
                    type: "QUERY_FILM_MESSAGE",
                    filmId:$scope.movieId,
                    pageIndex: 1,
                    pageRows: 10
                })
            },function(res){
                if(res.status=="S"){
                    $scope.filmMessageData=res.data;
                    angular.forEach($scope.filmMessageData, function (value, key) {
                        value.screenTypeCode = [];
                        if (value.screenTypeInfo) {
                            $scope.screenTypes = value.screenTypeInfo.split(',');
                            angular.forEach($scope.screenTypes, function (v1, k1) {
                                angular.forEach($scope.theatreData, function (v2, k2) {
                                    if (v1 == v2.name) {
                                        value.screenTypeCode.push({
                                            code: v2.code
                                        });
                                    }
                                });
                            });
                        }
                    });
                }

            }
        )
    };
    //查询相关文章
    $scope.findArt =function() {
        httpService.getData(JYApi.findArt, 'post', {
            params: JSON.stringify({
                type: "GET_FILM_ARTICLE",
                filmId:$scope.movieId,
                articleId:$scope.articleId,
                pageIndex: 1,
                pageRows: 20
            })
        }, function (res) {
            if(res.status=='S'){
                $scope.artData=res.data;
                angular.forEach($scope.artData,function(v,k){
                    v.strs= [];
                    if(v.laber){
                        v.strs=v.laber.split(","); //字符分割
                    }
                    v.date=v.creationDate.substring(0,10);
                })
            }
        })
    };

    //计算系统时间与回复影评时间相差天数
    //var myDate = new Date();
    //var mytime=myDate.toLocaleDateString();//系统时间
    $scope.formatDate=function (obj) {
        if(obj<10){
            obj='0'+obj;
        }
        return obj
    };
    $scope.mytime= new Date().getFullYear()+'-'+$scope.formatDate(new Date().getMonth()+1)+'-'+$scope.formatDate(new Date().getDate());
    function getDays(strDateStart,strDateEnd){
        var strSeparator = "-"; //日期分隔符
        var oDate1;
        var oDate2;
        var iDays;
        oDate1= strDateStart.split(strSeparator);
        oDate2= strDateEnd.split(strSeparator);
        var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
        var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
        iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24);//把相差的毫秒数转换为天数
        return iDays ;
    }
//查询文章评论
    $scope.noMorePage=false;
    $scope.pageSize=10;
    $scope.page=1;
    $scope.findCommentFilmDetail =function(page,pageSize){
        httpService.getData(JYApi.findCommentFilmDetail, 'post', {
            params:JSON.stringify({
                type:"ARTICLE_REVIEW",
                sourceId:$scope.articleId,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            if(res.status=="S"&& res.data.length>0){
                if($scope.page==1){
                    $scope.commentFilmDetailData=[];
                }
                angular.forEach(res.data,function(value,key){
                    value.date=value.creationDate.substring(0,10);
                    value.searchList=$scope.searchList;
                    value.date=getDays(value.date,$scope.mytime);//评论时间与当前相差多少
                    if(value.date==0){
                        value.date="今天"
                    }
                    //if(value.parentIdTwo==0||value.parentIdTwo==null){
                    //}else{
                    //    angular.forEach(res.data,function(v1,k1){
                    //        if(value.parentIdTwo==v1.commentFilmDetailId){
                    //            value.list=[];
                    //            value.list.push(v1);
                    //        }
                    //    })
                    //}
                    $scope.commentFilmDetailData.push(value);
                });
                if(res.data.length<$scope.pageSize){
                    $scope.noMorePage=true;
                }
                $scope.articleFlag=true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }else{
                $scope.noMorePage=true;
                $scope.noDataFlag=true;
                $scope.articleFlag=true;
            }
        });
    };
    $scope.findCommentFilmDetail($scope.page,$scope.pageSize);
    //上拉加载更多
    $scope.loadMore=function(){
        $scope.page++;
        $scope.findCommentFilmDetail($scope.page,$scope.pageSize);
    };
    //输入框引用
    autosize(document.querySelectorAll('textarea'));
    //评论点赞举报
    $scope.searchList=[
        {name:"赞", icon:"&#xe601;"},
        {name:"评论", icon:"&#xe658;"},
        {name:"举报", icon:"&#xe6e0;"}
    ];
    //评论举报
    $scope.showList=function (item,e) {
        $scope.yzLogin('cba');
        if($scope.tiFlag==false){
            console.log(item)
        if(item.showFlag==true){
            item.showFlag=false;
        }else{
            angular.forEach($scope.commentFilmDetailData,function(value,key){
                if(item==value&&item.showFlag!=true){
                    value.showFlag=true;
                }else{
                    value.showFlag=false;
                }
                if(value.isFabulous=='Y'&&item==value){
                    value.searchList[0].name='取消';
                }else if(value.isFabulous=='N'&&item==value){
                    value.searchList[0].name='赞';
                }
                if(value.isReport=='Y'&&item==value){
                    value.searchList[2].name='已举报';
                }else if(value.isReport=='N'&&item==value){
                    value.searchList[2].name='举报';
                }
            });
        }
        e.stopPropagation();
        }
    };
    //点赞、举报、评论
    $scope.text="写评论...";
    $scope.getFilter=function (item,row) {
        if(row.name=="评论"){
            document.getElementById("abc").focus();
            if(item.parentId){
                $scope.parentId=item.parentId;
                $scope.viceMemberId=item.memberId;
                $scope.viceMemberName=item.memberName;
                $scope.parentIdTwo=item.commentFilmDetailId;
                console.log(11)
            }else{
                $scope.parentId=item.commentFilmDetailId;
                console.log(22)
            }
            $scope.text="回复@"+item.memberName;
        }else if(row.name=="赞"||row.name=="取消"){
            if(!localStorage.userInfo){
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: languageSetting.unlogin,
                    buttons: [
                        {
                            text: languageSetting.cancel,
                            type: 'button-default',
                            onTap: function () {
                                myPopup.close();
                            }
                        },
                        {
                            text: languageSetting.login,
                            type: 'button-calm',
                            onTap: function (e) {
                                myPopup.close();
                                $state.go('login', {viewName: 'articleDetail', urlParams: JSON.stringify($stateParams)});
                            }
                        }
                    ]
                });
            }else{
                angular.forEach($scope.commentFilmDetailData,function(value,key){
                    if(item.fabulousTypeFlag==true){
                        value.fabulousTypeFlag=false;
                        return
                    }
                    if(item==value){
                        value.fabulousTypeFlag=true;
                    }
                });
                if(item.isFabulous=='N'){
                    $scope.fabulousType="FABULOUS";
                    $scope.fabulousTypeTest='已点赞';
                }else if(item.isFabulous=='Y'){
                    $scope.fabulousType="CANCEL";
                    $scope.fabulousTypeTest='已取消点赞';
                }
                httpService.getData(JYApi.updateCommentFilmDetail, 'post', {
                    params:JSON.stringify({
                        commentFilmDetailId:item.commentFilmDetailId,
                        fabulousType:$scope.fabulousType
                    })
                }, function (res) {
                    if(res.status=="S"){
                        var myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert1',
                            template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i>'+$scope.fabulousTypeTest
                        });
                        $timeout(function () {
                            angular.forEach($scope.commentFilmDetailData,function(value,key){
                                if(value==item&&$scope.fabulousType=="FABULOUS"){
                                    value.isFabulous='Y';
                                    value.fabulous+=1
                                }else if(value==item&&$scope.fabulousType=="CANCEL"){
                                    value.isFabulous='N';
                                    value.fabulous-=1
                                }
                            });
                            myPopup.close();
                        },500);
                    }else{
                        var myPopup = $ionicPopup.show({
                            title: languageSetting.tip,
                            cssClass: 'jyAlert jyAlert1',
                            template: '请求失败,请重新登陆!'
                        });
                        $timeout(function(){
                            myPopup.close();
                            localStorage.removeItem('userInfo');
                            $scope.userInfo = null;
                            $state.go('login');
                        },2000);
                    }
                });
            }

        }else if(row.name=="举报"){
            httpService.getData(JYApi.saveCommentReport, 'post', {
                params:JSON.stringify({
                    commentFilmDetailId:item.commentFilmDetailId
                })
            }, function (res) {
                if(res.status=="S"){
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i> 举报成功'
                    });
                    $timeout(function () {
                        angular.forEach($scope.commentFilmDetailData,function(value,key){
                            if(value==item){
                                value.isReport='Y'
                            }
                        });
                        myPopup.close();
                    },500);

                }else{
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: '请求失败,请重新登陆!'
                    });
                    $timeout(function(){
                        myPopup.close();
                        localStorage.removeItem('userInfo');
                        $scope.userInfo = null;
                        $state.go('login');
                    },2000);
                }
            });
        }

    };

    //$scope.userInfo = JSON.parse(localStorage.userInfo);
    //提交
    $scope.save=function(){
        console.log($scope.parentIdTwo)
        console.log($scope.parentId)
        if(!localStorage.userInfo){
            var myPopup = $ionicPopup.show({
                title: languageSetting.tip,
                cssClass: 'jyAlert jyAlert1',
                template: languageSetting.unlogin,
                buttons: [
                    {
                        text: languageSetting.cancel,
                        type: 'button-default',
                        onTap: function () {
                            myPopup.close();
                        }
                    },
                    {
                        text: languageSetting.login,
                        type: 'button-calm',
                        onTap: function (e) {
                            myPopup.close();
                            $state.go('login', {viewName: 'articleDetail', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else{
        httpService.getData(JYApi.saveCommentFilmDetail, 'post', {
            params:JSON.stringify({
                type:"ARTICLE_REVIEW",
                sourceId:$scope.articleId,
                content:$scope.comment,
                parentId:$scope.parentId?$scope.parentId:null,
                parentIdTwo:$scope.parentIdTwo?$scope.parentIdTwo:null,
                memberName:JSON.parse(localStorage.userInfo).mmbName,
                viceMemberId:$scope.viceMemberId?$scope.viceMemberId:null,
                viceMemberName:$scope.viceMemberName?$scope.viceMemberName:null
            })
        }, function (res) {
            if (res.status == "S") {
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i> 评论成功'
                });
                $timeout(function () {
                    $scope.comment='';
                    $scope.viceMemberId='';
                    $scope.viceMemberName='';
                    $scope.parentIdTwo='';
                    $scope.parentId='';
                    $scope.findCommentFilmDetail($scope.page,$scope.pageSize);
                    document.getElementById("abc").style.height='30px';
                    myPopup.close();
                },2000);
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '请求失败,请重新登陆!'
                });
                $timeout(function(){
                    $scope.comment='';
                    $scope.viceMemberId='';
                    $scope.viceMemberName='';
                    $scope.parentIdTwo='';
                    $scope.parentId='';
                    $scope.findCommentFilmDetail($scope.page,$scope.pageSize);
                    document.getElementById("abc").style.height='30px';
                    myPopup.close();
                    localStorage.removeItem('userInfo');
                    $scope.userInfo = null;
                    $state.go('login');
                },2000);

            }
        });
        }
    };
    document.addEventListener('click',function () {
        angular.forEach($scope.commentFilmDetailData,function(value,key){
            value.showFlag=false;
        });
        $scope.text="写评论...";
    });
    document.getElementById("abc").addEventListener("click", function(){
        $scope.yzLogin('abc');
    });
    $scope.scrollContent=function () {
        document.getElementById("abc").blur();
        $scope.text="写评论..";
        $scope.viceMemberId="";
        $scope.viceMemberName="";
        $scope.parentIdTwo="";
        $scope.parentId="";
    };

    $scope.getEncryption=function (value) {
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
    $scope.$on("$ionicView.enter", function (event, data) {

    });

    //wap微信分享
    //$scope.absurl = $location.absUrl();
    $scope.weixin=function(){
        httpService.getData(JYApi.generateConfigSignature, 'post', {
            url:encodeURIComponent(location.href)
        }, function (res) {
            $scope.appId=res.appId;
            $scope.nonceStr=res.nonceStr;
            $scope.timestamp=res.timestamp;
            $scope.signature=res.signature;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: $scope.appId, // 必填，公众号的唯一标识
                timestamp: $scope.timestamp , // 必填，生成签名的时间戳
                nonceStr: $scope.nonceStr, // 必填，生成签名的随机串
                signature:  $scope.signature,// 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        })
    };
    $scope.$on("$ionicView.enter", function (event, data) {
        //$scope.weixin();
    });

    $scope.isWeixin=function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            wx.ready(function(){
                $scope.shareTime=new Date().getTime();
                if(localStorage.userInfo){
                    $scope.shareCode=JSON.parse(localStorage.userInfo).memberId+$scope.shareTime;
                }
                //分享朋友圈
                if($scope.articleDetailData){
                    wx.onMenuShareTimeline({
                        title: $scope.articleDetailData.articleTitle, // 分享标题
                        link: locals.returnUrl() + "/?from=singlemessage#/articleDetail?id=" + $scope.articleId+'&sourceId='+$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId)+'&shareCode='+ $scope.getEncryption($scope.shareCode),
                        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:  $scope.articleDetailData.url, // 分享图标
                        success: function () {
                            httpService.getData(JYApi.shareInfo,'post',{
                                params:JSON.stringify({
                                    "sourceId":$scope.getEncryption(JSON.parse(localStorage.userInfo).memberId),
                                    "shareCode":$scope.getEncryption($scope.shareCode)
                                })
                            },function(res){
                                if(res.status=='noLogin'){
                                    var myPopup = $ionicPopup.show({
                                        title: languageSetting.tip,
                                        cssClass: 'jyAlert',
                                        template: '小主，登录可以分享有奖哦!',
                                        buttons: [
                                            {
                                                text: languageSetting.cancel,
                                                type: 'button-default',
                                                onTap: function () {
                                                    myPopup.close();
                                                }
                                            },
                                            {
                                                text: languageSetting.login,
                                                type: 'button-calm',
                                                onTap: function (e) {
                                                    myPopup.close();
                                                    $state.go('login', {viewName: 'movieDetail', urlParams: JSON.stringify($stateParams)});
                                                }
                                            }
                                        ]
                                    });
                                }
                                if(res.status=='S'){
                                    var myPopup = $ionicPopup.show({
                                        title: languageSetting.tip,
                                        cssClass: 'jyAlert',
                                        template: res.msg,
                                        buttons: [
                                            {
                                                text: '确定',
                                                type: 'button-calm',
                                                onTap: function (e) {
                                                    myPopup.close();
                                                }
                                            }
                                        ]
                                    });
                                }
                            });
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {

                            // 用户取消分享后执行的回调函数
                        }
                    });

                    //分享朋友
                    wx.onMenuShareAppMessage({
                        title: $scope.articleDetailData.articleTitle, // 分享标题
                        desc: '', // 分享描述
                        link: locals.returnUrl() + "/?from=singlemessage#/articleDetail/" + $scope.articleId,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:  $scope.articleDetailData.url, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享qq
                    wx.onMenuShareQQ({
                        title:  $scope.articleDetailData.articleTitle, // 分享标题
                        desc: '文章详情', // 分享描述
                        link: locals.returnUrl() + "/?from=singlemessage#/articleDetail/" + $scope.articleId,// 分享链接
                        imgUrl:  $scope.articleDetailData.url, // 分享图标
                        success: function () {

                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {

                            // 用户取消分享后执行的回调函数
                        }
                    });
                }
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
            wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        } else {
        }
    };


    //分享进来必须登录
    $scope.shareCodeFlag=$stateParams.shareCode?true:false;
    if($scope.shareCodeFlag==true){
        $scope.joinFlag=true;
    }else{
        $scope.joinFlag=false;
    }
    $scope.join=function(){
        if(localStorage.userInfo){
            $state.go('forum')
        }else{
            $scope.needBind=true;
        }
    };
    $scope.hide=function () {
        $scope.needBind=false;
    };
    //if($scope.shareCodeFlag==true) {
    //    $scope.needBind=true;
    //}
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
                $state.go("forum");
                $ionicViewSwitcher.nextDirection("none")
            }else{
                $rootScope.showTip('获取会员信息失败');
            }
        });
    };

    $scope.bindPhone={};
    $scope.sendYzmFlag='获取验证码';
    $scope.sendYzm=function () {
        if(!$scope.bindPhone.mobileNumber){
            $rootScope.showTip('请输入手机号码');
        }else{
            if (!(/^1[34578]\d{9}$/.test($scope.bindPhone.mobileNumber))) {
                $rootScope.showTip('手机号码格式不正确');
            }else{
                if($scope.sendYzmFlag=='获取验证码'){
                    httpService.getData(JYApi.sendMg, 'post', {
                        params: JSON.stringify({
                            "mobileNumber": $scope.bindPhone.mobileNumber,
                            sendType: 'login'
                        })
                    }, function (res) {
                        if (res.status == 'S') {
                            $scope.sendYzmFlag=60;
                            var djs = $interval(function () {
                                if ($scope.sendYzmFlag > 1) {
                                    $scope.sendYzmFlag--;
                                } else {
                                    $interval.cancel(djs);
                                    $scope.sendYzmFlag = '获取验证码';
                                }
                            }, 1000);
                        } else {
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: '<i class="iconTip ion-close-circled"></i>' + res.msg
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        }
                    },2);
                }
            }
        }
    };
    $scope.getCode=function(){
        $scope.yzmCode=locals.baseUrl()+'/frontUIWebapp/appserver/validateCodeService/createImage?id='+Math.random();
    };
    $scope.getCode();
    $scope.login=function(){
        httpService.getData(JYApi.lockSeatLogin, 'post', {
            params: JSON.stringify({
                "mobileNumber":$scope.bindPhone.mobileNumber,
                "numCode":$scope.bindPhone.vertifyCode,
                imgCode:$scope.bindPhone.captcha1,
                sourceId:$stateParams.sourceId,
                shareCode:$stateParams.shareCode
            })
        }, function (res) {
            if(res.status=='200'){
                $scope.needBind=false;
                if(res.data.memberId){
                    res.data.token=res.token;
                    localStorage.userInfo=JSON.stringify(res.data);
                    $scope.findMember(res.data.memberId);
                }
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: res.msg
                });
                $timeout(function () {
                    myPopup.close();
                }, 2000);
            }
        })
    };

    $scope.goLogin=function(){
        $scope.needBind=false;
        $state.go('login', {viewName: 'forum'});
        $ionicViewSwitcher.nextDirection("none")
    };
    //$scope.goArticle=function(){
    //    window.location.href=locals.returnUrl() +"/?from=timeline#/forum/";
    //};

});
