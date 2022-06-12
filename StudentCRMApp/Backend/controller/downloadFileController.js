/*
  This function to download the attchment file
  Parameter: 
  Body:
    fileName : file name
    filePath : file path
  Output: downloadable data
  
*/


// download file module
download = async (req, res) => {
  const fileName = req.body.fileName; // getting file name with extension
  const filePath = req.body.filePath; // getting file path with extension
  const directoryPath = filePath;
    res.download(directoryPath, fileName, (err) => { // downloading the the file data
      if (err) { 
        res.status(500).send({ // o error returning value
          message: "Could not download the file. " + err,
        });
      }
    });
  };

// exporting createNotes module
module.exports = download;
