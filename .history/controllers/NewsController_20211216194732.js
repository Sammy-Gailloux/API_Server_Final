const NewsRepo = require("../models/newsRepo");
module.exports = class NewsController extends require("./Controller"){
    constructor(req, res, params){
        super(req, res, params, false);
        this.newsRepo = new NewsRepo(req);
    }
    get(id){}
}