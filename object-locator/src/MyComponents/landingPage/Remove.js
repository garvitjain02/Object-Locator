import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import {Form, Button} from 'react-bootstrap';

const Remove = () => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="danger" onClick={handleShow}>Remove</Button>

<Modal backdrop={false} fade={false} show={show} onHide={handleClose} style={{padding: '0%'}} size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered>
<Modal.Header style={{backgroundColor: 'rgb(16 94 98)'}} closeButton>
<Modal.Title>Remove Item</Modal.Title>
</Modal.Header>
<Form>
<Modal.Body style={{paddingTop: '1%', paddingBottom: '5%', fontSize: '110%'}}>
Do you really want to remove this Item?
</Modal.Body>
<Modal.Footer style={{backgroundColor: 'whitesmoke'}}>
<Button variant="secondary" onClick={handleClose}>
Cancel
</Button>
<Button type="submit" variant="danger" onClick={handleClose}>
Remove
</Button>
</Modal.Footer>
</Form>
</Modal>
    </div>
  )
}

export default Remove
