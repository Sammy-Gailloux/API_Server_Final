const Repository = require('./repository');
const utilities = require("../utilities");

module.exports = class NewsRepo extends Repository{
    constructor(req){
        super("News", true);
        this.req = req;
    }
    add(news) {
        news["Created"] = utilities.nowInSeconds();
        if (){
        }
        return null;
    }
}