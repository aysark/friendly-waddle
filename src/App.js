import React, { Component } from 'react';
import { Container, Icon, Label, Message, Header, Segment, Button, Sidebar, Menu, Image } from 'semantic-ui-react'
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
      scream:'',
      sidebarVisible: false
    }

    this.toggleSidebarVisibility = this.toggleSidebarVisibility.bind(this);
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

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.submitForm()
    }
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

  toggleSidebarVisibility() {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    });
  }

  render() {
    let {placeholder, scream, sidebarVisible } = this.state;
    let content;
    let page = window.location.hash ? window.location.hash.substring(1): 'home'

    let Home =(
      <div className="ui text container" >
        <h1 className="ui inverted header">
          I Want Someone To Scream...
        </h1>
        <input className="myBox" onChange={(e)=> this.changeScream(e)}placeholder={placeholder} value={scream} onKeyPress={this.handleKeyPress.bind(this)}/>
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
      case 'faq':
        content = FAQ
        break;
      case 'about':
        content = About
        break;
      default:
        content = Home
        break;
    }

    return (
      <Sidebar.Pushable >
      <Sidebar as={Menu} animation='push' direction='top' visible={sidebarVisible} inverted size='large'>
        <Menu.Item name='home' onClick={ (e)=> {this.setState({page:'home'}); window.location.hash='home'} } className={ page==='home' ? 'active item': 'item' }>
          Home
        </Menu.Item>
        <Menu.Item name='FAQ' onClick={ (e)=> {this.setState({page: 'faq'}); window.location.hash='faq'} } className={ page==='faq' ? 'active item': 'item' }>
          FAQ
        </Menu.Item>
        <Menu.Item name='About' onClick={ (e)=> {this.setState({page: 'about'}); window.location.hash='about'} } className={ page==='about' ? 'active item': 'item' }>
          About Us
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='signup'>
           Sign Up
         </Menu.Item>
        </Menu.Menu>
      </Sidebar>
      <Sidebar.Pusher>
      <div className="App" style={{'background': 'url(http://cdn2.collective-evolution.com/assets/uploads/2016/08/yelling.jpg)', 'backgroundSize': 'cover', 'minHeight': '100vh' }}>
        <div className="App" style={{'background': 'linear-gradient(rgba(0,0,0,.5), rgba(0,100,0,.7))', 'backgroundSize': 'cover', 'minHeight': '100vh' }}>
          <div className="ui inverted vertical masthead center aligned segment" style={{ 'background': 'transparent'}}>

              <div className="ui container">
                <Button floated='left' basic inverted color='white' icon='sidebar' onClick={this.toggleSidebarVisibility} />
              </div>
              {content}

          </div>
        </div>
      </div>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
    );
  }
}

export default App;
