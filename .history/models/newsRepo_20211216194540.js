const Repository = require('./repository');
const Image = require("./image.js");
const utilities = require("../utilities");

module.exports = class NewsRepo extends Repository{
    constructor(req){
        super("News", true);
        this.req = req;
    }
    add(news) {
        news["Created"] = utilities.nowInSeconds();
        if (Image.valid(news)){
            news["GUID"] = 
        }
        return null;
    }
}