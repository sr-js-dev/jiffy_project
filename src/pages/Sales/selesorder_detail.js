import React, {Component} from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as salesAction  from '../../actions/salesAction';
import SessionManager from '../../components/session_manage';
import Salesdetailform  from './salesdetail_form'
import DatePicker from "react-datepicker";
import Axios from 'axios';
import API from '../../components/api'
import "react-datepicker/dist/react-datepicker.css";
const mapStateToProps = state => ({ 
    ...state.common,
});

const mapDispatchToProps = dispatch => ({
    getSalesOrder: (value) =>
        dispatch(salesAction.getSalesOrder(value)),
    getSalesItem: (value) =>
        dispatch(salesAction.getSalesItem(value)),
});

class Table extends React.Component {
    state = {
      rows: [],
      productid:'',
      loadingdate:new Date(),
      price:'',
      quantity:'',
      amount:'',
      salesorderlinedata:[],
      addnum:false,
      modalShow:false
      
    };
    handleAddRow = () => {
      const item = {
        productcode:''
      };
      if(!this.state.addnum){
        this.setState({
            rows: [...this.state.rows, item]
        });
        this.setState({addnum:true})
      }
      
    };

    formatDate = (startdate) =>{
        var dd = new Date(startdate).getDate();
        var mm = new Date(startdate).getMonth()+1; 
        var yyyy = new Date(startdate).getFullYear();
        var formatDate = '';
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        formatDate = dd+'-'+mm+'-'+yyyy;
        return formatDate;
    }

    getAmountQuantity = (e)=> {
        this.setState({amount:this.state.price*e.target.value});
        this.setState({quantity: e.target.value});
    };

    getAmountPrice = (e)=> {
        this.setState({amount:this.state.quantity*e.target.value});
        this.setState({price: e.target.value});
    };

    saveSalesOrderLine = ()=> {
        var params={
            "salesorderid": this.props.salesorderid,
            "productid": this.state.productid,
            "loadingdate": this.state.loadingdate,
            "quantity": this.state.quantity,
            "price": this.state.price,
            "amount": this.state.amount
        }
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.post(API.PostSalesOrderLine, params, headers)
        .then(result => {
            this.setState({addnum:false})
            this.getSalesOrderLines();
        });
    };

    getSalesPrice = (productid) => {
        this.setState({modalShow: true })
        // this.setState({productid:productid});
        // var params={
        //     "productid":productid,
        //     "orderdate":this.props.orderDate
        // }
        // var headers = SessionManager.shared().getAuthorizationHeader();
        // Axios.post(API.GetSalesItemsPrice, params, headers)
        // .then(result => {
            
        //     this.setState({price:result.data.Items[0].price})
        //     this.setState({modalShow: true })
        // });
    };

    componentDidMount () {
        this.getSalesOrderLines();
    }

    getSalesOrderLines () {
        // var params = {
        //     salesorderid:this.props.salesorderid
        // }
        //var headers = SessionManager.shared().getAuthorizationHeader();
        //Axios.post(API.GetSalesOrderLines, params, headers)
        //.then(result => {
         //   this.setState({rows:result.data.Items})
        //});
    }

