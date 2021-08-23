const app = getApp()
import {
  convertToCastInfos,
  convertToCastString
} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const mid = options.mid
    wx.request({
      url: app.gGlobalUrl + 'subject/' + mid,
      success: res => {
        console.log(res.data);
        this.processMovieData(res.data)
      }
    })
  },
  processMovieData(movie) {
    const data = {
      directors: convertToCastString(movie.directors),
      casts:convertToCastString(movie.casts),
      image : movie.images.large,
      title: movie.title,
      original_title:movie.original_title,
      subtitle : movie.countries[0]+'•'+movie.year,
      wish_count : movie.wish_count,
      comments_count : movie.comments_count,
      rating : movie.rating.stars / 10,
      average : movie.rating.average,
      genres : movie.genres.join('、'),
      summary:movie.summary,
      castsInfo:convertToCastInfos(movie.casts)
    }
    this.setData({
      movie: data
    })
  },
  onViewPost(event) {
    wx.previewImage({
      urls: [this.data.movie.images.large],
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