// pages/order/order.js
var app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order:'',
        index:0
    },
    bindPickerChange(e){
        var that=this;
        console.log(e)
        this.setData({
            index:e.detail.value
        })
    },
    payment(){
        var that=this;
        console.log(app.userInfo)
        wx.request({
            url: 'http://localhost:3000/CreateCusInfo?cinemaid='+that.data.cinemaid+'&moviceid='+that.data.moviceid+'&time='+that.data.order.time+'&seat='+that.data.seat[that.data.index]+'&username='+app.globalData.userInfo.nickName+'&price='+that.data.order.price,
            success(res){
                console.log(res);
            }
          })
          wx.showToast({
            title: '支付成功',
            icon:'success'
          })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this
        console.log(options);
        this.setData({
            cinemaid:options.cinemaid,
            moviceid:options.moviceid,
            'order.movieName':options.moviceName,
            'order.time':options.time,
            'order.cinemaName':options.cinemaName,
            'order.price':options.price
        })

        wx.request({            //获取座位
          url: 'http://localhost:3000/getCinemaSeat?cinemaid='+options.cinemaid,
          success(res){
              console.log(res.data)
            
         var seat=res.data
         var Newseat=[]
            for(var i in res.data.isKong){
                if(res.data.isKong[i]==1){
                    console.log(1111)
                    Newseat.push(res.data.seat[i])
                }
            }
          that.setData({
             seat:Newseat
          })
          }
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