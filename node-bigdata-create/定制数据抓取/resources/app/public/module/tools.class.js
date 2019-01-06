class C{

	urlFormat(url){
		let
		    that = this
		;
		if(/^\s*https*\:\/\//.test(url)){
			return url;
		}else{
			return `http://`+url;
		}
	}


	urlToFileName(url){
        url = url.replace(/^\s*https*\:\/+/i,``);
        url = url.replace(/\:.+/i,``);
        return url;
	}


	get(a=null,b=null){
		if(a){
			return a;
		}else if(b){
			return b;
		}else{
			return a;
		}
	}


	copy(a,b,callback){
        let
            that = this,
            fileReadStream= that.load.node.fs.createReadStream(a),
            fileWriteStream = (function (){
                if(!that.load.node.fs.existsSync(b)){
                    that.load.node.fs.writeFileSync(b,``);
                }
                return that.load.node.fs.createWriteStream(b);
            })()
        ;
        fileReadStream.on('data',function(data){
            fileWriteStream.write(data);
        });
        fileReadStream.on('end',function(){
            fileWriteStream.end();
            if(callback){
                callback();
            }
        });
    }

    isFile(dirname){
        let
            that = this
        ;
        if (that.load.node.fs.existsSync(dirname) && that.load.node.fs.lstatSync(dirname).isFile()) {
            return true;
        } else {
            return false;
        }
    }

    isDir(dirname){
        let
            that = this
        ;
        if (that.load.node.fs.existsSync(dirname) && that.load.node.fs.lstatSync(dirname).isDirectory()) {
            return true;
        } else {
            return false;
        }
    }

	mkdirSync(dirname) {
	    let
            that = this
        ;
        if (that.load.node.fs.existsSync(dirname) && that.load.node.fs.lstatSync(dirname).isDirectory()) {
            return true;
        } else {
            if (that.mkdirSync(that.load.node.path.dirname(dirname))) {
                that.load.node.fs.mkdirSync(dirname);
                return true;
            }
        }
    }



    /**
     * @tools 创建格式化时间
     */
    timeFormat(fmt,thisDate=new Date()){
        let
            timestamp = false
        ;
        if(fmt === false){//全等false时生成时间戳
            timestamp = true;
        }else if(!fmt){
            fmt = "yyyy-mm-dd hh:mm:ss";
        }
        let
            thisDataType = typeof thisDate
        ;
        if(thisDataType === "string"){
            thisDate = (function (){
                if(/^\s*\d+\s*$/.test(thisDate)){
                    return new Date(thisDate * 1000);
                }else{
                    return new Date(thisDate );
                }
            })();
        }else if(thisDataType === "number"){
            thisDate =  new Date(thisDate * 1000);
        }
        if(timestamp){
            fmt = thisDate.getTime()/1000;
        }else{
            if(`getTime` in thisDate){
                let o = {
                    "M+": thisDate.getMonth() + 1, //月份
                    "d+": thisDate.getDate(), //日
                    "h+": thisDate.getHours(), //小时
                    "m+": thisDate.getMinutes(), //分
                    "s+": thisDate.getSeconds(), //秒
                    "q+": Math.floor((thisDate.getMonth() + 3) / 3), //季度
                    "S": thisDate.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (thisDate.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (let k in o){
                    if (new RegExp("(" + k + ")","i").test(fmt)){
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
            }else{
                return null;
            }
        }
        return fmt;
    }


    //获取当天零点时间戳
    toDayTimestamp(){
        return  new Date(new Date(new Date().toLocaleDateString()).getTime())
    }


    /**
     * @func 获取当前点时间戳
     * @returns {number}
     */
    currentTimestamp(){
        return  (new Date()).getTime();
    }


    /**
     * @func 生成过去 跨度内的时间范围
     * @param timeSpan 时间跨度
     * @param Company
     * @param fmt
     */
    createContinuityTimeStamp(timeSpan="y-10",Company,fmt="yyyy-mm-dd"){
        let
            that = this,
            startData = ( new Date() ),
            endData = ( new Date() ),
            timeSpanType = timeSpan[0].toLowerCase(),
            timeSpanSymbol = timeSpan[1],
            timeSpanNumber = parseInt(timeSpan.replace(/[^\d]/ig,``)),
            timeValue,
            startTime,
            endTime,
            result = []
        ;
        switch (timeSpanType) {
            case "y":
                timeValue = startData.getFullYear();
                if(timeSpanSymbol ==="+"){
                    timeValue+=timeSpanNumber;
                }else{
                    timeValue-=timeSpanNumber;
                }
                startData.setFullYear(timeValue);
                if(!Company)Company = "m";
                break;
            case "m":
                timeValue = startData.getMonth();
                if(timeSpanSymbol ==="+"){
                    timeValue+=timeSpanNumber;
                }else{
                    timeValue-=timeSpanNumber;
                }
                startData.setMonth(timeValue);
                if(!Company)Company = "d";
                break;
            case "d":
                timeValue = startData.getDate();
                if(timeSpanSymbol ==="+"){
                    timeValue+=timeSpanNumber;
                }else{
                    timeValue-=timeSpanNumber;
                }
                startData.setDate(timeValue);
                if(!Company)Company = "h";
                break;
        }
        if(startData.getTime() < endData.getTime()){
            startTime = startData;
            endTime = endData;
        }else{
            console.log(2);
            startTime = endData;
            endTime = startData;
        }

        timeValue = null;

        while( startTime.getTime()  < endTime.getTime() ){
            let
                startTimeFmt = "yyyy-mm-dd",
                startTimeCurrent,
                endTimeFmt = startTime
            ;
            switch (Company) {
                case "y":
                    startTimeCurrent = that.timeFormat(startTimeFmt,startTime );
                    startTime.setFullYear((startTime.getFullYear() + 1));
                    endTimeFmt = that.timeFormat(startTimeFmt,endTimeFmt );
                    break;
                case "m":
                    startTimeCurrent = that.timeFormat(startTimeFmt,startTime );
                    startTime.setMonth((startTime.getMonth() + 1));
                    endTimeFmt = that.timeFormat(startTimeFmt,endTimeFmt );
                    break;
                case "d":
                    startTimeCurrent = that.timeFormat(startTimeFmt,startTime );
                    startTime.setDate((startTime.getDate() + 1));
                    endTimeFmt = that.timeFormat(startTimeFmt,endTimeFmt );
                    break;
                case "h":
                    startTimeFmt = "yyyy-mm-dd hh:mm:ss";
                    startTimeCurrent = that.timeFormat(startTimeFmt,startTime );
                    startTime.setHours((startTime.getHours() + 1));
                    endTimeFmt = that.timeFormat(startTimeFmt,endTimeFmt );
                    break;
            }
            result.push([
                startTimeCurrent,
                endTimeFmt
            ]);
        }
        let
            resultArray = [],
            resultLen = 0
        ;
        result.forEach((resultItem,index)=>{
            if(index % 2 === 0){
                resultLen = index;
                resultArray.push(resultItem);
            }
        });
        //代表还有最后一位
        if(resultLen < (result.length -1)){
            let
                endData = result[result.length -1][1]
            ;
            resultArray.push([endData,endData]);
        }
        return resultArray;
    }

    //解压文件
    unzip(zipPath,unzipPath,callback){
        let
            that = this
        ;
        if(!that.load.node.fs.existsSync(unzipPath)){
            that.mkdirSync(unzipPath);
        }
        // 解压缩
        that.load.node.compressing.zip.uncompress(zipPath,unzipPath)
            .then(() => {
                console.log(`unzip file ${zipPath} to ${unzipPath} success!`);
                if(callback)callback(true);
            })
            .catch(err => {
                console.log(`unzip err!`,err);
                if(callback)callback(false);
            });
    }

}

module.exports = C;