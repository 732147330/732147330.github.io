(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57b61534"],{"03e6":function(t,e,c){e=t.exports=c("2350")(!1),e.push([t.i,"\n.NumUniqueEmails{\n}\n.NumUniqueEmails__wrap p{\n    text-align: center;\n}\n",""])},"4f37":function(t,e,c){"use strict";c("aa77")("trim",function(t){return function(){return t(this,3)}})},7113:function(t,e,c){"use strict";c.r(e);c("6b54"),c("87b3"),c("57e7"),c("a481"),c("4f37"),c("28a5");var a=c("3d68"),n=c("5234"),r=c("f678"),i=c("4c7a"),o=function(t){for(var e=[],c=0;c<t.length;c++){var a=t[c].split("@");a[0]=a[0].replace(/\./g,"").trim(),a[1]=a[1].trim(),a[0].indexOf("+")>-1&&(a[0]=a[0].substring(0,a[0].indexOf("+")));var n=a[0]+"@"+a[1];-1===e.indexOf(n)&&e.push(n)}return e.length},m=(a["a"],n["a"],r["a"],i["a"],function(t){for(var e=[],c=0;c<t.length;c++){var a=t[c].split("@");a[0]=a[0].replace(/\./g,"").trim(),a[1]=a[1].trim(),a[0].indexOf("+")>-1&&(a[0]=a[0].substring(0,a[0].indexOf("+")));var n=a[0]+"@"+a[1];-1===e.indexOf(n)&&e.push(n)}return e.length}),l={components:{XButton:a["a"],XTextarea:n["a"],Group:r["a"],XInput:i["a"]},data:function(){return{val01:' 输入：["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]\n输出：2\n解释：实际收到邮件的是 "testemail@leetcode.com" 和 "testemail@lee.tcode.com"。',val02:"   var numUniqueEmails = function(emails) {\n    let emailsArr = [];\n    for(let i = 0; i < emails.length; i++){\n      let arr = emails[i].split('@');\n      arr[0] = arr[0].replace(/\\./g, '').trim();\n      arr[1] = arr[1].trim();\n      if(arr[0].indexOf('+') > -1)\n        arr[0] = arr[0].substring(0, arr[0].indexOf('+'))\n      let emailStr = arr[0] + '@' + arr[1];\n      //去重复\n      if(emailsArr.indexOf(emailStr) === -1){\n        emailsArr.push(emailStr);\n      }\n    }\n    return emailsArr.length;\n  };",str1:'["lr.xz.vqx+s.y+d@cqp.com","xq.feegkb+v.g@uawscvuzr.com","xq.feegkb+p.k@uawscvuzr.com","dpuo.bha.z+y+q@cmqitnqwah.com","mbsnewej+hs@eaaj.com","cgm+as.f.m+c+o.i@b.xqq.com","xq.feegkb+pn@uawscvuzr.com","txi+t.mi.s+i.ri@ip.ncjtsc.com","jnjla.t.x+a+ks@t.fdwjyln.com","jnjla.t.x+g.r.h@t.fdwjyln.com","txi+b+w+deoep@ip.ncjtsc.com","mbsnewej+z+x@eaaj.com","ircr.o.muqpf+j@ycxxeo.com","f.t.m+q.m.k.i+fl.j@fkocn.zsgt.com","xq.feegkb+z+l@uawscvuzr.com","txi+wst+x+lsi@ip.ncjtsc.com","f.t.m+eu+g.m+q.ne@fkocn.zsgt.com","jnjla.t.x+k.vl@t.fdwjyln.com","xq.feegkb+y.t@uawscvuzr.com","txi+s.ci.i.x.r+j@ip.ncjtsc.com","f.t.m+f+kpw+tll@fkocn.zsgt.com","txi+b.s+c.c.c.c.p@ip.ncjtsc.com","cdaxxrvpmw+j@qw.pejrbx.com","jnjla.t.x+de+u@t.fdwjyln.com","xq.feegkb+m.l@uawscvuzr.com","txi+ku+i.w+c.u+y@ip.ncjtsc.com","f.t.m+t.xz+v.f.xl@fkocn.zsgt.com","jnjla.t.x+e.s.m@t.fdwjyln.com","mbsnewej+c.j@eaaj.com","f.t.m+bt+khbey@fkocn.zsgt.com","f.t.m+skyzphy@fkocn.zsgt.com","mbsnewej+fc@eaaj.com","cgm+phxeasv@b.xqq.com","xq.feegkb+ia@uawscvuzr.com","mbsnewej+y.c@eaaj.com","dpuo.bha.z+ne@cmqitnqwah.com","dpuo.bha.z+a.u@cmqitnqwah.com","dpuo.bha.z+z+j@cmqitnqwah.com","txi+h.camsy+s@ip.ncjtsc.com","lr.xz.vqx+t.c.p@cqp.com","f.t.m+s.b+l.g+a+o.s@fkocn.zsgt.com","jnjla.t.x+t.w.x@t.fdwjyln.com","xq.feegkb+r+r@uawscvuzr.com","lr.xz.vqx+c.v.z@cqp.com","jnjla.t.x+zk.f@t.fdwjyln.com","f.t.m+rjk+rov+r@fkocn.zsgt.com","cgm+j.c.wab+a+n@b.xqq.com","mbsnewej+e+b@eaaj.com","jnjla.t.x+o+bs@t.fdwjyln.com","mbsnewej+f+y@eaaj.com","cgm+a.uke+tr.w@b.xqq.com","cgm+zvjwtml@b.xqq.com","mbsnewej+jj@eaaj.com","mbsnewej+p+q@eaaj.com","cgm+c+w.tv.slb@b.xqq.com","txi+xqzwydh@ip.ncjtsc.com","jnjla.t.x+ho+s@t.fdwjyln.com","mbsnewej+zd@eaaj.com","f.t.m+e.ob+l.l+d+c@fkocn.zsgt.com","xq.feegkb+tw@uawscvuzr.com","lr.xz.vqx+v.a.z@cqp.com","lr.xz.vqx+pq.o@cqp.com","dpuo.bha.z+ys@cmqitnqwah.com","jnjla.t.x+zpi@t.fdwjyln.com","txi+enaz.w.r.e@ip.ncjtsc.com","cgm+elcfr.gw@b.xqq.com","cgm+buhf+j+pl@b.xqq.com","lr.xz.vqx+n.rk@cqp.com"]',str2:""}},methods:{commitStr:function(){var t=this.str1.replace("[","").replace("]","").replace(/"/g,"").trim().split(",");this.str2=m(t).toString()},cleanCode:function(){this.str1="",this.str2=""}}},s=function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"NumUniqueEmails__wrap"},[t._m(0),c("group",{attrs:{title:"示例1："}},[c("x-textarea",{attrs:{"show-counter":!1,disabled:"disabled"},model:{value:t.val01,callback:function(e){t.val01=e},expression:"val01"}})],1),c("group",{attrs:{title:"提示："}},[c("ul",[c("li",[t._v("1 <= emails[i].length <= 100")]),c("li",[t._v("1 <= emails.length <= 100")]),c("li",[t._v("每封 emails[i] 都包含有且仅有一个 '@' 字符。")])])]),c("group",{attrs:{title:"测试："}},[c("div",{attrs:{slot:"other"},slot:"other"},[c("x-button",{attrs:{mini:"mini",type:"primary"},nativeOn:{click:function(e){return t.commitStr()}}},[t._v("提交")]),c("x-button",{attrs:{mini:"mini",type:"warn"},nativeOn:{click:function(e){return t.cleanCode()}}},[t._v("清空")])],1),c("x-input",{attrs:{title:"输入(邮件地址数组):","label-width":"10em"},model:{value:t.str1,callback:function(e){t.str1=e},expression:"str1"}}),c("x-input",{attrs:{title:"输出(实际收到邮件数量):","label-width":"12em",disabled:"disabled"},model:{value:t.str2,callback:function(e){t.str2=e},expression:"str2"}})],1),c("group",{attrs:{title:"js代码："}},[c("x-textarea",{attrs:{"show-counter":!1,autosize:"autosize",disabled:"disabled"},model:{value:t.val02,callback:function(e){t.val02=e},expression:"val02"}})],1)],1)},u=[function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("p",[t._v("每封电子邮件都由一个本地名称和一个域名组成，以 @ 符号分隔。"),c("br"),t._v("例如，在 alice@leetcode.com中， alice 是本地名称，而 leetcode.com 是域名。"),c("br"),t._v("除了小写字母，这些电子邮件还可能包含 '.' 或 '+'。"),c("br"),t._v("如果在电子邮件地址的本地名称部分中的某些字符之间添加句点（'.'），则发往那里的邮件将会转发到本地名称中没有点的同一地址。例如，\"alice.z@leetcode.com” 和 “alicez@leetcode.com” 会转发到同一电子邮件地址。 （请注意，此规则不适用于域名。）"),c("br"),t._v("如果在本地名称中添加加号（'+'），则会忽略第一个加号后面的所有内容。这允许过滤某些电子邮件，例如 m.y+name@email.com 将转发到 my@email.com。 （同样，此规则不适用于域名。）"),c("br"),t._v("可以同时使用这两个规则。"),c("br"),t._v("给定电子邮件列表 emails，我们会向列表中的每个地址发送一封电子邮件。实际收到邮件的不同地址有多少？")])}],f=c("2455");function x(t){c("ed30")}var p=!1,b=x,d=null,j=null,v=Object(f["a"])(l,s,u,p,b,d,j);e["default"]=v.exports},aa77:function(t,e,c){var a=c("5ca1"),n=c("be13"),r=c("79e5"),i=c("fdef"),o="["+i+"]",m="​",l=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$"),u=function(t,e,c){var n={},o=r(function(){return!!i[t]()||m[t]()!=m}),l=n[t]=o?e(f):i[t];c&&(n[c]=l),a(a.P+a.F*o,"String",n)},f=u.trim=function(t,e){return t=String(n(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(s,"")),t};t.exports=u},ed30:function(t,e,c){var a=c("03e6");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=c("499e").default;n("7820aa94",a,!0,{})},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);