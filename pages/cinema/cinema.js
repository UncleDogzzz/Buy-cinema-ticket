var app = getApp();
Page({
    data: {
        cityId:20,
        areaId:-1,
        districtId:740,
        serviceId:-1,
        hallType:-1,
        brandId:-1,
        serviceId:-1,
        title: '',
        items:'',
        brand:[],
        region:['广东省','广州市','从化区'],
        customItem:'全部',
        service:[[],[]],
        index:0,
        serviceIndex:[0,0],
        date:new Date().getFullYear()+'-'+ (Number(new Date().getMonth())+1)+'-'+(new Date().getDate()),
        limit:20
    },
    bindBrandChange(e){
        var that=this;
        console.log(e);
        this.setData({
            index:e.detail.value
        })
        var type=this.data.brand[e.detail.value];
        console.log(this.data.brand[e.detail.value])

        wx.request({                    //获取对应城市的电影筛选列表
            url: 'https://m.maoyan.com/ajax/filterCinemas?ci='+app.globalData.cityId,
            method: 'GET',
            data: {},
            success: function(res) {
                console.log(res.data);
                for (var k in res.data.brand.subItems) {
                    if (type == res.data.brand.subItems[k].name) {
                      console.log(res.data.brand.subItems[k].id)
                      that.setData({
                        brandId: res.data.brand.subItems[k].id
                      })
                    }
                  }

                  that.GetCinemasByinfo();

            }
        })









        
    },
    bindSerivceChange(e){
        var that=this;
        console.log(e)
        this.setData({
            serviceIndex:e.detail.value
        })
        var service=that.data.service[0][that.data.serviceIndex[0]];
        var hallType=that.data.service[1][that.data.serviceIndex[1]]
        console.log(service);
        console.log(hallType);

        wx.request({                    //获取对应城市的电影筛选列表
            url: 'https://m.maoyan.com/ajax/filterCinemas?ci='+app.globalData.cityId,
            method: 'GET',
            data: {},
            success: function(res) {
                console.log(res.data);
                for (var k in res.data.service.subItems) {
                    if (service == res.data.service.subItems[k].name) {
                      console.log(res.data.service.subItems[k].id)
                      that.setData({
                        serviceId: res.data.service.subItems[k].id
                      })
                    }
                  }

                  for (var k in res.data.hallType.subItems) {
                    if (hallType == res.data.hallType.subItems[k].name) {
                      console.log(res.data.hallType.subItems[k].id)
                      that.setData({
                        hallType: res.data.hallType.subItems[k].id
                      })
                    }
                  }

                  that.GetCinemasByinfo();

            }
        })








    },
    bindDateChange(e){
        this.setData({
            date: e.detail.value
        })
        this.GetCinemasByinfo();
    },
    bindRegionChange: function (e) {
        const that = this
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          region: e.detail.value
        })
        
          // wx.request({
          //   url: 'https://www.maoyan.com/ajax/cities',
          //   success(res){
          //     console.log(res);
          //   }
          // })








        wx.request({
          url: 'https://openapi.meituan.com/poi/city', //获取城市cityID
          method: 'GET',
          data: {},
          success: function (res) {
            console.log(res.data);
            console.log(that.data.region[1])
            for (var k in res.data.data) {
              if (that.data.region[1] == res.data.data[k].name + '市') {
                console.log(res.data.data[k].id)
                that.setData({
                  cityId: res.data.data[k].id
                })
                app.globalData.cityId=that.data.cityId;
              }
            }
            wx.request({                    //根据城市cityID获取对应城市的电影筛选列表  //获取区县districtID
                url: 'https://m.maoyan.com/ajax/filterCinemas?ci='+app.globalData.cityId,
                method: 'GET',
                data: {},
                success: function(res) {
                    console.log(res.data);
                    for (var k in res.data.district.subItems) {
                        if (that.data.region[2] == res.data.district.subItems[k].name) {
                          console.log(res.data.district.subItems[k].id)
                          that.setData({
                            districtId: res.data.district.subItems[k].id
                          })
                        }
                      }

                      that.GetCinemasByinfo();
                      console.log(that.data.districtId)
            console.log(app.globalData.cityId)

                }
            })
            
            
            
          }
        })

    
      },
      GetCinemasByinfo(){
          var that=this;

          console.log(app.globalData.cityId);
          console.log(this.data.districtId);
         
        wx.request({
            url: 'https://i.maoyan.com/ajax/moreCinemas?day='+that.data.date+'&movieId=0&offset=0&limit='+that.data.limit+'&districtId='+that.data.districtId+'&lineId=-1&hallType='+that.data.hallType+'&brandId='+that.data.brandId+'&serviceId='+that.data.serviceId+'&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1636791828717&cityId='+app.globalData.cityId+'&optimus_uuid=2FEE5790445911ECA2C9970327A2D65D9CB6281775B44D34AB51325B8313847C&optimus_risk_level=71&optimus_code=10',
            success(res){
              console.log(res.data.cinemas.cinemas);
              if(that.data.preObj!==res.data.cinemas.cinemas[0].id||that.data.isOverLength!=res.data.cinemas.cinemas.length){        //记录是否已经查到所有的电影院
              that.setData({
                  items:res.data.cinemas.cinemas,
                  isOverLength:res.data.cinemas.cinemas.length,
                  isOver:false,
                  preObj:res.data.cinemas.cinemas[0].id
              })
              console.log(that.data.preObj)

              
          }else{
              console.log('完了');
             that.setData({
                 isOver:true
             })
          }
            }
            
          })


   
      },

      onReachBottom(){
        this.setData({
          limit:this.data.limit+20
        })
        this.GetCinemasByinfo();
        if(!this.data.isOver){
          wx.showToast({
              title: '加载中',
              duration:2000,
              icon:'loading'
            });
      }else{
          wx.showToast({
              title: '已经加载完啦!',
              duration:2000,
              icon:'success'
            });
      }
      },


    //事件处理函数
    onLoad: function (options) {
        var that = this

          console.log(app.globalData.cityId);
        //   console.log(prevPage.data.prevPage);
        //playingList
        wx.request({                    //获取对应城市的电影筛选列表
            url: 'https://m.maoyan.com/ajax/filterCinemas?ci='+app.globalData.cityId,
            method: 'GET',
            data: {},
            success: function(res) {
                console.log(res.data)
                for(var i in res.data.brand.subItems){
                    that.data.brand.push(res.data.brand.subItems[i].name);
                }
                for(var i in res.data.service.subItems){
                    that.data.service[0].push(res.data.service.subItems[i].name);
                }
                for(var i in res.data.hallType.subItems){
                    that.data.service[1].push(res.data.hallType.subItems[i].name);
                }
                that.data.items = res.data
                that.setData({
                    brand:that.data.brand,
                    service:that.data.service
                })
            }
        })

        wx.request({
          url: 'https://i.maoyan.com/ajax/moreCinemas?movieId=0&offset=0&limit=20&districtId=740&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1636791828717&cityId=20&optimus_uuid=2FEE5790445911ECA2C9970327A2D65D9CB6281775B44D34AB51325B8313847C&optimus_risk_level=71&optimus_code=10',
          success(res){
              console.log(res.data.cinemas.cinemas);
              that.setData({
                  items:res.data.cinemas.cinemas
              })
          }
          
        })

    },
    onReady: function () {
        wx.setNavigationBarTitle({
            title: '电影院'
        })
    },
    ToCinamas(e){
        console.log(e);
        wx.navigateTo({
          url: './cinemaDetail/cinemaDetail?cinemaId='+e.currentTarget.dataset.id+'&day='+this.data.date
        })
    }
})
