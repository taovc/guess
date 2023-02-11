import React, { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";

const DrawBoard = () => {
  const canvasRef = useRef(null);

  let clickX = [];
  let clickY = [];
  let clickDrag = [];
  let paint;
  let point = { notFirst: false };

  let canvas = null;
  let context = null;
  let canvasWidth = 0;
  let canvasHeight = 0;

  const addClick = (x, y, dragging) => {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
  };

  const draw = () => {
    while (clickX.length > 0) {
      point.bx = point.x;
      point.by = point.y;
      point.x = clickX.pop();
      point.y = clickY.pop();
      point.drag = clickDrag.pop();
      context.beginPath();
      if (point.drag && point.notFirst) {
        context.moveTo(point.bx, point.by);
      } else {
        point.notFirst = true;
        context.moveTo(point.x - 1, point.y);
      }
      context.lineTo(point.x, point.y);
      context.closePath();
      context.stroke();
    }
  };

  const create = () => {
    context.rect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = "#f2f2f2";
    context.fill();
    context.strokeStyle = "#666";
    context.lineJoin = "round";
    context.lineWidth = 2;
    clickX = [];
    clickY = [];
    clickDrag = [];
  };

  const clear = () => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
  };

  const initCanvas = (canvasDivDom) => {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
    canvasWidth = canvasDivDom.clientWidth;
    canvasHeight = canvasDivDom.clientHeight;
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
    create();
    listen();
  };

  const saveCanvas = () => {
    const dataURL = canvasRef.current.toDataURL();
    console.log(dataURL);
  };

  const listen = () => {
    let left = canvas.getBoundingClientRect().left;
    let top = canvas.getBoundingClientRect().top;
    canvas.addEventListener("mousedown", function (e) {
      paint = true;
      addClick(e.pageX - left, e.pageY - top);
      draw();
    });

    canvas.addEventListener("mousemove", function (e) {
      if (!paint) {
        return;
      }
      addClick(e.pageX - left, e.pageY - top, true);
      draw();
    });

    canvas.addEventListener("mouseup", function (e) {
      paint = false;
      saveCanvas();
    });

    canvas.addEventListener("mouseleave", function (e) {
      paint = false;
    });
  };

  useEffect(() => {
    initCanvas(canvasRef.current.parentElement);
  });

  return (
    <div className="Auth-form-container">
      <div className="canvas-container">
        <canvas ref={canvasRef} />
        <Button variant="primary" onClick={clear}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default DrawBoard;
