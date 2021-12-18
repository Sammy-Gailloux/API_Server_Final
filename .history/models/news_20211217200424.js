module.exports = 
class News{
    constructor(title, description, created, userId, GUID)
    {
        this.Id = 0;
        this.Title = title !== undefined ? title : "";
        this.Description = description !== undefined ? description : "";
        this.Created = created !== undefined ? created : 0;
        this.UserId = userId !== undefined ? userId : 0;
        this.GUID = GUID !== undefined ? GUID : "";
    }

    static valid(instance) {
        const Validator = new require('./validator');
        let validator = new Validator();
        validator.addField('Id','integer');
        validator.addField('Title','string');
        validator.addField('Description','string');
        validator.addField('UserId', 'integer');
        validator.addField('Created','integer');
        return validator.test(instance);
    }
}