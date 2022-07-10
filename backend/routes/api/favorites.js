const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Favorite, Image, User } = require('../../db/models');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
///Validator


  //get favorites for user

  router.get(
    '/:userId',
    asyncHandler(async (req, res) => {
        const {userId} = req.params


      const userFavorites = await Favorite.findAll({where:{userId}});
      res.json(userFavorites)
    }),
  );



  // Upload



  router.post(
      '/',
      asyncHandler(async (req, res) => {
        const { userId, imageId} = req.body;


        const newFavorite = await Favorite.create({ userId, imageId });
        const favoriteBack = await Favorite.findByPk(newFavorite.id,{include: ['User', 'Image']})
        res.json(favoriteBack)
      }),
    );



    //Delete
  router.delete(
      '/:favoriteId',
      asyncHandler(async (req, res) => {
        const {favoriteId} = req.params



        await Favorite.destroy({where:{
          id:favoriteId
        }});
        res.json("Success")
      }),
    );
  module.exports = router;
