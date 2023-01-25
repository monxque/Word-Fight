import React, { useEffect, useState } from "react";
const imageUrl = "https://cors-anywhere-0iv1.onrender.com/https://app.pixelencounter.com/api/basic/monsters/random/png?size=60";

export default function Monsters(props) {

    const [img, setImg] = useState();

    const fetchImage = async () => {
      const res = await fetch(imageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };
  
    useEffect(() => {
      fetchImage();
    }, []);
  
    return (
        <image id={props.id} className="monster" href={img} height="2" x={props.x} y={props.y}/>
    );
}
