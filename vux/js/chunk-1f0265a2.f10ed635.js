(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f0265a2"],{"3cb5":function(n,o,t){"use strict";t.r(o);t("cadf"),t("551c"),t("097d");var e,i=t("2b0e"),l=t("7f74");e||(e=Object(l["a"])(i["a"]));var s={},r={show:function(n){return l["c"].call(s,e,n)},hide:function(){return l["b"].call(s,e)}},c=t("f678"),u=t("1885"),a=t("c85a"),h=t("3807"),d=t("3d68"),w=(u["a"],a["a"],c["a"],h["a"],d["a"],{components:{XSwitch:u["a"],Alert:a["a"],Group:c["a"],Cell:h["a"],XButton:d["a"]},data:function(){return{tempCode:"",show:!1,show1:!1,show2:!1}},methods:{onHide:function(){console.log("on hide")},onShow:function(){console.log("on show")},showPlugin:function(){this.$vux.alert.show({title:"VUX is Cool",content:"同意吗？",onShow:function(){console.log("Plugin: I'm showing")},onHide:function(){console.log("Plugin: I'm hiding now")}})},showModule:function(){r.show({title:"VUX is Cool",content:"同意吗？",onShow:function(){console.log("Module: I'm showing")},onHide:function(){console.log("Module: I'm hiding now")}})},showModuleAuto:function(){this.showModule(),setTimeout(function(){r.hide()},3e3)},showPluginAuto:function(){var n=this;this.showPlugin(),setTimeout(function(){n.$vux.alert.hide()},3e3)},copyCodeMethod:function(){var n=setInterval(function(){var o=document.getElementById("codeText");o.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(n)},500)},copyCode01:function(){this.tempCode='     group\n      x-switch(title="显示", v-model="show")\n    div(transfer-dom)\n      alert(v-model="show", title="恭喜", @on-show="onShow", @on-hide="onHide") 消息已成功发送 \n\n<script>\n  import { AlertModule, Group, XSwitch, Alert, Cell } from \'vux\'\n  export default {\n    components: { XSwitch, Alert, Group, Cell },\n    data() {\n      return {\n        show: false,\n      }\n    },\n    methods: {\n      onHide () {\n        console.log(\'on hide\')\n      },\n      onShow () {\n        console.log(\'on show\')\n      },\n    },\n    mounted () {\n      this.timer = setInterval(() => {\n        console.log(this.$vux.alert.isVisible())\n      }, 1000)\n    },\n    beforeDestroy () {\n      clearInterval(this.timer)\n    }\n  }\n\n<\/script>',this.copyCodeMethod()},copyCode02:function(){this.tempCode='  group(title = "Prop: content")\n      x-switch(title="显示", v-model="show2")\n    div(transfer-dom)\n      alert(v-model="show2", title="恭喜", content="消息已成功发送") \n\n<script>\n  import { AlertModule, Group, XSwitch, Alert, Cell } from \'vux\'\n  export default {\n    components: { XSwitch, Alert, Group, Cell },\n    data() {\n      return {\n        show2: false\n      }\n    },\n  }\n\n<\/script>',this.copyCodeMethod()},copyCode03:function(){this.tempCode="    group(title = \"以插件方式调用\")\n      cell(title=\"显示\", @click.native=\"showPlugin\", is-link)\n      cell(title = \"3秒后关闭\", @click.native = \"showPluginAuto\", is-link)\n\n<script>\n  import { AlertModule, Group, XSwitch, Alert, Cell } from 'vux'\n  export default {\n    components: { XSwitch, Alert, Group, Cell },\n    data() {\n      return {\n        show: false,\n        show1: false,\n        show2: false\n      }\n    },\n    methods: {\n      showPlugin () {\n        this.$vux.alert.show({\n          title: 'VUX is Cool',\n          content: '同意吗？',\n          onShow () {\n            console.log('Plugin: I\\'m showing')\n          },\n          onHide () {\n            console.log('Plugin: I\\'m hiding now')\n          }\n        })\n      },\n      showModule () {\n        AlertModule.show({\n          title: 'VUX is Cool',\n          content: '同意吗？',\n          onShow () {\n            console.log('Module: I\\'m showing')\n          },\n          onHide () {\n            console.log('Module: I\\'m hiding now')\n          }\n        })\n      },\n      showModuleAuto () {\n        this.showModule()\n        setTimeout(() => {\n          AlertModule.hide()\n        }, 3000)\n      },\n      showPluginAuto () {\n        this.showPlugin()\n        setTimeout(() => {\n          this.$vux.alert.hide()\n        }, 3000)\n      }\n    },\n    mounted () {\n      this.timer = setInterval(() => {\n        console.log(this.$vux.alert.isVisible())\n      }, 1000)\n    },\n    beforeDestroy () {\n      clearInterval(this.timer)\n    }\n  }\n\n<\/script>",this.copyCodeMethod()},copyCode04:function(){this.tempCode="    group(title = \"Use as a module\")\n      cell(title = \"显示\", @click.native=\"showModule\", is-link)\n      cell(title=\"3秒后关闭\", @click.native=\"showModuleAuto\", is-link)\n\n<script>\n  import { AlertModule, Group, XSwitch, Alert, Cell } from 'vux'\n  export default {\n    components: { XSwitch, Alert, Group, Cell },\n    data() {\n      return {\n        show: false,\n        show1: false,\n        show2: false\n      }\n    },\n    methods: {\n      onHide () {\n        console.log('on hide')\n      },\n      onShow () {\n        console.log('on show')\n      },\n      showPlugin () {\n        this.$vux.alert.show({\n          title: 'VUX is Cool',\n          content: '同意吗？',\n          onShow () {\n            console.log('Plugin: I\\'m showing')\n          },\n          onHide () {\n            console.log('Plugin: I\\'m hiding now')\n          }\n        })\n      },\n      showModule () {\n        AlertModule.show({\n          title: 'VUX is Cool',\n          content: '同意吗？',\n          onShow () {\n            console.log('Module: I\\'m showing')\n          },\n          onHide () {\n            console.log('Module: I\\'m hiding now')\n          }\n        })\n      },\n      showModuleAuto () {\n        this.showModule()\n        setTimeout(() => {\n          AlertModule.hide()\n        }, 3000)\n      },\n      showPluginAuto () {\n        this.showPlugin()\n        setTimeout(() => {\n          this.$vux.alert.hide()\n        }, 3000)\n      }\n    },\n    mounted () {\n      this.timer = setInterval(() => {\n        console.log(this.$vux.alert.isVisible())\n      }, 1000)\n    },\n    beforeDestroy () {\n      clearInterval(this.timer)\n    }\n  }\n\n<\/script>",this.copyCodeMethod()}},mounted:function(){var n=this;this.timer=setInterval(function(){console.log(n.$vux.alert.isVisible())},1e3)},beforeDestroy:function(){clearInterval(this.timer)}}),p=function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("div",{staticClass:"alert__wrap"},[t("group",[t("x-switch",{attrs:{title:"显示"},model:{value:n.show,callback:function(o){n.show=o},expression:"show"}})],1),t("div",{attrs:{"transfer-dom":"transfer-dom"}},[t("alert",{attrs:{title:"恭喜"},on:{"on-show":n.onShow,"on-hide":n.onHide},model:{value:n.show,callback:function(o){n.show=o},expression:"show"}},[n._v("消息已成功发送")])],1),t("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(o){n.copyCode01()}}},[n._v("复制代码")]),t("group",{attrs:{title:"Prop: content"}},[t("x-switch",{attrs:{title:"显示"},model:{value:n.show2,callback:function(o){n.show2=o},expression:"show2"}})],1),t("div",{attrs:{"transfer-dom":"transfer-dom"}},[t("alert",{attrs:{title:"恭喜",content:"消息已成功发送"},model:{value:n.show2,callback:function(o){n.show2=o},expression:"show2"}})],1),t("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(o){n.copyCode02()}}},[n._v("复制代码")]),t("group",{attrs:{title:"以插件方式调用"}},[t("cell",{attrs:{title:"显示","is-link":"is-link"},nativeOn:{click:function(o){return n.showPlugin(o)}}}),t("cell",{attrs:{title:"3秒后关闭","is-link":"is-link"},nativeOn:{click:function(o){return n.showPluginAuto(o)}}})],1),t("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(o){n.copyCode03()}}},[n._v("复制代码")]),t("group",{attrs:{title:"Use as a module"}},[t("cell",{attrs:{title:"显示","is-link":"is-link"},nativeOn:{click:function(o){return n.showModule(o)}}}),t("cell",{attrs:{title:"3秒后关闭","is-link":"is-link"},nativeOn:{click:function(o){return n.showModuleAuto(o)}}})],1),t("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(o){n.copyCode04()}}},[n._v("复制代码")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:n.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:n.tempCode},on:{input:function(o){o.target.composing||(n.tempCode=o.target.value)}}})],1)},m=[],f=t("2455");function v(n){t("8e31")}var g=!1,C=v,x=null,k=null,M=Object(f["a"])(w,p,m,g,C,x,k);o["default"]=M.exports},"8e31":function(n,o,t){var e=t("aa23");"string"===typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);var i=t("499e").default;i("7109e1c9",e,!0,{})},aa23:function(n,o,t){o=n.exports=t("2350")(!1),o.push([n.i,"\n.alert {\n}\n.alert__wrap {\n}\n",""])}}]);