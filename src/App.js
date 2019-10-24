import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import RandomQuoteAPI from './RandomQuoteAPI'
import RandomQuoteLocal from './RandomQuoteLocal'
import ListAllQuotes from './ListAllQuotes'
import AddNewQuote from './AddNewQuote'
import EditQuote from './EditQuote'

function App(props){
    return(
        <BrowserRouter>
            <div align="center">
                <h2>{props.title}</h2>
  
                <Link to="/random-quote-api">Random Quote(API)</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/random-quote-local">Random Quote(Local)</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/list-all-quotes">List All Quotes(Local)</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/add-new-quote">Add New Quote</Link>
                
                <Route path="/random-quote-api" component={RandomQuoteAPI}/>
                <Route path="/random-quote-local" component={RandomQuoteLocal}/>
                <Route path="/list-all-quotes" component={ListAllQuotes}/>
                <Route path="/add-new-quote" component={AddNewQuote}/>
                <Route path="/edit-quote/:id" component={EditQuote}/>
                
               
            </div>
        </BrowserRouter>
    )
}

export default App