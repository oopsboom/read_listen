// components/post/index.js
Component({
  
  properties: {
    res:Object
  },
  data: {

  },
  methods: {
    onTap(event){
      // console.log(event);
      const pid=this.properties.res.postId
      this.triggerEvent('posttap',{
        pid:pid
      })
    }
  }
})
