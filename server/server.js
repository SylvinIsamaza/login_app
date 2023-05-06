const connect = require('./database/conn')
const express=require('express')
const cors = require('cors')
const morgan=require('morgan')

const router =require('./router/router.js');

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack


const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api', router)
 async function serverStart(){
  try{
    await connect()
    app.listen(port, () => console.log(`Server is running on port ${port}`));
    
  } 
  catch(error){
    console.log(error)||"server is not running"
  }
}
serverStart()


