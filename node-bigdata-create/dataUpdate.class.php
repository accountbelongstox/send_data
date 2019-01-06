<?php
/**
 * Created by PhpStorm.
 * User: MD
 * Date: 2018/10/23
 * Time: 11:24
 */

class dataUpdate{

    public $gets;
    public $posts;
    public $files;
	public $dataSourceDir = "./dataSourceName.txt";

    function __construct(){

    }
	public function get($name,$datas=null){
		$r = null;
		if(!$datas){
			$datas =  $this->gets;
			if(!empty($datas)){
				if(!empty($datas[$name])){
					$r = $datas[$name];
				}
			}
			// ------
			if(!$r){
				$datas =  $this->posts;
				if(!empty($datas)){
					if(!empty($datas[$name])){
						$r = $datas[$name];
					}
				}
			}
			// ------
			if(!$r){
				$datas =  $this->files;
				if(!empty($datas)){
					if(!empty($datas[$name])){
						$r = $datas[$name];
					}
				}
			}
		}
		return $r;
	}
	
	public function set($gets,$posts,$files){
        $this->gets = $gets;
        $this->posts = $posts;
        $this->files = $files;
	}
	

    //添加数据提取码
    public function add($gets,$posts,$files){
        $this->set($gets,$posts,$files);
		
    }
	
	//发送提取命令
	//抓取程序根据此文件判断读取那个网站
	public function sendGetData($gets,$posts,$files){
        $this->set($gets,$posts,$files);
		
		if(!file_exists($this->dataSourceDir)){
			$getDataName = $this->get("dataSourceName");
			file_put_contents("./dataSourceName.txt",$getDataName);
			return true;
		}else{
			return null;
		}
	}
	
	//提取程序完成.
    public function getDataFinish($gets,$posts,$files){
        $this->set($gets,$posts,$files);
		$finish = $this->get("finish");
		if($finish){//提取完成时删除
			@unlink($this->dataSourceDir);
		}
    }

	
	//上传保存数据
    public function update($gets,$posts,$files){
        //取文件信息
        $arr = $files["file"];
        //加限制条件
        //1.文件类型
        //2.文件大小
        //3.保存的文件名不重复
        if(($arr["type"]=="image/jpeg" || $arr["type"]=="image/png" ) && $arr["size"]<10241000){
        //临时文件的路径
            $arr["tmp_name"];
            //上传的文件存放的位置
            //避免文件重复:
            //1.加时间戳.time()加用户名.$uid或者加.date('YmdHis')
            //2.类似网盘，使用文件夹来防止重复
            $filename = "./images/".date('YmdHis').$arr["name"];
            //保存之前判断该文件是否存在
            if(file_exists($filename)){
                echo "该文件已存在";
            } else {
                //中文名的文件出现问题，所以需要转换编码格式
                $filename = iconv("UTF-8","gb2312",$filename);
                //移动临时文件到上传的文件存放的位置（核心代码）
                //括号里：1.临时文件的路径, 2.存放的路径
                move_uploaded_file($arr["tmp_name"],$filename);
            }
        }else{
            echo "上传的文件大小或类型不符";
        }
    }

    /*
     * 1.提取条数
     * 2.提取类型
     * 3.
     * */

}