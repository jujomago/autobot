

exports.getCache = function (key) {
    return new Promise(function (resolve, reject) {
        resolve(null);
        /*client[settings.soapMethod](settings.soapParams, (err, result) => {
            if (err !== null) {
                console.log(settings.soapMethod + ' with error');
                reject(result)
            } else {
                console.log(settings.soapMethod + ' without error');
                resolve(result);
            }
        });*/
    });
}