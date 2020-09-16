import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Button,
  Container,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "reactstrap";
import { deleteItem, getItems, setItemsLoading } from "../actions/ItemActions";
import "../App.css";

const ShoppingList = (props) => {
  const { items, loading } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setItemsLoading());
    Axios.get("/api/items").then((res) => {
      dispatch(getItems(res.data));
    });
  }, [dispatch]);

  const handleDeleteItem = (id) => {
    Axios.delete("/api/items/" + id).then((res) => {
      dispatch(deleteItem(id));
    });
  };

  return (
    <Container>
      {loading && (
        <Spinner
          style={{ margin: "auto", display: "block" }}
          size="md"
          color="secondary"
        />
      )}
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="primary"
                  size="sm"
                  onClick={() => handleDeleteItem(_id)}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
