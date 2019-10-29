/**
 * Created by pgr on 17/11/7.
 */
'use strict';
app.controller('filmCriticCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$ionicPlatform,$stateParams,$timeout,$state,$ionicScrollDelegate) {
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
    //$scope.userInfo = JSON.parse(localStorage.userInfo);
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

    $scope.toggleVflag = function (row) {
        angular.forEach($scope.commentFilmDetailLineData,function(value,key){
            if(value.commentFilmDetailId==row.commentFilmDetailId&&row.filmFlag==true){
                value.filmFlag=false;
            }else if(row.filmFlag==false&&value.commentFilmDetailId==row.commentFilmDetailId){
                value.filmFlag=true;
            }
        });
        $timeout(function(){
            $ionicScrollDelegate.resize();
        },10);
    };

    //输入框引用
    autosize(document.querySelectorAll('textarea'));

    //评论举报头
    $scope.showList=function (item,e) {
        $scope.yzLogin();
        if($scope.tiFlag==false) {
            if (item.showFlag == true) {
                item.showFlag = false;
            } else {
                angular.forEach($scope.commentFilmDetailHeadData, function (value, key) {
                    if (item == value && item.showFlag != true) {
                        value.showFlag = true;
                        angular.forEach($scope.commentFilmDetailLineData, function (v1, k1) {
                            v1.showFlagLine = false;
                        });
                    } else {
                        value.showFlag = false;
                    }
                });
            }
            e.stopPropagation();
        }
    };
    //评论举报行
    $scope.showListLine=function (row,e) {
        $scope.yzLogin();
        if($scope.tiFlag==false) {
            if (row.showFlagLine == true) {
                row.showFlagLine = false;
            } else {
                angular.forEach($scope.commentFilmDetailLineData, function (value, key) {
                    if (row == value && row.showFlagLine != true) {
                        value.showFlagLine = true;
                        angular.forEach($scope.commentFilmDetailHeadData, function (v1, k1) {
                            v1.showFlag = false;
                        });
                    } else {
                        value.showFlagLine = false;
                    }
                });
            }
            e.stopPropagation();
        }
    };
    //举报头
    $scope.getFilter=function (id) {
        httpService.getData(JYApi.saveCommentReport, 'post', {
            params:JSON.stringify({
                commentFilmDetailId:id
            })
        }, function (res) {
            if(res.status=="S"){
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i> 举报成功'
                });
                $timeout(function () {
                    angular.forEach($scope.commentFilmDetailHeadData,function(value,key){
                        if(value.commentFilmDetailId==id){
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
    };
    //举报行
    $scope.getFilterLine=function (id) {
        httpService.getData(JYApi.saveCommentReport, 'post', {
            params:JSON.stringify({
                commentFilmDetailId:id
            })
        }, function (res) {
            if(res.status=="S"){
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i> 举报成功'
                });
                $timeout(function () {
                    angular.forEach($scope.commentFilmDetailLineData,function(value,key){
                        if(value.commentFilmDetailId==id){
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
    };

    //点赞头
    $scope.updateCommentFilmDetail =function(item){
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
                            $state.go('login', {viewName: 'filmCritic', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else{
            angular.forEach($scope.commentFilmDetailHeadData,function(value,key){
                if(item.fabulousTypeFlag==true){
                    value.fabulousTypeFlag=false;
                    return
                }
                if(item==value){
                    value.fabulousTypeFlag=true;
                }
            });
            if(item.isFabulous=='N'){
                $scope.fabulousType="FABULOUS"
            }else{
                $scope.fabulousType="CANCEL"
            }
            httpService.getData(JYApi.updateCommentFilmDetail, 'post', {
                params:JSON.stringify({
                    commentFilmDetailId:item.commentFilmDetailId,
                    fabulousType:$scope.fabulousType
                })
            }, function (res) {
                if(res.status=="S"){
                    angular.forEach($scope.commentFilmDetailHeadData,function(value,key){
                        if(item==value&&$scope.fabulousType=="FABULOUS"){
                            value.fabulous+=1;
                            value.isFabulous='Y'
                        }else if(item==value&&$scope.fabulousType=="CANCEL"){
                            value.fabulous-=1;
                            value.isFabulous='N'
                        }
                    });
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
    //点赞行
    $scope.updateCommentFilmLineDetail =function(row){
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
                            $state.go('login', {viewName: 'filmCritic', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        }else{
            angular.forEach($scope.commentFilmDetailLineData,function(value,key){
                if(row.fabulousTypeFlag==true){
                    value.fabulousTypeFlag=false;
                    return
                }
                if(row==value){
                    value.fabulousTypeFlag=true;
                }
            });
            if(row.isFabulous=='N'){
                $scope.fabulousType="FABULOUS"
            }else{
                $scope.fabulousType="CANCEL"
            }
            httpService.getData(JYApi.updateCommentFilmDetail, 'post', {
                params:JSON.stringify({
                    commentFilmDetailId:row.commentFilmDetailId,
                    fabulousType:$scope.fabulousType
                })
            }, function (res) {
                if(res.status=="S"){
                    angular.forEach($scope.commentFilmDetailLineData,function(value,key){
                        if(row==value&&$scope.fabulousType=="FABULOUS"){
                            value.fabulous+=1;
                            value.isFabulous='Y';
                            value.fabulousTypeFlag=true;
                        }else if(row==value&&$scope.fabulousType=="CANCEL"){
                            value.fabulous-=1;
                            value.isFabulous='N';
                            value.fabulousTypeFlag=false;
                        }
                    });
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

    //验证是否登录
    $scope.yzLogin=function(){
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
                            $state.go('login', {viewName: 'filmCritic', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        document.getElementById("abc").blur();
        $scope.tiFlag=true;
    }else{
        document.getElementById("abc").focus();
        $scope.tiFlag=false;
    }
    };

    //回复
    $scope.text="写回复...";
    $scope.recall=function(){
        document.getElementById("abc").focus();
        $scope.yzLogin();
        $scope.text="写回复...";
        $scope.parentId=$stateParams.commentFilmDetailId;
        $scope.viceMemberId='';
        $scope.viceMemberName='';
        $scope.parentIdTwo=''
    };
    //回复其他
    $scope.recallOther=function(row){
        console.log(row)
        document.getElementById("abc").focus();
        $scope.yzLogin();
        $scope.text="回复@"+row.memberName;
        $scope.viceMemberId=row.memberId;
        $scope.viceMemberName=row.memberName;
        $scope.parentIdTwo=row.commentFilmDetailId;
        //$scope.parentId=row.commentFilmDetailId;
    };

    //查询影评
    $scope.noMorePage=false;
    $scope.pageSize=10;
    $scope.page=1;
    $scope.findCommentFilmDetail =function(page,pageSize){
        //document.getElementById("abc").focus();
        httpService.getData(JYApi.findCommentFilmDetail, 'post', {
            params:JSON.stringify({
                parentId:$stateParams.commentFilmDetailId,
                pageIndex:page,
                pageRows:pageSize
            })
        }, function (res) {
            if(res.status=="S"&&res.data.length>0){
                if($scope.page==1){
                    $scope.commentFilmDetailHeadData=[];
                    $scope.commentFilmDetailHeadData.push(res.data[0]);
                    angular.forEach($scope.commentFilmDetailHeadData,function(value,key){
                        value.date=value.creationDate.substring(0,10);
                        value.starArr=[];
                        for(var i=0;i<value.score;i++){
                            value.starArr.push(i);
                        }
                        value.date=getDays(value.date,$scope.mytime);//评论时间与当前相差多少
                        if(value.date==0){
                            value.date="今天"
                        }
                    });
                    $scope.commentFilmDetailLineData=[];
                }
                angular.forEach(_.filter(res.data, function(item){ return item.parentId != undefined; }),function(value,key){
                    value.date=value.creationDate.substring(5,16);
                    value.filmFlag=true;
                    if(value.parentIdTwo==0||value.parentIdTwo==null){
                    }else{
                        angular.forEach($scope.commentFilmDetailLineData,function(v1,k1){
                            if(value.parentIdTwo==v1.commentFilmDetailId){
                                value.list=[];
                                value.list.push(v1);
                            }
                        })
                    }
                    $scope.commentFilmDetailLineData.push(value);
                });
                if(res.data.length<$scope.pageSize){
                    $scope.noMorePage=true;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }else{
                $scope.noMorePage=true;
            }
        });
    };
    $scope.findCommentFilmDetail($scope.page,$scope.pageSize);
    //上拉加载更多
    $scope.loadMore=function(){
        $scope.page++;
        $scope.findCommentFilmDetail($scope.page,$scope.pageSize);
    };
    //发送
    $scope.parentId=$stateParams.commentFilmDetailId;
    $scope.pass=function() {
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
                            $state.go('login', {viewName: 'filmCritic', urlParams: JSON.stringify($stateParams)});
                        }
                    }
                ]
            });
        } else {
            httpService.getData(JYApi.saveCommentFilmDetail, 'post', {
                params: JSON.stringify({
                    parentId:$scope.parentId,
                    parentIdTwo:$scope.parentIdTwo?$scope.parentIdTwo:null,
                    content: $scope.comment,
                    type:"FILE_REVIEW",
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
                        $scope.findCommentFilmDetail($scope.page,$scope.pageSize);
                        document.getElementById("abc").style.height='30px';
                        myPopup.close();
                    },2000);
                }else{
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: res.msg
                    });
                    $timeout(function () {
                        $scope.comment='';
                        $scope.findCommentFilmDetail($scope.page,$scope.pageSize);
                        myPopup.close();
                    },2000);
                }
            });
        }
    };
    document.addEventListener('click',function () {
        angular.forEach($scope.commentFilmDetailHeadData,function(value,key){
            value.showFlag=false;
        });
        angular.forEach($scope.commentFilmDetailLineData,function(value,key){
            value.showFlagLine=false;
        });
        $scope.$apply();
    });

    document.getElementById("abc").addEventListener("click", function(){
        document.getElementById("abc").focus();
        //document.getElementById("comment").style.bottom='100px';//键盘处理
        $scope.yzLogin();
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
    });

    $scope.scrollContent=function () {
        if($ionicScrollDelegate.getScrollPosition().top>1){
            document.getElementById("abc").blur();
        }
        //document.getElementById("comment").style.bottom='0px';//键盘处理
    };
    //wap监听键盘打开
    //var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //$(window).on('resize', function () {
    //    var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //    if (clientHeight > nowClientHeight) {
    //        //键盘弹出的事件处理
    //        document.getElementById('comment').style.bottom='300px';
    //    }
    //    else {
    //        //键盘收起的事件处理
    //        document.getElementById('comment').style.bottom='0px';
    //    }
    //});
});