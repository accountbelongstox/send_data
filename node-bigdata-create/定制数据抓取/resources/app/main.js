const
    loadPath = require("path").join(__dirname,"./public/load.class.js"),
    loadClass = require(loadPath),
    load = new loadClass()
;
load.module.electron.init();