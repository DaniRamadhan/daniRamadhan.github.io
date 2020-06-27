import {fetchAPI,baseApi} from "./module/getStandings.js"

const id_League = 2015;
const ENDPOINT_league1 = `${baseApi}competitions/${id_League}/standings`;

const league1 = fetchAPI(ENDPOINT_league1)
                .then( data => {
                return data;
                })
                .catch( error => {
                console.log(error)
                });

const ENDPOINT_TOPSCORE_L1 = `${baseApi}competitions/${id_League}/scorers`;

const topScoreL1 = fetchAPI(ENDPOINT_TOPSCORE_L1)
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.log(error);
                        
                    })


export {league1,ENDPOINT_league1,topScoreL1,ENDPOINT_TOPSCORE_L1};
