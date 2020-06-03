pragma solidity^0.5.0;

contract Inbox {
    string public message;
    
    constructor(string memory initialMsg) public{
        message = initialMsg;
    }
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
