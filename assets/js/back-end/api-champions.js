const token = "e354c67efe7542238d7fa99004c363ec";
const baseApi = "https://api.football-data.org/v2/";
const id_League = 2001;
const ENDPOINT_CHAMPION_LEAGUE = `${baseApi}competitions/${id_League}/standings?standingType=TOTAL`;


const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': token,
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

const championLeague = fetchAPI(ENDPOINT_CHAMPION_LEAGUE)
                .then( data => {
                return data;
                })
                .catch( error => {
                console.log(error)
                });

const ENDPOINT_TOPSCORE_UCL = `${baseApi}competitions/${id_League}/scorers`;

const topScoreUCL = fetchAPI(ENDPOINT_TOPSCORE_UCL)
            .then(data => {
                return data;
            })
            .catch(error => {
            console.log(error);
            })

export {championLeague,ENDPOINT_CHAMPION_LEAGUE,ENDPOINT_TOPSCORE_UCL,topScoreUCL};