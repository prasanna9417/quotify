import React from 'react'



class AddNewQuote extends React.Component{
    constructor(props){
        super(props)
        this.state={
            quoteList:[],
            quote:{},
            quoteText:'',
            author:''
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
    handleQuoteChange=(e)=>{
        //console.log('quote change')
        const quoteText =  e.target.value
        this.setState({quoteText},()=>{console.log('quote changed')})
    }
    handleAuthorChange=(e)=>{
        ///console.log('author change')
        const author = e.target.value
        this.setState({author},()=>{console.log('author changed')})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.state.quoteText.length==0){
            alert('Enter Quote')
        }
        else{
            const quote = {
                quote: this.state.quoteText.trim(),
                author: this.state.author.trim(),
                id: this.state.quoteList.length+1
            }
            this.setState({quote},()=>{console.log('quote changed')
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
                        this.props.history.push('/list-all-quotes')
                    })
                } 
                else{
                    this.props.history.push('/list-all-quotes')
                }
            })
            
        }
        

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
    render(){
        console.log('rendered', this.state.quote)
        return(
            <div>
                <h3>Add New Quote </h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Quote
                        <br/>
                        <textarea rows={10} cols={60} value={this.state.quoteText} onChange={this.handleQuoteChange} ></textarea>
                    </label>
                    <br/>
                    <label>
                        Author
                        <br/>
                        <textarea rows={1} cols={20} value={this.state.author} onChange={this.handleAuthorChange}></textarea>
                    </label>
                    <br/>
                
                    <input type="submit" value="Submit"/>
                    
                </form>
               
            </div>
            
        )
    }
    

}

export default AddNewQuote