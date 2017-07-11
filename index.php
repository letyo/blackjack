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
		<div id="money">

		</div>
		<div class="cards">

		</div>
		<div id="bet">

		</div>
		<div id="prize">

		</div>
		<div id="buttons">
			<div class="get_bet_buttons">
				<button class="get_bet" value="1">1</button>
				<button class="get_bet" value="5">5</button>
				<button class="get_bet" value="10">10</button>
				<button class="get_bet" value="25">25</button>
				<button class="get_bet" value="50">50</button>
				<button class="get_bet" value="100">100</button>
				<button class="get_bet" value="200">200</button>
			</div>
			<input class="get_bet" type="number" name="get_bet" min="1" max="200" autocomplete="off">
			<button id="get_bet" class="get_bet">Bet!</button>
			<button id="deal">Deal!</button>
			<button id="hit">Hit!</button>
			<button id="double">Double!</button>
			<button id="split">/*Split!*/</button>
			<button id="stand">Stand!</button>
		</div>
	</div>

	

</body>
</html>