import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditEmpModel extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);  
    }

    handleSubmit(e){
        e.preventDefault();
        fetch(process.env.REACT_APP_API+'employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'

            },
            body:JSON.stringify({
                Id:e.target.Id.value,
                Name:e.target.Name.value,
                Salary:e.target.Salary.value,
                Address:e.target.Address.value,
                Designation:e.target.Designation.value
            })
        })
        .then(res=>res.json())
        .then(result=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return(
            <div className="container">


                <Modal {...this.props}
                size="lg" aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="Id">
                                        <Form.Label>
                                            Id
                                        </Form.Label>
                                        <Form.Control type="text" Name="Id" required disabled
                                        defaultValue={this.props.Id} 
                                        placeholder="Id"/>
                                        </Form.Group>
                                        <Form.Group controlId="Name">
                                        <Form.Label>
                                            Name
                                        </Form.Label>
                                        <Form.Control type="text" Name="Name" required 
                                        defaultValue={this.props.Name}
                                        placeholder="Name"/>
                                        </Form.Group>
                                        <Form.Group controlId="Salary">
                                        <Form.Label>
                                            Salary
                                        </Form.Label>
                                        <Form.Control type="number" Name="Salary" required 
                                        defaultValue={this.props.Salary}
                                        placeholder="Salary"/>
                                        </Form.Group>
                                        <Form.Group controlId="Address">
                                        <Form.Label>
                                            Address
                                        </Form.Label>
                                        <Form.Control type="text" Name="Address" required 
                                        defaultValue={this.props.Address}
                                        placeholder="Address"/>
                                        </Form.Group>
                                        <Form.Group controlId="Designation">
                                        <Form.Label>
                                            Designation
                                        </Form.Label>
                                        <Form.Control type="text" Name="Designation" required 
                                        defaultValue={this.props.Designation}
                                        placeholder="Designation"/>
                                        </Form.Group>
                                    
                                    <Form.Group>
                                        <Button variant="primary" type="Submit">Update Employee</Button>
                                    </Form.Group>

                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}