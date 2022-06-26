const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


///Validator

const validateImage = [
  check('imageUrl')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an image URL.'),
  handleValidationErrors
];

// Upload

router.post(
    '/upload',
    validateImage,
    asyncHandler(async (req, res) => {
      const { imageUrl, content, userId  } = req.body;
      const newImage = await Image.create({ imageUrl, content, userId });

      res.json(newImage)
    }),
  );

router.put(
    '/:imageId',
    requireAuth,
    asyncHandler(async (req, res) => {
      const { content  } = req.body;
      const {imageId} = req.params
      const image = await Image.findByPk(+imageId)
      console.log(image)
      const updated = await image.update({ content });

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
