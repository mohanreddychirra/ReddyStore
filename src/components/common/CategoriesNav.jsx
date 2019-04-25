import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../stylesheets/category_nav.scss';

class CategoriesNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { categories, active, onClick } = this.props;
  
    return (
      <div id="category-nav" className="clearfix">
        <Link to="#" onClick={() => onClick(null)}>
          <span
            className={`${active === null ? 'active' : ''}`}
          >
            All Products
          </span>
        </Link>

        { categories.map(category => (
          <Link key={category.id} to="#" onClick={() => onClick(category.id)}>
            <span
              className={`${active === category.id ? 'active' : ''}`}
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesNav);
