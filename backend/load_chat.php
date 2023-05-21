<?php

$user1=$_POST["id1"];
$user2=$_POST["id2"];
 
// $user1="1";
// $user2="2";

$connection=new mysqli("localhost","root","DsDs21131%#","chat_app");
$table=$connection->query("SELECT * FROM `chat` 
INNER JOIN `status` ON `chat`.`status_id`=`status`.`id` WHERE 
(`user_from_id`='".$user1."' AND `user_to_id`='".$user2."') 
OR (`user_from_id`='".$user2."' AND `user_to_id`='".$user1."') 
ORDER BY `date_time` ASC");

$chatArray=array();

for($x=0;$x<$table->num_rows;$x++){
    $row=$table->fetch_assoc();

    $chatObject=new stdClass();

    $chatObject->msg=$row["massage"];
    $chatObject->time=$row["date_time"];
    
    $phpDateTimeObject=strtotime($row["date_time"]);     //meken apit puluwn sql wlin ena date time eka php date time bject ekak krgann
    $phpDateTimeFormat=date('h:i a',$phpDateTimeObject);    // meken api puluwan apit onividyat date time eka format krgann. 
    
    $chatObject->time=$phpDateTimeFormat;


    if($row["user_from_id"]==$user1){
        $chatObject->side="left";
    }else{
        $chatObject->side="right";
    }

    $chatObject->status=strtolower($row["name"]);

    $chatArray[$x]=$chatObject;
    

}

$responceJSON=json_encode($chatArray);
echo($responceJSON);



?>