require ('dotenv').config()
const mongoose= require ('mongoose')
const User =require ('./models/user')

const express =require ('express')
const app = express()
const port = process.env.PROT || 3000

connectDb().catch(err=> console.log(err));

app.use(express.json())

app.post('/users', async(req, res, next)=>{
    const user =new User(req.body);
    
    try{
        const saveUser = await user.save()
        res.status(201).send(saveUser)
    } catch(e){
        res.status(400).send(e)
    }

})

app.get('/users', async(req, res, next)=>{
    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }

})

app.patch('/users/:id', async(req, res, next)=>{
    const userId = req.params.id
    try{
        const users = await User.findByIdAndUpdate(userId, req.body, {
            new:true,
            runValidators:true
        })
        if (!user) return res.status(404).send('user not found!')
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }
})

app.delete('/users/:id', async(req, res, next)=>{
    const userId = req.params.id
    try{
        const users = await User.findByIdAndDelete(userId)
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }
})

app.listen(port,()=>{
    console.log(`le server est lance a: http://localhost: ${port}`)
})




// function:
//1-connect:
async function connectDb (){
    await mongoose.connect(process.env.MONGO_URL)
    console.log('connection OK! ')

}

