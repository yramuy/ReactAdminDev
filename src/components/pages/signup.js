import { useEffect, useState } from "react";
import { GetApiService, PostApiService } from "../api";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();

    const [mobnumber, setMobnumber] = useState('');
    const [mobOtp, setMobOtp] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const resOtp = sessionStorage.getItem('otp');
    const resMsg = sessionStorage.getItem('msg');
    const [flag, setFlag] = useState(false);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        GetStates();
    }, []);

    const GetStates = async () => {
        const url = '/BillsPayeApis/v1/states';
        await GetApiService(url).then((data) => {
            setStates(data.states);
        });
    }

    const handleOTP = async () => {
        const url = '/BillsPayeApis/v1/sendOTP';
        const body = JSON.stringify({
            mobileNumber: mobnumber
        });

        await PostApiService(url, body).then((data) => {
            console.log("OTP response :", data)
            const response = data.otpDetails;
            sessionStorage.setItem('otp', response.otp);
            sessionStorage.setItem('msg', data.message);
            sessionStorage.setItem('otpstatus', data.status);
            setFlag(true);
        });
    }

    const handleVerifyOTP = () => {
        if (resOtp == mobOtp) {
            setIsVisible(true);
            sessionStorage.setItem('msg', 'OTP Verified Success');
        } else {
            sessionStorage.setItem('msg', 'OTP Does not match');
            setIsVisible(false);
        }
        setFlag(true);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setFlag(false);
        }, 3000); // Close the alert after 3 seconds

        return () => {
            clearTimeout(timer);
        };
    }, [flag]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        const url = '/BillsPayeApis/v1/signUp';
        const body = JSON.stringify({
            first_name: fname,
            last_name: lname,
            email: email,
            mobile_number: mobnumber,
            password: password,
            state_id: state,
            city_id: city,
            pincode: pincode
        });

        await PostApiService(url, body).then((data) => {
            if (data.status === 1) {
                navigate('/login');
            } else {
                setFlag(true);
                sessionStorage.setItem('msg', data.message);
            }
        });
    }

    const handleState = async (stateId) => {
        setState(stateId);
        const url = '/BillsPayeApis/v1/citiesByState';
        const body = JSON.stringify({
            state_id: stateId
        });

        await PostApiService(url, body).then((data) => {
            setCities(data.cities);
        });
    }

    console.log('city : ',city )

    return (
        <>
            <div class="register-box" style={{ marginLeft: '28em' }}>
                <div class="register-logo">
                    <a href="../../index2.html"><b>Admin</b>LTE</a>
                </div>

                <div class="card" style={{ width: '27em' }}>
                    <div class="card-body register-card-body">
                        <p class="login-box-msg">Register a new membership</p>

                        <form action="" method="post" onSubmit={handleSignUp}>
                            <div class="input-group mb-3">
                                <input type="text"
                                    class="form-control"
                                    value={mobnumber}
                                    onChange={(e) => setMobnumber(e.target.value)}
                                    placeholder="Mobile Number" />
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button" onClick={handleOTP}>Send OTP</button>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="text"
                                    class="form-control"
                                    value={mobOtp}
                                    onChange={(e) => setMobOtp(e.target.value)}
                                    placeholder="Enter OTP" />
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button" onClick={handleVerifyOTP}>Verify OTP</button>
                                </div>
                            </div>
                            {
                                isVisible && (
                                    <div>

                                        <div class="row">
                                            <div class="col-6">
                                                <input type="text"
                                                    class="form-control"
                                                    value={fname}
                                                    onChange={(e) => setFname(e.target.value)}
                                                    placeholder="First name" required />

                                            </div>

                                            <div class="col-6 mb-3">
                                                <input type="text"
                                                    class="form-control"
                                                    value={lname}
                                                    onChange={(e) => setLname(e.target.value)}
                                                    placeholder="Last name" required />

                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="email"
                                                class="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email"
                                                required />
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    <span class="fas fa-envelope"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="password"
                                                class="form-control"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required />
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    <span class="fas fa-lock"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <select className="form-control"
                                                onChange={(e) => handleState(e.target.value)}
                                                required>
                                                <option value="">--Select State--</option>
                                                {
                                                    states.map((sts) => (
                                                        <option value={sts.id}>{sts.name}</option>
                                                    ))
                                                }
                                            </select>
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    {/* <span class="fas fa-caret-down"></span> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <select className="form-control"
                                                onChange={(e) => setCity(e.target.value)}
                                                required>
                                                <option value="">--Select City--</option>
                                                {
                                                    cities.map((ct) => (
                                                        <option value={ct.id}>{ct.city}</option>
                                                    ))
                                                }
                                            </select>
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    {/* <span class="fas fa-caret-down"></span> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <input type="text"
                                                class="form-control"
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value)}
                                                placeholder="Pincode"
                                                required />
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    <span class="fas fa-code"></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-8">
                                                <div class="icheck-primary">
                                                    <input type="checkbox" id="agreeTerms" name="terms" value="agree" />
                                                    <label for="agreeTerms">
                                                        I agree to the <a href="#">terms</a>
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-4">
                                                <button type="submit" class="btn btn-primary btn-block">Register</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </form>

                        <a href="/login" class="text-center">I already have a membership</a>


                    </div>
                    {
                        flag && (
                            <div class="alert alert-warning alert-dismissible fade show" role="alert" id="autoCloseAlert">
                                {resMsg}
                            </div>
                        )
                    }


                </div>
                {/* <!-- /.card --> */}

            </div>


        </>
    );
};

export default Signup;