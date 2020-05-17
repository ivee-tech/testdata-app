import { injectable } from "inversify";

@injectable()
export class DataServiceBase {

    loadData(url: string) {
        let headers: Headers = new Headers();
        return fetch(url, {
            credentials: 'include', // include, same-origin, omit
            headers: headers
        })
            .then(response => {
                return this.handleResponse(response);
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    }

    postData(url: string, data: any) {
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: headers
        })
            .then(response => {
                return this.handleResponse(response);
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    }

    putData(url: string, data: any) {
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            credentials: 'include',
            headers: headers
        })
            .then(response => {
                return this.handleResponse(response);
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    }

    deleteData(url: string) {
        let headers: Headers = new Headers();
        return fetch(url, {
            method: "DELETE",
            credentials: 'include',
            headers: headers
        })
            .then(response => {
                return this.handleResponse(response);
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    }
   
    handleResponse(response: any) {
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json();
            }
            else {
                return {};
            }
        }
        else {
          if(response.type === 'opaque') {
            console.log(response);
          }
          else {
            return response.json()
                .then(jsonResponse => {
                    return new Promise((resolve, reject) => {
                        if (jsonResponse) {
                            resolve({ status: response.status, body: jsonResponse});
                        }
                        else {
                            reject(`${response.status} ${response.statusText}`);
                        }
                    });
            }).catch(err => console.log(err));
          }
        }
    }

}