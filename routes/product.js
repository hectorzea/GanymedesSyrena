const express = require('express');
const router = express.Router();

/*  We need to first to make a post to ensure that we have data. */
router.get('/search-orders', (req,res,next) =>  {
    res.send('respond with a resource');
});

module.exports = router;
