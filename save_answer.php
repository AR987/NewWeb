<html>
<head>
<meta charset = "utf-8">
</head>
<body>
<?php
$link = mysqli_connect("127.0.0.1", "f0521577_vt", "vt123", "f0521577_vt");
 mysqli_query($link, 'SET NAMES utf-8');
 if (!$link) {
    echo "Ошибка: Невозможно установить соединение с MySQL." . PHP_EOL;
    echo "Код ошибки errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Текст ошибки error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
 // подключение к базе данных:
 mysqli_select_db($link, "f0521577_vt");
 // Строка запроса на добавление записи в таблицу:
 $sql_add = "INSERT INTO answers (answer) VALUES ('".$_GET['answer']."')";
 mysqli_query($link, $sql_add); // Выполнение запроса

 if (mysqli_affected_rows($link)>0) // если нет ошибок при выполнении запроса
 { print "<p>Спасибо за ответ.";}
 else { print "Что-то пошло не так!"; }
 
 /*
  *  $sql_count_cool = "COUNT answer FROM answers as 'cool' WHERE answer='cool' ";
 $sql_count_good = "COUNT answer FROM answers as 'good' WHERE answer='good' ";
 $sql_count_fixme = "COUNT answer FROM answers as 'fixme' WHERE answer='fixme' ";
 $sql_count_bad = "COUNT answer FROM answers as 'bad' WHERE answer='bad' ";
 $sql_count_worst = "COUNT answer FROM answers as 'worst' WHERE answer='worst' ";
 $sql_count_all = "COUNT * FROM answers as 'all'";
  * 
  * 
  *  mysqli_query($link, $sql_count_cool);
 mysqli_query($link, $sql_count_good);
 mysqli_query($link, $sql_count_fixme);
 mysqli_query($link, $sql_count_bad);
 mysqli_query($link, $sql_count_worst);
  * 
  * $cool = mysqli_query($link, $sql_count_cool); // Выполнение запроса
 $good = mysqli_query($link, $sql_count_good); // Выполнение запроса
 $fixme mysqli_query($link, $sql_count_fixme); // Выполнение запроса
 $bad = mysqli_query($link, $sql_count_bad); // Выполнение запроса
 $worst = mysqli_query($link, $sql_count_worst); // Выполнение запроса
 $all = mysqli_query($link, $sql_all); // Выполнение запроса
  *  print ($cool . " " . $good . " " . $fixme . " " . $bad . " " $worst );
  * */

?>
</body>
</html>

