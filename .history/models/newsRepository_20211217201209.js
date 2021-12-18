const Repository = require('./repository');
const ImageFilesRepository = require('./imageFilesRepository.js');
const News = require('./news.js');
const utilities = require("../utilities");
const date = require('date-and-time');
function getTime() {
    return date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
}
module.exports = 
class NewsRepository extends Repository {
    constructor(req){
        super('News', true);
        this.users = new Repository('Users');
        this.req = req;
        this.setBindExtraDataMethod(this.bindUsernameAndImageURL);
    }
    bindUsernameAndImageURL(newsImage){
        if (newsImage) {
            let user = this.users.get(newsImage.UserId);
            let username = "unknown";
            if (user !== null)
                username = user.Name;
            let bindedImage = {...newsImage};
            bindedImage["Username"] = username;
            bindedImage["Date"] = utilities.secondsToDateString(newsImage["Created"]);
            if (newsImage["GUID"] != ""){
                bindedImage["OriginalURL"] = "http://" + this.req.headers["host"] + ImageFilesRepository.getImageFileURL(newsImage["GUID"]);
                bindedImage["ThumbnailURL"] = "http://" + this.req.headers["host"] + ImageFilesRepository.getThumbnailFileURL(newsImage["GUID"]);
            } else {
                bindedImage["OriginalURL"] = "";
                bindedImage["ThumbnailURL"] = "";
            }
            return bindedImage;
        }
        return null;
    }
    add(newsImage) {
        newsImage["Created"] = utilities.nowInSeconds();//ne fonctionne pas avec getTime()
        if (News.valid(newsImage)) {
            image["GUID"] = ImageFilesRepository.storeImageData("", image["ImageData"]);
            delete image["ImageData"];
            return super.add(image);
        }
        return null;
    }
    update(newsImage) {
        newsImage["Created"] = utilities.nowInSeconds();
        if (Image.valid(newsImage)) {
            let foundImage = super.get(image.Id);
            if (foundImage != null) {
                image["GUID"] = ImageFilesRepository.storeImageData(image["GUID"], image["ImageData"]);
                delete image["ImageData"];
                return super.update(image);
            }
        }
        return false;
    }
    remove(id){
        let foundImage = super.get(id);
        if (foundImage) {
            ImageFilesRepository.removeImageFile(foundImage["GUID"]);
            return super.remove(id);
        }
        return false;
    }
}