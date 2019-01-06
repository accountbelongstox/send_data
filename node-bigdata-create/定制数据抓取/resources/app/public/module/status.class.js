class CC{


    constructor(load){
    }

    webInit(){
        let
            that = this
        ;
        that.load.eles.readData.hide();
        that.load.eles.stopReadData.hide();
        that.load.eles.notTheFnInfo.hide();
        that.progressBarInfo("成功!等待操作.");
    }

    //禁用抓取
    readDisabled(){
        let
            that = this
        ;
        that.progressBarInfo("此网站不支持!","error");
        that.load.eles.notTheFnInfo.show();
        that.load.eles.readData.hide();
        that.load.eles.stopReadData.hide();
    }

    //读取初始状态
    readInit(){
        let
            that = this
        ;
        that.load.eles.saveData.css({
            visibility:"hidden"
        });
        that.load.eles.readData.show();
        that.load.eles.stopReadData.hide();
        that.load.eles.notTheFnInfo.hide();
        that.progressBarInfo("成功!等待操作.");
    }

    //数据读取中
    reading(){
        let
            that = this
        ;
        that.load.eles.saveData.css({
            visibility:"hidden"
        });
        that.load.eles.readData.hide();
        that.load.eles.stopReadData.show();
        that.load.eles.notTheFnInfo.hide();
        that.progressBarReadIn();
    }

    //数据读取结束
    readEnd(success=true){
        let
            that = this,
            visibility = success ? "visible" : "hidden"
        ;
        that.load.eles.readData.show();
        that.load.eles.stopReadData.hide();
        that.load.eles.notTheFnInfo.hide();

        that.load.eles.saveData.css({
            visibility,
        });
        that.progressBarStatus(success);
        if(!success){
            that.load.module.csv.init();
        }
    }

    //状态条 读取中
    progressBarReadIn(){
        let
            that = this
        ;
        that.progressBarInfo("加载中!","loading");
    }

    //状态条 成功失败
    progressBarStatus(success=true){
        let
            that = this
        ;
        if(success){
            that.progressBarInfo("加载数据成功!","success");
        }else{
            that.progressBarInfo("抓取数据失败!","error");
        }
    }

    progressBarInfo(info,type="info"){
        let
            that = this,
            icon = ''
        ;
        switch (type) {
            case "info":
                icon = "img/icons/top/messages.png";
                break;
            case "success":
                icon = "img/elements/uploader/uploaded.png";
                break;
            case "error":
                icon = "img/elements/uploader/deleteFile.png";
                break;
            case "waring":
                icon = "img/elements/uploader/error.png";
                break;
            case "loadingWeb":
                icon = "img/elements/uploader/throbber.gif";
                break;
            case "loading":
                icon = "img/elements/loaders/10.gif";
                break;
        }
        that.load.eles.status.html(info);
        that.load.eles.statusIcon.attr("src",icon);
    }
}

module.exports = CC;