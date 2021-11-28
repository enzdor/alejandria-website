const productsController = {
    products: (req, res) => {
        res.render('products')
    },
    categories: (req, res) => {
        res.render('categories')
    },
    productDetail: (req, res) => {
        res.render('productDetail')
    }
};

module.exports = productsController;