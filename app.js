console.log("JS file loaded")

let transactions = [];
const submitBtn = document.getElementById('submitBtn')
const nameInput = document.getElementById('name')
const amountInput = document.getElementById('amount')
const typeInput = document.getElementById('type')
const transList = document.getElementById('transList')
const totalBalance = document.getElementById('totalBalance')
const totalIncome = document.getElementById('totalIncome')
const totalExpense = document.getElementById('totalExpense')

function updateSummary(){
        let intialBalance = 0;
        let incomeSum = transactions.filter((transaction) => transaction.type === "income").reduce((sum, t) => sum + Number(t.amount), intialBalance)
        let expenseSum = transactions.filter((transaction) => transaction.type === "expense").reduce((sum, t) => sum + Number(t.amount), intialBalance)
        let balance = incomeSum+expenseSum;
        totalBalance.textContent = balance;
        totalIncome.textContent = incomeSum;
        totalExpense.textContent = expenseSum;
    }

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

submitBtn.addEventListener('click', function(){
    let nameValue = nameInput.value;
    let amountValue = amountInput.value;
    let typeValue = typeInput.value;

    if(!nameValue  || !amountValue){
        alert ("You are missing something!");
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