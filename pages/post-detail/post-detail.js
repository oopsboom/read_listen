import {
  postList
} from "../../data/data"

const app = getApp()

Page({
  data: {
    postData: {},
    collected: false,
    isPlaying: false,
    _id: null,
    _postsCollected: {},
    _mgr: null
  },
  onLoad: function (options) {

    const postData = postList[options.pid]
    this.data._id = options.pid

    let postsCollected
    if (!wx.getStorageSync('posts_collected')) {
      postsCollected = {}
    } else {
      postsCollected = wx.getStorageSync('posts_collected')
    }
    this.data._postsCollected = postsCollected

    let collected = postsCollected[this.data._id]
    if (collected === undefined) {
      collected = false
    }
    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    mgr.onPlay(this.onMusicStart)
    mgr.onPause(this.onMusicStop) 

    this.setData({
      postData,
      collected,
      isPlaying:this. currentMusicIsPlaying()
    })
  },
  currentMusicIsPlaying() {
    if (app.gIsPlayingMusic && app.gIsPlayingPostId == this.data._id) {
      return true
    } else {
      return false
    }
  },
  onCollect(events) {
    //数据结构 {id:boolean}
    const postsCollected = this.data._postsCollected
    // wx.getStorageSync('key')
    //假设点击时，未收藏变为true收藏
    postsCollected[this.data._id] = !this.data.collected
    //collected状态绑定到视图层 条件渲染来显示哪张图
    this.setData({
      collected: !this.data.collected
    })
    wx.setStorageSync('posts_collected', postsCollected)
    wx.showToast({
      title: this.data.collected ? "收藏成功" : "取消收藏",
      duration: 1000
    })
  },
  async onShare(event) {
    const result = await wx.showActionSheet({
      itemList: ["分享到朋友圈", "分享到群聊"]
    })
    console.log(result);
  },
  onMusicStart(event) {
    const mgr = wx.getBackgroundAudioManager()
    const music = postList[this.data._id].music
    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg
    app.gIsPlayingMusic = true
    app.gIsPlayingPostId = this.data._id

    this.setData({
      isPlaying: true
    })
  },
  onMusicStop(event) {
    const mgr = wx.getBackgroundAudioManager()
    mgr.stop()
    app.gIsPlayingMusic = false
    this.setData({
      isPlaying: false
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})