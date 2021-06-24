import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddEmpModel} from './AddEmpModel';
import {EditEmpModel} from './EditEmpModel';

export class Employee extends Component {

    constructor(props){
        super(props);
        this.state={emps:[], addModelShow:false, editModelShow:false}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    componentDidUpdate(){
        this.refreshList();
    }
    deleteEmp(Id){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'employee/'+Id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

  render () {
      const {emps,Id,Name,Salary,Address,Designation}=this.state;
      let addModelClose=()=>this.setState({addModelShow:false})
      let editModelClose=()=>this.setState({editModelShow:false})
      return (
          <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Emp ID</th>
                        <th>Emp Name</th> 
                        <th>Salary</th>
                        <th>Address</th>
                        <th>Designation</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                        <tr key={emp.Id}>
                            <td>{emp.Id}</td>
                            <td>{emp.Name}</td>
                            <td>{emp.Salary}</td>
                            <td>{emp.Address}</td>
                            <td>{emp.Designation}</td>
                            <td>
<ButtonToolbar>
<Button className="mr-2" variant="info"
onClick={()=>this.setState({editModelShow:true,
Id:emp.Id, Name:emp.Name, Salary: emp.Salary, Address: emp.Address, Designation: emp.Designation})}>
Edit
</Button>
<Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.Id)}>
            Delete
        </Button>

<EditEmpModel show={this.state.editModelShow}
                    onHide={editModelClose}
                    Id={Id}
                    Name={Name}
                    Salary={Salary}
                    Address={Address}
                    Designation={Designation}/>

</ButtonToolbar>


                            </td>

                        </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModelShow:true})}>
                    Add Employee</Button>

                    <AddEmpModel show={this.state.addModelShow}
                    onHide={addModelClose}/>
                </ButtonToolbar>
        </div>
    )
  }
}
