![comments api logo](https://i.ibb.co/4t0DVKw/comments-api.png")

This is a simple API to handle comments on any platform. 💬💭

## Motivation 💡

[The Clean Architecture By Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

Maintainability has been an issue for me lately and I am trying to understand how to build cleaner, testable and more robust apps.

## Technologies ⚙

- [deno](https://deno.land/) - A secure runtime for JavaScript and TypeScript.
- [oak](https://deno.land/x/oak) - A middleware framework for Deno's http server, including a router middleware.
- [deno-postgres](https://deno.land/x/postgres) - A PostgreSQL driver for Deno.

## Features ✨

`Note: properties with ? are optional in request bodies`

- Create comment:

  - `POST /comments`

    - Request Body:

      ```
      {
        "author": "Ngwobia Chukwudi",
        "postId": "6e9bdc72-cb54-4eae-918b-9c1a31c2b14f",
        "text": "This is a simple comment",
        "replyToId?: "5c11a466-03f2-4a9a-9c71-d09277eae178"
      }

      ```

    - Response Body:
      ```
      {
          "status": 201,
          "data": {
          "id": "635733f0-0124-4b27-89f7-50df3ac27896",
          "author": "Ngwobia Chukwudi",
          "text": "This is a simple comment",
          "source": {
            "ip": "10.200.155.1",
            "browser": "PostmanRuntime/7.26.1",
            "referrer": null
          },
          "postId": "6e9bdc72-cb54-4eae-918b-9c1a31c2b14f",
          "published": false,
          "hash": "da7c9b337ed49f560d59284dc7396a9f",
          "replyToId": "5c11a466-03f2-4a9a-9c71-d09277eae178",
          "createdOn": "2020-07-05T19:22:55.052Z",
          "modifiedOn": "2020-07-05T19:22:55.052Z"
        }
      }
      ```

## TODO 📃

- [x] Create Comment
- [ ] Get All Comments (Returns with replies)
- [ ] Get Comment By ID (Returns with replies)
- [ ] Update Comment
- [ ] Delete Comment

## Getting Started 🏁

To run this applicaton, [deno](https://deno.land/) must be installed.

Run `which deno` to confirm that you have deno installed. You should get the directory of the installed deno binary printed to your console if you have deno installed correctly.

Run `deno run -A src/mod.ts` to start up the server.
The `-A` flag allows all permissions and may be insecure. Review the permissions and enable individually if you have any security concerns.

## Licence

Copyright &copy; 2020, Ngwobia, Chukwudi M.
The code in this project is licensed under [ISC LICENSE](https://github.com/chuxmykel/comments_api/blob/master/LICENSE)
