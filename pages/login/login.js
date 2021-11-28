// pages/login/login.js
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    getUser(){
        var that=this;
        console.log(1232)
        wx.getUserProfile({
          desc: '获取信息',
          success:(res)=>{
              console.log(res)
            that.setData({
                userinfo:res.userInfo,
                hasUser:true
            })
            app.globalData.userInfo=res.userInfo
          }
        })
    },
    Login(){
 
        if(this.data.hasUser){
            wx.switchTab({
              url: '../home/home',
            })
        }else{

            wx.showToast({
              title: '请先获取信息',
              icon:'error'
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    /**{}
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