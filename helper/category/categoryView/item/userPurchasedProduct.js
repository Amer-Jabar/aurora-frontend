const userPurchasedProduct = (buyer, userId) => {

    if ( buyer.length === 0 || !userId )
        return false;

    let condition = false;

    buyer.forEach(user => user === userId ? condition = true : null);

    return condition;
}

export default userPurchasedProduct;