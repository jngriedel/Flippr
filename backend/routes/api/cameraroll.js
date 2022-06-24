const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


///Validator

// const validateImage = [
//   check('imageUrl')
//     .exists({ checkFalsy: true })
//     .withMessage('Please provide an image URL.'),
//   handleValidationErrors
// ];

// Upload


  //Delete
router.get(
    '/',
    asyncHandler(async (req, res) => {
      const {userId} = req.body
      const usersImages = await Image.findAll({where:{
        userId
      }});
      res.json(usersImages)
    }),
  );
module.exports = router;
