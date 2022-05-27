import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {schema, rules} from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User'
export default class UsersController {
    public async addUser({request,response}:HttpContextContract){
        const validationSchema = schema.create({
            username:schema.string({trim:true},[
                rules.maxLength(255)
            ]),
            age:schema.number(),
            email:schema.string({trim:true},[
                rules.unique({ table: 'users', column: 'email' }),
                rules.email(),
                rules.normalizeEmail({
                    allLowercase: true,
                    gmailRemoveDots: true,
                    gmailRemoveSubaddress: true,
                  }),
            ]),
            password:schema.string({trim:true},[
                rules.maxLength(12),
                rules.minLength(6)
            ])
        })

        const validateData = await request.validate({
            schema:validationSchema,
            messages:{
                'username.required':'Username is Required',
                'title.maxLength':'Title are not allowed more than 255 character',
                'age.required':'Age is required',
                'email.required':'Email is required',
                'email.unique':'Email Already Exist',
                'email.email':'You must provide a valid email address.',
                'password.required':'Password is required',
                'password.minLength':'Atleast 6 character are needed',
                'password.maxLength':'You can\'t wrote more than 12 character'
            }
        })
        await User.create({
            username:validateData.username,
            age:validateData.age,
            email:validateData.email,
            password:validateData.password
        })
        return response.redirect('back')

        //   const validation = await validate(request.all(), rules)
    }


    // login User
    // node ace configure @adonisjs/auth
    // https://adocasts.com/lessons/adonisjs-authentication-in-15-minutes
    public async login({request,auth,session,response}:HttpContextContract){
        const {email,password} = request.all();
        try{
            await auth.attempt(email,password)
            return response.redirect('/home')
        }catch(err){
            session.flash('notification','We could\'t verify your credentials')
            return response.redirect('back')
        }
    }

    // logout
    public async logout({auth,response}:HttpContextContract){
        await auth.logout()
        return response.redirect('/')
    }
}
