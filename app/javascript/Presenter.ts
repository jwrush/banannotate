import { State } from "./State";
import { log } from "./log";

export class Presenter {
    _document: Document;

    constructor(document: Document) {
        this._document = document;
    }

    setControlAvailability(state: State) {
        let leftButtonElement = this._document.querySelector('#left-button') as HTMLElement;
        if (leftButtonElement) {
            leftButtonElement.classList.toggle('disabled', !state.canMoveLeft)
        }
        else {
            log(`PRESENTER - leftButtonElement is null`);
        }

        let rightButtonElement = this._document.querySelector('#right-button') as HTMLElement;
        if (rightButtonElement) {
            rightButtonElement.classList.toggle('disabled', !state.canMoveRight)
        }
        else {
            log(`PRESENTER - rightButtonElement is null`);
        }
       
        let saveCaptionButtonElement = this._document.querySelector('#save-caption-button') as HTMLButtonElement;
        if (saveCaptionButtonElement) {
            saveCaptionButtonElement.classList.toggle('disabled', !state.captionDirty);
        }
        else {
            log(`PRESENTER - saveCaptionButtonElement is null`);
        }

        let restoreCaptionButtonElement = this._document.querySelector('#cancel-caption-button') as HTMLButtonElement;
        if (restoreCaptionButtonElement) {
            restoreCaptionButtonElement.classList.toggle('disabled', !state.captionDirty);
        }
        else {
            log(`PRESENTER - cancelCaptionButtonElement is null`);
        }
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

    setImage(image: string | null, caption: string | null) {
        let imageElement = this._document.querySelector('img#current-image') as HTMLImageElement;
        if (imageElement) {
            imageElement.src = image || "";
        }
        else {
            log(`PRESENTER - imageElement is null`);
        }

        let captionElement = this._document.querySelector('div#caption') as HTMLDivElement;
        if (captionElement) {
            captionElement.innerText = caption || "";
            captionElement.focus();
        }
        else {
            log(`PRESENTER - captionElement is null`);
        }
    }

    present(state: State) {
        log(`PRESENTER presenting - ${state}`);

        this.setControlAvailability(state);

        if (state.captionDirty) {
            return;
        }

        this.setDirectoryPath(state.directoryPath);
        this.setImage(state.image, state.caption);
    }
}
