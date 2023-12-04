import { State } from "./State";
import { InputReciever } from "./InputReciever";

export class InputAdaptor {
    constructor() {
    }

    mount(window: Window, input: InputReciever, getCurrentState: () => State) {
       
        window.addEventListener('keydown', async (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    input.moveLeft(getCurrentState());
                    break;
                case 'ArrowRight':
                    input.moveRight(getCurrentState());
                    break;
                default:
                    break;
            }
        });
        
        const document = window.document;

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

        document.querySelector('#caption').addEventListener('input', async (event) => {
            input.markCaptionDirty(getCurrentState());
        })

        document.querySelector('#cancel-caption-button').addEventListener('click', async () => {
            input.restoreCaption(getCurrentState());
        });

        document.querySelector('#save-caption-button').addEventListener('click', async () => {
            let newCaption = document.querySelector('#caption').innerText;
            input.saveCaption(getCurrentState(), newCaption);
        });

        
    }
}
