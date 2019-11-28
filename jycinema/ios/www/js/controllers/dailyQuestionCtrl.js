/**
 * Created by pgr on 18/3/23.
 */
'use strict';
app.controller('dailyQuestionCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$ionicModal,$ionicBackdrop,$state) {
    $scope.findQuestionInfos=function(){
        httpService.getData(JYApi.findQuestionInfos, 'post', {
            params:JSON.stringify({

            })
        }, function (res) {
            if(res.status=='S'){
                $scope.noflag=true;
                $scope.questionTitle=res.data.questionTitle;
                $scope.optionData=res.data.optionData;
                $scope.sourceNameId=res.data.sourceNameId;
                $scope.sourceType=res.data.sourceType;
            }else{
                $scope.noflag=false;
                $scope.msg=res.msg
            }

        });
    };

    $scope.choose=function(item){
        httpService.getData(JYApi.submitAnswerResults, 'post', {
            params:JSON.stringify({
                questionChoiceId:item.questionChoiceId,
                questionChoiceCode:item.questionChoiceCode
            })
        }, function (res) {
            if(res.status=='S'){
          $scope.myPopup = $ionicPopup.show({
                title:'',
                template: `<div><img src="./img/niu.png"><p style="text-align: center">获得一次抽奖的机会</p></div>`,
                cssClass:'dauil',
                buttons: [
                    {
                        text: '前往抽奖',
                        type: 'button-default',
                        onTap: function (e) {
                            if(res.lotteryDrawHeaderId){
                                $state.go('awardBigWheel',{lotteryDrawHeaderId:res.lotteryDrawHeaderId});
                            }else{
                                $state.go('activity');
                            }
                            $scope.myPopup.close();
                        }
                    }
                ]
            });
            }else{
                $scope.mytowPopup = $ionicPopup.show({
                    title:'',
                    template: `<div><i class="ion jyicon" style="font-size: 100px;margin-left: 66px">&#xe8c4;</i><p style="text-align: center">`+res.msg+`</p></div>`,
                    cssClass:'dauil',
                    buttons: [
                        {
                            text: '明天再来',
                            type: 'button-default',
                            onTap: function (e) {
                                $state.go('home');
                                $scope.mytowPopup.close();
                            }
                        }
                    ]
                });
            }

        });
    };
    $scope.$on("$ionicView.enter", function (event, data) {
        $scope.findQuestionInfos();
    });
    $scope.$on('$ionicView.leave',function () {
    if($scope.mytowPopup){
        $scope.mytowPopup.close();
    }else if($scope.myPopup){
        $scope.myPopup.close();
    }
    });
   $scope.go=function(){
       if( $scope.sourceType=='FILM'){
           $state.go('movieDetail',{movieId:$scope.sourceNameId});
       }else if( $scope.sourceType=='CINEMA'){
           $state.go('theatreDetail',{theatreId:$scope.sourceNameId});
       }else if( $scope.sourceType=='ACTIVITY'){
           $state.go('activityDetail',{activityGroupId:$scope.sourceNameId});
       }else if( $scope.sourceType=='ARTICLE'){
           $state.go('articleDetail',{id:$scope.sourceNameId});
       }else if( $scope.sourceType=='ACTOR'){
           $state.go('actorDetail',{id:$scope.sourceNameId});
       }
   }
});