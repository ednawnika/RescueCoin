pragma solidity ^0.4.17;

contract RescueCoin {
    
    address public donor;
    address public manager;
    address public distress;
    uint public minimumContribution;
    address[] public donators;
    address[] public distressed;
    address[] public ngo; 


    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
        
    function rescue(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    function ngostore(uint minimum) public  {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    function donorcontribute() public payable {
        require(msg.value > minimumContribution);
        donators.push(msg.sender);
        
    }
    
    function distressedcontribute() public payable {
        require(msg.value > minimumContribution);
        
        distressed.push(msg.sender);
        ngo.push(msg.sender);
        
    }
    

    function getdonors() public view returns (address[]) {
        return donators;
    }



  
}
    