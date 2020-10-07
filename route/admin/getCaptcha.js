const { getCaptcha } = require('../../model/captcha');


module.exports = (req, res, next) => {

    return getCaptcha(req, res, next);
}