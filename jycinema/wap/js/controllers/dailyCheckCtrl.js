/**
 * Created by pgr on 18/3/23.
 */
'use strict';
app.controller('dailyCheckCtrl', function($scope,$rootScope,httpService,JYApi,$ionicPopup,$ionicModal,$timeout,$ionicBackdrop,$state) {


    //签到查询
    $scope.findActionHistory=function(){
        httpService.getData(JYApi.findActionHistory, 'post', {
            params:JSON.stringify({
            })
        }, function (res) {
            $scope.signList=res.data;
            $scope.lianXuSignNum=res.lianXuSignNum;
            if(res.activityDesc){
                $scope.activityDescData=res.activityDesc.split("\n");
            }
            //日历
            var d = new Date();
            var calUtil = {
                getDaysInmonth : function(iMonth, iYear){
                    var dPrevDate = new Date(iYear, iMonth, 0);
                    return dPrevDate.getDate();
                },
                bulidCal : function(iYear, iMonth) {
                    var aMonth = new Array();
                    aMonth[0] = new Array(7);
                    aMonth[1] = new Array(7);
                    aMonth[2] = new Array(7);
                    aMonth[3] = new Array(7);
                    aMonth[4] = new Array(7);
                    aMonth[5] = new Array(7);
                    aMonth[6] = new Array(7);
                    var dCalDate = new Date(iYear, iMonth - 1, 1);
                    var iDayOfFirst = dCalDate.getDay();
                    var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
                    var iVarDate = 1;
                    var d, w;
                    aMonth[0][0] = "日";
                    aMonth[0][1] = "一";
                    aMonth[0][2] = "二";
                    aMonth[0][3] = "三";
                    aMonth[0][4] = "四";
                    aMonth[0][5] = "五";
                    aMonth[0][6] = "六";
                    for (d = iDayOfFirst; d < 7; d++) {
                        aMonth[1][d] = iVarDate;
                        iVarDate++;
                    }
                    for (w = 2; w < 7; w++) {
                        for (d = 0; d < 7; d++) {
                            if (iVarDate <= iDaysInMonth) {
                                aMonth[w][d] = iVarDate;
                                iVarDate++;
                            }
                        }
                    }
                    return aMonth;
                },
                ifHasSigned : function(signList,day){
                    //console.log(day)
                    var signed = false;
                    //$.each(signList,function(index,item){
                    //    var date = new Date(item.signDate);
                    //    if(date.getDate() == day) {
                    //        signed = true;
                    //        return false;
                    //    }
                    //});
                    $.each(signList,function(index,item){
                        if(item.signDay== day) {
                            signed = true;
                            return false;
                        }
                    });
                    return signed ;
                },
                drawCal : function(iYear, iMonth ,signList) {
                    var currentYearMonth = iYear+"年"+iMonth+"月";
                    var myMonth = calUtil.bulidCal(iYear, iMonth);
                    var htmls = new Array();
                    htmls.push("<div class='sign_main' id='sign_layer'>");
                    htmls.push("<div class='sign_succ_calendar_title'>");
                    htmls.push("<div class='calendar_month_span' style='text-align: center;padding: 12px;background: #998278;color: white;'>"+currentYearMonth+"</div>");
                    htmls.push("</div>");
                    htmls.push("<div class='sign' id='sign_cal'>");
                    htmls.push("<table class='table'>");
                    htmls.push("<tr>");
                    htmls.push("<th>" + myMonth[0][0] + "</th>");
                    htmls.push("<th>" + myMonth[0][1] + "</th>");
                    htmls.push("<th>" + myMonth[0][2] + "</th>");
                    htmls.push("<th>" + myMonth[0][3] + "</th>");
                    htmls.push("<th>" + myMonth[0][4] + "</th>");
                    htmls.push("<th>" + myMonth[0][5] + "</th>");
                    htmls.push("<th>" + myMonth[0][6] + "</th>");
                    htmls.push("</tr>");
                    var d, w;
                    for (w = 1; w < 7; w++) {
                        htmls.push("<tr>");
                        for (d = 0; d < 7; d++) {
                            var ifHasSigned = calUtil.ifHasSigned(signList,myMonth[w][d]);
                            if(ifHasSigned){
                                htmls.push("<td class='on'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                            } else {
                                htmls.push("<td>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                            }
                        }
                        htmls.push("</tr>");
                    }
                    htmls.push("</table>");
                    htmls.push("</div>");
                    htmls.push("</div>");
                    return htmls.join('');
                }
            };
            var signList=[
                //{signDate:1},
                //{signDate:2},
                //{signDate:3}
            ]; //后台查询的已签到的时间集合，传入到js方法中会去判断哪一天签到了，然后改变签到天的显示效果
            var str = calUtil.drawCal(d.getFullYear(),d.getMonth() + 1,$scope.signList);
            $("#calendar").html(str);
            $scope.signDateMax= _.max($scope.signList, function(item){ return item.signDay; });
            $('.dailCheck-div1').click(function(){
                //if($(this).text()==d.getDate()&&$scope.signDateMax.signDay!=d.getDate()){
                    httpService.getData(JYApi.saveActionHistory, 'post', {
                        params:JSON.stringify({
                        })
                    }, function (res) {
                        if(res.status=="S"){
                            $scope.signList=res.data;
                            $scope.lianXuSignNum=res.lianXuSignNum;
                            var str = calUtil.drawCal(d.getFullYear(),d.getMonth() + 1,$scope.signList);
                            $("#calendar").html(str);
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: '<i class="jyicon iconfont" style="color:#09bb07;">&#xe61e;</i> 签到成功'
                            });
                            $timeout(function () {
                                myPopup.close();
                            },2000);
                        }else{
                            var myPopup = $ionicPopup.show({
                                title: languageSetting.tip,
                                cssClass: 'jyAlert jyAlert1',
                                template: res.msg
                            });
                            $timeout(function () {
                                myPopup.close();
                            },2000);
                        }
                    });
                //}else{
                //
                //}
            })
        });
    };
    $scope.findActionHistory();

});