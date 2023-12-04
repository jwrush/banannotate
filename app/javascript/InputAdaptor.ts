import { State } from "./State";
import { InputReciever } from "./InputReciever";

export class InputAdaptor {
    constructor() {
    }

    mount(document: Document, input: InputReciever, getCurrentState: () => State) {
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

        document.querySelector('#save-caption-button').addEventListener('click', async () => {
            let newCaption = document.querySelector('#caption').innerText;
            input.saveCaption(getCurrentState(), newCaption);
        });
    }
}
