//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    region: ['广东省', '广州市', '从化区'], //城市选择器
    cityId: 20, //城市ID
    items: '', //电影列表
    customItem: '选择城市',
    images: []
  },
  onReachBottom(){
    wx.showToast({
      title: '已经到底啦！',
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  swiperchange: function (e) {

    //console.log(e.detail.current)
  },
  bindRegionChange: function (e) {
    const that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    wx.request({
      url: 'https://openapi.meituan.com/poi/city', //获取城市ID
      method: 'GET',
      data: {},
      // header: {
      //   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      // },
      success: function (res) {
        console.log(res.data);
        console.log(that.data.region[1])
        for (var k in res.data.data) {
          if (that.data.region[1] == res.data.data[k].name + '市') {
            console.log(res.data.data[k].id)
            that.setData({
              cityId: res.data.data[k].id
            })
          }
        }
        
      }
    })
    app.globalData.cityId=this.data.cityId;
    
    this.getMoviceByCity();



  },
  getMoviceByCity(callback) {
    var that = this
    wx.request({
      url: 'https://m.maoyan.com/ajax/movieOnInfoList?ci='+that.data.cityId,
      success(res) {
        for (var i in res.data.movieList) {
          res.data.movieList[i].img = res.data.movieList[i].img.replace(/w.h/g, "372.550");
          res.data.movieList[i].star=res.data.movieList[i].star.replace(/,/g, " / ")
          that.data.images.push(res.data.movieList[i].img)
        }
        console.log(res.data.movieList);
        that.setData({
          images:that.data.images,
          items:res.data.movieList
        })
      }
    })
  },
  toMoviceDetail(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../moviceDetail/moviceDetail?id='+e.currentTarget.dataset.id,
    })
  },

  onLoad: function () {
    console.log('onLoad')
    console.log(app.globalData.userInfo)
    this.getMoviceByCity();
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

   

  },
  toBuyTicks(e) {
    console.log(e);
    var movieId = e.currentTarget.dataset.info.id;
    var rt=e.currentTarget.dataset.info.rt;
    var movieName=e.currentTarget.dataset.info.nm;
    wx.navigateTo({
      url:`../cinema/cinemaSelect/cinemaSelect?movieId=${movieId}&rt=${rt}&movieName=${movieName}`
    })
  }
})
