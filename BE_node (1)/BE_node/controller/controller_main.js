const db = require("../dbconnection");
const DB = require("../DB");




const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const CryptoJS = require("crypto-js");
const JSONTransport = require("nodemailer/lib/json-transport");

const userMail = 'bajirao_aayush.cs@ghrce.raisoni.net'
const userPass = 'qnhvcvhkqpeogsnf'
const fromMail = 'info.senselive@gmail.com'

module.exports.test = (req, res) => {
    console.log("here u an ");
    var value = req.params.id
    console.log(value)
}



module.exports.home = (req, res) => {
    res.send('api working here at home!')

}

// Send Mail for user registrartion
const sendMailForSignup = (getEmail, randomNum) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: userMail,
            pass: userPass
        }
    });

    var mailOptions = {
        from: fromMail,
        to: getEmail,
        subject: 'Your Email validation code',
        // text: 'Hello' + getFirstname + ', welcome to Senselive. Thanks for signing up! Your 1 time password is '+ randomNum +'.'
        text: randomNum + ' is your One Time Password. Use it validate your your email with SenseLive.'
        // text: 'Hello' + getFirstname + ', welcome to Senselive. Thanks for signing up!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



const sendMailForPasswordRecovery = (getEmail, randomNum) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: userMail,
            pass: userPass
        }
    });

    var mailOptions = {
        from: fromMail,
        to: getEmail,
        subject: 'Your Recovery Password',
        text: 'We received a request to reset your Senselive dashboard password. Enter the following password reset code: ' + randomNum + '.'

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



// SignupOne
module.exports.signupone = async(req, res) => {
    console.log(req.body, 'email body - signupone  ###');
    
    let bytes  = CryptoJS.AES.decrypt(req.body.email, 'senselive2');
            let key = bytes.toString(CryptoJS.enc.Utf8);
             

    email = JSON.parse(key).email
    console.log(email,  "<<---  email")
    var randomNum = Math.floor(Math.random() * 100000)
    console.log(randomNum,  "<<---  randomNum")

    // Sending mail
    sendMailForSignup(email, randomNum)

    let data = {
        email: email,
        randomNum: randomNum
    }

    encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(data), 'senselive').toString();
    // res.json(TOKEN);
    console.log("encrypted_data   ", encrypted_data)

    let insert_query = `INSERT INTO signup_verification(email, otp_generated) values('${email}', '${randomNum}')`

    db.query(insert_query, (err, result) => {
        if (err) throw err;
        res.send({
            status: true,
            data: encrypted_data,
            msg: "Mail sent to the mail provided!"
        })
    })
}




// SignupTwo
module.exports.signuptwo = async(req, res) => {

    console.log(req.body, 'email body - signuptwo  ###');

    let bytes  = CryptoJS.AES.decrypt(req.body.data, 'senselive2');
    let key = bytes.toString(CryptoJS.enc.Utf8); 
    console.log("key  -->", key)
    otp_entered = JSON.parse(key).otp_entered
    console.log(otp_entered,  "<<---  otp_entered")

    // let select_query = `SELECT * from signup_verification`
    let select_query = `SELECT * from signup_verification WHERE otp_generated = ${otp_entered}`                 // AND query required with email



    db.query(select_query, (err, result) => {
        if (err) throw err;

        

        console.log("result", result)      

         // Check if email already exists
         if (result.length > 0) {
            let data = {
                email: result[0].email,
                otp_generated: result[0].otp_generated
            }
            encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(data), 'senselive').toString();
            console.log("encrypted_data   ", encrypted_data)
               
            console.log("email", result[0].email)    
            console.log("otp_generated", result[0].otp_generated)
            res.send({
                status: true,
                data:encrypted_data,
                msg: "OTP sent to the mail provided!"
            })
        } else {
            res.send({
                status: false,
                msg: "OTP can't be send to the mail provided!"
            })
        }


    })


}





// signup
module.exports.signup = async (req, res) => {

    console.log(req.body, 'data###');
    let bytes  = CryptoJS.AES.decrypt(req.body.data, 'senselive2');
    let key = bytes.toString(CryptoJS.enc.Utf8); 
    console.log("key  -->", key)
    // otp_entered = JSON.parse(key).otp_entered

    const company_name = JSON.parse(key).company_name;
    const name = JSON.parse(key).name;
    const designation = JSON.parse(key).designation;
    const email = JSON.parse(key).email;
    const mobile_no = JSON.parse(key).mobile_no;
    const address = JSON.parse(key).address;
    const coldstorage = JSON.parse(key).coldstorage;
    const energy = JSON.parse(key).energy;
    const password = JSON.parse(key).password;

    // // first check email id already exits
    let email_check_qry = `SELECT * from temporycompanylogin WHERE email = '${email}'`;
    db.query(email_check_qry, async (err, result) => {
        if (err) throw err;
        // console.log(result, "  <---- result")
        console.log(result.length, "check email id")

        // Check if email already exists
        if (result.length > 0) {
            res.send({
                status: false,
                errormsg: "email already exists"
            })
        } else {
            // res.send({msg:"Welcome"})

            // Password Decrypt
            decrypt_password = await bcrypt.hash(password, 10);
            console.log(decrypt_password, "decrypted password   ")

            // insert data
            let insert_query = `INSERT INTO temporycompanylogin(CompanyName, Name, Designation, Email, MobileNo, Address, ColdStorage, Energy, Password) values('${company_name}', '${name}', '${designation}', '${email}', '${mobile_no}', '${address}', '${coldstorage}', '${energy}', '${password}')`
            
            
            db.query(insert_query, (err, result) => {
                if (err) throw err;
                res.send({
                    Headers: {
                        "Content-Type": "application/json"
                    },
                    status: true,
                    msg: 'user registered successfully!'
                })
            })
        }

    })

    // res.send('signup working!')
}



