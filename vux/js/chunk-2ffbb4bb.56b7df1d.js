(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ffbb4bb"],{"034b":function(o,t,i){"use strict";i.r(t);var s=i("f678"),n=i("1885"),l=i("3d68"),e=i("af11"),a=(s["a"],n["a"],l["a"],e["a"],{components:{Group:s["a"],XSwitch:n["a"],XButton:l["a"],XDialog:e["a"]},methods:{doShowToast:function(){this.$vux.toast.show({text:"toast"})},copyCodeMethod:function(){var o=setInterval(function(){var t=document.getElementById("codeText");t.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(o)},500)},copyCode01:function(){this.tempCode=' group\n      x-switch(v-model="show", title="显示")\n      x-switch(v-model="show2", title="使用  .sync")\n      x-switch(v-model="showToast", title="显示 toast")\n      x-switch(v-model="showHideOnBlur", title="点击遮罩层自动关闭")\n      x-switch(v-model="showDialogStyle", title="显示", inline-desc="自定义dialog容器样式")\n\n    div\n      x-dialog(v-model="show", class="dialog-demo")\n        div.img-box\n          img(src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg", style="max-width:100%")\n        div(@click="show=false")\n          span.vux-close\n\n    div\n      x-dialog(:show.sync="show2", class="dialog-demo")\n        div.img-box\n          img(src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg", style="max-width:100%")\n        div(@click="show2=false")\n          span.vux-close\n\n    div\n      x-dialog(v-model="showToast", class="dialog-demo")\n        div(style="padding:15px;")\n          x-button(@click.native="doShowToast", type="primary") show toast\n        div(@click="showToast=false")\n          span.vux-close\n\n    div\n      x-dialog(v-model="showHideOnBlur", class="dialog-demo", hide-on-blur)\n        div.img-box\n         img(src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg", style="max-width:100%")\n        div(@click="showHideOnBlur=false")\n         span.vux-close\n\n    div\n      x-dialog(v-model="showDialogStyle", hide-on-blur, :dialog-style="{\'max-width\': \'100%\', width: \'100%\', height: \'50%\', \'background-color\': \'transparent\'}")\n        p(style="color:#fff;text-align:center;", @click="showDialogStyle = false")\n          span(style="font-size:30px;") HELLO WORLD\n          br\n          br\n          x-icon(type="ios-close-outline", style="fill:#fff;")',this.copyCodeMethod()},copyCode02:function(){this.tempCode='   group(style="padding-top: 300px")\n      x-switch(v-model="showScrollBox", title="很长很长很长的内容")\n\n\n    div\n      x-dialog(v-model="showScrollBox", class="dialog-demo")\n        p(class="dialog-title") 长文本\n        div(class="img-box", style="height:100px;padding:15px 0;overflow:scroll;-webkit-overflow-scrolling:touch;")\n          p(v-for="i in 20") {{i}}\n        div(@click="showScrollBox=false")\n          span.vux-close',this.copyCodeMethod()},copyCode03:function(){this.tempCode="  import { Group, XSwitch, XButton, XDialog } from \"vux\";\n  export default {\n    components: { Group, XSwitch, XButton, XDialog },\n    methods: {\n      doShowToast () {\n        this.$vux.toast.show({\n          text: 'toast'\n        })\n      },\n    },\n    data () {\n      return {\n        show: false,\n        show2: false,\n        showToast: false,\n        showHideOnBlur: false,\n        showScrollBox: false,\n        showDialogStyle: false\n      }\n    }\n  }",this.copyCodeMethod()},copyCode04:function(){this.tempCode=' @import "../../../plugins/vux/src/styles/close.less";\n  .weui-dialog  .weui-dialog {\n      border-radius: 8px;\n      padding-bottom: 8px;\n  }\n  .weui-dialog  .dialog-title {\n      line-height: 30px;\n      color: #666;\n    }\n  .weui-dialog  .img-box {\n      height: 350px;\n      overflow: hidden;\n    }\n  .weui-dialog  .vux-close {\n      margin-top: 8px;\n      margin-bottom: 8px;\n    }',this.copyCodeMethod()}},data:function(){return{tempCode:"",show:!1,show2:!1,showToast:!1,showHideOnBlur:!1,showScrollBox:!1,showDialogStyle:!1}}}),c=function(){var o=this,t=o.$createElement,i=o._self._c||t;return i("div",{staticClass:"xDialog__wrap"},[i("group",[i("x-switch",{attrs:{title:"显示"},model:{value:o.show,callback:function(t){o.show=t},expression:"show"}}),i("x-switch",{attrs:{title:"使用  .sync"},model:{value:o.show2,callback:function(t){o.show2=t},expression:"show2"}}),i("x-switch",{attrs:{title:"显示 toast"},model:{value:o.showToast,callback:function(t){o.showToast=t},expression:"showToast"}}),i("x-switch",{attrs:{title:"点击遮罩层自动关闭"},model:{value:o.showHideOnBlur,callback:function(t){o.showHideOnBlur=t},expression:"showHideOnBlur"}}),i("x-switch",{attrs:{title:"显示","inline-desc":"自定义dialog容器样式"},model:{value:o.showDialogStyle,callback:function(t){o.showDialogStyle=t},expression:"showDialogStyle"}})],1),i("div",[i("x-dialog",{staticClass:"dialog-demo",model:{value:o.show,callback:function(t){o.show=t},expression:"show"}},[i("div",{staticClass:"img-box"},[i("img",{staticStyle:{"max-width":"100%"},attrs:{src:"https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg"}})]),i("div",{on:{click:function(t){o.show=!1}}},[i("span",{staticClass:"vux-close"})])])],1),i("div",[i("x-dialog",{staticClass:"dialog-demo",attrs:{show:o.show2},on:{"update:show":function(t){o.show2=t}}},[i("div",{staticClass:"img-box"},[i("img",{staticStyle:{"max-width":"100%"},attrs:{src:"https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg"}})]),i("div",{on:{click:function(t){o.show2=!1}}},[i("span",{staticClass:"vux-close"})])])],1),i("div",[i("x-dialog",{staticClass:"dialog-demo",model:{value:o.showToast,callback:function(t){o.showToast=t},expression:"showToast"}},[i("div",{staticStyle:{padding:"15px"}},[i("x-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return o.doShowToast(t)}}},[o._v("show toast")])],1),i("div",{on:{click:function(t){o.showToast=!1}}},[i("span",{staticClass:"vux-close"})])])],1),i("div",[i("x-dialog",{staticClass:"dialog-demo",attrs:{"hide-on-blur":"hide-on-blur"},model:{value:o.showHideOnBlur,callback:function(t){o.showHideOnBlur=t},expression:"showHideOnBlur"}},[i("div",{staticClass:"img-box"},[i("img",{staticStyle:{"max-width":"100%"},attrs:{src:"https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg"}})]),i("div",{on:{click:function(t){o.showHideOnBlur=!1}}},[i("span",{staticClass:"vux-close"})])])],1),i("div",[i("x-dialog",{attrs:{"hide-on-blur":"hide-on-blur","dialog-style":{"max-width":"100%",width:"100%",height:"50%","background-color":"transparent"}},model:{value:o.showDialogStyle,callback:function(t){o.showDialogStyle=t},expression:"showDialogStyle"}},[i("p",{staticStyle:{color:"#fff","text-align":"center"},on:{click:function(t){o.showDialogStyle=!1}}},[i("span",{staticStyle:{"font-size":"30px"}},[o._v("HELLO WORLD")]),i("br"),i("br"),i("svg",{staticClass:"vux-x-icon vux-x-icon-ios-close-outline",staticStyle:{fill:"#fff"},attrs:{type:"ios-close-outline",id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 512 512"}},[i("path",{staticClass:"st0",attrs:{d:"M403.1 108.9c-81.2-81.2-212.9-81.2-294.2 0s-81.2 212.9 0 294.2c81.2 81.2 212.9 81.2 294.2 0s81.2-213 0-294.2zm-12.3 281.9c-74.3 74.3-195.3 74.3-269.6 0-74.3-74.3-74.3-195.3 0-269.6s195.3-74.3 269.6 0c74.4 74.3 74.4 195.3 0 269.6z"}}),i("path",{staticClass:"st0",attrs:{d:"M340.2 160l-84.4 84.2-84-83.8-11.8 11.8 84 83.8-84 83.8 11.8 11.8 84-83.8 84.4 84.2 11.8-11.8-84.4-84.2 84.4-84.2z"}})])])])],1),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){o.copyCode01()}}},[o._v("复制代码")]),i("group",{staticStyle:{"padding-top":"300px"}},[i("x-switch",{attrs:{title:"很长很长很长的内容"},model:{value:o.showScrollBox,callback:function(t){o.showScrollBox=t},expression:"showScrollBox"}})],1),i("div",[i("x-dialog",{staticClass:"dialog-demo",model:{value:o.showScrollBox,callback:function(t){o.showScrollBox=t},expression:"showScrollBox"}},[i("p",{staticClass:"dialog-title"},[o._v("长文本")]),i("div",{staticClass:"img-box",staticStyle:{height:"100px",padding:"15px 0",overflow:"scroll","-webkit-overflow-scrolling":"touch"}},o._l(20,function(t){return i("p",[o._v(o._s(t))])})),i("div",{on:{click:function(t){o.showScrollBox=!1}}},[i("span",{staticClass:"vux-close"})])])],1),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){o.copyCode02()}}},[o._v("复制代码")]),i("x-button",{attrs:{mini:"mini",plain:"plain"},nativeOn:{click:function(t){o.copyCode03()}}},[o._v("复制js代码")]),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"warn"},nativeOn:{click:function(t){o.copyCode04()}}},[o._v("复制css代码")]),i("textarea",{directives:[{name:"model",rawName:"v-model",value:o.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:o.tempCode},on:{input:function(t){t.target.composing||(o.tempCode=t.target.value)}}})],1)},d=[],r=i("2455");function h(o){i("5694")}var p=!1,u=h,w=null,g=null,x=Object(r["a"])(a,c,d,p,u,w,g);t["default"]=x.exports},5694:function(o,t,i){var s=i("7fef");"string"===typeof s&&(s=[[o.i,s,""]]),s.locals&&(o.exports=s.locals);var n=i("499e").default;n("2d19ee5e",s,!0,{})},"7fef":function(o,t,i){t=o.exports=i("2350")(!1),t.push([o.i,"\n.vux-close {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  color: #999;\n  width: 24px;\n  height: 24px\n}\n.vux-close:before, .vux-close:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 11px;\n  width: 24px;\n  height: 1px;\n  background-color: currentColor;\n  transform: rotate(-45deg);\n}\n.vux-close:after {\n  transform: rotate(45deg);\n}\n.xDialog {\n}\n.xDialog__wrap {\n}\n.weui-dialog  .weui-dialog {\n    border-radius: 8px;\n    padding-bottom: 8px;\n}\n.weui-dialog  .dialog-title {\n    line-height: 30px;\n    color: #666;\n}\n.weui-dialog  .img-box {\n    height: 350px;\n    overflow: hidden;\n}\n.weui-dialog  .vux-close {\n    margin-top: 8px;\n    margin-bottom: 8px;\n}\n",""])}}]);