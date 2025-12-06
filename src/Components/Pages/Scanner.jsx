import React, { useEffect, useRef, useState } from "react";
import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
} from "@zxing/library";

export default function Scanner({ onDetected }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const readerRef = useRef(null);

  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    startScanner();
    return () => stopScanner();
  }, []);

  const startScanner = async () => {
    setError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      await videoRef.current.play();

      startDecoding();
    } catch (err) {
      console.error("Camera Start Error:", err);
      setError("Camera cannot start.");
    }
  };

  const startDecoding = () => {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.ITF,
      BarcodeFormat.AZTEC,
      BarcodeFormat.DATA_MATRIX,
      BarcodeFormat.PDF_417,
    ]);

    readerRef.current = new BrowserMultiFormatReader(hints);

    const scanLoop = async () => {
      if (!videoRef.current) return;

      try {
        // BEST METHOD FOR QR CODES
        const result = await readerRef.current.decodeFromImage(videoRef.current);

        if (result) {
          const text = result.getText();
          setResult(text);
          onDetected?.(text);

          window.location.href = `https://devphaneo.divanex.in/patient-view/${text}`;

          return;
        }
      } catch (err) {
        // ignore NotFoundException
      }

      requestAnimationFrame(scanLoop);
    };

    requestAnimationFrame(scanLoop);
  };

  const stopScanner = () => {
    try {
      readerRef.current?.reset();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <div
        style={{
          position: "relative",
          height: 320,
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "2px solid rgba(0,255,0,0.6)",
            pointerEvents: "none",
          }}
        ></div>

        {/* <div
          style={{
            position: "absolute",
            top: "50%",
            width: "100%",
            height: "3px",
            background: "rgba(255,0,0,0.7)",
            pointerEvents: "none",
          }}
        ></div> */}
      </div>

      {error && <p style={{ color: "red", marginTop: 10 }}>⚠ {error}</p>}
      {result && (
        <p style={{ marginTop: 10, fontWeight: "bold" }}>✅ Scanned: {result}</p>
      )}
    </div>
  );
}
