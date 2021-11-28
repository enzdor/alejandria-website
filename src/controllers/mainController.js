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

const productsPopular = products.slice(products.length -4, products.length);



const mainController = {
    index: (req, res) => {
        res.render('index',
        {productsPopular})
    },
    basket: (req, res) =>{
        res.render('basket')
    },
    about: (req, res) =>{
        res.render('about')
    },
};

module.exports = mainController;