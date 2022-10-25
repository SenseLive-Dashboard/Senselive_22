const express = require('express')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const cors = require('cors')


const  app = express()

app.use(cors());
app.use(bodyparser.json());

// database connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"simpledb",
    port:3306,
})

// check database connection
db.connect(err=>{
    if(err) throw err
    console.log("database connection successful")
})

// get data
app.get("/user", (req, res)=>{
    console.log("get users!")
    let qr = "SELECT * FROM user"
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err, "error")
        }
        if(result.length>0){
            res.send({
                message: "all user data",
                data:result
            })
        }
    })
})



// get particular data
app.get("/user/:id", (req, res)=>{
    console.log("get users!")
    console.log(req.params.id, "<---- id")
    let gId = req.params.id

    let qr = `SELECT * FROM user WHERE id = ${gId}`
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err, "error")
        }
        if(result.length>0){
            res.send({
                message: "all user data",
                data:result
            })
        }else{
            res.send({
                message:"No data found"
            })
        }
    })
})



// crate data
app.post("/user", (req, res)=>{
    console.log("create  users!")
    console.log(req.body, "<---- create data")
    let fullname = req.body.fullname
    let email = req.body.email
    let mobile = req.body.mobile

    let qr = `INERT INTO user(fullname, email, mobile) vlaues('${fullname}','${email}', '${mobile}' )`
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err, "error")
        }
        res.send({
            message: "Data insered succesfully",
            // data:result
        })
        // if(result.length>0){
        //     res.send({
        //         message: "Data insered succesfully",
        //         data:result
        //     })
        // }else{
        //     res.send({S
        //         message:"Wrong data"
        //     })
        // }
    })
})


// Update data
app.get("/user/:id", (req, res)=>{

    console.log("update  users!")
    console.log(req.body, "<---- update data")


    let gId = req.params.id
    let fullname = req.body.fullname
    let email = req.body.email
    let mobile = req.body.mobile

    let qr = `UPDATE user set fullname = '${fullname}', email = '${email}', mobile = '${mobile}' WHERE id = ${gId}`
    db.query(qr, (err, result)=>{
        if(err){
            console.log("error  --->", err)
        }
        res.send({
            message: "Data insered succesfully",
            // data:result
        })
    })

})


// Delete single data
app.delete("/user/:id", (req, res)=>{


    let qId = req.params.id

    let qr = `DELETE FROM user WHERE id = ${qId}`
    db.query(qr, (err, result)=>{
        if(err){
            console.log("error  --->", err)
        }
        res.send({
            message: "Data deleted succesfully",
            // data:result
        })
    })

})



app.listen(3000, ()=>{
    console.log(`Server running!`)
})