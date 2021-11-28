// pages/order/orderDetail/orderDetail.js
var app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        obj:'',
        order:[],
        ss:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '订单',
      })


        var that=this;
        wx.request({
          url: 'http://localhost:3000/getUserinfo?username='+app.globalData.userInfo.nickName,
          success(res){
              console.log(res.data)
              that.setData({
                order:res.data
              })
              console.log(that.data.order)
              for(var i in that.data.order){
                wx.request({
                    url: 'https://m.maoyan.com/ajax/cinemadetail?cinemaId='+that.data.order[i].cinemaid,
                    success(res){
                        console.log(res.data)
                        that.data.order[i].cinameName=res.data.showData.cinemaName;
                        console.log(that.data.order[i].cinameName)
                        var ss=[]
                        ss.push(that.data.order[i].cinameName)
                        that.setData({
                           ["order["+i+"]"]:that.data.order[i],
                           ss
                          })
                        wx.request({
                            url: 'https://m.maoyan.com/ajax/detailmovie?movieId='+that.data.order[i].moviceid,
                            success(res){
                                console.log(res.data)
                                that.data.order[i].moviceName=res.data.detailMovie.nm;
                                that.setData({
                                    order:that.data.order
                                  })
                                  console.log(that.data.order[i].movicename)
                            }
                        })
                        that.setData({
                                        order:that.data.order
                                      })
                    }
                  })
              }

              
             
             
            //   for(var i in that.data.obj){
            //       wx.request({
            //         url: 'https://m.maoyan.com/ajax/cinemadetail?cinemaId='+that.data.obj[i].cinemaid,
            //         success(res){
            //             console.log(res.data)
                        
            //             that.data.obj[i].cinemaName=res.data.cinemaData.nm

            //             // for(var k in res.data.showData.movies){
            //             //     if(res.data.showData.movies[k].id==that.data.obj[i].moviceid){
            //             //         that.data.obj[i].moviceName=res.data.showData.movies[k].nm
            //             //     }
            //             // }





            //             that.data.order.push(that.data.obj[i])
            //             that.setData({
            //                 order: that.data.order
            //             })
                       
            //             console.log(that.data.order)
            //         }
            //       })

            //       wx.request({
            //         url: 'https://m.maoyan.com/ajax/detailmovie?movieId='+that.data.obj[i].moviceid,
            //         success(res){
            //             console.log(res)
            //             console.log(res.data.detailMovie.nm)
            //                 that.data.order[i].MoviceName=res.data.detailMovie.nm;
            //                 that.setData({
            //                     order: that.data.order
            //                 })
                        
            //         }
            //       })


                  
            //   }
          }
        })



        
    //     for(var i in that.data.obj ){
    //         console.log(1111)
    //     wx.request({
    //         url: 'https://m.maoyan.com/ajax/detailmovie?movieId='+that.data.obj[i].moviceid,
    //         success(res){
    //             console.log(res.data)
    //         }
    //     })
    //     console.log(1111)

    // }






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