(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0db4f8c0"],{bbc1:function(t,e,o){e=t.exports=o("2350")(!1),e.push([t.i,"\n.x-textarea {\n}\n.x-textarea__wrap {\n}\n",""])},bfb9:function(t,e,o){"use strict";o.r(e);var n=o("5234"),a=o("f678"),r=o("4c7a"),i=o("3d68"),c=(n["a"],a["a"],r["a"],i["a"],{components:{XTextarea:n["a"],Group:a["a"],XInput:r["a"],XButton:i["a"]},data:function(){return{tempCode:""}},methods:{onEvent:function(t){console.log("on",t)},copyCodeMethod:function(){var t=setInterval(function(){var e=document.getElementById("codeText");e.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(t)},500)},copyCode01:function(){this.tempCode='  group\n      x-textarea(:max="20", placeholder="提示", @on-focus="onEvent(\'focus\')", @on-blur="onEvent(\'blur\')")\n',this.copyCodeMethod()},copyCode02:function(){this.tempCode='    group(title="和input一起使用")\n      x-input(placeholder="标题")\n      x-textarea(:max="200", name="description", placeholder="提示")\n',this.copyCodeMethod()},copyCode03:function(){this.tempCode='    group(title="不显示计数器")\n      x-textarea(:max="200", name="detail", placeholder="提示", :show-counter="false")\n',this.copyCodeMethod()},copyCode04:function(){this.tempCode='    group(title="自动高度")\n      x-textarea(placeholder="随便写点什么", :show-counter="false", :rows="1", autosize)\n      x-textarea(title="标题", placeholder="随便写点什么", :show-counter="false", :rows="1", autosize)\n',this.copyCodeMethod()},copyCode05:function(){this.tempCode='    group(title="设置高度为200像素")\n      x-textarea(title="标题", :max="200", placeholder="提示 ", :show-counter="false", :height="200", :rows="8", :cols="30")',this.copyCodeMethod()},copyCode06:function(){this.tempCode="  import { XTextarea, Group, XInput, XButton } from 'vux';\n  export default {\n    components: { XTextarea, Group, XInput, XButton },\n    data() {\n      return {\n      }\n    },\n    methods: {\n      onEvent (event) {\n        console.log('on', event)\n      },\n    }\n  }",this.copyCodeMethod()}}}),p=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"x-textarea__wrap"},[o("group",[o("x-textarea",{attrs:{max:20,placeholder:"提示"},on:{"on-focus":function(e){return t.onEvent("focus")},"on-blur":function(e){return t.onEvent("blur")}}})],1),o("br"),o("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){return t.copyCode01()}}},[t._v("复制代码")]),o("br"),o("group",{attrs:{title:"和input一起使用"}},[o("x-input",{attrs:{placeholder:"标题"}}),o("x-textarea",{attrs:{max:200,name:"description",placeholder:"提示"}})],1),o("br"),o("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){return t.copyCode02()}}},[t._v("复制代码")]),o("br"),o("group",{attrs:{title:"不显示计数器"}},[o("x-textarea",{attrs:{max:200,name:"detail",placeholder:"提示","show-counter":!1}})],1),o("br"),o("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){return t.copyCode03()}}},[t._v("复制代码")]),o("br"),o("group",{attrs:{title:"自动高度"}},[o("x-textarea",{attrs:{placeholder:"随便写点什么","show-counter":!1,rows:1,autosize:"autosize"}}),o("x-textarea",{attrs:{title:"标题",placeholder:"随便写点什么","show-counter":!1,rows:1,autosize:"autosize"}})],1),o("br"),o("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){return t.copyCode04()}}},[t._v("复制代码")]),o("br"),o("group",{attrs:{title:"设置高度为200像素"}},[o("x-textarea",{attrs:{title:"标题",max:200,placeholder:"提示 ","show-counter":!1,height:200,rows:8,cols:30}})],1),o("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){return t.copyCode05()}}},[t._v("复制代码")]),o("x-button",{attrs:{mini:"mini",plain:"plain"},nativeOn:{click:function(e){return t.copyCode06()}}},[t._v("复制js代码")]),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:t.tempCode},on:{input:function(e){e.target.composing||(t.tempCode=e.target.value)}}})],1)},u=[],l=o("2455");function s(t){o("de53")}var d=!1,x=s,m=null,h=null,f=Object(l["a"])(c,p,u,d,x,m,h);e["default"]=f.exports},de53:function(t,e,o){var n=o("bbc1");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=o("499e").default;a("1ca60db5",n,!0,{})}}]);