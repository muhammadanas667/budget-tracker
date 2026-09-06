console.log("JS file loaded")


// Getting all the HTML elements by their IDs using document.getElementByID
let transactions = [];
const submitBtn = document.getElementById('submitBtn')
const nameInput = document.getElementById('name')
const amountInput = document.getElementById('amount')
const typeInput = document.getElementById('type')
const transList = document.getElementById('transList')
const totalBalance = document.getElementById('totalBalance')
const totalIncome = document.getElementById('totalIncome')
const totalExpense = document.getElementById('totalExpense')


//The updateSummary function will update the total balance, total income and total expense in real-time
function updateSummary(){
        let intialBalance = 0;
        let incomeSum = transactions.filter((transaction) => transaction.type === "income").reduce((sum, t) => sum + Number(t.amount), intialBalance)
        let expenseSum = transactions.filter((transaction) => transaction.type === "expense").reduce((sum, t) => sum + Number(t.amount), intialBalance)
        let balance = incomeSum + expenseSum;
        totalBalance.textContent = balance;
        totalIncome.textContent = incomeSum;
        totalExpense.textContent = expenseSum;
    }


// The renderTransaction function will take care of the creating and reseting lists, creation of text element, creation of delete button and showing everything on the page.
function renderTransaction(){
    transList.innerHTML = "";
    for(let i = 0; i < transactions.length; i++){
        const t = transactions[i];
        
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = `${t.name} - ${t.amount} (${t.type})`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function(){
            transactions = transactions.filter(trans => trans.id !== t.id);
            updateSummary();
            renderTransaction();
        }
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        transList.appendChild(li);
    }
}


//This eventListener will stop user from entering the symbols and signs. For now it just contains few signs
amountInput.addEventListener('keydown', function(event){
    if(event.key === '-' || event.key === '+' || event.key === 'e' || event.key === '*'){
        event.preventDefault();
    }
})


/* This eventListener will add functionality to submit button. Upon entering the invalid or no amount it will show an alert. 
   At the end this eventListener will create a unique ID for each transaction and calls the above 2 functions.
*/
submitBtn.addEventListener('click', function(){
    let nameValue = nameInput.value;
    let amountValue = amountInput.value;
    let typeValue = typeInput.value;

    if(!nameValue  || !amountValue){
        alert ("You are missing something!");
        return;
    }

    if (amountValue <=0){
        alert("Amount must be greater then zero!");
        return;
    }

    let transaction = {id: Date.now(), name : nameValue, amount: amountValue, type: typeValue};
    //We use Date.now() at id is because it generates unique number based on current timestamp.
    transactions.push(transaction)
    updateSummary();
    renderTransaction();
    nameInput.value = "";
    amountInput.value = "";
    typeInput.value = "income";

})