class loadC{
	constructor(object){
		let
			that = this
		;
		if(!that.loads){
			let
				nodes = [
                    "path",
                    "fs",
                    "os",
                    "url",
                    "iconv-lite",
                    "electron",
                    "request",
					"compressing",
					"node-cmd"
				],
                modulesDir,
                modules,
                jsonDir,
				JSONs
			;

            that.node = {};
            //加载全部 node
            nodes.forEach((node)=>{
                that.node[node] = require(node);
			});

            let
                rootDir = that.node.path.join(__dirname,`../`),
                userRoot = that.node.path.join(that.node.os.homedir(),`/.ddweb_soft/`),
                tmpDir = that.node.path.join(userRoot,`/tmp/`)
			;
            modulesDir = that.node.path.join(__dirname,"/module/");
            modules = that.node.fs.readdirSync(modulesDir);

            jsonDir = that.node.path.join(__dirname,"/dataJSON/");
            JSONs = that.node.fs.readdirSync(jsonDir);

            that.option = {
                tmpDir,
                rootDir,
                modulesDir,
                jsonDir,
                tmpHTML:this.node.path.join(tmpDir,`tmp.html`)
            };

            if(!that.eles){
                that.eles = {};
            }
            if(object){
            	let
					document,
					$
				;
                object.forEach((item)=>{
					if(typeof item  === "object"){
						for(let p in item){
                            if(p === "document"){
                                document = item[p]
                            }
                            if(p === "$"){
                                $ = item[p]
                            }
						}
					}
				});
                object.forEach((item)=>{
					let
                        typeofItem = typeof item
					;
                    if(typeofItem  === "object"){
                    	for(let p in item){
                            that.eles[p] = item[p];
						}
					}else if(typeofItem === "string"){
                    	let
                            itemName = item.replace(/^[\#\.]+/ig,``)
						;
                        if($){//有 jQuery 时用来造反元素
                            that.eles[itemName] = $(item);
                        }else if(document){//有 document 时用来造反元素
                            that.eles[itemName] = document.querySelectorAll(item);
                        }
					}
				});
			}

            //加载全部 module
            modules.forEach((node,index)=>{
                let
                    modulePath = that.node.path.join(modulesDir,node)
                ;
                if(that.node.fs.lstatSync(modulePath).isFile()){
                    that.loadModule(node);
                }
            });

            //创建用户文件夹
            if(!that.node.fs.existsSync(userRoot)){
                that.module.tools.mkdirSync(userRoot);
            }
            //创建临时文件夹
            if(!that.node.fs.existsSync(tmpDir)){
                that.module.tools.mkdirSync(tmpDir);
            }

            
            //加载全部 module
            JSONs.forEach((jsonItem)=>{
                let
                    jsonItemPath = that.node.path.join(jsonDir,jsonItem)
                ;
                if(that.node.fs.lstatSync(jsonItemPath).isFile()){
                    that.loadJson(jsonItem);
                }
            });
            that.loads = true;
		}
	}

	loadModule(moduleName){
		let
		that = this
		;
		if(!that.module){
			that.module = {};
		}
        moduleName = moduleName.replace(/\.class\.js$/i,``);
		if(!that.module[moduleName]){
			let
			modulePath =  that.node.path.join(that.option.modulesDir,`${moduleName}.class.js`)
			;
			if(that.node.fs.existsSync(modulePath)){
				that.module[moduleName] = require(modulePath);
				that.module[moduleName] = new that.module[moduleName](that);
				that.module[moduleName].node = that.node;
				that.module[moduleName].load = that;
				that.module[moduleName].option = {};
			}else{
				that.module[moduleName] = null;
			}
		}
		return that.module[moduleName];
	}

	loadJson(moduleName){
		let
		that = this
		;
		if(!that.json){
			that.json = {};
		}
        moduleName = moduleName.replace(/\.json\.js$/i,``);
        moduleName = moduleName.replace(/\.json$/i,``);
		if(!that.json[moduleName]){
			let
			modulePath = that.node.path.join(that.option.jsonDir,`../dataJson/${moduleName}.json.js`),
			modulePath2 = that.node.path.join(that.option.jsonDir,`../dataJson/${moduleName}.json`)
			;
			if(that.node.fs.existsSync(modulePath)){
				that.json[moduleName] = require(modulePath);
				that.json[moduleName] = new that.json[moduleName](that);
				that.json[moduleName].node = that.node;
				that.json[moduleName].load = that;
				that.json[moduleName].option = {};
				if("run" in that.json[moduleName]){
					that.json[moduleName] = that.json[moduleName].run();
				}
			}else if(that.node.fs.existsSync(modulePath2)){
				modulePath = modulePath2;
				that.json[moduleName] = require(modulePath);
			}else{
				that.json[moduleName] = null;
			}
		}
		return that.json[moduleName];
	}

	//执行一个全局事件
    event(eventName,args=null,callback){
        let
            that = this,
			result = null,
            //此处传入的因为直接 是load本身
            //为了统一书写习惯  将 load 再往下一级
            thatLoad = {
                load:that
            },
            HTMLEventModule = that.module[`event-html`],
            electronEventModule = that.module[`event-electron`]
        ;
        if(!that.eventObejct){
            that.eventObejct = {};
        }
        if(!that.eventObejct[eventName]){
            if(eventName in HTMLEventModule){
                that.eventObejct[eventName] = HTMLEventModule[eventName];
            }else if(eventName in electronEventModule){
                that.eventObejct[eventName] = electronEventModule[eventName];
            }
        }
        if(that.eventObejct[eventName]){
        	//electron 执行的 that 必须以参数的形式传入进却说
            result = that.eventObejct[eventName](thatLoad,args,callback);
        }else{
        	console.log(`event ${eventName} not exists!`);
		}
        return result;
	}

}

module.exports = loadC;