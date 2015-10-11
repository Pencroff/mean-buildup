# MEAN BuildUP
MEAN back-end for [Angular BuildUp](http://angularbuildup.com/)

## Setup

* Setup [VS2015](https://www.visualstudio.com/products/visual-studio-community-vs) community edition - it needs for rebuilding mongodb drivers
* Setup [node.js](https://nodejs.org/en/)
* Setup [Git](https://git-scm.com/downloads)
* Clone git repo [mean-buildup](https://github.com/Pencroff/mean-buildup)
* Open folder with project in command line 
* Run `npm i` for installing all dependencies
* Setup `mongoConf` in `./config/main.config.js`
* Run `node server` for local server
* Enjoy Angular development :)

## API

### Public

### Auth

All requests are `POST`.

* `/login` - login user by `login` and `pasword`. Response for valid credentials

    ```javascript
        {
            name:  'user name',
            login: 'user login',
            token: 'auth token'
        }
    ```

* `/logout` - logout user with valid token
* `/verify` - verify token and get info for valid token like `name`, `login` or `expire time`

`Token` expected in `x-access-token` header, in request `body` and in url `params` and `query`

### Protected

We have two models: `room`, `booking`.
Each of them has API like `GET /protected/booking` or `PUT /protected/booking/55f726cd04a9738412e8db5c`.
More details see below:

* `GET /protected/:model/` - list of all entities in collection
* `GET /protected/:model/:id` - get entity by id
* `POST /protected/:model` - create new entity, all details should be in request `body`
* `PUT /protected/:model/:id` - update entity by id, all details should be in request `body`
* `DELETE /protected/:model/:id` - delete entity by id

## Questions

* Host page for app? - app with layout + header + js (angular)
* What actions should be in public api? - post booking + get all collections
* Check queries
* check POST and PUT in $http - ok
* populate start data 

