import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please enter a store</h2>
        <input
          type="text"
          required
          //gets deleted when user writes
          placeholder={getFunName()}
          //it's a real value that the user would have to replace
          defaultValue={getFunName()}
        />
        <button type="submit">Visit store -></button>
      </form>
    );
  }
}

export default StorePicker;
