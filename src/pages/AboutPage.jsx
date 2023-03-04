import React from "react";
import { Footer, Navbar } from "../components";
import { getDeviceImage } from "../components/Products";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
          Optimum enables everyday users to rent out their computers, similarly
          to how big cloud providers do so. This is done through Optimum’s
          marketplace, where sellers post their computer specs and listing price
          per time interval, and potential buyers bid for those resources. When
          a buyer’s bid and seller's ask match, the funds are transferred to the
          seller, and the buyer receives an exclusive link to a remote desktop
          connected to the seller’s computer. There, they can use the machine as
          their own.
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src={getDeviceImage("Linux")}
                alt=""
                style={{maxWidth: '30h', maxHeight: '30vh'}}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Linux</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                 src={getDeviceImage("Windows")}

                alt=""
                style={{maxWidth: '30h', maxHeight: '30vh'}}

              />
              <div className="card-body">
                <h5 className="card-title text-center">Windows</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src={getDeviceImage("Macos")}
                alt=""
                style={{maxWidth: '30h', maxHeight: '30vh'}}
              />
              <div className="card-body">
                <h5 className="card-title text-center">MacOS</h5>
              </div>
            </div>
          </div>
          {/* <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Electronics</h5>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
