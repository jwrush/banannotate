import { API } from "./API";
import { Controller } from "./Controller";
import { InputAdaptor } from "./InputAdaptor";
import { Presenter } from "./Presenter";
import { State } from "./State";

export class Banannotate {
    state: State | null;
    presenter: Presenter | null;
    controller: Controller | null;

    constructor(window: Window) {
        const document = window.document;
        const csrfTokenElement = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
        if (!csrfTokenElement) {
            throw new Error("Couldn't find CSRF token");
        }

        let api = new API(csrfTokenElement.content);

        this.state = null;
        this.presenter = new Presenter(document);
        this.controller = new Controller(api, updateState);

        let inputAdaptor: InputAdaptor = new InputAdaptor();
        inputAdaptor.mount(window, this.controller, getCurrentState);

        let me = this;

        function updateState(newState: State) {
            me.state = newState;
            me.presenter.present(me.state);
        }

        function getCurrentState() {
            return me.state;
        }

        this.controller.initialize();
    }
}
