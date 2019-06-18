import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';

class GalleryPage extends Component {
  render() {
    const images =
    [{
      src: "https://static.wixstatic.com/media/6f013e_75162efc11094802bec744061bf99cfc~mv2.jpg/v1/fill/w_671,h_264,fp_0.50_0.50,q_90/6f013e_75162efc11094802bec744061bf99cfc~mv2.webp?retry=1",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      isSelected: true
    },
    {
      src: "",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },

    {
      src: "",
      thumbnailWidth: 320,
      thumbnailHeight: 212
    }]
    return (
      <>
        <div className="gallery-page-container">
            <h1>Our Latest Work</h1>
          <div id="gallery" className="gallery-container">
            <Gallery images={images} />
          </div>
        </div>
      </>
    )
  }
}

export default GalleryPage
