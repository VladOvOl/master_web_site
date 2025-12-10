import React from "react";

interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: number; 
}

const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, size = 60 }) => {
  const initials =
    (firstName?.[0] || "").toUpperCase() +
    (lastName?.[0] || "").toUpperCase();

  const styles: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor: "#4285F4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: size * 0.4,
    fontWeight: 600,
    userSelect: "none",
  };

  return <div style={styles}>{initials}</div>;
};

export default Avatar;