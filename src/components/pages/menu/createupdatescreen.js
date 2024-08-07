import axios from "axios";
import { useRef, useState } from "react";
import ScreenList from "./screenlist";
import { useDispatch } from 'react-redux';

const CreateUpdateScreen = () => {

    // const { screenData } = props;

    const [screenName, setScreenName] = useState("");
    const [screenID, setScreenID] = useState("");
    const [error, setError] = useState({
        screenName: ''
    });
    const [loading, setLoading] = useState(false);
    // Create a reference to the input element
    const inputRef = useRef(null);
    const dispatch = useDispatch();

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

            if (response.data['status'] === 200) {
                setScreenName('');
                setScreenID('');
                setLoading(false);
                dispatch({ type: "MESSAGE", payload: response.data['message']});
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
    return (
        <div className="col-6">
            {loading && <div class="loader"></div>}
            <div class="card card-info">
                <div class="card-header">
                    <h3 class="card-title">Add Screen</h3>
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
                                    <button type="submit" class="btn btn-info" name="btnSave">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                {/* <!-- /.card-body --> */}
            </div>
        </div>
    );
};

export default CreateUpdateScreen;