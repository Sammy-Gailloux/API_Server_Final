const Repository = require('./repository');

module.exports = class NewsRepo extends Repository{
    constructor(req){
        super("News", true);
        this.req = req;
    }
}