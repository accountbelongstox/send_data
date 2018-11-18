const
	file = `1-4.3W.csv`,
	fs = require(`fs`),
	path = require(`path`),
	excel_xlsx = require('excel-xlsx'),
	crypto = require('crypto'),
	iconv = require(`iconv-lite`),
	time_scope = [`2018-11-01 00:00:00`,`2018-11-04 23:20:00`],
	file_path = path.join(__dirname,file),
	file_path_parse = path.parse(file_path),
	new_file_path = path.join(__dirname,`${file_path_parse.name}`)
;
let
file_content_arr = csv_parse(file_path),
time_scopes = create_xls_times(file_content_arr,time_scope,true,false)
;
csv_execute(file_content_arr,1);

function csv_execute(file_content_arr,type){
	file_content_arr.forEach((concent_arr,index1)=>{
		let
			isExistsTime = false,
			c_time_2,
			file_content 
		;
		concent_arr.forEach((content_item,index2)=>{
			let
			c_time = time_scopes[index1]
			;
			if(isTime(content_item) !== null){
				isExistsTime = true;
				concent_arr[index2] = c_time;
			}
			c_time_2 = c_time;
		});
		if(!isExistsTime){
			concent_arr.push(c_time_2);
		}
		file_content_arr[index1]  = concent_arr; 
	});
	if(type === 1){
		save_to_xlsx(file_content_arr);
	}
}

function save_to_xlsx(arr){
	let
	header = [],
	header_title = ``,
	content = ``,
	listData = [],
	result = {}
	;
	arr.forEach((item,index)=>{
		if(index === 0){
			item.forEach((itemOne)=>{
				let
				md5_text = ``+RandomNumBoth(10,10000000000)+RandomNumBoth(1,998)+itemOne+timeFormat(false),
				md5_finish = create_md5(md5_text)
				;
				header.push({
					label:``,
					prop: md5_finish
				});
			});
		}


		let
		listObject = {}
		;
		item.forEach((itemOne,index2)=>{
			if(header && header[index2] && header[index2].prop){
				let
					prop = header[index2].prop
				;
				listObject[prop] = itemOne;
			}
		});
		listData.push(listObject);
	});
	result = {
		header,
		listData
	};
	excel_xlsx(header, listData, new_file_path); 
}



function create_md5(str){
	let
	md5 = crypto.createHash('md5')
	;
	str = md5.update(str).digest('hex'); 
	return str;
}

function array_to_csv_content(arr){
	let
	content = ``
	;
	arr.forEach((item,index)=>{
		arr[index] = item.join(`,`);
	});
	content = arr.join(`\r\n`);
	return content;
}

function create_xls_times(create_that,time_scope,time_fmt=false,_sort=true){
	let
		time_stamp_scopes = [],
		time_start = timeFormat(false,time_scope[0]),
		time_end = timeFormat(false,time_scope[1]),
		len = (function (){
			if(typeof create_that !== `number`){
				return create_that.length;
			}else{
				return create_that;
			}
		})()
	;
	for(let i = -1;i < len;i++){
		let
		time_random = RandomNumBoth(time_start,time_end)
		;
		time_stamp_scopes.push(time_random);
	}
	if(_sort)time_stamp_scopes.sort((x,y)=> y-x);
	if(time_fmt){
		time_stamp_scopes.forEach((item,index)=>{
			time_stamp_scopes[index] = timeFormat(null,item);
		});
	}
	return time_stamp_scopes;
}


function csv_parse(file_path,_sort){
	let
	file_content = fs.readFileSync(file_path,{encoding:"binary"}),
	file_content_arr = ( iconv.decode(file_content,"GBK") ).split(/[\r\n]+/),
	n_arr = []
	;
	file_content_arr.forEach((concent)=>{
		let
		concent_arr = table_parse (concent )
		;
		n_arr.push(concent_arr);
	});
	if(_sort)n_arr = _sort(n_arr);
	return n_arr;
}

function array_format_is_tables(arr){
	arr.forEach((items,index)=>{
		arr[index] = arr_to_table_string(items);
	});
	return arr;
}

function cell_check(str){
	let
	is_number = isNumber(str)
	;
	if(is_number !== null){
		return `="${is_number}"`;
	}else if(/^\d/.test(str)){
		return `="${str}"`;
	}else{
		return str;
	}
}

function arr_to_table_string(arr){
	arr.forEach((item,index)=>{
		arr[index] = cell_check(item);
	});
	return arr;
}

function isNumber(n){
    if( !(/^\d/.test(n))){
        return null;
    }
    n = new Number(n);
    n = parseInt(n);
    if(n === n){
        return n;
    }else{
        return null;
    }
}

function _sort(arr){
	return arr.sort(function(a,b){ 
		return Math.random()>.5 ? -1 : 1;
	});
}

function table_parse(table){
	let
	tables = table.split(/\,+/)
	;
	tables.forEach((item,index)=>{
		if(/^\=\"/.test(item)){
			tables[index] = item.replace(/^\=\"|\"$/ig,``);
		}
	});
	return tables;
}


function isTime(v){
	if(typeof v === "string"){
		v = [v];
	}
	let
	timeStampLenth = `1540228949`.length,
	isTime = null
	;
	v.forEach((item,index)=>{
		if(/^20\d{2}/.test(item) || (/^\d+$/.test(item) && item.length === timeStampLenth)){
			isTime = index;
		}
	});
	return isTime;
}

function RandomNumBoth(Min,Max){
    let
	    Range = Max - Min,
	    Rand = Math.random(),
	    num = Min + Math.round(Rand * Range)//四舍五入
    ; 
    return num;
}


function timeFormat(fmt,thisDate=new Date()){
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
		thisDate = thisDate.replace(/\//ig,`-`);
        thisDate = (function (){
            if(/^\s*\d+\s*$/.test(thisDate)){
                return new Date( thisDate * 1000);
            }else if(/^\d/.test(thisDate)){
                return new Date( thisDate );
            }else{
				let
				time = new Date(),
				currentMinutes = time.getMinutes() - 15
				;
				if(currentMinutes<0){
					currentMinutes = 60 + currentMinutes;
					let
					currentHours = time.getHours() - 1
					;
					time.setHours(currentHours);
				}
				time.setMinutes(currentMinutes);
				return time;
			}
        })();
    }else if(thisDataType === "number"){
        thisDate =  new Date(thisDate * 1000);
    }
    if(timestamp){
        fmt = thisDate.getTime()/1000;
    }else{
    	if(`getTime` in thisDate){
		    let 
			o = {
		        "M+": thisDate.getMonth() + 1, //月份
		        "d+": thisDate.getDate(), //日
		        "h+": thisDate.getHours(), //小时
		        "m+": thisDate.getMinutes(), //分
		        "s+": thisDate.getSeconds(), //秒
		        "q+": Math.floor((thisDate.getMonth() + 3) / 3), //季度
		        "S": thisDate.getMilliseconds() //毫秒
		    };
		    if (/(y+)/.test(fmt)){
		        fmt = fmt.replace(RegExp.$1, ( thisDate.getFullYear() + "" ).substr( 4 - RegExp.$1.length ));
		    }
		    for (let k in o){
		        if (new RegExp("(" + k + ")","i").test(fmt)){
		            fmt = fmt.replace(RegExp.$1, ( RegExp.$1.length === 1 ) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		        }
		    }
    	}else{
    		return null;
    	}
    }
    return fmt;
}
