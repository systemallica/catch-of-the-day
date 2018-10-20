import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = event => {
    // avoid reloading the page
    event.preventDefault();
    // get input value
    const storeName = this.myInput.current.value;
    // use the router props to change url and load App component
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          //gets deleted when user writes
          placeholder={"Placeholder"}
          //it's a real value that the user would have to replace
          defaultValue={getFunName()}
        />
        <button type="submit">Visit store -></button>
      </form>
    );
  }
}

export default StorePicker;
