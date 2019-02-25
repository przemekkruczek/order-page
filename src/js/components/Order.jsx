import React from 'react';
import products from './mocks/products.json';

export class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name: products[0].name,
            idModel: 1,
            idColour: 1000,
            colour: 'Silver',
            priceModifier: products[0].price,
            capacity: 1100,
            idPhoto: 0,
            email: '',
            firstname: '',
            surname: '',
            street: '',
            houseNumber: '',
            city: '',
            postCode: '',
            paid: 'false',
            errors: [],
            errorstyle: {
                borderColor: '#CDCDCD',
            },
            errorstyle_text: {
                color: '#355990',
            },
            success: false,
        };
    };

    handleChangeModel = e => {
        const selectedIndex = e.target.options.selectedIndex;
        this.setState({
            name: e.target.value,
            idModel: parseInt(e.target.options[selectedIndex].getAttribute('data-key')),
        })
    };
    handleChangeColour = e => {
        this.setState({
            colour: e.target.value,
            idColour: parseInt(e.target.getAttribute('data-key')),
        })
    };
    handleChangeCapacity = e => {
        this.setState({
            capacity: parseInt(e.target.value),
        })
    };
    handleChangeEmail = e => {
        this.setState({
            email: e.target.value,
        })
    };
    handleChangeName = e => {
        this.setState({
            firstname: e.target.value,
        })
    };
    handleChangeSurname = e => {
        this.setState({
            surname: e.target.value,
        })
    };
    handleChangeStreet = e => {
        this.setState({
            street: e.target.value,
        })
    };
    handleChangehouseNumber = e => {
        this.setState({
            houseNumber: e.target.value,
        })
    };
    handleChangeCity = e => {
        this.setState({
            city: e.target.value,
        })
    };
    handleChangepostCode = e => {
        this.setState({
            postCode: e.target.value,
        })
    };
    handleChangePayment = e => {
        this.setState({
            paid: e.target.value,
        })
    };
    handleSubmit = e => {
        e.preventDefault();

        // *** validation form and adding errors:
        const { firstname, email, paid, surname, street, houseNumber, city, postCode } = this.state;
        function handleValidation(firstname, email, paid, surname, street, houseNumber, city, postCode) {
            const errors = [];
            if (firstname.length === 0 && paid === 'true') {
                errors[0] = ('Name cannot be empty');
            }
            if (surname.length === 0 && paid === 'true') {
                errors[1] = ('Surname cannot be empty');
            }
            if (street.length === 0 && paid === 'true') {
                errors[2] = ('Street cannot be empty');
            }
            if (houseNumber.length === 0 && paid === 'true') {
                errors[3] = ('House number cannot be empty');
            }
            if (city.length === 0 && paid === 'true') {
                errors[4] = ('City cannot be empty');
            }
            if (postCode.length === 0 && paid === 'true') {
                errors[5] = ('Post code cannot be empty');
            }
            if (email.length < 5) {
                errors[6] = ('Email should be at least 5 charcters long, contain a @ and at least one dot');
            }
            if (email.split('').filter(x => x === '@').length !== 1) {
                errors[6] = ('Email should be at least 5 charcters long, contain a @ and at least one dot');
            }
            if (email.indexOf('.') === -1) {
                errors[6] = ('Email should be at least 5 charcters long, contain a @ and at least one dot');
            }
            return errors;
        }
        const errors = handleValidation(firstname, email, paid, surname, street, houseNumber, city, postCode);
        const checkErrors = [...errors];

        if (errors.length > 0) {
            this.setState({
                errors,
                errorstyle: {
                    borderColor: '#FFB2B2',
                },
                errorstyle_text: {
                    color: '#FFB2B2'
                }
            });
            return;
        };

        if(checkErrors.length == 0) {
            this.setState({success: true});

            let price = products[this.state.idModel - 1].price + products[this.state.idModel - 1].options[0].values[this.state.idColour - 1000].priceModifier + products[this.state.idModel - 1].options[1].values[this.state.capacity - 1100].priceModifier;

            // *** object with proper data from form:
            const dataForm = {
                user:{
                    name: this.state.firstname,
                    surname: this.state.surname,
                    email: this.state.email,
                    address: {
                        street: this.state.street,
                        houseNumber: this.state.houseNumber,
                        city: this.state.city,
                        postcode: this.state.postCode,
                    }
                },
                product: {
                    id: this.state.idModel,
                    options: [
                        {
                            id: 100,
                            value: this.state.idColour,
                        },
                        {
                            id: 101,
                            value: this.state.capacity,
                        }
                    ],
                    amount: price
                }
            };
        console.log(dataForm);
        }
    }

    render() {
        let price = products[this.state.idModel - 1].price + products[this.state.idModel - 1].options[0].values[this.state.idColour - 1000].priceModifier + products[this.state.idModel - 1].options[1].values[this.state.capacity - 1100].priceModifier+'$';
        const { errors } = this.state;
        return(
            <div>
                <section className={this.state.success ? 'null' : 'product'}>
                    <div className='product__images'>
                        <div className='product__images-list'>
                            <ul className='product__images-listImages'>
                                {(products[this.state.idModel - 1].options[0].values[this.state.idColour - 1000].photos).map((element, i) => <li className='product__images-miniImage' key={i} data-key={i} onMouseEnter={this.handleChangePhoto}><img className='product__images-miniImage-container' src={element.photo}/></li>)}
                            </ul>
                        </div>
                        <div className='product__images-main'>
                            <img src={products[this.state.idModel - 1].options[0].values[this.state.idColour - 1000].photos[this.state.idPhoto].photo}></img>
                        </div>
                    </div>
                    <div className='product__info'>
                        <div className='product__info-title'>
                            <span className='product__info-name'>{this.state.name}</span>
                            <span className='product__info-divider'>|</span>
                            <span className='product__info-price'>{price}</span>
                        </div>
                        <div className='product__info-model'>
                            <label className='label-category' htmlFor='category'>Choose your model:</label>
                            <select className='select-category' value={this.state.name} onChange={this.handleChangeModel}>
                                {products.map((element) => <option className='select-option-model' key={element.id} data-key={element.id} value={element.name}>{element.name}</option>)}
                            </select>
                         </div>
                        <div className='product__info-modifer'>
                            <div className='product__info-capacity'>
                                <ul className='product__info-capacity-choose'>
                                    {(products[this.state.idModel - 1].options[1].values).map((element) => <label className='product__info-capacity-radio' key={element.id} data-key={element.id}>{element.name}<input type='radio' className='input-capacity' value={element.id} checked={this.state.capacity === element.id} onChange={this.handleChangeCapacity} /><span className='circle-capacity'></span></label>)}
                                </ul>
                            </div>
                            <div className='product__info-colour'>
                                <div className='product__info-colour-text'>COLOUR:<span className='product__info-colour-secondary'> {this.state.colour}</span></div>
                                <ul className='product__info-colour-choose'>
                                    {(products[this.state.idModel - 1].options[0].values).map((element) => <label className='product__info-colour-radio' key={element.id}><input type='radio' className='input-colour' data-key={element.id} value={element.name} checked={this.state.colour === element.name} onChange={this.handleChangeColour} /><span className='circle-colour' style={{backgroundColor: element.name}}></span></label>)}
                                </ul>
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form__content'>
                                <div className='form__content-email'>
                                    <label className='label-email' style={errors[6] !== 'Email should be at least 5 charcters long, contain a @ and at least one dot' ? {} : this.state.errorstyle_text} htmlFor='email'>EMAIL<span className='label-star'> *</span></label>
                                    <input type='text' id='email' className='input-email' style={errors[6] !== 'Email should be at least 5 charcters long, contain a @ and at least one dot' ? {} : this.state.errorstyle } value={this.state.email} onChange={this.handleChangeEmail} placeholder="Email" /> {errors[6] !== 'Email should be at least 5 charcters long, contain a @ and at least one dot' ? '' : <div className='errorTitle'><p>{errors[6]}</p></div>}
                                </div>
                                <div className='about__content-payment'>
                                    <label className='label-payment' htmlFor='payment'>PAYMENT</label>
                                    <label className='label-radio'>PayPal<input type='radio' id='payment' className='input-payment' value='false' checked={this.state.paid === 'false'} onChange={this.handleChangePayment}/><span className='circle'></span>
                                    </label>
                                    <label className='label-radio'>Standard payment<input type='radio' id='payment' className='input-payment' value='true' checked={this.state.paid === 'true'} onChange={this.handleChangePayment}/><span className='circle'></span>
                                    </label>
                                    {this.state.paid === 'true' ? <div>
                                        <label className='label-name' style={errors[0] !== 'Name cannot be empty' ? {} : this.state.errorstyle_text} htmlFor='name'>Name<span className='label-star'> *</span></label>
                                        <input type='text' id='name' className='input-name' style={errors[0] !== 'Name cannot be empty' ? {} : this.state.errorstyle } value={this.state.firstname} onChange={this.handleChangeName} placeholder="Name" /> {errors[0] !== 'Name cannot be empty' ? '' : <div className='errorTitle'><p>{errors[0]}</p></div>}

                                        <label className='label-surname' style={errors[1] !== 'Surname cannot be empty' ? {} : this.state.errorstyle_text} htmlFor='surname'>Surname<span className='label-star'> *</span></label>
                                        <input type='text' id='surname' className='input-surname' style={errors[1] !== 'Surname cannot be empty' ? {} : this.state.errorstyle } value={this.state.surname} onChange={this.handleChangeSurname} placeholder="Surname" /> {errors[1] !== 'Surname cannot be empty' ? '' : <div className='errorTitle'><p>{errors[1]}</p></div>}

                                        <label className='label-street' style={errors[2] !== 'Street cannot be empty' ? {} : this.state.errorstyle_text} htmlFor='street'>Street<span className='label-star'> *</span></label>
                                        <input type='text' id='street' className='input-street' style={errors[2] !== 'Street cannot be empty' ? {} : this.state.errorstyle } value={this.state.street} onChange={this.handleChangeStreet} placeholder="Street" /> {errors[2] !== 'Street cannot be empty' ? '' : <div className='errorTitle'><p>{errors[2]}</p></div>}

                                        <label className='label-houseNumber' style={errors[3] !== 'House number cannot be empty' ? {} : this.state.errorstyle_text} htmlFor='houseNumber'>House number<span className='label-star'> *</span></label>
                                        <input type='text' id='houseNumber' className='input-houseNumber' style={errors[3] !== 'House number cannot be empty' ? {} : this.state.errorstyle } value={this.state.houseNumber} onChange={this.handleChangehouseNumber} placeholder="House number" /> {errors[3] !== 'House number cannot be empty' ? '' : <div className='errorTitle'><p>{errors[3]}</p></div>}

                                        <label className='label-city' style={errors[4] !== 'City cannot be empty' ? {} : this.state.errorstyle_text} htmlFor='city'>City<span className='label-star'> *</span></label>
                                        <input type='text' id='city' className='input-city' style={errors[4] !== 'City cannot be empty' ? {} : this.state.errorstyle } value={this.state.city} onChange={this.handleChangeCity} placeholder="City" /> {errors[4] !== 'City cannot be empty' ? '' : <div className='errorTitle'><p>{errors[4]}</p></div>}

                                        <label className='label-postCode' style={errors[5] !== 'Post code cannot be empty' ? {} : this.state.errorstyle_text} htmlFor='postCode'>Post code<span className='label-star'> *</span></label>
                                        <input type='text' id='postCode' className='input-postCode' style={errors[5] !== 'Post code cannot be empty' ? {} : this.state.errorstyle } value={this.state.postCode} onChange={this.handleChangepostCode} placeholder="Post code" /> {errors[5] !== 'Post code cannot be empty' ? '' : <div className='errorTitle'><p>{errors[5]}</p></div>}
                                    </div> : ''}
                                 </div>
                            </div>
                            <input className="btn_box" type="submit" value="BUY PRODUCT" />
                        </form>
                    </div>
                </section>
                <div className={this.state.success ? 'success' : 'null'}>
                    <div className='success__container'>
                        <h2 className='success__container-header'>Success</h2>
                        <p className='success__container-message'>The product has been bought</p>
                    </div>
                </div>
            </div>
        )
    }
}