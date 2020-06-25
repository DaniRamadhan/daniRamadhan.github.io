import {fetchAPI,baseApi} from "./module/getStandings.js"

const id_League = 2002;
const ENDPOINT_BUNDES_LEAGUE = `${baseApi}competitions/${id_League}/standings`;

const bundesLeague = fetchAPI(ENDPOINT_BUNDES_LEAGUE)
                .then( data => {
                return data;
                })
                .catch( error => {
                console.log(error)
                });
                const ENDPOINT_TOPSCORE_BL = `${baseApi}competitions/${id_League}/scorers`;

const topScoreBL = fetchAPI(ENDPOINT_TOPSCORE_BL)
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.log(error);
                        
                    })

export {bundesLeague,ENDPOINT_BUNDES_LEAGUE,ENDPOINT_TOPSCORE_BL,topScoreBL};