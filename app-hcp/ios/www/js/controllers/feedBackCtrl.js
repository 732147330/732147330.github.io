/**
 * Created by pgr on 16/8/18.
 */
'use strict';
app.controller('feedBackCtrl', function ($scope,$rootScope,$ionicPlatform,$timeout,$ionicPopup,$ionicActionSheet,$cordovaImagePicker,$cordovaCamera,$cordovaStatusbar,$ionicViewSwitcher,$state,httpService,JYApi) {
    $rootScope.userInfo=JSON.parse(localStorage.userInfo);
    $scope.$on('$ionicView.beforeEnter', function(event,data){
        if($rootScope.isMobile){
            $cordovaStatusbar.style(0);
        }
    });
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
            $cordovaCamera.getPicture(options).then(function(imageData) {
                var imgSrc = "data:image/jpeg;base64," + imageData;
                httpService.getData(JYApi.imageUpload, 'post',{
                    str:imageData
                }, function (res) {
                    if(res.status=="S"){
                        $scope.userPath=res.data[0].accessPath;
                        $scope.uploadImgData.push({
                            imgSrc:imgSrc
                        });
                    }
                },2);
            }, function(err) {

            });
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
                    "phoneNumber":$rootScope.userInfo.mobileNumber
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
                        $state.go('setUp');
                    },1000);
                }
            },2);
        }
    };

});
