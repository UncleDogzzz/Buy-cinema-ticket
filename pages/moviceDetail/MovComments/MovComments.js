// pages/moviceDetail/Movcomments/MovComments.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        commentList:'',
        id:'',
        limit:15,
        total:'',
        currentTime: new Date().getTime()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this;
        console.log(options.id);
        wx.request({
          url: "https://m.maoyan.com/review/v2/comments.json?movieId="+options.id+"&userId=-1&offset=0&limit="+this.data.limit+"&ts=0&type=3",
        //  url:'https://m.maoyan.com/mmdb/comments/movie/1413641.json?_v_=yes&offset=1&limit=20',
          success(res){
              console.log(res.data);
              console.log(res.data.data.comments);

            //   for(var i in res.data.data.comments){
            //       res.data.data.comments[i].time/=1000;
            //   }
            that.setData({
                commentList:res.data.data.comments,
                total:res.data.data.total,
                id:options.id
            })
          }
        })
    },
    onReachBottom(){
        var that=this
        this.setData({
            limit:this.data.limit+6
        });
        wx.showToast({
          title: '加载中',
          duration:2000,
          icon:'loading'
        })
        console.log("https://m.maoyan.com/review/v2/comments.json?movieId="+that.data.id+"&userId=-1&offset=0&limit="+that.data.limit+"&ts=0&type=3");
        wx.request({
            url: "https://m.maoyan.com/review/v2/comments.json?movieId="+that.data.id+"&userId=-1&offset=0&limit="+that.data.limit+"&ts=0&type=3",
            success(res){
                console.log(res.data.data.comments);
      
              that.setData({
                  commentList:res.data.data.comments,
                  total:res.data.data.total
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


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})