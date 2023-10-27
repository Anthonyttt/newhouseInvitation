"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      startzX: 0,
      endX: 0,
      showGuide: false,
      musicShow: false,
      duration: 21
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
  created() {
    setTimeout(() => {
      this.showGuide = true;
    }, 3e3);
    innerAudioContext.play();
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
      if (deltaX > 50)
        ;
      else if (deltaX < -50) {
        this.showGuide = false;
        common_vendor.index.navigateTo({
          url: "../list/page_1"
        });
      }
    },
    nextPage() {
      this.showGuide = false;
      common_vendor.index.navigateTo({
        url: "../list/page_1"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showGuide
  }, $data.showGuide ? {
    b: common_vendor.o((...args) => $options.nextPage && $options.nextPage(...args))
  } : {}, {
    c: common_vendor.o((...args) => $options.handleTouchStart && $options.handleTouchStart(...args)),
    d: common_vendor.o((...args) => $options.handleTouchMove && $options.handleTouchMove(...args)),
    e: common_vendor.o((...args) => $options.handleTouchEnd && $options.handleTouchEnd(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Users/Anthony/Desktop/\u65B0\u5BB6\u9080\u8BF7\u51FD/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
