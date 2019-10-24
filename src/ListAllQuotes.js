import React from 'react'
import {Link} from 'react-router-dom'

class ListAllQuotes extends React.Component{
    constructor(){
        super()
        this.state={
            quoteList:[]
        }
    }
    componentDidMount(){
        console.log('component did mount')
        if(localStorage.getItem('quotes')){
            const quoteList = JSON.parse(localStorage.getItem('quotes'))
            if(quoteList.length>0){
                this.setState({quoteList},()=>{console.log('present')})
            }
            else{
                const quoteList=[]
                this.setState({quoteList},()=>{
                console.log('present empty list')
                })
            }
            
        }
        else{
            const quoteList=[]
            this.setState({quoteList},()=>{
                console.log('not present')
            })
            
        }
    }
    handleRemove(id){
        console.log('handle remove')
        this.setState(prevState => ({
            quoteList: prevState.quoteList.filter(quote => quote.id !== id)
        }),()=>{localStorage.setItem('quotes', JSON.stringify(this.state.quoteList))
            console.log('local storage updated')
        })
    }
    render(){
        console.log('rendered', this.state.quoteList)
        if(this.state.quoteList.length==0){
            return(
            
                <div>
                    <ul>
                        <li style={{ listStyleType: "none" }} key={1}>{"No Saved Quotes"}</li>
                        
                    </ul>
                </div>
            )

        }
        else{
            return(
                
                <div>
                    <ul>
                        {this.state.quoteList.map((quote,index)=> {
                            return <li style={{ listStyleType: "none" }} key={index+1}>{quote.quote}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link to={`/edit-quote/${quote.id}`}>
                                            <button>Edit</button>
                                        </Link>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button onClick={()=>
                                            {
                                                console.log('event handler')
                                                this.handleRemove(quote.id)
                                
                                        }}>Remove</button>
                                        <br/>{quote.author}
                                    </li>
                        })}
                        {/* <li style={{ listStyleType: "none" }}>
                        </li> */}
                    </ul>
                </div>
            )
        }
        
    }
}

export default ListAllQuotes