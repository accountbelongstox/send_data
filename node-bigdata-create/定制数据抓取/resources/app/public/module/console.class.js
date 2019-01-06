class CC{

    error(info,hide=true){
        let
            that = this
        ;
        that.showInfo(info,"error",hide);
    }
    alert(info,hide=true){
        let
            that = this
        ;
        that.showInfo(info,"alert",hide);
    }
    success(info,hide=true){
        let
            that = this
        ;
        that.showInfo(info,"success",hide);
    }
    block(info,hide=true){
        let
            that = this
        ;
        that.showInfo(info,"block",hide);
    }
    info(info,hide=true){
        let
            that = this
        ;
        that.showInfo(info,"info",hide);
    }

    showInfo(info,infoType="info",hide=true){
        let
            that = this,
            types = {
                "alert":{
                    class:"",
                    description:"提示! : "
                },
                "error":{
                    class:"alert-error",
                    description:"错误! : "
                },
                "success":{
                    class:"alert-success",
                    description:"成功! : "
                },
                "info":{
                    class:"alert-info",
                    description:"信息! : "
                },
                "block":{
                    class:"alert-block",
                    description:"阻止! : "
                }
            },
            alertClass = '',
            infoTypeClass = (function (){
                let
                    o = types[infoType]
                ;
                if(o.class){
                    alertClass = o.class;
                }
                return o;
            })(),//×
            html = `<div class="alert ${alertClass}" style="text-align: center;">
			<button type="button" class="close" data-dismiss="alert">×</button>
			<strong class="description">${infoTypeClass.description}</strong>
			<span class="info">${info}</span>
		</div>`
        ;
        that.load.eles.info.html(html);
        if(hide){
            that.load.eles.info.children(`.alert`).fadeOut(6000);
        }
    }
}

module.exports = CC;