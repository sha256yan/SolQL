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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const ethers_1 = require("ethers");
const hardhat_1 = __importDefault(require("hardhat"));
const hre = hardhat_1.default;
class Query {
    constructor(bytecode, oracleAddress, provider) {
        this.oracle = new ethers_1.ethers.Contract(oracleAddress, ["function run(bytes memory) external returns(bytes memory)"], provider);
        this.bytecode = bytecode;
        return this;
    }
    static runFromContract(contractName, oracleAddress, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const bytecode = (yield hre.ethers.getContractFactory(contractName)).bytecode;
            const query = new Query(bytecode, oracleAddress, provider);
            const result = query.run();
            return result;
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.oracle.callStatic.run(this.bytecode);
            return result;
        });
    }
}
exports.Query = Query;
