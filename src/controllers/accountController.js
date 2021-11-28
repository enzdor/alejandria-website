const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function saveProducts(){
	const texto = JSON.stringify(products, null, 4);
	fs.writeFileSync(productsFilePath, texto, "utf-8")
}

function findOne(id){
    const product = products.find((prod) => {
        return prod.id == id;
    })
    return product
}



const accountController = {
    account: (req ,res) =>{
        res.render('account')
    },
    register: (req, res) =>{
        res.render('register')
    },
    login: (req, res) => {
        res.render('login')
    },
    accountEdit: (req, res) => {
        res.render('accountEdit')
    }
};

module.exports = accountController;