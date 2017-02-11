import React, { Component } from 'react';
import { Container, Icon, Label, Message, Header, Segment, Button } from 'semantic-ui-react'
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Container text>
            <div className="logoContainer">
              <Segment inverted circular color='yellow' className='logo'><Header as='h1'>ECHO</Header></Segment>
            </div>

            <div className="mainContent">
              <Segment padded='very' attached>
                <p>Text this number</p>
                  <a href="tel:+18058641118">
                  <Button basic size='massive' color='blue'>
                    <Icon name='phone' /> +1 (805) 864-1118
                  </Button>
                </a>
              </Segment>
              <Message warning attached='bottom'>
                <Icon name='warning' />
                Only for the brave
              </Message>
            </div>

        </Container>
      </div>
    );
  }
}

export default App;
