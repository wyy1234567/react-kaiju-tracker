//React
import React from 'react'
// Components
import KaijuCard from './KaijuCard'
import CreateKaijuForm from './CreateKaijuForm'
import TickerContainer from './TickerContainer'
//Fetch Requests
import * as requests from './requests'
// Read the README for how to fetch

class KaijuContainer extends React.Component {

  state = {
    kaijus: [],
    newName: null,
    newPower: null,
    newImage: null
  }

  componentDidMount() {
    requests.fetchKaijus()
    .then(kaijus => this.setState({ kaijus }))
  }

  addNewKaiju = (event) => {
    event.preventDefault();
    this.setState({
      newName: event.target.name.value,
      newPower: event.target.power.value,
      newImage: event.target.image.value
    })
    event.target.reset()
  }

  componentDidUpdate(preProps, preState) {
    if (preState.newName !== this.state.newName || preState.newPower !== this.state.newPower || preState.newImage !== this.state.newImage) {
      console.log('👹🦧🐼New kaiju found!')
      //TODO: 1. make a post to data base with new data grabbed from form 
      let newKaiju = {
        name: this.state.newName,
        power: this.state.newPower,
        image: this.state.newImage
      }
      requests.postKaiju(newKaiju)
      .then(res => this.setState({
        kaijus: [...this.state.kaijus, res]
      }))
    } else {
      console.log('🔫SAFE!!!')
    }
  }
  render() {
    // console.log('All kaijus: ', this.state.kaijus)
    console.log('State is: ', this.state)
    return (
      <>

        <CreateKaijuForm handleSubmit={this.addNewKaiju}/>

        <div id='kaiju-container'>

          {this.state.kaijus.map(kaiju => <KaijuCard kaiju={kaiju} key={kaiju.id}/>)}
          

        </div>


        {/* Just pass kaijus to TickerContainer and it'll create a news ticker at the bottom */}
        <TickerContainer kaijus={this.state.kaijus} />
        {/* You won't have to modify TickerContainer but it's a fun preview for some other react features */}

      </>
    )

  }
}

export default KaijuContainer
