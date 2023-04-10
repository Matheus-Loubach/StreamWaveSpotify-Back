const mongoose = require("mongoose")

async function main() {
    mongoose.set("strictQuery", true)

    await mongoose.connect('mongodb+srv://matheusloubach:fQGkrkrtRsp5c3Yu@stream.wsfyoax.mongodb.net/?retryWrites=true&w=majority');
    console.log("Banco Conectado", mongoose.connection.host);

}


module.exports = main