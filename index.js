const express =require('express');
const bodyParser =require('body-parser');
const app = express();

app.use(bodyParser.text());
const port = 8000;

// เก็บ user
let users = []
let counter = 1

/*
GET /users สำหรับ get users ทั้งหมด
POST /users สำหรับ create user ใหม่ที่บันทึกเข้าไป
GET /users/
PUT /users/:id สำหรับ update user รายคนที่ต้องการบันทึกเข้าไป

*/
// path = GET /users
app.get('/users',(req,res) => {
    res.json(users)
})

// path = POST / user
app.post('/user',(req,res) => {  
    let user = req.body;
    user.id = counter
    counter +=1
    users.push(user);
    res.json({
        message: "User created" ,
        user: user
    });
})

// path = PUT /user/:id
app.put('/user/:id',(req,res) => { //ใช้ในการแก้ไขข้อมูล
    let id = req.params.id;
    let updateUser = req.body;
    //หา user จาก id ที่ส่งมา
    let selectedIndex = users.findIndex(user => user.id == id)
    //update user นั้น
    if (updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
    }
    if (updateUser.lastname){
        users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
    }

    res.json({
        message: "User updated",
      data: {
        user: updateUser,
        indexUpdate: selectedIndex
      }  
    });
    //ส่งข้อมูล user ที่ update ส่งกลับไปเข้าที่เดิม
  
})

app.listen(port,(req,res) => {  //ตัวช่วยในการเฝ้าการส่งข้อมูล และส่งข้อมูลออกไป 
    console.log('Server is running on port' + port);
});


// path = DELETE /user/:id
app.delete('/user/:id',(req,res) => {
    let id = req.params.id;
    //หา index ของ user ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id)

    users.splice(selectedIndex,1)
    res.json({
        message: "Delete Completed",
        indexDeleted: selectedIndex
    })
})