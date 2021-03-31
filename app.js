const express = require('express');
const mongooseConnect = require('./configs/mongoose');
const routes = require('./routes')
const cors=require('cors')
const app = express();
const PORT =  process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // methods: "HEAD",
  preflightContinue: false,
  credentials: true,
}

app.use(cors(corsOptions))

mongooseConnect();

app.get("", (req, res) => {
  res.send("<h1>Clash of Clans-like backend</h1>");
});

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Port successfuly runs on http://localhost ${PORT}`);
})