    render() {
        let salesItem = [];
        if(this.props.salesItem){
            salesItem = this.props.salesItem.map( s => ({value:s.key,label:s.value}) );
        }
        let amount='';
        if(this.state.amount){
            amount = this.state.amount;
            amount = amount.toFixed(2);
        }
      return (
              <div>
                <table
                  className="place-and-orders__table table prurprice-dataTable"
                  id="tab_logic"
                >
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Loding Date</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rows.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                            {!item.productcode ?(
                                <td>
                                    <Select
                                        name="productid"
                                        options={salesItem}
                                        onChange={val => this.getSalesPrice(val.value)}
                                    />
                                    {!this.props.disabled && (
                                        <input
                                            onChange={val=>console.log()}
                                            tabIndex={-1}
                                            autoComplete="off"
                                            style={{ opacity: 0, height: 0 }}
                                            // value={this.state.val1}
                                            required
                                        />
                                    )}
                                </td>
                            ):
                            <td>{item.productcode}</td>
                            }
                            {!item.productcode ?(
                                <td>
                                    {!this.state.loadingdate ? (
                                        <DatePicker name="orderdate" className="myDatePicker" selected={new Date()} onChange={date =>this.setState({loadingdate:date})} />
                                    ) : <DatePicker name="orderdate" className="myDatePicker" selected={this.state.loadingdate} onChange={date =>this.setState({loadingdate:date})} />
                                    }
                                </td>
                            ):
                            <td>{this.formatDate(item.loadingdate)}</td>
                            }
                            {!item.productcode ?(
                                <td>
                                    <Form.Control type="number" name="quantity" required placeholder="Quantity" onChange={this.getAmountQuantity} />
                                </td>
                            ):
                            <td>{item.quantity}</td>
                            }
                            {/* {!item.productcode ?(
                                <td style={{paddingTop:"25px"}}>{this.state.price}</td>
                               
                            ):
                            <td>{item.price}</td>
                            } */}
                            {!item.productcode ?(
                                <td>
                                    <Form.Control type="text" name="price" required placeholder="Price" defaultValue={this.state.price} onChange={this.getAmountPrice} />
                                </td>
                            ):
                            <td>{item.price}</td>
                            }
                            {!item.productcode ?(
                                <td style={{paddingTop:"25px"}}>{amount}</td>
                               
                            ):
                            <td>{item.amount}</td>
                            }
                        </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn-small place-and-orders__add-row-btn add-row" onClick={this.handleAddRow}>Add row</button>
                <button className="btn-small place-and-orders__add-row-btn add-row" onClick={this.saveSalesOrderLine} style={{float:"right"}}>Save</button>
                <Salesdetailform
                    show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false})}
                    productitems={salesItem}
                />
                
        </div>
      );
    }
  }

class Salesorderdtail extends Component {
    constructor(props) {
        super(props);
        this.state ={
            orderdate: '', 
            salesorderid:'',
            salesorder:[],
            salesItems:[]
        }
      }
    componentDidMount() {
        this.getSalesOrder();
        this.getSalesItem();
    }
    getSalesOrder() {
        var params={
            "salesorderid":this.props.location.state.newId
        }
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.post(API.GetSalesDetail, params, headers)
        .then(result => {
            this.setState({salesorder: result.data.Items[0]});
        });
    }

    getSalesItem () {
        // var params={
        //     "customercode":this.props.location.state.customercode
        // }
        var headers = SessionManager.shared().getAuthorizationHeader();
           Axios.get(API.GetSalesItems, headers)
           .then(result => {
               this.setState({salesItems:result.data.Items})
           });
    }
    componentWillUnmount() {
        this._isMounted = false
        }
    
    formatDate = (startdate) =>{
        var dd = new Date(startdate).getDate();
        var mm = new Date(startdate).getMonth()+1; 
        var yyyy = new Date(startdate).getFullYear();
        var formatDate = '';
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        formatDate = dd+'-'+mm+'-'+yyyy;
        return formatDate;
    }
    formatNumber = (num) => {
        return  "€" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }
    render () {
        let detailData = this.state.salesorder;
        return (
            <div>
                <div className="content__header content__header--with-line">
                    <h2 className="title">Sales Order Details</h2>
                </div>
                <div className="place-and-orders">
                    <div className="place-and-orders__top">
                        <Container className="sales-details">
                            <Row>
                                <Col>
                                    <div className="place-and-orders__form-row">
                                        <span>Customer</span>
                                        {detailData &&(
                                            <input type="text" readOnly defaultValue={ detailData.Customer} className="input"/>
                                        )}
                                    </div>
                                    <div className="place-and-orders__form-row">
                                        <span>Reference</span>
                                        {detailData &&(
                                            <input type="text" readOnly defaultValue={ detailData.reference} className="input"/>
                                        )}
                                    </div>
                                    <div className="place-and-orders__form-row">
                                        <span>OrderDate</span>
                                        {detailData.orderdate &&(
                                            <input type="text" readOnly defaultValue={this.formatDate(detailData.orderdate)} className="input"/>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <Table
                        salesItem = {this.state.salesItems}
                        orderDate = {detailData.orderdate}
                        salesorderid= {this.props.location.state.newId}
                    />
                </div>
            </div>
        )
        };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Salesorderdtail);