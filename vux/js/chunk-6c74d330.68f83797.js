(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c74d330"],{"1d95":function(n,e,i){var t=i("d299");"string"===typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);var o=i("499e").default;o("42334b4f",t,!0,{})},"2caf":function(n,e,i){var t=i("5ca1");t(t.S,"Array",{isArray:i("1169")})},"3d68":function(n,e,i){"use strict";i("2caf"),i("b54a");var t=i("7d84"),o=(Boolean,Boolean,Boolean,String,String,Boolean,String,Object,Array,{name:"x-button",props:{type:{default:"default"},disabled:Boolean,mini:Boolean,plain:Boolean,text:String,actionType:String,showLoading:Boolean,link:[String,Object],gradients:{type:Array,validator:function(n){return 2===n.length}}},methods:{onClick:function(){!this.disabled&&Object(t["b"])(this.link,this.$router)}},computed:{noBorder:function(){return Array.isArray(this.gradients)},buttonStyle:function(){if(this.gradients)return{background:"linear-gradient(90deg, ".concat(this.gradients[0],", ").concat(this.gradients[1],")"),color:"#FFFFFF"}},classes:function(){return[{"weui-btn_disabled":!this.plain&&this.disabled,"weui-btn_plain-disabled":this.plain&&this.disabled,"weui-btn_mini":this.mini,"vux-x-button-no-border":this.noBorder},this.plain?"":"weui-btn_".concat(this.type),this.plain?"weui-btn_plain-".concat(this.type):"",this.showLoading?"weui-btn_loading":""]}}}),a=function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("button",{staticClass:"weui-btn",class:n.classes,style:n.buttonStyle,attrs:{disabled:n.disabled,type:n.actionType},on:{click:n.onClick}},[n.showLoading?i("i",{staticClass:"weui-loading"}):n._e(),n._v(" "),n._t("default",[n._v(n._s(n.text))])],2)},l=[],d=i("2455");function c(n){i("cb8b")}var r=!1,s=c,b=null,x=null,m=Object(d["a"])(o,a,l,r,s,b,x);e["a"]=m.exports},7717:function(n,e,i){"use strict";i.r(e);var t=i("eae2"),o=i("9729"),a=i("c0f1"),l=i("3d68"),d=(t["a"],o["a"],a["a"],l["a"],{components:{Flexbox:t["a"],FlexboxItem:o["a"],Divider:a["a"],XButton:l["a"]},data:function(){return{tempCode:""}},methods:{copyCodeMethod:function(){var n=setInterval(function(){var e=document.getElementById("codeText");e.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(n)},500)},copyCode01:function(){this.tempCode='    divider  水平\n    flexbox\n      flexbox-item\n        div(class="flex-demo") 1\n      flexbox-item\n        div(class="flex-demo") 2\n    br\n    flexbox\n      flexbox-item\n        div(class="flex-demo") 1\n      flexbox-item\n        div(class="flex-demo") 2\n      flexbox-item\n        div(class="flex-demo") 3\n    br\n    flexbox\n      flexbox-item\n        div(class="flex-demo") 1\n      flexbox-item\n        div(class="flex-demo") 2\n      flexbox-item\n        div(class="flex-demo") 3\n      flexbox-item\n        div(class="flex-demo") 4\n    br\n    flexbox\n      flexbox-item\n        div(class="flex-demo") 1\n      flexbox-item\n        div(class="flex-demo") 2\n      flexbox-item\n        div(class="flex-demo") 3\n      flexbox-item\n        div(class="flex-demo") 4\n      flexbox-item\n        div(class="flex-demo") 5\n    br\n    flexbox\n      flexbox-item\n        div(class="flex-demo") 1\n      flexbox-item\n        div(class="flex-demo") 2\n      flexbox-item\n        div(class="flex-demo") 3\n      flexbox-item\n        div(class="flex-demo") 4\n      flexbox-item\n        div(class="flex-demo") 5\n      flexbox-item\n        div(class="flex-demo") 6\n    br\n',this.copyCodeMethod()},copyCode02:function(){this.tempCode='    divider  水平无间隙\n    flexbox(:gutter="0")\n      flexbox-item\n        div(class="flex-demo") 1\n      flexbox-item\n        div(class="flex-demo") 2\n      flexbox-item\n        div(class="flex-demo") 3\n      flexbox-item\n        div(class="flex-demo") 4\n    br\n',this.copyCodeMethod()},copyCode03:function(){this.tempCode='    divider  垂直\n    flexbox(orient="vertical")\n      flexbox-item\n        div(class="flex-demo") 1\n      flexbox-item\n        div(class="flex-demo") 2\n      flexbox-item\n        div(class="flex-demo") 3\n    br\n',this.copyCodeMethod()},copyCode04:function(){this.tempCode='    divider  垂直无间隙\n    flexbox(orient="vertical", :gutter="0")\n      flexbox-item\n        div(class="flex-demo") 1\n      flexbox-item\n        div(class="flex-demo") 2\n      flexbox-item\n        div(class="flex-demo") 3\n    br\n',this.copyCodeMethod()},copyCode05:function(){this.tempCode='  divider  网格（12列）\n    flexbox\n      flexbox-item(:span="4")\n        div(class="flex-demo") 1/3\n      flexbox-item\n        div(class="flex-demo") 2/3\n    br\n    flexbox\n      flexbox-item(:span="6")\n        div(class="flex-demo") 6/12\n      flexbox-item(:span="2")\n        div(class="flex-demo") 2/12\n      flexbox-item\n        div(class="flex-demo") rest\n    br\n',this.copyCodeMethod()},copyCode06:function(){this.tempCode='    divider  弹性网格\n    flexbox\n      flexbox-item(:span="1/3")\n        div(class="flex-demo") 1/3\n      flexbox-item(:span="1/6")\n        div(class="flex-demo") 1/6\n      flexbox-item(:span="1/8")\n        div(class="flex-demo") 1/8\n      flexbox-item(:span="1/8")\n        div(class="flex-demo") 1/8\n      flexbox-item\n        div(class="flex-demo") rest\n    br\n    flexbox(:gutter="0")\n      flexbox-item(:span="1/3")\n        div(class="flex-demo") 1/3\n      flexbox-item(:span="1/6")\n        div(class="flex-demo") 1/6\n      flexbox-item(:span="1/8")\n        div(class="flex-demo") 1/8\n      flexbox-item(:span="1/8")\n        div(class="flex-demo") 1/8\n      flexbox-item\n         div(class="flex-demo") rest\n    br\n',this.copyCodeMethod()},copyCode07:function(){this.tempCode='    divider  弹性网格\n    flexbox(:gutter="0")\n      flexbox-item(:span="1/3", :order="4")\n        div(class="flex-demo") 1\n      flexbox-item(:span="1/6", :order="3")\n        div(class="flex-demo") 2\n      flexbox-item(:span="1/8", :order="2")\n        div(class="flex-demo") 3\n      flexbox-item(:span="1/8", :order="1")\n        div(class="flex-demo") 4\n      flexbox-item(:order="-99")\n        div(class="flex-demo") 5\n    br\n',this.copyCodeMethod()},copyCode08:function(){this.tempCode='    divider flex-wrap\n    flexbox(:gutter="0", wrap="wrap")\n      flexbox-item(:span="1/3")\n        div(class="flex-demo") 1/3\n      flexbox-item(:span="1/3")\n        div(class="flex-demo") 1/3\n      flexbox-item(:span="1/3")\n        div(class="flex-demo") 1/3\n      flexbox-item(:span="1/3")\n        div(class="flex-demo") 1/3\n      flexbox-item(:span="1/3")\n        div(class="flex-demo") 1/3\n      flexbox-item(:span="1/3")\n        div(class="flex-demo") 1/3\n      flexbox-item(:span="1/3")\n        div(class="flex-demo") 1/3\n      flexbox-item(:span="1/3")\n        div(class="flex-demo") 1/3',this.copyCodeMethod()},copyCode09:function(){this.tempCode=" import { Flexbox, FlexboxItem, Divider, XButton } from 'vux';\n  export default {\n    components: { Flexbox, FlexboxItem, Divider, XButton },\n    data() {\n      return {\n      }\n    },\n    methods: {\n    }\n  }",this.copyCodeMethod()},copyCode10:function(){this.tempCode="  .flex-demo {\n        text-align: center;\n        color: #fff;\n        background-color: #20b907;\n        border-radius: 4px;\n        background-clip: padding-box;\n      }",this.copyCodeMethod()}}}),c=function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("div",{staticClass:"flexbox__wrap"},[i("divider",[n._v(" 水平")]),i("flexbox",[i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("1")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("2")])])],1),i("br"),i("flexbox",[i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("1")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("2")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("3")])])],1),i("br"),i("flexbox",[i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("1")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("2")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("3")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("4")])])],1),i("br"),i("flexbox",[i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("1")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("2")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("3")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("4")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("5")])])],1),i("br"),i("flexbox",[i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("1")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("2")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("3")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("4")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("5")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("6")])])],1),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){n.copyCode01()}}},[n._v("复制代码")]),i("br"),i("divider",[n._v(" 水平无间隙")]),i("flexbox",{attrs:{gutter:0}},[i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("1")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("2")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("3")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("4")])])],1),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){n.copyCode02()}}},[n._v("复制代码")]),i("br"),i("divider",[n._v(" 垂直")]),i("flexbox",{attrs:{orient:"vertical"}},[i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("1")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("2")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("3")])])],1),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){n.copyCode03()}}},[n._v("复制代码")]),i("br"),i("divider",[n._v(" 垂直无间隙")]),i("flexbox",{attrs:{orient:"vertical",gutter:0}},[i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("1")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("2")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("3")])])],1),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){n.copyCode04()}}},[n._v("复制代码")]),i("br"),i("divider",[n._v(" 网格（12列）")]),i("flexbox",[i("flexbox-item",{attrs:{span:4}},[i("div",{staticClass:"flex-demo"},[n._v("1/3")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("2/3")])])],1),i("br"),i("flexbox",[i("flexbox-item",{attrs:{span:6}},[i("div",{staticClass:"flex-demo"},[n._v("6/12")])]),i("flexbox-item",{attrs:{span:2}},[i("div",{staticClass:"flex-demo"},[n._v("2/12")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("rest")])])],1),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){n.copyCode05()}}},[n._v("复制代码")]),i("br"),i("divider",[n._v(" 弹性网格")]),i("flexbox",[i("flexbox-item",{attrs:{span:1/3}},[i("div",{staticClass:"flex-demo"},[n._v("1/3")])]),i("flexbox-item",{attrs:{span:1/6}},[i("div",{staticClass:"flex-demo"},[n._v("1/6")])]),i("flexbox-item",{attrs:{span:1/8}},[i("div",{staticClass:"flex-demo"},[n._v("1/8")])]),i("flexbox-item",{attrs:{span:1/8}},[i("div",{staticClass:"flex-demo"},[n._v("1/8")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("rest")])])],1),i("br"),i("flexbox",{attrs:{gutter:0}},[i("flexbox-item",{attrs:{span:1/3}},[i("div",{staticClass:"flex-demo"},[n._v("1/3")])]),i("flexbox-item",{attrs:{span:1/6}},[i("div",{staticClass:"flex-demo"},[n._v("1/6")])]),i("flexbox-item",{attrs:{span:1/8}},[i("div",{staticClass:"flex-demo"},[n._v("1/8")])]),i("flexbox-item",{attrs:{span:1/8}},[i("div",{staticClass:"flex-demo"},[n._v("1/8")])]),i("flexbox-item",[i("div",{staticClass:"flex-demo"},[n._v("rest")])])],1),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){n.copyCode06()}}},[n._v("复制代码")]),i("br"),i("divider",[n._v(" 弹性网格")]),i("flexbox",{attrs:{gutter:0}},[i("flexbox-item",{attrs:{span:1/3,order:4}},[i("div",{staticClass:"flex-demo"},[n._v("1")])]),i("flexbox-item",{attrs:{span:1/6,order:3}},[i("div",{staticClass:"flex-demo"},[n._v("2")])]),i("flexbox-item",{attrs:{span:1/8,order:2}},[i("div",{staticClass:"flex-demo"},[n._v("3")])]),i("flexbox-item",{attrs:{span:1/8,order:1}},[i("div",{staticClass:"flex-demo"},[n._v("4")])]),i("flexbox-item",{attrs:{order:-99}},[i("div",{staticClass:"flex-demo"},[n._v("5")])])],1),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){n.copyCode07()}}},[n._v("复制代码")]),i("br"),i("divider",[n._v("flex-wrap")]),i("flexbox",{attrs:{gutter:0,wrap:"wrap"}},[i("flexbox-item",{attrs:{span:1/3}},[i("div",{staticClass:"flex-demo"},[n._v("1/3")])]),i("flexbox-item",{attrs:{span:1/3}},[i("div",{staticClass:"flex-demo"},[n._v("1/3")])]),i("flexbox-item",{attrs:{span:1/3}},[i("div",{staticClass:"flex-demo"},[n._v("1/3")])]),i("flexbox-item",{attrs:{span:1/3}},[i("div",{staticClass:"flex-demo"},[n._v("1/3")])]),i("flexbox-item",{attrs:{span:1/3}},[i("div",{staticClass:"flex-demo"},[n._v("1/3")])]),i("flexbox-item",{attrs:{span:1/3}},[i("div",{staticClass:"flex-demo"},[n._v("1/3")])]),i("flexbox-item",{attrs:{span:1/3}},[i("div",{staticClass:"flex-demo"},[n._v("1/3")])]),i("flexbox-item",{attrs:{span:1/3}},[i("div",{staticClass:"flex-demo"},[n._v("1/3")])])],1),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){n.copyCode08()}}},[n._v("复制代码")]),i("x-button",{attrs:{mini:"mini",plain:"plain"},nativeOn:{click:function(e){n.copyCode09()}}},[n._v("复制js代码")]),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"warn"},nativeOn:{click:function(e){n.copyCode10()}}},[n._v("复制css代码")]),i("textarea",{directives:[{name:"model",rawName:"v-model",value:n.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:n.tempCode},on:{input:function(e){e.target.composing||(n.tempCode=e.target.value)}}})],1)},r=[],s=i("2455");function b(n){i("f949")}var x=!1,m=b,f=null,p=null,u=Object(s["a"])(d,c,r,x,m,f,p);e["default"]=u.exports},8818:function(n,e,i){var t=i("f5ee");"string"===typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);var o=i("499e").default;o("eebd54e0",t,!0,{})},9729:function(n,e,i){"use strict";i("a481"),i("c5f6");var t=["-moz-box-","-webkit-box-",""],o=(Number,String,Number,String,["-moz-box-","-webkit-box-",""]),a={name:"flexbox-item",props:{span:[Number,String],order:[Number,String]},beforeMount:function(){this.bodyWidth=document.documentElement.offsetWidth},methods:{buildWidth:function(n){return"number"===typeof n?n<1?n:n/12:"string"===typeof n?n.replace("px","")/this.bodyWidth:void 0}},computed:{style:function(){var n={},e="horizontal"===this.$parent.orient?"marginLeft":"marginTop";if(1*this.$parent.gutter!==0&&(n[e]="".concat(this.$parent.gutter,"px")),this.span)for(var i=0;i<o.length;i++)n["".concat(o[i],"flex")]="0 0 ".concat(100*this.buildWidth(this.span),"%");return"undefined"!==typeof this.order&&(n.order=this.order),n}},data:function(){return{bodyWidth:0}}},l=function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("div",{staticClass:"vux-flexbox-item",style:n.style},[n._t("default")],2)},d=[],c=i("2455"),r=!1,s=null,b=null,x=null,m=Object(c["a"])(a,l,d,r,s,b,x);e["a"]=m.exports},"9e33":function(n,e,i){e=n.exports=i("2350")(!1),e.push([n.i,'/**\n* actionsheet\n*/\n/**\n* en: primary type text color of menu item\n* zh-CN: 菜单项primary类型的文本颜色\n*/\n/**\n* en: warn type text color of menu item\n* zh-CN: 菜单项warn类型的文本颜色\n*/\n/**\n* en: default type text color of menu item\n* zh-CN: 菜单项default类型的文本颜色\n*/\n/**\n* en: disabled type text color of menu item\n* zh-CN: 菜单项disabled类型的文本颜色\n*/\n/**\n* datetime\n*/\n/**\n* tabbar\n*/\n/**\n* tab\n*/\n/**\n* dialog\n*/\n/**\n* en: title and content\'s padding-left and padding-right\n* zh-CN: 标题及内容区域的 padding-left 和 padding-right\n*/\n/**\n* x-number\n*/\n/**\n* checkbox\n*/\n/**\n* check-icon\n*/\n/**\n* Cell\n*/\n/**\n* Mask\n*/\n/**\n* Range\n*/\n/**\n* Tabbar\n*/\n/**\n* Header\n*/\n/**\n* Timeline\n*/\n/**\n* Switch\n*/\n/**\n* Button\n*/\n/**\n* en: border radius\n* zh-CN: 圆角边框\n*/\n/**\n* en: font color\n* zh-CN: 字体颜色\n*/\n/**\n* en: margin-top value between previous button, not works when there is only one button\n* zh-CN: 与相邻按钮的 margin-top 间隙，只有一个按钮时不生效\n*/\n/**\n* en: button height\n* zh-CN: 按钮高度\n*/\n/**\n* en: the font color in disabled\n* zh-CN: disabled状态下的字体颜色\n*/\n/**\n* en: the font color in disabled\n* zh-CN: disabled状态下的字体颜色\n*/\n/**\n* en: font size\n* zh-CN: 字体大小\n*/\n/**\n* en: the font size of the mini type\n* zh-CN: mini类型的字体大小\n*/\n/**\n* en: the line height of the mini type\n* zh-CN: mini类型的行高\n*/\n/**\n* en: the background color of the warn type\n* zh-CN: warn类型的背景颜色\n*/\n/**\n* en: the background color of the warn type in active\n* zh-CN: active状态下，warn类型的背景颜色\n*/\n/**\n* en: the background color of the warn type in disabled\n* zh-CN: disabled状态下，warn类型的背景颜色\n*/\n/**\n* en: the background color of the default type\n* zh-CN: default类型的背景颜色\n*/\n/**\n* en: the font color of the default type\n* zh-CN: default类型的字体颜色\n*/\n/**\n* en: the background color of the default type in active\n* zh-CN: active状态下，default类型的背景颜色\n*/\n/**\n* en: the font color of the default type in disabled\n* zh-CN: disabled状态下，default类型的字体颜色\n*/\n/**\n* en: the background color of the default type in disabled\n* zh-CN: disabled状态下，default类型的背景颜色\n*/\n/**\n* en: the font color of the default type in active\n* zh-CN: active状态下，default类型的字体颜色\n*/\n/**\n* en: the background color of the primary type\n* zh-CN: primary类型的背景颜色\n*/\n/**\n* en: the background color of the primary type in active\n* zh-CN: active状态下，primary类型的背景颜色\n*/\n/**\n* en: the background color of the primary type in disabled\n* zh-CN: disabled状态下，primary类型的背景颜色\n*/\n/**\n* en: the font color of the plain primary type\n* zh-CN: plain的primary类型的字体颜色\n*/\n/**\n* en: the border color of the plain primary type\n* zh-CN: plain的primary类型的边框颜色\n*/\n/**\n* en: the font color of the plain primary type in active\n* zh-CN: active状态下，plain的primary类型的字体颜色\n*/\n/**\n* en: the border color of the plain primary type in active\n* zh-CN: active状态下，plain的primary类型的边框颜色\n*/\n/**\n* en: the font color of the plain default type\n* zh-CN: plain的default类型的字体颜色\n*/\n/**\n* en: the border color of the plain default type\n* zh-CN: plain的default类型的边框颜色\n*/\n/**\n* en: the font color of the plain default type in active\n* zh-CN: active状态下，plain的default类型的字体颜色\n*/\n/**\n* en: the border color of the plain default type in active\n* zh-CN: active状态下，plain的default类型的边框颜色\n*/\n/**\n* en: the font color of the plain warn type\n* zh-CN: plain的warn类型的字体颜色\n*/\n/**\n* en: the border color of the plain warn type\n* zh-CN: plain的warn类型的边框颜色\n*/\n/**\n* en: the font color of the plain warn type in active\n* zh-CN: active状态下，plain的warn类型的字体颜色\n*/\n/**\n* en: the border color of the plain warn type in active\n* zh-CN: active状态下，plain的warn类型的边框颜色\n*/\n/**\n* swipeout\n*/\n/**\n* Cell\n*/\n/**\n* Badge\n*/\n/**\n* en: badge background color\n* zh-CN: badge的背景颜色\n*/\n/**\n* Popover\n*/\n/**\n* Button tab\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: border radius color\n* zh-CN: 圆角边框的半径\n*/\n/**\n* en: border color\n* zh-CN: 边框的颜色\n*/\n/**\n* en: not used\n* zh-CN: 默认状态下圆角边框的颜色\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: default background color\n* zh-CN: 默认状态下的背景颜色\n*/\n/**\n* en: selected background color\n* zh-CN: 选中状态下的背景颜色\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/* alias */\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* en: default text color\n* zh-CN: 默认状态下的文本颜色\n*/\n/**\n* en: height\n* zh-CN: 元素高度\n*/\n/**\n* en: line height\n* zh-CN: 元素行高\n*/\n/**\n* Swiper\n*/\n/**\n* checklist\n*/\n/**\n* popup-picker\n*/\n/**\n* popup\n*/\n/**\n* popup-header\n*/\n/**\n* form-preview\n*/\n/**\n* sticky\n*/\n/**\n* group\n*/\n/**\n* en: margin-top of title\n* zh-CN: 标题的margin-top\n*/\n/**\n* en: margin-bottom of title\n* zh-CN: 标题的margin-bottom\n*/\n/**\n* en: margin-top of footer title\n* zh-CN: 底部标题的margin-top\n*/\n/**\n* en: margin-bottom of footer title\n* zh-CN: 底部标题的margin-bottom\n*/\n/**\n* toast\n*/\n/**\n* en: text color of content\n* zh-CN: 内容文本颜色\n*/\n/**\n* en: default top\n* zh-CN: 默认状态下距离顶部的高度\n*/\n/**\n* en: position top\n* zh-CN: 顶部显示的高度\n*/\n/**\n* en: position bottom\n* zh-CN: 底部显示的高度\n*/\n/**\n* en: z-index\n* zh-CN: z-index\n*/\n/**\n* icon\n*/\n/**\n* calendar\n*/\n/**\n* en: forward and backward arrows color\n* zh-CN: 前进后退的箭头颜色\n*/\n/**\n* en: text color of week highlight\n* zh-CN: 周末高亮的文本颜色\n*/\n/**\n* en: background color when selected\n* zh-CN: 选中时的背景颜色\n*/\n/**\n* en: text color when disabled\n* zh-CN: 禁用时的文本颜色\n*/\n/**\n* en: text color of today\n* zh-CN: 今天的文本颜色\n*/\n/**\n* en: font size of cell\n* zh-CN: 单元格的字号\n*/\n/**\n* en: background color\n* zh-CN: 背景颜色\n*/\n/**\n* en: size of date cell\n* zh-CN: 日期单元格尺寸大小\n*/\n/**\n* en: line height of date cell\n* zh-CN: 日期单元格的行高\n*/\n/**\n* en: text color of header\n* zh-CN: 头部的文本颜色\n*/\n/**\n* week-calendar\n*/\n/**\n* search\n*/\n/**\n* en: text color of cancel button\n* zh-CN: 取消按钮文本颜色\n*/\n/**\n* en: background color\n* zh-CN: 背景颜色\n*/\n/**\n* en: text color of placeholder\n* zh-CN: placeholder文本颜色\n*/\n/**\n* radio\n*/\n/**\n* en: checked icon color\n* zh-CN: 选中状态的图标颜色\n*/\n/**\n* loadmore\n*/\n/**\n* en: not used\n* zh-CN: 未被使用\n*/\n/**\n* loading\n*/\n/**\n* en: z-index\n* zh-CN: z-index\n*/\n.weui-btn {\n  position: relative;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 14px;\n  padding-right: 14px;\n  box-sizing: border-box;\n  font-size: 18px;\n  text-align: center;\n  text-decoration: none;\n  color: #FFFFFF;\n  line-height: 2.33333333;\n  border-radius: 5px;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  overflow: hidden;\n}\n.weui-btn:after {\n  content: " ";\n  width: 200%;\n  height: 200%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid rgba(0, 0, 0, .2);\n  transform: scale(0.5);\n  transform-origin: 0 0;\n  box-sizing: border-box;\n  border-radius: 10px;\n}\n.weui-btn_inline {\n  display: inline-block;\n}\n.weui-btn_default {\n  color: #000000;\n  background-color: #F8F8F8;\n}\n.weui-btn_default:not(.weui-btn_disabled):visited {\n  color: #000000;\n}\n.weui-btn_default:not(.weui-btn_disabled):active {\n  color: rgba(0, 0, 0, .6);\n  background-color: #DEDEDE;\n}\n.weui-btn_primary {\n  background-color: #1AAD19;\n}\n.weui-btn_primary:not(.weui-btn_disabled):visited {\n  color: #FFFFFF;\n}\n.weui-btn_primary:not(.weui-btn_disabled):active {\n  color: rgba(255, 255, 255, .6);\n  background-color: #179B16;\n}\n.weui-btn_warn {\n  background-color: #E64340;\n}\n.weui-btn_warn:not(.weui-btn_disabled):visited {\n  color: #FFFFFF;\n}\n.weui-btn_warn:not(.weui-btn_disabled):active {\n  color: rgba(255, 255, 255, .6);\n  background-color: #CE3C39;\n}\n.weui-btn_disabled {\n  color: rgba(255, 255, 255, .6);\n}\n.weui-btn_disabled.weui-btn_default {\n  color: rgba(0, 0, 0, .3);\n  background-color: #F7F7F7;\n}\n.weui-btn_disabled.weui-btn_primary {\n  background-color: #9ED99D;\n}\n.weui-btn_disabled.weui-btn_warn {\n  background-color: #EC8B89;\n}\n.weui-btn_loading .weui-loading {\n  margin: -0.2em 0.34em 0 0;\n}\n.weui-btn_loading.weui-btn_primary, .weui-btn_loading.weui-btn_warn {\n  color: rgba(255, 255, 255, .6);\n}\n.weui-btn_loading.weui-btn_primary .weui-loading, .weui-btn_loading.weui-btn_warn .weui-loading {\n  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAnIGhlaWdodD0nMTIwJyB2aWV3Qm94PScwIDAgMTAwIDEwMCc+PHBhdGggZmlsbD0nbm9uZScgZD0nTTAgMGgxMDB2MTAwSDB6Jy8+PHJlY3QgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjU2KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDMwIDEwNS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjQzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA3NS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjM4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA2NSA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjMyKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTguNjYgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDU0LjAyIDY1KScvPjxyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xNTAgNDUuOTggNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTEyMCA0MS4zNCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE0KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtOTAgMzUgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtNjAgMjQuMDIgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4wMyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTMwIC01Ljk4IDY1KScvPjwvc3ZnPg==");\n}\n.weui-btn_loading.weui-btn_primary {\n  background-color: #179B16;\n}\n.weui-btn_loading.weui-btn_warn {\n  background-color: #CE3C39;\n}\n.weui-btn_plain-primary {\n  color: #1aad19;\n  border: 1px solid #1aad19;\n}\n.weui-btn_plain-primary:not(.weui-btn_plain-disabled):active {\n  color: rgba(26, 173, 25, .6);\n  border-color: rgba(26, 173, 25, .6);\n  background-color: transparent;\n}\n.weui-btn_plain-primary:after {\n  border-width: 0;\n}\n.weui-btn_plain-default {\n  color: #353535;\n  border: 1px solid #353535;\n}\n.weui-btn_plain-default:not(.weui-btn_plain-disabled):active {\n  color: rgba(53, 53, 53, .6);\n  border-color: rgba(53, 53, 53, .6);\n}\n.weui-btn_plain-default:after {\n  border-width: 0;\n}\n/*\n* added by VUX\n*/\nbutton.weui-btn.weui-btn_plain-warn, input.weui-btn.weui-btn_plain-warn {\n  border-width: 1px;\n  background-color: transparent;\n}\n.weui-btn_plain-warn {\n  color: #ce3c39;\n  border: 1px solid #ce3c39;\n  background: transparent;\n}\n.weui-btn_plain-warn:not(.weui-btn_plain-disabled):active {\n  color: rgba(206, 60, 57, .6);\n  border-color: rgba(206, 60, 57, .6);\n}\n.weui-btn_plain-warn:after {\n  border-width: 0;\n}\n.weui-btn_plain-disabled {\n  color: rgba(0, 0, 0, .2);\n  border-color: rgba(0, 0, 0, .2);\n}\nbutton.weui-btn, input.weui-btn {\n  width: 100%;\n  border-width: 0;\n  outline: 0;\n  -webkit-appearance: none;\n}\nbutton.weui-btn:focus, input.weui-btn:focus {\n  outline: 0;\n}\nbutton.weui-btn_inline, input.weui-btn_inline, button.weui-btn_mini, input.weui-btn_mini {\n  width: auto;\n}\nbutton.weui-btn_plain-primary, input.weui-btn_plain-primary, button.weui-btn_plain-default, input.weui-btn_plain-default {\n  border-width: 1px;\n  background-color: transparent;\n}\n.weui-btn_mini {\n  display: inline-block;\n  padding: 0 1.32em;\n  line-height: 2.3;\n  font-size: 13px;\n}\n/*gap between btn*/\n.weui-btn + .weui-btn {\n  margin-top: 15px;\n}\n.weui-btn.weui-btn_inline + .weui-btn.weui-btn_inline {\n  margin-top: auto;\n  margin-left: 15px;\n}\n.weui-btn-area {\n  margin: 1.17647059em 15px 0.3em;\n}\n.weui-btn-area_inline {\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n}\n.weui-btn-area_inline .weui-btn {\n  margin-top: auto;\n  margin-right: 15px;\n  width: 100%;\n  -ms-flex: 1;\n      flex: 1;\n}\n.weui-btn-area_inline .weui-btn:last-child {\n  margin-right: 0;\n}\n.weui-loading {\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  vertical-align: middle;\n  animation: weuiLoading 1s steps(12, end) infinite;\n  background: transparent url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=") no-repeat;\n  background-size: 100%;\n}\n.weui-loading.weui-loading_transparent {\n  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAnIGhlaWdodD0nMTIwJyB2aWV3Qm94PScwIDAgMTAwIDEwMCc+PHBhdGggZmlsbD0nbm9uZScgZD0nTTAgMGgxMDB2MTAwSDB6Jy8+PHJlY3QgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjU2KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwIC0zMCknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDMwIDEwNS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjQzKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA3NS45OCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjM4KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA2NSA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjMyKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTguNjYgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4yOCknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDU0LjAyIDY1KScvPjxyZWN0IHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyB4PSc0Ni41JyB5PSc0MCcgZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwuMjUpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCA1MCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjIpJyByeD0nNScgcnk9JzUnIHRyYW5zZm9ybT0ncm90YXRlKC0xNTAgNDUuOTggNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xNyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTEyMCA0MS4zNCA2NSknLz48cmVjdCB3aWR0aD0nNycgaGVpZ2h0PScyMCcgeD0nNDYuNScgeT0nNDAnIGZpbGw9J3JnYmEoMjU1LDI1NSwyNTUsLjE0KScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtOTAgMzUgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4xKScgcng9JzUnIHJ5PSc1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtNjAgMjQuMDIgNjUpJy8+PHJlY3Qgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHg9JzQ2LjUnIHk9JzQwJyBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LC4wMyknIHJ4PSc1JyByeT0nNScgdHJhbnNmb3JtPSdyb3RhdGUoLTMwIC01Ljk4IDY1KScvPjwvc3ZnPgo=");\n}\n@keyframes weuiLoading {\n0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n}\n100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n}\n}\n.weui-btn.vux-x-button-no-border:after {\n  display: none;\n}\n',""])},c0f1:function(n,e,i){"use strict";var t={name:"divider"},o=function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("p",{staticClass:"vux-divider"},[n._t("default")],2)},a=[],l=i("2455");function d(n){i("1d95")}var c=!1,r=d,s=null,b=null,x=Object(l["a"])(t,o,a,c,r,s,b);e["a"]=x.exports},cb8b:function(n,e,i){var t=i("9e33");"string"===typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);var o=i("499e").default;o("1367635f",t,!0,{})},d299:function(n,e,i){e=n.exports=i("2350")(!1),e.push([n.i,"\n.vux-divider {\n  display: table;\n  white-space: nowrap;\n  height: auto;\n  overflow: hidden;\n  line-height: 1;\n  text-align: center;\n  padding: 10px 0;\n  color: #666;\n}\n.vux-divider:after, .vux-divider:before {\n  content: '';\n  display: table-cell;\n  position: relative;\n  top: 50%;\n  width: 50%;\n  background-repeat: no-repeat;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC)\n}\n.vux-divider:before {\n  background-position: right 1em top 50%\n}\n.vux-divider:after {\n  background-position: left 1em top 50%\n}\n",""])},ea08:function(n,e,i){e=n.exports=i("2350")(!1),e.push([n.i,"\n.flexbox {\n}\n.flexbox__wrap .flex-demo {\n    text-align: center;\n    color: #fff;\n    background-color: #20b907;\n    border-radius: 4px;\n    background-clip: padding-box;\n}\n",""])},eae2:function(n,e,i){"use strict";i("c5f6"),Number,String,String,String,String,String;var t={name:"flexbox",props:{gutter:{type:Number,default:8},orient:{type:String,default:"horizontal"},justify:String,align:String,wrap:String,direction:String},computed:{styles:function(){var n={"justify-content":this.justify,"-webkit-justify-content":this.justify,"align-items":this.align,"-webkit-align-items":this.align,"flex-wrap":this.wrap,"-webkit-flex-wrap":this.wrap,"flex-direction":this.direction,"-webkit-flex-direction":this.direction};return n}}},o=function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("div",{staticClass:"vux-flexbox",class:{"vux-flex-col":"vertical"===n.orient,"vux-flex-row":"horizontal"===n.orient},style:n.styles},[n._t("default")],2)},a=[],l=i("2455");function d(n){i("8818")}var c=!1,r=d,s=null,b=null,x=Object(l["a"])(t,o,a,c,r,s,b);e["a"]=x.exports},f5ee:function(n,e,i){e=n.exports=i("2350")(!1),e.push([n.i,"\n.vux-flexbox {\n  width: 100%;\n  text-align: left;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  display: -webkit-flex;\n  box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.vux-flexbox .vux-flexbox-item {\n  -ms-flex: 1;\n      flex: 1;\n  -webkit-flex: 1;\n  min-width: 20px;\n  width: 0%;\n}\n.vux-flexbox .vux-flexbox-item:first-child {\n  margin-left: 0!important;\n  margin-top: 0!important;\n}\n.vux-flex-row {\n  box-direction: row;\n  box-orient: horizontal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.vux-flex-col {\n  box-orient: vertical;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.vux-flex-col > .vux-flexbox-item {\n  width: 100%;\n}\n",""])},f949:function(n,e,i){var t=i("ea08");"string"===typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);var o=i("499e").default;o("46784ef5",t,!0,{})}}]);