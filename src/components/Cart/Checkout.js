const Checkout = (props) => {
    return (
        <form>
            <div>
                <label htmlFor="name">Your Name</label>
                <input id="name" type="text" />
            </div>
            <div>
                <label htmlFor="street">Street</label>
                <input id="street" type="text" />
            </div>
            <div>
                <label htmlFor="postal">Postal Code</label>
                <input id="postal" type="text" />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input id="city" type="text" />
            </div>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button>Confirm</button>
        </form>
    )    
};

export default Checkout;