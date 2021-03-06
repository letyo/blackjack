<!DOCTYPE html>
<html>
<head>
	<title>Win or loose, this is the best game!</title>
	<link rel="icon" type="image/png" href="img/favicon.png"/>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link type="text/css" rel="stylesheet" href="css/main.css"/>
	<script type="text/javascript" src="js/jQuery.js" defer></script>
	<script type="text/javascript" src="js/blackjack.js" defer></script>
	<script type="text/javascript" src="js/modals.js" defer></script>
</head>
<body>

<!-- xxxxxxxxxxxxxxxxxxxxxxxx the header xxxxxxxxxxxxxxxxxxxxxxxx -->

	<div id="header">
		<button id="new">New game</buttons>
		<button id="options_button" class="modal_button">Options</button>
		<button id="rules_button" class="modal_button">Rules</button>
	</div>

<!-- xxxxxxxxxxxxxxxxxxxxxxxx the modals xxxxxxxxxxxxxxxxxxxxxxxx -->

	<div id="options" class="modal">
			
		<div class="modal_content">

			<div class="modal_header">
				<!-- The Close Button -->
				<span id="options_close" class="close">&times;</span>
				<h1>Options</h1>
			</div>

			<div class="modal_body">
<?php
				include_once "blocks/options.php";
?>				
			</div>

		</div>
	</div>

	<div id="rules" class="modal">

		<div class="modal_content">

			<div class="modal_header">
				<!-- The Close Button -->
				<span id="rules_close" class="close">&times;</span>
				<h1>Rules</h1>
			</div>

			<div class="modal_body">
<?php
				include_once "blocks/rules.php";
?>				
			</div>

		</div>
	</div>

<!-- xxxxxxxxxxxxxxxxxxxxxxxx the playing field xxxxxxxxxxxxxxxxxxxxxxxx -->

	<div id="whole_table">
		<div id="dealer">
			<h2>Dealer</h2>
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
				<p>Result field</p>
			</div>
		</div>

		<div id="player1"> <!-- xxxxxxxxxxxxxxxxxxxxxxxx  ide player1-et írtam, mert az a neve a játékosnak (player.name) a js fájlban, de vhogy, főleg ha több játékos is lesz, meg kell oldani, h ne az szerepeljen itt. A SCSS fájlban is javítani kell akkor mert ott is player1-ként hivatkoztam rá.  xxxxxxxxxxxxxxxxxxxxxxxx -->
			<div id="players_field">
				<div class="total_points">

				</div>

				<div id="chips">
					<div class="get_bet_buttons">
						<button class="get_bet" value="1">1</button>
						<button class="get_bet" value="5">5</button>
						<button class="get_bet" value="10">10</button>
						<button class="get_bet" value="25">25</button>
						<button class="get_bet" value="50">50</button>
						<button class="get_bet" value="100">100</button>
						<button class="get_bet" value="200">200</button>
					</div>
					<input class="get_bet" type="text" name="get_bet" min="1" max="200" autocomplete="off" required size="5">
					<button type="submit" id="get_bet" class="get_bet">Bet!</button>
				</div>
				
				<div class="cards">

				</div>

				<div id="datas">
					<div id="money">

					</div>			
					<div id="bet">

					</div>
					<div id="prize">

					</div>
				</div>

				<div id="buttons">
					<button id="deal">Deal!</button>
					<button id="hit">Hit!</button>
					<button id="double">Double!</button>
					<button id="split">/*Split!*/</button>
					<button id="stand">Stand!</button>
				</div>
			</div>
			<h2>Player</h2>
		</div>
	</div>
	

</body>
</html>