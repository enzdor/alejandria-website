const productsController = {
    products: (req, res) => {
        res.render('products')
    },
    categories: (req, res) => {
        res.render('categories')
    },
    productDetail: (req, res) => {
        res.render('productDetail')
    },
    productEdit: (req, res) => {
        res.render('productEdit')
    },
    productAdd: (req, res) => {
        res.render('productAdd')
    }
};

module.exports = productsController;