import { ethers } from "ethers"




interface IOracle {
    contractObject: ethers.Contract
    runQuery(queryBytecode: string): Promise<Object>
}


//constants on oracle deployments. 
const ORACLE_ABI = ["function run(bytes memory) external returns(bytes memory)"]
const ORACLE_ADDRESSES: {[chainID: string]: string} = {
    "5": "0x3db0fB82e35765b788558cAf538D68b60F4fEE98"
}








class Oracle implements IOracle {
    contractObject: ethers.Contract

    /*
        Gets deployed address of the oracle contract on the specified chain.
    */
    static getAddress(chainID: string) {
        return ORACLE_ADDRESSES[chainID];
    }

    constructor(chainID: string, provider: ethers.providers.Provider) {

        //address and abi needed to instantiate a Contract object.
        const address = Oracle.getAddress(chainID);
        const abi = ORACLE_ABI;

        this.contractObject = new ethers.Contract(address, abi, provider);
    }

    /*
        Runs the bytecode of a query and returns the bytes[] result. Result not decoded yet. 
    */
    async runQuery(queryBytecode: string) {
        const rawQueryResult = await this.contractObject.callStatic.run(queryBytecode);
        return rawQueryResult;
    }
}


export { Oracle };