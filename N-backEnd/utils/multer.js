import multer from 'multer'

const storage = multer.memoryStorage() // Store file in memory instead of disk
const upload = multer({ storage: storage })

export default upload


// const storage = multer.diskStorage({    //storing 1st to the diskStorage(our provided storage which is uploads/ folder over here)
//     destination:function (req,file,cb) {
//         cb(null, 'uploads/')
//     },
//     filename : (req,file,cb)=> {
//         const name = Date.now()+'-'+file.originalname;
//         cb(null,name)
//     }
// })
// const upload = multer({storage:storage})


// export default upload
/*
    The way multer is set up right now   (userRouter.post('/signup',upload.single("image"),signUp)),
    it saves the image before the controller logic runs that is upload.single("image").
    So even if the signup fails due to an error (like an existing email), the image will still be saved, which is unnecessary and wastes storage.

//? Solution -> 
//    #Instead of saving the image first, we can store it temporarily in memory and only save it to disk if the signup is successful.
//    #2 ways to fix it :-
//      *1st way)Use Multer’s Memory Storage with 2nd way-> This keeps the file in multer- memory instead of saving it immediately . and then if there is no error then store in disk and if any error happen after storing to disk we will use 2nd option
//      *2nd way)delete the image from disk -> save the image as usual on disc and then after if any error occures then delete it from disk through controllers 


I HAVE CHOOSEN 1st method (written abouve) that is Memory Storage it is more efficient because it avoids writing unnecessary files to disk (cz image is not stored in the disk yet so if any error happens we avoided writting disk ) and also for delting case it a rare case that will be happening (that is if any error happend afte  image stroed in the disl like here for example db issues  on that time only the  disk I/o again happen that is to delete it from the disk  and that is often less  compate way 2 cz in way 2 any error happen we have do disk i/o operation ) so there for This reduces disk I/O operations , which are slower than memory operations
  [2nd Method i have used in my 1st project]
*/


