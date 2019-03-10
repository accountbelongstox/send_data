class CC{

	constructor(load){
        load.loadModule("tools");
        let
            that = this
        ;
        //今日时间
        that.toDayTimestamp = load.module.tools.toDayTimestamp();
		let
			defaultLength = 1000000000,
            YesterdayA = ( load.module.tools.createContinuityTimeStamp("d-1","d",'yyyy-mm-dd') )[0]
		;
		//数据输入源,用于替换URL
        load.option.dataSource = {
            username : "",//用户名
            length : defaultLength,//默认请求长度
            rows : defaultLength,

            startTimeA : load.module.tools.timeFormat("yyyy-mm-dd",'1990-01-01'),//1990-01-01 格式
            startTimeB : load.module.tools.timeFormat(false,'1990-01-01'),//时间戳 格式
            startTimeC : load.module.tools.timeFormat(false,'1990-01-01 hh:mm:ss'),//时间戳 格式

            YesterdayA:YesterdayA[0],

            toDayTimeA : load.module.tools.timeFormat('yyyy-mm-dd'),//1990-01-01 格式
            toDayTimeB : load.module.tools.toDayTimestamp(),//时间戳 格式
            toDayTimeC : load.module.tools.timeFormat(`yyyy-mm-dd hh:mm:ss`),

            currentTimeA : load.module.tools.timeFormat('yyyy-mm-dd'),//1990-01-01 格式
            currentTimeB : load.module.tools.timeFormat(false)//时间戳 格式
        };
	}


    h_47_98_99_208_8091(SourceData){
        let
            data = SourceData
        ;
        let
            that = this,
            dataResult = {},
            list = (function (){
                let
                    dataItemName = "content"
                ;
                if(data && (dataItemName in data) ){
                    return data[dataItemName];
                }
                return [];
            })()
        ;
        dataResult.count = SourceData.numberOfElements ? SourceData.numberOfElements : 0;//总条数
        dataResult.source = list;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据
        console.log(`list.length -> ${list.length}`);
        //保存为csv文件
        //that.load.module.csv.initAdd(`姓名,手机号,申请时间`);

        for(let p in list){
            let
                item = list[p],
                TrueName = that.load.module.tools.get(item.customerName,`-`),
                Mobile = that.load.module.tools.get(item.phone,`-`),
        /*        authStatus = that.load.module.tools.get(item.authStatus,`-`),
                password = that.load.module.tools.get(item.password,`-`),*/
                createdAt = item.registDate,
                createAtTimestamp = that.load.module.tools.timeFormat(false,createdAt)
            ;
            that.load.module.csv.addOne(TrueName,Mobile,`-`,`-`,`-`,createdAt);

            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
    }

    leyi44(data){
        let
            that = this,
            dataResult = {},
            list = data.list
        ;
        dataResult.count = data.recordsTotal;//总条数
        dataResult.source = data;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据

        //保存为csv文件
        //that.load.module.csv.initAdd(`姓名,电话,身份证号,申请时间,更新时间`);

        for(let p in list){
            let
                item = list[p],
                name = that.load.module.tools.get(item.realName,`-`),
                phone = that.load.module.tools.get(item.username,`-`),
                idcard = that.load.module.tools.get(item.idcard,`-`),
                createAtTimestamp = item.createdAt/1000,
                createdAt = that.load.module.tools.timeFormat(null,createAtTimestamp),
                updatedAt = that.load.module.tools.timeFormat(null,item.updatedAt/1000)
            ;
            that.load.module.csv.addOne(name,phone,idcard,`-`,`-`,updatedAt);
            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
    }



    qianbao665(SourceData){
        let
            data = SourceData.data
        ;

        let
            that = this,
            dataResult = {},
            list = (function (){
                let
                    dataItemName = "list"
                ;
                if(data && (dataItemName in data) ){
                    return data[dataItemName];
                }
                return [];
            })()
        ;
        if(!data){
            dataResult.nextSkip = 20000;
            console.log(`skip -> 20000`);
        }

        dataResult.count = SourceData.total ? SourceData.total : 0;//总条数
        dataResult.source = list;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据
        console.log(`list.length -> ${list.length}`);
        let
            pageNum = (data && ("pageNum" in data) && data.pageNum) ? data.pageNum : 1
        ;
        if(!list.length){
            dataResult.nextSkip = (199 - pageNum);
            console.log(`skip -> ${pageNum}`);
        }
        //保存为csv文件
        //that.load.module.csv.initAdd(`姓名,手机号,认证状态,密码,申请时间`);

        for(let p in list){
            let
                item = list[p],
                TrueName = that.load.module.tools.get(item.userName,`-`),
                Mobile = that.load.module.tools.get(item.phone,`-`),
                authStatus = that.load.module.tools.get(item.authStatus,`-`),
                password = that.load.module.tools.get(item.password,`-`),
                gmtDatetime = item.gmtDatetime,
                createdAt = that.load.module.tools.timeFormat(null,gmtDatetime),
                createAtTimestamp = that.load.module.tools.timeFormat(false,gmtDatetime)
            ;
            //that.load.module.csv.addOne(TrueName,Mobile,authStatus,password,createdAt);
            that.load.module.csv.addOne(TrueName,Mobile,`-`,`-`,`-`,createdAt);

            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
    }

    bali88(SourceData){
        let
            data = SourceData.data
        ;

        let
            that = this,
            dataResult = {},
            list = (function (){
                let
                    dataItemName = "list"
                ;
                if(data && (dataItemName in data) ){
                    return data[dataItemName];
                }
                return [];
            })()
        ;
        if(!data){
            dataResult.nextSkip = 20000;
            console.log(`skip -> 20000`);
        }

        dataResult.count = SourceData.total ? SourceData.total : 0;//总条数
        dataResult.source = list;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据
        console.log(`list.length -> ${list.length}`);
        let
            pageNum = (data && ("pageNum" in data) && data.pageNum) ? data.pageNum : 1
        ;
        if(!list.length){
            dataResult.nextSkip = (199 - pageNum);
            console.log(`skip -> ${pageNum}`);
        }
        //保存为csv文件
        //that.load.module.csv.initAdd(`姓名,手机号,认证状态,密码,申请时间`);

        for(let p in list){
            let
                item = list[p],
                TrueName = that.load.module.tools.get(item.userName,`-`),
                Mobile = that.load.module.tools.get(item.userPhone,`-`),
                authStatus = that.load.module.tools.get(item.authStatus,`-`),
                password = that.load.module.tools.get(item.password,`-`),
                gmtDatetime = item.gmtDatetime,
                createdAt = that.load.module.tools.timeFormat(null,gmtDatetime),
                createAtTimestamp = that.load.module.tools.timeFormat(false,gmtDatetime)
            ;
            //that.load.module.csv.addOne(TrueName,Mobile,authStatus,password,createdAt);
            that.load.module.csv.addOne(TrueName,Mobile,`-`,`-`,`-`,createdAt);

            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
    }


    shuixinhua(SourceData){
        let
            data = SourceData.data
        ;

        let
            that = this,
            dataResult = {},
            list = (function (){
                let
                    dataItemName = "list"
                ;
                if(data && (dataItemName in data) ){
                    return data[dataItemName];
                }
                return [];
            })()
        ;
        if(!data){
            dataResult.nextSkip = 20000;
            console.log(`skip -> 20000`);
        }

        dataResult.count = SourceData.total ? SourceData.total : 0;//总条数
        dataResult.source = list;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据
        console.log(`list.length -> ${list.length}`);
        let
            pageNum = (data && ("pageNum" in data) && data.pageNum) ? data.pageNum : 1
        ;
        if(!list.length){
            dataResult.nextSkip = (199 - pageNum);
            console.log(`skip -> ${pageNum}`);
        }
        //保存为csv文件
        //that.load.module.csv.initAdd(`姓名,手机号,认证状态,密码,申请时间`);

        for(let p in list){
            let
                item = list[p],
                TrueName = that.load.module.tools.get(item.userName,`-`),
                Mobile = that.load.module.tools.get(item.phone,`-`),
                authStatus = that.load.module.tools.get(item.authStatus,`-`),
                password = that.load.module.tools.get(item.password,`-`),
                gmtDatetime = item.gmtDatetime,
                createdAt = that.load.module.tools.timeFormat(null,gmtDatetime),
                createAtTimestamp = that.load.module.tools.timeFormat(false,gmtDatetime)
            ;

            // that.load.module.csv.addOne(TrueName,Mobile,authStatus,password,createdAt);
            
            that.load.module.csv.addOne(TrueName,Mobile,`-`,`-`,`-`,createdAt);

            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
    } 



    chuishou(SourceData){
        let
            data = SourceData.data
        ;

        let
            that = this,
            dataResult = {},
            list = (function (){
                let
                    dataItemName = "list"
                ;
                if(data && (dataItemName in data) ){
                    return data[dataItemName];
                }
                return [];
            })()
        ;
        if(!data){
            dataResult.nextSkip = 20000;
            console.log(`skip -> 20000`);
        }

        dataResult.count = SourceData.total ? SourceData.total : 0;//总条数
        dataResult.source = list;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据
        console.log(`list.length -> ${list.length}`);
        let
            pageNum = (data && ("pageNum" in data) && data.pageNum) ? data.pageNum : 1
        ;
        if(!list.length){
            dataResult.nextSkip = (199 - pageNum);
            console.log(`skip -> ${pageNum}`);
        }
        //保存为csv文件
        //that.load.module.csv.initAdd(`姓名,手机号,认证状态,密码,申请时间`);

        for(let p in list){
            let
                item = list[p],
                TrueName = that.load.module.tools.get(item.userName,`-`),
                Mobile = that.load.module.tools.get(item.phone,`-`),
                authStatus = that.load.module.tools.get(item.authStatus,`-`),
                password = that.load.module.tools.get(item.password,`-`),
                //gmtDatetime = parseInt(item.gmtDatetime) / 1000,
                gmtDatetime = item.gmtDatetime,
                createdAt = that.load.module.tools.timeFormat(null,gmtDatetime),
                createAtTimestamp = that.load.module.tools.timeFormat(false,gmtDatetime)
            ;

            //that.load.module.csv.addOne(TrueName,Mobile,authStatus,password,createdAt);
            that.load.module.csv.addOne(TrueName,Mobile,`-`,`-`,`-`,createdAt);

            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
    }

    guoji1818(SourceData){
	    let
            data = SourceData.data
        ;

        let
            that = this,
            dataResult = {},
            list = (function (){
                let
                    dataItemName = "list"
                ;
                if(data && (dataItemName in data) ){
                    return data[dataItemName];
                }
                return [];
            })()
        ;
        dataResult.count = SourceData.total ? SourceData.total : 0;//总条数
        dataResult.source = list;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据
        console.log(`list.length -> ${list.length}`);
        let
            pageNum = (data && ("pageNum" in data) && data.pageNum) ? data.pageNum : 1
        ;
        if(!list.length){
            dataResult.nextSkip = (199 - pageNum);
            console.log(`skip -> ${pageNum}`);
        }
        //保存为csv文件
        //that.load.module.csv.initAdd(`姓名,手机号,申请时间,更新时间`);

        for(let p in list){
            let
                item = list[p],
                TrueName = that.load.module.tools.get(item.userName,`-`),
                Mobile = that.load.module.tools.get(item.userPhone,`-`),
                gmtDatetime = item.gmtDatetime,
                createdAt = item.uptDatetime,
                createAtTimestamp = that.load.module.tools.timeFormat(false,createdAt)
            ;
            //that.load.module.csv.addOne(TrueName,Mobile,gmtDatetime,createdAt);
            that.load.module.csv.addOne(TrueName,Mobile,`-`,`-`,`-`,createdAt);

            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
    }

    sdhuishou(data){
        let
            that = this,
            dataResult = {},
            list = (function (){
                let
                    dataItemName = "rows"
                ;
                if(dataItemName in data){
                    return data[dataItemName];
                }
                return [];
            })()
        ;
        dataResult.count = data.total;//总条数
        dataResult.source = list;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据

        //保存为csv文件
        //that.load.module.csv.initAdd(`姓名,手机号,身份证号,渠道来源,申请时间`);

        for(let p in list){
            let
                item = list[p],
                TrueName = that.load.module.tools.get(item.userName,`-`),
                Mobile = that.load.module.tools.get(item.phone,`-`),
                idCard = that.load.module.tools.get(item.idCard,`-`),
                channelName = that.load.module.tools.get(item.channelName,`-`),
                //education = that.load.module.tools.get(item.education,`-`),
                //JTShowAddress = that.load.module.tools.get(item.JTShowAddress,`-`),
                /*        state = (function (){
                            if(that.load.module.tools.get(item.state)){
                                return "正常";
                            }else{
                                return "-";
                            }
                        })(),*/
                /*         Sex = (function (){
                             let
                                 sex =  that.load.module.tools.get(item.Sex)
                             ;
                             if(sex ===0){
                                 return "保密";
                             }else if(sex === 1){
                                 return "男";
                             }else{
                                 return "女";
                             }
                         })(),*/
                /*              idcard = that.load.module.tools.get(item.CardNo,`-`),
                              name = that.load.module.tools.get(item.TrueName,`-`),
                              phone = that.load.module.tools.get(item.Mobile,`-`),
                              idcard = that.load.module.tools.get(item.CardNo,`-`),*/
                createAtTimestamp = parseInt(item.regisTime) / 1000,
                //updateAtTimestamp = item.LastLoginDate.replace(/[\/A-Za-z\(\)]+/ig,``),
                createdAt = that.load.module.tools.timeFormat(`yyyy-mm-dd`,createAtTimestamp)//,
                //updatedAt = that.load.module.tools.timeFormat(null,parseInt(updateAtTimestamp)/1000)
            ;
            //that.load.module.csv.addOne(TrueName,Mobile,idCard,channelName,createdAt);
            that.load.module.csv.addOne(TrueName,Mobile,idCard,`-`,`-`,createdAt);

            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
    }

    hzkunhang(data){
        let
            that = this,
            dataResult = {},
            list = (function (){
                let
                    dataItemName = "data"
                ;
                if(dataItemName in data){
                    return data[dataItemName];
                }
                return [];
            })()
        ;
        dataResult.count = data.page.total;//总条数
        dataResult.source = list;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据

        //保存为csv文件
        that.load.module.csv.initAdd(`姓名,手机号,身份证号,学历,用户状态,申请渠道,申请时间`);

        for(let p in list){
            let
                item = list[p],
                TrueName = that.load.module.tools.get(item.realName,`-`),
                Mobile = that.load.module.tools.get(item.loginName,`-`),
                idNo = that.load.module.tools.get(item.idNo,`-`),
                education = that.load.module.tools.get(item.education,`-`),
                //JTShowAddress = that.load.module.tools.get(item.JTShowAddress,`-`),
                state = (function (){
                    if(that.load.module.tools.get(item.state)){
                        return "正常";
                    }else{
                        return "-";
                    }
                })(),
                channelName = (  that.load.module.tools.get(item.channelName,`-`)  )[0],
       /*         Sex = (function (){
                    let
                        sex =  that.load.module.tools.get(item.Sex)
                    ;
                    if(sex ===0){
                        return "保密";
                    }else if(sex === 1){
                        return "男";
                    }else{
                        return "女";
                    }
                })(),*/
                /*              idcard = that.load.module.tools.get(item.CardNo,`-`),
                              name = that.load.module.tools.get(item.TrueName,`-`),
                              phone = that.load.module.tools.get(item.Mobile,`-`),
                              idcard = that.load.module.tools.get(item.CardNo,`-`),*/
                createAtTimestamp = item.registTime,
                //updateAtTimestamp = item.LastLoginDate.replace(/[\/A-Za-z\(\)]+/ig,``),
                createdAt = that.load.module.tools.timeFormat(null,createAtTimestamp)//,
                //updatedAt = that.load.module.tools.timeFormat(null,parseInt(updateAtTimestamp)/1000)
            ;
            that.load.module.csv.addOne(TrueName,Mobile,idNo,education,state,channelName,createdAt);

            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
    }


    shzdrzzl(data){
        let
            that = this,
            dataResult = {},
            list = (function (){
                let
                    dataItemName = "rows"
                ;
                if(dataItemName in data){
                    return data[dataItemName];
                }
                return [];
            })()
        ;
        dataResult.count = data.total;//总条数
        dataResult.source = list;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据

        if(!list.length){
            dataResult.nextSkip = 20000;
            console.log(`skip -> 20000`);
        }

        //保存为csv文件
        //that.load.module.csv.initAdd(`姓名,电话,身份证号,工作地址,家庭地址,申请时间`);

        for(let p in list){
            let
                item = list[p],
                TrueName = that.load.module.tools.get(item.TrueName,`-`),
                Mobile = that.load.module.tools.get(item.Mobile,`-`),
                CardNo = that.load.module.tools.get(item.CardNo,`-`),
                GZShowAddress = that.load.module.tools.get(item.GZShowAddress,`-`),
                JTShowAddress = that.load.module.tools.get(item.JTShowAddress,`-`),
                IsVIP = (function (){
                    if(!that.load.module.tools.get(item.IsVIP)){
                        return "是";
                    }else{
                        return "否";
                    }
                })(),
                SXMoney = that.load.module.tools.get(item.SXMoney,`0`),
                Sex = (function (){
                    let
                        sex =  that.load.module.tools.get(item.Sex)
                    ;
                    if(sex ===0){
                        return "保密";
                    }else if(sex === 1){
                        return "男";
                    }else{
                        return "女";
                    }
                })(),
                /* 
                idcard = that.load.module.tools.get(item.CardNo,`-`),
                name = that.load.module.tools.get(item.TrueName,`-`),
                phone = that.load.module.tools.get(item.Mobile,`-`),
                idcard = that.load.module.tools.get(item.CardNo,`-`),
                */
                createAtTimestamp = item.RegDate.replace(/[\/A-Za-z\(\)]+/ig,``),
                updateAtTimestamp = item.LastLoginDate.replace(/[\/A-Za-z\(\)]+/ig,``),
                createdAt = that.load.module.tools.timeFormat(null, parseInt(createAtTimestamp) / 1000),
                updatedAt = that.load.module.tools.timeFormat(null, parseInt(updateAtTimestamp) / 1000)
            ;

            that.load.module.csv.addOne(TrueName,Mobile,CardNo,GZShowAddress,JTShowAddress,createdAt);

            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
    }

    jiuchangkuaidai(data){
        let
            that = this,
            dataResult = {},
            list = (function (){
                let
                    dataItemName = "rows"
                ;
                if(dataItemName in data){
                    return data[dataItemName];
                }
                return [];
            })()
        ;
        dataResult.count = data.total;//总条数
        dataResult.source = list;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据

        if(!list.length){
            dataResult.nextSkip = 20000;
            console.log(`skip -> 20000`);
        }

        //保存为csv文件

        for(let p in list){
            let
                item = list[p],
                TrueName = that.load.module.tools.get(item.TrueName,`-`),
                Mobile = that.load.module.tools.get(item.Mobile,`-`),
                CardNo = that.load.module.tools.get(item.CardNo,`-`),
                GZShowAddress = that.load.module.tools.get(item.GZShowAddress,`-`),
                JTShowAddress = that.load.module.tools.get(item.JTShowAddress,`-`),
                IsVIP = (function (){
                    if(!that.load.module.tools.get(item.IsVIP)){
                        return "是";
                    }else{
                        return "否";
                    }
                })(),
                SXMoney = that.load.module.tools.get(item.SXMoney,`0`),
                Sex = (function (){
                    let
                        sex =  that.load.module.tools.get(item.Sex)
                    ;
                    if(sex ===0){
                        return "保密";
                    }else if(sex === 1){
                        return "男";
                    }else{
                        return "女";
                    }
                })(),
                /*              idcard = that.load.module.tools.get(item.CardNo,`-`),
                              name = that.load.module.tools.get(item.TrueName,`-`),
                              phone = that.load.module.tools.get(item.Mobile,`-`),
                              idcard = that.load.module.tools.get(item.CardNo,`-`),*/
                createAtTimestamp = item.RegDate.replace(/[\/A-Za-z\(\)]+/ig,``),
                updateAtTimestamp = item.LastLoginDate.replace(/[\/A-Za-z\(\)]+/ig,``),
                createdAt = that.load.module.tools.timeFormat(null,parseInt(createAtTimestamp)/1000),
                updatedAt = that.load.module.tools.timeFormat(null,parseInt(updateAtTimestamp)/1000)
            ;
            that.load.module.csv.addOne(TrueName,Mobile,CardNo,GZShowAddress,JTShowAddress,createdAt);

            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
    }

    //数据输入源
    jiuchangkuaidaiDataSource(callback){
        let
            that = this
        ;
        if(callback)callback();
    }

	luluMoney(data){
		let
			that = this,
			dataResult = {},
            list = data.list
		;
		dataResult.count = data.recordsTotal;//总条数
		dataResult.source = data;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据

		//保存为csv文件
		//that.load.module.csv.initAdd(`姓名,电话,身份证号,申请时间,更新时间`);

		for(let p in list){
			let
				item = list[p],
				name = that.load.module.tools.get(item.realName,`-`),
				phone = that.load.module.tools.get(item.username,`-`),
				idcard = that.load.module.tools.get(item.idcard,`-`),
				createAtTimestamp = item.createdAt/1000,
				createdAt = that.load.module.tools.timeFormat(null,createAtTimestamp),
				updatedAt = that.load.module.tools.timeFormat(null,item.updatedAt/1000)
			;
            //that.load.module.csv.addOne(name,phone,idcard,createdAt,updatedAt);
            that.load.module.csv.addOne(name,phone,idcard,`-`,`-`,updatedAt);
			if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
			}
		}
		return dataResult;
	}

	//数据输出
    pandoracredit(data){
        let
            that = this,
            dataResult = {},
            list = data.items
        ;
        dataResult.count = data.count;//总条数
        dataResult.source = data;//源数据
        dataResult.toDayCount = 0;//今日统计
        dataResult.toDayList = [];//今日数据
        //保存为csv文件
        //that.load.module.csv.initAdd(`电话,申请时间`);
        for(let p in list){
            let
                item = list[p],
                phone = that.load.module.tools.get(item.name,`-`),
                createdAt = item.create_time,
                createAtTimestamp = that.load.module.tools.timeFormat(false,createdAt)
			;
            //that.load.module.csv.addOne(phone,createdAt);
            that.load.module.csv.addOne(`-`,phone,`-`,`-`,`-`,createdAt);

            if(createAtTimestamp > this.toDayTimestamp){
                dataResult.toDayCount++;
                dataResult.toDayList.push(item);
            }
        }
        return dataResult;
	}

	//数据输入源
    pandoracreditDataSource(callback){
		let
			that = this
		;
		//
		that.load.module.web.Ajax(`https://console.pandoracredit.cn/api/user`,(data)=>{
            that.load.option.dataSource.username = data.item.name;//修改用户名
            if(callback)callback();
		});
	}
    //添加数据处理
    start(currentWebName){
	    let
            that = this
        ;
	    that.exec = that[currentWebName];
        return this;
    }

	//开启一个数据处理
    init(){
	    let
            that = this
        ;
        that.load.module.csv.init();
    }
    //添加数据处理
    add(currentDataJson){
        let
            that = this
        ;
        if(that.load.option.dataExecute){
            that.load.option.dataExecute(currentDataJson);
        }
    }
    //数据处理关闭
    close(){
        let
            that = this
        ;
        console.log(`close data execute..`);
        that.load.option.dataExecute = null;
    }
}

module.exports = CC;