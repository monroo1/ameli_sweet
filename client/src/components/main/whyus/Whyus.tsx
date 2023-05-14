import { FC } from "react";
// import Image from "next/image";

import { HiOutlineCake } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCake3Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";

import strawberry from "../../../images/strawberry.jpg";

import "./mainWhyus.scss";

const WhyUs: FC = () => {
  return (
    <section className="whyus">
      <div className="whyus-content wrapper">
        <h3 className="whyus-title">Почему именно мы</h3>
        <div className="whyus-grid">
          <div className="whyus-grid--block">
            <div className="whyus-grid--block--card card-reverse">
              <div className="whyus-grid--block--card--text">
                <h4>Quality Products</h4>
                <p>
                  We guarantee the quality of all the cakes we provide as they
                  are baked using the freshest ingredients.
                </p>
              </div>
              <div className="whyus-grid--block--card--icon">
                <HiOutlineCake color="#eba793" size={44} />
              </div>
            </div>
            <div className="whyus-grid--block--card--divider"></div>
            <div className="whyus-grid--block--card card-reverse">
              <div className="whyus-grid--block--card--text">
                <h4>free delivery</h4>
                <p>
                  All orders submitted by our US clients are delivered for free
                  throughout the United States.
                </p>
              </div>
              <div className="whyus-grid--block--card--icon">
                <TbTruckDelivery color="#eba793" size={44} />
              </div>
            </div>
          </div>
          <div className="whyus-grid--image">
            <img alt="strawberry" src={strawberry} />
          </div>
          <div className="whyus-grid--block--card--divider divider-mobile"></div>
          <div className="whyus-grid--block">
            <div className="whyus-grid--block--card">
              <div className="whyus-grid--block--card--icon">
                <RiCake3Line color="#eba793" size={44} />
              </div>
              <div className="whyus-grid--block--card--text">
                <h4 style={{ textAlign: "left" }}>catering service</h4>
                <p style={{ textAlign: "left" }}>
                  Our bakery also provides an outstanding catering service for
                  events and special occasions.
                </p>
              </div>
            </div>
            <div className="whyus-grid--block--card--divider"></div>
            <div className="whyus-grid--block--card">
              <div className="whyus-grid--block--card--icon">
                <MdPayment color="#eba793" size={44} />
              </div>
              <div className="whyus-grid--block--card--text">
                <h4 style={{ textAlign: "left" }}>Online payment</h4>
                <p style={{ textAlign: "left" }}>
                  We accept all kinds of online payments including Visa,
                  MasterCard, American Express credit cards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
