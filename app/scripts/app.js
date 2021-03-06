import classesGalleryBox from "/app/scripts/modules/galleryClasses.js";
import itemBorder from "/app/scripts/modules/itemBorder.js";
import itemsWrapper from "/app/scripts/modules/itemsWrapper.js";
import preViewer from "/app/scripts/modules/itemPreviewer.js";
import fog from "/app/scripts/modules/fog.js";
import animationCorrect from "/app/scripts/modules/animationCorrect.js";

// options for view gallery
const g_options = {
  hover_animation: "scale", // - animation for hover-efect
  structure: "table", // "oneRow", "table"
  struct_cols: "8-6-2-2", // from 1 - 12, "default" - numbers of items in one row foe diferent screens (fron big screens to mobile). If "default" - 8, 6, 3, 2.
  trackBox_teg: "div",
  item_wrappteg: "div",
  item_order: "equally", // "mix" "equally"
  item_margin: 3, // "no" - parameter for margins bettwen items
  item_form: "rectangle", // "rectangle", "circle", "square" - parameter for item form
  fog: false,
  item_border: [
    {
      // can be "none" if border is not need;
      color: "#D45801",
      windth: 3, // just number
      radius: 20 // just number
    }
  ]
};
Element.prototype.addClasses = function() {
  let ar = this;
  for (let idx in ar) {
    ar[idx].classList.add("item-content");
  }
};
// -----
Element.prototype.createGallery = function(a) {
  // a - array with options for slider:
  let galleryBox = document.querySelector('[data-name="gallery-box"]'); // get main box with items

  let galleryWidth = galleryBox.offsetWidth;

  galleryBox.setAttribute("class", `gallery-box ${classesGalleryBox(a)}`); // add class to main box

  let gallitems = galleryBox.children; // select oll child/items
  for (let i = 0; i < gallitems.length; i++) {
    // add new class to item element
    gallitems[i].classList.add("item-content");
  }
  galleryBox.appendChild(itemsWrapper(gallitems, g_options, galleryWidth));
  animationCorrect(gallitems, a.structure, galleryWidth);
  itemBorder(g_options.item_border);
  // ---------------- preVieuer start
  let preVieuerBtn = document.getElementsByClassName("preVieuBtn");
  let openViewer = function() {
    preViewer(this, galleryBox);
  };

  for (let i = 0; i < preVieuerBtn.length; i++) {
    preVieuerBtn[i].addEventListener("click", openViewer, false);
  }

  if (a.fog) {
    galleryBox.appendChild(fog());
  }
};

let elG = document.getElementById("gallery-box");
elG.createGallery(g_options);
