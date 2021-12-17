const fs = require('fs');
const path = require('path');

const accountsFilePath = path.join(__dirname, '../data/accountsDataBase.json');
const accounts = JSON.parse(fs.readFileSync(accountsFilePath, 'utf-8'));

function saveAccounts(){
	const texto = JSON.stringify(accounts, null, 4);
	fs.writeFileSync(accountsFilePath, texto, "utf-8")
}

function findOne(id){
    const account = accounts.find((acc) => {
        return acc.id == id;
    })
    return account
}

function findByField (field, text) {
    let accountFound = accounts.find(oneAccount => oneAccount[field] === text);
    return accountFound;
}

function getAll(){
    return accounts;
}


module.exports = {
    saveAccounts,
    findOne,
    getAll,
    findByField
}