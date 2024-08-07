import { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ScreenList from "./screenlist";
import axios from "axios";

const Screen = ({ show, handleClose }) => {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Screen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <ScreenList />

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