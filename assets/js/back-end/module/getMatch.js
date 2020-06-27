

const token = "e354c67efe7542238d7fa99004c363ec";
const baseApi = "https://api.football-data.org/v2/";

function getMatch(id_team){
return fetch(`${baseApi}teams/${id_team}/matches?status=FINISHED`, {
    headers : {
        'X-Auth-Token': token
    }
})
.then(resolve =>{
    return resolve.json()
})
.catch(err => {
    console.log(err)
    })
}

export{getMatch,baseApi}