import React from 'react';
import { Modal } from 'react-bootstrap'; 

const ModalCheck = (props) => {
        
    return (
        <Modal show={props.show}>
        <Modal.Header>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>{props.msg}</p>
        </Modal.Body>

        <Modal.Footer>
            <button onClick={props.close} className="button-vermelho">Fechar</button>
        </Modal.Footer>
        </Modal>
    );
};

export default ModalCheck;