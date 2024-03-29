var env = process.env.NODE_ENV; // env variable which will be use on coloud

if (env === "development" || env === "test") {
    var config = require("./config.json");
    var envConfig = config[env]; //grap proper env configuration from config.json

    Object.keys(envConfig).forEach(key => {
        //Object.keys return keys from argument
        process.env[key] = envConfig[key];
    });
}