const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

//connection setup:
main()
.then(()=>{
    console.log("success connection");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// ------ Insert data into CHAT MODEL: ----- //
let allChats = [
    {
        from: "A",
        to: "B",
        msg: "A send exam sheet",
        created_at: new Date(), 

    },
    {
        from: "AA",
        to: "BB",
        msg: "AA send exam sheet",
        created_at: new Date(), 

    },
    {
        from: "AAA",
        to: "BBB",
        msg: "AAA send exam sheet",
        created_at: new Date(), 

    },
    {
        from: "AAAA",
        to: "BBBB",
        msg: "AAAA send exam sheet",
        created_at: new Date(), 

    },

];

Chat.insertMany(allChats);

