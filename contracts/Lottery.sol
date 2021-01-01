//SPDX-License-Identifier: UNLICENSED
pragma solidity >0.5.0;

contract Lottery {
    address public manager;
    address payable [] private players;
    address [] public players2; 
    
   constructor() public {
        manager = msg.sender; 
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    modifier minAmountToEnter() {
        require(msg.value >= 0.01 ether);
        _;
    }

    function enter() public payable minAmountToEnter {
        players.push(msg.sender);
    }
    
    function random() private view returns (uint){
        return uint(keccak256(abi.encodePacked(players, block.difficulty, block.timestamp)));
    }
    
    function pickWinner() public restricted{
        require(msg.sender == manager);
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }
    
    function contractBalance () public view returns (uint) {
        return address(this).balance;
    }
    
    function getPlayers() public view returns ( address payable [] memory) {
        return players;
    }
    
}