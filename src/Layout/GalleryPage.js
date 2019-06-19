import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';

class GalleryPage extends Component {
  render() {
    const photos =
    [{
      src: "https://static.wixstatic.com/media/6f013e_75162efc11094802bec744061bf99cfc~mv2.jpg/v1/fill/w_671,h_264,fp_0.50_0.50,q_90/6f013e_75162efc11094802bec744061bf99cfc~mv2.webp?retry=1",
      width: 5,
      height: 3
    },
    {
      src: "https://static.wixstatic.com/media/6f013e_a444671f99f44d218a49dd727119f83c~mv2.jpg/v1/fill/w_633,h_249,fp_0.50_0.50,q_90/6f013e_a444671f99f44d218a49dd727119f83c~mv2.webp?retry=1",
      width: 5,
      height: 3
    },
    {
      src: "https://static.wixstatic.com/media/84770f_6db88eadf0074772b641093ffc7c12f3~mv2_d_5184_3456_s_4_2.jpg/v1/fill/w_351,h_234,fp_0.50_0.50,q_90/84770f_6db88eadf0074772b641093ffc7c12f3~mv2_d_5184_3456_s_4_2.webp?retry=1",
      width: 2,
      height: 2
    },
    {
      src: "https://static.wixstatic.com/media/6f013e_a1495ea7533b42bda1b609a0ac991d4b~mv2.jpg/v1/fill/w_237,h_234,fp_0.50_0.50,q_90/6f013e_a1495ea7533b42bda1b609a0ac991d4b~mv2.webp?retry=1",
      width: 3,
      height: 3
    },
    {
      src: "https://static.wixstatic.com/media/c9a9e2_6c6d32c284c24a04a37598edf2d3475e~mv2_d_1350_1500_s_2.jpg/v1/fill/w_212,h_234,fp_0.50_0.50,q_90/c9a9e2_6c6d32c284c24a04a37598edf2d3475e~mv2_d_1350_1500_s_2.webp?retry=1",
      width: 3,
      height: 3
    },
    {
      src: "https://static.wixstatic.com/media/c9a9e2_c239b383111944548cc9cb80ce3cc1c7~mv2.jpg/v1/fill/w_369,h_234,fp_0.50_0.50,q_90/c9a9e2_c239b383111944548cc9cb80ce3cc1c7~mv2.webp?retry=1",
      width: 5,
      height: 3
    },
    {
      src: "https://static.wixstatic.com/media/c9a9e2_df41afb2e54446238865732c8e657a6d~mv2.jpg/v1/fill/w_348,h_234,fp_0.50_0.50,q_90/c9a9e2_df41afb2e54446238865732c8e657a6d~mv2.webp?retry=1",
      width: 4,
      height: 3
    },
    {
      src: "https://static.wixstatic.com/media/c9a9e2_67d8ceef680442779ccc47035930d95d~mv2_d_1350_1500_s_2.jpg/v1/fill/w_212,h_234,fp_0.50_0.50,q_90/c9a9e2_67d8ceef680442779ccc47035930d95d~mv2_d_1350_1500_s_2.webp?retry=1",
      width: 3,
      height: 3
    },
    {
      src: "https://static.wixstatic.com/media/c9a9e2_3f272b5e38214a369ad936d60fd5f611~mv2_d_1350_1500_s_2.jpg/v1/fill/w_212,h_234,fp_0.50_0.50,q_90/c9a9e2_3f272b5e38214a369ad936d60fd5f611~mv2_d_1350_1500_s_2.webp?retry=1",
      width: 4,
      height: 3
    },
    {
      src: "https://static.wixstatic.com/media/c9a9e2_04ea92c95082422dae5c64d93abf2a75~mv2_d_1350_1500_s_2.jpg/v1/fill/w_212,h_234,fp_0.50_0.50,q_90/c9a9e2_04ea92c95082422dae5c64d93abf2a75~mv2_d_1350_1500_s_2.webp?retry=1",
      width: 3,
      height: 3
    },
    {
      src: "https://static.wixstatic.com/media/c9a9e2_e48e8fd7711c4a9c9c85bea75ac6d320~mv2_d_1350_1500_s_2.jpg/v1/fill/w_212,h_234,fp_0.50_0.50,q_90/c9a9e2_e48e8fd7711c4a9c9c85bea75ac6d320~mv2_d_1350_1500_s_2.webp?retry=1",
      width: 3,
      height: 3
    },
    {
      src: "https://static.wixstatic.com/media/c9a9e2_b9e2b22a127e4c67a069a60f7a590c49~mv2_d_1650_1500_s_2.jpg/v1/fill/w_258,h_234,fp_0.50_0.50,q_90/c9a9e2_b9e2b22a127e4c67a069a60f7a590c49~mv2_d_1650_1500_s_2.webp?retry=1",
      width: 3,
      height: 3
    }]

    return (
      <>
        <div className="gallery-page-container">
            <h1>Our Latest Work</h1>
          <div id="gallery" className="gallery-container">
            <Gallery photos={photos} />
          </div>
        </div>
      </>
    )
  }
}

export default GalleryPage
