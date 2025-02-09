var express = require('express');
var router = express.Router();
var {saveCache,getValueByKey,deleteCache} = require("../controllers/cacheControllers")

/* GET cache. */
router.get('/:key', getValueByKey );

// Save cache
router.post('/',saveCache)

// Delete cache
router.delete('/:key', deleteCache)



module.exports = router;