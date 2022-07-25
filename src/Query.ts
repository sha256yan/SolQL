import { ethers } from "ethers";
import { Oracle } from "./Oracle";
import { Compiler } from "./Compiler";

import { default as h } from "hardhat";
const hre: any = h;


interface IQuery {
  oracle: Oracle
  compiler: Compiler
  run(): Promise<Object>
}



class Query implements IQuery {

  oracle: Oracle
  compiler: Compiler
  targetName: string

  
  constructor(compiler: Compiler, targetName: string, chainID: string, provider: ethers.providers.Provider) {
    this.oracle = new Oracle(chainID, provider);
    this.compiler = compiler;
    this.targetName = targetName;
  }


  async run() {
    const bytecode = await this.compiler.compileFromTarget(this.targetName);
    const rawQueryResult = await this.oracle.runQuery(bytecode);
    return rawQueryResult;
  }

}




export { Query };