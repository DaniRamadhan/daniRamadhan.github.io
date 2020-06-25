import "./module/idb.js"
const dbPromised = idb.open("WorldLeague",1, function (upgradeDb) {
    const objectStore =upgradeDb.createObjectStore("club", {
        keyPath : "id"
    });
    objectStore.createIndex("name","name",{unique:false});
    upgradeDb.createObjectStore("match",{
        keyPath : "id",
        autoIncrement: true
    })
})


function saveTeam(club){
    dbPromised
    .then(function(db){
        const transaction = db.transaction("club","readwrite");
        const store = transaction.objectStore("club");
        console.log(club);
        store.add(club);
        return transaction.complete;
    })
    .then(
        console.log("artikel berhasil di simpan")
        )
}

function saveMatch(match){
    dbPromised
    .then(function (db){
        const transaction = db.transaction("match","readwrite");
        const store = transaction.objectStore("match")
        store.add(match);
        return transaction.complete;
    })
    .then(
        console.log("artikel berhasil di simpan")
        )
}

function getAllTeam(){
    return new Promise (function (resolve,reject) {
        dbPromised
        .then(function(db){
            const transaction = db.transaction("club","readonly");
            const store = transaction.objectStore("club");
            return store.getAll()
        })
        .then(function(club) {
            resolve(club);
        });
    })
}

function getAllMatch(){
    return new Promise (function (resolve,reject) {
        dbPromised
        .then(function(db){
            const transaction = db.transaction("match","readonly");
            const store = transaction.objectStore("match");
            return store.getAll()
        })
        .then(function(club) {
            resolve(club);
        });
    })
}

function deleteFavorite(idteam){
    dbPromised.then(function(db) {
        var tx = db.transaction('club', 'readwrite');
        var store = tx.objectStore('club');
        var id = Number(idteam)
        store.delete(id);
      }).then(function() {
        console.log('Item deleted');
      });
}

export{saveTeam,saveMatch,getAllMatch,getAllTeam,deleteFavorite};