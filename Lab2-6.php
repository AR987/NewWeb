<html lang="ru">
<head>
<meta charset="utf-8" />
<script src="jquery-3.6.0.min.js"></script> 
</head>
<body>
<p>Выберите понравившийся вам цвет</p>
<script src="Lab2-6.js"></script>
<form action="save_vote.php" metod="get">
<?php
	$link = mysqli_connect("127.0.0.1", "f0521577_vt", "vt123", "f0521577_vt");
	mysqli_query($link, 'SET NAMES utf-8');
	if (!$link) {
		echo "Ошибка: Невозможно установить соединение с MySQL." . PHP_EOL;
		echo "Код ошибки errno: " . mysqli_connect_errno() . PHP_EOL;
		echo "Текст ошибки error: " . mysqli_connect_error() . PHP_EOL;
		exit;
		}
	mysqli_select_db($link, "f0521577_vt");
?>
<p><input type="radio" id="red" value="red" name="vote" checked>Красный</input></p>
<p><input type="radio" id="blue" value="blue" name="vote">Синий</input></p>
<p><input type="radio" id="green" value="green" name="vote">Зеленый</input></p>
<p><input type="radio" id="yellow" value="yellow" name="vote">Желтый</input></p>
<p><input type="radio" id="nonee" value="nonee" name="vote">Нету</input></p>
<button type="submit" id="send">Отправить</button>
</form>

<footer id="index-footer">
<div>
	<button id="stats">Показать статистику</button>
	<script>
	$("#stats").click(function(){ 
	$("#count").css("visibility", "visible"); 
	}) 
</script>
</div>
<div id="count" style="visibility:hidden">
<?php
	$red=mysqli_query($link,"SELECT vote FROM `votg` WHERE vote='red' ");
	$blue=mysqli_query($link,"SELECT vote FROM `votg` WHERE vote='blue' ");
	$green=mysqli_query($link,"SELECT vote FROM `votg` WHERE vote='green' ");
	$yellow=mysqli_query($link,"SELECT vote FROM `votg` WHERE vote='yellow' ");
	$nonee=mysqli_query($link,"SELECT vote FROM `votg` WHERE vote='nonee' ");
	$all=mysqli_query($link,"SELECT * FROM votg ");
	$data1=mysqli_num_rows($red);
	$data2=mysqli_num_rows($yellow);
	$data3=mysqli_num_rows($green);
	$data4=mysqli_num_rows($yellow);
	$data5=mysqli_num_rows($nonee);
	$data6=mysqli_num_rows($all);
						
	print "Красный: " .$data1 . " (" . round ($data1/$data6*100, 2) ."%)";
	echo "<br />";	
	print "Синий: " .$data2. " (" . round ($data2/$data6*100, 2) ."%)";
	echo "<br />";				
	print "Зеленый: " .$data3. " (" . round ($data3/$data6*100, 2) ."%)";
	echo "<br />";			
	print "Желтый: " .$data4. " (" . round($data4/$data6*100, 2) ."%)";
	echo "<br />";			
	print "Нету: " .$data5. " (" . round($data5/$data6*100, 2) ."%)";
	echo "<br />";
	print "Всего ответов: " .$data6;
	echo "<br />";
?>
</footer>
</body>

</html>