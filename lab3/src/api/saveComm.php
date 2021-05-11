<?ob_end_clean();?>
<?include "connect.php";?>
<?
header('content-type: application/json;charset=utf-8');
$inputJsonData = file_get_contents("php://input");
$inputJson = json_decode($inputJsonData);
$title = $inputJson->title;
$mail = $inputJson->mail;
$value = $inputJson->value;
$mysqli = new mysqli($host, $user, $password, $database);
$query = "INSERT INTO $database.$queryTab1 (id, title, mail, value) VALUES (NULL, '$title', '$mail', '$value')";
$mysqli->query($query);
$mysqli->close();
?>