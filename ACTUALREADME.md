# AUTH ROUTES

## **REGISTER**
### **Registers a user**

*Method Url:* `/api/auth/register`

*HTTP method:* **[POST]**

*Argument:*


```
{
  username: "exampleUsername",
  password: "examplePasword",
  email: "exampleEmail@email.com",
  img_url: "www.yourprofileimage.com" //This key is optional.
}
```

*Response:*
```
{token: JSON Web Token}
```

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
  favorite: false //Will always start at false
}, ...]
```

## **GET SPECIFIC QUIZ**
### Gets a quiz with a specified ID

*Method Url:* `/api/quizzes/:id`

*HTTP method:* **[GET]**

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
### Edits one or more details of a specific quiz

*Method Url:* `/api/quizzes/:id`

*HTTP method:* **[PATCH]**