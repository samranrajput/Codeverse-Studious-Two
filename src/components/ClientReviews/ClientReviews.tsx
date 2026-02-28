import React, { useState, useCallback, useRef, type ChangeEvent } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import "./ClientReviews.css";
import ShinyText from "../ShinyText/ShinyText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { IoMdPhotos } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
// Confetti import add kiya
import { type ConfettiRef } from "../ConfettiCanvas/ConfettiCanvas";

// Cloudinary Constants
const CLOUDINARY_CLOUD_NAME = "dgztym2e5";
const CLOUDINARY_UPLOAD_PRESET = "image-url";

interface SubmitMessage {
  type: "success" | "error";
  text: string;
}

interface ImageDimensions {
  width: number;
  height: number;
}

// 1. Props interface add ki
interface ClientReviewsProps {
  confettiRef: React.RefObject<ConfettiRef | null>;
}

// 2. Props ko yahan receive kiya
const ClientReviews: React.FC<ClientReviewsProps> = ({ confettiRef }) => {
  const [fullName, setFullName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage | null>(
    null,
  );

  const FORM_ENDPOINT = "https://formspree.io/f/xanvgrry";

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [rating, setRating] = useState<number>(5);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageData = URL.createObjectURL(file);
      setImageSrc(imageData);

      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = imageData;
      setSubmitMessage({
        type: "success",
        text: "Image loaded. Please crop and apply.",
      });
    }
  };

  const getCroppedImg = async (): Promise<void> => {
    if (!croppedAreaPixels || !imageSrc) {
      setSubmitMessage({ type: "error", text: "Please crop the image first." });
      return;
    }

    try {
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => (image.onload = resolve));

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { x, y, width, height } = croppedAreaPixels;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

      const base64 = canvas.toDataURL("image/jpeg", 0.9);
      setCroppedImage(base64);
      setImageSrc(null);
      setImageDimensions({ width: 0, height: 0 });
      setSubmitMessage({
        type: "success",
        text: "Image Cropped and Applied.",
      });
    } catch (error) {
      console.error("Cropping Error:", error);
      setSubmitMessage({ type: "error", text: "Cropping failed." });
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancel = () => {
    setImageSrc(null);
    setCroppedAreaPixels(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setImageDimensions({ width: 0, height: 0 });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSubmitMessage(null);
  };

  const getCropperContainerStyle = (): React.CSSProperties => {
    const maxWidth = 310;
    const maxHeight = 310;
    if (imageDimensions.width === 0) return { width: "310px", height: "310px" };

    const scale = Math.min(
      maxWidth / imageDimensions.width,
      maxHeight / imageDimensions.height,
    );
    return {
      width: `${Math.round(imageDimensions.width * scale)}px`,
      height: `${Math.round(imageDimensions.height * scale)}px`,
      margin: "0 auto",
      position: "relative",
    };
  };

  const renderStars = () => {
    const stars: React.ReactNode[] = [];
    for (let i = 1; i <= 5; i++) {
      const diff = rating - i;
      const icon: IconDefinition =
        diff >= 0 ? faStar : diff >= -0.5 ? faStarHalfStroke : faStar;
      const color = diff >= -0.5 ? "text-warning" : "text-secondary";
      stars.push(<FontAwesomeIcon key={i} icon={icon} className={color} />);
    }
    return stars;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    if (!fullName || !country || !message) {
      setIsSubmitting(false);
      setSubmitMessage({ type: "error", text: "Please fill all fields." });
      return;
    }

    let finalImageUrl = "N/A";
    if (croppedImage) {
      try {
        const uploadFormData = new FormData();
        uploadFormData.append("file", croppedImage);
        uploadFormData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: uploadFormData,
          },
        );
        const data = await res.json();
        finalImageUrl = data.secure_url;
      } catch (err) {
        console.error("Upload error", err);
      }
    }

    const payload = {
      _subject: `Review from ${fullName}`,
      fullName,
      country,
      rating: `${rating} Stars`,
      message,
      imageUrl: finalImageUrl,
    };

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // 3. Confetti fire logic yahan add ki
        confettiRef.current?.fire();

        setSubmitMessage({ type: "success", text: "Submitted successfully!" });
        setFullName("");
        setCountry("");
        setMessage("");
        setRating(5);
        setCroppedImage(null);
      }
    } catch (error) {
      setSubmitMessage({ type: "error", text: "Network error." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="clientReviews" style={{ overflow: "hidden" }}>
      <div className="sections-heading-container" data-aos="fade-down">
        <ShinyText
          text="Clients Reviews"
          speed={2}
          spread={135}
          direction="left"
          yoyo
          pauseOnHover
          disabled={false}
          className="sections-heading themed-text"
        />
      </div>
      <div className="container">
        {submitMessage && (
          <div
            className={`message-box themed-bg themed-text themed-border ${submitMessage.type}`}
          >
            {submitMessage.type === "success" ? (
              <>
                <FaCheckCircle style={{ color: "green", fontSize: "1.5rem" }} />
                <p style={{ color: "green" }}>{submitMessage.text}</p>
              </>
            ) : (
              <>
                <RxCrossCircled style={{ color: "red", fontSize: "1.5rem" }} />
                <p style={{ color: "red" }}>{submitMessage.text}</p>
              </>
            )}
            <button onClick={() => setSubmitMessage(null)}>&times;</button>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="submit-review-form themed-section-card"
        >
          <div className="holo-swipe themed-holo-swipe"></div>

          <div className="profile-wrapper">
            <div className="avatar-container themed-border themed-main-bg themed-text">
              {croppedImage ? (
                <img src={croppedImage} alt="Profile" />
              ) : (
                <div className="placeholder">+</div>
              )}
              <label
                htmlFor="fileInput"
                className="camera-icon themed-border themed-main-bg themed-text"
              >
                <IoMdPhotos />
              </label>
              <input
                type="file"
                ref={fileInputRef}
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                hidden
                className="themed-bg themed-text"
              />
            </div>
          </div>

          {imageSrc && (
            <div className="editor-modal themed-bg themed-border">
              <div style={getCropperContainerStyle()}>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="range-group">
                <p className="themed-text">Zoom</p>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="crop-slider"
                />
              </div>
              <button
                type="button"
                className="btn-apply"
                onClick={getCroppedImg}
              >
                Apply
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}

          <div className="form-group">
            <input
              className="themed-main-text themed-border"
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder=" "
            />
            <label className="themed-main-text" htmlFor="fullName">
              Full Name
            </label>
          </div>
          <div className="form-group">
            <input
              className="themed-main-text themed-border"
              id="country" // Fixed duplicate ID from fullName to country
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder=" "
            />
            <label className="themed-main-text" htmlFor="country">
              Country
            </label>
          </div>

          <div className="star-reviews-container">
            <div className="stars-container">{renderStars()}</div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <textarea
              className="themed-main-text themed-border"
              id="meassage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder=" "
            ></textarea>
            <label
              className="themed-main-text meassage-label"
              htmlFor="meassage"
            >
              Message
            </label>
          </div>

          <button
            type="submit"
            className="submit-btn themed-border"
            disabled={isSubmitting}
          >
            <ShinyText
              text={isSubmitting ? "Sending..." : "Submit Review"}
              speed={2}
              spread={135}
              direction="left"
              yoyo
              pauseOnHover
              disabled={false}
              className="btn"
            />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ClientReviews;
