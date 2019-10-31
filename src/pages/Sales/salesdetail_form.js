import React, {Component} from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as salesAction  from '../../actions/salesAction';
import SessionManager from '../../components/session_manage';
import { Multiselect } from 'react-widgets'
import API from '../../components/api'
import Axios from 'axios';
import history from '../../history';
import 'react-widgets/dist/css/react-widgets.css'
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
class Salesdetailform extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            orderdate: '', 
            stepflag:0,
            additionitems:[],
            materialitems:[],
            val1: '',
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        this.props.getCustomer();
        this.getAddition();
        this.getMaterial();
    }
    getAddition() {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetAdditionItems, headers)
        .then(result => {
            this.setState({additionitems: result.data.Items});
        });
    }

    getMaterial() {
        var headers = SessionManager.shared().getAuthorizationHeader();
        Axios.get(API.GetMaterialItems, headers)
        .then(result => {
            this.setState({materialitems: result.data.Items});
        });
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
    changeStep = () => {
        var k=0;
        if(this.state.stepflag!==2){
            k=this.state.stepflag+1;
        }
        this.setState({stepflag: k})
    }
    render(){
        let customer = [];
        if(this.props.customerData){
            customer = this.props.customerData.map( s => ({value:s.key,label:s.value}) );
        }
        let additionitem = [];
        let temp = [];
        if(this.state.additionitems){
            temp = this.state.additionitems;
            temp.map((data, index) => {
                    additionitem.push(data.value)
                return data;
              })
        }
        let materialitem = [];
        if(this.state.additionitems){
            temp = this.state.materialitems;
            temp.map((data, index) => {
                materialitem.push(data.value)
                return data;
              })
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
                {this.state.stepflag===0 ? (
                    <Modal.Title id="contained-modal-title-vcenter">
                         Product
                    </Modal.Title>
                ) : <div/>
                } 
                {this.state.stepflag===1 ? (
                    <Modal.Title id="contained-modal-title-vcenter">
                         Additions
                    </Modal.Title>
                ) : <div/>
                } 
                {this.state.stepflag===2 ? (
                    <Modal.Title id="contained-modal-title-vcenter">
                         Packaging Materials
                    </Modal.Title>
                ) : <div/>
                } 
            </Modal.Header>
            <Modal.Body>
                <Form className="container product-form" onSubmit = { this.handleSubmit }>
                    {this.state.stepflag===0 ? (
                        <Form.Group as={Row} controlId="formPlaintextSupplier">
                            <Form.Label column sm="3">
                                Product
                            </Form.Label>
                            <Col sm="9" className="product-text">
                                <Select
                                    name="product"
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
                    ) : <div/>
                    } 
                    {this.state.stepflag===1 ? (
                        <Form.Group as={Row} controlId="formPlaintextSupplier">
                            <Form.Label column sm="3">
                                Additions
                            </Form.Label>
                            <Col sm="9" className="product-text">
                                <Multiselect
                                    data={additionitem}
                                    placeholder="Additions"
                                />
                            </Col>
                        </Form.Group>
                    ) : <div/>
                    } 
                    {this.state.stepflag===2 ? (
                        <Form.Group as={Row} controlId="formPlaintextSupplier">
                            <Form.Label column sm="3">
                                Packaging Materials
                            </Form.Label>
                            <Col sm="9" className="product-text">
                                <Multiselect
                                    placeholder="Packaging Materials"
                                    data={materialitem}
                                />
                            </Col>
                        </Form.Group>
                    ) : <div/>
                    } 
                    <Form.Group style={{textAlign:"center"}}>
                        <Button style={{width:"100px"}} onClick={this.changeStep}>Next</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Salesdetailform);