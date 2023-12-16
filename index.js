const availableFigures = ["Rock", "Paper", "Scissors", "Well", "Spock", "Lizard"];

// -- Figures -- //
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
        super("Paper", '../assets/paper.png')
    }
}

class Rock extends Figure{
    constructor(){
        super("Rock", "../assets/rock.png")
    }
}

class Scissors extends Figure{
    constructor(){
        super("Scissors", "../assets/scissors.png")
    }
}

class Well extends Figure{
    constructor(){
        super("Well", "../assets/well.png")
    }
}

class Spock extends Figure{
    constructor(){
        super("Spock", "../assets/spock.png")
    }
}

class Lizard extends Figure{
    constructor(){
        super("Lizard", "../assets/lizard.png")
    }
}

// -- Factories -- //
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

class BBTGameFactory extends FigureFactory{
    createFigures(){
        return [new Rock(), new Paper(), new Scissors(), new Lizard(), new Spock()]
    }  
}

class WithWellGameFactory extends FigureFactory{
    createFigures(){
        return [new Rock(), new Paper(), new Scissors(), new Well()]
    }  
}

// -- Strategies -- //
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

// -- Helpers -- //
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

const GameStrategies = {
    'Classic': {
        strategy: new ClassicGameStrategy(),
        size: 3,
    },
    'BBT': {
        strategy: new BBTGameStrategy(),
        size: 6,
    },
    'WithWell': {
        strategy: new WithWellGameStrategy(),
        size: 4,
    },
}

const GameFactories = {
    'Classic': new ClassicGameFactory(),
    'BBT': new BBTGameFactory(),
    'WithWell': new WithWellGameFactory(),
}

// -- Gameplay -- //
class GamePlay {
    constructor(gameStrategy) {
        this.gameStrategy = gameStrategy;
    }

    play(selectedCard, size) {
        const playerFigure = selectedCard;
        const opponentFigure = computerRandomChoice(size);
        const result = this.gameStrategy.determineWinner(playerFigure, opponentFigure);

        console.log('!!!!!!', playerFigure, opponentFigure);
        console.log('!!!!!! result', result);
        return { playerFigure, opponentFigure, result };
    }

}

class GamePlayProxy {
    constructor(gameStrategy) {
        this.realGamePlay = new GamePlay(gameStrategy);
    }

    play(selectedCard, size) {
        const { playerFigure, opponentFigure, result } = this.realGamePlay.play(selectedCard, size);

        const gameData = {
            playerFigure,
            opponentFigure,
            result,
            timestamp: new Date().toISOString(),
        };

        const existingGameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

        existingGameHistory.push(gameData);

        localStorage.setItem('gameHistory', JSON.stringify(existingGameHistory));
    }
}

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
        figureCard.addEventListener('click', () => {
            const gameType = document.getElementById('gameType');
            const gameStrategy = GameStrategies[gameType.value];

            new GamePlayProxy(gameStrategy.strategy).play(figure.getName(), gameStrategy.size);
        })

        cardsContainer.appendChild(figureCard);
    });
}

function createCards() {
    const gameType = document.getElementById('gameType');
    const figureFactory = GameFactories[gameType.value] ?? undefined;

    const figures = figureFactory.createFigures();
    showCards(figures)
}

const playButton = document. getElementById('playButton');
playButton.addEventListener('click', createCards);