import React, { Component } from 'react';
import { Container, Icon, Label, Message, Header, Segment, Button, Sidebar, Menu, Image, Modal } from 'semantic-ui-react'
import './App.css';
import StripeCheckout from 'react-stripe-checkout';


let placeholders = [
  //'I Love Startup Weekend',
  //'Five dollars is a steal',
  //'Echo.Cash is the Best'
  'Turtle',
  'Refrigerator',
  'Walrus',
  'Backstreet Boy',
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
  onToken(token){
    let message = this.state.scream;
    fetch('https://7wdf6kg40i.execute-api.us-east-1.amazonaws.com/dev/dares', {
      method: 'POST',
      body: JSON.stringify({token, message}),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data}`);
      });
    });
  }

  componentWillMount(){

    let currentIndex = Math.floor(Math.random() * placeholders.length)
    this.changeText.call(this, placeholders[currentIndex]);
    let intervalID = setInterval(()=>{
        ++currentIndex;
        if (currentIndex >= placeholders.length) {
            currentIndex = 0;
        }
        this.changeText.call(this, placeholders[currentIndex]);   // set new news item into the ticker
    }, 4000);
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
      setTimeout(()=>{this.setState({placeholder:oldText.substring(0, length - i - 1)})}, i*25)
    }
    let write= (i)=>{
      setTimeout(()=>{this.setState({placeholder:newText.substring(0, i)})}, (i*40+ length*25 + 300))
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
    fetch('https://7wdf6kg40i.execute-api.us-east-1.amazonaws.com/dev/dares', {
      method: 'POST',
      body: JSON.stringify({scream: scream}),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
    //insert Shervins Code

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
        <input className="myBox" onChange={(e)=> this.changeScream(e)} placeholder={ 'I fucked a ' + placeholder + '...' } value={scream} onKeyPress={this.handleKeyPress.bind(this)}/>
        <br/>
        <StripeCheckout
          token={(e)=>this.onToken(e)}
          name="Someone will Scream"
          description={`"${scream}"`}
          image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
          stripeKey="pk_test_nt3P9BYP9u27czpLf2IJZyGs"
          amount={500}
          panelLabel={`Submit Your Echo`}
          >
          <div className="ui huge primary button myButton">Go!</div>
        </StripeCheckout>
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
        <Sidebar as={Menu} animation='push' direction='top' visible={sidebarVisible} inverted>
          <Menu.Item name='home' onClick={ (e)=> {this.setState({page: 'home'}); window.location.hash='home'} } className={ page==='home' ? 'active item': 'item' }>
            Home
          </Menu.Item>
          <Menu.Item name='FAQ' onClick={ (e)=> {this.setState({page: 'faq'}); window.location.hash='faq'} } className={ page==='faq' ? 'active item': 'item' }>
            FAQ
          </Menu.Item>
          <Menu.Item name='About' onClick={ (e)=> {this.setState({page: 'about'}); window.location.hash='about'} } className={ page==='about' ? 'active item': 'item' }>
            About Us
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <div className="App" style={{'background': 'url(http://cdn2.collective-evolution.com/assets/uploads/2016/08/yelling.jpg)', 'backgroundSize': 'cover', 'minHeight': '100vh' }}>
            <div className="App" style={{'background': 'linear-gradient(to bottom right, rgba(  33, 185, 222,.95), rgba(169, 90, 230,.95))', 'backgroundSize': 'cover', 'minHeight': '100vh' }}>
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
