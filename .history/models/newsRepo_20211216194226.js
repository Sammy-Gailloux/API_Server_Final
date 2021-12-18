const Repository = require('./repository');
const utilities = require("../utilities");

module.exports = class NewsRepo extends Repository{
    constructor(req){
        super("News", true);
        this.req = req;
    }
    add(image) {
        image["Created"] = utilities.nowInSeconds();
        if (Image.valid(image)) {
            image["GUID"] = ImageFilesRepository.storeImageData("", image["ImageData"]);
            delete image["ImageData"];
            return super.add(image);
        }
        return null;
    }
}