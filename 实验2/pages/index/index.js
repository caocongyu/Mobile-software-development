Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['陕西省','西安市','鄠邑区']
  },

  /**
   * 更新省、市、区信息
   */
  regionChang: function(e){
    this.setData({region:e.detail.value});
    this.getWeather();    //更新天气
  },

  /**
   * 获取实况天气数据
   */


  getWeather:function(){
    var that=this;
    wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup', 
        method: 'GET',
        data: {
          key: "34ea041c321c482ab7c47640ca732c42",
          location: that.data.region[1]  //这个就是前端输入的城市名
        },
        success: (res) => {
          console.log(res);
          // return res.data.location[0].id
          this.setData({
            location: res.data.location[0].id  //提取返回结果中的id
          })
       
          // 获取locationid后，查询当前天气，在success中发起请求
          var location_id = this.data.location;
          // console.log(location_id);
          wx.request({
            url: 'https://devapi.qweather.com/v7/weather/now', 
            method: 'GET',
            data: {
              key: "34ea041c321c482ab7c47640ca732c42",
              location: location_id
            },
            success: (res) => {
              console.log(res);
              this.setData({
                weather_now: res.data.now,
                flag: true
              })
            },
          });
            // 获取locationid后，查询天气指数
            wx.request({
              url: 'https://devapi.qweather.com/v7/indices/1d', 
              method: 'GET',
              data: {
                key: "34ea041c321c482ab7c47640ca732c42",
                location: location_id,
                type: 3
              },
              success: (res) => {
                console.log(res);
                this.setData({
                  indices: res.data.daily,
                  flag: true
                })
              },
            });
        },
      })},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();    //更新天气
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