(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"0530":function(t,e,a){"use strict";a.r(e);var n=a("f12e"),o=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=o.a},"40e3":function(t,e,a){var n=a("d6fc");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=a("4f06").default;o("ee7322b8",n,!0,{sourceMap:!1,shadowMode:!1})},4987:function(t,e,a){"use strict";a.r(e);var n=a("c7d9"),o=a("0530");for(var i in o)"default"!==i&&function(t){a.d(e,t,(function(){return o[t]}))}(i);a("e4a1");var c,s=a("f0c5"),d=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"4abf8ed7",null,!1,n["a"],c);e["default"]=d.exports},c7d9:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",[t._l(t.company,(function(e,n){return a("el-col",{key:n,staticClass:"top",attrs:{span:4,offset:n%3>0?2:4}},[a("el-card",{staticClass:"card",attrs:{"body-style":{padding:"0px"},shadow:"hover"}},[a("div",{on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.gotoCompany(e)}}},[a("div",{staticClass:"img"},[a("img",{staticClass:"image",attrs:{src:e.companyLogo}})]),a("div",{staticStyle:{padding:"14px"}},[a("span",{staticStyle:{color:"#409EFF"}},[t._v(t._s(e.companyName))]),a("div",{staticClass:"bottom clearfix"},[a("time",{staticClass:"time"},[t._v(t._s(e.slogan))])])])]),a("el-popconfirm",{staticClass:"btn",attrs:{"confirm-button-text":"删除","cancel-button-text":"不用了",icon:"el-icon-info","icon-color":"red",title:"确定删除该公司嘛？"},on:{confirm:function(a){arguments[0]=a=t.$handleEvent(a),t.deleteCompany(e)}}},[a("el-button",{staticClass:"button",attrs:{slot:"reference",type:"text"},slot:"reference"},[t._v("删除")])],1)],1)],1)})),a("div",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.newCompany()}}},[a("el-col",{staticClass:"top",attrs:{span:4,offset:t.company.length%3>0?2:4}},[a("el-card",{staticClass:"card",attrs:{"body-style":{padding:"0px"},shadow:"hover"}},[a("div",{staticClass:"img"},[a("v-uni-image",{staticClass:"tianjia",attrs:{src:"/static/tianjia.png",alt:"添加"}})],1),a("div",{staticClass:"content"},[a("span",{staticStyle:{color:"#409EFF"}},[t._v("添加企业")])])])],1)],1)],2)},i=[]},d6fc:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'.time[data-v-4abf8ed7]{font-size:13px;line-height:20px;color:#999}.top[data-v-4abf8ed7]{margin-top:50px}.bottom[data-v-4abf8ed7]{margin-top:13px;line-height:12px}.img[data-v-4abf8ed7]{padding:20px;height:130px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.img uni-image[data-v-4abf8ed7]{height:110px;width:110px}.button[data-v-4abf8ed7]{padding:5px;float:right}.image[data-v-4abf8ed7]{width:100%;display:block}.content[data-v-4abf8ed7]{padding:14px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.card[data-v-4abf8ed7]{height:280px;position:relative}.btn[data-v-4abf8ed7]{position:absolute;right:5px;bottom:5px}.clearfix[data-v-4abf8ed7]:before,\n.clearfix[data-v-4abf8ed7]:after{display:table;content:""}.clearfix[data-v-4abf8ed7]:after{clear:both}',""]),t.exports=e},e4a1:function(t,e,a){"use strict";var n=a("40e3"),o=a.n(n);o.a},f12e:function(t,e,a){"use strict";a("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{company:[]}},onShow:function(){this.load()},methods:{newCompany:function(){uni.navigateTo({url:"/pages/index/newCompany"})},deleteCompany:function(t){var e=this;console.log(t.indexCode),uni.request({url:"http://1.15.175.248:8000/company/delete/".concat(t.indexCode),method:"DELETE"}).then((function(){e.load()}))},stopPropagation:function(t){console.log(t),even.stopPropagation()},gotoCompany:function(t){console.log(t.companyName),uni.navigateTo({url:"/pages/index/position/position?indexCode=".concat(t.indexCode,"&companyName=").concat(t.companyName)})},load:function(){var t=this,e=1,a=10;uni.request({url:"http://1.15.175.248:8000/company/list/".concat(e,"/").concat(a),method:"GET",success:function(e){t.company=e.data.data.data},fail:function(t){console.log("failed",t)}})}}};e.default=n}}]);