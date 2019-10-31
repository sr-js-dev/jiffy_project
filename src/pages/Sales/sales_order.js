import React, {Component} from 'react'
import { connect } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import * as salesAction  from '../../actions/salesAction';
import { Button, Form } from 'react-bootstrap';
import  Salesform  from './salesform'
const mapStateToProps = state => ({
     ...state.commen,
     salesData: state.common.salesData,
     customerData: state.common.customerData,
});

const mapDispatchToProps = dispatch => ({
    getSalesData: () =>
        dispatch(salesAction.getSalesData()),
}); 

class Salesorder extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {  

        };
      }
componentDidMount() {
    this.props.getSalesData();
}
componentWillUnmount() {
}
render () {
    let salesData = this.props.salesData;
    salesData.sort(function(a, b) {
        return a.id - b.id;
    });
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
                                        <td>{data.reference}</td>
                                        <td>{data.orderdate}</td>
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
