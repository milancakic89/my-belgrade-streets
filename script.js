

const streets = (function(){
    let streets = [];
    let resultDiv;
    let input;

    if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
          'use strict';
      
          if (search instanceof RegExp) {
            throw TypeError('first argument must not be a RegExp');
          } 
          if (start === undefined) { start = 0; }
          return this.indexOf(search, start) !== -1;
        };
    }

    getStreets = () =>{
        fetch('./streets.json')
        .then(streetData => streetData.json())
        .then(data => streets = data)
    }

    searchStreet = (input) =>{
        if(streets.length < 1 || input == ''){
            return cleanSearch();
        }
        let matches = [];
        streets.filter(street=>{
            let word = input.toUpperCase();
            if (street.address.toUpperCase().includes(word)){
                matches.push(street);
            };      
        });
        cleanSearch();
        matches.forEach(item =>{
            createLiElement(item)
        });
    }
    cleanSearch = () =>{
        if(!resultDiv.firstChild){
            return;
        }
        while(resultDiv.firstChild){
            resultDiv.firstChild.remove();
        }   
    }

    assignElements = () =>{
        input = document.getElementById('search');
        resultDiv = document.getElementById('result');
        input.addEventListener('keyup', function(e){
          searchStreet(e.target.value);
        })
    }
    createLiElement = (element) =>{
        let li = document.createElement('li');
        let text = document.createTextNode(element.address);
        text.textContent += " (" + element.square + ") ";
        li.appendChild(text);
        document.getElementById('result').appendChild(li);
    }
    assignElements();
    getStreets();

  return {
      searchStreet
  }
  
//end of IIFE  
 }());


