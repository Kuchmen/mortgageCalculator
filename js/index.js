let products = JSON.parse(localStorage.getItem("storage"));
let bankId = JSON.parse(localStorage.getItem("key"));
if (bankId === null) { 
    bankId = 1;
    }

let maxLoan, minDown, maxPeriod, intRate;

if (products === null) { 
    products = [];
    }

renderProducts();
renderselect();
  

function editCard(no) {
    document.getElementById("edit_button" + no).style.display = "none";
    document.getElementById("save_button" + no).style.display = "block";

    const bank = document.getElementById("bankName" + no);
    const rate = document.getElementById("interestRate" + no);
    const loan = document.getElementById("maximumLoan" + no);
    const minimumDownPayment = document.getElementById("minimum-down-payment" + no);
    const loanTerm = document.getElementById("loan-term" + no);

    const bankData = bank.innerHTML;
    const rateData = rate.innerHTML;
    const loanData = loan.innerHTML;
    const minimumDownPaymentData = minimumDownPayment.innerHTML;
    const loanTermData = loanTerm.innerHTML;

    bank.innerHTML = `<input type='text' id='bank-text${no}' value='${bankData}'>`;
    rate.innerHTML = `<input type='number' id='rate-text${no}' value='${rateData}'>`;
    loan.innerHTML = `<input type='number' id='loan-text${no}' value='${loanData}'>`;
    minimumDownPayment.innerHTML = `<input type='number' id='minimum-down-payment-text${no}' value='${minimumDownPaymentData}'>`;
    loanTerm.innerHTML = `<input type='number' id='loan-term-text${no}' value='${loanTermData}'>`;
}

function saveCard(no) {
    const bankName = document.getElementById("bank-text" + no).value;
    const interestRate = document.getElementById("rate-text" + no).value;
    const maximumLoan = document.getElementById("loan-text" + no).value;
    const minimumDownPayment = document.getElementById("minimum-down-payment-text" + no).value;
    const loanTerm = document.getElementById("loan-term-text" + no).value;
    
    const index = products.findIndex(function (i) {
        return i.bankId == no;
    });
    products[index].bankName = bankName;
    products[index].interestRate = interestRate;
    products[index].maximumLoan = maximumLoan;
    products[index].minimumDownPayment = minimumDownPayment;
    products[index].loanTerm = loanTerm;
    localStorage.setItem("storage", JSON.stringify(products));

    document.getElementById("bankName" + no).innerHTML = bankName;
    document.getElementById("interestRate" + no).innerHTML = interestRate;
    document.getElementById("maximumLoan" + no).innerHTML = maximumLoan;
    document.getElementById("minimum-down-payment" + no).innerHTML = minimumDownPayment;
    document.getElementById("loan-term" + no).innerHTML = loanTerm;
    
    document.getElementById("edit_button" + no).style.display = "block";
    document.getElementById("save_button" + no).style.display = "none";
    renderselect();
}

function deleteCard(no) {
       
    const index = products.findIndex(function (i) {
        return i.bankId == no;
    });
   
    products.splice(index, 1);
    localStorage.setItem("storage", JSON.stringify(products));
    renderProducts();
    renderselect();
}

function addCard() {
    const bankName = document.getElementById("bankName").value;
    const interestRate = document.getElementById("interestRate").value;
    const maximumLoan = document.getElementById("maximumLoan").value;
    const minimumDownPayment = document.getElementById("minimum-down-payment").value;
    const loanTerm = document.getElementById("loan-term").value;
    if (bankName === '' ||
        interestRate === '' ||
        maximumLoan === '' ||
        minimumDownPayment === '' ||
        loanTerm === '' ||
        +interestRate < 1 ||
        +interestRate > 100 ||
        +minimumDownPayment < 0 ||
        +minimumDownPayment > 100 ) {
        document.getElementById("problem").innerText = 'Enter correct data in all fields';
    } else {
    document.getElementById("problem").innerText = '';

    const obj = {};
    obj.bankId = bankId;
    obj.bankName = bankName;
	obj.interestRate = interestRate;
	obj.maximumLoan = maximumLoan;
	obj.minimumDownPayment = minimumDownPayment;
	obj.loanTerm = loanTerm;

    products.push(obj);
    localStorage.setItem("storage", JSON.stringify(products));
    renderProducts();
    renderselect();
   
    localStorage.setItem("storage", JSON.stringify(products));
   
    bankId++;
    localStorage.setItem("key", JSON.stringify(bankId));

    document.getElementById("bankName").value = "";
    document.getElementById("interestRate").value = "";
    document.getElementById("maximumLoan").value = "";
    document.getElementById("minimum-down-payment").value = "";
    document.getElementById("loan-term").value = "";
    }
}

