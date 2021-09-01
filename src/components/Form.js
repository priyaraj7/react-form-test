import React, { useState } from "react";

const Form = (props) => {

    //create a state for the values that you need in the form (I create an object with those values)
    const [valuesForm, setValuesForm] = useState({
        userName: "",
        userEmail: "",
        userAge: "",
    });

    //create a state for managing the errors form the UI
    const [error, setError] = useState({
        errorUserName:"",
        errorUserEmail: "",
        errorUserAge: ""
    });

    //create functions that handle the event of the user typing into the form 
    const handleInputEmailChange = (event) => {
        const userEmail = event.target.value;
        setValuesForm(valuesForm => ({...valuesForm, userEmail}));
        if(userEmail === ""){
            let errorUserEmail = "This field is required.";
            setError(error =>({...error, errorUserEmail}));
        } 
    }

    const handleInputNameChange = (event) => {
        const userName = event.target.value;
        setValuesForm(valuesForm => ({...valuesForm, userName}));
        if(userName === ""){
            let errorUserName = "This field is required.";
            setError(error =>({...error, errorUserName}));
        } 
    }

    const handleInputAgeChange = (event) => {
        const userAge = event.target.value;
        let numUserAge = parseInt(event.target.value);
        if(numUserAge >= 18 && numUserAge <= 99){
            setValuesForm(valuesForm => ({...valuesForm, userAge}))
        } else{
            let errorUserAge = "Range Error"
            setError(error =>({...error, errorUserAge}));
        }
    }

    //create a function to handle the submit of the form to the parent component 
    const onSubmit = (event) => {
        event.preventDefault();
        if(valuesForm.userEmail === ""){
            let errorUserEmail = "This field is required.";
            setError(error =>({...error, errorUserEmail}));
        }
        
        if(valuesForm.userName === ""){
            let errorUserName = "This field is required.";
            setError(error =>({...error, errorUserName}));
        }

        if(valuesForm.userAge === "Range Error" || valuesForm.userAge === ""){
            let errorUserAge = "This field is required. And you should be between 18 and 99 years old";
            setError(error =>({...error, errorUserAge}));
        } else{
            props.onSubmit(valuesForm);
        }
        

    };

    return (
        <form onSubmit={onSubmit}>
            <label>Email</label>
            <input
                name="email"
                type="email"
                required
                placeholder="Email"
                value={valuesForm.userEmail}
                onChange={handleInputEmailChange}
            />
            {error.errorUserEmail !== "" ? <p className="error-message">This field is required</p> : null}

            <label>Name</label>
            <input
                name="name"
                type="text"
                placeholder="Name"
                required
                value={valuesForm.userName}
                onChange={handleInputNameChange}
            />
            {error.errorUserName !== "" ? <p className="error-message">This field is required</p> : null}
            
            <label>Age</label>
            <input
                name="age"
                type="number"
                required
                placeholder="Age"
                value={valuesForm.userAge}
                onChange={handleInputAgeChange}
            />
            {error.errorUserAge === "This field is required. And you should be between 18 and 99 years old" ? <p className="error-message">You should be between 18 and 99 years old to register in our form.</p> : null}
            

            <input type="submit"
                style={{ marginTop: '40px' }}
            />

        </form>
    );
}

export default Form;