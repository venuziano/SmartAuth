var array = ['a', 'b']

function teste(hash) {
  array.push(hash);
  for(let i = 0; i < array.length; i++){
    if(array[i] !== hash){
      console.log('array: ' + array[i])
    }
  }
  console.log('array total ' + array);
}

teste('a2');