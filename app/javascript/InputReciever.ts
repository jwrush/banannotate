import { State } from "./State";

export interface InputReciever {
    moveLeft(currentState: State): void;
    moveRight(currentState: State): void;
    loadDirectory(currentState: State, directoryPath: string): void;
    saveCaption(currentState: State, directoryPath: string): void;
}