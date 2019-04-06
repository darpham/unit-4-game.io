// All the characters
characters = {
    link : {
        name : "Link",
        picture : "assets/images/link.png",
        dps : 30,
        hp : 200,
        selected : false,
    },
    falcon : {
        name : "Captain Falcon",
        picture : "assets/images/falcon.png",
        dps : 28,
        hp : 250,
        selected : false,
    },
    donkey : {
        name : "Donkey Kong",
        picture : "assets/images/donkey.png",
        dps : 25,
        hp : 300,
        selected : false,
    },
    zelda : {
        name : "Princess Zelda",
        picture : "assets/images/zelda.png",
        dps : 32,
        hp : 150,
        selected : false,
    },
}

intiateGame = {
    
    // Nested forEach functions to create divs with appropiate styling for each character
    resetCharacters : function() {
        Object.entries(characters).forEach(([key, value]) => {
            var fighterCard = $("<div>");
            fighterCard.addClass("fighter");
            Object.entries(value).forEach(([key, value]) => {
                fighterCard.attr(key, value);
                $("#topRow").append(fighterCard);
                switch (key) {
                    case "name":
                        fighterCard.text(value);
                        break;
                    case "picture":
                        fighterCard.append('<img id="fighterImage" src="' +value+ '" />');
                        break;
                };
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
        $(".fighter").on("click", function(){
            fs = this
            console.log(fs)
        })
    },
    win : function() {
        console.log("you win");
    },
    lose : function() {

    }
};

intiateGame.resetCharacters();

gameEvents.fighterSelect()