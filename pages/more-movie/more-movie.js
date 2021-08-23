const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    movies: [],
    _type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const type = options.type
    this.data._type = type
    wx.request({
      url: app.gGlobalUrl + type,
      data: {
        start: 0,
        count: 12
      },
      success: res => {
        console.log(res.data.subjects);
        this.setData({
          movies: res.data.subjects
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let title = "电影"
    switch (this.data._type) {
      case 'in_theaters':
        title = "正在热映"
        break
      case 'coming_soon':
        title: "即将上映"
        break
      case 'top250':
        title: "TOP250"
        break
    }
    wx.setNavigationBarTitle({
      title: title,
    })
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
    wx.request({
      url: app.gGlobalUrl + this.data._type,
      data: {
        start: 0,
        count: 12
      },
      success: res => {
        this.setData({
          movies: res.data.subject
        })
        wx.stopPullDownRefresh()
      }
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.request({
      url: app.gGlobalUrl + this.data._type,
      data: {
        start: this.data.movies.length,
        count: 12
      },
      success: res => {
        this.setData({
          movies: this.data.movies.concat(res.data.subjects)
        })
      }
    })
  },

  onShareAppMessage: function () {

  }
})