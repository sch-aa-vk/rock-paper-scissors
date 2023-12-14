// import {ClassicGameFactory} from './Factories/ClassicGameFactory'



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
        super("Scissor", "../assets/scissors.png")
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

