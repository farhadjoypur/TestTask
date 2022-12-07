import React, { useState } from 'react';
import style from './FirstForm.module.css'
import Multiselect from 'multiselect-react-dropdown';


const FirstForm = ({option}) => {
    const [ name, setName] = useState('');
    const [ checked, setChecked] = useState(false);
    const [ optionValue, setOptionValue] = useState([]);
    const [ id, setId] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(optionValue.length === 0){
          return alert('Fill the Sectors Value.')
        } else{
        fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, checked, optionValue}),
        })
          .then(res => res.json())
          .then(data => {
            if(data.message){
            console.log(data.retsult);          
            setChecked(data.retsult.checked)
            setOptionValue(data.retsult.optionValue)
            setName(data.retsult.name)
            setId(data.retsult._id)
            }
          })}

    }
    const handleUpdate = () => {     
      fetch(`http://localhost:5000/api/user/${id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name, checked, optionValue})
      })
      .then(res => res.json())
      .then(result => {
          if(result.message){
          alert('You update Successfully.')
          alert("Update Successful.")
            console.log(result);
          }  
      });
      }
  return (
    <div className={`${style.custom_container} container`}>
           <h1 className='main_title'>Please enter your name and <br /> pick the Sectors you are currently involved in.</h1>
        <form className={style.from_box} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        placeholder='Name'
                        className={style.text_input}
                        id='name'
                        name="name" 
                        value={name} 
                        required={true}
                        onChange={(e) => setName(e.target.value)}
                    />
            </div>


            <div>
                <label htmlFor="many_select">Sectors</label>
                <Multiselect
                isObject={false}
                options={option}
                required={true}
                avoidHighlightFirstOption={true}
                onRemove={(e)=>{setOptionValue(e)}}
                onSelect={(e)=>{setOptionValue(e)}}
                selectedValues={optionValue}
                showArrow
                 />
            </div>


            <div className={style.check_box}>
                <label htmlFor="checkbox">Agree to terms</label>
                    <input 
                        className={style.check_box_check}
                        type="checkbox" 
                        id='checkbox'
                        name="checkbox" 
                        value={checked} 
                        required={true}
                        onChange={(e) => setChecked(e.target.checked)}
                    />
            </div>
            {id ? <button className={style.submit_btn} type="submit">Update</button>
            :<button className={style.submit_btn} onClick={() => handleUpdate}>Save</button>}
        </form>
    </div>
  )
}

export default FirstForm