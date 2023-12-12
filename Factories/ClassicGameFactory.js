const Rock = require('../models/Rock')
const Paper = require('../models/Paper')
const Scissor = require('../models/Scissor')

const FigureFactory = require('./FigureFactory')

class ClassicGameFactory extends FigureFactory{
    createFigures(){
        return [new Rock(), new Paper(), new Scissor()]
    }    
}

module.exports = ClassicGameFactory
