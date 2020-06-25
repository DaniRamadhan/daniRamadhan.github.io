const token = "e354c67efe7542238d7fa99004c363ec";
const baseApi = "https://api.football-data.org/v2/";

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': token
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

export {fetchAPI,baseApi}