# Senior Engineer Interview

## Background
Welcome to Periapt! We're excited to meet you!
The goal for this coding exercise is for us to see your basic coding skills:
- Understanding requirements.
- Implementing code that works.
- Code maintainability and testability.
- Separation of architectural layers.
- End-to-end full-stack development.

Also, it's a starting point for technical discussions. Things like:
- Why did you choose library X?
- How would you implement Y?
- What would you do if you had more time?

The exercise instructions are deliberately partially detailed. For example, we don't always define what is considered a Bad Request. When information is missing, use your common sense and make your best guess. You may also treat your interviewer as your product manager and consult with them.

You may implement this exercise in any language or framework of your liking.

Good luck!

## General instructions
You will create a REST server that returns information from the Wikipedia website.

Your server must be **publicly available**. You may choose any cloud provider you like (Heroku, AWS, Azure, GCP/Firebase, everything works).

Submit this exercise by forking this repository and opening a Pull Request containing your implementation.

**Please provide detailed instuctions regarding:**
1. How to use your API.
2. How to run your server from your source code (e.g `npm install && tsc && PORT=3000 node dist`).
3. How to publish changes.

This exercise consists of parts. Make sure you're completely done with each part before moving on to the next. As a tip, you're advised to make a different commit/branch for every part to make sure you have a stable, working version for each part.

Make sure you don't get stuck on understanding the instructions! We want to see how you code and think. If we happen to use a term you don't recognize, or if the instructions are not clear- just ask. We want to help you be at your best.

## Exercise
### Part A
Create a REST server with the `GET` endpoint `/introduction/<articleName>` where article is the name of a Wikipedia article.
The server should return the contents of the first paragraph of the corresponding wikipedia article. The returned type should be:

`{ scrapeDate: number, articleName: string, introduction: string}`

Where the scrapeDate is the date when the request was made, in the format of <a href="https://www.epochconverter.com/">UNIX epoch</a> (milliseconds since 1970/01/01 00:00 UTC).

For example, if I make a `GET` request to `/introduction/cat`, I should receive a response that looks roughly like this:

```
{
  'scrapeDate': 123123123,
  'articleName': 'cat',
  'introduction': 'The cat (Felis catus) is a domestic species of small carnivorous mammal.[1][2] It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family.[4] A cat can either be a house cat, a farm cat or a feral cat; the latter ranges freely and avoids human contact.[5] Domestic cats are valued by humans for companionship and their ability to hunt rodents. About 60 cat breeds are recognized by various cat registries.[6]'
}
```

You may only accept article names that are comprised of letters, hyphens (`-`), underscores (`_`) and numbers. Any input that does not comply with this request should be rejected with a Bad Request response and a proper explanation for the rejection.

### Part B
We want to add a language functionality to the server. Requests may arrive with a standard `Accept-Language` header. Make sure you respect that header and fetch the article in the correct language. For example, if I want the French article for Cat, I would send a GET request to `/introduction/chat` with the header `Accept-language: fr`.

### Part C
Our users don't want to keep adding the language header every time they make a request - they want the system to remember their favorite language!
In this part you'll implement a type of "signup" and "user preferences" system. You don't need to use and external DB for this, it's okay to keep everything in RAM.
However, it is very important to us that you write the code in a way that makes it easy to add support for a DB afterwards. Really think about the separation of code layers here.

#### C.1

You are to implement a new `POST` endpoint: `/user`.
The expected payload is: `{userName: string, language: string}`. The expected response is `{token: string}`.
For example, if I make a `POST` request to `/user` with the payload `{'userName': 'jake', 'language': 'en'}` I should get the response `{'token': 'abcd-1234-defa-5678'}`.

The token should be a random, hard to guess string.

#### C.2
Add support for authentication with a token to the `GET` endpoint:
The server should look at the `x-authentication` header. If the header exists, the server should take the header's value and check if it's a valid token. If so, it should make the `GET` request using the user's favorite language.

#### C.3
Implement a caching mechanism. If a requested article was already fetched in the past 5 minutes, return the same result.

### Part D

Implement very simple web UI that allows signing up new users and fetching article introductions as those users.
It should have 2 parts:
1. A signup form with a username and language fields
2. A "Fetch article introduction" form that has a mandatory "article name" field, and optional "token", "language" fields.

### Part E - Bonus
Implement CI/CD workflows. You may choose any CI/CD provider/framework you like. 
Make sure to properly document your workflow. 
