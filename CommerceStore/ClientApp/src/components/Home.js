import React, { Component } from 'react';
import './Home.css';
export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h4>Project Introduction : StoreHub</h4>
        <h5>
          <u>ASP.NET core web application + React.js Project</u>
        </h5>
        <p className='writing'>Backend</p>
        <ul>
          <li>.NET Core 3.1 based</li>
          <li>Web API Project</li>
          <li>Development process</li>
          <li className='li-indent'>
            Modelling: customer, product, store and sale
          </li>
          <li className='li-indent'>
            Migration to DB (with add-migration, update-database commands)
          </li>
          <li className='li-indent'>
            DB Context creation and required tables additon to DBset in DB
            Context file
          </li>
          <li className='li-indent'>
            Dependency injection of DB Context to the project service
            configuration
          </li>
          <li className='li-indent'>
            Controllers implemetation with 4 models(customer, product, store and
            sale)
          </li>
          <li>DB Schema</li>
          <img src='/dbschema.png' alt='' />
          <li>Note</li>
          <li className='li-indent'>
            All data is provided by descending order of creation date.
          </li>
          <li className='li-indent'>
            In terms of sales data, in order to provide related customer,
            product and store data (ultimately to display those values in select
            boxes), DTO is utilized. By using include(), select() EF methods,
            only required fieles are included in the DTO class.
          </li>
        </ul>

        <p className='writing'>Frontend</p>
        <ul>
          <li>React based</li>
          <li>state managment</li>
          <li className='li-indent'>
            useState() is utilized instead of Redux, because state data types in
            the project are not complex.
          </li>
          <li className='li-indent'>
            Main pages(customers, products, stores, and sales) fetch data during
            the initial update and manage the data as states.
          </li>
          <li className='li-indent'>
            Main pages pass state data and data manipulation methods as
            properties to dialog classes for CRUD
          </li>
          <li className='li-indent'>
            CRUD dialogs call web APIs for CRUD and updates states with a method
            recieved from main pages if the result is OK.
          </li>
        </ul>

        <p className='writing'>CSS</p>
        <ul>
          <li>
            To implement responsive, different styling is applied with Media
            queries, and used ‘rem’ units over ‘pixel’
          </li>
        </ul>

        <br />
        <hr />
        <div>Design and source was made by Jason Jinyoung KIM</div>
        <div>
          Github url:{' '}
          <a href='https://github.com/kimgyver/CommerceStore'>
            https://github.com/kimgyver/CommerceStore
          </a>
        </div>
        <br />
        <br />
      </div>
    );
  }
}
