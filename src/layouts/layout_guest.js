import React, {Component} from 'react'
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Salesorderdetail from '../pages/Sales/selesorder_detail'
import Salesorder from '../pages/Sales/sales_order'
import { Route, Switch,Router } from 'react-router-dom';
import history from '../history';
window.localStorage.setItem('AWT', true);
class Layout extends Component {
  
    render () {
      return (
          <Row>
            <Col sm={2}><Sidebar/></Col>
            <Col sm={10}>
            <Header/>
                <Router history={history}>
                  <Switch>
                  <Route path="/sales-order" component={Salesorder} />
                  <Route path="/sales-order-detail" component={Salesorderdetail} />
                  />
                  </Switch>
                </Router>
            </Col>
          </Row>
      )
    };
  }
  export default Layout;
