# Buy-cinema-ticket
微信在线购票小程序，使用猫眼API，展示最近上映电影、附近电影院以及档期表。

使用猫眼API

获取城市ID：https://openapi.meituan.com/poi/city

获取最近上映电影：https://m.maoyan.com/ajax/movieOnInfoList?ci=cityId

获取电影详细信息：https://m.maoyan.com/ajax/detailmovie?movieId=movieId

根据城市获取参数：https://m.maoyan.com/ajax/filterCinemas?ci=cityid

获取筛选列表电影院信息：https://i.maoyan.com/ajax/moreCinemas?day='+that.data.date+'&movieId=0&offset=0&limit='+that.data.limit+'&districtId='+that.data.districtId+'&lineId=-1&hallType='+that.data.hallType+'&brandId='+that.data.brandId+'&serviceId='+that.data.serviceId+'&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1636791828717&cityId='+app.globalData.cityId+'&optimus_uuid=2FEE5790445911ECA2C9970327A2D65D9CB6281775B44D34AB51325B8313847C&optimus_risk_level=71&optimus_code=10

