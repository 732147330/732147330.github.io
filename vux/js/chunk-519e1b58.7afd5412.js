(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-519e1b58"],{"4e5f":function(t,o,e){"use strict";e.r(o);var n=e("ade3"),i=e("3d68"),s=e("195d"),a=e("f678"),l=e("1885"),c=(Object(n["a"])({XSwitch:l["a"],Toast:s["a"],XButton:i["a"],Group:a["a"]},"XSwitch",l["a"]),{components:Object(n["a"])({XSwitch:l["a"],Toast:s["a"],XButton:i["a"],Group:a["a"]},"XSwitch",l["a"]),methods:{showPosition:function(t){this.position=t,this.showPositionValue=!0},onHide:function(){console.log("on hide")},onChange:function(t){var o=this;t?this.$vux.toast.show({text:"Hello World",onShow:function(){console.log("Plugin: I'm showing")},onHide:function(){console.log("Plugin: I'm hiding"),o.show9=!1}}):this.$vux.toast.hide()},copyCodeMethod:function(){var t=setInterval(function(){var o=document.getElementById("codeText");o.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(t)},500)},copyCode01:function(){this.tempCode='    div(style="padding:15px;")\n      x-button(@click.native="showPosition(\'top\')", type="primary") Top\n      x-button(@click.native="showPosition(\'middle\')", type="primary") Middle\n      x-button(@click.native="showPosition(\'bottom\')", type="primary") Bottom\n      x-button(@click.native="showPosition(\'\')", type="primary") Default\n\n    toast(v-model="showPositionValue", type="text", :time="800", is-show-mask, text="Hello World", :position="position") 基础使用',this.copyCodeMethod()},copyCode02:function(){this.tempCode='  group\n      x-switch(title="基础使用（显示成功） ", v-model="show1")\n      x-switch(title="显示文本", v-model="show2")\n      x-switch(title="显示失败", v-model="show3")\n      x-switch(title="显示警告", v-model="show4")\n      x-switch(title="显示时间1s", v-model="show5")\n      x-switch(title="长文本", v-model="show6")\n\n    toast(v-model="show1", @on-hide="onHide") 默认使用（成功了！）\n    toast(v-model="show2", type="text") 成功了！\n    toast(v-model="show3", type="cancel") 失败了！\n    toast(v-model="show4", type="warn") 警告⚠️\n    toast(v-model="show5", :time="1000") 只显示1s\n    toast(v-model="show6", type="text" width="20em") 这是一段很长，很长，非常长的文本～～～～～',this.copyCodeMethod()},copyCode03:function(){this.tempCode=' group(title="设置text")\n      x-switch(title="显示成功", v-model="show7")\n      x-switch(title="默认样式", v-model="show8")\n\n    toast(v-model="show7", text="Hello World")\n    toast(v-model="show8", type="text", text="Hello World") ',this.copyCodeMethod()},copyCode04:function(){this.tempCode=' group(title="插件形式调用")\n      x-switch(title="默认", v-model="show9", @on-change="onChange") ',this.copyCodeMethod()},copyCode05:function(){this.tempCode='   div(style="padding:15px;")\n      x-button(type="primary", @click.native="$vux.toast.text(\'How are you~\', \'middle\')") 使用文本功能 ',this.copyCodeMethod()},copyCode06:function(){this.tempCode="  import { XButton, Toast, Group, XSwitch } from \"vux\";\n  export default {\n    components: {XSwitch, Toast, XButton, Group, XSwitch },\n    methods: {\n      showPosition (position) {\n        this.position = position\n        this.showPositionValue = true\n      },\n      onHide () {\n        console.log('on hide')\n      },\n      onChange (val) {\n        const _this = this\n        if (val) {\n          this.$vux.toast.show({\n            text: 'Hello World',\n            onShow () {\n              console.log('Plugin: I\\'m showing')\n            },\n            onHide () {\n              console.log('Plugin: I\\'m hiding')\n              _this.show9 = false\n            }\n          })\n        } else {\n          this.$vux.toast.hide()\n        }\n      },\n    },\n    data () {\n      return {\n        show1: false,\n        show2: false,\n        show3: false,\n        show4: false,\n        show5: false,\n        show6: false,\n        show7: false,\n        show8: false,\n        show9: false,\n        position: 'default',\n        showPositionValue: false\n      }\n    },\n    mounted () {\n      this.timer = setInterval(() => {\n        console.log(this.$vux.toast.isVisible())\n      }, 1000)\n    },\n    beforeDestroy () {\n      clearInterval(this.timer)\n    }\n  }",this.copyCodeMethod()}},data:function(){return{tempCode:"",show1:!1,show2:!1,show3:!1,show4:!1,show5:!1,show6:!1,show7:!1,show8:!1,show9:!1,position:"default",showPositionValue:!1}},mounted:function(){var t=this;this.timer=setInterval(function(){console.log(t.$vux.toast.isVisible())},1e3)},beforeDestroy:function(){clearInterval(this.timer)}}),h=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"toast__wrap"},[e("div",{staticStyle:{padding:"15px"}},[e("x-button",{attrs:{type:"primary"},nativeOn:{click:function(o){t.showPosition("top")}}},[t._v("Top")]),e("x-button",{attrs:{type:"primary"},nativeOn:{click:function(o){t.showPosition("middle")}}},[t._v("Middle")]),e("x-button",{attrs:{type:"primary"},nativeOn:{click:function(o){t.showPosition("bottom")}}},[t._v("Bottom")]),e("x-button",{attrs:{type:"primary"},nativeOn:{click:function(o){t.showPosition("")}}},[t._v("Default")])],1),e("toast",{attrs:{type:"text",time:800,"is-show-mask":"is-show-mask",text:"Hello World",position:t.position},model:{value:t.showPositionValue,callback:function(o){t.showPositionValue=o},expression:"showPositionValue"}},[t._v("基础使用")]),e("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(o){t.copyCode01()}}},[t._v("复制代码")]),e("group",[e("x-switch",{attrs:{title:"基础使用（显示成功） "},model:{value:t.show1,callback:function(o){t.show1=o},expression:"show1"}}),e("x-switch",{attrs:{title:"显示文本"},model:{value:t.show2,callback:function(o){t.show2=o},expression:"show2"}}),e("x-switch",{attrs:{title:"显示失败"},model:{value:t.show3,callback:function(o){t.show3=o},expression:"show3"}}),e("x-switch",{attrs:{title:"显示警告"},model:{value:t.show4,callback:function(o){t.show4=o},expression:"show4"}}),e("x-switch",{attrs:{title:"显示时间1s"},model:{value:t.show5,callback:function(o){t.show5=o},expression:"show5"}}),e("x-switch",{attrs:{title:"长文本"},model:{value:t.show6,callback:function(o){t.show6=o},expression:"show6"}})],1),e("toast",{on:{"on-hide":t.onHide},model:{value:t.show1,callback:function(o){t.show1=o},expression:"show1"}},[t._v("默认使用（成功了！）")]),e("toast",{attrs:{type:"text"},model:{value:t.show2,callback:function(o){t.show2=o},expression:"show2"}},[t._v("成功了！")]),e("toast",{attrs:{type:"cancel"},model:{value:t.show3,callback:function(o){t.show3=o},expression:"show3"}},[t._v("失败了！")]),e("toast",{attrs:{type:"warn"},model:{value:t.show4,callback:function(o){t.show4=o},expression:"show4"}},[t._v("警告⚠️")]),e("toast",{attrs:{time:1e3},model:{value:t.show5,callback:function(o){t.show5=o},expression:"show5"}},[t._v("只显示1s")]),e("toast",{attrs:{type:"text",width:"20em"},model:{value:t.show6,callback:function(o){t.show6=o},expression:"show6"}},[t._v("这是一段很长，很长，非常长的文本～～～～～")]),e("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(o){t.copyCode02()}}},[t._v("复制代码")]),e("group",{attrs:{title:"设置text"}},[e("x-switch",{attrs:{title:"显示成功"},model:{value:t.show7,callback:function(o){t.show7=o},expression:"show7"}}),e("x-switch",{attrs:{title:"默认样式"},model:{value:t.show8,callback:function(o){t.show8=o},expression:"show8"}})],1),e("toast",{attrs:{text:"Hello World"},model:{value:t.show7,callback:function(o){t.show7=o},expression:"show7"}}),e("toast",{attrs:{type:"text",text:"Hello World"},model:{value:t.show8,callback:function(o){t.show8=o},expression:"show8"}}),e("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(o){t.copyCode03()}}},[t._v("复制代码")]),e("group",{attrs:{title:"插件形式调用"}},[e("x-switch",{attrs:{title:"默认"},on:{"on-change":t.onChange},model:{value:t.show9,callback:function(o){t.show9=o},expression:"show9"}})],1),e("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(o){t.copyCode04()}}},[t._v("复制代码")]),e("div",{staticStyle:{padding:"15px"}},[e("x-button",{attrs:{type:"primary"},nativeOn:{click:function(o){t.$vux.toast.text("How are you~","middle")}}},[t._v("使用文本功能")])],1),e("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(o){t.copyCode05()}}},[t._v("复制代码")]),e("x-button",{attrs:{mini:"mini",plain:"plain"},nativeOn:{click:function(o){t.copyCode06()}}},[t._v("复制js代码")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:t.tempCode},on:{input:function(o){o.target.composing||(t.tempCode=o.target.value)}}})],1)},r=[],u=e("2455");function d(t){e("7b90")}var p=!1,w=d,m=null,v=null,x=Object(u["a"])(c,h,r,p,w,m,v);o["default"]=x.exports},"7b90":function(t,o,e){var n=e("a1e1");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=e("499e").default;i("6002d95f",n,!0,{})},a1e1:function(t,o,e){o=t.exports=e("2350")(!1),o.push([t.i,"\n.toast {\n}\n.toast__wrap {\n}\n",""])},ade3:function(t,o,e){"use strict";function n(t,o,e){return o in t?Object.defineProperty(t,o,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[o]=e,t}e.d(o,"a",function(){return n})}}]);