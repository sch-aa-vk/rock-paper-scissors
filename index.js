// import {ClassicGameFactory} from './Factories/ClassicGameFactory'

const availableFigures = ["Rock", "Paper", "Scissors", "Well", "Spock", "Lizard"];

function play(){
    let gameType = document.getElementById('gameType');
    let figureFactory

    switch(gameType.value){
        case 'Classic':
            figureFactory = new ClassicGameFactory()
            break
        case 'BBT':
            figureFactory = new BBT_GameFactory()
            break
        case 'WithWell':
            figureFactory = new WithWell_GameFactory()
            break
        default:
            console.log("Invalid game type");
    }

    let figures = figureFactory.createFigures()
    console.log(figures);
    showCards(figures)
}

const playButton = document. getElementById('playButton');
playButton.addEventListener('click', play)



function showCards(figures) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';

    figures.forEach(figure => {
        const figureCard = document.createElement('div');
        figureCard.className = 'card';
        figureCard.innerHTML = `
            <p>Name: ${figure.getName()}</p>
            <img src="${figure.getImage()}" alt="${figure.getName()}">
        `;
        figureCard.onclick = function() {
            GamePlay(figure.getName());
        };

        cardsContainer.appendChild(figureCard);
    });
}



//Figures
class Figure{
    constructor(name, image){
        this.name = name;
        this.image = image;
    }
    getName(){
        return this.name;
    }

    getImage(){
        return this.image;
    }
}

class Paper extends Figure{
    constructor(){
        super("Paper", '../assets/favicon.png')
    }
}

class Rock extends Figure{
    constructor(){
        super("Rock", "../assets/favicon.png")
    }
}

class Scissors extends Figure{
    constructor(){
        super("Scissor", "../assets/favicon.png")
    }
}

class Well extends Figure{
    constructor(){
        super("Well", "../assets/favicon.png")
    }
}

class Spock extends Figure{
    constructor(){
        super("Spock", "../assets/favicon.png")
    }
}

class Lizard extends Figure{
    constructor(){
        super("Lizard", "../assets/favicon.png")
    }
}




//Factories
class FigureFactory {
    createFigures(){
        return []
    }
}

class ClassicGameFactory extends FigureFactory{
    createFigures(){
        return [new Rock(), new Paper(), new Scissors()]
    }    
}

class BBT_GameFactory extends FigureFactory{
    createFigures(){
        return [new Rock(), new Paper(), new Scissors(), new Lizard(), new Spock()]
    }  
}
//Temp name, pomenyaem potom
class WithWell_GameFactory extends FigureFactory{
    createFigures(){
        return [new Rock(), new Paper(), new Scissors(), new Well()]
    }  
}


class GameStrategy {
    determineWinner(playerFigure, opponentFigure) {}
}

class ClassicGameStrategy extends GameStrategy {
    determineWinner(playerFigure, opponentFigure) {
        if (playerFigure === opponentFigure) {
            return "It's a tie!";
        } else if (
            (playerFigure === "Rock" && opponentFigure === "Scissors") ||
            (playerFigure === "Paper" && opponentFigure === "Rock") ||
            (playerFigure === "Scissors" && opponentFigure === "Paper")
        ) {
            return "You win!";
        } else {
            return "You lose!";
        }
    }
}

class BBTGameStrategy extends GameStrategy {
    determineWinner(playerFigure, opponentFigure) {
        if (playerFigure === opponentFigure) {
            return "It's a tie!";
        } else if (
            (playerFigure === "Rock" && (opponentFigure === "Scissors" || opponentFigure === "Lizard")) ||
            (playerFigure === "Paper" && (opponentFigure === "Rock" || opponentFigure === "Spock")) ||
            (playerFigure === "Scissors" && (opponentFigure === "Paper" || opponentFigure === "Lizard")) ||
            (playerFigure === "Lizard" && (opponentFigure === "Spock" || opponentFigure === "Paper")) ||
            (playerFigure === "Spock" && (opponentFigure === "Scissors" || opponentFigure === "Rock"))
        ) {
            return "You win!";
        } else {
            return "You lose!";
        }
    }
}

class WithWellGameStrategy extends GameStrategy {
    determineWinner(playerFigure, opponentFigure) {
        if (playerFigure === opponentFigure) {
            return "It's a tie!";
        } else if (
            (playerFigure === "Rock" && (opponentFigure === "Scissors")) ||
            (playerFigure === "Paper" && (opponentFigure === "Rock" )) ||
            (playerFigure === "Scissors" && (opponentFigure === "Paper")) ||
            (playerFigure === "Well" && (opponentFigure === "Rock" || opponentFigure === "Scissors")) 
        ) {
            return "You win!";
        } else {
            return "You lose!";
        }
    }   
}

function getRandomInt(min, max) {
    let k = Math.floor(Math.random() * (max - min + 1));
    if(gameType.value == 'BBT' && k == 3){
        return getRandomInt(min, max);
    }
    return k;
}
  
function computerRandomChoice(size) {
    const randomIndex = getRandomInt(0, size - 1);
    return availableFigures[randomIndex];
}
  
function GamePlay(selectedCard) {
    let gameType = document.getElementById('gameType');
    let gameStrategy;
    let size;
    switch (gameType.value) {
        case 'Classic':
            gameStrategy = new ClassicGameStrategy(); 
            size = 3;
            break;
        case 'BBT':
            gameStrategy = new BBTGameStrategy(); 
            size = 6;
            break;
        case 'WithWell':
            gameStrategy = new WithWellGameStrategy(); 
            size = 4;
            break;
        default:
            console.log("Invalid game type");
    }
    const playerFigure = selectedCard;
    const opponentFigure = computerRandomChoice(size,gameType.value);
    console.log(selectedCard + opponentFigure);
    const result = gameStrategy.determineWinner(playerFigure, opponentFigure);

    console.log(result);
}












