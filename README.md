# Van Swap - get off the beaten track

<br>

## Description

This is an app to match camper van owners with each other to swap vans so that they can holiday for free in places they cannot drive to.


# Server / Backend


## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  about: {type: String, required: true},
  img: {type: String},
  vans: [{type: Schema.Types.ObjectId, ref:'Van']
}
```



Van model

```javascript
 {
   make: {type: String, required: true},
   model: {type: String, required: true},
   year: {type: Number, required: true},
   img: [{type: String}],
   location: {type: String, required: true},
   about: {type: String, required: true},
   owner:{type: Schema.Types.ObjectId,ref:'User'}
 }
```



Swap Request model

```javascript
{
  user: {type: Schema.Types.ObjectId, ref:'User', required: true},
  van: {type: Schema.Types.ObjectId, ref:'Van', required: true},
  dates: {type: String, required: true},
  additionalInfo: {type: String, required: true},
  accepted?: {type: Boolean}
}
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user  |
| PUT         | `/auth/profile/edit/:id`      | {username, email, password, about, img}|200   |400           | edit profile |
| DELETE      | `/auth/profile/delete/:id`    | {id}                         | 210            |400           | delete profile |
| GET         | `/allvans    `                |                              |                | 400          | Show all vans     |                                 
| GET         | `/vans/:id`                   | {id}                         |                |              | Show specific van     |                             
| POST        | `/vans/add-van`               | {}                           | 201            | 400          | Create and save a new van   |                       
| PUT         | `/vans/edit/:id`              | {make, model, year, img, location, about}| 200| 400          | edit van       |                                    
| DELETE      | `/vans/delete/:id`            | {id}                         | 201            | 400          | delete van      |                                   
| GET         | `/vans?location`              |  {location}                  |                | 400          | show vans filtered by location   |                                        
| POST        | `/swap/add-request`           | {user, van, dates, additionalInfo}| 200       | 404          | add swap request     |                                       
| PUT         | `/swap/accept-decline/:id`    | {accepted?}                  | 201            | 400          | accept or decline swap request   |                    

<br>


## Links

### Trello/Kanban

[Van Swap Trello board](https://trello.com/b/B24pd2i8/van-swap) 


### Git

The url to your repository and to your deployed project

[Front-end repository Link](https://github.com/lynn-w-b/van-swap-front-end)

[Server repository Link](https://github.com/lynn-w-b/van-swap-back-end)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Van Swap Slides](https://docs.google.com/presentation/d/1rz0FCZhx9SKnHqKoFFHeDqkVtWUyveraPv7WBL02TyA/edit?usp=sharing)

[Wireframes](https://www.figma.com/proto/FXTohkjAiYU6iRQCw49OAq/WireFrames?node-id=1%3A3&scaling=scale-down)

