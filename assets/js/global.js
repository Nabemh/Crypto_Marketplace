document.addEventListener("DOMContentLoaded", () => {
    fetchGlobal();
});

function fetchGlobal(){

}

function getLocalStorageData(key){
    const storedData = localStorage.getItem(key);
    if(!storedData) return null;

    const parsedData = JSON.parse(storedData);
    const currentTime = Date.now();
    if (currentTime - parsedData.timestamp > 300000){
        localStorage.removeItem(key);
        return null;
    }
    return parsedData.data;
}