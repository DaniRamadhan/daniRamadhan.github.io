import {fetchAPI,baseApi} from "./module/getStandings.js"

const id_League = 2021;
const ENDPOINT_PREMIER_LEAGUE = `${baseApi}competitions/${id_League}/standings`;

const premierLeague = fetchAPI(ENDPOINT_PREMIER_LEAGUE)
                .then( data => {
                return data;
                })
                .catch( error => {
                console.log(error)
                });

const ENDPOINT_TOPSCORE_PL = `${baseApi}competitions/${id_League}/scorers`;

const topScorePl = fetchAPI(ENDPOINT_TOPSCORE_PL)
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.log(error);
                    })



export {premierLeague,ENDPOINT_PREMIER_LEAGUE,topScorePl,ENDPOINT_TOPSCORE_PL};
