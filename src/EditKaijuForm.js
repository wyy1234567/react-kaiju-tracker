import React from 'react'

class EditKaijuForm extends React.Component {

  render() {
    return (
      <>
        <form className='kaiju-card-edit-form' onSubmit={this.props.updateKaiju}>

          <label>Name: </label>
          <input type='text' name='newName' value={this.props.allState.newName} onChange={(event) => this.props.changInput(event)}/>
          <br/>

          <label>Power: </label>
          <input type='text' name='newPower' value={this.props.allState.newPower} onChange={(event) => this.props.changInput(event)}/>
          <br/>

          <label>Image URL: </label>
          <input type='text' name='newImage' value={this.props.allState.newImage} onChange={(event) => this.props.changInput(event)}/>
          <br/>

          <input type="submit" value="Save Changes" />

        </form>
      </>
    )
  }
}

export default EditKaijuForm
