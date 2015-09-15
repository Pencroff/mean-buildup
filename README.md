# MEAN BuildUP
MEAN back-end for [Angular BuildUp](http://angularbuildup.com/)

## API

### Public

### Auth

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


