import React, { Component } from 'react';
import { connect } from 'react-redux';

import NoteForm from './notes/NoteForm.js';
import NoteItem from './notes/NoteItem.js';

import {noteCreate, noteUpdate, noteDelete} from '../store/notes.js';

class Dashboard extends Component {

  render() {
    return (
      <React.Fragment>

        <h1>hello</h1>
        <h3>add some notes</h3>

        <NoteForm onComplete={this.props.noteCreate} buttonText='SUBMIT'/>

        <NoteItem onComplete={this.props.noteUpdate} deleteNote={this.props.noteDelete}/>
      
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  note: state.notesState,
});

const mapDispatchToProps = dispatch => ({
  noteCreate: note => dispatch(noteCreate(note)),
  noteUpdate: note => dispatch(noteUpdate(note)),
  noteDelete: note => dispatch(noteDelete(note)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);