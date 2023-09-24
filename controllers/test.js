const {request, response} = require('express')

const testing = (req = request, res =response) => {
    const {msj, msj2 } =req.query
    return res.json({
        msj: `${msj} ${msj2}`
    })
}

module.exports = { testing }