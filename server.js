const express=require('express');
const app=express();
const bp=require('body-parser');

app.use(express.static('newapp/build'));
const db=require('mongoose');
db.connect('mongodb+srv://jenia_vine:cM4X2Y0eUo0HGLHV@cluster0.5d81gqr.mongodb.net/WarCard')
app.use(bp.json());


const userSchema=db.Schema({
    name:String,
    wins:Number,
    loose:Number
})

const usersList=db.model('users',userSchema)

app.get('/players',(req,res)=>{
    const getAll=async()=>{
      let temp =  await usersList.find();
      res.json(temp)
    }
    getAll()
})
app.post('/add', async (req, res) => {
 
    const existingUser = await usersList.findOne({ name: req.body.name });
    if (existingUser) {
      res.json({ message: 'User already exists' });
    } else {
      await usersList.insertMany({ name: req.body.name, wins: 0, loose: 0 });
      res.json({ message: 'ok' });
    }
});

// const download=async()=>{
//     await usersList.insertMany([{name:'Joni',wins:0,loose:0},{name:'Lui',wins:0,loose:0},{name:'Albert',wins:0,loose:0}])
// }
// download()

app.put('/update',(req, res) => {
  const updateUser= async()=>{
    const { name, wins, loose } = req.body;
      const result = await usersList.updateOne({ name }, { $set: { wins, loose } });
      if (result == -1) {
        res.json({ message: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
  }
  updateUser()
});


app.listen('4002',()=>{console.log('server on')});