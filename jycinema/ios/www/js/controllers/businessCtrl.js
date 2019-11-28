/**
 * Created by OuYongQiang
 * 2016.12.18 更新走进金逸内容 v1.2版需更新内容
 */
'use strict';
app.controller('businessCtrl', function($scope,httpService,JYApi) {
    $scope.businessCategory= [
        {
            name: '企业简介',
            identifier: 'ENTER_JINYI_INTRODUCTION',
            subList: [
                {
                    name: '企业简介',
                    identifier: 'INTRODUCTION',
                }
            ]
        },
        {
            name: '企业文化',
            identifier: 'ENTER_JINYI_BUS',
            subList: [
                {
                    name: '金逸动态',
                    identifier: 'JINYI_DYNAMIC',
                },
                {
                    name: '流金溢彩',
                    identifier: 'JINYI_STYLE',
                },
                {
                    name: '金逸公益',
                    identifier: 'JINYI_DONATION',
                },
                {
                    name: '金逸视野',
                    identifier: 'JINYI_VIEW',
                }
            ]
        }, {
            name: '培训发展',
            identifier: 'ENTER_JINYI_TRA',
            subList: [
                {
                    name: '培训通知',
                    identifier: 'TRAINING_NOTICE',
                },
                {
                    name: '培训分享',
                    identifier: 'SHARE_TRAINING',
                },
                {
                    name: '培训花絮',
                    identifier: 'TRAINING',
                }
            ]
        }, {
            name: '招贤纳士',
            identifier: 'ENTER_JINYI_REC',
            subList: [
                {
                    name: '社会招聘',
                    identifier: 'SOICIAL_REC',
                },
                {
                    name: '内部招聘',
                    identifier: 'INTERNAL_REC',
                },
                {
                    name: '校园招聘',
                    identifier: 'CAMPUS_REC',
                }
            ]
        }, {
            name: '联系我们',
            identifier: 'ENTER_JINYI_CONTACT',
            subList: [
                {
                    name: '业务咨询',
                    identifier: 'BUSINESS_CONSULTANT',
                },
                {
                    name: '人事招聘',
                    identifier: 'HR_RECRUIT',
                },
                {
                    name: '投诉建议',
                    identifier: 'COMPLAINT_ADVISE',
                }
            ]
        }
    ]


});
