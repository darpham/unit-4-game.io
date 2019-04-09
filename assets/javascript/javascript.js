// All the characters
characters = {
    "Link" : {
        name : "Link",
        picture : "assets/images/link.png",
        dps : 30,
        hp : 200,
        selected : false
    },
    "Captain Falcon" : {
        name : "Captain Falcon",
        picture : "assets/images/falcon.png",
        dps : 28,
        hp : 250,
        selected : false
    },
    "Donkey Kong" : {
        name : "Donkey Kong",
        picture : "assets/images/donkey.png",
        dps : 25,
        hp : 300,
        selected : false
    },
    "Princess Zelda" : {
        name : "Princess Zelda",
        picture : "assets/images/zelda.png",
        dps : 32,
        hp : 150,
        selected : false
    },
}

intiateGame = {
    // Nested forEach functions to create divs with appropiate styling for each character
    resetCharacters : function() {
        Object.entries(characters).forEach(([key, value]) => {
            var fighterCard = $("<div>");
            fighterCard.addClass("fighter availableFighters text-center");
            Object.entries(value).forEach(([key, value]) => {
                //Add attributes of each fighter their respective elements
                fighterCard.attr(key, value);
                //Function to add html elements to fighter div
                switch (key) {
                    case "name":
                        fighterCard.text(value);
                        break;
                    case "picture":
                        fighterCard.append('<img class="fighterImage" src="' +value+ '" />');
                        break;
                    case "hp":
                        fighterCard.append('<div class="figherHP">HP: ' +value+ '</div>')
                };
                $("#topRow").append(fighterCard);
            });
        }); 
    },

};

charactersMutation = {
    attack : function(){

    },
    lostHealth :  function() {

    },
};

gameEvents = {
    fighterSelect : function() {
        $(document).on('click', '.availableFighters', function(){
            // console.log(this)
            var thisFighter = $(this).attr('Name');
            characters[thisFighter].selected = true;
            console.log("Player Selected " + $(this).attr('Name'));
            gameEvents.moveOpponentsBottom($(this).attr('Name'));
            $("#selectFighter").hide();
            $(".availableFighters").removeClass("availableFighters").addClass("enemyFighters");
            $(this).removeClass("enemyFighters").addClass("yourFighter");
        });
    },
    moveOpponentsBottom :function(playerFighter) {
        Object.keys(characters).forEach(function (fighter) {
            if (fighter != playerFighter) {
                $("#botRow").append($("div[Name='" + fighter +"']"))
            }
        });
    },
    opponentSelect : function() {
        $("#selectEnemy").show();
        $(document).on('click', '.enemyFighers', function(){
            var thisOpponent = $(this).attr('Name');
            // console.log(this)
            // characters[thisOpponent]["enemy"] = true;
            console.log(characters);
        });
    },
    battle : function() {

    },
    win : function() {
        console.log("you win");
    },
    lose : function() {
        console.log("you lose");
    }
};

// Functions to initially start the game
intiateGame.resetCharacters();
gameEvents.fighterSelect();
gameEvents.opponentSelect();