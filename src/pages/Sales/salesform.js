import React, {Component} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as salesAction  from '../../actions/salesAction';
import DatePicker from "react-datepicker";
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
import history from '../../history';
const mapStateToProps = state => ({ 
    ...state.auth,
    customerData: state.common.customerData,

});

const mapDispatchToProps = (dispatch) => ({
    getCustomer: () =>
        dispatch(salesAction.getCustomerData()),
    saveSalesOder: (params) =>
        dispatch(salesAction.saveSalesOrder(params))
});
class Salesform extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            orderdate: '', 
            val1: '',
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        this.props.getCustomer();
        
        
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const clientFormData = new FormData(event.target);
        const data = {};
        for (let key of clientFormData.keys()) {
            data[key] = clientFormData.get(key);
        }
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.post(API.PostSalesOrder, data, headers)
        .then(result => {
            this.props.onHide();
            history.push('/sales-order-detail',{ newId: result.data.NewId, customercode:this.state.val1.value});
        });
    }
    render(){
        let customer = [];
        if(this.props.customerData){
            customer = this.props.customerData.map( s => ({value:s.key,label:s.value}) );
        }
        return (
            <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sales Order
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="container product-form" onSubmit = { this.handleSubmit }>
                    <Form.Group as={Row} controlId="formPlaintextSupplier">
                        <Form.Label column sm="3">
                            Customer
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            <Select
                                name="customer"
                                options={customer}
                                onChange={val => this.setState({val1:val})}
                            />
                            {!this.props.disabled && (
                                <input
                                    onChange={val=>console.log()}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    style={{ opacity: 0, height: 0 }}
                                    value={this.state.val1}
                                    required
                                    />
                                )}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                              <Form.Label column sm="3">
                              Reference   
                              </Form.Label>
                              <Col sm="9" className="product-text">
                                  <Form.Control type="text" name="reference" required placeholder="reference " />
                              </Col>
                          </Form.Group>
                          <Form.Group as={Row} controlId="formPlaintextPassword">
                              <Form.Label column sm="3">
                                OrderDate  
                              </Form.Label>
                              <Col sm="9" className="product-text">
                                  {!this.state.orderdate ? (
                                     <DatePicker name="orderdate" className="myDatePicker" selected={new Date()} onChange={date =>this.setState({orderdate:date})} />
                                  ) : <DatePicker name="orderdate" className="myDatePicker" selected={this.state.orderdate} onChange={date =>this.setState({orderdate:date})} />
                                  } 
                              </Col>
                          </Form.Group>
                    <Form.Group style={{textAlign:"center"}}>
                        <Button type="submit" style={{width:"100px"}}>Save</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Salesform);