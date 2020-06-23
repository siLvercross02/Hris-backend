const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const router = express.Router();
const jwt = require('jsonwebtoken');

const urlencodedParser = bodyParser.urlencoded({extended:false});
const jsonDataParser = bodyParser.json();

const DB = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'hris',
        charset: 'utf8'
    }
});

router.get('/',jsonDataParser,(req,res,next) => {
    DB.select('*').from('tbl_employee')
    .then(result => {
        console.log(result);
        res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
    }).catch(error => {
        console.log(error)
        res.send(JSON.stringify({"status": 500, "error": 'Error', "response": null}));
    })
});

router.get('/leave_records',jsonDataParser,(req,res,next) => {
    DB.select('*').from('tbl_leave')
    .then(result => {
        console.log(result);
        res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
    }).catch(error => {
        console.log(error);
        res.send(JSON.stringify({"status": 500, "error": 'Error', "response": null}));
    });
});

router.get('/overtime_records',jsonDataParser,(req,res,next) => {
    DB.select('*').from('tbl_overtime')
    .then(result => {
        console.log(result);
        res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
    }).catch(error => {
        console.log(error);
        res.send(JSON.stringify({"status": 500, "error": 'Error', "response": null}));
    });
});
router.get('/org_records',jsonDataParser,(req,res,next) => {
    DB.select('*').from('tbl_employee').where('manager_level', 'Yes')
    .then(result => {
        console.log(result);
        res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
    }).catch(error => {
        res.send(JSON.stringify({"status": 500, "error": 'Error', "response": null}));
    });
});

router.get('/emp_leave_records/:uid',jsonDataParser,(req,res,next) => {
    let uid = req.params.uid;
    DB.select('*').from('tbl_leave').where('uid', uid).orderBy('status')
    .then(result => {
        console.log(result);
        res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
    }).catch(error => {
        res.send(JSON.stringify({"status": 500, "error": 'Error', "response": null}));
    });
});


module.exports = router;