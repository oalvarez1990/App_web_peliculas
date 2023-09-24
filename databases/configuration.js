const mongoose = require('mongoose')



const mongoConn = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            
        })
        console.log('Conexión OK')

    }catch (e) {
        console.log('Error de conexión', e)
        throw new Error('Error de Conexión')
    }
}

module.exports = {mongoConn}