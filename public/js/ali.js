var index;
function readTextFile()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "/js/file.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                index = rawFile.responseText;
                //console.log(index);
            }
        }
    }
    rawFile.send(null);
}
function writeTextFile()
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/js/file', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.
      }
    }
    xhr.send("foo=bar&lorem=ipsum");

    console.log("adxw");
}


document.querySelector('.pre-button').addEventListener('click', function handleClick(event) {
   readTextFile();
   index=10;
   writeTextFile();
 });
 document.querySelector('.next-button').addEventListener('click', function handleClick(event) {
  });
