import React, { useState } from 'react';

import { Button, Flex, Icon, helpers } from 'mdb-react-components';

import './PhotoGallery.css';

export function PhotoGallery(props) {
  const { photos, thumbnails, width, children } = props;

  const [selected, setSelected] = useState(0);

  const buttonControlStyle = {
    padding: '6px'
  };

  function decrement() {
    setSelected(selected > 1 ? selected - 1 : selected);
  }

  function increment() {
    setSelected(selected < photos.length ? selected + 1 : selected);
  }

  function close() {
    setSelected(0);
  }

  return (
    <Flex.Container
      flow='column wrap'
      alignItems='center'
      gap='2px'
      style={{ width }}
    >
      {children}
      {selected && selected <= photos.length ? (
        <>
          <a href={photos[selected - 1]}>
            <img
              src={photos[selected - 1]}
              alt={`${selected}`}
              className='mdb-photo-gallery-photo'
              style={{
                maxWidth: width,
                maxHeight: width,
                backgroundImage: `url(${thumbnails[selected - 1]})`,
              }}
            />
          </a>
          <Flex.Container flow='row nowrap' alignItems='center' gap='8px'>
            <Button
              className='small transparent icon'
              style={buttonControlStyle}
              onClick={decrement}
            >
              <Icon.Arrow style={{ transform: 'rotate(90deg)' }} />
            </Button>
            <p className='mdb-photo-gallery-control'>
              {selected} / {photos.length}
            </p>
            <Button
              className='small transparent icon'
              style={buttonControlStyle}
              onClick={increment}
            >
              <Icon.Arrow style={{ transform: 'rotate(-90deg)' }} />
            </Button>
            <Button
              className='small transparent icon'
              style={buttonControlStyle}
              onClick={close}
            >
              <Icon.Cross />
            </Button>
          </Flex.Container>
        </>
      ) : (
        <p className='mdb-photo-gallery-prompt'>
          Click on a photo to view it.
        </p>
      )}
      <Flex.Container flow='row wrap' alignItems='center' gap='4px'>
        {
          thumbnails.map((thumbnail, index) => {
            return (
              <img
                src={thumbnail}
                alt={`${index + 1} (Thumbnail)`}
                onClick={() => setSelected(index + 1)}
                className={helpers.classList([
                  'mdb-photo-gallery-thumbnail',
                  selected === index + 1 ? 'selected' : ''
                ])}
              />
            );
          })
        }
      </Flex.Container>
    </Flex.Container>
  );
}
