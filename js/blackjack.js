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
//temporary parmeter to fill out the deck
var cards_in_deck = [];
//the deck array and length (this is permanent, only current_deck can change)
var deck = [];
var deck_size;
//define current_deck and length
var current_deck = [];
var current_deck_size;

//define with how many decks do we play
var number_of_decks;
//define the penetration (%) (when should we shuffle the deck again, after how many percent)
var part_of_decks;
//define the penetration (%) (when should we shuffle the deck again, after how many percent)
var dealer_stands



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

	//fill out the deck array
	for (i = 0; i < decks_size; i++) {
		code = list_of_cards[i];
		suit = cards_suit(list_of_cards[i]);
		rank = cards_rank(list_of_cards[i]);
		name = cards_name(suit, rank);
		value = cards_value(rank);
		cards_in_deck[i] = new card(code, name, suit, rank, value);
		for (n = 0; n < number_of_decks; n++) {
			cards_in_deck[i].give_to_deck(deck);
			cards_in_deck[i].give_to_deck(current_deck);
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
		//{name: this.name, cards: this.cards, total: this.total, soft: this.soft, soft_total: this.soft_total, aces: this.aces, blackjack: this.blackjack}
	}
}



//all of the players
var players = [];
//some player:
var dealer;
var player1;



//is there a blackjack
var blackjack;
//is there a push
var push;
//is there a bust
var bust;
//the result (the game saves all of the result in this variable)
var result;
//the winner of the game (can be push too)
var winner;
//money of the player
var money = 0;
//the bet
var bet = 0;
//how much the player won
var prize = 0;



//visibility of the buttons
function visible(id, visibility) {
	$(id).css("visibility", visibility);
}



//show the card
function show_card(card, player, black) {
	//define the cards image
	var img = $("<img/>");
	img.attr("src", "img/cards/" + card.code + ".jpg")
	img.attr("title", card.name);
	img.attr("alt", card.name)

	//define where should it be inserted, but if it is the second card of the dealer, then don't show it
	if (black === true) {
		$("#" + player + " .cards").append(img).children(":nth-child(2)").addClass("black_card");
	} else {
		$("#" + player + " .cards").append(img).children().addClass("show");
	}
}



//show dealers second card
function show_dealers_second() {
	$("#dealer .cards").children(":nth-child(2)").removeClass("black_card").addClass("show");
		show_points(dealer);
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

	//if the player is the dealer, then show only the value of the first card
	if (player.name === "dealer" && $("#" + player.name + " .cards").children(":nth-child(2)").attr("class") === "black_card") {
		points = player.cards[0].value;
	}

	console.log(points);

	$("#" + player.name + " .total_points").html("Points: " + points);
}



//show the money of the player
function show_money() {
	$("#money").html("Balance: " + money + " €");
}



//show the bet of the player
function show_bet() {
	$("#bet").html("Bet: " + bet + " €");
}



//show the prize if the players win
function show_prize() {
	$("#prize").html("Win: " + prize + " €");
}



//write out the result of the game
function show_result() {
	$("#result").html(result);
}



//makes all of the buttons invisible but the deal button visible
function end() {
	console.log("player: " + player1.total);
	console.log("dealer: " + dealer.total);
	//write out the result
	show_result();

console.log(winner);

	//change the player's money with the bet if he won
	pay_out();
	//change the visibility of the buttons
	var rate = (1 - (current_deck_size / deck_size)) * 100;
	if (part_of_decks > rate) {
		visible(".get_bet", "visible");
		$("input[name=get_bet]").focus();
	} else {
		visible("#deal", "hidden");
		alert("There is no enough card in the deck, it had to be shuffled again!");
		//start a new game with a shuffle
		lets_play();
	}
	if (money <= 0) {
		visible("#deal", "hidden");
		alert("You have to start a new game! You have no money left!");
		//start a new game with a shuffle
		lets_play();
	}
	visible("#hit, #double, #split, #stand, #deal", "hidden");
}



