const db = require('../models');
const { sequelize } = db
const { cache } = sequelize.models


const getValueByKey = async (req, res) => {

    try {

        const { key } = req.params

        const result = await cache.findByPk(key)

        if(!result) return res.status(404).json({"error message" : "value not found"})

        return res.status(200).json({
            cache : {
                key: result.key,
                value: result.value,
            }
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({"error message" : "internal server error"})
    }

}

const saveCache = async (req, res) => {

    try{
            const { key, value } = req.body

            if(!key || !value) return res.status(400).json({"error message" : "key and value are required fields"})

            // check if database has less than 10 cache
            const count = await cache.count()
            if(count >= 10) return res.status(400).json({"error message" : "No more than 10 cache available"})

            // check if key already exists
            const existingCache = await cache.findOne({where : {key : key}})
            if(existingCache) return res.status(400).json({"error message" : "key already present"})

            const result = await cache.create({key, value})

            return res.status(201).json({
                "message":"created cache successfully",
                "cache":result
            })


    }catch(err){
        console.error(err)
        return res.status(500).json({"error message" : "internal server error"})
    }

}

const deleteCache = async(req,res) => {

    try {

        const { key } = req.params

        if(!key) return res.status(404).json({"error message" : "key not provided"})

        const res_cache = await cache.findByPk(key)

        if(!res_cache) return res.status(404).json({"error message" : "key not found"})

        await res_cache.destroy()

        return res.status(200).json({
            "message" : "deleted successfully"
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({"error message" : "internal server error"})
    }

}

module.exports = { getValueByKey, saveCache , deleteCache}