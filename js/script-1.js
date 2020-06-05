 /*------------------------------
 Album Cover Slider
 --------------------------------*/
// The original pen grabbed all a elements. 
// I changed this to allow for normal behavior on links in captions or other links outside of the gallery.
var a = document.getElementsByClassName("coverflow-link"); 
var cfImg = document.getElementsByClassName("coverflow__image");            

// Prevent default behavior (link nav) on the links for the coverflow gallery
var scaleI = 0;
for (scaleI; scaleI < a.length; scaleI++) 
{
    a[scaleI].style.cursor = "default";
    a[scaleI].addEventListener("click", prevDef);
}

function prevDef(e) { e.preventDefault(); }

function forScale(coverflowPos) 
{
  for (scaleI = 0; scaleI < a.length; scaleI++) 
  {
    a[scaleI].style.cursor = "default";
    a[scaleI].addEventListener("click", prevDef);
  }
  for (scaleI = 0; scaleI < cfImg.length; scaleI++) 
  {
    if (cfImg[scaleI].getAttribute("data-coverflow-index") == coverflowPos) 
    {
      cfImg[scaleI].parentElement.style.cursor = "pointer";
      cfImg[scaleI].parentElement.removeEventListener("click", prevDef);
    }
  }
}

function setupCoverflow(coverflowContainer) 
{
  var coverflowContainers;

  if (typeof coverflowContainer !== "undefined") 
  {
    if (Array.isArray(coverflowContainer)) { coverflowContainers = coverflowContainer; } 
    else { coverflowContainers = [coverflowContainer]; }
  } 
  else 
  {
    coverflowContainers = Array.prototype.slice.apply(document.getElementsByClassName('coverflow'));
  }

  coverflowContainers.forEach(function(containerElement) 
  {
    var coverflow = {};
    var prevArrows, nextArrows;

    //capture coverflow elements
    coverflow.container = containerElement;
    coverflow.images = Array.prototype.slice.apply(containerElement.getElementsByClassName('coverflow__image'));
    coverflow.position = Math.floor(coverflow.images.length / 2) + 1;
    coverflow.captions = Array.prototype.slice.apply(containerElement.getElementsByClassName("coverflow-caption"));

    //set indicies on images
    coverflow.images.forEach(function(coverflowImage, i) 
    {
      coverflowImage.dataset.coverflowIndex = i + 1;                        
    });

    // MRH - set indicies on captions & hide all
    coverflow.captions.forEach(function(caption, i) 
    {
      caption.dataset.coverflowIndex = i + 1; 
      caption.style.display = "none";                       
    });

    //set initial position & caption
    coverflow.container.dataset.coverflowPosition = coverflow.position;
    coverflow.captions[coverflow.position].style.display = "block";

    //get prev/next arrows
    prevArrows = Array.prototype.slice.apply(coverflow.container.getElementsByClassName("prev-arrow"));
    nextArrows = Array.prototype.slice.apply(coverflow.container.getElementsByClassName("next-arrow"));

    // MRH  - show the caption that matches which element is currently centered in the coverflow
    function setCaption(pos)
    {
      coverflow.captions.forEach(function(caption, i) 
      {
        caption.style.display = (pos == caption.dataset.coverflowIndex) ? "block" : "none";                                     
      });
    }

    //add event handlers
    function setPrevImage() 
    {
      coverflow.position = Math.max(1, coverflow.position - 1);
      coverflow.container.dataset.coverflowPosition = coverflow.position;
      forScale(coverflow.position);
      setCaption(coverflow.position);
    }

    function setNextImage() 
    {
      coverflow.position = Math.min(coverflow.images.length, coverflow.position + 1);
      coverflow.container.dataset.coverflowPosition = coverflow.position;
      forScale(coverflow.position);
      setCaption(coverflow.position);
    }

    function jumpToImage(evt) 
    {
      coverflow.position = Math.min(coverflow.images.length, Math.max(1, evt.target.dataset.coverflowIndex));
      coverflow.container.dataset.coverflowPosition = coverflow.position;
      setTimeout(function() 
      { 
        forScale(coverflow.position); 
        setCaption(coverflow.position);
      }, 1);
    }

    function onKeyPress(evt) 
    {
      switch (evt.which) 
      {
        case 37: //left arrow
          setPrevImage();
          break;
        case 39: //right arrow
          setNextImage();
          break;
      }
    }

    prevArrows.forEach(function(prevArrow) { prevArrow.addEventListener('click', setPrevImage); });
    nextArrows.forEach(function(nextArrow) { nextArrow.addEventListener('click', setNextImage); });
    coverflow.images.forEach(function(image) { image.addEventListener('click', jumpToImage); });
    window.addEventListener('keyup', onKeyPress);
  });
}

setupCoverflow();