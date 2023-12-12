const ClassicGameFactory = require('./Factories/ClassicGameFactory')



function play(){
    let gameType = 'Classic'
    let figureFactory = new ClassicGameFactory()

    let figures = figureFactory.createFigures()
    console.log(figures);
    // showCards(figures)
}



// function showCards(figures) {
//     const cardsContainer = document.querySelector('.cards');
//     cardsContainer.innerHTML = '';

//     figures.forEach(figure => {
//         const figureCard = document.createElement('div');
//         figureCard.className = 'card';
//         figureCard.innerHTML = `
//             <p>Name: ${figure.getName()}</p>
//             <img src="${figure.getImage()}" alt="${figure.getName()}">
//         `;
//         cardsContainer.appendChild(figureCard);
//     });
// }


