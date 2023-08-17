const axios = require("axios");
const niceList = require("../utils/niceList.json"); // use this
const MerkleTree = require("../utils/MerkleTree"); // use this

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?

  const name = "Chris Windler";
  const merkleTree = new MerkleTree(niceList);
  index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: proof,
  });

  console.log({ gift });
}

main();
