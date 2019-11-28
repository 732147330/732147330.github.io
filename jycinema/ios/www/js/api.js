/**
 * Created by xiongshengzhong on 16/8/28.
 */
// console.log(new Date().getTime())
var locals = {
  cur: 0,//0-正式环境，1-验证环境，其它-调试环境
  isMobile: true,
  version: '2019102202',
  divisionTime: '1571728630084',//1535523774014每次发布重新生成 new Date().getTime()
  urlList: [
    'http://www.jycinema.com',
    'http://sie-test.jycinema.com:6680',
    'http://private.jycinema.com',
    'https://www.jycinema.com',
    'http://192.168.40.101:8082',
    'http://192.168.27.92:8080',
    'http://192.168.29.39:8080'
  ],
  baseUrl: function () {
    return this.urlList[this.cur]
  },
  returnUrl: function () {
    if (this.baseUrl() == 'http://private.jycinema.com') {
      return 'http://www.jycinema.com/wapprivate'
    } else {
      return this.baseUrl() + '/wap'
    }
  },
  clearCache: function () {
    if (localStorage.cacheTime && this.divisionTime > localStorage.cacheTime) {
      localStorage.removeItem('cacheTime');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('currentCity');
    } else if (!localStorage.cacheTime && localStorage.userInfo) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('currentCity');
    }
  }
};
locals.clearCache();

