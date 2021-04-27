const config = require('./config.json');

var devconfig = config;
devconfig.getReaders="http://localhost/homepage.nsf/test1?OpenPage";

module.exports =devconfig;