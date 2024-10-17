const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    
    if (!Database.instance) {
      mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(() => {
          console.log('MongoDB is connected ☑️');
          Database.instance = mongoose.connection; // Set the instance
        })
        .catch((error) => {
          console.log('ERROR in mongodb connection ❌:', error);
        });
    }
    return Database.instance; // Always return the instance
  }

  getConnection() {
    return Database.instance;
  }
}

module.exports = new Database();
