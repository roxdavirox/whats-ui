import React, { Component } from "react";
import {
  MatxSidenavContainer,
  MatxSidenav,
  MatxSidenavContent
} from "matx";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProductList,
  getCategoryList,
  getRatingList,
  getBrandList
} from "app/redux/actions/EcommerceActions";

import ShopSidenav from "./ShopSidenav";
import ShopContainer from "./ShopContainer";

class Shop extends Component {
  debounceTimer;
  categories = [];
  brands = [];

  state = {
    open: true,
    view: "grid",
    page: 0,
    rowsPerPage: 6,
    orderBy: "false",
    propsReceived: false,
    sliderRange: [0, 100],
    query: "",
    multilevel: "all",
    shipping: false,
    categories: [],
    brands: []
  };

  toggleSidenav = () => {
    this.setState({ open: !this.state.open });
  };

  handleSliderChange = (event, newValue) => {
    this.setState({ sliderRange: newValue });
    this.filterProductOnPriceRange(newValue[0] * 10, newValue[1] * 10);
  };

  setRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  toggleView = view => this.setState({ view });

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSearch = query => {
    let { productList = [] } = this.props;

    this.setState({ query });

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.setState({
        productList: productList.filter(product =>
          product.title.toLowerCase().match(this.state.query.toLowerCase())
        )
      });
    }, 250);
  };

  handleMultilevelChange = event => {
    let eventValue = event.target.value;
    let range = event.target.value.split(",");
    let { productList = [] } = this.props;

    if (eventValue === "all") {
      this.setState({ multilevel: eventValue, productList });
      return;
    }

    this.setState({ multilevel: eventValue });

    range = range.map(value => parseInt(value));

    if (range.length === 2) {
      this.filterProductOnPriceRange(range[0], range[1]);
    } else {
      this.setState({
        productList: productList.filter(product => product.price >= range[0])
      });
    }
  };

  handleCategoryChange = event => {
    let target = event.target;
    let { categories } = this.state;
    let tempCategories;
    if (target.checked) {
      tempCategories = [...categories, target.name];
      this.setState({
        categories: tempCategories,
        productList: this.filterProductOnProperty("category", tempCategories)
      });
    } else {
      tempCategories = categories.filter(item => item !== target.name);
      this.setState({
        categories: tempCategories,
        productList: this.filterProductOnProperty("category", tempCategories)
      });
    }
  };

  handleBrandChange = event => {
    let target = event.target;
    let { brands } = this.state;
    let tempBrands;
    if (target.checked) {
      tempBrands = [...brands, target.name];
      this.setState({
        brands: tempBrands,
        productList: this.filterProductOnProperty("brand", tempBrands)
      });
    } else {
      tempBrands = brands.filter(item => item !== target.name);
      this.setState({
        brands: tempBrands,
        productList: this.filterProductOnProperty("brand", tempBrands)
      });
    }
  };

  handleRatingClick = rate => {
    this.setState({
      productList: this.filterProductOnProperty("rating", [rate])
    });
  };

  handleFreeShippingClick = () => {
    let shippingStatus = !this.state.shipping;
    this.setState({
      shipping: shippingStatus,
      productList: this.filterProductOnProperty("freeShipping", [
        shippingStatus
      ])
    });
  };

  filterProductOnProperty = (property, value = []) => {
    let { productList = [] } = this.props;
    if (value.length === 0) {
      return productList;
    }
    return productList.filter(product => value.includes(product[property]));
  };

  filterProductOnPriceRange = (lowestPrice, highestPrice) => {
    let { productList = [] } = this.props;
    this.setState({
      productList: productList.filter(
        product => product.price >= lowestPrice && product.price <= highestPrice
      )
    });
  };

  handleClearAllFilter = () => {
    this.setState({
      sliderRange: [0, 100],
      query: "",
      multilevel: "all",
      shipping: false,
      categories: [],
      brands: [],
      productList: this.props.productList
    });
  };

  componentDidMount() {
    this.props.getProductList();
    this.props.getCategoryList();
    this.props.getRatingList();
    this.props.getBrandList();
  }

  componentWillUnmount() {
    clearTimeout(this.debounceTimer);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { productList = [] } = nextProps;
    if (prevState.propsReceived) {
      return {};
    } else if (!prevState.propsReceived && productList.length > 0)
      return {
        propsReceived: true,
        productList
      };
    else return {};
  }

  render() {
    let {
      productList = [],
      brands,
      categories,
      sliderRange,
      view,
      page,
      rowsPerPage,
      orderBy,
      query,
      multilevel,
      shipping
    } = this.state;

    let { categoryList = [], ratingList = [], brandList = [] } = this.props;

    return (
      <div className="shop m-sm-30">
        <MatxSidenavContainer>
          <MatxSidenav
            width="288px"
            open={this.state.open}
            toggleSidenav={this.toggleSidenav}
          >
            <ShopSidenav
              query={query}
              categories={categories}
              brands={brands}
              multilevel={multilevel}
              categoryList={categoryList}
              brandList={brandList}
              ratingList={ratingList}
              shipping={shipping}
              sliderRange={sliderRange}
              toggleSidenav={this.toggleSidenav}
              handleSearch={this.handleSearch}
              handleMultilevelChange={this.handleMultilevelChange}
              handleSliderChange={this.handleSliderChange}
              handleCategoryChange={this.handleCategoryChange}
              handleBrandChange={this.handleBrandChange}
              handleRatingClick={this.handleRatingClick}
              handleFreeShippingClick={this.handleFreeShippingClick}
              handleClearAllFilter={this.handleClearAllFilter}
            ></ShopSidenav>
          </MatxSidenav>
          <MatxSidenavContent>
            <ShopContainer
              orderBy={orderBy}
              view={view}
              productList={productList}
              page={page}
              rowsPerPage={rowsPerPage}
              toggleView={this.toggleView}
              toggleSidenav={this.toggleSidenav}
              handleChange={this.handleChange}
              handleChangePage={this.handleChangePage}
              setRowsPerPage={this.setRowsPerPage}
            ></ShopContainer>
          </MatxSidenavContent>
        </MatxSidenavContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getProductList: PropTypes.func.isRequired,
  getRatingList: PropTypes.func.isRequired,
  getBrandList: PropTypes.func.isRequired,
  productList: state.ecommerce.productList,
  categoryList: state.ecommerce.categoryList,
  ratingList: state.ecommerce.ratingList,
  brandList: state.ecommerce.brandList
});

export default connect(
  mapStateToProps,
  { getProductList, getCategoryList, getRatingList, getBrandList }
)(Shop);
