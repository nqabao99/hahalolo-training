import React from "react";

function Image({ className, src, alt, width }) {
    return <img className={className} src={src} alt={alt} width={width} />;
}

export default Image;
