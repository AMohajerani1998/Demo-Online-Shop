const db = require('../data/database')
const bcrypt = require('bcrypt')

class User {
    constructor(
        email,
        password,
        fullName,
        street,
        postalCode,
        city
    ) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.street = street;
        this.postalCode = postalCode;
        this.city = city;
    };

    async saveUser(){
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const result = await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            fullName: this.fullName,
            address: {
                street: this.street,
                postalCode: this.postalCode,
                city: this.city
            }
        })
        return result;
    }

    async fetchUser(){
        const result = await db.getDb().collection('users').findOne({email: this.email})
        if (result){
            this.id = result._id;
            this.fullName = result.fullName;
            this.email = result.email;
            this.address = result.address
            this.hashedPassword = result.password;
            this.isAdmin = result.isAdmin;
            return true;
        } else {
            return false;
        }
    }

    async checkPassword(){
        const result = await bcrypt.compare(this.password, this.hashedPassword)
        if (result){
            return true;
        } else { return false }
    }
}


module.exports = User;