export class State {
    directoryPath: string | null;
    directory: any | null;
    imageOffset: number;
    image: string | null;
    caption: string | null;

    canMoveLeft: boolean;
    canMoveRight: boolean;
    canLoadDirectory: boolean;

    constructor(loaded_path: string | null,
        directory: any | null,
        image: string | null,
        imageOffset: number | null,
        caption: string | null,
        canMoveLeft: boolean, 
        canMoveRight: boolean, 
        canLoadDirectory: boolean) {
        this.directoryPath = loaded_path;
        this.directory = directory;
        this.image = image;
        this.caption = caption;

        this.canMoveLeft = canMoveLeft;
        this.canMoveRight = canMoveRight;
        this.canLoadDirectory = canLoadDirectory;
        this.imageOffset = imageOffset;
    }

}
