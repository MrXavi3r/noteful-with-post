import React from 'react'
import config from './config'
import ApiContext from './ApiContext'
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
  
  constructor(props) {
    super(props);
    this.state ={
      name:''
    }
  }





  static contextType = ApiContext
  

  handleClickAddFolder = (name) => {
    let newItem = JSON.stringify({
      name: name,
    })
    let error;

    if(name.length >= 3 && typeof name === typeof ''){
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: newItem
    }).then(res => {
      if (!res.ok){
        error = { code: res.status };
      }
      return res.json();
    })
    .then(folder => {
      if (error) {
        error.message = folder.message;
        return Promise.reject(error);
      }
      this.context.addFolder(folder)
      this.props.history.push(`/`)
    })
    .catch(error => {
      console.error({error});
    });
  } else {
    alert('please use more than 3 characters for name')
  }
    
  }
  getValue = (val) => {
    this.setState({
      name:val
    })
  }



  render() {
    //console.log(this.handleClickAddFolder('hi'))
    console.log(this.state.name)
    return (
      <div>

        <form>
          <label
            htmlFor='new-folder'
          >New Folder Name:</label>
          <input
            id='new-Folder'
            defaultValue='Hello'
            onChange={(e) => this.getValue(e.target.value)}
          >

          </input>
          <button
            className='Add Folder'
            type='button'
            onClick={(e) => this.handleClickAddFolder(`${this.state.name}`)}
          >
            Add New Folder!
      </button>
        </form>

      </div>
    )
  }


}


AddFolder.propTypes = {
  name: PropTypes.string.isRequired
  // (props => {
  //   const nameVal = props;
  //   if(typeof prop != 'string') {
  //     return new Error(`${nameVal} is required to be a string`);
  //   } else if(nameVal.length < 3) {
  //   return new Error(`${nameVal} is required to be more than 3 characters`);
  // }
  // }),



}


export default AddFolder