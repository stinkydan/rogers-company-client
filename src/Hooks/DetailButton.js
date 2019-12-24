import React, { useState, useEffect, useCallback } from 'react';

export default function detailButton({ userTitle, packageTitle, price, selectPackage, packageSelection }) {
  let [clicked, setClicked] = useState(false);

    useEffect(
      () => {
        let newSelection = packageSelection

        if (newSelection[0] !== packageTitle) {
          setClicked(false);
        } else if (newSelection[0] === packageTitle) {
          setClicked(true)
        }
      },
      [packageSelection, packageTitle]
    );

    const packageCallback = useCallback(
      () => {
        selectPackage([packageTitle, price])
      },
      [packageTitle, price]
    );

  function onSelect() {
    packageCallback()
  }

  return (
    <button
      onClick={onSelect}
      className={clicked ? 'selected' : ''}
    >
      {userTitle}: {price}
    </button>
  );
}
