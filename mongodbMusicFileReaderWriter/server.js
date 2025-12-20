const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
require('dotenv').config();
const { GridFsStorage } = require('multer-gridfs-storage');
const { Readable } = require('stream');
const path = require('path');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS; 

//const port = process.env.PORT || 5000;
console.log('port=' + port);
console.log('uri' + uri); 


// Connect to MongoDB
/* mongoose.connect('mongodb://localhost/music-files', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/ 

mongoose.connect(uri); 
const connection = mongoose.connection; 
connection.once('open', ()  => {
    console.log("MongoDB database connection established successfully"); 
}); 
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*  
 const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
*/ 
// GridFS storage
const storage = new GridFsStorage({
  //url: 'mongodb://localhost/music-files',
  url: uri + '/music-files', 
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'musicFiles',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// File upload route
app.post('/upload', upload.single('music'), (req, res) => {
  res.sendStatus(200);
});

// File download route
app.get('/music/:id', (req, res) => {
  const id = req.params.id;

  const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'musicFiles',
  });

  gfs.find({ _id: mongoose.Types.ObjectId(id) }).toArray((err, files) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else if (!files || files.length === 0) {
      res.sendStatus(404);
    } else {
      const readStream = gfs.openDownloadStream(files[0]._id);
      readStream.pipe(res);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
