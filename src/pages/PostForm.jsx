import {useState,React} from "react";
import {db} from "../index"
import {Navbar} from "../components";
import {ethers} from "ethers"
import _uniqueId from 'lodash/uniqueId';
import { useMetamaskContext } from "../context/metamask";

const PostForm = () => {

  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [email, setEmail] = useState(null);
  const [device, setDevice] = useState("Windows");
  const [description, setDescription] = useState(null);
  const [remoteLink, setRemoteLink] = useState(null);

  const {accountChangedHandler, chainChangedHandler, submitStake, shouldStake} = useMetamaskContext();

	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

  const handleInputChange = (e) => {

    const { id, value } = e.target;
    if (id === "price") {
      setPrice(value);
    }
    if (id === "duration") {
      setDuration(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "device") {
      setDevice(value);
    }
    if (id === "description") {
      setDescription(value);
    }
    if (id === "remoteLink") {
      setRemoteLink(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (shouldStake != "Post")
      await submitStake();
    db.collection("posts").add({
      id: _uniqueId('product-'),
      price: price,
      duration: duration,
      email: email,
      device: device,
      description: description,
      remoteLink: remoteLink,
    })
    .then(()=>{
      alert("Message has been submitted");
    })
    .catch((err)=>{
      alert(err.message)
    })
    setPrice("");
    setDuration("");
    setEmail("");
    setDevice("");
    setDescription("");
    setRemoteLink("");

  };

  return (
    <>
    <Navbar />
    <div className="container my-3 py-3">
      <h1 className="text-center">Post your device for rent</h1>
      <hr />
      <div class="row my-4 h-100">
        <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
          <form>
            <div class="form my-3">
              <label for="price">
                Ask price (in $/hr)
              </label>
              <input
                className="form-control"
                type="text"
                value={price}
                onChange={(e) => handleInputChange(e)}
                id="price"
                placeholder="0.02"
              />
            </div>
            <div className="form my-3">
              <label className="form__label" for="duration">
                Leasing period (in hrs)
              </label>
              <input
                type="text"
                name=""
                id="duration"
                value={duration}
                className="form-control"
                onChange={(e) => handleInputChange(e)}
                placeholder="10"
              />
            </div>
            <div className="form my-3">
              <label className="form__label" for="email">
                Email{" "}
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => handleInputChange(e)}
                placeholder="hello@optimum.com"
              />
            </div>
            <div className="form my-3">
              <label className="form__label" for="device">
                Device{" "}
              </label>
              <select
                className="form-control"
                id="device"
                value={device}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="Windows" defaultValue>Windows</option>
                <option value="Macos">Macos</option>
                <option value="Linux">Linux</option>
              </select>
            </div>
            <div className="form my-3">
              <label className="form__label" for="description">
                Description
              </label>
              <input
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => handleInputChange(e)}
                placeholder="CPUs, RAM, GPU, etc"
              />
            </div>
            <div className="form my-3">
              <label className="form__label" for="remoteLink">
                Chrome remote desktop
              </label>
              <input
                className="form-control"
                id="remoteLink"
                value={remoteLink}
                onChange={(e) => handleInputChange(e)}
                placeholder="link..."
              />
            </div>
            <div className="text-center">
              <button onClick={handleSubmit} type="submit" className="my-2 mx-auto btn btn-dark">
                {shouldStake}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default PostForm;
