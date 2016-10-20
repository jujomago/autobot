

exports.getCache = function (key) {
    return new Promise(function (resolve, reject) {
        resolve(null);
        /*client[settings.soapMethod](settings.soapParams, (err, result) => {
            if (err !== null) {
                reject(result)
            } else {
                resolve(result);
            }
        });*/
    });
}
