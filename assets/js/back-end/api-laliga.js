import {fetchAPI,baseApi} from "./module/getStandings.js"

const id_League = 2014;
const ENDPOINT_laliga = `${baseApi}competitions/${id_League}/standings`;

const laliga = fetchAPI(ENDPOINT_laliga)
                .then( data => {
                return data;
                })
                .catch( error => {
                console.log(error)
                });

const ENDPOINT_TOPSCORE_LL = `${baseApi}competitions/${id_League}/scorers`;

const topScoreLL = fetchAPI(ENDPOINT_TOPSCORE_LL)
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.log(error);
                        
                    })

export {laliga,ENDPOINT_laliga,ENDPOINT_TOPSCORE_LL,topScoreLL};
