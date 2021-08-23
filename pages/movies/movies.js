// pages/movies/movies.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: [],
    top: [],
    searchResult: false,
    searchData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
        url: app.gGlobalUrl + 'in_theaters',
        data: {
          start: 0,
          count: 3
        },
        success: res => {
          console.log(res.data.subjects);
          this.setData({
            inTheaters: res.data.subjects
          })
        }
      }),
      wx.request({
        url: app.gGlobalUrl + 'coming_soon?start=0&count=3',
        success: res => {
          console.log(res.data.subjects);
          this.setData({
            comingSoon: res.data.subjects
          })
        }
      }),
      wx.request({
        url: app.gGlobalUrl + 'top250',
        data: {
          start: 0,
          count: 3
        },
        success: res => {
          console.log(res.data.subjects);
          this.setData({
            top: res.data.subjects
          })
        }
      })
  },
  goToMore(event) {
    const type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type=' + type,
    })
  },
  onConfirm(event) {
    this.setData({
      searchResult: true
    })
    console.log(event);
    wx.request({
      url: app.gGlobalUrl + 'search',
      data: {
        q: event.detail.value
      },
      success: res => {
        this.setData({
          searchData: res.data.subjects
        })
      }
    })
  },
  onSearchCancel() {
    this.setData({
      searchResult: false
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