export class API {
    csrfToken: string;

    constructor(csrftoken: string) {
        this.csrfToken = csrftoken;
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

    async getCaption(imageID: string) {
        return fetch(`${imageID}/caption.json`)
        .then(response => { 
            if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
            }
            return response.json();
        })
    }

    async putCaption(imageID: string, caption: string) {

        return fetch(`${imageID}/caption.json`, {
            method: 'PUT',
            headers: {  'Content-Type': 'application/json',
                        'X-CSRF-Token': this.csrfToken 
                     },
            body: JSON.stringify({'caption': caption})
        })
        .then(response => { 
            if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
            }
            return response.text();
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
