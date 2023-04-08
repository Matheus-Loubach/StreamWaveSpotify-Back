const mongoose = require("mongoose")

async function main() {
    mongoose.set("strictQuery", true)

    await mongoose.connect('mongodb+srv://matheusloubach:bvGRGQBh4L4NYDFi@cluster0.1caspup.mongodb.net/?retryWrites=true&w=majority');
    console.log("Banco Conectado", mongoose.connection.host);

}


module.exports = main