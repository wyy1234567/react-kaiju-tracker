import React from 'react'

class CreateKaijuForm extends React.Component {

  render() {
    return (
      <form id='create-kaiju-form' onSubmit={(event) => this.props.handleSubmit(event)}>

        <label>Name: </label>
        <input type='text' name='name' placeholder="add your name here.." />

        <label>Power: </label>
        <input type='text' name='power' placeholder="add your power here..." />

        <label>Image: </label>
        <input type='text' name='image' placeholder="add your image url here..." />

        <br/>

        <input type='submit' value='List Kaiju' />

      </form>
    )
  }
}

export default CreateKaijuForm
