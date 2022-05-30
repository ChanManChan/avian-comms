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
    fileUpload(req, res, 'profile-picture')
})

app.post('/media', verifyToken, upload.single('file'), (req, res) => {
    fileUpload(req, res, 'media')
})

const fileUpload = (req, res, dir) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded with ajax request')
    }
    
    const parentDir = `./uploads/${req.user.userId}/${dir}`

    if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true, })
    }

    const filePath = `${parentDir}/${req.file.filename}${path.extname(req.file.originalname)}`
    const tempPath = req.file.path
    const targetPath = path.join(__dirname, filePath)
    fs.rename(tempPath, targetPath, async error => {
        if (error != null) {
            console.error(error)
            return res.sendStatus(500)
        }
        res.status(200).json({ 
            message: 'File uploaded successfully', 
            path: `/${dir}/${req.file.filename}${path.extname(req.file.originalname)}` 
        })
    })
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => console.log(`Server listening on port ${port}`))