// pages/moviceDetail/picDetail/picDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageArray:'',
        index:0,
        id:new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDay(),
    },
    saveImage(){
        var Url=this.data.imageArray[this.data.index];
        console.log(this.data.imageArray[this.data.index]);

        wx.downloadFile({
          url: Url,
          filePath:wx.env.USER_DATA_PATH+'/'+this.data.id+'.jpg',
          success(res){
             console.log(res)
             let data = res.filePath;
            wx.saveImageToPhotosAlbum({
                          filePath: res.filePath,
                          success(res) {
                            wx.showToast({
                              title: '保存成功',
                              icon: 'success',
                              duration: 2000
                            });
                          },
                          fail(res) {
                            wx.showToast({
                              title: '保存失败',
                              icon: 'success',
                              duration: 2000
                            });
                          }
                        });
                
            
          }
        })
    },
    imageChange(e){
        console.log(this.data.index);
        console.log(e.detail.current);
        this.setData({
            index:e.detail.current
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.index)
          //当前页面
          var pages = getCurrentPages();
          //上一页面
          var prevPage = pages[pages.length - 2];
        this.setData({
            imageArray:prevPage.data.tabItemsArray,
            index:options.index
        })
          console.log(prevPage.data.tabItemsArray[options.index])

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