//let balance = 500.00;

class Transaction {
  constructor(amount,Account) {
    this.amount = amount;
    this.Account = Account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.Account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction{
  get value() {
     return -this.amount;
  }
  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.Account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction {
  get value() {
     return this.amount;
  }
  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }
}

class Account {

  constructor(username) {
    //this.username = username;
    this.transactions=[];
    // Have the account balance start at $0 since that makes more sense.
  }
  get balance() {
  	let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }


}
const myAccount = new Account("snow-patrol");

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

t1 = new Withdrawal(50.25, myAccount);
t1.commit();

//t1 = new Withdrawal(50.25);
//t1.commit();
console.log('Transaction 1:', t1);
/*
t2 = new Withdrawal(9.99);
t2.commit();
console.log('Transaction 2:', t2);
*/
console.log('Balance:', t1.Account.balance);

t3 = new Deposit(120.00,myAccount);
t3.commit();
console.log('Transaction 3:', t3);
console.log('Balance:', t3.Account.balance);
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Balance:', t1.Account.balance);