// forgotPasswordOne
module.exports.forgotPasswordOne = async(req, res) => {
    console.log(req.body, 'email body - forgotPasswordOne  ###');
    let bytes  = CryptoJS.AES.decrypt(req.body.email, 'senselive2');
    let key = bytes.toString(CryptoJS.enc.Utf8);
     

email = JSON.parse(key).email
    console.log(email,  "<<---  email")

  
      // check email
      let check_mail = `SELECT * FROM temporycompanylogin WHERE Email = '${email}'`
      db.query(check_mail, async (err, result) => {
          if (err) throw err
  
  
  
  
          if (result.length > 0) {

        
            var randomNum = Math.floor(Math.random() * 10000000)
            console.log(randomNum)

            sendMailForPasswordRecovery(email, randomNum)
            
            
            console.log(result, "result")
            console.log(result[0], "result[0]")
            console.log(result[0].Email, "result[0].Email")
            
            email = result[0].Email

            let data = {
                //   otp: result[0].name,
                  email: result[0].Email
              }

          
              encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(data), 'senselive').toString();
              console.log("Encrypted Data:  ", encrypted_data)
              
      



              let insert_query = `INSERT INTO email_recovery(email, otp_generated) values('${email}', '${randomNum}')`

                db.query(insert_query, (err, result) => {
                    if (err) throw err;
                    res.send({
                        status: true,
                        data: encrypted_data,
                        msg: "OTP sent to the mail provided!"
                    })
                })
              
              
            
        
  
  
  
  
          } else {
              res.send({
                  status: false,
                  msg: 'Your email is not yet registered!'
              })
          }
      })
}



// forgotPasswordTwo
module.exports.forgotPasswordTwo = async(req, res) => {
    
    
        console.log(req.body, 'body - forgotPasswordTwo  ###');

        let bytes  = CryptoJS.AES.decrypt(req.body.data, 'senselive2');
        let key = bytes.toString(CryptoJS.enc.Utf8); 
        console.log("key  -->", key)
        let otp_entered = JSON.parse(key).otp_entered

    let select_query = `SELECT * FROM email_recovery WHERE otp_generated = ${otp_entered}`

    db.query(select_query, (err, result) => {
        if (err) throw err;

        console.log("result of fp2", result)

        if (result.length > 0) {

            let data = {
                email: result[0].email,
                otp: result[0].otp_generated
            }

            encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(data), 'senselive').toString();
            // res.json(TOKEN);
            console.log("encrypted_data ", encrypted_data)

            res.send({
                    status: true,
                    data: encrypted_data,
                    msg: "OTP matched!"
                })


        }else{
            res.send({
                status: false,
                msg: "OTP didn't match!"
            })
        }

        })
    

    
}






// forgotPasswordThree
module.exports.forgotPasswordThree = async(req, res) => {
    console.log(req.body, 'body - forgotPasswordThree ###');
    let bytes  = CryptoJS.AES.decrypt(req.body.data, 'senselive2');
    let key = bytes.toString(CryptoJS.enc.Utf8); 
    console.log("key  -->", key)
    
    password  = JSON.parse(key).password
    cpassword  = JSON.parse(key).cpassword
    recovery_email  = JSON.parse(key).recovery_email
    console.log(password)
    console.log(cpassword)
    console.log("email here ----> ", JSON.parse(key).recovery_email)
    if (password == cpassword) {


        // let insert_query = `UPDATE users SET password = '${password}' WHERE email = ${recovery_email}`
        let insert_query = `UPDATE temporycompanylogin SET password = '${password}' WHERE email = '${recovery_email}'`

        db.query(insert_query, (err, result) => {

            if (err) throw err;

            let data = {
                email: recovery_email,
                password: password
            }

            encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(data), 'senselive').toString();
            // res.json(TOKEN);
            console.log("encrypted_data   ", encrypted_data)

            res.send({
                status: true,
                data: encrypted_data,
                msg: "Passwords match!"
    
            })
        })




        
    }
    else {
        res.send({
            status: false,
            msg: "Passwords didn't match!"

        })
    }


    
}







