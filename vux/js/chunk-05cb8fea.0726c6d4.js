(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05cb8fea"],{"1d95":function(e,t,i){var n=i("d299");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("499e").default;o("42334b4f",n,!0,{})},"32e1":function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,"\n.checklist[data-v-1d24695f] {\n}\n.checklist__wrap .error[data-v-1d24695f] {\n    padding-left: 15px;\n    line-height: 28px;\n    color: #888;\n    font-size: 12px;\n}\n",""])},a4ad:function(e,t,i){"use strict";i.r(t);var n=i("f678"),o=i("a784"),c=i("b900"),l=i("3807"),a=i("c0f1"),s=i("3d68"),r=(n["a"],o["a"],c["a"],l["a"],a["a"],s["a"],{components:{Group:n["a"],CellBox:o["a"],Checklist:c["a"],Cell:l["a"],Divider:a["a"],XButton:s["a"]},mounted:function(){var e=this;setTimeout(function(){e.asyncList=["A","B","C","D"]},3e3)},data:function(){return{tempCode:"",fullValues:[],labelPosition:"",error:"",commonList:["China","Japan","America"],checklist001:[],checklist0011:[],checklist002:["China","Japan"],checklist003:["China","Japan"],checklist005:["01","02","03"],checklist005Value:[],objectList:[{key:"1",value:"001 value"},{key:"2",value:"002 value"},{key:"3",value:"003 value"}],objectListValue:["1","2"],inlineDescList:[{key:"1",value:"Tiger is good",inlineDesc:"Tiger is the king of mountain"},{key:"2",value:"Lion is better",inlineDesc:"Lion is the king of woods"},{key:"3",value:"Camel is best, no inline-desc"}],inlineDescListValue:[1],asyncList:[],asyncListValue:[],radioValue:["China"]}},methods:{change:function(e,t){console.log("change",e,t)},selectFirst:function(){this.checklist001=["China"]},selectFirstTwo:function(){this.checklist001=["China","Japan"]},selectLeft:function(){var e=_.without.apply(_,[this.commonList].concat(this.checklist001));this.checklist001=e},copyCodeMethod:function(){var e=setInterval(function(){var t=document.getElementById("codeText");t.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(e)},500)},copyCode01:function(){this.tempCode=' checklist(title="一般使用", :label-position="labelPosition", required, :options="commonList", v-model="checklist001", @on-change="change")\n    div(style="padding:15px;")\n      x-button(@click.native="labelPosition = labelPosition === \'left\' ? \'\' : \'left\'", type="primary")  切换label的位置\n      x-button(@click.native="selectFirst", type="primary")  选择第1个值\n      x-button(@click.native="selectFirstTwo", type="primary")  选择前两个值\n      x-button(@click.native="selectLeft", type="primary")  选择剩下值 ',this.copyCodeMethod()},copyCode02:function(){this.tempCode='checklist(title="默认选中China和Japan（禁用操作）", disabled label-position="left", :options="commonList", v-model="checklist002", @on-change="change")',this.copyCodeMethod()},copyCode03:function(){this.tempCode='checklist(title="最多可选中2个", :options="commonList", v-model="checklist003", :max=2 @on-change="change")',this.copyCodeMethod()},copyCode04:function(){this.tempCode=' checklist(title="max=1（单选模式）", :options="commonList", v-model="radioValue", :max="1", @on-change="change")',this.copyCodeMethod()},copyCode05:function(){this.tempCode=' checklist(title="打乱选项顺序", random-order :options="checklist005", v-model="checklist005Value", @on-change="change")',this.copyCodeMethod()},copyCode06:function(){this.tempCode='   checklist(ref="demoObject", title="使用Object类型的选项列表，key必须为字符串", :options="objectList", v-model="objectListValue", @on-change="change")\n    group\n      cell-box {{ fullValues }}\n    div(style="padding:15px;")\n      x-button(type="primary", @click.native="fullValues = $refs.demoObject.getFullValue()")   getFullValue()',this.copyCodeMethod()},copyCode07:function(){this.tempCode='checklist(title="包含inlineDesc属性的Object类型选项列表", :options="inlineDescList", v-model="inlineDescListValue", @on-change="change")',this.copyCodeMethod()},copyCode08:function(){this.tempCode='    checklist(title="异步选项列表", :max="3", :options="asyncList", v-model="asyncListValue", @on-change="change")',this.copyCodeMethod()},copyCode09:function(){this.tempCode='    divider  相关\n    group(title="参见")\n      cell(title="Checker", is-link link="/comp/checker")',this.copyCodeMethod()},copyCode10:function(){this.tempCode="  import { Group, CellBox, Checklist, Cell, Divider, XButton } from 'vux';\n  export default {\n    components: { Group, CellBox, Checklist, Cell, Divider, XButton },\n    mounted () {\n      setTimeout(() => {\n        this.asyncList = ['A', 'B', 'C', 'D']\n      }, 3000)\n    },\n    data() {\n      return {\n        fullValues: [],\n        labelPosition: '',\n        error: '',\n        commonList: [ 'China', 'Japan', 'America' ],\n        checklist001: [],\n        checklist0011: [],\n        checklist002: [ 'China', 'Japan' ],\n        checklist003: [ 'China', 'Japan' ],\n        checklist005: [ '01', '02', '03' ],\n        checklist005Value: [],\n        objectList: [{key: '1', value: '001 value'}, {key: '2', value: '002 value'}, {key: '3', value: '003 value'}],\n        objectListValue: ['1', '2'],\n        inlineDescList: [\n          {key: '1', value: 'Tiger is good', inlineDesc: 'Tiger is the king of mountain'},\n          {key: '2', value: 'Lion is better', inlineDesc: 'Lion is the king of woods'},\n          {key: '3', value: 'Camel is best, no inline-desc'}\n        ],\n        inlineDescListValue: [1],\n        asyncList: [],\n        asyncListValue: [],\n        radioValue: ['China']\n      }\n    },\n    methods: {\n      change (val, label) {\n        console.log('change', val, label)\n      },\n      selectFirst () {\n        this.checklist001 = ['China']\n      },\n      selectFirstTwo () {\n        this.checklist001 = ['China', 'Japan']\n      },\n      selectLeft () {\n        const left = _.without.apply(_, [this.commonList].concat(this.checklist001))\n        this.checklist001 = left\n      },\n    }\n  }",this.copyCodeMethod()},copyCode11:function(){this.tempCode=".error {\n  padding-left: 15px;\n  line-height: 28px;\n  color: #888;\n  font-size: 12px;\n}",this.copyCodeMethod()}}}),p=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"checklist__wrap"},[i("checklist",{attrs:{title:"一般使用","label-position":e.labelPosition,required:"required",options:e.commonList},on:{"on-change":e.change},model:{value:e.checklist001,callback:function(t){e.checklist001=t},expression:"checklist001"}}),i("div",{staticStyle:{padding:"15px"}},[i("x-button",{attrs:{type:"primary"},nativeOn:{click:function(t){e.labelPosition="left"===e.labelPosition?"":"left"}}},[e._v(" 切换label的位置")]),i("x-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.selectFirst(t)}}},[e._v(" 选择第1个值")]),i("x-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.selectFirstTwo(t)}}},[e._v(" 选择前两个值")]),i("x-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.selectLeft(t)}}},[e._v(" 选择剩下值")])],1),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){e.copyCode01()}}},[e._v("复制代码")]),i("checklist",{attrs:{title:"默认选中China和Japan（禁用操作）",disabled:"disabled","label-position":"left",options:e.commonList},on:{"on-change":e.change},model:{value:e.checklist002,callback:function(t){e.checklist002=t},expression:"checklist002"}}),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){e.copyCode02()}}},[e._v("复制代码")]),i("checklist",{attrs:{title:"最多可选中2个",options:e.commonList,max:2},on:{"on-change":e.change},model:{value:e.checklist003,callback:function(t){e.checklist003=t},expression:"checklist003"}}),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){e.copyCode03()}}},[e._v("复制代码")]),i("checklist",{attrs:{title:"max=1（单选模式）",options:e.commonList,max:1},on:{"on-change":e.change},model:{value:e.radioValue,callback:function(t){e.radioValue=t},expression:"radioValue"}}),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){e.copyCode04()}}},[e._v("复制代码")]),i("checklist",{attrs:{title:"打乱选项顺序","random-order":"random-order",options:e.checklist005},on:{"on-change":e.change},model:{value:e.checklist005Value,callback:function(t){e.checklist005Value=t},expression:"checklist005Value"}}),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){e.copyCode05()}}},[e._v("复制代码")]),i("checklist",{ref:"demoObject",attrs:{title:"使用Object类型的选项列表，key必须为字符串",options:e.objectList},on:{"on-change":e.change},model:{value:e.objectListValue,callback:function(t){e.objectListValue=t},expression:"objectListValue"}}),i("group",[i("cell-box",[e._v(e._s(e.fullValues))])],1),i("div",{staticStyle:{padding:"15px"}},[i("x-button",{attrs:{type:"primary"},nativeOn:{click:function(t){e.fullValues=e.$refs.demoObject.getFullValue()}}},[e._v("  getFullValue()")])],1),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){e.copyCode06()}}},[e._v("复制代码")]),i("checklist",{attrs:{title:"包含inlineDesc属性的Object类型选项列表",options:e.inlineDescList},on:{"on-change":e.change},model:{value:e.inlineDescListValue,callback:function(t){e.inlineDescListValue=t},expression:"inlineDescListValue"}}),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){e.copyCode07()}}},[e._v("复制代码")]),i("checklist",{attrs:{title:"异步选项列表",max:3,options:e.asyncList},on:{"on-change":e.change},model:{value:e.asyncListValue,callback:function(t){e.asyncListValue=t},expression:"asyncListValue"}}),i("br"),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){e.copyCode08()}}},[e._v("复制代码")]),i("divider",[e._v(" 相关")]),i("group",{attrs:{title:"参见"}},[i("cell",{attrs:{title:"Checker","is-link":"is-link",link:"/vux/comp/checker"}})],1),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){e.copyCode09()}}},[e._v("复制代码")]),i("x-button",{attrs:{mini:"mini",plain:"plain"},nativeOn:{click:function(t){e.copyCode10()}}},[e._v("复制js代码")]),i("x-button",{attrs:{mini:"mini",plain:"plain",type:"warn"},nativeOn:{click:function(t){e.copyCode11()}}},[e._v("复制css代码")]),i("textarea",{directives:[{name:"model",rawName:"v-model",value:e.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:e.tempCode},on:{input:function(t){t.target.composing||(e.tempCode=t.target.value)}}})],1)},u=[],d=i("2455");function h(e){i("b411")}var m=!1,v=h,k="data-v-1d24695f",y=null,b=Object(d["a"])(r,p,u,m,v,k,y);t["default"]=b.exports},b411:function(e,t,i){var n=i("32e1");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("499e").default;o("56ed301c",n,!0,{})},c0f1:function(e,t,i){"use strict";var n={name:"divider"},o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",{staticClass:"vux-divider"},[e._t("default")],2)},c=[],l=i("2455");function a(e){i("1d95")}var s=!1,r=a,p=null,u=null,d=Object(l["a"])(n,o,c,s,r,p,u);t["a"]=d.exports},d299:function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,"\n.vux-divider {\n  display: table;\n  white-space: nowrap;\n  height: auto;\n  overflow: hidden;\n  line-height: 1;\n  text-align: center;\n  padding: 10px 0;\n  color: #666;\n}\n.vux-divider:after, .vux-divider:before {\n  content: '';\n  display: table-cell;\n  position: relative;\n  top: 50%;\n  width: 50%;\n  background-repeat: no-repeat;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC)\n}\n.vux-divider:before {\n  background-position: right 1em top 50%\n}\n.vux-divider:after {\n  background-position: left 1em top 50%\n}\n",""])}}]);