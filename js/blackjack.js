//clubs = treff; spades = pikk; diamonds = káró; hearts = kör
//jack; queen; king; ace



//the object for the datas of the cards
function card(code, name, suit, rank, value) { //suit = szín, rank = number/face, value = érték
	this.code = code;
	this.name = name;
	this.suit = suit;
	this.rank = rank;
	this.value = value;
	this.give_to_deck = function(deck_name) {
		deck_name.push({code: this.code, name: this.name, suit: this.suit, rank: this.rank, value: this.value});
	}
}



//list of the cards, wich are in the deck
var list_of_cards = ["clubs_2", "clubs_3", "clubs_4", "clubs_5", "clubs_6", "clubs_7", "clubs_8", "clubs_9", "clubs_10", "clubs_j", "clubs_q", "clubs_k", "clubs_a", "spades_2", "spades_3", "spades_4", "spades_5", "spades_6", "spades_7", "spades_8", "spades_9", "spades_10", "spades_j", "spades_q", "spades_k", "spades_a", "diamonds_2", "diamonds_3", "diamonds_4", "diamonds_5", "diamonds_6", "diamonds_7", "diamonds_8", "diamonds_9", "diamonds_10", "diamonds_j", "diamonds_q", "diamonds_k", "diamonds_a", "hearts_2", "hearts_3", "hearts_4", "hearts_5", "hearts_6", "hearts_7", "hearts_8", "hearts_9", "hearts_10", "hearts_j", "hearts_q", "hearts_k", "hearts_a"];



//the deck array and length (this is permanent, only current_deck can change)
var deck = [];
var deck_size;
//define current_deck and length
var current_deck = [];
var current_deck_size;



/*------------------------------------------------------------------------------------------------------------------------------*/
//fill out the deck array with datas of the cards (it could be done from database too)
function define_deck(number_of_decks) {
	//the functions to get the datas from the cards name
	//the name of cards
	function cards_name(cards_suit, cards_rank) {
		name = cards_rank + " of " + cards_suit;
		return name;
	}
	//the suit of cards
	function cards_suit(cards_code) {
		suit = cards_code.split("_")[0];
		suit = suit[0].toUpperCase() + suit.substr(1);
		return suit;
	}
	//the rank of cards
	function cards_rank(cards_code) {
		rank = cards_code.split("_")[1].toUpperCase();
		switch (rank) {
			case !isNaN: rank = rank;
			break;
			case 'J': rank = "Jack";
			break;
			case 'Q': rank = "Queen";
			break;
			case 'K': rank = "King";
			break;
			case 'A': rank = "Ace";
			break;
		}
		return rank;
	}
	//the value of cards
	function cards_value(cards_rank) {
		if (!isNaN(cards_rank)) {
			value = cards_rank;
		} else if (cards_rank === "Jack" || cards_rank === "Queen" || cards_rank === "King") {
			value = 10;
		} else if (cards_rank ==="Ace") {
			value = 11;
		}
		value = parseInt(value, 10);
		return value;
	}

	//how many cards do we have in a deck
	var decks_size = list_of_cards.length;

	//if the number of decks is not defined, or it is smaller than 1, then it will be 1, if it is bigger than 20, then it will be 20, otherwise it will be the given number
	if (number_of_decks > 20) {
		number_of_decks = 20;
	} else if (number_of_decks >= 1 && number_of_decks <= 20) {
		number_of_decks = number_of_decks
	} else {
		number_of_decks = 1;
	}

	//fill out the deck array
	for (i = 0; i < decks_size; i++) {
		code = list_of_cards[i];
		suit = cards_suit(list_of_cards[i]);
		rank = cards_rank(list_of_cards[i]);
		name = cards_name(suit, rank);
		value = cards_value(rank);
		list_of_cards[i] = new card(code, name, suit, rank, value);
		for (n = 0; n < number_of_decks; n++) {
			list_of_cards[i].give_to_deck(deck);
			list_of_cards[i].give_to_deck(current_deck);
		}

		// console.log(deck[i].name);
		// console.log(deck[i].suit);
		// console.log(deck[i].rank);
		// console.log(deck[i].value);
	}
}
/*------------------------------------------------------------------------------------------------------------------------------*/



