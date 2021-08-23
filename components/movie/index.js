// components/movie/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: Object,
  },
  data: {

  },
  methods: {
    onGoToDetail(event) {
      // console.log(this.properties.movie);
      const mid = this.properties.movie.id
      wx.navigateTo({
        url: '/pages/movie-detail/movie-detail?mid=' + mid,
      })
    }
  }
})