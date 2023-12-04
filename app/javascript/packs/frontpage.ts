class State {
    directoryPath: string;
    directory: string;
    image: string;

    constructor(loaded_path: string, directory: string, image: string) {
        this.directoryPath = loaded_path;
        this.directory = directory;
        this.image = image;
    }
}
/*
class controller {
    constructor() {
    }

    moveLeft(currentState) {
    
        
    }

    moveRight() {
    }

    loadDirectory() {
    }
}

initializeBanannotate = function() {
    return {
        state: new state()
    }
}

window.onload = function() {
    window.banannotate = initializeBanannotate();
};
*/