//the prize is for the winner
function pay_out() {

console.log(money);
console.log(bet);
console.log(prize);

	if (winner === "push") {
		prize = bet;
		money = money + prize;
	} else if (winner === "player1" || winner === "!dealer") {
		if (player1.blackjack === true) {
			prize = 2.5 * bet;
			money = money + prize;
		} else {
			prize = 2 * bet;
			money = money + prize;
		}
	}

console.log(money);
console.log(bet);
console.log(prize);

	//write out the prize
	show_prize();
	//show the bet and money and empty the bet, the prize
	show_bet();
	show_money();
}



//draw a card
function draw_card(player) { //in which hand put the drawn card
	//choose a card for random from the current deck
	var chosen_card = Math.floor(Math.random() * current_deck_size);

	//add that card to the hand
	player.cards.push(current_deck[chosen_card]);

	//show the card on the table but if it is the second card of the dealer, then don't show it
	if (player.name === "dealer" && player.cards.length === 2) {
		show_card(player.cards[player.cards.length - 1], player.name, true);
	} else {
		show_card(player.cards[player.cards.length - 1], player.name, false);
	}

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

	//hide/show the buttons, write out the result and prize
	if (bust === true) {
		result = "The " + player.name + " goes bust. The other player is the winner!";
		winner = "!" + player.name;
		console.log("This is a bust!");
		console.log("Bust by " + player.name + ". The other player is the winner!");
		//the dealer's 2nd card must be showed with the dealer's points
		show_dealers_second();
		show_points(dealer);

		end();
	}
}



//is it a push
function check_push(player, bank) {
	if (player.total === bank.total) {
		push = true;
		result = "This is a push!";
		winner = "push";
		console.log("This is a push!");
	}

	if (push === true) {
		end();
	}
}



//dont draw another card
function stand() {
	//the dealer's 2nd card must be showed with the dealer's points
	show_dealers_second();
	show_points(dealer);

	dealer_draws();

	//the winner is
	if (bust === false && push === false) {
		if (player1.total > dealer.total) {
			result = "The player wins!";
			winner = "player1";
			console.log("The player wins!");
		} else {
			result = "The dealer wins!";
			winner = "dealer";
			console.log("The dealer wins!");
		};
		//hide/show the buttons, write out the result and prize
		end();
	};
	
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
	//change the bet and with that the money too
	bet = 2 * bet;
	money = money - (bet / 2);
	if (money < 0) {
		//check the player's money
		alert("You don't have enough money to double! The system take your double as a hit!");
		bet = bet / 2;
		money = money + bet;
		show_bet();
		show_money();
		hit(player);
	} else {
		show_bet();
		show_money();
		//draw
		hit(player);
		if (bust === false) {
			stand();
		}
	}
}



//when the player finished, then draw the dealer
function dealer_draws() {
	while (dealer.total < dealer_stands || (dealer.soft_total > 0 && dealer.soft_total < dealer_stands && dealer.total > 21)) {
		hit(dealer);
	}

	if (dealer.total <= 21) {
		check_push(player1, dealer);
	}
}



//get the bet value, reduced the money with that, and make the deal button visible
function get_bet() {
	//empty the playing field, the result's field, the bet field and the prize field
	$(".cards, #result, .total_points, #bet, #prize").empty();
	//empty the variables
	result = "Result field";
	show_result();
	bet = 0;
	prize = 0;
	//gives the value of the variables of the beginning of the game
	blackjack = false;
	push = false;
	bust = false;

	dealer.soft = false;
	player1.soft = false;
	dealer.blackjack = false;
	player1.blackjack = false;

	//empty the hands of the players
	dealer.cards = [];
	player1.cards = [];

	//check the player's money
	if (money <= 0) {
		alert("You don't have any money! You have to start a new game!");
		lets_play();
	}

	//put in the bet
	bet = parseInt($("input[name=get_bet]").val());
	//if the bet has a bed value then modify it
	if (bet > 200) {
		bet = 200;
		if (bet > money) {
			bet = money;
		}
	} else if (bet <= 200 && bet >= 1) {
		bet = bet;
		if (bet > money) {
			bet = money;
		}
	} else {
		bet = 1;
	}

	//reduced the player money with the bet
	money = money - bet;

	//show the bet and the money
	show_bet();
	show_money();

	//make the deal button visible and the bet invisible
	visible("#deal", "visible");
	visible(".get_bet", "hidden");
}



