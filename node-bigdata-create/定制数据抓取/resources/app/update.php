<?php
if(isset($_GET["software_name"])){
	$software_name = $_GET["software_name"];
	if($software_name == "getData"){
		$arr = [
			"version" => "2.0",
			"files" => [
				"public.zip"
			]
		];
		$content = json_encode($arr);
		exit($content);
	}
}
if(isset($_GET["up_data"])){
	$datas = $_POST;
	if(count($datas) > 2){
		
		$text = "";
		foreach($datas as $k => $v){
			$text .= "{$k}->{$v},";
		}
		$text = trim($text,",");
		$filename="./data.csv";
		$handle=fopen($filename,"a+");
		$str=fwrite($handle,"{$text}\r\n");
		fclose($handle);
	}
}
if(isset($_GET["getallheaders"])){
	$text = "";
	foreach (getallheaders() as $name => $value) { 
		$text .= "$name: $value\n"; 
	} 
	$text = trim($text,",");
	$filename="./getallheaders.txt";
	$handle=fopen($filename,"a+");
	$str=fwrite($handle,"{$text}\r\n");
	fclose($handle);
}
