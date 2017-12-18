const path = require('path');
const express = require('express');
var PUBLICPATH = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;
var app = express();
app.use(express.static(PUBLICPATH));

app.listen(PORT,()=>{
  console.log(`chat application running at PORT ${PORT}...`);
})
