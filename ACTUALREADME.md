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
  img_url: "www.yourprofileimage.com" 
}
```

#### Response:
```
{
  token: JSON Web Token
}
```
____

## **LOGIN**
### **Logs a user in**

*Method Url:* `/api/auth/login`

*HTTP method:* **[POST]**

*Argument:*

```
{
  username: "exampleUsername",
  password: "eamplePassword"
}
```

*Response:*
```
{token: JSON Web Token}
```



# QUIZ ROUTES

## **GET QUIZZES**
### Gets an array of quiz objects

*Method Url:* `/api/quizzes`

*HTTP method:* **[GET]**

*Request Reqiurements:*
HEADER - 
```{Authoriation: JSON Web Token}```

*Argument (optional):*  `"Topic"`

*Response:*

If the user is NOT logged in

```
[{
  id: 12345,
  title: "Title",
  author: "Author"
  votes: 123,
  topic: "Topic"
}, ...]
```

If the user IS logged in

```
[{
  id: 12345,
  title: "Title",
  author: "Author",
  votes: 123,
  topic: "Topic",
  score: 123,
  user_vote: -1, //Will be either -1, 0, or 1
  favorite: false //Default false
}, ...]
```

## **GET SPECIFIC QUIZ**
### Gets a quiz with a specified ID

*Method Url:* `/api/quizzes/:id`

*HTTP method:* **[GET]**

*Request Reqiurements:*
HEADER - 
```{Authoriation: JSON Web Token}```

*Response*

If the user is NOT logged in

```
{
  id: 12345,
  title: "Title",
  author: "Author"
  votes: 123,
  topic: "Topic"
}
```

If the user IS logged in

```
{
  id: 12345,
  title: "Title",
  author: "Author",
  votes: 123,
  topic: "Topic",
  score: 123,
  user_vote: -1, //Will be either -1, 0, or 1
  favorite: false //Will always start at false
}
```

## **EDIT SPECIFIC QUIZ**
### Edits one or more details of a specific quiz created by the current user.

*Method Url:* `/api/quizzes/:id`

*HTTP method:* **[PATCH]**

*Request Reqiurements:*
HEADER - 
```{Authoriation: JSON Web Token}```

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

## **ADD NEW QUIZ**
### Adds a new quiz

*Method Url:* `/api/quizzes`

*HTTP method:* **[POST]**

*Request Reqiurements:*
HEADER - 
```{Authoriation: JSON Web Token}```

*Argument:*

```
{
  title: "Some New Title",
  topic: "Some New Topic"
}
```
*Response:*

```[1269] //This Integer is the ID of the newly added quiz```

# QUESTION ROUTES

## **ADD NEW QUESTION**
### Adds a new question

*Method Url:* `/api/quesions`

*HTTP method:* **[POST]**

*Request Reqiurements:*
HEADER - 
```{Authoriation: JSON Web Token}```

*Argument:*

```
{
  question: "What is the question?",
  answer: "The answer."
}
```

*Response:*

```[5678] //This Integer is the ID of the newly added question```


