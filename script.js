//your code here
// Script.js

// Main DOM elements
const main = document.querySelector('main');

// Function to generate random images
function generateImages() {
  const classes = ['img1', 'img2', 'img3', 'img4', 'img5'];
  const repeatedImage = classes[Math.floor(Math.random() * classes.length)];
  const images = [...classes, repeatedImage];

  // Shuffle images
  images.sort(() => Math.random() - 0.5);
  
  return images;
}

// Function to render the initial layout
function renderInitialState() {
  main.innerHTML = `
    <h3 id="h">Please click on the identical tiles to verify that you are not a robot.</h3>
    <div class="flex" id="image-container"></div>
    <p id="para"></p>
  `;
  const imageContainer = document.getElementById('image-container');
  const images = generateImages();

  images.forEach((imgClass, index) => {
    const img = document.createElement('img');
    img.className = imgClass;
    img.dataset.index = index;
    imageContainer.appendChild(img);
  });

  addEventListeners();
}

// Add event listeners to images
function addEventListeners() {
  const images = document.querySelectorAll('img');
  const para = document.getElementById('para');
  let selectedImages = [];

  images.forEach((img) => {
    img.addEventListener('click', () => {
      // Prevent selecting the same image twice
      if (selectedImages.some(sel => sel.dataset.index === img.dataset.index)) return;

      img.classList.add('selected');
      selectedImages.push(img);

      // Show reset button
      if (!document.getElementById('reset')) {
        const resetButton = document.createElement('button');
        resetButton.id = 'reset';
        resetButton.innerText = 'Reset';
        resetButton.addEventListener('click', () => {
          renderInitialState();
        });
        main.appendChild(resetButton);
      }

      // Show verify button if 2 images are selected
      if (selectedImages.length === 2 && !document.getElementById('verify')) {
        const verifyButton = document.createElement('button');
        verifyButton.id = 'verify';
        verifyButton.innerText = 'Verify';
        verifyButton.addEventListener('click', () => {
          verifySelection(selectedImages);
          verifyButton.remove();
        });
        main.appendChild(verifyButton);
      }

      // Remove excess selections
      if (selectedImages.length > 2) {
        selectedImages.shift().classList.remove('selected');
      }
    });
  });
}

// Function to verify the selected images
function verifySelection(selectedImages) {
  const para = document.getElementById('para');

  if (selectedImages[0].className === selectedImages[1].className) {
    para.innerText = 'You are a human. Congratulations!';
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  // Remove selected class from images
  selectedImages.forEach(img => img.classList.remove('selected'));
}

// Initialize the application
renderInitialState();

