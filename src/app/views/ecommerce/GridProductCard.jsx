import React from "react";
import { Card, Button, Icon } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProductToCart } from "app/redux/actions/EcommerceActions";

const GridProductCard = ({ product, addProductToCart, user }) => {
  return (
    <Card
      elevation={3}
      className="ecommerce__product-card text-center position-relative h-full"
    >
      <div className="product__image-box flex justify-center items-center position-relative">
        <span className="product__price m-0">${product.price}</span>
        <img src={product.imgUrl} alt={product.title} />
        <div className="image-box__overlay">
          <Button
            variant="outlined"
            className="bg-default"
            onClick={() => addProductToCart(user.userId, product.id)}
          >
            <Icon className="mr-2">shopping_cart</Icon>
            <span>Add to cart</span>
          </Button>
        </div>
      </div>
      <div className="p-6">
        <h5 className="m-0">{product.title}</h5>
      </div>
    </Card>
  );
};

const mapStateToProps = state => ({
  addProductToCart: PropTypes.func.isRequired,
  user: state.user
});

export default connect(mapStateToProps, { addProductToCart })(GridProductCard);
