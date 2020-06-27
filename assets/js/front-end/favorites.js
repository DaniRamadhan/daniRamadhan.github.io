import {getAllMatch,getAllTeam,deleteFavorite} from"../back-end/db.js"
import "../back-end/module/idb.js"
    
     const url= new URLSearchParams(window.location.search);
     const idParam =url.get("id");
     const kosong = document.querySelector(".kosong");
   if(idParam !== null){
     deleteFavorite(idParam)
   }
document.addEventListener("DOMContentLoaded" , function(){
    $('.sidenav').sidenav();
    stacking()

    
})
function stacking(){
     const element =document.querySelector(".body-content"); 
     let clubHtml = "";
     getAllTeam().then( club =>{    
        club.forEach(element => {
            clubHtml += `
            <a href="/page/team.html?id=${element.id}&saved=true">
        <div class="col s12 m4">
      <div class="card">
        <div class="card-image">
          <img src="${element.crestUrl}" class="responsive-img">
          <a class="btn-floating halfway-fab waves-effect waves-light red" href="?id=${element.id}" ><img src="/assets/img/delete-icon.png"></a>
        </div>
        <div class="card-content">
        <span class="card-title">${element.name}</span>
        </div>
      </div>
    </div>
    `})
    element.innerHTML= `
    <div class="row">
    ${clubHtml}
    </div>
    `
    if (clubHtml !== "") {
      kosong.style.display = "none"
    }
    })
    
}


