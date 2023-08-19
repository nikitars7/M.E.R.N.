import {body} from 'express-validator';

export const registerValidation = [
   body('email','Invalid email').isEmail(),
   body('password','Password must be at least 5 symbols').isLength({min:5}),
   body('fullName','Enter your Name').isLength({min:3}),
   body('avatarUrl','Invalid URL').optional().isURL(),
]
export const loginValidation = [
   body('email','Invalid email').isEmail(),
   body('password','Password must be at least 5 symbols').isLength({min:5}),
]
export const postCreateValidation = [
   body('title','Log title of the post').isLength({min:3}).isString(),
   body('text','Write text of post').isLength({min:10}).isString(),
   body('tags','Invalid type of tags ').optional().isString(),
   body('imageUrl','Invalid URL to image').optional().isString(),
]