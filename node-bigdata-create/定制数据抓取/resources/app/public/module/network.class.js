class NC{

    //下载文件
    downFile(url,save,callback){
        let
            that = this
        ;

        save = save+`.7z`;
        url = that.load.module.tools.urlFormat(url);

        if(!that.load.node.fs.existsSync(save)){
            let
                saveParse = that.load.node.path.parse(save),
                dir = saveParse.dir,
                ext = saveParse.ext
            ;
            that.load.node.fs.writeFileSync(save,``);

        }
        let
            stream = that.load.node.fs.createWriteStream(save)
        ;

        console.log(url,save+'正在下载');
        that.load.node.request(url).pipe(stream).on('close', ()=>{
            console.log(save+'下载完毕');
            if(callback)callback();
        });
    }

    downloadFile (patchUrl, option, callback) {
        let
            that = this,
            downloadFile = option.save,
            progress = option.progress,//接收进度参数
            sourceDownloadFile = downloadFile
        ;

        patchUrl = that.load.module.tools.urlFormat(patchUrl);
        downloadFile = downloadFile+`.7z`;

        if(!that.load.node.fs.existsSync(downloadFile)){
            that.load.node.fs.writeFileSync(downloadFile,``);
        }

        let receivedBytes = 0;
        let totalBytes = 0;

        const
            req = that.load.node.request({
            method: 'GET',
            uri: patchUrl
        })
        ;

        const
            out = that.load.node.fs.createWriteStream(downloadFile)
        ;
        req.pipe(out);
        req.on('response', (data) => {
            // 更新总文件字节大小
            totalBytes = parseInt(data.headers['content-length'], 10);
        });

        req.on('data', (chunk) => {
            // 更新下载的文件块字节大小
            receivedBytes += chunk.length;
            let
                percentage = parseInt((receivedBytes * 100) / totalBytes)
            ;
            //console.log(`network => ${percentage}`);
            if(progress)progress(percentage);
        });

        req.on('end', () => {
            console.log('download finish!');
            if(that.load.node.fs.existsSync(sourceDownloadFile)){
                that.load.node.fs.unlinkSync(sourceDownloadFile);
            }
            that.load.node.fs.renameSync(downloadFile,sourceDownloadFile);
            if(callback)callback();
        });
    }
}

module.exports = NC;