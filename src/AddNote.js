import React from 'react'
import ApiContext from './ApiContext'
import config from './config'


class AddNote extends React.Component {
  state = {  }

  static contextType = ApiContext;

  generateFolderList = () => {
    const folderList = this.context.folders.map(item => {
      return <option key={item.id}>{item.name}</option>
    })
    return folderList
  }

  handleClickAddNote = (name, description, folder) => {
    let newItem = JSON.stringify({
      name: name,
      folderId: folder,
      content: description
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

  render() { 


    return (

      <form>
        <label htmlFor="add-folder">Add Folder</label>
        <select id="add-folder">{this.generateFolderList()}</select>
        <label htmlFor="note-name">Note Name</label>
        <input id="note-name"></input>
        <label htmlFor="add-description">Add Description</label>
        <textarea name="add-description" id="add-description" cols="30" rows="10"></textarea>
        <button type="button" onClick={()=> this.handleClickAddNote('Food3', 'this is a food item', 'b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1')}>Add Note</button>
      </form>

      );
  }
}
 
export default AddNote;