import React from 'react'
import ApiContext from './ApiContext'
import config from './config'


/*

let newDate = new Date()
        
        console.log(newDate.toISOString()) 

*/


class AddNote extends React.Component {
  state = { 
    name:'',
    folderId:'',
    content:'',
    modified:''


   }

  static contextType = ApiContext;

  generateFolderList = () => {
    const folderList = this.context.folders.map(item => {
      return <option key={item.id} value={item.id}>{item.name}</option>
    })
    return folderList
  }

  handleClickAddNote = (name, description, folder) => {
   let newDate = new Date().toISOString()
   console.log(newDate)
    let newItem = JSON.stringify({
      name: name,
      folderId: folder,
      content: description,
      modified: newDate
    })

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: newItem
    }).then(res => res.json())
    .then((note) => {
      this.context.addNoteToState(note)
      this.props.history.push(`/`)
    })
    
  }

  getName = (name) => {
    this.setState({
      name:name
    })

  }

  getFolder = (folder) => {
    this.setState({
      folderId: folder
    })

  }
  getContent = (content) => {
    this.setState({
      content: content
    })

  }




  render() { 
    

    return (

      <form>
        <label htmlFor="add-folder">Add Folder</label>
        <select id="add-folder"
        onChange={(e) => this.getFolder(e.target.value)}
        >{this.generateFolderList()}</select>
        <label htmlFor="note-name">Note Name</label>
        <input 
          id="note-name"
          onChange={(e) => this.getName(e.target.value)}
        >
        </input>
        <label htmlFor="add-description">Add Description</label>
        <textarea name="add-description" id="add-description" cols="30" rows="10"
        onChange={(e) => this.getContent(e.target.value)}
        ></textarea>
        <button type="button" onClick={()=> this.handleClickAddNote(this.state.name, this.state.content, this.state.folderId)}>Add Note</button>
      </form>

      );
  }
}
 
export default AddNote;