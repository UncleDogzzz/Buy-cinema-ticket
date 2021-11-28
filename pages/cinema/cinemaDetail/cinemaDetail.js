// pages/cinema/cinemaDetail/cinemaDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cinemaData:'',
        movieId:'',
        curday:'',
        cinemaId:'',
        movie:'',
        selectIndex:0,
        date:'',
        days:[],
        timeList:'',
        divideDealList:'',
        success:0,
        scrollLeft:0,
        movies:[],
        select:0
    },
    bindDateChange(e){
        this.setData({
            selectIndex:e.currentTarget.dataset.index,
            date:e.currentTarget.dataset.date,
            timeList:this.data.movie.shows[e.currentTarget.dataset.index].plist

        })

        console.log(this.data.timeList);

        console.log(this.data.date)
    },
    tobuyTicket(e){
        var that=this;
       console.log(e.currentTarget.dataset.info);
       var tm=e.currentTarget.dataset.info.tm;
       wx.navigateTo({
         url: '../../order/order?username=zrh&cinemaid='+that.data.cinemaId+'&time='+tm+'&moviceid='+that.data.movieId+'&price='+e.currentTarget.dataset.info.vipPrice+'&moviceName='+that.data.movie.nm+'&cinemaName='+that.data.cinemaData.nm,
        // url:'../../order/order?obj='+e.currentTarget.dataset.info
       })
       
    },
    selectMovie(e){
        var that=this;
        console.log(e.currentTarget.dataset.index);
        console.log(e.currentTarget.dataset.movie);
        var movieId=e.currentTarget.dataset.movie.id;
        that.setData({
            select:e.currentTarget.dataset.index,
            movie:e.currentTarget.dataset.movie,
            movieId:e.currentTarget.dataset.movie.id
        })
        wx.request({
          url: 'https://m.maoyan.com/ajax/cinemadetail?cinemaId='+that.data.cinemaId,
          success(res){
              console.log(res.data);


              for(var i in res.data.showData.movies){                               //根据moviceID找档期
                if(res.data.showData.movies[i].id==movieId){
                    res.data.showData.movies[i].img=res.data.showData.movies[i].img.replace(/w.h/g, "372.550");  
                  that.setData({
                      movie:res.data.showData.movies[i],
                      timeList:res.data.showData.movies[i].shows[0].plist,         //默认
                      success:1
                  })
                 
                  for(var k in that.data.movie.shows){                    //根据moviceid找日期
                    that.data.days=[];
                      that.data.days.push(that.data.movie.shows[k].dateShow);
                      that.setData({
                          days:that.data.days
                      })
                  }
                }
                console.log(that.data.success);
            }
            if(!that.data.movie){
              that.setData({
                  success:0
              })
          }

          console.log(that.data.movie);


          that.setData({
              scrollLeft:that.data.scrollLeft+100
          })

          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that=this;
        const { cinemaId = '', movieId = '', day = ''} = options
        console.log(cinemaId);
        console.log(movieId);
        console.log(day);

        this.setData({
            cinemaId,
            movieId,
            curday:day
        })

        // this.onLoad();
        wx.request({
          url: 'https://m.maoyan.com/ajax/cinemadetail?cinemaId='+cinemaId,
          success(res){
              console.log(res.data)
              console.log(res.data.cinemaData);
              for(var i in res.data.showData.movies){
                res.data.showData.movies[i].img=res.data.showData.movies[i].img.replace(/w.h/g, "372.550");
            
            that.setData({
                movies:res.data.showData.movies
            })
        }


            if(res.data.dealList.divideDealList.length!=0){         //判断是否有小吃服务
                console.log(1);
                for(var i in res.data.dealList.divideDealList){
                    for(var k in res.data.dealList.divideDealList[i].dealList)
                    {
                    res.data.dealList.divideDealList[i].dealList[k].imageUrl=res.data.dealList.divideDealList[i].dealList[k].imageUrl.replace(/w.h/g, "440.0");
                    console.log(123)
                    }
                }
            }
            
            


                if(movieId){
              for(var i in res.data.showData.movies){                               //根据moviceID找档期
                  if(res.data.showData.movies[i].id==movieId){
                      
                    that.setData({
                        movie:res.data.showData.movies[i],
                        timeList:res.data.showData.movies[i].shows[0].plist,         //默认显示第一天的档期
                        divideDealList:res.data.dealList.divideDealList,
                        success:1,
                        select:i
                    })
                    console.log(that.data.select)
                   
                    for(var k in that.data.movie.shows){                    //根据moviceid找日期
                        that.data.days.push(that.data.movie.shows[k].dateShow);
                        that.setData({
                            days:that.data.days
                        })
                    }
                  }
                  console.log(that.data.success);
              }
              if(!that.data.movie){
                that.setData({
                    success:0
                })
            }
            


            } else{
                
                that.setData({
                    movie:res.data.showData.movies[0],
                    timeList:res.data.showData.movies[0].shows[0].plist,
                    divideDealList:res.data.dealList.divideDealList,
                    success:1
                })
                for(var k in that.data.movie.shows){                    //日期
                    that.data.days.push(that.data.movie.shows[k].dateShow);
                    that.setData({
                        days:that.data.days
                    })
                }


            }
              that.setData({
                  cinemaData:res.data.cinemaData
              })
              console.log(that.data.movie);
              that.setData({
                  select:that.data.select
              })
             
            //   for(var i in res.data.showData.movies){
            //     if(res.data.showData.movies[i].id==movieId){
            //       that.setData({
            //           movie:res.data.showData.movies[i]
            //       })
            //     }
            // }


          }
        })

        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log(this.data.selectIndex)
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