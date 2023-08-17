const express = require("express");
const verifyProof = require("../utils/verifyProof");
const MerkleTree = require("../utils/MerkleTree"); // use this
const niceList = require("../utils/niceList.json");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
const merkleTree = new MerkleTree(niceList);

// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "cfc8724d7c34f22be4fff2b81a6259eb2b33a691442a9dd10129bc4b5ef2b7df";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  console.log(body);
  console.log(MERKLE_ROOT);

  const name = body.name;
  const proof = body.proof;

  // TODO: prove that a name is in the list
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    res.send(name + " " + "You got a toy robot!");
  } else {
    res.send(name + " " + "You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
