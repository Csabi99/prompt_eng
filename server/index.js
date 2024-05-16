const cors = require('cors')
const express = require('express')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express()
const port = 3000
const dotenv = require('dotenv');
var bodyParser = require('body-parser')
dotenv.config({ path: `${__dirname}/.env` });


app.use(cors());
app.use(bodyParser.json())

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function gen(message) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `Act as an SQL expert. Generate an SQL query for the following request. Your output should be only an SQL query as a plain text, without any formatting. So without new-line characters or quotes. However if the request is not normally interpretable as an sql query, return a message which indicates this. The problem:${message}`
  console.log(prompt)
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}


app.post('/app', async (req, res) => {
    console.log(req.body);
    const text = await gen(req.body.text);
    res.send({text});
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

