# AUTH ROUTES

## **REGISTER**
### **Registers a user**

*Method Url:* `/api/auth/register`


*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`     | String | Yes      | Must be unique           |
| `email`        | String | Yes      | Must be unique           |
| `password`     | String | Yes      |                          |
| `img_url`      | String | No       | Must be unique           |

*example:*

```
{
  username: "lauren",
  password: "password123",
  email: "lauren@email.com",
  img_url: "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg" 
}
```

#### Response

##### 200 (OK)
>If you successfully register the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE"
}
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

____

## **LOGIN**
### **Logs a user in**

*Method Url:* `/api/auth/login`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `email`        | String | Yes      | Must match an email in the database |
| `password`     | String | Yes      | Must match a password in the database corresponding to above email |

*example:*

```
{
  email: "lauren@email.com",
  password: "password123"
}
```

#### Response

##### 200 (OK)
>If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE"
}
```
##### 400 (Bad Request)
>If you send in invalid fields or the passwords do not match, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 404 (Not Found)
>If you send in an email address that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```

---

# QUIZ ROUTES

## **GET QUIZZES**
### Gets an array of quiz objects

*Method Url:* `/api/quizzes`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `topic` | String | No       | Query parameters in order to receive quizzes of specific topic |

#### Response 

##### 200 (OK)

```
[
  {
    "id": 2,
    "title": "Array Methods",
    "votes": 123,
    "author": "lauren"
    "topic": "JavaScript"
  }
]
```

___

## **GET ONE QUIZ**
### Gets a quiz with a specified ID

*Method Url:* `/api/quizzes/:quizId`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |


#### Response 

##### 200 (OK)

>If you send a valid quiz id with no authorization token, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id": 2,
  "title": "Array Methods",
  "votes": 123,
  "author": {
    "id": 1,
    "username": "lauren",
    "img_url": "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg"
  },
  "topic": "JavaScript"
}
```

>If you send a valid quiz id with a valid authorization token, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id": 2,
  "title": "Array Methods",
  "votes": 123,
  "author": {
    "id": 1,
    "username": "lauren",
    "img_url": "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg"
  },
  "topic": "JavaScript",
  "score": 123,
  "user_vote": -1, 
  "favorite": false 
}
```

##### 404 (Not Found)
>If you pass in an id that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
---
## **ADD NEW QUIZ**
### Adds a new quiz

*Method Url:* `/api/quizzes`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | No       | Must match an email in the database |
| `topic`  | String | No       |  |

*example:*
```
{
  title: "Array Methods",
  topic: "JavaScript"
}
```
#### Response 

##### 200 (OK)

```
[
  1269
]
```
---
## **EDIT SPECIFIC QUIZ**
### Edits one or more details of a specific quiz created by the current user.

*Method Url:* `/api/quizzes/:quizId`

*HTTP method:* **[PATCH]**



#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | No       | Must match an email in the database |
| `topic`  | String | No       | Must match a password in the database corresponding to above email |
*Argument:*

```
{
  title: "Edited Title",
  topic: "Edited Topic"
  //You may pass an object with one or both of these keys.
}
```

*Response:*

```[1268] //This integer is the ID of the edited quiz```



# QUESTION ROUTES

## **GET QUESTIONS**
### Gets all the questions in a quiz

*Method Url:* `/api/quizzes/:quizId`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | No      | Bearer JWT authorization token |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |


#### Response 

##### 200 (OK)

```
[
    {   "id": 12345,
        "question": "Here's a sample question 2",
        "options": [
            "sample option",
            "another 1",
            "This one is the answer shh don't tell",
            "yayyy"
        ]
    }
]
```

##### 404 (Not Found)
>If you pass in an id that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```

## **GET SPECIFIC QUESTION**
### Gets a question by its ID.

*Method Url:* `/api/quizzes/:quizId/questions/:questionId`

*HTTP Method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | No      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |


##### 200 (OK)

```
{   "id": 12345,
    "question": "Here's a sample question 2",
    "options": [
        "sample option",
        "another 1",
        "This one is the answer shh don't tell",
        "yayyy"
    ]
}
```

##### 404 (Not Found)
>If you pass in a quizId that does not match a quiz in the database, or a questionId that does not match a question associated with the passed in quizId, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```


## **ADD NEW QUESTION**
### Adds a new question

*Method Url:* `/api/quizzes/:quizId/questions`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `question`  | String | No       |  |
| `answer`  | String | No       |  |

*Argument:*

```
{
  question: "What is the question?",
  answer: "The answer."
}
```

*Response:*

```[5678] //This Integer is the ID of the newly added question```


