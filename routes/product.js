const express = require('express');
const puppeteer = require('puppeteer-extra');
const _ = require('lodash');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const router = express.Router();
const SearchOrder = require('../model/order');
const Product = require('../model/product');

const changeOrderStatus = (soId, status) => {
    return new Promise((resolve, reject) => {
        SearchOrder.findByIdAndUpdate(soId, {orderStatus: status}, {
            new: true
        }, (err, searchOrder) => {
            if (err) reject({ok: false});
            resolve(searchOrder);
        });
    });
};

//GET PRODUCT LIST
router.post('/', (req, res, next) => {
    let body = req.body;
    console.log(body.searchOrder);
    let oFindCriteria = {
        searchOrder: body.searchOrder
    };
    Product.find(oFindCriteria, (err, products) => {
        if (err) return res.status(400).json({ok: false, err});
        res.json({
            ok: true,
            products,
        });
    });
});
//
router.post('/saveProducts', (req, res, next) => {
    let body = req.body;
    let query = body.query;
    let searchOrder = body.searchOrder;
    puppeteer.launch({
        'args' : [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    })
        .then(async browser => {
            const page = await browser.newPage();
            await page.goto(`https://www.easy.com.ar/tienda/es/easyar/mi-easy/busqueda-inteligente?searchterm=${query}`);
            await page.waitForSelector('.bdw-item-data');
            const data = await page.evaluate(() => {
                let dataP = [];
                let products = document.body.querySelectorAll(".bdw-item-holder");
                products.forEach(el => {
                    dataP.push({
                        productTitle: el.querySelector(".bdw-item-descripcion p").innerText,
                        price: el.querySelector(".bdw-item-price").innerText,
                    })
                });
                return dataP
            });
            console.log(data);
            await browser.close();
            if (data.length > 0) {
                data.forEach(e => e.searchOrder = searchOrder);
                Product.insertMany(data, (err, docs) => {
                    if (err) {
                        return res.status(400).json({ok: false, err});
                    } else {
                        changeOrderStatus(searchOrder, "fulfilled").then(() => {
                            res.json({
                                ok: true,
                                docs
                            });
                        }).catch(() => {
                            res.json({
                                ok: false,
                                msg: "error saving status"
                            })
                        });
                    }
                })
            }
        })
        .catch((error) => {
            changeOrderStatus(searchOrder, "failed").then((data) => {
                res.json({dataDB: data, errorCause:error});
            }).catch((e) => {
                res.json({ok: false, msg: "error changin status"});
            });
        });

});

router.post('/checkProduct', (req, res, next) => {
    let body = req.body;
    let status = body.status;
    let searchOrder = body.searchOrder;
    changeOrderStatus(searchOrder, status).then((data) => {
        res.json({dataDB: data});
    }).catch((e) => {
        res.json({ok: false, msg: "error changin status"});
    });
});

/*  We need to first to make a post to ensure that we have data. */
router.post('/search', (req, res, next) => {
    let body = req.body;
    let order = new SearchOrder({
        query: body.query,
        provider: body.provider,
        options: {
            username: "Hector",
            password: "1234"
        },
        orderStatus: "received",
        callbackUrl: `${process.env.URLEndpoint}/results`,
        date: new Date(),
        user: body.userId
    });
    order.save((err, orderDB) => {
        if (err) return res.status(400).json({ok: false, err});
        res.json({
            ok: true,
            orderDB
        });
    });
});

router.get('/search-order/:query_string',  (req, res, next)  => {
    let sQueryString = req.params.query_string;
    SearchOrder.find({_id:sQueryString})
        .exec((err, SOs) => {
            if (err) return res.status(500).json({ ok: false, err });
            res.json({
                ok: true,
                SOs
            });
        });
});

/* GET users listing. */
router.post('/search-orders',  (req, res, next) => {
    let body = req.body;
    let oFindCriteria = {
        user: body.userId
    };
    SearchOrder.find(oFindCriteria, (err, searchOrders) => {
        if (err) return res.status(400).json({ok: false, err});
        res.json({
            ok: true,
            searchOrders,
        });
    });
});

module.exports = router;
