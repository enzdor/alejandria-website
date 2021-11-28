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


const productsController = {
    products: (req, res) => {
        res.render('products',
        {products})
    },
    categories: (req, res) => {
        res.render('categories')
    },
    productDetail: (req, res) => {
        const id = req.params.id
        const product = findOne(id);
        res.render('productDetail',
        {product})
    },
    productEdit: (req, res) => {
        const product = findOne(id);
        res.render('productEdit',
        {product})
    },
    productAdd: (req, res) => {
        res.render('productAdd')
    }
};

module.exports = productsController;