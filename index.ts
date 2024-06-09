#! /usr/bin/env node

import inquirer from "inquirer"



//bank account interface
interface Bankaccount{
    accountNumber:number;
    balance:number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance():void
}
//Bank account class
class Bankaccount implements Bankaccount{
    accountNumber: number;
    balance: number;
    constructor(accountNumber:number,balance:number){
        this.accountNumber=accountNumber
        this.balance=balance
    }
//Depit money
withdraw(amount: number): void {
    if(this.balance>=amount){
        this.balance-=amount
            
        console.log(`withdrawl of  $ ${amount} successful.Remaining balance:${this.balance}`);

    }else{
        console.log("Insufficient balance");
        
    }
}
//credit money
deposit(amount: number): void {
    if(amount>100){
        amount-=1//$ fee charged if more than $100 is deposited
    }this.balance+=amount;
    
    console.log(`Deposit of    $${amount } successful .Remining balance:$${this.balance}`);
    }
 

    
 
 //check balance
 checkBalance(): void {
     console.log(`Current balance:$${this.balance}`);
 } 
}

//cústemer class
class Customer{
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobilenumber:number;
    account:Bankaccount; 
constructor(firstName:string,lastName:string,gender:string, age:number, mobilenumber:number,
    account:Bankaccount){
        this.firstName=firstName
        this.lastName=lastName
        this.gender=gender
        this.age=age
        this.mobilenumber=mobilenumber
        this.account=account
    }

}
const account:Bankaccount[]=[
    new Bankaccount(1001,500),
    new Bankaccount(1002,1000),
    new Bankaccount(1003,2000)
];
//create customer
const customer:Customer[]=[
    new Customer("Humza","khan","male",45,3162223334,account[0]),
     
    new Customer("Hina","saleem","female",35,3332223334,account[1]),
    new Customer("Hasseen","jahan","female",45,3412223334,account[2])
]
//functin to interact with bank account
async function service(){
    do{
const accountNumberInput =await inquirer.prompt({
name:"accountNumber",
type:"number",
message:"Enter your account "    
})
const customers=customer.find(customers=>customers.account.accountNumber===accountNumberInput.accountNumber)
if(customers){
console.log(`Welcome ,${customers.firstName} ${customers.lastName}!\n`);
const ans=await inquirer.prompt({
    name:"select",
    type:"list",
    message:"select an operation",
    choices:["Deposit","Withdraw","checkBalance","Exit"]
})
switch(ans.select){
    case "Deposit":
    const depositAmount=await inquirer.prompt({
        name:"amount",
        type:"number",
    message:"Enter the amount to deposit:"

    })
    customers.account.deposit(depositAmount.amount);
    break;
    case "Withdraw":
    const withdrawAmount=await inquirer.prompt({
        name:"amount",
        type:"number",
    message:"Enter the amount to withdraw:"

    })
    customers.account.withdraw(withdrawAmount.amount);
    break;
    
    case "checkBalance":
    customers.account.checkBalance();

    
    
break;



case "Exit":
console.log("exiting Bank Program");
console.log("\n Thank you using our Bank services.Have a great Day!");
process.exit();

}

}else{
    console.log("Invalid account number ,please try again");
    
}
    }while(true)
}
service()

