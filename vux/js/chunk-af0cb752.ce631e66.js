(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-af0cb752"],{1637:function(e,t,a){"use strict";var o=a("be94"),r=a("7be5"),n={line:"line",point:"circle",area:"area"};t["a"]={props:{colors:[String,Array],seriesField:String,adjust:[String,Object]},created:function(){this.$parent.set(this.chartName,Object(o["a"])({shape:n[this.chartName]||""},this.$props,Object(r["a"])(this.$attrs)))},render:function(){}}},2171:function(e,t,a){"use strict";var o,r,n=a("be94"),i=a("7be5"),s=(Object,Boolean,{props:{options:{type:Object,default:function(){return{}}},disabled:{type:Boolean,default:!1}},created:function(){this.$parent.setLegend(Object(n["a"])({},this.options,{disabled:this.disabled},Object(i["a"])(this.$attrs)))},render:function(){}}),p=a("2455"),l=!1,u=null,c=null,y=null,d=Object(p["a"])(s,o,r,l,u,c,y);t["a"]=d.exports},"2a84":function(e,t,a){"use strict";var o,r,n=a("1637"),i=(n["a"],{mixins:[n["a"]],data:function(){return{chartName:"area"}}}),s=a("2455"),p=!1,l=null,u=null,c=null,y=Object(s["a"])(i,o,r,p,l,u,c);t["a"]=y.exports},"3bd6":function(e,t,a){var o=a("8784");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var r=a("499e").default;r("48ee6348",o,!0,{})},"5aef":function(e,t,a){"use strict";a.r(t);var o=a("3950"),r=a("95cd"),n=a("2a84"),i=a("fce2"),s=a("2171"),p=a("3d68"),l=a("dbcc"),u=(o["a"],r["a"],n["a"],i["a"],s["a"],p["a"],{components:{VChart:o["a"],VLine:r["a"],VArea:n["a"],VTooltip:i["a"],VLegend:s["a"],XButton:p["a"]},data:function(){return{tempCode:"",data:l}},methods:{copyCodeMethod:function(){var e=setInterval(function(){var t=document.getElementById("codeText");t.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(e)},500)},copyCode01:function(){this.tempCode='   v-chart(:data="data")\n      v-tooltip(show-crosshairs)\n      v-area(series-field="type", shape="smooth")\n      v-legend(disabled)\n      v-line(series-field="type", shape="smooth")',this.copyCodeMethod()},copyCode02:function(){this.tempCode=" import { VChart, VLine, VArea, VTooltip, VLegend } from 'vux'\n  import data from '../../../assets/json/vux/data/emptyAreaMapData'\n\n  export default {\n    components: { VChart, VLine, VArea, VTooltip, VLegend } ,\n    data() {\n      return {\n        data\n      }\n    },\n    methods:{\n    },\n  }",this.copyCodeMethod()}}}),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"emptyAreaMap__wrap"},[a("v-chart",{attrs:{data:e.data}},[a("v-tooltip",{attrs:{"show-crosshairs":"show-crosshairs"}}),a("v-area",{attrs:{"series-field":"type",shape:"smooth"}}),a("v-legend",{attrs:{disabled:"disabled"}}),a("v-line",{attrs:{"series-field":"type",shape:"smooth"}})],1),a("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(t){e.copyCode01()}}},[e._v("复制代码")]),a("x-button",{attrs:{mini:"mini",plain:"plain"},nativeOn:{click:function(t){e.copyCode02()}}},[e._v("复制js代码")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:e.tempCode},on:{input:function(t){t.target.composing||(e.tempCode=t.target.value)}}})],1)},y=[],d=a("2455");function v(e){a("3bd6")}var h=!1,m=v,C=null,f=null,b=Object(d["a"])(u,c,y,h,m,C,f);t["default"]=b.exports},"7be5":function(e,t,a){"use strict";a.d(t,"a",function(){return r});a("a481");var o=function(e){return e.replace(/(-[a-z])/g,function(e){return e.toUpperCase().replace("-","")})},r=function(e){for(var t in e){var a=o(t);e[a]=e[t],a!==t&&delete e[t]}return e}},8784:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,"\n.emptyAreaMap {\n}\n.emptyAreaMap__wrap {\n}\n",""])},"95cd":function(e,t,a){"use strict";var o,r,n=a("1637"),i=(n["a"],{mixins:[n["a"]],data:function(){return{chartName:"line"}}}),s=a("2455"),p=!1,l=null,u=null,c=null,y=Object(s["a"])(i,o,r,p,l,u,c);t["a"]=y.exports},dbcc:function(e){e.exports=[{year:"1986",type:"ACME",value:162},{year:"1986",type:"Compitor",value:42},{year:"1987",type:"ACME",value:134},{year:"1987",type:"Compitor",value:54},{year:"1988",type:"ACME",value:116},{year:"1988",type:"Compitor",value:26},{year:"1989",type:"ACME",value:122},{year:"1989",type:"Compitor",value:32},{year:"1990",type:"ACME",value:178},{year:"1990",type:"Compitor",value:68},{year:"1991",type:"ACME",value:144},{year:"1991",type:"Compitor",value:54},{year:"1992",type:"ACME",value:125},{year:"1992",type:"Compitor",value:35},{year:"1993",type:"ACME",value:176},{year:"1993",type:"Compitor",value:66},{year:"1994",type:"ACME",value:156},{year:"1994",type:"Compitor"},{year:"1995",type:"ACME",value:195},{year:"1995",type:"Compitor"},{year:"1996",type:"ACME",value:215},{year:"1996",type:"Compitor"},{year:"1997",type:"ACME",value:176},{year:"1997",type:"Compitor",value:36},{year:"1998",type:"ACME",value:167},{year:"1998",type:"Compitor",value:47},{year:"1999",type:"ACME",value:142},{year:"1999",type:"Compitor"},{year:"2000",type:"ACME",value:117},{year:"2000",type:"Compitor"},{year:"2001",type:"ACME",value:113},{year:"2001",type:"Compitor",value:23},{year:"2002",type:"ACME",value:132},{year:"2002",type:"Compitor"},{year:"2003",type:"ACME",value:146},{year:"2003",type:"Compitor",value:46},{year:"2004",type:"ACME",value:169},{year:"2004",type:"Compitor",value:59},{year:"2005",type:"ACME",value:184},{year:"2005",type:"Compitor",value:44}]},fce2:function(e,t,a){"use strict";var o,r,n=a("be94"),i=a("7be5"),s=(Boolean,Boolean,Boolean,Boolean,Boolean,Object,{props:{disabled:{type:Boolean,default:!1},showCrosshairs:{type:Boolean,default:!0},showItemMarker:{type:Boolean,default:!0},showXValue:{type:Boolean,default:!1},showValueInLegend:{type:Boolean,default:!1},options:{type:Object,default:function(){return{}}}},render:function(){},created:function(){var e=Object(n["a"])({disabled:this.disabled,showCrosshairs:this.showCrosshairs,showItemMarker:this.showItemMarker,showValueInLegend:this.showValueInLegend},Object(i["a"])(this.options),Object(i["a"])(this.$attrs));this.showXValue&&(e.onShow=function(e){var t=e.items;t[0].name=t[0].title}),this.$parent.setTooltip(e)}}),p=a("2455"),l=!1,u=null,c=null,y=null,d=Object(p["a"])(s,o,r,l,u,c,y);t["a"]=d.exports}}]);