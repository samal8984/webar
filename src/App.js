import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState } from 'react'



const uploadfileurl= 'https://6wxwjxwnyc.execute-api.ap-south-1.amazonaws.com/default/arnxt_products_category_functions'
const uploadurl = 'https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/webar/filedata'
const uploadbranddataurl= 'https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/brandspecificdata'

function App() {
    const[file, setFile] = useState();
    const [filename, setFileName] = useState();
    const [gltfurl, setGltfurl] = useState();
    const [imageurl, setImageurl] = useState();
    const [usdzurl, setUsdzurl] = useState();

    const [displayitem, setDisplayItem] = useState()


    const [imagefile, setImageFile] = useState();
    const [usdzfile, setUsdzFile] = useState();

    const[verifytag, setVerifyTag] = useState([])
    const [brand, setBrand] = useState();
    const [length, setLength] = useState();
    const [Height, setHeight] = useState();
    const [width, setWidth] =  useState();
    const [productname, setProductName] = useState();
    const [productdescription, setProductDesc] = useState();
    const [productprice, setProductPrice] = useState();
    const [unit, setUnit] = useState();
    const [brandid, setBrandId] = useState('')
    const [imagefilearray, setImageFileArray] = useState([])


    
 const [serviceList, setServiceList] = useState([{ itemname: "", itemvalue:''}]);

 const [servicevalue, setServiceValue] = useState();
 const [tagvalue, setTagValue] = useState();
  let lastId;
    function getId(){
        let currentId = new Date().getTime();
        if (lastId == currentId) {
          currentId++;
        }
        lastId = currentId;
        return lastId;
  }


  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }

    const filechangegltf = e=>{

       
       let files = Array.from(e.target.files) 
       files.forEach(file => {
        fileToBase64(file, (err, result) => {
          if (result) {

               let newval= file.name
 
   
    
    let indx = newval.lastIndexOf(".") + 1;
    let filetype = newval.substr(indx, newval.length).toLowerCase();

    if(filetype === 'png' || filetype === 'jpeg' || filetype === 'jpg'){


       const url= uploadfileurl
    fetch(url,{
      method: "POST",
      body: file.name
    
  
  
    }).then((res)=>res.json())
       .then((res)=>{
    
        fetch(res.uploadURL, {
          
          method: "PUT",
          headers: {
            "ContentType": "application/json",
          
          },
    
        body: file
      
        })
           .then((res)=>{
          
            if(res.status === 200){
  
                let resnew= res.url.split('?')
                let imgurl= resnew[0]
               
                console.log(imgurl)
                 setGltfurl(imgurl)
              

              }
          
           })
           .catch((err)=>console.log(err))
         
       })
       .catch((err)=>console.log(err))
      
  
    } else{
      document.querySelector('#glbmessage').innerHTML= 'jpeg, jpg, png required'
      setTimeout(() => {
      document.querySelector('#glbmessage').innerHTML= ''

        
      }, [5000]);
      return
    }
          
          }
        })
       
        const reader = new FileReader();
    
        reader.readAsDataURL(file)
        
    })

}


const filechangeimage = e=>{

       
    let files = Array.from(e.target.files) 
    files.forEach(file => {
     fileToBase64(file, (err, result) => {
       if (result) {
       
             
    const url= uploadfileurl
    fetch(url,{
      method: "POST",
      body: file.name
    
  
  
    }).then((res)=>res.json())
       .then((res)=>{
       
        fetch(res.uploadURL, {
          
          method: "PUT",
          headers: {
            "ContentType": "application/json",
          
          },
    
        body: file
        
    
        })
           .then((res)=>{
          
            if(res.status === 200){
  
                let resnew= res.url.split('?')
                let imgurl= resnew[0]
               
                 setImageFileArray([...imagefilearray, imgurl])
             
      
              }
          
           })
           .catch((err)=>console.log(err))
         
       })
       .catch((err)=>console.log(err))
 
       }
     })
    
     const reader = new FileReader();
 
     reader.readAsDataURL(file)
     
 })
 
 
 
}
console.log(imagefilearray)
const filechangeusdz = e=>{

       
    let files = Array.from(e.target.files) 
    files.forEach(file => {
     fileToBase64(file, (err, result) => {
       if (result) {
       
             
    const url= uploadfileurl
    fetch(url,{
      method: "POST",
      body: file.name
    
    }).then((res)=>res.json())
       .then((res)=>{
    
        fetch(res.uploadURL, {
          
          method: "PUT",
          headers: {
            "ContentType": "application/json",
          
          },
    
        body: file
        
    
        })
           .then((res)=>{
          
            if(res.status === 200){
  
                let resnew= res.url.split('?')
                let imgurl= resnew[0]
               
                 setUsdzurl(imgurl)
              
              }
          
           })
           .catch((err)=>console.log(err))
         
       })
       .catch((err)=>console.log(err))

       }
     })
    
     const reader = new FileReader();
 
     reader.readAsDataURL(file)
     
 })
 
 
 
}
let newval;
let finalval;

