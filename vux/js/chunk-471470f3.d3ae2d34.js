(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-471470f3"],{1637:function(e,t,n){"use strict";n("759e"),n("ed74"),n("53ee"),n("d8c6"),n("62d3"),n("ad5a"),n("ba87");var r=n("bd86"),o=n("7be5");function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(n,!0).forEach(function(t){Object(r["a"])(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var i={line:"line",point:"circle",area:"area"};t["a"]={props:{colors:[String,Array],seriesField:String,adjust:[String,Object]},created:function(){this.$parent.set(this.chartName,c({shape:i[this.chartName]||""},this.$props,{},Object(o["a"])(this.$attrs)))},render:function(){}}},"1ceb":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,"\n.negativeAreaMap {\n}\n.negativeAreaMap__wrap {\n}\n",""])},"2a84":function(e,t,n){"use strict";var r,o,a=n("1637"),c=(a["a"],{mixins:[a["a"]],data:function(){return{chartName:"area"}}}),i=n("2455"),s=!1,l=null,u=null,p=null,f=Object(i["a"])(c,r,o,s,l,u,p);t["a"]=f.exports},"448b":function(e){e.exports=JSON.parse('[{"month":"Jan.","value":6.06},{"month":"Feb.","value":82.2},{"month":"Mar.","value":-22.11},{"month":"Apr.","value":21.53},{"month":"May.","value":-21.74},{"month":"Jun.","value":73.61},{"month":"Jul.","value":53.75},{"month":"Aug.","value":60.32}]')},"7be5":function(e,t,n){"use strict";n.d(t,"a",function(){return o});n("b58b");var r=function(e){return e.replace(/(-[a-z])/g,function(e){return e.toUpperCase().replace("-","")})},o=function(e){for(var t in e){var n=r(t);e[n]=e[t],n!==t&&delete e[t]}return e}},"95cd":function(e,t,n){"use strict";var r,o,a=n("1637"),c=(a["a"],{mixins:[a["a"]],data:function(){return{chartName:"line"}}}),i=n("2455"),s=!1,l=null,u=null,p=null,f=Object(i["a"])(c,r,o,s,l,u,p);t["a"]=f.exports},c312:function(e,t,n){var r=n("1ceb");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var o=n("499e").default;o("4884020e",r,!0,{})},c540:function(e,t,n){"use strict";n("759e"),n("ed74"),n("53ee"),n("62d3"),n("ba87");var r=n("bd86"),o=(n("ad5a"),n("d8c6"),n("7be5"));function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach(function(t){Object(r["a"])(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}Boolean,Boolean,String;function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach(function(t){Object(r["a"])(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var l,u,p={props:{x:Boolean,y:Boolean,field:String},render:function(){},created:function(){this.emitSetting()},methods:{emitSetting:function(){var e=this;["x","y"].forEach(function(t){e[t]&&(e.$parent.setScale(Object(r["a"])({},t,s({},Object(o["a"])(e.$attrs)))),e.field&&e.$parent.setField(t,e.field))})}}},f=n("2455"),b=!1,d=null,O=null,h=null,v=Object(f["a"])(p,l,u,b,d,O,h);t["a"]=v.exports},c71c:function(e,t,n){"use strict";n.r(t);var r=n("3950"),o=n("95cd"),a=n("2a84"),c=n("fce2"),i=n("c540"),s=n("3d68"),l=n("448b"),u=(r["a"],o["a"],a["a"],c["a"],i["a"],s["a"],{components:{VChart:r["a"],VLine:o["a"],VArea:a["a"],VTooltip:c["a"],VScale:i["a"],XButton:s["a"]},data:function(){return{tempCode:"",tooltip:{showItemMarker:!1,onShow:function(e){var t=e.items;t[0].name=t[0].title}},data:l}},methods:{copyCodeMethod:function(){var e=setInterval(function(){var t=document.getElementById("codeText");t.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(e)},500)},copyCode01:function(){this.tempCode='    v-chart(:data="data")\n      v-scale(x, :tick-count="0")\n      v-scale(y, :nice="false", :min="-100", :max="100")\n      v-tooltip\n      v-area\n      v-line',this.copyCodeMethod()},copyCode02:function(){this.tempCode="  import { VChart, VLine, VArea, VTooltip, VScale } from 'vux'\n  import data from '../../../assets/json/vux/data/negativeAreaMapData'\n\n  export default {\n    components: { VChart, VLine, VArea, VTooltip, VScale },\n    data() {\n      return {\n        tooltip: {\n          showItemMarker: false,\n          onShow (ev) {\n            const { items } = ev\n            items[0].name = items[0].title\n          }\n        },\n        data\n      }\n    },\n    methods:{\n    },\n  }",this.copyCodeMethod()}}}),p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"negativeAreaMap__wrap"},[n("v-chart",{attrs:{data:e.data}},[n("v-scale",{attrs:{x:"x","tick-count":0}}),n("v-scale",{attrs:{y:"y",nice:!1,min:-100,max:100}}),n("v-tooltip"),n("v-area"),n("v-line")],1),n("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){return e.copyCode01()}}},[e._v("复制代码")]),n("x-button",{attrs:{mini:"mini",plain:"plain"},nativeOn:{click:function(t){return e.copyCode02()}}},[e._v("复制js代码")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:e.tempCode},on:{input:function(t){t.target.composing||(e.tempCode=t.target.value)}}})],1)},f=[],b=n("2455");function d(e){n("c312")}var O=!1,h=d,v=null,y=null,m=Object(b["a"])(u,p,f,O,h,v,y);t["default"]=m.exports},fce2:function(e,t,n){"use strict";n("759e"),n("ed74"),n("53ee"),n("d8c6"),n("62d3"),n("ad5a"),n("ba87");var r=n("bd86"),o=n("7be5");function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach(function(t){Object(r["a"])(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}Boolean,Boolean,Boolean,Boolean,Boolean,Object;function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach(function(t){Object(r["a"])(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var l,u,p={props:{disabled:{type:Boolean,default:!1},showCrosshairs:{type:Boolean,default:!0},showItemMarker:{type:Boolean,default:!0},showXValue:{type:Boolean,default:!1},showValueInLegend:{type:Boolean,default:!1},options:{type:Object,default:function(){return{}}}},render:function(){},created:function(){var e=s({disabled:this.disabled,showCrosshairs:this.showCrosshairs,showItemMarker:this.showItemMarker,showValueInLegend:this.showValueInLegend},Object(o["a"])(this.options),{},Object(o["a"])(this.$attrs));this.showXValue&&(e.onShow=function(e){var t=e.items;t[0].name=t[0].title}),this.$parent.setTooltip(e)}},f=n("2455"),b=!1,d=null,O=null,h=null,v=Object(f["a"])(p,l,u,b,d,O,h);t["a"]=v.exports}}]);