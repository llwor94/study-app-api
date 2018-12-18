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
>If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE",
  "user": {
    "id": 1,
    "username": "lauren"
  }
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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE",
  "user": {
    "id": 1,
    "username": "lauren",
    "img_url": "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg"
  }
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
___

## **UPDATE USER**
### Updates the username or password of a user

*Method Url:* `/api/auth/update`
*HTTP method:* **[PATCH]**

#### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | No | Bearer JWT authorization token |

#### Body

| name | type   | required | description|
| ----| ------ | -------- | ---- |
| `newUsername` | String | No | Only include if you would like to change the username of the user |
| `currentPassword` | String | Yes  | Must match a password in the logged in user |
| `newPassword` | String | No | Only include if you would like to change the password of the user |

*example:*

```
{
  newUsername: "dinolaur",
  currentPassword: "password123",
  newPassword: "password1234"
}
```


#### Response

##### 200 (OK)
>If you successfully update the user information and change the password, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTQ1MTEzMDMxLCJleHAiOjE1NzY2NzA2MzF9.C1oMA1D2qdLLaPSfvEWU5LaXCABVf2DBWomQ1tUQDgU",
  "user": {
    "id": 2
  }
}
```
>>If you successfully update the user information and change just the username, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
  "user": {
    "id": 2,
    "username": "dinolaur"
  }
}
```
##### 400 (Bad Request)
>If you send in invalid fields or the password of the user corresponding to the token does not match the currentPassword field, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
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

## **GET TOPICS**
### Gets an array of quiz topics

*Method Url:* `/api/quizzes/topics`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Response 

##### 200 (OK)

