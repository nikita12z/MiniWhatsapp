const express = require("express");
const app = express();
// ------  Establishing connection with mongoose  ----- //
const mongoose = require('mongoose');
const path = require("path");
app.use(express.urlencoded({extended : true}));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

//to access static files like CSS, JS
app.use(express.static(path.join(__dirname, "public")));

// ------ require CHAT MODEL ----- //
const Chat = require("./models/chat.js");

// ------ for views folder ----- //
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//asynchronous function which returns a promise, later we perform "then" on it.
main()
.then(()=>{
    console.log("success connection");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


/*************************************************/
// ------- 1. ROOT ROUTE ------------------------------------------ //
app.get("/", (req, res)=>{
    res.send("root is working");
});

// ------- 2. INDEX ROUTE ------------------------------------------ //
app.get("/chats", async (req, res)=>{
    //chat.find fn is asynchronous
    let chats = await Chat.find(); //fn jo DB se data leke aarha hai.
    console.log(chats);
    res.render("index.ejs", { chats });
});

// ------- 3. NEW ROUTE ------------------------------------------ // 
//New chat: button click => get request -> renders a form
app.get("/chats/new", (req, res)=>{
    res.render("newchat.ejs");
});

// ------- 4. CREATE ROUTE ------------------------------------------ //
//after submitting form req goes to => POST req which inserts new chat to DB

//post Used to create a new resource.
app.post("/chats", (req, res)=>{
    //accessing data from form
    let {from, to, msg} = req.body; //this data is to be parsed
    
    //new chat created
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg, 
        created_at: new Date(),
    });

    //new chat saved
    newChat
        .save()
        .then((res)=>{
            console.log("chat saved");
        })
        .catch((err)=>{
            console.log(err);
        });
    res.redirect("/chats");
});

// ------- 5. EDIT ROUTE ------------------------------------------ //
//edit button => form -> form submitted, req goes to => PUT req

app.get("/chats/:id/edit", async (req, res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id); //await and async used as findbyid is async function.
    res.render("editform.ejs", {chat});
});

// ------- 6. UPDATE ROUTE ------------------------------------------ //
//put Used to update an existing resource or create a new resource if it does not exist.
app.put("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body; //msg assigned to newMsg

    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg: newMsg},
        {runValidators: true, new: true}
    );

    console.log(updatedChat);
    res.redirect("/chats");
});

// ------- 7. DELETE ROUTE ------------------------------------------ //
app.delete("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});


/*************************************************/


// ------ Start server ----- //
app.listen(8080, ()=>{
    console.log("server lsitening");
});


