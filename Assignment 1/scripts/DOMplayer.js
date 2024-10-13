const companyDropdown = document.getElementById('company');
const accountsDropdown = document.getElementById('account');
const balancePanel = document.getElementById('balance');
const tableBody = document.getElementById('table').querySelector('tbody');

import companies from "./accounts.js";

function emptyAccountsDropdown() {
    while (accountsDropdown.options.length > 0) {
        accountsDropdown.remove(0);
    }

    const defaultOption = document.createElement('option');
    defaultOption.value = 'none';
    defaultOption.textContent = 'Account Name';
    accountsDropdown.appendChild(defaultOption);
}

companyDropdown.addEventListener('change', () => {
    const selectedCompany = companyDropdown.value;

    balancePanel.innerHTML = '-------------';
    emptyAccountsDropdown();
    clearTable();
    if (selectedCompany !== 'none') {
        console.log(`Company: ${selectedCompany}`);
        for (var account of companies.get(selectedCompany)) {
            const option = document.createElement('option');
            option.value = account.name;
            option.textContent = account.name;
            accountsDropdown.appendChild(option);
        }
    } else {
        console.log('Company dropdown will be emptied now!');
    }
});


function clearTable() {
    tableBody.innerHTML = '';
}

accountsDropdown.addEventListener('change', () => {
    const selectedAccount = accountsDropdown.value;
    const selectedCompany = companyDropdown.value;
    clearTable();
    if (selectedAccount !== 'none') {
        console.log(`Company: ${selectedCompany}, Account: ${selectedAccount}`);
        const accountDetails = companies.get(selectedCompany).find(account => account.name === selectedAccount);
        balancePanel.innerHTML = '₹ '+accountDetails.balance;

        accountDetails.transactions.sort((a, b) => a-b);
        for (var transaction of accountDetails.transactions) {
            const row = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = transaction.date;
            row.appendChild(dateCell);

            const creditCell = document.createElement('td');
            creditCell.textContent = '₹ '+transaction.credit;
            creditCell.style.color = 'rgb(33, 150, 83)';
            row.appendChild(creditCell);

            const balanceCell = document.createElement('td');
            balanceCell.textContent = '₹ '+transaction.accbalance;
            row.appendChild(balanceCell);

            const RRNCell = document.createElement('td');
            RRNCell.textContent = transaction.UTR;
            row.appendChild(RRNCell);

            const crediterCell = document.createElement('td');
            crediterCell.textContent = transaction.UPI;
            row.appendChild(crediterCell);

            tableBody.appendChild(row);
        }
    } else {
        console.log('No account selected!');
        balancePanel.innerHTML = '-------------';
    }
});

export {emptyAccountsDropdown, clearTable};