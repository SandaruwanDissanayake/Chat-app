<?php

$user_Id=$_POST["user_Id"];

$userObj=$_POST=$_POST["userJSONText"];
$userPHPObject = json_decode($userObj);


$connection = new mysqli("localhost", "root", "DsDs21131%#", "chat_app");
$table=$connection->query("UPDATE `chat` SET `status_id`='2' WHERE `user_from_id`='".$user_Id."' AND `user_to_id`='".$userPHPObject->id."' ");




?>