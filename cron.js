const fetch = require('node-fetch');

const API_URL = process.env.API_URL || "https://vit-bfhl-api-tjq0.onrender.com/";

async function pingApi() {
    console.log(`Pinging API at ${API_URL}...`);

    const payload = {
        data: ["js-keep-alive-ping"]
    };

    try {

        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
            timeout: 20000 
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(`Success! Status Code: ${response.status}`);
            console.log("Response Body:", responseData);
        } else {

            const errorText = await response.text();
            console.log(`Failed! Status Code: ${response.status}`);
            console.log("Response Body:", errorText);
        }

    } catch (error) {

        console.error(`An error occurred during the fetch operation: ${error.message}`);
    }
}

pingApi();
