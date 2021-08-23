// pages/posts/posts.js
import {
  postList
} from "../../data/data.js"
Page({
  data: {},
  onLoad: async function (options) {
    this.setData({
      postsList: postList
    })
  },
  //对轮播图文章的跳转处理
  onGoTo(event) {
    const pid = event.currentTarget.dataset.postId
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?pid=' + pid,
    })
  },
  //对列表文章的页面跳转处理
  onGoToDetail(event) {
    // console.log(event.detail.pid);
    // console.log(event.currentTarget.dataset.postId);
    const pid = event.detail.pid
    // const pid = event.detail.pid||event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?pid=' + pid,
    })
  },
  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})