// login
module.exports.login = async (req, res) => {
    // res.send("Login working")


    console.log(req.body, 'login');

    let bytes  = CryptoJS.AES.decrypt(req.body.data, 'senselive2');
    let key = bytes.toString(CryptoJS.enc.Utf8);
    console.log("key  -->", key)
    let email = JSON.parse(key).email
    let password = JSON.parse(key).password

    console.log(password, "password")

    // check email
    let check_mail = `SELECT * FROM temporycompanylogin WHERE Email = '${email}'`
    db.query(check_mail, async (err, result) => {
        if (err) throw err
        
        if (result.length > 0) {

            let data = {
                name: result[0].Name,
                email: result[0].Email
            }

            console.log("name -->", result[0].Name)
            console.log("result -->", result)

            // console.log(result, "result")
            // console.log(result.length, "result")
            console.log(result[0], "result")
            console.log(result[0].Password, "password")
            console.log(result[0].Password, "result")

            encrypted_data = CryptoJS.AES.encrypt(JSON.stringify(data), 'senselive').toString();
            // res.json(TOKEN);
            console.log("encrypted_data   ", encrypted_data)


            // decrypt_password = await bcrypt.hash(result[0].password, 10);

            // // check password
            // let check_pwd = bcrypt.compareSync(password, decrypt_password)
            // console.log(check_pwd, "$$$$$$$$")
            result_response = result[0]
            console.log(result_response, " <---result_response")

            if (password == result[0].Password) {

                const token = jwt.sign( {data} , 'privatekey')
                console.log(token)
                encrypted_token = CryptoJS.AES.encrypt(JSON.stringify(token), 'senselive').toString();
                // res.json(TOKEN);
                console.log("encrypted_data   ", encrypted_token)
                res.send({
                    status: true,
                    token: encrypted_token,
                    result: encrypted_data,
                    response: result_response,
                    msg: "user logged in successfull!"
                })
            } else {
                res.send({
                    status: false,
                    msg: "invalid user"
                })
            }

            // if(check_pwd == true){
            //     res.send({
            //         status:true,
            //         msg:"user logged in successfull!"
            //     })
            // }else{
            //     res.send({
            //         status:false,
            //         msg:"invalid user"
            //     })
            // }




        } else {
            res.send({
                status: false,
                msg: 'invalid email id'
            })
        }
    })
}



// Dashboard

module.exports.dashboard = (req, res) => {
    console.log(req.token, "reqtoken##")
    // CHeck verification Token
    // req_token = localStorage.getItem('token')

    let check_token = verifyToken(req.token);
    // let check_token = verifyToken(req_token);
    console.log(check_token, "check_token")
    if (check_token.status == true) {

        res.send({
            status: true
        })
        let dashboard_qry = 'SELECT * FROM dashboard'
        db.query(dashboard_qry, (err, result) => {
            if (err) throw err

            encrypted_result = CryptoJS.AES.encrypt(JSON.stringify(result), 'senselive').toString();
            // res.json(TOKEN);
            console.log("encrypted_data   ", encrypted_result)

            if (result.length > 0) {
                res.send({
                    status: true,
                    data: encrypted_result
                })

            } else {
                res.send({
                    status: false,
                    msg: "data not found!"
                })
            }
        })
    } else {

        res.send({
            status: false
        })
        // res.send({
        //     status: false,
        //     msg: "token invalid!"
        // })
    }
}


// verify token

function verifyToken(token) {
    return jwt.verify(token, "privatekey", (err, result) => {
        if (err) {
            let a = { status: false }
            return a;
        } else {
            let b = { status: true }
            return b;
        }
    })
}





// tableData
module.exports.tableData = (req, res) => {
    console.log('api working here at home!')

    console.log("this is response table data", req.params.m_id)
    const m_id = req.params.m_id
    // console.log("this is response  ", req.m_id)
    // "SELECT * FROM em6400ng WHERE Device_Id = '{$m_id}' ORDER BY id ASC";
    
    let select_query = `SELECT * FROM em6400ng WHERE Device_Id = '${m_id}' ORDER BY id ASC LIMIT 30`

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        // res.send({
        //     status: true,
        //     result: result,
        //     msg: "table data available"
        // })
         encrypted_result = CryptoJS.AES.encrypt(JSON.stringify(result), 'senselive').toString();
        // res.json(TOKEN);
        // console.log("encrypted_result   ", encrypted_result)
        // res.send(result)
        res.send(encrypted_result)
    })
    
    // res.send('api working here at home!')
}


// tableDataMeterId
module.exports.tableDataMeterId = (req, res) => {
    console.log('api working here at tableDataMeterId!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id
    
    let select_query=`SELECT * FROM em6400ng WHERE Device_Id = '${m_id}' ORDER BY id ASC LIMIT 30`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableDataMeterId resulttttttttttttttttttttttttttttttttttttttttttt", result)
        res.send(result)
    })
}



// showReport
module.exports.showReport = (req, res) => {
    console.log('api working here at showReport!')
    
    let select_query=`SELECT * from report`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of showReport", result)
        res.send(result)
    })
}


// sortDay
module.exports.sortDay = (req, res) => {
    console.log('api working here at sortDay!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id
    // console.log("this is response  ", req.m_id)
    // "SELECT * FROM em6400ng WHERE Device_Id = '{$m_id}' ORDER BY id ASC";
    
    let select_query=`SELECT((SELECT KWh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 day) ORDER by id DESC LIMIT 1)-(SELECT KWh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 day) ORDER by id ASC LIMIT 1))AS KWh_D FROM em6400ng LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// sortDay2
module.exports.sortDay2 = (req, res) => {
    console.log('api working here at sortDay2!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id
    // console.log("this is response  ", req.m_id)
    // "SELECT * FROM em6400ng WHERE Device_Id = '{$m_id}' ORDER BY id ASC";
    
    let select_query=`SELECT((SELECT KVAh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 day) ORDER by id DESC LIMIT 1)-(SELECT KVAh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 day) ORDER by id ASC LIMIT 1))AS KVAh_D FROM em6400ng LIMIT 1`;


    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// sortDay3
module.exports.sortDay3 = (req, res) => {
    console.log('api working here at sortDay3!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id
    // console.log("this is response  ", req.m_id)
    // "SELECT * FROM em6400ng WHERE Device_Id = '{$m_id}' ORDER BY id ASC";
    
    let select_query=`SELECT((SELECT KVARh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 day) ORDER by id DESC LIMIT 1)-(SELECT KVARh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 day) ORDER by id ASC LIMIT 1))AS KVARh_D FROM em6400ng LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// sortDay4
