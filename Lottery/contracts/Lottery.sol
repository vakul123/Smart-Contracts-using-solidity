pragma solidity^0.5.0;

contract Lottery{
    address public manager;
    address payable[] public players;
    
    constructor()public {
        manager = msg.sender;
    }
    
    function enter() public payable { 
        require(msg.value > 0.1 ether);
        players.push(msg.sender);
    }
    
    function random() public view returns (uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, now , players)));
    }
    
    function pickWinner() public restricted {
       
        uint index  = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
        
    }
    
    modifier restricted() {
        require(manager == msg.sender);
        _;
    }
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
    
}