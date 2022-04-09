# Hackathon-nft-artistic-transfer

This repository attempts to combine the technique of artistic transfer with nft.
The artistic transfer is using tensorflow hub quick artistic transfer model.


To use this repository, it is necessary to install React JS, node JS, and python.
Subsequently, the required packages are list in ./backend/requirements.txt (for python), ./nft-opensea/nft (node js), and ./frontend (for react).

In nft-opensea/nft, please setup the environment variable using env_tmp. The private key and public key is for Metamask, and API_URL belongs to the Alchmey. To upload the image to pinata, the enviroment variables need to be setup (PINATA_API,PINATA_SECRET).

To launch the service, 
(1) run python main.py in backend
(2) run npm start in frontend
(2) run node app.js in nft-opensea/nft