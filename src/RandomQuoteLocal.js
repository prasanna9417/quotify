import React from 'react'
import Btn from './Btn'

class RandomQuoteLocal extends React.Component{
    constructor(){
        super()
        this.state={
            quote:{},
    
        }
    }
    componentDidMount(){
        console.log('component did mount')
        if(localStorage.getItem('quotes')){
            const quoteList = JSON.parse(localStorage.getItem('quotes'))
            if(quoteList.length>0){
                const min=0
                const max=quoteList.length-1
                const randomIndex=Math.floor(Math.random() * (max - min + 1)) + min
                //console.log(quoteList[randomIndex])
                const quote=quoteList[randomIndex]
                this.setState({quote},()=>{
                    console.log('present')
                })
            }
            else{
                const quote={quote:'No Saved Quotes',author:''}
                this.setState({quote},()=>{
                console.log('present empty list')
                })
            }
    
        }
        else{
            const quote={quote:'No saved Quotes',author:''}
            this.setState({quote},()=>{
                console.log('not present')
            })
            
        }
    }
    quoteHandle=()=>{
        console.log('get another quote clicked')
        if(localStorage.getItem('quotes')){
            const quoteList = JSON.parse(localStorage.getItem('quotes'))
            if(quoteList.length>0){
                const min=0
                const max=quoteList.length-1
                const randomIndex=Math.floor(Math.random() * (max - min + 1)) + min
                //console.log(quoteList[randomIndex])
                const quote=quoteList[randomIndex]
                this.setState({quote},()=>{
                    console.log('present')
                })
            }
            else{
                const quote={quote:'No Saved Quotes',author:''}
                this.setState({quote},()=>{
                console.log('present empty list')
                })
            }
    
        }
        else{
            const quote={quote:'No saved Quotes',author:''}
            this.setState({quote},()=>{
                console.log('not present')
            })
            
        }

    }
    render(){
        console.log('rendered', this.state.quote)
        return(
            
            <div>
                <ul>
                    <li style={{ listStyleType: "none" }}>
                        {this.state.quote.quote}
                        <br/>
                        {this.state.quote.author}
                        <br/>
                        <Btn handleClick={this.quoteHandle} text="Get Another Quote"/>
                    </li>
                </ul>
            </div>
        )
    }
}


export default RandomQuoteLocal