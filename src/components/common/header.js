import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import FeatherIcon from "feather-icons-react";
import { Container, Row, Col, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import { WP_APP } from "./../../constants";
import { API_URL } from './../../constants';

import { getGeneral, getMenus } from './../../actions/modules_action/customizations';
// import trainingResourse from "./../../documents/Application Training Resourse.pdf";
// import academyNotebook from "./../../documents/FlightScope Academy Notebook 2017.pdf";

class Header extends Component
{
  constructor (props)
  {
    super(props);

    let user_data = {};
    let userId = 0;
    if (localStorage.getItem('fs_user_data') !== null) {
      user_data = JSON.parse(localStorage.getItem("fs_user_data"));
      userId = user_data.data.id;
    }

    this.state = {
      isNavigationOpen: false,
      logout: false,
      accessId: 1,
      logo_image: '',
      favicon_image: '',
      email: '',
      phone_number: '',
    }
    this.props.getGeneral(this.props.token, this.state.accessId);
    this.props.getMenus(this.props.token, this.state.accessId);
  }

  navigationToggle = () =>
  {
    this.setState({
      ...this.state,
      isNavigationOpen: !this.state.isNavigationOpen
    });
  };

  logoutUser = () =>
  {
    localStorage.removeItem("fs_user_data");
    this.setState({
      ...this.state,
      logout: true
    });
  };

  getSubMenus = (subMenus) =>
  {
    let subOption = []
    subMenus.forEach((sub_menu, index) =>
    {
      let isNewTab = sub_menu.url.startsWith("http") ? '_blank' : '';
      let customUrl = sub_menu.url.startsWith("http") ? sub_menu.url : '/#/' + sub_menu.url;
      subOption.push(<DropdownItem target={isNewTab} href={customUrl}>
        {sub_menu.name}
      </DropdownItem>);
    });
    return (subOption);
  }

  getMenuList = () =>
  {
    let menu = this.props.GetMenus.data;
    menu = menu.filter(menus => { return menus.isActive == true });
    let optionArr = [];
    if (menu.length > 0) {
      menu.forEach((item, key) =>
      {
        if (item.children.length == 0) {
          let option = '';
          let isNewTab = item.url.startsWith("http") ? '_blank' : '';
          let customUrl = item.url.startsWith("http") ? item.url : '/#/' + item.url;
          option = <NavItem key={key}><NavLink target={isNewTab} href={customUrl}>{item.name}</NavLink></NavItem>;
          optionArr.push(option);
        } else {
          let inner_option = <UncontrolledDropdown>
            <DropdownToggle nav>
              {item.name} &nbsp;
                  <FeatherIcon icon="chevron-down" size="14" />
            </DropdownToggle>
            <DropdownMenu right className="text-medium">
              {this.getSubMenus(item.children)}
            </DropdownMenu>
          </UncontrolledDropdown>;
          optionArr.push(inner_option);
        }
      })
    }
    return (
      <Nav className="ml-auto text-medium" navbar>
        {optionArr}
      </Nav>
    );
  }

  render = () =>
  {
    let loggedIn = false;
    let user_data = {};
    if (localStorage.getItem("fs_user_data") !== null) {
      user_data = JSON.parse(localStorage.getItem("fs_user_data"));
      loggedIn = true;
    }

    if (Object.keys(this.props.GetGeneral).length > 0 && 'status' in this.props.GetGeneral) {
      if (this.props.GetGeneral.status && Object.keys(this.props.GetGeneral.data).length > 0) {
        this.setState({
          ...this.state,
          logo_image: this.props.GetGeneral.data.logo_image,
          favicon_image: this.props.GetGeneral.data.favicon_image,
          email: this.props.GetGeneral.data.email,
          phone_number: this.props.GetGeneral.data.phone_number
        });
        this.props.getGeneral();
      }
    }


    if (this.state.logout) {
      return <Redirect to="/login" />;
    } else {
      return (
        <header className="header-absolute">
          <div className="top-bar border-bottom text-small">
            <Container>
              <Row>
                <Col sm={7} className="d-none d-sm-block">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item d-none d-lg-inline-block mr-0">
                      Have any question?
                    </li>
                    <li className="list-inline-item px-3 mr-0">
                      <a className="text-black" href={"tel:" + "+1" + this.state.phone_number}>
                        <FeatherIcon
                          icon="phone"
                          size="16"
                          className="mb-1 mr-2"
                        />
                        {"+1" + this.state.phone_number}
                      </a>
                    </li>
                    <li className="list-inline-item d-none d-lg-inline-block px-3 border-left">
                      <a
                        className="text-black"
                        href={"mailto:" + this.state.email}
                      >
                        <FeatherIcon
                          icon="mail"
                          size="16"
                          className="mb-1 mr-2"
                        />
                        {this.state.email}
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col sm={5} className="d-flex justify-content-end">
                  {loggedIn ? (
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item border-right px-3 mr-0">
                        <a
                          href={"/#/profile/dashboard/" + user_data.token}
                          className="text-black"
                        >
                          {loggedIn && user_data.data.picture ?
                            <img src={`${API_URL}/${user_data.data.picture}`} className="mr-3 avatar" /> :
                            <FeatherIcon icon="user" size="38" className="mr-3 avatar" />
                          }

                          {user_data.data.firstName +
                            " " +
                            user_data.data.lastName}
                        </a>
                      </li>
                      <li className="list-inline-item pl-3">
                        <a
                          onClick={this.logoutUser}
                          className="text-black pointer"
                        >
                          <FeatherIcon
                            icon="log-out"
                            size="16"
                            className="mb-1 mr-2"
                          />
                          Logout
                        </a>
                      </li>
                    </ul>
                  ) : (
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item border-right px-3 mr-0">
                          <a href="/#/login" className="text-black">
                            <FeatherIcon
                              icon="log-in"
                              size="16"
                              className="mb-1 mr-2"
                            />
                            Sign In
                        </a>
                        </li>
                        <li className="list-inline-item pl-3">
                          <a href="/#/signup" className="text-black">
                            <FeatherIcon
                              icon="user-plus"
                              size="16"
                              className="mb-1 mr-2"
                            />
                            Sign Up
                        </a>
                        </li>
                      </ul>
                    )}
                </Col>
              </Row>
            </Container>
          </div>
          <Navbar light expand="md">
            <Container>
              <NavbarBrand href="/#/">
                <img src={`${API_URL}/${this.state.logo_image}`} alt="Logo" className="img-fluid site-logo" />
              </NavbarBrand>
              <NavbarToggler onClick={this.navigationToggle} />
              <Collapse isOpen={this.state.isNavigationOpen} navbar>
                {Object.keys(this.props.GetMenus).length > 0 && this.getMenuList()}
              </Collapse>
            </Container>
          </Navbar>
        </header>
      );
    }

  }
}

const mapStateToProps = state =>
{
  return {
    GetGeneral: state.GetGeneral,
    GetMenus: state.GetMenus
  }
}

export default connect(mapStateToProps, { getGeneral, getMenus })(Header);