const submitHandler=(e)=>{
  e.preventDefault();
  getId()


     

    
    const body={
     
        'brand-id' : brand,
      carouselUrls:  imagefilearray,
      brandId : brandid,
      iconUrl: gltfurl,
      categoryimages: serviceList
        
    }
    axios.post(uploadbranddataurl, body).then(res=>{
      console.log(res.data)

      setDisplayItem(res.data.Item)
      if(res.status === 200){
      
       
        document.getElementById('submitmessage').innerHTML='Submitted'
        setTimeout(() => {
        document.getElementById('submitmessage').innerHTML=''

          
        }, [2000]);
      }
    }).catch(error=>{
      console.log(error)
    })

}
let tagsoptions= []

let newtagarr;

let check;


const setnewtag=(val)=>{


     check = verifytag.includes(val)
      if(!check){
        setVerifyTag([...verifytag, val])

      }
       document.getElementById('inputtag').value= ''

}


const tagsChange=(e)=>{
       
    if(e.target.value.includes(',')){
         newval= Array.from(e.target.value)
         newval.pop()
      finalval=  newval.join('')
      setnewtag(finalval)

    }

}



const removeSuggest=(val)=>{
    setVerifyTag((oldArray)=>oldArray.filter((item)=>
    item != val
      ))

}



 
const handleServiceChange = (e, index) => {


  if(e.target.files){
    let files = Array.from(e.target.files) 
  files.forEach(file => {
   fileToBase64(file, (err, result) => {
     if (result) {
     
           
  const url= uploadfileurl
  fetch(url,{
    method: "POST",
    body: file.name
  
  }).then((res)=>res.json())
     .then((res)=>{
  
      fetch(res.uploadURL, {
        
        method: "PUT",
        headers: {
          "ContentType": "application/json",
        
        },
  
      body: file
      
  
      })
         .then((res)=>{
        
          if(res.status === 200){

              let resnew= res.url.split('?')
              let imgurl= resnew[0]
             
              let { name,value } = e.target;
 
              const list = [...serviceList];
               
                 value = imgurl
              list[index][name] = value;
             
              setServiceList(list);
            
            }
        
         })
         .catch((err)=>console.log(err))
       
     })
     .catch((err)=>console.log(err))

     }
   })
  
   const reader = new FileReader();

   reader.readAsDataURL(file)
   
})


  } else{
    let { name,value } = e.target;
 
    const list = [...serviceList];
    list[index][name] = value;
   
    setServiceList(list);
  }

  
 
        
   

}
console.log(serviceList)

const handleServiceRemove = (index) => {
  const list = [...serviceList];
  list.splice(index, 1);
  setServiceList(list);
};

const handleServiceAdd = () => {
  setServiceList([...serviceList, { itemname: "", itemvalue : "" }]);
};



displayitem && displayitem.tags.map(item=>{
  console.log(item)
})
  return (
    <div className="App">
      <div>
          <div className='formdiv'   >
            <div>
            <div className='forminputdiv'>
                <label>Brand Name</label>
                <input  type='text' onChange={(e)=>setBrand(e.target.value)}/>


            </div>

            </div>
            <div>
            <div className='forminputdiv'>
                <label>Brand id</label>
                <input type='text' onChange={(e)=>setBrandId(e.target.value)}/>


            </div>
            </div>
            <div>
            <div className='forminputdiv'>
                <label>Brand logo image</label>
                <input type='file' onChange={filechangegltf} />
                 <p id='glbmessage'  style={{color:'red'}}></p>
               
                
               


            </div>
           
            </div>
          
           
            <div>
            <div className='forminputdiv'>
                <label>Upload Carousel images</label>
                <input type='file' onChange={filechangeimage} />
             
            </div>
            <div  className='carouseldiv'>{
                imagefilearray && imagefilearray.map(item=>(
                  <img src= {item}/> 
                ))
              }

            </div>

            </div>
    
            <div>
         
            </div>

            <div>
            <div className='inputformcontainer'>
                <label>Brand category images</label>
               {
                serviceList && serviceList.map((item, index)=>(

               <div key={index}  className='keyvalueinput' >
                

               <input  
                name="itemname"
                type="text"
                id="service"
                className='inputfirst'
                placeholder='brand category name'
              
                onChange={(e) => handleServiceChange(e, index)}
                required
              />
               <input
                name="itemvalue"
                type="file"
                id="service"
                className='inputsecond'
              
                onChange={(e) => handleServiceChange(e, index)}
                required
              />


               {serviceList.length - 1 === index  && (

                <div>
               
                  <span   
                  onClick={handleServiceAdd}
                  className="add-btn" ><i style={{fontSize:'30px'}} class='bx bx-message-square-add'></i></span>
             


                  </div>
             
              )}


             <div className="second-division">
              {serviceList.length !== 1 && (
               
                
                
                  <span   
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn" ><i  style={{fontSize:'30px'}} class='bx bx-message-square-minus' ></i></span>
               
              )}
            </div>
              
                 </div>

                )) }

             </div>
            </div>
      
         

            <div className='submitbutton' >
            <button type='submit' onClick={submitHandler}> Submit</button>
           
        </div>
        <p id='submitmessage' style={{color:'green'}}></p>


        </div>

      </div>
    </div>
  );
}

export default App;
