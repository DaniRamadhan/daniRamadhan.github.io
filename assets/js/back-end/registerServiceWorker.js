
if ("serviceWorker" in navigator) {
    
    navigator.serviceWorker
    .register("/sw.js")
    .then(registration => {
        console.log(
        "service worker berhasil di install scope : ",
        registration.scope
        );
    }).catch (err => {
        console.log("service worker gagal :" , err);
    })
}