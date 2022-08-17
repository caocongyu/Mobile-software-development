Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:"/image/logo.png",
    name:"Hello World"
  },

  getUsrProfile(e){
    wx.getUserProfile({
      desc: 'desc',
      success:(res)=>{
        console.log(res)
        this.setData({
          src:res.userInfo.avatarUrl,    //更新图片来源
          name:res.userInfo.nickName    //更新昵称
        })
      }
    })
  }
  
})