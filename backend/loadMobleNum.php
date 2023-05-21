<?php

$connection=new mysqli("localhost","root","DsDs21131%#","chat_app");
$table = $connection->query("SELECT * FROM `mobile_num`");

$country_array= array();

for($x=0; $x<$table->num_rows; $x++){
    $row=$table->fetch_assoc();
    array_push($country_array,$row["number"]);

}
$json=json_encode($country_array);
echo($json);


?>