module.exports.sortDay4 = (req, res) => {
    console.log('api working here at sortDay4!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id
    // console.log("this is response  ", req.m_id)
    // "SELECT * FROM em6400ng WHERE Device_Id = '{$m_id}' ORDER BY id ASC";
    
    let select_query=`SELECT((SELECT KVARh_R FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 day) ORDER by id DESC LIMIT 1)-(SELECT KVARh_R FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 day) ORDER by id ASC LIMIT 1))AS KVARh_R FROM em6400ng LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// sortMonth
module.exports.sortMonth = (req, res) => {
    console.log('api working here at sortMonth!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT((SELECT KWh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 month) ORDER by id DESC LIMIT 1)-(SELECT KWh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 month) ORDER by id ASC LIMIT 1))AS KWh_D FROM em6400ng LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// sortMonth2
module.exports.sortMonth2 = (req, res) => {
    console.log('api working here at sortMonth2!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT((SELECT KVAh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 month) ORDER by id DESC LIMIT 1)-(SELECT KVAh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 month) ORDER by id ASC LIMIT 1))AS KVAh_D FROM em6400ng LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// sortMonth3
module.exports.sortMonth3 = (req, res) => {
    console.log('api working here at sortMonth3!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT((SELECT KVARh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 month) ORDER by id DESC LIMIT 1)-(SELECT KVARh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 month) ORDER by id ASC LIMIT 1))AS KVARh_D FROM em6400ng LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// sortMonth4
module.exports.sortMonth4 = (req, res) => {
    console.log('api working here at sortMonth4!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT((SELECT KVARh_R FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 month) ORDER by id DESC LIMIT 1)-(SELECT KVARh_R FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 month) ORDER by id ASC LIMIT 1))AS KVARh_R FROM em6400ng LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// sortWeek
module.exports.sortWeek = (req, res) => {
    console.log('api working here at sortWeek!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT((SELECT KWh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 7 day) ORDER by id DESC LIMIT 1)-(SELECT KWh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 7 day) ORDER by id ASC LIMIT 1))AS KWh_D FROM em6400ng LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// sortWeek2
module.exports.sortWeek2 = (req, res) => {
    console.log('api working here at sortWeek2!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT((SELECT KVAh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 7 day) ORDER by id DESC LIMIT 1)-(SELECT KVAh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 7 day) ORDER by id ASC LIMIT 1))AS KVAh_D FROM em6400ng LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// sortWeek3
module.exports.sortWeek3 = (req, res) => {
    console.log('api working here at sortWeek3!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT((SELECT KVARh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 7 day) ORDER by id DESC LIMIT 1)-(SELECT KVARh_D FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 7 day) ORDER by id ASC LIMIT 1))AS KVARh_D FROM em6400ng LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// sortWeek4
module.exports.sortWeek4 = (req, res) => {
    console.log('api working here at sortWeek4!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT((SELECT KVARh_R FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 7 day) ORDER by id DESC LIMIT 1)-(SELECT KVARh_R FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 7 day) ORDER by id ASC LIMIT 1))AS KVARh_R FROM em6400ng LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of tableData", result)
        res.send(result)
    })
}


// timeStampSort_Day
module.exports.timeStampSort_Day = (req, res) => {
    console.log('api working here at timeStampSort_Day!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT * FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 day)`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of timeStampSort_Day", result)
        res.send(result)
    })
}


// timeStampSort_Hour
module.exports.timeStampSort_Hour = (req, res) => {
    console.log('api working here at timeStampSort_Hour!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT * FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 hour)`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of timeStampSort_Hour", result)
        res.send(result)
    })
}


// timeStampSort_Live
module.exports.timeStampSort_Live = (req, res) => {
    console.log('api working here at timeStampSort_Live!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT * FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time = CURRENT_TIMESTAMP`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of timeStampSort_Live", result)
        res.send(result)
    })
}


// timeStampSort_Minute
module.exports.timeStampSort_Minute = (req, res) => {
    console.log('api working here at timeStampSort_Minute!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT * FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 minute)`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of timeStampSort_Minute", result)
        res.send(result)
    })
}


// timeStampSort_Month
module.exports.timeStampSort_Month = (req, res) => {
    console.log('api working here at timeStampSort_Month!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT * FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 month)`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of timeStampSort_Month", result)
        res.send(result)
    })
}



// timeStampSort_Week
module.exports.timeStampSort_Week = (req, res) => {
    console.log('api working here at timeStampSort_Week!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id

    let select_query=`SELECT * FROM em6400ng WHERE Device_Id='${m_id}' AND reading_time >= DATE_SUB(CURRENT_TIMESTAMP, interval 1 week)`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of timeStampSort_Week", result)
        res.send(result)
    })
}



// uniqueCompanyName
module.exports.uniqueCompanyName = (req, res) => {
    console.log('api working here at uniqueCompanyName!')

    console.log("this is response  ", req.params.company_id)
    const company_name = req.params.company_id

    let select_query=`SELECT * FROM temporycompanylogin WHERE CompanyName = '${company_name}'`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of uniqueCompanyName", result)
        res.send(result)
    })
}