function renderProducts() {

    const slidesItems = ProductList(products);
    const slidesContainer = document.getElementById('dataList');
    slidesContainer.innerHTML = slidesItems.join("");
}

function ProductList(products) {
    const productContainer = [];
        for (let product of products) {
            productContainer.push(
                `<div class='card'>
                <p class="text-field__label"> Bank Name: </p>
                <u><p id = 'bankName${product.bankId}'>${product.bankName}</p></u>
                <p class="text-field__label">Interest Rate(%):</p>
                <p id='interestRate${product.bankId}'>${product.interestRate}</p>
                <p class="text-field__label">Maximum Loan:</p>
                <p id='maximumLoan${product.bankId}'>${product.maximumLoan}</p>
                <p class="text-field__label"> Minimum Down Payment(%): </p>
                <p id = 'minimum-down-payment${product.bankId}'>${product.minimumDownPayment}</p>
                <p class="text-field__label"> Loan Term: </p>
                <p id = 'loan-term${product.bankId}'>${product.loanTerm}</p>
                <div class = "buttons">
                <input type='button' id='edit_button${product.bankId}' value='Edit' class='edit btn btn-primary btn-xs btn-updateEmployee' onclick='editCard(${product.bankId})'>
                <input type='button' id='save_button${product.bankId}' value='Save' class='save btn btn-warning btn-xs btn-cancelupdate' onclick='saveCard(${product.bankId})'>
                <input type='button' value='Delete' class='delete btn btn-danger btn-xs btn-deleteEmployee' onclick='deleteCard(${product.bankId})'>
                </div>
                </div>`
			);
		}
    return productContainer;
}

function renderselect() {
   
    const selectContainer = document.querySelector('select');
    selectContainer.innerHTML = '';
    selectContainer.innerHTML = '<option value="" selected="selected" hidden="hidden">Select Bank</option>';

    for (let product of products) {
        selectContainer.innerHTML += ` <option value="${product.bankId}">${product.bankName}</option>`
    }
}


function getSelectValue() {
    const selectedValue = document.getElementById('select-choose').value;
    const index = products.findIndex(function (i) {
        return i.bankId == selectedValue;
    });

    document.getElementById("rate").innerHTML = products[index].interestRate;
    document.getElementById("max-loan").innerHTML = products[index].maximumLoan;
    document.getElementById("min-down").innerHTML = products[index].minimumDownPayment;
    document.getElementById("max-period").innerHTML = products[index].loanTerm;
    maxLoan = products[index].maximumLoan;
    minDown = products[index].minimumDownPayment;
    maxPeriod = products[index].loanTerm;
    intRate = products[index].interestRate;
}

function doThisCal() {
   
    const P = +document.getElementById("initial-loan-cal").value;
    const r = +intRate /100;
    const n = +document.getElementById("period").value;
    const D = +minDown / 100 * P;
   
    if (P > +maxLoan ||
        n > +maxPeriod ||
        P < 1 || n < 1 ) {
        document.getElementById("out-monthly").innerHTML = 'Invalid data entered';
        
    } else {
        const M = (P - D) * (r / 12) * Math.pow((1 + r / 12), n) / (Math.pow((1 + r / 12), n) - 1);
	     if (M === NaN) {
            	document.getElementById("out-monthly").innerHTML = 'Invalid data entered';
        	} else {
        document.getElementById("out-monthly").innerHTML = Math.round(M);
        document.getElementById("out-down").innerHTML = D;
	}
    } 
}
