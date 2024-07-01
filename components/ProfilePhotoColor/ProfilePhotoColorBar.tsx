"use client"

import React, { useEffect, useState } from 'react';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface ImageProps {
  src: string;
}

const getAverageRGB = (imgEl: HTMLImageElement): RGB => {
  const blockSize = 5; // only visit every 5 pixels
  const defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs
  const canvas = document.createElement('canvas');
  const context = canvas.getContext && canvas.getContext('2d');
  let data: ImageData, width: number, height: number;
  let i = -4;
  let length: number;
  const rgb = { r: 0, g: 0, b: 0 };
  let count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    /* security error, img on diff domain */
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
};

const AverageColorDiv: React.FC<ImageProps> = ({ src }) => {
  const [rgb, setRgb] = useState<RGB>({ r: 0, g: 0, b: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const avgRgb = getAverageRGB(img);
      setRgb(avgRgb);
    };
  }, [src]);

  const divStyle = {
    width: '1200px',
    height: '1px',
    marginBottom:'1px',
    backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  };
  return <div style={divStyle}></div>;
};

export default AverageColorDiv;
