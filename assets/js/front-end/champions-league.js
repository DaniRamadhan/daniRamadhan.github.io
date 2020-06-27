import {championLeague,ENDPOINT_CHAMPION_LEAGUE, topScoreUCL, ENDPOINT_TOPSCORE_UCL} from"../back-end/api-champions.js";

document.addEventListener("DOMContentLoaded", function () {
    //active sidebar
    $('.sidenav').sidenav();
    $('.materialboxed').materialbox();
    $('.tabs').tabs();    
    
    championLeague.then(dataJson => {
        getStanding(dataJson);
    }).catch(err => {
        console.log(err)
    })
    topScoreUCL.then( APITopScore => {
        showTopScore(APITopScore);
    }).catch(err => {
        console.log(err)
    })
});

function getStanding(dataJson){
    if("caches" in window) {
        caches.match(ENDPOINT_CHAMPION_LEAGUE).then(response => {
            if(response) {
                response.json().then( dataCache => {
                    console.log("Competition "+ dataCache);
                    showStanding(dataCache);
                    getTeam(dataCache)
                })
            }
        })         
    }
    getTeam(dataJson);
    showStanding(dataJson);
    console.log(dataJson);
}
    
function showStanding(dataJson) {
        
        let standings ="";
        let standingElement = document.getElementById("Standings");
    
        dataJson.standings.forEach(elements =>{
            let standing = "";
            elements.table.forEach( element => {
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
            
            standings += `
        <div class="col s12 m6 ">
        <div class="card-panel" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
        <h5>${elements.group}</h5>
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
    </div>
    </div>
    
        `;
        })
    
        standingElement.innerHTML = `
        <div class="row">
        
            ${standings}
        </div>
        `;
    }

   
    function getTeam(dataJson){
        const standingElement = document.getElementById('teams');
         
        let standingse = ""; 
        dataJson.standings.forEach(elements => { 
        
         elements.table.forEach(element=> {             
         standingse+=`
         <div class="col s12 m3">
         <a href="./team.html?id=${element.team.id}">
         <div class="card sasons">
         <div class="card-image waves-effect waves-block waves-light">
           <img class="activator responsive-img" src="${element.team.crestUrl.replace(/^http:\/\//i, 'https://')}" >
         </div>
         <div class="card-content">
           <span class="card-title activator grey-text text-darken-4">${element.team.name}</span>
         </div>
       </div>
       </div>   
         `;    
            })
        })
        standingElement.innerHTML = `
        <div class = "row">
        ${standingse}
        </div>
        `;
     }

     function showTopScore(APITopScore){
    
        if ("caches" in window) {
            caches.match(ENDPOINT_TOPSCORE_UCL).then(response => {
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
      

