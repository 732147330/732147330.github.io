(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7655a8c8"],{"00e1":function(t){t.exports=[{day:"周一",value:300},{day:"周二",value:400},{day:"周三",value:350},{day:"周四",value:500},{day:"周五",value:490},{day:"周六",value:600},{day:"周日",value:900}]},1637:function(t,e,n){"use strict";var a=n("be94"),o=n("7be5"),i={line:"line",point:"circle",area:"area"};e["a"]={props:{colors:[String,Array],seriesField:String,adjust:[String,Object]},created:function(){this.$parent.set(this.chartName,Object(a["a"])({shape:i[this.chartName]||""},this.$props,Object(o["a"])(this.$attrs)))},render:function(){}}},"3cf5":function(t,e,n){"use strict";n.r(e);var a=n("3950"),o=n("bd0a"),i=n("fce2"),r=n("95cd"),s=n("c540"),l=n("3d68"),c=n("00e1"),u=(a["a"],o["a"],i["a"],r["a"],s["a"],l["a"],{components:{VChart:a["a"],VPoint:o["a"],VTooltip:i["a"],VLine:r["a"],VScale:s["a"],XButton:l["a"]},data:function(){return{tempCode:"",onShow:function(t){var e=t.items;e[0].name="价格",e[0].value="$ "+e[0].value},data:c}},methods:{copyCodeMethod:function(){var t=setInterval(function(){var e=document.getElementById("codeText");e.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(t)},500)},copyCode01:function(){this.tempCode='    v-chart(:data="data")\n      //默认 y 轴数值从数据的最小值到最大值，此处重置为从 0 开始\n      v-scale(y, :min="0")\n      v-point(:styles="{stroke: \'#fff\',lineWidth: 1}")\n      //onShow 为 F2 属性而非事件\n      v-tooltip(:show-item-marker="false", :on-show="onShow")\n      v-line',this.copyCodeMethod()},copyCode02:function(){this.tempCode="  import { VChart, VPoint, VTooltip, VLine, VScale } from 'vux'\n  import data from '../../../assets/json/vux/data/displayDotGraphMapData'\n\n  export default {\n    components: { VChart, VPoint, VTooltip, VLine, VScale },\n    data() {\n      return {\n        onShow (ev) {\n          const { items } = ev\n          //items[0].name = null\n          items[0].name = '价格'\n          items[0].value = '$ ' + items[0].value\n        },\n        data\n      }\n    },\n    methods:{\n    },\n  }",this.copyCodeMethod()}}}),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"displayDotGraphMap__wrap"},[n("v-chart",{attrs:{data:t.data}},[n("v-scale",{attrs:{y:"y",min:0}}),n("v-point",{attrs:{styles:{stroke:"#fff",lineWidth:1}}}),n("v-tooltip",{attrs:{"show-item-marker":!1,"on-show":t.onShow}}),n("v-line")],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(e){t.copyCode01()}}},[t._v("复制代码")]),n("x-button",{attrs:{mini:"mini",plain:"plain"},nativeOn:{click:function(e){t.copyCode02()}}},[t._v("复制js代码")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:t.tempCode},on:{input:function(e){e.target.composing||(t.tempCode=e.target.value)}}})],1)},p=[],h=n("2455");function f(t){n("7cb8")}var m=!1,v=f,y=null,b=null,w=Object(h["a"])(u,d,p,m,v,y,b);e["default"]=w.exports},"7be5":function(t,e,n){"use strict";n.d(e,"a",function(){return o});n("a481");var a=function(t){return t.replace(/(-[a-z])/g,function(t){return t.toUpperCase().replace("-","")})},o=function(t){for(var e in t){var n=a(e);t[n]=t[e],n!==e&&delete t[e]}return t}},"7cb8":function(t,e,n){var a=n("8080");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("499e").default;o("2e2194ae",a,!0,{})},8080:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,"\n.displayDotGraphMap {\n}\n.displayDotGraphMap__wrap {\n}\n",""])},"95cd":function(t,e,n){"use strict";var a,o,i=n("1637"),r=(i["a"],{mixins:[i["a"]],data:function(){return{chartName:"line"}}}),s=n("2455"),l=!1,c=null,u=null,d=null,p=Object(s["a"])(r,a,o,l,c,u,d);e["a"]=p.exports},bd0a:function(t,e,n){"use strict";var a,o,i=n("be94"),r=(Object,Array,String,{props:{styles:{type:Object},colors:{type:Array},seriesField:String},created:function(){this.$parent.setPoint(Object(i["a"])({},this.$props,this.$attrs))},render:function(){}}),s=n("2455"),l=!1,c=null,u=null,d=null,p=Object(s["a"])(r,a,o,l,c,u,d);e["a"]=p.exports},c540:function(t,e,n){"use strict";var a,o,i=n("ade3"),r=n("be94"),s=(n("ac6a"),n("f3e2"),n("7be5")),l=(Boolean,Boolean,String,{props:{x:Boolean,y:Boolean,field:String},render:function(){},created:function(){this.emitSetting()},methods:{emitSetting:function(){var t=this;["x","y"].forEach(function(e){t[e]&&(t.$parent.setScale(Object(i["a"])({},e,Object(r["a"])({},Object(s["a"])(t.$attrs)))),t.field&&t.$parent.setField(e,t.field))})}}}),c=n("2455"),u=!1,d=null,p=null,h=null,f=Object(c["a"])(l,a,o,u,d,p,h);e["a"]=f.exports},fce2:function(t,e,n){"use strict";var a,o,i=n("be94"),r=n("7be5"),s=(Boolean,Boolean,Boolean,Boolean,Boolean,Object,{props:{disabled:{type:Boolean,default:!1},showCrosshairs:{type:Boolean,default:!0},showItemMarker:{type:Boolean,default:!0},showXValue:{type:Boolean,default:!1},showValueInLegend:{type:Boolean,default:!1},options:{type:Object,default:function(){return{}}}},render:function(){},created:function(){var t=Object(i["a"])({disabled:this.disabled,showCrosshairs:this.showCrosshairs,showItemMarker:this.showItemMarker,showValueInLegend:this.showValueInLegend},Object(r["a"])(this.options),Object(r["a"])(this.$attrs));this.showXValue&&(t.onShow=function(t){var e=t.items;e[0].name=e[0].title}),this.$parent.setTooltip(t)}}),l=n("2455"),c=!1,u=null,d=null,p=null,h=Object(l["a"])(s,a,o,c,u,d,p);e["a"]=h.exports}}]);