const initState={

rooms:[

    {
        id:"1",
        image:"/images/r1.jpg",
        title:"Luxurious Rooms",
        description:"This impressive paella is a perfect party dish and a fun meal to cook together with yourguests. Add 1 cup of frozen peas along with the mussels, if you like. " ,
        Facility:" Wifi , Kitchen , Bathroom , AC , Heater",
        capacity:5,
        type:"double",
        Price:10000,
    
        
    },
    
    {
        id:"2",
        image:"/images/r2.jpg",
        title:"Luxurious Rooms",
        description:"This impressive paella is a perfect party dish and a fun meal to cook together with yourguests. Add 1 cup of frozen peas along with the mussels, if you like. " ,
        Facility:"  Wifi , Kitchen , Bathroom , AC , Heater",
        capacity:5,
        type:"single",
        Price:10000,
        
        
    },
    
    {
        id:"3",
        image:"/images/r3.jpg",
        title:"Luxurious Rooms",
        description:"This impressive paella is a perfect party dish and a fun meal to cook together with yourguests. Add 1 cup of frozen peas along with the mussels, if you like. " ,
        Facility:" Wifi , Kitchen , Bathroom , AC , Heater",
        capacity:5,
        type:"single",
        Price:100,

        
    },
    
    {
        id:"4",
        image:"/images/r4.jpg",
        title:"Luxurious Rooms",
        description:"This impressive paella is a perfect party dish and a fun meal to cook together with yourguests. Add 1 cup of frozen peas along with the mussels, if you like. " ,
        Facility:" Wifi , Kitchen , Bathroom , AC , Heater",
        capacity:5,
        type:"double",
        Price:1000,
    
        
    },
    
    {
        id:"5",
        image:"/images/r5.jpg",
        title:"Luxurious Rooms",
        description:"This impressive paella is a perfect party dish and a fun meal to cook together with yourguests. Add 1 cup of frozen peas along with the mussels, if you like. " ,
        Facility:" Wifi , Kitchen , Bathroom , AC , Heater",
        capacity:5,
        type:"double",
        Price:500,
        
    },
    
    {
        id:"6",
        image:"/images/r6.jpg",
        title:"Luxurious Rooms",
        description:"This impressive paella is a perfect party dish and a fun meal to cook together with yourguests. Add 1 cup of frozen peas along with the mussels, if you like. " ,
        Facility:" Wifi , Kitchen , Bathroom , AC , Heater",
        capacity:5,
        type:"double",
        Price:100,

        
    },
    
    {
        id:"7",
        image:"/images/r7.jpg",
        title:"Luxurious Rooms",
        description:"This impressive paella is a perfect party dish and a fun meal to cook together with yourguests. Add 1 cup of frozen peas along with the mussels, if you like. " ,
        Facility:" Wifi , Kitchen , Bathroom , AC , Heater",
        capacity:5,
        type:"double",
        Price:1000,
        
        
    },
    
    {
        id:"8",
        image:"/images/r8.jpg",
        title:"Luxurious Rooms",
        description:"This impressive paella is a perfect party dish and a fun meal to cook together with yourguests. Add 1 cup of frozen peas along with the mussels, if you like. " ,
        Facility:" Wifi , Kitchen , Bathroom , AC , Heater",
        capacity:5,
        type:"family",
        Price:5000,
        
    },
    
    {
        id:"9",
        image:"/images/r9.jpg",
        title:"Luxurious Rooms",
        description:"This impressive paella is a perfect party dish and a fun meal to cook together with yourguests. Add 1 cup of frozen peas along with the mussels, if you like. " ,
        Facility:" Wifi , Kitchen , Bathroom , AC , Heater",
        capacity:5,
        type:"family",
        Price:1500,
    
        
    },
    
    {
        id:"10",
        image:"/images/r10.jpg",
        title:"Luxurious Rooms",
        description:"This impressive paella is a perfect party dish and a fun meal to cook together with yourguests. Add 1 cup of frozen peas along with the mussels, if you like. " ,
        Facility:" Wifi , Kitchen , Bathroom , AC , Heater",
        capacity:5,
        type:"family",
        Price:2000,
    
        
    },
    
    {
        id:"11",
        image:"/images/r11.jpg",
        title:"Luxurious Rooms",
        description:"This impressive paella is a perfect party dish and a fun meal to cook together with yourguests. Add 1 cup of frozen peas along with the mussels, if you like. " ,
        Facility:" Wifi , Kitchen , Bathroom , AC , Heater",
        capacity:5,
        type:"family",
        Price:1000,
        
        
    },
   



],
room:{}




}

const roomsReducer=(state=initState,action)=>{
console.log(action.typ)
switch(action.type){
   
case "FEATURED":

    return{...state,room:state.rooms.filter(r=>r.type===action.typ)};


    default:
        return state;
}

}

export default roomsReducer;