import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PetsController {
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
