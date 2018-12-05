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

| Field      | Data Type                     |
| ---------- | ----------------------------- |
| id         | Unsigned Int (auto increment) |
| quiz_title | String                        |
| author     | Unsigned Int (ref to users)   |

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
