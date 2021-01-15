
class Input extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pin :1111

        }
    }

    render(){

        var pin = this.state.pin
        var num1 = pin.toString()[0]
        var num2 = pin.toString()[1]
        var num3 = pin.toString()[2]
        var num4 = pin.toString()[3]

        return(
            <div id="enter_pin">
                <input type="number" name="pin" placeholder="enter 4 digit code" max="9999" min="1000" value={this.state.pin} hidden></input>
                <div className="input_box" id="box_1">{num1}</div>
                <div className="input_box" id="box_2">{num2}</div>
                <div className="input_box" id="box_3">{num3}</div>
                <div className="input_box" id="box_4">{num4}</div>
            </div>
        )
    }

    
    componentDidMount(){
        console.log("loading input")
        document.addEventListener('DOMContentLoaded', function() {

            document.querySelector("#pin_input")
        
            var num = ""
           
            document.addEventListener('keyup', event =>{
                console.log(event.key)
                
        
                if(event.key === "Backspace" || event.key === "Delete"){
                    console.log("delete last digit ")
                    let index = num.length - 1
                    console.log(index)
                }
        
        
                if(parseInt(event.key)){
                    if(num.length < 4){
                        num = num + String(event.key)
                    }     
                    console.log(num)
                }    
        
        
                
        
        
                 
        
               
            })
        
        
            
        });

    } 
}


ReactDOM.render(<Input/>,document.querySelector('#place_otp'));