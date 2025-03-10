const { response } = require("express");

document.addEventListener("DOMContentLoaded", () => {
    fetchGlobal();
});

// Read data from localstorage but if?
function getLocalStorageData(key){
    const storedData = localStorage.getItem(key);
    if(!storedData) return null;

    const parsedData = JSON.parse(storedData);
    const currentTime = Date.now();
    //Data was older than 5  minutes Fetch it again
    if (currentTime - parsedData.timestamp > 300000){
        localStorage.removeItem(key);
        return null;
    }
    return parsedData.data;
}

function fetchGlobal(){
    const localStoragekey = 'Global_data';
    const localData = getLocalStorageData(localStoragekey);

    if(localData){
        displayGlobalData(localData);
    }else {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch('https://api.coingecko.com/api/v3/global', options)
            .then(response => response.json())
            .then(data => {
                const globalData = data.data;
                displayGlobalData(data);
                serLocalStorageData(localStoragekey, globalData);
            })
    }

}