//the object of the participant
function participant(name) {
	this.name = name;
	this.cards = []; //the hands of the participant and the dealer (in the beginning of the game there are empty)
	this.total = 0; //the total value of the hand in the beginning of the game is 0
	this.soft = false; //has the player soft hand (hand with ace)
	this.soft_total = 0; //the total value of the hand, if the player has a soft hand (in the beginning of the game is 0)
	this.aces = 0; //the number of aces, that the player has (in the beginning of the game is 0)
	this.blackjack = false; //has the player blackjack (in the beginning of the game false)
	this.give_to_players = function() {
		players.push(this.name);
	}
}


//all of the players
var players = [];
//some player:
var dealer;
var player1;



/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  eddig a vonalig minden bele lett építve a lets_play-be xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */



//is there a blackjack
var blackjack;
//is there a push
var push;
//is there a bust
var bust;
//the result (the game saves all of the result in this variable)
var result;



//visibility of the buttons
function visible(id, visibility) {
	$(id).css("visibility", visibility);
}



//show the card
function show_card(card, player) {
	//define the cards image
	var img = $("<img/>");
	img.attr("src", "img/cards/" + card.code + ".jpg")
	img.attr("title", card.name);
	img.attr("alt", card.name)
	//define where should it be inserted
	$("#" + player + " .cards").append(img);
}



//write out the total points
function show_points(player) {
	var points;
	//check maybe somebody has a blackjack
	check_blackjack(player);
	// if the player has no ace
	points = player.total;
	//if the player has ace(s)
	if (player.soft === true) {
		if (player.total > 21) {
			//if the player's points bigger than 21 and has soft hand
			points = player.soft_total;
		} else if (player.total < 21) {
			//if the player's points smaller than 21 and has soft hand
			points = player.total + " / " + player.soft_total;
		} else {
			if (player.blackjack === true) {
				//and has a blackjack
				points = player.total;
			} else {
				//and doesn't have a blackjack
				points = player.total + " / " + player.soft_total;
			}
		}
	}

	console.log(points);

	$("#" + player.name + " .total_points").html(points);
}



//makes all of the buttons invisible but the again button visible
function end() {
	console.log("player: " + player1.total);
	console.log("dealer: " + dealer.total);
	$("#result").html(result);
	visible("#hit, #double, #split, #stand", "hidden");
	visible("#again", "visible");
}



//draw a card
function draw_card(player) { //where to put the drawn card
	//choose a card for random from the current deck
	var chosen_card = Math.floor(Math.random() * current_deck_size);

	//add that card to the hand
	player.cards.push(current_deck[chosen_card]);

	//show the card on the table
	show_card(player.cards[player.cards.length - 1], player.name);

	//write out the card on the console
	console.log(player.name + ": " + current_deck[chosen_card].name);

	//remove that card from the current_deck and reduce the length of the current_deck
	current_deck.splice(chosen_card, 1);
	current_deck_size = current_deck.length;
}



//the value of the hand of a player
function hands_value(player) {
	player.total = 0;
	n = player.cards.length;
	for (i = 0; i < n; i++) {
		player.total += player.cards[i].value;
	}

	console.log("total: " + player.total);

	//the value of soft hand
	soft_value(player);

	//write out the total points
	show_points(player);
}



//is anybody has soft hand
function soft_hand(player) {
	n = player.cards.length;
	player.aces = 0;
	for (i = 0; i < n; i++) {
		if (player.cards[i].rank === "Ace") {
			player.soft = true;
			player.aces++;
		}
	}
}



//the value of the soft hand
function soft_value(player) {
	soft_hand(player);
	player.soft_total = 0;
	if (player.soft === true) {
		for (i = 0; i < n; i++) {
			if (player.cards[i].rank === "Ace") {
				//if the card is an ace
				player.cards[i].value = 1;
				player.soft_total += player.cards[i].value;
				player.cards[i].value = 11;
			} else {
				//if the card not an ace
				player.soft_total += player.cards[i].value;
			}
		}
		//if the player has more aces, but his soft_total is under 11 (so one ace can worth 11)
		if (player.aces > 1 && player.soft_total <= 11) {
			player.soft_total = player.soft_total + 10;
		}
	}
	console.log("soft: " + player.soft_total);
}



