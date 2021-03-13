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
            var fighterCard = $('<div>');
            fighterCard.addClass('fighter availableFighters text-center');
            Object.entries(value).forEach(([key, value]) => {
                //Add attributes of each fighter their respective elements
                fighterCard.attr(key, value);
                //Function to add html elements to fighter div
                switch (key) {
                    case 'name':
                        fighterCard.text(value);
                        break;
                    case 'picture':
                        fighterCard.append('<img class="fighterImage" src="' +value+ '" />');
                        break;
                    case 'hp':
                        fighterCard.append('<div class="fighterHP">HP: ' +value+ '</div>');
                };
                // Adds the character created to the top row
                $('#topRow').append(fighterCard);
            });
        }); 
    },
    // Resets the game if player wins/loses
    resetGame : function() {
        location.reload();
    },
};

characterMutation = {
    // Updates character div and text with new health
    loseHealth :  function(fighter, dmg) {
        var newHP = $(fighter).attr('hp') - dmg;
        $(fighter).attr('hp',newHP);
        $(fighter).find('.fighterHP').text("HP: " + newHP);
        gameEvents.checkGameState();
    },
};

gameEvents = {
    // Updates backend info for character player chooses and makes the rest enemies
    fighterSelect : function() {
        $('#selectFighter').removeClass('hidden');
        $(document).on('click', '.availableFighters', function(){
            // console.log(this)
            $('#selectFighter').addClass('hidden');
            var thisFighter = $(this).attr('Name');
            characters[thisFighter].selected = true;
            console.log("Player Selected " + $(this).attr('Name'));
            gameEvents.moveOpponentsBottom($(this).attr('Name'));
            $('.availableFighters').removeClass('availableFighters').addClass('enemyFighters');
            $(this).removeClass('enemyFighters').addClass('yourFighter');
            $('#selectEnemy').removeClass("hidden");
        });
    },
    // Move the player's opponents to the correct place (bottom row)
    moveOpponentsBottom :function(playerFighter) {
        Object.keys(characters).forEach(function (fighter) {
            if (fighter != playerFighter) {
                $('#botRow').append($("div[Name='" + fighter +"']"));
            };
        });
    },
    // Listener function for when player chooses the enemy
    opponentSelect : function() {
        $('#selectFighter').removeClass('hidden');
        $(document).on('click', '.enemyFighters', function(){
            if ( $('#opponentZone').contents().length == 0 ) {
                var thisOpponent = $(this).attr('Name');
                // console.log(this)
                characters[thisOpponent]['enemy'] = true;
                $('#opponentZone').append($("div[Name='" + thisOpponent +"']"));
                $('#selectEnemy').addClass("hidden");
                $('#fightButton').removeClass("hidden");
            } else {
                gameEvents.switchOpponent(this);
            }
        });
    },
    // listener function if player decides to choose a different opponent
    switchOpponent : function(switchEnemy) {
        $('#botRow').append($('#opponentZone').children());
        var switchEnemyName= $(switchEnemy).attr('Name');
        $('#opponentZone').append($("div[Name='" + switchEnemyName +"']"));
        console.log(switchEnemyName)
    },
    // Fight button
    fight : function() {
        $('#fightButton').on('click', function() {
            var yourFighter =  $('#topRow').find('.fighter');
            var enemyFighter = $('#opponentZone').find('.fighter');

            characterMutation.loseHealth(enemyFighter,gameEvents.calculateDamage(yourFighter));
            
            characterMutation.loseHealth(yourFighter,gameEvents.calculateDamage(enemyFighter));
        });
    },
    // function to calculate damage after player fights
    calculateDamage : function(fighter) {
        var dps = fighter.attr('dps');
        if ( $(fighter).hasClass('yourFighter') ) {
            var mulitplier = 5 + (.1 * Math.floor(Math.random() * Math.floor(10)));
            damage = Math.round(dps * mulitplier);
            console.log(damage);
            return damage
        } else {
            var mulitplier = 1.2 + (.1 * Math.floor(Math.random() * Math.floor(10)));
            damage = Math.round(dps * mulitplier);
            console.log(damage);
            return damage
        }
        
    },
    // checks the current game state (around the hp of the player's fighter and current enemy)
    checkGameState : function() {
        var yourFighter =  $('#topRow').find('.fighter');
        var enemyFighter = $('#opponentZone').find('.fighter');

        var yourFighterData = {
            name : yourFighter.attr('Name'),
            hp : yourFighter.attr('hp'),
        }
        var yourEnemyData = {
            name : enemyFighter.attr('Name'),
            hp : enemyFighter.attr('hp'),
        }

        // win and lose conditions are here; checks HPs and enemies left
        if ( enemyFighter.attr('hp') <= 0 && $('#botRow').contents().length == 0 ) {
            $('#opponentZone').empty();
            gameEvents.win();
        } else if ( enemyFighter.attr('hp') <= 0 ){
            $('#opponentZone').empty();
            $('#selectEnemy').removeClass("hidden");
            $('#fightButton').addClass("hidden");
            gameEvents.opponentSelect;
        } else if (yourFighter.attr('hp') <= 0){
            $('#topRow').empty();
            gameEvents.lose();
        }
    },
    // Win function
    win : function() {
        console.log("you win");
        $('#fightButton').addClass("hidden");
        $('#fightButton').addClass("hidden");
        $('#winplayAgain').removeClass("hidden");
        $('#winplayAgain').on('click', function() {
            intiateGame.resetGame();
        });
    },
    // Lose function
    lose : function() {
        console.log("you lose");
        $('#fightButton').addClass("hidden");
        $('#loseplayAgain').removeClass("hidden");
        $('#loseplayAgain').on('click', function() {
            intiateGame.resetGame();
        });
    }
};

// Functions to initially start the game
intiateGame.resetCharacters();
gameEvents.fighterSelect();
gameEvents.opponentSelect();
gameEvents.fight();