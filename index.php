<!DOCTYPE html>
<html>
<head>
	<title>Gábor Hetyey</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="Gábor Hetyey">
	<meta name="description" content="I'm Gábor Hetyey, and this is my portfolio website, which shows my limited knowledge of web programming.">
	<meta name="keywords" content="Gábor, Hetyey, protfolio, example, Beispiel, junior">
	<link type="text/css" rel="stylesheet" href="css/main.css"/>
	<script type="text/javascript" src="js/jQuery.js" defer></script>
	<script type="text/javascript" src="js/main.js" defer></script>
</head>
<body>

	<!--the languages selection-->
	<div class="header">

		<img src="img/flags/de.jpg" onclick="language('de', 'about', true)" title="Deutsch"/>
		<img src="img/flags/en.jpg" onclick="language('en', 'about', true)" title="English"/>
		<!--<img src="img/flags/hu.jpg" onclick="language('hu', 'about', true)" title="Magyar"/>-->

	</div>

	<!--the main content, if no language selected, German is the default-->
	<div class="main"> 

<?php
		if (isset($_GET['lang'])) {
			$_POST['language'] = $_GET['lang'];
		} else {
			$_POST['language'] = 'de';
		}
		include_once "includes/get_other_language.php";
?>

	</div>

</body>
</html>