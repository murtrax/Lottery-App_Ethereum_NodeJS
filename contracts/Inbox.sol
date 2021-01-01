//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.17;

contract Inbox {
    string public message;
    string [] public test; 

    constructor(string memory IntialMessage) public {
        message = IntialMessage;
        test.push('hey');
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
