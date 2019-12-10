const express = require('express')
const Dataset = require('../models/dataset')
const router = new express.Router()
const stream=require('stream')
var path = require('path')

router.get('/download/:id', async(req, res) => {
    try {
        const dataset = await Dataset.findById(req.params.id)
        var fileContents = Buffer.from(dataset.file.data, "base64");
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);
        res.set('Content-disposition', 'attachment; filename=' + dataset.file.filename);
        res.set('Content-Type', dataset.file.filetype);
        readStream.pipe(res);
    } catch (e) {
        console.log(e)
        res.status(404).send(e)
    }
})
router.get('/', async(req, res) => {
    try {
        const datasets = await Dataset.find({})
        res.render('pages/dataset/index', { data: datasets })

    } catch (e) {
        res.status(400).send(e.errmsg)
    }
})
router.get('/add', async (req, res) => {
    res.render('pages/dataset/add')
})

router.post('/add', async (req, res) => {

    try {
        const dataset = new Dataset(req.body)
        dataset.ArtifactSize = Math.round(req.files.uploadedfile.size / 1024)
        dataset.file.filetype = req.files.uploadedfile.mimetype
        dataset.file.data = req.files.uploadedfile.data
        dataset.file.filename = dataset.name + path.extname(req.files.uploadedfile.name)
        await dataset.save()
        res.redirect('/')
    } catch (e) {
        res.status(400).send(e.errmsg)
    }
   
})

router.post('/filter', async (req, res) => {
   
    try {
        const datasets = await Dataset.find({})
        var query = Dataset.find();

        for (var fieldName in req.body) {
            if ((fieldName === 'OracleSize') || (fieldName === 'ArtifactSize')) {
            }
            else {
                query.where(fieldName).in(req.body[fieldName]);
            }
                        
                    
        }
        query.exec(function (err, data) {

            res.render('pages/dataset/index', { data: data })
        });
    } catch (e) {
        res.status(400).send(e.errmsg)
    }
})

module.exports = router