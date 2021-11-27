const productsController = {
    products: (req, res) => {
        res.render('products')
    },
    categories: (req, res) => {
        res.render('categories')
    }
};

module.exports = productsController;