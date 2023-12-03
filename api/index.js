import express from 'express';
import axios from 'axios';
import cors from 'cors';
// import dotenv from 'dotenv';


// const PORT = process.env.NODE_PORT || 4444;


const app = express();
app.use(cors());
app.get('/api', async (req, res)=>{
  try {
    const url_image = req?.query?.url_image;
    if (url_image){

      const responseAxios = await axios.get(url_image,{
        responseType: 'arraybuffer'
      })
      const b64 = Buffer.from(await responseAxios.data, 'binary').toString('base64');
      const mimeType = `image/${url_image.split('.').pop()}`      
      res.status(200).send(`data:${mimeType};base64,${b64}`);
    }else{
      res.send('Something occurred wrong !!!')
    }
    
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.get('/api/test', async (req, res)=>{

  res.send('test work')
})
export default app;
// app.listen(PORT, ()=>console.log(`Lisen port ${PORT}`))