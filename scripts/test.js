const { ethers } = require("ethers");
const { Query, HardhatDependentCompiler, OracleContract } = require("../dest/exports");

const hre = require("hardhat");


async function main() {
  //await testHardhatDependentCompiler();
  //await testOracleContract();
  //await testQuery();
}



async function testHardhatDependentCompiler() {
  const compiler = new HardhatDependentCompiler();
  const bytecode = await compiler.compileFromTarget("Query");

  //Only a visual inspection of compiled bytecode. Correctness of compilation not tested. 
  console.log(bytecode);
  return bytecode;
}


async function testOracleContract() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
  const oracle = new OracleContract("5", provider);
  console.log(oracle.contractObject);
}



async function testQuery() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);
  const compiler = new HardhatDependentCompiler();

  const query = new Query(compiler, "Query", "5", provider);
  const result = await query.run();
  console.log(result)
  return result;
}





main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });