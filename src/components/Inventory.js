import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./LogIn";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    updateFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    fishes: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
  };

  state = {
    uid: null,
    owner: null,
  };

  // Automatically sign in on refresh
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    console.log(authData);
    // 1. look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    // 2. claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    // 3. set the state of the inventory component to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log out</button>;

    // 1. Check if user is logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. Check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }

    // 3. They must be the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory!</h2>
        {Object.keys(this.props.fishes).map(key => {
          return (
            <EditFishForm
              key={key}
              index={key}
              fish={this.props.fishes[key]}
              updateFish={this.props.updateFish}
              deleteFish={this.props.deleteFish}
            />
          );
        })}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load sample fishes
        </button>
        {logout}
      </div>
    );
  }
}

export default Inventory;
