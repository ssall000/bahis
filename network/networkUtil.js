import request from 'request';
import https from 'https';

import got from 'got';

let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

let timeout = (p, ms) => Promise.race([p, wait(ms).then(() => {

    throw new Error("Timeout after " + ms + " ms");
})]);


function _request(url) {


    return got(url, {
        responseType: 'json',
        resolveBodyOnly: true,
        retry: {
            limit: 20,
            calculateDelay: ({computedValue}) => {
                return computedValue ;
            }
        },
        timeout: {
            request: 10000
        }
    });


}


async function _httpsRequest(_url) {

    const options = new URL(_url);
    //options.agent = new http.Agent(options);
    return new Promise((resolve, reject) => {
        options.agent = false;
        const req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            let dataChunk = '';
            res.on('data', (chunk) => {
                if (chunk != null && chunk != "") {
                    dataChunk += chunk;
                }

            });
            res.on('end', function () {
                try {
                    let responseData = JSON.parse(dataChunk);
                    return resolve(responseData);
                } catch (ex) {
                    return resolve(dataChunk)
                }
                // now I can process the data

            });

        }).on('error', (e) => {
            console.error(e);
            reject(e);
        });

        req.end();
    })

}

async function get(url, https, controller) {
    if (https) {
        return _httpsRequest(url);
    }
    return _request(url, controller);
}

async function getRedirectUrl(url) {
    var separateReqPool = {
        maxSockets: 20
    };

    return new Promise((resolve, reject) => {
        request({
            url: url,
            pool: separateReqPool
        }, function (error, response, body) {

            //Do Something with the response
            if (error) return reject(error);

            return resolve(`${response.request.uri.protocol}//${response.request.uri.host}`)


        }, function (err, results) {
            console.log(results);
            return reject(err);

        });
    })

}


export default {
    get,
    getRedirectUrl,

}