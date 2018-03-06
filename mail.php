<?php

//Тут мы перечисляем нужные нам поля(значения атрибута name в форме)
$name = $_POST["name"];
$phone = $_POST["phone"];
$search = $_POST["search"];
$referrer = $_POST["referrer"];

//Указываем на какой E-mail отправлять форму
$to = "argeares97@gmail.com";

//Заголовок письма с датой
$titleMail = 'Заявка с сайта "АР"';

//HTML-код письма
$message = '
	<table cellspacing="0" style="font-family: arial ; color: #000;">
		<tr style="border: 1px solid black;">
			<td style="padding: 7px 30px; font-weight: bold; font-size: 14px; border: #e9e9e9 1px solid;">Имя:</td>
			<td style="padding: 7px 30px; font-size: 14px; border: #e9e9e9 1px solid;">'.$name.'</td>
		</tr>
		<tr style="border: 1px solid black;">
			<td style="padding: 7px 30px; font-weight: bold; font-size: 14px; border: #e9e9e9 1px solid;">Телефон:</td>
			<td style="padding: 7px 30px; font-size: 14px; border: #e9e9e9 1px solid;">'.$phone.'</td>
		</tr>
		<tr style="border: 1px solid black;">
			<td style="padding: 7px 30px; font-weight: bold; font-size: 14px; border: #e9e9e9 1px solid;">Ключевое слово поисковика:</td>
			<td style="padding: 7px 30px; font-size: 14px; border: #e9e9e9 1px solid;">'.$search.'</td>
		</tr>
		<tr style="border: 1px solid black;">
			<td style="padding: 7px 30px; font-weight: bold; font-size: 14px; border: #e9e9e9 1px solid;">URL с которого перешел:</td>
			<td style="padding: 7px 30px; font-size: 14px; border: #e9e9e9 1px solid;">'.$referrer.'</td>
		</tr>
	</table>
';

//Отправка
mail($to, $titleMail, $message, "MIME-Version: 1.0\nContent-type: text/html; charset=utf-8\n");