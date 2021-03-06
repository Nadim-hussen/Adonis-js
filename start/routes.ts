/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/hello','PetsController.index');
  Route.get('/home',async({view})=>{
    return view.render('home')
  })
  // Route.get('/addPosts', async({view})=>{
  //   return view.render('addPosts')
  // })
  Route.get('/allPosts','PetsController.allPosts')
  Route.get('/addPosts','PetsController.addPost')
  Route.post('/addPosts','PetsController.addPosts')
  Route.post('/logout','UsersController.logout')
}).middleware('auth')


Route.group(() => {
  Route.get('/','PetsController.register')
  Route.get('/login','PetsController.login')
}).middleware('guest')

Route.post('/addUsers','UsersController.addUser');
Route.post('/login','UsersController.login')

// Route.get('/hello',async ()=>{
//   return 'hello world';
// })
// Route.get('/about',async ()=>{
//   return 'hello about';
// })