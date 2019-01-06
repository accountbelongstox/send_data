class SC{
    constructor(){

    }

    //检查是否升级
    checkUpdate(callback){
        let
            that = this,
            webData = that.load.json.webData,
            data = webData.software,
            supportWebHtml = data.updateURL,
            currentVersion = webData.base.version
        ;
        currentVersion = parseFloat(currentVersion);
        that.load.eles.currengVersionShow.html(currentVersion);
        (function checkUp(){
            that.load.module.web.Ajax(supportWebHtml,(data)=>{
                let
                    version = parseFloat(data.version),
                    files = data.files
                ;
                console.log(`update check ${version },${ currentVersion}`)
                if(version > currentVersion){
                    callback({
                        version,
                        files,
                        "files_join":files.join(`,`)
                    });
                }else{
                    callback(false);
/*                    setTimeout(()=>{
                        console.log(`timeOut check update!`);
                        checkUp();
                    },600000);*/
                }
            });
        })();
    }
}
module.exports = SC;