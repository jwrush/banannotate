import { API } from "./API";
import { State } from "./State";
import { log } from "./log";

export class Controller {
    _api: API;
    _updateState: (state: State) => void;

    constructor(api: API, updateStateDelegate: (state: State) => void) {
        this._api = api;
        this._updateState = updateStateDelegate;
    }

    _log_callback(s: string) {
        log(`CONTROLLER - ${s}`);
    }

    canMove(currentState: State, directionRight: boolean = true): boolean {
        return true;
    }

    determineNextImage(currentState: State, directionRight: boolean = true): {newOffset: number, newURL: string} {
        
        let step = directionRight ? 1 : -1;
        let nextImageOffset = (currentState.imageOffset + step + currentState.directory.files.length) % currentState.directory.files.length;
        let nextURL = currentState.directory.files[nextImageOffset].url;

        return {newOffset: nextImageOffset, newURL: nextURL};
    }

    async initialize() {
        this._log_callback("initialize");

        this._updateState(new State("",
            null,
            null,
            null,
            false,
            false,
            true));
    }

    async moveLeft(currentState: State) {
        this._log_callback("moveLeft");

        let newOffset: number, newURL: string;
        ({ newOffset, newURL } = this.determineNextImage(currentState, false));

        this._updateState(new State(currentState.directoryPath,
            currentState.directory,
            newURL,
            newOffset,
            this.canMove(currentState, false),
            this.canMove(currentState, true),
            true));
    }

    async moveRight(currentState: State) {
        this._log_callback("moveRight");

        let newOffset: number, newURL: string;
        ({ newOffset, newURL } = this.determineNextImage(currentState, true));

        this._updateState(new State(currentState.directoryPath,
            currentState.directory,
            newURL,
            newOffset,
            this.canMove(currentState, false),
            this.canMove(currentState, true),
            true));
    }

    async loadDirectory(currentState: State, directoryPath: string) {
        this._log_callback("loadDirectory");

        this._updateState(new State(directoryPath,
            null,
            null,
            null,
            false,
            false,
            false));

        try {
            let new_directory = await this._api.getDirectory(directoryPath);

            let newImageOffset = 0;
            let newImageUrl = new_directory.files[newImageOffset]?.url;

            this._updateState(new State(new_directory.path,
                new_directory,
                newImageUrl,
                newImageOffset,
                this.canMove(currentState, false),
                this.canMove(currentState, true),
                true));
        } catch (error) {
            console.error(error);

            this._updateState(new State(currentState.directoryPath,
                currentState.directory,
                currentState.image,
                currentState.imageOffset,
                this.canMove(currentState, false),
                this.canMove(currentState, true),
                true));
        }
    }
}