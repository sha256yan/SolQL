import { default as h } from "hardhat";
const hre: any = h;


/*
    Target can be either the contracts name in case of the HardhatDependent implementation, or the directory of the file containing the contract.
*/
interface ICompiler {
    compileFromTarget(targetName: string) : Promise<string>
}






/*
    Wrapper class for full compiler implementations.
*/
class Compiler implements ICompiler {
    compileFromTarget(targetName: string): Promise<string> {
        return new Promise((resolve, reject) => null);
    }
}







class HardhatDependentCompiler extends Compiler {

    /*
        Since we do not care about anything other than the bytecode, since
        the bytecode is the only component we send to the Oracle contract, 
        we discard the ContractFactory object and only keep the bytecode. 
    */
    async compileFromTarget(targetName: string): Promise<string> {
        const bytecodePromise = hre.ethers.getContractFactory(targetName)
        .then((contractFactory: any) => contractFactory.bytecode)
        .catch((error: Error) => {
            console.error(error)
        })

        return bytecodePromise;
    }


}



export { Compiler, HardhatDependentCompiler };