//is it a blackjack?
function check_blackjack(player) {
	n = player.cards.length;
	if (n === 2 && player.total === 21) {
		player.blackjack = true;
		blackjack = true;
	};
}



//is it a bust?
function check_bust(player) {
	if (player.total > 21) {
		soft_value(player);
		if (player.soft === true) {
			player.total = player.soft_total;
			if (player.total > 21) {
				bust = true;
			} else {
				bust = false;
			}
		} else {
			bust = true
		}
	}

	//hide/show the buttons
	if (bust === true) {
		result = "This is a bust! The " + player.name + " goes bust. The other player is the winner!";
		console.log("This is a bust!");
		console.log("Bust by " + player.name + ". The other player is the winner!");
		end();
	}
}



//is it a push
function check_push(player, bank) {
	if (player.total === bank.total) {
		push = true;
		result = "This is a push!";
		console.log("This is a push!");
	}

	//hide/show the buttons
	if (push === true) {
		end();
	}
}



//dont draw another card
function stand() {
	dealer_draws();

	//the winner is
	if (bust === false && push === false) {
		if (player1.total > dealer.total) {
			result = "The player wins!";
			console.log("The player wins!");
		} else {
			result = "The dealer wins!";
			console.log("The dealer wins!");
		};
	};
	//hide/show the buttons
	end();
}



//draw a card and calculate the with this draw modified total value of this hand
function hit(player) {
	draw_card(player);
	hands_value(player);
	check_bust(player);
	//switch double off
	visible("#double", "hidden");
}



//draw only one card, then comes the dealer, and see result
function double(player) {
	hit(player);
	if (bust === false) {
		stand();
	}
}



//when the player finished, then draw the dealer
function dealer_draws() {
	while (dealer.total < 17 || (dealer.soft_total > 0 && dealer.soft_total < 17 && dealer.total > 21)) {
		hit(dealer);
	}

	if (dealer.total <= 21) {
		check_push(player1, dealer);
	}
}



//start the game
function lets_play() {

	//define with how many decks do we play
	number_of_decks = 1;
	//fill in the cards in the deck and current_deck
	define_deck(number_of_decks);
	//and their length
	deck_size = deck.length;
	current_deck_size = current_deck.length;

	//define the dealer and the players
	dealer = new participant("dealer");
	player1 = new participant("player1");
	//give them to the players array
	dealer.give_to_players();
	player1.give_to_players();

	//gives the value of the variables
	blackjack = false;
	push = false;
	bust = false;

	//the deal
	for (i = 0; i < 2; i++) {
		draw_card(player1);
		draw_card(dealer);
	};
	
	//the total value of the hands
	hands_value(player1);
	hands_value(dealer);

	console.log("player: " + player1.total);
	console.log("dealer: " + dealer.total);

	//after checking blackjack
	if (dealer.blackjack === true && player1.blackjack === true) {
		push = true;
		result = "The dealer and also the player1 have blackjack! This is a push!";
		console.log("The dealer and the player1 also have blackjack! This is a push!");
	} else if (dealer.blackjack === true) {
		result = "This is a blackjack! The dealer wins!";
		console.log("This is a blackjack! The dealer wins!");
	} else if (player1.blackjack === true) {
		result = "This is a blackjack! The player1 wins!";
		console.log("This is a blackjack! The player1 wins!");
	} else {
		blackjack = false;
	}

	//hide/show the buttons
	if (blackjack === true) {
		end();
	} else if (blackjack === false) {
		visible("#hit, #double, #stand", "visible");
		//in some rules is it only possible to double down only by 9, 10, 11 total hand 
		// if (player1.total === 9 || player1.total === 10 || player1.total === 11) {
		// 	visible("#double", "visible");
		// }
	}
}



$(document).ready(function() {
	//hide/show the buttons
	visible("#player1 button", "hidden");
	visible("#start", "visible");
	$("#start").click(function() {
		//run the game
		lets_play();
		visible("#start", "hidden");
	});

	$("#hit").click(function() {
		hit(player1);
		console.log(player1.total);
	});

	$("#double").click(function() {
		double(player1);
		console.log(player1.total);
	});

	$("#split").click(function() {
		split(player1);
		console.log(player1.total);
	});

	$("#stand").click(function() {
		stand();
		console.log(dealer.total);
	});

	$("#again").click(function() {
		location.reload();
	});

})