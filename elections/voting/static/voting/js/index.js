

class Candidate extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }


    render(){
        return(
            <div>
                <div className="col-lg-6 col-md-6 col-xs-12 form-section">
                    <div className="backg-form">
                    </div>
                            
                    <div className="card" onClick={this.vote} >
                        <div ><img  className="picture" src={this.props.picture}/></div>
                        <div className="card-name" ><h4 >{this.props.name} </h4></div>
                        <div className="card-title" ><h5 >{this.props.title} </h5></div>
                        <div className="card-footer" ><h4 >{this.props.footer} team </h4></div>
                    </div>
                    
                </div> 
            </div>
        )
    }

    vote=()=>{  
        console.log("vote submission")
        this.props.change_positon()

        fetch(`submit_vote`,{
            method:"PUT",
            body: JSON.stringify({
                id:this.props.id,
                position:this.props.position
                      
            })
        })  
        .then(response=>{
            return response.json()
        })
        .then(response=>{
            // console.log(response.message)
            if(response.message === "voted"){
                alert("You have already voted for this position")
            }
            
        })

        
    }
}


class Core extends React.Component{

    constructor(props){
        super(props)
        this.state={
            candidates:[],
            position:"1",
            voted :false,
            

        }
    }


    render(){
        // console.log(this.state.candidates)
        
        if(! this.state.candidates){
            var candidate_components = null     
            
        }else{

            var candidates = this.state.candidates
            candidate_components = candidates.map(candidate=>{  
                
                //console.log("user")

                return <Candidate
                    name={candidate.name}
                    title={candidate.position}
                    footer="something here"
                    picture={candidate.picture}
                    change_positon = {this.change_position}
                    id = {candidate.id}
                    position = {candidate.position}
                    key ={candidate.id}
                    />                      
            }) 
        }

        // map all candidates into candidates component for display
        return(
            <div>
                <div id="positions">
                    <button
                     className="btn  position" onClick={this.get_candidates} name="1">President
                    </button>
                    <button
                     className="btn position" onClick={this.get_candidates} name="2">Vice President
                    </button>
                    <button className="btn position"onClick={this.get_candidates} name="3">General Secretary</button>
                    <button className="btn position"onClick={this.get_candidates} name="4">Financial Secretary</button>
                    <button className="btn position"onClick={this.get_candidates} name="5">Public Relations</button>
                    <button className="btn position" onClick={this.get_candidates} name="6">General Organizer</button>
                    <button className="btn position"onClick={this.get_candidates} name="7">Cordinating Secretary</button>
                    <button className="btn position"onClick={this.get_candidates} name="8">Secretary for Education</button>
                    <button className="btn position" onClick={this.get_candidates} name="9">Pres and Information</button>
                    <button className="btn position" onClick={this.get_candidates} name="10">Computer Prefect</button>
                    <button className="btn position"onClick={this.get_candidates} name="11">Utility/Water Prefect</button>
                </div>

                <div id="candidates">
                    <div className="row">
                        {candidate_components}
                    </div>
                </div>
            </div>
        )
    }

    change_button=()=>{
        console.log("changing button's color")
        var count = this.state.position
        // console.log(position)
        // position = parseInt(position)
        


        document.querySelectorAll('.position').forEach(function(button){
            var btn = parseInt(button.name)
            var position = parseInt(count)
            if(btn ===  position){
                button.style.background = "MediumSpringGreen"
                console.log(button.name)
            }else{
                button.style.background = ""
                console.log("not",button.name)
            }

        });
   
    }

    get_candidates=(event)=>{
        console.log("loading candidates")
        
        // load position selected 
        if(event){
            
            
            this.state.position = event.target.name
         
        }else{
            var num = String(this.state.position)
           
        }
        
        console.log(this.state.position)
        this.change_button()

        fetch(`get_candidates/${this.state.position}`)
        .then(respose=>{
            if(respose.status===201){
                this.setState({
                    candidates: ""
                })
            }else{

                return respose.json()
            }
        })
        .then(respose=>{
            // console.log(respose)
            this.setState({
                candidates: respose
            })
            
        })


    }

    componentDidMount(){
        this.get_candidates()
    } 

    change_position=()=>{

        // console.log('changing positions',this.state.position)
        this.state.position = parseInt(this.state.position) + 1
        
        if( this.state.position > 11){
            this.state.position = 1
        }

        // console.log(this.state.position)
        
        this.get_candidates()
    }

}





class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            view:""

        }
    }


    render(){

        if(this.state.view === "core"){

            return(
                <Core/>
            )
        }
        // else if(this.state.view ==="aux"){
        //     return(
        //         <div></div>
        //     )
        // }
        else{
            return(
                <div></div>
            )
        }
    }
       


    componentDidMount(){
        // console.log("loading index ")
        document.querySelector('#core-member-view').addEventListener('click', () => this.load_view("core"));
        
        document.querySelector('#aux-member-view').addEventListener('click', () => this.load_view("aux"));

        this.load_view("core")

    } 


    load_view=(value)=>{
        if(value === "core"){
            document.querySelector('#core-member-view').style.background = "gray"
            document.querySelector('#aux-member-view').style.background = ""


        }else if(value === "aux"){
            document.querySelector('#core-member-view').style.background = ""
            document.querySelector('#aux-member-view').style.background = "gray"
        }
        
        
        // console.log("load view",value)
        this.setState({
            view:value
        })

    }
}






ReactDOM.render(<Index/>,document.querySelector('#index'));
