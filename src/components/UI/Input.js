import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input} /> {/* The ...props.input will add all props from the input object as a key value pair. This includes "id={props.input.id}" which will be used as a reference for the htmlFor property in the label */}
    </div>
  )
}

export default Input;