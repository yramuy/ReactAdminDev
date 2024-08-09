
import { Modal, Button } from "react-bootstrap";
import ScreenList from "./screenlist";
import RolePermission from "./rolepermission";
import MenuItem from "./menuitem";
import { useDispatch } from "react-redux";

const Screen = ({ show, handleClose, text }) => {
    let modal;
    if (text === 'Screen') {
        modal = <ScreenList />;
    } else if (text === 'Screen Permission') {
        modal = <RolePermission />;
    } else {
        modal = <MenuItem />;
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{text}</Modal.Title>
                    <Button variant="secondary" onClick={handleClose}>
                        X
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        {modal}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Screen;