import { State } from "./State";

export interface InputReciever {
    moveLeft(currentState: State): void;
    moveRight(currentState: State): void;
    loadDirectory(currentState: State, directoryPath: string): void;
    markCaptionDirty(currentState: State): void;
    saveCaption(currentState: State, directoryPath: string): void;
    restoreCaption(currentState: State): void;
}