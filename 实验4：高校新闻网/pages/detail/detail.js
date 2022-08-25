const common = require("../../utils/common")

// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
//添加到收藏夹
  addFavorites:function(option)
  {
    let article = this.data.article;          //获取当前新闻
    wx.setStorageSync(article.id, article);   //添加到本地缓存
    this.setData({isAdd:true});               //更新按钮显示
  },

  //取消收藏
  cancelFavorites:function()
  {
    let article = this.data.article;          //获取当前新闻
    wx.removeStorageSync(article.id);         //从本地缓存删除
    this.setData({isAdd:false});              //更新按钮显示

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    //获取页面跳转来时携带的数据
    let id = options.id
    //检查当前新闻是否在收藏夹内
    var article = wx.getStorageSync(id)
    //存在
    if(article != ''){
      this.setData({
        article:article,
        isAdd:true
      })
    }
    //不存在
    else{
      let result = common.getNewsDetail(id)
      //获取到新闻内容
      if(result.code =='200'){
        this.setData({
          article:result.news,
          isAdd:false
        })
      }
    }
  },

})