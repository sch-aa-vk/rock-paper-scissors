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

module.exports = Figure;