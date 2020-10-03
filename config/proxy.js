const request = require('request');
const cheerio = require('cheerio');
const getProxy = (fnCallback) => {
    let ip_addresses = [];
    let port_numbers = [];
    let proxy;
    request("https://sslproxies.org/", function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            $("td:nth-child(1)").each(function (index, value) {
                ip_addresses[index] = $(this).text();
            });

            $("td:nth-child(2)").each(function (index, value) {
                port_numbers[index] = $(this).text();
            });
        } else {
            reject();
            console.log("Error loading proxy, please try again");
        }

        ip_addresses.join(", ");
        port_numbers.join(", ");

        let random_number = Math.floor(Math.random() * 100);
        proxy = `https://${ip_addresses[random_number]}:${port_numbers[random_number]}`;
        fnCallback(proxy)
    });
};

module.exports = {
    getProxy
};