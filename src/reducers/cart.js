import * as type from '../constants/action_type'

var initialState = [];

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case type.ADD_CART:                              
            var data = JSON.parse(localStorage.getItem("cart"));
            if(data == null){
                localStorage.setItem("cart",JSON.stringify(action.cart));
            }
            else{
                state = [];
                if(data.length===undefined){
                    state.push(data);
                }
                else{
                    for(let i=0; i<data.length;i++){
                        state.push(data[i]);
                    }    
                }       
                    
                if(state.length>0){
                    var check = false;
                    state.map((st)=>{
                        if(st.id === action.cart.id){
                            st.soluong ++;
                            check = true;
                        }
                    });
                    if(check === false){
                        state.push(action.cart);
                    }
                }     
                else{
                    state.push(action.cart);
                }            
                localStorage.removeItem("cart");
                localStorage.setItem("cart",JSON.stringify(state));
            }
            return state; 
        default:
            return state;
    }
}

export default myReducer;