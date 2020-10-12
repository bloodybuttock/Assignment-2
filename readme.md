# Townhall war game App

This is a multiplayer RTS war game app, user can sign up using their email, every player will have 1 townhall and some resources. Player can train soldiers to attack the other player in game.This app has:

- RESTful endpoint for asset's CRUD operation with JSON formatted request & response

- JWT_SECRET

# Endpoints

## Global Response

#### Response (409 - ALREADY_EXIST)

> This error describes user entered something which is unique and already in database

```json
{
    "message": "Already exist"
}
```

#### Response (500 - MONGOOSE_ERROR)

> This error describes database error

```json
{
    "message": "mongoose error"
}
```

#### Response (401 - LOGIN_FAIL)

> This error describes user entered wrong email & password combination

```json
{
    "message": "Email & password combination not found"
}
```

#### Response (401 - MISSING_TOKEN)

> This error describes current user doesn't have required token

```json
{
    "message": "Missing access token"
}
```

#### Response (401 - INVALID_TOKEN)

> This error describes current user entered wrong token

```json
{
    "message": "Invalid access token"
}
```

#### Response (404 - NOT_FOUND)

> This error describes user entered email & password combination which is not exist

```json
{
    "message": "Email and Password combination not found"
}
```

#### Response (404 - NOT_ENOUGH)

> This error describes user doesn't have enough requirement to execute an order

```json
{
    "message": "Resource not enough"
}
```

#### Response (403 - FORBIDDEN)

> This error describes user doesn't have authorization

```json
{
    "message": "No access"
}
```

#### Response (403 - USER_INVULNERABLE)

> This error describes user cannot execute the order because of system exception

```json
{
    "message": "this user have less than 50 soldiers OR you entered zero?!"
}
```

#### Response (500 - Internal server error)

> This error describes server errors and undefined errors

```json
{
    "message": "Internal server error!"
}
```

## USER

<POST/users/signup> Create new User
#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |
| email    | String | unique        |   True   |
| password | String | :------------ |   True   |
| townhall | String | :------------ | :------: |

_Example:_

```json
{
    "townhall":"usertown"
    "email": "user@example.com",
    "password": "password",
}
```

#### Response (201 - Created)

{
  "success": true,
  "data": {
    "_id": "5f833b8e645c3c0cbc1768e8",
    "townhall": "usertown",
    "medals": 0,
    "email": "user@example.com",
    "resources": {
      "golds": 100,
      "foods": 100,
      "soldiers": 0
    }
  }
}

#### Response (500 - Internal server error)

{
  "success": false,
  "message": "Internal server error"
}

<POST/users/signin> Login User
#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |
| email    | String | unique        |   True   |
| password | String | :------------ |   True   |


_Example:_

```json
{
    "email": "user@example.com",
    "password": "password",
}
```

#### Response (200 - OK)

{
  "success": true,
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjgzM2E0OTY0NWMzYzBjYmMxNzY4ZTUiLCJpYXQiOjE2MDI0MzYyNDN9.qI6p2GD9q8o4II0MHsdn62FQE5DaNj3fGokxkto_cGY"
}

#### Response (500 - Internal server error)

{
  "success": false,
  "message": "Internal server error"
}


<GET/users/:id> getting User account information

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |
| email    | String | unique        |   True   |
| password | String | :------------ |   True   |


_Example:_

```json
{
    access_token:{access token} req.headers
    "email": "user@example.com",
    "password": "password",
}
```

#### Response (200 - OK)

{
  "success": true,
  "townhall": "Monkey of valor",
  "medals": 17,
  "resources": {
    "golds": 548,
    "foods": 695,
    "soldiers": 500
  }
}

#### Response (500 - Internal server error)

{
  "success": false,
  "message": "Internal server error"
}

<PUT/users/:id> renaming Townhall

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |
| townhall | String | :------------ |   True   |


_Example:_

```json
{
    access_token:{access token} req.headers
    "message": "Monkey of valor"
}
```

#### Response (200 - OK)

{
  "success": true,
  "message": "Townhall name has successfully changed",
  "data": "Monkey of valor"
}

## MARKET

<GET/markets/> get all market list

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": [
    {
      "marketName": "Manchester City Sucks",
      "lastCollected": 1602422447295,
      "_id": "5f830624ebc1c05ab4272b48",
      "_userId": "5f8303614a6cee24f85063c4",
      "__v": 0
    }
  ]
}

<POST/markets/> create new market

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |
|marketNAme| String | :------------ | :------: |