//start the game without shuffle the deck
function deal() {
	//if there is a bug, and the player could get cards with no bet
	if (bet === 0) {
		alert("You're bet is 0! You have to put some money up! If you don't have any, then start a new game!");
		get_bet();
	} else {
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
			result = "All of the participants have blackjack! This is a push!";
			winner = "push";
			console.log("The dealer and the player1 also have blackjack! This is a push!");
		} else if (dealer.blackjack === true) {
			result = "This is a blackjack! The dealer wins!";
			winner = "dealer";
			console.log("This is a blackjack! The dealer wins!");
		} else if (player1.blackjack === true) {
			result = "This is a blackjack! The player1 wins!";
			winner = "player1";
			console.log("This is a blackjack! The player1 wins!");
		} else {
			blackjack = false;
		}

		//hide/show the buttons
		if (blackjack === true) {
			//the dealer's 2nd card must be showed with the dealer's points
			show_dealers_second();

			end();
		} else if (blackjack === false) {
			visible("#hit, #double, #stand", "visible");
			visible("#deal", "hidden");
			//in some rules is it only possible to double down only by 9, 10, 11 total hand 
			// if (player1.total === 9 || player1.total === 10 || player1.total === 11) {
			// 	visible("#double", "visible");
			// }
		}
	}
}



//save the preferences in the options menu
function save() {
	//get the preferences from options
	number_of_decks = $("input[name=number_of_decks]").val();
	part_of_decks = $("input[name=part_of_decks]").val();
	dealer_stands = $("select[name=dealer_stands]").val();
	
	//if the number of decks is not defined, or it is smaller than 1, then it will be 1, if it is bigger than 20, then it will be 20, otherwise it will be the given number
	if (number_of_decks > 20) {
		number_of_decks = 20;
	} else if (number_of_decks >= 1 && number_of_decks <= 20) {
		number_of_decks = number_of_decks
	} else {
		number_of_decks = 1;
	}

	//if the part of decks is not defined, or it is smaller than 0, then it will be 0, if it is bigger than 75, then it will be 75, otherwise it will be the given number
	if (part_of_decks > 75) {
		part_of_decks = 75;
	} else if (part_of_decks >= 0 && part_of_decks <= 75) {
		part_of_decks = part_of_decks
	} else {
		part_of_decks = 65;
	}

	//if dealer stands not defined then it should be 17
	if (dealer_stands === 17 || dealer_stands === 18) {
		dealer_stands = dealer_stands;
	} else {
		dealer_stands = 17;
	}

	//it should be all of the variables in integer type
	number_of_decks = parseInt(number_of_decks);
	part_of_decks = parseInt(part_of_decks);
	dealer_stands = parseInt(dealer_stands);
}



//start the game
function lets_play() {
	//empty the playing field, the result's field, the bet field and the prize field
	$(".cards, #result, .total_points, #bet, #prize").empty();
	//empty the variables
	result = "Result field";
	show_result();
	bet = 0;
	prize = 0;
	deck = [];
	current_deck = [];
	players = [];
	
	//gives the value of the variables of the beginning of the game
	blackjack = false;
	push = false;
	bust = false;

	save();

console.log(number_of_decks);
console.log(part_of_decks);
console.log(dealer_stands);

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

	//write out the money of the player
	show_money();

	//make the bet button visible
	visible("#player1 button", "hidden");
	visible(".get_bet", "visible");
	$("input[name=get_bet]").focus();
}



$(document).ready(function() {
	//hide/show the buttons
	visible("#player1 button, .get_bet", "hidden");
	
	$("#new, #save_and_play").click(function() {
		//by loading of the page the player's money is:
		money = 1000;
		//run a new game
		lets_play();
	});

	$("#get_bet").click(function() {
		get_bet();
	});

	$(".get_bet_buttons .get_bet").each(function() {
		//get the current button
		var $get_bet_button = $(this);
		//write the current button value in to the input field of the bet
		$get_bet_button.click(function() {
			var value = $get_bet_button.val();
			$("input[name=get_bet]").val(value);
		});
	});

	$("#deal").click(function() {
		//run the game
		deal();
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

})