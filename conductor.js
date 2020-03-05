
import {MDCTextField} from '@material/textfield/index';
const textField = new MDCTextField(document.querySelector('.mdc-text-field__input'));
  let scanner = new Instascan.Scanner(
      {
          video: document.getElementById('preview')
      }
  );
  scanner.addListener('scan', function(content) {
      alert('Welcome ' + content);
      //window.open(content, "_blank");
  });
  Instascan.Camera.getCameras().then(cameras => 
  {
      if(cameras.length > 0){
          scanner.start(cameras[0]);
      } else {
          console.error("There is no Camera on this Device!");
      }
  });
  var bus_no = "KAI9723"
  function StartTransaction(){


          var num_tickets = document.getElementById("tickets").value;
          
          var start_stop;
          fetch('http://c93139fb.ngrok.io/buses')
          .then((response) => {
                  return response.json();
          })
          .then((data) => {
            
            var route_index = data.routes.map((ele,index)=>ele.route).indexOf("green")
            var stops = data.routes[route_index].stops
            var stop_name = stops[rand(stops.length)].name;
            console.log(stop_name)
            console.log({bus:bus_no,tickets:parseInt(num_tickets),start_stop:stop_name});
            fetch('http://c93139fb.ngrok.io/start_transaction',{
            method:'post',
                  headers: {
                      
                      'Content-Type': 'application/json'
                  },
                  
                  body:{bus:bus_no,tickets:parseInt(num_tickets),start_stop:stop_name}
                  
                  
          }) 

          });

          
          
          
          
  }
  function rand(size){
    return Math.floor(Math.random()*size);
  }
  function endTransaction(){
    fetch('http://c93139fb.ngrok.io/end_transaction',{
      method:'post',
                  headers: {
                      
                      'Content-Type': 'application/json'
                  },
                  
                  body:{bus:bus_no}


    })
  }
  function confirmation(){
    var no_tickets = document.getElementById("tickets").value;
    var destination = document.getElementById("drop_location").value
    fetch('http://c93139fb.ngrok.io/buses')
          .then((response) => {
                  return response.json();
          })
          .then((data) => {
            
            var route_index = data.routes.map((ele,index)=>ele.route).indexOf("green")
            var stops = data.routes[route_index].stops
            var stop_name = stops[rand(stops.length)].name;
            if(window.confirm("Number of tickets:"+ no_tickets+'\n'+"Drop location:"+ destination))
            {fetch('http://c93139fb.ngrok.io/cash_transaction',{
            method:'post',
                  headers: {
                      
                      'Content-Type': 'application/json'
                  },
                  
                  body:{bus:bus_no,tickets:parseInt(no_tickets),start_stop:stop_name,end_stop:destination}
                  
                  
          }) }


          
          })
          
        }