app.constant('JYApi', {
  findFilms: locals.baseUrl() + '/frontUIWebapp/appserver/commonFilmService/findFilms',
  findCurrentFilm: locals.baseUrl() + '/frontUIWebapp/appserver/cinCinemaFilmViewService/findFilm',
  findSaafAreas: locals.baseUrl() + '/frontUIWebapp/appserver/commonSaafAreasService/findSaafAreas',
  findImages: locals.baseUrl() + '/frontUIWebapp/appserver/commonSaafImagesService/findImages',
  updateLikeUnLike: locals.baseUrl() + '/frontUIWebapp/appserver/commonFilmService/updateLikeUnLike',
  findActor: locals.baseUrl() + '/frontUIWebapp/appserver/commonCinActorMessageService/findActor',
  findCinPlanSeatDetails: locals.baseUrl() + '/frontUIWebapp/appserver/seatInformationMapService/findSeatMap',
  findFilmActor: locals.baseUrl() + '/frontUIWebapp/appserver/cinFilmActorServices/findFilmActor',
  findArticle: locals.baseUrl() + '/frontUIWebapp/appserver/commonArticleManagementService/findArticle',
  findAdvertisImageInfo: locals.baseUrl() + '/frontUIWebapp/appserver/cmsAdvertisementService/findAdvertisImageInfo',
  findCinema: locals.baseUrl() + '/frontUIWebapp/appserver/cinCinemaMessageService/findCinema',
  findArea: locals.baseUrl() + '/frontUIWebapp/appserver/commonSaafAreasService/findArea',
  findMember: locals.baseUrl() + '/frontUIWebapp/appserver/memberInfoServices/findMember',
  updateMember: locals.baseUrl() + '/frontUIWebapp/appserver/memberInfoServices/updateMember',
  findOrderDetailInfo: locals.baseUrl() + '/frontUIWebapp/appserver/orderDetailServices/findOrderDetailInfo',
  findOrder: locals.baseUrl() + '/frontUIWebapp/appserver/orderDetailServices/findOrder',
  findCmsFaqMessage: locals.baseUrl() + '/frontUIWebapp/appserver/PcCmsFaqMessageService/findCmsFaqMessage',
  findCmsNoticeMessage: locals.baseUrl() + '/frontUIWebapp/appserver/PcCmsNoticeMessageService/findCmsNoticeMessage',
  filmByCinema: locals.baseUrl() + '/frontUIWebapp/appserver/appFilmService/filmByCinema',
  findItemSku: locals.baseUrl() + '/frontUIWebapp/appserver/commonItemSkuService/findItemSku',
  findSaafAreasViewService: locals.baseUrl() + '/frontUIWebapp/appserver/saafAreasViewService/findSaafAreasViewService',
  findRechargeOrder: locals.baseUrl() + '/frontUIWebapp/appserver/orderService/findRechargeOrder',
  payurl: locals.baseUrl() + '/frontUIWebapp/appserver/pay/payurl',
  memberPay: locals.baseUrl() + '/frontUIWebapp/appserver/pay/memberPay',
  imageUpload: locals.baseUrl() + '/frontUIWebapp/appserver/file/imageUpload',
  findCmsFaqMessage2: locals.baseUrl() + '/frontUIWebapp/appserver/PcCmsFaqMessageService/findCmsFaqMessage',
  appItemSkuService: locals.baseUrl() + '/frontUIWebapp/appserver/appItemSkuService/findCinema',
  MemberFootprint: locals.baseUrl() + '/frontUIWebapp/appserver/memberFootprintService/MemberFootprint',
  findCmsPushMessageRecord: locals.baseUrl() + '/frontUIWebapp/appserver/cmsPushMessageRecordService/findCmsPushMessageRecord',
  rechargeOrder: locals.baseUrl() + '/frontUIWebapp/appserver/orderService/rechargeOrder',
  bookingTickets: locals.baseUrl() + '/frontUIWebapp/appserver/orderService/bookingTickets',
  goodsOrder: locals.baseUrl() + '/frontUIWebapp/appserver/orderService/goodsOrder',
  getNotifyUrl: locals.baseUrl() + '/frontUIWebapp/appserver/pay/getNotifyUrl',
  getWechatUserinfo: locals.baseUrl() + '/FrontInterfaceApp/frontServer/wxlogin/userinfo',
  getSinaUserinfo: locals.baseUrl() + '/FrontInterfaceApp/frontServer/sinalogin/userinfo',
  uploadUserPic: locals.baseUrl() + '/JinYiApp/restServer/file/upload',
  getTicket: locals.baseUrl() + '/frontUIWebapp/appserver/pay/ticket',
  findLookupCode: locals.baseUrl() + '/frontUIWebapp/appserver/saafLookupValuesService/findLookupCode',
  changePassword: locals.baseUrl() + '/frontUIWebapp/appserver/memberInfoServices/updateMemberPasswordForApp',
  checkVCode: locals.baseUrl() + '/frontUIWebapp/appserver/memberInfoServices/checkVCode',
  updateMemberMobileNumber: locals.baseUrl() + '/frontUIWebapp/appserver/memberInfoServices/updateMemberMobileNumber',
  createMember: locals.baseUrl() + '/frontUIWebapp/appserver/commonRegisterService/createMember',
  sendMg: locals.baseUrl() + '/frontUIWebapp/appserver/photoMessageService/newsSendMessage',
  login: locals.baseUrl() + '/frontUIWebapp/appserver/commonLoginService/login',
  logout: locals.baseUrl() + '/frontUIWebapp/appserver/commonLoginService/logout',
  bindingMemberCard: locals.baseUrl() + '/frontUIWebapp/appserver/memberCardInfoService/bindingMemberCard',
  createImage: locals.baseUrl() + '/frontUIWebapp/appserver/validateCodeService/createImage',
  checkCode: locals.baseUrl() + '/frontUIWebapp/appserver/validateCodeService/checkCode',
  forgetPassword: locals.baseUrl() + '/frontUIWebapp/appserver/memberInfoServices/forgetPassword',
  save: locals.baseUrl() + '/frontUIWebapp/appserver/csdComplaintMessageService/save',
  loginAPP: locals.baseUrl() + '/frontUIWebapp/appserver/wxLogin/loginAPP',
  loginQqAPP: locals.baseUrl() + '/frontUIWebapp/appserver/qqLogin/loginAPP',
  loginSinaAPP: locals.baseUrl() + '/frontUIWebapp/appserver/sinaLogin/loginAPP',
  cancelOrder: locals.baseUrl() + '/frontUIWebapp/appserver/orderService/cancelOrder',
  checkPhoneNumber: locals.baseUrl() + '/frontUIWebapp/appserver/memberInfoServices/checkPhoneNumber',
  checkPhoneNum: locals.baseUrl() + '/frontUIWebapp/appserver/photoMessageService/checkPhoneNum',
  checkNumber: locals.baseUrl() + '/frontUIWebapp/appserver/memberInfoServices/checkNumber',
  updateReceivePhoneNumber: locals.baseUrl() + '/frontUIWebapp/appserver/orderService/updateReceivePhoneNumber',
  findVersion: locals.baseUrl() + '/frontUIWebapp/appserver/saafProductVersionService/findVersion',
  updateMemberCardInfo: locals.baseUrl() + '/frontUIWebapp/appserver/orderService/updateMemberCardInfo',
  qqlogin: locals.baseUrl() + '/FrontInterfaceApp/frontServer/qqlogin/userinfo',
  updateMobileNumber: locals.baseUrl() + '/frontUIWebapp/appserver/memberInfoServices/updateMobileNumber',
  findExtLoginAccess: locals.baseUrl() + '/frontUIWebapp/appserver/extLoginAccessService/findExtLoginAccess',
  unbundling: locals.baseUrl() + '/frontUIWebapp/appserver/commonThird/unbundling',
  findMyVoucher: locals.baseUrl() + '/frontUIWebapp/appserver/memberVoucherService/findMyVoucher',
  refund: locals.baseUrl() + '/frontUIWebapp/appserver/commonOrderService/refund',
  queryActivityInfo: locals.baseUrl() + '/frontUIWebapp/appserver/appActivityService/queryActivityInfo',
  findVouLifetime: locals.baseUrl() + '/frontUIWebapp/appserver/vouLifetimeService/findVouLifetime',
  updateVoucherMember: locals.baseUrl() + '/frontUIWebapp/appserver/vouLifetimeService/updateVoucherMember',
  checkSeatsRule: locals.baseUrl() + '/frontUIWebapp/appserver/appActivityService/checkSeatsRule',
  findActivityGuidanceInfo: locals.baseUrl() + '/frontUIWebapp/appserver/activityGuidanceService/findActivityGuidanceInfo',
  findItemGood: locals.baseUrl() + '/frontUIWebapp/appserver/commonItemSkuService/findItemGood',
  findGoodsOrder: locals.baseUrl() + '/frontUIWebapp/appserver/orderDetailServices/findGoodsOrder',
  findItemGiftCard: locals.baseUrl() + '/frontUIWebapp/appserver/itemGiftCardServices/findGiftCard',
  updateItemGiftCard: locals.baseUrl() + '/frontUIWebapp/appserver/itemGiftCardServices/updateItemGiftCard',
  loginAPPNew: locals.baseUrl() + '/frontUIWebapp/appserver/wxLoginNewService/loginAPPNew',
  saveLytTxn: locals.baseUrl() + '/frontUIWebapp/appserver/lytTxnService/save',
  zeroPay: locals.baseUrl() + '/frontUIWebapp/appserver/pay/zeroPay',
  findCinemaBySku: locals.baseUrl() + '/frontUIWebapp/appserver/itemSkuCopyServices/findCinemaBySku',
  mallActivityInfo: locals.baseUrl() + '/frontUIWebapp/appserver/appActivityService/mallActivityInfo',
  findLytMmbLevelL: locals.baseUrl() + '/frontUIWebapp/appserver/lytMmbLevelService/findLytMmbLevelL',
  findLytLevel: locals.baseUrl() + '/frontUIWebapp/appserver/lytLevelService/findLytLevel',
  findLytTxnPointValue: locals.baseUrl() + '/frontUIWebapp/appserver/lytTxnPointValueService/findLytTxnPointValue',
  queryMember: locals.baseUrl() + '/frontUIWebapp/appserver/lytMmbPointValueService/query',
  sessionGoodsActivityInfo: locals.baseUrl() + '/frontUIWebapp/appserver/appActivityService/sessionGoodsActivityInfo',
  findConfirmOrderPage: locals.baseUrl() + '/frontUIWebapp/appserver/orderDetailServices/findConfirmOrderPage',
  findQuestionHeader: locals.baseUrl() + '/frontUIWebapp/appserver/cmsSurveyQuestionService/findQuestionHeader',
  findQuestionChoice: locals.baseUrl() + '/frontUIWebapp/appserver/cmsSurveyQuestionService/findQuestionChoice',
  saveQuestionResult: locals.baseUrl() + '/frontUIWebapp/appserver/cmsSurveyQuestionService/saveQuestionResult',

  findItemCat: locals.baseUrl() + '/frontUIWebapp/appserver/itemCatServices/findItemCat',
  findIrs: locals.baseUrl() + '/frontUIWebapp/appserver/itemRecommendSkuServices/findIrs',
  findIrt: locals.baseUrl() + '/frontUIWebapp/appserver/itemRecommendTypeServices/findIrt',
  findItemSkuCopy: locals.baseUrl() + '/frontUIWebapp/appserver/itemSkuCopyServices/findItemSkuCopy',
  findIc: locals.baseUrl() + '/frontUIWebapp/appserver/itemCatServices/findIc',
  findItemPropValues: locals.baseUrl() + '/frontUIWebapp/appserver/itemPropValuesServices/findItemPropValues',
  findItemSpecIndex: locals.baseUrl() + '/frontUIWebapp/appserver/itemSpecIndexServices/findItemSpecIndex',
  findItemNatureProps: locals.baseUrl() + '/frontUIWebapp/appserver/itemNaturePropsServices/findItemNatureProps',
  findDerivativeOrders: locals.baseUrl() + '/frontUIWebapp/appserver/orderDetailServices/findDerivativeOrders',
  applyForRefund: locals.baseUrl() + '/frontUIWebapp/appserver/mallOrderServices/applyForRefund',
  cancelOnlineOrder: locals.baseUrl() + '/frontUIWebapp/appserver/mallOrderServices/cancelOnlineOrder',

  findMoreRigghts: locals.baseUrl() + '/frontUIWebapp/appserver/equitycardInfoService/findEquitycardInfo',
  findCardList: locals.baseUrl() + '/frontUIWebapp/appserver/memberCardInfoService/findCardList',
    findRightsCardDetail:  locals.baseUrl() + '/frontUIWebapp/appserver/equitycardInfoService/findEquitycardInfo',
    saveEquitycard:  locals.baseUrl() + '/frontUIWebapp/appserver/equitycardInfoService/saveEquitycard',

    updateEquitycardInfo: locals.baseUrl() + '/frontUIWebapp/appserver/equitycardInfoService/updateEquitycardInfo',
  addShopsToCart: locals.baseUrl() + '/frontUIWebapp/appserver/ordTradeCartServices/addShopsToCart',
  findCartInfo: locals.baseUrl() + '/frontUIWebapp/appserver/ordTradeCartServices/findCartInfo',
  updateCartInfo: locals.baseUrl() + '/frontUIWebapp/appserver/ordTradeCartServices/updateCartInfo',
  deleteShopsFromCart: locals.baseUrl() + '/frontUIWebapp/appserver/ordTradeCartServices/deleteShopsFromCart',
  mallOrders: locals.baseUrl() + '/frontUIWebapp/appserver/mallOrderServices/mallOrders',
  getFindItemSpecIndex: locals.baseUrl() + '/frontUIWebapp/appserver/itemSpecIndexServices/findItemSpecIndex',
  findMemberAddress: locals.baseUrl() + '/frontUIWebapp/appserver/memberAddressServices/findMemberAddress',
  saveMemberAddress: locals.baseUrl() + '/frontUIWebapp/appserver/memberAddressServices/saveMemberAddress',
  updateMemberAddress: locals.baseUrl() + '/frontUIWebapp/appserver/memberAddressServices/updateMemberAddress',
  deleteMemberAddress: locals.baseUrl() + '/frontUIWebapp/appserver/memberAddressServices/deleteMemberAddress',
  updateCmsPushMessageRecord: locals.baseUrl() + '/frontUIWebapp/appserver/cmsPushMessageRecordService/updateCmsPushMessageRecord',
  updateEquitycardStatus: locals.baseUrl() + '/frontUIWebapp/appserver/equitycardInfoService/updateEquitycardStatus',
  updateLifeTimeStatus: locals.baseUrl() + '/frontUIWebapp/appserver/vouLifetimeService/updateLifeTimeStatus',
  saveVista: locals.baseUrl() + '/frontUIWebapp/appserver/lytTxnPointValueService/saveOrUpdateVista',
  findLotteryPageConfig: locals.baseUrl() + '/frontUIWebapp/appserver/lotteryPageConfigServices/findLotteryPageConfig',
  startDrawLottery: locals.baseUrl() + '/frontUIWebapp/appserver/calculateLotteryServices/startDrawLottery',
  findLotteryDrawGuidance: locals.baseUrl() + '/frontUIWebapp/appserver/lotteryDrawGuidanceServices/findLotteryDrawGuidance',
  shareActivity: locals.baseUrl() + '/frontUIWebapp/appserver/shareActivityService/shareActivity',

  //签到
  findActionHistory: locals.baseUrl() + '/frontUIWebapp/appserver/memberActionHistoryService/findActionHistory',
  saveActionHistory: locals.baseUrl() + '/frontUIWebapp/appserver/memberActionHistoryService/saveActionHistory',
  findPlan: locals.baseUrl() + '/frontUIWebapp/appserver/lytPlanService/findPlan',
  findAllPlan: locals.baseUrl() + '/frontUIWebapp/appserver/lytPlanService/findAllPlan',
  syncMmbInfo: locals.baseUrl() + '/frontUIWebapp/appserver/lytTxnService/syncMmbInfo',
  //影评
  saveCommentFilmDetail: locals.baseUrl() + '/frontUIWebapp/appserver/cmtFilmDetailService/saveCommentFilmDetail',
  findCommentFilmDetail: locals.baseUrl() + '/frontUIWebapp/appserver/cmtFilmDetailService/findCommentFilmDetail',
  findCmtFanFollowP: locals.baseUrl() + '/frontUIWebapp/appserver/cmtFanFollowService/findCmtFanFollowP',
  deleteCmtFanFollowP: locals.baseUrl() + '/frontUIWebapp/appserver/cmtFanFollowService/deleteCmtFanFollowP',
  saveCmtFanFollowP: locals.baseUrl() + '/frontUIWebapp/appserver/cmtFanFollowService/saveCmtFanFollowP',
  findCommentCount: locals.baseUrl() + '/frontUIWebapp/appserver/cmtFilmDetailService/findCommentCount',
  updateCommentFilmDetail: locals.baseUrl() + '/frontUIWebapp/appserver/cmtFilmDetailService/updateCommentFilmDetail',
  saveCommentReport: locals.baseUrl() + '/frontUIWebapp/appserver/cmtReportService/saveCommentReport',
  findFanOrFollowCount: locals.baseUrl() + '/frontUIWebapp/appserver/cmtFanFollowService/findFanOrFollowCount',
  findPersonCenter: locals.baseUrl() + '/frontUIWebapp/appserver/cmtFilmDetailService/findPersonCenter',
  findArt: locals.baseUrl() + '/frontUIWebapp/appserver/commonArticleManagementService/findArt',
  findMemberInfo: locals.baseUrl() + '/frontUIWebapp/appserver/memberInfoServices/findMemberInfo',
  findFilmMessage: locals.baseUrl() + '/frontUIWebapp/appserver/cinCinemaFilmViewService/findFilmMessage',
  updateFabulous: locals.baseUrl() + '/frontUIWebapp/appserver/commonArticleManagementService/updateFabulous',
  findBlackWhiteListL: locals.baseUrl() + '/frontUIWebapp/appserver/lytMmbBlackWhiteListService/findBlackWhiteListL',
  findMallProductList: locals.baseUrl() + '/frontUIWebapp/appserver/itemProductListServices/findMallProductList',
  findScheduleProductList: locals.baseUrl() + '/frontUIWebapp/appserver/itemProductListServices/findScheduleProductList',
  findProvinceCityArea: locals.baseUrl() + '/frontUIWebapp/appserver/commonSaafAreasService/findProvinceCityArea',
  findPostFee: locals.baseUrl() + '/frontUIWebapp/appserver/mallOrderServices/findPostFee',
  findKdniaoTrackQuery: locals.baseUrl() + '/frontUIWebapp/appserver/kdniaoTrackQueryService/findKdniaoTrackQuery',
  updateLogisticsInfo: locals.baseUrl() + '/frontUIWebapp/appserver/mallOrderServices/updateLogisticsInfo',
  findDeliverySchedule: locals.baseUrl() + '/frontUIWebapp/appserver/orderDetailServices/findDeliverySchedule',
  //扫码
  updateTelphone: locals.baseUrl() + '/frontUIWebapp/appserver/memberInfoServices/updateTelphone',
  lockSeatLogin: locals.baseUrl() + '/frontUIWebapp/appserver/commonLoginService/lockSeatLogin',
  //wap微信分享
  generateConfigSignature: locals.baseUrl() + '/FrontInterfaceApp/frontServer/thirdCommonServives/generateConfigSignature',
  shareInfo: locals.baseUrl() + '/frontUIWebapp/appserver/shareInviteRecordService/shareInfo',
  //领取中心
  receiveGift: locals.baseUrl() + '/frontUIWebapp/appserver/receivingCenterService/receiveGift',
  findReceivingCenterInfo: locals.baseUrl() + '/frontUIWebapp/appserver/receivingCenterService/findReceivingCenterInfo',
  //苹果商店评分
  findSpecialControlRecord: locals.baseUrl() + '/frontUIWebapp/appserver/specialControlRecordService/findSpecialControlRecord',
  saveSpecialControlRecord: locals.baseUrl() + '/frontUIWebapp/appserver/specialControlRecordService/saveSpecialControlRecord',
  //更新观影次数
  updateCinTrailerViewTimes: locals.baseUrl() + '/frontUIWebapp/appserver/commonSaafImagesService/updateCinTrailerViewTimes',
  findCuxMemCinmeasInfo: locals.baseUrl() + '/frontUIWebapp/appserver/cuxMemCinmeasService/findCuxMemCinmeasInfo',
  //员工扫码
  findCardTypeInfo: locals.baseUrl() + '/frontUIWebapp/appserver/mallOrderServices/findCardTypeInfo',
  scanCodeCreateCardOrders: locals.baseUrl() + '/frontUIWebapp/appserver/mallOrderServices/scanCodeCreateCardOrders',
  //
  findMyVouLifetimeCount: locals.baseUrl() + '/frontUIWebapp/appserver/vouLifetimeService/findMyVouLifetimeCount',
  findSpecialSkuPageInfo: locals.baseUrl() + '/frontUIWebapp/appserver/commonItemSkuService/findSpecialSkuPageInfo',
  //请求会员卡信息
  getCardInfo: locals.baseUrl() + '/frontUIWebapp/appserver/memberCardInfoService/getCardInfo',
  //每日一题
  findQuestionInfos: locals.baseUrl() + '/frontUIWebapp/appserver/questionAndAnswerService/findQuestionInfos',
  submitAnswerResults: locals.baseUrl() + '/frontUIWebapp/appserver/questionAndAnswerService/submitAnswerResults',
  //猜你喜欢
  findRecommend: locals.baseUrl() + '/frontUIWebapp/appserver/itemRecommendSkuServices/findRecommend',
  findRecommendGoods: locals.baseUrl() + '/frontUIWebapp/appserver/itemRecommendSkuServices/findRecommendGoods',
  //内部员工二维码
  findInvitedCode: locals.baseUrl() + '/frontUIWebapp/appserver/memberActionHistoryService/findInvitedCode',
  //

  //领券中心
  findReceiveVoucherInfo: locals.baseUrl() + '/frontUIWebapp/appserver/activityReceiveVoucherSevice/findReceiveVoucherInfo',
  giveReceiveVoucher: locals.baseUrl() + '/frontUIWebapp/appserver/activityReceiveVoucherSevice/giveReceiveVoucher',

  findCmsFaqMessageReve: locals.baseUrl() + '/frontUIWebapp/appserver/PcCmsFaqMessageService/findCmsFaqMessageReve',
  findJy: locals.baseUrl() + '/frontUIWebapp/appserver/commonArticleManagementService/findJy',
  findCsdComplaintMess: locals.baseUrl() + '/frontUIWebapp/appserver/csdComplaintMessageService/findCsdComplaintMess',

  getTime: locals.baseUrl() + '/frontUIWebapp/appserver/commonItemSkuService/getTime',

  findGrowthVale: locals.baseUrl() + '/frontUIWebapp/appserver/equitycardInfoService/findGrowthValue',
  findTreasureChest: locals.baseUrl() + '/frontUIWebapp/appserver/equitycardInfoService/findTreasureChest',

});