// uniqueEmail
module.exports.uniqueEmail = (req, res) => {
    console.log('api working here at uniqueEmail!')

    console.log("this is response  ", req.params.email)
    const email = req.params.email

    let select_query=`SELECT * FROM temporycompanylogin WHERE Email = '${email}'`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of uniqueEmail", result)
        res.send(result)
    })
}



// uniqueMeterName
module.exports.uniqueMeterName = (req, res) => {
    console.log('api working here at uniqueMeterName!')

    console.log("this is response  ", req.params.m_name)
    const meter_name = req.params.m_name

    let select_query=`SELECT * FROM temporycompanylogin WHERE meterName = '${meter_name}'`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of uniqueMeterName", result)
        res.send(result)
    })
}



// uniquePara
module.exports.uniquePara = (req, res) => {
    console.log('api working here at uniquePara!')

    console.log("this is response  ", req.params.data_type)
    const data_type = req.params.data_type

    let select_query=`SELECT * FROM temporycompanylogin WHERE data_type = '${data_type}'`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of uniquePara", result)
        res.send(result)
    })
}



// uniqueParameterData
module.exports.uniqueParameterData = (req, res) => {
    console.log('api working here at uniqueParameterData!')

    console.log("this is response  ", req.params.data_type)
    const data_type = req.params.data_type

    let select_query=`SELECT * FROM temporycompanylogin WHERE data_type = '${data_type}'`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of uniqueParameterData", result)
        res.send(result)
    })
}




// bar
module.exports.bar = (req, res) => {
    console.log('api working here at bar!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id
    
    let select_query=`SELECT reading_time, KWh_D, KVARh_D,KVARh_R, KVAh_D,V_LL,V_LN,Aavg,KW,KVAR,KVA,PF from em6400ng where Device_Id='${m_id}' AND reading_time > now() - INTERVAL 8 day GROUP BY day(reading_time) order by id ASC`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of bar", result)
        res.send(result)
    })
}


// day chart
module.exports.daychart = (req, res) => {
    console.log('api working here at chart!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id
    
    let select_query=`SELECT reading_time, KWh_D, KVARh_D,KVARh_R, KVAh_D,V_LL,V_LN,Aavg,KW,KVAR,KVA,PF from em6400ng where Device_Id='${m_id}' AND reading_time>now() - INTERVAL 1 day GROUP BY hour(reading_time) order by id ASC`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of chart", result)
        res.send(result)
    })
}

// allday chart
module.exports.alldaydata = (req, res) => {
    console.log('api working here at all day chart!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id
    
    let select_query=`SELECT reading_time, KWh_D, KVARh_D,KVARh_R, KVAh_D,V_LL,V_LN,Aavg,KW,KVAR,KVA,PF from em6400ng where Device_Id='${m_id}' AND reading_time>now() - INTERVAL 1 day GROUP BY minute(reading_time) order by id ASC`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of all day chart", result)
        res.send(result)
    })
}


// // deleteCard
module.exports.deleteCard = (req, res) => {
    console.log('api working here at deleteCard!')

    console.log("this is response  ", req.params.id)
    const m_id = req.params.id

    let query_id=`DELETE FROM parameterdata WHERE id = '${m_id}' `;
   
    db.query(query_id, (err, result) => {
        if (err) throw err;
        res.send(result)

    })

    // console.log("query_id_response", query_id_response)
   
    
    // id = (m_id !== null && m_id > 0)? query_id_response : false;


    // let select_query=`SELECT * FROM meterregistration WHERE company = '${value}' `;

    // db.query(select_query, (err, result) => {
    //     if (err) throw err;
        
        // console.log("Result of deleteMeter", result)
    //     res.send(result)
    // })
}


// // deleteMeter
module.exports.deleteMeter = (req, res) => {
    console.log('api working here at deleteMeter!')

    console.log("this is response  ", req.params.id)
    const m_id = req.params.id

    let query_id=`DELETE FROM meterregistration WHERE id = '${m_id}' `;
   
    db.query(query_id, (err, result) => {
        if (err) throw err;
        res.send(result)

    })
}


// displayMeter
module.exports.displayMeter = (req, res) => {
    console.log('api working here at displayMeter!')

    console.log("this is response  ", req.params.value)
    const value = req.params.value
    
    let select_query=`SELECT * FROM meterregistration WHERE company = '${value}' `;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of displayMeter", result)
        res.send(result)
    })
}


// displayMeterDetails
module.exports.displayMeterDetails = (req, res) => {
    console.log('api working here at displayMeterDetails!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id
    
    let select_query=`SELECT * FROM meterregistration WHERE id = '${m_id}' `;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of displayMeterDetails", result)
        res.send(result)
    })
}


// filterCompany
module.exports.filterCompany = (req, res) => {
    console.log('api working here at filterCompany!')
    
    let select_query=`SELECT DISTINCT Client FROM sensordata`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of filterCompany", result)
        res.send(result)
    })
}


// getCompanyData
module.exports.getCompanyData = (req, res) => {
    console.log('api working here at getCompanyData!')
    
    let select_query=`SELECT * FROM temporycompanylogin`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of getCompanyData", result)
        res.send(result)
    })
}


// getMeter
module.exports.getMeter = (req, res) => {
    console.log('api working here at getMeter!')
    
    let select_query=`SELECT * FROM meterregistration`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of getMeter", result)
        res.send(result)
    })
}


