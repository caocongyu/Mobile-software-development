Page({
  /**
   * 页面的初始数据
   */
  data: {
    //临时微信用户昵称和头像
    num:0
  },

  //获取微信用户信息
  getUsrProfile(e){
    wx.getUserProfile({
      desc: 'desc',
      success:(res)=>{
        console.log(res)
        this.setData({
          isLogin:true,                     //确认登陆状态
          src:res.userInfo.avatarUrl,       //更新图片来源
          nickName:res.userInfo.nickName    //更新昵称
        })
        this.myFavorites()
      }
    })
  },

  myFavorites:function(){
    let info = wx.getStorageInfoSync();       //读取本地缓存
    let keys = info.keys;                     //获取全部key信息
    let num = keys.length;                    //获取收藏新闻数量

    let myList = [];
    for(var i=0; i<num; i++){
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);                       //将新闻填加到数组中
    }

    //更新收藏夹
    this.setData({
      newsList:myList,
      num:num
    })
  },

  goToDetail:function(e){
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'../detail/detail?id='+id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //如果已经登录
    if(this.data.isLogin){
      //更新收藏列表
      this.myFavorites()
    }
  },
})