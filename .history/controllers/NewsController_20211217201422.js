const NewsRepo = require("../models/newsRepository.js");
module.exports = class NewsController extends require("./Controller"){
    constructor(req, res, params){
        super(req, res, params, false);
        this.newsRepo = new NewsRepo(req);
    }
    get(id){
        if (this.params === null) { 
            if(!isNaN(id)) {
                this.response.JSON(this.imagesRepository.get(id));
            }
            else  
                this.response.JSON( this.imagesRepository.getAll(), 
                                    this.imagesRepository.ETag);
        }
        else {
            if (Object.keys(this.params).length === 0){
                this.queryStringHelp();
            } else {
                this.response.JSON(this.imagesRepository.getAll(this.params), this.imagesRepository.ETag);
            }
        }
    }
    post(news){  
        if (this.requestActionAuthorized()) {
            let newImage = this.imagesRepository.add(news);
            if (newImage)
                this.response.created(newImage);
            else
                this.response.unprocessable();
        } else 
            this.response.unAuthorized();
    }
    put(news){
        if (this.requestActionAuthorized()) {
            if (this.imagesRepository.update(news))
                this.response.ok();
            else
                this.response.unprocessable();
        } else
            this.response.unAuthorized();
    }
    remove(id){
        if (this.requestActionAuthorized()) {
            if (this.imagesRepository.remove(id))
                this.response.accepted();
            else
                this.response.notFound();
        } else
            this.response.unAuthorized();
    }
}