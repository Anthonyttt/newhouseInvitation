"use strict";var e=require("../../common/vendor.js");const t={data:()=>({startX:0,endX:0}),methods:{handleTouchStart(e){this.startX=e.touches[0].clientX},handleTouchMove(e){e.preventDefault()},handleTouchEnd(t){this.endX=t.changedTouches[0].clientX;const a=this.endX-this.startX;a>50?e.index.navigateBack():a<-50&&e.index.navigateBack({delta:4})}}};var a=e._export_sfc(t,[["render",function(t,a,n,h,o,c){return{a:e.o(((...e)=>c.handleTouchStart&&c.handleTouchStart(...e))),b:e.o(((...e)=>c.handleTouchMove&&c.handleTouchMove(...e))),c:e.o(((...e)=>c.handleTouchEnd&&c.handleTouchEnd(...e)))}}]]);wx.createPage(a);