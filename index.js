const SHA256=require("crypto-js/sha256")

class CryptoBlock{
    constructor(index,timestamp,data,precedingHash=""){
        this.index=index;
        this.data=data;
        this.timestamp=timestamp;
        this.precedingHash=precedingHash;
        this.hash=this.computeHash();
        this.nouce=0;

    }

    computeHash(){
        return SHA256(
            this.index+
            this.precedingHash+
            this.timestamp+
            JSON.stringify(this.data) + 
            this.nouce

        ).toString();
    }

    proofOfWork(difficulty){
        while(
            this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")
        ){
            this.nouce++;
            this.hash=this.computeHash();
        }
    }

}

class cryptoBlockchain{
    constructor(){
        this.blockchain=[this.startGenesisBlock()];
        this.difficulty=4;
    }
    startGenesisBlock(){
        return new CryptoBlock(0,"23/03/2024","Initial block in the chain","0");
      
    }
    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length - 1]

    }

    addNewBlock(newBlock){
        newBlock.precedingHash=this.obtainLatestBlock().hash;
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);

    }
    checkChainValidity(){
        for(let i=1;i<this.blockchain.length;i++){
            const currentBlock=this.blockchain[i];
            const precedingBlock=this.blockchain[i - 1];

            if(currentBlock.hash !== currentBlock.computeHash()){
                return false;
            }
            if(currentBlock.precedingHash !== precedingBlock.hash) return false;
        }
        return true;
    }
}

// usage
const dollarCoin=new cryptoBlockchain();

console.log("dollarCoin mining is in progress ....");

dollarCoin.addNewBlock(
    new CryptoBlock(1,"24/03/2024",{
        sender:"degraft frimpong",
        recepient:"dollar kweku",
        quantity:50
    })
)

dollarCoin.addNewBlock(
    new CryptoBlock(2,"25/03/2024",{
        sender:"philip frimpong",
        recepient:"Oscar dollar frimpong",
        quantity:100
    })
)

console.log(JSON.stringify(dollarCoin,null,4))