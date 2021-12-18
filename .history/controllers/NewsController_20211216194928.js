const NewsRepo = require("../models/newsRepo");
module.exports = class NewsController extends require("./Controller"){
    constructor(req, res, params){
        super(req, res, params, false);
        this.newsRepo = new NewsRepo(req);
    }
    get(id){
        // if we have no parameter, expose the list of possible query strings
        if (this.params === null) { 
            if(!isNaN(id)) {
                this.response.JSON(this.imagesRepository.get(id));
            }
            else  
                this.response.JSON( this.imagesRepository.getAll(), 
                                    this.imagesRepository.ETag);
        }
        else {
            if (Object.keys(this.params).length === 0) /* ? only */{
                this.queryStringHelp();
            } else {
                this.response.JSON(this.imagesRepository.getAll(this.params), this.imagesRepository.ETag);
            }
        }
    }
}