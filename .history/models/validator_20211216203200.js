module.exports =
    class Validator {
        constructor() {
            this.fields = [];
        }

        addField(name, type) {
            this.fields.push({ name: name, type: type });
        }

        valueValid(value, type) {
            if (value !== null) {
                switch (type) {
                    case "string": return value != "";
                    case "date": return ^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$
                    case "integer": return parseInt(value) != NaN;
                    case "float": return parseFloat(value) != NaN;
                    case "boolean": return value === false || value === true;
                    case "email": return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
                    case "url": return /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(value);
                    default:
                        return false;
                }
            }
            return false;
        }

        test(objectInstance) {
            let oneIsWrong = false;
            this.fields.forEach(field => {
                if (!(field.name in objectInstance)) {
                    oneIsWrong = true;
                } else {
                    if (!this.valueValid(objectInstance[field.name], field.type))
                        oneIsWrong = true;
                }
            });
            return !oneIsWrong;
        }
    }