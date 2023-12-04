import { State } from "./State";
import { log } from "./log";

export class Presenter {
    _document: Document;

    constructor(document: Document) {
        this._document = document;
    }

    setDirectoryPath(directoryPath: string | null) {
        let directoryPathElement = this._document.querySelector('input#directory') as HTMLInputElement;
        
        if (directoryPathElement) {
            directoryPathElement.value = directoryPath || "";
        }
        else {
            log(`PRESENTER - directoryPathElement is null`);
        }
    }

    setImage(image: string | null) {
        let imageElement = this._document.querySelector('img#current-image') as HTMLImageElement;
        if (imageElement) {
            imageElement.src = image || "";
        }
        else {
            log(`PRESENTER - imageElement is null`);
        }
    }

    present(state: State) {
        log(`PRESENTER presenting - ${state}`);

        this.setDirectoryPath(state.directoryPath);
        this.setImage(state.image);
    }
}
