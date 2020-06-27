
import {getTeam,baseApi} from "../back-end/module/getTeam.js"
import {getMatch} from "../back-end/module/getMatch.js"
import { saveTeam ,saveMatch, getAllTeam, getAllMatch} from "../back-end/db.js";

const saveButton = document.getElementById("save");
const url= new URLSearchParams(window.location.search);
const idParam =url.get("id");
const saved = url.get("saved")

if ("caches" in window) {
  caches.match(`${baseApi}teams/${idParam}/matches?status=SCHEDULED`).then(resolve =>{
    if (resolve) {
      resolve.json().then(data =>{
        setMatch(data)
      })
    }
  })
  caches.match(`${baseApi}teams/${idParam}`).then(resolve => {
      if (resolve) {
        resolve.json().then(data =>{
          setTeam(data)
        })
      }
  })
}



document.addEventListener("DOMContentLoaded" , function(){
    $('.tabs').tabs();
    $('ul.tabs').tabs({
    swipeable: true,
});
$('.sidenav').sidenav();

if ("indexedDB" in window) {
  getAllTeam().then(data =>{
    data.forEach(element =>{
      setTeam(element)
      
    })
    
    })
    getAllMatch().then(data => {
    data.forEach(data =>{
      setMatch(data)
    })
    })
}
if(saved){
  saveButton.style.display ="none"; 
}





const bbg = getTeam(idParam).then( data =>{
              setTeam(data);  
              return data;
              })
              
              

const bbc = getMatch(idParam).then( data =>{
                setMatch(data);                
                return data;
                })


saveButton.onclick = function(){
  M.toast({html: 'Berhasil di Simpan'})
  if ("caches" in window) {
    caches.match(`${baseApi}teams/${idParam}/matches?status=SCHEDULED`).then(resolve =>{
      if (resolve) {
        resolve.json().then(data =>{
          saveMatch(data)
        })
      }
    })
    caches.match(`${baseApi}teams/${idParam}`).then(resolve => {
        if (resolve) {
          resolve.json().then(data =>{
            saveTeam(data)
          })
        }
    })
}
  
  bbg.then(resolve=>{
    saveTeam(resolve)
  })
  
  bbc.then(resolve =>{
    saveMatch(resolve)
    
  })
  
}            
});

function setTeam(data){
  const element =document.getElementById('players');
  
  let players ="";
  data.squad.forEach(element => {
    players +=`
    <div class="col s12 m3 height">
            <div class="card-panel teal white-text center-align">
                <h5>${element.name}</h5>
                  <h1>${element.shirtNumber}</h1>
                  <p>${element.role}</p>
            </div>
    </div>
    `;
  });
  
  let elementHtml = `
  <img  class="center-align" src="${data.crestUrl}">  
        <div class="container">
            <h1 class="center-align">${data.name}</h1> 
            <table border="0">
        
            <tbody>
              <tr>
                  <td>Address</td>
                  <td>${data.address}</td>
              </tr>
              <tr>
                <td>E-Mail</td>
                <td>${data.email}</td>
            </tr>
            <tr>
                <td>Founded</td>
                <td>${data.founded}</td>
            </tr>
            <tr>
                <td>Vanue</td>
                <td>${data.venue}</td>
            </tr>
            </tbody>
          </table>
        </div>
      
        <h2 class="center-align" width ="100%">Squad</h2>
      <div class="row">
        ${players}
      </div>
  `;

  element.innerHTML =
  elementHtml
}

function setMatch(data){
 
  
  let elementHtml="";
  const element = document.getElementById("matches")
  
  data.matches.forEach(element =>{
    elementHtml +=`
    
        <div class="col s12 m12">
          <div class="card-panel white">
              <table class="centered">
                  <tbody>
                      <tr>
                          <td>
                              <h5>${element.awayTeam.name}</h5>
                              <h5>${element.score.fullTime.awayTeam}</h5>
                          </td>
                          <td><h5>VS</h5></td>
                          <td>
                              <h5>${element.homeTeam.name}</h5>
                              <h5>${element.score.fullTime.homeTeam}</h5>
                          </td>
                      </tr>
                  </tbody>
              </table>
            
          </div>
        </div>
      
    `;
  })

  element.innerHTML=`
  <div class="container">
    <div class="row">
      ${elementHtml}
    </div>
  </div>
  `

}

