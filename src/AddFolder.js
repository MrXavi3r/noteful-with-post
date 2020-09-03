import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import config from './config'
import ApiContext from './ApiContext'

class AddFolder extends React.Component {
  
  constructor(props) {
    super(props);
    this.getValue = this.getValue.bind(this);
  }





  static contextType = ApiContext
  

  handleClickAddFolder = (name) => {
    //name.preventDefault()
    let newId = uuidv4()
    let newItem = JSON.stringify({
      name: name,
      id: newId,
    })

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: newItem
    }).then(res => res.json())
    .then(() => {
      this.context.addFolder(name)
      this.props.history.push(`/`)
    })
    
  }
  getValue = (val) => {
    this.context.addFolderName(val)
  }



  render() {
    //console.log(this.handleClickAddFolder('hi'))
    return (
      <div>

        <form>
          <label
            htmlFor='new-folder'
          >New Folder Name:</label>
          <input
            id='new-Folder'
            onChange={(e) => this.getValue(e.currentTarget)}
          >

          </input>
          <button
            className='Add Folder'
            type='button'
            onClick={(e) => this.handleClickAddFolder(this.props.newFolder)}
          >
            Add New Folder!
      </button>
        </form>

      </div>
    )
  }


}
//uuidv4()

export default AddFolder