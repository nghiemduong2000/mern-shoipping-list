import Axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { addItem } from "../actions/ItemActions";

const ItemModal = (props) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: name,
    };

    Axios.post("/api/items", newItem).then((res) =>
      dispatch(addItem(res.data))
    );
    toggle();
    setName("");
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                value={name}
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
