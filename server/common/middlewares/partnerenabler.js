
module.exports = {
    partner: function (req, res, next) {
        //req.userId  && req.path
        req.partnerCretentials = {};
        req.partnerCretentials.typeService = 'soap'; //soap, rest
        req.partnerCretentials.typeAuth = 'userpass'; //userpass,oauth;
        req.partnerCretentials.rest = {};
        req.partnerCretentials.rest.secretKey = '';
        req.partnerCretentials.rest.BaseUri = '';
        req.partnerCretentials.soap = {};
        req.partnerCretentials.soap.wsdlUri = 'https://api.five9.com/wsadmin/v4/AdminWebService?wsdl&user=';
        req.partnerCretentials.soap.options = {
            ignoredNamespaces: {
                namespaces: [],
                override: true // solve problem with namespaces
            },
            ignoreBaseNameSpaces: true // child xml atributes don't need tns prefix
        }
        req.partnerCretentials.username = 'trueforce@blueruby.info';
        req.partnerCretentials.passwd = 'five9demo';
        next();
    }
}