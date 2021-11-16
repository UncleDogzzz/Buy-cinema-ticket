// pages/moviceDetail/moviceDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0,
        item:'',
        tabItemsArray:[]
    },
    chang(){
        this.setData({
            index:1  
        })
        console.log(this.data.index)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this;
        console.log(options.id);
        wx.request({
          url: 'https://m.maoyan.com/ajax/detailmovie?movieId='+options.id,
          success(res){

            res.data.detailMovie.img = res.data.detailMovie.img.replace(/w.h/g, "372.550");
            res.data.detailMovie.cat = res.data.detailMovie.cat.replace(/,/g, " / ");
            res.data.detailMovie.star = res.data.detailMovie.star.replace(/,/g, " / ");
            for(var i in res.data.detailMovie.photos){
                res.data.detailMovie.photos[i]=res.data.detailMovie.photos[i].replace(/w.h/g, "372.550");
            }
            that.data.tabItemsArray.push(...res.data.detailMovie.photos)
              console.log(res.data.detailMovie);
              that.setData({
                  item:res.data.detailMovie,
                  tabItemsArray:that.data.tabItemsArray
              })
          }
        })
    },
    showBigImage(e){
        console.log(e.currentTarget.dataset.index)
        wx.navigateTo({
          url: './picDetail/picDetail?index='+e.currentTarget.dataset.index,
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