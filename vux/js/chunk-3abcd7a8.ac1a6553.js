(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3abcd7a8"],{"409d":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,'\n.vux-1px, .vux-1px-t, .vux-1px-b, .vux-1px-tb, .vux-1px-l, .vux-1px-r {\n  position: relative;\n}\n.vux-1px:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 200%;\n  border: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  height: 200%;\n  transform-origin: left top;\n  transform: scale(0.5);\n}\n.vux-1px-t:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.vux-1px-b:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.vux-1px-tb:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.vux-1px-tb:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.vux-1px-l:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-left: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 0;\n  transform: scaleX(0.5);\n}\n.vux-1px-r:after {\n  content: " ";\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-right: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 100% 0;\n  transform: scaleX(0.5);\n}\n.vux-center-v, .vux-center-h, .vux-center {\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n}\n.vux-center-v, .vux-center {\n  -ms-flex-align: center;\n      align-items: center;\n}\n.vux-center-h, .vux-center {\n  -ms-flex-pack: center;\n      justify-content: center;\n}\n/*@c buttonTab {*/\n/*@d wrap {*/\n/*}*/\n/*}*/\n.box {\n  padding: 15px;\n}\n.active-6-1 {\n  color: #fc378c !important;\n  border-color: #fc378c !important;\n}\n.active-6-2 {\n  color: #04be02 !important;\n  border-color: #04be02 !important;\n}\n.active-6-3 {\n  color: #37aefc !important;\n  border-color: #37aefc !important;\n}\n.tab-swiper {\n  background-color: #fff;\n  height: 100px;\n}\n',""])},7611:function(t,e,n){var i=n("409d");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("499e").default;o("48c69053",i,!0,{})},c580:function(t,e,n){"use strict";n.r(e);var i=n("4009"),o=n("9f50"),a=n("62f7"),c=n("c0f1"),r=n("3d68"),d=n("0db8"),s=n("3940"),l=function(){return["精选","美食","电影","酒店","外卖"]},b=(i["a"],o["a"],a["a"],c["a"],r["a"],d["a"],s["a"],function(){return["精选","美食","电影","酒店","外卖"]}),m={components:{Tab:i["a"],TabItem:o["a"],Sticky:a["a"],Divider:c["a"],XButton:r["a"],Swiper:d["a"],SwiperItem:s["a"]},methods:{switchTabItem:function(t){var e=this;console.log("on-before-index-change",t),this.$vux.loading.show({text:"加载中"}),setTimeout(function(){e.$vux.loading.hide(),e.index01=t},1e3)},onItemClick:function(t){console.log("on item click:",t)},addTab:function(){this.list2.length<5&&(this.list2=b().slice(0,this.list2.length+1))},removeTab:function(){this.list2.length>1&&(this.list2=b().slice(0,this.list2.length-1))},next:function(){this.index===this.list2.length-1?this.index=0:++this.index},prev:function(){0===this.index?this.index=this.list2.length-1:--this.index},copyCodeMethod:function(){var t=setInterval(function(){var e=document.getElementById("codeText");e.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(t)},500)},copyCode01:function(){this.tempCode='    tab\n      tab-item(selected, @on-item-click="onItemClick") 已发货\n      tab-item(@on-item-click="onItemClick") 未发货\n      tab-item(@on-item-click="onItemClick") 全部订单\n',this.copyCodeMethod()},copyCode02:function(){this.tempCode='    tab(bar-position="top")\n      tab-item(selected, @on-item-click="onItemClick") 已发货\n      tab-item(@on-item-click="onItemClick") 未发货\n      tab-item(@on-item-click="onItemClick") 全部订单',this.copyCodeMethod()},copyCode03:function(){this.tempCode=' divider 手动切换(加载)\n    tab(v-model="index01", prevent-default, @on-before-index-change="switchTabItem")\n      tab-item(selected) 已发货\n      tab-item  未发货\n      tab-item 全部订单',this.copyCodeMethod()},copyCode04:function(){this.tempCode='  divider 定义bar固定宽度\n    tab(:line-width="1", custom-bar-width="60px")\n      tab-item(selected) 已发货\n      tab-item 未发货\n      tab-item 全部订单',this.copyCodeMethod()},copyCode05:function(){this.tempCode='   divider 使用函数定义bar宽度\n    tab(:line-width="1", :custom-bar-width="getBarWidth")\n      tab-item(selected) AA\n      tab-item AAAA\n      tab-item AAAAAAA',this.copyCodeMethod()},copyCode06:function(){this.tempCode='  divider 设置bar颜色\n    tab(bar-active-color="#668599", :line-width="1")\n      tab-item  已发货\n      tab-item(selected) 未发货\n      tab-item 全部订单\n      tab-item 全部订单\n      tab-item 全部订单',this.copyCodeMethod()},copyCode07:function(){this.tempCode='  divider 不同种类状态\n    tab(:animate="false")\n      tab-item(active-class="active-6-1") 已发货\n      tab-item(active-class="active-6-2", selected) 未发货\n      tab-item(active-class="active-6-3") 全部订单',this.copyCodeMethod()},copyCode08:function(){this.tempCode='    divider 没有动画效果\n    tab(:animate="false")\n      tab-item  已发货\n      tab-item(selected)  未发货\n      tab-item  全部订单',this.copyCodeMethod()},copyCode09:function(){this.tempCode="    divider 无法选中\n    tab\n      tab-item(selected) A\n      tab-item B\n      tab-item(disabled) Disabled",this.copyCodeMethod()},copyCode10:function(){this.tempCode=' divider 选项状态\n    tab\n      tab-item(selected, badge-label="1") 收到的消息\n      tab-item(badge-background="#38C972", badge-color="#fff", badge-label="2") 发出的消息\n',this.copyCodeMethod()},copyCode11:function(){this.tempCode='  divider 滚动效果\n    tab\n      tab-item(v-for="n in 8", :key="n", :selected="n===1") 已发货{{ n }}',this.copyCodeMethod()},copyCode12:function(){this.tempCode='    divider 滚动门槛\n    tab(:scroll-threshold="5")\n      tab-item(v-for="n in 5", :key="n", :selected="n===1") 已发货{{ n }}',this.copyCodeMethod()},copyCode13:function(){this.tempCode='    div\n      tab(:line-width=2, active-color=\'#fc378c\', v-model="index")\n        tab-item(class="vux-center", :selected="demo2 === item", v-for="(item, index) in list2", @click="demo2 = item", :key="index") {{item}}\n      swiper(v-model="index", height="100px", :show-dots="false")\n        swiper-item(v-for="(item, index) in list2", :key="index")\n          div(class="tab-swiper vux-center") {{item}} Container\n    br\n    div.box\n      x-button(@click.native="index=0", :disabled="index === 0", type="primary") go to 0\n      x-button(@click.native="index=1", :disabled="index === 1", type="primary") go to 1\n      x-button(@click.native="addTab", :disabled="list2.length === 5", type="primary") Add tab item\n      x-button(@click.native="removeTab", :disabled="list2.length <= 2", type="primary") Remove tab item\n      x-button(@click.native="next", type="primary") 下一页  当前页: {{index}}\n      x-button(@click.native="prev", type="primary") 上一页  当前页: {{index}}',this.copyCodeMethod()},copyCode14:function(){this.tempCode='   tab(:line-width="2")\n      tab-item(:selected="demo3 === item", v-for="(item, index) in list3", :class="{\'vux-1px-r\': index===0}", @click="demo3 = item", :key="index") {{item}}',this.copyCodeMethod()},copyCode15:function(){this.tempCode='   sticky(scroll-box="vux_view_box_body", :check-sticky-support="false", :offset="46")\n      tab(:line-width=1)\n        tab-item(:selected="demo4 === item", v-for="(item, index) in list4", @click="demo4 = item", :key="index") {{item}}',this.copyCodeMethod()},copyCode16:function(){this.tempCode=" import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'\n  const list = () => ['精选', '美食', '电影', '酒店', '外卖']\n  export default {\n    components:  { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem },\n    methods: {\n      switchTabItem (index) {\n        console.log('on-before-index-change', index)\n        this.$vux.loading.show({\n          text: '加载中'\n        })\n        setTimeout(() => {\n          this.$vux.loading.hide()\n          this.index01 = index\n        }, 1000)\n      },\n      onItemClick (index) {\n        console.log('on item click:', index)\n      },\n      addTab () {\n        if (this.list2.length < 5) {\n          this.list2 = list().slice(0, this.list2.length + 1)\n        }\n      },\n      removeTab () {\n        if (this.list2.length > 1) {\n          this.list2 = list().slice(0, this.list2.length - 1)\n        }\n      },\n      next () {\n        if (this.index === this.list2.length - 1) {\n          this.index = 0\n        } else {\n          ++this.index\n        }\n      },\n      prev () {\n        if (this.index === 0) {\n          this.index = this.list2.length - 1\n        } else {\n          --this.index\n        }\n      },\n    },\n    data() {\n      return {\n        index01: 0,\n        list2: list(),\n        demo2: '美食',\n        list3: ['收到的消息', '发出的消息'],\n        demo3: '收到的消息',\n        list4: ['正在放映', '即将上映'],\n        demo4: '即将上映',\n        demoDisabled: 'A',\n        index: 0,\n        getBarWidth: function (index) {\n          return (index + 1) * 22 + 'px'\n        }\n      }\n    },\n  }",this.copyCodeMethod()},copyCode17:function(){this.tempCode="  @import '../../../plugins/vux/src/styles/1px.less';\n  @import '../../../plugins/vux/src/styles/center.less';\n\n  .box {\n    padding: 15px;\n  }\n  .active-6-1 {\n    color: rgb(252, 55, 140) !important;\n    border-color: rgb(252, 55, 140) !important;\n  }\n  .active-6-2 {\n    color: #04be02 !important;\n    border-color: #04be02 !important;\n  }\n  .active-6-3 {\n    color: rgb(55, 174, 252) !important;\n    border-color: rgb(55, 174, 252) !important;\n  }\n  .tab-swiper {\n    background-color: #fff;\n    height: 100px;\n  }",this.copyCodeMethod()}},data:function(){return{tempCode:"",index01:0,list2:b(),demo2:"美食",list3:["收到的消息","发出的消息"],demo3:"收到的消息",list4:["正在放映","即将上映"],demo4:"即将上映",demoDisabled:"A",index:0,getBarWidth:function(t){return 22*(t+1)+"px"}}}},p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"buttonTab__wrap"},[n("tab",[n("tab-item",{attrs:{selected:"selected"},on:{"on-item-click":t.onItemClick}},[t._v("已发货")]),n("tab-item",{on:{"on-item-click":t.onItemClick}},[t._v("未发货")]),n("tab-item",{on:{"on-item-click":t.onItemClick}},[t._v("全部订单")])],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode01()}}},[t._v("复制代码")]),n("br"),n("br"),n("tab",{attrs:{"bar-position":"top"}},[n("tab-item",{attrs:{selected:"selected"},on:{"on-item-click":t.onItemClick}},[t._v("已发货")]),n("tab-item",{on:{"on-item-click":t.onItemClick}},[t._v("未发货")]),n("tab-item",{on:{"on-item-click":t.onItemClick}},[t._v("全部订单")])],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode02()}}},[t._v("复制代码")]),n("br"),n("br"),n("divider",[t._v("手动切换(加载)")]),n("tab",{attrs:{"prevent-default":"prevent-default"},on:{"on-before-index-change":t.switchTabItem},model:{value:t.index01,callback:function(e){t.index01=e},expression:"index01"}},[n("tab-item",{attrs:{selected:"selected"}},[t._v("已发货")]),n("tab-item",[t._v(" 未发货")]),n("tab-item",[t._v("全部订单")])],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode03()}}},[t._v("复制代码")]),n("br"),n("br"),n("divider",[t._v("定义bar固定宽度")]),n("tab",{attrs:{"line-width":1,"custom-bar-width":"60px"}},[n("tab-item",{attrs:{selected:"selected"}},[t._v("已发货")]),n("tab-item",[t._v("未发货")]),n("tab-item",[t._v("全部订单")])],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode04()}}},[t._v("复制代码")]),n("br"),n("br"),n("divider",[t._v("使用函数定义bar宽度")]),n("tab",{attrs:{"line-width":1,"custom-bar-width":t.getBarWidth}},[n("tab-item",{attrs:{selected:"selected"}},[t._v("AA")]),n("tab-item",[t._v("AAAA")]),n("tab-item",[t._v("AAAAAAA")])],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode05()}}},[t._v("复制代码")]),n("br"),n("br"),n("divider",[t._v("设置bar颜色")]),n("tab",{attrs:{"bar-active-color":"#668599","line-width":1}},[n("tab-item",[t._v(" 已发货")]),n("tab-item",{attrs:{selected:"selected"}},[t._v("未发货")]),n("tab-item",[t._v("全部订单")]),n("tab-item",[t._v("全部订单")]),n("tab-item",[t._v("全部订单")])],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode06()}}},[t._v("复制代码")]),n("br"),n("br"),n("br"),n("divider",[t._v("不同种类状态")]),n("tab",{attrs:{animate:!1}},[n("tab-item",{attrs:{"active-class":"active-6-1"}},[t._v("已发货")]),n("tab-item",{attrs:{"active-class":"active-6-2",selected:"selected"}},[t._v("未发货")]),n("tab-item",{attrs:{"active-class":"active-6-3"}},[t._v("全部订单")])],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode07()}}},[t._v("复制代码")]),n("br"),n("br"),n("br"),n("divider",[t._v("没有动画效果")]),n("tab",{attrs:{animate:!1}},[n("tab-item",[t._v(" 已发货")]),n("tab-item",{attrs:{selected:"selected"}},[t._v(" 未发货")]),n("tab-item",[t._v(" 全部订单")])],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode08()}}},[t._v("复制代码")]),n("br"),n("br"),n("br"),n("divider",[t._v("无法选中")]),n("tab",[n("tab-item",{attrs:{selected:"selected"}},[t._v("A")]),n("tab-item",[t._v("B")]),n("tab-item",{attrs:{disabled:"disabled"}},[t._v("Disabled")])],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode09()}}},[t._v("复制代码")]),n("br"),n("br"),n("br"),n("divider",[t._v("选项状态")]),n("tab",[n("tab-item",{attrs:{selected:"selected","badge-label":"1"}},[t._v("收到的消息")]),n("tab-item",{attrs:{"badge-background":"#38C972","badge-color":"#fff","badge-label":"2"}},[t._v("发出的消息")])],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode10()}}},[t._v("复制代码")]),n("br"),n("br"),n("br"),n("divider",[t._v("滚动效果")]),n("tab",t._l(8,function(e){return n("tab-item",{key:e,attrs:{selected:1===e}},[t._v("已发货"+t._s(e))])})),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode11()}}},[t._v("复制代码")]),n("br"),n("br"),n("br"),n("divider",[t._v("滚动门槛")]),n("tab",{attrs:{"scroll-threshold":5}},t._l(5,function(e){return n("tab-item",{key:e,attrs:{selected:1===e}},[t._v("已发货"+t._s(e))])})),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode12()}}},[t._v("复制代码")]),n("br"),n("br"),n("br"),n("div",[n("tab",{attrs:{"line-width":2,"active-color":"#fc378c"},model:{value:t.index,callback:function(e){t.index=e},expression:"index"}},t._l(t.list2,function(e,i){return n("tab-item",{key:i,staticClass:"vux-center",attrs:{selected:t.demo2===e},on:{click:function(n){t.demo2=e}}},[t._v(t._s(e))])})),n("swiper",{attrs:{height:"100px","show-dots":!1},model:{value:t.index,callback:function(e){t.index=e},expression:"index"}},t._l(t.list2,function(e,i){return n("swiper-item",{key:i},[n("div",{staticClass:"tab-swiper vux-center"},[t._v(t._s(e)+" Container")])])}))],1),n("br"),n("div",{staticClass:"box"},[n("x-button",{attrs:{disabled:0===t.index,type:"primary"},nativeOn:{click:function(e){t.index=0}}},[t._v("go to 0")]),n("x-button",{attrs:{disabled:1===t.index,type:"primary"},nativeOn:{click:function(e){t.index=1}}},[t._v("go to 1")]),n("x-button",{attrs:{disabled:5===t.list2.length,type:"primary"},nativeOn:{click:function(e){return t.addTab(e)}}},[t._v("Add tab item")]),n("x-button",{attrs:{disabled:t.list2.length<=2,type:"primary"},nativeOn:{click:function(e){return t.removeTab(e)}}},[t._v("Remove tab item")]),n("x-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.next(e)}}},[t._v("下一页  当前页: "+t._s(t.index))]),n("x-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.prev(e)}}},[t._v("上一页  当前页: "+t._s(t.index))])],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode13()}}},[t._v("复制代码")]),n("br"),n("br"),n("tab",{attrs:{"line-width":2}},t._l(t.list3,function(e,i){return n("tab-item",{key:i,class:{"vux-1px-r":0===i},attrs:{selected:t.demo3===e},on:{click:function(n){t.demo3=e}}},[t._v(t._s(e))])})),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode14()}}},[t._v("复制代码")]),n("br"),n("br"),n("br"),n("sticky",{attrs:{"scroll-box":"vux_view_box_body","check-sticky-support":!1,offset:46}},[n("tab",{attrs:{"line-width":1}},t._l(t.list4,function(e,i){return n("tab-item",{key:i,attrs:{selected:t.demo4===e},on:{click:function(n){t.demo4=e}}},[t._v(t._s(e))])}))],1),t._l(10,function(t){return n("br")}),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode15()}}},[t._v("复制代码")]),n("x-button",{attrs:{mini:"mini",plain:"plain"},nativeOn:{click:function(e){t.copyCode16()}}},[t._v("复制js代码")]),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"warn"},nativeOn:{click:function(e){t.copyCode17()}}},[t._v("复制css代码")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:t.tempCode},on:{input:function(e){e.target.composing||(t.tempCode=e.target.value)}}})],2)},v=[],u=n("2455");function x(t){n("7611")}var h=!1,f=x,C=null,y=null,k=Object(u["a"])(m,p,v,h,f,C,y);e["default"]=k.exports}}]);