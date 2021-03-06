const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Image, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { multiplePublicFileUpload, multipleMulterUpload } = require('../../awsS3');

const router = express.Router();


///Validator

// const validateImage = [
//   check('imageUrl')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide an image URL.')
//     .isLength({max:255})
//     .withMessage('Max length for url link is 255 characters.')
//     .custom(val => {
//       const checker1 = val.slice(val.length-4, val.length)
//       const checker2 = val.slice(val.length-5, val.length)

//       if(checker1 === '.jpg') return true
//       if(checker1 === '.png') return true
//       if(checker2 === '.webp') return true
//       if(checker2 === '.jpeg') return true

//       else {
//       return false
//       }
//    })
//    .withMessage('Please provide a valid image url. Image urls must end with .jpg, .jpeg, .png, or .webp. '),
//   check('content')
//     .isLength({min:0, max:150})
//     .withMessage('Max length for Description is 150 characters.'),
//   handleValidationErrors
// ];
const validateDescription = [
  check('content')
    .isLength({min:0, max:150})
    .withMessage('Max length for Description is 150 characters.'),
  handleValidationErrors
];
const validateTitle = [
  check('title')
    .isLength({min:0, max:30})
    .withMessage('Max length for a Title is 30 characters'),
  handleValidationErrors
];

//get comments

router.get('/',
            asyncHandler(async (req, res)=>{

                const images = await Image.findAll({
                order: [
                    ["createdAt", "DESC"],
                  ],
                  include: 'User'
                })

                res.json(images)
            }))

router.get('/:imageId',
            asyncHandler(async (req, res)=>{
              const {imageId} = req.params;
                const image = await Image.findAll({
               where:{id:imageId},
               include: 'User'
                })

                res.json(image)
            }))

router.get('/:imageId/comments',
            asyncHandler(async (req, res)=>{
                const {imageId} = req.params;
                const comments = await Comment.findAll({
                where:
                {imageId},
                order: [
                    ["createdAt", "DESC"],
                  ],
                  include: 'User'
                })

                res.json(comments)
            }))

// Upload

router.post(
    '/upload',
    multipleMulterUpload('images'),
    // validateDescription,
    asyncHandler(async (req, res) => {
      const {  userId  } = req.body;

      const imageUrls = await multiplePublicFileUpload(req.files)

      const newImages = []
      imageUrls.forEach(async(imageUrl)=> {
        const newImage = await Image.create({ imageUrl, userId });
        newImages.push(newImage)
      })


      res.json(newImages)
    }),
  );

router.put(
    '/:imageId',
    requireAuth,
    validateDescription,
    validateTitle,
    asyncHandler(async (req, res) => {
      const { content, title  } = req.body;
      const {imageId} = req.params
      const image = await Image.findByPk(+imageId, {include:'User'})

      const updated = await image.update({ content, title });

        res.json(updated)
    }),
  );

  //Delete
router.delete(
    '/:imageId',
    asyncHandler(async (req, res) => {
      const {imageId} = req.params



      await Image.destroy({where:{
        id:imageId
      }});
      res.json("Success")
    }),
  );
module.exports = router;
