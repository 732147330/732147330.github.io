/**
 * Created by OuYongQiang
 * 2017.1.10 添加栏目图标,分割线
 */
'use strict';
app.controller('helpCenterCtrl', function($scope,httpService,JYApi,$stateParams,$timeout) {

    //$scope.active=$stateParams.active;
    //$scope.channelCode=$stateParams.channelCode;
    //if($scope.active==188&&$scope.channelCode=='A'){
    //    var _hmt = _hmt || [];
    //    (function() {
    //        var hm = document.createElement("script");
    //        hm.src = "https://hm.baidu.com/hm.js?c292d46cf3ed219b2f5e0bb4e5fcef38";
    //        var s = document.getElementsByTagName("script")[0];
    //        s.parentNode.insertBefore(hm, s);
    //    })();
    //}else if($scope.active==188&&$scope.channelCode=='B'){
    //    var _hmt = _hmt || [];
    //    (function() {
    //        var hm = document.createElement("script");
    //        hm.src = "https://hm.baidu.com/hm.js?d4153d494ba4275f6949d1ef9f8203eb";
    //        var s = document.getElementsByTagName("script")[0];
    //        s.parentNode.insertBefore(hm, s);
    //    })();
    //}

    ////获取菜单信息
    //$scope.getMenuInfo=function(menu){
    //   httpService.getData(JYApi.findCmsFaqMessage2,'post',{
    //       params:JSON.stringify({faqContent:""})
    //   },function(res){
    //       $scope.menuTree = res.data;
    //       $scope.orderNum=[];
    //       $scope.resMenuTree=[];
    //       angular.forEach($scope.menuTree,function(value,key){
    //           $scope.orderNum.push(value.orderSequence);
    //       });
    //       $scope.orderNum=_.union($scope.orderNum);
    //       angular.forEach($scope.orderNum,function(value,key){
    //           $scope.resMenuTree[key]={data:[]};
    //           angular.forEach($scope.menuTree,function(v,k){
    //               v.menuListIcon='ion-android-arrow-dropright-circle';
    //               if(value==v.orderSequence){
    //                   $scope.resMenuTree[key].data.push(v);
    //               }
    //           });
    //       });
    //   });
    //};
    //$scope.getMenuInfo();
    $scope.callPhone=function(){
        $window.location.href="tel:400 000 8008";
    }

    $scope.helpIcon=[
        {name:'新手上路',code:'&#xe690;'},
        {name:'会员权益',code:'&#xe739;'},
        {name:'购票指南',code:'&#xe648;'},
        {name:'其他',code:'&#xe60b;'}

    ];
    $scope.findCmsFaqMessageReve=function(){
        httpService.getData(JYApi.findCmsFaqMessageReve,'post',{
            params:JSON.stringify({})
        },function(res){
            if(res.status=='S'){
                $scope.remarkData=res.data.remark;
                $scope.topData=res.data.top;
                angular.forEach($scope.remarkData,function(v,k){
                    v.down=true;
                    angular.forEach($scope.helpIcon,function(v1,k1){
                        if(v.classCodeName==v1.name){
                            v.code=v1.code;
                        }
                    })
                })
            }

        })
    };
    $scope.findCmsFaqMessageReve();
    $scope.getData=function(item){
        item.bb=[];
        item.down=!item.down;
        if(item.down==false){
            angular.forEach(item.content,function(v,k){
                if(k>1){
                    item.bb.push(v)
                }
            })
        }else{
            item.down=true;
            item.bb=[];
        }
    }
});
