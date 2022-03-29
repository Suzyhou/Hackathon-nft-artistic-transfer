const express = require('express');
const app = express();
const port = 3000;


var sys = require('sys');
var exec = require('child_process').exec;
const mint = require("./scripts/mint-nft.js");



app.get('/', (req, res) => {
  exec(
    "npx hardhat run scripts/deploy.js --network rinkeby",
    (error,stdout,stderr)=>{
      console.log(stdout)
    }
    )
  res.send('Hello World!')
})

app.get("/mint",(req,res)=>{
  mint.mintNFT("https://gateway.pinata.cloud/ipfs/QmY6BaQL3AZJgNhnYQfHUzXQc5DJFnLhLDKmxhZeqNX1bk");
  res.send('Hello World!');
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})