```
[
  {
    "id": 2,
    "name": "JavaScript"
  }
]
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
| `title`  | String | Yes       |  |
| `topic`  | String | Yes       | Can be an existing or new topic |

*example:*
```
{
  title: "Array Methods",
  topic: "JavaScript"
}
```
#### Response 

##### 200 (OK)
>If you successfully create a new quiz the endpoint will return an HTTP response with a status code `200` and a body as below.

```
[
  12
]
```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---
## **EDIT SPECIFIC QUIZ**
### Edits one or more details of a specific quiz created by the current user.

*Method Url:* `/api/quizzes/:quizId/edit`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | No       | New title of the quiz |
| `topic`  | String | No       | Can be a new or existing topic |



*Example:*

```
{
  "title": "Object Methods",
  "topic": "JavaScript II"
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated quiz quiz.

```
[
  12
]
  ```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, or you do not send in a token that matches the author of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
## **UPDATE QUIZ AND USER RELATIONSHIP**
### Edits the user specific information for a quiz, allowng users to favorite, vote for, and score.

*Method Url:* `/api/quizzes/:quizId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `vote`  | Int | No  | Default: 0. Must be -1, 0, 1 |
| `favorite` | Boolean | No   | Default: false.  |
| `score` | Int | No   | Default: 0. Cannot be larger than the amount of questions for the specified quiz.  |


*Example:*

```
{
  "vote": -1,
  "favorite": "true",
  "score": 3
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated quiz user relationship.

```
[
  8
]
  ```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
_____
## **DELETE QUIZ**
### Deletes quiz with specific id.

*Method Url:* `/api/quizzes/:quizId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the deleted quiz user relationship.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

# QUESTION ROUTES

## **GET QUESTIONS**
### Gets all the questions in a quiz

*Method Url:* `/api/quizzes/:quizId/questions`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |


#### Response 

##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and array of questions that have a quiz_id that matches the quizId passed in.

```
[
  {
    "id": 12,
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
>If you pass in a quizId that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **GET SPECIFIC QUESTION**
### Gets a question by its ID.

*Method Url:* `/api/quizzes/:quizId/questions/:questionId`

*HTTP Method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |

#### Response 
##### 200 (OK)

>If the request if successful, the server will return an HTTP response with a status code `200` and the quiz object that matches the questionId and corresponding quizId passed in.

```
{
  "id": 12345,
  "question": "Here's a sample question 2",
  "options": [
    "sample option",
    "another 1",
    "This one is the answer shh don't tell",
    "yayyy"
  ],
  "quiz_id": 1
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
___

## **GET SPECIFIC QUESTION ANSWER**
### Gets a response of whether the passed in option to a specific question by its ID is correct or not.

*Method Url:* `/api/quizzes/:quizId/questions/:questionId/response`

*HTTP Method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |
| `option` | Int | Yes       | Query parameter that matches an option # field on the specified question |

#### Response 
##### 200 (OK)

>If the request if successful, the server will return an HTTP response with a status code `200` and the question id and boolean reflecting whether the option was correct or not.

```
{
    "question": 3,
    "correct": false
}
```

##### 400 (Bad Request)
>If you do not send in a required field, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
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
___

## **ADD NEW QUESTION**
### Adds a new question

*Method Url:* `/api/quizzes/:quizId/questions`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |


#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `question`| String | Yes     | title of the question |
| `option1`| String | Yes     |  |
| `option2`| String | Yes     |  |
| `option3`| String | No     |  |
| `option4`| String | No    |  |
| `answer`  | Int | Yes      | Must be an integer that corresponds to an existing option number.  |

*Example:*

```
{
	"question": "Here's a sample question 2",
	"option1": "sample option",
	"option2": "another 1",
	"option3": "This one is the answer shh don't tell",	
	"option4": "yayyy",
	"answer": 3
}
```

#### Response 
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the new question as below.
```
[
  5
] 
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **EDIT A QUESTION**
### Edits a question of the specified id

*Method Url:* `/api/quizzes/:quizId/questions/:questionId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |


#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `question`| String | No     | title of the question |
| `option1`| String | No     |  |
| `option2`| String | No     |  |
| `option3`| String | No     |  |
| `option4`| String | No    |  |
| `answer`  | Int | No      | Must be an integer that corresponds to an existing option number.  |

*Example:*

```
{
	"question": "Here's a sample question 2",
	"option1": "sample option",
	"option2": "another 1",
	"option3": "This one is the answer shh don't tell",	
	"option4": "yayyy",
	"answer": 4
}
```

#### Response 
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the edited question.
```
[
  5
] 
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the quizId or questionId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **DELETE QUESTION**
### Deletes question with specific id.

*Method Url:* `/api/quizzes/:quizId/questions/:questionId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `quizId`| Int    | Yes      | Id of specific quiz |
| `questionId`| Int    | Yes      | Id of specific question |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the deleted question.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the quiz, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the questionId or quizId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

# POST ROUTES

## **GET ALL POSTS**
### Gets an array of post objects

*Method Url:* `/api/posts`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |


#### Response 

##### 200 (OK)

```
[
  {
    "id": 1,
    "title": "JavaScript n Things",
    "body": "Here's lots of stuff about JavaScript. So much about JavaScript. So many JavaScript things. All things JavaScript.",
    "created_at": "2018-12-11T04:47:28.998Z",
    "author": "dinolaur"
  }
]
```

___

## **GET ONE POST**
### Gets a post with the specified id

*Method Url:* `/api/posts/:postId`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | No       | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |


#### Response 

##### 200 (OK)

>If you send a valid post id, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
  "id": 1,
  "title": "JavaScript n Things",
  "body": "Here's lots of stuff about JavaScript. So much about JavaScript. So many JavaScript things. All things JavaScript.",
  "author": {
    "id": 10,
    "username": "dinolaur",
    "img_url": "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg"
  },
  "created_at": "2018-12-11T04:47:28.998Z"
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
## **ADD NEW POST**
### Adds a new posts

*Method Url:* `/api/posts`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | Yes       | |
| `body`  | String | Yes       |  |

*example:*
```
{
  title: "JavaScript n Things",
  body: "Here's lots of stuff about JavaScript. So much about JavaScript. So many JavaScript things. All things JavaScript."
}
```
#### Response 

##### 200 (OK)
>If you successfully create a new post the endpoint will return an HTTP response with a status code `200` and a body as below.

```
[
  12
]
```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
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
##### 401 (Unauthorized)
>If you are not logged in, then endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

---
## **EDIT SPECIFIC POST**
### Edits one or more details of a specific post created by the current user.

*Method Url:* `/api/posts/:postId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `title`  | String | No       | New title of the post |
| `body`  | String | No       | New body of post |



*Example:*

```
{
  "title": "JavaScript n Stuff",
  "body": "Some different things about JavaScript instead"
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated post quiz.

```
[
  1
]
  ```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in, or you do not send in a token that matches the author of the post, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **DELETE POST**
### Deletes quiz with specific id.

*Method Url:* `/api/posts/:postId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the post.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the post, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
# COMMENT ROUTES

## **GET COMMENTS**
### Gets all the questions in a comments

*Method Url:* `/api/posts/:postId/comments`

*HTTP method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |


#### Response 

##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and array of comments that have a post_id that matches the postId passed in.

```
[
  {
    "id": 4,
    "text": "sup family!",
    "author": "dinolaur",
    "post_id": 2,
    "created_at": "2018-12-13T03:24:27.215Z"
  }
]
```

##### 404 (Not Found)
>If you pass in a postId that does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **GET SPECIFIC COMMENT**
### Gets a comment by its ID.

*Method Url:* `/api/posts/:postId/comments/:commentId`

*HTTP Method:* **[GET]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |


#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |
| `commentId`| Int    | Yes      | Id of specific comment |

#### Response 
##### 200 (OK)

>If the request if successful, the server will return an HTTP response with a status code `200` and the comment object that matches the commentId and corresponding postId passed in.

```
{
  "id": 4,
  "text": "sup family!",
  "author": {
    "id": 6,
    "username": "dinolaur",
    "img_url": null
  },
  "post_id": 2,
  "created_at": "2018-12-13T03:24:27.215Z"
}
```

##### 404 (Not Found)
>If you pass in a postId that does not match a post in the database, or a commentId that does not match a comment associated with the passed in postId, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___

## **ADD NEW COMMENT**
### Adds a new comment

*Method Url:* `/api/posts/:postId/comments`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `post`| Int    | Yes      | Id of specific quiz |


#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `text`| String | Yes     | text body of comment |


*Example:*

```
{
	text: "Sup family!"
}
```

#### Response 
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the new question as below.
```
[
  5
] 
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```

##### 401 (Unauthorized)
>If you are not logged in the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
## **EDIT SPECIFIC COMMENT**
### Edits text of a specific commentcreated by the current user.

*Method Url:* `/api/posts/:postId/comments/:commentId`

*HTTP method:* **[PATCH]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific quiz |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `text`  | String | Yes       | New text of comment |



*Example:*

```
{
  title: "Hellurrr"
}
```

#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the updated quiz quiz.

```
[
  12
]
  ```

##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
  "error": true,
  "message": "There was a problem with your request."
}
```
##### 401 (Unauthorized)
>If you are not logged in the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the postId or commentId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___
## **DELETE COMMENT**
### Deletes comment with specific commentId.

*Method Url:* `/api/posts/:postId/comments/:commentId`

*HTTP method:* **[DELETE]**

#### Headers

| name           | type   | required | description                    |
| -------------- | ------ | -------- | ------------------------------ |
| `Content-Type` | String | Yes      | Must be application/json       |
| `Authorization`| String | Yes      | Bearer JWT authorization token |

#### Parameters

| name    | type   | required | description              |
| --------| ------ | -------- | ------------------------ |
| `postId`| Int    | Yes      | Id of specific post |
| `commentId`| Int    | Yes      | Id of specific comment |


#### Response
##### 200 (OK)
>If the request if successful, the server will return an HTTP response with a status code `200` and the id of the deleted question.

```
[
  8
]
  ```

##### 401 (Unauthorized)
>If you are not logged in, or if the id of the logged in user does not match the author id of the comment, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
  "error": true,
  "message": "You are unathorized to view the content."
}
```

##### 404 (Not Found)
>If the commentId or postId passed in does not match one in the database, the endpoint will return an HTTP response with a status code `404` and a body as below.
```
{
  "error": true,
  "message": "The requested content does not exist."
}
```
___