// getPara
module.exports.getPara = (req, res) => {
    console.log('api working here at getPara!')
    
    let select_query=`SELECT * FROM parameterdata`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of getPara", result)
        res.send(result)
    })
}


// getReport
module.exports.getReport = (req, res) => {
    console.log('api working here at getReport!')

    console.log("this is response  ", req.params.value)
    const value = req.params.value
    
    let select_query=`SELECT * FROM report WHERE Device_id='${value}' ORDER BY id ASC `;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of getReport", result)
        res.send(result)
    })
}


// meter_CardData
module.exports.meter_CardData = (req, res) => {
    console.log('api working here at meter_CardData!')

    const value = req.params.value
    console.log("this is response  ", value)
    
    let select_query=`SELECT * FROM em6400ng WHERE Device_Id IN (SELECT meterid FROM meterregistration WHERE meterid='${value}') ORDER BY id DESC LIMIT 1`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        // console.log("Result of meter_CardData", result)
        res.send(result)
    })
}




// addCard
module.exports.addCard = (req, res) => {
    console.log('api working here at addCard!')

    console.log("this is response  ", req.params.value)
    const value = req.params.value
    
    let select_query=`SELECT * from parameterdata where M_id='${value}'`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        // console.log("Result of addCard", result)
        res.send(result)
    })
}


// addParameter
module.exports.addParameter = (req, res) => {
    console.log('api working here at addParameter!')

    console.log("this is req.body  -->> ", req.body)

    if(req.body !== null){
        data_type =  req.body.data_type,
        Max1 = req.body.Max1,
        Min1 =  req.body.Min1,
        unit = req.body.unit,
        M_id = req.body.M_id
    }
    // $sql = "INSERT INTO parameterdata(data_type,M_id,Max1,Min1,unit) VALUES ('$data_type','$M_id', '$Max1','$Min1', '$unit')";

    
    let insert_query=`INSERT INTO parameterdata(data_type,M_id,Max1,Min1,unit) VALUES ('${data_type}','${M_id}', '${Max1}','${Min1}', '${unit}')`;

    db.query(insert_query, (err, result) => {
        if (err) throw err;
        
        let authdata = {
            data_type: data_type,
            Max1: Max1,
            Min1: Min1,
            unit: unit,
            M_id: M_id,
        }



        console.log("Result of addParameter", result)
        res.send(authdata)
    })
}



// addReport
module.exports.addReport = (req, res) => {
    console.log('api working here at addReport!')

    // console.log("this is req.body  -->> ", req.body)
    let data = req.body
    
    if(req.body !== {}){
        
        data.forEach(element => {
            // console.log("element", elemesnt)
            // console.log("element", element.length)
            device_id = element['Device_id'],
            initial_reading = element['initial_reading'],
            final_reading = element['final_reading'],
            total_time = element['total_time'],
            initial_kvah = element['initial_kvah'],
            final_kvah = element['final_kvah'],
        
            total_kvah = element['total_kvah']
        
            let insert_query= `INSERT INTO report(Device_id,final_reading,initial_reading,total_time,final_kvah,initial_kvah,total_kvah) VALUES ('${device_id}','${final_reading}','${initial_reading}','${total_time}','${final_kvah}','${initial_kvah}','${total_kvah}')`;

                    db.query(insert_query, (err, result) => {
                        if (err) throw err;
                        
                        // console.log("result", result)
                        // console.log("data inserted")
            
            
                // $sql = "INSERT INTO report(Device_id,final_reading,initial_reading,total_time,final_kvah,initial_kvah,total_kvah) VALUES ('$Device_id','$final_reading','$initial_reading','$total_time','$final_kvah','$initial_kvah','$total_kvah')";
                
            
                // res.send("result")   
                })
        
        });


        
}
else{
    console.log("Empty data received!")
}
}


// line2
module.exports.line2chart = (req, res) => {
    console.log('api working here at line2!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id
    
    let select_query=`SELECT reading_time, KWh_D, KVARh_D,KVARh_R, KVAh_D,KVA,KW,KVAR from em6400ng where Device_Id='${m_id}' AND reading_time>now() - interval 1 month GROUP BY day(reading_time) order by id ASC`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of line2", result)
        res.send(result)
    })
}


// line
module.exports.line = (req, res) => {
    console.log('api working here at line!')

    console.log("this is response  ", req.params.m_id)
    const m_id = req.params.m_id
    
    let select_query=`SELECT reading_time, KWh_D, KVARh_D,KVARh_R, KVAh_D,V_LL,V_LN,Aavg,KW,KVAR,KVA,PF from em6400ng where Device_Id='${m_id}' AND reading_time > now() - INTERVAL 1 day GROUP BY hour(reading_time)`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        console.log("Result of line", result)
        res.send(result)
    })
}




