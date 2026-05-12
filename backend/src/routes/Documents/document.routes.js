const router = require("express").Router();

const { 
   uploadDocument,
   getDocuments,
   getDocumentsById,
   updateDocument,
   deleteDocument
     } = require("../../controllers/Document/document.controller");

const { protect } = require("../../middleware/auth.middleware");
const  authorize  = require("../../middleware/roles");
const upload = require("../../middleware/upload.middleware");


//====================== 
//  UPLOAD  DOCUMENTS   
//====================

router.post(
  "/upload",
  protect,
  upload.single("file"),  
  uploadDocument
);

  //====================== 
//  GET DOCUMENTS         
//====================== 
router.get(
   "/",
   protect,
   authorize
    (
   "user", 
   "admin", 
   "legal"
    ),
   getDocuments
);

router.get(
  "/source",
  protect,
  require("../../controllers/Document/document.controller").getSourceDocument
);

//======================
//  GET DOCUMENT BY ID 
//==================== 
router.get(
  "/:id",
  protect,
  getDocumentsById
);

router.get(
  "/:id/content",
  protect,
  require("../../controllers/Document/document.controller").getDocumentContent
);
   //==================== 
//  UPDATE DOCUMENT    
//==================== 
router.put(
  "/:id",
   protect,
    authorize("admin"),
     updateDocument
    );

  //==================== 
//  DELETE  DOCUMENT    
//=================== 
router.delete(
  "/:id",
   protect,
    authorize("user", "admin"),
     deleteDocument
    );

module.exports = router;