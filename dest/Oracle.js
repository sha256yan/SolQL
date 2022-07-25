"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oracle = void 0;
const ethers_1 = require("ethers");
//constants on oracle deployments. 
const ORACLE_ABI = ["function run(bytes memory) external returns(bytes memory)"];
const ORACLE_ADDRESSES = {
    "5": "0x3db0fB82e35765b788558cAf538D68b60F4fEE98"
};
class Oracle {
    constructor(chainID, provider) {
        //address and abi needed to instantiate a Contract object.
        const address = Oracle.getAddress(chainID);
        const abi = ORACLE_ABI;
        this.contractObject = new ethers_1.ethers.Contract(address, abi, provider);
    }
    /*
        Gets deployed address of the oracle contract on the specified chain.
    */
    static getAddress(chainID) {
        return ORACLE_ADDRESSES[chainID];
    }
    /*
        Runs the bytecode of a query and returns the bytes[] result. Result not decoded yet.
    */
    runQuery(queryBytecode) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawQueryResult = yield this.contractObject.callStatic.run(queryBytecode);
            return rawQueryResult;
        });
    }
}
exports.Oracle = Oracle;
