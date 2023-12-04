
function log(s){
    console.log(s);
}

log("Hello world!!!!")

class State {
    directoryPath: string;
    directory: any;
    image: string;

    constructor(loaded_path: string, directory: any, image: string) {
        this.directoryPath = loaded_path;
        this.directory = directory;
        this.image = image;
    }
}

class API {
    constructor() {
    }

    async getImage(imageID: string) {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    image: "test"
                });
            }, 1000);
        });
    }

    async getDirectory(directoryPath: string) {

        return fetch(`/directory/${btoa(directoryPath)}/show.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status)
            }
            return response.json();
        })
    }
}    

interface InputReciever {
    moveLeft(currentState: State): void;
    moveRight(currentState: State): void;
    loadDirectory(currentState: State, directoryPath: string): void;
}

class Controller {
    _api: API;
    _updateState: (state: State) => void;

    constructor(api: API, updateStateDelegate: (state: State) => void) {
        this._api = api;
        this._updateState = updateStateDelegate;
    }

    _log_callback(s: string) {
        log(`CONTROLLER - ${s}`)
    }

    async moveLeft(currentState: State) {
       this._log_callback("moveLeft"); 
      
       this._updateState(new State(currentState.directoryPath,
                                   currentState.directory,
                                   currentState.image));
    }

    async moveRight(currentState: State) {
        this._log_callback("moveRight");

        this._updateState(new State(currentState.directoryPath,
                                    currentState.directory,
                                    currentState.image));
    }
    


    async loadDirectory(currentState: State, directoryPath: string) {
        this._log_callback("loadDirectory");

        let new_directory = await this._api.getDirectory(directoryPath);

        this._updateState( new State(new_directory.path,
                                     new_directory,
                                     null))
    }
}

class InputAdaptor {
    constructor() {
    }

    mount(document : Document, input : InputReciever, getCurrentState: () => State){
        document.querySelector('#left-button').addEventListener('click', async () => {
            input.moveLeft(getCurrentState());
        });

        document.querySelector('#right-button').addEventListener('click', async () => {
            input.moveRight(getCurrentState());
        });

        document.querySelector('#load-directory-button').addEventListener('click', async () => {
            let newPath = document.querySelector('#directory').value;
            input.loadDirectory(getCurrentState(), newPath);
        });
    }
}

class Presenter {
    _document: Document;

    constructor(document: Document) {
        this._document = document;
     }

    setDirectoryPath(directoryPath: string) {
        this._document.querySelector('#directory').value = directoryPath;
    }

    setImage(image: string) {
        this._document.querySelector('#current-image').src = image;
    }


    present(state: State) {
        log(`PRESENTER presenting - ${state}`);

        this.setDirectoryPath(state.directoryPath);
        this.setImage(state.image);
    }
}

class Banannotate{
    state: State;
    presenter: Presenter;
    controller: Controller;

    constructor(document: Document = window.document) {
        let api = new API();
        
        this.state = new State(null, null, null);
        this.presenter = new Presenter(document);
        this.controller = new Controller(api, updateState);

        let inputAdaptor = new InputAdaptor();
        inputAdaptor.mount(document, this.controller, getCurrentState);

        let me = this;

        function updateState(newState: State) {
            me.state = newState;
            me.presenter.present(me.state);
        }

        function getCurrentState() {
            return me.state;
        }
    }
}

window.onload = function() {
    window.banannotate = new Banannotate();
};