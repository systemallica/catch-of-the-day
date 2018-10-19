import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  static propTypes = {
    addFish: PropTypes.func,
  };

  createFish = event => {
    // avoid reloading the page
    event.preventDefault();

    // create fish object with form data
    const fish = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.val,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value,
    };

    // call the state function passed as a prop
    this.props.addFish(fish);

    // refresh the form
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input placeholder="Name" name="name" ref={this.nameRef} type="text" />
        <input
          placeholder="Price"
          name="price"
          ref={this.priceRef}
          type="text"
        />
        <select
          placeholder="Status"
          name="status"
          ref={this.statusRef}
          type="text"
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea
          placeholder="Desc"
          name="desc"
          ref={this.descRef}
          type="text"
        />
        <input
          placeholder="Image"
          name="image"
          ref={this.imageRef}
          type="text"
        />
        <button type="submit">+ Add fish</button>
      </form>
    );
  }
}

export default AddFishForm;
