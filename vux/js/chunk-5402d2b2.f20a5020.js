(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5402d2b2"],{"21dc":function(n,e,t){e=n.exports=t("2350")(!1),e.push([n.i,"\n.cell {\n}\n.cell__wrap .sub-item {\n    color: #888;\n}\n.cell__wrap .slide {\n    padding: 0 20px;\n    overflow: hidden;\n    max-height: 0;\n    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;\n}\n.cell__wrap .animate {\n    max-height: 9999px;\n    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);\n    transition-delay: 0s;\n}\n",""])},"8fec":function(n,e,t){var o=t("21dc");"string"===typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);var i=t("499e").default;i("4d2b02c6",o,!0,{})},9361:function(n,e,t){"use strict";t.r(e);var o=t("3807"),i=t("a784"),l=t("9922"),r=t("f678"),a=t("1002"),s=t("3d68"),c=(o["a"],i["a"],l["a"],r["a"],a["a"],s["a"],{components:{Cell:o["a"],CellBox:i["a"],CellFormPreview:l["a"],Group:r["a"],Badge:a["a"],XButton:s["a"]},data:function(){return{tempCode:"",list:[{label:"Apple",value:"3.29"},{label:"Banana",value:"1.04"},{label:"Fish",value:"8.00"}],money:null,showContent001:!1,showContent002:!1,showContent003:!1,showContent004:!1}},mounted:function(){var n=this;setTimeout(function(){n.money=-1024},2e3)},methods:{onClick:function(){console.log("on click")},copyCodeMethod:function(){var n=setInterval(function(){var e=document.getElementById("codeText");e.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(n)},500)},copyCode01:function(){this.tempCode='    group\n      cell(title="我的账号", value="保护中", @click.native="onClick")\n      cell(title="余额", @click.native="onClick", :is-loading="!money", :value="money")\n      cell(title="提现", disabled, is-link)',this.copyCodeMethod()},copyCode02:function(){this.tempCode='  group(title="\'使用is-link显示右边箭头")\n      cell(is-link)\n        span(slot="title", style="color:green;")\n          span(style="vertical-align:middle;") 消息\n          badge(text="1")\n      cell(title="通知", is-link)\n      cell(title="隐私", is-link)\n      cell(title="通用", is-link)\n        img(slot="icon", width="20", style="display:block;margin-right:5px;", src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=") ',this.copyCodeMethod()},copyCode03:function(){this.tempCode='  group(label-width="5em", title="Align-items")\n      cell(primary="content", title="default", value="long long long longlong longlong longlong longlong longlong longlong longlong longlong long")\n      cell(title="flex-start", align-items="flex-start", value="long long long longlong longlong longlong longlong longlong longlong longlong longlong long")',this.copyCodeMethod()},copyCode04:function(){this.tempCode=' group(title="折叠")\n      cell(title="标题一",  is-link,  :border-intent="false", :arrow-direction="showContent001 ? \'up\' : \'down\'", @click.native="showContent001 = !showContent001")\n      template(v-if="showContent001")\n        cell-box(:border-intent="false", class="sub-item", is-link) content 001\n        cell-box(class="sub-item", is-link) content 001\n        cell-box(class="sub-item", is-link) content 001\n      cell(title="标题二", is-link  :border-intent="false", :arrow-direction="showContent002 ? \'up\' : \'down\'", @click.native="showContent002 = !showContent002")\n      template(v-if="showContent002")\n        cell-form-preview(:border-intent="false", :list="list")\n      cell(title="标题三", is-link, :border-intent="false", :arrow-direction="showContent003 ? \'up\' : \'down\'", @click.native="showContent003 = !showContent003")\n      template(v-if="showContent003")\n        cell-box(:border-intent="false", class="sub-item") I\'m content 003\n      cell(title="动画效果", is-link, :border-intent="false", :arrow-direction="showContent004 ? \'up\' : \'down\'", @click.native="showContent004 = !showContent004")\n      p(class="slide", :class="showContent004 ? \'animate\':\'\'") blablabla...\n        br\n        | blablabla...\n        br\n        | blablabla...\n        br\n        | blablabla...',this.copyCodeMethod()},copyCode05:function(){this.tempCode='  group\n      cell(title="通知", value="已开启")\n    group(title="使用slot显示复杂内容")\n      cell(title="slot内容")\n        div\n          span(style="color: green") 你好哇，感谢关注VUX',this.copyCodeMethod()},copyCode06:function(){this.tempCode='  group(title="当设有 link 属性时，会自动产生箭头效果，无需再设置 is-link")\n      cell(title="前往Radio页面", link="#", inline-desc=\'link="/component/radio"\')\n      cell(title="前往Demo页面", link="#", inline-desc=\':link={path:"/demo"}\')\n      cell(title="站外链接", link="https://vux.li", inline-desc=\'link="https://vux.li",\')',this.copyCodeMethod()},copyCode07:function(){this.tempCode=" import { Cell, CellBox, CellFormPreview, Group, Badge, XButton } from 'vux';\n  export default {\n    components: { Cell, CellBox, CellFormPreview, Group, Badge, XButton },\n    data() {\n      return {\n        list: [{\n          label: 'Apple',\n          value: '3.29'\n        }, {\n          label: 'Banana',\n          value: '1.04'\n        }, {\n          label: 'Fish',\n          value: '8.00'\n        }],\n        money: null,\n        showContent001: false,\n        showContent002: false,\n        showContent003: false,\n        showContent004: false\n      }\n    },\n    mounted () {\n      setTimeout(() => {\n        this.money = -1024\n      }, 2000)\n    },\n    methods: {\n      onClick () {\n        console.log('on click')\n      },\n    }\n  }",this.copyCodeMethod()},copyCode08:function(){this.tempCode="  .sub-item {\n        color: #888;\n      }\n      .slide {\n        padding: 0 20px;\n        overflow: hidden;\n        max-height: 0;\n        transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;\n      }\n      .animate {\n        max-height: 9999px;\n        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);\n        transition-delay: 0s;\n      }",this.copyCodeMethod()}}}),p=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"cell__wrap"},[t("group",[t("cell",{attrs:{title:"我的账号",value:"保护中"},nativeOn:{click:function(e){return n.onClick(e)}}}),t("cell",{attrs:{title:"余额","is-loading":!n.money,value:n.money},nativeOn:{click:function(e){return n.onClick(e)}}}),t("cell",{attrs:{title:"提现",disabled:"disabled","is-link":"is-link"}})],1),t("br"),t("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){return n.copyCode01()}}},[n._v("复制代码")]),t("group",{attrs:{title:"'使用is-link显示右边箭头"}},[t("cell",{attrs:{"is-link":"is-link"}},[t("span",{staticStyle:{color:"green"},attrs:{slot:"title"},slot:"title"},[t("span",{staticStyle:{"vertical-align":"middle"}},[n._v("消息")]),t("badge",{attrs:{text:"1"}})],1)]),t("cell",{attrs:{title:"通知","is-link":"is-link"}}),t("cell",{attrs:{title:"隐私","is-link":"is-link"}}),t("cell",{attrs:{title:"通用","is-link":"is-link"}},[t("img",{staticStyle:{display:"block","margin-right":"5px"},attrs:{slot:"icon",width:"20",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="},slot:"icon"})])],1),t("br"),t("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){return n.copyCode02()}}},[n._v("复制代码")]),t("group",{attrs:{"label-width":"5em",title:"Align-items"}},[t("cell",{attrs:{primary:"content",title:"default",value:"long long long longlong longlong longlong longlong longlong longlong longlong longlong long"}}),t("cell",{attrs:{title:"flex-start","align-items":"flex-start",value:"long long long longlong longlong longlong longlong longlong longlong longlong longlong long"}})],1),t("br"),t("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){return n.copyCode03()}}},[n._v("复制代码")]),t("group",{attrs:{title:"折叠"}},[t("cell",{attrs:{title:"标题一","is-link":"is-link","border-intent":!1,"arrow-direction":n.showContent001?"up":"down"},nativeOn:{click:function(e){n.showContent001=!n.showContent001}}}),n.showContent001?[t("cell-box",{staticClass:"sub-item",attrs:{"border-intent":!1,"is-link":"is-link"}},[n._v("content 001")]),t("cell-box",{staticClass:"sub-item",attrs:{"is-link":"is-link"}},[n._v("content 001")]),t("cell-box",{staticClass:"sub-item",attrs:{"is-link":"is-link"}},[n._v("content 001")])]:n._e(),t("cell",{attrs:{title:"标题二","is-link":"is-link","border-intent":!1,"arrow-direction":n.showContent002?"up":"down"},nativeOn:{click:function(e){n.showContent002=!n.showContent002}}}),n.showContent002?[t("cell-form-preview",{attrs:{"border-intent":!1,list:n.list}})]:n._e(),t("cell",{attrs:{title:"标题三","is-link":"is-link","border-intent":!1,"arrow-direction":n.showContent003?"up":"down"},nativeOn:{click:function(e){n.showContent003=!n.showContent003}}}),n.showContent003?[t("cell-box",{staticClass:"sub-item",attrs:{"border-intent":!1}},[n._v("I'm content 003")])]:n._e(),t("cell",{attrs:{title:"动画效果","is-link":"is-link","border-intent":!1,"arrow-direction":n.showContent004?"up":"down"},nativeOn:{click:function(e){n.showContent004=!n.showContent004}}}),t("p",{staticClass:"slide",class:n.showContent004?"animate":""},[n._v("blablabla..."),t("br"),n._v("blablabla..."),t("br"),n._v("blablabla..."),t("br"),n._v("blablabla...")])],2),t("br"),t("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){return n.copyCode04()}}},[n._v("复制代码")]),t("group",[t("cell",{attrs:{title:"通知",value:"已开启"}})],1),t("group",{attrs:{title:"使用slot显示复杂内容"}},[t("cell",{attrs:{title:"slot内容"}},[t("div",[t("span",{staticStyle:{color:"green"}},[n._v("你好哇，感谢关注VUX")])])])],1),t("br"),t("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){return n.copyCode05()}}},[n._v("复制代码")]),t("group",{attrs:{title:"当设有 link 属性时，会自动产生箭头效果，无需再设置 is-link"}},[t("cell",{attrs:{title:"前往Radio页面",link:"#","inline-desc":'link="/component/radio"'}}),t("cell",{attrs:{title:"前往Demo页面",link:"#","inline-desc":':link={path:"/demo"}'}}),t("cell",{attrs:{title:"站外链接",link:"https://vux.li","inline-desc":'link="https://vux.li",'}})],1),t("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){return n.copyCode06()}}},[n._v("复制代码")]),t("x-button",{attrs:{mini:"mini",plain:"plain"},nativeOn:{click:function(e){return n.copyCode07()}}},[n._v("复制js代码")]),t("x-button",{attrs:{mini:"mini",plain:"plain",type:"warn"},nativeOn:{click:function(e){return n.copyCode08()}}},[n._v("复制css代码")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:n.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:n.tempCode},on:{input:function(e){e.target.composing||(n.tempCode=e.target.value)}}})],1)},d=[],h=t("2455");function u(n){t("8fec")}var f=!1,g=u,m=null,b=null,w=Object(h["a"])(c,p,d,f,g,m,b);e["default"]=w.exports},9922:function(n,e,t){"use strict";Array,Boolean;var o={name:"cell-form-preview",props:{list:Array,borderIntent:{type:Boolean,default:!0}}},i=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"weui-cell vux-cell-form-preview",class:{"vux-cell-no-border-intent":!n.borderIntent}},[t("div",{staticClass:"weui-form-preview__bd"},n._l(n.list,function(e){return t("div",{staticClass:"weui-form-preview__item"},[t("label",{staticClass:"weui-form-preview__label",domProps:{innerHTML:n._s(e.label)}}),n._v(" "),t("span",{staticClass:"weui-form-preview__value",domProps:{innerHTML:n._s(e.value)}})])}),0)])},l=[],r=t("2455");function a(n){t("b873")}var s=!1,c=a,p=null,d=null,h=Object(r["a"])(o,i,l,s,c,p,d);e["a"]=h.exports},b873:function(n,e,t){var o=t("d5d5");"string"===typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);var i=t("2be4").default;i("be2836c0",o,!0,{})},d5d5:function(n,e,t){e=n.exports=t("31b7")(!1),e.push([n.i,'/**\n* actionsheet\n*/\n/**\n* en: primary type text color of menu item\n* zh-CN: 菜单项primary类型的文本颜色\n*/\n/**\n* en: warn type text color of menu item\n* zh-CN: 菜单项warn类型的文本颜色\n*/\n/**\n* en: default type text color of menu item\n* zh-CN: 菜单项default类型的文本颜色\n*/\n/**\n* en: disabled type text color of menu item\n* zh-CN: 菜单项disabled类型的文本颜色\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* en: title and content\'s padding-left and padding-right\n* zh-CN: 标题及内容区域的 padding-left 和 padding-right\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* en: border radius\n* zh-CN: 圆角边框\n*/\n/**\n* en: font color\n* zh-CN: 字体颜色\n*/\n/**\n* en: margin-top value between previous button, not works when there is only one button\n* zh-CN: 与相邻按钮的 margin-top 间隙，只有一个按钮时不生效\n*/\n/**\n* en: button height\n* zh-CN: 按钮高度\n*/\n/**\n* en: the font color in disabled\n* zh-CN: disabled状态下的字体颜色\n*/\n/**\n* en: the font color in disabled\n* zh-CN: disabled状态下的字体颜色\n*/\n/**\n* en: font size\n* zh-CN: 字体大小\n*/\n/**\n* en: the font size of the mini type\n* zh-CN: mini类型的字体大小\n*/\n/**\n* en: the line height of the mini type\n* zh-CN: mini类型的行高\n*/\n/**\n* en: the background color of the warn type\n* zh-CN: warn类型的背景颜色\n*/\n/**\n* en: the background color of the warn type in active\n* zh-CN: active状态下，warn类型的背景颜色\n*/\n/**\n* en: the background color of the warn type in disabled\n* zh-CN: disabled状态下，warn类型的背景颜色\n*/\n/**\n* en: the background color of the default type\n* zh-CN: default类型的背景颜色\n*/\n/**\n* en: the font color of the default type\n* zh-CN: default类型的字体颜色\n*/\n/**\n* en: the background color of the default type in active\n* zh-CN: active状态下，default类型的背景颜色\n*/\n/**\n* en: the font color of the default type in disabled\n* zh-CN: disabled状态下，default类型的字体颜色\n*/\n/**\n* en: the background color of the default type in disabled\n* zh-CN: disabled状态下，default类型的背景颜色\n*/\n/**\n* en: the font color of the default type in active\n* zh-CN: active状态下，default类型的字体颜色\n*/\n/**\n* en: the background color of the primary type\n* zh-CN: primary类型的背景颜色\n*/\n/**\n* en: the background color of the primary type in active\n* zh-CN: active状态下，primary类型的背景颜色\n*/\n/**\n* en: the background color of the primary type in disabled\n* zh-CN: disabled状态下，primary类型的背景颜色\n*/\n/**\n* en: the font color of the plain primary type\n* zh-CN: plain的primary类型的字体颜色\n*/\n/**\n* en: the border color of the plain primary type\n* zh-CN: plain的primary类型的边框颜色\n*/\n/**\n* en: the font color of the plain primary type in active\n* zh-CN: active状态下，plain的primary类型的字体颜色\n*/\n/**\n* en: the border color of the plain primary type in active\n* zh-CN: active状态下，plain的primary类型的边框颜色\n*/\n/**\n* en: the font color of the plain default type\n* zh-CN: plain的default类型的字体颜色\n*/\n/**\n* en: the border color of the plain default type\n* zh-CN: plain的default类型的边框颜色\n*/\n/**\n* en: the font color of the plain default type in active\n* zh-CN: active状态下，plain的default类型的字体颜色\n*/\n/**\n* en: the border color of the plain default type in active\n* zh-CN: active状态下，plain的default类型的边框颜色\n*/\n/**\n* en: the font color of the plain warn type\n* zh-CN: plain的warn类型的字体颜色\n*/\n/**\n* en: the border color of the plain warn type\n* zh-CN: plain的warn类型的边框颜色\n*/\n/**\n* en: the font color of the plain warn type in active\n* zh-CN: active状态下，plain的warn类型的字体颜色\n*/\n/**\n* en: the border color of the plain warn type in active\n* zh-CN: active状态下，plain的warn类型的边框颜色\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* en: badge background color\n* zh-CN: badge的背景颜色\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: border radius color\n* zh-CN: 圆角边框的半径\n*/\n/**\n* en: border color\n* zh-CN: 边框的颜色\n*/\n/**\n* en: not used\n* zh-CN: 默认状态下圆角边框的颜色\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: default background color\n* zh-CN: 默认状态下的背景颜色\n*/\n/**\n* en: selected background color\n* zh-CN: 选中状态下的背景颜色\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/* alias */\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: default text color\n* zh-CN: 默认状态下的文本颜色\n*/\n/**\n* en: height\n* zh-CN: 元素高度\n*/\n/**\n* en: line height\n* zh-CN: 元素行高\n*/\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* popup-header\n*/\n/**\n* form-preview\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* en: margin-top of title\n* zh-CN: 标题的margin-top\n*/\n/**\n* en: margin-bottom of title\n* zh-CN: 标题的margin-bottom\n*/\n/**\n* en: margin-top of footer title\n* zh-CN: 底部标题的margin-top\n*/\n/**\n* en: margin-bottom of footer title\n* zh-CN: 底部标题的margin-bottom\n*/\n/**\n* toast\n*/\n/**\n* en: text color of content\n* zh-CN: 内容文本颜色\n*/\n/**\n* en: default top\n* zh-CN: 默认状态下距离顶部的高度\n*/\n/**\n* en: position top\n* zh-CN: 顶部显示的高度\n*/\n/**\n* en: position bottom\n* zh-CN: 底部显示的高度\n*/\n/**\n* en: z-index\n* zh-CN: z-index\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* en: forward and backward arrows color\n* zh-CN: 前进后退的箭头颜色\n*/\n/**\n* en: text color of week highlight\n* zh-CN: 周末高亮的文本颜色\n*/\n/**\n* en: background color when selected\n* zh-CN: 选中时的背景颜色\n*/\n/**\n* en: text color when disabled\n* zh-CN: 禁用时的文本颜色\n*/\n/**\n* en: text color of today\n* zh-CN: 今天的文本颜色\n*/\n/**\n* en: font size of cell\n* zh-CN: 单元格的字号\n*/\n/**\n* en: background color\n* zh-CN: 背景颜色\n*/\n/**\n* en: size of date cell\n* zh-CN: 日期单元格尺寸大小\n*/\n/**\n* en: line height of date cell\n* zh-CN: 日期单元格的行高\n*/\n/**\n* en: text color of header\n* zh-CN: 头部的文本颜色\n*/\n/**\n* week-calendar\n*/\n/**\n* search\n*/\n/**\n* en: text color of cancel button\n* zh-CN: 取消按钮文本颜色\n*/\n/**\n* en: background color\n* zh-CN: 背景颜色\n*/\n/**\n* en: text color of placeholder\n* zh-CN: placeholder文本颜色\n*/\n/**\n* radio\n*/\n/**\n* en: checked icon color\n* zh-CN: 选中状态的图标颜色\n*/\n/**\n* loadmore\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* loading\n*/\n/**\n* en: z-index\n* zh-CN: z-index\n*/\n.weui-cells {\n  margin-top: 1.17647059em;\n  background-color: #FFFFFF;\n  line-height: 1.41176471;\n  font-size: 17px;\n  overflow: hidden;\n  position: relative;\n}\n.weui-cells:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-cells:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.weui-cells__title {\n  margin-top: 0.77em;\n  margin-bottom: 0.3em;\n  padding-left: 15px;\n  padding-right: 15px;\n  color: #999999;\n  font-size: 14px;\n}\n.weui-cells__title + .weui-cells {\n  margin-top: 0;\n}\n.weui-cells__tips {\n  margin-top: .3em;\n  color: #999999;\n  padding-left: 15px;\n  padding-right: 15px;\n  font-size: 14px;\n}\n.weui-cell {\n  padding: 10px 15px;\n  position: relative;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n}\n.weui-cell:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-cell:first-child:before {\n  display: none;\n}\n.weui-cell_primary {\n  -ms-flex-align: start;\n      align-items: flex-start;\n}\n.weui-cell__bd {\n  -ms-flex: 1;\n      flex: 1;\n}\n.weui-cell__ft {\n  text-align: right;\n  color: #999999;\n}\n.vux-cell-justify {\n  height: 1.41176471em;\n}\n.vux-cell-justify.vux-cell-justify:after {\n  content: ".";\n  display: inline-block;\n  width: 100%;\n  overflow: hidden;\n  height: 0;\n}\n.weui-form-preview {\n  position: relative;\n  background-color: #FFFFFF;\n}\n.weui-form-preview:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-form-preview:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.weui-form-preview__hd {\n  position: relative;\n  padding: 10px 15px;\n  text-align: right;\n  line-height: 2.5em;\n}\n.weui-form-preview__hd:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-form-preview__hd .weui-form-preview__value {\n  font-style: normal;\n  font-size: 1.6em;\n}\n.weui-form-preview__bd {\n  padding: 10px 15px;\n  font-size: .9em;\n  text-align: right;\n  color: #999999;\n  line-height: 2;\n}\n.weui-form-preview__ft {\n  position: relative;\n  line-height: 50px;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n}\n.weui-form-preview__ft:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-form-preview__item {\n  overflow: hidden;\n}\n.weui-form-preview__label {\n  float: left;\n  margin-right: 1em;\n  min-width: 4em;\n  color: #999999;\n  text-align: justify;\n  text-align-last: justify;\n}\n.weui-form-preview__value {\n  display: block;\n  overflow: hidden;\n  word-break: normal;\n  word-wrap: break-word;\n}\n.weui-form-preview__btn {\n  position: relative;\n  display: block;\n  -ms-flex: 1;\n      flex: 1;\n  color: #3CC51F;\n  text-align: center;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbutton.weui-form-preview__btn {\n  background-color: transparent;\n  border: 0;\n  outline: 0;\n  line-height: inherit;\n  font-size: inherit;\n}\n.weui-form-preview__btn:active {\n  background-color: #EEEEEE;\n}\n.weui-form-preview__btn:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-left: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  transform-origin: 0 0;\n  transform: scaleX(0.5);\n}\n.weui-form-preview__btn:first-child:after {\n  display: none;\n}\n.weui-form-preview__btn_default {\n  color: #999999;\n}\n.weui-form-preview__btn_primary {\n  color: #0BB20C;\n}\n.vux-cell-form-preview .weui-form-preview__bd {\n  width: 100%;\n  padding: 0;\n}\n',""])}}]);