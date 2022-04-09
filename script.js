const BASE_URL = 'https://superheroapi.com/api.php/';
const API_KEY = '657210855340966';

var cards = [12, 33, 44];
var cardsSelected = 12;

window.onload = function() {
    this.getAndShowHero(getRandom());
}

function getRandom() {
    return Math.floor(Math.random() * 731) + 1;
}

function getAndShowHero(id) {
    let heroOne;
    let heroTwo;

    for (let i = 0; i < 2; i++) {
        let url = BASE_URL + "/" + API_KEY + "/" + getRandom();;

        callAPI(url, function(status, data) {
            
            let name = data.name;
            let intelligence = isNaN(data.powerstats.intelligence) ? 1 : parseInt(data.powerstats.intelligence);
            let strength = isNaN(data.powerstats.strength) ? 1 : parseInt(data.powerstats.strength);
            let speed = isNaN(data.powerstats.speed) ? 1 : parseInt(data.powerstats.speed);
            let durability = isNaN(data.powerstats.durability) ? 1 : parseInt(data.powerstats.durability);
            let power = isNaN(data.powerstats.power) ? 1 : parseInt(data.powerstats.power);
            let combat = isNaN(data.powerstats.combat) ? 1 : parseInt(data.powerstats.combat);
            let image = data.image.url;

            document.querySelector(`#hero-${i + 1}`).innerHTML += `<article> <img src= "${image}"/><h1>${name}</h1>
            <p>Intelligence: <span style='width: ${intelligence}%; background-color: #22A7F0'></span></p> 
            <p>Strength: <span style='width: ${strength}%; background-color: #555555'></span></p>
            <p>Speed: <span style='width: ${speed}%; background-color: #F9B32F'></span></p>
            <p>Durability: <span style='width: ${durability}%; background-color: #3EDC81'></span></p>
            <p>Power: <span style='width: ${power}%; background-color: #fd00fd'></span></p>
            <p>Combat: <span style='width: ${combat}%; background-color: #55b607'></span></p>
            </article>`

            let calculate = intelligence + strength + speed + durability + power + combat;

            if (i === 0) {
                heroOne = {name, calculate};
            } else {
                heroTwo = {name, calculate};
            }

            if(heroOne && heroTwo){
                if(heroOne.calculate > heroTwo.calculate) {
                    document.querySelector('#winner').innerHTML = `The winner is: ${heroOne.name}!`
                } else {
                    document.querySelector('#winner').innerHTML = `The winner is: ${heroTwo.name}!`
                }
            }

        });

    }
}

let refresh = document.querySelector('#refresh');

refresh.addEventListener("click", function() {
    location.reload();
});

function callAPI(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if(status === 200) {
            callback(status, xhr.response);
        } else {
            alert("Problems connecting to the server!")
        }
    }
    xhr.send();
}