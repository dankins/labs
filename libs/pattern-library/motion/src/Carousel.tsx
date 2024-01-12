"use client";
import classNames from "classnames";
import { Children, useState } from "react";

export function Carousel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNext() {
    setCurrentIndex((prevIndex: number) =>
      prevIndex + 1 === Children.count(children) ? 0 : prevIndex + 1
    );
  }
  function handlePrevious() {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? Children.count(children) - 1 : prevIndex - 1
    );
  }
  function handleDotClick(index: number) {
    setCurrentIndex(index);
  }

  return (
    <div className={classNames("flex flex-col", className)}>
      {Children.map(children, (child, idx) =>
        idx === currentIndex ? (
          <div className="w-full h-full">{child}</div>
        ) : undefined
      )}
      <div className="slide_direction">
        <div className="left" onClick={handlePrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </div>
        <div className="right" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
          </svg>
        </div>
      </div>
      <div className="indicator">
        {Children.map(children, (_, index) =>
          index === currentIndex ? (
            <>
              {" "}
              <div
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></div>
            </>
          ) : undefined
        )}
      </div>
    </div>
  );
}
