import {league1 , ENDPOINT_league1,topScoreL1,ENDPOINT_TOPSCORE_L1} from"../back-end/api-league1.js";

document.addEventListener("DOMContentLoaded", function () {
    //active sidebar
    $('.sidenav').sidenav();
    $('.materialboxed').materialbox();
    $('.tabs').tabs();    
    
    league1.then(dataJson => {
        getStanding(dataJson);
    }).catch(err => {
        console.log(err)
    })

    topScoreL1.then( APITopScore => {
        showTopScore(APITopScore);
    }).catch(err => {
        console.log(err)
    })
    
});

function getStanding(dataJson){
    if("caches" in window) {
        caches.match(ENDPOINT_league1).then(response => {
            if(response) {
                response.json().then( dataCache => {
                    console.log("Competition "+ dataCache);
                    showStanding(dataCache);
                    getTeam(dataCache)
                })
            }
        })         
    }
    showStanding(dataJson);
    getTeam(dataJson)
    console.log(dataJson);
}
    
    function showStanding(dataJson) {
        let standing = "";
        let standingElement = document.getElementById("Standings");
    
        dataJson.standings[0].table.forEach( element => {
            standing +=`
            <tr>
                <td><img src="${element.team.crestUrl.replace(/^http:\/\//i, 'https://')}"width="30px" alt="badge"></td>
                <td>${element.team.name}</td>
                <td>${element.won}</td>
                <td>${element.draw}</td>
                <td>${element.lost}</td>
                <td>${element.points}</td>
                <td>${element.goalsFor}</td>
                <td>${element.goalsAgainst}</td>
                <td>${element.goalDifference}<td>
            </tr>    
            `;
        });
    
        standingElement.innerHTML = `
        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
            <table class = "highlight centered responsive-table">
            <thead>
                    <tr>
                        <th>Club</th>
                        <th>Team Name</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>P</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                    </tr>
             </thead>
             <tbody id ="standings">
             ${standing}
             </tbody>
            </table>
        <div>
        `;
    }

    function getTeam(dataJson){
        const standingElement = document.getElementById('teams');
         
        let standingse = ""; 
        dataJson.standings[0].table.forEach(elements => { 
         standingse +=`
         <a href="./team.html?id=${elements.team.id}">
         <div class="col s12 m3">
         <div class="card sasons">
         <div class="card-image waves-effect waves-block waves-light">
           <img class="activator responsive-img" src="${elements.team.crestUrl}" >
         </div>
         <div class="card-content">
           <span class="card-title activator grey-text text-darken-4">${elements.team.name}</span>
         </div>
       </div>
       </div>   
         `;    
        })
        standingElement.innerHTML = `
        <div class = "row">
        ${standingse}
        </div>
        `;
     }
     function showTopScore(APITopScore){
        let dataCaches = "";
        if ("caches" in window) {
            caches.match(ENDPOINT_TOPSCORE_L1).then(response => {
                if(response) {
                    response.json().then(dataCache => { 
                        topScoreFetch(dataCache);
                    })
                }   
            })
        }
        topScoreFetch(APITopScore);    
    }
    function topScoreFetch(APITopScore){
        const topScoreElement = document.getElementById("topscore");
        let topScore = "";
        let number = 1;
    
        APITopScore.scorers.forEach( data => {
            
            topScore += `
            <tr>
                <td>${number}</td>
                <td>${data.player.name}</td>
                <td>${data.numberOfGoals}</td>
                <td>${data.player.position}</td>
                <td>${data.team.name}</td>
                <td>${data.player.nationality}</td>
            </tr>
                `;
                number++;
        })
    
        topScoreElement.innerHTML = `
        <table class="centered striped responsive-table" style="padding : 30px; margin-top:20px;">
            <thead>
              <tr>
                  <th>No</th>
                  <th>Player Name</th>
                  <th>Number Of Goals</th>
                  <th>Position</th>
                  <th>Club</th>
                  <th>Nationality</th>
              </tr>
            </thead>
            <tbody style="padding : 5px">
            ${topScore}
            </tbody>
          </table>
        `;
    }