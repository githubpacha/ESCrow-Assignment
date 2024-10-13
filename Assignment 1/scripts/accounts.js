var companies = new Map;
companies.set('Guzáterrez', []);
companies.set('Noveâux', []);
companies.set('Almeirõ', []);
companies.set('Brünhilde', []);
companies.set('Coraggio', []);
companies.set('Homerset', []);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const nums = "0123456789";
for (var company of companies) {
    var accounts = company[1];
    var c = Math.round(Math.random()*3+2);

    for (var x = 1; x <= c; x++) {
        var s = 'AC0';
        for (let i = 0; i < 12; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
        accounts.push({'name':s});
    }
}

for (var company of companies) {
    for (var account of company[1]) {
        account.balance = Math.round((Math.pow(Math.random(), 3))*10000000);
    }
}

const initial  = new Date(2012, 0, 1);
const final = new Date();
for (var company of companies) {
    for (var account of company[1]) {
        var c = Math.round(Math.random()*9);
        account.transactions = new Array(0);
        var start = new Date(initial.getTime() + Math.random() * (final.getTime() - initial.getTime()));
        var d = 0;
        for (var x = 1; x <= c; x++) {
            d += Math.round(Math.random()*183);
            var date = new Date(start);
            date.setDate(date.getDate() + d);
            date.setTime(date.getTime()+Math.round(Math.random()*10000000000))
            var credit = Math.round(Math.random()*1000000);
            var balance = account.balance + credit;
            var reference = 'CMS'; for (let i = 0; i < 10; i++) reference += nums.charAt(Math.floor(Math.random() * nums.length));
            var crediter = 'AC0'; for (let i = 0; i < 12; i++) crediter += chars.charAt(Math.floor(Math.random() * chars.length));
            account.transactions.push({'date':date.toLocaleString(), 'credit':credit, 'accbalance':balance, 'UTR':reference, 'UPI':crediter});
        }
    }
}


export default companies;
/* 
    NodeJS understands CommomJS export/import rules, not the Browser. 
    It needs ES6 format 
*/