import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Button,
  Dropdown,
  Flex,
  Icon
} from 'mdb-react-components';

import { PhotoGallery } from './components';

import './App.css';

function Anchor(props) {
  const { id } = props;

  return <div id={id} className='mdb-anchor'></div>;
}

function App() {
  const [years, setYears] = useState([]);

  const sidebarItemStyle = {
    justifyContent: 'flex-start'
  };

  function paths(root, numPhotos, ext) {
    const collection = [];

    for (let i = 1; i <= numPhotos; i++) {
      collection.push(`${root}/${i}.${ext}`);
    }

    return collection;
  }

  const photosDir = process.env.PUBLIC_URL + '/photos';
  const camerasDir = process.env.PUBLIC_URL + '/cameras';

  // on page load
  useEffect(() => {
    async function loadPhotos() {
      const photos = await axios.get(process.env.PUBLIC_URL + '/photos.json');
      setYears(photos.data);
    }

    loadPhotos();
  }, []);

  return (
    <Flex.Container
      flow='row nowrap'
      alignItems='stretch'
      style={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <Flex.Container
        flow='column nowrap'
        gap='4px'
        style={{
          borderRight: '1px solid var(--mdb-border-color)',
          padding: '8px',
          backgroundColor: 'var(--mdb-background-color-alt)'
        }}
      >
        <Button className='primary icon' href='/'>
          <Icon.Option style={{ transform: 'scale(-1, -1)' }} />
        </Button>
        <Flex.Item>
          <hr
            style={{
              marginTop: '4px',
              marginBottom: '4px',
              border: 'none',
              borderTop: '1px solid var(--mdb-border-color)'
            }}
          />
        </Flex.Item>
        <Button className='icon' href='/photos'>
          <Icon.Film />
        </Button>
        <Button className='icon' href='https://github.com/micahdbak'>
          <Icon.Link />
        </Button>
      </Flex.Container>
      <Flex.Container
        flow='column nowrap'
        gap='4px'
        style={{
          borderRight: '1px solid var(--mdb-border-color-alt)',
          padding: '8px'
        }}
      >
        <h1 style={{ margin: '8px', fontSize: '14pt' }}>
          Photo Gallery
        </h1>
        {years.map(year =>
          <Dropdown
            className='transparent small'
            style={sidebarItemStyle}
            icon='arrow'
            iconAlign='left'
            text={year.dir}
            isStaticDropdown={true}
            isDroppedDownInitially={true}
          >
            {year.dirs.map(collection =>
              <Button
                href={`#${year.dir}+${collection.dir}`}
                className='transparent small'
                style={sidebarItemStyle}
                depth={1}
              >
                {collection.title}
              </Button>
            )}
          </Dropdown>
        )}
      </Flex.Container>
      <Flex.Item
        flex='1 0'
        style={{
          overflowY: 'scroll',
          height: '100vh'
        }}
      >
        {years.map(year =>
          <section>
            <h1 className='mdb-sticky-header'>{year.dir}</h1>
            {year.dirs.map(collection =>
              <section
                style={{
                  padding: '16px 32px'
                }}
              >
                <Anchor id={`${year.dir}+${collection.dir}`} />
                <h2 className='mdb-collection-header'>
                  {collection.title}
                  <img src={`${camerasDir}/${collection.camera}.png`} />
                </h2>
                <PhotoGallery
                  photos={paths(
                    `${photosDir}/${year.dir}/${collection.dir}`,
                    collection.photos,
                    'png'
                  )}
                  thumbnails={paths(
                    `${photosDir}/${year.dir}/${collection.dir}`,
                    collection.photos,
                    'jpg'
                  )}
                  width='min(50vw, 600px)'
                />
              </section>
            )}
          </section>
        )}
      </Flex.Item>
    </Flex.Container>
  );
}

export default App;
