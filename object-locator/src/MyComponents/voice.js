import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "axios";

const Voice = () => {
  const [recording, setRecording] = useState(false);
  const [show, setShow] = useState(false);
  var voiceOutput = "";
  const userid = sessionStorage.getItem("token");

  const handleButtonClick = async () => {
    try {
      setRecording(true);

      const response = await fetch(`http://localhost:5000/api/record-sound`, {
        method: "POST",
      });
      const TextData = await response.json();
      const audioText = TextData.text;

      setRecording(false);

      if (response.ok) {
        const Queryresponse = await fetch(
          `http://localhost:5000/api/query?userid=${userid}&audiotext=${audioText}`
        );
        const queryData = await Queryresponse.json();
        console.log(queryData);

        if (Queryresponse.ok) {
          const action = queryData.query.split(" ")[0];
          try {
            const voiceResponse = await axios.post(
              "http://localhost:8800/voiceRequest",
              {
                query: queryData.query,
              }
            );
            console.log(voiceResponse);

            if (action === "DELETE") {
              if (voiceResponse.data.affectedRows > 0) voiceOutput = "Deleted";
              else voiceOutput = "Item Cannot be Deleted";
            } else if (action === "UPDATE") {
              if (voiceResponse.data.affectedRows > 0) voiceOutput = "Updated";
              else voiceOutput = "Item Cannot be Updated";
            } else if (action === "INSERT") {
              voiceOutput = "Added";
            } else if (action === "SELECT") {
              if (voiceResponse.data.length > 0) {
                voiceOutput = voiceResponse.data[0].location;
              } else voiceOutput = "No such item";
            }
            console.log(voiceOutput);
            await fetch(
              `http://localhost:5000/api/voice-output?command=${voiceOutput}`
            );
          } catch (err) {
            console.log(err);
          }
        } else {
          console.error("Invalid query");
          voiceOutput = "Cannot perform any action, please try again";
          console.log(voiceOutput);
          try {
            await fetch(
              `http://localhost:5000/api/voice-output?command=${voiceOutput}`
            );
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        console.error("Failed to start recording.");
        setRecording(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setRecording(false);
    }
  };

  return (
    <div>
      <Button
        variant="outline-light"
        className="mx-2"
        onClick={() => setShow(true)}
      >
        Voice
      </Button>

      <Modal
        backdrop={false}
        fade={false}
        show={show}
        onHide={() => setShow(false)}
        style={{ padding: "0%" }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => {
            setShow(false);
            window.location.reload();
          }}
        >
          <Modal.Title>Voice Assitant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="primary"
            onClick={handleButtonClick}
            disabled={recording}
            centered
          >
            {recording ? "Recording..." : "Tap to speak"}
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setShow(false);
              window.location.reload();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Voice;
