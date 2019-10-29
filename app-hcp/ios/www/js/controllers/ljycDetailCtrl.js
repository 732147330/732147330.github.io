/**
 * Created by OuYongQiang
 */
'use strict';
app.controller('ljycDetailCtrl', function($scope,httpService,JYApi,$stateParams) {
    $scope.id=$stateParams.id;


    switch ($scope.id){
        case '0':
            $scope.banners=[
                {
                    url:locals.baseUrl()+'frontUIWebapp/templates/default/jinyi/imgs/activity/hsy5.jpg'
                },
                {
                    url:locals.baseUrl()+'frontUIWebapp/templates/default/jinyi/imgs/activity/hsy4.jpg'
                },
                {
                    url:locals.baseUrl()+'frontUIWebapp/templates/default/jinyi/imgs/activity/hsy6.jpg'
                },
                {
                    url:locals.baseUrl()+'frontUIWebapp/templates/default/jinyi/imgs/activity/hsy2.jpg'
                },
                {
                    url:locals.baseUrl()+'frontUIWebapp/templates/default/jinyi/imgs/activity/hsy1.jpg'
                },
                {
                    url:locals.baseUrl()+'frontUIWebapp/templates/default/jinyi/imgs/activity/hsy3.jpg'
                }
            ];
            break;
        case '1':
            $scope.banners=[
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/moon1.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy2.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy3.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy4.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy5.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy6.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/moon7.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy8.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy9.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy10.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy11.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/moon12.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy13.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy14.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy15.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/hsy16.jpg'
                },
            ];
            break;
        case '2':
            $scope.banners=[
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/jnds1.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/jnds2.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/jnds3.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/jnds4.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/jnds5.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/jnds6.jpg'
                },
                {
                    url:locals.baseUrl()+'/frontUIWebapp/templates/default/jinyi/imgs/activity/jnds7.jpg'
                }
            ];
            break;
    }

    $scope.ljycData=[
        {
            tit:'第三季金逸好声音大赛圆满落幕',
            content:'<p>引入导师制，塑造战队魂</p><p>第三季金逸好声音总决赛在浙江实验艺术剧场圆满落幕，本次大赛由总裁办、人力资源部、营运管理中心主办，浙江艺术职业学院协办。大赛得到全体同事的积极响应和踊跃参与。经过海选、复赛的激烈比拼，岁月流声组10人、青春唱响组10人脱颖而出，跻身全国总决赛，角逐金逸的好声音桂冠。决赛引入导师制，两个组别的选手划分为ABCD四个组同场竞技。同时，首次引入线上直播平台，全程现场直播，现场及场外逾千名观众观看了本次大赛，为大家奉献了一场精彩的音乐盛宴。导师以匠心塑造战队之魂，各位实力唱将以真情演绎金逸好声音，大赛最终角逐出一等奖一名，二等奖一名，三等奖两名，最佳台风奖一名，优秀奖16名。</p><p>创精品文化活动，推深度校企合作</p><p>受总裁委托，总裁办总经理张钰为本次大赛致辞，欢迎到会的浙江艺术职业学院院长黄杭娟，学院党委书记朱海闵，影视技术系主任刘发奎、系党支部书记彭云波，杭州各界同行、嘉宾、浙江艺术职业学院的同学，以及拨冗前来的本部及区域领导，感谢为大赛辛苦付出的全体工作人员。张总指出好声音大赛自2014年创办以来，逐渐发展成为企业的精品文化活动，活动传承了金逸人坚持不懈、不断进取、勇闯难关的企业精神，得到全体同事的认同和喜爱。金逸与浙江艺术职业学院在校企合作已有三年，学院文化底蕴丰富，设备雄厚，校风严谨，培养了众多金逸的中高层管理人员，今后也将沿着校企合作的方向，在互动式教学、人才培养及企业文化方面做更深度的探索与合作，希望双方能够得到更丰硕的成果。特别对在第三季金逸好声音大赛筹备中做出巨大贡献的刘主任、彭书记及学院师生表示衷心的感谢。</p><p>三轮比拼竞争激烈，金逸好声音脱颖而出</p><p>本次总决赛评委由总裁办总经理张钰、工程项目协调指挥中心总经理许守伟、信息数据分析研究中心总监李权基、中西区总经理王燕、东区总经理冯梅、南区市场总监肖亮治、北区市场总监万仪娟、浙江艺术职业学院音乐系朱卓凡、谢志勇两位教授共同担任。主持人介绍完比赛规则后，进行了龙争虎斗、过关斩将、旗开得胜三轮激烈的比拼。最终总部人力资源部庄奇捷脱颖而出获得比赛一等奖，二等奖获得者为广州太阳城店龚志文，三等奖获得者为嘉星摩尔点邱煜宇和泉州环球城店蔡贤毅。而广州维家思店马睿通获得最佳台风奖。</p><p>同舟共济，再接再厉</p><p>比赛结束后，颁奖仪式在浙江实验艺术剧场隆重举行。比赛两大导师莫伟、袁超俊带领全体选手演唱《相亲相爱》，寓意金逸人团结友爱，同舟共济。张总为导师颁发纪念奖杯，感谢导师为比赛的付出及增色。各评委领导为获奖者颁发荣誉证书及奖品，勉励获奖者再接再厉，继续在金逸大舞台上发光发热。本次大赛得到了大家的热烈好评，全国决赛选手的演唱才华得以充分展现。颁奖仪式最后，所有评委、选手、嘉宾上台合影留念，大赛在热烈、温馨、感恩的氛围中圆满结束。</p><p>比赛精彩瞬间扫二维码即可观看哦</p><div><img class="ljycPin" src="http://www.jycinema.cn/frontUIWebapp/templates/default/jinyi/imgs/activity/qrhsy.png" alt=""></div>'
        },
        {
            tit:'九州生明月 金逸迎中秋',
            content:'<p>2016年9月15日是一年一度的中秋佳节。为颂扬传统文化，增强员工凝聚力和归属感，展现金逸大家庭的和睦团结，总裁办及总部人力资源部合力策划组织了本部员工中秋喜乐会，收到了热烈的反响。</p><p>9月13日下午四点半开始，各部门同事便纷纷涌出办公室，汇集到大堂前台及走廊处，踊跃参与到活动当中。生日趴、食品汇、游园、猜灯谜、玩游戏、获积分、兑奖品，一系列精心设计的环节不断带给大家惊喜，让大家玩的不亦乐乎。特别是“乾坤大挪移”、“超级保龄球”、“毽舞飞扬”、“你说我猜”、“速递乒乓”、“小李飞镖”、“投篮高手”等九个极具乐趣的游戏环节，带给大家无限的欢乐。这边同事争分夺秒用细长的筷子夹起一枚枚棋子，放到指定的盘子里，上演着“乾坤大挪移”；那边同事使出浑身解数掷出一枚枚飞镖，上演着“小李飞镖”；这端同事用乒乓球拍拖着乒乓球飞奔着把其送到指定的地点；那头同事跳跃着把篮球投入篮筐；走廊上还站满了紧锁着眉头在静心思考灯谜的同事。兑奖处也有一些同事，他们拿着游戏通关证明的小卡片，满心欢喜的等待着兑换奖品……整个喜乐会欢乐无限，深得同事们的喜爱和赞扬。</p><p>中秋喜乐会让同事们放松了心情、收获了快乐、体验了节日氛围。这也体现了公司对员工的关爱，展现了公司对企业文化建设的重视。企业文化的建设必将增强员工凝聚力和归属感，为公司发展提供源源不竭的活力和动力。</p><p>精彩活动现场尽在H5，欢迎扫描二维码观看</p><div><img class="ljycPin" src="http://www.jycinema.cn/frontUIWebapp/templates/default/jinyi/imgs/activity/qrmoon.png" alt=""></div>'
        },
        {
            tit:'2016年影城负责人技能大赛圆满举办',
            content:'<p>继2014年影城营运基层员工技能大赛、2015年影城值班经理技能大赛、2016年影城放映巅峰大赛后，2016年影城负责人技能大赛总决赛在8月圆满落幕。比赛得到了总裁的大力支持及各区域、各同城、各影城的全力配合，覆盖全国136家影城，经过三轮角逐，产生大赛的全国前3甲及7位优秀选手。</p><h2>多轮比拼，优中选优</h2><p>大赛于6月在全国拉开帷幕，要求各影城负责人自学、复习公司相关规章制度及培训课件、课程视频等资料，补齐短板，夯实业务技能。初赛于7月6日在成都礼顿酒店举行，考核形式为闭卷测试，考试内容包括但不限于成都课堂培训的课程内容知识，全国共20名选手脱颖而出进入复赛。复赛由各区域主导开展，时间为7月17日-7月24日，评委由区域总经理及营运、市场、人力、财务负责人组成，主要考核内容涉及选手所在影城之综合管理，如营运管理、市场活动策划与组织，团队培养与文化建设，财务管理等。总决赛评委由总裁办、人力资源部、营运管理中心的评委构成，确保大赛公平、公正、公开、专业、严谨。8月4日下午，10名晋级总决赛的选手在广州礼顿酒店参加文件筐测试及非结构化面试考核。选手得分由初赛笔试成绩、复赛成绩、决赛成绩三部分构成，权重分别占20%、30%、50%。其中复赛成绩中，各赛区的第一名得30分，第二名及第三名得26分；决赛成绩中，文件筐书面成绩占60%，非结构化面试占40%。根据评分规则，评选出一、二、三等奖各一名，优秀奖7名。</p><h2>脱颖而出，实至名归</h2><p>以下为本次大赛的获奖名单，恭喜以下选手。</p><table class="definedtable"><tr><th>奖项</th><th>单位</th><th>姓名</th><th>影城</th></tr><tr><td>一等奖</td><td>东  区</td><td>袁超俊</td><td>嘉星摩尔店</td></tr><tr><td>二等奖</td><td>北  区</td><td>刘  巍</td><td>北京荟聚店</td></tr><tr><td>三等奖</td><td>南  区</td><td>吕熊茵</td><td>深圳民治店</td></tr><tr><td rowspan="7">优秀奖</td><td>东  区</td><td>苏雀珍</td><td>福州紫阳店</td></tr><tr><td>东  区</td><td>李  文</td><td>无锡哥伦布店</td></tr><tr><td>南  区</td><td>邱海燕</td><td>阳江名扬店</td></tr><tr><td>总部直管</td><td>吴浩英</td><td>中山古镇店</td></tr><tr><td>中 西 区</td><td>张莎莎</td><td>武汉中南店</td></tr><tr><td>总部直管</td><td>傅  亮</td><td>合肥新地店</td></tr><tr><td>北  区</td><td>宫  微</td><td>大连悦泰店</td></tr></table><p class="mt10">一等奖选手将获得奖金3000元以及IPad Mini一台，二等奖获得奖金2000元，三等奖获得奖金1000元，优秀奖获得奖金500元。所有选手都将获得精美的小蛮腰立体水晶内雕纪念品一份。</p><h2>再接再厉，再创辉煌</h2><p>8月4日19点，在广州礼顿酒店举办了隆重的颁奖典礼，总裁办总经理张钰致辞，张总指出：要在竞争如此激烈的影院行业中脱颖而出，必须要加强人才的培养与提升，提高影城的服务质量和硬件实力，以及创新管理模式。总部将集中所有的优势资源为影城做最好的后台供应和策略指引。同时，勉励选手以更长远和宏观的目光对自我进行定位，不断学习新知识，超越自己，全力以赴带领影城再创佳绩。</p><p>东区嘉星摩尔店副总经理袁超俊（2009年入职）和北区北京荟聚店副总经理刘巍（2012年入职）作为选手代表做参赛感言，他们回顾了在金逸工作的心路历程、培训经历、以及参赛以来的点滴感悟，对公司的感恩、感怀之情溢于言表。颁奖环节，总裁办总经理张钰、信息数据分析研究中心总监李权基、卖品部经理王岩、市场业务部市场经理莫伟为获奖者颁发获奖证书及纪念品，希望各位选手能充分将本次大赛的收获落实到日后的工作实践中，助力公司的未来发展，开创金逸发展新的篇章。大赛在热烈、感恩的气氛中圆满结束。</p><p>比赛花絮请扫描二维码观看哦</p><div><img class="ljycPin" src="http://www.jycinema.cn/frontUIWebapp/templates/default/jinyi/imgs/activity/qrds.png" alt=""></div>'
        }
    ];
});
