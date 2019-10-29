/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('feedBackCtrl', function ($scope,$rootScope,$ionicPlatform,$stateParams,$timeout,$ionicPopup,$ionicActionSheet,$ionicViewSwitcher,$state,httpService,JYApi) {
    $rootScope.userInfo=localStorage.userInfo?JSON.parse(localStorage.userInfo):'';
    $scope.scanCodeFlag=$stateParams.scanCodeFlag;
    $scope.uploadImgData=[];
    $scope.user={
        emailAddress:'',
        phoneNumber:$rootScope.userInfo.mobileNumber,
        complaintContent:''
    };
    $scope.uploadImg=function(){
        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: languageSetting.cameraUpload
            }, {
                text: languageSetting.album
            }],
            cancelText: languageSetting.cancel,
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                // 相册文件选择上传
                if (index == 0) {
                    $scope.taskPicture(0);
                } else if (index == 1) {
                    // 拍照上传
                    $scope.taskPicture(1);
                }
                return true;
            }
        });
    };
    $scope.taskPicture = function(index) {
        if(index==0){
            var type=Camera.PictureSourceType.CAMERA;
        }else if(index==1){
            var type=Camera.PictureSourceType.PHOTOLIBRARY;
        }
        $ionicPlatform.ready(function(){
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: type,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 400,
                targetHeight: 400,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };
        });
    };
    $scope.closeUploadImg=function(index){
        $scope.uploadImgData.splice(index,1);
    };
    //提交意见反馈
    $scope.submitFeedBack=function(obj){
        if(!obj.$invalid){
            httpService.getData(JYApi.save,'post', {
                params:JSON.stringify({
                    "memberId":$rootScope.userInfo.memberId,
                    "complaintContent":$scope.user.complaintContent,
                    "complaintImagesUrl":$scope.userPath,
                    "phoneNumber":$rootScope.userInfo.mobileNumber?$rootScope.userInfo.mobileNumber:$scope.user.phoneNumber,
                    scanCodeFlag:$stateParams.scanCodeFlag
                })
            }, function (res) {
                if(res.status=="S"){
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: languageSetting.submitSuccess
                    });
                    $timeout(function(){
                        myPopup.close();
                        $scope.user.complaintContent='';
                        $scope.user.emailAddress='';
                        $scope.uploadImgData=[];
                        if($stateParams.scanCodeFlag){
                            $state.go('home');
                        }else{
                            $state.go('setUp');
                        }
                    },1000);
                }else{
                    var myPopup = $ionicPopup.show({
                        title: languageSetting.tip,
                        cssClass: 'jyAlert jyAlert1',
                        template: res.msg
                    });
                    $timeout(function(){
                        myPopup.close();
                    },2000);
                }
            },2);
        }
    };
});
