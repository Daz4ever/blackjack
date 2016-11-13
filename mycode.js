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
  var total = 0,
     aces = 0;
 for (var i = 0; i < this.hand.length; i++) {
   var point = this.hand[i].point;
   if (point === 1) {
     total += 10;
     aces++;
   }
   else if (point > 10) {
     point = 10;
   }
   total += point;
   while (total > 21 && aces > 0) {
     total -= 10;
     aces--;
   }
 }
 return total;

};


function Deck(n) {
  this.deck = [];
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
  return this.deck.pop();
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

var myDeck = new Deck(6);
myDeck.shuffle();
playerHand = new Hand();
dealerHand = new Hand();

$(document).ready(function() {
  $('#hit-button').attr("disabled", true);
  $("#stand-button").attr("disabled", true);
  var dealerPoints = [];
  var playerPoints = [];

  $("#deal-button").click(function() {
      $(this).attr("disabled", true);
      $("#stand-button").attr("disabled", false);
      $('#hit-button').attr("disabled", false);
      var card1 = myDeck.drawCard();
      var card2 = myDeck.drawCard();
      playerHand.addCard(card1);
      dealerHand.addCard(card2);
      $("#player-hand").append('<img class="card" src="' + card1.getImageUrl()+'">');
      $("#dealer-hand").append('<img class="card hiddencard" src="images/cardback.jpg">');

       card1 = myDeck.drawCard();
       card2 = myDeck.drawCard();
      playerHand.addCard(card1);
      dealerHand.addCard(card2);
      $("#player-hand").append('<img class="card" src="' + card1.getImageUrl()+'">');
      $("#dealer-hand").append('<img class="card" src="' + card2.getImageUrl()+'">');

      $('#player-points').text(playerHand.calculatePoints());
      currPlayerPoints = playerHand.calculatePoints();
      currDealerPoints = dealerHand.calculatePoints();
      if(currPlayerPoints === 21) {
        $(".hiddencard").attr("src", dealerHand.hand[0].getImageUrl());
        $('#dealer-points').text(currDealerPoints);
        if (currPlayerPoints > currDealerPoints) {
          $('#messages').text("$ Blackjack, You Win! $").css("color", "gold");
        }
        else if(currDealerPoints === currPlayerPoints) {
        $('#messages').text("Push!").css('color', 'white');
        }
      }



  });


  $("#hit-button").click(function() {
    var card1 = myDeck.drawCard();
    playerHand.addCard(card1);
    $("#player-hand").append('<img class="card" src="' + card1.getImageUrl()+'">');
      var currPlayerPoints = playerHand.calculatePoints();
      var currDealerPoints = dealerHand.calculatePoints();
      $('#player-points').text(currPlayerPoints);
      if (currPlayerPoints > 21) {
        $("#messages").text("YOU BUSTED!");
      }
      if(currPlayerPoints === 21) {
        console.log("hello");
        $(".hiddencard").attr("src", dealerHand.hand[0].getImageUrl());
        $('#dealer-points').text(currDealerPoints);
        if (currPlayerPoints > currDealerPoints) {
          $('#messages').text("21, You Win!").css('color', 'white');
        }
        else if(currDealerPoints === currPlayerPoints) {
        $('#messages').text("Push!").css('color', 'white');
        }
      }



  });

  $("#stand-button").click(function() {
    $(this).attr("disabled", true);
    $('#hit-button').attr("disabled", true);
    $(".hiddencard").attr("src", dealerHand.hand[0].getImageUrl());


    var currDealerPoints = dealerHand.calculatePoints();
    var currPlayerPoints = playerHand.calculatePoints();
    while (currDealerPoints < 17) {
      var card2 = myDeck.drawCard();
      dealerHand.addCard(card2);
      $("#dealer-hand").append('<img class="card" src="' + card2.getImageUrl()+'">');
      currDealerPoints += card2.point;
      $('#dealer-points').text(currDealerPoints);
      if ((currDealerPoints > currPlayerPoints) && (currDealerPoints <= 21)) {
        // console.log(currDealerPoints);
        // console.log(currPlayerPoints);
        $('#messages').text("Dealer Wins!").css('color', 'white');
      } else if ((currPlayerPoints > currDealerPoints) && (currPlayerPoints <= 21)) {
        $('#messages').text("You Win!").css('color', 'white');
      }
        else if(currDealerPoints > 21) {
          $('#messages').text("Dealer Busted!").css('color', 'white');
        }
    }
    $('#dealer-points').text(currDealerPoints);
    if ((currPlayerPoints > currDealerPoints) && (currPlayerPoints <= 21)) {
      $('#messages').text("You Win!").css('color', 'white');
    }
    if ((currDealerPoints > currPlayerPoints) && (currDealerPoints <= 21)) {
      $('#messages').text("Dealer Wins!").css('color', 'white');
    }
    if(currDealerPoints === currPlayerPoints) {
    $('#messages').text("Push!").css('color', 'white');
    }
  });

  $("#reset-button").click(function() {
    $("#deal-button").attr("disabled", false);
    $("#stand-button").attr("disabled", true);
    $('#hit-button').attr("disabled", true);
    $("#player-hand").empty();
    $("#dealer-hand").empty();
    $('#player-points').text("");
    $('#dealer-points').text("");
    $('#messages').text("");
    dealerHand = new Hand();
    playerHand = new Hand();

    });


});
