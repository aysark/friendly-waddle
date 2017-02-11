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
    this.setState({placeholder: placeholders[currentIndex]});
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

  toggleSidebarVisibility() {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    });
  }

  render() {
    const visible = this.state.sidebarVisible;

    return (

      <Sidebar.Pushable >
      <Sidebar as={Menu} animation='push' direction='top' visible={visible} inverted>
        <Menu.Item name='home'>
          <a href="http://localhost:3000/">Home</a>
        </Menu.Item>
        <Menu.Item name='FAQ'>
          FAQ
        </Menu.Item>
        <Menu.Item name='About'>
          About
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher>
        <div className="App" style={{'background': 'linear-gradient(rgba(0, 40, 0, .6), rgba(0, 0, 0, .3)), url(http://cdn2.collective-evolution.com/assets/uploads/2016/08/yelling.jpg)', 'backgroundSize': 'cover', 'minHeight': '100%' }}>
          <div className="ui inverted vertical masthead center aligned segment" style={{'background': 'linear-gradient(rgba(0, 40, 0, .6), rgba(0, 0, 0, .3)), url(http://cdn2.collective-evolution.com/assets/uploads/2016/08/yelling.jpg)', 'backgroundSize': 'cover'}}>

              <div className="ui container">
                <div className="ui large secondary inverted pointing menu">
                  <a className="toc item" onClick={this.toggleSidebarVisibility}>
                    <i className="sidebar icon"></i>
                  </a>
                </div>
              </div>

              <div className="ui text container">
                <h1 className="ui inverted header">
                  I Want Someone To Scream...
                </h1>
                <input className="myBox" onChange={(e)=> this.changeScream(e)}placeholder={this.state.placeholder} value={this.state.scream}/>
                <br/>
                <div className="ui huge primary button myButton" onClick={(e)=>this.submitForm()}>Go <i className="right arrow icon"></i></div>
              </div>
            </div>
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>

    );
  }
}

export default App;
