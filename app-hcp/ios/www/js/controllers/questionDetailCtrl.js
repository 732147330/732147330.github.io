/**
 */
'use strict';
app.controller('questionDetailCtrl', function($scope,$rootScope,$ionicPopup,$timeout,$state,httpService,JYApi,$ionicScrollDelegate,$ionicSlideBoxDelegate,$stateParams,$sce) {
    $scope.surveyTitle=$stateParams.surveyTitle;

    $scope.deliberatelyTrustDangerousSnippet = function(content) {
        return $sce.trustAsHtml(content);
    };
    //查询问卷内容
    $scope.findQuestionContent=function(){
        httpService.getData(JYApi.findQuestionChoice, 'post', {
            params:JSON.stringify({
                surveyHeaderId:parseInt($stateParams.surveyHeaderId)
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.isTakePartIn=res.isTakePartIn=='Y'?false:true;
                $scope.isNotTakePartIn=res.isTakePartIn=='N'?false:true;
                $scope.TitleData=res.TitleData;
                $scope.LineData=res.LineData;
            }
        },2);
    };
    $scope.$on("$ionicView.enter", function(event, data){
        $ionicScrollDelegate.scrollTop();
        $scope.findQuestionContent();
    });

    $scope.showTip=function (index) {
        var myPopup = $ionicPopup.show({
            title: languageSetting.tip,
            cssClass: 'jyAlert jyAlert1',
            template: '<i class="iconTip ion-close-circled"></i>'+'第'+(index+1)+'题填写不完整,请检查'
        });
        $timeout(function(){
            myPopup.close();
        },1000);
    };


    //保存问卷
    $scope.sub=function () {
        var resultData=[];
        console.log($scope.LineData);
        for(var i=0;i<$scope.LineData.length;i++){
            if($scope.LineData[i].projectType=='TEXT'){
                if(!$scope.LineData[i].choiceList[0].text){
                    if($scope.LineData[i].requireFlag=='Y'){
                        $scope.showTip(i);
                        return;
                    }else{
                        resultData.push({
                            ChoiceData:[]
                        });
                    }
                }else{
                    var data=[{
                        surveyContentResult: $scope.LineData[i].choiceList[0].surveyChoiceContent+':'+$scope.LineData[i].choiceList[0].text,
                        surveyChoiceId: $scope.LineData[i].choiceList[0].surveyChoiceId,
                        surveyHeaderId: $scope.LineData[i].surveyHeaderId,
                        surveyLineId: $scope.LineData[i].surveyLineId,
                        surveyChoiceResult: '无'
                    }];
                    resultData.push({
                        ChoiceData:data
                    });
                }
            }else if($scope.LineData[i].projectType=='RADIO'){
                if(!$scope.LineData[i].radio){
                    if($scope.LineData[i].requireFlag=='Y'){
                        $scope.showTip(i);
                        return;
                    }else{
                        resultData.push({
                            ChoiceData:[]
                        });
                    }
                }else{
                    if($scope.LineData[i].radio.surveyType=='TEXT'){
                        $scope.LineData[i].radio.surveyChoiceContent=$scope.LineData[i].radio.surveyChoiceContent+':'+$scope.LineData[i].radio.radiotext;
                    }
                    var data=[{
                        surveyContentResult: $scope.LineData[i].radio.surveyChoiceContent,
                        surveyChoiceId: $scope.LineData[i].radio.surveyChoiceId,
                        surveyHeaderId: $scope.LineData[i].surveyHeaderId,
                        surveyLineId: $scope.LineData[i].surveyLineId,
                        surveyChoiceResult: $scope.LineData[i].radio.surveyChoice
                    }];
                    resultData.push({
                        ChoiceData:data
                    });
                }
            }else if($scope.LineData[i].projectType=='MULTSELECT'){
                var data=[];
                angular.forEach($scope.LineData[i].choiceList,function (v,k) {
                    if(v.checkbox==true){
                        if(v.surveyType=='TEXT'){
                            v.surveyChoiceContent=v.surveyChoiceContent+':'+v.checkboxtext;
                        }
                        data.push({
                            surveyContentResult:v.surveyChoiceContent,
                            surveyChoiceId: v.surveyChoiceId,
                            surveyHeaderId: $scope.LineData[i].surveyHeaderId,
                            surveyLineId: $scope.LineData[i].surveyLineId,
                            surveyChoiceResult: v.surveyChoice
                        });
                    }
                });
                if(data.length==0){
                    if($scope.LineData[i].requireFlag=='Y'){
                        $scope.showTip(i);
                        return;
                    }else{
                        resultData.push({
                            ChoiceData:[]
                        });
                    }
                }else{
                    resultData.push({
                        ChoiceData:data
                    });
                }
            }
        }
        httpService.getData(JYApi.saveQuestionResult, 'post', {
            params:JSON.stringify({
                resultData:resultData
            })
        }, function (res) {
            if (res.status == "S") {
                $scope.TitleData='';
                $scope.LineData='';
                $scope.isTakePartIn=false;
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '保存成功，感谢您的参与！'
                });
                $timeout(function(){
                    myPopup.close();
                    $state.go('account');
                },1000);
            }else{
                var myPopup = $ionicPopup.show({
                    title: languageSetting.tip,
                    cssClass: 'jyAlert jyAlert1',
                    template: '<i class="iconTip ion-close-circled"></i>'+res.msg
                });
                $timeout(function(){
                    myPopup.close();
                },1000);
            }
        },2);
    };


});
