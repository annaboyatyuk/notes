import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notesGetAll } from '../../store/notes.js';

import NoteForm from './NoteForm.js';

class NoteItem extends Component {

  state = {
    editing: false,
  }

  handleDouble = id => {
    this.setState({ editing: true, id })
  }

  updateNote = note => {
    this.setState({
      editing: false
    });
    this.props.onComplete(note);
  }

  componentDidMount = () => {
    this.props.notesGetAll();
  }

  render() {
    return (
      <ul>
        {this.props.note.map(noteItem => (
          <li id={noteItem._id} key={noteItem._id}>

            <h2>{noteItem.title}</h2>

            <p onDoubleClick={() => this.handleDouble(noteItem._id)}>{noteItem.note} <span>(double click to edit)</span></p>

            <button onClick={() => this.props.deleteNote(noteItem)}>X</button>

            {this.state.id === noteItem._id ? <NoteForm buttonText='UPDATE' onComplete={this.updateNote} noteItem={noteItem}/> : null}

          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  note: state.notesState,
});

const mapDispatchToProps = dispatch => ({
  notesGetAll: () => dispatch(notesGetAll())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoteItem);