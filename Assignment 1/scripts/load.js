import companies from "./accounts.js";
import { emptyAccountsDropdown, clearTable } from "./DOMplayer.js";

const companyDropdown = document.getElementById('company');
const balancePanel = document.getElementById('balance');
document.addEventListener('DOMContentLoaded', () => {
    console.log('Löded Diper!');
    balancePanel.innerHTML = '-------------';
    emptyAccountsDropdown();
    clearTable();
    for (var company of companies) {        
        const option = document.createElement('option');
        option.value = company[0];
        option.textContent = company[0];
        companyDropdown.appendChild(option);
    }
});

export default companies;