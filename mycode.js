function Card(point, suit) {
  this.point = point;
  this.suit = suit;
}


Card.prototype.getImageUrl = function(){
  var name = '';
  if(this.point === 11) {
    name = 'jack';
  }
  else if (this.point === 12) {
    name = 'queen';
  }
  else if(this.point === 13) {
    name = 'king';
  }
  else if(this.point === 1) {
    name = 'ace';
  }
  else {name = (this.point);}
  return 'images/' + name + '_of_' + this.suit + '.png';
};


function Hand() {

  this.hand =[];
}
// var myCard = new Card(11, 'hearts');
// var myHand = new Hand();
Hand.prototype.addCard = function(card) {

  return this.hand.push(card);
};

// myHand.addCard(myCard);

Hand.prototype.calculatePoints = function () {
  return this.hand.reduce(function add(sum, card) {
    var point = card.point;
    if (point > 10) {
      point = 10;
    }
    var testSum = sum + point;
    if (point === 1 && testSum < 11) {
     point = 11;
    }
    return sum + point;
  }, 0);
};


function Deck(n) {
  this.deck = [];
  this.usedCards = [];
  for(var j = 0; j < n; j++ ) {
    for (var i = 1; i < 14; i++ ) {
      this.deck.push(new Card(i,'spades'));
      this.deck.push(new Card(i,'hearts'));
      this.deck.push(new Card(i,'diamonds'));
      this.deck.push(new Card(i,'clubs'));
    }
  }
}

Deck.prototype.drawCard = function() {
  var card = this.deck.pop();
  this.usedCards.push(card);
  return card;
};

Deck.prototype.shuffle = function() {
  var currentIndex = this.deck.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = this.deck[currentIndex];
    this.deck[currentIndex] = this.deck[randomIndex];
    this.deck[randomIndex] = temporaryValue;
  }

  return this.deck;
};

Deck.prototype.numCardsLeft = function() {
  return this.deck.length;
};

/////-------------------------------

var usedCards = [];
var myDeck = new Deck(6);
myDeck.shuffle();
playerHand = new Hand();
dealerHand = new Hand();

$(document).ready(function() {

  var dealerPoints = [];
  var playerPoints = [];
  var usedCards = [];

  $("#deal-button").click(function() {
    for(var i=1; i < 3; i++) {
      var card1 = myDeck.drawCard();
      var card2 = myDeck.drawCard();
      playerHand.addCard(card1);
      dealerHand.addCard(card2);
      $("#player-hand").append('<img class="card" src="' + card1.getImageUrl()+'">');
      $("#dealer-hand").append('<img class="card" src="' + card2.getImageUrl()+'">');


    }
  $('#dealer-points').text(dealerHand.calculatePoints());
  $('#player-points').text(playerHand.calculatePoints());


  });

//   function calculatePoints(cards) {
//   var sum2Cards = cards.map(function(card) {
//     if (card.point === 11 || card.point === 12 || card.point === 13) {
//       card.point = 10;
//     }
//     return card.point
//   }).reduce(function(a, b) {
//     return a + b;
//   });
//   return sum2Cards;
// }


  $("#hit-button").click(function() {
    var card1 = myDeck.drawCard();
    playerHand.addCard(card1);
    $("#player-hand").append('<img class="card" src="' + card1.getImageUrl()+'">');
      var currPlayerPoints = playerHand.calculatePoints();
      $('#player-points').text(currPlayerPoints);
      if (currPlayerPoints > 21) {
        $("#messages").text("YOU BUSTED!");
      }
  });

  $("#stand-button").click(function() {
    var card2 = myDeck.drawCard();

    var currDealerPoints = dealerHand.calculatePoints();
    var currPlayerPoints = playerHand.calculatePoints();
    while (currDealerPoints < 17) {
      dealerHand.addCard(card2);
      $("#dealer-hand").append('<img class="card" src="' + card2.getImageUrl()+'">');
      currDealerPoints += card2.point;
      $('#dealer-points').text(currDealerPoints);
      if ((currDealerPoints > currPlayerPoints) && (currDealerPoints <= 21)) {
        // console.log(currDealerPoints);
        // console.log(currPlayerPoints);
        $('#messages').text("Dealer Wins!");
      } else if ((currPlayerPoints > currDealerPoints) && (currPlayerPoints <= 21)) {
        $('#messages').text("You Win!");
      }
        else if(currDealerPoints > 21) {
          $('#messages').text("Dealer Busted!");
        }
    }
    if ((currPlayerPoints > currDealerPoints) && (currPlayerPoints <= 21)) {
      $('#messages').text("You Win!");
    }
    if ((currDealerPoints > currPlayerPoints) && (currDealerPoints <= 21)) {
      $('#messages').text("Dealer Wins!");
    }
    if(currDealerPoints === currPlayerPoints) {
    $('#messages').text("Push!");
    }
  });

  $("#reset-button").click(function() {
    $("#player-hand").empty();
    $("#dealer-hand").empty();
    $('#player-points').text("");
    $('#dealer-points').text("");
    $('#messages').text("");
    dealerHand = new Hand();
    playerHand = new Hand();

    });


});