// registration_meter
module.exports.registration_meter = (req, res) => {
    console.log('api working here at registration_meter!')

    console.log("this is req.body  of registration meter-->> ", req.body)

    if(req.body !== null){
        meterName =  req.body.meterName,
        meterid = req.body.meterid,
        company =  req.body.company,
        location = req.body.location
    }
    // $sql = "INSERT INTO parameterdata(data_type,M_id,Max1,Min1,unit) VALUES ('$data_type','$M_id', '$Max1','$Min1', '$unit')";

    
    // let insert_query=`INSERT INTO parameterdata(data_type,M_id,Max1,Min1,unit) VALUES ('${data_type}','${M_id}', '${Max1}','${Min1}', '${unit}')`;


    let insert_query=`INSERT INTO meterregistration (meterName, meterid,company,location)
    SELECT '${meterName}', '${meterid}', '${company}', '${location}'
    WHERE NOT EXISTS 
        (SELECT meterid 
         FROM meterregistration 
         WHERE meterid = '${meterid}')`;


    db.query(insert_query, (err, result) => {
        if (err) throw err;
        
        let authdata = {
            meterName :  meterName,
        meterid : meterid,
        company :  company,
        location : location,
        }

        console.log("Result of addParameter", result)
        res.send(authdata)
    })
}


// Meter_DetailsUpdate
module.exports.Meter_DetailsUpdate = (req, res) => {
    console.log(req.body, 'body - Meter_DetailsUpdate ###');

    
    if(req.body !== null){
        id =  req.body.id,
        meterName = req.body.meterName,
        meterid = req.body.meterid,
        company =  req.body.company,
        location = req.body.location
    }
    // $sql = "INSERT INTO parameterdata(data_type,M_id,Max1,Min1,unit) VALUES ('$data_type','$M_id', '$Max1','$Min1', '$unit')";

    
    let update_query=`UPDATE meterregistration SET meterName = '${meterName}', location = '${location}' WHERE id = '${id}'`;

    db.query(update_query, (err, result) => {
        if (err) throw err;
        
        let authdata = {
            id: id,
            meterName: meterName,
            meterid: meterid,
            company: company,
            location: location
        }



        console.log("Result of MeterUpdate", result)
        res.send(authdata)
    })



    
}

// Meter_DetailsUpdate1
module.exports.Meter_DetailsUpdate1 = (req, res) => {
    console.log(req.body, 'body - Meter_DetailsUpdate1 ###');


    if(req.body !== null){
        id =  req.body.id,
        meterName = req.body.meterName,
        meterid = req.body.meterid,
        company =  req.body.company,
        location = req.body.location
    }
  

    
    let update_query=`UPDATE em6400ng SET Device_name = '${meterName}' WHERE Device_Id = '${meterid}'`;

    db.query(update_query, (err, result) => {
        if (err) throw err;
        
        let authdata = {
            id: id,
            Device_name: meterName,
        }



        console.log("Result of MeterUpdate1", result)
        res.send(authdata)
    })
    
}


// profile_update
module.exports.profile_update = (req, res) => {
    // console.log(req.body, 'body - profile_update');
    console.log('body - profile_update');

    
    if(req.body !== null){
        company =  req.body.company,
        profile_url = req.body.profile_url
    }
    // $sql = "INSERT INTO parameterdata(data_type,M_id,Max1,Min1,unit) VALUES ('$data_type','$M_id', '$Max1','$Min1', '$unit')";

    
    let update_query=`UPDATE profiledata SET profile_url = '${profile_url}' WHERE company = '${company}'`;

    db.query(update_query, (err, result) => {
        if (err) throw err;
        
        let authdata = {
            // id: id,
            company: company,
            profile_url: profile_url
        }



        // console.log("Result of profile_update", result)
        res.send(authdata)
    })



    
}

// profile_add
module.exports.profile = (req, res) => {
    // console.log(req.body, 'body - profile_add');
    console.log('body - profile_add');

    
    if(req.body !== null){
        company =  req.body.company,
        profile_url = req.body.profile_url
    }
    // $sql = "INSERT INTO parameterdata(data_type,M_id,Max1,Min1,unit) VALUES ('$data_type','$M_id', '$Max1','$Min1', '$unit')";

    
    let insert_query=`INSERT INTO profiledata(company,profile_url) VALUES ('${company}','${profile_url}')`;

    db.query(insert_query, (err, result) => {
        if (err) throw err;
        
        let authdata = {
            // id: id,
            company: company,
            profile_url: profile_url
        }



        // console.log("Result of profile_add", result)
        res.send(authdata)
    })



    
}


//delete profile
module.exports.profile_delete = (req, res) => {
    console.log('api working here at delete profile!')

    console.log("this is response  ", req.params.company)
    const m_id = req.params.company

    let query_id=`DELETE FROM profiledata WHERE company = '${m_id}' `;
   
    db.query(query_id, (err, result) => {
        if (err) throw err;
        res.send(result)

    })
}

// getprofile
module.exports.get_profile = (req, res) => {
    console.log('api working here at getprofile!')

    console.log("this is response  ", req.params.value)
    const value = req.params.value
    
    let select_query=`SELECT * FROM profiledata WHERE company='${value}'`;

    db.query(select_query, (err, result) => {
        if (err) throw err;
        
        // console.log("Result of getprofile", result)
        res.send(result)
    })
}

