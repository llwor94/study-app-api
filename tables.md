# Table schemas

## Users

| Field    | Data Type                     |
| -------- | ----------------------------- |
| id       | Unsigned Int (auto increment) |
| username | Text (unique)                 |
| password | Text                          |

## Questions

| Field    | Data Type                     |
| -------- | ----------------------------- |
| id       | Unsigned Int (auto increment) |
| question | String                        |
| option1  | String                        |
| option2  | String                        |
| option3  | String                        |
| option4  | String                        |
| answer   | Unsigned Int (1-4)            |
| author   | Unsigned Int (ref to users)   |

## Quizzes

| Field              | Data Type                     |
| ------------------ | ----------------------------- |
| id                 | Unsigned Int (auto increment) |
| quiz_title         | String                        |
| author             | Unsigned Int (ref to users)   |
| time_limit_seconds | Unsigned Int                  |
| votes              | Int                           |

## Quiz-Question

| Field       | Data Type                      |
| ----------- | ------------------------------ |
| id          | Unsigned Int (auto increment)  |
| quiz_id     | Unsigned Int (ref to quiz)     |
| question_id | Unsigned Int (ref to question) |

## Posts

| Field      | Data Type                     |
| ---------- | ----------------------------- |
| id         | Unsigned Int (auto increment) |
| post_title | Text                          |
| post_body  | Text                          |
| author     | Unsigned Int (ref to users)   |

## Comments

| Field        | Data Type                     |
| ------------ | ----------------------------- |
| id           | Unsigned Int (auto increment) |
| comment_text | Text                          |
| author       | Unsigned Int (ref to users)   |
| post_id      | Unsigned Int (ref to posts)   |

## User-Favorites

| Field   | Data Type                      |
| ------- | ------------------------------ |
| id      | Unsigned Int (auto increments) |
| quiz_id | Unsigned Int (ref to quizzes)  |
| user_id | Unsigned Int (ref to users)    |

**STRETCH GOALS**

## Friends

| Field  | Data Type                      |
| ------ | ------------------------------ |
| id     | Unsigned Int (auto increments) |
| user_1 | Unsigned Int (ref to users)    |
| user_2 | Unsigned Int (ref to users)    |

## Direct Messages

| Field   | Data Type                      |
| ------- | ------------------------------ |
| id      | Unsigned Int (auto increments) |
| from    | Unsinged Int (ref to users)    |
| to      | Unsinged Int (ref to users)    |
| message | Text                           |

_If you feel ambitious allow to field to have multiple recpients, need another
table for that_

## Leaderboards

Don't really need another table, can be generated in the backend with existing
data. Run a query to aggregate all quiz scores user-wise quiz-wise, sort it by
scores and send back.

- Quiz leader: Highest points quiz-wise
- Global leader: Combined leader with points from all quizzes
- Monthly leader(Quiz, Global): For each month

## Image Uploads

Add another field in users table `image_url` of `string` type. Use `multer` to
receive `multipart/form-data`, store the file either locally or use cloudinary,
get the url and store it in the users table.
