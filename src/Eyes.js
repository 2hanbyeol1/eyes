import React, { useRef, useState, useEffect } from "react";

const Eyes = () => {
  const [ctx, setCtx] = useState(null);
  const [mousePos, setMousePos] = useState({});

  const canvasRef = useRef(null);

  const width = document.body.clientWidth;
  const height = document.body.clientHeight;

  // 그림 정보
  const wR = width / 6;
  const bR = wR / 3;

  const wX = width / 2;
  const wX1 = wX - wR;
  const wX2 = wX + wR;
  const wY = height / 2;

  window.addEventListener("mousemove", (event) =>
    setMousePos({ x: event.clientX, y: event.clientY })
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    setCtx(canvas.getContext("2d"));
    canvas.width = width;
    canvas.height = height;
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, width, height);

      const 큰빗변1 =
        ((mousePos.x - wX1) ** 2 + (mousePos.y - wY) ** 2) ** (1 / 2);
      const 큰빗변2 =
        ((mousePos.x - wX2) ** 2 + (mousePos.y - wY) ** 2) ** (1 / 2);
      const 작은빗변 = wR - bR;

      let lx = (작은빗변 * Math.abs(mousePos.x - wX1)) / 큰빗변1;
      if (mousePos.x < wX1) {
        lx *= -1;
      }
      let rx = (작은빗변 * Math.abs(mousePos.x - wX2)) / 큰빗변2;
      if (mousePos.x < wX2) {
        rx *= -1;
      }
      let ly = (작은빗변 * Math.abs(mousePos.y - wY)) / 큰빗변1;
      if (mousePos.y < wY) {
        ly *= -1;
      }
      let ry = (작은빗변 * Math.abs(mousePos.y - wY)) / 큰빗변2;
      if (mousePos.y < wY) {
        ry *= -1;
      }
      drawEye(lx, rx, ly, ry);
    }
  }, [mousePos]);

  useEffect(() => {
    if (ctx) {
      drawEye(0, 0, 0, 0);
    }
  }, [ctx]);

  function drawEye(lx, rx, ly, ry) {
    // 배경
    ctx.fillRect(0, 0, width, height);

    // 흰자
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(wX1, wY, wR, 0, Math.PI * 2);
    ctx.arc(wX2, wY, wR, 0, Math.PI * 2);
    ctx.fill();

    // 검은자
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(wX1 + lx, height / 2 + ly, bR, 0, Math.PI * 2);
    ctx.arc(wX2 + rx, height / 2 + ry, bR, 0, Math.PI * 2);
    ctx.fill();
  }

  return <canvas ref={canvasRef}></canvas>;
};

export default Eyes;
