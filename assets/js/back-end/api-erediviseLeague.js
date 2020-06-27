import {fetchAPI,baseApi} from "./module/getStandings.js"

const id_League = 2003;
const ENDPOINT_EREDIVISE = `${baseApi}competitions/${id_League}/standings`;

const eredivise = fetchAPI(ENDPOINT_EREDIVISE)
                .then( data => {
                return data;
                })
                .catch( error => {
                console.log(error)
                });

const ENDPOINT_TOPSCORE_ERE = `${baseApi}competitions/${id_League}/scorers`;

const topScoreERE = fetchAPI(ENDPOINT_TOPSCORE_ERE)
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.log(error);
                        
                    })

export {eredivise,ENDPOINT_EREDIVISE,topScoreERE,ENDPOINT_TOPSCORE_ERE};