const mongoose = require("mongoose")

async function main() {
    mongoose.set("strictQuery", true)

    await mongoose.connect('mongodb+srv://matheusloubach:oiXfk4exodUsLv5g@cluster0.n3t9mbk.mongodb.net/?retryWrites=true&w=majority');
    console.log("Banco Conectado", mongoose.connection.host);

}


module.exports = main