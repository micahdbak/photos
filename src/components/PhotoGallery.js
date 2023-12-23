import React, { useState } from 'react';

import { Button, Flex, Icon, helpers } from 'mdb-react-components';

import './PhotoGallery.css';

export function PhotoGallery(props) {
  const { photos, thumbnails, maxWidth, maxHeight } = props;

  const [selected, setSelected] = useState(0);
  const [expand, setExpand] = useState(false);

  const controls = (
    <Flex.Container flow='row nowrap' alignItems='center' gap='8px'>
      {/* decrement selection */}
      <Button
        className='small transparent icon'
        style={{ padding: '6px' }}
        onClick={() => {
          setSelected(selected > 1 ? selected - 1 : selected);
        }}
      >
        <Icon.Arrow style={{ transform: 'rotate(90deg)' }} />
      </Button>
      {/* current selection */}
      <p style={{ margin: '0 8px', fontSize: '10pt' }}>
        {selected} / {photos.length}
      </p>
      {/* increment selection */}
      <Button
        className='small transparent icon'
        style={{ padding: '6px' }}
        onClick={() => {
          setSelected(selected < photos.length ? selected + 1 : selected);
        }}
      >
        <Icon.Arrow style={{ transform: 'rotate(-90deg)' }} />
      </Button>
      {/* close selection */}
      <Button
        className='small transparent icon'
        style={{ padding: '6px' }}
        onClick={() => {
          setSelected(0);
          setExpand(false);
        }}
      >
        <Icon.Cross />
      </Button>
      {/* toggle expand */}
      <Button
        className='small transparent icon'
        style={{ padding: '6px' }}
        onClick={() => setExpand(!expand)}
      >
        {expand ? (
          <Icon.Shrink />
        ) : (
          <Icon.Expand />
        )}
      </Button>
    </Flex.Container>
  );

  return (
    <Flex.Container flow='column nowrap' alignItems='flex-start' gap='2px'>
      {selected && selected <= photos.length ? (
        <Flex.Container
          flow='column nowrap'
          justifyContent='center'
          alignItems='center'
          gap={expand ? '8px' : '2px'}
          className={expand ? 'mdb-photo-gallery-flex-expand' : undefined}
        >
          <Flex.Item style={{ overflow: 'hidden' }}>
            {expand ? (
              <a href={photos[selected - 1]}>
                <img
                  src={photos[selected - 1]}
                  alt={`${selected}`}
                  className='mdb-photo-gallery-img'
                  style={{
                    maxWidth: expand ? '100%' : maxWidth,
                    maxHeight: expand ? '100%' : maxHeight,
                    backgroundImage: `url(${thumbnails[selected - 1]})`
                  }}
                />
              </a>
            ) : (
              <img
                src={photos[selected - 1]}
                alt={`${selected}`}
                className='mdb-photo-gallery-img'
                style={{
                  maxWidth: expand ? '100%' : maxWidth,
                  maxHeight: expand ? '100%' : maxHeight,
                  backgroundImage: `url(${thumbnails[selected - 1]})`
                }}
                onClick={() => {
                  setExpand(true);
                }}
              />
            )}
          </Flex.Item>
          {controls}
        </Flex.Container>
      ) : (
        <p className='mdb-photo-gallery-prompt'>
          Click on a photo to view it.
        </p>
      )}
      <Flex.Container flow='row wrap' alignItems='center' gap='4px'>
        {thumbnails.map((thumbnail, index) =>
          <img
            src={thumbnail}
            alt={`${index + 1} (Thumbnail)`}
            onClick={() => setSelected(index + 1)}
            className={helpers.classList([
              'mdb-photo-gallery-thumbnail',
              selected === index + 1 ? 'selected' : ''
            ])}
          />
        )}
      </Flex.Container>
    </Flex.Container>
  );
}
