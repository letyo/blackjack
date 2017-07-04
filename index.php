<!DOCTYPE html>
<html>
<head>
	<title>Win or loose, this is the best game!</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link type="text/css" rel="stylesheet" href="css/main.css"/>
	<script type="text/javascript" src="js/jQuery.js" defer></script>
	<script type="text/javascript" src="js/blackjack.js" defer></script>
</head>
<body>

	<div id="header">
		<button id="new">New game</buttons>
		<button id="options">Options</button>
		<button id="rules">Rules</button>
	
		<!-- the modals -->
		<div id="rules_content">
			<!-- <h1>The rules of the life...uhmm..sorry...I wanna say blackjack</h1> -->
		</div>
	</div>

	<div id="dealer">
		<div class="total_points">

		</div>
		<div class="cards">

		</div>
	</div>

	<div id="table">
		<div id="table_text">
			<h1>Blackjack pays 3 to 2</h1>
		</div>
		<div id="result">

		</div>
	</div>

	<div id="player1"> <!-- xxxxxxxxxxxxxxxxxxxxxxxx  ide player1-et írtam, mert az a neve a játékosnak (player.name) a js fájlban, de vhogy, főleg ha több játékos is lesz, meg kell oldani, h ne az szerepeljen itt.  xxxxxxxxxxxxxxxxxxxxxxxx -->
		<div class="total_points">

		</div>
		<div class="cards">

		</div>
		<div id="buttons">
			<button id="start">Let's play!</button>
			<button id="hit">Hit!</button>
			<button id="double">Double!</button>
			<button id="split">/*Split!*/</button>
			<button id="stand">Stand!</button>
			<button id="again">Play again</button>
		</div>
	</div>

	

</body>
</html>