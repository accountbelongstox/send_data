class C{

	constructor(load){

	}

    isEmpty(){
        let
            that = this
        ;
        if(!that.load.option.csvData.length || that.load.option.csvData.length === 0){
            return true;
        }else{
            return false;
        }
    }

    initAdd(data=null){
        let
            that = this,
            filePath = that.getFileNameInt(),
			c = that.load.node.fs.readFileSync(filePath)
        ;
        c = c.toString();
        if(c) c = c.replace(/\s+/ig,``);
        if(!c && data){
        	that.addOne(data);
        }
    }

    getFileNameTime(){
        let
            that = this,
            filePath = `f_`+that.load.module.tools.urlToFileName(that.load.option.currentSupportURL)
        ;
        filePath = filePath.replace(/^[\/\\]+|[\/\\]+$/ig,``).replace(/[\\\/]+/ig,`_`);
        filePath = filePath+'-'+that.load.module.tools.timeFormat("yyyy-mm-dd-hh-mm-ss");
        filePath = filePath.replace(/[\/\\\?\|\;\:\'\"\<\>\,]/ig,`-`);
        filePath = that.load.node.path.join(that.load.node.os.homedir(),`Desktop/`+filePath);
        filePath = filePath+`.csv`;
        return filePath;
    }

    getFileNameInt(){
        let
            that = this,
            filePath = `f_`+that.load.module.tools.urlToFileName(that.load.option.currentSupportURL)
        ;
        filePath = filePath.replace(/^[\/\\]+|[\/\\]+$/ig,``).replace(/[\\\/]+/ig,`_`);
        filePath = filePath+`.csv`;
        filePath = that.load.node.path.join(that.load.option.tmpDir,filePath);
        return filePath;
	}

    init(data=null){
        let
            that = this,
            filePath = that.getFileNameInt(),
            csvData = [],
			content = ""
        ;
        if(that.load.node.fs.existsSync(filePath)){
            that.load.node.fs.unlinkSync(filePath);
        }
        if(data){
            csvData.push(data);
        }
        content = csvData.join(`,`);
        content +=`\r\n`;
        content = that.load.node["iconv-lite"].encode(content, "gbk");
        content = new Buffer(content, 'binary');
        that.load.node.fs.writeFileSync(filePath,content,{encoding:'binary'});
    }

    //保存为文件
    saveCsvData(data){
        let
            that = this,
            csvData = []
        ;
        that.load.node.fs.writeFileSync(that.load.option.csvData,JSON.stringify(data));
	}

	addOne(...data){
		let
		that = this
		;
        //appendFile

		if(data){
			let
                filePath = that.getFileNameInt(),
                typeofDataFirst = typeof data[0],
            	typeofData = typeof data
			;
            if( typeofDataFirst === "object"){
                data = data[0];
            }else if(typeofData === "string"){
                data = data.split(/\,/);
            }
            data.forEach((dataItem,index)=>{
                dataItem = dataItem.toString();
                //dataItem = dataItem.replace(/\,/ig,`，`);
                if(parseInt(dataItem) === parseInt(dataItem)){
                    dataItem = `="${dataItem}"`;
                }
                data[index] = dataItem;
            });
            data = data.join(`,`);
            let
				content = data+`\r\n`
			;
           	//data = that.load.node["iconv-lite"].encode(data, "gbk");
			//
 /*           var fileStr = fs.readFileSync('input.txt', {encoding:'binary'});
            var str = iconv.decode(buf,'utf8');
*/
            content = that.load.node["iconv-lite"].encode(content, "gbk");
            content = new Buffer(content, 'binary');

            that.load.node.fs.appendFileSync(filePath,content,{encoding:'binary'});
		}
	}

	//保存 CSV 文件
	save(callback){
		let
			that = this,
			fileNameTime = that.getFileNameTime(),
			fileNameInit = that.getFileNameInt()
		;
		console.log(fileNameInit,`save in !`);
        that.load.node.fs.readFile(fileNameInit,(err,content)=>{
            if(err)console.log(err);
            that.load.node.fs.writeFile(fileNameTime,content,{encoding:'binary'},(err)=>{
                if(err){
                    console.log(err);
                }
                if(callback){
                    callback(fileNameTime);
                }
            });
		});
	}
}

module.exports = C;