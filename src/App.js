import React, { Component } from 'react';
import { Container, Icon, Label, Message, Header, Segment, Button } from 'semantic-ui-react'
import './App.css';

let placeholders = [
  'I Love Startup Weekend',
  'Buy Ray\'s Pizza',
  'Echo.Cash is the Best'
];

class App extends Component {
  constructor() {
    super()
    this.state = {
      placeholder: '',
      isFetching: false,
      response: '',
      page: 'home',
      scream:''
    }
  } 
  componentWillMount(){
    let currentIndex = 0
    this.changeText.call(this, placeholders[currentIndex]);
    let intervalID = setInterval(()=>{
        ++currentIndex;
        if (currentIndex >= placeholders.length) {
            currentIndex = 0;
        }
        this.changeText.call(this, placeholders[currentIndex]);   // set new news item into the ticker
    }, 3500);
  }

  changeText(newText){
    let oldText = this.state.placeholder,
        length = this.state.placeholder.length,
        newLength = newText.length;
    let erase= (i)=>{ 
      setTimeout(()=>{this.setState({placeholder:oldText.substring(0, length - i - 1)})}, i*40)
    }
    let write= (i)=>{ 
      setTimeout(()=>{this.setState({placeholder:newText.substring(0, i)})}, (i*40+ length*40))
    }
    for(let i=0; i< length; i++){
      erase(i)
    }
    for(let i=0; i<= newLength; i++){
      write(i)
    }
    //for(let i in newLength){
    //  setTimeout(()=>{this.setState({placeholder:oldText.substring(0, length - i - 1)})}, 20)
    //}

  }
  changeScream(e){
    this.setState({
      scream: e.target.value
    })
  }

  submitForm(){

    let scream = this.state.scream;
    //insert Shervins Code
    alert(scream)

  }


  render() {
    let {placeholder, scream, page } = this.state;
    let content;

    let Home =(
      <div className="ui text container" >
        <h1 className="ui inverted header">
          I Want Someone To Scream...
        </h1>
        <input className="myBox" onChange={(e)=> this.changeScream(e)}placeholder={this.state.placeholder} value={this.state.scream}/>
        <br/>
        <div className="ui huge primary button myButton" onClick={(e)=>this.submitForm()}>Go <i className="right arrow icon"></i></div>
      </div>
    )

    let FAQ =(
      <div className="ui text container" >
        <h1 className="ui inverted header">
         FAQ
        </h1>
        <h2> What is Echo.cash? </h2>
        <p> Really Amazing</p>
      </div>
    )

    let About =(
      <div className="ui text container" >
        <h1 className="ui inverted header">
         About Us
        </h1>
        <p> 
          We are the coolest site. We Started at Startup Weekend Orange County
        </p>
      </div>
    )

    switch(page){
      case 'home':
        content = Home
        break;
      case 'faq':
        content = FAQ
        break;
      case 'about':
        content = About
        break;
    }
    return (
      <div className="App" style={{'background': 'url(http://cdn2.collective-evolution.com/assets/uploads/2016/08/yelling.jpg)', 'backgroundSize': 'cover', 'minHeight': '100vh' }}>
        <div className="App" style={{'background': 'linear-gradient(rgba(0,0,0,.5), rgba(0,100,0,.7))', 'backgroundSize': 'cover', 'minHeight': '100vh' }}>
          <div className="ui inverted vertical masthead center aligned segment" style={{ 'background': 'transparent'}}>
  
              <div className="ui container">
                <div className="ui large secondary inverted pointing menu">
                  <a className="toc item">
                    <i className="sidebar icon"></i>
                  </a>
                  <a onClick={ (e)=> this.setState({page:'home'}) } className={ page==='home' ? 'active item': 'item' }>Home</a>
                  <a onClick={ (e)=> this.setState({page:'faq'}) } className={ page==='faq' ? 'active item': 'item' }>FAQ</a>
                  <a onClick={ (e)=> this.setState({page:'about'}) } className={ page==='about' ? 'active item': 'item' }>About Us</a>
                  <div className="right item">
                    <a className="ui inverted button">Log in</a>
                    <a className="ui inverted button">Sign Up</a>
                  </div>
                </div>
              </div>
              {content}
  
          </div>
          {/*<Container text>
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
  
          </Container>*/}
        </div>
      </div>
    );
  }
}

export default App;
