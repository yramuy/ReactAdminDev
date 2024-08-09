import { useEffect, useState } from "react";
import CreateUpdatePermission from "./createupdatepermission";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import Snackbar from "../../snackbar";

const RolePermission = () => {
    const dispatch = useDispatch();
    const [deleteShow, setDeleteShow] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);

    var permissions = useSelector((state) => {
        return state.moduleData;
    });

    let status = permissions['status'];

    const triggerSnackbar = () => {
        setShowSnackbar(true);
        setTimeout(() => {
            setShowSnackbar(false);
        }, 3000); // Adjust the duration as needed
    };

    useEffect(() => {
        GetPermissions();
    }, [status]);

    const GetPermissions = async () => {
        dispatch({ type: "STATUS", payload: false });
        let response = await axios.get('http://127.0.0.1:8000/api/screen-permissions', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data['status'] === 200) {
            dispatch({ type: "DATA", payload: response.data['permissions'] });
        }
    }

    // console.log(permissions['data'][0]['role_name'])

    const handleEdit = (id) => {
        dispatch({ type: "ID", payload: id });

    }

    const handleDelete = (id) => {
        setDeleteShow(true);
        dispatch({ type: "ID", payload: id });
    }

    const handleAdd = () => {
        dispatch({ type: "ID", payload: 0 });
    }

    const deleteClose = () => {
        setDeleteShow(false);
        dispatch({ type: "ID", payload: 0 });
    }

    let PId = permissions['id'];

    const handleDeleteModal = async () => {
        setLoading(true);
        setDeleteShow(false);
        let response = await axios.delete(`http://127.0.0.1:8000/api/permissions/${PId}/delete`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        triggerSnackbar();

        if (response.data['status'] === 200) {
            dispatch({ type: "ID", payload: 0 });
            setLoading(false);
            dispatch({ type: 'STATUS', payload: true });
            dispatch({ type: "MESSAGE", payload: response.data['message'] });
        }


    }

    const style = {
        height: '22em',
        overflowY: 'scroll'
    };
    return (
        <>
            {loading && <div class="loader"></div>}
            <div className="col-8" style={style}>
                <div class="card card-info">
                    <div class="card-header">
                        <h3 class="card-title">Role Permission List</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div class="card-body">
                        <button class="btn btn-success" onClick={handleAdd}>New</button>
                        <table id="example1" class="table table-bordered table-striped mt-2">
                            <thead>
                                <tr>

                                    <th>Role</th>
                                    <th>Screen</th>
                                    <th>Read</th>
                                    <th>Create</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    permissions['data'].map((item) => (
                                        <tr key={item['id']}>

                                            <td>{item['role_name']}</td>
                                            <td>{item['screen_name']}</td>
                                            <td>{item['canRead']}</td>
                                            <td>{item['canCreate']}</td>
                                            <td>{item['canUpdate']}</td>
                                            <td>{item['canDelete']}</td>
                                            <td>
                                                <a href="#" class="btn btn-info" onClick={() => handleEdit(item['id'])}><i class="fas fa-edit"></i></a>
                                                <a href="#" class="btn btn-danger m-1" onClick={() => handleDelete(item['id'])}><i class="fas fa-trash"></i></a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* <!-- /.card-body --> */}
                </div>

            </div>
            <Snackbar show={showSnackbar} message={permissions['message']} duration={3000} />
            <CreateUpdatePermission />

            <Modal show={deleteShow} onHide={deleteClose}>
                <Modal.Header>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this item?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteModal}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RolePermission;