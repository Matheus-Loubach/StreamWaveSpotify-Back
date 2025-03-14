import mongoose from "mongoose";

async function main() {
    mongoose.set("strictQuery", true)

    await mongoose.connect('mongodb+srv://matheusloubach:fQGkrkrtRsp5c3Yu@stream.wsfyoax.mongodb.net/?retryWrites=true&w=majority');

}

export default main