(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-59642dfe"],{"5aa4":function(t,n,o){var e=o("5bd2");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var r=o("499e").default;r("4750949d",e,!0,{})},"5bd2":function(t,n,o){n=t.exports=o("2350")(!1),n.push([t.i,"\n.x-table {\n}\n.x-table__wrap {\n}\n",""])},"5c7b":function(t,n,o){"use strict";o.r(n);Boolean,Boolean,Boolean;var e={name:"x-table",props:{fullBordered:Boolean,cellBordered:{type:Boolean,default:!0},contentBordered:{type:Boolean,default:!0}}},r=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("table",{staticClass:"vux-table",class:{"vux-table-bordered":t.fullBordered,"vux-table-no-cell-bordered":!t.cellBordered,"vux-table-no-content-bordered":!t.contentBordered}},[t._t("default")],2)},a=[],d=o("2455");function l(t){o("a77c")}var i=!1,c=l,s=null,b=null,p=Object(d["a"])(e,r,a,i,c,s,b),f=p.exports,u=o("f0b3"),x=o("3d68"),h=(u["a"],x["a"],{components:{XTable:f,LoadMore:u["a"],XButton:x["a"]},data:function(){return{tempCode:""}},methods:{copyCodeMethod:function(){var t=setInterval(function(){var n=document.getElementById("codeText");n.select(),document.execCommand("Copy"),console.log("copy success!!!"),clearInterval(t)},500)},copyCode01:function(){this.tempCode=' load-more(tip="default", :show-loading="false", background-color="#fbf9fe")\n    div(style="padding:0 15px;")\n      x-table\n        thead\n          tr\n            th Product\n            th Price\n        tbody\n          tr\n            td Apple\n            td $1.25\n          tr\n            td Banana\n            td $1.20',this.copyCodeMethod()},copyCode02:function(){this.tempCode=' div\n      load-more(tip="cell-bordered=false", :show-loading="false", background-color="#fbf9fe")\n      x-table(:cell-bordered="false", style="background-color:#fff;")\n        thead\n          tr\n            th Product\n            th Price\n            th Quantity\n        tbody\n          tr\n            td Apple\n            td $1.25\n            td  x 1\n          tr\n            td Banana\n            td $1.20',this.copyCodeMethod()},copyCode03:function(){this.tempCode='  load-more(tip="content-bordered=false", :show-loading="false", background-color="#fbf9fe")\n    x-table(:cell-bordered="false", :content-bordered="false", style="background-color:#fff;")\n      thead\n        tr(style="background-color: #F7F7F7")\n          th Product\n          th Price\n          th Quantity\n      tbody\n        tr\n          td Apple\n          td $1.25\n          td  x 1\n        tr\n          td Banana\n          td $1.20\n          td  x 2',this.copyCodeMethod()},copyCode04:function(){this.tempCode=' div(style="padding:15px;")\n      load-more(tip="full-bordered", :show-loading="false", background-color="#fbf9fe")\n      x-table(full-bordered style="background-color:#fff;")\n        thead\n          tr\n            th Product\n            th Price\n            th Quantity\n        tbody\n          tr\n            td Apple\n            td(colspan="2") $1.25 x 10\n          tr\n            td Banana\n            td $1.20\n            td x 08',this.copyCodeMethod()},copyCode05:function(){this.tempCode=" import { XTable, LoadMore, XButton } from 'vux';\n  export default {\n    components: { XTable, LoadMore, XButton },\n    data() {\n      return {\n      }\n    },\n    methods: {\n    }\n  }",this.copyCodeMethod()}}}),v=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"x-table__wrap"},[o("load-more",{attrs:{tip:"default","show-loading":!1,"background-color":"#fbf9fe"}}),o("div",{staticStyle:{padding:"0 15px"}},[o("x-table",[o("thead",[o("tr",[o("th",[t._v("Product")]),o("th",[t._v("Price")])])]),o("tbody",[o("tr",[o("td",[t._v("Apple")]),o("td",[t._v("$1.25")])]),o("tr",[o("td",[t._v("Banana")]),o("td",[t._v("$1.20")])])])])],1),o("br"),o("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(n){t.copyCode01()}}},[t._v("复制代码")]),o("div",[o("load-more",{attrs:{tip:"cell-bordered=false","show-loading":!1,"background-color":"#fbf9fe"}}),o("x-table",{staticStyle:{"background-color":"#fff"},attrs:{"cell-bordered":!1}},[o("thead",[o("tr",[o("th",[t._v("Product")]),o("th",[t._v("Price")]),o("th",[t._v("Quantity")])])]),o("tbody",[o("tr",[o("td",[t._v("Apple")]),o("td",[t._v("$1.25")]),o("td",[t._v(" x 1")])]),o("tr",[o("td",[t._v("Banana")]),o("td",[t._v("$1.20")]),o("td",[t._v(" x 2")])])])])],1),o("br"),o("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(n){t.copyCode02()}}},[t._v("复制代码")]),o("load-more",{attrs:{tip:"content-bordered=false","show-loading":!1,"background-color":"#fbf9fe"}}),o("x-table",{staticStyle:{"background-color":"#fff"},attrs:{"cell-bordered":!1,"content-bordered":!1}},[o("thead",[o("tr",{staticStyle:{"background-color":"#F7F7F7"}},[o("th",[t._v("Product")]),o("th",[t._v("Price")]),o("th",[t._v("Quantity")])])]),o("tbody",[o("tr",[o("td",[t._v("Apple")]),o("td",[t._v("$1.25")]),o("td",[t._v(" x 1")])]),o("tr",[o("td",[t._v("Banana")]),o("td",[t._v("$1.20")]),o("td",[t._v(" x 2")])])])]),o("br"),o("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(n){t.copyCode03()}}},[t._v("复制代码")]),o("div",{staticStyle:{padding:"15px"}},[o("load-more",{attrs:{tip:"full-bordered","show-loading":!1,"background-color":"#fbf9fe"}}),o("x-table",{staticStyle:{"background-color":"#fff"},attrs:{"full-bordered":"full-bordered"}},[o("thead",[o("tr",[o("th",[t._v("Product")]),o("th",[t._v("Price")]),o("th",[t._v("Quantity")])])]),o("tbody",[o("tr",[o("td",[t._v("Apple")]),o("td",{attrs:{colspan:"2"}},[t._v("$1.25 x 10")])]),o("tr",[o("td",[t._v("Banana")]),o("td",[t._v("$1.20")]),o("td",[t._v("x 08")])])])])],1),o("x-button",{attrs:{mini:"mini",plain:"plain",type:"primary"},nativeOn:{click:function(n){t.copyCode04()}}},[t._v("复制代码")]),o("x-button",{attrs:{mini:"mini",plain:"plain"},nativeOn:{click:function(n){t.copyCode05()}}},[t._v("复制js代码")]),o("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tempCode,expression:"tempCode"}],staticStyle:{width:"0",height:"0",overflow:"hidden",border:"none",background:"transparent",position:"absolute","z-index":"-1"},attrs:{id:"codeText"},domProps:{value:t.tempCode},on:{input:function(n){n.target.composing||(t.tempCode=n.target.value)}}})],1)},C=[];function m(t){o("5aa4")}var g=!1,y=m,_=null,w=null,k=Object(d["a"])(h,v,C,g,y,_,w);n["default"]=k.exports},"9f82":function(t,n,o){n=t.exports=o("2350")(!1),n.push([t.i,'\n.vux-1px, .vux-1px-t, .vux-1px-b, .vux-1px-tb, .vux-1px-l, .vux-1px-r {\n  position: relative;\n}\n.vux-1px:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 200%;\n  border: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  height: 200%;\n  transform-origin: left top;\n  transform: scale(0.5);\n}\n.vux-1px-t:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.vux-1px-b:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.vux-1px-tb:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.vux-1px-tb:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.vux-1px-l:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-left: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 0;\n  transform: scaleX(0.5);\n}\n.vux-1px-r:after {\n  content: " ";\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-right: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 100% 0;\n  transform: scaleX(0.5);\n}\n.vux-table {\n  line-height: 40px;\n  position: relative;\n  width: 100%;\n  border-collapse: collapse;\n}\n.vux-table:after {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.vux-table th {\n  font-weight: 500;\n}\n.vux-table.vux-table-bordered:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-left: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 0;\n  transform: scaleX(0.5);\n}\n.vux-table td, .vux-table th {\n  border-bottom: 1px solid #e0e0e0;\n  border-right: 1px solid #e0e0e0;\n  text-align: center;\n}\n.vux-table td, .vux-table th {\n  position: relative;\n  border-right: 0;\n  border-bottom: 0;\n}\n.vux-table td:before, .vux-table th:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.vux-table.vux-table-no-content-bordered td:before {\n  border-bottom-width: 0;\n}\n.vux-table.vux-table-no-content-bordered tr:last-child td:before {\n  border-bottom-width: 1px;\n}\n.vux-table td:after, .vux-table th:after {\n  content: " ";\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-right: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 100% 0;\n  transform: scaleX(0.5);\n}\n.vux-table.vux-table-no-cell-bordered td:after, .vux-table.vux-table-no-cell-bordered th:after {\n  border-right-width: 0;\n}\n.vux-table tr td:last-child:after, .vux-table tr th:last-child:after {\n  border-right-width: 0;\n}\n.vux-table.vux-table-bordered tr td:last-child:after, .vux-table.vux-table-bordered tr th:last-child:after {\n  border-right-width: 1px;\n}\n',""])},a77c:function(t,n,o){var e=o("9f82");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var r=o("499e").default;r("503f58d2",e,!0,{})}}]);