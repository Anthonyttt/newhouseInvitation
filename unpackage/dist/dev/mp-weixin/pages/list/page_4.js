"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      startX: 0,
      endX: 0,
      musicShow: false
    };
  },
  onShareAppMessage() {
    return {
      title: "\u9080\u8BF7\u51FD",
      path: "/pages/index/index",
      imageUrl: "https://www.anthonyt.cn/static/cover.png"
    };
  },
  onShareTimeline() {
    return {
      title: "\u9080\u8BF7\u51FD",
      path: "/pages/index/index",
      imageUrl: "https://www.anthonyt.cn/static/cover.png"
    };
  },
  mounted() {
  },
  methods: {
    handleTouchStart(event) {
      this.startX = event.touches[0].clientX;
    },
    handleTouchMove(event) {
      event.preventDefault();
    },
    handleTouchEnd(event) {
      this.endX = event.changedTouches[0].clientX;
      const deltaX = this.endX - this.startX;
      if (deltaX > 50) {
        common_vendor.index.navigateBack();
      } else if (deltaX < -50) {
        common_vendor.index.navigateBack({
          delta: 4
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleTouchStart && $options.handleTouchStart(...args)),
    b: common_vendor.o((...args) => $options.handleTouchMove && $options.handleTouchMove(...args)),
    c: common_vendor.o((...args) => $options.handleTouchEnd && $options.handleTouchEnd(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Users/Anthony/Desktop/\u65B0\u5BB6\u9080\u8BF7\u51FD/pages/list/page_4.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
