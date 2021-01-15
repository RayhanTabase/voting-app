
document.addEventListener('DOMContentLoaded', function() {
   
    const input = document.querySelector("#pin_input")
    
    const box1 = document.querySelector("#box_1")
    const box2 = document.querySelector("#box_2")
    const box3 = document.querySelector("#box_3")
    const box4 = document.querySelector("#box_4")
    
    var num = ""
    box1.style.border = "3px solid blue"

    // console.log(num.length)
   
    document.addEventListener('keyup', event =>{
        console.log(event.key)
        
        if(event.key === "Backspace" || event.key === "Delete"){
            console.log("delete last digit ")

            let index = num.length - 1
            num = replaceAtIndex("", num, index)
            change_border()
   
        }

        if(parseInt(event.key)){

            if(num.length < 4){
                num = num + String(event.key)
                input.value = parseInt(num)
                change_border()


               
            }else if(num.length === 4){
                num = replaceAtIndex(String(event.key), num, 3)

            }
          
            console.log(num)

        }  
        check_value()      
    })    

    function change_border(){
    
        box1.style.border = "3px solid black"
        box2.style.border = "3px solid black"
        box3.style.border = "3px solid black"
        box4.style.border = "3px solid black"
    
        if(num.length < 1){
            box1.style.border = "3px solid blue"
            
            
        }else if(num.length < 2){
            box2.style.border = "3px solid blue"
            
            
        }else if(num.length < 3){
            box3.style.border = "3px solid blue"
            
            
        }else if(num.length > 2){
            box4.style.border = "3px solid blue"

        }
    }

    function check_value(){
        if(num[0]){
            box1.value = num[0]

        }else{
            box1.value = ""
        }

        if(num[1]){
            box2.value = num[1]   
        }else{
            box2.value = ""
        }
        if(num[2]){
            box3.value = num[2]
            
        }else{
            box3.value = ""
        }
        if(num[3]){
            box4.value = num[3]
            
        }else{
            box4.value = ""
        }
    }


})



function replaceAtIndex(character, word, index) {
    var tempStr = "";

    for (var n = 0; n < word.length; n++) {
        if (n == index) {
            tempStr += character;
        } else {
            tempStr += word[n];
        }
    }

    return tempStr;
}
  