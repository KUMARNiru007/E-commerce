import React from "react";
import { Carousel } from "react-bootstrap";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?auto=format&fit=crop&w=1474&q=80",
    heading: <>Discover your <span>Passion</span></>,
  },
  {
    img: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=1500&q=80",
    heading: <>Show your <span>Style</span></>,
  },
  {
    img: "https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&w=750&q=80",
    heading: <>Live your <span>Dream</span></>,
  },
];

export default function Corousel() {
  return (
    <Carousel className="corousel">
      {slides.map((slide, i) => (
        <Carousel.Item key={i} className="carousel-item">
          <img
            className="d-block w-100"
            src={slide.img}
            alt={`slide ${i + 1}`}
            style={{ height: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h1>{slide.heading}</h1>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}