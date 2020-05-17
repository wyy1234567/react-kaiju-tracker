// React
import React from 'react'
// Components
import EditKaijuForm from './EditKaijuForm'
import * as requests from './requests'

class KaijuCard extends React.Component {
  state = {
    clickForm: false,
    // currKaiju: this.props.kaiju,
    currId: this.props.kaiju.id,
    newName: this.props.kaiju.name,
    newPower: this.props.kaiju.power,
    newImage: this.props.kaiju.image
  }

  showEditForm = () => {
    this.setState({ clickForm: !this.state.clickForm })
  }

  showButtons = () => {
    return (
      <div>
        <button className='kaiju-card-edit-button' onClick={this.showEditForm}>Nevermind</button>
        <button className='kaiju-card-delete-button' onClick={() => this.deleteKaiju(this.state.currId)}>Delete</button>
      </div>
    )
  }

  deleteKaiju = id => {
    requests.deleteKaiju(id)
    this.setState({
      currId: null
    })
  }

  submitKaiju = (event) => {
    event.preventDefault()
    //1.make a patch to data base
    //2.change state with new data
    //3.change this.clickForm to false
    let updatedObj = {
      id: this.state.currId,
      name: this.state.newName,
      power: this.state.newPower,
      image: this.state.newImage
    }
    console.log('After submit, new obj is: ', updatedObj)
    requests.patchKaiju(updatedObj)
      .then(res => this.setState({
        clickForm: false,
        currId: res.id,
        newName: res.name,
        newPower: res.power,
        newImage: res.image
      }))
  }

  changeKaiju = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // How can we show the edit form conditionally?
  render() {
    console.log('Inside Card, state is: ', this.state)
    if (this.state.currId) {
      return (
        <div className='kaiju-card'>

          <h2 className='kaiju-card-name'>{this.state.newName}</h2>
          <h3 className='kaiju-card-power'>Power: {this.state.newPower}</h3>

          <img className='kaiju-card-image' src={this.state.newImage} alt={"Maybe something should go here"} />
          {this.state.clickForm ? <EditKaijuForm allState={this.state} updateKaiju={this.submitKaiju} changInput={this.changeKaiju} /> : null}
          {/* What should this edit button do? */}
          {this.state.clickForm
            ? this.showButtons()
            : <button className='kaiju-card-edit-button' onClick={this.showEditForm}>Edit</button>
          }


        </div>
      )
    } else {
      return null
    }
  }
}

export default KaijuCard
