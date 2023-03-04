import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import macos from "../images/mac.png";
import windows from "../images/generic_laptop.png";
import linux from "../images/linux.jpeg";

import { Link, useNavigate } from "react-router-dom";
import { db } from "../index";
import { useMetamaskContext } from "../context/metamask";



// function to return mac.png if device is macos and windows.png if device is windows
export const getDeviceImage = (device) => {
  if (device === "Macos") {
    return macos;
  } else if (device === "Windows") {
    return windows;
  } else if (device === "Linux") {
    return linux;
  }
};


const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  const {paySomeone} = useMetamaskContext();
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      db.collection("posts")
        .get()
        .then((querySnapshot) => {
          // Loop through the data and store
          // it in array to display
          querySnapshot.forEach((element) => {
            var data = element.data();
            console.log("data: ", data);
            setData((arr) => [...arr, data]);
          });
          setFilter(data);
        });

      if (componentMounted) {
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.device === cat);
    setFilter(updatedList);
  };
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Windows")}
          >
            Windows
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Macos")}
          >
            Macos
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("Linux")}
          >
            Linux
          </button>
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <div className="card-body">
                  <h5 className="card-title">
                    {product.device.substring(0, 12)}
                  </h5>
                  <img src={getDeviceImage(product.device)} style={{maxWidth: '30h', maxHeight: '30vh'}}/>
                  {/* <p className="card-text">
                    {getDeviceImage(product.device)}
                  </p> */}
                  <p className="card-text">
                    contact: {product.email.substring(0, 20)}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price} / hr</li>
                  <li className="list-group-item lead">
                    {product.duration} hours
                  </li>
                  {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div className="card-body">
                  <div
                    className="btn btn-dark m-1"
                    onClick={()=>paySomeone((Number(product.price)).toString(), ()=> {
                      navigate("/product/" + product.id)
                    })}
                  >
                    Buy Now
                  </div>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest devices for rent</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
