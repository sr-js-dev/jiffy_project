import React, {Component} from 'react'
import { connect } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import $ from 'jquery';
import { Button, Form } from 'react-bootstrap';
import  Salesform  from './salesform'
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
const mapStateToProps = state => ({
     ...state.commen,

});

const mapDispatchToProps = dispatch => ({

}); 

class Salesorder extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {  
            salesData:[]
        };
      }
componentDidMount() {
    this.getSalesData()
}

getSalesData() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": " https://brandnewkey.sohosted-vps.nl:44401/token",
        "method": "POST",
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
          "cache-control": "no-cache",
          "postman-token": "472baa39-523a-8240-dcbd-53b3c3d7730a"
        },
        "data": {
          "grant_type": "password",
          "userName": "johan@example.com",
          "password": "Pass@word1"
        }
      }
      
        $.ajax(settings).done(function (response) {
            window.localStorage.setItem('token', response.access_token);
        });
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetSalesData, headers)
        .then(result => {
            this.setState({salesData:result.data.Items})
        });
}
componentWillUnmount() {
}
render () {
    let salesData
    if(this.state.salesData){
        salesData = this.state.salesData;
        salesData.sort(function(a, b) {
            return a.id - b.id;
        });
    }
    return (
        <div className="order_div">
            <div className="content__header content__header--with-line">
                <h2 className="title">Sales Order</h2>
            </div>
            <div className="orders">
                <div className="orders__filters justify-content-between">
                    <Form inline style={{width:"100%"}}>
                        <Button variant="primary" onClick={()=>this.setState({modalShow:true})}>Add Sales Order</Button>   
                        <Salesform
                            show={this.state.modalShow}
                            onHide={() => this.setState({modalShow: false})}
                            // customerData
                        />
                    </Form>
                </div>
                <div className="table-responsive purchase-order-table">
                    <table className="place-and-orders__table table table--striped prurprice-dataTable"  >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Customer</th>
                                <th>Reference</th>
                                <th>Order Date</th>
                                <th> Total amount</th>
                            </tr>
                        </thead>
                            {salesData &&(<tbody >
                                {
                                    salesData.map((data,i) =>(
                                    <tr id={i} key={i}>
                                        <td>{data.id}</td>
                                        <td>{data.Customer}</td>
                                        <td>{data.Reference}</td>
                                        <td>{data.OrderDate}</td>
                                        <td>{data.total}</td>
                                    </tr>
                                ))
                                }
                            </tbody>)}
                    </table>
                </div>
            </div>
        </div>
    )
};
}
export default connect(mapStateToProps, mapDispatchToProps)(Salesorder);
