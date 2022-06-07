import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post';
export default class PetsController {
    public async addPosts({request,auth,response}:HttpContextContract){
        // return response.redirect('/hello')
        const validationSchema = schema.create({
            title:schema.string({trim:true},[
                rules.maxLength(255)
            ]),
            description:schema.string({trim:true}),
        })
        const user = auth.user?.id;
        const validateData = await request.validate({
            schema:validationSchema,
            messages:{
                'title.required':'title is Required',
                'title.maxLength':'Title are not allowed more than 255 character',
                'description.required':'Description is Required',
                'userId.required':'You May login again'
            }
        })
            // Database
            // .table('posts')
            // .insert({
            //     title: validateData.title,
            //     email: validateData.description,
            //     user_id:user
            // })
        await Post.create({
            // title:"bela purobar age",
            title:validateData.title,
            description:validateData.description,
            // description:'hello dkfsaldfls',
            userId:user
        })
        return response.redirect('back')

    }
    public async allPosts({view}){
        let allPosts = await Post.all()
        return view.render('allPosts',{
            allPosts
        })
    }
    public async addPost({auth,view}:HttpContextContract){
        let posts = await Post.query().where('userId',auth.user?.id)
        // let posts = await Post.all()
        return view.render('addPosts',{
            posts: posts
        })
    }
    public async index(){
        return 'Get pets'
    }
    public async login({auth,view}:HttpContextContract){
        if(auth.isLoggedIn){
            return view.render('/home')
        }else{
            return view.render('login')
        }
    }
    public async register({auth,view}:HttpContextContract){
        if(auth.isLoggedIn){
            return view.render('/home')
        }else{
            return view.render('welcome')
        }
    }
}
