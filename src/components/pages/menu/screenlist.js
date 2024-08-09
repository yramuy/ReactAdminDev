import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Snackbar from "../../snackbar";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";

const ScreenList = () => {

    const [screens, setScreens] = useState([]);
    const [screenName, setScreenName] = useState("");
    const [screenID, setScreenID] = useState("");
    const [error, setError] = useState({
        screenName: ''
    });
    const [loading, setLoading] = useState(false);
    // Create a reference to the input element
    const inputRef = useRef(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const dispatch = useDispatch();
    const [deleteShow, setDeleteShow] = useState(false);


    const triggerSnackbar = () => {
        setShowSnackbar(true);
        setTimeout(() => {
            setShowSnackbar(false);
        }, 3000); // Adjust the duration as needed
    };

    useEffect(() => {
        getScreens();
    }, []);

    const getScreens = async () => {

        const response = await axios.get('http://127.0.0.1:8000/api/screens', {
            
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (response.data['status'] === 200) {
            const screenData = response.data['screens'];
            setScreens(screenData)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {

            setLoading(true);

            let body = JSON.stringify({
                screenID: screenID,
                screenName: screenName
            });

            let response = await axios.post('http://127.0.0.1:8000/api/create-update-screen', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            triggerSnackbar();
            if (response.data['status'] === 200) {
                getScreens();
                setScreenName('');
                setScreenID('');
                setLoading(false);
                dispatch({ type: "MESSAGE", payload: response.data['message'] });
            }
        }
    }

    const validateForm = () => {
        let isValid = true;

        let error = {
            screenName: ''
        };

        if (screenName.length < 3) {
            isValid = false;
            error.screenName = 'Name must be at least 3 characters long.';
            focusInputField();
        }

        setError(error);

        return isValid;
    }

    const focusInputField = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleEdit = async (id) => {

        let response = await axios.get(`http://127.0.0.1:8000/api/screens/${id}/edit`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data['status'] === 200) {
            let screen = response.data['screen'];
            setScreenName(screen['screen_name']);
            setScreenID(screen['id']);
        }
    }

    const handleAdd = () => {
        setScreenID('');
        setScreenName('');
    }

    const handleDelete = (id) => {
        setScreenID(id);
        setDeleteShow(true);

    }

    const handleDeleteModal = async () => {
        setLoading(true);
        setDeleteShow(false);
        let response = await axios.delete(`http://127.0.0.1:8000/api/screens/${screenID}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        triggerSnackbar();
        if (response.data['status'] === 200) {
            setLoading(false);
            getScreens();
            dispatch({ type: "MESSAGE", payload: response.data['message'] });
        }
    }

    const deleteClose = () => {
        setDeleteShow(false);
    }

    let msgResponse = useSelector((state) => {
        return state.moduleData;
    });

    const style = {
        height: '22em',
        overflowY: 'scroll'
    };

    return (
        <>
            {loading && <div class="loader"></div>}
            <div className="col-6" style={style}>
                <div class="card card-info">
                    <div class="card-header">
                        <h3 class="card-title">Screen List</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <div class="card-body">
                        <button class="btn btn-primary right" onClick={handleAdd}>Add</button>
                        <table id="example1" class="table table-bordered table-striped mt-2">
                            <thead>
                                <tr>
                                    <th>Screen ID</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    screens.length > 0 ? screens.map((screen) => (
                                        <tr>
                                            <td>{screen.id}</td>
                                            <td>{screen.name}</td>
                                            <td>
                                                <a href="#" class="btn btn-info" onClick={() => handleEdit(screen.id)}><i class="fas fa-edit"></i></a>
                                                <a href="#" class="btn btn-danger ml-2" onClick={() => handleDelete(screen.id)}><i class="fas fa-trash"></i></a>
                                            </td>
                                        </tr>
                                    )) : <tr>
                                        <td colSpan="3">No records found!</td>
                                    </tr>
                                }

                            </tbody>
                        </table>
                    </div>
                    {/* <!-- /.card-body --> */}
                </div>

            </div>

            <div className="col-6">
                <div class="card card-info">
                    <div class="card-header">
                        <h3 class="card-title">{screenID ? "Edit" : "Add"} Screen</h3>
                    </div>
                    {/* <!-- /.card-header --> */}
                    <form class="form-horizontal" method="post" id="moduleForm" onSubmit={handleSubmit}>
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-4 col-form-label">Screen Name <em className="star error">*</em></label>
                                <input type="hidden" value={screenID} />
                                <div class="col-sm-8">
                                    <input type="text"
                                        ref={inputRef}
                                        class="form-control"
                                        value={screenName}
                                        onChange={(e) => setScreenName(e.target.value)} />

                                    {error.screenName && <div className="error">{error.screenName}</div>}
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div>
                                <div class="row">
                                    <div class="col-sm-1">
                                        <button type="submit" class="btn btn-info" name="btnSave">{screenID ? "Update" : "Save"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Snackbar show={showSnackbar} message={msgResponse['message']} duration={3000} />
                    </form>
                    {/* <!-- /.card-body --> */}
                </div>
            </div>

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

export default ScreenList;