# di-ngy

A small discord.js + cli-ngy boilerplate used by [lisa-bot](https://github.com/FelixRilling/lisa-bot)

## Usage

Create a basic bot:

```js
const Dingy = require("di-ngy");

//new Dingy({config},{commands},{strings},{events});
const bot = new Dingy({
    name: "myBot",                  //Name of the bot
    token: "#botToken#",            //Bot-token, should be secret! (Using ENV-vars to store this is recommended)
    prefix: "$",                    //Prefix to respond to: prefix:'foo' => responds to "foo help"
    adminIds: ["123456789101112"]   //User-IDs of people with admin access, aloowing dangerous commands
}, {
    foo: {
        fn: () => "bar",
        alias: [],
        args: [],
        help: {
            short: "First command",
            long: "My first command"
        }
    }
});

bot.connect();
```
