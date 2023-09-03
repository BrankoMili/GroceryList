import React, { useState, useEffect, useRef } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [itemList, setItemList] = useState(getLocalStorage());
  let [item, setItem] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [itemForRename, setItemForRename] = useState({});
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(itemList));
    inputRef.current.focus();
  }, [itemList]);

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const addItem = (e) => {
    e.preventDefault();
    if (item) {
      setItemList([
        ...itemList,
        { name: item, id: new Date().getTime().toString() },
      ]);
      showAlert(true, "Item added to the list", "success");
    } else {
      showAlert(true, "Please enter the value", "danger");
    }
    setItem("");
  };

  const deleteItem = (id) => {
    showAlert(true, "Item is deleted", "danger");
    const newList = itemList.filter((item) => item.id !== id);
    setItemList(newList);
  };

  const editItem = (item) => {
    setItemForRename(item);
  };

  const renameItem = (e) => {
    e.preventDefault();
    if (item) {
      showAlert(true, "Value changed", "success");
      setItemList(
        itemList.map((i) => {
          if (i.id === itemForRename.id) {
            i.name = item;
          }
          return i;
        })
      );
    } else {
      showAlert(true, "Please enter the value", "danger");
    }

    setIsEdit(!isEdit);
    setItem("");
    inputRef.current.placeholder = "grocery item";
  };

  const clearList = () => {
    showAlert(true, "Empty list", "danger");
    setItemList([]);
  };

  return (
    <section className="section-center">
      <form className="grocery-form">
        <h3 className="title">Grocery List</h3>
        <Alert {...alert} removeAlert={showAlert} list={itemList} />

        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="grocery item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            autoFocus
            ref={inputRef}
          ></input>
          {isEdit ? (
            <button className="submit-btn" onClick={renameItem}>
              Rename Item
            </button>
          ) : (
            <button className="submit-btn" onClick={addItem}>
              Add Item
            </button>
          )}
        </div>
        <div className="grocery-container">
          <List
            list={itemList}
            deleteItem={deleteItem}
            editItem={editItem}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            inputRef={inputRef}
          />
          {itemList.length > 0 && (
            <button
              className="clear-btn"
              onClick={() => {
                clearList();
                setIsEdit(false);
              }}
            >
              Clear items
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default App;
