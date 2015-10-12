# MEAN BuildUP
MEAN back-end for [Angular BuildUp](http://angularbuildup.com/)

## Setup

* Setup [VS2015](https://www.visualstudio.com/products/visual-studio-community-vs) community edition - it needs for rebuilding mongodb drivers
* Setup [node.js](https://nodejs.org/en/)
* Setup [Git](https://git-scm.com/downloads)
* Clone git repo [mean-buildup](https://github.com/Pencroff/mean-buildup) by command
```
    git clone https://github.com/Pencroff/mean-buildup.git
```
* Open folder with project in command line or just continue in **cmd**
```
    cd mean-buildup
```
* Run `npm i` for installing all dependencies
* Setup `mongoConf` in `./config/main.config.js`
* Run `node server` for local server
* Enjoy Angular development :)

## API

### Public

We have two models: `room`, `booking`.
Each of them has API like `GET /public/booking` or `PUT /public/booking/55f726cd04a9738412e8db5c`.
More details see below:

* `GET /public/:model/` - list of all entities in collection
* `GET /public/:model/:id` - get entity by id
* `POST /public/booking` - create new `booking`, all details should be in request `body`

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

### Query syntax

Current project support query syntax for all requests for collections such as `GET /protected/:model/` and `GET /public/:model/`.
For example:
```
    /public/room?doubleBed=true                     - will ask all rooms with double bed
    /public/room?doubleBed=true&standard=premium    - double bed "premium" standard
```
Also it's possible to use more complex requests with `where`, `orderBy`, `offset` and `limit` clauses.
More details please read in the original docs [js-data.io/query-syntax](http://www.js-data.io/docs/query-syntax)
