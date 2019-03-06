import React, { Component } from 'react';

export default class NoteForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.noteItem && this.props.noteItem.title || '',
      note: this.props.noteItem && this.props.noteItem.note || '',
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    if(this.props.noteItem) {
      this.props.onComplete({
        ...this.state,
        id: this.props.noteItem._id,
        editing: false
      })
    }
    else {
      this.props.onComplete(this.state);
      this.setState({...this.defaultState});
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <label>TITLE</label>
        <input required type='text' name='title' onChange={this.handleChange} value={this.state.title}/>

        <label>NOTE</label>
        <input required type='text' name='note' onChange={this.handleChange} value={this.state.note}/>

        <input className='submitButton' type='submit' value={this.props.buttonText}/>



      </form>
    );
  }
}