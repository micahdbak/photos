import React from 'react';

import {
  Button,
  Dropdown,
  Flex,
  Icon,
  Navigation,
  helpers
} from 'mdb-react-components';

function App() {
  return (
    <Flex.Container
      flow='row nowrap'
      alignItems='stretch'
      style={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <Navigation.Sidebar>
        <h1 style={{ margin: '8px', fontSize: '14pt' }}>
          Analog Gallery
        </h1>
        <Button
          className='primary small'
          style={{ marginTop: 'auto' }}
          href='https://github.com/micahdbak/photos'
        >
          <Icon.Link />
          GitHub
        </Button>
      </Navigation.Sidebar>
      <Flex.Item flex='1 0' style={{ position: 'relative' }}>
        <p
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          Under construction; export more soon!
        </p>
      </Flex.Item>
    </Flex.Container>
  );
}

export default App;
