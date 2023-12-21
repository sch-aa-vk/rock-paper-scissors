// -- Figures -- //
export class Figure {
  constructor(name, image) {
    this.name = name;
    this.image = image;
  }
  getName() {
    return this.name;
  }

  getImage() {
    return this.image;
  }
}

export class Paper extends Figure {
  constructor() {
    super("Paper", "../assets/paper.png");
  }
}

export class Rock extends Figure {
  constructor() {
    super("Rock", "../assets/rock.png");
  }
}

export class Scissors extends Figure {
  constructor() {
    super("Scissors", "../assets/scissors.png");
  }
}

export class Well extends Figure {
  constructor() {
    super("Well", "../assets/well.png");
  }
}

export class Spock extends Figure {
  constructor() {
    super("Spock", "../assets/spock.png");
  }
}

export class Lizard extends Figure {
  constructor() {
    super("Lizard", "../assets/lizard.png");
  }
}

// -- Factories -- //
export class FigureFactory {
  createFigures() {
    return [];
  }
}

export class ClassicGameFactory extends FigureFactory {
  createFigures() {
    return [new Rock(), new Paper(), new Scissors()];
  }
}

export class BBTGameFactory extends FigureFactory {
  createFigures() {
    return [new Rock(), new Paper(), new Scissors(), new Lizard(), new Spock()];
  }
}

export class WithWellGameFactory extends FigureFactory {
  createFigures() {
    return [new Rock(), new Paper(), new Scissors(), new Well()];
  }
}

export const availableFigures = [
  { name: 'Rock', class: new Rock() },
  { name: 'Paper', class: new Paper() },
  { name: 'Scissors', class: new Scissors() },
  { name: 'Well', class: new Well() },
  { name: 'Spock', class: new Spock() },
  { name: 'Lizard', class: new Lizard() }
]