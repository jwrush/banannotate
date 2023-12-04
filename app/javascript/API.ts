export class API {
    constructor() {
    }

    async getImage(imageID: string) {
        return fetch(`/images/${imageID}`)
        .then(response => { 
            if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
            }
            return response.blob();
        })
    }

    async getDirectory(directoryPath: string) {

        return fetch(`/directory/${btoa(directoryPath)}/show.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error, status = ' + response.status);
                }
                return response.json();
            });
    }
}
