const mainRoute = (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.write(
    ` Welcome to Callback Hell !
                 ___-----------___
           __--~~                 ~~--__
       _-~~                             ~~-_
    _-~                                     ~-_
   /                                           \
  |                                             |
 |                                               |
 |                                               |
|                                                 |
|                                                 |
|                                                 |
 |                                               |
 |  |    _-------_               _-------_    |  |
 |  |  /~         ~\           /~         ~\  |  |
  ||  |             |         |             |  ||
  || |               |       |               | ||
  || |              |         |              | ||
  |   \_           /           \           _/   |
 |      ~~--_____-~    /~V~\    ~-_____--~~      |
 |                    |     |                    |
|                    |       |                    |
|                    |  /^\  |                    |
 |                    ~~   ~~                    |
  \_         _                       _         _/
    ~--____-~ ~\                   /~ ~-____--~
         \     /\                 /\     /
          \    | ( ,           , ) |    /
           |   | (~(__(  |  )__)~) |   |
            |   \/ (  (~~|~~)  ) \/   |
             |   |  [ [  |  ] ]  /   |
              |                     |
               \                   /
                ~-_             _-~
                   ~--___-___--~
`
  );
  response.end();
};

module.exports = mainRoute;