// //bar_graph  year
// module.exports.bar_year= (req ,res )=>{
//     // let select_query=`(SELECT id , reading_time , KVAh_D , KWh_D , KVARh_D , KVARh_R FROM em6400ng WHERE Device_Id=${JSON.stringify(req.query.d_id)} AND   reading_time <DATE_SUB(${JSON.stringify(req.query.date)}, interval  1 week) order by id desc limit 1)
//     // union all
//     // (SELECT id , reading_time , KVAh_D , KWh_D , KVARh_D , KVARh_R  FROM em6400ng WHERE Device_Id=${JSON.stringify(req.query.d_id)} AND   reading_time <DATE_SUB(${JSON.stringify(req.query.date)}, interval  2 week) order by id desc limit 1)
//     // union all 
//     // (SELECT id , reading_time , KVAh_D , KWh_D , KVARh_D , KVARh_R FROM em6400ng WHERE Device_Id=${JSON.stringify(req.query.d_id)} AND  reading_time <DATE_SUB(${JSON.stringify(req.query.date)}, interval 3 week) order by id desc limit 1)
//     // union all 
//     // (SELECT id , reading_time , KVAh_D , KWh_D , KVARh_D , KVARh_R FROM em6400ng WHERE Device_Id=${JSON.stringify(req.query.d_id)} AND  reading_time <DATE_SUB(${JSON.stringify(req.query.date)}, interval 4 week) order by id desc limit 1)
//     // union all 
//     // (SELECT id , reading_time , KVAh_D , KWh_D , KVARh_D , KVARh_R FROM em6400ng WHERE Device_Id=${JSON.stringify(req.query.d_id)} AND  reading_time <DATE_SUB(${JSON.stringify(req.query.date)}, interval 5 week) order by id desc limit 1)
//     // `;
    
//     let select_query=`select id , reading_time , KVAh_D , KWh_D , KVARh_D  from em6400ng WHERE Device_Id=${JSON.stringify(req.query.d_id)} AND reading_time <= ${JSON.stringify(req.query.date)} group by month(reading_time) order by id desc limit 13`;
//     //console.log(select_query);s
//     db.query(select_query, (err, result) => {
//         if (err) throw err; 
//         res.send(JSON.stringify(result))
//     });
// }

// //bar_graph  Month ---- it gives data of 5 week with diffrence of 1 week each 
// module.exports.bar_month= (req ,res )=>{
//     let select_query=`select id , reading_time , KVAh_D , KWh_D , KVARh_D  from em6400ng WHERE Device_Id=${JSON.stringify(req.query.d_id)} AND reading_time <= ${JSON.stringify(req.query.date)} group by week(reading_time) order by id desc limit 5`;
    
//     //console.log(select_query);
//     db.query(select_query, (err, result) => {
//         if (err) throw err;
//         res.send(JSON.stringify(result))
//     });
// }
// //bar_graph  Day -- it gives data of 24 hours with  diffrence of 1 hour each 
// module.exports.bar_day= (req ,res )=>{

//     let select_query=`select id , reading_time , KVAh_D , KWh_D , KVARh_D  from em6400ng WHERE Device_Id=${JSON.stringify(req.query.d_id)} AND reading_time <= ${JSON.stringify(req.query.date)} group by hour(reading_time) order by id desc limit 24`;
//     //console.log(select_query);
//     db.query(select_query, (err, result) => {
//         if (err) throw err;
//         res.send(JSON.stringify(result))
//     });
// }

//bar_graph  Week  ---- it gives data according to the frame (day , week , month , year ) 
module.exports.bar_graph= (req ,res )=>{
    frame = JSON.stringify(req.query.frame).slice(1, -1)
    limit = JSON.stringify(req.query.limit).slice(1, -1)
    let select_query=`select id , reading_time , KVAh_D , KWh_D , KVARh_D  from em6400ng WHERE Device_Id=${JSON.stringify(req.query.d_id)} AND reading_time <= ${JSON.stringify(req.query.date)} group by ${frame}(reading_time) order by id desc limit ${limit}`;
    //console.log(select_query);

    // it gived data for line chart on overview section of dashboard ,, for past 30 days wit fiffence of 1 day each 
    if (req.params.m_id  == 'line'){
        now = new Date(JSON.stringify(req.query.date))
        const backdate = new Date(now.setDate(now.getDate() - 30));
        date = [backdate.getFullYear(), backdate.getMonth()+1, backdate.getDate()].join('-');
        console.log(backdate , JSON.stringify(req.query.date) , date)
        select_query=`select id , reading_time , KVA, KW , KVAR  from em6400ng WHERE Device_Id=${JSON.stringify(req.query.d_id)} AND reading_time between ${date} and ${JSON.stringify(req.query.date)} group by day(reading_time) order by id asc `;
    }

    console.log(select_query)
    db.query(select_query, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result))
    });
}


//line_graph 
module.exports.line=(req,res)=>{

    if(req.params.graph == "date"){
        data = 'voltage_L, KW , current'
        select_query = `SELECT id , date_time , current , voltage_N , voltage_L , pf , freq , kw , kvar , kva , kwh , imp_kvarh , kvah  FROM main_database where device_uid = '${req.query.d_id}' and date_time BETWEEN '${req.query.d1}' AND '${req.query.d2}'  ORDER BY id DESC limit 412222`
    }

    else{
        data = 'voltage_L, KW , current'
        //let select_query = `SELECT id , date_time , voltage_N , ${data}  FROM main_database where device_id= '${req.query.d_id}' ORDER BY id DESC LIMIT ${req.query.limit}`;
        select_query = `SELECT id , date_time , current , voltage_N , voltage_L , pf , freq , kw , kvar , kva , kwh , imp_kvarh , kvah  FROM main_database where device_uid = "${req.query.d_id}" ORDER BY id DESC LIMIT ${req.query.limit};`;
    }
    console.log(select_query)

DB.query(select_query, (err, result) => {
    console.log(select_query)
    if (err) throw err;
    res.send(JSON.stringify(result))
});
    //console.log(req.params.graph,JSON.stringify(req.query));
}


