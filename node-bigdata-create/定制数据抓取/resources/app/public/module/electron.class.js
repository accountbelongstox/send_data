class CC{

    constructor(load) {
    }

    //监听事件
    //绑定格式   class ="electron-ipc-xxxx"
    //数据传递   data-electron-ipc-args="xxx|xxx"
    //回调函数   data-electron-ipc-callback="xxx|xxx"
    HTMLListener(){
        let
            that = this,
            documentAll = that.load.eles.document.all
        ;
        for(let p in documentAll){
            let
                documentItem = documentAll[p],
                ele = (function (){
                    let
                        eltItem = null
                    ;
                    if(documentItem){
                        try{
                            eltItem = that.load.eles.$(documentItem);
                        }catch(err){
                            console.log(err);
                            eltItem = null;
                        }
                    }
                    return eltItem;
                })(),
                className = (function (){
                    if(ele){
                        return ele.attr('class');
                    }else{
                        return null;
                    }
                })()
            ;
            if(className){
                let
                    classNames = className.split(/\s+/),
                    callback = ele.data('electron-callback')
                ;
                classNames.forEach((classNameItem)=>{
                    let
                        ipcRegExp = /^electron\-/i,
                        eventTypeExp = /(?<=electron\-).+?(?=\-)/i,
                        ipcReplace = /^electron\-[a-zA-Z0-9]+\-/i,
                        eventName = classNameItem.replace(ipcReplace,``).toLowerCase()
                    ;
                    if(classNameItem.match(ipcRegExp)){
                        console.log(`Ipc 事件绑定 => ${classNameItem}`);
                        let
                            eventType = (classNameItem.match(eventTypeExp))[0]
                        ;
                        if(eventType === "ipc"){//发送绑定
                            ele.click((event)=>{
                                event.stopPropagation();
                                let
                                    arg = (function (){
                                        let
                                            args = ele.data('electron-args')
                                        ;

                                        if(args){
                                            if(args.includes(`|`)){
                                                args = args.split(/\|+/);
                                            }else if(args.includes(`,`)){
                                                args = args.split(/\,+/);
                                            }
                                        }
                                        if(args && (`length` in args) && args.length === 1){
                                            args = args[0];
                                        }
                                        return args;
                                    })()
                                ;
                                that.load.option[`${eventName}CallbackName`] = callback;
                                if(!that.load.option[eventName]){
                                    that.load.option[eventName] = true;
                                    that.load.node.electron.ipcRenderer.send("electronListener",{
                                        arg,
                                        sendIpc:eventName,
                                        callback
                                    });
                                }
                            });
                        }else if(eventType === "click"){//点击事件绑定
                            ele.click((event)=>{
                                event.stopPropagation();
                                let
                                    args = (function (){
                                        let
                                            arg = ele.data('electron-args')
                                        ;

                                        if(arg){
                                            if(arg.includes(`|`)){
                                                arg = arg.split(/\|+/);
                                            }else if(arg.includes(`,`)){
                                                arg = arg.split(/\,+/);
                                            }
                                        }
                                        console.log(arg,10001)
                                        if(that.load.module.array.isArray(arg) && arg.length === 1){
                                            arg = arg[0];
                                        }
                                        return arg;
                                    })()
                                ;
                                that.load.event(eventName,args);
                            });
                        }
                        that.load.node.electron.ipcRenderer.on(eventName, (event, arg) => {
                            let
                                callbackName = that.load.option[`${eventName}CallbackName`],
                                callbackModule = that.load.module["event-electron"],
                                callbackFunction = callbackModule[callbackName]
                            ;
                            console.log(`${eventName} => 执行完毕! 回调数据 => `,arg);
                            that.load.option[eventName] = false;//执行完后允许再次执行
                            if(callbackFunction){
                                callbackFunction(arg,event);
                            }
                        });
                    }
                });
            }
        }
    }


    //NODE electron 监听事件
    //当有该方法的时候就监听,没有则跳过
    electronListener(){
        let
            that = this,
            ipcMain = that.load.node.electron.ipcMain,
            globalShortcuts = that.load.json.webData.base.globalShortcut
        ;
        ipcMain.on("electronListener", (event, arg) => {
            let
                sendIpc = arg.sendIpc,
                args = arg.arg ? arg.arg : null,
                appFunction = (function (){
                    let
                        app = that.load.node.electron.app[sendIpc]
                    ;
                    if(!app){
                        app = that.load.electron_window[sendIpc];
                    }
                    return app;
                })()
            ;
            console.log(`Ipc on => ${sendIpc}`);
            if(appFunction){
                appFunction();
            }else{
                let
                    listenerFunction = that.load.module[`event-electron`][sendIpc]
                ;
                if(listenerFunction){
                    listenerFunction(that , args, (result)=>{
                        //执行完后告诉子进程
                        if(result === undefined){
                            result = true;
                        }
                        that.load.electron_window.webContents.send(sendIpc, result);
                    }, event);

                }
            }
        });
        //监听快捷键
        //that.load.event("openDevTools");
        for(let p in globalShortcuts){
            let
                globalShortcutItem = globalShortcuts[p]
            ;
            let
                event = globalShortcutItem,
                args = null,
                callback
            ;
            if(typeof globalShortcutItem === "object"){
                event = globalShortcutItem.event;
                if("args" in globalShortcutItem){
                    args = globalShortcutItem.args;
                }
                if("callback" in globalShortcutItem){
                    callback = globalShortcutItem.callback;
                }
            }
            console.log(`register event => ${p}`);
            that.load.node.electron.globalShortcut.register(p, function () {
/*                electron.dialog.showMessageBox({
                    type: 'info',
                    message: '成功!',
                    detail: '你按下了一个全局注册的快捷键绑定.',
                    buttons: ['好的']
                })*/
                that.load.event(event,args,callback);
            })
        }
    }

    //创建一个窗口
    createWindow(){
        let
            //此处的 that 来源于 electron.app 的赋值.因为该值在App 里不能直接调用
            that = this.that,
            BrowserWindow = that.load.node.electron.BrowserWindow,
            Menu = that.load.node.electron.Menu,
            htmlUrl =  that.load.node.path.join(__dirname,'../../public/html/index.html')
        ;
        //创建浏览器窗口
        that.load.electron_window = new BrowserWindow({
            width: 1350,
            minWidth : 1350,
            height: 1002,
            minHeight : 1002,
            frame: false
        });
        Menu.setApplicationMenu(null);
        // 加载应用的 index.html
        that.load.electron_window.loadURL(that.load.node.url.format({
            pathname: htmlUrl,
            protocol: 'file:',
            slashes: true
        }));
        // 打开开发者工具
        //that.load.electron_window.webContents.openDevTools();
        // 关闭window时触发下列事件.
        that.load.electron_window.on('closed', () => {
            // 取消引用 window 对象，通常如果应用支持多窗口，则会将
            // 窗口存储在数组中,现在应该进行删除了.
            that.load.electron_window = null;
        });
        that.load.electron_window.webContents.on('dom-ready',()=>{
            that.electronListener();
        });

    }

    //初始化
    init(){
        let
            that = this
        ;
        that.load.node.electron.app.that = that;
        // 当Electron完成初始化并准备创建浏览器窗口时调用此方法
        // 部分 API 只能使用于 ready 事件触发后。
        that.load.node.electron.app.on('ready', that.createWindow);
        // 所有窗口关闭时退出应用.
        that.load.node.electron.app.on('window-all-closed', () => {
            // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
            if (process.platform !== 'darwin') {
                that.load.node.electron.app.quit()
            }
        });
        that.load.node.electron.app.on('activate', () => {
            // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
            if (that.load.electron_window === null) {
                that.createWindow();
            }
        });
    }
}

module.exports = CC;