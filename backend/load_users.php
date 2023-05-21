<?php


$userJSONText = $_POST["userJSONText"];

if($userJSONText=="null"){
    echo("Error");
}else{
$userPHPObject = json_decode($userJSONText);



// echo($userPHPObject->name);
// $text=$_POST["text"];

// echo($text);


  $connection = new mysqli("localhost", "root", "DsDs21131%#", "chat_app");
// $table = $connection->query("SELECT * FROM `user` WHERE `id` !='".$userJSONText->id."'");
$table = $connection->query("SELECT * FROM `user` 
WHERE `id` !='".$userPHPObject->id."' 
AND `name` LIKE '".$_POST["text"]."%'");


$phpResponseArray = array();

for ($x = 0; $x < $table->num_rows; $x++) {

    $phpArrayItemObject = new stdClass();

    $user = $table->fetch_assoc();

    $phpArrayItemObject->pic = $user["profile_url"];
    $phpArrayItemObject->name = $user["name"];
    $phpArrayItemObject->mobile = $user["mobile"];
    $phpArrayItemObject->cover=$user["cover_Pic_url"];


    $phpArrayItemObject->id=$user["id"];

    $table2 = $connection->query("SELECT * FROM `chat` WHERE user_from_id='".$userPHPObject->id."' AND user_to_id='".$user["id"]."' 
    OR `user_from_id`='".$user["id"]."'  AND user_to_id='".$userPHPObject->id."' 
    ORDER BY `date_time` DESC");


    if ($table2->num_rows == 0) {
        $phpArrayItemObject->msg = "";
        $phpArrayItemObject->time = "";
        $phpArrayItemObject->count = "0";
    } else {

        $unseenChatCount = 0;

        $lastChatRow = $table2->fetch_assoc();

        $table3 = $connection->query("SELECT * FROM `chat` WHERE user_from_id='".$user["id"]."' AND user_to_id='".$userPHPObject->id."'");
       
        if($table3->num_rows !=0){
            $tabel3_row=$table3->fetch_assoc();
            if($tabel3_row["status_id"]==1){
                 $unseenChatCount++;
    
            }
        }
       
       





        // if ($lastChatRow["status_id"] == 1) {
            
            
        //     $unseenChatCount++;

        // }

 
        $phpArrayItemObject->msg = $lastChatRow["massage"];
        $phpDateTimeObject = strtotime($lastChatRow["date_time"]);
        $timeStr = date('h:i a', $phpDateTimeObject);
        $phpArrayItemObject->time = $timeStr;


        for($i=1;$i<$table3->num_rows;$i++){
            //other rows
            $newChatRow=$table3->fetch_assoc();
            if($newChatRow["status_id"] == 1){
                $unseenChatCount++;
            }
        }

        $phpArrayItemObject->count = $unseenChatCount;
    }

    array_push($phpResponseArray,$phpArrayItemObject);
}
$jsonResponseText=json_encode($phpResponseArray);
echo($jsonResponseText);
}










































// $userJSONText = $_POST["userJSONText"];
// $userPHPObject = json_decode($userJSONText);

// $connection = new mysqli("localhost", "root", "DsDs21131%#", "chat_app");
// $table = $connection->query("SELECT * FROM `user` WHERE `id`!='1'");


// $phResponseArray = array();

// for ($x = 0; $x < $table->num_rows; $x++) {

//     $phpArrayItemObject = new stdClass();

//     $user = $table->fetch_assoc();

//     $phpArrayItemObject->pic = $user["profile_url"];
//     $phpArrayItemObject->name = $user["name"];

//     $table2 = $connection->query("SELECT * FROM `chat` WHERE 
//     `user_from_id`='1' AND `user_to_id`='2'
//     OR `user_to_id`='1' AND `user_from_id`='1'
//     ORDER BY `date_time` DESC");

//     if ($table2->num_rows == 0) {
//         $phpArrayItemObject->msg = "";
//         $phpArrayItemObject->time = "";
//         $phpArrayItemObject->count = "0";
//     } else {

//         //unseen chat count
//         $unseenChatCount = 0;

//         //frist row
//         $lastChatRow = $table2->fetch_assoc();
//         if ($lastChatRow["status_id"] == 1) {
//             $unseenChatCount++;
//         }

//         $lastChatRow = $table2->fetch_assoc();

//         $phpArrayItemObject->msg = $lastChatRow["massage"];

//         $phpDateTimeObject = strtotime($lastChatRow["date_time"]);
//         $timeStr = date('h:i:a', $phpDateTimeObject);

//         $phpArrayItemObject->time = $timeStr;

//         for($i=0;$i<$table2->num_rows;$i++){
//             //other rows
//             $newChatRow=$table2->fetch_assoc();
//             if($newChatRow["status_id"==1]){
//                 $unseenChatCount++;
//             }
//         }

//         $phpArrayItemObject->count = $unseenChatCount;
//     }
//     array_push($phResponseArray,$phpArrayItemObject);
// }

// $jsonResponseText=json_encode($phResponseArray);
// echo($jsonResponseText);
