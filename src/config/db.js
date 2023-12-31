const mongoose = require('mongoose');

const connect = async (req, res) => { 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true, useUnifiedTopology: true
        })

        console.log(`MongoDb Connected to ${conn.connection.host}`)
        
    } catch (error) {
        console.log(`MongoDb Error: ${error}`)
        process.exit(1);
    }
}

module.exports = connect;