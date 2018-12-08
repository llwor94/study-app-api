# AUTH ROUTES

## **REGISTER**
### **Registers a user**

*Method Url:* `/api/auth/register`

*HTTP method:* **[POST]**

*Argument:*

```
{username: "exampleUsername",
  password: "examplePasword",
  email: "exampleEmail@email.com",
  img_url: "www.yourprofileimage.com" //This key is optional.
}
```

*Response:*
```
response.body === {token: JSON Web Token}
```

## **LOGIN**
### **Logs a user in**

*Method Url:* `/api/auth/login`

*HTTP method:* **[POST]**

*Argument:*

```
{username: "exampleUsername",
  password: "eamplePassword"
}
```

*Response:*

```
response.body === {token: JSON Web Token}
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
response.body ===
{id: 12345,
  title: "Title",
  author: "Author"
  votes: 123,
  topic: "Topic"
}
```

If the user IS logged in

```
response.body ===
{id: 12345,
  title: "Title",
  author: "Author",
  votes: 123,
  topic: "Topic",
  score: 123,
  user_vote: -1, //Will be either -1, 0, or 1
  favorite: false //Will always start at false
}
```

## **GET TOPICS**
### Gets and array of topics

*Method Url:*
