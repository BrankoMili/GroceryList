import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ list, deleteItem, editItem, isEdit, inputRef, setIsEdit }) => {
  const [selectedItem, setSelectedItem] = useState("");
  let ordinalNumber = 0;

  return (
    <div className="grocery-list">
      {list.map((item) => {
        ordinalNumber += 1;
        return (
          <article
            key={item.id}
            className={`grocery-item ${
              selectedItem.id === item.id && isEdit === true ? "active" : ""
            }`}
          >
            <div className="elements">
              <p className="title ordinalnum">{ordinalNumber}.</p>
              <p className="title">{item.name}</p>
              <div className="btn-container">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => {
                    if (selectedItem.id === item.id) {
                      setIsEdit(!isEdit);
                    } else {
                      setIsEdit(true);
                    }
                    editItem(item);
                    setSelectedItem(item);
                    inputRef.current.focus();
                    if (isEdit && selectedItem.id === item.id) {
                      inputRef.current.placeholder = "grocery item";
                    } else {
                      inputRef.current.placeholder = "";
                    }
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    deleteItem(item.id);
                    setIsEdit(false);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
