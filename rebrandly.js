let request = require("request");

async function link(url, api) {
    request({ uri: "https://api.rebrandly.com/v1/links", method: "POST", body: JSON.stringify({ destination: url }), headers: { "Content-Type": "application/json", "apikey": api } }, (err, response, body) => {
        console.log(JSON.parse(body))
    })
}

link("https://google.com", "76565e5fadd34843b2765325df94fb48")
