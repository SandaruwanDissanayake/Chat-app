<?php




$mobile=$_POST["mobile"];
$name=$_POST["name"];
$password=$_POST["password"];
$veryfyPassword=$_POST["veryfyPassword"];
$country=$_POST["country"];
$profile_pic_upload=$_FILES["profile_pic"]["tmp_name"];
$coverPhoto=$_FILES["coverPhoto"]["tmp_name"];



$phpResponseObject=new stdClass();



if(empty($mobile)){
    echo("1");
    // $phpResponseObject->msg="1";

}else if (empty($name)){
echo("2");
// $phpResponseObject->msg="2";

}else if (empty($password)){
    echo("3");
    // $phpResponseObject->msg="3";

}else if (empty($veryfyPassword)){
    echo("4");
    // $phpResponseObject->msg="4";

}else if (empty($profile_pic_upload)){
    echo("5");
    // $phpResponseObject->msg="5";

}else if($password!=$veryfyPassword){
     echo("6"); 
    // $phpResponseObject->msg="6";

}else{

  
    $connection = new mysqli("localhost", "root", "DsDs21131%#", "chat_app");


    $table=$connection->query("SELECT `id` FROM `country` WHERE `name`='".$country."' ");
    $row=$table->fetch_assoc();
    $country_id=$row["id"];
    
    
    $connection->query("INSERT INTO `user` (`mobile`,`name`,`password`,`profile_url`,`country_id`,`cover_Pic_url`)
    VALUES ('".$mobile."','".$name."','".$password."','"."upload/".$mobile.".jpeg"."','".$country_id."','"."coverPhoto/".$mobile.".jpeg"."')");
    
    move_uploaded_file($profile_pic_upload,"upload/".$mobile.".jpeg");
    move_uploaded_file($coverPhoto,"coverPhoto/".$mobile.".jpeg");

    
    // echo("uploaded");

    $table2=$connection->query("SELECT * FROM `user` WHERE `mobile`='".$mobile."' AND `password`='".$password."'");
    
    if($table->num_rows==0){
        $phpResponseObject->msg="Error";
    }else{
        $phpResponseObject->msg="Success";
   

        $row=$table2->fetch_assoc();
        $phpResponseObject->user=$row;

    }
    $jsonResponsetext=json_encode($phpResponseObject);
    echo($jsonResponsetext);

}



?>