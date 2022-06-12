const express = require('express')
const path = require("path")
const fs = require('fs')
const multer = require('multer')
const cors = require('cors')
const { verifyToken } = require('./middleware')

require('dotenv').config()
const upload = multer({ dest: "uploads/" })
const app = express()
app.use(cors())
const port = process.env.SERVER_PORT

app.post('/profile-picture', verifyToken, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded with ajax request')
    }

    fileUpload([req.file], req.user, res, 'profile-picture')
})

app.post('/media', verifyToken, upload.array('file'), (req, res) => {
    if (!req.files) {
        return res.status(400).send('No file(s) uploaded with ajax request')
    }

    fileUpload(req.files, req.user, res, 'media')
})

const fileUpload = (files = [], user, res, dir) => {
    const parentDir = `./uploads/${user.userId}/${dir}`

    if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true, })
    }

    const responseList = []

    files.forEach(file => {
        const filePath = `${parentDir}/${file.filename}${path.extname(file.originalname)}`
        const tempPath = file.path
        const targetPath = path.join(__dirname, filePath)
        const localPath = `/${dir}/${file.filename}${path.extname(file.originalname)}`

        try {
            fs.renameSync(tempPath, targetPath)
            responseList.push({ message: 'File uploaded successfully', path: localPath })
        } catch (e) {
            console.error(e)
            responseList.push({ message: 'File upload failed', path: localPath })
        }
    })
    
    res.status(200).json(responseList)
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => console.log(`Server listening on port ${port}`))