const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WriterSchema = new Schema({
    first_name: {type: String, required: true, maxlength:100},
    family_name: {type: String, required: true, maxlength:100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
})

//virtuals for writer full name
WriterSchema.virtual('name')
.get(() => {
    let fullName = '';
    if (this.first_name && this.family_name) {
        fullName = `${this.first_name}, ${this.family_name}`;
    }

    if (!this.first_name || !this.family_name) {
        fullName = '';
    }

    return fullName;
})

// Virtuals for writer lifespan
WriterSchema.virtual('lifespan')
.get(() => {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
})


// Virtual for author's URL
WriterSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', WriterSchema);
