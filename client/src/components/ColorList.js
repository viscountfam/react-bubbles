import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from "../utils/axiosWithAuth"
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: {
      hex: "",
      id: Date.now()
    }
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const handleChange = event => {
    setNewColor({
      ...newColor,
      [event.target.name]: event.target.value
    })
  }

  const addColor = () => {
    axiosWithAuth()
      .post(`colors`, newColor)
      .then(res => { console.log(`${newColor.color} has been added`, res)
      axiosWithAuth()
            .get(`colors`)
              .then(res => {
                console.log("Updated color list", res)
                updateColors(res.data)
              })
    })

  }

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)
        .then(res => {
          console.log("this is the response from the color to edit put request", res)
          axiosWithAuth()
            .get(`colors`)
              .then(res => {
                console.log("Updated color list", res)
                updateColors(res.data)
              })
        })
        .catch(err => {
          console.log("An error occurred while trying to update the color", err)
        })
  };

  const deleteColor = color => {
    axiosWithAuth()
        .delete(`colors/${color.id}`)
          .then(res => {
            console.log(`The color ${color.color} was successfully deleted`, res)
          })
          updateColors( colors.filter(colors =>
            colors.id !== color.id))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <input
        type="text"
        name="color"
        value={newColor.color}
        onChange={handleChange}
        placeholder="name"
      />
      <input
        type="color"
        name="hex"
        value={newColor.code.hex}
        onChange={handleChange}
        placeholder="hex"
      />
      <buton onClick={addColor}>Add new color</buton>
    </div>
  );
};

export default ColorList;
