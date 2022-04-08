const express = require('express');
const app = express();
const port = 3333;
const cors = require('cors');

var sys = require('sys');
var exec = require('child_process').exec;
const mint = require("./scripts/mint-nft.js");


app.use(cors())
app.get('/', (req, res) => {
  exec(
    "npx hardhat run scripts/deploy.js --network rinkeby",
    (error,stdout,stderr)=>{
      console.log(stdout)
    }
    )
  res.send('Hello World!')
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/mint",async (req,res)=>{
  const dest = JSON.parse(req.body.dest).IpfsHash;
  console.log(dest)
  let rec = await mint.mintNFT(`https://gateway.pinata.cloud/ipfs/${dest}`);
  console.log(rec)
res.send(rec)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})