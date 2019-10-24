import React from 'react'

class EditQuote extends React.Component{
    constructor(props){
        super(props)
        this.state={
            quoteList:[],
            quote:{},
            quoteText:'',
            author:'',
            id:0
        }
    }
    componentDidMount(){
        console.log('component did mount')
        const id=this.props.match.params.id
        this.setState({id},()=>{console.log('id added')})
        const quoteList = JSON.parse(localStorage.getItem('quotes'))
        const quote=quoteList[id-1]
        const quoteText=quote.quote
        const author=quote.author
        this.setState({quoteList},()=>{console.log('quote list added')})
        this.setState({quote},()=>{console.log('quote added')})
        this.setState({quoteText},()=>{console.log('quote text added')})
        this.setState({author},()=>{console.log('author added')})

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
            }
            // const quoteList=this.state.quoteList
            // console.log(quote)
            // console.log(this.state.id)
            // quoteList[this.state.id-1]=quote
            // console.log(quoteList[this.state.id-1])
            // this.setState({quoteList},()=>{
            //     console.log('quote list changed')
            //     localStorage.setItem('quotes', JSON.stringify(this.state.quoteList))
            //     this.props.history.push('/list-all-quotes')
            // })
            this.setState(prevState => ({
                quoteList: prevState.quoteList.map(quoteMap => {
                    if(quote.id == this.state.id) {
                        return Object.assign({}, quoteMap, quote)
                    } else {
                        return Object.assign({}, quoteMap)
                    }
                })
            }), () => {
                console.log(this.state)
                console.log('quote list changed')
                localStorage.setItem('quotes', JSON.stringify(this.state.quoteList))
                this.props.history.push('/list-all-quotes')
            })
            
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

export default EditQuote