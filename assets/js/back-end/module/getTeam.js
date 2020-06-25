const token = "e354c67efe7542238d7fa99004c363ec";
const baseApi ="https://api.football-data.org/v2/";

function getTeam(id_team) {
    
    return fetch(`${baseApi}teams/${id_team}`, {
        headers: {
            'X-Auth-Token': token
        }
    })
    .then(resolve=>{
        return resolve.json()
    });
}

export {getTeam,baseApi}

    

 