_Example:_

```json
{
    access_token:{access token} req.headers
    "marketName":"Oasis"
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": {
    "marketName": "Oasis",
    "lastCollected": 1602435386166,
    "_id": "5f8340fd645c3c0cbc1768ea",
    "_userId": "5f8303614a6cee24f85063c4",
    "__v": 0
  }
}


<GET/markets/:id> get market detail by id

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": {
    "_id": "5f830624ebc1c05ab4272b48",
    "marketName": "Manchester City Sucks",
    "lastCollected": 1602422447295
  }
}

<PUT/markets/:id> renaming the market

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": {
    "marketName": "Manchester City Sucks",
    "lastCollected": 1602422447295,
    "_id": "5f830624ebc1c05ab4272b48",
    "_userId": "5f8303614a6cee24f85063c4",
    "__v": 0
  }
}

<DELETE/markets/:id> delete certain market

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
}

<GET/markets/:id/colect> collect resources of certain market

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)


{
  "success": true,
  "message": "20 golds has been added to your resources"
}





## FARM

<GET/farms/> get all farm list

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": [
    {
      "farmName": "Manchester City Sucks",
      "lastCollected": 1602422447295,
      "_id": "5f830624ebc1c05ab4272b48",
      "_userId": "5f8303614a6cee24f85063c4",
      "__v": 0
    }
  ]
}

<POST/farms/> create new farm

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |
|marketNAme| String | :------------ | :------: |



_Example:_

```json
{
    access_token:{access token} req.headers
    "farmName":"Oasis"
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": {
    "farmName": "Oasis",
    "lastCollected": 1602435386166,
    "_id": "5f8340fd645c3c0cbc1768ea",
    "_userId": "5f8303614a6cee24f85063c4",
    "__v": 0
  }
}


<GET/farms/:id> get farm detail by id

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": {
    "_id": "5f830624ebc1c05ab4272b48",
    "farmName": "Manchester City Sucks",
    "lastCollected": 1602422447295
  }
}

<PUT/farms/:id> renaming the farm

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": {
    "farmName": "Manchester City Sucks",
    "lastCollected": 1602422447295,
    "_id": "5f830624ebc1c05ab4272b48",
    "_userId": "5f8303614a6cee24f85063c4",
    "__v": 0
  }
}

<DELETE/farms/:id> delete certain market

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
}

<GET/farms/:id/colect> collect resources of certain market

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)


{
  "success": true,
  "message": "20 foods has been added to your resources"
}



## BARRACK

<GET/barracks/> get all barrack list

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": [
    {
      "barrackName": "Manchester City Sucks",
      "lastCollected": 1602422447295,
      "_id": "5f830624ebc1c05ab4272b48",
      "_userId": "5f8303614a6cee24f85063c4",
      "__v": 0
    }
  ]
}

<POST/barracks/> create new barrack

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |
|marketNAme| String | :------------ | :------: |



_Example:_

```json
{
    access_token:{access token} req.headers
    "barrackName":"Oasis"
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": {
    "barrackName": "Oasis",
    "lastCollected": 1602435386166,
    "_id": "5f8340fd645c3c0cbc1768ea",
    "_userId": "5f8303614a6cee24f85063c4",
    "__v": 0
  }
}


<GET/barracks/:id> get barrack detail by id

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": {
    "_id": "5f830624ebc1c05ab4272b48",
    "barrackName": "Manchester City Sucks",
    "lastCollected": 1602422447295
  }
}

<PUT/barracks/:id> renaming the barrack

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
  "data": {
    "barrackName": "Manchester City Sucks",
    "lastCollected": 1602422447295,
    "_id": "5f830624ebc1c05ab4272b48",
    "_userId": "5f8303614a6cee24f85063c4",
    "__v": 0
  }
}

<DELETE/barracks/:id> delete certain barrack

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
}

<GET/barracks/:id/colect> train soldier of certain barrack

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)


{
  "success": true,
  "message": "10 soldiers has been trained"
}



## ATTACK

<POST/attack/:id> collect resources of certain market

#### Request body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |



_Example:_

```json
{
    {id} req.params.id (enemy id)
    access_token:{access token} req.headers
}
```

#### Response (200 - OK)

{
  "success": true,
  "message": "attack Success"
}

#### Response (200 - OK)

{
  "success": true,
  "message": "attack Fail"
}

#### Response (403 - USER_INVULNERABLE)

{
  "success": false,
  "message": "this user have less than 50 soldiers OR you entered zero?!"
}
