var request = require("request");
request("https://samples.openweathermap.org/data/2.5/find?q=London&units=metric&appid=b6907d289e10d714a6e88b30761fae22", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //body is a string so we need to turn it into an object
        var parsedData=JSON.parse(body);
        console.log("The current temperature in London is ")
        console.log(parsedData["list"][0]["main"]["temp"]);
        
    }
})
