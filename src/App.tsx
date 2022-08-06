import React, { useEffect, useState } from 'react';
import './App.css';
import { mattMap } from './mattMap';
import { Container, Row, Col, Input, Label, Button } from 'reactstrap';
import { sify } from 'chinese-conv';

function App() {
  const [text, setText] = useState<string>('');
  const [mattConvert, setMattConvert] = useState<boolean>(true);
  const [simpConvert, setSimpConvert] = useState<boolean>(false);

  const handleMatt = (inputValue: string) => {
    let newText = inputValue;
    if (mattConvert) {
      for (const [key, value] of Object.entries(mattMap)) {
        newText = newText.replace(key, value);
      }
    }
    if (simpConvert) {
      newText = sify(newText);
    }
    setText(newText);
  };

  useEffect(() => {
    const inputElement = document.getElementById('input') as HTMLInputElement;
    handleMatt(inputElement.value);
  }, [mattConvert, simpConvert]);

  return (
    <>
      <Container className='d-flex align-items-center mt-5'>
        <img
          src='/images/profilepic.jpg'
          alt='matt gor'
          className='border border-dark rounded-circle pe-none'
          style={{ width: '100px' }}
        />
        <div className='d-flex flex-column ms-3'>
          <h1>Matt Leung轉換器</h1>
          <span className='text-muted'>R.A.P. 🙏🏻</span>
        </div>
      </Container>
      <Container className='config mt-3 d-flex justify-content-between'>
        <div>
          <div className='d-flex align-items-center'>
            <Label htmlFor='matt-convert' className='me-3'>
              錯別字
            </Label>
            <Label htmlFor='matt-convert' className='switch'>
              <Input
                id='matt-convert'
                type='checkbox'
                checked={mattConvert}
                onChange={(e) => setMattConvert(!mattConvert)}
              />
              <span className='slider round'></span>
            </Label>
          </div>
          <div className='d-flex align-items-center'>
            <Label htmlFor='simp-convert' className='me-3'>
              殘體字
            </Label>
            <Label htmlFor='simp-convert' className='switch'>
              <Input
                id='simp-convert'
                type='checkbox'
                checked={simpConvert}
                onChange={() => setSimpConvert(!simpConvert)}
              />
              <span className='slider round'></span>
            </Label>
          </div>
        </div>
        <Button color='primary' onClick={() => navigator.clipboard.writeText(text)}>Copy text</Button>
      </Container>
      <Container>
        <Row>
          <Col className='mt-3' xs={12} md={6}>
            <Input
              id='input'
              type='textarea'
              style={{ height: '18em' }}
              onChange={(e) => handleMatt(e.target.value)}
            />
          </Col>
          <Col className='mt-3' xs={12} md={6}>
            <Input
              id='output'
              type='textarea'
              style={{ height: '18em' }}
              readOnly
              value={text}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
