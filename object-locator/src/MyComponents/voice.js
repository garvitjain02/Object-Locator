import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';

const Voice = () => {
    const [recording, setRecording] = useState(false);
    const [audioText, setAudioText] = useState('');
    const [show, setShow] = useState(false);

    const handleButtonClick = async () => {
        try {
      setRecording(true);

      // Make a request to the Python backend to start recording
      const response = await fetch('http://localhost:5000/api/record-sound', {
        method: 'POST',
      });
      const resultData = await response.json();
      setAudioText(resultData.text);
        setRecording(false);
    } catch (error) {
      console.error('Error:', error);
      setRecording(false);
    }

    };

    return (
        <div>
            <Button variant="outline-light"className="mx-2" onClick={() => setShow(true)}>
            Voice
            </Button>

            <Modal backdrop={false} fade={false} show={show} onHide={() => setShow(false)} style={{padding: '0%'}} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Voice Assitant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" onClick={handleButtonClick} disabled={recording} centered>
            {recording ? 'Recording...' : 'Tap to speak'}
            </Button>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    
  );
}

export default Voice;
