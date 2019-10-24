import React from 'react'
import axios from 'axios'
import Btn from './Btn'

class RandomQuoteAPI extends React.Component{
    constructor(){
        super()
        this.state={
            quote:{},
            quoteList:[]
        }
    }
    componentDidMount(){
        console.log('component did mount')
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`)
            .then(response=>{
                const quote={}
                quote['quote']=response['data']['quoteText'].trim()
                quote['author']=response['data']['quoteAuthor'].trim()
                this.setState({quote})

                if(localStorage.getItem('quotes')){
                    const quoteList = JSON.parse(localStorage.getItem('quotes'))
                    this.setState({quoteList},()=>{console.log('present')})
                }
                else{
                    const quoteList=[]
                    this.setState({quoteList},()=>{
                        console.log('not present')
                        localStorage.setItem('quotes', JSON.stringify(this.state.quoteList))
                    })
                    
                }
                

            })
            .catch(err=>{
                console.log(err)
            })
    }
    quoteIncludes=(quoteList,quote)=>{
        let a=0
        if(quote['quote']==undefined && quote['author']==undefined){
            return 1
        }
        for(let i=0;i<quoteList.length;i++){
            if(quoteList[i]['quote'].toLowerCase()==quote['quote'].toLowerCase() && quoteList[i]['author'].toLowerCase()==quote['author'].toLowerCase()){
                a=a+1
            }
        }
        if(a>0){
            return 1
        }
        else{
            return 0
        }
    }
    saveHandle=()=>{
        console.log('save clicked')
        if(this.quoteIncludes(this.state.quoteList,this.state.quote)==0 && this.state.quote['quote']!=undefined && this.state.quote['author']!=undefined){
            console.log('inside if loop')
            const quoteList=this.state.quoteList
            const quote=this.state.quote
            quote['id']=quoteList.length+1
            quoteList.push(quote)
            console.log(quoteList)
            this.setState({quoteList},()=>{
                console.log('quote added')
                localStorage.setItem('quotes', JSON.stringify(this.state.quoteList))
            })

            
        
        }        
    }
    quoteHandle=()=>{
        console.log('another quote clicked')
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`)
            .then(response=>{
                const quote={}
                quote['quote']=response['data']['quoteText'].trim()
                quote['author']=response['data']['quoteAuthor'].trim()
                this.setState({quote},()=>{console.log('quote changed')})

            })
            .catch(err=>{
                console.log(err)
            })
             
    }
    render(){
        console.log('rendered', this.state.quote)
        return(
            
            <div>
                <ul>
                    <li style={{ listStyleType: "none" }}>
                        <p>{this.state.quote.quote}</p>
                        <p>{this.state.quote.author}</p>
                        <Btn handleClick={this.saveHandle} text="Save Quote"/>
                        <Btn handleClick={this.quoteHandle} text="Get Another Quote"/>
                    </li>
                </ul>
            </div>
        )
    }
}


export default RandomQuoteAPI